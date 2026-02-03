// Heads-up display - Wikipedia aesthetic

import type { ShipState } from '../ships/Ship';
import type { ControlState } from '../control/ArticleControl';

export class HUD {
  private container: HTMLElement;
  private speedElement: HTMLElement;
  private healthBar: HTMLElement;
  private shieldBar: HTMLElement;
  private boostIndicator: HTMLElement;
  private crosshair: HTMLElement;
  private positionElement: HTMLElement;
  private articleElement: HTMLElement;
  private heatBar: HTMLElement;
  private controlBar: HTMLElement;
  private controlText: HTMLElement;
  private scoreElement: HTMLElement;
  private clickPrompt: HTMLElement;
  private warpIndicator: HTMLElement;

  constructor() {
    this.container = this.createHUD();
    document.body.appendChild(this.container);

    this.speedElement = document.getElementById('hud-speed')!;
    this.healthBar = document.getElementById('hud-health-fill')!;
    this.shieldBar = document.getElementById('hud-shield-fill')!;
    this.boostIndicator = document.getElementById('hud-boost')!;
    this.crosshair = document.getElementById('hud-crosshair')!;
    this.positionElement = document.getElementById('hud-position')!;
    this.articleElement = document.getElementById('hud-article')!;
    this.heatBar = document.getElementById('hud-heat-fill')!;
    this.controlBar = document.getElementById('hud-control-fill')!;
    this.controlText = document.getElementById('hud-control-text')!;
    this.scoreElement = document.getElementById('hud-score')!;
    this.clickPrompt = document.getElementById('hud-click-prompt')!;
    this.warpIndicator = document.getElementById('hud-warp')!;

    // Listen for pointer lock changes
    document.addEventListener('pointerlockchange', () => {
      if (document.pointerLockElement) {
        this.clickPrompt.classList.add('hidden');
      } else {
        this.clickPrompt.classList.remove('hidden');
      }
    });

    // Click on prompt requests pointer lock
    this.clickPrompt.addEventListener('click', () => {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        canvas.requestPointerLock();
      }
    });

