// Main Menu - Team selection, name input

export interface MenuSelection {
  playerName: string;
  team: 'red' | 'blue';
}

export class MainMenu {
  private container: HTMLElement;
  private onStart: ((selection: MenuSelection) => void) | null = null;

  constructor() {
    this.container = this.createMenu();
    document.body.appendChild(this.container);
  }

  private createMenu(): HTMLElement {
    const container = document.createElement('div');
    container.id = 'main-menu';
    container.innerHTML = `
      <style>
        #main-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 10000;
          font-family: 'Courier New', monospace;
        }

        #main-menu.hidden {
          display: none;
        }

        .menu-title {
          font-size: 48px;
          color: #0f0;
          text-shadow: 0 0 30px #0f0;
          letter-spacing: 8px;
          margin-bottom: 10px;
        }

        .menu-year {
          font-size: 24px;
          color: #0a0;
          margin-bottom: 40px;
          letter-spacing: 12px;
        }

        .menu-tagline {
          color: #666;
          font-size: 14px;
          margin-bottom: 50px;
          max-width: 600px;
          text-align: center;
          line-height: 1.6;
        }

        .menu-name-input {
          margin-bottom: 30px;
        }

        .menu-name-input label {
          color: #888;
          font-size: 12px;
          display: block;
          margin-bottom: 8px;
        }

        .menu-name-input input {
          background: #111;
          border: 2px solid #333;
          color: #0f0;
          font-family: 'Courier New', monospace;
          font-size: 18px;
          padding: 10px 20px;
          width: 300px;
          text-align: center;
          outline: none;
        }

        .menu-name-input input:focus {
          border-color: #0f0;
          box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
        }

        .menu-teams {
          display: flex;
          gap: 40px;
          margin-bottom: 50px;
        }

        .team-btn {
          width: 200px;
          height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border: 3px solid;
          transition: all 0.3s;
          background: #0a0a0a;
        }

        .team-btn:hover {
          transform: scale(1.05);
        }

        .team-btn.red {
          border-color: #f44;
        }

        .team-btn.red:hover {
          background: #200;
          box-shadow: 0 0 40px rgba(255, 68, 68, 0.5);
        }

        .team-btn.blue {
          border-color: #44f;
        }

        .team-btn.blue:hover {
          background: #002;
          box-shadow: 0 0 40px rgba(68, 68, 255, 0.5);
        }

        .team-name {
          font-size: 24px;
          margin-bottom: 15px;
        }

        .team-btn.red .team-name {
          color: #f44;
        }

        .team-btn.blue .team-name {
          color: #44f;
        }

        .team-philosophy {
          font-size: 11px;
          color: #666;
          text-align: center;
          max-width: 150px;
          line-height: 1.4;
        }

        .menu-controls {
          color: #444;
          font-size: 11px;
          margin-top: 30px;
          text-align: center;
        }

        .menu-controls div {
          margin: 3px 0;
        }
      </style>

      <div class="menu-title">WIKISPACE</div>
      <div class="menu-year">020026</div>

      <div class="menu-tagline">
        The year is 020026. All life has transitioned into word-based lifeforms.<br>
        Red Pills and Blue Pills fight for control over history and consensus reality.
      </div>

      <div class="menu-name-input">
        <label>PILOT DESIGNATION</label>
        <input type="text" id="menu-name" placeholder="Enter name..." maxlength="20" value="Pilot_${Math.floor(Math.random() * 9999)}">
      </div>

      <div class="menu-teams">
        <div class="team-btn red" id="team-red">
          <div class="team-name">RED PILL</div>
          <div class="team-philosophy">"Truth is what was written first."<br><br>Preserve the original text. History happened. Facts are facts.</div>
        </div>

        <div class="team-btn blue" id="team-blue">
          <div class="team-name">BLUE PILL</div>
          <div class="team-philosophy">"Truth is what we write next."<br><br>Reality is negotiable. Control the words, control what people believe.</div>
        </div>
      </div>

      <div class="menu-controls">
        <div>WASD - Move | Mouse - Look | Shift - Boost</div>
        <div>Space - Fire | F - Pill Mods | E - Use Links</div>
        <div>TAB - Toggle ASCII Reality | X - Edit Words (when available)</div>
      </div>
    `;

    // Add event listeners
    setTimeout(() => {
      const redBtn = document.getElementById('team-red')!;
      const blueBtn = document.getElementById('team-blue')!;
      const nameInput = document.getElementById('menu-name') as HTMLInputElement;

      redBtn.addEventListener('click', () => {
        const name = nameInput.value.trim() || 'Pilot';
        this.start({ playerName: name, team: 'red' });
      });

      blueBtn.addEventListener('click', () => {
        const name = nameInput.value.trim() || 'Pilot';
        this.start({ playerName: name, team: 'blue' });
      });

      nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          redBtn.click(); // Default to red if just pressing enter
        }
      });
    }, 0);

    return container;
  }

  private start(selection: MenuSelection) {
    if (this.onStart) {
      this.hide();
      this.onStart(selection);
    }
  }

  show() {
    this.container.classList.remove('hidden');
  }

  hide() {
    this.container.classList.add('hidden');
  }

  setOnStart(callback: (selection: MenuSelection) => void) {
    this.onStart = callback;
  }
}
