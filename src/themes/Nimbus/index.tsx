import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Companies from './components/Companies';
import Destinations from './components/Destinations';
import Packages from './components/Packages';
import Testimonials from './components/Testimonials';
import CtaBanner from './components/CtaBanner'; // <-- EXTRACTED from the original Trevilo Footer
import Footer from './components/Footer';     // <-- SIMPLIFIED (no giant CTA)

/**
 * NimbusTheme — editorial retake of Trevilo.
 *
 * Keeps the Trevilo DNA: aggressively rounded corners that scale with
 * importance (`rounded-[3rem]` in Hero, Packages base and CtaBanner), the
 * `shadow-sm`→`shadow-lg`→`shadow-xl/2xl` shadow hierarchy, and the light
 * palette with cyan as the only accent, centralized in `tailwind.config`
 * as `colors.nimbus`.
 *
 * What's new: real float + tilt in the Hero search box and the "Bali Island"
 * card in Packages (hook `useFloatTilt`), magnetic button in the Hero CTA,
 * sticky Navbar with conditional backdrop-blur, CtaBanner extracted as an
 * independent piece, shared BrandLogo, and all Trevilo debt closed
 * (i18n, typing, a11y, duplicated SVG, etc).
 *
 * Layout stacks 8 components vertically without a global container — each one
 * manages its own width and padding, just like Trevilo intentionally did.
 */
const NimbusTheme: React.FC = () => {
  return (
    <div className="min-h-screen bg-nimbus-surface font-sans text-neutral-900 overflow-x-hidden">
      <Navbar />
      <Hero />

      {/* Band with shared background: Companies marquee + Destinations.
          The background (backgrounds/1.jpg) covers BOTH sections at full width,
          with reduced opacity (10%). */}
      <div className="relative w-full overflow-hidden">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/webp/backgrounds/1.jpg)',
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
