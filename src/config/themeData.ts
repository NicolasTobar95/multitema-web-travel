import { getHeaderImageByTheme } from './imageMetadata';

export const themeData = {
  // Waypoint: editorial retake of PacificNW. heroImageUrl switched to mountain
  // peaks (more dramatic and editorial) — the View Transition will preload the
  // new URL when navigating from themes that already use this image (Aura/Aeria).
  // stats=numeric for useCountUp / Navbar.
  Waypoint: {
    heroImageUrl: getHeaderImageByTheme('Waypoint')!.url,
    stats: {
      likes: 1124,
      comments: 35,
      // Pure numeric values to feed useCountUp in Olympic.
      // Migrated from the PacificNW.olympic.stats.*.value dictionaries.
      olympic: {
        days: 3,
        mileage: 104,
        elevation: 7965,
      },
    },
  },
  // Aura: editorial retake of Indotravi. heroImageUrl identical to Indotravi so
  // the View Transition preload is not broken.
  Aura: {
    heroImageUrl: getHeaderImageByTheme('Aura')!.url,
  },
  Aeria: {
    heroImageUrl: getHeaderImageByTheme('Aeria')!.url,
  },
  // Nimbus: editorial retake of Trevilo. heroImageUrl identical to Trevilo
  // so the View Transition preload is not broken and the Hero→CtaBanner
  // visual bookend is preserved (the doc marks the reuse as an intentional decision).
  Nimbus: {
    heroImageUrl: getHeaderImageByTheme('Nimbus')!.url,
  },
};
