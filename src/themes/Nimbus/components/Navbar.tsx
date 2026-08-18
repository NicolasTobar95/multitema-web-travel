import React from 'react';
import { useTranslation } from '../../../i18n';
import BrandLogo from '../../../components/BrandLogo';

/**
 * Nimbus Navbar — fixed contrast model.
 *
 * The navbar always starts with dark text over a translucent white background
 * from the first paint. No scroll listener, no "transparent mode that shifts
 * to scrolled": readability is the priority and the previous gradient toward
 * transparent did not solve the contrast over `bg-nimbus-surface`
 * (#FDFDFD) that exists in the pre-hero gap.
 *
 * Visual: subtle gradient from sky-blue (nimbus-accent at low opacity) at
 * the top toward white at the bottom. A semi-transparent white box with
 * blur on top of the Hero from the first frame.
 */
interface NavData {
  home: string;
  about: string;
  service: string;
  pricing: string;
  signup: string;
  login: string;
}

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const navData = t('Nimbus.nav') as NavData;

  return (
    <nav className="sticky top-0 left-0 w-full z-30 px-8 py-2.5 flex items-center justify-between font-sans backdrop-blur-md shadow-sm border-b border-neutral-200/60 bg-gradient-to-b from-sky-200/40 via-white/85 to-white/95">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <BrandLogo brand="Nimbus" className="w-8 h-8" textClassName="text-xl font-bold tracking-wide ml-2" />
      </div>

      {/* Center Links */}
      <div className="hidden md:flex items-center gap-10 text-sm font-medium text-neutral-900 opacity-90">
        <button type="button" onClick={(e) => e.preventDefault()} className="hover:opacity-100 transition-opacity font-bold bg-transparent border-0 p-0 cursor-pointer">{navData.home}</button>
        <button type="button" onClick={(e) => e.preventDefault()} className="hover:opacity-100 transition-opacity bg-transparent border-0 p-0 cursor-pointer">{navData.about}</button>
        <button type="button" onClick={(e) => e.preventDefault()} className="hover:opacity-100 transition-opacity bg-transparent border-0 p-0 cursor-pointer">{navData.service}</button>
        <button type="button" onClick={(e) => e.preventDefault()} className="hover:opacity-100 transition-opacity bg-transparent border-0 p-0 cursor-pointer">{navData.pricing}</button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <button type="button" onClick={(e) => e.preventDefault()} className="hidden md:block text-sm font-medium text-neutral-900 hover:opacity-100 transition-opacity bg-transparent border-0 p-0 cursor-pointer">
          {navData.signup}
        </button>
        <button className="px-6 py-2.5 rounded-full text-sm font-bold transition-colors shadow-lg bg-neutral-900 text-white hover:bg-neutral-800">
          {navData.login}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
