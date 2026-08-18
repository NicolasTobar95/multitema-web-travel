import React, { useState } from 'react';
import { useTranslation } from '../../../i18n';
import BrandLogo from '../../../components/BrandLogo';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const navData = t('Aura.nav') as {
    about: string;
    services: string;
    tour: string;
    contact: string;
    login: string;
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-4 md:px-10 py-5 font-sans bg-stone-900/10 backdrop-blur-md border-b border-white/10">
      <div className="relative w-full flex items-center justify-between">
        
        <div className="flex-1 flex justify-start">
          <button type="button" onClick={(e) => e.preventDefault()} className="flex items-center gap-2 group transition-transform hover:scale-105 bg-transparent border-0 p-0 cursor-pointer">
            <BrandLogo brand="Aura" className="h-8 md:h-9 w-auto" textClassName="text-2xl font-bold text-stone-900 tracking-wide" />
          </button>
        </div>

        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8 bg-white/10 backdrop-blur-md px-10 py-3.5 rounded-full border border-white/20 text-white text-base font-semibold shadow-inner">
          <button type="button" onClick={(e) => e.preventDefault()} className="hover:text-white/70 transition-colors bg-transparent border-0 p-0 cursor-pointer">{navData.about}</button>
          <button type="button" onClick={(e) => e.preventDefault()} className="hover:text-white/70 transition-colors bg-transparent border-0 p-0 cursor-pointer">{navData.services}</button>
          <button type="button" onClick={(e) => e.preventDefault()} className="hover:text-white/70 transition-colors bg-transparent border-0 p-0 cursor-pointer">{navData.tour}</button>
          <button type="button" onClick={(e) => e.preventDefault()} className="hover:text-white/70 transition-colors bg-transparent border-0 p-0 cursor-pointer">{navData.contact}</button>
        </div>

        <div className="flex-1 flex justify-end items-center gap-3">
          <button className="hidden md:block bg-white text-stone-900 px-8 py-3 rounded-full text-base font-bold hover:bg-stone-100 hover:text-amber-500 transition-all hover:scale-105 shadow-md active:scale-95">
            {navData.login}
          </button>
          
          <button 
            className="md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-4 right-4 mt-3 bg-stone-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 flex flex-col gap-6 md:hidden shadow-2xl origin-top animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-4 text-white font-medium text-lg divide-y divide-white/10">
            <button type="button" onClick={(e) => e.preventDefault()} className="px-2 py-3 hover:text-white/70 bg-transparent border-0 cursor-pointer text-left">{navData.about}</button>
            <button type="button" onClick={(e) => e.preventDefault()} className="px-2 py-3 hover:text-white/70 bg-transparent border-0 cursor-pointer text-left">{navData.services}</button>
            <button type="button" onClick={(e) => e.preventDefault()} className="px-2 py-3 hover:text-white/70 bg-transparent border-0 cursor-pointer text-left">{navData.tour}</button>
            <button type="button" onClick={(e) => e.preventDefault()} className="px-2 py-3 hover:text-white/70 bg-transparent border-0 cursor-pointer text-left">{navData.contact}</button>
          </div>
          <button className="w-full bg-white text-stone-900 px-6 py-4 rounded-xl text-base font-bold shadow-lg hover:bg-stone-100 active:scale-95 transition-all">
            {navData.login}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;