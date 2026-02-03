# WIKISPACE020026 - Implementation Plan

## Project Overview

A multiplayer space combat game where Wikipedia articles become 3D worlds, words become monuments, and links become dimensional ramps between planes of existence.

## Phase 1: Foundation (Core Engine)

### 1.1 Project Setup
- [ ] Initialize Node.js monorepo (npm workspaces)
- [ ] Set up TypeScript configuration
- [ ] Configure Vite for client bundling
- [ ] Set up ESLint + Prettier
- [ ] Create basic folder structure

### 1.2 Three.js Core
- [ ] Initialize Three.js scene, camera, renderer
- [ ] Set up WebGL context with post-processing (bloom for space feel)
- [ ] Create space skybox with stars/nebula
- [ ] Implement basic game loop (fixed timestep physics, variable render)
- [ ] Set up Rapier physics world (WASM)

### 1.3 Ship & Flight Physics
- [ ] Create ship mesh (start with simple geometry, upgrade later)
- [ ] Implement 6DOF flight model with Rapier
- [ ] Add thrust vectors (forward, strafe, vertical)
- [ ] Implement rotation (pitch, yaw, roll)
- [ ] Add boost mechanic with cooldown
- [ ] Tune flight feel (drag, max speeds, acceleration curves)

### 1.4 Cockpit View
- [ ] Create cockpit interior mesh
- [ ] Set up first-person camera rig inside cockpit
- [ ] Add HUD elements (speed, heading, crosshair)
- [ ] Implement cockpit shake on thrust/damage
- [ ] Add instrument panel with team info

## Phase 2: Wikipedia World Generation

### 2.1 Wikipedia API Integration
- [ ] Set up Wikipedia API client (fetch article content)
- [ ] Parse article HTML to extract:
  - Plain text content
  - Links (href + anchor text)
  - Section headings
- [ ] Cache fetched articles (localStorage + server-side)
- [ ] Handle API rate limiting gracefully

### 2.2 Text-to-World Conversion
- [ ] Define world coordinate system (article = horizontal plane)
- [ ] Parse text into word positions:
  - Words flow in reading order
  - Paragraphs create depth layers
  - Sections create distinct zones
- [ ] Convert words to 3D monolith positions
- [ ] Create TextGeometry for each word (or instanced billboards for performance)
- [ ] Add LOD system (far = simple shapes, near = readable text)

### 2.3 Link Ramp System
- [ ] Identify all links in article
- [ ] Determine alphabetical ordering vs current article
- [ ] Generate ramp geometry:
  - UP ramp: ascending slope, blue/purple glow
  - DOWN ramp: descending slope, orange/red glow
- [ ] Position ramps at link word locations
- [ ] Add visual indicators (arrows, particle trails)
- [ ] Create collision triggers for ramp activation

### 2.4 Word-to-Voxel Art System
- [ ] Create voxel art library (JSON format):
  ```json
  {
    "sun": [[voxel positions for sun sculpture]],
    "planet": [[voxel positions]],
    "war": [[voxel positions]],
    "love": [[voxel positions]]
  }
  ```
- [ ] Implement word matching (exact + fuzzy)
- [ ] Replace matched words with voxel sculptures
- [ ] Add voxel rendering with instanced meshes
- [ ] Create 20-50 initial voxel art pieces for common words

### 2.5 World Transitions
- [ ] Implement link activation (player enters ramp)
- [ ] Find matching words between articles (context matching)
- [ ] Create transition effect (warp/tunnel visual)
- [ ] Spawn player at matched location in new article
- [ ] Handle transition during combat (brief invulnerability?)

## Phase 3: Combat System

### 3.1 Weapons
- [ ] Create projectile system (instanced meshes)
- [ ] Implement basic laser weapon
- [ ] Add projectile physics (fast, but not instant)
- [ ] Create hit detection (raycasting + physics)
- [ ] Add weapon cooldown/heat system

### 3.2 Letter/Monument Destruction
- [ ] Make letter monuments destructible
- [ ] Create destruction effects (particles, fragments)
- [ ] Award points for destruction
- [ ] Letters respawn after time delay
- [ ] Track destruction stats

