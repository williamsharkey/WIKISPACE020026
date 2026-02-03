// ASCIIRenderer - Renders the game as a 1995 Notepad.exe text document

import { ASCII } from '@wikispace/shared';

export interface ASCIIEntity {
  char: string;
  x: number;
  y: number;
  color?: string;
}

export interface ASCIIWorldState {
  playerX: number;
  playerY: number;
  playerDirection: 'up' | 'down' | 'left' | 'right';
  enemies: { x: number; y: number }[];
  mods: { x: number; y: number; state: 'neutral' | 'red' | 'blue' }[];
  projectiles: { x: number; y: number; direction: 'h' | 'v' | 'd1' | 'd2' }[];
  words: { text: string; x: number; y: number; isLink: boolean }[];
}

export class ASCIIRenderer {
  private container: HTMLElement;
  private canvas: HTMLElement;
  private grid: string[][];
  private cols = ASCII.GRID_COLS;
  private rows = ASCII.GRID_ROWS;

  private cursorBlink = true;
  private blinkInterval: number | null = null;

  constructor() {
    this.grid = this.createEmptyGrid();
    this.container = this.createNotepadWindow();
    document.body.appendChild(this.container);
    this.canvas = document.getElementById('ascii-canvas')!;
    this.hide();
  }

  private createEmptyGrid(): string[][] {
    const grid: string[][] = [];
    for (let y = 0; y < this.rows; y++) {
      grid[y] = [];
      for (let x = 0; x < this.cols; x++) {
        grid[y][x] = ' ';
      }
    }
    return grid;
  }

  private createNotepadWindow(): HTMLElement {
    const container = document.createElement('div');
    container.id = 'ascii-mode';
    container.innerHTML = `
      <style>
        #ascii-mode {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #c0c0c0;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          font-family: 'Courier New', Courier, monospace;
        }

        #ascii-mode.hidden {
          display: none;
        }

        .notepad-window {
          background: #ffffff;
          border: 2px solid #000;
          box-shadow: 2px 2px 0 #808080;
          width: 90%;
          max-width: 1000px;
          height: 85%;
        }

        .notepad-titlebar {
          background: linear-gradient(90deg, #000080, #1084d0);
          color: white;
          padding: 2px 4px;
          font-size: 12px;
          font-weight: bold;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .notepad-title {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .notepad-icon {
          width: 16px;
          height: 16px;
          background: #fff;
          border: 1px solid #000;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .notepad-buttons {
          display: flex;
          gap: 2px;
        }

        .notepad-btn {
          width: 16px;
          height: 14px;
          background: #c0c0c0;
          border: 1px outset #fff;
          font-size: 10px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .notepad-menubar {
          background: #c0c0c0;
          border-bottom: 1px solid #808080;
          padding: 2px 0;
          font-size: 12px;
        }

        .notepad-menu-item {
          display: inline-block;
          padding: 2px 8px;
          cursor: pointer;
        }

        .notepad-menu-item:hover {
          background: #000080;
          color: white;
        }

        .notepad-menu-item u {
          text-decoration: underline;
        }

        .notepad-content {
          height: calc(100% - 50px);
          overflow: hidden;
          background: #ffffff;
        }

        #ascii-canvas {
          font-family: 'Courier New', Courier, monospace;
          font-size: 12px;
          line-height: 1.2;
          white-space: pre;
          padding: 4px;
          color: #000;
          height: 100%;
          overflow: auto;
        }

        .notepad-statusbar {
          background: #c0c0c0;
          border-top: 1px solid #808080;
          padding: 2px 4px;
          font-size: 11px;
          display: flex;
          justify-content: space-between;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .cursor-char {
          animation: blink 1s infinite;
        }
      </style>

      <div class="notepad-window">
        <div class="notepad-titlebar">
          <div class="notepad-title">
            <div class="notepad-icon">W</div>
            <span>WIKISPACE.TXT - Notepad</span>
          </div>
          <div class="notepad-buttons">
            <div class="notepad-btn">_</div>
            <div class="notepad-btn">□</div>
            <div class="notepad-btn">×</div>
          </div>
        </div>
        <div class="notepad-menubar">
          <span class="notepad-menu-item"><u>F</u>ile</span>
          <span class="notepad-menu-item"><u>E</u>dit</span>
          <span class="notepad-menu-item">F<u>o</u>rmat</span>
          <span class="notepad-menu-item"><u>V</u>iew</span>
          <span class="notepad-menu-item"><u>H</u>elp</span>
        </div>
        <div class="notepad-content">
          <div id="ascii-canvas"></div>
        </div>
        <div class="notepad-statusbar">
          <span>Ln 1, Col 1</span>
          <span>020026</span>
        </div>
      </div>
    `;
    return container;
  }

