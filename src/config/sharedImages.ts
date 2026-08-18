/**
 * Shared local images (WebP format)
 *
 * All images are now served from /src/webp/ (local).
 * Components consume the arrays by index:
 *   - destinations[0..3] for destination cards
 *   - narrative[0..2] for narrative images
 *   - panoramas[0..2] for wide banners
 *   - avatars[0..5] for portraits (Nicolas Tobar is idx 0 - main avatar)
 *
 * Mapping: the 8 local destinations are split between destinations, narrative and
 * panoramas by reusing them (no separate images were downloaded for narrative
 * or panoramas). Avatars are 6 local files.
 */

// Paths to the webp images in src/webp/
const DEST = '/src/webp/destinations/';
const AV = '/src/webp/avatars/';

export const sharedImages = {
  // Destination cards (mountain, beach, canyon, temple + 4 extra local ones)
  destinations: [
    `${DEST}Suiza - Alpes.webp`,                          // 0: Mountain / Snow
    `${DEST}Bali, Indonesia - Isla paradisíaca.webp`,     // 1: Beach / Tropical
    `${DEST}Gili Trawangan - Playa cristalina.webp`,       // 2: Sea / Crystal
    `${DEST}Perú - Machu Picchu.webp`,                     // 3: History / Mountain
    `${DEST}Maldivas - Lujo tropical.webp`,                // 4: Luxury / Turquoise
    `${DEST}Islandia - Aurora boreal.webp`,                // 5: Aurora / North
    `${DEST}Kyoto, Japón - Cultura tradicional.webp`,      // 6: Culture / Japan
    `${DEST}Fiji - Islas vírgenes.webp`,                   // 7: Islands / Paradise
  ],
  // Narrative images (hikers, heroic landscapes)
  // Reuses local destinations with the best narrative feel.
  narrative: [
    `${DEST}Maldivas - Lujo tropical.webp`,                // 0: Heroic tropical landscape
    `${DEST}Islandia - Aurora boreal.webp`,                // 1: Dramatic nordic landscape
    `${DEST}Kyoto, Japón - Cultura tradicional.webp`,       // 2: Culture / travel
  ],
  // Wide banners (reuses destinations with a panoramic feel)
  panoramas: [
    `${DEST}Fiji - Islas vírgenes.webp`,                   // 0: Wide paradise
    `${DEST}Suiza - Alpes.webp`,                           // 1: Panoramic mountain
    `${DEST}Islandia - Aurora boreal.webp`,                // 2: Wide aurora borealis
  ],
  // Portraits for testimonials/authors.
  // Nicolas Tobar (your photo) goes FIRST at idx 0 so it appears as the
  // main avatar in all themes (Author, ClientReview, 3-grids, etc.)
  avatars: [
    `${AV}Nicolas Tobar - Full Stack Developer.webp`,      // 0 (YOUR PHOTO - main)
    `${AV}Sofía Martínez - Viajera apasionada.webp`,       // 1
    `${AV}Emily Chen - Cocinera exploradora.webp`,          // 2
    `${AV}James Wilson - Montañista profesional.webp`,      // 3
    `${AV}María García - Ecoturista.webp`,                  // 4
    `${AV}Michael Brown - Fotógrafo de viajes.webp`,         // 5
  ]
};
