import { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { themeData } from './config/themeData';
import { dictionaries } from './config/dictionaries';
import { preloader } from './utils/preloader';
import FloatingControls from './components/layout/FloatingControls';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ErrorFallback } from './components/ErrorFallback';
import type { Language, Theme, LanguageContextType } from './i18n';
import { LanguageContext } from './i18n';
import './index.css';

const Waypoint = lazy(() => import('./themes/Waypoint'));
const Aura = lazy(() => import('./themes/Aura'));
const Aeria = lazy(() => import('./themes/Aeria'));
const Nimbus = lazy(() => import('./themes/Nimbus'));

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('Waypoint');
  const [language, setLanguage] = useState<Language>('en');

  const t = useMemo(() => (key: string): unknown => {
    const keys = key.split('.');
    let translation: unknown = dictionaries[language];
    for (const k of keys) {
      if (translation && typeof translation === 'object' && typeof (translation as Record<string, unknown>)[k] !== 'undefined') {
        translation = (translation as Record<string, unknown>)[k];
      } else {
        return { [key]: key };
      }
    }
    return translation;
  }, [language]);

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t('shared.meta.title') as string;
    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = t('shared.meta.description') as string;
  }, [language, t]);

  const handleThemeChange = async (newTheme: Theme, event: React.MouseEvent<HTMLButtonElement>) => {
    if (newTheme === theme) return;

    const x = event.clientX;
    const y = event.clientY;

    document.documentElement.style.setProperty('--circle-center-x', `${x}px`);
    document.documentElement.style.setProperty('--circle-center-y', `${y}px`);

    const nextHeroUrl = themeData[newTheme].heroImageUrl;

    // Preloader is best-effort. It no longer rejects and has a 4s timeout,
    // so it can never block the theme-change animation. If it succeeds the
    // hero image is warm-cached and paints instantly during the transition.
    await preloader(nextHeroUrl);

    // The CSS radial reveal is the baseline. It works on every modern browser
    // (Chrome/Edge/Firefox/Safari) because it only needs `clip-path` + rAF.
    // If the View Transitions API is available we layer it on top — both
    // animations run, but the native one is the visually dominant effect
    // because it animates the snapshot pair, while the CSS fallback covers
    // browsers where the API silently no-ops.
    const root = document.documentElement;
    root.classList.add('theme-changing');
    window.setTimeout(() => root.classList.remove('theme-changing'), 950);

    const apply = () => {
      // Two rAFs guarantee the browser paints the initial clip-path before
      // we mutate the DOM, otherwise the CSS animation never starts.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ReactDOM.flushSync(() => {
            setTheme(newTheme);
          });
        });
      });
    };

    if (document.startViewTransition) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  };

  const contextValue: LanguageContextType = useMemo(() => ({
    language,
    t,
    switchLanguage,
  }), [language, t]);

  const ActiveComponent = useMemo(() => {
    switch (theme) {
      case 'Aura': return Aura;
      case 'Aeria': return Aeria;
      case 'Nimbus': return Nimbus;
      case 'Waypoint': return Waypoint;
      default: return Waypoint;
    }
  }, [theme]);

  return (
    <LanguageContext.Provider value={contextValue}>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <FloatingControls
          currentTheme={theme}
          onThemeChange={handleThemeChange}
        />
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <div key={theme} className="animate-theme-enter">
            <ActiveComponent />
          </div>
        </Suspense>
      </ErrorBoundary>
    </LanguageContext.Provider>
  );
};

export default App;
