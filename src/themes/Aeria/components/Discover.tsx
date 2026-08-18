import React from 'react';
import { useTranslation } from '../../../i18n';

const Discover: React.FC = () => {
  const { t } = useTranslation();
  const discData = t('Aeria.discover') as Record<string, string>;

  return (
    <section className="w-full relative overflow-hidden font-sans">
      {/* Full-bleed background image (backgrounds/7.jpg at 10% opacity) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: 'url(/src/webp/backgrounds/7.jpg)' }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-[10.92rem] md:py-[14.56rem] flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        {/* Col 1: content */}
        <div className="flex flex-col items-start w-full lg:w-1/2">
          <div className="flex gap-2 mb-8">
            {['tag', 'tag2', 'tag3'].map((key, i) => (
              <span key={i} className="px-4 py-1.5 rounded-full border border-neutral-200 text-xs font-semibold text-neutral-600">
                {discData[key]}
              </span>
            ))}
          </div>

          <h3 className="text-3xl md:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.15] mb-6 max-w-xl">
            {discData.titleLeft}
          </h3>
          <p className="text-neutral-500 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
            {discData.descLeft}
          </p>

          <div className="flex items-center justify-between gap-8 w-full max-w-xl">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-7 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-colors shadow-lg">
              {discData.btnLeft}
              <div className="bg-white/20 p-1 rounded-full">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </div>
            </button>
            <span className="text-sm font-bold text-neutral-400">{t('Aeria.discover.page') as string || '1 / 5'}</span>
          </div>
        </div>

        {/* Col 2: background image 6 with rounded corners */}
        <div className="w-full lg:w-1/2">
          <div
            className="w-full h-[320px] md:h-[440px] lg:h-[520px] rounded-[2.5rem] bg-cover bg-center shadow-xl"
            style={{ backgroundImage: 'url(/src/webp/backgrounds/6.jpg)' }}
            aria-label="Discover"
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Discover;
