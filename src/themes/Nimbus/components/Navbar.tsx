import React from 'react';
import { useTranslation } from '../../../i18n';
import BrandLogo from './BrandLogo';

/**
 * Navbar de Nimbus — fixed contrast model.
 *
 * El navbar siempre arranca con texto oscuro sobre fondo blanco translúcido
 * desde el primer paint. Sin listener de scroll, sin "modo transparente que
 * vira a scrolled": la legibilidad es la prioridad y el degradado hacia
 * transparente anterior no resolvía el contraste sobre `bg-nimbus-surface`
 * (#FDFDFD) que existe en el pre-hero gap.
 *
 * Visual: gradiente sutil desde celeste (nimbus-accent con baja opacidad) en
 * la parte superior hacia blanco en la inferior. Caja blanca semi-transparente
 * con blur encima del Hero desde el primer frame.
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
        <BrandLogo />
      </div>

      {/* Center Links */}
      <div className="hidden md:flex items-center gap-10 text-sm font-medium text-neutral-900 opacity-90">
        <a href="#" onClick={(e) => e.preventDefault()} className="hover:opacity-100 transition-opacity font-bold">{navData.home}</a>
        <a href="#" onClick={(e) => e.preventDefault()} className="hover:opacity-100 transition-opacity">{navData.about}</a>
        <a href="#" onClick={(e) => e.preventDefault()} className="hover:opacity-100 transition-opacity">{navData.service}</a>
        <a href="#" onClick={(e) => e.preventDefault()} className="hover:opacity-100 transition-opacity">{navData.pricing}</a>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <a href="#" onClick={(e) => e.preventDefault()} className="hidden md:block text-sm font-medium text-neutral-900 hover:opacity-100 transition-opacity">
          {navData.signup}
        </a>
        <button className="px-6 py-2.5 rounded-full text-sm font-bold transition-colors shadow-lg bg-neutral-900 text-white hover:bg-neutral-800">
          {navData.login}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
