// Core game types

export type Team = 'red' | 'blue';
export type ModState = 'neutral' | 'red' | 'blue';

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Quaternion {
  x: number;
  y: number;
  z: number;
  w: number;
}

export interface Transform {
  position: Vector3;
  rotation: Quaternion;
  velocity: Vector3;
  angularVelocity: Vector3;
}

export interface Player {
  id: string;
  name: string;
  team: Team;
  transform: Transform;
  health: number;
  shield: number;
  boostCooldown: number;
  weaponHeat: number;
  currentArticle: string;
}

export interface Mod {
  id: string;
  state: ModState;
  transform: Transform;
  health: number;
  pillingProgress: number; // 0-1, who's pilling and how far
  pillingTeam: Team | null;
}

export interface Projectile {
  id: string;
  ownerId: string;
  team: Team;
  position: Vector3;
  velocity: Vector3;
  damage: number;
}

export interface ArticleWord {
  id: string;
  text: string;
  originalText: string;
  position: Vector3;
  isLink: boolean;
  linkTarget?: string;
  linkDirection?: 'up' | 'down'; // alphabetical relative to current
  isVoxelTrigger: boolean;
  voxelArt?: string;
  destroyed: boolean;
  editedBy?: Team;
}

export interface ArticleState {
  title: string;
  words: ArticleWord[];
  mods: Mod[];
  controllingTeam: Team | null;
  controlProgress: { red: number; blue: number };
}

export interface PlayerStats {
  pilot: string;
  team: Team;
  level: number;
  xp: number;
  kills: number;
  deaths: number;
  edits: number;
  wordsChanged: number;
  modsPilled: number;
  modsDestroyed: number;
  articlesVisited: number;
  linksTraversed: number;
  unlocks: string[];
  editHistory: EditRecord[];
}

export interface EditRecord {
  article: string;
  word: string;
  changedTo: string;
  timestamp: number;
}

export interface MatchState {
  id: string;
  players: Map<string, Player>;
  articles: Map<string, ArticleState>;
  projectiles: Projectile[];
  scores: { red: number; blue: number };
  timeRemaining: number;
}
