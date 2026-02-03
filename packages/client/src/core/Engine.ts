// Core game engine - manages scene, physics, and game loop

import * as THREE from 'three';
import type RAPIER from '@dimforge/rapier3d';
import { Ship } from '../ships/Ship';
import { Input } from './Input';
import { Starfield } from '../world/Starfield';
import { WikiWorld } from '../world/WikiWorld';
import { Weapon } from '../combat/Weapon';
import { CombatEffects } from '../combat/Effects';
import { RealityShift } from '../ascii/RealityShift';
import { ModManager } from '../npcs/ModManager';
import { ArticleControl } from '../control/ArticleControl';
import { TextEditor } from '../control/TextEditor';
import { HUD } from '../ui/HUD';

export class Engine {
  private container: HTMLElement;
  private RAPIER: typeof RAPIER;

  // Three.js
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;

  // Physics
  private world!: RAPIER.World;

  // Game objects
  private ship!: Ship;
  private starfield!: Starfield;
  private wikiWorld!: WikiWorld;
  private weapon!: Weapon;
  private effects!: CombatEffects;
  private realityShift!: RealityShift;
  private modManager!: ModManager;
  private articleControl!: ArticleControl;
  private textEditor!: TextEditor;
  private input!: Input;
  private hud!: HUD;

  // Game state
  private playerTeam: 'red' | 'blue' = 'red';
  private score = { red: 0, blue: 0 };
  private lightMode = true; // Default to light mode

  // Timing
  private clock = new THREE.Clock();
  private accumulator = 0;
  private readonly fixedDelta = 1 / 60; // 60 Hz physics

  private running = false;
  private transitioning = false;

  constructor(container: HTMLElement, rapier: typeof RAPIER) {
    this.container = container;
    this.RAPIER = rapier;
  }

  async init() {
    this.initThree();
    this.initPhysics();
    this.initInput();
    await this.initGameObjects();
    this.initHUD();

    window.addEventListener('resize', this.onResize.bind(this));
  }

  private initThree() {
    // Scene - default to light mode (white background like Wikipedia)
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf8f9fa);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Lighting - brighter for visibility
    const ambient = new THREE.AmbientLight(0x666677, 1.2);
    this.scene.add(ambient);

    const directional = new THREE.DirectionalLight(0xffffff, 1.5);
    directional.position.set(100, 100, 50);
    this.scene.add(directional);

    const directional2 = new THREE.DirectionalLight(0x8888ff, 0.5);
    directional2.position.set(-50, -50, -100);
    this.scene.add(directional2);

    // Add some colored point lights for atmosphere
    const blueLight = new THREE.PointLight(0x3366cc, 1, 500);
    blueLight.position.set(100, 50, 100);
    this.scene.add(blueLight);

