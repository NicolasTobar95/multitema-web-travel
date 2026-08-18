/**
 * Guide to using local images in the project
 *
 * This guide explains how to integrate the local image metadata
 * created in src/config/imageMetadata.ts with your components.
 */

// ============================================
// STEP 1: Update your theme data to use local images
// ============================================

// Already updated in src/config/themeData.ts ✅:
//
// import { getHeaderImageByTheme } from './imageMetadata';
//
// export const themeData = {
//   Waypoint: {
//     heroImageUrl: getHeaderImageByTheme('Waypoint')!.url,
//     // ...
//   },
//   Aura: {
//     heroImageUrl: getHeaderImageByTheme('Aura')!.url,
//   },
//   Aeria: {
//     heroImageUrl: getHeaderImageByTheme('Aeria')!.url,
//   },
//   Nimbus: {
//     heroImageUrl: getHeaderImageByTheme('Nimbus')!.url,
//   }
// };

// ============================================
// STEP 2: Update Destination components to use metadata
// ============================================

// In Aura/Destinations.tsx:
import { destinationMetadata } from '../../../config/imageMetadata';

const images = sharedImages.destinations;

// Before:
// <img src={images[idx]} alt={card.title} />

// After:
// const metadata = destinationMetadata[idx];
// <img src={images[idx]} alt={metadata.description[lang]} title={metadata.description[lang]} />

// ============================================
// STEP 3: Update Avatar components
// ============================================

// In Testimonials.tsx:
import { avatarMetadata } from '../../../config/imageMetadata';

const avatarsLen = sharedImages.avatars.length;

// Before:
// <img src={sharedImages.avatars[idx % avatarsLen]} alt={`User ${idx}`} />

// After:
// const avatar = avatarMetadata[idx % avatarsLen];
// <img src={avatar.url} alt={avatar.name[lang]} title={`${avatar.name[lang]} - ${avatar.role[lang]}`} />

// ============================================
// STEP 4: How to get the image URLs
// ============================================

// Images are stored in src/webp/:
// 1. Headers: src/webp/headers/{fileName}.webp
// 2. Destinations: src/webp/destinations/{fileName}.webp
// 3. Avatars: src/webp/avatars/{fileName}.webp

// 2. The file paths in imageMetadata.ts will automatically match:
//    /src/webp/headers/Waypoint.webp
//    /src/webp/destinations/Bali, Indonesia - Isla paradisíaca.webp
//    /src/webp/avatars/Nicolas Tobar - Full Stack Developer.webp

// 3. Vite will handle the path automatically:
//    import waypointHero from '/src/webp/headers/Waypoint.webp';

// ============================================
// STEP 5: Browser preview in development
// ============================================

// When running `npm run dev`, Vite serves images from src/webp/.
//
// OPTION A: Use Vite's asset handling
//    import waypointHero from '/src/webp/headers/Waypoint.webp';
//    <img src={waypointHero} alt="..." />
//
// OPTION B: Import from imageMetadata (recommended)
//    import { getHeaderImageByTheme } from './imageMetadata';
//    const imageUrl = getHeaderImageByTheme('Waypoint')!.url;
//    <img src={imageUrl} alt="..." />

// ============================================
// OPTIONAL: Using Import Maps for cleaner paths
// ============================================

// If you want cleaner imports without all the relative paths,
// you can create an import map in index.html:

// <script type="importmap">
//   {
//     "imports": {
//       "@/webp": "/src/webp",
//       "@/config": "/src/config"
//     }
//   }
// </script>

// Then use:
// import { headerMetadata } from '@/config/imageMetadata';
// import waypointHero from '@/webp/headers/Waypoint.webp';
