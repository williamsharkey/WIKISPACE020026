// Heads-up display - speed, health, crosshair

import type { ShipState } from '../ships/Ship';

export class HUD {
  private container: HTMLElement;
  private speedElement: HTMLElement;
  private healthBar: HTMLElement;
  private shieldBar: HTMLElement;
  private boostIndicator: HTMLElement;
  private crosshair: HTMLElement;
  private positionElement: HTMLElement;

  constructor() {
    this.container = this.createHUD();
    document.body.appendChild(this.container);

    this.speedElement = document.getElementById('hud-speed')!;
    this.healthBar = document.getElementById('hud-health-fill')!;
    this.shieldBar = document.getElementById('hud-shield-fill')!;
    this.boostIndicator = document.getElementById('hud-boost')!;
    this.crosshair = document.getElementById('hud-crosshair')!;
    this.positionElement = document.getElementById('hud-position')!;
  }

  private createHUD(): HTMLElement {
    const container = document.createElement('div');
    container.id = 'hud';
    container.innerHTML = `
      <style>
        #hud {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          font-family: 'Courier New', monospace;
          color: #0f0;
          text-shadow: 0 0 10px #0f0;
        }

        #hud-crosshair {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 24px;
          opacity: 0.8;
        }

        #hud-stats {
          position: absolute;
          bottom: 20px;
          left: 20px;
        }

        #hud-speed {
          font-size: 32px;
          margin-bottom: 10px;
        }

        .hud-bar {
          width: 200px;
          height: 12px;
          background: rgba(0, 50, 0, 0.5);
          border: 1px solid #0f0;
          margin-bottom: 5px;
        }

        .hud-bar-fill {
          height: 100%;
          transition: width 0.1s;
        }

        #hud-health-fill {
          background: linear-gradient(90deg, #f00, #ff0);
          width: 100%;
        }

        #hud-shield-fill {
          background: linear-gradient(90deg, #00f, #0ff);
          width: 100%;
        }

        #hud-boost {
          margin-top: 10px;
          font-size: 14px;
          opacity: 0.5;
        }

        #hud-boost.ready {
          opacity: 1;
          color: #0ff;
          text-shadow: 0 0 10px #0ff;
        }

        #hud-position {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 12px;
          opacity: 0.7;
          text-align: right;
        }

        #hud-title {
          position: absolute;
          top: 20px;
          left: 20px;
          font-size: 14px;
          letter-spacing: 4px;
          opacity: 0.5;
        }
      </style>

      <div id="hud-title">WIKISPACE020026</div>

      <div id="hud-crosshair">+</div>

      <div id="hud-stats">
        <div id="hud-speed">0</div>
        <div class="hud-bar"><div class="hud-bar-fill" id="hud-health-fill"></div></div>
        <div class="hud-bar"><div class="hud-bar-fill" id="hud-shield-fill"></div></div>
        <div id="hud-boost">[ BOOST READY ]</div>
      </div>

      <div id="hud-position">
        <div>X: 0</div>
        <div>Y: 0</div>
        <div>Z: 0</div>
      </div>
    `;

    return container;
  }

  update(state: ShipState) {
    // Speed
    this.speedElement.textContent = Math.floor(state.speed).toString().padStart(3, '0');

    // Health & Shield bars
    this.healthBar.style.width = `${state.health}%`;
    this.shieldBar.style.width = `${(state.shield / 50) * 100}%`;

    // Boost indicator
    if (state.boostAvailable) {
      this.boostIndicator.textContent = '[ BOOST READY ]';
      this.boostIndicator.classList.add('ready');
    } else {
      const cooldown = Math.ceil(state.boostCooldown);
      this.boostIndicator.textContent = `[ BOOST ${cooldown}s ]`;
      this.boostIndicator.classList.remove('ready');
    }

    // Position
    this.positionElement.innerHTML = `
      <div>X: ${Math.floor(state.position.x)}</div>
      <div>Y: ${Math.floor(state.position.y)}</div>
      <div>Z: ${Math.floor(state.position.z)}</div>
    `;
  }
}
