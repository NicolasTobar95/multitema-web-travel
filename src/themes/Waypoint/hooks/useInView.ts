import { useEffect, useRef, useState } from 'react';

export const useInView = <T extends HTMLElement>(
  options?: IntersectionObserverInit,
): [React.RefObject<T | null>, boolean] => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  // Snapshot serializable para reaccionar a cambios de options sin escribir refs durante el render.
  const optsKey = JSON.stringify(options ?? null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const userOpts = options ?? {};
    const threshold = userOpts.threshold ?? 0.2;
    const rootMargin = userOpts.rootMargin ?? '0px 0px -10% 0px';
    const root = userOpts.root ?? null;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setInView(entry.isIntersecting);
      },
      { threshold, rootMargin, root },
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optsKey]);

  return [ref, inView];
};
