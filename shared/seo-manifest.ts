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
  return lang === 'es' ? BASE_URL : `${BASE_URL}/${lang}`;
}

export function getHreflangLinks(): Array<{ lang: string; url: string }> {
  return [
    { lang: 'x-default', url: BASE_URL },
    ...SUPPORTED_LANGUAGES.map(lang => ({
      lang,
      url: lang === 'es' ? BASE_URL : `${BASE_URL}/${lang}`,
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
      url: `${BASE_URL}/logo.webp`,
      width: 512,
      height: 512,
    },
    image: `${BASE_URL}/logo.webp`,
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
    sameAs: [
      'https://www.instagram.com/brianmachinee/',
      'https://www.youtube.com/@BrianMachinee',
      'https://www.tiktok.com/@brianmachinne',
    ],
    slogan: slogans[lang],
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
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          validFrom: new Date().toISOString().split('T')[0],
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

export function getSchemaFAQPage(lang: SupportedLanguage) {
  const faqData: Record<SupportedLanguage, Array<{ question: string; answer: string }>> = {
    es: [
      { question: "¿Cómo puedo reservar un paquete turístico?", answer: "Puedes reservar directamente a través de nuestro sitio web haciendo clic en 'Reservar Ahora' en el paquete de tu elección, o contactando a nuestro asesor de viajes vía WhatsApp para una atención personalizada." },
      { question: "¿Qué documentos necesito para viajar?", answer: "Los documentos varían según tu nacionalidad y destino. Generalmente necesitarás: pasaporte vigente (mínimo 6 meses de validez), visa si aplica, seguro de viaje, y comprobantes de reservas. Contacta a nuestro asesor para requisitos específicos." },
      { question: "¿Cuál es la política de cancelación general?", answer: "Ofrecemos cancelación gratuita hasta 72 horas antes del viaje para la mayoría de paquetes. Cancelaciones tardías pueden tener cargos del 50%. En caso de fuerza mayor, reprogramamos sin costo adicional." },
      { question: "¿Pueden viajar niños o personas de tercera edad?", answer: "Sí, la mayoría de nuestros tours son aptos para familias y personas mayores. Algunos tours de aventura tienen restricciones de edad por seguridad. Consúltanos para adaptar la experiencia a las necesidades de tu grupo." },
      { question: "¿Necesito llevar dinero en efectivo?", answer: "Recomendamos llevar algo de efectivo en la moneda local del destino para pequeños gastos. La mayoría de establecimientos aceptan tarjetas, pero tener efectivo es útil para mercados, propinas y transporte local." },
      { question: "¿Qué incluye generalmente un paquete turístico?", answer: "Nuestros paquetes típicamente incluyen: transporte, guía bilingüe, entradas a atracciones principales, y actividades programadas. Algunos incluyen comidas y alojamiento." },
      { question: "¿Cómo me comunico con el asesor de viajes?", answer: "Puedes contactar a nuestro asesor de viajes a través de WhatsApp haciendo clic en el botón flotante, o mediante el formulario de contacto en nuestra página. Respondemos en un máximo de 24 horas." },
      { question: "¿Ofrecen seguro de viaje?", answer: "Sí, recomendamos y ofrecemos opciones de seguro de viaje que cubren asistencia médica, cancelaciones, y equipaje. Consulta con tu asesor para conocer las opciones disponibles según tu destino." },
    ],
    en: [
      { question: "How can I book a tour package?", answer: "You can book directly through our website by clicking 'Book Now' on the package of your choice, or by contacting our travel advisor via WhatsApp for personalized attention." },
      { question: "What documents do I need to travel?", answer: "Documents vary depending on your nationality and destination. Generally you will need: valid passport (minimum 6 months validity), visa if applicable, travel insurance, and booking confirmations. Contact our advisor for specific requirements." },
      { question: "What is the general cancellation policy?", answer: "We offer free cancellation up to 72 hours before the trip for most packages. Late cancellations may have 50% charges. In case of force majeure, we reschedule at no additional cost." },
      { question: "Can children or elderly people travel?", answer: "Yes, most of our tours are suitable for families and elderly people. Some adventure tours have age restrictions for safety. Consult us to adapt the experience to your group's needs." },
      { question: "Do I need to bring cash?", answer: "We recommend bringing some cash in the local currency of the destination for small expenses. Most establishments accept cards, but having cash is useful for markets, tips and local transportation." },
      { question: "What does a tour package generally include?", answer: "Our packages typically include: transportation, bilingual guide, entrance to main attractions, and scheduled activities. Some include meals and accommodation." },
      { question: "How do I contact the travel advisor?", answer: "You can contact our travel advisor through WhatsApp by clicking the floating button, or through the contact form on our page. We respond within a maximum of 24 hours." },
      { question: "Do you offer travel insurance?", answer: "Yes, we recommend and offer travel insurance options that cover medical assistance, cancellations, and luggage. Consult with your advisor to learn about the options available according to your destination." },
    ],
    pt: [
      { question: "Como posso reservar um pacote turístico?", answer: "Você pode reservar diretamente através do nosso site clicando em 'Reservar Agora' no pacote de sua escolha, ou entrando em contato com nosso assessor de viagem via WhatsApp para atendimento personalizado." },
      { question: "Quais documentos preciso para viajar?", answer: "Os documentos variam de acordo com sua nacionalidade e destino. Geralmente você precisará de: passaporte válido (mínimo 6 meses de validade), visto se aplicável, seguro viagem e comprovantes de reservas." },
      { question: "Qual é a política de cancelamento geral?", answer: "Oferecemos cancelamento gratuito até 72 horas antes da viagem para a maioria dos pacotes. Cancelamentos tardios podem ter cobranças de 50%. Em caso de força maior, reagendamos sem custo adicional." },
      { question: "Crianças ou idosos podem viajar?", answer: "Sim, a maioria dos nossos tours são adequados para famílias e idosos. Alguns tours de aventura têm restrições de idade por segurança. Consulte-nos para adaptar a experiência às necessidades do seu grupo." },
      { question: "Preciso levar dinheiro em espécie?", answer: "Recomendamos levar algum dinheiro na moeda local do destino para pequenas despesas. A maioria dos estabelecimentos aceita cartões, mas ter dinheiro é útil para mercados, gorjetas e transporte local." },
      { question: "O que geralmente inclui um pacote turístico?", answer: "Nossos pacotes tipicamente incluem: transporte, guia bilíngue, entradas para atrações principais e atividades programadas. Alguns incluem refeições e hospedagem." },
      { question: "Como entro em contato com o assessor de viagem?", answer: "Você pode entrar em contato com nosso assessor de viagem através do WhatsApp clicando no botão flutuante, ou através do formulário de contato em nossa página. Respondemos em no máximo 24 horas." },
      { question: "Vocês oferecem seguro viagem?", answer: "Sim, recomendamos e oferecemos opções de seguro viagem que cobrem assistência médica, cancelamentos e bagagem. Consulte seu assessor para conhecer as opções disponíveis de acordo com seu destino." },
    ],
    fr: [
      { question: "Comment puis-je réserver un forfait touristique?", answer: "Vous pouvez réserver directement via notre site web en cliquant sur 'Réserver Maintenant' sur le forfait de votre choix, ou en contactant notre conseiller voyage via WhatsApp pour une attention personnalisée." },
      { question: "Quels documents ai-je besoin pour voyager?", answer: "Les documents varient selon votre nationalité et destination. Généralement vous aurez besoin: passeport valide (minimum 6 mois de validité), visa si applicable, assurance voyage et confirmations de réservation." },
      { question: "Quelle est la politique d'annulation générale?", answer: "Nous offrons l'annulation gratuite jusqu'à 72 heures avant le voyage pour la plupart des forfaits. Les annulations tardives peuvent avoir des frais de 50%. En cas de force majeure, nous reprogrammons sans frais supplémentaires." },
      { question: "Les enfants ou personnes âgées peuvent-ils voyager?", answer: "Oui, la plupart de nos tours conviennent aux familles et personnes âgées. Certains tours d'aventure ont des restrictions d'âge pour la sécurité. Consultez-nous pour adapter l'expérience aux besoins de votre groupe." },
      { question: "Dois-je apporter de l'argent liquide?", answer: "Nous recommandons d'apporter un peu d'argent dans la monnaie locale de la destination pour les petites dépenses. La plupart des établissements acceptent les cartes, mais avoir de l'argent est utile pour les marchés, pourboires et transport local." },
      { question: "Qu'inclut généralement un forfait touristique?", answer: "Nos forfaits incluent généralement: transport, guide bilingue, entrées aux attractions principales et activités programmées. Certains incluent repas et hébergement." },
      { question: "Comment contacter le conseiller voyage?", answer: "Vous pouvez contacter notre conseiller voyage via WhatsApp en cliquant sur le bouton flottant, ou via le formulaire de contact sur notre page. Nous répondons dans un maximum de 24 heures." },
      { question: "Offrez-vous une assurance voyage?", answer: "Oui, nous recommandons et offrons des options d'assurance voyage couvrant l'assistance médicale, annulations et bagages. Consultez votre conseiller pour connaître les options disponibles selon votre destination." },
    ],
    it: [
      { question: "Come posso prenotare un pacchetto turistico?", answer: "Puoi prenotare direttamente tramite il nostro sito web cliccando su 'Prenota Ora' sul pacchetto di tua scelta, o contattando il nostro consulente di viaggio via WhatsApp per un'attenzione personalizzata." },
      { question: "Quali documenti mi servono per viaggiare?", answer: "I documenti variano a seconda della tua nazionalità e destinazione. Generalmente avrai bisogno di: passaporto valido (minimo 6 mesi di validità), visto se applicabile, assicurazione viaggio e conferme di prenotazione." },
      { question: "Qual è la politica di cancellazione generale?", answer: "Offriamo cancellazione gratuita fino a 72 ore prima del viaggio per la maggior parte dei pacchetti. Le cancellazioni tardive possono avere addebiti del 50%. In caso di forza maggiore, riprogrammiamo senza costi aggiuntivi." },
      { question: "Bambini o anziani possono viaggiare?", answer: "Sì, la maggior parte dei nostri tour sono adatti a famiglie e anziani. Alcuni tour avventura hanno restrizioni di età per sicurezza. Consultaci per adattare l'esperienza alle esigenze del tuo gruppo." },
      { question: "Devo portare contanti?", answer: "Consigliamo di portare un po' di contanti nella valuta locale della destinazione per piccole spese. La maggior parte degli esercizi accetta carte, ma avere contanti è utile per mercati, mance e trasporto locale." },
      { question: "Cosa include generalmente un pacchetto turistico?", answer: "I nostri pacchetti includono tipicamente: trasporto, guida bilingue, ingressi alle attrazioni principali e attività programmate. Alcuni includono pasti e alloggio." },
      { question: "Come contatto il consulente di viaggio?", answer: "Puoi contattare il nostro consulente di viaggio tramite WhatsApp cliccando sul pulsante flottante, o tramite il modulo di contatto sulla nostra pagina. Rispondiamo entro un massimo di 24 ore." },
      { question: "Offrite assicurazione viaggio?", answer: "Sì, raccomandiamo e offriamo opzioni di assicurazione viaggio che coprono assistenza medica, cancellazioni e bagagli. Consulta il tuo consulente per conoscere le opzioni disponibili in base alla tua destinazione." },
    ],
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${BASE_URL}/#faq`,
    mainEntity: faqData[lang].map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
    inLanguage: lang,
  };
}

export function getSchemaBreadcrumbList(lang: SupportedLanguage) {
  const homeLabels: Record<SupportedLanguage, string> = {
    es: 'Inicio',
    en: 'Home',
    pt: 'Início',
    fr: 'Accueil',
    it: 'Home',
  };

  const experienceLabels: Record<SupportedLanguage, string> = {
    es: 'Experiencias',
    en: 'Experiences',
    pt: 'Experiências',
    fr: 'Expériences',
    it: 'Esperienze',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${BASE_URL}/#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabels[lang],
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: experienceLabels[lang],
        item: `${BASE_URL}/#experiencias`,
      },
    ],
  };
}

export function getSchemaReviewAggregate(lang: SupportedLanguage) {
  const reviewData = [
    { author: 'Maria Garcia', rating: 5, review: 'Experiencia increible con el tour en helicoptero. Vistas espectaculares de Rio.', tour: 'Helicopter Tour' },
    { author: 'John Smith', rating: 5, review: 'The yacht experience was amazing. Professional crew and excellent service.', tour: 'VIP Yacht' },
    { author: 'Carlos Rodriguez', rating: 5, review: 'El tour por las favelas fue autentico y seguro. Excelente guia local.', tour: 'Favela Tour' },
    { author: 'Sophie Martin', rating: 5, review: 'Une journee parfaite a Copacabana et Ipanema. Tres recommande!', tour: 'Beach Tour' },
    { author: 'Marco Rossi', rating: 5, review: 'Trekking alla Pedra da Gavea fantastico. Guide professionale e viste mozzafiato.', tour: 'Pedra da Gavea' },
    { author: 'Ana Paula', rating: 5, review: 'Passeio de barco pela Baia de Guanabara foi inesquecivel. Servico impecavel.', tour: 'Boat Tour' },
    { author: 'David Wilson', rating: 5, review: 'Best city tour I have ever taken. The guide knew everything about Rio.', tour: 'City Tour' },
    { author: 'Laura Fernandez', rating: 5, review: 'El servicio de yate VIP supero todas mis expectativas. Lujo absoluto.', tour: 'VIP Yacht' },
    { author: 'Pierre Dubois', rating: 5, review: 'Tour culturel exceptionnel. Authentique et tres bien organise.', tour: 'Cultural Tour' },
    { author: 'Giulia Bianchi', rating: 5, review: 'Esperienza indimenticabile. Staff professionale e attento ai dettagli.', tour: 'Day Tour' },
  ];

  const descriptions: Record<SupportedLanguage, string> = {
    es: 'Reseñas de clientes satisfechos de Rio Trip Vibes',
    en: 'Reviews from satisfied Rio Trip Vibes customers',
    pt: 'Avaliações de clientes satisfeitos da Rio Trip Vibes',
    fr: 'Avis de clients satisfaits de Rio Trip Vibes',
    it: 'Recensioni di clienti soddisfatti di Rio Trip Vibes',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#reviews`,
    name: 'Rio Trip Vibes',
    description: descriptions[lang],
    url: BASE_URL,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    review: reviewData.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: review.review,
      itemReviewed: {
        '@type': 'TouristTrip',
        name: review.tour,
        provider: {
          '@type': 'TravelAgency',
          name: 'Rio Trip Vibes',
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
    getSchemaFAQPage(lang),
    getSchemaBreadcrumbList(lang),
    getSchemaReviewAggregate(lang),
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
