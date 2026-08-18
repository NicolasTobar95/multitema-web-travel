import React, { useState } from 'react';
import { useTranslation } from '../../../i18n';
import { themeData } from '../../../config/themeData';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const heroData = t('Aeria.hero') as {
    title: string;
    subtitle: string;
    email: { placeholder: string; button: string };
  };

  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim().length === 0) return;
    // Hook future: connect to waitlist/newsletter endpoint
    setEmail('');
  };

  return (
    <section className="w-full font-sans pb-24">
      <div
        className="relative w-full h-[760px] md:h-[900px] bg-cover bg-center flex flex-col items-center justify-center text-white overflow-hidden"
        style={{ backgroundImage: `url(${themeData.Aeria.heroImageUrl})` }}
      >
        {/* Brand purple overlay - full bleed so navbar inherits same gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/80 via-purple-900/40 to-purple-950/60 z-0" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[1.05] drop-shadow-lg">
            {heroData.title}
          </h1>

          <p className="mt-8 text-lg md:text-xl text-white/80 font-medium max-w-2xl leading-relaxed">
            {heroData.subtitle}
          </p>

          {/* Combined email pill: input + button (PayWise pattern) */}
          <form
            onSubmit={handleSubmit}
            className="mt-12 flex items-center w-full max-w-lg bg-white rounded-full p-1.5 shadow-2xl"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={heroData.email.placeholder}
              className="flex-1 bg-transparent text-base text-neutral-800 placeholder-neutral-400 px-5 py-2.5 focus:outline-none font-medium"
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-7 py-3 rounded-full text-base font-bold transition-all hover:scale-105 active:scale-95 shrink-0"
            >
              {heroData.email.button}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;