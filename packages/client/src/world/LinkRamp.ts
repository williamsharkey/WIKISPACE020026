// LinkRamp - A traversable ramp that takes you to another article

import * as THREE from 'three';

export class LinkRamp {
  mesh: THREE.Group;
  readonly target: string;
  readonly direction: 'up' | 'down';
  private particles: THREE.Points;
  private time = 0;
  private glowRing: THREE.Mesh;

  constructor(position: THREE.Vector3, target: string, direction: 'up' | 'down') {
    this.target = target;
    this.direction = direction;
    this.mesh = new THREE.Group();
    this.mesh.position.copy(position);

    // Create ramp geometry
    const rampLength = 15;
    const rampWidth = 6;
    const rampHeight = direction === 'up' ? 8 : -8;

    // Main ramp surface
    const rampGeometry = new THREE.BoxGeometry(rampWidth, 0.5, rampLength);
    const rampMaterial = new THREE.MeshStandardMaterial({
      color: direction === 'up' ? 0x4488ff : 0xff8844,
      emissive: direction === 'up' ? 0x2244aa : 0xaa4422,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.7,
    });

    const ramp = new THREE.Mesh(rampGeometry, rampMaterial);
    ramp.rotation.x = Math.atan2(rampHeight, rampLength);
    ramp.position.z = -rampLength / 2;
    ramp.position.y = rampHeight / 2;
    this.mesh.add(ramp);

    // Portal ring at the end
    const ringGeometry = new THREE.TorusGeometry(3, 0.3, 16, 32);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: direction === 'up' ? 0x88ccff : 0xffcc88,
      emissive: direction === 'up' ? 0x4488ff : 0xff8844,
      emissiveIntensity: 1,
    });
    this.glowRing = new THREE.Mesh(ringGeometry, ringMaterial);
    this.glowRing.position.z = -rampLength;
    this.glowRing.position.y = rampHeight;
    this.glowRing.rotation.y = Math.PI / 2;
    this.mesh.add(this.glowRing);

    // Particle trail
    this.particles = this.createParticles(direction);
    this.mesh.add(this.particles);

    // Label with target article name
    this.addLabel(target, rampLength, rampHeight);

    // Arrow indicators along the ramp
    this.addArrows(direction, rampLength, rampWidth, rampHeight);
  }

  private createParticles(direction: 'up' | 'down'): THREE.Points {
    const count = 100;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = Math.random() * (direction === 'up' ? 8 : -8);
      positions[i * 3 + 2] = -Math.random() * 15;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: direction === 'up' ? 0x88ccff : 0xffcc88,
      size: 0.3,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    return new THREE.Points(geometry, material);
  }

  private addLabel(target: string, rampLength: number, rampHeight: number) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = this.direction === 'up' ? '#88ccff' : '#ffcc88';
    ctx.font = 'bold 32px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const displayText = `→ ${target.substring(0, 30)}${target.length > 30 ? '...' : ''}`;
    ctx.fillText(displayText, 256, 32);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(15, 2, 1);
    sprite.position.z = -rampLength - 5;
    sprite.position.y = rampHeight + 3;
    this.mesh.add(sprite);
  }

  private addArrows(direction: 'up' | 'down', length: number, width: number, height: number) {
    const arrowCount = 5;
    const arrowGeometry = new THREE.ConeGeometry(0.3, 1, 4);
    arrowGeometry.rotateX(direction === 'up' ? -Math.PI / 2 : Math.PI / 2);

    const arrowMaterial = new THREE.MeshStandardMaterial({
      color: direction === 'up' ? 0x88ccff : 0xffcc88,
      emissive: direction === 'up' ? 0x4488ff : 0xff8844,
      emissiveIntensity: 0.8,
    });

    for (let i = 0; i < arrowCount; i++) {
      const t = i / (arrowCount - 1);
      const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
      arrow.position.z = -t * length;
      arrow.position.y = t * height + 1;
      this.mesh.add(arrow);
    }
  }

  update(dt: number) {
    this.time += dt;

    // Rotate the portal ring
    this.glowRing.rotation.x = this.time * 2;

    // Animate particles flowing along the ramp
    const positions = this.particles.geometry.attributes.position.array as Float32Array;
    const speed = this.direction === 'up' ? 5 : -5;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 2] -= dt * 10; // Move toward portal
      positions[i + 1] += dt * speed; // Move up or down

      // Reset particles that exit
      if (positions[i + 2] < -15) {
        positions[i + 2] = 0;
        positions[i + 1] = 0;
        positions[i] = (Math.random() - 0.5) * 4;
      }
    }

    this.particles.geometry.attributes.position.needsUpdate = true;

    // Pulse the glow ring
    const material = this.glowRing.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = 0.5 + Math.sin(this.time * 3) * 0.5;
  }

  isPlayerInRange(playerPosition: THREE.Vector3): boolean {
    return this.mesh.position.distanceTo(playerPosition) < 5;
  }

  getExitPosition(): THREE.Vector3 {
    return new THREE.Vector3(
      this.mesh.position.x,
      this.mesh.position.y + (this.direction === 'up' ? 10 : -10),
      this.mesh.position.z - 20
    );
  }

  dispose() {
    this.mesh.traverse(child => {
      if ((child as THREE.Mesh).geometry) {
        (child as THREE.Mesh).geometry.dispose();
      }
      if ((child as THREE.Mesh).material) {
        const material = (child as THREE.Mesh).material;
        if (Array.isArray(material)) {
          material.forEach(m => m.dispose());
        } else {
          material.dispose();
        }
      }
    });
  }
}
