import React from 'react';
import { useTranslation } from '../../../i18n';
import { useInView } from '../../../hooks/useInView';

interface StatItem {
  id: string;
  value: string;
  label: string;
}

const Stats: React.FC = () => {
  const { t } = useTranslation();
  const statsData: StatItem[] = t('Aura.stats') as StatItem[];
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className={`relative z-20 w-full px-4 md:px-10 -mt-20 md:-mt-28 mb-24 max-w-[1400px] mx-auto transition-all duration-700 ${
        inView ? 'opacity-100 transtone-y-0' : 'opacity-0 transtone-y-8'
      }`}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {statsData.map((stat) => (
          <div 
            key={stat.id} 
            className="bg-white rounded-[2rem] p-6 md:p-10 flex flex-col items-center justify-center shadow-xl shadow-amber-500/5 hover:-translate-y-3 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 border border-amber-500/10"
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 tracking-tight text-amber-600">
              {stat.value}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-stone-500 font-semibold text-center uppercase tracking-[0.2em]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;