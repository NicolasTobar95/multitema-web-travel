import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../../i18n';
import { sharedImages } from '../../../config/sharedImages';

interface DestCard {
  title: string;
  location: string;
  price: string;
  per: string;
}

interface DestData {
  title: string;
  cards: DestCard[];
}

/** Total de copias de la pista: renderizamos 3× las n tarjetas (copia 0 | 1 | 2)
 *  y arrancamos centrados en la copia 1, con una copia idéntica a cada lado.
 *  Así podemos avanzar/retroceder infinitamente y, tras cada scroll, re-centrar
 *  de forma invisible a la copia central porque el contenido es idéntico. */
const LOOP_COPIES = 3;
/** Gap del flex en px (coincide con `gap-4` = 16px). */
const GAP_PX = 16;
/** Fallback de timer si el navegador no dispara `scrollend` (Safari < 18). */
const SCROLL_END_FALLBACK_MS = 550;

/** Imágenes de cada destino, EN EL ORDEN EXACTO del diccionario
 *  Nimbus.destinations.cards:
 *    0 Bali Island        → Bali, Indonesia
 *    1 Gili Trawangan     → Gili Trawangan
 *    2 Machu Picchu       → Perú, Machu Picchu
 *    3 Maldives           → Maldivas
 *    4 Iceland            → Islandia, Aurora boreal
 *    5 Kyoto              → Kyoto, Japón
 *  OJO: sharedImages.destinations[0] era Suiza (montaña/nieve), que NO
 *  corresponde a Bali. Por eso el array explícito de más abajo está
 *  reordenado para que cada slot del carousel muestre la foto correcta. */
const IMAGES = [
  sharedImages.destinations[1],  // 0: Bali Island      → Bali, Indonesia
  sharedImages.destinations[2],  // 1: Gili Trawangan   → Gili Trawangan
  sharedImages.destinations[3],  // 2: Machu Picchu     → Perú, Machu Picchu
  sharedImages.destinations[4],  // 3: Maldives          → Maldivas
  sharedImages.destinations[5],  // 4: Iceland           → Islandia, Aurora boreal
  sharedImages.destinations[6],  // 5: Kyoto             → Kyoto, Japón
];

