import { useEffect, useState } from 'react';

const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

export const useCountUp = (
  target: number,
  inView: boolean,
  duration: number = 1500,
): number => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let rafId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, inView, duration]);

  return value;
};
