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
    title: 'Rio Trip Vibes | Tours Privados en Rio de Janeiro - Yate VIP, Helicoptero, Favelas',
    description: 'Agencia de viajes con +1000 clientes satisfechos. Tours privados y exclusivos en Rio de Janeiro: helicoptero privado, yate VIP con tripulacion, favelas autenticas, trekking Pedra da Gavea. Guias bilingues certificados. Solicita tu experiencia personalizada.',
    keywords: 'helicoptero privado rio de janeiro, yate vip rio, tour privado rio, favela tour autentico, trekking pedra da gavea, guia privado rio, experiencia exclusiva rio, tour personalizado brasil',
  },
  en: {
    title: 'Rio Trip Vibes | Private Tours Rio de Janeiro - VIP Yacht, Helicopter, Favelas',
    description: 'Travel agency with +1000 satisfied customers. Private and exclusive tours in Rio de Janeiro: private helicopter, VIP yacht with crew, authentic favelas, Pedra da Gavea trekking. Certified bilingual guides. Request your personalized experience.',
    keywords: 'private helicopter rio de janeiro, vip yacht rio, private tour rio, authentic favela tour, pedra da gavea trekking, private guide rio, exclusive rio experience, custom brazil tour',
  },
  pt: {
    title: 'Rio Trip Vibes | Passeios Privados Rio de Janeiro - Iate VIP, Helicoptero, Favelas',
    description: 'Agencia de viagens com +1000 clientes satisfeitos. Passeios privados e exclusivos no Rio de Janeiro: helicoptero privado, iate VIP com tripulacao, favelas autenticas, trilha Pedra da Gavea. Guias bilingues certificados. Solicite sua experiencia personalizada.',
    keywords: 'helicoptero privado rio de janeiro, iate vip rio, passeio privado rio, tour favela autentico, trilha pedra da gavea, guia privado rio, experiencia exclusiva rio, tour personalizado brasil',
  },
  fr: {
    title: 'Rio Trip Vibes | Tours Prives Rio de Janeiro - Yacht VIP, Helicoptere, Favelas',
    description: 'Agence de voyage avec +1000 clients satisfaits. Tours prives et exclusifs a Rio de Janeiro: helicoptere prive, yacht VIP avec equipage, favelas authentiques, trekking Pedra da Gavea. Guides bilingues certifies. Demandez votre experience personnalisee.',
    keywords: 'helicoptere prive rio de janeiro, yacht vip rio, tour prive rio, tour favela authentique, trekking pedra da gavea, guide prive rio, experience exclusive rio, tour personnalise bresil',
  },
  it: {
    title: 'Rio Trip Vibes | Tour Privati Rio de Janeiro - Yacht VIP, Elicottero, Favelas',
    description: 'Agenzia di viaggi con +1000 clienti soddisfatti. Tour privati ed esclusivi a Rio de Janeiro: elicottero privato, yacht VIP con equipaggio, favelas autentiche, trekking Pedra da Gavea. Guide bilingue certificate. Richiedi la tua esperienza personalizzata.',
    keywords: 'elicottero privato rio de janeiro, yacht vip rio, tour privato rio, tour favela autentico, trekking pedra da gavea, guida privata rio, esperienza esclusiva rio, tour personalizzato brasile',
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
    es: 'Agencia de viajes especializada en tours privados y personalizados en Rio de Janeiro. Experiencias exclusivas con guias profesionales bilingues certificados. Mas de 1000 clientes satisfechos desde 2018.',
    en: 'Travel agency specialized in private and personalized tours in Rio de Janeiro. Exclusive experiences with certified professional bilingual guides. Over 1000 satisfied customers since 2018.',
    pt: 'Agencia de viagens especializada em tours privados e personalizados no Rio de Janeiro. Experiencias exclusivas com guias profissionais bilingues certificados. Mais de 1000 clientes satisfeitos desde 2018.',
    fr: 'Agence de voyage specialisee dans les circuits prives et personnalises a Rio de Janeiro. Experiences exclusives avec des guides professionnels bilingues certifies. Plus de 1000 clients satisfaits depuis 2018.',
    it: 'Agenzia di viaggi specializzata in tour privati e personalizzati a Rio de Janeiro. Esperienze esclusive con guide professionali bilingue certificate. Oltre 1000 clienti soddisfatti dal 2018.',
  };

  const slogans: Record<SupportedLanguage, string> = {
    es: 'Tu experiencia exclusiva en Rio de Janeiro comienza aqui',
    en: 'Your exclusive Rio de Janeiro experience starts here',
    pt: 'Sua experiencia exclusiva no Rio de Janeiro comeca aqui',
    fr: 'Votre experience exclusive a Rio de Janeiro commence ici',
    it: 'La tua esperienza esclusiva a Rio de Janeiro inizia qui',
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
    foundingDate: '2018',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 5,
      maxValue: 10,
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Professional Certification',
        name: 'Cadastur - Ministry of Tourism Brazil',
      },
    ],
    knowsAbout: [
      'Rio de Janeiro Tourism',
      'Private Tours',
      'VIP Experiences',
      'Helicopter Tours',
      'Yacht Charters',
      'Cultural Experiences',
      'Adventure Tourism',
    ],
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
    es: 'Rio Trip Vibes - Tours Privados y Exclusivos',
    en: 'Rio Trip Vibes - Private and Exclusive Tours',
    pt: 'Rio Trip Vibes - Passeios Privados e Exclusivos',
    fr: 'Rio Trip Vibes - Tours Prives et Exclusifs',
    it: 'Rio Trip Vibes - Tour Privati ed Esclusivi',
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
      '@type': 'CommunicateAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://wa.me/5521983526144',
        actionPlatform: 'https://schema.org/MobileWebPlatform',
      },
      name: lang === 'es' ? 'Solicitar Presupuesto' :
            lang === 'en' ? 'Request Quote' :
            lang === 'pt' ? 'Solicitar Orcamento' :
            lang === 'fr' ? 'Demander un Devis' :
            'Richiedi Preventivo',
    },
  };
}

