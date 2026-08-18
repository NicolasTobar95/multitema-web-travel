import { useEffect, useRef, useState } from 'react';

export const useInView = <T extends HTMLElement>(
  options?: IntersectionObserverInit,
): [React.RefObject<T | null>, boolean] => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const userOpts = optionsRef.current ?? {};
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
  }, []);

  return [ref, inView];
};