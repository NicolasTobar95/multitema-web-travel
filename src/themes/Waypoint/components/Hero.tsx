import { useTranslation } from '../../../i18n';
import { themeData } from '../../../config/themeData';
import GrainOverlay from './GrainOverlay';

const Hero = () => {
  const { t } = useTranslation();
  const heroImg = themeData.Waypoint.heroImageUrl;

  return (
    <header className="relative h-screen w-full bg-zinc-950 flex flex-col justify-center px-10 md:px-24 overflow-hidden">
      {/* Estilos CSS Inline portables para animaciones complejas.
          El fondo y las letras usan el MISMO Ken Burns (24s, misma curva
          y amplitud). Como las letras son `background-image` con
          `background-clip: text`, no pueden animarse con `transform: scale`
          directamente — pero SÍ pueden simular el mismo efecto animando
          `background-size` y `background-position` con los mismos valores
          proporcionales. Resultado: fondo y letras respiran al unísono,
          como una sola imagen. */}
      <style>{`
        @keyframes kenburns {
          0%   { transform: scale(1.05) translate(0px, 0px); }
          50%  { transform: scale(1.15) translate(-10px, 5px); }
          100% { transform: scale(1.05) translate(0px, 0px); }
        }
        /* Mismo keyframe aplicado a background-size y background-position. */
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

      {/* Contenedor de la foto con efecto Ken Burns */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-ken-burns opacity-60 z-0"
        style={{ backgroundImage: `url(${heroImg})` }}
      />

      {/* Pozo de oscuridad radial centrado sobre el bloque de título y fade inferior */}
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
          <span className="text-zinc-300">{t('Waypoint.hero.label')}</span>
        </div>

        {/* Título gigante con la foto recortada dentro de cada letra.
            La foto de las letras tiene su PROPIO Ken Burns (14s, dirección
            y amplitud distintas al fondo de 24s), por lo que las letras
            parecen "respirar" en una fase distinta al fondo. El filtro
            brightness/saturate las hace más vivas que el fondo (opacity-60).
            -mt-2 y tracking-[-0.02em] evitan el recorte que tenía antes con
            "Belleza en abundancia".
            inline-block para que el background-size se calcule contra el
            ancho del texto, no contra el contenedor padre. */}
        <h1 className="inline-block text-7xl md:text-[140px] font-display text-clip-bg animate-ken-burns-letters tracking-[-0.02em] leading-[0.85] mb-8 select-none drop-shadow-[0_8px_28px_rgba(0,0,0,0.65)] transition-transform duration-300 hover:scale-[1.01]">
          {t('Waypoint.hero.title')}
        </h1>

        <p className="text-zinc-300 text-sm md:text-base font-sans max-w-xl opacity-90 leading-relaxed border-l-2 border-red-500/50 pl-4 transition-all duration-300 hover:scale-[1.01]">
          {t('Waypoint.hero.subtitle')}
        </p>
      </div>
    </header>
  );
};

export default Hero;