export function getSchemaTouristDestination(lang: SupportedLanguage) {
  const descriptions: Record<SupportedLanguage, string> = {
    es: 'Rio de Janeiro: destino turistico con playas iconicas, cultura vibrante, naturaleza exuberante y monumentos mundialmente famosos. Experiencias privadas disponibles con guias locales expertos.',
    en: 'Rio de Janeiro: tourist destination with iconic beaches, vibrant culture, lush nature and world-famous monuments. Private experiences available with expert local guides.',
    pt: 'Rio de Janeiro: destino turistico com praias iconicas, cultura vibrante, natureza exuberante e monumentos mundialmente famosos. Experiencias privadas disponiveis com guias locais especialistas.',
    fr: 'Rio de Janeiro: destination touristique avec des plages iconiques, une culture vibrante, une nature luxuriante et des monuments celebres. Experiences privees disponibles avec des guides locaux experts.',
    it: 'Rio de Janeiro: destinazione turistica con spiagge iconiche, cultura vibrante, natura lussureggiante e monumenti famosi. Esperienze private disponibili con guide locali esperte.',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: 'Rio de Janeiro',
    description: descriptions[lang],
    url: BASE_URL,
    containedInPlace: {
      '@type': 'Country',
      name: 'Brazil',
    },
    touristType: [
      'Luxury tourism',
      'Private tours',
      'VIP experiences',
      'Cultural tourism',
      'Beach tourism',
      'Adventure tourism',
    ],
    includesAttraction: [
      {
        '@type': 'TouristAttraction',
        name: 'Christ the Redeemer',
        sameAs: 'https://en.wikipedia.org/wiki/Christ_the_Redeemer_(statue)',
      },
      {
        '@type': 'TouristAttraction',
        name: 'Sugarloaf Mountain',
        sameAs: 'https://en.wikipedia.org/wiki/Sugarloaf_Mountain',
      },
      {
        '@type': 'TouristAttraction',
        name: 'Copacabana Beach',
        sameAs: 'https://en.wikipedia.org/wiki/Copacabana,_Rio_de_Janeiro',
      },
      {
        '@type': 'TouristAttraction',
        name: 'Ipanema Beach',
        sameAs: 'https://en.wikipedia.org/wiki/Ipanema',
      },
    ],
  };
}

