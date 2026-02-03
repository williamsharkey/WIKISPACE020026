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
- [ ] Create win conditions
- [ ] Add match timer

### 5.4 Strategic Features
- [ ] Add mini-map showing article "topology"
- [ ] Show teammate locations across articles
- [ ] Implement ping system for coordination
- [ ] Add article bookmarks for tactical planning

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
7. **M7 - Polish**: Ready for public playtesting

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
