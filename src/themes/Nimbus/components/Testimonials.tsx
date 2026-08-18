import React from 'react';
import { useTranslation } from '../../../i18n';
import { sharedImages } from '../../../config/sharedImages';
import { useFloatTilt } from '../hooks/useFloatTilt';

/**
 * Testimonials de Nimbus — premium redesign idea #4: "Modo Gravedad Cero".
 *
 * Correcciones previas respecto de Trevilo:
 *   - Estrellas siempre 5 → ahora `rating` llenas + `5 - rating` vacías.
 *   - `avatars[idx % 3]` → `idx % avatars.length` dinámico.
 *
 * Premium (redesign):
 *   - Cada tarjeta flota de forma INDEPENDIENTE y asincrónica: distinto
 *     `animation-delay` y `amplitud` por tarjeta (offset determinista por
 *     idx), creado via estilos inline + keyframes CSS. La sensación es de
 *     tarjetas suspendidas en gravedad cero, cada una con su propio ritmo.
 *   - Al hover, el float se pausa y la tarjeta adquiere un **tilt 3D suave**
 *     que sigue al cursor (perspective + rotateX/rotateY, máx 6°) vía el
 *     hook `useFloatTilt` en variante `'tilt-only'`.
 *
 * Mantiene `bg-nimbus-testimonialsBg`, `rounded-[2rem]`, `shadow-sm→xl`.
 */
interface Review {
  quote: string;
  name: string;
  role: string;
  rating: number;
}
interface TestData {
  tag: string;
  title: string;
  subtitle: string;
  reviews: Review[];
}

/** Sub-componente: tarjeta individual con su propio hook useFloatTilt.
 *  Necesitamos un componente separado porque los hooks NO pueden llamarse
 *  dentro de un `.map()` — cada tarjeta tiene su propia instancia del hook
 *  (ref + bindings + estado de transform) y eso requiere un componente.
 *
 *  Arquitectura de capas:
 *    - DIV EXTERIOR: animation CSS `nimbus-zerog-float` (translateY oscilante
 *      independiente por idx). Se pausa al hover.
 *    - DIV INTERIOR: hook useFloatTilt `'tilt-only'` (perspective + rotateX/Y
 *      que sigue al cursor, máx 6°). brotherl el float pausado.
 *  Separar las capas evita que el `transform` del tilt sobrescriba el
 *  `transform` del float (o viceversa). */
const ReviewCard: React.FC<{ review: Review; idx: number }> = ({ review, idx }) => {
  const { ref: cardRef, onMouseMove: onCardMove, onMouseLeave: onCardLeave } = useFloatTilt<HTMLDivElement>(6);
  const avatarsLen = sharedImages.avatars.length;
  const rating = Math.max(0, Math.min(5, Math.round(review.rating)));

  // Offset determinista por idx — cada tarjeta tiene delay y amplitud distintas.
  // No usamos Math.random() para evitar re-renders con valores distintos.
  const floatDelay = `${idx * 0.8}s`;
  const floatDuration = `${4 + idx * 0.5}s`;

  return (
    // DIV EXTERIOR — float CSS independiente asincrónico, se pausa al hover.
    <div
      style={{
        animation: `nimbus-zerog-float ${floatDuration} ease-in-out infinite`,
        animationDelay: floatDelay,
      }}
      className="will-change-transform hover:[animation-play-state:paused]"
    >
      {/* DIV INTERIOR — tilt imperativo del hook useFloatTilt. */}
      <div
        ref={cardRef}
        onMouseMove={onCardMove}
        onMouseLeave={onCardLeave}
        className="bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-[0_20px_60px_-15px_rgba(30,160,255,0.15)] hover:border-nimbus-accent/20 border border-transparent transition-all duration-300 flex flex-col justify-between h-full will-change-transform"
      >
        <div className="flex flex-col items-start mb-8">
          {/* Comillas Decorativas */}
          <div className="w-10 h-10 bg-blue-50 text-nimbus-accent rounded-xl flex items-center justify-center mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
          </div>
          <p className="text-neutral-700 font-medium leading-relaxed text-sm md:text-base">
            &ldquo;{review.quote}&rdquo;
          </p>
        </div>

        <div className="flex flex-col">
          {/* Estrellas según review.rating real */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, starIdx) => (
                <svg
                  key={starIdx}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={starIdx < rating ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth={starIdx < rating ? 0 : 2}
                  className="text-yellow-400"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span className="text-xs font-bold text-neutral-900">{review.rating.toFixed(1)}</span>
          </div>

          {/* Usuario — avatar dinámico idx % avatars.length */}
          <div className="flex items-center gap-3">
            <img
              src={sharedImages.avatars[idx % avatarsLen]}
              alt={review.name}
              className="w-10 h-10 rounded-full object-cover bg-neutral-200"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-neutral-900">{review.name}</span>
              <span className="text-xs text-neutral-400">{review.role}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const testData = t('Nimbus.testimonials') as TestData;

  return (
    <section className="relative w-full bg-nimbus-testimonialsBg py-24 px-6 md:px-12">
      {/* Fondo: backgrounds/6.jpg al 40% de opacidad, detrás del contenido.
          pointer-events-none para no bloquear clics; opacity-40 para que la
          imagen se mezcle con el fondo claro y el texto oscuro siga legible. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-40 pointer-events-none"
        style={{ backgroundImage: 'url(/src/webp/backgrounds/6.jpg)' }}
      />
      <div className="relative max-w-[1400px] mx-auto flex flex-col items-center">
        {/* Cabecera Central */}
        <span className="text-nimbus-accent text-xs font-bold tracking-[0.2em] uppercase mb-4 bg-blue-50 border border-nimbus-accent/20 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(30,160,255,0.1)]">
          {testData.tag}
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-neutral-900 tracking-tight leading-[1.15] mb-6 whitespace-pre-line">
          {testData.title}
        </h2>
        <p className="text-neutral-500 text-center max-w-2xl mb-16 text-sm md:text-base">
          {testData.subtitle}
        </p>

        {/* Grid de Reseñas — cada tarjeta es un ReviewCard con su propio
            hook useFloatTilt y su propio animation-delay. */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
          {testData.reviews.map((review: Review, idx: number) => (
            <ReviewCard key={idx} review={review} idx={idx} />
          ))}
        </div>
      </div>

      {/* Keyframes inline — evita tocar index.css (regla del proyecto).
          nimbus-zerog-float: oscilación translateY independiente por tarjeta
          (cada una tiene distinto delay y amplitud via style inline). */}
      <style>{`
        @keyframes nimbus-zerog-float {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
