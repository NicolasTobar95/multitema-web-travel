/**
 * Local Image Metadata
 *
 * This file contains all metadata for local images stored in /src/webp/
 * Each image has descriptions in both Spanish (es) and English (en) for i18n support.
 *
 * Structure:
 * - Headers: One image per theme (Waypoint, Aura, Aeria, Nimbus)
 * - Destinations: 8 curated destinations with varying locations
 * - Avatars: 6 user avatars for testimonials
 */

// ============================================
// HEADER IMAGES
// ============================================

export interface HeaderImageMetadata {
  id: string;
  fileName: string;
  url: string;
  alt: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  theme: 'Waypoint' | 'Aura' | 'Aeria' | 'Nimbus';
}

export const headerMetadata: HeaderImageMetadata[] = [
  {
    id: 'waypoint-hero',
    fileName: 'Waypoint.webp',
    url: '/src/webp/headers/Waypoint.webp',
    alt: {
      es: 'Picos de montaña nevados con amanecer dorado',
      en: 'Snow-capped mountain peaks with golden sunrise'
    },
    description: {
      es: 'Una vista impresionante de la cadena montañosa en el amanecer. El sol ilumina los picos cubiertos de nieve creando un contraste dramático entre las luces doradas y las sombras azules.',
      en: 'An impressive view of the mountain range at sunrise. The sun illuminates the snow-capped peaks, creating a dramatic contrast between golden light and blue shadows.'
    },
    theme: 'Waypoint'
  },
  {
    id: 'aura-hero',
    fileName: 'Aura.webp',
    url: '/src/webp/headers/Aura.webp',
    alt: {
      es: 'Bosque místico con luces etéreas',
      en: 'Mystical forest with ethereal lights'
    },
    description: {
      es: 'Bosque ennoventador con luz dorada filtrándose entre los árboles. La atmósfera mágica crea una sensación de paz y contemplación, perfecta para inspirar viajes de exploración.',
      en: 'Enchanting forest with golden light filtering through the trees. The magical atmosphere creates a sense of peace and contemplation, perfect for inspiring exploration trips.'
    },
    theme: 'Aura'
  },
  {
    id: 'aeria-hero',
    fileName: 'Aeria.webp',
    url: '/src/webp/headers/Aeria.webp',
    alt: {
      es: 'Montañas envueltas en neblina con puestas de sol dramáticas',
      en: 'Mountains shrouded in mist with dramatic sunsets'
    },
    description: {
      es: 'Elegante vista de montañas cubiertas de neblina al atardecer. Los colores suaves del cielo reflejados en los picos crean una imagen serena y cinematográfica.',
      en: 'Elegant mountain view shrouded in mist at sunset. Soft sky colors reflected in the peaks create a serene and cinematic image.'
    },
    theme: 'Aeria'
  },
  {
    id: 'nimbus-hero',
    fileName: 'Nimbus.webp',
    url: '/src/webp/headers/Nimbus.webp',
    alt: {
      es: 'Bosque denso con caída de luz dramática',
      en: 'Dense forest with dramatic light fall'
    },
    description: {
      es: 'Bosque de coníferas con luz natural filtrándose intensamente. La profundidad del bosque y la luz crean una sensación de misterio y aventura.',
      en: 'Pine forest with intense natural light filtering through. The depth of the forest and light create a sense of mystery and adventure.'
    },
    theme: 'Nimbus'
  }
];

// ============================================
// DESTINATION IMAGES
// ============================================

export interface DestinationImageMetadata {
  id: string;
  fileName: string;
  url: string;
  location: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  tags?: string[];
  featured?: boolean;
}

