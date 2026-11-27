/** Constantes del catálogo compartidas por el esquema de contenido y los componentes. */

export const LANDSCAPES = ['montana', 'bosque', 'glaciar', 'lagos', 'todos'] as const;
export type Landscape = (typeof LANDSCAPES)[number];

/** Filtros del carrusel, en orden. "todos" muestra todo. */
export const LANDSCAPE_FILTERS: ReadonlyArray<readonly [Landscape, string]> = [
  ['todos', 'Todos'],
  ['montana', 'Montaña'],
  ['bosque', 'Bosque'],
  ['glaciar', 'Glaciar'],
  ['lagos', 'Lagos y fiordos'],
];

export const PHOTOS = ['trek', 'snow', 'forest', 'valley', 'lake', 'sunset'] as const;
export type Photo = (typeof PHOTOS)[number];

export const PHOTO_ALT: Record<Photo, string> = {
  trek: 'Dos excursionistas en el sendero de Torres del Paine',
  snow: 'Caminante sobre una cresta nevada frente a una cordillera',
  forest: 'Bosque lluvioso con rayos de luz entre la neblina',
  valley: 'Valle con un río trenzado entre montañas nevadas y bosque',
  lake: 'Lago verde entre pinos con un cerro en la neblina',
  sunset: 'Atardecer entre árboles con un cerro al fondo',
};

export const AGENCY = {
  name: 'Cordada',
  motto: 'Patagonia sin atajos',
  maxGroup: 12,
  season: 'octubre a abril',
  includes: ['traslados', 'refugios', 'comidas', 'permisos', 'seguro'],
} as const;
