import React from 'react';
import { useTranslation, type Theme } from '../../i18n';

interface FloatingControlsProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme, event: React.MouseEvent<HTMLButtonElement>) => void;
}

const FloatingControls: React.FC<FloatingControlsProps> = ({ currentTheme, onThemeChange }) => {
  const { t, language, switchLanguage } = useTranslation();

  return (
    <aside className="fixed bottom-6 left-6 flex flex-col items-start gap-3 z-50">
      {/* Selector de Idioma */}
      <div className="bg-white/90 backdrop-blur p-2 rounded-xl shadow-lg border border-neutral-100 flex gap-2">
        <button
          onClick={() => switchLanguage('en')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
            language === 'en' ? 'bg-indigo-600 text-white' : 'text-neutral-700 hover:bg-neutral-50'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => switchLanguage('es')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
            language === 'es' ? 'bg-indigo-600 text-white' : 'text-neutral-700 hover:bg-neutral-50'
          }`}
        >
          ES
        </button>
      </div>

      {/* Selector de Tema */}
      <div className="bg-white/90 backdrop-blur p-3 rounded-xl shadow-lg border border-neutral-100 flex flex-col items-end gap-2">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mr-1">
          {t('controls.theme') as string || 'Theme'}
        </span>
        <div className="flex flex-wrap justify-end gap-2 max-w-[250px] md:max-w-none">
          <button
            onClick={(e) => onThemeChange('Waypoint', e)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              currentTheme === 'Waypoint' ? 'bg-indigo-600 text-white' : 'text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            Waypoint
          </button>
          <button
            onClick={(e) => onThemeChange('Aura', e)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              currentTheme === 'Aura' ? 'bg-indigo-600 text-white' : 'text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            Aura
          </button>
          <button
            onClick={(e) => onThemeChange('Aeria', e)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              currentTheme === 'Aeria' ? 'bg-indigo-600 text-white' : 'text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            Aeria
          </button>
          <button
            onClick={(e) => onThemeChange('Nimbus', e)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              currentTheme === 'Nimbus' ? 'bg-indigo-600 text-white' : 'text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            Nimbus
          </button>
        </div>
      </div>
    </aside>
  );
};

export default FloatingControls;