    // Any key press also hides prompt and requests pointer lock
    document.addEventListener('keydown', (e) => {
      if (!this.clickPrompt.classList.contains('hidden')) {
        const canvas = document.querySelector('canvas');
        if (canvas) {
          canvas.requestPointerLock();
        }
      }
    }, { once: false });
  }

  private createHUD(): HTMLElement {
    const container = document.createElement('div');
    container.id = 'hud';
    container.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        #hud {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          font-family: 'IBM Plex Mono', 'Consolas', monospace;
          color: #fff;
        }

        #hud-crosshair {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 20px;
          opacity: 0.6;
          color: #fff;
        }

        #hud-stats {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.7);
          padding: 15px;
          border-left: 3px solid #3366cc;
        }

        #hud-speed {
          font-size: 28px;
          margin-bottom: 12px;
          font-weight: 500;
          color: #fff;
        }

        .hud-bar {
          width: 180px;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          margin-bottom: 4px;
        }

        .hud-bar-fill {
          height: 100%;
          transition: width 0.1s;
        }

        .hud-bar-label {
          font-size: 9px;
          opacity: 0.6;
          margin-bottom: 3px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        #hud-health-fill {
          background: #fff;
          width: 100%;
        }

        #hud-shield-fill {
          background: #3366cc;
          width: 100%;
        }

        #hud-heat-fill {
          background: linear-gradient(90deg, #3366cc, #c33);
          width: 0%;
        }

        #hud-boost {
          margin-top: 12px;
          font-size: 11px;
          opacity: 0.5;
        }

        #hud-boost.ready {
          opacity: 1;
          color: #3366cc;
        }

        #hud-position {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 10px;
          opacity: 0.5;
          text-align: right;
          background: rgba(0, 0, 0, 0.5);
          padding: 10px;
        }

        #hud-title {
          position: absolute;
          top: 20px;
          left: 20px;
          font-size: 11px;
          letter-spacing: 3px;
          opacity: 0.4;
          font-weight: 500;
        }

        #hud-article {
          position: absolute;
          top: 45px;
          left: 20px;
          font-size: 14px;
          color: #3366cc;
          max-width: 400px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          background: rgba(0, 0, 0, 0.7);
          padding: 8px 12px;
          border-left: 2px solid #3366cc;
        }

        #hud-controls {
          position: absolute;
          bottom: 20px;
          right: 20px;
          font-size: 9px;
          opacity: 0.4;
          text-align: right;
          line-height: 1.6;
        }

        #hud-control {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, 80px);
          text-align: center;
        }

        #hud-control-text {
          font-size: 10px;
          margin-bottom: 6px;
          opacity: 0.7;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .control-bar-container {
          width: 250px;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
        }

        #hud-control-fill {
          height: 100%;
          width: 50%;
          transition: all 0.3s;
        }

        #hud-score {
          position: absolute;
          top: 90px;
          left: 20px;
          font-size: 11px;
          background: rgba(0, 0, 0, 0.7);
          padding: 8px 12px;
        }

        .score-red {
          color: #c33;
        }

        .score-blue {
          color: #3366cc;
        }

        #hud-click-prompt {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: auto;
          cursor: pointer;
          background: rgba(0, 0, 0, 0.3);
        }

        #hud-click-prompt.hidden {
          display: none;
        }

        .click-prompt-box {
          background: rgba(0, 0, 0, 0.85);
          border: 2px solid #3366cc;
          padding: 30px 50px;
          animation: pulse-border 2s infinite;
        }

        @keyframes pulse-border {
          0%, 100% { border-color: #3366cc; }
          50% { border-color: #6699ff; }
        }

        .click-prompt-text {
          font-size: 16px;
          color: #fff;
          margin-bottom: 8px;
          letter-spacing: 4px;
        }

        .click-prompt-sub {
          font-size: 10px;
          color: #888;
          letter-spacing: 1px;
        }

        #hud-warp {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, 120px);
          text-align: center;
          opacity: 0;
          transition: opacity 0.3s;
        }

        #hud-warp.visible {
          opacity: 1;
        }

        .warp-box {
          background: rgba(51, 102, 204, 0.3);
          border: 2px solid #3366cc;
          padding: 12px 24px;
          animation: warp-pulse 1.5s infinite;
        }

        @keyframes warp-pulse {
          0%, 100% { border-color: #3366cc; box-shadow: 0 0 10px rgba(51, 102, 204, 0.3); }
          50% { border-color: #6699ff; box-shadow: 0 0 20px rgba(51, 102, 204, 0.6); }
        }

        .warp-key {
          font-size: 14px;
          color: #fff;
          margin-bottom: 4px;
        }

        .warp-target {
          font-size: 10px;
          color: #9cf;
          letter-spacing: 1px;
        }
      </style>

      <div id="hud-title">WIKISPACE 2626</div>
      <div id="hud-article">Loading...</div>

      <div id="hud-crosshair">+</div>

      <div id="hud-stats">
        <div id="hud-speed">000</div>
        <div class="hud-bar-label">Hull</div>
        <div class="hud-bar"><div class="hud-bar-fill" id="hud-health-fill"></div></div>
        <div class="hud-bar-label">Shield</div>
        <div class="hud-bar"><div class="hud-bar-fill" id="hud-shield-fill"></div></div>
        <div class="hud-bar-label">Heat</div>
        <div class="hud-bar"><div class="hud-bar-fill" id="hud-heat-fill"></div></div>
        <div id="hud-boost">[ BOOST READY ]</div>
      </div>

      <div id="hud-position">
        <div>X: 0</div>
        <div>Y: 0</div>
        <div>Z: 0</div>
      </div>

      <div id="hud-controls">
        <div>WASD Move | Mouse Look</div>
        <div>SHIFT Boost | E Link</div>
        <div>SPACE Fire | F Pill</div>
        <div>TAB Reality Shift</div>
      </div>

      <div id="hud-score">
        <span class="score-red">RED 0</span> / <span class="score-blue">BLUE 0</span>
      </div>

      <div id="hud-control">
        <div id="hud-control-text">Contested</div>
        <div class="control-bar-container">
          <div id="hud-control-fill"></div>
        </div>
      </div>

      <div id="hud-click-prompt">
        <div class="click-prompt-box">
          <div class="click-prompt-text">CLICK TO PLAY</div>
          <div class="click-prompt-sub">Mouse controls enabled on click</div>
        </div>
      </div>

      <div id="hud-warp">
        <div class="warp-box">
          <div class="warp-key">[ E ] WARP</div>
          <div class="warp-target" id="hud-warp-target"></div>
        </div>
      </div>
    `;

    return container;
  }

  update(
    state: ShipState,
    article?: string,
    weaponHeat: number = 0,
    controlState?: ControlState,
    score?: { red: number; blue: number },
    nearbyWarp?: { target: string; distance: number } | null
  ) {
    // Article name
    if (article) {
      this.articleElement.textContent = article.replace(/_/g, ' ');
    }
    // Speed
    this.speedElement.textContent = Math.floor(state.speed).toString().padStart(3, '0');

    // Health & Shield & Heat bars
    this.healthBar.style.width = `${state.health}%`;
    this.shieldBar.style.width = `${(state.shield / 50) * 100}%`;
    this.heatBar.style.width = `${weaponHeat * 100}%`;

    // Article control
    if (controlState) {
      const { controllingTeam, redProgress, blueProgress } = controlState;

      if (controllingTeam === 'red') {
        this.controlText.textContent = 'RED CONTROLLED';
        this.controlText.style.color = '#c33';
        this.controlBar.style.background = '#c33';
        this.controlBar.style.width = '100%';
      } else if (controllingTeam === 'blue') {
        this.controlText.textContent = 'BLUE CONTROLLED';
        this.controlText.style.color = '#3366cc';
        this.controlBar.style.background = '#3366cc';
        this.controlBar.style.width = '100%';
      } else {
        this.controlText.textContent = 'CONTESTED';
        this.controlText.style.color = '#888';
        const redPct = redProgress * 50;
        const bluePct = blueProgress * 50;
        this.controlBar.style.background = `linear-gradient(90deg, #c33 0%, #c33 ${redPct}%, #333 ${redPct}%, #333 ${100-bluePct}%, #3366cc ${100-bluePct}%, #3366cc 100%)`;
        this.controlBar.style.width = '100%';
      }
    }

    // Score
    if (score) {
      this.scoreElement.innerHTML = `<span class="score-red">RED ${score.red}</span> / <span class="score-blue">BLUE ${score.blue}</span>`;
    }

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

    // Warp indicator
    if (nearbyWarp && nearbyWarp.distance < 50) {
      this.warpIndicator.classList.add('visible');
      const targetEl = document.getElementById('hud-warp-target');
      if (targetEl) {
        targetEl.textContent = `→ ${nearbyWarp.target}`;
      }
    } else {
      this.warpIndicator.classList.remove('visible');
    }
  }
}
