// Mod NPC - Patrol, aggro, can be destroyed or pilled

import * as THREE from 'three';
import { MOD } from '@wikispace/shared';

export type ModState = 'neutral' | 'red' | 'blue';
export type ModBehavior = 'patrol' | 'chase' | 'attack' | 'being_pilled';

export class Mod {
  mesh: THREE.Group;
  private state: ModState = 'neutral';
  private behavior: ModBehavior = 'patrol';
  private health = MOD.MAX_HEALTH;

  // Patrol
  private patrolCenter: THREE.Vector3;
  private patrolRadius = 30;
  private patrolAngle = 0;
  private patrolHeight = 5;

  // Combat
  private target: THREE.Vector3 | null = null;
  private aggroTarget: string | null = null;

  // Pilling
  private pillProgress = 0;
  private pillingTeam: 'red' | 'blue' | null = null;

  // Visuals
  private bodyMesh!: THREE.Mesh;
  private glowRing!: THREE.Mesh;
  private eyeMesh!: THREE.Mesh;
  private auraParticles!: THREE.Points;

  private time = 0;

  constructor(position: THREE.Vector3, id: string) {
    this.mesh = new THREE.Group();
    this.mesh.position.copy(position);
    this.mesh.userData.id = id;
    this.patrolCenter = position.clone();

    this.createMesh();
  }

