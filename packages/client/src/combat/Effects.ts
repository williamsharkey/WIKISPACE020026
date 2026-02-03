// Combat visual effects - explosions, hits, trails

import * as THREE from 'three';

export interface Explosion {
  particles: THREE.Points;
  lifetime: number;
  maxLifetime: number;
}

export class CombatEffects {
  private scene: THREE.Scene;
  private explosions: Explosion[] = [];

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  createExplosion(position: THREE.Vector3, color: number = 0xffaa00, size: number = 1): void {
    const particleCount = 30;
    const positions = new Float32Array(particleCount * 3);
    const velocities: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = position.x;
      positions[i * 3 + 1] = position.y;
      positions[i * 3 + 2] = position.z;

      // Random outward velocity
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 20 * size,
          (Math.random() - 0.5) * 20 * size,
          (Math.random() - 0.5) * 20 * size
        )
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    (geometry as any).velocities = velocities;

    const material = new THREE.PointsMaterial({
      color,
      size: 0.5 * size,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    this.scene.add(particles);

    this.explosions.push({
      particles,
      lifetime: 1,
      maxLifetime: 1,
    });
  }

  createHitSpark(position: THREE.Vector3): void {
    this.createExplosion(position, 0x00ffff, 0.3);
  }

  createLetterDestruction(position: THREE.Vector3, letter: string): void {
    this.createExplosion(position, 0x3366cc, 0.5);
    // TODO: Could spawn flying letter fragments
  }

  update(dt: number): void {
    for (let i = this.explosions.length - 1; i >= 0; i--) {
      const explosion = this.explosions[i];

      explosion.lifetime -= dt;

      if (explosion.lifetime <= 0) {
        this.scene.remove(explosion.particles);
        explosion.particles.geometry.dispose();
        (explosion.particles.material as THREE.Material).dispose();
        this.explosions.splice(i, 1);
        continue;
      }

      // Update particle positions
      const positions = explosion.particles.geometry.attributes.position.array as Float32Array;
      const velocities = (explosion.particles.geometry as any).velocities as THREE.Vector3[];

      for (let j = 0; j < velocities.length; j++) {
        positions[j * 3] += velocities[j].x * dt;
        positions[j * 3 + 1] += velocities[j].y * dt;
        positions[j * 3 + 2] += velocities[j].z * dt;

        // Slow down
        velocities[j].multiplyScalar(0.95);
      }

      explosion.particles.geometry.attributes.position.needsUpdate = true;

      // Fade out
      const progress = explosion.lifetime / explosion.maxLifetime;
      (explosion.particles.material as THREE.PointsMaterial).opacity = progress;
    }
  }

  dispose(): void {
    this.explosions.forEach(e => {
      this.scene.remove(e.particles);
      e.particles.geometry.dispose();
      (e.particles.material as THREE.Material).dispose();
    });
    this.explosions = [];
  }
}
