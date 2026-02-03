// JSONLevelUp - Animated JSON save file editing for level-ups

import type { PlayerStats } from '@wikispace/shared';

interface JSONEdit {
  path: string;
  oldValue: any;
  newValue: any;
}

export class JSONLevelUp {
  private container: HTMLElement;
  private content: HTMLElement;
  private isActive = false;
  private animationQueue: (() => Promise<void>)[] = [];
  private currentStats: PlayerStats | null = null;

  constructor() {
    this.container = this.createWindow();
    this.content = document.getElementById('json-content')!;
    document.body.appendChild(this.container);
    this.hide();
  }

  private createWindow(): HTMLElement {
    const container = document.createElement('div');
    container.id = 'json-levelup';
    container.innerHTML = `
      <style>
        #json-levelup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 3000;
        }

        #json-levelup.hidden {
          display: none;
        }

        .json-window {
          background: #ffffff;
          border: 2px solid #000;
          box-shadow: 4px 4px 0 #808080;
          width: 600px;
          max-height: 80%;
        }

        .json-titlebar {
          background: linear-gradient(90deg, #000080, #1084d0);
          color: white;
          padding: 2px 4px;
          font-size: 12px;
          font-weight: bold;
          font-family: 'Segoe UI', Tahoma, sans-serif;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .json-title {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .json-icon {
          width: 16px;
          height: 16px;
          background: #fff;
          border: 1px solid #000;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .json-buttons {
          display: flex;
          gap: 2px;
        }

        .json-btn {
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

        .json-menubar {
          background: #c0c0c0;
          border-bottom: 1px solid #808080;
          padding: 2px 0;
          font-size: 12px;
          font-family: 'Segoe UI', Tahoma, sans-serif;
        }

        .json-menu-item {
          display: inline-block;
          padding: 2px 8px;
          cursor: pointer;
        }

        .json-menu-item:hover {
          background: #000080;
          color: white;
        }

        .json-menu-item.active {
          background: #000080;
          color: white;
        }

        .json-dropdown {
          position: absolute;
          background: #c0c0c0;
          border: 1px solid #808080;
          box-shadow: 2px 2px 0 #808080;
          display: none;
        }

        .json-dropdown.show {
          display: block;
        }

        .json-dropdown-item {
          padding: 4px 20px;
          cursor: pointer;
        }

        .json-dropdown-item:hover {
          background: #000080;
          color: white;
        }

        .json-content-area {
          height: 400px;
          overflow: auto;
          background: #ffffff;
          padding: 8px;
          font-family: 'Courier New', monospace;
          font-size: 13px;
          line-height: 1.4;
          white-space: pre-wrap;
        }

        #json-content {
          color: #000;
        }

        .json-cursor {
          background: #000;
          color: #fff;
          animation: json-blink 0.5s infinite;
        }

        @keyframes json-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .json-selected {
          background: #0000ff;
          color: #fff;
        }

        .json-statusbar {
          background: #c0c0c0;
          border-top: 1px solid #808080;
          padding: 2px 4px;
          font-size: 11px;
          font-family: 'Segoe UI', Tahoma, sans-serif;
        }
      </style>

      <div class="json-window">
        <div class="json-titlebar">
          <div class="json-title">
            <div class="json-icon">{}</div>
            <span id="json-filename">pilot_data.json - Notepad</span>
          </div>
          <div class="json-buttons">
            <div class="json-btn">_</div>
            <div class="json-btn">□</div>
            <div class="json-btn">×</div>
          </div>
        </div>
        <div class="json-menubar" id="json-menubar">
          <span class="json-menu-item" id="json-file-menu"><u>F</u>ile</span>
          <span class="json-menu-item"><u>E</u>dit</span>
          <span class="json-menu-item">F<u>o</u>rmat</span>
          <span class="json-menu-item"><u>V</u>iew</span>
          <span class="json-menu-item"><u>H</u>elp</span>
        </div>
        <div class="json-content-area">
          <div id="json-content"></div>
        </div>
        <div class="json-statusbar">
          <span>Saving changes...</span>
        </div>
      </div>
    `;
    return container;
  }

  show() {
    this.container.classList.remove('hidden');
    this.isActive = true;
  }

  hide() {
    this.container.classList.add('hidden');
    this.isActive = false;
  }

  async playLevelUp(stats: PlayerStats, edits: JSONEdit[]): Promise<void> {
    this.currentStats = stats;
    this.show();

    // Set filename
    const filename = document.getElementById('json-filename')!;
    filename.textContent = `pilot_${stats.pilot}.json - Notepad`;

    // Display initial JSON
    this.renderJSON(stats);

    // Wait a moment
    await this.sleep(500);

    // Animate each edit
    for (const edit of edits) {
      await this.animateEdit(edit);
    }

    // Animate File > Save
    await this.animateFileSave();

    // Close window
    await this.sleep(500);
    this.hide();
  }

