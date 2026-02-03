// TextMonument - A word rendered as a 3D monument in space

import * as THREE from 'three';

export interface TextMonumentOptions {
  isLink?: boolean;
  linkDirection?: 'up' | 'down';
  scale?: number;
  emissive?: boolean;
  color?: number;
}

export class TextMonument {
  mesh: THREE.Group;
  private text: string;
  private options: TextMonumentOptions;
  private letterMeshes: THREE.Mesh[] = [];
  private time = 0;

  constructor(text: string, position: THREE.Vector3, options: TextMonumentOptions = {}) {
    this.text = text;
    this.options = {
      isLink: false,
      scale: 1,
      emissive: false,
      color: 0xffffff,
      ...options,
    };

    this.mesh = new THREE.Group();
    this.mesh.position.copy(position);

    this.createLetters();
  }

  private createLetters() {
    const { scale, isLink, linkDirection, emissive } = this.options;

    // Determine color based on type
    let color = 0x888888; // Default gray
    let emissiveColor = 0x000000;
    let emissiveIntensity = 0;

    if (isLink) {
      if (linkDirection === 'up') {
        color = 0x4488ff; // Blue for up links
        emissiveColor = 0x2244aa;
        emissiveIntensity = 0.5;
      } else {
        color = 0xff8844; // Orange for down links
        emissiveColor = 0xaa4422;
        emissiveIntensity = 0.5;
      }
    }

    if (emissive) {
      color = 0x00ff00;
      emissiveColor = 0x00ff00;
      emissiveIntensity = 1;
    }

    const letterSpacing = 1.2 * scale!;
    const letterHeight = 2 * scale!;
    const letterDepth = 0.5 * scale!;

    // Create each letter as a 3D box with the letter texture
    // For now, use simple boxes - will upgrade to proper text geometry
    this.text.split('').forEach((char, index) => {
      if (char === ' ') return;

      const geometry = new THREE.BoxGeometry(
        0.8 * scale!,
        letterHeight,
        letterDepth
      );

      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: emissiveColor,
        emissiveIntensity,
        metalness: 0.3,
        roughness: 0.7,
      });

      const letterMesh = new THREE.Mesh(geometry, material);
      letterMesh.position.x = index * letterSpacing - (this.text.length * letterSpacing) / 2;

      // Add slight random rotation for visual interest
      letterMesh.rotation.y = (Math.random() - 0.5) * 0.1;
      letterMesh.rotation.z = (Math.random() - 0.5) * 0.05;

      this.letterMeshes.push(letterMesh);
      this.mesh.add(letterMesh);

      // Add a label sprite for the actual letter
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = emissive ? '#00ff00' : (isLink ? (linkDirection === 'up' ? '#88ccff' : '#ffcc88') : '#ffffff');
      ctx.font = 'bold 48px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(char.toUpperCase(), 32, 32);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(scale! * 1.5, scale! * 1.5, 1);
      sprite.position.z = letterDepth / 2 + 0.1;
      letterMesh.add(sprite);
    });
  }

  update(dt: number) {
    this.time += dt;

    // Subtle floating animation for link monuments
    if (this.options.isLink) {
      this.letterMeshes.forEach((mesh, i) => {
        mesh.position.y = Math.sin(this.time * 2 + i * 0.3) * 0.2;
      });
    }
  }

  setHighlighted(highlighted: boolean) {
    this.letterMeshes.forEach(mesh => {
      const material = mesh.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = highlighted ? 1 : (this.options.isLink ? 0.5 : 0);
    });
  }

  getText(): string {
    return this.text;
  }

  dispose() {
    this.letterMeshes.forEach(mesh => {
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
    });
  }
}
