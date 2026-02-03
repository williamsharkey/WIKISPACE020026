// Starfield background - infinite stars that follow the camera

import * as THREE from 'three';

export class Starfield {
  private scene: THREE.Scene;
  private stars: THREE.Points;
  private starCount = 5000;
  private spread = 2000;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.stars = this.createStars();
    this.scene.add(this.stars);
  }

  private createStars(): THREE.Points {
    const positions = new Float32Array(this.starCount * 3);
    const colors = new Float32Array(this.starCount * 3);
    const sizes = new Float32Array(this.starCount);

    for (let i = 0; i < this.starCount; i++) {
      // Random position in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = this.spread * (0.5 + Math.random() * 0.5);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Color variation - dark colors for light mode (black/dark gray/dark blue)
      const colorChoice = Math.random();
      if (colorChoice < 0.6) {
        // Dark gray
        colors[i * 3] = 0.2;
        colors[i * 3 + 1] = 0.2;
        colors[i * 3 + 2] = 0.25;
      } else if (colorChoice < 0.8) {
        // Dark blue
        colors[i * 3] = 0.1;
        colors[i * 3 + 1] = 0.15;
        colors[i * 3 + 2] = 0.3;
      } else {
        // Black
        colors[i * 3] = 0.1;
        colors[i * 3 + 1] = 0.1;
        colors[i * 3 + 2] = 0.1;
      }

      // Size variation
      sizes[i] = 0.5 + Math.random() * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      // Normal blending for light mode (dark stars on light background)
      blending: THREE.NormalBlending,
    });

    return new THREE.Points(geometry, material);
  }

  update(cameraPosition: THREE.Vector3) {
    // Move starfield with camera so it appears infinite
    this.stars.position.copy(cameraPosition);
  }
}
