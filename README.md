# WIKISPACE020026

> *The year is 020026. All life has transitioned into word-based lifeforms. The Red Pills and Blue Pills fight for control over history and consensus reality.*

## The Game

A multiplayer space combat simulator where **real Wikipedia articles become infinite 3D worlds**.

### Core Concept

- **Wikipedia pages are planes of existence** - Each article renders as a vast space environment
- **Words become monuments** - Letters transform into massive monoliths you can read while flying
- **Links are dimensional ramps**:
  - **UP ramps** → Articles alphabetically BEFORE current page
  - **DOWN ramps** → Articles alphabetically AFTER current page
- **Voxel art triggers** - Known words spawn voxel sculptures from a curated library
- **Combat** - Shoot at letters, chase enemies through wiki-space

### Factions

| Team | Philosophy |
|------|------------|
| **Red Pill** | Fight to preserve true history |
| **Blue Pill** | Fight to control consensus reality |

### Gameplay

- Fly your ship through word-scapes
- Team up to ambush enemies at strategic articles
- Chase players through link-ramps across Wikipedia
- Coordinate which pages to visit for tactical advantage
- Destroy letter-monuments for points
- Control key articles for territory

## Tech Stack

- **Frontend**: Three.js + Rapier physics (WASM)
- **Backend**: Node.js + WebSocket (Socket.io)
- **Data**: Wikipedia API (live article fetching)
- **Multiplayer**: Authoritative server with client-side prediction

## Getting Started

```bash
# Install dependencies
npm install

# Start the server
npm run server

# Start the client (dev mode)
npm run dev

# Build for production
npm run build
```

## Controls

| Key | Action |
|-----|--------|
| WASD | Thrust direction |
| Mouse | Aim / Look |
| Shift | Boost |
| Space | Fire |
| E | Interact with link-ramp |
| Tab | Scoreboard |
| Enter | Team chat |

## Architecture

```
WIKISPACE020026/
├── client/           # Three.js frontend
│   ├── src/
│   │   ├── core/     # Engine, renderer, physics
│   │   ├── world/    # Wikipedia world generation
│   │   ├── ships/    # Player ships, cockpit
│   │   ├── combat/   # Weapons, damage
│   │   └── ui/       # HUD, menus
├── server/           # Node.js backend
│   ├── src/
│   │   ├── game/     # Game state, rooms
│   │   ├── wiki/     # Wikipedia API integration
│   │   └── net/      # WebSocket handling
├── shared/           # Shared types, constants
└── assets/           # Voxel library, sounds
```

## License

MIT

---

*"In the beginning was the Word, and the Word was with Wikipedia, and the Word was Wikipedia."*
