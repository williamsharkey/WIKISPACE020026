// ModManager - Spawns and manages Mod NPCs in the world

import * as THREE from 'three';
import { Mod, ModState } from './Mod';
import { CombatEffects } from '../combat/Effects';
import { MOD, POINTS } from '@wikispace/shared';

export interface ModManagerEvents {
  onModDestroyed?: (modId: string, destroyerTeam: 'red' | 'blue') => void;
  onModPilled?: (modId: string, newTeam: 'red' | 'blue') => void;
}

export class ModManager {
  private scene: THREE.Scene;
  private mods: Map<string, Mod> = new Map();
  private effects: CombatEffects;
  private events: ModManagerEvents;

  private respawnQueue: { position: THREE.Vector3; time: number }[] = [];
  private nextModId = 0;

  constructor(scene: THREE.Scene, effects: CombatEffects, events: ModManagerEvents = {}) {
    this.scene = scene;
    this.effects = effects;
    this.events = events;
  }

  spawnMods(count: number, centerPosition: THREE.Vector3, spread: number = 100) {
    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(
        centerPosition.x + (Math.random() - 0.5) * spread,
        centerPosition.y + Math.random() * 20,
        centerPosition.z + (Math.random() - 0.5) * spread
      );

      this.spawnMod(position);
    }
  }

  spawnMod(position: THREE.Vector3): Mod {
    const id = `mod-${this.nextModId++}`;
    const mod = new Mod(position, id);
    this.mods.set(id, mod);
    this.scene.add(mod.mesh);
    return mod;
  }

  update(
    dt: number,
    playerPosition: THREE.Vector3,
    playerTeam: 'red' | 'blue',
    isPilling: boolean
  ) {
    // Update all mods
    this.mods.forEach((mod, id) => {
      mod.update(dt, playerPosition, playerTeam);

      // Handle pilling if player is nearby and holding pill key
      if (isPilling) {
        const distance = mod.mesh.position.distanceTo(playerPosition);
        if (distance < 10) {
          if (!mod.isBeingPilled()) {
            mod.startPilling(playerTeam);
          }
          const completed = mod.continuePilling(dt, playerTeam);
          if (completed) {
            this.events.onModPilled?.(id, playerTeam);
          }
        }
      } else {
        mod.stopPilling();
      }
    });

    // Process respawn queue
    for (let i = this.respawnQueue.length - 1; i >= 0; i--) {
      this.respawnQueue[i].time -= dt;
      if (this.respawnQueue[i].time <= 0) {
        this.spawnMod(this.respawnQueue[i].position);
        this.respawnQueue.splice(i, 1);
      }
    }
  }

  // Check projectile hits on mods
  checkProjectileHit(position: THREE.Vector3, damage: number, attackerTeam: 'red' | 'blue'): Mod | null {
    for (const [id, mod] of this.mods) {
      const distance = mod.mesh.position.distanceTo(position);
      if (distance < 3) {
        // Don't damage friendly mods
        if (mod.getState() === attackerTeam) {
          continue;
        }

        const destroyed = mod.takeDamage(damage);
        if (destroyed) {
          this.destroyMod(id, attackerTeam);
        } else {
          // Hit effect
          this.effects.createHitSpark(position);
        }
        return mod;
      }
    }
    return null;
  }

  private destroyMod(id: string, destroyerTeam: 'red' | 'blue') {
    const mod = this.mods.get(id);
    if (!mod) return;

    // Create destruction effect
    this.effects.createExplosion(mod.mesh.position.clone(), 0xffaa00, 2);

    // Remove from scene
    this.scene.remove(mod.mesh);
    mod.dispose();
    this.mods.delete(id);

    // Queue respawn
    this.respawnQueue.push({
      position: mod.mesh.position.clone(),
      time: MOD.RESPAWN_TIME
    });

    // Fire event
    this.events.onModDestroyed?.(id, destroyerTeam);
  }

  getModAtPosition(position: THREE.Vector3, radius: number = 10): Mod | null {
    for (const mod of this.mods.values()) {
      if (mod.mesh.position.distanceTo(position) < radius) {
        return mod;
      }
    }
    return null;
  }

  getModCounts(): { neutral: number; red: number; blue: number } {
    let neutral = 0, red = 0, blue = 0;
    this.mods.forEach(mod => {
      switch (mod.getState()) {
        case 'neutral': neutral++; break;
        case 'red': red++; break;
        case 'blue': blue++; break;
      }
    });
    return { neutral, red, blue };
  }

  getAllMods(): Mod[] {
    return Array.from(this.mods.values());
  }

  clear() {
    this.mods.forEach(mod => {
      this.scene.remove(mod.mesh);
      mod.dispose();
    });
    this.mods.clear();
    this.respawnQueue = [];
  }
}
