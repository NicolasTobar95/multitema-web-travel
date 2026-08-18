import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Companies from './components/Companies';
import Destinations from './components/Destinations';
import Packages from './components/Packages';
import Testimonials from './components/Testimonials';
import CtaBanner from './components/CtaBanner'; // <-- EXTRAÍDO del Footer original de Trevilo
import Footer from './components/Footer';     // <-- SIMPLIFICADO (sin CTA gigante)

/**
 * NimbusTheme — retoque editorial de Trevilo.
 *
 * Conserva el ADN de Trevilo: esquinas agresivamente redondeadas que escalan
 * con importancia (`rounded-[3rem]` en Hero, Packages base y CtaBanner), jerarquía
 * de sombras `shadow-sm`→`shadow-lg`→`shadow-xl/2xl`, y la paleta light con
 * cian como único acento, centralizada en `tailwind.config` como `colors.nimbus`.
 *
 * Lo nuevo: float + tilt real en la caja del buscador del Hero y en la tarjeta
 * "Bali Island" de Packages (hook `useFloatTilt`), botón magnético en el CTA
 * del Hero, Navbar sticky con backdrop-blur condicional, CtaBanner extraído
 * como pieza independiente, BrandLogo compartido, y todas las deudas de
 * Trevilo cerradas (i18n, tipado, a11y, SVG duplicado, etc).
 *
 * Layout apila 8 componentes verticalmente sin container global — cada uno
 * gestiona su ancho y padding, igual que Trevilo intencionalmente.
 */
const NimbusTheme: React.FC = () => {
  return (
    <div className="min-h-screen bg-nimbus-surface font-sans text-neutral-900 overflow-x-hidden">
      <Navbar />
      <Hero />

      {/* Banda con fondo compartido: marquee de Companies + Destinations.
          El fondo (backgrounds/1.jpg) cubre AMBOS controles a ancho completo,
          con opacidad reducida (10%). */}
      <div className="relative w-full overflow-hidden">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/src/webp/backgrounds/1.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
          }}
          aria-hidden="true"
        />
        <div className="relative z-10">
          <Companies />
          <Destinations />
        </div>
      </div>

      <Packages />
      <Testimonials />
      <CtaBanner />
      <Footer />
    </div>
  );
};

export default NimbusTheme;
