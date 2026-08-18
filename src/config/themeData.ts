import { getHeaderImageByTheme } from './imageMetadata';

export const themeData = {
  // Waypoint: retoque editorial de PacificNW. heroImageUrl cambiado a picos de
  // montaña (más dramático y editorial) — la View Transition precargará el nuevo
  // URL al navegar desde temas que ya usan esta imagen (Aura/Aeria).
  // stats=numéricos para useCountUp / Navbar.
  Waypoint: {
    heroImageUrl: getHeaderImageByTheme('Waypoint')!.url,
    stats: {
      likes: 1124,
      comments: 35,
      // Valores numéricos puros para alimentar useCountUp en Olympic.
      // Migrados desde dictionaries PacificNW.olympic.stats.*.value
      olympic: {
        days: 3,
        mileage: 104,
        elevation: 7965,
      },
    },
  },
  // Aura: retoque editorial de Indotravi. heroImageUrl idéntico al de Indotravi para
  // no romper la precarga de la View Transition.
  Aura: {
    heroImageUrl: getHeaderImageByTheme('Aura')!.url,
  },
  Aeria: {
    heroImageUrl: getHeaderImageByTheme('Aeria')!.url,
  },
  // Nimbus: retoque editorial de Trevilo. heroImageUrl idéntico al de Trevilo
  // para no romper la precarga de la View Transition y conservar el bookend
  // visual Hero→CtaBanner (el doc marca el reuso como decisión intencional).
  Nimbus: {
    heroImageUrl: getHeaderImageByTheme('Nimbus')!.url,
  },
};
