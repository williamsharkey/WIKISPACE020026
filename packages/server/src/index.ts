// WIKISPACE020026 Server

import { createServer } from 'http';
import { Server } from 'socket.io';
import type { ClientMessage, ServerMessage } from '@wikispace/shared';

const PORT = process.env.PORT || 3001;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Simple player tracking for now
const players = new Map<string, {
  id: string;
  name: string;
  team: 'red' | 'blue';
  position: { x: number; y: number; z: number };
}>();

io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);

  socket.on('join', (data: { name: string; team: 'red' | 'blue' }) => {
    const player = {
      id: socket.id,
      name: data.name,
      team: data.team,
      position: { x: 0, y: 0, z: 0 },
    };

    players.set(socket.id, player);

    // Send welcome message
    socket.emit('welcome', {
      type: 'welcome',
      playerId: socket.id,
      state: {
        tick: 0,
        players: Array.from(players.values()),
        projectiles: [],
        article: {
          title: 'Main_Page',
          words: [],
          mods: [],
          controllingTeam: null,
          controlProgress: { red: 0, blue: 0 },
        },
        scores: { red: 0, blue: 0 },
        timeRemaining: 600,
      },
    });

    // Notify others
    socket.broadcast.emit('player_joined', { type: 'player_joined', player });

    console.log(`Player joined: ${data.name} (${data.team})`);
  });

  socket.on('input', (data: { input: any }) => {
    const player = players.get(socket.id);
    if (player) {
      // Update position based on input (simplified for now)
      // In real implementation, this would be authoritative physics
    }
  });

  socket.on('disconnect', () => {
    players.delete(socket.id);
    io.emit('player_left', { type: 'player_left', playerId: socket.id });
    console.log(`Player disconnected: ${socket.id}`);
  });
});

// Game loop - broadcast state updates
setInterval(() => {
  if (players.size > 0) {
    io.emit('state_update', {
      type: 'state_update',
      state: {
        tick: Date.now(),
        players: Array.from(players.values()).map(p => ({
          id: p.id,
          name: p.name,
          team: p.team,
          position: p.position,
          rotation: { x: 0, y: 0, z: 0, w: 1 },
          velocity: { x: 0, y: 0, z: 0 },
          health: 100,
          shield: 50,
        })),
        projectiles: [],
        article: {
          title: 'Main_Page',
          words: [],
          mods: [],
          controllingTeam: null,
          controlProgress: { red: 0, blue: 0 },
        },
        scores: { red: 0, blue: 0 },
        timeRemaining: 600,
      },
    });
  }
}, 50); // 20 Hz

httpServer.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   ██╗    ██╗██╗██╗  ██╗██╗███████╗██████╗  █████╗  ██████╗███████╗  ║
║   ██║    ██║██║██║ ██╔╝██║██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝  ║
║   ██║ █╗ ██║██║█████╔╝ ██║███████╗██████╔╝███████║██║     █████╗    ║
║   ██║███╗██║██║██╔═██╗ ██║╚════██║██╔═══╝ ██╔══██║██║     ██╔══╝    ║
║   ╚███╔███╔╝██║██║  ██╗██║███████║██║     ██║  ██║╚██████╗███████╗  ║
║    ╚══╝╚══╝ ╚═╝╚═╝  ╚═╝╚═╝╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝╚══════╝  ║
║                                                               ║
║                         020026                                ║
║                                                               ║
║   Server running on port ${PORT}                                 ║
║   The word-based lifeforms await...                           ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
  `);
});
