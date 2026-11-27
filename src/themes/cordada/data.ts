/**
 * Textos y datos de presentación propios de Cordada (los datos de cada viaje
 * vienen de src/content/trips.json).
 */
import type { ImageMetadata } from 'astro';
import hojaCastillo from '@/assets/img/cordada/hoja-castillo.webp';
import hojaPaine from '@/assets/img/cordada/hoja-paine.webp';
import hojaPumalin from '@/assets/img/cordada/hoja-pumalin.webp';

export interface RouteSheet {
  id: 'pumalin' | 'castillo' | 'paine';
  name: string;
  subtitle: string;
  text: string;
  sheet: string;
  image: ImageMetadata;
  alt: string;
  /** Posición del punto en el localizador (0–110) */
  locator: readonly [number, number];
}

/** Las tres rutas guiadas, de norte a sur (orden del scroll horizontal y del mapa). */
export const ROUTES: readonly RouteSheet[] = [
  {
    id: 'pumalin',
    name: 'Pumalín',
    subtitle: 'Bosques y volcán',
    text: 'Bosque lluvioso, alerces milenarios y el cráter del volcán Chaitén. Caminatas cortas y noches en cabañas: el viaje ideal para tu primera vez en la Patagonia.',
    sheet: 'Hoja 18G · PU 42',
    image: hojaPumalin,
    alt: 'Sendero entre alerces gigantes y helechos en la neblina del bosque de Pumalín',
    locator: [58, 30],
  },
  {
    id: 'castillo',
    name: 'Cerro Castillo',
    subtitle: 'Travesía de altura',
    text: 'Portezuelos con nieve, una laguna turquesa a los pies de la aguja y campamentos lejos de las multitudes, en plena región de Aysén. Para caminantes con experiencia.',
    sheet: 'Hoja 18G · CC 46',
    image: hojaCastillo,
    alt: 'Agujas de basalto del Cerro Castillo sobre una laguna glaciar, con un caminante en la morrena',
    locator: [57, 55],
  },
  {
    id: 'paine',
    name: 'Torres del Paine',
    subtitle: 'Circuito W',
    text: 'La base de las Torres al amanecer, el Valle del Francés entre glaciares colgantes y el Lago Grey con sus témpanos. Dormimos en refugios con todas las comidas incluidas.',
    sheet: 'Hoja 18F · TP 51',
    image: hojaPaine,
    alt: 'Las tres Torres del Paine sobre su laguna glaciar, con un campo de rocas en primer plano',
    locator: [54, 80],
  },
];

/** Escapadas cortas (mismo orden que el mockup). */
export const ESCAPES = [
  { id: 'exploradores', code: 'E-1 · Glaciar', title: 'Valle Exploradores y su glaciar' },
  { id: 'puyuhuapi', code: 'E-2 · Lagos', title: 'Lagos y fiordos de Puyuhuapi' },
  { id: 'esperanza', code: 'E-3 · Fotografía', title: 'Atardeceres de Última Esperanza' },
] as const;

export const NAV = [
  ['#expediciones', 'Rutas'],
  ['#ruta', 'Gran Travesía'],
  ['#mas', 'Escapadas'],
  ['#contacto', 'Contacto'],
] as const;

/** "-50.97" → "50.97° S" */
export const lat = (v: number) => `${Math.abs(v).toFixed(2)}° ${v < 0 ? 'S' : 'N'}`;
export const lon = (v: number) => `${Math.abs(v).toFixed(2)}° ${v < 0 ? 'W' : 'E'}`;
export const coord = (c: { lat: number; lon: number }) => `${lat(c.lat)} · ${lon(c.lon)}`;
export const pad2 = (n: number) => String(n).padStart(2, '0');
