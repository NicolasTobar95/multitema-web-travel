import React from 'react';
import { useTranslation } from '../../../i18n';
import { sharedImages } from '../../../config/sharedImages';
import { useInView } from '../../../hooks/useInView';

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatarIdx: number;
}

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const data = t('Aura.testimonials') as {
    subtitle: string;
    title: string;
    items: Array<{
      id: string;
      quote: string;
      author: string;
      role: string;
      avatarIdx: number;
    }>;
  };
  const items: TestimonialItem[] = data.items;
  const bgImage = '/src/webp/backgrounds/8.jpg';
  const avatars = sharedImages.avatars;
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className={`relative w-full py-20 md:py-28 font-sans overflow-hidden transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Section background: image in an absolute layer (reliable in all
          browsers, unlike background-attachment: fixed) + soft dark veil
          for white text readability. */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <img
          src={bgImage}
          alt=""
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-stone-950/60"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-10">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-amber-500"></div>
            <span className="text-amber-500 font-bold text-sm tracking-[0.2em] uppercase">
              {data.subtitle}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-3xl">
            {data.title}
          </h2>
        </div>

        {/* 3-column grid: 1 col on mobile, 2 on tablet, 3 on desktop.
            No horizontal scroll, no snap, no flex-shrink. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-amber-500/30 rounded-[2.5rem] p-8 md:p-10 flex flex-col gap-6 transition-all duration-500 shadow-2xl hover:shadow-amber-500/5 group"
            >
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-amber-500 group-hover:scale-110 transition-transform duration-300"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-white/90 text-base leading-relaxed italic font-serif group-hover:text-white transition-colors">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img
                  src={avatars[item.avatarIdx % avatars.length]}
                  alt={item.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20 group-hover:border-amber-500/40 transition-all duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div>
                  <p className="text-white font-bold group-hover:text-amber-300 transition-colors">{item.author}</p>
                  <p className="text-white/60 text-sm">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
