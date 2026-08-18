import { useState } from 'react';
import { useTranslation } from '../../../i18n';
import { themeData } from '../../../config/themeData';
import { useInView } from '../../../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';
import { THEME_CONTAINER } from '../layout';
import GrainOverlay from './GrainOverlay';

interface OlympicStatsData {
  days: { label: string };
  mileage: { label: string };
  elevation: { label: string };
}

interface OlympicData {
  label: string;
  title: string;
  coords: string;
  text: string;
  stats: OlympicStatsData;
}

const OlympicNational = () => {
  const { t } = useTranslation();
  const olympicData = t('Waypoint.olympic') as OlympicData;
  const bgImage = '/src/webp/backgrounds/2.webp';

  const [sectionRef, inView] = useInView<HTMLElement>();

  const numericStats = themeData.Waypoint.stats.olympic;
  const daysCount = useCountUp(numericStats.days, inView);
  const mileageCount = useCountUp(numericStats.mileage, inView);
  const elevationCount = useCountUp(numericStats.elevation, inView);

  // State for the interactive elevation profile
  const [activeProfilePoint, setActiveProfilePoint] = useState<number | null>(null);
  const profilePoints = [
    { name: "Day 1: Mt. Garibaldi Trailhead", distance: "0 mi", elevation: "1,200 ft", desc: "Arranque en el bosque templado lluvioso." },
    { name: "Day 2: Black Tusk Pass", distance: "45 mi", elevation: "4,800 ft", desc: "Ascenso técnico sobre crestas de basalto volcánico." },
    { name: "Day 3: Olympic Summit Reach", distance: "104 mi", elevation: "7,965 ft", desc: "Conquista de la cima glaciar." }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 md:py-48 bg-cover bg-center text-white overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <GrainOverlay />
      <div className={`relative z-10 ${THEME_CONTAINER} flex flex-col gap-16`}>
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-10 items-end transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex flex-col items-start">
            <span className="text-xs font-bold tracking-[0.25em] text-zinc-300 uppercase mb-2">
              {olympicData.label}
            </span>
            <h2 className="text-5xl md:text-7xl font-display leading-none mb-2">
              {olympicData.title}
            </h2>
            <span className="text-xs tracking-[0.25em] text-zinc-400 font-medium">
              {olympicData.coords}
            </span>
          </div>
          
          <div className="flex justify-start md:justify-center mb-4 md:mb-0">
            <button className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/50 flex items-center justify-center hover:bg-white/10 hover:border-white transition-all duration-300 group">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="translate-x-0.5 text-white group-hover:scale-110 transition-transform">
                <path d="M5 3L19 12L5 21V3Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          
          <div className="flex gap-8 justify-start md:justify-end border-b border-white/20 pb-4">
            <div className="flex flex-col transition-all duration-300 transform">
              <span className="text-[10px] tracking-[0.25em] text-zinc-400 font-bold mb-1">{olympicData.stats.days.label}</span>
              <span className={`text-4xl md:text-5xl font-display ${activeProfilePoint === 0 ? 'text-red-400 scale-105' : activeProfilePoint === 1 ? 'text-red-400/80' : ''}`}>
                {(activeProfilePoint !== null ? (activeProfilePoint + 1).toString().padStart(2, '0') : daysCount.toString().padStart(2, '0'))}
              </span>
            </div>
            <div className="flex flex-col transition-all duration-300 transform">
              <span className="text-[10px] tracking-[0.25em] text-zinc-400 font-bold mb-1">{olympicData.stats.mileage.label}</span>
              <span className={`text-4xl md:text-5xl font-display ${activeProfilePoint !== null ? 'text-red-400' : ''}`}>
                {activeProfilePoint !== null ? profilePoints[activeProfilePoint].distance.replace(' mi', '') : mileageCount}
              </span>
            </div>
            <div className="flex flex-col transition-all duration-300 transform">
              <span className="text-[10px] tracking-[0.25em] text-zinc-400 font-bold mb-1">{olympicData.stats.elevation.label}</span>
              <span className={`text-4xl md:text-5xl font-display ${activeProfilePoint === 2 ? 'text-red-400 scale-105' : activeProfilePoint !== null ? 'text-red-400' : ''}`}>
                {activeProfilePoint !== null ? profilePoints[activeProfilePoint].elevation.replace(' ft', '') : elevationCount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* INTERACTIVE ELEVATION PROFILE (NEW DESIGN COMPONENT) */}
        <div 
          className={`w-full bg-white/5 backdrop-blur-md rounded-sm border border-white/10 p-6 transition-all duration-700 delay-100 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] tracking-[0.3em] font-bold text-zinc-300 uppercase">Perfil de Elevación GPS</span>
            <span className="text-[10px] tracking-[0.1em] text-zinc-400 font-medium">Pasa el cursor por los puntos de control</span>
          </div>

          <div className="relative h-28 w-full flex items-end">
            {/* Elevation SVG chart */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="profileGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Fill under the curve */}
              <path d="M 0 112 Q 280 80, 560 50 T 1120 10 L 1120 112 Z" fill="url(#profileGrad)" className="w-full" />
              {/* Profile line */}
              <path d="M 0 112 Q 280 80, 560 50 T 1120 10" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" className="w-full" />
            </svg>

            {/* Interactive points floating on the chart */}
            <div className="absolute inset-0 flex justify-between px-10 md:px-20 items-end pb-1.5 z-20">
              {profilePoints.map((_pt, idx) => (
                <div 
                  key={idx}
                  onMouseEnter={() => setActiveProfilePoint(idx)}
                  onMouseLeave={() => setActiveProfilePoint(null)}
                  className={`flex flex-col items-center cursor-pointer group transition-all duration-300 ${
                    activeProfilePoint === idx ? 'translate-y-[-4px]' : ''
                  }`}
                  style={{
                    transform: `translateY(${idx === 0 ? '-10px' : idx === 1 ? '-40px' : '-80px'})`
                  }}
                >
                  {/* Pulsing vertical dot */}
                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${
                    activeProfilePoint === idx ? 'bg-red-500 scale-125 shadow-[0_0_12px_#ef4444]' : 'bg-white border border-red-500'
                  }`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {/* Micro vertical label */}
                  <span className={`text-[9px] font-mono tracking-[0.25em] mt-2 px-1.5 py-0.5 rounded-sm transition-all ${
                    activeProfilePoint === idx ? 'bg-red-500 text-white font-bold' : 'text-zinc-400 bg-transparent'
                  }`}>
                    WP-0{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive info for the active point */}
          <div className="h-12 mt-4 flex items-center justify-between border-t border-white/10 pt-4">
            {activeProfilePoint !== null ? (
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 animate-fade-in w-full transition-all">
                <span className="text-xs font-bold text-red-400 tracking-wider uppercase font-display">
                  {profilePoints[activeProfilePoint].name}
                </span>
                <div className="flex items-center gap-4 text-xs text-zinc-300">
                  <span>Distancia: <strong>{profilePoints[activeProfilePoint].distance}</strong></span>
                  <span>Altura: <strong>{profilePoints[activeProfilePoint].elevation}</strong></span>
                  <span className="hidden md:inline text-zinc-400 italic">| {profilePoints[activeProfilePoint].desc}</span>
                </div>
              </div>
            ) : (
              <span className="text-xs text-zinc-400 italic">
                Pasa el mouse sobre WP-01, WP-02 o WP-03 para ver los hitos del trayecto y actualizar los contadores en tiempo real.
              </span>
            )}
          </div>
        </div>

        <div className={`flex justify-center mt-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-center text-sm md:text-base text-zinc-300 max-w-2xl leading-relaxed">
            {olympicData.text}
          </p>
        </div>
      </div>
    </section>
  );
};

export default OlympicNational;
