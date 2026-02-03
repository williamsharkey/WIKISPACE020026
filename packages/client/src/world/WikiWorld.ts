// WikiWorld - Converts Wikipedia articles into 3D space

import * as THREE from 'three';
import { TextMonument } from './TextMonument';
import { LinkRamp } from './LinkRamp';

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

  // Layout constants
  private readonly WORD_SPACING = 8;
  private readonly LINE_WIDTH = 15; // words per line
  private readonly LINE_HEIGHT = 6;
  private readonly PARAGRAPH_DEPTH = 20;
  private readonly WORD_SCALE = 2;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.worldGroup = new THREE.Group();
    this.scene.add(this.worldGroup);
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
    try {
      // Use Wikipedia's REST API to get plain text extract
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch article: ${response.status}`);
      }

      const data = await response.json();

      // Also fetch links
      const linksUrl = `https://en.wikipedia.org/api/rest_v1/page/related/${encodeURIComponent(title)}`;
      let links: string[] = [];

      try {
        const linksResponse = await fetch(linksUrl);
        if (linksResponse.ok) {
          const linksData = await linksResponse.json();
          links = linksData.pages?.slice(0, 20).map((p: any) => p.title) || [];
        }
      } catch {
        // Links are optional
      }

      return {
        title: data.title,
        extract: data.extract || 'No content available.',
        links,
      };
    } catch (error) {
      console.error('Failed to fetch article:', error);
      return {
        title,
        extract: `Welcome to WIKISPACE020026. Article "${title}" could not be loaded. You are a word-based lifeform navigating the remnants of human knowledge. The year is 020026.`,
        links: ['Philosophy', 'Reality', 'Consciousness', 'Truth', 'Time'],
      };
    }
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

    paragraphs.forEach((paragraph, paragraphIndex) => {
      const paragraphWords = paragraph.split(/\s+/).filter(w => w.length > 0);

      paragraphWords.forEach((word, wordIndex) => {
        // Clean the word
        const cleanWord = word.replace(/[^\w'-]/g, '');
        if (!cleanWord) return;

        // Calculate position
        const x = (wordIndex % this.LINE_WIDTH) * this.WORD_SPACING;
        const y = -Math.floor(wordIndex / this.LINE_WIDTH) * this.LINE_HEIGHT;
        const z = -paragraphIndex * this.PARAGRAPH_DEPTH;

        // Check if this word matches a link
        const matchingLink = article.links.find(
          link => link.toLowerCase().includes(cleanWord.toLowerCase()) ||
                  cleanWord.toLowerCase().includes(link.toLowerCase().split(' ')[0])
        );

        const isLink = !!matchingLink;
        let linkDirection: 'up' | 'down' | undefined;

        if (isLink && matchingLink) {
          // Determine if link goes "up" (alphabetically before) or "down" (after)
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
          wordIndex,
        });
      });
    });

    return { title: article.title, words, links };
  }

  private buildWorld(article: ParsedArticle) {
    // Create ground plane (subtle grid)
    const gridHelper = new THREE.GridHelper(500, 50, 0x004400, 0x002200);
    gridHelper.position.y = -20;
    this.worldGroup.add(gridHelper);

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

    // Add title as massive monument in the sky
    const titleMonument = new TextMonument(
      article.title.toUpperCase(),
      new THREE.Vector3(50, 40, -30),
      { scale: 8, emissive: true }
    );
    this.worldGroup.add(titleMonument.mesh);

    // Add ambient particles
    this.addAmbientParticles();
  }

  private addAmbientParticles() {
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00ff00,
      size: 0.5,
      transparent: true,
      opacity: 0.3,
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

  getRampAtPosition(position: THREE.Vector3, radius: number = 10): LinkRamp | null {
    for (const ramp of this.ramps) {
      if (ramp.mesh.position.distanceTo(position) < radius) {
        return ramp;
      }
    }
    return null;
  }

  getCurrentArticle(): string {
    return this.currentArticle;
  }

  getMonuments(): TextMonument[] {
    return this.monuments;
  }

  update(dt: number) {
    // Animate monuments, ramps
    this.monuments.forEach(m => m.update(dt));
    this.ramps.forEach(r => r.update(dt));
  }
}
