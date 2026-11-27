import type { ImageMetadata } from 'astro';

const icons = import.meta.glob<{ default: ImageMetadata }>('../../assets/img/albor/icono-*.png', { eager: true });

/** Ícono 3D de Albor (src/assets/img/albor/icono-<name>.png, con transparencia). */
export function icon(name: string): ImageMetadata {
  const mod = icons[`../../assets/img/albor/icono-${name}.png`];
  if (!mod) throw new Error(`Falta el ícono "${name}" en src/assets/img/albor`);
  return mod.default;
}
