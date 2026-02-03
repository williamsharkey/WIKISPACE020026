// WikiWorld - Converts Wikipedia articles into 3D space

import * as THREE from 'three';
import { TextMonument } from './TextMonument';
import { LinkRamp } from './LinkRamp';
import { getCachedArticle, getCachedArticleTitles } from './articleCache';

export interface ParsedWord {
  id: string;
  text: string;
  isLink: boolean;
  linkTarget?: string;
  linkDirection?: 'up' | 'down';
  position: THREE.Vector3;
  paragraphIndex: number;
  wordIndex: number;
}

export interface ParsedArticle {
  title: string;
  words: ParsedWord[];
  links: { text: string; target: string; direction: 'up' | 'down' }[];
}

export class WikiWorld {
  private scene: THREE.Scene;
  private monuments: TextMonument[] = [];
  private ramps: LinkRamp[] = [];
  private worldGroup: THREE.Group;
  private currentArticle: string = '';

  // Layout constants - readable document style floating in space
  private readonly WORD_SPACING = 12;       // Horizontal space between words (like normal text)
  private readonly LINE_WIDTH = 12;         // Words per line before wrapping
  private readonly LINE_HEIGHT = 18;        // Vertical space between lines
  private readonly PARAGRAPH_GAP = 40;      // Extra gap between paragraphs
  private readonly WORD_SCALE = 1;          // Base scale for words

  // Camera reference for billboarding
  private cameraRef: THREE.Camera | null = null;

  constructor(scene: THREE.Scene, camera?: THREE.Camera) {
    this.scene = scene;
    this.cameraRef = camera || null;
    this.worldGroup = new THREE.Group();
    this.scene.add(this.worldGroup);
  }

  setCamera(camera: THREE.Camera) {
    this.cameraRef = camera;
  }

  async loadArticle(title: string): Promise<ParsedArticle> {
    this.currentArticle = title;

    // Fetch from Wikipedia API
    const article = await this.fetchArticle(title);
    const parsed = this.parseArticle(article, title);

    // Clear old world
    this.clear();

    // Build new world
    this.buildWorld(parsed);

    return parsed;
  }

