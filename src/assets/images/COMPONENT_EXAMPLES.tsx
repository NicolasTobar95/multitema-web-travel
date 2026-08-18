/**
 * Example: How to integrate local image metadata in a component
 *
 * This file shows how to use destinationMetadata with your existing components.
 */

import React from 'react';
import { useTranslation } from '../../../i18n';
import { sharedImages } from '../../../config/sharedImages';
import { destinationMetadata } from '../../../config/imageMetadata';
import { AvatarMetadata } from '../../../config/imageMetadata';

// ============================================
// EXAMPLE 1: Destinations Component (like Aura/Destinations.tsx)
// ============================================

interface DestCard {
  id: string;
  title: string;
  location: string;
  description: string;
  imageIdx: number;
}

const DestinationsWithMetadata: React.FC = () => {
  const { t, language } = useTranslation(); // Get current language
  const lang = language === 'es' ? 'es' : 'en';

  const destData = t('Aura.destinations') as {
    subtitle: string;
    title: string;
    description: string;
    cards: Array<{
      id: string;
      title: string;
      location: string;
      description: string;
      imageIdx: number;
    }>;
  };

  const cards: DestCard[] = destData.cards;
  const images = sharedImages.destinations;
  const metadata = destinationMetadata; // Array of metadata objects

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 md:px-10 py-16 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-stone-900"></div>
            <span className="text-stone-500 font-bold text-sm tracking-[0.2em] uppercase">
              {destData.subtitle}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-stone-900 leading-tight">
            {destData.title}
          </h2>
        </div>
        <div className="flex-1 md:max-w-xl">
          <p className="text-stone-500 leading-relaxed text-base md:text-lg">
            {destData.description}
          </p>
        </div>
      </div>

      {/* Destination Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
        {cards.map((card, i) => {
          const isWide = i % 2 === 0;
          const colSpan = isWide ? 'md:col-span-3' : 'md:col-span-2';
          const idx = card.imageIdx !== undefined ? card.imageIdx : i;
          const destMetadata = metadata[idx];

          return (
            <div
              key={card.id}
              className={`${colSpan} h-[300px] sm:h-[400px] relative rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500`}
            >
              {/* Main Image with metadata */}
              <img
                src={images[idx]}
                alt={destMetadata?.description[lang] || card.title}
                title={destMetadata?.description[lang] || card.description}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Content */}
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end transition-transform duration-500">
                {/* Location with bilingual support */}
                <span className="text-white/80 text-sm font-semibold mb-2 uppercase tracking-wider">
                  {destMetadata?.location[lang] || card.location}
                </span>

                <div className="flex items-center justify-between">
                  <h3 className="text-white text-2xl md:text-4xl font-extrabold">
                    {card.title}
                  </h3>

                  {/* Optional: Display featured badge */}
                  {destMetadata?.featured && (
                    <span className="px-3 py-1 bg-yellow-500/90 backdrop-blur-sm rounded-full text-xs font-bold text-black">
                      FEATURED
                    </span>
                  )}
                </div>

                {/* Optional: Display tags if available */}
                {destMetadata?.tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {destMetadata.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-white/10 backdrop-blur-sm rounded text-xs text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DestinationsWithMetadata;

// ============================================
// EXAMPLE 2: Testimonials Component with Avatars
// ============================================

const TestimonialsWithAvatars: React.FC = () => {
  const { language } = useTranslation();
  const lang = language === 'es' ? 'es' : 'en';

  const testimonials = [
    {
      id: 1,
      quote: "Amazing destinations!",
      name: "Sarah Johnson",
      role: "Travel Enthusiast"
    },
    {
      id: 2,
      quote: "Best travel experience ever.",
      name: "Michael Brown",
      role: "Frequent Traveler"
    },
    {
      id: 3,
      quote: "Incredible service.",
      name: "Emma Wilson",
      role: "Adventure Seeker"
    }
  ];

  const avatars = sharedImages.avatars;
  const avatarMeta = avatarMetadata;

  return (
    <div className="space-y-8">
      {testimonials.map((testimonial, idx) => {
        const avatarUrl = avatars[idx % avatars.length];
        const avatar = avatarMeta[idx % avatarMeta.length];

        return (
          <div key={testimonial.id} className="flex items-start gap-6">
            {/* Avatar with metadata */}
            <div className="flex-shrink-0">
              <img
                src={avatarUrl}
                alt={avatar?.name[lang] || testimonial.name}
                title={`${avatar?.name[lang]} - ${avatar?.role[lang]}`}
                className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
              />
            </div>

            <div className="flex-1">
              <p className="text-xl text-white/90 mb-2">"{testimonial.quote}"</p>

              {/* Show avatar metadata when available */}
              {avatar?.description && (
                <p className="text-sm text-white/60">
                  {avatar.description[lang]}
                </p>
              )}

              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-white">
                  {avatar?.name[lang] || testimonial.name}
                </span>
                {avatar?.role && (
                  <span className="text-sm text-white/60">
                    • {avatar.role[lang] || testimonial.role}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TestimonialsWithAvatars;
