// Weapon system - projectiles and firing

import * as THREE from 'three';
import { WEAPON } from '@wikispace/shared';

export interface ProjectileData {
  id: string;
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  lifetime: number;
  damage: number;
}

export class Weapon {
  private scene: THREE.Scene;
  private projectiles: ProjectileData[] = [];
  private heat = 0;
  private lastFireTime = 0;

  // Projectile pool for performance
  private projectilePool: THREE.Mesh[] = [];
  private poolSize = 50;

  // Shared geometry and material
  private projectileGeometry: THREE.BufferGeometry;
  private projectileMaterial: THREE.MeshBasicMaterial;

  constructor(scene: THREE.Scene) {
    this.scene = scene;

    // Create shared projectile geometry (elongated for laser look)
    this.projectileGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 8);
    this.projectileGeometry.rotateX(Math.PI / 2);

    this.projectileMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.9,
    });

    // Pre-create projectile pool
    for (let i = 0; i < this.poolSize; i++) {
      const mesh = new THREE.Mesh(this.projectileGeometry, this.projectileMaterial.clone());
      mesh.visible = false;
      this.scene.add(mesh);
      this.projectilePool.push(mesh);
    }
  }

  fire(position: THREE.Vector3, direction: THREE.Vector3, quaternion: THREE.Quaternion): boolean {
    const now = performance.now();
    const fireInterval = 1000 / WEAPON.FIRE_RATE;

    // Check fire rate
    if (now - this.lastFireTime < fireInterval) {
      return false;
    }

    // Check heat
    if (this.heat >= WEAPON.MAX_HEAT) {
      return false;
    }

    this.lastFireTime = now;
    this.heat += WEAPON.HEAT_PER_SHOT;

    // Get projectile from pool
    const mesh = this.getFromPool();
    if (!mesh) return false;

    // Position projectile
    mesh.position.copy(position);
    mesh.quaternion.copy(quaternion);
    mesh.visible = true;

    // Add glow effect
    const material = mesh.material as THREE.MeshBasicMaterial;
    material.color.setHex(0x00ffff);

    // Calculate velocity
    const velocity = direction.clone().normalize().multiplyScalar(WEAPON.PROJECTILE_SPEED);

    this.projectiles.push({
      id: `proj-${now}-${Math.random()}`,
      mesh,
      velocity,
      lifetime: 3, // seconds
      damage: WEAPON.PROJECTILE_DAMAGE,
    });

    return true;
  }

  update(dt: number): void {
    // Cool down weapon
    if (this.heat > 0) {
      this.heat = Math.max(0, this.heat - WEAPON.HEAT_COOLDOWN_RATE * dt);
    }

    // Update projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const proj = this.projectiles[i];

      // Move projectile
      proj.mesh.position.add(proj.velocity.clone().multiplyScalar(dt));

      // Decrease lifetime
      proj.lifetime -= dt;

      // Remove dead projectiles
      if (proj.lifetime <= 0) {
        this.returnToPool(proj.mesh);
        this.projectiles.splice(i, 1);
      }
    }
  }

  checkCollision(position: THREE.Vector3, radius: number): ProjectileData | null {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const proj = this.projectiles[i];
      if (proj.mesh.position.distanceTo(position) < radius) {
        // Remove projectile on hit
        this.returnToPool(proj.mesh);
        this.projectiles.splice(i, 1);
        return proj;
      }
    }
    return null;
  }

  getHeat(): number {
    return this.heat;
  }

  isOverheated(): boolean {
    return this.heat >= WEAPON.MAX_HEAT;
  }

  private getFromPool(): THREE.Mesh | null {
    for (const mesh of this.projectilePool) {
      if (!mesh.visible) {
        return mesh;
      }
    }
    return null;
  }

  private returnToPool(mesh: THREE.Mesh): void {
    mesh.visible = false;
  }

  dispose(): void {
    this.projectileGeometry.dispose();
    this.projectileMaterial.dispose();
    this.projectilePool.forEach(mesh => {
      (mesh.material as THREE.Material).dispose();
    });
  }
}
