// Player ship with physics and cockpit camera

import * as THREE from 'three';
import type RAPIER from '@dimforge/rapier3d';
import type { InputState } from '../core/Input';
import { SHIP } from '@wikispace/shared';

export interface ShipState {
  speed: number;
  health: number;
  shield: number;
  boostAvailable: boolean;
  boostCooldown: number;
  weaponHeat: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
}

export class Ship {
  private scene: THREE.Scene;
  private world: RAPIER.World;
  private RAPIER: typeof RAPIER;
  private camera: THREE.PerspectiveCamera;

  // Visual
  private mesh!: THREE.Group;
  private cockpit!: THREE.Group;
  private engineGlow!: THREE.PointLight;
  private thrustParticles!: THREE.Points;

  // Physics
  private rigidBody!: RAPIER.RigidBody;
  private collider!: RAPIER.Collider;

  // State
  private health = SHIP.MAX_HEALTH;
  private shield = SHIP.MAX_SHIELD;
  private boostCooldown = 0;
  private boosting = false;
  private weaponHeat = 0;

  // Camera smoothing
  private cameraOffset = new THREE.Vector3(0, 2, 8);
  private lookOffset = new THREE.Vector3(0, 0, -20);

  constructor(
    scene: THREE.Scene,
    world: RAPIER.World,
    rapier: typeof RAPIER,
    camera: THREE.PerspectiveCamera
  ) {
    this.scene = scene;
    this.world = world;
    this.RAPIER = rapier;
    this.camera = camera;
  }

  async init() {
    this.createMesh();
    this.createPhysics();
    this.createEffects();
  }

  private createMesh() {
    this.mesh = new THREE.Group();

    // Main hull - sleek triangular shape
    const hullGeometry = new THREE.ConeGeometry(1, 4, 4);
    hullGeometry.rotateX(Math.PI / 2);
    const hullMaterial = new THREE.MeshStandardMaterial({
      color: 0x334455,
      metalness: 0.8,
      roughness: 0.2,
    });
    const hull = new THREE.Mesh(hullGeometry, hullMaterial);
    this.mesh.add(hull);

    // Wings
    const wingGeometry = new THREE.BoxGeometry(6, 0.1, 2);
    const wingMaterial = new THREE.MeshStandardMaterial({
      color: 0x445566,
      metalness: 0.7,
      roughness: 0.3,
    });
    const wings = new THREE.Mesh(wingGeometry, wingMaterial);
    wings.position.z = 1;
    this.mesh.add(wings);

    // Engine pods
    const podGeometry = new THREE.CylinderGeometry(0.3, 0.4, 1.5, 8);
    podGeometry.rotateX(Math.PI / 2);
    const podMaterial = new THREE.MeshStandardMaterial({
      color: 0x222233,
      metalness: 0.9,
      roughness: 0.1,
    });

    const leftPod = new THREE.Mesh(podGeometry, podMaterial);
    leftPod.position.set(-2, 0, 2);
    this.mesh.add(leftPod);

    const rightPod = new THREE.Mesh(podGeometry, podMaterial);
    rightPod.position.set(2, 0, 2);
    this.mesh.add(rightPod);

    // Cockpit (camera will be inside this)
    this.cockpit = new THREE.Group();
    const canopyGeometry = new THREE.SphereGeometry(0.8, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const canopyMaterial = new THREE.MeshStandardMaterial({
      color: 0x88ccff,
      metalness: 0.1,
      roughness: 0.1,
      transparent: true,
      opacity: 0.3,
    });
    const canopy = new THREE.Mesh(canopyGeometry, canopyMaterial);
    canopy.position.y = 0.2;
    canopy.rotation.x = -Math.PI / 2;
    this.cockpit.add(canopy);
    this.cockpit.position.z = -0.5;
    this.mesh.add(this.cockpit);

    this.scene.add(this.mesh);
  }

  private createPhysics() {
    // Create rigid body
    const bodyDesc = this.RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(0, 0, 0)
      .setLinearDamping(1 - SHIP.DRAG)
      .setAngularDamping(1 - SHIP.ANGULAR_DRAG);

    this.rigidBody = this.world.createRigidBody(bodyDesc);

    // Create collider (simplified box for now)
    const colliderDesc = this.RAPIER.ColliderDesc.cuboid(3, 1, 2)
      .setMass(10)
      .setRestitution(0.3);

    this.collider = this.world.createCollider(colliderDesc, this.rigidBody);
  }

  private createEffects() {
    // Engine glow
    this.engineGlow = new THREE.PointLight(0x4488ff, 0, 10);
    this.engineGlow.position.set(0, 0, 3);
    this.mesh.add(this.engineGlow);

    // Simple particle system for thrust
    const particleCount = 50;
    const positions = new Float32Array(particleCount * 3);
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x4488ff,
      size: 0.2,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    this.thrustParticles = new THREE.Points(particleGeometry, particleMaterial);
    this.mesh.add(this.thrustParticles);
  }

  handleInput(input: InputState, dt: number) {
    const body = this.rigidBody;

    // Get current orientation
    const rotation = body.rotation();
    const quat = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);

    // Calculate thrust in local space, then transform to world
    let thrustMultiplier = SHIP.THRUST_FORCE;

    // Handle boost
    if (input.boost && this.boostCooldown <= 0 && !this.boosting) {
      this.boosting = true;
      this.boostCooldown = SHIP.BOOST_COOLDOWN;
    }

    if (this.boosting) {
      thrustMultiplier *= SHIP.BOOST_MULTIPLIER;
      this.boostCooldown -= dt;
      if (this.boostCooldown <= SHIP.BOOST_COOLDOWN - SHIP.BOOST_DURATION) {
        this.boosting = false;
      }
    } else if (this.boostCooldown > 0) {
      this.boostCooldown -= dt;
    }

    // Apply thrust
    const localThrust = new THREE.Vector3(
      input.thrust.x * SHIP.STRAFE_FORCE,
      input.thrust.y * SHIP.STRAFE_FORCE,
      input.thrust.z * thrustMultiplier
    );
    const worldThrust = localThrust.applyQuaternion(quat);

    body.applyImpulse(
      { x: worldThrust.x * dt, y: worldThrust.y * dt, z: worldThrust.z * dt },
      true
    );

    // Clamp velocity
    const vel = body.linvel();
    const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y + vel.z * vel.z);
    const maxSpeed = this.boosting ? SHIP.MAX_SPEED * SHIP.BOOST_MULTIPLIER : SHIP.MAX_SPEED;

