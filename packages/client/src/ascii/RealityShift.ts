// RealityShift - Manages transitions between 3D and ASCII modes

import { ASCIIRenderer, ASCIIWorldState } from './ASCIIRenderer';
import * as THREE from 'three';

export type RealityMode = '3d' | 'ascii' | 'transitioning';

export interface TransitionConfig {
  duration: number;
  type: 'glitch' | 'fade' | 'collapse';
}

export class RealityShift {
  private asciiRenderer: ASCIIRenderer;
  private mode: RealityMode = '3d';
  private transitionProgress = 0;
  private transitionDirection: 'to-ascii' | 'to-3d' | null = null;

  private glitchOverlay: HTMLElement;
  private scanlines: HTMLElement;

  // Random shift triggers
  private timeSinceLastShift = 0;
  private minTimeBetweenShifts = 30; // seconds
  private shiftChancePerSecond = 0.02; // 2% chance per second after min time
  private asciiDuration = 5; // seconds in ASCII mode

  private asciiTimer = 0;
  private forcedShift = false;

  constructor() {
    this.asciiRenderer = new ASCIIRenderer();
    this.glitchOverlay = this.createGlitchOverlay();
    this.scanlines = this.createScanlines();
    document.body.appendChild(this.glitchOverlay);
    document.body.appendChild(this.scanlines);
  }

  private createGlitchOverlay(): HTMLElement {
    const overlay = document.createElement('div');
    overlay.id = 'glitch-overlay';
    overlay.innerHTML = `
      <style>
        #glitch-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1999;
          opacity: 0;
          background: white;
          mix-blend-mode: difference;
        }

        #glitch-overlay.active {
          animation: glitch-flash 0.1s ease-out;
        }

        @keyframes glitch-flash {
          0% { opacity: 0; }
          20% { opacity: 1; }
          40% { opacity: 0; }
          60% { opacity: 0.5; }
          80% { opacity: 0; }
          100% { opacity: 0; }
        }
      </style>
    `;
    return overlay;
  }

  private createScanlines(): HTMLElement {
    const scanlines = document.createElement('div');
    scanlines.id = 'scanlines';
    scanlines.innerHTML = `
      <style>
        #scanlines {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1998;
          opacity: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0.1) 1px,
            transparent 1px,
            transparent 2px
          );
        }

        #scanlines.active {
          opacity: 1;
          animation: scanline-move 0.5s linear;
        }

        @keyframes scanline-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }
      </style>
    `;
    return scanlines;
  }

  update(dt: number, worldState: ASCIIWorldState): void {
    this.timeSinceLastShift += dt;

    if (this.mode === '3d') {
      // Check for random shift
      if (!this.forcedShift && this.timeSinceLastShift > this.minTimeBetweenShifts) {
        if (Math.random() < this.shiftChancePerSecond * dt) {
          this.triggerShift();
        }
      }
    } else if (this.mode === 'ascii') {
      // Render ASCII view
      this.asciiRenderer.render(worldState);

      // Count down ASCII time
      this.asciiTimer -= dt;
      if (this.asciiTimer <= 0 && !this.forcedShift) {
        this.returnTo3D();
      }
    }

    // Handle transition
    if (this.transitionDirection) {
      this.transitionProgress += dt * 2; // 0.5 second transition

      if (this.transitionProgress >= 1) {
        this.completeTransition();
      }
    }
  }

  triggerShift(duration?: number): void {
    if (this.mode !== '3d') return;

    this.forcedShift = duration !== undefined;
    this.asciiTimer = duration ?? this.asciiDuration;
    this.transitionDirection = 'to-ascii';
    this.transitionProgress = 0;
    this.mode = 'transitioning';

    // Glitch effect
    this.glitchOverlay.classList.add('active');
    this.scanlines.classList.add('active');

    setTimeout(() => {
      this.glitchOverlay.classList.remove('active');
      this.scanlines.classList.remove('active');
    }, 500);
  }

  returnTo3D(): void {
    if (this.mode !== 'ascii') return;

    this.transitionDirection = 'to-3d';
    this.transitionProgress = 0;
    this.mode = 'transitioning';
    this.timeSinceLastShift = 0;

    // Glitch effect
    this.glitchOverlay.classList.add('active');

    setTimeout(() => {
      this.glitchOverlay.classList.remove('active');
    }, 300);
  }

  private completeTransition(): void {
    if (this.transitionDirection === 'to-ascii') {
      this.mode = 'ascii';
      this.asciiRenderer.show();
    } else if (this.transitionDirection === 'to-3d') {
      this.mode = '3d';
      this.asciiRenderer.hide();
      this.forcedShift = false;
    }

    this.transitionDirection = null;
    this.transitionProgress = 0;
  }

  getMode(): RealityMode {
    return this.mode;
  }

  isASCII(): boolean {
    return this.mode === 'ascii';
  }

  is3D(): boolean {
    return this.mode === '3d';
  }

  // Manual toggle for testing (press TAB)
  toggle(): void {
    if (this.mode === '3d') {
      this.triggerShift(10); // 10 seconds
    } else if (this.mode === 'ascii') {
      this.returnTo3D();
    }
  }

  // Convert 3D position to ASCII grid position
  worldToASCII(position: THREE.Vector3): { x: number; y: number } {
    return this.asciiRenderer.worldToGrid(position.x, position.y, position.z);
  }

  // Get current player direction from velocity
  getDirectionFromVelocity(velocity: THREE.Vector3): 'up' | 'down' | 'left' | 'right' {
    const absX = Math.abs(velocity.x);
    const absZ = Math.abs(velocity.z);

    if (absX > absZ) {
      return velocity.x > 0 ? 'right' : 'left';
    } else {
      return velocity.z > 0 ? 'down' : 'up';
    }
  }
}
