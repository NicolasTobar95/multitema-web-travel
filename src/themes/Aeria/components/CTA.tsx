import React from 'react';
import { useTranslation } from '../../../i18n';
import { sharedImages } from '../../../config/sharedImages';

const CTA: React.FC = () => {
  const { t } = useTranslation();
  const ctaData = t('Aeria.cta') as {
    explore: string;
    title: string;
    subtitle: string;
    button: string;
    labels: string[];
  };

  const galleryImages = [
    sharedImages.destinations[0],
    sharedImages.narrative[0],
    sharedImages.destinations[2],
    sharedImages.destinations[1],
    sharedImages.destinations[3],
    sharedImages.narrative[1],
    sharedImages.destinations[0],
    sharedImages.narrative[2],
  ];

  return (
    <section className="w-full flex flex-col items-center pt-24 pb-16 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-purple-400/40 text-xs font-semibold text-purple-700 bg-purple-50/50 mb-8 cursor-pointer hover:bg-purple-100/50 transition-all">
        {ctaData.explore}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
      </div>

      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-neutral-900 leading-[1.15] mb-6 whitespace-pre-line px-4">
        {ctaData.title}
      </h2>
      <p className="text-neutral-500 text-center mb-10 max-w-2xl px-4 whitespace-pre-line text-sm md:text-base">
        {ctaData.subtitle}
      </p>

      <button className="bg-purple-600 hover:bg-purple-700 active:bg-purple-700 text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 mb-20">
        {ctaData.button}
        <div className="bg-white/20 p-1 rounded-full">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </div>
      </button>

      <div className="w-full max-w-[1600px] mx-auto px-4">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-5 [&>div]:mb-3 md:[&>div]:mb-5">
          {galleryImages.map((img, idx) => {
            const spanClasses = [
              'h-[160px] md:h-[220px]',
              'h-[240px] md:h-[320px]',
              'h-[200px] md:h-[260px]',
              'h-[280px] md:h-[350px]',
              'h-[180px] md:h-[240px]',
              'h-[260px] md:h-[300px]',
              'h-[200px] md:h-[280px]',
              'h-[240px] md:h-[320px]',
            ];
            return (
              <div
                key={idx}
                className={`group relative break-inside-avoid rounded-2xl md:rounded-[2rem] overflow-hidden shadow-lg hover:shadow-purple-500/20 hover:scale-[1.02] transition-all duration-500 ${spanClasses[idx % spanClasses.length]}`}
              >
                <img src={img} alt={ctaData.labels[idx] ?? 'Gallery'} className="w-full h-full object-cover" />
                {/* Nombre del destino al pasar el cursor — overlay degradado inferior */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="absolute bottom-3 left-3 md:bottom-5 md:left-5 text-white font-bold text-sm md:text-lg tracking-wide translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  {ctaData.labels[idx] ?? ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CTA;