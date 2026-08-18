import { useState } from 'react';
import { useTranslation } from '../../../i18n';
import { themeData } from '../../../config/themeData';
import { sharedImages } from '../../../config/sharedImages';
import { THEME_CONTAINER } from '../layout';

interface AuthorData {
  label: string;
  name: string;
  bio: string;
}

const Author = () => {
  const { t } = useTranslation();
  const authorData = t('Waypoint.author') as AuthorData;
  const avatarUrl = sharedImages.avatars[0]; // Nicolas Tobar (your photo) as main author

  const stats = themeData.Waypoint.stats;
  const [saved, setSaved] = useState(false);

  const handleSaveAuthor = () => {
    setSaved((prev) => !prev);
  };

  return (
    <section className={`w-full bg-gradient-to-b from-zinc-100 to-white py-24 flex justify-center border-b border-zinc-100 ${THEME_CONTAINER}`}>
      <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
        <div className="shrink-0">
          <img
            src={avatarUrl}
            alt={authorData.name}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-lg"
            loading="lazy"
          />
        </div>
        <div className="flex-1 flex flex-col items-start">
          <span className="text-[10px] tracking-[0.25em] text-zinc-400 font-bold uppercase mb-2">
            {authorData.label}
          </span>
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-2xl md:text-3xl font-display tracking-wide text-zinc-900">
              {authorData.name}
            </h3>
            <button
              type="button"
              onClick={handleSaveAuthor}
              aria-label={saved ? 'Unsave author' : 'Save author'}
              className="w-5 h-5 bg-red-500 text-white rounded flex items-center justify-center text-xs font-bold leading-none transition-colors hover:bg-red-600"
            >
              {saved ? '✓' : '+'}
            </button>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xl font-serif italic">
            {authorData.bio}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-6 text-zinc-400 text-sm font-medium mt-6 md:mt-0">
          <div className="flex items-center gap-2 hover:text-red-500 transition-colors cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
            <span>{stats.likes.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 hover:text-zinc-800 transition-colors cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span>{stats.comments.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Author;
