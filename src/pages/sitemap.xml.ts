import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { sections } from '../data/sections';

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://staging.manarthpatel.com');
  const posts = (await getCollection('blog')).filter(post => post.data.status === 'published');
  const paths = [
    '/',
    '/about/',
    '/experience/',
    '/projects/',
    '/labs/',
    '/blog/',
    ...Object.keys(sections).map(section => `/${section}/`),
    ...posts.map(post => `/blog/${post.data.slug}/`)
  ];
  const unique = [...new Set(paths)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${unique
    .map(path => `  <url><loc>${new URL(path, base).href}</loc></url>`)
    .join('\n')}\n</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
};
