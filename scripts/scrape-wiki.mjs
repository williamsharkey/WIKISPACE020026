#!/usr/bin/env node
// Scrape Wikipedia pages iteratively starting from Philosophy
// Follows links to build a connected graph of articles

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CACHE_FILE = path.join(__dirname, '../packages/client/src/world/articleCache.ts');

// Articles to skip (disambiguation, lists, etc.)
const SKIP_PATTERNS = [
  /^List of/i,
  /\(disambiguation\)/i,
  /^Wikipedia:/,
  /^Category:/,
  /^File:/,
  /^Template:/,
  /^Help:/,
  /^Portal:/,
];

// Titles that are always disambiguation pages (no suffix)
const KNOWN_DISAMBIGUATION = new Set([
  'Justification', 'Validity', 'Sublime', 'Expression', 'Vision', 'Action',
  'Agency', 'Ego', 'Comprehension', 'Age', 'Appearance', 'Absence', 'Place',
  'Now', 'Moment', 'Forever', 'Limit', 'Hume', 'Growth', 'Decay', 'Permanence',
  'Development', 'Creation', 'Event', 'Why', 'Consequence', 'Element', 'Nucleus',
  'Work', 'Newton', 'Beginning', 'Origin', 'Continuity', 'Custom', 'State',
  'Control', 'Influence', 'Rule', 'Fairness', 'Benefit', 'Character', 'Community'
]);

// Read existing cache to find what articles we already have
function getExistingTitles() {
  const content = fs.readFileSync(CACHE_FILE, 'utf-8');
  const matches = content.matchAll(/"([^"]+)":\s*\{\s*title:/g);
  return new Set([...matches].map(m => m[1]));
}

// Extract all linked article titles from existing cache
function getLinkedTitles() {
  const content = fs.readFileSync(CACHE_FILE, 'utf-8');
  const linkMatches = content.matchAll(/links:\s*\[([^\]]+)\]/g);
  const titles = new Set();
  for (const match of linkMatches) {
    const links = match[1].matchAll(/"([^"]+)"/g);
    for (const link of links) {
      titles.add(link[1]);
    }
  }
  return titles;
}

async function fetchArticle(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`  ✗ ${title} (${response.status})`);
      return null;
    }
    const data = await response.json();

    // Skip if it's a disambiguation or redirect to somewhere else
    if (data.type === 'disambiguation') {
      console.log(`  ⊘ ${title} (disambiguation)`);
      return null;
    }

    return {
      title: data.title,
      extract: data.extract || '',
    };
  } catch (err) {
    console.log(`  ✗ ${title} (error: ${err.message})`);
    return null;
  }
}

async function fetchLinks(title) {
  // Get links from the article
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=links&pllimit=50&format=json&origin=*`;

  try {
    const response = await fetch(url);
    if (!response.ok) return [];

    const data = await response.json();
    const pages = data.query?.pages || {};
    const page = Object.values(pages)[0];
    const links = page?.links || [];

    return links
      .map(l => l.title)
      .filter(t => !SKIP_PATTERNS.some(p => p.test(t)));
  } catch (err) {
    return [];
  }
}

function escapeForTS(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, ' ')
    .replace(/\r/g, '');
}

async function scrape(batchSize = 50) {
  console.log('Reading existing cache...');
  const existing = getExistingTitles();
  const linked = getLinkedTitles();

  console.log(`Existing articles: ${existing.size}`);
  console.log(`Linked articles: ${linked.size}`);

  // Find articles that are linked but not cached (skip known disambiguation)
  const toFetch = [...linked].filter(t =>
    !existing.has(t) && !KNOWN_DISAMBIGUATION.has(t)
  );
  console.log(`Articles to fetch: ${toFetch.length}`);

  // Limit to batch size
  const batch = toFetch.slice(0, batchSize);
  console.log(`\nFetching batch of ${batch.length} articles...\n`);

  const newArticles = [];

  for (const title of batch) {
    const article = await fetchArticle(title);
    if (article && article.extract && article.extract.length > 50) {
      // Fetch links for this article
      const links = await fetchLinks(title);

      // Filter links to prefer ones that exist or are commonly linked
      const goodLinks = links
        .filter(l => !SKIP_PATTERNS.some(p => p.test(l)))
        .slice(0, 10);

      newArticles.push({
        key: article.title,
        title: article.title,
        extract: article.extract,
        links: goodLinks,
      });

      console.log(`  ✓ ${article.title} (${goodLinks.length} links)`);
    }

    // Delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\nFetched ${newArticles.length} new articles`);

  if (newArticles.length === 0) {
    console.log('No new articles to add.');
    return;
  }

  // Generate TypeScript code for new articles
  let tsCode = '\n  // === SCRAPED BATCH ' + new Date().toISOString().split('T')[0] + ' ===\n';

  for (const article of newArticles) {
    const linksStr = article.links.map(l => `"${escapeForTS(l)}"`).join(', ');
    tsCode += `  "${escapeForTS(article.key)}": {
    title: "${escapeForTS(article.title)}",
    extract: "${escapeForTS(article.extract)}",
    links: [${linksStr}]
  },\n`;
  }

  // Append to cache file (before the closing brace)
  let content = fs.readFileSync(CACHE_FILE, 'utf-8');
  const insertPoint = content.lastIndexOf('};');
  content = content.slice(0, insertPoint) + tsCode + content.slice(insertPoint);

  fs.writeFileSync(CACHE_FILE, content);
  console.log(`\nAdded ${newArticles.length} articles to cache`);
  console.log(`Total articles: ${existing.size + newArticles.length}`);
}

// Run
const batchSize = parseInt(process.argv[2]) || 50;
scrape(batchSize);