    const blueLight2 = new THREE.PointLight(0x3366cc, 0.8, 500);
    blueLight2.position.set(-100, -50, -100);
    this.scene.add(blueLight2);
  }

  private initPhysics() {
    const gravity = new this.RAPIER.Vector3(0, 0, 0); // No gravity in space
    this.world = new this.RAPIER.World(gravity);
  }

  private initInput() {
    this.input = new Input(this.renderer.domElement);

    // TAB to toggle ASCII mode
    this.input.onKeyPress('Tab', () => {
      this.realityShift.toggle();
    });

    // X to test text editor (debug)
    this.input.onKeyPress('KeyX', () => {
      if (!this.textEditor.getIsActive()) {
        const words = this.wikiWorld.getMonuments().slice(0, 30).map(m => ({
          id: m.mesh.userData.id || Math.random().toString(),
          text: m.getText()
        }));
        this.textEditor.show(words);
      }
    });
  }

  private async initGameObjects() {
    // Starfield background
    this.starfield = new Starfield(this.scene);

    // Wikipedia world - pass camera for billboard effect
    this.wikiWorld = new WikiWorld(this.scene, this.camera);

    // Combat systems
    this.weapon = new Weapon(this.scene);
    this.effects = new CombatEffects(this.scene);

    // Reality shift (ASCII mode)
    this.realityShift = new RealityShift();

    // Mods (NPCs)
    this.modManager = new ModManager(this.scene, this.effects, {
      onModDestroyed: (id, team) => {
        console.log(`Mod ${id} destroyed by ${team}`);
        this.score[team] += 25;
      },
      onModPilled: (id, team) => {
        console.log(`Mod ${id} pilled to ${team}`);
        this.score[team] += 50;
      }
    });

    // Article control
    this.articleControl = new ArticleControl();

    // Text editor
    this.textEditor = new TextEditor({
      onEditComplete: (edits) => {
        console.log('Edits completed:', edits);
        // TODO: Apply edits to monuments
        this.score[this.playerTeam] += edits.length * 20;
      }
    });

    // Load initial article
    await this.wikiWorld.loadArticle('Philosophy');

    // Spawn mods in the article
    this.modManager.spawnMods(5, new THREE.Vector3(50, 10, -50), 80);

    // Player ship
    this.ship = new Ship(this.scene, this.world, this.RAPIER, this.camera);
    await this.ship.init();
  }

  private initHUD() {
    this.hud = new HUD();
  }

  start() {
    this.running = true;
    this.clock.start();
    // Don't lock pointer here - requires user gesture
    // The Input class will lock on first click
    this.loop();
  }

  stop() {
    this.running = false;
  }

  setPlayerTeam(team: 'red' | 'blue') {
    this.playerTeam = team;
    console.log(`Player team set to: ${team}`);
  }

  setLightMode(light: boolean) {
    this.lightMode = light;
    if (light) {
      // Light mode - white background, dark elements
      this.scene.background = new THREE.Color(0xf8f9fa);
    } else {
      // Dark mode - dark space background
      this.scene.background = new THREE.Color(0x000008);
    }
  }

  toggleLightMode() {
    this.setLightMode(!this.lightMode);
    return this.lightMode;
  }

  private loop() {
    if (!this.running) return;

    requestAnimationFrame(() => this.loop());

    const delta = this.clock.getDelta();
    this.accumulator += delta;

    // Fixed timestep physics
    while (this.accumulator >= this.fixedDelta) {
      this.fixedUpdate(this.fixedDelta);
      this.accumulator -= this.fixedDelta;
    }

    // Variable timestep rendering
    this.update(delta);
    this.render();
  }

  private fixedUpdate(dt: number) {
    // Process input and update ship physics
    const inputState = this.input.getState();
    this.ship.handleInput(inputState, dt);

    // Handle firing
    if (inputState.fire && !this.weapon.isOverheated()) {
      const shipState = this.ship.getState();
      const fireDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(this.ship.getQuaternion());
      const firePosition = shipState.position.clone().add(fireDirection.clone().multiplyScalar(3));

      this.weapon.fire(firePosition, fireDirection, this.ship.getQuaternion());
    }

    // Step physics world
    this.world.step();

    // Sync physics to visuals
    this.ship.syncFromPhysics();
  }

  private update(dt: number) {
    // Update visual-only things
    this.starfield.update(this.camera.position);
    this.ship.update(dt);
    this.wikiWorld.update(dt);
    this.weapon.update(dt);
    this.effects.update(dt);

    // Check projectile collisions with monuments and mods
    this.checkProjectileCollisions();

    // Update mods
    const inputState = this.input.getState();
    this.modManager.update(dt, this.ship.getPosition(), this.playerTeam, inputState.pill);

    // Update article control
    const modCounts = this.modManager.getModCounts();
    this.articleControl.setPresence(
      { red: this.playerTeam === 'red' ? 1 : 0, blue: this.playerTeam === 'blue' ? 1 : 0 },
      modCounts
    );
    const controlState = this.articleControl.update(dt);

    // Check for link ramp interaction
    if (!this.transitioning) {
      const shipPos = this.ship.getPosition();
      const ramp = this.wikiWorld.getRampAtPosition(shipPos);

      if (ramp && this.input.getState().interact) {
        this.traverseLink(ramp.target);
      }
    }

    // Update HUD
    const shipState = this.ship.getState();
    const nearestRamp = this.wikiWorld.getNearestRamp(shipState.position);
    const nearbyWarp = nearestRamp ? { target: nearestRamp.ramp.target, distance: nearestRamp.distance } : null;
    this.hud.update(
      shipState,
      this.wikiWorld.getCurrentArticle(),
      this.weapon.getHeat(),
      controlState,
      this.score,
      nearbyWarp
    );

    // Update reality shift (ASCII mode)
    const asciiState = this.buildASCIIState();
    this.realityShift.update(dt, asciiState);
  }

  private buildASCIIState() {
    const shipState = this.ship.getState();
    const shipASCII = this.realityShift.worldToASCII(shipState.position);
    const direction = this.realityShift.getDirectionFromVelocity(shipState.velocity);

    // Convert monuments to ASCII coordinates
    const words = this.wikiWorld.getMonuments().slice(0, 50).map(m => {
      const pos = this.realityShift.worldToASCII(m.mesh.position);
      return {
        text: m.getText().substring(0, 10),
        x: pos.x,
        y: pos.y,
        isLink: false // TODO: get this from monument
      };
    });

    return {
      playerX: shipASCII.x,
      playerY: shipASCII.y,
      playerDirection: direction,
      enemies: [], // TODO: other players
      mods: [], // TODO: mods
      projectiles: [], // TODO: projectiles
      words
    };
  }

  private checkProjectileCollisions() {
    // Check hits on monuments (letters)
    const monuments = this.wikiWorld.getMonuments();
    for (const monument of monuments) {
      const hit = this.weapon.checkCollision(monument.mesh.position, 2);
      if (hit) {
        this.effects.createLetterDestruction(monument.mesh.position.clone(), monument.getText());
        this.score[this.playerTeam] += 5;
        console.log(`Hit letter: ${monument.getText()}`);
      }
    }

    // Check hits on mods
    const mods = this.modManager.getAllMods();
    for (const mod of mods) {
      const hit = this.weapon.checkCollision(mod.mesh.position, 3);
      if (hit) {
        this.modManager.checkProjectileHit(mod.mesh.position, hit.damage, this.playerTeam);
      }
    }
  }

  private async traverseLink(targetArticle: string) {
    if (this.transitioning) return;
    this.transitioning = true;

    console.log(`Traversing to: ${targetArticle}`);

    // Clear old mods
    this.modManager.clear();

    // Reset article control
    this.articleControl.reset();

    // Load new article
    await this.wikiWorld.loadArticle(targetArticle);

    // Spawn new mods
    this.modManager.spawnMods(5, new THREE.Vector3(50, 10, -50), 80);

    // Award points for traversal
    this.score[this.playerTeam] += 10;

    this.transitioning = false;
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
  }

  private onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}
