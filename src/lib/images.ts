import type { ImageMetadata } from 'astro';
import { PHOTO_ALT, type Photo } from './catalog';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/fotos/*-L.webp', { eager: true });
const trips = import.meta.glob<{ default: ImageMetadata }>('../assets/img/shared/trip-*.webp', { eager: true });

/** Devuelve la foto fuente (L, 1800 px) para pasarla a <Image>/<Picture>, que generan AVIF/WebP. */
export function photo(key: Photo): { src: ImageMetadata; alt: string } {
  const mod = files[`../assets/fotos/${key}-L.webp`];
  if (!mod) throw new Error(`Falta la foto "${key}" en src/assets/fotos`);
  return { src: mod.default, alt: PHOTO_ALT[key] };
}

const TRIP_ALT: Record<string, string> = {
  paine: 'Las tres Torres del Paine al amanecer, con dos caminantes sobre las rocas',
  castillo: 'Agujas de basalto del Cerro Castillo sobre una laguna turquesa',
  pumalin: 'Pasarela de madera entre alerces y neblina en el bosque de Pumalín',
  exploradores: 'Cordada de cuatro personas caminando sobre el hielo del glaciar Exploradores',
  puyuhuapi: 'Dos kayaks en un fiordo en calma entre paredes de bosque',
  esperanza: 'Fotógrafo con trípode frente al seno Última Esperanza al atardecer',
  travesia: 'La Carretera Austral cruzando un valle con un río trenzado',
};

/** Foto compartida de cada viaje (src/assets/img/shared/trip-<id>.webp). */
export function tripPhoto(id: string): { src: ImageMetadata; alt: string } {
  const mod = trips[`../assets/img/shared/trip-${id}.webp`];
  if (!mod) throw new Error(`Falta la foto del viaje "${id}" en src/assets/img/shared`);
  return { src: mod.default, alt: TRIP_ALT[id] ?? '' };
}
