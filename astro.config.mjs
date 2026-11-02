// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// O sitemap gera /about; o site serve /about.html (e /en/ para a home em inglês)
const fixUrl = (u) => {
  const url = new URL(u);
  if (url.pathname === '/en') url.pathname = '/en/';
  else if (url.pathname !== '/' && !url.pathname.endsWith('/') && !url.pathname.endsWith('.html')) url.pathname += '.html';
  return url.href;
};

export default defineConfig({
  site: 'https://portfolio-kohl-tau-gvls4trd33.vercel.app',
  // about.astro -> about.html (URLs atuais) e en/index.astro -> en/index.html
  build: { format: 'preserve' },
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (u) => !u.includes('404'), i18n: { defaultLocale: 'pt', locales: { pt: 'pt-BR', en: 'en' } }, serialize: (item) => ({ ...item, url: fixUrl(item.url), links: item.links?.map((l) => ({ ...l, url: fixUrl(l.url) })) }) })],
});