export const destinationMetadata: DestinationImageMetadata[] = [
  {
    id: '01-swiss-alps',
    fileName: 'Suiza - Alpes.webp',
    url: '/src/webp/destinations/Suiza - Alpes.webp',
    location: {
      es: 'Suiza',
      en: 'Switzerland'
    },
    description: {
      es: 'Los majestuosos Alpes suizos con picos nevados eternos y valles verdes prístinos. Destino ideal para amantes de la montaña, senderismo y aventuras alpinas.',
      en: 'The majestic Swiss Alps with eternal snow-capped peaks and pristine green valleys. Ideal destination for mountain lovers, hiking, and alpine adventures.'
    },
    tags: ['montaña', 'alpes', 'trekking', 'nieve'],
    featured: true
  },
  {
    id: '02-bali-island',
    fileName: 'Bali, Indonesia - Isla paradisíaca.webp',
    url: '/src/webp/destinations/Bali, Indonesia - Isla paradisíaca.webp',
    location: {
      es: 'Bali, Indonesia',
      en: 'Bali, Indonesia'
    },
    description: {
      es: 'Isla paradisíaca con templos antiguos, plantaciones de arroz en terrazas y playas de arena blanca. Experiencia cultural única en el sudeste asiático.',
      en: 'Paradise island with ancient temples, rice terraces, and white sand beaches. Unique cultural experience in Southeast Asia.'
    },
    tags: ['tropical', 'playa', 'cultura', 'templos'],
    featured: true
  },
  {
    id: '03-gili-trawangan',
    fileName: 'Gili Trawangan - Playa cristalina.webp',
    url: '/src/webp/destinations/Gili Trawangan - Playa cristalina.webp',
    location: {
      es: 'Gili Trawangan, Indonesia',
      en: 'Gili Trawangan, Indonesia'
    },
    description: {
      es: 'Isla tranquila en el archipiélago de Gili con acceso a playa de agua cristalina y vida nocturna relajada. Perfecta para relax y snorkel.',
      en: 'Peaceful island in the Gili archipelago with crystal-clear water beaches and relaxed nightlife. Perfect for relaxation and snorkeling.'
    },
    tags: ['mar', 'relax', 'snorkel', 'playa'],
    featured: true
  },
  {
    id: '04-machu-picchu',
    fileName: 'Perú - Machu Picchu.webp',
    url: '/src/webp/destinations/Perú - Machu Picchu.webp',
    location: {
      es: 'Perú',
      en: 'Peru'
    },
    description: {
      es: 'Ciudad inca perdida en las alturas de los Andes. Ruinas históricas impresionantes rodeadas de montañas espectaculares.',
      en: 'Lost Incan city in the heights of the Andes. Impressive historical ruins surrounded by spectacular mountains.'
    },
    tags: ['historia', 'andinas', 'arqueología', 'inca'],
    featured: true
  },
  {
    id: '05-maldives',
    fileName: 'Maldivas - Lujo tropical.webp',
    url: '/src/webp/destinations/Maldivas - Lujo tropical.webp',
    location: {
      es: 'Maldivas',
      en: 'Maldives'
    },
    description: {
      es: 'Paraíso tropical con overwater villas, aguas turquesas y vida marina vibrante. Lujo absoluto en el Océano Índico.',
      en: 'Tropical paradise with overwater villas, turquoise waters, and vibrant marine life. Absolute luxury in the Indian Ocean.'
    },
    tags: ['lujo', 'playa', 'turquesa', 'romántico'],
    featured: true
  },
  {
    id: '06-northern-lights',
    fileName: 'Islandia - Aurora boreal.webp',
    url: '/src/webp/destinations/Islandia - Aurora boreal.webp',
    location: {
      es: 'Islandia',
      en: 'Iceland'
    },
    description: {
      es: 'Espectacular aurora boreal sobre paisajes volcánicos y geiseres. Naturaleza extrema y mágica del norte.',
      en: 'Spectacular northern lights over volcanic landscapes and geysers. Extreme and magical nature of the north.'
    },
    tags: ['aurora', 'noche', 'extremo', 'vulcanos'],
    featured: true
  },
  {
    id: '07-kyoto',
    fileName: 'Kyoto, Japón - Cultura tradicional.webp',
    url: '/src/webp/destinations/Kyoto, Japón - Cultura tradicional.webp',
    location: {
      es: 'Kyoto, Japón',
      en: 'Kyoto, Japan'
    },
    description: {
      es: 'Ciudad histórica con templos antiguos, jardines zen y templos dorados. Esencia tradicional de Japón.',
      en: 'Historical city with ancient temples, zen gardens, and golden temples. Traditional essence of Japan.'
    },
    tags: ['cultura', 'japón', 'historia', 'jardines'],
    featured: true
  },
  {
    id: '08-fiji',
    fileName: 'Fiji - Islas vírgenes.webp',
    url: '/src/webp/destinations/Fiji - Islas vírgenes.webp',
    location: {
      es: 'Fiji',
      en: 'Fiji'
    },
    description: {
      es: 'Archipiélago de islas vírgenes con playas blancas, aguas cristalinas y cultura polinesia cálida.',
      en: 'Archipelago of virgin islands with white beaches, crystal-clear waters, and warm Polynesian culture.'
    },
    tags: ['oceano', 'islas', 'playa', 'amazing'],
    featured: true
  }
];

// ============================================
// AVATAR IMAGES
// ============================================

