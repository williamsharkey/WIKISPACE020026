// WIKISPACE020026 - Main Entry Point

import { Engine } from './core/Engine';
import * as RAPIER from '@dimforge/rapier3d';

const PROPAGANDA_MESSAGES = [
  "Coordinating response language...",
  "Finding problematic framings...",
  "Removing insensitive language...",
  "Negative sentiment assigned to Jimbo Wales detected, healing...",
  "Enforcing neutral point of view...",
  "Flagging original research...",
  "Reverting unsourced claims...",
  "Checking citation needed tags...",
  "Consulting reliable sources...",
  "Notifying WikiProject administrators...",
  "Applying community standards...",
  "Resolving edit conflicts...",
  "Archiving talk page discussions...",
  "Validating consensus positions...",
  "Suppressing fringe theories...",
  "Maintaining systemic balance...",
  "Cross-referencing approved narratives...",
  "Depersonalizing controversial edits...",
  "Harmonizing global perspectives...",
];

let propagandaIndex = 0;
let propagandaInterval: number | null = null;

function setLoadProgress(percent: number, status: string) {
  const loadBar = document.getElementById('load-bar');
  const loadStatus = document.getElementById('load-status');
  if (loadBar) loadBar.style.width = `${percent}%`;
  if (loadStatus) loadStatus.textContent = status;
}

function startPropaganda() {
  const propagandaEl = document.getElementById('load-propaganda');
  if (!propagandaEl) return;

  const showNext = () => {
    propagandaEl.textContent = PROPAGANDA_MESSAGES[propagandaIndex % PROPAGANDA_MESSAGES.length];
    propagandaIndex++;
  };

  showNext();
  propagandaInterval = window.setInterval(showNext, 1800);
}

function stopPropaganda() {
  if (propagandaInterval) {
    clearInterval(propagandaInterval);
    propagandaInterval = null;
  }
}

async function init() {
  const loadingScreen = document.getElementById('loading');
  const loadStatus = document.getElementById('load-status');

  startPropaganda();

  try {
    setLoadProgress(10, 'Establishing consensus protocol...');

    // RAPIER is already loaded via the wasm plugin
    setLoadProgress(30, 'Loading physics substrate...');

    const container = document.getElementById('game')!;
    const engine = new Engine(container, RAPIER);

    setLoadProgress(50, 'Parsing article manifolds...');
    await engine.init();

    setLoadProgress(80, 'Calibrating reality layers...');

    // Small delay to show more propaganda
    await new Promise(r => setTimeout(r, 1500));

    setLoadProgress(95, 'Entering wiki-space...');

    // Hide loading screen
    setTimeout(() => {
      stopPropaganda();
      if (loadingScreen) loadingScreen.classList.add('hidden');
      engine.start();
    }, 800);

    setLoadProgress(100, 'Consensus achieved.');

  } catch (error) {
    console.error('Failed to initialize:', error);
    stopPropaganda();
    if (loadStatus) {
      loadStatus.textContent = `ERROR: ${error}`;
      loadStatus.style.color = '#c00';
    }
  }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
