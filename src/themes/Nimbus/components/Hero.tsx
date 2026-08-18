import React from 'react';
import { useTranslation } from '../../../i18n';
import { themeData } from '../../../config/themeData';
import { useFloatTilt } from '../hooks/useFloatTilt';

/**
 * Hero de Nimbus — pieza diferencial #1 del doc.
 *
 * Estructura intacta de Trevilo: tarjeta `rounded-[3rem]` con foto gigante,
 * overlay `black/20`, textos centrales con drop-shadow, y el contenedor del
 * buscador flotante `absolute bottom-10 z-20` con pestañas `-top-14` y la caja
 * `bg-white rounded-[2.5rem] shadow-2xl`.
 *
 * Lo nuevo:
 *   - La caja del buscador tiene **float vertical continuo** (translateY ±4px,
 *     4s ease-in-out) pausado en hover, y **tilt 3D** que sigue el cursor
 *     (perspective + rotateX/rotateY, máx 4°) — hook `useFloatTilt` variante
 *     default `float+tilt`. Es la diferencia entre una caja que "parece"
 *     flotar y una que efectivamente lo hace.
 *   - El CTA del buscador (`bg-[#1ea0ff]`) es **magnético**: se desplaza
 *     unos px hacia el cursor dentro de su radio de influencia — variante
 *     `magnetic` del mismo hook. Sombra teñida cian al hover.
 *
 * TODO el texto via `t('Nimbus.hero.*')` — cero strings hardcoded.
 */
interface HeroSearch {
  destination: string;
  destDesc: string;
  checkIn: string;
  inDesc: string;
  checkOut: string;
  outDesc: string;
  travelers: string;
  travDesc: string;
  button: string;
}
interface HeroData {
  tag: string;
  title: string;
  subtitle: string;
  tabs: string[];
  search: HeroSearch;
}