const Destinations: React.FC = () => {
  const { t } = useTranslation();
  const destData = t('Nimbus.destinations') as DestData;
  const cards = destData.cards;
  const n = cards.length;

  // Pista continua: 3 copias de las n tarjetas, aplanadas en un solo array.
  const loopCards = Array.from({ length: LOOP_COPIES }, () => cards).flat();

  // Refs: scrollRef al contenedor scroll-snap; cardRef al primer item p/medir.
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Ref al timer fallback de scrollend (lo limpiamos si fire scrollend antes).
  const fallbackTimerRef = useRef<number | null>(null);

  // Dot activo (copia central 0..n-1) para los indicadores mobile.
  const [activeDot, setActiveDot] = useState(0);

  /** Mide el ancho efectivo de una tarjeta (offsetWidth + gap). Se calcula
   *  desde el DOM, nunca hardcodeado: cambia con el viewport y el breakpoint
   *  (mobile 85% vs desktop 1/3 del contenedor). */
  const measureCardWidth = useCallback((): number => {
    const card = cardRef.current;
    if (!card) return 0;
    return card.offsetWidth + GAP_PX;
  }, []);

  /** Posición inicial: inicio de la copia 1 (índice n). Sin animación. */
  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const w = measureCardWidth();
    if (w > 0) {
      scroller.scrollTo({ left: n * w, behavior: 'auto' });
      setActiveDot(0);
    }
  }, [n, measureCardWidth]);

  /** Re-centrado invisible al copia central. Llamado tras cada scroll settle:
   *  si aterrizamos en la copia de borde (0 o 2), saltamos SIN anim a la
   *  posición equivalente en la copia 1. Como las 3 copias son visualmente
   *  idénticas, el salto es imperceptible. */
  const recenterIfNeeded = useCallback((): { index: number; recentered: boolean } => {
    const scroller = scrollRef.current;
    if (!scroller) return { index: 0, recentered: false };
    const w = measureCardWidth();
    if (w <= 0) return { index: 0, recentered: false };

    const left = scroller.scrollLeft;
    const totalIndex = Math.round(left / w); // índice global 0..3n-1
    const indexInLoop = ((totalIndex % n) + n) % n;

    // Si estamos en copia 0 (índice < n) o copia 2 (índice >= 2n), re-centramos.
    if (totalIndex < n) {
      const target = totalIndex + n;
      scroller.scrollTo({ left: target * w, behavior: 'auto' });
      return { index: indexInLoop, recentered: true };
    }
    if (totalIndex >= 2 * n) {
      const target = totalIndex - n;
      scroller.scrollTo({ left: target * w, behavior: 'auto' });
      return { index: indexInLoop, recentered: true };
    }
    return { index: indexInLoop, recentered: false };
  }, [n, measureCardWidth]);

  /** Dispara el recentro una vez que el scroll suave terminó. Usa `scrollend`
   *  nativo; si no llega, un timer de respaldo hace lo mismo. */
  const scheduleRecenter = useCallback(() => {
    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current);
    }
    fallbackTimerRef.current = window.setTimeout(() => {
      fallbackTimerRef.current = null;
      recenterIfNeeded();
    }, SCROLL_END_FALLBACK_MS);
  }, [recenterIfNeeded]);

  /** Cuando `scrollend` dispara (navegadores modernos): descarta el timer
   *  fallback y recentra. */
  const handleScrollEnd = useCallback(
    (_e: React.UIEvent<HTMLDivElement>) => {
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
      recenterIfNeeded();
    },
    [recenterIfNeeded],
  );

  /** Anterior: scroll suave -1 tarjeta. Programa el recentro al settle. */
  const handlePrev = useCallback(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const w = measureCardWidth();
    if (w <= 0) return;
    scroller.scrollBy({ left: -w, behavior: 'smooth' });
    scheduleRecenter();
  }, [measureCardWidth, scheduleRecenter]);

  /** Siguiente: scroll suave +1 tarjeta. Programa el recentro al settle. */
  const handleNext = useCallback(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const w = measureCardWidth();
    if (w <= 0) return;
    scroller.scrollBy({ left: w, behavior: 'smooth' });
    scheduleRecenter();
  }, [measureCardWidth, scheduleRecenter]);

  /** Salto directo al item i (dots mobile): scroll suave a la posición del
   *  item i en la copia 1 (índice n + i). Programa el recentro al settle. */
  const handleDot = useCallback(
    (i: number) => {
      const scroller = scrollRef.current;
      if (!scroller) return;
      const w = measureCardWidth();
      if (w <= 0) return;
      const clamped = ((i % n) + n) % n;
      scroller.scrollTo({ left: (n + clamped) * w, behavior: 'smooth' });
      scheduleRecenter();
    },
    [n, measureCardWidth, scheduleRecenter],
  );

  /** Actualiza el dot activo mientras el usuario hace drag libre (touch).
   *  No recentra: solo refleja qué tarjeta está encuadrada. */
  const handleScrollUpdate = useCallback(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const w = measureCardWidth();
    if (w <= 0) return;
    const idx = Math.round(scroller.scrollLeft / w);
    setActiveDot((((idx % n) + n) % n));
  }, [n, measureCardWidth]);

  // Limpieza del timer al desmontar.
  useEffect(() => {
    return () => {
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
    };
  }, []);

  return (
    <section className="w-full py-20 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Header con Título y Flechas */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight whitespace-pre-line leading-[1.1]">
            {destData.title}
          </h2>
          <div className="flex gap-4">
            <button
              type="button"
              aria-label="Anterior"
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:border-neutral-900 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button
              type="button"
              aria-label="Siguiente"
              onClick={handleNext}
              className="relative w-12 h-12 rounded-full bg-nimbus-accent flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:bg-blue-500 transition-all overflow-hidden"
            >
              {/* Glow pulsante cian — resplandor rítmico suave detrás de la flecha. */}
              <span className="absolute inset-0 rounded-full bg-nimbus-accent animate-[nimbus-glow-pulse_2.5s_ease-in-out_infinite] opacity-40 pointer-events-none"></span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="relative z-10"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>

        {/* Pista scroll-snap nativa: el navegador gestiona toda la física.
         *  3 copias de las n tarjetas; scroll-padding respeta el padding del
         *  contenedor para que el snap arranque en el borde visual correcto. */}
        <div
          ref={scrollRef}
          onScroll={handleScrollUpdate}
          onScrollEnd={handleScrollEnd}
          className="flex snap-x snap-mandatory overflow-x-auto gap-4 pb-4 snap-normal [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {loopCards.map((card, i) => (
            <div
              key={`d-${i}`}
              ref={i === 0 ? cardRef : undefined}
              /* Ancho de cada slot:
               *   - mobile (<768px): una tarjeta ~85vw con peek (15% visible).
               *   - desktop (>=768px): exactamente 1/3 del inner del contenedor
               *     max-w-[1400px] con px-12, descontando los 2 gaps gap-4.
               *     inner = min(100vw,1400px) - 6rem (px-12);
               *     card = (inner - 2rem de gaps) / 3.
               *     Usamos 100vw+min() (no %) porque % en un flex con overflow se
               *     resuelve contra scrollWidth que crece, no contra el ancho
               *     visible. Así entra justas 3 tarjetas, ni una más. */
              className="snap-start shrink-0 w-[85vw] md:w-[calc((min(100vw,87.5rem)-8rem)/3)]"
            >
              <div className="relative h-[420px] md:h-[550px] rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500">
                <img
                  src={IMAGES[i % n]}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Sheen/reflejo de cristal diagonal — barre la tarjeta de izq a der
                    al hover. Banda blanca translúcida con gradiente diagonal que se
                    traslada desde fuera del lado izquierdo hasta fuera del derecho,
                    creando el efecto "flash de luz" premium. */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 w-[200%] h-full"
                    style={{
                      background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.25) 55%, transparent 70%)',
                      transform: 'translateX(-100%)',
                      animation: 'nimbus-sheen-sweep 1.2s ease-out forwards',
                    }}
                  />
                </div>

                {/* Gradiente inferior para texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-8">
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <h3 className="text-white text-3xl font-bold mb-2">{card.title}</h3>
                      <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        {card.location}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-white text-3xl font-bold">{card.price}</span>
                      <span className="text-white/60 text-xs font-medium">{card.per}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots (mobile): indican la tarjeta activa dentro del ciclo. */}
        <div className="mt-8 flex items-center justify-center gap-2 md:hidden">
          {cards.map((_, i) => (
            <button
              key={`dot-${i}`}
              type="button"
              onClick={() => handleDot(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeDot ? 'w-8 bg-sky-500' : 'w-2 bg-sky-200 hover:bg-sky-300'
              }`}
              aria-label={`Go to destination ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Keyframes inline — evita tocar index.css (regla del proyecto).
          nimbus-sheen-sweep: banda diagonal barre de -100% a 50% (1.2s).
          nimbus-glow-pulse: escala + opacidad rítmica para el glow cian de
            la flecha next (loop infinito, 2.5s). */}
      <style>{`
        @keyframes nimbus-sheen-sweep {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(50%); }
        }
        @keyframes nimbus-glow-pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50%      { transform: scale(1.25); opacity: 0.15; }
        }
      `}</style>
    </section>
  );
};

export default Destinations;