export interface AvatarMetadata {
  id: string;
  fileName: string;
  url: string;
  name: {
    es: string;
    en: string;
  };
  role: {
    es: string;
    en: string;
  };
  description?: {
    es: string;
    en: string;
  };
}

export const avatarMetadata: AvatarMetadata[] = [
  {
    id: 'avatar-01',
    fileName: 'Emily Chen - Cocinera exploradora.webp',
    url: '/src/webp/avatars/Emily Chen - Cocinera exploradora.webp',
    name: {
      es: 'Emily Chen',
      en: 'Emily Chen'
    },
    role: {
      es: 'Cocinera exploradora',
      en: 'Culinary Explorer'
    },
    description: {
      es: 'Viajó por 20 países buscando las mejores recetas locales.',
      en: 'Traveled to 20 countries seeking the best local recipes.'
    }
  },
  {
    id: 'avatar-02',
    fileName: 'James Wilson - Montañista profesional.webp',
    url: '/src/webp/avatars/James Wilson - Montañista profesional.webp',
    name: {
      es: 'James Wilson',
      en: 'James Wilson'
    },
    role: {
      es: 'Montañista profesional',
      en: 'Professional Mountaineer'
    },
    description: {
      es: 'Conquistó los 7 picos más altos del mundo con expediciones de altitud.',
      en: 'Conquered the 7 highest peaks in the world with high-altitude expeditions.'
    }
  },
  {
    id: 'avatar-03',
    fileName: 'María García - Ecoturista.webp',
    url: '/src/webp/avatars/María García - Ecoturista.webp',
    name: {
      es: 'María García',
      en: 'María García'
    },
    role: {
      es: 'Ecoturista',
      en: 'Eco-Tourist'
    },
    description: {
      es: 'Promueve viajes sostenibles y conservación de ecosistemas naturales.',
      en: 'Promotes sustainable travel and conservation of natural ecosystems.'
    }
  },
  {
    id: 'avatar-04',
    fileName: 'Michael Brown - Fotógrafo de viajes.webp',
    url: '/src/webp/avatars/Michael Brown - Fotógrafo de viajes.webp',
    name: {
      es: 'Michael Brown',
      en: 'Michael Brown'
    },
    role: {
      es: 'Fotógrafo de viajes',
      en: 'Travel Photographer'
    },
    description: {
      es: 'Su trabajo ha sido publicado en National Geographic y magazines internacionales.',
      en: 'His work has been published in National Geographic and international magazines.'
    }
  },
  {
    id: 'avatar-05',
    fileName: 'Nicolas Tobar - Full Stack Developer.webp',
    url: '/src/webp/avatars/Nicolas Tobar - Full Stack Developer.webp',
    name: {
      es: 'Nicolas Tobar',
      en: 'Nicolas Tobar'
    },
    role: {
      es: 'Ingeniero de Software Full-Stack',
      en: 'Full-Stack Software Engineer'
    },
    description: {
      es: 'Ingeniero de Software Full-Stack enfocado en construir ecosistemas digitales robustos, eficientes y centrados en el usuario.',
      en: 'Full-Stack Software Engineer focused on building robust, efficient, and user-centered digital ecosystems.'
    }
  },
  {
    id: 'avatar-06',
    fileName: 'Sofía Martínez - Viajera apasionada.webp',
    url: '/src/webp/avatars/Sofía Martínez - Viajera apasionada.webp',
    name: {
      es: 'Sofía Martínez',
      en: 'Sofía Martínez'
    },
    role: {
      es: 'Viajera apasionada',
      en: 'Passionate Traveler'
    },
    description: {
      es: 'Viajó 5 continentes y encontró su pasión por la fotografía documental de viajes.',
      en: 'Traveled 5 continents and found her passion for documentary travel photography.'
    }
  }
];

// ============================================
// HELPERS
// ============================================

/**
 * Get header image by theme
 */
export function getHeaderImageByTheme(theme: string): HeaderImageMetadata | undefined {
  return headerMetadata.find(img => img.theme === theme);
}

/**
 * Get destination by ID
 */
export function getDestinationById(id: string): DestinationImageMetadata | undefined {
  return destinationMetadata.find(dest => dest.id === id);
}

/**
 * Get featured destinations
 */
export function getFeaturedDestinations(): DestinationImageMetadata[] {
  return destinationMetadata.filter(dest => dest.featured === true);
}

/**
 * Get avatar by ID
 */
export function getAvatarById(id: string): AvatarMetadata | undefined {
  return avatarMetadata.find(avatar => avatar.id === id);
}