// Íconos dinámicos por pestaña (mismos SVGs de Trevilo, sin cambios).
const TAB_ICONS: React.ReactNode[] = [
  <svg key="0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>,
  <svg key="1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
  <svg key="2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="7" cy="16" r="1.5"></circle><circle cx="17" cy="16" r="1.5"></circle><path d="M3 11l2-5h14l2 5"></path></svg>,
  <svg key="3" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
];

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const heroData = t('Nimbus.hero') as HeroData;

  // Caja del buscador: tilt 3D imperativo (sin re-render). El float/magnetismo
  // continuo del doc Nimbus se simplificó en la P1 perf a un tilt puro porque
  // los RAF causaban 60+ re-renders/s en el componente raíz.
  const { ref: searchBoxRef, onMouseMove: onSearchBoxMove, onMouseLeave: onSearchBoxLeave } = useFloatTilt<HTMLDivElement>(4);

  // CTA del buscador: tilt imperativo (magnetismo removido en P1 perf).
  const { ref: ctaRef, onMouseMove: onCtaMove, onMouseLeave: onCtaLeave } = useFloatTilt<HTMLButtonElement>(4);

  return (
    <section className="w-full px-4 md:px-6 pt-2 md:pt-3 font-sans">
      {/* Tarjeta Fotográfica Gigante */}
      <div
        className="relative w-full h-[714px] md:h-[814px] rounded-[3rem] bg-cover bg-center flex flex-col items-center overflow-hidden"
        style={{ backgroundImage: `url(${themeData.Nimbus.heroImageUrl})` }}
      >
        {/* Gradiente oscuro suave para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30 z-0"></div>

        {/* Textos Centrales */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 mt-24">
          <span className="text-white/80 text-xs font-bold tracking-[0.2em] uppercase mb-4">
            {heroData.tag}
          </span>
          <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tight leading-[1.05] mb-6 max-w-4xl drop-shadow-md whitespace-pre-line transition-all duration-300 hover:scale-[1.01]">
            {heroData.title}
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl drop-shadow transition-all duration-300 hover:scale-[1.01]">
            {heroData.subtitle}
          </p>
        </div>

        {/* CONTENEDOR DEL BUSCADOR FLOTANTE */}
        <div className="absolute bottom-8 w-[95%] max-w-[1100px] z-20">
          {/* Pestañas flotantes (sobresalen del buscador principal) */}
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 flex items-center p-1.5 -mt-4 mb-4 bg-white/40 backdrop-blur-md rounded-full shadow-md border border-white/20">
            {heroData.tabs.map((tab: string, index: number) => (
              <button
                key={index}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                  index === 0 ? 'bg-white text-nimbus-secondary shadow-sm' : 'text-white hover:bg-white/20'
                }`}
              >
                {TAB_ICONS[index]}
                {tab}
              </button>
            ))}
          </div>

          {/* Caja principal del Buscador — tilt 3D imperativo */}
          <div
            ref={searchBoxRef}
            onMouseMove={onSearchBoxMove}
            onMouseLeave={onSearchBoxLeave}
            className="w-full bg-white rounded-[2.5rem] px-8 py-6 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 divide-y lg:divide-y-0 lg:divide-x divide-neutral-100 transition-shadow duration-300 hover:shadow-[0_20px_60px_-15px_rgba(30,160,255,0.25)]"
          >
            <div className="flex-1 w-full flex items-center gap-4 px-4 hover:bg-neutral-50 rounded-2xl p-2 cursor-pointer transition-colors group/field hover:scale-[1.01]">
              <div className="w-10 h-10 rounded-full bg-blue-50/70 flex items-center justify-center text-nimbus-secondary transition-all duration-300 group-hover/field:scale-110 group-hover/field:bg-nimbus-accent group-hover/field:text-white group-hover/field:shadow-[0_0_20px_rgba(30,160,255,0.4)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-neutral-900">{heroData.search.destination}</span>
                <span className="text-xs text-neutral-400">{heroData.search.destDesc}</span>
              </div>
            </div>

            <div className="flex-1 w-full flex items-center gap-4 px-4 hover:bg-neutral-50 rounded-2xl p-2 cursor-pointer transition-colors group/field hover:scale-[1.01]">
              <div className="w-10 h-10 rounded-full bg-blue-50/70 flex items-center justify-center text-nimbus-secondary transition-all duration-300 group-hover/field:scale-110 group-hover/field:bg-nimbus-accent group-hover/field:text-white group-hover/field:shadow-[0_0_20px_rgba(30,160,255,0.4)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-neutral-900">{heroData.search.checkIn}</span>
                <span className="text-xs text-neutral-400">{heroData.search.inDesc}</span>
              </div>
            </div>

            <div className="flex-1 w-full flex items-center gap-4 px-4 hover:bg-neutral-50 rounded-2xl p-2 cursor-pointer transition-colors group/field hover:scale-[1.01]">
              <div className="w-10 h-10 rounded-full bg-blue-50/70 flex items-center justify-center text-nimbus-secondary transition-all duration-300 group-hover/field:scale-110 group-hover/field:bg-nimbus-accent group-hover/field:text-white group-hover/field:shadow-[0_0_20px_rgba(30,160,255,0.4)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-neutral-900">{heroData.search.checkOut}</span>
                <span className="text-xs text-neutral-400">{heroData.search.outDesc}</span>
              </div>
            </div>

            <div className="flex-1 w-full flex items-center justify-between px-4">
              <div className="flex items-center gap-4 hover:bg-neutral-50 rounded-2xl p-2 cursor-pointer transition-colors flex-1 group/field">
                <div className="w-10 h-10 rounded-full bg-blue-50/70 flex items-center justify-center text-nimbus-secondary transition-all duration-300 group-hover/field:scale-110 group-hover/field:bg-nimbus-accent group-hover/field:text-white group-hover/field:shadow-[0_0_20px_rgba(30,160,255,0.4)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-neutral-900">{heroData.search.travelers}</span>
                  <span className="text-xs text-neutral-400">{heroData.search.travDesc}</span>
                </div>
              </div>

              {/* CTA — tilt imperativo */}
              <button
                ref={ctaRef}
                onMouseMove={onCtaMove}
                onMouseLeave={onCtaLeave}
                className="bg-nimbus-accent hover:bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] font-bold shadow-lg hover:shadow-[0_20px_60px_-15px_rgba(30,160,255,0.25)] hover:-translate-y-1 transition-all flex items-center gap-2 shrink-0 ml-16"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                {heroData.search.button}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
