// Idioma pela URL: /en/... é inglês, o resto é português.
export type Lang = 'pt' | 'en';

export function getLang(url: URL): Lang {
  return url.pathname === '/en' || url.pathname.startsWith('/en/') ? 'en' : 'pt';
}

// Caminho equivalente no outro idioma: /about.html <-> /en/about.html, / <-> /en/
export function altPath(url: URL): string {
  const p = url.pathname.replace(/index\.html$/, '');
  if (getLang(url) === 'en') return p.replace(/^\/en\/?/, '/') || '/';
  return p === '/' ? '/en/' : `/en${p}`;
}

// Prefixo para links internos
export const base = (lang: Lang) => (lang === 'en' ? '/en' : '');

export const ui = {
  pt: {
    skip: 'Pular para o conteúdo',
    menu: 'Menu',
    navLabel: 'Principal',
    work: 'Trabalho',
    about: 'Sobre',
    contact: 'Contato',
    switchLabel: 'English version',
    switchText: 'EN',
    footerLabel: 'Contato',
    footerTitle: 'Estou buscando uma vaga em Product Design.',
    footerSub: 'Brasília, Brasil · Aberta a oportunidades remotas',
    backToTop: 'Voltar ao topo ↑',
    zoom: 'Ampliar',
    closeImage: 'Fechar imagem',
    imageDialog: 'Imagem ampliada',
    inThisCase: 'Neste case',
    nextCase: 'Próximo case',
    caseShows: 'O que este case mostra',
    decision: 'Decisão',
    store: 'Loja',
    locale: 'pt_BR',
    htmlLang: 'pt-BR',
  },
  en: {
    skip: 'Skip to content',
    menu: 'Menu',
    navLabel: 'Main',
    work: 'Work',
    about: 'About',
    contact: 'Contact',
    switchLabel: 'Versão em português',
    switchText: 'PT',
    footerLabel: 'Contact',
    footerTitle: 'I’m looking for a Product Design role.',
    footerSub: 'Brasília, Brazil · Open to remote opportunities',
    backToTop: 'Back to top ↑',
    zoom: 'Enlarge',
    closeImage: 'Close image',
    imageDialog: 'Enlarged image',
    inThisCase: 'In this case study',
    nextCase: 'Next case study',
    caseShows: 'What this case study shows',
    decision: 'Decision',
    store: 'Store',
    locale: 'en_US',
    htmlLang: 'en',
  },
} as const;

export const t = (url: URL) => ui[getLang(url)];
