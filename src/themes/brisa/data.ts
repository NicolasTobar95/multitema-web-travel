/** Textos propios de Brisa (afiche de parque). Los viajes vienen de trips.json. */
import type { ImageMetadata } from 'astro';
import medidaEquipo from '@/assets/img/brisa/medida-equipo.jpg';
import medidaFoto from '@/assets/img/brisa/medida-foto.jpg';
import medidaGrupo from '@/assets/img/brisa/medida-grupo.jpg';
import parcheEquipo from '@/assets/img/brisa/parche-equipo.png';
import parcheGuias from '@/assets/img/brisa/parche-guias.png';
import parcheTraslados from '@/assets/img/brisa/parche-traslados.png';

export const NAV = [
  ['#servicios', 'Servicios'],
  ['#destinos', 'Destinos'],
  ['#a-medida', 'A medida'],
  ['#contacto', 'Contacto'],
] as const;

export const BADGES: ReadonlyArray<{ ring: string; title: string; text: string; patch: ImageMetadata; color: string }> = [
  { ring: 'GUÍAS LOCALES · BILINGÜES ·', title: 'Guías de la zona', text: 'Bilingües y certificados en primeros auxilios en lugares remotos.', patch: parcheGuias, color: 'var(--teal)' },
  { ring: 'EQUIPO INCLUIDO · CARPAS ·', title: 'Equipo incluido', text: 'Carpas, sacos y bastones donde se necesitan, o en arriendo si prefieres.', patch: parcheEquipo, color: 'var(--pine)' },
  { ring: 'TRASLADOS · PERMISOS ·', title: 'Traslados y permisos', text: 'Aeropuerto, buses, navegaciones y entradas a los parques, todo coordinado.', patch: parcheTraslados, color: 'var(--ink)' },
];

export const TAILOR: ReadonlyArray<{ title: string; text: string; cta: string; img: ImageMetadata; alt: string }> = [
  {
    title: 'Tu grupo, tus fechas',
    text: 'Con amigos, familia o tu pareja: elegimos juntos la ruta y la fecha, y el guía es solo para ustedes. Desde 4 personas.',
    cta: 'Cotizar un viaje',
    img: medidaGrupo,
    alt: 'Un grupo de amigos camina riendo por un sendero de bosque',
  },
  {
    title: 'Equipos que caminan juntos',
    text: 'Retiros de trabajo con caminatas, actividades de equipo y alojamiento resuelto en la Patagonia.',
    cta: 'Cotizar un retiro',
    img: medidaEquipo,
    alt: 'Un equipo de trabajo camina por la orilla de un lago mientras el guía señala las montañas',
  },
  {
    title: 'A buscar la mejor luz',
    text: 'Un fotógrafo guía te lleva a los miradores a la hora dorada, con revisión de fotos cada noche. Grupos de 6.',
    cta: 'Ver fechas',
    img: medidaFoto,
    alt: 'Un fotógrafo con trípode en una loma frente a las Torres del Paine a la hora dorada',
  },
];

/** Galería de postales: viajes en el orden del mockup */
export const GALLERY = ['paine', 'pumalin', 'castillo', 'puyuhuapi', 'esperanza', 'exploradores'] as const;

/** Testimonio principal (postal) y los dos secundarios */
export const POSTAL = 'camila';
export const QUOTES = ['laura', 'tomas'] as const;
