export const THEME_IDS = ['cordada', 'albor', 'brisa', 'cumulo'] as const;
export type ThemeId = (typeof THEME_IDS)[number];

export const DEFAULT_THEME: ThemeId = 'cordada';
/** Clave de localStorage con el último tema visto (la lee la redirección de "/"). */
export const THEME_STORAGE_KEY = 'cordada:tema';

export interface ThemeMeta {
  id: ThemeId;
  /** Nombre visible en el selector */
  label: string;
  /** Una línea que describe la dirección visual */
  style: string;
  /** Color de la barra del navegador */
  themeColor: string;
  colorScheme: 'light' | 'dark';
}

export const THEMES: Record<ThemeId, ThemeMeta> = {
  cordada: { id: 'cordada', label: 'Cordada', style: 'Cartográfico', themeColor: '#ECEFEA', colorScheme: 'light' },
  albor: { id: 'albor', label: 'Albor', style: 'Planificador', themeColor: '#F7F6F3', colorScheme: 'light' },
  brisa: { id: 'brisa', label: 'Brisa', style: 'Afiche de parque', themeColor: '#F2E8D0', colorScheme: 'light' },
  cumulo: { id: 'cumulo', label: 'Cúmulo', style: 'Suizo nocturno', themeColor: '#080B14', colorScheme: 'dark' },
};

export const isThemeId = (v: unknown): v is ThemeId =>
  typeof v === 'string' && (THEME_IDS as readonly string[]).includes(v);
