export const SUPPORTED_LANGUAGES = ['es', 'en', 'pt', 'fr', 'it'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

export const BASE_URL = 'https://riotripvibes.com';

export const OG_LOCALES: Record<SupportedLanguage, string> = {
  es: 'es_ES',
  en: 'en_US',
  pt: 'pt_BR',
  fr: 'fr_FR',
  it: 'it_IT',
};

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
}

export const SEO_BY_LANGUAGE: Record<SupportedLanguage, SEOData> = {
  es: {
    title: 'Rio Trip Vibes - Tours Profesionales | Rio de Janeiro, Egipto y Mundiales',
    description: 'Agencia de viajes profesional. Tours en Rio de Janeiro, Egipto y destinos mundiales. +1000 clientes satisfechos. Descuentos grupos 15%. Day Tours, Favelas, Playas, Trekking, Yate VIP y Helicoptero.',
    keywords: 'tours rio de janeiro, viajes egipto, agencia de viajes, tours profesionales, paquetes turisticos, excursiones brasil',
  },
  en: {
    title: 'Rio Trip Vibes - Professional Tours | Rio de Janeiro, Egypt & Worldwide',
    description: 'Professional travel agency. Tours in Rio de Janeiro, Egypt and worldwide destinations. +1000 satisfied customers. 15% group discounts. Day Tours, Favelas, Beaches, Trekking, VIP Yacht and Helicopter.',
    keywords: 'rio de janeiro tours, egypt travel, travel agency, professional tours, tour packages, brazil excursions',
  },
  pt: {
    title: 'Rio Trip Vibes - Tours Profissionais | Rio de Janeiro, Egito e Mundiais',
    description: 'Agencia de viagens profissional. Tours no Rio de Janeiro, Egito e destinos mundiais. +1000 clientes satisfeitos. Descontos grupos 15%. Day Tours, Favelas, Praias, Trekking, Iate VIP e Helicoptero.',
    keywords: 'passeios rio de janeiro, viagens egito, agencia de viagens, tours profissionais, pacotes turisticos, excursoes brasil',
  },
  fr: {
    title: 'Rio Trip Vibes - Tours Professionnels | Rio de Janeiro, Egypte et Monde',
    description: 'Agence de voyage professionnelle. Tours a Rio de Janeiro, Egypte et destinations mondiales. +1000 clients satisfaits. Reductions groupes 15%. Day Tours, Favelas, Plages, Trekking, Yacht VIP et Helicoptere.',
    keywords: 'tours rio de janeiro, voyages egypte, agence de voyage, tours professionnels, forfaits touristiques, excursions bresil',
  },
  it: {
    title: 'Rio Trip Vibes - Tour Professionali | Rio de Janeiro, Egitto e Mondiali',
    description: 'Agenzia di viaggi professionale. Tour a Rio de Janeiro, Egitto e destinazioni mondiali. +1000 clienti soddisfatti. Sconti gruppi 15%. Day Tours, Favelas, Spiagge, Trekking, Yacht VIP ed Elicottero.',
    keywords: 'tour rio de janeiro, viaggi egitto, agenzia viaggi, tour professionali, pacchetti turistici, escursioni brasile',
  },
};

export function getCanonicalUrl(lang: SupportedLanguage): string {
  return lang === 'es' ? BASE_URL : `${BASE_URL}/?lang=${lang}`;
}

export function getHreflangLinks(): Array<{ lang: string; url: string }> {
  return [
    { lang: 'x-default', url: BASE_URL },
    ...SUPPORTED_LANGUAGES.map(lang => ({
      lang,
      url: lang === 'es' ? BASE_URL : `${BASE_URL}/?lang=${lang}`,
    })),
  ];
}

