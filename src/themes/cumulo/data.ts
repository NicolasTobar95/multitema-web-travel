/** Textos e imágenes propios de Cúmulo (suizo nocturno). Los viajes vienen de trips.json. */
import type { ImageMetadata } from 'astro';

export const NAV = [
  ['#destinos', 'Destinos'],
  ['#paquetes', 'Por qué Cordada'],
  ['#viajeros', 'Viajeros'],
  ['#contacto', 'Contacto'],
] as const;

export const FEATS = [
  { title: 'Fechas flexibles', text: 'Salidas cada semana de octubre a abril. Cambia tu fecha sin costo hasta 30 días antes.' },
  { title: 'Grupos de 12 como máximo', text: 'Para que el guía conozca a cada persona y nadie se quede atrás.' },
  { title: 'Guías locales expertos', text: 'De la zona, bilingües y certificados en primeros auxilios en lugares remotos.' },
] as const;

/** Miniaturas nocturnas del índice (src/assets/img/cumulo/indice-<id>.jpg) */
const files = import.meta.glob<{ default: ImageMetadata }>('../../assets/img/cumulo/indice-*.jpg', { eager: true });

const ALT: Record<string, string> = {
  paine: 'Los Cuernos del Paine reflejados en el lago Pehoé al anochecer, con las primeras estrellas',
  castillo: 'Agujas de basalto del Cerro Castillo sobre una laguna helada a la luz de la luna',
  pumalin: 'Bosque de alerces de noche, con neblina y una pasarela iluminada por una linterna frontal',
  exploradores: 'El hielo del glaciar Exploradores en la hora azul, con una cordada a lo lejos',
  puyuhuapi: 'Fiordo de Puyuhuapi en calma reflejando las estrellas, con dos kayaks en la orilla',
  esperanza: 'El seno Última Esperanza en la hora azul, con un fotógrafo y su trípode',
  travesia: 'La Carretera Austral cruzando un valle bajo la Vía Láctea',
};

export function indexPhoto(id: string): { src: ImageMetadata; alt: string } {
  const mod = files[`../../assets/img/cumulo/indice-${id}.jpg`];
  if (!mod) throw new Error(`Falta la miniatura "indice-${id}.jpg" en src/assets/img/cumulo`);
  return { src: mod.default, alt: ALT[id] ?? '' };
}

/**
 * Viaje al que apunta cada opción del buscador ("Torres del Paine · 5 días" → paine).
 * Se busca por el nombre antes del "·"; la Gran Travesía y "A medida" tienen destino fijo.
 */
export const SEARCH_TARGET: Record<string, string> = {
  'gran-travesia': 'travesia',
  'a-medida': 'contacto',
};
