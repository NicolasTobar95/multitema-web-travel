import React from 'react';
import { useTranslation } from '../../../i18n';
import PandaLogo from '../../../components/PandaLogo';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const navData = t('Aeria.nav') as {
    about: string;
    packages: string;
    community: string;
    getApp: string;
    signUp: string;
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full flex items-center justify-between px-6 md:px-12 py-4 font-sans text-white">
      <PandaLogo
        className="h-7 w-7"
        text="Aeria"
        textClassName="text-xl font-bold tracking-wide"
      />

      <div className="hidden lg:flex items-center gap-8 text-sm font-medium absolute left-1/2 -translate-x-1/2">
        <button type="button" onClick={(e) => e.preventDefault()} className="hover:opacity-80 transition-opacity bg-transparent border-0 p-0 cursor-pointer">{navData.about}</button>
        <button type="button" onClick={(e) => e.preventDefault()} className="hover:opacity-80 transition-opacity bg-transparent border-0 p-0 cursor-pointer">{navData.packages}</button>
        <button type="button" onClick={(e) => e.preventDefault()} className="hover:opacity-80 transition-opacity bg-transparent border-0 p-0 cursor-pointer">{navData.community}</button>
        <button type="button" onClick={(e) => e.preventDefault()} className="hover:opacity-80 transition-opacity bg-transparent border-0 p-0 cursor-pointer">{navData.getApp}</button>
      </div>

      <div className="flex items-center gap-4">
        <button type="button" onClick={(e) => e.preventDefault()} className="hidden sm:inline text-sm font-medium hover:opacity-80 transition-opacity bg-transparent border-0 p-0 cursor-pointer">
          {navData.signUp}
        </button>
        <button className="px-5 py-2 rounded-full text-sm font-bold transition-all bg-white text-neutral-900 hover:bg-neutral-200">
          {navData.getApp}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
