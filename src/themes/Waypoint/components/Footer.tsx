import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../../i18n';
import { sharedImages } from '../../../config/sharedImages';
import { lerp } from '../../../utils/lerp';
import { THEME_CONTAINER } from '../layout';
import AuthorCard from '../../../components/AuthorCard';
import BrandLogo from './BrandLogo';

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

// Imágenes disponibles para el cursor-follow (ciclo sobre narrative)
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
      {/* Cursor-follow preview (fixed, fuera del flujo) */}
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
          />
        )}
      </div>

      {/* Bloque TOP — excepción documentada: conserva max-w-[1400px] por el label rotado */}
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

      {/* Bloque BOTTOM — AuthorCard (col 1 grande) + 3 columnas de links con cursor-follow */}
      <div className={`${THEME_CONTAINER} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 border-t border-zinc-100 pt-12`}>
        {/* Col 1 (grande): tarjeta de presentación del autor — clickeable al portfolio externo.
            innerBgBase coincide con el fondo blanco del footer para que la
            capa opaca base sea invisible; texto oscuro sobre blanco. */}
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
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-xs text-red-500 hover:text-red-400 active:text-red-600 transition-colors font-medium inline-block"
                        onMouseEnter={() => setHoveredIndex(flatIndex)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {item}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Línea de demo debajo del bloque inferior — autor del tema */}
      <div className={`${THEME_CONTAINER} mt-8 text-center text-[10px] tracking-[0.25em] text-zinc-400 uppercase font-bold`}>
        {(t('shared.footerNotice') as string).replace('{year}', String(new Date().getFullYear())).replace('—', '·')}
      </div>
    </footer>
  );
};

export default Footer;
