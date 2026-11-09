import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

// Textes longs en Markdown : src/content/legal/*.md
const legal = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/legal' }),
});

export const collections = { legal };