    if (speed > maxSpeed) {
      const scale = maxSpeed / speed;
      body.setLinvel({ x: vel.x * scale, y: vel.y * scale, z: vel.z * scale }, true);
    }

    // Apply rotation (pitch and yaw)
    const torque = new THREE.Vector3(
      input.rotation.x * SHIP.ROTATION_SPEED,
      input.rotation.y * SHIP.ROTATION_SPEED,
      0 // TODO: Roll with keys
    );
    const worldTorque = torque.applyQuaternion(quat);

    body.applyTorqueImpulse(
      { x: worldTorque.x, y: worldTorque.y, z: worldTorque.z },
      true
    );

    // Update engine glow based on thrust
    const thrustMagnitude = Math.abs(input.thrust.z);
    this.engineGlow.intensity = thrustMagnitude * (this.boosting ? 3 : 1);

    // Weapon heat cooldown
    if (this.weaponHeat > 0) {
      this.weaponHeat = Math.max(0, this.weaponHeat - SHIP.HEAT_COOLDOWN_RATE * dt);
    }
  }

  syncFromPhysics() {
    const pos = this.rigidBody.translation();
    const rot = this.rigidBody.rotation();

    this.mesh.position.set(pos.x, pos.y, pos.z);
    this.mesh.quaternion.set(rot.x, rot.y, rot.z, rot.w);

    // Update camera to follow ship (third person for now, will add cockpit view)
    const cameraWorldOffset = this.cameraOffset.clone().applyQuaternion(this.mesh.quaternion);
    this.camera.position.copy(this.mesh.position).add(cameraWorldOffset);

    const lookTarget = this.lookOffset.clone().applyQuaternion(this.mesh.quaternion);
    this.camera.lookAt(this.mesh.position.clone().add(lookTarget));
  }

  update(dt: number) {
    // Update particles, effects, etc.
    this.updateThrustParticles(dt);
  }

  private updateThrustParticles(dt: number) {
    const positions = this.thrustParticles.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      // Move particles backward
      positions[i + 2] += dt * 10;

      // Reset particles that are too far
      if (positions[i + 2] > 5) {
        positions[i] = (Math.random() - 0.5) * 0.5;
        positions[i + 1] = (Math.random() - 0.5) * 0.5;
        positions[i + 2] = 2.5 + Math.random();
      }
    }

    this.thrustParticles.geometry.attributes.position.needsUpdate = true;
  }

  getState(): ShipState {
    const vel = this.rigidBody.linvel();
    const pos = this.rigidBody.translation();

    return {
      speed: Math.sqrt(vel.x * vel.x + vel.y * vel.y + vel.z * vel.z),
      health: this.health,
      shield: this.shield,
      boostAvailable: this.boostCooldown <= 0,
      boostCooldown: Math.max(0, this.boostCooldown),
      weaponHeat: this.weaponHeat,
      position: new THREE.Vector3(pos.x, pos.y, pos.z),
      velocity: new THREE.Vector3(vel.x, vel.y, vel.z),
    };
  }

  getPosition(): THREE.Vector3 {
    const pos = this.rigidBody.translation();
    return new THREE.Vector3(pos.x, pos.y, pos.z);
  }
}
