import { createContext, useContext } from 'react';

export type Language = 'en' | 'es';
export type Theme = 'Waypoint' | 'Aura' | 'Aeria' | 'Nimbus';

export interface LanguageContextType {
  language: Language;
  t: (key: string) => any;
  switchLanguage: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  t: () => ({}),
  switchLanguage: () => {},
});

export const useTranslation = (): LanguageContextType => useContext(LanguageContext);
