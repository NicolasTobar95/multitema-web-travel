import type { CSSProperties } from 'react';

/**
 * Animated RGB gradient (13 stops + 1 extra for phase-shift).
 * oklch color space guarantees perceptually uniform interpolation.
 */
export const RGB_GRADIENT =
  'linear-gradient(315deg in oklch, #ef4444, #f59e0b, #10b981, #3b82f6, #8b5cf6, #ef4444, #ef4444, #f59e0b, #10b981, #3b82f6, #8b5cf6, #ef4444, #f59e0b)';

/**
 * Shared styles for the panda with animated RGB.
 */
export const RGB_ANIMATION_STYLES: CSSProperties = {
  background: RGB_GRADIENT,
  backgroundSize: '200% 200%',
  backgroundRepeat: 'no-repeat',
  animation: 'panda-rgb-scroll 4s linear infinite',
  willChange: 'background-position',
  transform: 'translateZ(0)',
};

/**
 * Shared styles for text with animated RGB (background-clip: text).
 */
export const RGB_TEXT_STYLES: CSSProperties = {
  backgroundImage: RGB_GRADIENT,
  backgroundSize: '200% 200%',
  backgroundRepeat: 'no-repeat',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
  animation: 'panda-rgb-scroll 4s linear infinite',
  willChange: 'background-position',
  transform: 'translateZ(0)',
};