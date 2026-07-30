import { access, readFile, readdir } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const root = 'dist';
const htmlFiles = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (extname(entry.name) === '.html') htmlFiles.push(path);
  }
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function targetForPath(pathname) {
  if (pathname === '/') return join(root, 'index.html');
  if (pathname.endsWith('/')) return join(root, pathname.slice(1), 'index.html');
  return join(root, pathname.slice(1));
}

await walk(root);
const htmlCache = new Map();
const violations = [];

for (const sourceFile of htmlFiles) {
  const source = await readFile(sourceFile, 'utf8');
  const hrefPattern = /href=["']([^"']+)["']/g;
  let match;

  while ((match = hrefPattern.exec(source))) {
    const rawHref = match[1];
    if (!rawHref.startsWith('/') || rawHref.startsWith('//')) continue;

    const url = new URL(rawHref, 'https://portfolio.local');
    if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/pagefind/')) continue;

    const target = targetForPath(url.pathname);
    if (!(await exists(target))) {
      violations.push(`${relative(root, sourceFile)} -> missing route ${rawHref}`);
      continue;
    }

    if (!url.hash || extname(target) !== '.html') continue;
    const anchor = decodeURIComponent(url.hash.slice(1));
    let targetHtml = htmlCache.get(target);
    if (!targetHtml) {
      targetHtml = await readFile(target, 'utf8');
      htmlCache.set(target, targetHtml);
    }

    const escaped = anchor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const anchorPattern = new RegExp(`(?:id|name)=["']${escaped}["']`);
    if (!anchorPattern.test(targetHtml)) {
      violations.push(`${relative(root, sourceFile)} -> missing anchor ${rawHref}`);
    }
  }
}

if (violations.length) {
  console.error('\nInternal-link audit failed:\n');
  violations.forEach(violation => console.error(violation));
  process.exit(1);
}

console.log(`Internal-link audit passed: ${htmlFiles.length} generated HTML files checked.`);
