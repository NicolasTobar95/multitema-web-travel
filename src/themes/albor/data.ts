/**
 * Textos y reglas propias de Albor (planificador). Los datos de los viajes
 * vienen de src/content/trips.json.
 */
import type { CollectionEntry } from 'astro:content';

type Trip = CollectionEntry<'trips'>['data'];

export const NAV = [
  ['#planear', 'Planear'],
  ['#resultados', 'Viajes'],
  ['#como', 'Cómo funciona'],
  ['#contacto', 'Contacto'],
] as const;

/* ---------- frase del planificador ---------- */
export type Bucket = 'short' | 'mid' | 'long';

export const PICKS = {
  days: {
    label: 'Duración',
    options: [
      ['any', 'el tiempo que sea'],
      ['short', '2 o 3 días'],
      ['mid', '4 o 5 días'],
      ['long', 'más de una semana'],
    ],
  },
  land: {
    label: 'Paisaje',
    options: [
      ['any', 'cualquier paisaje'],
      ['bosque', 'bosques'],
      ['montana', 'montañas'],
      ['glaciar', 'glaciares'],
      ['lagos', 'lagos y fiordos'],
    ],
  },
  level: {
    label: 'Exigencia',
    options: [
      ['any', 'cualquiera'],
      ['baja', 'baja'],
      ['media', 'media'],
      ['alta', 'alta'],
    ],
  },
  budget: {
    label: 'Presupuesto',
    options: [
      ['any', 'lo que haga falta'],
      ['1000', 'US$ 1.000'],
      ['1500', 'US$ 1.500'],
      ['2000', 'US$ 2.000'],
    ],
  },
} as const;

export const bucket = (days: number): Bucket => (days <= 3 ? 'short' : days <= 5 ? 'mid' : 'long');

/** "Media-alta" calza tanto con "media" como con "alta" (separados por espacio para el filtro). */
export const levels = (d: Trip['difficulty']) => d.toLowerCase().split('-').join(' ');

export const LAND_LABEL: Record<Trip['landscape'], string> = {
  montana: 'Montaña',
  bosque: 'Bosque',
  glaciar: 'Glaciar',
  lagos: 'Lagos y fiordos',
  todos: 'Todos los paisajes',
};

/** Textos de tarjeta propios del tema (si no, usa title / description del contenido). */
export const CARD_TEXT: Partial<Record<string, { title?: string; text?: string }>> = {
  travesia: {
    title: 'Gran Travesía: las tres rutas en un viaje',
    text: 'De los bosques de Pumalín a las Torres del Paine por la Carretera Austral, con todos los traslados entre rutas',
  },
};

export const STEPS = [
  { title: 'Elige tu ruta', text: 'Usa el planificador o escríbenos y te ayudamos a escoger.', alt: 'Manos señalando un mapa de senderos de la Patagonia sobre una mesa de madera' },
  { title: 'Reserva tu cupo', text: 'Abonas el 30 % y el resto hasta 30 días antes de la salida.', alt: 'Una mano sostiene un teléfono sobre una mochila con una etiqueta violeta' },
  { title: 'Prepárate', text: 'Lista de equipo, charla previa por video y chat con tu guía.', alt: 'Equipo de trekking ordenado sobre el suelo: botas, capas, linterna, botella y bastones' },
  { title: 'Camina', text: 'Traslados, refugios, comidas y permisos ya están resueltos.', alt: 'Dos caminantes de espaldas, con chaquetas violeta y lima, avanzan hacia los Cuernos del Paine' },
] as const;

export const INCLUDED = [
  ['bilingue', 'Guía local bilingüe'],
  ['traslado', 'Traslados desde el aeropuerto'],
  ['refugio', 'Refugios o cabañas'],
  ['comidas', 'Todas las comidas'],
  ['permisos', 'Permisos y entradas'],
  ['seguro', 'Seguro de viaje'],
] as const;
