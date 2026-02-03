// Core game engine - manages scene, physics, and game loop

import * as THREE from 'three';
import type RAPIER from '@dimforge/rapier3d';
import { Ship } from '../ships/Ship';
import { Input } from './Input';
import { Starfield } from '../world/Starfield';
import { WikiWorld } from '../world/WikiWorld';
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
  private input!: Input;
  private hud!: HUD;

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
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000008);

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

    // Lighting
    const ambient = new THREE.AmbientLight(0x404040, 0.5);
    this.scene.add(ambient);

    const directional = new THREE.DirectionalLight(0xffffff, 1);
    directional.position.set(100, 100, 50);
    this.scene.add(directional);

    // Add some colored point lights for atmosphere
    const redLight = new THREE.PointLight(0xff4444, 0.5, 500);
    redLight.position.set(-100, 50, -100);
    this.scene.add(redLight);

    const blueLight = new THREE.PointLight(0x4444ff, 0.5, 500);
    blueLight.position.set(100, -50, 100);
    this.scene.add(blueLight);
  }

  private initPhysics() {
    const gravity = new this.RAPIER.Vector3(0, 0, 0); // No gravity in space
    this.world = new this.RAPIER.World(gravity);
  }

  private initInput() {
    this.input = new Input(this.renderer.domElement);
  }

  private async initGameObjects() {
    // Starfield background
    this.starfield = new Starfield(this.scene);

    // Wikipedia world
    this.wikiWorld = new WikiWorld(this.scene);

    // Load initial article
    await this.wikiWorld.loadArticle('Philosophy');

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
    this.input.lock();
    this.loop();
  }

  stop() {
    this.running = false;
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
    this.hud.update(shipState, this.wikiWorld.getCurrentArticle());
  }

  private async traverseLink(targetArticle: string) {
    if (this.transitioning) return;
    this.transitioning = true;

    console.log(`Traversing to: ${targetArticle}`);

    // TODO: Add transition effect
    await this.wikiWorld.loadArticle(targetArticle);

    // Reset ship position
    // this.ship.setPosition(new THREE.Vector3(0, 5, 20));

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
