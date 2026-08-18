export const dictionaries = {
  en: {
    controls: { language: "Language", theme: "Theme" },
    shared: {
      author: {
        name: "Nicolas Tobar",
        role: "Full-Stack Software Engineer",
        bio: "Full-Stack Software Engineer focused on building robust, efficient, and user-centered digital ecosystems. Specialized in AI-Assisted & Agentic Development, designing autonomous agent workflows through Skills, MCP, Spec-Driven Development (SDD), and tools like Claude Code, OpenCode, and Cursor."
      },
      footerNotice: "© {year} — Demo theme by Nicolas Tobar."
    },
    Aura: {
      nav: { about: "About", services: "Services", tour: "Tour", contact: "Contact", login: "Login" },
      hero: {
        title: "Extraordinary natural and cultural charm",
        subtitle: "Exploring Indonesia is an unforgettable adventure.",
        search: { date: "Date", budget: "Budget", guest: "Guest", button: "Search" }
      },
      stats: [
        { id: "customers", value: "10M+", label: "Total Customers" },
        { id: "experience", value: "09+", label: "Years Of Experience" },
        { id: "destinations", value: "12K", label: "Total Destinations" },
        { id: "rating", value: "5.0", label: "Average Rating" }
      ],
      destinations: {
        subtitle: "Best locations",
        title: "Worldwide destinations",
        description: "Extraordinary natural beauty, enjoy diverse cultures, and experience the friendliness of local people across the globe.",
        cards: [
          { id: "swiss", title: "Swiss Alps", location: "Switzerland", description: "Snow-capped peaks and pristine alpine valleys", imageIdx: 0 },
          { id: "bali", title: "Bali Island", location: "Bali, Indonesia", description: "Tropical paradise with ancient temples", imageIdx: 1 },
          { id: "gili", title: "Gili Trawangan", location: "Lombok, Indonesia", description: "Crystal-clear waters and relaxed island life", imageIdx: 2 },
          { id: "machu", title: "Machu Picchu", location: "Peru", description: "Ancient Incan ruins in the Andes", imageIdx: 3 }
        ]
      },
      packages: {
        subtitle: "Special Deals",
        title: "Curated travel packages",
        description: "Handpicked getaways crafted for unforgettable journeys across the world's most stunning destinations.",
        items: [
          { id: "swiss-premium", name: "Swiss Alps Premium", price: "$2,499", duration: "8 Days · 7 Nights", imageIdx: 0 },
          { id: "iceland-adventure", name: "Iceland Northern Lights", price: "$1,849", duration: "5 Days · 4 Nights", imageIdx: 2 },
          { id: "machu", name: "Machu Picchu Expedition", price: "$3,199", duration: "6 Days · 5 Nights", imageIdx: 3 },
          { id: "maldives-dive", name: "Maldives Dive Escape", price: "$4,299", duration: "7 Days · 6 Nights", imageIdx: 1 },
          { id: "kyoto-culture", name: "Kyoto Cultural Journey", price: "$2,899", duration: "6 Days · 5 Nights", imageIdx: 6 }
        ]
      },
      howItWorks: {
        subtitle: "How it works",
        title: "One click for you",
        steps: [
          { id: "find", title: "Find your destination", desc: "Embark on a journey to discover your dream destination, where adventure and relaxation await.", icon: "search" },
          { id: "book", title: "Book a ticket", desc: "Ensure a smooth travel experience by booking tickets to your preferred destination via our booking platform.", icon: "book" },
          { id: "pay", title: "Make payment", desc: "We offer a variety of payment options to meet your preferences and ensure a hassle-free transaction process.", icon: "card" },
          { id: "explore", title: "Explore destination", desc: "You'll be immersed in a captivating tapestry of sights, sounds and tastes, as you wind your way through the ancient streets.", icon: "pin" }
        ],
        overlayText: "Embark on a journey to find your dream destination, where adventure and relaxation await, creating unforgettable memories along the way",
        widget: { date: "Date", budget: "Budget", search: "Search" }
      },
      testimonials: {
        subtitle: "Testimonials",
        title: "What travelers say about us",
        items: [
          { id: "t1", quote: "The most incredible trip of my life. Every detail was perfectly curated — from the sunrise tours to the hidden waterfalls only locals know about.", author: "Nicolas Tobar", role: "Full-Stack Software Engineer", avatarIdx: 0 },
          { id: "t2", quote: "How they blend luxury with authenticity is unmatched. We felt like explorers, not tourists. The volcano trail was life-changing.", author: "Sofía Martínez", role: "Passionate Traveler", avatarIdx: 1 },
          { id: "t3", quote: "Our family trip to Bali was flawless. The itinerary respected our pace, the food was spectacular, and our kids are still talking about the temple tour.", author: "Emily Chen", role: "Culinary Explorer", avatarIdx: 2 }
        ]
      },
      footer: {
        brand: "Aura",
        about: "Crafting unforgettable journeys through Indonesia. We curate premium travel experiences designed for the curious, the brave, and the dreamers.",
        links: [
          { title: "Destinations", items: ["Bali", "Java", "Sumatra", "Papua"] },
          { title: "Services", items: ["Custom Tours", "Group Travel", "Luxury","Adventure"] }
        ],
        contact: { title: "Contact", items: ["hello@aura.com", "Jakarta, Indonesia", "+62 21 1234 5678"] },
        newsletter: { title: "Newsletter", description: "Get travel inspiration and exclusive offers delivered to your inbox.", placeholder: "Enter your email", button: "Subscribe" },
        copyright: "© {year} Aura Travel. All rights reserved."
      }
    },
    Waypoint: {
      nav: { destinations: "Destinations", trips: "Trips", experiences: "Experiences" },
      hero: {
        label: "Andean Cordillera",
        title: "SUMMITS THAT SPEAK",
        subtitle: "On a whim, four friends set out on a three-week road trip through the Andes - taking every winding mountain pass they could find - to listen to what the highest peaks had to say."
      },
      routeMap: {
        label: "ROUTE MAP",
        title: "Tracking Our Journey"
      },
      timeline: [
        {
          id: "01",
          label: "START",
          title: "SWISS ALPS",
          coords: "46.5197° N, 7.4673° E",
          text: "We landed in Zurich and drove south into the Bernese Oberland, where jagged peaks pierce through morning fog. Our first hike climbed above the clouds, revealing a sea of snow-capped summits stretching to the horizon."
        },
        {
          id: "02",
          label: "EXPEDITION II",
          title: "ICELAND HIGHLANDS",
          coords: "64.9631° N, 19.0208° W",
          text: "Iceland welcomed us with volcanic plains and geothermal mist. The Northern Lights appeared at midnight, painting the sky in emerald and violet waves above the black sand desert."
        }
      ],
      olympic: {
        label: "EXPEDITION III",
        title: "OLYMPIC NATIONAL",
        coords: "47.8021° N, 123.6044° W",
        text: "Olympic National Park offers two very distinct worlds: the remote, sandy beaches of the Washington coast and the dense jungle-like rainforest inland. After three days spent in the wilderness, seeing open, endless waters was a breath of fresh air.",
        stats: {
          days: { label: "DAYS", value: "03" },
          mileage: { label: "MILEAGE", value: "104" },
          elevation: { label: "ELEVATION MAX", value: "7,965'" }
        }
      },
      author: {
        label: "ABOUT THE AUTHOR",
        name: "NICOLAS TOBAR",
        bio: "Full-Stack Software Engineer focused on building robust, efficient, and user-centered digital ecosystems. Specialized in AI-Assisted & Agentic Development, designing autonomous agent workflows through Skills, MCP, Spec-Driven Development (SDD), and tools like Claude Code, OpenCode, and Cursor."
      },
      footer: {
        moreExperiences: "MORE EXPERIENCES",
        cards: [
          { title: "GOING OFF GRID - CANADIAN STORIES", location: "Golden Ears Provincial Park, Canada" },
          { title: "YOU DON'T ALWAYS NEED A TRAIL TO HIKE", location: "Faroe Islands, Denmark" }
        ],
        brand: "DO MORE THAN JUST EXIST",
        links: {
          destinations: { title: "DESTINATIONS", items: ["Region", "Cities", "Parks"] },
          trips: { title: "TRIPS", items: ["Road Trips", "Overnight Hikes", "Scenic"] },
          experiences: { title: "EXPERIENCES", items: ["Food & Drink", "Outdoors", "Culture & History"] }
        }
      }
    },
    Aeria: {
      nav: { home: "Home", about: "About", packages: "Packages", community: "Community", getApp: "Get the app", signUp: "Sign up" },
      hero: {
        title: "Don't just imagine it, make it happen. Travel",
        subtitle: "Find handpicked destinations, exclusive packages, and curated trips to the world's most unforgettable places.",
        email: { placeholder: "Enter your email address", button: "Get Started" }
      },
      services: {
        title: "What Services we provide at\nour customers.",
        subtitle: "Find trips that fit a flexible lifestyle",
        cards: [
          { id: "01", title: "Flight Finder", desc: "Seamless flight search and booking. Search, compare, and book flights effortlessly to destinations worldwide.", action: "Learn More" },
          { id: "02", title: "Hotels Service", desc: "Find top-rated hotels at the best rates with hassle-free booking and management.", action: "Learn More" },
          { id: "03", title: "Visa processing", desc: "Simplify your travel with our hassle-free visa processing services.", action: "Learn More" }
        ]
      },
      spots: {
        title: "Explore and unwind at the\nworld's top relaxing spots",
        subtitle: "All-inclusive vacations and flights to the Caribbean, Indonesian, and more than 1,300 destinations worldwide. Now with Xplore Vacations.",
        label: "Featured Destinations",
        recommended: "Recommended",
        perNight: "/Night",
        filters: ["All", "Beaches", "Temples", "Cities", "Cold", "Hot"],
        destinations: [
          { title: "Swiss Alps", location: "Switzerland", rating: "4.8", dates: "Feb 20-24", price: "$150", climate: "cold" },
          { title: "Kyoto, Japan", location: "Japan", rating: "4.8", dates: "Jul 20-24", price: "$250", climate: "hot" },
          { title: "Iceland Northern Lights", location: "Iceland", rating: "4.8", dates: "Apr 20-24", price: "$120", climate: "cold" },
          { title: "Bali, Indonesia", location: "Indonesia", rating: "4.8", dates: "Nov 20-24", price: "$140", climate: "hot" }
        ]
      },
      discover: {
        tag: "Travel", tag2: "Tourism", tag3: "Best Place",
        titleLeft: "We provide tailored itineraries and exclusive services, whether you're traveling solo or with a group.",
        descLeft: "From luxurious accommodations to curated activities, we ensure your journey is seamless, enjoyable, and unforgettable!",
        btnLeft: "Book a Seat",
        titleRight: "Discover Excellence in Travel Place where you feel better.",
        descRight: "The website is a one-stop solution for all travel needs! From stunning destinations to customizable packages, it's perfect for both casual travelers and adventure enthusiasts. Planning has never been easier!",
        page: "1 / 5"
      },
      review: { label: "Professional Experience", title: "Client Review", quote: "\"Focused on solving real business problems, transforming manual processes, Excel spreadsheets, and disconnected systems into efficient, scalable web, desktop, and mobile platforms.\"", author: "Nicolas Tobar" },
      cta: { explore: "Explore Travel Place", title: "Start exploring now and turn your trip into an\nunforgettable journey!", subtitle: "Looking for exciting spots to explore near your destination? From breathtaking landmarks\nand cultural gems to hidden treasures, we've got you covered.", button: "Book your seat", labels: ["Swiss Alps", "Maldives", "Gili Trawangan", "Bali", "Machu Picchu", "Iceland", "Swiss Alps", "Kyoto"] },
      footer: { desc: "Join our vibrant tour community and connect with fellow travel enthusiasts! Share experiences, discover hidden gems, and get exclusive travel tips. Let's explore the world together!", joinBtn: "Join Now", linksTitle: "LINKS", links: ["Lifestyle", "Pricing", "Class", "Features", "Download"], contactTitle: "CONTACT", contactInfo: ["43252 Borer Mountains", "Zackerychester", "Bahamas", "732-528-4945"], newsTitle: "NEWSLETTER", newsDesc: "Subscribe our newsletter to get more free design course and resource.", newsPlaceholder: "Enter your email", copy: "Copyright © 2026 LLC. All rights reserved" },
      concierge: {
        greeting: "Hi! I'm your Aeria AI travel assistant. Choose a suggested destination below or write freely and I'll craft a premium itinerary for you.",
        label: "Aeria Concierge AI",
        status: "Live assistant active",
        addTrip: "Add to my trip",
        typing: "Aeria AI is typing",
        quickQueries: "Quick queries",
        placeholder: "Where would you like to go?",
        addedSuccess: "Itinerary added to your trip successfully",
        ariaLabel: "Aeria Concierge",
        suggestions: [
          { title: "Bali, Indonesia", desc: "Exotic temples and beaches" },
          { title: "Kyoto, Japan", desc: "Heritage and zen gardens" },
          { title: "Santorini, Greece", desc: "Sunsets over the Aegean" }
        ],
        responses: {
          bali: { text: "I've designed this dreamy 5-day Bali itinerary:", location: "Bali, Indonesia", duration: "5 Days / 4 Nights", highlights: ["Tanah Lot temple at sunset", "Ubud rice terrace hiking", "Snorkeling in Nusa Penida"], price: "$1,250" },
          kyoto: { text: "Kyoto is pure spiritual magic. Here's your personalized plan:", location: "Kyoto, Japan", duration: "6 Days / 5 Nights", highlights: ["Walk through Arashiyama bamboo forest", "Fushimi Inari shrine", "Traditional dinner in Gion"], price: "$1,890" },
          santorini: { text: "Santorini is spectacular. Here's a romantic and immersive plan:", location: "Santorini, Greece", duration: "4 Days / 3 Nights", highlights: ["Private sunset in Oia", "Wine tasting at volcanic vineyards", "Catamaran tour of the Caldera"], price: "$1,450" }
        }
      },
    },
    Nimbus: {
      brand: "Nimbus",
      nav: { home: "Home", about: "About Us", service: "Service", pricing: "Pricing", signup: "Signup", login: "Login" },
      hero: { tag: "PONTON NIMBUS", title: "Discover The Magic In\nEvery Destination With Us!", subtitle: "Enjoy exclusive offers and best prices for satisfying travel packages.", tabs: ["Hotel", "Flight", "Car", "Event"], search: { destination: "Destination", destDesc: "City Or Destination", checkIn: "Check-In", inDesc: "Add Date", checkOut: "Check-Out", outDesc: "Add Date", travelers: "Travelers", travDesc: "Add Guests", button: "Search" } },
      companies: "Trusted by teams shipping lighter",
      companiesItems: ["Layers", "Sisyphus", "Circooles", "Catalog", "Quotient"],
      destinations: { title: "Dive Into The Beauty\nOf The World", cards: [ { title: "Kyoto", location: "Kyoto, Japan", price: "$298", per: "/Person" }, { title: "Gili Trawangan", location: "Lombok, NTT", price: "$186", per: "/Person" }, { title: "Machu Picchu", location: "Peru", price: "$250", per: "/Person" }, { title: "Maldives", location: "Maldives", price: "$412", per: "/Person" }, { title: "Iceland", location: "Reykjavik", price: "$335", per: "/Person" }, { title: "Bali Island", location: "Bali, Indonesia", price: "$224", per: "/Person" } ] },
      packages: { tag: "PONTON NIMBUS", title: "Unique Travel\nPackages For\nEvery Explorer.", desc: "Enjoy exclusive deals and the best prices for satisfying travel packages. We offer the best value for every adventure.", floatingCard: { title: "Bali Island", location: "Bali, Indonesia" }, features: [ { title: "Flexible Plan", icon: "calendar" }, { title: "Best Choice Destinations", icon: "bar-chart" }, { title: "Expert Local Guide", icon: "ticket" } ] },
      testimonials: {
        tag: "PONTON NIMBUS",
        title: "Join Hundreds Of\nSatisfied Customers!",
        subtitle: "Don't let daily tasks hold you back. Join thousands of businesses who have",
        reviews: [
          { quote: "Traveling with them is truly amazing. Amazing destinations, friendly service, and unforgettable moments.", name: "Nicolas Tobar", role: "Full-Stack Software Engineer", rating: 5 },
          { quote: "Careful itinerary, expert local guides, and highly responsive customer service. My adventure was not only fun but also stress-free.", name: "Sofía Martínez", role: "Passionate Traveler", rating: 4 },
          { quote: "The perfect family vacation! The right destination for all family members, warm service, and flexible plans gave us wonderful memories.", name: "Emily Chen", role: "Culinary Explorer", rating: 5 },
          { quote: "Our family vacation with family was wonderful. The well-organized itinerary, and friendly local guides made our experience unforgettable.", name: "James Wilson", role: "Professional Mountaineer", rating: 4 }
        ]
      },
      footer: {
        ctaTag: "PONTON NIMBUS",
        ctaTitle: "Choose Your Adventure, We're\nReady To Make It Happen.",
        btnSignup: "Signup",
        btnLogin: "Login",
        links: [
          { title: "Perks & Benefits", items: ["Life at Fueled", "Values", "Design", "Growth", "Android", "iOS"] },
          { title: "Digital Transformation", items: ["Web Development", "Smart Contract", "Branding", "dApps", "Web3", "DeFi"] }
        ]
      }
    },
  },
  es: {
    controls: { language: "Idioma", theme: "Tema" },
    shared: {
      author: {
        name: "Nicolas Tobar",
        role: "Ingeniero de Software Full-Stack",
        bio: "Ingeniero de Software Full-Stack enfocado en construir ecosistemas digitales robustos, eficientes y centrados en el usuario. Especializado en AI-Assisted & Agentic Development, diseñando y orquestando flujos de agentes autónomos mediante Skills, MCP, Spec-Driven Development (SDD) y herramientas como Claude Code, OpenCode y Cursor."
      },
      footerNotice: "© {year} — Tema demo creado por Nicolas Tobar."
    },
    Aura: {
      nav: { about: "Nosotros", services: "Servicios", tour: "Tours", contact: "Contacto", login: "Entrar" },
      hero: {
        title: "Extraordinario encanto natural y cultural",
        subtitle: "Explorar Indonesia es una aventura inolvidable.",
        search: { date: "Fecha", budget: "Presupuesto", guest: "Huéspedes", button: "Buscar" }
      },
      stats: [
        { id: "customers", value: "10M+", label: "Clientes Totales" },
        { id: "experience", value: "09+", label: "Años de Experiencia" },
        { id: "destinations", value: "12K", label: "Destinos Totales" },
        { id: "rating", value: "5.0", label: "Valoración Media" }
      ],
      destinations: {
        subtitle: "Mejores ubicaciones",
        title: "Destinos mundiales",
        description: "Extraordinaria belleza natural, disfruta de diversas culturas y experimenta la calidez de la gente local alrededor del mundo.",
        cards: [
          { id: "swiss", title: "Alpes Suizos", location: "Suiza", description: "Picos nevados y prístinos valles alpinos", imageIdx: 0 },
          { id: "bali", title: "Isla de Bali", location: "Bali, Indonesia", description: "Paraíso tropical con templos antiguos", imageIdx: 1 },
          { id: "gili", title: "Gili Trawangan", location: "Lombok, Indonesia", description: "Aguas cristalinas y vida isleña relajada", imageIdx: 2 },
          { id: "machu", title: "Machu Picchu", location: "Perú", description: "Ruinas incas ancestrales en los Andes", imageIdx: 3 }
        ]
      },
      packages: {
        subtitle: "Ofertas especiales",
        title: "Paquetes de viaje curados",
        description: "Escapadas seleccionadas a mano para viajes inolvidables por los destinos más increíbles del mundo.",
        items: [
          { id: "swiss-premium", name: "Alpes Suizos Premium", price: "$2,499", duration: "8 Días · 7 Noches", imageIdx: 0 },
          { id: "iceland-adventure", name: "Aurora Boreal Islandia", price: "$1,849", duration: "5 Días · 4 Noches", imageIdx: 2 },
          { id: "machu", name: "Expedición Machu Picchu", price: "$3,199", duration: "6 Días · 5 Noches", imageIdx: 3 },
          { id: "maldives-dive", name: "Escape Buceo Maldivas", price: "$4,299", duration: "7 Días · 6 Noches", imageIdx: 1 },
          { id: "kyoto-culture", name: "Viaje Cultural Kioto", price: "$2,899", duration: "6 Días · 5 Noches", imageIdx: 6 }
        ]
      },
      howItWorks: {
        subtitle: "Cómo funciona",
        title: "Un clic para ti",
        steps: [
          { id: "find", title: "Encuentra tu destino", desc: "Embárcate en un viaje para descubrir el destino de tus sueños, donde la aventura y la relajación aguardan.", icon: "search" },
          { id: "book", title: "Reserva un boleto", desc: "Asegura una experiencia de viaje fluida reservando boletos a tu destino preferido a través de nuestra plataforma.", icon: "book" },
          { id: "pay", title: "Realiza el pago", desc: "Ofrecemos una variedad de opciones de pago para satisfacer tus preferencias y garantizar un proceso sin problemas.", icon: "card" },
          { id: "explore", title: "Explora el destino", desc: "Te sumergirás en un cautivador tapiz de vistas, sonidos y sabores, mientras te abres camino por calles antiguas.", icon: "pin" }
        ],
        overlayText: "Embárcate en un viaje para encontrar el destino de tus sueños, donde la aventura y la relajación esperan, creando recuerdos inolvidables en el camino.",
        widget: { date: "Fecha", budget: "Presupuesto", search: "Buscar" }
      },
      testimonials: {
        subtitle: "Testimonios",
        title: "Qué dicen los viajeros de nosotros",
        items: [
          { id: "t1", quote: "El viaje más increíble de mi vida. Cada detalle fue perfectamente curado — desde los tours al amanecer hasta las cascadas ocultas que solo los locales conocen.", author: "Nicolas Tobar", role: "Ingeniero de Software Full-Stack", avatarIdx: 0 },
          { id: "t2", quote: "Cómo combinan lujo y autenticidad es incomparable. Nos sentimos exploradores, no turistas. La ruta del volcán fue transformadora.", author: "Sofía Martínez", role: "Viajera apasionada", avatarIdx: 1 },
          { id: "t3", quote: "Nuestro viaje familiar a Bali fue impecable. El itinerario respetó nuestro ritmo, la comida fue espectacular y nuestros hijos aún hablan del tour de templos.", author: "Emily Chen", role: "Cocinera exploradora", avatarIdx: 2 }
        ]
      },
      footer: {
        brand: "Aura",
        about: "Creamos viajes inolvidables por Indonesia. Curamos experiencias de viaje premium para los curiosos, los valientes y los soñadores.",
        links: [
          { title: "Destinos", items: ["Bali", "Java", "Sumatra", "Papúa"] },
          { title: "Servicios", items: ["Tours Custom", "Viajes Grupales", "Lujo","Aventura"] }
        ],
        contact: { title: "Contacto", items: ["hola@aura.com", "Jakarta, Indonesia", "+62 21 1234 5678"] },
        newsletter: { title: "Boletín", description: "Recibí inspiración de viaje y ofertas exclusivas en tu bandeja de entrada.", placeholder: "Tu correo electrónico", button: "Suscribir" },
        copyright: "© {year} Aura Travel. Todos los derechos reservados."
      }
    },
    Waypoint: {
      nav: { destinations: "Destinos", trips: "Viajes", experiences: "Experiencias" },
      hero: {
        label: "Cordillera Andina",
        title: "CUMBRES QUE HABLAN",
        subtitle: "Por capricho, cuatro amigos se lanzaron a la carretera para una aventura de tres semanas por los Andes - tomando cada paso de montaña sinuoso que encontraron - para escuchar lo que las cumbres más altas tenían para decir."
      },
      routeMap: {
        label: "MAPA DE RUTA",
        title: "Rastreo de Nuestro Viaje"
      },
      timeline: [
        {
          id: "01",
          label: "INICIO",
          title: "ALPES SUIZOS",
          coords: "46.5197° N, 7.4673° E",
          text: "Aterrizamos en Zurich y condujimos hacia el sur hasta el Oberland bernés, donde los picos dentados perforan la niebla matutina. Nuestra primera caminata subió por encima de las nubes, revelando un mar de cumbres nevadas que se extendía hasta el horizonte."
        },
        {
          id: "02",
          label: "EXPEDICIÓN II",
          title: "TIERRAS ALTAS DE ISLANDIA",
          coords: "64.9631° N, 19.0208° W",
          text: "Islandia nos recibió con llanuras volcánicas y vapor geotérmico. La Aurora Boreal apareció a medianoche, pintando el cielo con olas esmeralda y violeta sobre el desierto de arena negra."
        }
      ],
      olympic: {
        label: "EXPEDICIÓN III",
        title: "PARQUE OLÍMPICO",
        coords: "47.8021° N, 123.6044° W",
        text: "El Parque Nacional Olympic ofrece dos mundos muy distintos: las remotas playas de arena de la costa de Washington y la densa selva tropical del interior. Tras tres días en la naturaleza, ver aguas abiertas e interminables fue un soplo de aire fresco.",
        stats: {
          days: { label: "DÍAS", value: "03" },
          mileage: { label: "KILOMETRAJE", value: "167" },
          elevation: { label: "ELEVACIÓN MÁX", value: "2,427m" }
        }
      },
      author: {
        label: "SOBRE EL AUTOR",
        name: "NICOLAS TOBAR",
        bio: "Ingeniero de Software Full-Stack enfocado en construir ecosistemas digitales robustos, eficientes y centrados en el usuario. Especializado en AI-Assisted & Agentic Development, diseñando y orquestando flujos de agentes autónomos mediante Skills, MCP, Spec-Driven Development (SDD) y herramientas como Claude Code, OpenCode y Cursor."
      },
      footer: {
        moreExperiences: "MÁS EXPERIENCIAS",
        cards: [
          { title: "DESCONECTARSE - HISTORIAS CANADIENSES", location: "Parque Provincial Golden Ears, Canadá" },
          { title: "NO SIEMPRE NECESITAS UN SENDERO", location: "Islas Feroe, Dinamarca" }
        ],
        brand: "HAZ MÁS QUE SOLO EXISTIR",
        links: {
          destinations: { title: "DESTINOS", items: ["Región", "Ciudades", "Parques"] },
          trips: { title: "VIAJES", items: ["Viajes por Carretera", "Caminatas Nocturnas", "Panorámicos"] },
          experiences: { title: "EXPERIENCIAS", items: ["Comida y Bebida", "Aire Libre", "Cultura e Historia"] }
        }
      }
    },
    Aeria: {
      nav: { home: "Inicio", about: "Nosotros", packages: "Paquetes", community: "Comunidad", getApp: "Descargar App", signUp: "Regístrate" },
      hero: {
        title: "No lo imagines, hazlo realidad. Viaja",
        subtitle: "Descubre destinos seleccionados, paquetes exclusivos y viajes curados a los lugares más inolvidables del mundo.",
        email: { placeholder: "Ingresa tu correo electrónico", button: "Comenzar" }
      },
      services: {
        title: "Qué servicios proporcionamos a\nnuestros clientes.",
        subtitle: "Encuentra viajes que se adapten a un estilo de vida flexible",
        cards: [
          { id: "01", title: "Buscador de Vuelos", desc: "Búsqueda y reserva de vuelos sin problemas. Compara y reserva vuelos fácilmente a destinos mundiales.", action: "Saber Más" },
          { id: "02", title: "Servicio de Hoteles", desc: "Encuentra los mejores hoteles a las mejores tarifas con reserva y gestión sin complicaciones.", action: "Saber Más" },
          { id: "03", title: "Trámite de Visas", desc: "Simplifica tu viaje con nuestros servicios de procesamiento de visas sin complicaciones.", action: "Saber Más" }
        ]
      },
      spots: {
        title: "Explora y relájate en los\nmejores lugares del mundo",
        subtitle: "Vacaciones con todo incluido y vuelos al Caribe, Indonesia y más de 1,300 destinos en todo el mundo. Ahora con Xplore Vacations.",
        label: "Destinos Destacados",
        recommended: "Recomendado",
        perNight: "/Noche",
        filters: ["Todos", "Playas", "Templos", "Ciudades", "Frío", "Caliente"],
        destinations: [
          { title: "Alpes Suizos", location: "Suiza", rating: "4.8", dates: "Feb 20-24", price: "$150", climate: "cold" },
          { title: "Kyoto, Japón", location: "Japón", rating: "4.8", dates: "Jul 20-24", price: "$250", climate: "hot" },
          { title: "Aurora Boreal Islandia", location: "Islandia", rating: "4.8", dates: "Abr 20-24", price: "$120", climate: "cold" },
          { title: "Bali, Indonesia", location: "Indonesia", rating: "4.8", dates: "Nov 20-24", price: "$140", climate: "hot" }
        ]
      },
      discover: {
        tag: "Viajes", tag2: "Turismo", tag3: "Mejor Lugar",
        titleLeft: "Ofrecemos itinerarios a medida y servicios exclusivos, viajes solo o en grupo.",
        descLeft: "Desde alojamientos de lujo hasta actividades seleccionadas, aseguramos que tu viaje sea perfecto, agradable e inolvidable.",
        btnLeft: "Reservar",
        titleRight: "Descubre la Excelencia en Lugares donde te sientes mejor.",
        descRight: "¡El sitio web es una solución integral para todas las necesidades de viaje! Desde destinos impresionantes hasta paquetes personalizables. ¡Planificar nunca ha sido tan fácil!",
        page: "1 / 5"
      },
      review: { label: "Experiencia Profesional", title: "Reseña del Cliente", quote: "\"Enfocado en resolver problemas reales de negocio, transformando procesos manuales, planillas de Excel y sistemas desconectados en plataformas web, desktop y móviles eficientes y escalables.\"", author: "Nicolas Tobar" },
      cta: { explore: "Explorar Lugares", title: "¡Empieza a explorar ahora y convierte tu viaje en\nuna experiencia inolvidable!", subtitle: "¿Buscas lugares emocionantes cerca de tu destino? Desde monumentos impresionantes\ny joyas culturales hasta tesoros escondidos, lo tenemos todo cubierto.", button: "Reserva tu asiento", labels: ["Alpes Suizos", "Maldivas", "Gili Trawangan", "Bali", "Machu Picchu", "Islandia", "Alpes Suizos", "Kioto"] },
      footer: { desc: "¡Únete a nuestra vibrante comunidad y conecta con entusiastas de los viajes! Comparte experiencias, descubre joyas ocultas y recibe consejos exclusivos. ¡Exploremos el mundo juntos!", joinBtn: "Unirse Ahora", linksTitle: "ENLACES", links: ["Estilo de vida", "Precios", "Clases", "Características", "Descargar"], contactTitle: "CONTACTO", contactInfo: ["43252 Borer Mountains", "Zackerychester", "Bahamas", "732-528-4945"], newsTitle: "BOLETÍN", newsDesc: "Suscríbete a nuestro boletín para obtener más recursos de diseño gratuitos.", newsPlaceholder: "Introduce tu correo", copy: "Copyright © 2026 LLC. Todos los derechos reservados" },
      concierge: {
        greeting: "¡Hola! Soy tu asistente de viaje Aeria AI. Elige un destino sugerido abajo o escríbelo libremente y te armaré un itinerario premium.",
        label: "Aeria Concierge AI",
        status: "Asistente en vivo activo",
        addTrip: "Añadir a mi viaje",
        typing: "Aeria AI está escribiendo",
        quickQueries: "Consultas rápidas",
        placeholder: "¿A dónde te gustaría ir?",
        addedSuccess: "Itinerario añadido al viaje con éxito",
        ariaLabel: "Aeria Concierge",
        suggestions: [
          { title: "Bali, Indonesia", desc: "Templos y playas exóticas" },
          { title: "Kyoto, Japón", desc: "Patrimonio y jardines zen" },
          { title: "Santorini, Grecia", desc: "Atardeceres sobre el Egeo" }
        ],
        responses: {
          bali: { text: "He diseñado este itinerario de ensueño de 5 días en Bali:", location: "Bali, Indonesia", duration: "5 Días / 4 Noches", highlights: ["Templo Tanah Lot al atardecer", "Senderismo en terrazas de arroz Ubud", "Snorkel en Nusa Penida"], price: "$1,250" },
          kyoto: { text: "Kyoto es pura magia espiritual. Este es tu plan personalizado:", location: "Kyoto, Japón", duration: "6 Días / 5 Noches", highlights: ["Paseo por el bosque de bambú de Arashiyama", "Santuario Fushimi Inari", "Cena tradicional en Gion"], price: "$1,890" },
          santorini: { text: "Santorini es espectacular. Aquí tienes un plan romántico e inmersivo:", location: "Santorini, Grecia", duration: "4 Días / 3 Noches", highlights: ["Atardecer privado en Oia", "Cata de vinos en viñedos volcánicos", "Tour en catamarán por la Caldera"], price: "$1,450" }
        }
      },
    },
    Nimbus: {
      brand: "Nimbus",
      nav: { home: "Inicio", about: "Nosotros", service: "Servicios", pricing: "Precios", signup: "Registro", login: "Entrar" },
      hero: { tag: "PONTON NIMBUS", title: "¡Descubre La Magia En\nCada Destino Con Nosotros!", subtitle: "Disfruta de ofertas exclusivas y los mejores precios en paquetes de viaje.", tabs: ["Hoteles", "Vuelos", "Coches", "Eventos"], search: { destination: "Destino", destDesc: "Ciudad o Destino", checkIn: "Entrada", inDesc: "Añadir Fecha", checkOut: "Salida", outDesc: "Añadir Fecha", travelers: "Viajeros", travDesc: "Añadir Huéspedes", button: "Buscar" } },
      companies: "Equipos que ya viajan ligero",
      companiesItems: ["Layers", "Sisyphus", "Circooles", "Catalog", "Quotient"],
      destinations: { title: "Sumérgete En La Belleza\nDel Mundo", cards: [ { title: "Kioto", location: "Kioto, Japón", price: "$298", per: "/Persona" }, { title: "Gili Trawangan", location: "Lombok, NTT", price: "$186", per: "/Persona" }, { title: "Machu Picchu", location: "Perú", price: "$250", per: "/Persona" }, { title: "Maldivas", location: "Maldivas", price: "$412", per: "/Persona" }, { title: "Islandia", location: "Reykjavik", price: "$335", per: "/Persona" }, { title: "Isla de Bali", location: "Bali, Indonesia", price: "$224", per: "/Persona" } ] },
      packages: { tag: "PONTON NIMBUS", title: "Paquetes De Viaje\nÚnicos Para\nCada Explorador.", desc: "Disfruta de ofertas exclusivas y los mejores precios en paquetes de viaje. Ofrecemos el mejor valor para cada aventura.", floatingCard: { title: "Isla de Bali", location: "Bali, Indonesia" }, features: [ { title: "Plan Flexible", icon: "calendar" }, { title: "Los Mejores Destinos", icon: "bar-chart" }, { title: "Guía Local Experto", icon: "ticket" } ] },
      testimonials: {
        tag: "PONTON NIMBUS",
        title: "¡Únete a Cientos de\nClientes Satisfechos!",
        subtitle: "No dejes que las tareas diarias te detengan. Únete a miles de empresas que ya lo han hecho",
        reviews: [
          { quote: "Viajar con ellos es realmente asombroso. Destinos increíbles, servicio amable y momentos inolvidables.", name: "Nicolas Tobar", role: "Ingeniero de Software Full-Stack", rating: 5 },
          { quote: "Itinerario cuidadoso, guías locales expertos y un servicio al cliente muy receptivo. Mi aventura fue libre de estrés.", name: "Sofía Martínez", role: "Viajera apasionada", rating: 4 },
          { quote: "¡Las vacaciones familiares perfectas! El destino correcto, servicio cálido y planes flexibles nos dieron recuerdos maravillosos.", name: "Emily Chen", role: "Cocinera exploradora", rating: 5 },
          { quote: "Nuestras vacaciones fueron maravillosas. El itinerario bien organizado y los guías amables hicieron nuestra experiencia inolvidable.", name: "James Wilson", role: "Montañista profesional", rating: 4 }
        ]
      },
      footer: {
        ctaTag: "PONTON NIMBUS",
        ctaTitle: "Elige Tu Aventura, Estamos\nListos Para Hacerla Realidad.",
        btnSignup: "Registro",
        btnLogin: "Entrar",
        links: [
          { title: "Beneficios y Ventajas", items: ["Vida en Fueled", "Valores", "Diseño", "Crecimiento", "Android", "iOS"] },
          { title: "Transformación Digital", items: ["Desarrollo Web", "Contratos Inteligentes", "Branding", "dApps", "Web3", "DeFi"] }
        ]
      }
    },
  },
};