export function getTourSchemas(lang: SupportedLanguage) {
  const tours = {
    es: [
      { name: 'City Tour Privado', description: 'Recorrido exclusivo por los principales puntos de Rio con guia privado y vehiculo dedicado', duration: 'PT8H', type: 'Private tour', cta: 'Solicitar experiencia' },
      { name: 'Favela Tour Autentico', description: 'Experiencia cultural inmersiva en comunidades locales con guia residente certificado', duration: 'PT4H', type: 'Cultural immersion', cta: 'Reservar visita' },
      { name: 'Tour de Playas VIP', description: 'Circuito privado por Copacabana, Ipanema y Leblon con servicio personalizado', duration: 'PT6H', type: 'Beach experience', cta: 'Consultar disponibilidad' },
      { name: 'Trekking Pedra da Gavea', description: 'Aventura guiada con equipo profesional y vistas panoramicas de 360 grados', duration: 'PT5H', type: 'Adventure expedition', cta: 'Solicitar expedicion' },
      { name: 'Navegacion Privada', description: 'Experiencia nautica exclusiva por la Bahia de Guanabara con capitan privado', duration: 'PT4H', type: 'Maritime experience', cta: 'Consultar embarcacion' },
      { name: 'Yate VIP con Tripulacion', description: 'Experiencia de lujo en yate privado con tripulacion profesional, chef y servicio a bordo', duration: 'PT6H', type: 'Luxury yacht', cta: 'Solicitar cotizacion VIP' },
      { name: 'Helicoptero Privado Rio', description: 'Sobrevuelo panoramico exclusivo con piloto certificado y rutas personalizadas', duration: 'PT1H', type: 'Aerial experience', cta: 'Reservar vuelo privado' },
    ],
    en: [
      { name: 'Private City Tour', description: 'Exclusive tour of Rio main attractions with private guide and dedicated vehicle', duration: 'PT8H', type: 'Private tour', cta: 'Request experience' },
      { name: 'Authentic Favela Tour', description: 'Immersive cultural experience in local communities with certified resident guide', duration: 'PT4H', type: 'Cultural immersion', cta: 'Book visit' },
      { name: 'VIP Beach Tour', description: 'Private circuit through Copacabana, Ipanema and Leblon with personalized service', duration: 'PT6H', type: 'Beach experience', cta: 'Check availability' },
      { name: 'Pedra da Gavea Trekking', description: 'Guided adventure with professional equipment and 360-degree panoramic views', duration: 'PT5H', type: 'Adventure expedition', cta: 'Request expedition' },
      { name: 'Private Navigation', description: 'Exclusive nautical experience through Guanabara Bay with private captain', duration: 'PT4H', type: 'Maritime experience', cta: 'Inquire about boat' },
      { name: 'VIP Yacht with Crew', description: 'Luxury experience on private yacht with professional crew, chef and onboard service', duration: 'PT6H', type: 'Luxury yacht', cta: 'Request VIP quote' },
      { name: 'Private Helicopter Rio', description: 'Exclusive panoramic flight with certified pilot and customized routes', duration: 'PT1H', type: 'Aerial experience', cta: 'Book private flight' },
    ],
    pt: [
      { name: 'City Tour Privado', description: 'Passeio exclusivo pelos principais pontos do Rio com guia privado e veiculo dedicado', duration: 'PT8H', type: 'Private tour', cta: 'Solicitar experiencia' },
      { name: 'Favela Tour Autentico', description: 'Experiencia cultural imersiva em comunidades locais com guia residente certificado', duration: 'PT4H', type: 'Cultural immersion', cta: 'Reservar visita' },
      { name: 'Tour de Praias VIP', description: 'Circuito privado por Copacabana, Ipanema e Leblon com servico personalizado', duration: 'PT6H', type: 'Beach experience', cta: 'Consultar disponibilidade' },
      { name: 'Trilha Pedra da Gavea', description: 'Aventura guiada com equipamento profissional e vistas panoramicas de 360 graus', duration: 'PT5H', type: 'Adventure expedition', cta: 'Solicitar expedicao' },
      { name: 'Navegacao Privada', description: 'Experiencia nautica exclusiva pela Baia de Guanabara com capitao privado', duration: 'PT4H', type: 'Maritime experience', cta: 'Consultar embarcacao' },
      { name: 'Iate VIP com Tripulacao', description: 'Experiencia de luxo em iate privado com tripulacao profissional, chef e servico a bordo', duration: 'PT6H', type: 'Luxury yacht', cta: 'Solicitar cotacao VIP' },
      { name: 'Helicoptero Privado Rio', description: 'Sobrevoo panoramico exclusivo com piloto certificado e rotas personalizadas', duration: 'PT1H', type: 'Aerial experience', cta: 'Reservar voo privado' },
    ],
    fr: [
      { name: 'City Tour Prive', description: 'Visite exclusive des principales attractions de Rio avec guide prive et vehicule dedie', duration: 'PT8H', type: 'Private tour', cta: 'Demander experience' },
      { name: 'Tour Favela Authentique', description: 'Experience culturelle immersive dans les communautes locales avec guide resident certifie', duration: 'PT4H', type: 'Cultural immersion', cta: 'Reserver visite' },
      { name: 'Tour Plages VIP', description: 'Circuit prive par Copacabana, Ipanema et Leblon avec service personnalise', duration: 'PT6H', type: 'Beach experience', cta: 'Verifier disponibilite' },
      { name: 'Trekking Pedra da Gavea', description: 'Aventure guidee avec equipement professionnel et vues panoramiques a 360 degres', duration: 'PT5H', type: 'Adventure expedition', cta: 'Demander expedition' },
      { name: 'Navigation Privee', description: 'Experience nautique exclusive dans la baie de Guanabara avec capitaine prive', duration: 'PT4H', type: 'Maritime experience', cta: 'Renseigner sur bateau' },
      { name: 'Yacht VIP avec Equipage', description: 'Experience de luxe sur yacht prive avec equipage professionnel, chef et service a bord', duration: 'PT6H', type: 'Luxury yacht', cta: 'Demander devis VIP' },
      { name: 'Helicoptere Prive Rio', description: 'Survol panoramique exclusif avec pilote certifie et itineraires personnalises', duration: 'PT1H', type: 'Aerial experience', cta: 'Reserver vol prive' },
    ],
    it: [
      { name: 'City Tour Privato', description: 'Tour esclusivo delle principali attrazioni di Rio con guida privata e veicolo dedicato', duration: 'PT8H', type: 'Private tour', cta: 'Richiedi esperienza' },
      { name: 'Favela Tour Autentico', description: 'Esperienza culturale immersiva nelle comunita locali con guida residente certificata', duration: 'PT4H', type: 'Cultural immersion', cta: 'Prenota visita' },
      { name: 'Tour Spiagge VIP', description: 'Circuito privato per Copacabana, Ipanema e Leblon con servizio personalizzato', duration: 'PT6H', type: 'Beach experience', cta: 'Verifica disponibilita' },
      { name: 'Trekking Pedra da Gavea', description: 'Avventura guidata con attrezzatura professionale e viste panoramiche a 360 gradi', duration: 'PT5H', type: 'Adventure expedition', cta: 'Richiedi spedizione' },
      { name: 'Navigazione Privata', description: 'Esperienza nautica esclusiva nella baia di Guanabara con capitano privato', duration: 'PT4H', type: 'Maritime experience', cta: 'Informazioni barca' },
      { name: 'Yacht VIP con Equipaggio', description: 'Esperienza di lusso su yacht privato con equipaggio professionale, chef e servizio a bordo', duration: 'PT6H', type: 'Luxury yacht', cta: 'Richiedi preventivo VIP' },
      { name: 'Elicottero Privato Rio', description: 'Sorvolo panoramico esclusivo con pilota certificato e percorsi personalizzati', duration: 'PT1H', type: 'Aerial experience', cta: 'Prenota volo privato' },
    ],
  };

  const listName = {
    es: 'Experiencias Privadas Disponibles en Rio de Janeiro',
    en: 'Private Experiences Available in Rio de Janeiro',
    pt: 'Experiencias Privadas Disponiveis no Rio de Janeiro',
    fr: 'Experiences Privees Disponibles a Rio de Janeiro',
    it: 'Esperienze Private Disponibili a Rio de Janeiro',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName[lang],
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
        potentialAction: {
          '@type': 'ReserveAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://wa.me/5521983526144',
            actionPlatform: 'https://schema.org/MobileWebPlatform',
          },
          name: tour.cta,
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
  packages: 'experiencias',
  destinations: 'destinos',
  travelInfo: 'info-viaje',
  guides: 'guias',
  testimonials: 'testimonios',
  contact: 'contacto',
} as const;
