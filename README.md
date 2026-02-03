# WIKISPACE2626

> *The year is 020026. All life has transitioned into word-based lifeforms. The Red Pills and Blue Pills fight for control over history and consensus reality.*

## [▶ PLAY NOW](https://williamsharkey.github.io/WIKISPACE2626/)

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

### Reality Shift (ASCII Mode)

At any moment, reality can **collapse**. The 3D world flattens into a top-down view rendered as pure ASCII text in a Notepad.exe window from 1995:

```
┌─────────────────────────────────────────────────┐
│ WIKISPACE.TXT - Notepad              [_][□][X]  │
├─────────────────────────────────────────────────┤
│ File  Edit  Format  View  Help                  │
├─────────────────────────────────────────────────┤
│                                                 │
│    The       *         quick    brown           │
│                  ^                              │
│         fox    jumps      @      over           │
│    ------>                                      │
│              the     lazy       M    dog        │
│                                                 │
│   [LINK:Animals]           [LINK:Speed]         │
│                                                 │
└─────────────────────────────────────────────────┘
```

- `^` `v` `<` `>` = your ship (direction)
- `*` = other players
- `@` = enemies
- `M` = mods
- Movement is **integer grid steps only** (no smooth animation)
- Then reality snaps back to 3D cockpit

*Which view is the truth? The immersive 3D world, or the text file underneath?*

### Level Up Screen

When you gain XP or unlock something, no flashy UI. Instead, Notepad opens your save file:

```
┌─────────────────────────────────────────────────┐
│ pilot_xX_RedPill_Xx.json - Notepad    [_][□][X] │
├─────────────────────────────────────────────────┤
│ File  Edit  Format  View  Help                  │
├─────────────────────────────────────────────────┤
│ {                                               │
│   "pilot": "xX_RedPill_Xx",                     │
│   "team": "red",                                │
│   "level": █,                    ← cursor here  │
│   "xp": 2847,                                   │
│   "kills": 23                                   │
│ }                                               │
└─────────────────────────────────────────────────┘
```

You watch the cursor select `4`, delete it, type `5`. Then it goes to File → Save. Notepad closes. You're back in the game.

### Victory: Download Your Soul

When you win, the final screen shows your complete JSON - all your stats, every word you edited, your entire history. Below it:

```
        [ Download pilot_xX_RedPill_Xx.json ]
```

Click it. The file downloads. Your existence in WIKISPACE, saved to your hard drive forever. A text file is your trophy.

### Mods & Article Control

**Mods** are NPC entities that patrol articles. You can:
- **Destroy** them for points
- **Pill** them (convert to your team with a sustained beam)

**Article Control**: When your team controls an article (majority presence + mod allegiance) and you kill an enemy there:
- A **text editor** opens
- You can **edit 10 words** in the article
- Your edits become permanent monuments visible to all players
- Edit links to redirect ramps, change voxel triggers, rewrite history itself

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
| F | Pill beam (hold to convert mods) |
| Tab | Scoreboard |
| Enter | Team chat |
| Esc | Close text editor / menu |

## Architecture

```
WIKISPACE2626/
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