export function getSchemaTravelAgency(lang: SupportedLanguage) {
  const descriptions: Record<SupportedLanguage, string> = {
    es: 'Agencia de viajes especializada en tours personalizados en Rio de Janeiro. Experiencias unicas con guias profesionales bilingues.',
    en: 'Travel agency specialized in personalized tours in Rio de Janeiro. Unique experiences with professional bilingual guides.',
    pt: 'Agencia de viagens especializada em tours personalizados no Rio de Janeiro. Experiencias unicas com guias profissionais bilingues.',
    fr: 'Agence de voyage specialisee dans les circuits personnalises a Rio de Janeiro. Experiences uniques avec des guides professionnels bilingues.',
    it: 'Agenzia di viaggi specializzata in tour personalizzati a Rio de Janeiro. Esperienze uniche con guide professionali bilingue.',
  };

  const slogans: Record<SupportedLanguage, string> = {
    es: 'Descubre tu proxima aventura en Rio de Janeiro',
    en: 'Discover your next adventure in Rio de Janeiro',
    pt: 'Descubra sua proxima aventura no Rio de Janeiro',
    fr: 'Decouvrez votre prochaine aventure a Rio de Janeiro',
    it: 'Scopri la tua prossima avventura a Rio de Janeiro',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${BASE_URL}/#organization`,
    name: 'Rio Trip Vibes',
    alternateName: 'RTV Tours',
    description: descriptions[lang],
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${BASE_URL}/logo.png`,
    telephone: '+5521983526144',
    email: 'contact@riotripvibes.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Atlantica',
      addressLocality: 'Copacabana',
      addressRegion: 'Rio de Janeiro',
      postalCode: '22070-000',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -22.9068,
      longitude: -43.1729,
    },
    priceRange: '$$$',
    currenciesAccepted: 'USD, BRL, EUR',
    paymentAccepted: 'Credit Card, Cash, Bank Transfer, PayPal, Pix, Crypto',
    areaServed: [
      {
        '@type': 'City',
        name: 'Rio de Janeiro',
        sameAs: 'https://en.wikipedia.org/wiki/Rio_de_Janeiro',
      },
      {
        '@type': 'Country',
        name: 'Brazil',
        sameAs: 'https://en.wikipedia.org/wiki/Brazil',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    availableLanguage: [
      { '@type': 'Language', name: 'Spanish', alternateName: 'es' },
      { '@type': 'Language', name: 'English', alternateName: 'en' },
      { '@type': 'Language', name: 'Portuguese', alternateName: 'pt' },
      { '@type': 'Language', name: 'French', alternateName: 'fr' },
      { '@type': 'Language', name: 'Italian', alternateName: 'it' },
    ],
    sameAs: [
      'https://www.instagram.com/brianmachinee/',
      'https://www.youtube.com/@BrianMachinee',
      'https://www.tiktok.com/@brianmachinne',
    ],
    slogan: slogans[lang],
    inLanguage: lang,
  };
}

export function getSchemaWebSite(lang: SupportedLanguage) {
  const names: Record<SupportedLanguage, string> = {
    es: 'Rio Trip Vibes - Agencia de Viajes',
    en: 'Rio Trip Vibes - Travel Agency',
    pt: 'Rio Trip Vibes - Agencia de Viagens',
    fr: 'Rio Trip Vibes - Agence de Voyage',
    it: 'Rio Trip Vibes - Agenzia di Viaggi',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: names[lang],
    url: BASE_URL,
    inLanguage: lang,
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getSchemaTouristDestination(lang: SupportedLanguage) {
  const names: Record<SupportedLanguage, string> = {
    es: 'Rio de Janeiro',
    en: 'Rio de Janeiro',
    pt: 'Rio de Janeiro',
    fr: 'Rio de Janeiro',
    it: 'Rio de Janeiro',
  };

  const descriptions: Record<SupportedLanguage, string> = {
    es: 'Destino turistico con playas iconicas, cultura vibrante, naturaleza exuberante y monumentos mundialmente famosos como el Cristo Redentor.',
    en: 'Tourist destination with iconic beaches, vibrant culture, lush nature and world-famous monuments like Christ the Redeemer.',
    pt: 'Destino turistico com praias iconicas, cultura vibrante, natureza exuberante e monumentos mundialmente famosos como o Cristo Redentor.',
    fr: 'Destination touristique avec des plages iconiques, une culture vibrante, une nature luxuriante et des monuments celebres comme le Christ Redempteur.',
    it: 'Destinazione turistica con spiagge iconiche, cultura vibrante, natura lussureggiante e monumenti famosi come il Cristo Redentore.',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: names[lang],
    description: descriptions[lang],
    url: BASE_URL,
    containedInPlace: {
      '@type': 'Country',
      name: 'Brazil',
    },
    touristType: [
      'Cultural tourism',
      'Beach tourism',
      'Adventure tourism',
      'Ecotourism',
    ],
  };
}

export function getTourSchemas(lang: SupportedLanguage) {
  const tours = {
    es: [
      { name: 'City Tour Clasico', description: 'Recorrido completo por los principales puntos turisticos de Rio de Janeiro', duration: 'PT8H', type: 'Cultural tourism' },
      { name: 'Tour de Favelas', description: 'Experiencia cultural autentica visitando comunidades locales', duration: 'PT4H', type: 'Cultural tourism' },
      { name: 'Tour de Playas', description: 'Visita las playas mas hermosas de Rio: Copacabana, Ipanema, Leblon', duration: 'PT6H', type: 'Beach tourism' },
      { name: 'Trekking y Aventura', description: 'Senderismo en Pedra da Gavea y trilhas con vistas panoramicas', duration: 'PT5H', type: 'Adventure tourism' },
      { name: 'Paseos en Barco', description: 'Navegacion por la Bahia de Guanabara con vistas unicas', duration: 'PT4H', type: 'Water tourism' },
      { name: 'Yate VIP Exclusivo', description: 'Experiencia de lujo en yate privado con tripulacion y catering', duration: 'PT6H', type: 'Luxury tourism' },
      { name: 'Tour en Helicoptero', description: 'Sobrevuelo panoramico por Rio de Janeiro con vistas aereas', duration: 'PT1H', type: 'Adventure tourism' },
    ],
    en: [
      { name: 'Classic City Tour', description: 'Complete tour of the main tourist spots in Rio de Janeiro', duration: 'PT8H', type: 'Cultural tourism' },
      { name: 'Favela Tour', description: 'Authentic cultural experience visiting local communities', duration: 'PT4H', type: 'Cultural tourism' },
      { name: 'Beach Tour', description: 'Visit the most beautiful beaches of Rio: Copacabana, Ipanema, Leblon', duration: 'PT6H', type: 'Beach tourism' },
      { name: 'Trekking and Adventure', description: 'Hiking at Pedra da Gavea and trails with panoramic views', duration: 'PT5H', type: 'Adventure tourism' },
      { name: 'Boat Rides', description: 'Navigation through Guanabara Bay with unique views', duration: 'PT4H', type: 'Water tourism' },
      { name: 'Exclusive VIP Yacht', description: 'Luxury experience on private yacht with crew and catering', duration: 'PT6H', type: 'Luxury tourism' },
      { name: 'Helicopter Tour', description: 'Panoramic flight over Rio de Janeiro with aerial views', duration: 'PT1H', type: 'Adventure tourism' },
    ],
    pt: [
      { name: 'City Tour Classico', description: 'Passeio completo pelos principais pontos turisticos do Rio de Janeiro', duration: 'PT8H', type: 'Cultural tourism' },
      { name: 'Tour de Favelas', description: 'Experiencia cultural autentica visitando comunidades locais', duration: 'PT4H', type: 'Cultural tourism' },
      { name: 'Tour de Praias', description: 'Visite as praias mais bonitas do Rio: Copacabana, Ipanema, Leblon', duration: 'PT6H', type: 'Beach tourism' },
      { name: 'Trekking e Aventura', description: 'Trilhas na Pedra da Gavea com vistas panoramicas', duration: 'PT5H', type: 'Adventure tourism' },
      { name: 'Passeios de Barco', description: 'Navegacao pela Baia de Guanabara com vistas unicas', duration: 'PT4H', type: 'Water tourism' },
      { name: 'Iate VIP Exclusivo', description: 'Experiencia de luxo em iate privado com tripulacao e catering', duration: 'PT6H', type: 'Luxury tourism' },
      { name: 'Tour de Helicoptero', description: 'Sobrevoo panoramico pelo Rio de Janeiro com vistas aereas', duration: 'PT1H', type: 'Adventure tourism' },
    ],
    fr: [
      { name: 'City Tour Classique', description: 'Visite complete des principaux sites touristiques de Rio de Janeiro', duration: 'PT8H', type: 'Cultural tourism' },
      { name: 'Tour des Favelas', description: 'Experience culturelle authentique visitant les communautes locales', duration: 'PT4H', type: 'Cultural tourism' },
      { name: 'Tour des Plages', description: 'Visitez les plus belles plages de Rio: Copacabana, Ipanema, Leblon', duration: 'PT6H', type: 'Beach tourism' },
      { name: 'Trekking et Aventure', description: 'Randonnee a Pedra da Gavea avec vues panoramiques', duration: 'PT5H', type: 'Adventure tourism' },
      { name: 'Promenades en Bateau', description: 'Navigation dans la baie de Guanabara avec vues uniques', duration: 'PT4H', type: 'Water tourism' },
      { name: 'Yacht VIP Exclusif', description: 'Experience de luxe sur yacht prive avec equipage et restauration', duration: 'PT6H', type: 'Luxury tourism' },
      { name: 'Tour en Helicoptere', description: 'Survol panoramique de Rio de Janeiro avec vues aeriennes', duration: 'PT1H', type: 'Adventure tourism' },
    ],
    it: [
      { name: 'City Tour Classico', description: 'Tour completo dei principali luoghi turistici di Rio de Janeiro', duration: 'PT8H', type: 'Cultural tourism' },
      { name: 'Tour delle Favelas', description: 'Esperienza culturale autentica visitando le comunita locali', duration: 'PT4H', type: 'Cultural tourism' },
      { name: 'Tour delle Spiagge', description: 'Visita le spiagge piu belle di Rio: Copacabana, Ipanema, Leblon', duration: 'PT6H', type: 'Beach tourism' },
      { name: 'Trekking e Avventura', description: 'Escursioni a Pedra da Gavea con viste panoramiche', duration: 'PT5H', type: 'Adventure tourism' },
      { name: 'Gite in Barca', description: 'Navigazione nella baia di Guanabara con viste uniche', duration: 'PT4H', type: 'Water tourism' },
      { name: 'Yacht VIP Esclusivo', description: 'Esperienza di lusso su yacht privato con equipaggio e catering', duration: 'PT6H', type: 'Luxury tourism' },
      { name: 'Tour in Elicottero', description: 'Sorvolo panoramico su Rio de Janeiro con viste aeree', duration: 'PT1H', type: 'Adventure tourism' },
    ],
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: lang === 'es' ? 'Tours Disponibles en Rio de Janeiro' :
          lang === 'en' ? 'Available Tours in Rio de Janeiro' :
          lang === 'pt' ? 'Tours Disponiveis no Rio de Janeiro' :
          lang === 'fr' ? 'Tours Disponibles a Rio de Janeiro' :
          'Tour Disponibili a Rio de Janeiro',
    numberOfItems: tours[lang].length,
    itemListElement: tours[lang].map((tour, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'TouristTrip',
        name: tour.name,
        description: tour.description,
        touristType: tour.type,
        duration: tour.duration,
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
      },
    })),
  };
}

export function getAllSchemasForLanguage(lang: SupportedLanguage) {
  return [
    getSchemaTravelAgency(lang),
    getSchemaWebSite(lang),
    getSchemaTouristDestination(lang),
    getTourSchemas(lang),
  ];
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export const SECTION_IDS = {
  hero: 'hero',
  packages: 'paquetes',
  destinations: 'destinos',
  travelInfo: 'info-viaje',
  guides: 'guias',
  testimonials: 'testimonios',
  contact: 'contacto',
} as const;
