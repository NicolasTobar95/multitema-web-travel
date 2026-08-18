import React, { useRef, useState } from 'react';
import { useTranslation } from '../../../i18n';
import { sharedImages } from '../../../config/sharedImages';

type Destination = {
  title: string;
  location: string;
  rating: string;
  dates: string;
  price: string;
  climate?: 'cold' | 'hot';
};

type SpotsData = {
  title: string;
  subtitle: string;
  label: string;
  recommended: string;
  perNight: string;
  filters: string[];
  destinations: Destination[];
};

// Climate icons — snowflake (cold) and sun (hot)
const ColdIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="4" y1="6" x2="20" y2="18" />
    <line x1="20" y1="6" x2="4" y2="18" />
  </svg>
);

const HotIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
    <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
    <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
  </svg>
);

const RelaxingSpots: React.FC = () => {
  const { t } = useTranslation();
  const spotData = t('Aeria.spots') as SpotsData;
  const scrollRef = useRef<HTMLDivElement>(null);

  // State for interactive "magnetic" filters
  const filters = spotData.filters;
  const [activeFilterIdx, setActiveFilterIdx] = useState(0);

  // i18n destinations mapped
  const destinations = spotData.destinations;

  // Filter or shuffle the destinations interactively by button (by index, language-agnostic)
  const filteredDestinations = destinations.filter((dest, idx) => {
    if (activeFilterIdx === 0) return true;
    if (activeFilterIdx === 1) return idx === 0 || idx === 2; // Beaches
    if (activeFilterIdx === 2) return idx === 1; // Temples
    if (activeFilterIdx === 3) return idx === 3; // Cities
    if (activeFilterIdx === 4) return dest.climate === 'cold'; // Cold
    if (activeFilterIdx === 5) return dest.climate === 'hot'; // Hot
    return true;
  });

  return (
    <section className="w-full bg-purple-50/70 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      
      {/* Carousel Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10">
        <div className="flex flex-col">
          <span className="text-xs font-bold tracking-[0.2em] text-purple-600 uppercase mb-2">{spotData.label}</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight whitespace-pre-line leading-[1.15]">
            {spotData.title}
          </h2>
        </div>
        <p className="text-neutral-500 text-sm max-w-md leading-relaxed border-l-2 border-purple-500/30 pl-4">
          {spotData.subtitle}
        </p>
      </div>

      {/* Magnetic Filter Pills */}
      <div className="flex gap-2.5 mb-10 overflow-x-auto pb-1 scrollbar-hide">
        {filters.map((filter, i) => (
          <button
            key={i}
            onClick={() => setActiveFilterIdx(i)}
            className={`px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-1.5 ${
              activeFilterIdx === i
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25 scale-105'
                : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-600 hover:scale-102 active:scale-98'
            }`}
          >
            {i === 4 && <ColdIcon />}
            {i === 5 && <HotIcon />}
            {filter}
          </button>
        ))}
      </div>

      {/* Carousel with interactive Gliding Slide physics */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 -mx-2 px-2 scrollbar-thin scrollbar-thumb-purple-100 scrollbar-track-transparent"
        style={{ scrollbarWidth: 'auto' }}
      >
        {filteredDestinations.map((_dest: Destination, idx: number) => {
          // Get the destination's original index to map the correct image
          const originalIdx = destinations.findIndex(d => d.title === _dest.title);
          const imgIdx = originalIdx !== -1 ? originalIdx : idx;

          return (
            <div 
              key={idx} 
              className="min-w-[280px] md:min-w-[320px] snap-start flex-shrink-0 flex flex-col group cursor-pointer bg-white border border-neutral-100 hover:border-purple-500/20 rounded-[2.5rem] p-4 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/5 hover:-translate-y-2"
            >
              {/* Image with zoom and soft refraction */}
              <div className="w-full h-[260px] rounded-[2rem] overflow-hidden mb-4 relative">
                <img
                  src={sharedImages.destinations[imgIdx % sharedImages.destinations.length]}
                  alt={_dest.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-neutral-800 shadow-sm flex items-center gap-1 uppercase tracking-wider">
                  <span className="text-purple-600">✦</span> Recomendado
                </div>
                {_dest.climate && (
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm flex items-center gap-1 uppercase tracking-wider">
                    <span className={_dest.climate === 'cold' ? 'text-sky-500' : 'text-orange-500'}>
                      {_dest.climate === 'cold' ? <ColdIcon /> : <HotIcon />}
                    </span>
                    {_dest.climate === 'cold' ? 'Cold' : 'Hot'}
                  </div>
                )}
              </div>

              {/* Title and Rating */}
              <div className="flex justify-between items-start mb-1 px-1">
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-purple-600 transition-colors duration-300">{_dest.title}</h3>
                <div className="flex items-center gap-1 text-sm font-bold text-neutral-900 bg-neutral-50 px-2 py-0.5 rounded-full">
                  <span className="text-amber-500">★</span> {_dest.rating}
                </div>
              </div>

              <p className="text-neutral-500 text-sm mb-4 px-1">{_dest.location}</p>

              {/* Card footer with price */}
              <div className="flex justify-between items-center pt-4 border-t border-neutral-100 px-1 mt-auto">
                <span className="text-xs font-semibold text-neutral-400">{_dest.dates}</span>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-neutral-900">{_dest.price}</span>
                  <span className="text-xs text-neutral-500 font-medium">{spotData.perNight}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
};

export default RelaxingSpots;