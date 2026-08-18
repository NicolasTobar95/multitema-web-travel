import { useRef, type MouseEvent, type RefObject } from 'react';

export const useFloatTilt = <T extends HTMLElement = HTMLElement>(
  intensity: number = 8,
): {
  ref: RefObject<T | null>;
  onMouseMove: (e: MouseEvent<T>) => void;
  onMouseLeave: () => void;
} => {
  const ref = useRef<T>(null);

  const handleMouseMove = (e: MouseEvent<T>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `perspective(1000px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg)`;
  };

  const handleMouseLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
};
