import React from 'react';
import { useTranslation } from '../../../i18n';
import AuthorCard from '../../../components/AuthorCard';

/**
 * Nimbus Footer — simplification of debt #3 from the doc.
 *
 * Changes vs Trevilo:
 *   - The giant CTA (39 upper lines) → extracted to `CtaBanner`, a sibling
 *     component. The `Footer` is now a pure footer: 4 link columns + the
 *     author demo line at the bottom.
 *   - Duplicated logo (JSX identical to Navbar) → shared `<BrandLogo />`.
 *   - Hardcoded "Trevilo" text → `t('Nimbus.brand')` (zinc-white color).
 *
 * Keeps `bg-nimbus-footerBg` (zinc-900-ish, the only dark island) and the
 * 4-column grid — those were fine-tuned decisions.
 */
interface FooterCol {
  title: string;
  items: string[];
}
interface FooterData {
  links: FooterCol[];
  brand: string;
}

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const fData = t('Nimbus.footer') as FooterData;

  return (
    <footer className="w-full bg-nimbus-footerBg pt-12 pb-16 px-6 md:px-12 text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col">
        {/* FOOTER LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/10">

          {/* Col 1: Logo and Social */}
          <div className="flex flex-col items-start lg:col-span-2 pr-12">
            {/* Author presentation card — above the socials.
                Clickable: opens the external portfolio in a new tab.
                innerBgBase matches the footer color so the opaque base layer
                is invisible on the background; innerBg
                bg-white/10 simulates 10% white over the footer color. */}
            <a
              href="https://portfolio-218.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mb-8"
              aria-label="Ver portfolio de Nicolas Tobar"
            >
              <AuthorCard innerBgBase="bg-nimbus-footerBg" innerBg="bg-white/5" />
            </a>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-colors cursor-pointer text-white/80">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-colors cursor-pointer text-white/80">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-colors cursor-pointer text-white/80">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
              </div>
            </div>
          </div>

          {/* Col 2 y 3: Links */}
          {fData.links.map((col: FooterCol, idx: number) => (
            <div key={idx} className="flex flex-col">
              <h4 className="text-white text-sm font-bold mb-6">{col.title}</h4>
              <ul className="flex flex-col gap-4">
                {col.items.map((item: string, i: number) => (
                  <li key={i}><button type="button" onClick={(e) => e.preventDefault()} className="text-neutral-400 text-sm hover:text-white transition-colors bg-transparent border-0 p-0 cursor-pointer text-left">{item}</button></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Demo line — theme author */}
        <div className="text-center text-xs text-neutral-500 pt-6">
          {(t('shared.footerNotice') as string).replace('{year}', String(new Date().getFullYear()))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
