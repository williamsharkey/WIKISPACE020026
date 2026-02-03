// VictoryScreen - Download your soul as JSON

import type { PlayerStats } from '@wikispace/shared';

export class VictoryScreen {
  private container: HTMLElement;
  private content: HTMLElement;
  private downloadBtn: HTMLElement;
  private currentStats: PlayerStats | null = null;

  constructor() {
    this.container = this.createScreen();
    this.content = document.getElementById('victory-json')!;
    this.downloadBtn = document.getElementById('victory-download')!;
    document.body.appendChild(this.container);
    this.hide();

    this.downloadBtn.addEventListener('click', () => this.downloadJSON());
  }

  private createScreen(): HTMLElement {
    const container = document.createElement('div');
    container.id = 'victory-screen';
    container.innerHTML = `
      <style>
        #victory-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 4000;
          font-family: 'Courier New', monospace;
        }

        #victory-screen.hidden {
          display: none;
        }

        .victory-header {
          color: #0f0;
          font-size: 32px;
          margin-bottom: 20px;
          text-shadow: 0 0 20px #0f0;
          letter-spacing: 8px;
        }

        .victory-subheader {
          color: #0a0;
          font-size: 14px;
          margin-bottom: 30px;
          opacity: 0.8;
        }

        .victory-window {
          background: #ffffff;
          border: 2px solid #000;
          box-shadow: 4px 4px 0 #808080;
          width: 700px;
          max-height: 60%;
        }

        .victory-titlebar {
          background: linear-gradient(90deg, #000080, #1084d0);
          color: white;
          padding: 2px 4px;
          font-size: 12px;
          font-weight: bold;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .victory-content {
          height: 400px;
          overflow: auto;
          background: #ffffff;
          padding: 8px;
          font-size: 11px;
          line-height: 1.3;
          white-space: pre-wrap;
          color: #000;
        }

        #victory-download {
          margin-top: 30px;
          padding: 15px 40px;
          font-family: 'Courier New', monospace;
          font-size: 16px;
          background: #000;
          color: #0f0;
          border: 2px solid #0f0;
          cursor: pointer;
          transition: all 0.2s;
        }

        #victory-download:hover {
          background: #0f0;
          color: #000;
          box-shadow: 0 0 20px #0f0;
        }

        .victory-quote {
          margin-top: 30px;
          color: #0a0;
          font-size: 12px;
          font-style: italic;
          opacity: 0.6;
          max-width: 500px;
          text-align: center;
        }
      </style>

      <div class="victory-header">VICTORY</div>
      <div class="victory-subheader">Your existence has been preserved.</div>

      <div class="victory-window">
        <div class="victory-titlebar">
          <span id="victory-filename">pilot_data.json - Notepad</span>
          <span>×</span>
        </div>
        <div class="victory-content">
          <pre id="victory-json"></pre>
        </div>
      </div>

      <button id="victory-download">[ Download pilot_data.json ]</button>

      <div class="victory-quote">
        "You were always just a JSON file being edited by forces beyond your comprehension.<br>
        But at least now you have a copy."
      </div>
    `;
    return container;
  }

  show(stats: PlayerStats, matchResult: 'victory' | 'defeat') {
    this.currentStats = stats;

    // Update filename
    const filename = document.getElementById('victory-filename')!;
    filename.textContent = `pilot_${stats.pilot}.json`;

    // Update download button
    this.downloadBtn.textContent = `[ Download pilot_${stats.pilot}.json ]`;

    // Update header based on result
    const header = this.container.querySelector('.victory-header') as HTMLElement;
    if (matchResult === 'defeat') {
      header.textContent = 'DEFEAT';
      header.style.color = '#f00';
      header.style.textShadow = '0 0 20px #f00';
    } else {
      header.textContent = 'VICTORY';
      header.style.color = '#0f0';
      header.style.textShadow = '0 0 20px #0f0';
    }

    // Format the JSON with full stats
    const fullStats = {
      pilot: stats.pilot,
      team: stats.team,
      result: matchResult.toUpperCase(),
      match_id: `020026-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      timestamp: new Date().toISOString().replace(/\d{4}/, '020026'),
      level: stats.level,
      xp: stats.xp,
      stats: {
        kills: stats.kills,
        deaths: stats.deaths,
        edits: stats.edits,
        words_changed: stats.wordsChanged,
        mods_pilled: stats.modsPilled,
        mods_destroyed: stats.modsDestroyed,
        articles_visited: stats.articlesVisited,
        links_traversed: stats.linksTraversed
      },
      unlocks: stats.unlocks,
      edit_history: stats.editHistory.slice(0, 20).map(e => ({
        article: e.article,
        word: e.word,
        changed_to: e.changedTo
      }))
    };

    this.content.textContent = JSON.stringify(fullStats, null, 2);
    this.container.classList.remove('hidden');
  }

  hide() {
    this.container.classList.add('hidden');
  }

  private downloadJSON() {
    if (!this.currentStats) return;

    const fullStats = {
      pilot: this.currentStats.pilot,
      team: this.currentStats.team,
      match_id: `020026-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      timestamp: new Date().toISOString().replace(/\d{4}/, '020026'),
      level: this.currentStats.level,
      xp: this.currentStats.xp,
      stats: {
        kills: this.currentStats.kills,
        deaths: this.currentStats.deaths,
        edits: this.currentStats.edits,
        words_changed: this.currentStats.wordsChanged,
        mods_pilled: this.currentStats.modsPilled,
        mods_destroyed: this.currentStats.modsDestroyed,
        articles_visited: this.currentStats.articlesVisited,
        links_traversed: this.currentStats.linksTraversed
      },
      unlocks: this.currentStats.unlocks,
      edit_history: this.currentStats.editHistory
    };

    const json = JSON.stringify(fullStats, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `pilot_${this.currentStats.pilot}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
