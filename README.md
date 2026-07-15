# Manarth Patel — Cybersecurity Evidence Console

This branch contains the Astro-based V2 source for Manarth Patel's cybersecurity and IT portfolio.

## Preview

- Staging: https://staging.manarthpatel.com
- Production remains on the separate `main` branch until V2 is approved.

## Architecture

- Astro static-site generation
- Shared header, footer, SEO layout, and responsive design system
- Pagefind full-text search generated after every build
- GitHub Actions deployment to GitHub Pages
- Theme-aware animated network background
- Mobile-first responsive layouts

## Editable content

- Projects: `src/content/projects/*.md`
- Blog posts: `src/content/blog/*.md`
- Resume, employment, education, and profile: `src/data/site.ts`
- Services, glossary, contact, LinkedIn summaries, and resource sections: `src/data/sections.ts`
- Navigation: `src/data/navigation.ts`

These records update generated pages without duplicating layout code.

## Commands

```bash
npm install
npm run dev
npm run check
npm run build
npm run preview
```

The build copies the resume PDF into Astro's public output, generates static pages, and creates the Pagefind search index.

## Deployment

The workflow `.github/workflows/deploy-portfolio-v2.yml` deploys only the `portfolio-v2` branch to GitHub Pages.

## Public evidence rules

Public project evidence must be sanitized. Do not publish credentials, tokens, private IP addresses, real usernames, live dashboards, or private operational details. Production support experience and lab-based security evidence must remain clearly distinguished.
