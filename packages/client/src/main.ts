// WIKISPACE020026 - Main Entry Point

import { Engine } from './core/Engine';

const loadBar = document.getElementById('load-bar') as HTMLDivElement;
const loadStatus = document.getElementById('load-status') as HTMLDivElement;
const loadingScreen = document.getElementById('loading') as HTMLDivElement;

function setLoadProgress(percent: number, status: string) {
  loadBar.style.width = `${percent}%`;
  loadStatus.textContent = status;
}

async function init() {
  try {
    setLoadProgress(10, 'Loading physics engine...');

    // Dynamic import for Rapier WASM
    const RAPIER = await import('@dimforge/rapier3d');
    await RAPIER.init();

    setLoadProgress(40, 'Initializing renderer...');

    const container = document.getElementById('game')!;
    const engine = new Engine(container, RAPIER);

    setLoadProgress(70, 'Loading assets...');
    await engine.init();

    setLoadProgress(90, 'Entering wiki-space...');

    // Hide loading screen
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      engine.start();
    }, 500);

    setLoadProgress(100, 'Reality loaded.');

  } catch (error) {
    console.error('Failed to initialize:', error);
    loadStatus.textContent = `ERROR: ${error}`;
    loadStatus.style.color = '#f00';
  }
}

init();
