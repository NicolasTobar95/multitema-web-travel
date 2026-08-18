import React from 'react';
import { useTranslation } from '../../../i18n';
import { sharedImages } from '../../../config/sharedImages';

interface DestCard {
  id: string;
  title: string;
  location: string;
  description: string;
  imageIdx: number;
}

const Destinations: React.FC = () => {
  const { t } = useTranslation();
  const destData = t('Aura.destinations') as {
    subtitle: string;
    title: string;
    description: string;
    cards: Array<{
      id: string;
      title: string;
      location: string;
      description: string;
      imageIdx: number;
    }>;
  };
  const cards: DestCard[] = destData.cards;
  const images = sharedImages.destinations;

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 md:px-10 py-16 font-sans">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-amber-500"></div>
            <span className="text-amber-500 font-bold text-sm tracking-[0.2em] uppercase">
              {destData.subtitle}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-amber-600 leading-tight">
            {destData.title}
          </h2>
        </div>
        <div className="flex-1 md:max-w-xl">
          <p className="text-stone-500 leading-relaxed text-base md:text-lg">
            {destData.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
        {cards.map((card, i) => {
          const isWide = i % 2 === 0;
          const colSpan = isWide ? 'md:col-span-3' : 'md:col-span-2';
          const idx = card.imageIdx !== undefined ? card.imageIdx : i;

          return (
            <div key={card.id} className={`${colSpan} h-[300px] sm:h-[400px] relative rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500`}>
              <img src={images[idx]} alt={card.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />

              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end transition-transform duration-500">
                <span className="text-white/80 text-sm font-semibold mb-2 uppercase tracking-wider">{card.location}</span>
                <div className="flex items-center justify-between">
                  <h3 className="text-white text-2xl md:text-4xl font-extrabold">{card.title}</h3>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 -transtone-x-4 group-hover:transtone-x-0 transition-all duration-500 delay-100">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Destinations;
