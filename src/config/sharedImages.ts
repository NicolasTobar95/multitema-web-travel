/**
 * Imágenes compartidas locales (formato WebP)
 *
 * Todas las imágenes ahora se sirven desde /src/webp/ (locales).
 * Los componentes consumen los arrays por índice:
 *   - destinations[0..3] para cards de destinos
 *   - narrative[0..2] para imágenes narrativas
 *   - panoramas[0..2] para banners anchos
 *   - avatars[0..5] para retratos (Nicolas Tobar es idx 0 - avatar principal)
 *
 * Mapeo: los 8 destinos locales se reparten entre destinations, narrative y
 * panoramas reutilizándolos (no se descargaron imágenes aparte para narrative
 * ni panoramas). Avatars son 6 locales.
 */

// Rutas a las imágenes webp en src/webp/
const DEST = '/src/webp/destinations/';
const AV = '/src/webp/avatars/';

export const sharedImages = {
  // Tarjetas de destinos (montaña, playa, cañón, templo + 4 extra locales)
  destinations: [
    `${DEST}Suiza - Alpes.webp`,                          // 0: Montaña / Nieve
    `${DEST}Bali, Indonesia - Isla paradisíaca.webp`,     // 1: Playa / Tropical
    `${DEST}Gili Trawangan - Playa cristalina.webp`,       // 2: Mar / Cristal
    `${DEST}Perú - Machu Picchu.webp`,                     // 3: Historia / Montaña
    `${DEST}Maldivas - Lujo tropical.webp`,                // 4: Lujo / Turquesa
    `${DEST}Islandia - Aurora boreal.webp`,                // 5: Aurora / Norte
    `${DEST}Kyoto, Japón - Cultura tradicional.webp`,      // 6: Cultura / Japón
    `${DEST}Fiji - Islas vírgenes.webp`,                   // 7: Islas / Paraíso
  ],
  // Imágenes narrativas (excursionistas, paisajes heroicos)
  // Reutiliza destinos locales con mejor feeling narrativo.
  narrative: [
    `${DEST}Maldivas - Lujo tropical.webp`,                // 0: Paisaje tropical heroico
    `${DEST}Islandia - Aurora boreal.webp`,                // 1: Paisaje nórdico dramático
    `${DEST}Kyoto, Japón - Cultura tradicional.webp`,       // 2: Cultura / viaje
  ],
  // Banners anchos (reutiliza destinos con feeling panorámico)
  panoramas: [
    `${DEST}Fiji - Islas vírgenes.webp`,                   // 0: Paraíso amplio
    `${DEST}Suiza - Alpes.webp`,                           // 1: Montaña panorámica
    `${DEST}Islandia - Aurora boreal.webp`,                // 2: Aurora boreal wide
  ],
  // Retratos para testimonios/autores.
  // Nicolas Tobar (tu foto) va PRIMERO en idx 0 para que aparezca como
  // avatar principal en todos los temas (Author, ClientReview, grids de 3, etc.)
  avatars: [
    `${AV}Nicolas Tobar - Full Stack Developer.webp`,      // 0 (TU FOTO - principal)
    `${AV}Sofía Martínez - Viajera apasionada.webp`,       // 1
    `${AV}Emily Chen - Cocinera exploradora.webp`,          // 2
    `${AV}James Wilson - Montañista profesional.webp`,      // 3
    `${AV}María García - Ecoturista.webp`,                  // 4
    `${AV}Michael Brown - Fotógrafo de viajes.webp`,         // 5
  ]
};