### 3.3 Ship Combat
- [ ] Implement ship health/shields
- [ ] Add damage system (projectile hits)
- [ ] Create ship destruction effect
- [ ] Implement respawn system
- [ ] Add kill/death tracking

### 3.4 Combat Feel
- [ ] Add screen shake on hits
- [ ] Create damage direction indicators
- [ ] Add hit markers when you damage enemies
- [ ] Implement kill feed UI
- [ ] Add sound effects (placeholder initially)

### 3.5 Mods (NPC System)
Mods are autonomous entities that patrol articles, representing Wikipedia's moderation system. Both teams can interact with them.

- [ ] Create Mod NPC entity class
- [ ] Design Mod ship/avatar (distinct from player ships - maybe robotic/bureaucratic aesthetic)
- [ ] Implement Mod AI behavior:
  - Patrol patterns within article
  - Aggro when players cause too much destruction
  - Chase and attack disruptive players
- [ ] **Destroy mechanic**: Mods can be killed like players
  - Destroyed mods respawn after delay
  - Awards points to attacker's team
- [ ] **Pill mechanic**: Convert mods to your team
  - Requires sustained "conversion beam" (hold interaction key)
  - Pilled mods fight for your team
  - Pilled mods have team-colored aura (red/blue glow)
  - Enemy team can re-pill your mods
- [ ] Mod allegiance affects article control score
- [ ] Visual indicators for mod state (neutral/red-pilled/blue-pilled)

### 3.6 Article Control & Text Editing
The ultimate prize: controlling history itself.

