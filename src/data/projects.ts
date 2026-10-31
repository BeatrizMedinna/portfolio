// Dados dos projetos usados na Home e nos cases.
// Datas de lançamento conferidas na App Store em 31/10/2026.
export interface Project {
  slug: string;
  name: string;
  platform: string;
  year: string;
  image: { src: string; alt: string };
  line: string;
  shows: string[];
  role: string;
  team: string;
  launch: string;
  store: { href: string; label: string };
}

export const projects: Project[] = [
  {
    slug: 'handraw',
    name: 'Handraw',
    platform: 'macOS',
    year: '2026',
    image: { src: 'handraw/screenshot-2.jpg', alt: 'Handraw no Mac: canvas, paleta de cores e a prévia da câmera reconhecendo as mãos' },
    line: 'Um canvas para Mac que transforma o movimento das mãos, lido pela câmera, em traço na tela.',
    shows: ['Liderança de design', 'Interação por gestos', 'Design system'],
    role: 'Lead Designer',
    team: '5 pessoas · 7 semanas',
    launch: 'Jul 2026',
    store: { href: 'https://apps.apple.com/br/app/handraw-canvas-por-gestos/id6786850155?mt=12', label: 'Mac App Store' },
  },
  {
    slug: 'sete',
    name: 'SETE',
    platform: 'iOS + watchOS',
    year: '2025',
    image: { src: 'sete/screenshots.png', alt: 'Telas do SETE no iPhone e no Apple Watch com jogos, evolução e conquistas' },
    line: 'Métricas de treino para quem joga esportes de quadra, com o Apple Watch registrando a partida.',
    shows: ['iPhone + Apple Watch', 'Dados do HealthKit', 'Escopo enxuto'],
    role: 'Product Designer',
    team: '5 pessoas · 7 semanas',
    launch: 'Ago 2025',
    store: { href: 'https://apps.apple.com/br/app/sete-esporte-e-performance/id6751563867', label: 'App Store' },
  },
  {
    slug: 'borali',
    name: 'BorAli? Explore Brasília',
    platform: 'iOS',
    year: '2026',
    image: { src: 'borali/screenshots.png', alt: 'Telas do BorAli? com roteiros, mapa e recomendações de lugares em Brasília' },
    line: 'Recomendações de passeios em Brasília pelo contexto e pelo humor de quem quer sair.',
    shows: ['Pesquisa comportamental', 'Problema reenquadrado', 'Fluxos validados'],
    role: 'Product Designer',
    team: '5 pessoas · 7 semanas',
    launch: 'Mai 2026',
    store: { href: 'https://apps.apple.com/br/app/borali-explore-bras%C3%ADlia/id6764412373', label: 'App Store' },
  },
];
