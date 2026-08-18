import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import RelaxingSpots from './components/RelaxingSpots';
import Discover from './components/Discover';
import ClientReview from './components/ClientReview';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AeriaConcierge from './components/AeriaConcierge';

const AeriaTheme: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <RelaxingSpots />
      <ClientReview />
      <Discover />
      <CTA />
      <Footer />
      <AeriaConcierge />
    </div>
  );
};

export default AeriaTheme;