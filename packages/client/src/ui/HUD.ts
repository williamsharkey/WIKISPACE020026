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
      </style>

      <div id="hud-title">WIKISPACE 020026</div>
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
    `;

    return container;
  }

  update(
    state: ShipState,
    article?: string,
    weaponHeat: number = 0,
    controlState?: ControlState,
    score?: { red: number; blue: number }
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
  }
}
