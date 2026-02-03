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
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        #main-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #f8f9fa;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 10000;
          font-family: 'IBM Plex Mono', 'Consolas', monospace;
        }

        #main-menu.hidden {
          display: none;
        }

        .menu-title {
          font-size: 36px;
          color: #202122;
          letter-spacing: 4px;
          margin-bottom: 5px;
          font-weight: 500;
        }

        .menu-year {
          font-size: 18px;
          color: #54595d;
          margin-bottom: 30px;
          letter-spacing: 8px;
        }

        .menu-tagline {
          color: #54595d;
          font-size: 12px;
          margin-bottom: 40px;
          max-width: 550px;
          text-align: center;
          line-height: 1.8;
        }

        .menu-name-input {
          margin-bottom: 30px;
        }

        .menu-name-input label {
          color: #54595d;
          font-size: 10px;
          display: block;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .menu-name-input input {
          background: #fff;
          border: 1px solid #a2a9b1;
          color: #202122;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 16px;
          padding: 12px 20px;
          width: 280px;
          text-align: center;
          outline: none;
        }

        .menu-name-input input:focus {
          border-color: #3366cc;
          box-shadow: 0 0 0 2px rgba(51, 102, 204, 0.2);
        }

        .menu-teams {
          display: flex;
          gap: 30px;
          margin-bottom: 40px;
        }

        .team-btn {
          width: 220px;
          height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border: 1px solid #a2a9b1;
          transition: all 0.2s;
          background: #fff;
          padding: 20px;
        }

        .team-btn:hover {
          border-color: #3366cc;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .team-btn.red {
          border-top: 3px solid #c33;
        }

        .team-btn.red:hover {
          background: #fff8f8;
        }

        .team-btn.blue {
          border-top: 3px solid #3366cc;
        }

        .team-btn.blue:hover {
          background: #f8f9ff;
        }

        .team-name {
          font-size: 16px;
          margin-bottom: 12px;
          font-weight: 600;
          letter-spacing: 2px;
        }

        .team-btn.red .team-name {
          color: #c33;
        }

        .team-btn.blue .team-name {
          color: #3366cc;
        }

        .team-philosophy {
          font-size: 10px;
          color: #72777d;
          text-align: center;
          line-height: 1.6;
        }

        .menu-controls {
          color: #72777d;
          font-size: 10px;
          margin-top: 30px;
          text-align: center;
          line-height: 1.8;
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
