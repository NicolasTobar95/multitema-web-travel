import { useTranslation } from '../../../i18n';
import { themeData } from '../../../config/themeData';
import GrainOverlay from './GrainOverlay';

const Hero = () => {
  const { t } = useTranslation();
  const heroImg = themeData.Waypoint.heroImageUrl;

  return (
    <header className="relative h-screen w-full bg-zinc-950 flex flex-col justify-center px-10 md:px-24 overflow-hidden">
      {/* Portable inline CSS styles for complex animations.
          The background and the letters use the SAME Ken Burns (24s, same curve
          and amplitude). Since the letters are `background-image` with
          `background-clip: text`, they cannot be animated with `transform: scale`
          directly — but they CAN simulate the same effect by animating
          `background-size` and `background-position` with the same proportional
          values. Result: background and letters breathe in unison,
          like a single image. */}
      <style>{`
        @keyframes kenburns {
          0%   { transform: scale(1.05) translate(0px, 0px); }
          50%  { transform: scale(1.15) translate(-10px, 5px); }
          100% { transform: scale(1.05) translate(0px, 0px); }
        }
        /* Same keyframe applied to background-size and background-position. */
        @keyframes kenburns-letters {
          0%   { background-size: 105% 105%; background-position: 50% 50%; }
          50%  { background-size: 115% 115%; background-position: calc(50% + 5px) calc(50% - 2.5px); }
          100% { background-size: 105% 105%; background-position: 50% 50%; }
        }
        .animate-ken-burns {
          animation: kenburns 24s ease-in-out infinite;
        }
        .text-clip-bg {
          background-image: url(${heroImg});
          background-size: 105% 105%;
          background-position: center;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .animate-ken-burns-letters {
          animation: kenburns-letters 24s ease-in-out infinite;
          filter: brightness(1.15) saturate(1.25) contrast(1.05);
        }
      `}</style>

      {/* Photo container with Ken Burns effect */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-ken-burns opacity-60 z-0"
        style={{ backgroundImage: `url(${heroImg})` }}
      />

      {/* Radial darkness pit centered on the title block + bottom fade */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 30% 50%, rgba(9,9,11,0.92) 0%, rgba(9,9,11,0.5) 40%, rgba(9,9,11,0.3) 70%, rgba(9,9,11,0.6) 100%)'
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent z-0"></div>

      <GrainOverlay opacity={0.06} />

      <div className="relative z-10 max-w-4xl mt-20">
        <div className="flex items-center gap-2 mb-4 text-white uppercase tracking-[0.25em] text-[10px] md:text-xs font-semibold">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 animate-pulse">
            <circle cx="12" cy="10" r="3"></circle>
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"></path>
          </svg>
          <span className="text-zinc-300">{t('Waypoint.hero.label') as string}</span>
        </div>

        {/* Giant title with the photo clipped inside each letter.
            The letters' photo has its OWN Ken Burns (14s, different direction
            and amplitude than the 24s background), so the letters seem to
            "breathe" in a different phase than the background. The
            brightness/saturate filter makes them livelier than the background
            (opacity-60).
            -mt-2 and tracking-[-0.02em] avoid the clipping it had before with
            "Belleza en abundancia".
            inline-block so background-size is computed against the text
            width, not the parent container. */}
        <h1 className="inline-block text-7xl md:text-[140px] font-display text-clip-bg animate-ken-burns-letters tracking-[-0.02em] leading-[0.85] mb-8 select-none drop-shadow-[0_8px_28px_rgba(0,0,0,0.65)] transition-transform duration-300 hover:scale-[1.01]">
          {t('Waypoint.hero.title') as string}
        </h1>

        <p className="text-zinc-300 text-sm md:text-base font-sans max-w-xl opacity-90 leading-relaxed border-l-2 border-red-500/50 pl-4 transition-all duration-300 hover:scale-[1.01]">
          {t('Waypoint.hero.subtitle') as string}
        </p>
      </div>
    </header>
  );
};

export default Hero;
