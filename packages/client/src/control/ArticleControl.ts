// ArticleControl - Track team control over articles

import { ARTICLE } from '@wikispace/shared';

export interface ControlState {
  controllingTeam: 'red' | 'blue' | null;
  redProgress: number;
  blueProgress: number;
  redPlayers: number;
  bluePlayers: number;
  redMods: number;
  blueMods: number;
}

export class ArticleControl {
  private redProgress = 0;
  private blueProgress = 0;
  private controllingTeam: 'red' | 'blue' | null = null;

  // Track presence
  private redPlayers = 0;
  private bluePlayers = 0;
  private redMods = 0;
  private blueMods = 0;
  private neutralMods = 0;

  update(dt: number): ControlState {
    // Determine who has advantage
    const redScore = this.redPlayers * 2 + this.redMods;
    const blueScore = this.bluePlayers * 2 + this.blueMods;

    if (redScore > blueScore && redScore > 0) {
      // Red is capturing
      this.redProgress += ARTICLE.CONTROL_RATE * dt;
      this.blueProgress = Math.max(0, this.blueProgress - ARTICLE.CONTROL_RATE * dt * 0.5);

      if (this.redProgress >= 1) {
        this.controllingTeam = 'red';
        this.redProgress = 1;
      }
    } else if (blueScore > redScore && blueScore > 0) {
      // Blue is capturing
      this.blueProgress += ARTICLE.CONTROL_RATE * dt;
      this.redProgress = Math.max(0, this.redProgress - ARTICLE.CONTROL_RATE * dt * 0.5);

      if (this.blueProgress >= 1) {
        this.controllingTeam = 'blue';
        this.blueProgress = 1;
      }
    } else {
      // Contested or empty - slow decay
      this.redProgress = Math.max(0, this.redProgress - ARTICLE.CONTROL_RATE * dt * 0.2);
      this.blueProgress = Math.max(0, this.blueProgress - ARTICLE.CONTROL_RATE * dt * 0.2);

      // Lose control if progress drops
      if (this.controllingTeam === 'red' && this.redProgress < 0.5) {
        this.controllingTeam = null;
      }
      if (this.controllingTeam === 'blue' && this.blueProgress < 0.5) {
        this.controllingTeam = null;
      }
    }

    return this.getState();
  }

  setPresence(players: { red: number; blue: number }, mods: { red: number; blue: number; neutral: number }) {
    this.redPlayers = players.red;
    this.bluePlayers = players.blue;
    this.redMods = mods.red;
    this.blueMods = mods.blue;
    this.neutralMods = mods.neutral;
  }

  getState(): ControlState {
    return {
      controllingTeam: this.controllingTeam,
      redProgress: this.redProgress,
      blueProgress: this.blueProgress,
      redPlayers: this.redPlayers,
      bluePlayers: this.bluePlayers,
      redMods: this.redMods,
      blueMods: this.blueMods,
    };
  }

  isControlledBy(team: 'red' | 'blue'): boolean {
    return this.controllingTeam === team;
  }

  // Called when a player kills an enemy - check if edit should be triggered
  checkEditTrigger(killerTeam: 'red' | 'blue'): boolean {
    return this.controllingTeam === killerTeam;
  }

  reset() {
    this.redProgress = 0;
    this.blueProgress = 0;
    this.controllingTeam = null;
  }
}
