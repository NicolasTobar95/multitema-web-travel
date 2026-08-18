import { useTranslation } from '../../../i18n';
import { themeData } from '../../../config/themeData';
import BrandLogo from './BrandLogo';

const Navbar = () => {
  const { t } = useTranslation();
  const likes = themeData.Waypoint.stats.likes;

  return (
    <nav className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-10 py-6 text-white text-xs font-sans tracking-[0.25em] uppercase">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2 text-red-500">
          <BrandLogo />
        </div>
        <div className="hidden md:flex gap-8 font-medium">
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-red-400 transition-colors">{t('Waypoint.nav.destinations')}</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-red-400 transition-colors">{t('Waypoint.nav.trips')}</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-red-400 transition-colors">{t('Waypoint.nav.experiences')}</a>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 hover:text-red-400 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span>{likes.toLocaleString()}</span>
        </button>
        <button className="hover:text-red-400 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        <button className="hover:text-red-400 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
