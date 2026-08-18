import React, { useRef, useState } from 'react';
import { useTranslation } from '../../../i18n';
import { sharedImages } from '../../../config/sharedImages';
import { useInView } from '../hooks/useInView';

interface PackageItem {
  id: string;
  name: string;
  price: string;
  duration: string;
  imageIdx: number;
}

// Subcomponente de tarjeta Bento con efecto Spotlight 3D Tilt
const BentoCard: React.FC<{ item: PackageItem; image: string; isLarge: boolean }> = ({ item, image, isLarge }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    // Calcular tilt 3D (máx 6 grados)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 5; // rotación vertical
    const rotateY = ((x - centerX) / centerX) * 5; // rotación horizontal
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 border border-amber-500/10 transition-all duration-300 h-[300px] sm:h-[400px] ${
        isLarge ? 'md:col-span-2 md:row-span-2 md:h-full' : ''
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: isHovered ? 'none' : 'all 0.5s ease-out'
      }}
    >
      <img
        src={image}
        alt={item.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
      />
      
      {/* Overlay gradiente base */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Foco de luz de ámbar interactivo */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none z-10 opacity-60"
          style={{
            background: `radial-gradient(circle at ${coords.x}px ${coords.y}px, rgba(245, 158, 11, 0.25) 0%, transparent 65%)`
          }}
        />
      )}

      {/* Badge del precio resplandeciente en Hover */}
      <div className="absolute top-4 right-4 z-10 transition-transform duration-300 group-hover:scale-110">
        <span className="bg-amber-500 text-stone-900 rounded-full px-4 py-1 font-bold text-sm shadow-lg group-hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all">
          {item.price}
        </span>
      </div>

      <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end transtone-y-4 group-hover:transtone-y-0 transition-transform duration-500 z-10">
        <span className="text-white/70 text-xs font-semibold mb-1 uppercase tracking-wider">{item.duration}</span>
        <h3 className="text-white text-2xl md:text-3xl font-extrabold group-hover:text-amber-300 transition-colors duration-300">
          {item.name}
        </h3>
      </div>
    </div>
  );
};

const TourPackages: React.FC = () => {
  const { t } = useTranslation();
  const data = t('Aura.packages') as {
    subtitle: string;
    title: string;
    description: string;
    items: Array<{
      id: string;
      name: string;
      price: string;
      duration: string;
      imageIdx: number;
    }>;
  };
  const items: PackageItem[] = data.items;
  const images = sharedImages.destinations;
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className={`w-full relative overflow-hidden font-sans transition-all duration-700 ${
        inView ? 'opacity-100 transtone-y-0' : 'opacity-0 transtone-y-8'
      }`}
    >
      {/* Fondo de sección: backgrounds/2.webp muy sutil (5%), sin velo. */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <img
          src="/src/webp/backgrounds/2.webp"
          alt=""
          className="w-full h-full object-cover object-center opacity-5"
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-10 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-amber-500"></div>
            <span className="text-amber-500 font-bold text-sm tracking-[0.2em] uppercase">
              {data.subtitle}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-amber-600 leading-tight">
            {data.title}
          </h2>
        </div>
        <div className="flex-1 md:max-w-xl">
          <p className="text-stone-500 leading-relaxed text-base md:text-lg">
            {data.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6">
        {items.map((item, i) => (
          <BentoCard 
            key={item.id} 
            item={item} 
            image={images[item.imageIdx]} 
            isLarge={i === 0} 
          />
        ))}
        </div>
      </div>
    </section>
  );
};

export default TourPackages;