import { useTranslation } from '../../../i18n';
import AuthorCard from '../../../components/AuthorCard';

interface LinkGroup {
  title: string;
  items: string[];
}

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const data = t('Aura.footer') as {
    links: LinkGroup[];
    newsletter: { title: string; description: string; placeholder: string; button: string };
    contact: { title: string; items: string[] };
    copyright: string;
  };

  return (
    <footer className="w-full bg-stone-900 text-white font-sans">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Col 1: Author presentation card (wider) —
              clickable: opens the external portfolio in a new tab.
              innerBgBase matches the footer color (stone-900) so the
              opaque base layer is invisible over the background. */}
          <div className="lg:col-span-5">
            <a
              href="https://portfolio-218.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
              aria-label="Ver portfolio de Nicolas Tobar"
            >
              <AuthorCard innerBgBase="bg-stone-900" innerBg="bg-white/5" />
            </a>
          </div>

          {(data.links as LinkGroup[]).map((group) => (
            <div key={group.title} className="lg:col-span-2 flex flex-col gap-4">
              <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-stone-400">{group.title}</h4>
              <ul className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <li key={item}>
                    <button type="button" onClick={(e) => e.preventDefault()} className="text-stone-300 hover:text-amber-500 transition-colors text-sm bg-transparent border-0 p-0 cursor-pointer text-left">{item}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-stone-400">{data.newsletter.title}</h4>
            <p className="text-stone-400 text-sm leading-relaxed">
              {data.newsletter.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="email"
                placeholder={data.newsletter.placeholder}
                className="flex-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder-stone-400 outline-none focus:border-amber-500/50 transition-colors"
              />
              <button className="bg-amber-500 text-stone-900 rounded-full px-5 py-3 text-sm font-bold hover:bg-amber-400 active:bg-amber-600 transition-colors">
                {data.newsletter.button}
              </button>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-stone-400 mb-3">{data.contact.title}</h4>
              <ul className="flex flex-col gap-2">
                {(data.contact.items as string[]).map((item) => (
                  <li key={item} className="text-stone-300 text-sm hover:text-amber-500 transition-colors">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-stone-400 text-sm">
          {data.copyright.replace('{year}', String(new Date().getFullYear()))}
        </div>
        {/* Demo line below the copyright — theme author */}
        <div className="mt-4 text-center text-xs text-stone-500">
          {(t('shared.footerNotice') as string).replace('{year}', String(new Date().getFullYear()))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;