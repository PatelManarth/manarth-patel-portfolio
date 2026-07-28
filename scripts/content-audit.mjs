import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const scanRoots = [
  'src/pages',
  'src/components',
  'src/layouts',
  'src/data',
  'src/content',
  'public/scripts',
  'public/assets/img'
];

const textExtensions = new Set([
  '.astro', '.ts', '.js', '.mjs', '.md', '.mdx', '.html', '.svg', '.json', '.txt', '.xml'
]);

// These rules intentionally contain only generic release-quality checks.
// Project-specific private values must never be stored in this repository.
const rules = [
  {
    id: 'editorial-workflow-language',
    pattern: /\b(?:master resume|approved wording|approved copy|approval process|line[- ]by[- ]line approval)\b/i
  },
  {
    id: 'development-workflow-language',
    pattern: /\b(?:portfolio-v\d+|phase \d+|staging-only|internal planning|internal reference|source of truth)\b/i
  },
  {
    id: 'implementation-detail-language',
    pattern: /\b(?:one central profile file|same structured record|independent markdown records|updating one project file|managed from one central|without changing (?:the )?(?:page )?layout)\b/i
  },
  {
    id: 'publication-directive',
    pattern: /\b(?:do not publish|not for public|private only|internal only|for review only)\b/i
  },
  {
    id: 'unfinished-placeholder',
    pattern: /\b(?:lorem ipsum|TODO|TBD|replace me|sample text)\b/i
  },
  {
    id: 'local-development-address',
    pattern: /\b(?:localhost|127\.0\.0\.1)(?::\d+)?\b/i
  },
  {
    id: 'debug-output',
    pattern: /\b(?:console\.debug|debugger;)\b/i
  }
];

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(path));
    } else if (textExtensions.has(extname(entry.name).toLowerCase())) {
      files.push(path);
    }
  }

  return files;
}

const files = [];
for (const root of scanRoots) {
  try {
    files.push(...await collectFiles(root));
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
}

const violations = [];
for (const file of files) {
  const content = await readFile(file, 'utf8');
  const lines = content.split(/\r?\n/);

  lines.forEach((line, index) => {
    for (const rule of rules) {
      if (rule.pattern.test(line)) {
        violations.push({
          file: relative(process.cwd(), file),
          line: index + 1,
          rule: rule.id,
          excerpt: line.trim().slice(0, 220)
        });
      }
    }
  });
}

if (violations.length) {
  console.error('\nPublic-content audit failed. Review and rewrite the following lines before deployment:\n');
  for (const violation of violations) {
    console.error(`${violation.file}:${violation.line} [${violation.rule}] ${violation.excerpt}`);
  }
  process.exit(1);
}

console.log(`Public-content audit passed: ${files.length} text files checked against ${rules.length} generic release rules.`);