  show() {
    this.container.classList.remove('hidden');
    this.startBlinking();
  }

  hide() {
    this.container.classList.add('hidden');
    this.stopBlinking();
  }

  isVisible(): boolean {
    return !this.container.classList.contains('hidden');
  }

  private startBlinking() {
    if (this.blinkInterval) return;
    this.blinkInterval = window.setInterval(() => {
      this.cursorBlink = !this.cursorBlink;
    }, 500);
  }

  private stopBlinking() {
    if (this.blinkInterval) {
      clearInterval(this.blinkInterval);
      this.blinkInterval = null;
    }
  }

  render(state: ASCIIWorldState) {
    // Clear grid
    this.grid = this.createEmptyGrid();

    // Draw border
    this.drawBorder();

    // Draw words (the article text)
    state.words.forEach(word => {
      const gridX = Math.round(word.x);
      const gridY = Math.round(word.y);
      this.drawText(word.text, gridX, gridY, word.isLink);
    });

    // Draw mods
    state.mods.forEach(mod => {
      const x = Math.round(mod.x);
      const y = Math.round(mod.y);
      let char = ASCII.CHAR_MOD_NEUTRAL;
      if (mod.state === 'red') char = ASCII.CHAR_MOD_RED;
      if (mod.state === 'blue') char = ASCII.CHAR_MOD_BLUE;
      this.setChar(x, y, char);
    });

    // Draw projectiles
    state.projectiles.forEach(proj => {
      const x = Math.round(proj.x);
      const y = Math.round(proj.y);
      let char = ASCII.CHAR_PROJECTILE_H;
      if (proj.direction === 'v') char = ASCII.CHAR_PROJECTILE_V;
      if (proj.direction === 'd1') char = ASCII.CHAR_PROJECTILE_D1;
      if (proj.direction === 'd2') char = ASCII.CHAR_PROJECTILE_D2;
      this.setChar(x, y, char);
    });

    // Draw enemies
    state.enemies.forEach(enemy => {
      const x = Math.round(enemy.x);
      const y = Math.round(enemy.y);
      this.setChar(x, y, ASCII.CHAR_ENEMY);
    });

    // Draw player (with direction indicator)
    const px = Math.round(state.playerX);
    const py = Math.round(state.playerY);
    let playerChar = ASCII.CHAR_PLAYER_UP;
    switch (state.playerDirection) {
      case 'down': playerChar = ASCII.CHAR_PLAYER_DOWN; break;
      case 'left': playerChar = ASCII.CHAR_PLAYER_LEFT; break;
      case 'right': playerChar = ASCII.CHAR_PLAYER_RIGHT; break;
    }
    this.setChar(px, py, this.cursorBlink ? playerChar : '_');

    // Render to DOM
    this.canvas.textContent = this.gridToString();
  }

  private drawBorder() {
    // Top border
    this.setChar(0, 0, '┌');
    this.setChar(this.cols - 1, 0, '┐');
    for (let x = 1; x < this.cols - 1; x++) {
      this.setChar(x, 0, '─');
    }

    // Bottom border
    this.setChar(0, this.rows - 1, '└');
    this.setChar(this.cols - 1, this.rows - 1, '┘');
    for (let x = 1; x < this.cols - 1; x++) {
      this.setChar(x, this.rows - 1, '─');
    }

    // Side borders
    for (let y = 1; y < this.rows - 1; y++) {
      this.setChar(0, y, '│');
      this.setChar(this.cols - 1, y, '│');
    }
  }

  private drawText(text: string, x: number, y: number, isLink: boolean) {
    const prefix = isLink ? '[' : '';
    const suffix = isLink ? ']' : '';
    const fullText = prefix + text + suffix;

    for (let i = 0; i < fullText.length; i++) {
      this.setChar(x + i, y, fullText[i]);
    }
  }

  private setChar(x: number, y: number, char: string) {
    if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
      this.grid[y][x] = char;
    }
  }

  private gridToString(): string {
    return this.grid.map(row => row.join('')).join('\n');
  }

  // Convert 3D world coordinates to ASCII grid coordinates
  worldToGrid(worldX: number, worldY: number, worldZ: number): { x: number; y: number } {
    // Map 3D space to 2D grid (top-down view)
    // worldX -> gridX, worldZ -> gridY (Y is up in 3D, so we use Z for depth)
    const gridX = Math.floor((worldX + 200) / 400 * this.cols);
    const gridY = Math.floor((worldZ + 200) / 400 * this.rows);
    return {
      x: Math.max(1, Math.min(this.cols - 2, gridX)),
      y: Math.max(1, Math.min(this.rows - 2, gridY))
    };
  }

  getGridSize(): { cols: number; rows: number } {
    return { cols: this.cols, rows: this.rows };
  }
}
