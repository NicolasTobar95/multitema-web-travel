import React from 'react';
import { useTranslation } from '../../../i18n';
import { useInView } from '../../../hooks/useInView';

type Service = {
  id: string;
  title: string;
  desc: string;
  action: string;
};

type ServicesData = {
  title: string;
  subtitle: string;
  cards: Service[];
};

interface ServiceCardProps {
  card: Service;
  bg: string;
  btn: string;
  icon: React.ReactNode;
  iconColor: string;
}

// Top-right icons per card: plane (Flight Finder),
// hotel (Hotels Service), visa (Visa processing). Height = number badge
// (3rem) + mb-6 gap (1.5rem) + title line (1.75rem).
const SERVICE_ICONS: React.ReactNode[] = [
  <svg key="plane" className="h-[6.25rem] w-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/></svg>,
  <svg key="hotel" className="h-[6.25rem] w-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>,
  <svg key="visa" className="h-[6.25rem] w-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M15 8h4"/><path d="M15 12h4"/><path d="M7 16h10"/></svg>,
];

// Icon stroke color: #f3e8ff (purple-100), #e9d5ff (purple-200).
const ICON_COLORS = ['text-[#f3e8ff]', 'text-[#e9d5ff]', 'text-[#f3e8ff]'];

const ServiceCard: React.FC<ServiceCardProps> = ({ card, bg, btn, icon, iconColor }) => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`bg-white rounded-3xl p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-purple-500/10 border border-purple-500/10 flex flex-col items-start relative hover:-translate-y-1 transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className={`absolute top-8 right-8 ${iconColor}`} aria-hidden="true">
        {icon}
      </div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm mb-6 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-shadow ${bg}`}>
        {card.id}
      </div>
      <h3 className="text-xl font-bold text-neutral-900 mb-3">{card.title}</h3>
      <p className="text-neutral-500 text-sm leading-relaxed mb-8 flex-1">
        {card.desc}
      </p>
      <button className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${btn}`}>
        {card.action}
      </button>
    </div>
  );
};

const Services: React.FC = () => {
  const { t } = useTranslation();
  const servData = t('Aeria.services') as ServicesData;

  const bgColors = [
    'bg-purple-100 text-purple-600',
    'bg-purple-200 text-purple-600',
    'bg-purple-100 text-purple-600',
  ];
  const btnColors = [
    'bg-purple-500 hover:bg-purple-600 text-white',
    'bg-neutral-100 text-neutral-800 hover:bg-neutral-200',
    'bg-neutral-100 text-neutral-800 hover:bg-neutral-200',
  ];

  const cards = servData?.cards || [];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20 flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-neutral-900 mb-4 whitespace-pre-line tracking-tight">
        {servData?.title}
      </h2>
      <p className="text-neutral-500 text-center mb-16">
        {servData?.subtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {cards.map((card: Service, idx: number) => {
          const safeIdx = idx % bgColors.length;
          return (
            <ServiceCard
              key={idx}
              card={card}
              bg={bgColors[safeIdx]}
              btn={btnColors[safeIdx]}
              icon={SERVICE_ICONS[safeIdx]}
              iconColor={ICON_COLORS[safeIdx]}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Services;