  private renderJSON(obj: any, highlightPath?: string): void {
    const json = JSON.stringify(obj, null, 2);
    let html = this.escapeHtml(json);

    if (highlightPath) {
      // Highlight the specific value
      // This is simplified - in production we'd do proper JSON path tracking
    }

    this.content.innerHTML = html;
  }

  private async animateEdit(edit: JSONEdit): Promise<void> {
    // Find the value in the displayed JSON and animate changing it
    const stats = { ...this.currentStats! };

    // Navigate to the path and get positions
    const oldJSON = JSON.stringify(stats, null, 2);
    const oldValueStr = JSON.stringify(edit.oldValue);
    const newValueStr = JSON.stringify(edit.newValue);

    // Find position of old value
    const regex = new RegExp(`"${edit.path}":\\s*${this.escapeRegex(oldValueStr)}`);
    const match = oldJSON.match(regex);

    if (!match) {
      // Just update without animation
      this.setNestedValue(stats, edit.path, edit.newValue);
      this.currentStats = stats as PlayerStats;
      this.renderJSON(stats);
      return;
    }

    // Animate: show cursor moving, select, delete, type new value

    // Step 1: Show cursor at the value
    await this.sleep(300);

    // Step 2: Select the old value (highlight it)
    let html = this.escapeHtml(oldJSON);
    html = html.replace(
      this.escapeHtml(oldValueStr),
      `<span class="json-selected">${this.escapeHtml(oldValueStr)}</span>`
    );
    this.content.innerHTML = html;
    await this.sleep(400);

    // Step 3: Delete and start typing new value
    this.setNestedValue(stats, edit.path, edit.newValue);
    this.currentStats = stats as PlayerStats;

    // Type character by character
    const partialStats = { ...stats };
    const chars = newValueStr.split('');

    for (let i = 0; i <= chars.length; i++) {
      // Show partial value with cursor
      const partialValue = newValueStr.substring(0, i);
      const tempStats = { ...stats };

      // For numbers, show the partial number
      if (typeof edit.newValue === 'number') {
        this.setNestedValue(tempStats, edit.path, partialValue || 0);
      }

      const tempJSON = JSON.stringify(tempStats, null, 2);
      let tempHtml = this.escapeHtml(tempJSON);

      // Add cursor
      if (i < chars.length) {
        tempHtml = tempHtml.replace(
          this.escapeHtml(JSON.stringify(tempStats[edit.path as keyof typeof tempStats])),
          this.escapeHtml(partialValue) + '<span class="json-cursor"> </span>'
        );
      }

      this.content.innerHTML = tempHtml;
      await this.sleep(50 + Math.random() * 30); // Typing speed
    }

    // Final render
    this.renderJSON(stats);
    await this.sleep(200);
  }

  private async animateFileSave(): Promise<void> {
    const fileMenu = document.getElementById('json-file-menu')!;

    // Click File
    fileMenu.classList.add('active');
    await this.sleep(300);

    // Show dropdown (simulated)
    const dropdown = document.createElement('div');
    dropdown.className = 'json-dropdown show';
    dropdown.style.cssText = 'position: absolute; left: 0; top: 20px; min-width: 150px;';
    dropdown.innerHTML = `
      <div class="json-dropdown-item">New</div>
      <div class="json-dropdown-item">Open...</div>
      <div class="json-dropdown-item" id="save-item" style="background: #000080; color: white;">Save</div>
      <div class="json-dropdown-item">Save As...</div>
    `;
    fileMenu.style.position = 'relative';
    fileMenu.appendChild(dropdown);

    await this.sleep(400);

    // Click Save
    const saveItem = document.getElementById('save-item')!;
    saveItem.style.background = '#fff';
    saveItem.style.color = '#000';
    await this.sleep(100);
    saveItem.style.background = '#000080';
    saveItem.style.color = '#fff';

    await this.sleep(300);

    // Remove dropdown
    dropdown.remove();
    fileMenu.classList.remove('active');
  }

  private setNestedValue(obj: any, path: string, value: any): void {
    // Simple single-level path for now
    obj[path] = value;
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  private escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Call this when player levels up
  async onLevelUp(stats: PlayerStats, changes: { field: string; oldValue: any; newValue: any }[]): Promise<void> {
    const edits: JSONEdit[] = changes.map(c => ({
      path: c.field,
      oldValue: c.oldValue,
      newValue: c.newValue
    }));

    await this.playLevelUp(stats, edits);
  }
}
