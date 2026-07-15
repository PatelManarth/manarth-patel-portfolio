import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    status: z.enum(['planned','building','validating','documenting','expert-review','published','archived']),
    track: z.string(),
    focus: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    tools: z.array(z.string()),
    frameworks: z.array(z.string()).default([]),
    simpleSummary: z.string(),
    technicalSummary: z.string(),
    milestones: z.array(z.object({ label: z.string(), complete: z.boolean() })).default([]),
    evidence: z.array(z.string()).default([]),
    updated: z.coerce.date()
  })
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    status: z.enum(['draft','planned','published']).default('draft'),
    published: z.coerce.date().optional(),
    updated: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    relatedProject: z.string().optional(),
    featured: z.boolean().default(false)
  })
});

export const collections = { projects, blog };