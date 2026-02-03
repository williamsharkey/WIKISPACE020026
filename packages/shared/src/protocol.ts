// Network protocol message types

import type { Vector3, Quaternion, Team, Player, Projectile, ArticleState, PlayerStats } from './types';

// Client -> Server messages
export type ClientMessage =
  | { type: 'join'; name: string; team: Team }
  | { type: 'input'; input: PlayerInput }
  | { type: 'fire' }
  | { type: 'pill_start'; modId: string }
  | { type: 'pill_stop' }
  | { type: 'traverse_link'; wordId: string }
  | { type: 'edit_submit'; edits: WordEdit[] }
  | { type: 'chat'; message: string };

export interface PlayerInput {
  thrust: Vector3;      // -1 to 1 for each axis
  rotation: Vector3;    // pitch, yaw, roll input
  boost: boolean;
  fire: boolean;
}

export interface WordEdit {
  wordId: string;
  newText: string;
}

// Server -> Client messages
export type ServerMessage =
  | { type: 'welcome'; playerId: string; state: GameSnapshot }
  | { type: 'player_joined'; player: Player }
  | { type: 'player_left'; playerId: string }
  | { type: 'state_update'; state: GameSnapshot }
  | { type: 'player_killed'; killerId: string; victimId: string }
  | { type: 'edit_available'; playerId: string; wordLimit: number }
  | { type: 'edit_applied'; edits: AppliedEdit[] }
  | { type: 'article_changed'; playerId: string; newArticle: string; spawnPosition: Vector3 }
  | { type: 'match_end'; winner: Team; stats: PlayerStats[] }
  | { type: 'chat'; playerId: string; message: string }
  | { type: 'level_up'; playerId: string; field: string; oldValue: any; newValue: any };

export interface GameSnapshot {
  tick: number;
  players: SerializedPlayer[];
  projectiles: Projectile[];
  article: ArticleState;
  scores: { red: number; blue: number };
  timeRemaining: number;
}

export interface SerializedPlayer {
  id: string;
  name: string;
  team: Team;
  position: Vector3;
  rotation: Quaternion;
  velocity: Vector3;
  health: number;
  shield: number;
}

export interface AppliedEdit {
  wordId: string;
  oldText: string;
  newText: string;
  team: Team;
  playerName: string;
}
