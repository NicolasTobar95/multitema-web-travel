import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import RouteMap from './components/RouteMap';
import OlympicNational from './components/OlympicNational';
import Author from './components/Author';
import Footer from './components/Footer';

const WaypointTheme = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      <Navbar />
      <Hero />
      <Timeline />
      <RouteMap />
      <OlympicNational />
      <Author />
      <Footer />
    </div>
  );
};

export default WaypointTheme;
