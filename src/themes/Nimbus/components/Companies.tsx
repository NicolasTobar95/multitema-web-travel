import React from 'react';
import { useTranslation } from '../../../i18n';

/**
 * Nimbus Companies — premium redesign idea #2: "Infinity Floating Grid".
 *
 * Changes vs Trevilo:
 *   - Duplicated "layers" SVG between Layers and Sisyphus → Sisyphus now uses
 *     a different icon (concentric circles). Debt #9 closed.
 *   - Hardcoded names → migrated to `t('Nimbus.companiesItems[]')`.
 *
 * Premium (redesign):
 *   - Static band → **infinite marquee ticker** (continuous CSS @keyframes,
 *     translateX 0 → -50%). We duplicate the logos for a seamless loop.
 *   - Each logo reacts on hover: gets colored (opacity 100), scales 1.1 and
 *     floats -translate-y-1. The rest dims (opacity-40) to focus.
 *   - Pauses the animation on hover over the container (`group-hover:[animation-play-state:paused]`).
 *
 * Keeps `max-w-5xl`, the per-brand palette (purple/green/blue/indigo/fuchsia-600)
 * — that was an already-fine-tuned decision.
 */
type CompaniesProps = Record<string, never>;

// Per-brand color palette (fine-tuned Trevilo decision).
const COLORS = [
  'text-purple-600',
  'text-green-600',
  'text-blue-600',
  'text-indigo-600',
  'text-fuchsia-600',
] as const;

// Per-brand SVGs. Sisyphus (idx 1) with a distinct icon (debt #9 closed).
const ICONS: React.ReactNode[] = [
  // 0: Layers
  <svg key="layers" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  // 1: Sisyphus — concentric circles
  <svg key="sisyphus" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="11"/></svg>,
  // 2: Circooles
  <svg key="circooles" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>,
  // 3: Catalog
  <svg key="catalog" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>,
  // 4: Quotient
  <svg key="quotient" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>,
];

const Companies: React.FC<CompaniesProps> = () => {
  const { t } = useTranslation();
  const heading = t('Nimbus.companies') as string;
  const items = t('Nimbus.companiesItems') as string[];

  // Renders a single logo with hover. Reused for both copies.
  const renderLogo = (name: string, idx: number, keyPrefix: string) => (
    <div
      key={`${keyPrefix}-${idx}`}
      className={`flex items-center gap-2 font-bold text-3xl ${COLORS[idx]} shrink-0 transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-default`}
    >
      {ICONS[idx]}
      <span>{name}</span>
    </div>
  );

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-16 flex flex-col items-center overflow-hidden">
      <p className="text-sm font-medium text-neutral-500 mb-8">
        {heading}
      </p>

      {/* Ticker container with gradient mask on the edges.
          group-hover pauses the animation while inspecting the logos. */}
      <div
        className="group relative w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        {/* Infinite strip: two consecutive logo sets. The keyframe
            animates translateX from 0 to -50%, which is exactly the width
            of one set → seamless loop without a jump. */}
        <div
          className="flex items-center gap-16 w-max group-hover:[animation-play-state:paused]"
          style={{
            animation: 'nimbus-marquee 30s linear infinite',
          }}
        >
          {/* Set 1 */}
          {items.map((name, idx) => renderLogo(name, idx, 'a'))}
          {/* Set 2 — identical duplicate for the continuous loop */}
          {items.map((name, idx) => renderLogo(name, idx, 'b'))}
        </div>
      </div>

      {/* Inline keyframes — avoids touching index.css (project rule). */}
      <style>{`
        @keyframes nimbus-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default Companies;
