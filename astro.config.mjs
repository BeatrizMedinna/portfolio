// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://portfolio-kohl-tau-gvls4trd33.vercel.app',
  // Gera about.html, handraw.html… iguais às URLs atuais
  build: { format: 'file' },
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
