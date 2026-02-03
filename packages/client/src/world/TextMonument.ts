// TextMonument - A word rendered as a massive Hollywood-sign style monument in space
// Letters always face the viewer (billboard style)

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
  private letterSprites: THREE.Sprite[] = [];
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
    this.mesh.userData.id = `monument-${Math.random().toString(36).substr(2, 9)}`;

    this.createLetters();
  }

  private createLetters() {
    const { scale, isLink, linkDirection, emissive } = this.options;

    // Much larger letters - Hollywood sign style
    const letterSize = 8 * scale!;
    const letterSpacing = 5 * scale!;

    // Determine color based on type
    let textColor = '#ffffff';
    let glowColor = 'rgba(255, 255, 255, 0.3)';

    if (isLink) {
      if (linkDirection === 'up') {
        textColor = '#88ccff';
        glowColor = 'rgba(68, 136, 255, 0.5)';
      } else {
        textColor = '#ffcc88';
        glowColor = 'rgba(255, 136, 68, 0.5)';
      }
    }

    if (emissive) {
      textColor = '#6699ff';
      glowColor = 'rgba(51, 102, 204, 0.6)';
    }

    // Create each letter as a billboard sprite
    const chars = this.text.split('');
    const totalWidth = chars.length * letterSpacing;

    chars.forEach((char, index) => {
      if (char === ' ') return;

      // Create canvas for the letter
      const canvas = document.createElement('canvas');
      const size = 256; // High resolution for crisp text
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d')!;

      // Glow effect
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 30;

      // Draw letter
      ctx.fillStyle = textColor;
      ctx.font = `bold ${size * 0.7}px "IBM Plex Mono", Consolas, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Draw multiple times for glow buildup
      for (let i = 0; i < 3; i++) {
        ctx.fillText(char.toUpperCase(), size / 2, size / 2);
      }

      // Create sprite material
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;

      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(letterSize, letterSize, 1);

      // Position letter in the word
      sprite.position.x = (index * letterSpacing) - (totalWidth / 2) + (letterSpacing / 2);

      // Slight vertical variation for organic feel
      sprite.position.y = Math.sin(index * 0.5) * 0.5;

      this.letterSprites.push(sprite);
      this.mesh.add(sprite);
    });

    // Add a subtle backing glow for the whole word
    if (isLink) {
      this.addWordGlow(totalWidth, letterSize, linkDirection === 'up' ? 0x4488ff : 0xff8844);
    }
  }

  private addWordGlow(width: number, height: number, color: number) {
    const glowGeometry = new THREE.PlaneGeometry(width + 4, height + 2);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.z = -0.5;
    this.mesh.add(glow);
  }

  update(dt: number) {
    this.time += dt;

    // Subtle floating animation for link monuments
    if (this.options.isLink) {
      this.letterSprites.forEach((sprite, i) => {
        sprite.position.y = Math.sin(this.time * 1.5 + i * 0.3) * 0.8;
      });
    }
  }

  // Make the whole word group face a target (usually camera)
  lookAt(target: THREE.Vector3) {
    // Get direction to target
    const direction = new THREE.Vector3();
    direction.subVectors(target, this.mesh.position).normalize();

    // Only rotate on Y axis to keep text upright
    const angle = Math.atan2(direction.x, direction.z);
    this.mesh.rotation.y = angle;
  }

  setHighlighted(highlighted: boolean) {
    this.letterSprites.forEach(sprite => {
      const material = sprite.material as THREE.SpriteMaterial;
      material.opacity = highlighted ? 1.2 : 1;
    });
  }

  getText(): string {
    return this.text;
  }

  dispose() {
    this.letterSprites.forEach(sprite => {
      (sprite.material as THREE.SpriteMaterial).map?.dispose();
      (sprite.material as THREE.SpriteMaterial).dispose();
    });
  }
}
