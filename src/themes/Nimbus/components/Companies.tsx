import React from 'react';
import { useTranslation } from '../../../i18n';

/**
 * Companies de Nimbus — premium redesign idea #2: "Infinity Floating Grid".
 *
 * Cambios respecto de Trevilo:
 *   - SVG "layers" duplicado entre Layers y Sisyphus → Sisyphus usa ícono
 *     distinto (círculos concéntricos). Deuda #9 cerrada.
 *   - Nombres hardcodeados → migrados a `t('Nimbus.companiesItems[]')`.
 *
 * Premium (redesign):
 *   - Banda estática → **ticker marquee infinito** (CSS @keyframes continuo,
 *     translateX 0 → -50%). Duplicamos los logos para loop seamless.
 *   - Cada logo reacciona al hover: se colorea (opacity 100), escala 1.1 y
 *     flota -translate-y-1. El resto se atenúa (opacity-40) para enfocar.
 *   - Pausa la animación al hover sobre el contenedor (`group-hover:[animation-play-state:paused]`).
 *
 * Mantiene `max-w-5xl`, la paleta por marca (purple/green/blue/indigo/fuchsia-600)
 * — era decisión ya afinada.
 */
type CompaniesProps = Record<string, never>;

// Paleta de color por marca (decisión afinada de Trevilo).
const COLORS = [
  'text-purple-600',
  'text-green-600',
  'text-blue-600',
  'text-indigo-600',
  'text-fuchsia-600',
] as const;

// SVGs por marca. Sisyphus (idx 1) con ícono distinto (deuda #9 cerrada).
const ICONS: React.ReactNode[] = [
  // 0: Layers
  <svg key="layers" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  // 1: Sisyphus — círculos concéntricos
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

  // Renderiza un logo individual con hover. Se reutiliza para ambas copias.
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

      {/* Contenedor del ticker con mascara de degradado en los bordes.
          group-hover pausa la animación al inspeccionar los logos. */}
      <div
        className="group relative w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        {/* Tira infinita: dos juegos de logos consecutivos. El keyframe
            anima el translateX de 0 a -50%, que es exactamente el ancho
            de un juego → loop seamless sin salto. */}
        <div
          className="flex items-center gap-16 w-max group-hover:[animation-play-state:paused]"
          style={{
            animation: 'nimbus-marquee 30s linear infinite',
          }}
        >
          {/* Juego 1 */}
          {items.map((name, idx) => renderLogo(name, idx, 'a'))}
          {/* Juego 2 — duplicado idéntico para el loop continuo */}
          {items.map((name, idx) => renderLogo(name, idx, 'b'))}
        </div>
      </div>

      {/* Keyframes inline — evita tocar index.css (regla del proyecto). */}
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
