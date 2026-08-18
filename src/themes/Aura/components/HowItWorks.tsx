import React, { useState } from 'react';
import { useTranslation } from '../../../i18n';
import { sharedImages } from '../../../config/sharedImages';

const HowItWorks: React.FC = () => {
  const { t } = useTranslation();
  const howData = t('Aura.howItWorks') as {
    steps: StepItem[];
    widget: { date: string; budget: string; search: string };
    overlayText: string;
    subtitle: string;
    title: string;
  };
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const mainImage = sharedImages.narrative[0];

  const iconsMap: Record<string, React.ReactNode> = {
    search: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    ),
    book: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
    ),
    card: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
    ),
    pin: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
    ),
  };

  interface StepItem {
    id: string;
    title: string;
    desc: string;
    icon: string;
  }

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 md:px-10 py-16 md:py-24 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center font-sans">
      
      {/* Immersive interactive left container */}
      <div className="w-full lg:w-1/2 relative h-[600px] md:h-[750px] rounded-[3rem] overflow-hidden shadow-2xl shadow-stone-200/50 group">
        <img src={mainImage} alt="Traveler enjoying a scenic destination" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col gap-6 z-20">
          
          {/* Interactive glass widget that changes visually with the active step */}
          <div className="relative w-full max-w-md">
            
            {/* Widget animation per active step */}
            <div className="bg-amber-500/10 backdrop-blur-xl border border-amber-500/30 rounded-2xl md:rounded-full p-2 flex flex-col sm:flex-row items-center justify-between shadow-2xl transition-all duration-500">
              
              <div className="flex-1 flex w-full sm:w-auto divide-y sm:divide-y-0 sm:divide-x divide-white/10 text-white text-xs sm:text-sm">
                
                {/* Date Indicator - Highlights on Step 1 */}
                <div className={`flex-1 px-4 py-3 sm:py-2 flex items-center justify-between transition-all duration-300 ${
                  activeStepIndex === 0 
                    ? 'text-amber-400 font-bold scale-105 bg-white/5 rounded-t-xl sm:rounded-l-full sm:rounded-r-none' 
                    : 'opacity-70'
                }`}>
                  <span className="tracking-wide">{t('Aura.howItWorks.widget.date') as string}</span>
                  {activeStepIndex === 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping absolute right-2 top-2" />
                  )}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                
                {/* Budget Indicator - Highlights on Step 2 */}
                <div className={`flex-1 px-4 py-3 sm:py-2 flex items-center justify-between border-t sm:border-t-0 sm:border-l border-white/15 transition-all duration-300 ${
                  activeStepIndex === 1 
                    ? 'text-amber-400 font-bold scale-105 bg-white/5' 
                    : 'opacity-70'
                }`}>
                  <span className="tracking-wide">{t('Aura.howItWorks.widget.budget') as string}</span>
                  {activeStepIndex === 1 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping absolute right-2 top-2" />
                  )}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>

              </div>

              {/* Interactive button - Changes text and color on Step 3 (Pay/Confirm) */}
              <button className={`w-full sm:w-auto px-6 py-3 sm:py-2 rounded-xl sm:rounded-full text-xs font-extrabold ml-0 sm:ml-2 mt-2 sm:mt-0 transition-all duration-500 shadow-lg ${
                activeStepIndex === 2 
                  ? 'bg-amber-500 text-stone-950 scale-105 shadow-[0_0_15px_rgba(245,158,11,0.5)]' 
                  : activeStepIndex === 3 
                    ? 'bg-emerald-500 text-white scale-105'
                    : 'bg-white text-stone-900 hover:scale-105'
              }`}>
                {activeStepIndex === 2 
                  ? '¡Confirmar! ✓' 
                  : activeStepIndex === 3
                    ? '¡Listo! ✈'
                    : t('Aura.howItWorks.widget.search') as string
                }
              </button>
            </div>

            {/* Floating success micro-card that glows on the final step */}
            {activeStepIndex >= 2 && (
              <div className="absolute top-[-70px] left-1/2 -transtone-x-1/2 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-amber-500/20 flex items-center gap-3 animate-bounce z-30">
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-stone-900 font-extrabold text-sm shadow-md">✓</div>
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-stone-900 uppercase tracking-wider">Aura Premium Booking</span>
                  <span className="text-[10px] text-stone-500 font-medium">¡Ruta lista para despegar!</span>
                </div>
              </div>
            )}

          </div>

          <p className="text-white/90 text-sm md:text-base leading-relaxed font-medium">
            {howData.overlayText}
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col">
        
        <div className="flex items-center gap-4 mb-4">
          <div className="h-[2px] w-12 bg-amber-500"></div>
          <span className="text-amber-500 font-bold text-sm tracking-[0.2em] uppercase">
            {howData.subtitle}
          </span>
        </div>
        
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-amber-600 mb-12 leading-tight">
          {howData.title}
        </h2>
        
        <div className="flex flex-col gap-2">
          {(howData.steps as StepItem[]).map((step, idx) => (
            <div 
              key={step.id} 
              onMouseEnter={() => setActiveStepIndex(idx)}
              className={`flex items-start gap-6 cursor-pointer p-4 md:p-6 -mx-4 md:-mx-6 rounded-3xl transition-all duration-300 border border-transparent ${
                activeStepIndex === idx 
                  ? 'bg-stone-50 border-stone-100 shadow-sm' 
                  : 'hover:bg-stone-50/50'
              }`}
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ease-out ${
                activeStepIndex === idx 
                  ? 'bg-stone-900 text-white scale-110 shadow-lg' 
                  : 'bg-white border border-stone-100 text-stone-600'
              }`}>
                {iconsMap[step.icon] || iconsMap.search}
              </div>
              
              <div className="flex flex-col gap-1.5 pt-1 md:pt-2">
                <h4 className={`text-xl md:text-2xl font-bold transition-colors ${
                  activeStepIndex === idx ? 'text-amber-600' : 'text-stone-900'
                }`}>
                  {step.title}
                </h4>
                <p className="text-stone-500 text-sm md:text-base leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default HowItWorks;