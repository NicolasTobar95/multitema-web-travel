import { useTranslation } from '../../../i18n';
import { sharedImages } from '../../../config/sharedImages';
import { useInView } from '../hooks/useInView';
import { THEME_CONTAINER, IMG_PORTRAIT, IMG_TALL } from '../layout';

interface TimelineStop {
  id: string;
  label: string;
  title: string;
  coords: string;
  text: string;
  subtitle: string;
}

const Timeline = () => {
  const { t } = useTranslation();
  const stopsText = t('Waypoint.timeline') as TimelineStop[];
  const [sectionRef, inView] = useInView<HTMLElement>();

  const stopsData = [
    {
      image1: sharedImages.destinations[0],
      image2: sharedImages.destinations[5],
    },
    {
      image1: sharedImages.destinations[0],
      image2: null as string | null,
    },
  ];

  if (!Array.isArray(stopsText) || stopsText.length < 2) return null;

  return (
    <section ref={sectionRef} className={`relative w-full bg-white py-24 overflow-hidden ${THEME_CONTAINER}`}>
      <div className="hidden md:block absolute left-1/2 top-12 bottom-12 w-[1px] border-l-2 border-dashed border-zinc-300 -ml-[1px]"></div>

      <div className="flex flex-col gap-16 md:gap-20">
        {/* PARADA 1 */}
        <div
          className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-24 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-red-500 rounded-full z-10"></div>
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <img
              src={stopsData[0].image1}
              alt={stopsText[0].title}
              className={`w-full ${IMG_PORTRAIT} object-cover rounded-sm shadow-xl`}
            />
            <h2 className="text-3xl md:text-5xl font-serif italic text-zinc-800 leading-snug mt-4 pr-10">
              {stopsText[0].subtitle}
            </h2>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start pt-10">
            <span className="text-xs font-bold tracking-[0.25em] text-zinc-400 uppercase mb-2">
              {stopsText[0].label}
            </span>
            <h3 className="text-5xl md:text-7xl font-display text-zinc-900 mb-2 leading-none">
              {stopsText[0].title}
            </h3>
            <span className="text-xs tracking-[0.25em] text-zinc-500 font-medium mb-8">
              {stopsText[0].coords}
            </span>
            <p className="text-zinc-600 leading-relaxed max-w-md">
              {stopsText[0].text}
            </p>
            {stopsData[0].image2 && (
              <div className="mt-8 w-full">
                <img
                  src={stopsData[0].image2}
                  alt={stopsText[0].title}
                  className="w-full aspect-[4/3] object-cover rounded-sm shadow-md"
                />
              </div>
            )}
          </div>
        </div>

        {/* PARADA 2 */}
        <div
          className={`relative flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-red-500 rounded-full z-10"></div>
          <div className="w-full md:w-1/2 flex flex-col items-start md:items-end md:text-right">
            <span className="text-xs font-bold tracking-[0.25em] text-zinc-400 uppercase mb-2">
              {stopsText[1].label}
            </span>
            <h3 className="text-5xl md:text-7xl font-display text-zinc-900 mb-2 leading-none">
              {stopsText[1].title}
            </h3>
            <span className="text-xs tracking-[0.25em] text-zinc-500 font-medium mb-8">
              {stopsText[1].coords}
            </span>
            <p className="text-zinc-600 leading-relaxed max-w-md text-left md:text-right">
              {stopsText[1].text}
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={stopsData[1].image1}
              alt={stopsText[1].title}
              className={`w-full ${IMG_TALL} object-cover rounded-sm shadow-2xl`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
