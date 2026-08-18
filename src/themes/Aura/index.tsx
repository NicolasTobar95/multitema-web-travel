import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Destinations from './components/Destinations';
import TourPackages from './components/TourPackages';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

const AuraTheme = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-stone-900">
      <Navbar />
      <Hero />
      <Stats />
      <Destinations />
      <HowItWorks />
      <TourPackages />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default AuraTheme;