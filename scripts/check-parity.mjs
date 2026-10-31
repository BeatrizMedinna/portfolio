// Confere o build (dist/) contra o site antigo (legacy/):
// páginas e âncoras antigas, imagens e links internos.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
let fail = 0;
const bad = (m) => { console.log('FALHA', m); fail++; };
const html = (f) => readFileSync(join(dist, f), 'utf8');
const ids = (s) => new Set([...s.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

// 1. Páginas antigas (lets-talk.html vira redirect 301 no vercel.json)
const pages = ['index.html', 'about.html', 'handraw.html', 'borali.html', 'sete.html'];
for (const p of pages) if (!existsSync(join(dist, p))) bad(`página ausente: ${p}`);
const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'));
if (!vercel.redirects.some((r) => r.source === '/lets-talk.html')) bad('sem redirect para /lets-talk.html');

// 2. Âncoras antigas
for (const p of [...pages, 'lets-talk.html']) {
  const old = ids(readFileSync(join('legacy', p), 'utf8'));
  const target = p === 'lets-talk.html' ? 'index.html' : p;
  const now = ids(html(target));
  for (const id of old) {
    if (['lightbox', 'page-work', 'handraw', 'borali', 'sete'].includes(id) && now.has(id)) continue;
    if (id === 'lightbox' || id === 'page-work') continue;
    if (!now.has(id)) bad(`âncora #${id} de ${p} não existe em ${target}`);
  }
}

// 3. Imagens e links internos de todas as páginas geradas
const all = readdirSync(dist).filter((f) => f.endsWith('.html'));
let imgs = 0, links = 0;
for (const f of all) {
  const s = html(f);
  for (const [, src] of s.matchAll(/(?:src|data-full)="(\/[^"]+)"/g)) { imgs++; if (!existsSync(join(dist, decodeURI(src)))) bad(`${f}: imagem ${src}`); }
  for (const [, srcset] of s.matchAll(/srcset="([^"]+)"/g)) for (const part of srcset.split(',')) { const u = part.trim().split(' ')[0]; imgs++; if (!existsSync(join(dist, decodeURI(u)))) bad(`${f}: srcset ${u}`); }
  for (const [, href] of s.matchAll(/href="(\/[^"#]*)(#[^"]*)?"/g)) {
    links++;
    const file = href === '/' ? 'index.html' : href.slice(1);
    if (href.startsWith('/_astro') || ['favicon.svg', 'sitemap-index.xml'].includes(file)) continue;
    if (!existsSync(join(dist, file))) bad(`${f}: link ${href}`);
  }
  for (const [, page, hash] of s.matchAll(/href="\/([a-z]+\.html)#([^"]+)"/g)) if (!ids(html(page)).has(hash)) bad(`${f}: âncora ${page}#${hash}`);
  for (const [, hash] of s.matchAll(/href="#([^"]+)"/g)) if (!ids(s).has(hash)) bad(`${f}: âncora local #${hash}`);
  const imgTags = [...s.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  for (const t of imgTags) if (t.includes('src="/_astro') && !/alt="[^"]+"/.test(t)) bad(`${f}: imagem sem alt`);
  for (const t of imgTags) if (t.includes('src="/_astro') && !/width="\d+"/.test(t)) bad(`${f}: imagem sem width`);
  if ((s.match(/<h1\b/g) || []).length !== 1) bad(`${f}: deve ter exatamente um h1`);
}
const todos = all.reduce((n, f) => n + (html(f).match(/class="todo"/g) || []).length, 0);
console.log(`páginas: ${all.length} · imagens/srcset: ${imgs} · links internos: ${links} · pendências [a confirmar]: ${todos}`);
console.log(fail ? `${fail} falha(s)` : 'paridade ok');
process.exit(fail ? 1 : 0);
