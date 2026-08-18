import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from '../../../i18n';
import { sharedImages } from '../../../config/sharedImages';

const ClientReview: React.FC = () => {
  const { t } = useTranslation();
  const revData = t('Aeria.review') as {
    label: string;
    title: string;
    quote: string;
    author: string;
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // State for interactive Lens Flare
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Track page scroll for the split-depth parallax
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Compute the distance relative to the viewport center
      const offset = window.innerHeight / 2 - (rect.top + rect.height / 2);
      setScrollY(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <>
      <style>{`
        @keyframes lens-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.4; }
        }
      `}</style>
      <section 
        ref={containerRef}
        className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24 flex flex-col md:flex-row items-center gap-16 lg:gap-24 overflow-hidden"
      >
      {/* Left Column with text moving subtly in counter-parallax */}
      <div 
        className="w-full md:w-1/2 flex flex-col items-start transition-transform duration-200 ease-out"
        style={{ transform: `translateY(${scrollY * -0.04}px)` }}
      >
        <span className="text-xs font-bold tracking-[0.2em] text-purple-600 uppercase mb-4">{revData.label}</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight mb-8">
          {revData.title}
        </h2>
        <p className="text-neutral-600 text-lg leading-relaxed mb-8 italic border-l-4 border-purple-500/20 pl-6">
          {revData.quote}
        </p>
        <span className="text-neutral-900 font-bold mb-6">
          — {revData.author}
        </span>
        <div className="flex gap-1 mb-8 text-amber-500">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="hover:scale-125 transition-transform"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
          ))}
        </div>
        <div className="flex -space-x-4">
          {[0, 1, 2].map((i) => (
            <img key={i} src={sharedImages.avatars[i % sharedImages.avatars.length]} className="w-14 h-14 rounded-full border-4 border-white object-cover shadow-md" alt="Reviewer avatar" loading="lazy" />
          ))}
        </div>
      </div>

      {/* Right Column with Three-Layer Hologram (Split-Depth) */}
      <div className="w-full md:w-1/2 relative flex justify-end">
        
        {/* Layer 1: Ghost shadow with faster parallax */}
        <div
          className="absolute top-8 right-12 w-[80%] h-[400px] md:h-[500px] rounded-[2.5rem] bg-cover bg-center opacity-30 blur-2xl z-0 shadow-[0_0_80px_rgba(168,85,247,0.4)] transition-transform duration-200 ease-out"
          style={{ 
            backgroundImage: `url(${sharedImages.avatars[0]})`,
            transform: `translateY(${scrollY * 0.12}px) scale(1.05)`
          }}
        />

        {/* Layer 2: Front photo with slower parallax + interactive lens flare */}
        <div 
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative z-10 w-[80%] h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-200 ease-out group"
          style={{ 
            transform: `translateY(${scrollY * 0.04}px)`
          }}
        >
          <img
            src={sharedImages.avatars[0]}
            alt="Happy traveler portrait"
            className="w-full h-full object-cover select-none"
            loading="lazy"
          />

          {/* Interactive SVG lens flare */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none mix-blend-screen z-20 overflow-hidden">
              {/* Central brightness circle */}
              <div 
                className="absolute w-32 h-32 rounded-full bg-gradient-radial from-white via-purple-500/20 to-transparent -translate-x-1/2 -translate-y-1/2 opacity-70"
                style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
              />
              {/* Refraction ring */}
              <div 
                className="absolute w-48 h-48 rounded-full border border-purple-500/10 -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  left: `${mousePos.x}px`, 
                  top: `${mousePos.y}px`,
                  animation: 'lens-pulse 2s ease-in-out infinite'
                }}
              />
              {/* Diagonal light beam */}
              <div 
                className="absolute w-[200%] h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent -translate-x-1/2 -translate-y-1/2 rotate-45"
                style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
    </>
  );
};

export default ClientReview;
