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
  launch?: string;                            // apps publicados
  status?: string;                            // projetos em desenvolvimento
  store?: { href: string; label: string };
}

const published: Project[] = [
  {
    slug: 'handraw',
    name: 'Handraw',
    platform: 'macOS',
    year: '2026',
    image: { src: 'handraw/screenshot-2.jpg', alt: 'Handraw no Mac com o canvas, a paleta de cores e a prévia da câmera reconhecendo as mãos' },
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

// Versão em inglês (mesma ordem, slugs e imagens)
const en: Record<string, Partial<Project>> = {
  handraw: {
    platform: 'macOS',
    image: { src: 'handraw/screenshot-2.jpg', alt: 'Handraw on a Mac with the canvas, color palette and camera preview tracking both hands' },
    line: 'A Mac canvas that turns hand movement, read by the camera, into strokes on screen.',
    shows: ['Design leadership', 'Gesture interaction', 'Design system'],
    role: 'Lead Designer',
    team: '5 people · 7 weeks',
    launch: 'Jul 2026',
  },
  sete: {
    image: { src: 'sete/screenshots.png', alt: 'SETE screens on iPhone and Apple Watch showing games, progress and achievements' },
    line: 'Training metrics for people who play court sports, with Apple Watch recording the match.',
    shows: ['iPhone + Apple Watch', 'HealthKit data', 'Focused scope'],
    team: '5 people · 7 weeks',
    launch: 'Aug 2025',
  },
  borali: {
    image: { src: 'borali/screenshots.png', alt: 'BorAli? screens with ready-made plans, a map and place recommendations in Brasília' },
    line: 'Outing suggestions in Brasília based on context and on how you feel right now.',
    shows: ['Behavioral research', 'Reframed problem', 'Validated flows'],
    team: '5 people · 7 weeks',
    launch: 'May 2026',
  },
};
const publishedEn: Project[] = published.map((p) => ({ ...p, ...en[p.slug] }));

// PACE: produto em desenvolvimento, sem loja. Não entra na contagem de apps publicados.
const pace: Project[] = [
  {
    slug: 'pace-torcedor',
    name: 'PACE Torcedor',
    platform: 'iOS',
    year: '2026',
    image: { src: 'pace-ios/cover.png', alt: 'Quatro telas do protótipo PACE Torcedor com a Início, o detalhe da partida, a chave da eliminatória e o perfil da atlética' },
    line: 'App para acompanhar campeonatos universitários sem cadastro, com a atlética de coração em destaque.',
    shows: ['Navegação e filtros', 'Acessibilidade', 'Prototipação funcional'],
    role: 'Product Designer',
    team: '5 pessoas',
    status: 'Em desenvolvimento',
  },
  {
    slug: 'pace-administrativo',
    name: 'PACE Administrativo',
    platform: 'macOS',
    year: '2026',
    image: { src: 'pace-macos/cover.png', alt: 'Janela do protótipo PACE Administrativo com o Painel da edição, pendências, jogos do dia e andamento' },
    line: 'Sistema de gestão para quem organiza o campeonato, desenhado para evitar erros no dia de jogo.',
    shows: ['Arquitetura da informação', 'Prevenção de erros', 'Sistema complexo'],
    role: 'Product Designer',
    team: '5 pessoas',
    status: 'Em desenvolvimento',
  },
];
const paceEn: Record<string, Partial<Project>> = {
  'pace-torcedor': {
    name: 'PACE Fan App',
    image: { src: 'pace-ios/cover.png', alt: 'Four screens from the PACE fan app prototype showing Home, match detail, a knockout bracket and a club profile' },
    line: 'An app for following college championships with no sign-up, built around your athletic club.',
    shows: ['Navigation and filters', 'Accessibility', 'Functional prototyping'],
    team: '5 people',
    status: 'In development',
  },
  'pace-administrativo': {
    name: 'PACE Admin',
    image: { src: 'pace-macos/cover.png', alt: 'PACE Admin prototype window showing the edition dashboard with items needing attention, today’s games and progress' },
    line: 'A management system for championship organizers, designed to prevent mistakes on game day.',
    shows: ['Information architecture', 'Error prevention', 'Complex system'],
    team: '5 people',
    status: 'In development',
  },
};
const paceEnList: Project[] = pace.map((p) => ({ ...p, ...paceEn[p.slug] }));

// Ordem da Home: PACE primeiro, depois os apps publicados
const order = ['pace-torcedor', 'pace-administrativo', 'handraw', 'borali', 'sete'];
const sort = (list: Project[]) => order.map((slug) => list.find((p) => p.slug === slug)!);
export const projects = sort([...pace, ...published]);
export const projectsEn = sort([...paceEnList, ...publishedEn]);
