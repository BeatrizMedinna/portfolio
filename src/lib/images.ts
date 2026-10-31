import type { ImageMetadata } from 'astro';

// Todas as imagens de src/assets, indexadas pelo caminho relativo ("handraw/entrevistas.jpg").
const files = import.meta.glob<{ default: ImageMetadata }>(
  ['/src/assets/**/*.{jpg,jpeg,png}', '!/src/assets/recognition/m_m_6.1.PNG'],
  { eager: true },
);

export function img(path: string): ImageMetadata {
  const file = files[`/src/assets/${path}`];
  if (!file) throw new Error(`Imagem não encontrada em src/assets: ${path}`);
  return file.default;
}
