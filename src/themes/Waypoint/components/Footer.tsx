import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../../i18n';
import { sharedImages } from '../../../config/sharedImages';
import { lerp } from '../../../utils/lerp';
import { THEME_CONTAINER } from '../layout';
import AuthorCard from '../../../components/AuthorCard';

interface FooterLinkColumn {
  title: string;
  items: string[];
}

interface FooterCard {
  title: string;
  location: string;
}

interface FooterData {
  moreExperiences: string;
  cards: FooterCard[];
  brand: string;
  links: Record<string, FooterLinkColumn>;
}

// Images available for the cursor-follow (cycle over narrative)
const previewImages = [
  sharedImages.narrative[0],
  sharedImages.narrative[1],
  sharedImages.narrative[2],
];

const cardImages = [sharedImages.narrative[1], sharedImages.narrative[0]];

const Footer = () => {
  const { t } = useTranslation();
  const footerData = t('Waypoint.footer') as FooterData;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let rafId = 0;
    const tick = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.18);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.18);
      if (previewRef.current) {
        previewRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    targetPos.current.x = e.clientX + 16;
    targetPos.current.y = e.clientY - 220;
  };

  const linkColumns = Object.values(footerData.links ?? {});
  const getPreviewImage = (colIdx: number, itemIdx: number) => {
    const flatIdx =
      linkColumns.slice(0, colIdx).reduce((acc, col) => acc + col.items.length, 0) + itemIdx;
    return previewImages[flatIdx % previewImages.length];
  };

  return (
    <footer className="w-full bg-white pt-24 pb-12 overflow-hidden">
      {/* Cursor-follow preview (fixed, out of flow) */}
      <div
        ref={previewRef}
        className={`fixed top-0 left-0 z-50 w-40 h-52 pointer-events-none transition-opacity duration-200 ${
          hoveredIndex !== null ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        {hoveredIndex !== null && (
          <img
            src={getPreviewImage(Math.floor(hoveredIndex / 10), hoveredIndex % 10)}
            alt=""
            className="w-full h-full object-cover rounded-sm shadow-2xl"
            loading="lazy"
          />
        )}
      </div>

      {/* TOP block — documented exception: keeps max-w-[1400px] because of the rotated label */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col xl:flex-row items-start gap-12 mb-32">
        <div className="hidden xl:flex shrink-0 pt-32">
          <span className="text-[10px] tracking-[0.25em] text-zinc-400 font-bold uppercase -rotate-90 origin-left whitespace-nowrap">
            {footerData.moreExperiences}
          </span>
        </div>
        <span className="xl:hidden text-[10px] tracking-[0.25em] text-zinc-400 font-bold uppercase">
          {footerData.moreExperiences}
        </span>
        <div className="flex-1 flex flex-col md:flex-row gap-8 w-full">
          {footerData.cards.map((card, index) => (
            <div key={index} className="flex-1 flex flex-col group cursor-pointer">
              <div className="overflow-hidden mb-6 rounded-sm">
                <img
                  src={cardImages[index]}
                  alt={card.title}
                  className="w-full h-[300px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
              <h4 className="text-xl md:text-2xl font-display text-zinc-900 mb-2 group-hover:text-red-500 transition-colors">
                {card.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-zinc-400 tracking-wide">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>{card.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM block — AuthorCard (large col 1) + 3 link columns with cursor-follow */}
      <div className={`${THEME_CONTAINER} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 border-t border-zinc-100 pt-12`}>
        {/* Col 1 (large): author presentation card — clickable to the external portfolio.
            innerBgBase matches the footer's white background so the opaque
            base layer is invisible; dark text on white. */}
        <div className="lg:col-span-8 flex flex-col items-start gap-4 text-zinc-900">
          <a
            href="https://portfolio-218.pages.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
            aria-label="Ver portfolio de Nicolas Tobar"
          >
            <AuthorCard innerBgBase="bg-white" innerBg="bg-white/10" textColor="text-zinc-900" />
          </a>
        </div>
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-12" onMouseMove={handleMouseMove}>
          {linkColumns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4">
              <span className="text-[10px] font-bold tracking-[0.25em] text-zinc-900 uppercase">{col.title}</span>
              <ul className="flex flex-col gap-2">
                {col.items.map((item, itemIdx) => {
                  const flatIndex = colIdx * 10 + itemIdx;
                  return (
                    <li key={itemIdx}>
                      <button
                        type="button"
                        onClick={(e) => e.preventDefault()}
                        className="text-xs text-red-500 hover:text-red-400 active:text-red-600 transition-colors font-medium inline-block bg-transparent border-0 p-0 cursor-pointer text-left"
                        onMouseEnter={() => setHoveredIndex(flatIndex)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {item}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Demo line below the bottom block — theme author */}
      <div className={`${THEME_CONTAINER} mt-8 text-center text-[10px] tracking-[0.25em] text-zinc-400 uppercase font-bold`}>
        {(t('shared.footerNotice') as string).replace('{year}', String(new Date().getFullYear())).replace('—', '·')}
      </div>
    </footer>
  );
};

export default Footer;
