import React from 'react';
import { useTranslation } from '../../../i18n';

/**
 * Nimbus CtaBanner — cohesion extraction #3 from the doc.
 *
 * Contains EXACTLY what used to live inside the original Trevilo `Footer.tsx`
 * (the 39 upper lines): a `h-[500px] md:h-[600px] rounded-[3rem]` card with
 * `backgrounds/5.jpg` background, `black/40` overlay, tag pill + h2 + 2 buttons.
 *
 * It is a cohesion extraction, NOT a visual redesign. The `Footer` stays as a
 * pure footer (no giant CTA). Top margin `pt-12` matches the bottom `pb-12`
 * (the space with the Footer), so it breathes symmetrically.
 */
interface FooterData {
  ctaTag: string;
  ctaTitle: string;
  btnSignup: string;
  btnLogin: string;
}

const CtaBanner: React.FC = () => {
  const { t } = useTranslation();
  const fData = t('Nimbus.footer') as FooterData;

  return (
    <section className="w-full bg-nimbus-surface px-4 md:px-6 pt-12 pb-12">
      <div
        className="relative w-full h-[500px] md:h-[600px] rounded-[3rem] flex flex-col items-center justify-center overflow-hidden shadow-2xl"
      >
        {/* Background: backgrounds/5.jpg at 75% opacity, behind the content.
            Separate layer so the CTA text does not become translucent. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-75 pointer-events-none"
          style={{ backgroundImage: 'url(/src/webp/backgrounds/5.jpg)' }}
        ></div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <span className="text-white/80 text-xs font-bold tracking-[0.2em] uppercase mb-6 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
            {fData.ctaTag}
          </span>
          <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-10 whitespace-pre-line drop-shadow-lg max-w-4xl">
            {fData.ctaTitle}
          </h2>
          <div className="flex items-center gap-4">
            <button className="bg-transparent hover:bg-white/10 active:scale-95 text-white border border-white px-8 py-3.5 rounded-full text-sm font-bold transition-all backdrop-blur-sm">
              {fData.btnSignup}
            </button>
            <button className="bg-white text-neutral-900 px-8 py-3.5 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-xl">
              {fData.btnLogin}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
