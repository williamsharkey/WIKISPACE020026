// WIKISPACE020026 - Main Entry Point

import { Engine } from './core/Engine';
import * as RAPIER from '@dimforge/rapier3d';

function setLoadProgress(percent: number, status: string) {
  const loadBar = document.getElementById('load-bar');
  const loadStatus = document.getElementById('load-status');
  if (loadBar) loadBar.style.width = `${percent}%`;
  if (loadStatus) loadStatus.textContent = status;
}

async function init() {
  const loadingScreen = document.getElementById('loading');
  const loadStatus = document.getElementById('load-status');

  try {
    setLoadProgress(10, 'Loading physics engine...');

    // RAPIER is already loaded via the wasm plugin
    setLoadProgress(40, 'Initializing renderer...');

    const container = document.getElementById('game')!;
    const engine = new Engine(container, RAPIER);

    setLoadProgress(70, 'Loading assets...');
    await engine.init();

    setLoadProgress(90, 'Entering wiki-space...');

    // Hide loading screen
    setTimeout(() => {
      if (loadingScreen) loadingScreen.classList.add('hidden');
      engine.start();
    }, 500);

    setLoadProgress(100, 'Reality loaded.');

  } catch (error) {
    console.error('Failed to initialize:', error);
    if (loadStatus) {
      loadStatus.textContent = `ERROR: ${error}`;
      loadStatus.style.color = '#f00';
    }
  }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
