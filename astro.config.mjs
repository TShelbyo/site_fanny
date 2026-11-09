// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import site from './src/content/site.json' with { type: 'json' };

export default defineConfig({
  // L'adresse du site se règle dans src/content/site.json (site.url)
  site: site.site.url,
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