- [ ] **Article Control conditions**:
  - Team must have majority presence in article
  - Must have pilled more mods than enemy (or destroyed enemy's pilled mods)
  - Control meter fills over time when conditions met
- [ ] **Kill-to-Edit trigger**:
  - When your team controls an article AND you kill an enemy there
  - Text editor UI opens for the killer
  - 10-word edit budget per trigger
- [ ] **Text Editor UI**:
  - Overlay that pauses local action (you're vulnerable!)
  - Shows article text with editable regions
  - Click words to select (up to 10)
  - Type replacement text
  - Preview changes in 3D before confirming
  - Timer limit to complete edit (pressure!)
- [ ] **Edit persistence**:
  - Edits stored server-side per match
  - All players see edited monuments
  - Edit history tracked (who changed what)
  - Edits reset between matches (or persist for "ranked" mode?)
- [ ] **Strategic implications**:
  - Edited words become your team's "territory markers"
  - Can edit links to change ramp destinations (!)
  - Can edit voxel-trigger words to spawn different art
  - Propaganda warfare - change meaning of articles

## Phase 4: Multiplayer Infrastructure

### 4.1 WebSocket Server
- [ ] Set up Node.js server with Socket.io
- [ ] Create room/match system
- [ ] Implement player connection handling
- [ ] Add basic authentication (anonymous or simple login)
- [ ] Set up server game loop (20-60 tick rate)

### 4.2 Network Protocol
- [ ] Define message types:
  - Player input
  - State updates
  - World transitions
  - Combat events
  - Chat messages
- [ ] Implement binary serialization (for efficiency)
- [ ] Add message compression

### 4.3 State Synchronization
- [ ] Implement authoritative server model
- [ ] Add client-side prediction for local player
- [ ] Implement entity interpolation for other players
- [ ] Handle player input buffering
- [ ] Add lag compensation for hit detection

### 4.4 World Synchronization
- [ ] Sync current article across players
- [ ] Handle players in different articles (instancing)
- [ ] Sync monument destruction state
- [ ] Sync link ramp states

## Phase 5: Team Gameplay

### 5.1 Team System
- [ ] Implement Red Pill / Blue Pill teams
- [ ] Add team selection UI
- [ ] Balance team sizes
- [ ] Create team spawn areas

### 5.2 Team Features
- [ ] Add team chat
- [ ] Implement team voice indicators
- [ ] Create teammate markers (visible through walls)
- [ ] Add team-colored ship variants
- [ ] Implement friendly fire toggle

### 5.3 Objectives & Scoring
- [ ] Track team scores
- [ ] Award points for:
  - Enemy kills
  - Letter destruction
  - Article control (time-based)
  - Link traversals
  - **Mod kills** (destroying neutral or enemy mods)
  - **Mod conversions** (pilling a mod to your team)
  - **Edit completions** (successfully editing article text)
  - **Territory held** (words your team has edited)
- [ ] Create win conditions
- [ ] Add match timer
- [ ] Track edit leaderboard (who's changed the most words)

### 5.4 Strategic Features
- [ ] Add mini-map showing article "topology"
- [ ] Show teammate locations across articles
- [ ] Implement ping system for coordination
- [ ] Add article bookmarks for tactical planning

## Phase 5B: Reality Shift (ASCII Mode)

The mindwarp: at any moment, the 3D world collapses into its "true form" - a 1995 Notepad.exe text document. Then seamlessly returns to 3D cockpit. Which view is real?

### 5B.1 ASCII Render Mode
- [ ] Create ASCII renderer (separate from Three.js, or overlay)
- [ ] Use ONLY: ASCII printable chars (32-126) + box drawing (─│┌┐└┘├┤┬┴┼)
- [ ] NO unicode, NO emojis, NO extended chars
- [ ] Monospace font only (Courier, Consolas, or similar)
- [ ] Fixed character grid (80x24? 120x40? configurable)
- [ ] Background: exact Notepad.exe gray/white (#FFFFFF or system gray)
- [ ] Text: black, no syntax highlighting, no colors

### 5B.2 World-to-ASCII Mapping
- [ ] Camera snaps to perfect top-down orthographic
- [ ] 3D positions → integer row/column (Math.round, no interpolation)
- [ ] **Player ships**:
  - Facing up: `^`
  - Facing down: `v`
  - Facing left: `<`
  - Facing right: `>`
  - Or just `*` for simplicity
- [ ] **Enemy ships**: `@` or team-colored if possible (but no color in true mode)
- [ ] **Mods**: `M` (neutral), `R` (red-pilled), `B` (blue-pilled)
- [ ] **Projectiles**: `-` (horizontal), `|` (vertical), `/` `\` (diagonal)
- [ ] **Letter monuments**: just the letter itself
- [ ] **Link ramps**: `[LINK]` or underscored text
- [ ] **Walls/boundaries**: box drawing characters

### 5B.3 Movement in ASCII Mode
- [ ] NO smooth movement - discrete grid steps only
- [ ] Position updates are INTEGER only (quantized)
- [ ] Movement feels "choppy" like old roguelikes
- [ ] Collision is tile-based
- [ ] Feels exactly like editing a text file where cursor jumps

### 5B.4 The Notepad.exe Aesthetic
- [ ] Window chrome: title bar "Untitled - Notepad" or "WIKISPACE.TXT - Notepad"
- [ ] Menu bar: File Edit Format View Help (non-functional, just visual)
- [ ] Scroll bars (fake, or functional if world is large)
- [ ] Status bar at bottom (optional)
- [ ] Blinking cursor `_` or `|` at player position
- [ ] Selection highlight if targeting something
- [ ] The ENTIRE game fits in what looks like a text document

### 5B.5 Transition Effects
- [ ] **3D → ASCII trigger**:
  - Random chance during play?
  - Triggered by damage/death?
  - Power-up/power-down?
  - Red pill item pickup?
  - Proximity to "glitch zones"?
- [ ] **Transition animation**:
  - Screen flicker/static
  - Scanlines collapse
  - Resolution drops in steps (like zooming out)
  - Colors desaturate to monochrome
  - 3D depth flattens to 2D
  - Final snap to pure text grid
- [ ] **ASCII → 3D return**:
  - Text characters gain depth/extrude
  - Color bleeds back in
  - Camera smoothly rotates from overhead to cockpit
  - Perspective returns
  - Full 3D immersion restored
- [ ] Transition should feel like "waking up" or "going under"

### 5B.6 Gameplay in ASCII Mode
- [ ] ALL game mechanics still work (shooting, movement, pilling)
- [ ] Just visually different - same game state
- [ ] Other players might be in 3D while you're in ASCII (desync reality)
- [ ] Can you toggle it manually? Or is it forced?
- [ ] Strategic implications: ASCII mode might reveal hidden things?

### 5B.7 The Philosophy
```
In WIKISPACE020026, reality has layers:

Layer 3: The 3D cockpit, immersive space combat
Layer 2: The ASCII grid, text-file truth
Layer 1: The raw data underneath (never shown?)

Red Pills believe ASCII is the true form.
Blue Pills believe 3D is the true form.
Who is right? Does it matter?

The game asks: if you can edit the words,
do you control reality or just the description of it?
```

## Phase 6: Polish & Content

### 6.1 Visual Polish
- [ ] Upgrade ship models
- [ ] Add particle effects (engines, weapons, explosions)
- [ ] Implement better space skybox
- [ ] Add post-processing (bloom, motion blur, chromatic aberration)
- [ ] Create team-specific visual themes

### 6.2 Audio
- [ ] Add engine sounds
- [ ] Add weapon sounds
- [ ] Add ambient space music
- [ ] Add UI sounds
- [ ] Implement spatial audio

### 6.3 UI/UX
- [ ] Create main menu
- [ ] Add server browser / match creation
- [ ] Implement settings menu
- [ ] Add keybinding customization
- [ ] Create loading screens with lore

### 6.4 Content
- [ ] Expand voxel art library (100+ words)
- [ ] Create ship customization options
- [ ] Add achievements
- [ ] Create tutorial article (guided introduction)

## Technical Decisions

### Why Three.js + Rapier?
- **Three.js**: Most mature WebGL library, excellent text rendering, huge community
- **Rapier**: WASM-based physics, deterministic (good for netcode), fast
- **Alternative considered**: Babylon.js (heavier, but has built-in physics)

### Why Socket.io?
- Built-in reconnection handling
- Room management out of the box
- Falls back to polling if WebSocket fails
- **Alternative**: Raw WebSocket for lower latency, but more work

### Performance Considerations
- Use instanced meshes for letters (thousands of objects)
- LOD system for text (billboards at distance)
- Spatial partitioning for collision detection
- Only sync visible players
- Chunk-based world loading

### Wikipedia API Notes
- Use REST API: `https://en.wikipedia.org/api/rest_v1/page/html/{title}`
- Rate limited: implement caching aggressively
- Parse HTML server-side to reduce client load
- Consider pre-processing popular articles

## Starting Points / Demos to Adapt

### Flight Physics Reference
- [Three.js Spaceship Example](https://threejs.org/examples/#webgl_loader_gltf)
- [Rapier Character Controller](https://rapier.rs/docs/user_guides/javascript/character_controller)

### Text Rendering Reference
- Three.js TextGeometry
- troika-three-text (better performance for lots of text)

### Multiplayer Reference
- [Socket.io Game Example](https://socket.io/get-started/chat)
- [Gabriel Gambetta's Netcode Articles](https://www.gabrielgambetta.com/client-server-game-architecture.html)

## Commands for Development

```bash
# Start development
npm run dev          # Runs client + server concurrently

# Testing
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Server only
npm run server:dev   # Server with hot reload
npm run server:prod  # Production server
```

## Milestone Goals

1. **M1 - Fly in Space**: Ship flying in empty space with good physics
2. **M2 - Word World**: Single Wikipedia article rendered as world
3. **M3 - Link Navigation**: Can traverse links between articles
4. **M4 - Combat**: Can shoot letters and other players (local)
5. **M5 - Multiplayer**: Two players can see each other and fight
6. **M6 - Teams**: Full team gameplay with scoring
7. **M7 - Mods & Control**: NPC mods, pilling, article control, text editing
8. **M8 - Reality Shift**: ASCII mode, transitions, the mindwarp
9. **M9 - Polish**: Ready for public playtesting

## File Structure

```
WIKISPACE020026/
├── package.json              # Workspace root
├── packages/
│   ├── client/
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── index.html
│   │   └── src/
│   │       ├── main.ts           # Entry point
│   │       ├── core/
│   │       │   ├── Engine.ts     # Game loop, scene management
│   │       │   ├── Renderer.ts   # Three.js setup, post-processing
│   │       │   ├── Physics.ts    # Rapier world
│   │       │   └── Input.ts      # Keyboard/mouse handling
│   │       ├── world/
│   │       │   ├── WikiWorld.ts      # Article-to-world conversion
│   │       │   ├── TextMonument.ts   # Letter/word rendering
│   │       │   ├── LinkRamp.ts       # Link ramp generation
│   │       │   ├── VoxelArt.ts       # Voxel sculpture system
│   │       │   └── Transition.ts     # World transition effects
│   │       ├── ships/
│   │       │   ├── Ship.ts           # Ship entity
│   │       │   ├── FlightController.ts # Physics-based flight
│   │       │   ├── Cockpit.ts        # Cockpit mesh and HUD
│   │       │   └── ShipAssets.ts     # Ship models/textures
│   │       ├── combat/
│   │       │   ├── Weapon.ts         # Weapon system
│   │       │   ├── Projectile.ts     # Projectile management
│   │       │   ├── Damage.ts         # Damage calculation
│   │       │   └── Effects.ts        # Combat visual effects
│   │       ├── npcs/
│   │       │   ├── Mod.ts            # Mod NPC entity
│   │       │   ├── ModAI.ts          # Patrol/aggro/combat AI
│   │       │   ├── PillSystem.ts     # Conversion beam mechanic
│   │       │   └── ModVisuals.ts     # Team-colored auras, states
│   │       ├── control/
│   │       │   ├── ArticleControl.ts # Control meter, conditions
│   │       │   ├── TextEditor.ts     # 10-word edit UI
│   │       │   ├── EditPreview.ts    # 3D preview of changes
│   │       │   └── EditSync.ts       # Sync edits to all players
│   │       ├── ascii/
│   │       │   ├── ASCIIRenderer.ts  # Pure text grid renderer
│   │       │   ├── NotepadChrome.ts  # Window frame, menus, scrollbars
│   │       │   ├── WorldToGrid.ts    # 3D coords → integer row/col
│   │       │   ├── ASCIISprites.ts   # Character mappings (^ v < > * @)
│   │       │   ├── Transition.ts     # 3D ↔ ASCII morph effects
│   │       │   └── RealityShift.ts   # Trigger conditions, state management
│   │       ├── multiplayer/
│   │       │   ├── NetworkClient.ts  # Socket.io client
│   │       │   ├── Prediction.ts     # Client-side prediction
│   │       │   ├── Interpolation.ts  # Entity interpolation
│   │       │   └── Protocol.ts       # Message types
│   │       └── ui/
│   │           ├── HUD.ts            # In-game HUD
│   │           ├── Menu.ts           # Main menu
│   │           ├── Scoreboard.ts     # Team scores
│   │           └── Chat.ts           # Team chat
│   │
│   ├── server/
│   │   ├── package.json
│   │   └── src/
│   │       ├── index.ts          # Server entry
│   │       ├── game/
│   │       │   ├── GameServer.ts     # Main game server
│   │       │   ├── Room.ts           # Match/room management
│   │       │   ├── GameState.ts      # Authoritative state
│   │       │   └── Scoring.ts        # Score tracking
│   │       ├── wiki/
│   │       │   ├── WikiAPI.ts        # Wikipedia API client
│   │       │   ├── ArticleParser.ts  # HTML parsing
│   │       │   └── ArticleCache.ts   # Caching layer
│   │       └── net/
│   │           ├── SocketHandler.ts  # Connection handling
│   │           └── Protocol.ts       # Server protocol
│   │
│   └── shared/
│       ├── package.json
│       └── src/
│           ├── types.ts          # Shared TypeScript types
│           ├── constants.ts      # Game constants
│           └── protocol.ts       # Network protocol definitions
│
└── assets/
    ├── voxels/               # Voxel art JSON files
    ├── models/               # 3D models (ships, cockpit)
    ├── textures/             # Textures
    └── audio/                # Sound effects, music
```

## Next Steps

1. Run `npm init` and set up the workspace structure
2. Install core dependencies (three, @dimforge/rapier3d, socket.io)
3. Create basic Three.js scene with flight controls
4. Get a ship flying with good physics feel
5. Fetch and render a single Wikipedia article
6. Iterate from there

---

*"The pen is mightier than the sword, but in WIKISPACE020026, the ship that controls the pen controls reality itself."*