  private async fetchArticle(title: string): Promise<{ title: string; extract: string; links: string[] }> {
    // Try cache first (instant, no CORS issues)
    const cached = getCachedArticle(title);
    if (cached) {
      console.log(`Loaded "${title}" from cache`);
      return cached;
    }

    // Fall back to Wikipedia API
    try {
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch article: ${response.status}`);
      }

      const data = await response.json();
      const links = this.generateContextualLinks(title);

      return {
        title: data.title,
        extract: data.extract || 'No content available.',
        links,
      };
    } catch (error) {
      console.error('Failed to fetch article:', error);
      // Return fallback with links to cached articles
      return {
        title,
        extract: `Welcome to WIKISPACE2626. Article "${title}" exists beyond the cached manifold. You are a word-based lifeform navigating the remnants of human knowledge. The year is 020026. Navigate to a known concept to continue your journey.`,
        links: getCachedArticleTitles().slice(0, 10),
      };
    }
  }

  private generateContextualLinks(title: string): string[] {
    // Use cached article titles as links
    const allTitles = getCachedArticleTitles();

    // Filter out the current article and shuffle
    const filtered = allTitles.filter(link =>
      link.toLowerCase() !== title.toLowerCase()
    );

    // Shuffle array
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }

    return filtered.slice(0, 10);
  }

  private parseArticle(
    article: { title: string; extract: string; links: string[] },
    currentTitle: string
  ): ParsedArticle {
    const words: ParsedWord[] = [];
    const links: { text: string; target: string; direction: 'up' | 'down' }[] = [];

    // Split into paragraphs, then words
    const paragraphs = article.extract.split(/\n+/);
    let wordId = 0;
    let currentY = 0; // Track Y position as we go down

    paragraphs.forEach((paragraph, paragraphIndex) => {
      const paragraphWords = paragraph.split(/\s+/).filter(w => w.length > 0);

      // Track X position for variable-width word layout
      let currentX = 0;
      let currentLine = 0;
      const maxLineWidth = this.LINE_WIDTH * this.WORD_SPACING;

      paragraphWords.forEach((word, localWordIndex) => {
        // Clean the word
        const cleanWord = word.replace(/[^\w'-]/g, '');
        if (!cleanWord) return;

        // Estimate word width based on character count
        const wordWidth = cleanWord.length * 4 + this.WORD_SPACING;

        // Check if we need to wrap to next line
        if (currentX + wordWidth > maxLineWidth && currentX > 0) {
          currentX = 0;
          currentLine++;
        }

        // Position: document-style layout
        // X: flows left to right
        const x = currentX - maxLineWidth / 2 + wordWidth / 2;

        // Y: lines go down, paragraphs have extra gap
        const y = currentY - currentLine * this.LINE_HEIGHT;

        // Z: flat plane at z=0, or slight depth per paragraph for layers
        const z = -paragraphIndex * 5;

        // Move X cursor for next word
        currentX += wordWidth;

        // Check if this word matches a link
        const matchingLink = article.links.find(
          link => link.toLowerCase().includes(cleanWord.toLowerCase()) ||
                  cleanWord.toLowerCase().includes(link.toLowerCase().split(' ')[0])
        );

        const isLink = !!matchingLink;
        let linkDirection: 'up' | 'down' | undefined;

        if (isLink && matchingLink) {
          linkDirection = matchingLink.toLowerCase() < currentTitle.toLowerCase() ? 'up' : 'down';
          links.push({
            text: cleanWord,
            target: matchingLink,
            direction: linkDirection,
          });
        }

        words.push({
          id: `word-${wordId++}`,
          text: cleanWord,
          isLink,
          linkTarget: matchingLink,
          linkDirection,
          position: new THREE.Vector3(x, y, z),
          paragraphIndex,
          wordIndex: localWordIndex,
        });
      });

      // After each paragraph, move Y down for next paragraph
      const linesInParagraph = currentLine + 1;
      currentY -= linesInParagraph * this.LINE_HEIGHT + this.PARAGRAPH_GAP;
    });

    return { title: article.title, words, links };
  }

  private buildWorld(article: ParsedArticle) {
    // No grid - let the words be the focus in the void of space

    // Create word monuments
    article.words.forEach(word => {
      const monument = new TextMonument(
        word.text,
        word.position,
        {
          isLink: word.isLink,
          linkDirection: word.linkDirection,
          scale: this.WORD_SCALE,
        }
      );
      this.monuments.push(monument);
      this.worldGroup.add(monument.mesh);
    });

    // Create link ramps
    const processedLinks = new Set<string>();
    article.words
      .filter(w => w.isLink && w.linkTarget && !processedLinks.has(w.linkTarget))
      .forEach(word => {
        processedLinks.add(word.linkTarget!);
        const ramp = new LinkRamp(
          word.position.clone(),
          word.linkTarget!,
          word.linkDirection!
        );
        this.ramps.push(ramp);
        this.worldGroup.add(ramp.mesh);
      });

    // Add title as header above the document
    const titleMonument = new TextMonument(
      article.title.toUpperCase(),
      new THREE.Vector3(0, 30, 0),
      { scale: 2, emissive: true }
    );
    this.monuments.push(titleMonument); // Add to monuments so it billboards too
    this.worldGroup.add(titleMonument.mesh);

    // Add ambient particles
    this.addAmbientParticles();
  }

  private addAmbientParticles() {
    // Subtle dust particles in space - very sparse
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 800;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 800;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x6699cc,
      size: 0.8,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    this.worldGroup.add(particles);
  }

  clear() {
    this.monuments.forEach(m => m.dispose());
    this.monuments = [];
    this.ramps.forEach(r => r.dispose());
    this.ramps = [];

    while (this.worldGroup.children.length > 0) {
      const child = this.worldGroup.children[0];
      this.worldGroup.remove(child);
      if ((child as any).geometry) (child as any).geometry.dispose();
      if ((child as any).material) (child as any).material.dispose();
    }
  }

  getMonumentAtPosition(position: THREE.Vector3, radius: number = 5): TextMonument | null {
    for (const monument of this.monuments) {
      if (monument.mesh.position.distanceTo(position) < radius) {
        return monument;
      }
    }
    return null;
  }

  getRampAtPosition(position: THREE.Vector3, radius: number = 25): LinkRamp | null {
    for (const ramp of this.ramps) {
      if (ramp.mesh.position.distanceTo(position) < radius) {
        return ramp;
      }
    }
    return null;
  }

  getNearestRamp(position: THREE.Vector3): { ramp: LinkRamp; distance: number } | null {
    let nearest: LinkRamp | null = null;
    let nearestDist = Infinity;

    for (const ramp of this.ramps) {
      const dist = ramp.mesh.position.distanceTo(position);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = ramp;
      }
    }

    return nearest ? { ramp: nearest, distance: nearestDist } : null;
  }

  getCurrentArticle(): string {
    return this.currentArticle;
  }

  getMonuments(): TextMonument[] {
    return this.monuments;
  }

  update(dt: number) {
    // Animate monuments, ramps
    this.monuments.forEach(m => {
      m.update(dt);
      // Make monuments face the camera (billboard effect)
      if (this.cameraRef) {
        m.lookAt(this.cameraRef.position);
      }
    });
    this.ramps.forEach(r => r.update(dt));
  }
}
