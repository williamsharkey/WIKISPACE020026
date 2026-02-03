// Game constants

export const GAME = {
  TICK_RATE: 60,
  NETWORK_TICK_RATE: 20,
  MATCH_DURATION: 600, // 10 minutes
} as const;

export const SHIP = {
  MAX_HEALTH: 100,
  MAX_SHIELD: 50,
  THRUST_FORCE: 50,
  STRAFE_FORCE: 30,
  ROTATION_SPEED: 3,
  MAX_SPEED: 100,
  BOOST_MULTIPLIER: 2.5,
  BOOST_DURATION: 2,
  BOOST_COOLDOWN: 5,
  DRAG: 0.98,
  ANGULAR_DRAG: 0.95,
} as const;

export const WEAPON = {
  PROJECTILE_SPEED: 200,
  PROJECTILE_DAMAGE: 10,
  FIRE_RATE: 5, // per second
  HEAT_PER_SHOT: 0.1,
  HEAT_COOLDOWN_RATE: 0.2,
  MAX_HEAT: 1,
} as const;

export const MOD = {
  MAX_HEALTH: 75,
  PILL_TIME: 3, // seconds to convert
  RESPAWN_TIME: 30,
  PATROL_SPEED: 20,
  AGGRO_RANGE: 50,
  ATTACK_RANGE: 30,
} as const;

export const ARTICLE = {
  CONTROL_RATE: 0.1, // per second when conditions met
  EDIT_WORD_LIMIT: 10,
  EDIT_TIME_LIMIT: 30, // seconds to complete edit
  WORD_RESPAWN_TIME: 60,
} as const;

export const POINTS = {
  KILL: 100,
  DEATH: 0,
  MOD_DESTROY: 25,
  MOD_PILL: 50,
  WORD_DESTROY: 5,
  EDIT_COMPLETE: 200,
  LINK_TRAVERSE: 10,
  ARTICLE_CONTROL_TICK: 1, // per second
} as const;

export const ASCII = {
  GRID_COLS: 120,
  GRID_ROWS: 40,
  CHAR_PLAYER_UP: '^',
  CHAR_PLAYER_DOWN: 'v',
  CHAR_PLAYER_LEFT: '<',
  CHAR_PLAYER_RIGHT: '>',
  CHAR_ENEMY: '@',
  CHAR_MOD_NEUTRAL: 'M',
  CHAR_MOD_RED: 'R',
  CHAR_MOD_BLUE: 'B',
  CHAR_PROJECTILE_H: '-',
  CHAR_PROJECTILE_V: '|',
  CHAR_PROJECTILE_D1: '/',
  CHAR_PROJECTILE_D2: '\\',
} as const;
