import React from 'react';
import { useTranslation } from '../../../i18n';
import AuthorCard from '../../../components/AuthorCard';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const fData = t('Aeria.footer') as {
    desc: string;
    joinBtn: string;
    linksTitle: string;
    links: string[];
    contactTitle: string;
    contactInfo: string[];
    newsTitle: string;
    newsDesc: string;
    newsPlaceholder: string;
    copy: string;
  };

  return (
    <footer className="w-full border-t border-neutral-100 pt-20 pb-8 px-6 md:px-12 mt-10 bg-purple-100/70">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 mb-16">
        <div className="flex-1 lg:flex-[2] flex flex-col items-start">
          {/* Tarjeta de presentación del autor — misma que en Nimbus.
              Clickeable: abre el portfolio externo en nueva pestaña.
              Fondo purple-100 (un tono más claro que el purple-200 anterior,
              casi igual al footer) con texto oscuro para legibilidad. */}
          <a
            href="https://portfolio-218.pages.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-8"
            aria-label="Ver portfolio de Nicolas Tobar"
          >
            <AuthorCard innerBgBase="bg-purple-100" innerBg="bg-white/10" textColor="text-neutral-900" />
          </a>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5">
            {fData.joinBtn}
            <div className="bg-white/20 p-1 rounded-full">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </div>
          </button>
        </div>

        <div className="flex flex-col">
          <h4 className="text-xs font-bold text-neutral-900 tracking-[0.2em] uppercase mb-6">{fData.linksTitle}</h4>
          <ul className="flex flex-col gap-4">
            {fData.links.map((link: string, i: number) => (
              <li key={i}><a href="#" onClick={(e) => e.preventDefault()} className="text-neutral-500 text-sm hover:text-purple-600 transition-colors">{link}</a></li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <h4 className="text-xs font-bold text-neutral-900 tracking-[0.2em] uppercase mb-6">{fData.contactTitle}</h4>
          <ul className="flex flex-col gap-4">
            {fData.contactInfo.map((info: string, i: number) => (
              <li key={i} className="text-neutral-500 text-sm">{info}</li>
            ))}
          </ul>
        </div>

        <div className="flex-1 flex flex-col">
          <h4 className="text-xs font-bold text-neutral-900 tracking-[0.2em] uppercase mb-6">{fData.newsTitle}</h4>
          <p className="text-neutral-500 text-sm leading-relaxed mb-6">
            {fData.newsDesc}
          </p>
          <div className="relative w-full max-w-sm">
            <input
              type="email"
              placeholder={fData.newsPlaceholder}
              className="w-full border border-neutral-200 rounded-full px-6 py-3.5 text-sm focus:outline-none focus:border-purple-600 transition-colors pr-14"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-neutral-100 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
        <span className="text-xs text-neutral-400 font-medium">
          {fData.copy}
        </span>
        <div className="flex items-center gap-4 text-neutral-400">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="hover:text-purple-600 cursor-pointer transition-colors"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="hover:text-purple-600 cursor-pointer transition-colors"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="hover:text-purple-600 cursor-pointer transition-colors"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="hover:text-purple-600 cursor-pointer transition-colors"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
        </div>
      </div>
      {/* Línea de demo debajo del copyright — autor del tema */}
      <div className="max-w-7xl mx-auto mt-6 text-center text-xs text-neutral-400">
        {(t('shared.footerNotice') as string).replace('{year}', String(new Date().getFullYear()))}
      </div>
    </footer>
  );
};

export default Footer;