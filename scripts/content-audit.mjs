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

const rules = [
  { id: 'internal-resume-reference', pattern: /\bmaster(?: cybersecurity)? resume\b/i },
  { id: 'approval-workflow-language', pattern: /\b(?:approved wording|approved copy|approval process|line[- ]by[- ]line approval)\b/i },
  { id: 'internal-project-language', pattern: /\b(?:portfolio-v2|phase 1|phase 2|staging-only|internal planning|internal reference|source of truth)\b/i },
  { id: 'implementation-note', pattern: /\b(?:one central profile file|same structured record|independent markdown records|updating one project file|managed from one central|without changing (?:the )?(?:page )?layout)\b/i },
  { id: 'interview-process-language', pattern: /\b(?:interview-defendable|production responsibilities are separated)\b/i },
  { id: 'private-client-language', pattern: /\b(?:KMP Innovations|Northern Credit Union)\b/i },
  { id: 'privacy-explanation-leak', pattern: /\bconfidential client systems or operational details\b/i },
  { id: 'old-public-email', pattern: /mpatel237@icloud\.com/i },
  { id: 'old-public-location', pattern: /Oshawa\s*\/\s*GTA/i },
  { id: 'old-primary-title', pattern: /Cybersecurity\s*&\s*IT Analyst/i },
  { id: 'old-target-title', pattern: /\bJunior SOC Analyst\b/i },
  { id: 'unearned-certification', pattern: /\b(?:CompTIA Security\+|Splunk Core Certified User)\b/i },
  { id: 'immigration-status', pattern: /\b(?:PGWP|work permit)\b/i },
  { id: 'publication-directive', pattern: /\b(?:do not publish|not for public|private only|internal only|for review only)\b/i },
  { id: 'unfinished-placeholder', pattern: /\b(?:lorem ipsum|TODO|TBD)\b/i }
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
  console.error('\nPublic-content audit failed. Remove or rewrite the following text before deployment:\n');
  for (const violation of violations) {
    console.error(`${violation.file}:${violation.line} [${violation.rule}] ${violation.excerpt}`);
  }
  console.error('\nReview docs/PUBLIC_CONTENT_CHECKLIST.md before committing public copy.\n');
  process.exit(1);
}

console.log(`Public-content audit passed: ${files.length} text files checked against ${rules.length} release rules.`);