  private createMesh() {
    // Main body - bureaucratic cube with rounded edges (using box for now)
    const bodyGeometry = new THREE.BoxGeometry(2, 3, 2);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: 0.5,
      roughness: 0.3,
    });
    this.bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    this.mesh.add(this.bodyMesh);

    // "M" insignia on front
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#ffff00';
    ctx.font = 'bold 48px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('M', 32, 32);

    const texture = new THREE.CanvasTexture(canvas);
    const insigniaMaterial = new THREE.SpriteMaterial({ map: texture });
    const insignia = new THREE.Sprite(insigniaMaterial);
    insignia.scale.set(1.5, 1.5, 1);
    insignia.position.z = 1.1;
    this.mesh.add(insignia);

    // Glowing eye
    const eyeGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const eyeMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.8,
    });
    this.eyeMesh = new THREE.Mesh(eyeGeometry, eyeMaterial);
    this.eyeMesh.position.set(0, 0.8, 1);
    this.mesh.add(this.eyeMesh);

    // Eye glow
    const eyeGlow = new THREE.PointLight(0xff0000, 0.5, 5);
    eyeGlow.position.copy(this.eyeMesh.position);
    this.mesh.add(eyeGlow);

    // Rotating ring around body
    const ringGeometry = new THREE.TorusGeometry(1.8, 0.1, 8, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      transparent: true,
      opacity: 0.6,
    });
    this.glowRing = new THREE.Mesh(ringGeometry, ringMaterial);
    this.glowRing.rotation.x = Math.PI / 2;
    this.mesh.add(this.glowRing);

    // Aura particles (for pilled state)
    this.createAuraParticles();
  }

  private createAuraParticles() {
    const count = 30;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 2 + Math.random();
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = Math.sin(theta) * r;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffff00,
      size: 0.3,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });

    this.auraParticles = new THREE.Points(geometry, material);
    this.mesh.add(this.auraParticles);
  }

  update(dt: number, playerPosition: THREE.Vector3, playerTeam: 'red' | 'blue') {
    this.time += dt;

    // Update behavior based on state
    switch (this.behavior) {
      case 'patrol':
        this.updatePatrol(dt, playerPosition);
        break;
      case 'chase':
        this.updateChase(dt, playerPosition);
        break;
      case 'being_pilled':
        this.updateBeingPilled(dt);
        break;
    }

    // Visual updates
    this.updateVisuals(dt);

    // Check aggro
    if (this.behavior === 'patrol' && this.state === 'neutral') {
      const distance = this.mesh.position.distanceTo(playerPosition);
      if (distance < MOD.AGGRO_RANGE) {
        // Small chance to aggro
        if (Math.random() < 0.01) {
          this.behavior = 'chase';
          this.target = playerPosition.clone();
        }
      }
    }
  }

  private updatePatrol(dt: number, playerPosition: THREE.Vector3) {
    // Circle around patrol center
    this.patrolAngle += dt * 0.5;
    const targetX = this.patrolCenter.x + Math.cos(this.patrolAngle) * this.patrolRadius;
    const targetZ = this.patrolCenter.z + Math.sin(this.patrolAngle) * this.patrolRadius;
    const targetY = this.patrolCenter.y + Math.sin(this.patrolAngle * 2) * this.patrolHeight;

    const target = new THREE.Vector3(targetX, targetY, targetZ);
    const direction = target.clone().sub(this.mesh.position).normalize();

    this.mesh.position.add(direction.multiplyScalar(MOD.PATROL_SPEED * dt));

    // Face movement direction
    this.mesh.lookAt(target);
  }

  private updateChase(dt: number, playerPosition: THREE.Vector3) {
    if (!this.target) {
      this.behavior = 'patrol';
      return;
    }

    // Move toward player
    const direction = playerPosition.clone().sub(this.mesh.position).normalize();
    this.mesh.position.add(direction.multiplyScalar(MOD.PATROL_SPEED * 1.5 * dt));
    this.mesh.lookAt(playerPosition);

    // Return to patrol if too far from center
    if (this.mesh.position.distanceTo(this.patrolCenter) > this.patrolRadius * 3) {
      this.behavior = 'patrol';
      this.target = null;
    }
  }

  private updateBeingPilled(dt: number) {
    // Slow rotation while being pilled
    this.mesh.rotation.y += dt * 2;
  }

  private updateVisuals(dt: number) {
    // Rotate ring
    this.glowRing.rotation.z += dt;

    // Pulse eye
    const eyePulse = 0.8 + Math.sin(this.time * 5) * 0.2;
    (this.eyeMesh.material as THREE.MeshBasicMaterial).opacity = eyePulse;

    // Bob up and down slightly
    this.bodyMesh.position.y = Math.sin(this.time * 2) * 0.2;

    // Update colors based on state
    this.updateStateColors();

    // Update aura particles
    if (this.state !== 'neutral') {
      const material = this.auraParticles.material as THREE.PointsMaterial;
      material.opacity = 0.6;

      const positions = this.auraParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += dt * 2;
        if (positions[i + 1] > 2) positions[i + 1] = -2;
      }
      this.auraParticles.geometry.attributes.position.needsUpdate = true;
    } else {
      (this.auraParticles.material as THREE.PointsMaterial).opacity = 0;
    }

    // Pill progress visual
    if (this.pillProgress > 0) {
      this.glowRing.scale.setScalar(1 + this.pillProgress * 0.5);
      (this.glowRing.material as THREE.MeshBasicMaterial).opacity = 0.6 + this.pillProgress * 0.4;
    }
  }

  private updateStateColors() {
    let bodyColor = 0x888888;
    let eyeColor = 0xff0000;
    let ringColor = 0xffff00;
    let auraColor = 0xffff00;

    switch (this.state) {
      case 'red':
        bodyColor = 0x884444;
        eyeColor = 0xff4444;
        ringColor = 0xff0000;
        auraColor = 0xff0000;
        break;
      case 'blue':
        bodyColor = 0x444488;
        eyeColor = 0x4444ff;
        ringColor = 0x0000ff;
        auraColor = 0x0000ff;
        break;
    }

    (this.bodyMesh.material as THREE.MeshStandardMaterial).color.setHex(bodyColor);
    (this.eyeMesh.material as THREE.MeshBasicMaterial).color.setHex(eyeColor);
    (this.glowRing.material as THREE.MeshBasicMaterial).color.setHex(ringColor);
    (this.auraParticles.material as THREE.PointsMaterial).color.setHex(auraColor);
  }

  // Pilling mechanic
  startPilling(team: 'red' | 'blue') {
    if (this.state === team) return; // Already on this team
    this.pillingTeam = team;
    this.behavior = 'being_pilled';
  }

  continuePilling(dt: number, team: 'red' | 'blue'): boolean {
    if (this.pillingTeam !== team) {
      this.pillProgress = 0;
      this.pillingTeam = team;
    }

    this.pillProgress += dt / MOD.PILL_TIME;

    if (this.pillProgress >= 1) {
      this.completePilling(team);
      return true;
    }

    return false;
  }

  stopPilling() {
    this.pillProgress = Math.max(0, this.pillProgress - 0.5);
    if (this.pillProgress <= 0) {
      this.pillingTeam = null;
      this.behavior = 'patrol';
    }
  }

  private completePilling(team: 'red' | 'blue') {
    this.state = team;
    this.pillProgress = 0;
    this.pillingTeam = null;
    this.behavior = 'patrol';
  }

  // Damage
  takeDamage(amount: number): boolean {
    this.health -= amount;
    if (this.health <= 0) {
      return true; // Destroyed
    }
    return false;
  }

  // Getters
  getState(): ModState {
    return this.state;
  }

  getHealth(): number {
    return this.health;
  }

  getPillProgress(): number {
    return this.pillProgress;
  }

  isBeingPilled(): boolean {
    return this.behavior === 'being_pilled';
  }

  dispose() {
    this.mesh.traverse(child => {
      if ((child as THREE.Mesh).geometry) {
        (child as THREE.Mesh).geometry.dispose();
      }
      if ((child as THREE.Mesh).material) {
        const mat = (child as THREE.Mesh).material;
        if (Array.isArray(mat)) mat.forEach(m => m.dispose());
        else mat.dispose();
      }
    });
  }
}
