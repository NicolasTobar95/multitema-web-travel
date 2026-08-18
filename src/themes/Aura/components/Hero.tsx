import React, { useState } from 'react';
import { useTranslation } from '../../../i18n';
import { themeData } from '../../../config/themeData';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const heroData = t('Aura.hero');
  const [activeSearchCol, setActiveSearchCol] = useState<number | null>(null);

  return (
    <header className="relative w-full font-sans overflow-hidden">
      {/* Filtro SVG para efecto líquido orgánico — debe estar en el DOM
          global para que `filter:url(#liquid-filter)` lo encuentre al hover. */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id="liquid-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div 
        className="relative w-full min-h-[750px] md:h-[900px] rounded-b-[2rem] md:rounded-b-[3rem] overflow-hidden bg-cover bg-center flex flex-col items-center justify-center pt-32 pb-24 md:py-0 shadow-inner"
        style={{ backgroundImage: `url(${themeData.Aura.heroImageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/30 to-stone-900/85 z-0"></div>

        <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-6 max-w-5xl md:mt-10">
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold text-white tracking-tight leading-[1.02] mb-6 drop-shadow-lg break-words">
            {heroData.title}
          </h1>
          
          <p className="text-base sm:text-lg md:text-2xl text-amber-50 font-medium drop-shadow-md max-w-3xl mx-auto leading-relaxed transition-all duration-300 hover:scale-[1.01]">
            {heroData.subtitle}
          </p>

          {/* Buscador interactivo de cristal con resplandor ámbar */}
          <div className="mt-10 md:mt-14 w-full md:w-[900px] bg-stone-950/25 md:bg-white/10 backdrop-blur-2xl border border-white/10 md:border-white/20 rounded-3xl md:rounded-full p-2.5 flex flex-col md:flex-row items-center justify-between shadow-2xl transition-all duration-500">
            <div className="flex-1 flex flex-col md:flex-row w-full md:w-auto divide-y md:divide-y-0 md:divide-x divide-white/10 md:divide-white/20 text-white">
              
              {/* Fecha */}
              <div 
                onMouseEnter={() => setActiveSearchCol(0)}
                onMouseLeave={() => setActiveSearchCol(null)}
                className={`flex-1 px-5 py-4 md:py-3 flex items-center justify-between cursor-pointer group rounded-t-2xl md:rounded-l-full md:rounded-tr-none transition-all duration-300 min-h-[44px] ${
                  activeSearchCol === 0 
                    ? 'bg-amber-500/10 md:bg-amber-500/5 shadow-[0_0_20px_rgba(245,158,11,0.15)] text-amber-300' 
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`group-hover:scale-110 transition-transform ${activeSearchCol === 0 ? 'text-amber-400' : 'text-white/80'}`}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <span className="font-semibold text-sm sm:text-base">{heroData.search.date}</span>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`group-hover:transtone-y-0.5 transition-transform ${activeSearchCol === 0 ? 'text-amber-400' : 'text-white/60'}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>

              {/* Presupuesto */}
              <div 
                onMouseEnter={() => setActiveSearchCol(1)}
                onMouseLeave={() => setActiveSearchCol(null)}
                className={`flex-1 px-5 py-4 md:py-3 flex items-center justify-between cursor-pointer group transition-all duration-300 min-h-[44px] ${
                  activeSearchCol === 1 
                    ? 'bg-amber-500/10 md:bg-amber-500/5 shadow-[0_0_20px_rgba(245,158,11,0.15)] text-amber-300' 
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`group-hover:scale-110 transition-transform ${activeSearchCol === 1 ? 'text-amber-400' : 'text-white/80'}`}><rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M12 12h.01"></path><path d="M17 12h.01"></path><path d="M7 12h.01"></path></svg>
                  <span className="font-semibold text-sm sm:text-base">{heroData.search.budget}</span>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`group-hover:transtone-y-0.5 transition-transform ${activeSearchCol === 1 ? 'text-amber-400' : 'text-white/60'}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>

              {/* Huéspedes */}
              <div 
                onMouseEnter={() => setActiveSearchCol(2)}
                onMouseLeave={() => setActiveSearchCol(null)}
                className={`flex-1 px-5 py-4 md:py-3 flex items-center justify-between cursor-pointer group rounded-b-2xl md:rounded-r-full md:rounded-bl-none transition-all duration-300 min-h-[44px] ${
                  activeSearchCol === 2 
                    ? 'bg-amber-500/10 md:bg-amber-500/5 shadow-[0_0_20px_rgba(245,158,11,0.15)] text-amber-300' 
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`group-hover:scale-110 transition-transform ${activeSearchCol === 2 ? 'text-amber-400' : 'text-white/80'}`}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  <span className="font-semibold text-sm sm:text-base">{heroData.search.guest}</span>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`group-hover:transtone-y-0.5 transition-transform ${activeSearchCol === 2 ? 'text-amber-400' : 'text-white/60'}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              
            </div>
            
            {/* Botón con filtro de distorsión líquida SVG en Hover */}
            <button className="bg-white text-stone-900 rounded-full md:rounded-full rounded-2xl px-10 py-4 md:py-4 text-base font-extrabold shadow-xl hover:scale-105 active:scale-95 active:bg-amber-600 transition-all w-full md:w-auto mt-3 md:mt-0 min-h-[44px] hover:bg-amber-500 hover:text-stone-950 hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:[filter:url(#liquid-filter)] relative overflow-hidden group hover:-translate-y-0.5">
              <span className="relative z-10">{heroData.search.button}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Hero;