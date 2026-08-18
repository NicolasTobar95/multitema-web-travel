import React from 'react';
import { useTranslation } from '../../../i18n';
import { sharedImages } from '../../../config/sharedImages';
import { useFloatTilt } from '../hooks/useFloatTilt';

/**
 * Nimbus Packages — differential piece #2 from the doc.
 *
 * Trevilo structure kept intact: 50/50 split, base image `rounded-[3rem]`,
 * floating "Bali Island" card `absolute top-16 right-0`. What's new:
 *   - The "Bali Island" card receives the same **float + tilt** treatment
 *     as the Hero search box — continuous vertical bobbing + 3D tilt
 *     on hover, with a cyan-tinted shadow that reinforces the feeling of
 *     real suspension (not just z-index).
 *   - Hardcoded "Bali Island"/"Bali, Indonesia" → migrated to
 *     `t('Nimbus.packages.floatingCard.{title,location}')`.
 *
 * Reuses `sharedImages.narrative[0]` (base image) and `sharedImages.destinations[1]`
 * (Bali thumbnail) — same indices as Trevilo (already fine-tuned decision).
 */
interface PackageFeature {
  title: string;
  icon: string;
}
interface PackageFloating {
  title: string;
  location: string;
}
interface PackageData {
  tag: string;
  title: string;
  desc: string;
  floatingCard: PackageFloating;
  features: PackageFeature[];
}

const Packages: React.FC = () => {
  const { t } = useTranslation();
  const packData = t('Nimbus.packages') as PackageData;

  // Bali card — imperative 3D tilt (no re-render). CSS float removed in P1 perf.
  const { ref: baliRef, onMouseMove: onBaliMove, onMouseLeave: onBaliLeave } = useFloatTilt<HTMLDivElement>(4);

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24 flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
      {/* Left Half: Overlapping Images */}
      <div className="w-full lg:w-1/2 relative h-[500px] flex justify-center lg:justify-start">
        {/* Large Base Image (seated hiker) */}
        <div className="w-[85%] md:w-[70%] h-full rounded-[3rem] overflow-hidden shadow-xl">
          <img src={sharedImages.narrative[0]} alt="Traveler exploring a scenic landscape" className="w-full h-full object-cover" loading="lazy" />
        </div>

        {/* Floating "Bali Island" Card — imperative tilt + cyan-tinted shadow */}
        <div
          ref={baliRef}
          onMouseMove={onBaliMove}
          onMouseLeave={onBaliLeave}
          className="absolute top-16 right-0 md:right-10 lg:-right-4 w-[60%] md:w-[45%] bg-white rounded-3xl p-4 shadow-2xl flex flex-col gap-4 transition-shadow duration-300 hover:shadow-[0_20px_60px_-15px_rgba(30,160,255,0.25)]"
        >
          <div className="w-full h-32 rounded-2xl overflow-hidden bg-neutral-100">
            <img src={sharedImages.destinations[1]} alt={packData.floatingCard.title} className="w-full h-full object-cover opacity-90" loading="lazy" />
          </div>
          <div className="flex flex-col px-2 pb-2">
            <span className="font-bold text-neutral-900 text-lg mb-1">{packData.floatingCard.title}</span>
            <div className="flex items-center gap-1 text-nimbus-accent text-xs font-bold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              {packData.floatingCard.location}
            </div>
          </div>
        </div>
      </div>

      {/* Right Half: Texts and Features */}
      <div className="w-full lg:w-1/2 flex flex-col items-start">
        <span className="text-nimbus-accent text-xs font-bold tracking-[0.2em] uppercase mb-4 bg-blue-50 border border-nimbus-accent/20 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(30,160,255,0.1)]">
          {packData.tag}
        </span>

        <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.1] mb-6 whitespace-pre-line">
          {packData.title}
        </h2>

        <p className="text-neutral-500 leading-relaxed mb-12 max-w-md">
          {packData.desc}
        </p>

        <div className="flex flex-col gap-6 w-full">
          {packData.features.map((feature: PackageFeature, index: number) => (
            <div key={index} className="group flex items-center gap-6 bg-white hover:bg-neutral-50 transition-colors p-4 rounded-2xl border border-neutral-100 hover:border-nimbus-accent/20 hover:shadow-[0_20px_60px_-15px_rgba(30,160,255,0.15)] shadow-sm cursor-default">
              {/* Dynamic icon */}
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-nimbus-accent transition-all duration-300 group-hover:bg-nimbus-accent group-hover:text-white">
                {index === 0 && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>}
                {index === 1 && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>}
                {index === 2 && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>}
              </div>
              <span className="text-lg font-bold text-neutral-900">{feature.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
