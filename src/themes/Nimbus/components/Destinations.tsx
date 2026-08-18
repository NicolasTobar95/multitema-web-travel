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

/** Total track copies: we render 3× the n cards (copy 0 | 1 | 2)
 *  and start centered on copy 1, with an identical copy on each side.
 *  This lets us scroll forward/backward infinitely and, after each scroll,
 *  invisibly re-center to the central copy because the content is identical. */
const LOOP_COPIES = 3;
/** Flex gap in px (matches `gap-4` = 16px). */
const GAP_PX = 16;
/** Timer fallback if the browser does not fire `scrollend` (Safari < 18). */
const SCROLL_END_FALLBACK_MS = 550;

/** Images for each destination, IN THE EXACT ORDER of the Nimbus.destinations.cards
 *  dictionary:
 *    0 Bali Island        → Bali, Indonesia
 *    1 Gili Trawangan     → Gili Trawangan
 *    2 Machu Picchu       → Perú, Machu Picchu
 *    3 Maldives           → Maldivas
 *    4 Iceland            → Islandia, Aurora boreal
 *    5 Kyoto              → Kyoto, Japón
 *  NOTE: sharedImages.destinations[0] was Switzerland (mountain/snow), which
 *  does NOT match Bali. That is why the explicit array below is reordered so
 *  each carousel slot shows the right photo. */
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

  // Continuous track: 3 copies of the n cards, flattened into one array.
  const loopCards = Array.from({ length: LOOP_COPIES }, () => cards).flat();

  // Refs: scrollRef for the scroll-snap container; cardRef for the first item to measure.
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Ref to the scrollend fallback timer (cleared if scrollend fires first).
  const fallbackTimerRef = useRef<number | null>(null);

  // Active dot (central copy 0..n-1) for the mobile indicators.
  const [activeDot, setActiveDot] = useState(0);

  /** Measures the effective width of one card (offsetWidth + gap). Computed
   *  from the DOM, never hardcoded: it changes with viewport and breakpoint
   *  (mobile 85% vs desktop 1/3 of the container). */
  const measureCardWidth = useCallback((): number => {
    const card = cardRef.current;
    if (!card) return 0;
    return card.offsetWidth + GAP_PX;
  }, []);

  /** Initial position: start of copy 1 (index n). No animation. */
  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const w = measureCardWidth();
    if (w > 0) {
      scroller.scrollTo({ left: n * w, behavior: 'auto' });
    }
  }, [n, measureCardWidth]);

  /** Invisible re-center to the central copy. Called after each scroll settle:
   *  if we land on an edge copy (0 or 2), jump WITHOUT animation to the
   *  equivalent position in copy 1. Since the 3 copies are visually
   *  identical, the jump is imperceptible. */
  const recenterIfNeeded = useCallback((): { index: number; recentered: boolean } => {
    const scroller = scrollRef.current;
    if (!scroller) return { index: 0, recentered: false };
    const w = measureCardWidth();
    if (w <= 0) return { index: 0, recentered: false };

    const left = scroller.scrollLeft;
    const totalIndex = Math.round(left / w); // global index 0..3n-1
    const indexInLoop = ((totalIndex % n) + n) % n;

    // If we are in copy 0 (index < n) or copy 2 (index >= 2n), re-center.
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

  /** Triggers the re-center once the smooth scroll finished. Uses native
   *  `scrollend`; if it does not arrive, a backup timer does the same. */
  const scheduleRecenter = useCallback(() => {
    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current);
    }
    fallbackTimerRef.current = window.setTimeout(() => {
      fallbackTimerRef.current = null;
      recenterIfNeeded();
    }, SCROLL_END_FALLBACK_MS);
  }, [recenterIfNeeded]);

  /** When `scrollend` fires (modern browsers): discard the fallback
   *  timer and re-center. */
  const handleScrollEnd = useCallback(() => {
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
      recenterIfNeeded();
    },
    [recenterIfNeeded],
  );

  /** Previous: smooth scroll -1 card. Schedules the re-center on settle. */
  const handlePrev = useCallback(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const w = measureCardWidth();
    if (w <= 0) return;
    scroller.scrollBy({ left: -w, behavior: 'smooth' });
    scheduleRecenter();
  }, [measureCardWidth, scheduleRecenter]);

  /** Next: smooth scroll +1 card. Schedules the re-center on settle. */
  const handleNext = useCallback(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const w = measureCardWidth();
    if (w <= 0) return;
    scroller.scrollBy({ left: w, behavior: 'smooth' });
    scheduleRecenter();
  }, [measureCardWidth, scheduleRecenter]);

  /** Direct jump to item i (mobile dots): smooth scroll to the position of
   *  item i in copy 1 (index n + i). Schedules the re-center on settle. */
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

  /** Updates the active dot while the user free-drags (touch).
   *  Does not re-center: only reflects which card is framed. */
  const handleScrollUpdate = useCallback(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const w = measureCardWidth();
    if (w <= 0) return;
    const idx = Math.round(scroller.scrollLeft / w);
    setActiveDot((((idx % n) + n) % n));
  }, [n, measureCardWidth]);

  // Timer cleanup on unmount.
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
        {/* Header with Title and Arrows */}
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
              {/* Pulsing cyan glow — soft rhythmic glow behind the arrow. */}
              <span className="absolute inset-0 rounded-full bg-nimbus-accent animate-[nimbus-glow-pulse_2.5s_ease-in-out_infinite] opacity-40 pointer-events-none"></span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="relative z-10"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>

        {/* Native scroll-snap track: the browser manages all the physics.
         *  3 copies of the n cards; scroll-padding respects the container
         *  padding so the snap starts at the correct visual edge. */}
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
              /* Width of each slot:
               *   - mobile (<768px): one card ~85vw with a peek (15% visible).
               *   - desktop (>=768px): exactly 1/3 of the container inner
               *     max-w-[1400px] with px-12, minus the 2 gaps gap-4.
               *     inner = min(100vw,1400px) - 6rem (px-12);
               *     card = (inner - 2rem of gaps) / 3.
               *     We use 100vw+min() (not %) because % in a flex with overflow
               *     resolves against the growing scrollWidth, not the visible
               *     width. This way exactly 3 cards fit, no more. */
              className="snap-start shrink-0 w-[85vw] md:w-[calc((min(100vw,87.5rem)-8rem)/3)]"
            >
              <div className="relative h-[420px] md:h-[550px] rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500">
                <img
                  src={IMAGES[i % n]}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Diagonal glass sheen — sweeps the card left to right on hover.
                    Translucent white band with a diagonal gradient that moves
                    from outside the left edge to outside the right edge,
                    creating the premium "light flash" effect. */}
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

                {/* Bottom gradient for text */}
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

        {/* Dots (mobile): indicate the active card within the loop. */}
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

      {/* Inline keyframes — avoids touching index.css (project rule).
          nimbus-sheen-sweep: diagonal band sweeps from -100% to 50% (1.2s).
          nimbus-glow-pulse: scale + rhythmic opacity for the cyan glow of
            the next arrow (infinite loop, 2.5s). */}
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
