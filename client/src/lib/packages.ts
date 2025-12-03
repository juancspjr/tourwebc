import cristoImage from "@assets/generated_images/cristo_redentor_statue.png";
import favelaImage from "@assets/generated_images/colorful_rio_favela.png";
import beachImage from "@assets/generated_images/copacabana_beach_rio.png";
import trekkingImage from "@assets/generated_images/dois_irmaos_trekking.png";
import boatImage from "@assets/generated_images/ilha_grande_paradise.png";
import yachtImage from "@assets/generated_images/vip_yacht_rio.png";
import helicopterImage from "@assets/generated_images/helicopter_tour_rio.png";

import rio1 from "@assets/rio_1_1764736349812.webp";
import rio2 from "@assets/rio_2_1764736349812.webp";
import rio3 from "@assets/rio_3_1764736349812.webp";
import rio4 from "@assets/rio_4_1764736349812.webp";
import rioV1 from "@assets/riov_1-1_1764736349812.webp";

import favela1 from "@assets/favela1_1764736538872.webp";
import favela2 from "@assets/favela2_1764736538872.webp";
import favela2_1 from "@assets/favela2-1_1764736538872.webp";
import favela3 from "@assets/favela3_1764736538872.webp";
import favela4 from "@assets/favela4_1764736538872.webp";

import playa2 from "@assets/playa2_1764737177292.webp";
import playa3 from "@assets/playa3_1764737177292.webp";
import playa4 from "@assets/playa4_1764737177292.webp";
import playa5 from "@assets/playa5_1764737177292.webp";
import playaV1 from "@assets/playav1_1764737177292.webp";

import trekking1 from "@assets/TrilhasTrekking1_1764737275383.webp";
import trekking2 from "@assets/TrilhasTrekking2_1764737275383.webp";
import trekking3 from "@assets/TrilhasTrekking3_1764737275383.webp";
import trekking4 from "@assets/TrilhasTrekking4_1764737275383.webp";
import trekking5 from "@assets/TrilhasTrekking5_1764737275383.webp";

import barco1 from "@assets/PaseosBarco1_1764759429302.webp";
import barco2 from "@assets/PaseosBarco2_1764759429302.webp";
import barco3 from "@assets/PaseosBarco3_1764759429302.webp";
import barco4 from "@assets/PaseosBarco4_1764759429302.webp";
import barco5 from "@assets/PaseosBarco5_1764759429302.webp";

import yate1 from "@assets/YateVIP1_1764759541668.webp";
import yate2 from "@assets/YateVIP2_1764759541668.webp";
import yate3 from "@assets/YateVIP3_1764759541668.webp";
import yate4 from "@assets/YateVIP4_1764759541668.webp";
import yate5 from "@assets/YateVIP5_1764759541668.webp";

import heli1 from "@assets/Helicóptero1_1764759625353.webp";
import heli2 from "@assets/Helicóptero2_1764759625353.webp";
import heli3 from "@assets/Helicóptero3_1764759625353.webp";
import heli4 from "@assets/Helicóptero4_1764759625353.webp";
import heli5 from "@assets/Helicóptero5_1764759625353.webp";

export interface FAQ {
  question: string;
  answer: string;
}

export interface PackageIncludes {
  title: string;
  items: string[];
}

export interface PackageData {
  id: string;
  title: string;
  description: string;
  image: string;
  images: string[];
  gallery: string[];
  price: number;
  priceNote?: string;
  duration: string;
  locations: string[];
  highlights: string[];
  category: string;
  badge?: string;
  rating?: number;
  includes: PackageIncludes[];
  faqs: FAQ[];
}

export const categories = [
  "Todos",
  "City Tour",
  "Cultura",
  "Playa",
  "Aventura",
  "Acuático",
  "VIP",
];

export const generalInfo = {
  paymentMethods: {
    title: "Métodos de Pago",
    methods: [
      { name: "Zelle", icon: "zelle" },
      { name: "Tarjetas de crédito internacionales", icon: "credit-card" },
      { name: "Transferencias nacionales e internacionales", icon: "bank" },
      { name: "Divisas en efectivo (USD / EUR)", icon: "cash" },
      { name: "PayPal", icon: "paypal" },
      { name: "Criptomonedas", icon: "bitcoin" },
    ]
  },
  visaInfo: {
    title: "Visados",
    description: "Los requisitos de visa varían según tu nacionalidad y el destino que elijas. Cada país tiene sus propias regulaciones de entrada que pueden cambiar periódicamente.",
    contactNote: "Para información específica sobre visados según tu destino, contacta a nuestro asesor de viajes quien te guiará con los requisitos actualizados.",
  },
  prohibitedActivities: {
    title: "Actividades Prohibidas",
    description: "Estas son normas generales aplicables en la mayoría de nuestros destinos. Consulta las regulaciones específicas de cada país con tu asesor.",
    items: [
      "Encender fogatas en áreas naturales protegidas",
      "Arrojar desperdicios en espacios públicos o naturales",
      "Tráfico o consumo de sustancias ilegales",
      "Porte de armas sin autorización",
      "Daños al patrimonio cultural o natural"
    ]
  },
  currency: {
    title: "Moneda del País",
    description: "La moneda varía según el destino. A continuación te mostramos las principales divisas de nuestros destinos:",
    currencies: [
      { name: "Real Brasileño (BRL)", country: "Brasil", primary: true },
      { name: "Dólar Estadounidense (USD)", country: "Estados Unidos", primary: false },
      { name: "Euro (EUR)", country: "Egipto / Europa", primary: false },
      { name: "Libra Egipcia (EGP)", country: "Egipto", primary: false }
    ]
  },
  generalFaqs: [
    {
      question: "¿Cómo puedo reservar un paquete turístico?",
      answer: "Puedes reservar directamente a través de nuestro sitio web haciendo clic en 'Reservar Ahora' en el paquete de tu elección, o contactando a nuestro asesor de viajes vía WhatsApp para una atención personalizada."
    },
    {
      question: "¿Qué documentos necesito para viajar?",
      answer: "Los documentos varían según tu nacionalidad y destino. Generalmente necesitarás: pasaporte vigente (mínimo 6 meses de validez), visa si aplica, seguro de viaje, y comprobantes de reservas. Contacta a nuestro asesor para requisitos específicos."
    },
    {
      question: "¿Cuál es la política de cancelación general?",
      answer: "Ofrecemos cancelación gratuita hasta 72 horas antes del viaje para la mayoría de paquetes. Cancelaciones tardías pueden tener cargos del 50%. En caso de fuerza mayor, reprogramamos sin costo adicional. Revisa los términos específicos de cada paquete."
    },
    {
      question: "¿Pueden viajar niños o personas de tercera edad?",
      answer: "Sí, la mayoría de nuestros tours son aptos para familias y personas mayores. Algunos tours de aventura tienen restricciones de edad por seguridad. Consúltanos para adaptar la experiencia a las necesidades de tu grupo."
    },
    {
      question: "¿Necesito llevar dinero en efectivo?",
      answer: "Recomendamos llevar algo de efectivo en la moneda local del destino para pequeños gastos. La mayoría de establecimientos aceptan tarjetas, pero tener efectivo es útil para mercados, propinas y transporte local."
    },
    {
      question: "¿Qué incluye generalmente un paquete turístico?",
      answer: "Nuestros paquetes típicamente incluyen: transporte, guía bilingüe, entradas a atracciones principales, y actividades programadas. Algunos incluyen comidas y alojamiento. Revisa los detalles de cada paquete para conocer las inclusiones específicas."
    },
    {
      question: "¿Cómo me comunico con el asesor de viajes?",
      answer: "Puedes contactar a nuestro asesor de viajes a través de WhatsApp haciendo clic en el botón flotante, o mediante el formulario de contacto en nuestra página. Respondemos en un máximo de 24 horas."
    },
    {
      question: "¿Ofrecen seguro de viaje?",
      answer: "Sí, recomendamos y ofrecemos opciones de seguro de viaje que cubren asistencia médica, cancelaciones, y equipaje. Consulta con tu asesor para conocer las opciones disponibles según tu destino."
    }
  ]
};

export const packages: PackageData[] = [
  {
    id: "day-tour",
    title: "Day Tour Rio de Janeiro",
    description: "Descubre lo mejor de Rio en un solo dia. Visitamos entre 7 a 9 puntos turisticos, incluyendo Cristo Redentor, Escadaria Selaron, Pao de Acucar, Mirante do Leblon y mucho mas. Una experiencia completa que te permitira conocer los iconos mas emblematicos de la ciudad maravillosa.",
    image: cristoImage,
    images: [cristoImage, rio1, rio2, rio3, rio4, rioV1],
    gallery: [rio1, rio2, rio3, rio4, rioV1],
    price: 100,
    duration: "8-10 horas",
    locations: ["Cristo Redentor", "Escadaria Selaron", "Pao de Acucar", "Mirante do Leblon", "Lapa", "Centro Historico"],
    highlights: ["Transporte incluido", "Guia local bilingue", "Paradas fotograficas"],
    category: "City Tour",
    badge: "Mas Popular",
    rating: 4.9,
    includes: [
      {
        title: "Transporte",
        items: [
          "Recogida y retorno al hotel o punto de encuentro",
          "Vehiculo con aire acondicionado",
          "Traslados entre todos los puntos turisticos"
        ]
      },
      {
        title: "Guia y Acompanamiento",
        items: [
          "Guia local certificado bilingue (espanol/portugues)",
          "Explicacion historica y cultural en cada parada",
          "Asistencia durante todo el recorrido"
        ]
      },
      {
        title: "Entradas y Accesos",
        items: [
          "Entrada al Corcovado (Cristo Redentor)",
          "Teleferico Pan de Azucar",
          "Acceso a miradores panoramicos"
        ]
      },
      {
        title: "Extras",
        items: [
          "Agua embotellada durante el tour",
          "Kit de aventura Rio Trip Vibes",
          "Fotos profesionales del recorrido"
        ]
      }
    ],
    faqs: [
      {
        question: "Cual es el mejor momento del ano para este tour?",
        answer: "Rio de Janeiro tiene clima tropical todo el ano. Recomendamos de abril a octubre para evitar las lluvias intensas del verano. Sin embargo, cualquier epoca es buena para visitar."
      },
      {
        question: "Necesito llevar dinero adicional?",
        answer: "Recomendamos llevar entre $30-50 USD para gastos personales como souvenirs, snacks adicionales o propinas. El almuerzo no esta incluido pero hay excelentes opciones en el recorrido."
      },
      {
        question: "Pueden viajar ninos o personas de tercera edad?",
        answer: "Si, el tour es apto para todas las edades. Contamos con vehiculos comodos y el ritmo se adapta al grupo. Para personas con movilidad reducida, consultar disponibilidad de rutas accesibles."
      },
      {
        question: "Que debo llevar?",
        answer: "Ropa comoda, protector solar, sombrero o gorra, camara fotografica y calzado comodo para caminar. En verano, llevar repelente de insectos."
      },
      {
        question: "Cual es la politica de cancelacion?",
        answer: "Cancelacion gratuita hasta 48 horas antes del tour. Cancelaciones con menos de 48 horas tienen un cargo del 50%. No shows no son reembolsables."
      }
    ]
  },
  {
    id: "favelas-tour",
    title: "Tour por las Favelas",
    description: "Vive la autentica cultura carioca con recorridos guiados por las favelas mas famosas de Rio. Conoce su historia, su gente y sus miradores impresionantes. Una experiencia que cambiara tu perspectiva sobre estas vibrantes comunidades llenas de arte, musica y tradicion.",
    image: favelaImage,
    images: [favelaImage, favela1, favela2, favela2_1, favela3, favela4],
    gallery: [favela1, favela2, favela2_1, favela3, favela4],
    price: 35,
    duration: "3-4 horas",
    locations: ["Rocinha", "Vidigal", "Tavares Bastos", "Santa Marta"],
    highlights: ["Experiencia cultural autentica", "Guia local de la comunidad", "Miradores espectaculares"],
    category: "Cultura",
    rating: 4.8,
    includes: [
      {
        title: "Transporte",
        items: [
          "Recogida en punto de encuentro",
          "Transporte interno en la comunidad",
          "Retorno al punto de partida"
        ]
      },
      {
        title: "Guia Local",
        items: [
          "Guia residente de la comunidad",
          "Historia y contexto social",
          "Interaccion con artistas y comerciantes locales"
        ]
      },
      {
        title: "Experiencias Incluidas",
        items: [
          "Visita a proyectos sociales",
          "Degustacion de comida tipica",
          "Acceso a miradores exclusivos",
          "Muestra de arte urbano y graffiti"
        ]
      },
      {
        title: "Contribucion Social",
        items: [
          "Parte del costo apoya proyectos comunitarios",
          "Compras en comercios locales",
          "Turismo responsable y sostenible"
        ]
      }
    ],
    faqs: [
      {
        question: "Es seguro visitar las favelas?",
        answer: "Si, nuestros tours son completamente seguros. Trabajamos con guias locales que conocen perfectamente la comunidad y mantenemos rutas establecidas. La seguridad de nuestros visitantes es prioridad."
      },
      {
        question: "Puedo tomar fotos?",
        answer: "Si, puedes tomar fotos de paisajes y arte urbano. Pedimos respeto y siempre solicitar permiso antes de fotografiar a residentes. Tu guia te orientara sobre las mejores practicas."
      },
      {
        question: "Cual es el mejor momento del ano para este tour?",
        answer: "Este tour se puede realizar durante todo el ano. Las mananas suelen ser mas tranquilas y con mejor luz para fotos. Evitar dias de lluvia intensa."
      },
      {
        question: "Que debo llevar?",
        answer: "Ropa comoda y discreta, calzado cerrado para caminar, poco efectivo y evitar joyas llamativas. Llevar agua y protector solar."
      },
      {
        question: "Hay opciones vegetarianas en la degustacion?",
        answer: "Si, informanos con anticipacion sobre restricciones alimentarias y adaptaremos la experiencia gastronomica a tus necesidades."
      }
    ]
  },
  {
    id: "playas-tour",
    title: "Tour por las Playas",
    description: "Explora las playas mas iconicas: Copacabana, Ipanema, Joatinga, Prainha y Grumari. Ideal para disfrutar del sol, surf, paisajes naturales y fotos espectaculares. Descubre las joyas escondidas del litoral carioca con sus aguas cristalinas y paisajes de postal.",
    image: beachImage,
    images: [beachImage, playa2, playa3, playa4, playa5, playaV1],
    gallery: [playa2, playa3, playa4, playa5, playaV1],
    price: 80,
    duration: "6-8 horas",
    locations: ["Copacabana", "Ipanema", "Joatinga", "Prainha", "Grumari"],
    highlights: ["Playas paradisiacas", "Surf opcional", "Fotos espectaculares", "Agua de coco incluida"],
    category: "Playa",
    rating: 4.7,
    includes: [
      {
        title: "Transporte",
        items: [
          "Recogida y retorno al hotel",
          "Vehiculo 4x4 para playas remotas",
          "Traslados entre todas las playas"
        ]
      },
      {
        title: "Tiempo en Playa",
        items: [
          "Paradas de 30-60 min en cada playa",
          "Tiempo libre para nadar y relajarse",
          "Asistencia para deportes acuaticos"
        ]
      },
      {
        title: "Incluido",
        items: [
          "Agua de coco en las paradas",
          "Sombrilla y sillas en playas principales",
          "Kit de snorkel basico",
          "Toallas de playa"
        ]
      },
      {
        title: "Opcionales",
        items: [
          "Clases de surf (costo adicional)",
          "Almuerzo en restaurante de playa",
          "Stand up paddle"
        ]
      }
    ],
    faqs: [
      {
        question: "Cual es el mejor momento del ano para este tour?",
        answer: "De noviembre a marzo es verano en Rio con temperaturas ideales para playa. Sin embargo, de abril a octubre tambien hay dias excelentes con menos multitudes."
      },
      {
        question: "Necesito saber nadar?",
        answer: "No es obligatorio, pero recomendable. Algunas playas tienen corrientes, siempre seguir las indicaciones del guia y respetar las banderas de seguridad."
      },
      {
        question: "Que debo llevar?",
        answer: "Traje de bano, protector solar alto (SPF 50+), sombrero, gafas de sol, sandalias, ropa de cambio y camara resistente al agua si tienes."
      },
      {
        question: "Las playas son aptas para ninos?",
        answer: "Si, especialmente Copacabana e Ipanema que tienen aguas mas tranquilas. Prainha y Joatinga son mas agrestes y recomendadas para adultos."
      },
      {
        question: "Hay lockers para guardar pertenencias?",
        answer: "No hay lockers en las playas, pero nuestro guia cuida las pertenencias mientras disfrutan del mar. Recomendamos no llevar objetos de valor."
      }
    ]
  },
  {
    id: "trekking",
    title: "Trilhas & Trekking",
    description: "Aventura garantizada en los morros mas famosos de Rio: Morro Dois Irmaos, Pedra Bonita, Pedra do Telegrafo, Pedra da Gavea. Guias especializados y vistas que te dejaran sin aliento. Conecta con la naturaleza exuberante de la Mata Atlantica mientras conquistas las cumbres mas iconicas.",
    image: trekkingImage,
    images: [trekkingImage, trekking1, trekking2, trekking3, trekking4, trekking5],
    gallery: [trekking1, trekking2, trekking3, trekking4, trekking5],
    price: 50,
    priceNote: "Varia segun ruta",
    duration: "4-6 horas",
    locations: ["Morro Dois Irmaos", "Pedra Bonita", "Pedra do Telegrafo", "Pedra da Gavea"],
    highlights: ["Guias especializados", "Equipamiento de seguridad", "Vistas panoramicas increibles"],
    category: "Aventura",
    badge: "Aventura",
    rating: 4.9,
    includes: [
      {
        title: "Transporte",
        items: [
          "Recogida y retorno al hotel",
          "Traslado al inicio del sendero",
          "Vehiculo con aire acondicionado"
        ]
      },
      {
        title: "Guia y Seguridad",
        items: [
          "Guia de montana certificado",
          "Equipamiento de seguridad",
          "Botiquin de primeros auxilios",
          "Radio de comunicacion"
        ]
      },
      {
        title: "Incluido",
        items: [
          "Bastones de trekking",
          "Snacks energeticos",
          "Agua y bebidas isotonicas",
          "Fotos profesionales del recorrido"
        ]
      },
      {
        title: "Kit de Aventura",
        items: [
          "Franela Dry Fit Rio Trip Vibes",
          "Bandana multiusos",
          "Bolsa impermeable para celular"
        ]
      }
    ],
    faqs: [
      {
        question: "Cual es el nivel de dificultad?",
        answer: "Varia segun la ruta: Pedra do Telegrafo es facil (2h), Dois Irmaos es moderado (3h), Pedra Bonita moderado-alto (4h) y Pedra da Gavea es dificil (6h, requiere experiencia)."
      },
      {
        question: "Cual es el mejor momento del ano para hacer trekking?",
        answer: "De abril a octubre es ideal con clima seco y temperaturas agradables. Evitar dias de lluvia por seguridad en los senderos."
      },
      {
        question: "Necesito experiencia previa?",
        answer: "Para rutas faciles y moderadas no es necesario. Para Pedra da Gavea recomendamos experiencia basica en montanismo. Siempre evaluamos la condicion fisica del grupo."
      },
      {
        question: "Que debo llevar?",
        answer: "Calzado de trekking o tenis con buen agarre, ropa deportiva, mochila pequena, protector solar, repelente, gorra y minimo 1.5 litros de agua personal."
      },
      {
        question: "Hay limite de edad?",
        answer: "Rutas faciles: desde 10 anos. Moderadas: desde 14 anos. Dificiles: mayores de 18 anos. Personas mayores de 60 anos requieren evaluacion medica."
      }
    ]
  },
  {
    id: "boat-tour",
    title: "Paseos en Barco",
    description: "Disfruta un dia en el paraiso navegando por Ilha Grande o Arraial do Cabo. Playas de aguas cristalinas, snorkel y paisajes de postal. Una experiencia unica para descubrir las islas y calas mas espectaculares del litoral brasileno.",
    image: boatImage,
    images: [boatImage, barco1, barco2, barco3, barco4, barco5],
    gallery: [barco1, barco2, barco3, barco4, barco5],
    price: 70,
    duration: "Dia completo",
    locations: ["Ilha Grande", "Arraial do Cabo", "Angra dos Reis"],
    highlights: ["Transporte incluido", "Snorkel con equipo", "Almuerzo a bordo opcional"],
    category: "Acuático",
    rating: 4.8,
    includes: [
      {
        title: "Transporte",
        items: [
          "Recogida y retorno al hotel",
          "Traslado terrestre al puerto",
          "Navegacion en embarcacion segura"
        ]
      },
      {
        title: "Experiencia Nautica",
        items: [
          "Recorrido por 4-6 playas e islas",
          "Paradas para nadar y snorkel",
          "Equipo de snorkel incluido"
        ]
      },
      {
        title: "A Bordo",
        items: [
          "Bebidas (agua, refrescos)",
          "Frutas tropicales",
          "Hielo y cooler disponible"
        ]
      },
      {
        title: "Seguridad",
        items: [
          "Chalecos salvavidas",
          "Capitan y tripulacion certificados",
          "Seguro de navegacion"
        ]
      }
    ],
    faqs: [
      {
        question: "Cual es el mejor momento del ano para este tour?",
        answer: "De octubre a abril el mar esta mas calmado y las aguas mas cristalinas. Julio y agosto pueden tener mar agitado pero siguen siendo viables."
      },
      {
        question: "Me mareo en barco, puedo hacer el tour?",
        answer: "Recomendamos tomar medicamento para el mareo antes del tour. La mayoria de las embarcaciones son estables, pero el mar puede variar."
      },
      {
        question: "El almuerzo esta incluido?",
        answer: "El almuerzo es opcional con costo adicional. Ofrecemos menu de mariscos frescos o pollo. Tambien puedes llevar tu propia comida."
      },
      {
        question: "Hay limite de peso o edad?",
        answer: "Ninos desde 5 anos pueden participar con supervision. No hay limite de peso pero las embarcaciones tienen capacidad maxima por seguridad."
      },
      {
        question: "Puedo llevar mi propio equipo de snorkel?",
        answer: "Si, puedes traer tu equipo personal. Tambien proporcionamos equipo de calidad sin costo adicional."
      }
    ]
  },
  {
    id: "yacht-vip",
    title: "Paseo en Yate VIP",
    description: "Experiencia exclusiva por las costas de Barra da Tijuca y Copacabana. Musica, bebidas, tripulacion profesional y el mejor atardecer de Rio. Ideal para celebraciones especiales, eventos corporativos o simplemente una experiencia de lujo inolvidable.",
    image: yachtImage,
    images: [yachtImage, yate1, yate2, yate3, yate4, yate5],
    gallery: [yate1, yate2, yate3, yate4, yate5],
    price: 200,
    priceNote: "Por hora",
    duration: "Personalizable",
    locations: ["Barra da Tijuca", "Copacabana", "Niteroi", "Islas de Guanabara"],
    highlights: ["Tripulacion profesional", "Bebidas premium incluidas", "Ideal para grupos y eventos"],
    category: "VIP",
    badge: "Exclusivo",
    rating: 5.0,
    includes: [
      {
        title: "El Yate",
        items: [
          "Embarcacion de lujo (hasta 12 personas)",
          "Salon climatizado",
          "Sistema de sonido premium",
          "Area de soleo"
        ]
      },
      {
        title: "Tripulacion",
        items: [
          "Capitan profesional",
          "Marinero asistente",
          "Servicio de bartender",
          "Chef opcional (costo adicional)"
        ]
      },
      {
        title: "Incluido",
        items: [
          "Bebidas premium (champagne, vinos, cocteles)",
          "Tabla de quesos y aperitivos",
          "Hielo ilimitado",
          "Equipo de snorkel"
        ]
      },
      {
        title: "Extras Disponibles",
        items: [
          "Decoracion para eventos",
          "Fotografo profesional",
          "Menu gourmet personalizado",
          "DJ a bordo"
        ]
      }
    ],
    faqs: [
      {
        question: "Cual es la capacidad maxima?",
        answer: "Nuestros yates tienen capacidad para 6-12 personas segun el modelo. Para grupos mayores, podemos coordinar multiples embarcaciones."
      },
      {
        question: "Se puede reservar para eventos especiales?",
        answer: "Si, ofrecemos paquetes para cumpleanos, despedidas, pedidas de matrimonio, eventos corporativos y mas. Incluimos decoracion tematica."
      },
      {
        question: "Cual es el horario ideal?",
        answer: "Para atardeceres espectaculares, recomendamos salir 2-3 horas antes del ocaso. Para dia completo de playa, salidas a las 10am."
      },
      {
        question: "Que puedo llevar adicional?",
        answer: "Puedes traer comida y bebidas adicionales sin cargo. Contamos con refrigeradores amplios y area de cocina basica."
      },
      {
        question: "Hay politica de mal tiempo?",
        answer: "En caso de condiciones climaticas adversas, reprogramamos sin costo adicional o reembolsamos el 100% del pago."
      }
    ]
  },
  {
    id: "helicopter",
    title: "Paseo en Helicoptero",
    description: "Vive Rio desde el cielo. Un vuelo panoramico sobre Cristo Redentor, Pan de Azucar, playas y montanas. Experiencia premium con vistas unicas e inigualables que te permitiran apreciar la magnitud de la ciudad maravillosa.",
    image: helicopterImage,
    images: [helicopterImage, heli1, heli2, heli3, heli4, heli5],
    gallery: [heli1, heli2, heli3, heli4, heli5],
    price: 180,
    priceNote: "15 min vuelo",
    duration: "15-30 min",
    locations: ["Cristo Redentor", "Pan de Azucar", "Playas", "Lagoa", "Maracana"],
    highlights: ["Vuelo panoramico", "Video y fotos incluidas", "Experiencia premium"],
    category: "VIP",
    badge: "Premium",
    rating: 5.0,
    includes: [
      {
        title: "El Vuelo",
        items: [
          "Helicoptero con ventanas panoramicas",
          "Piloto comercial certificado",
          "Auriculares con comunicacion",
          "Briefing de seguridad"
        ]
      },
      {
        title: "Rutas Disponibles",
        items: [
          "Ruta Clasica (15 min): Cristo, Pan de Azucar, playas",
          "Ruta Completa (20 min): + Maracana, Lagoa",
          "Ruta Premium (30 min): Tour completo de Rio"
        ]
      },
      {
        title: "Multimedia",
        items: [
          "Video HD del vuelo completo",
          "Fotografias aereas profesionales",
          "GoPro disponible sin costo",
          "Acceso digital inmediato"
        ]
      },
      {
        title: "Extras",
        items: [
          "Champagne de bienvenida",
          "Certificado de vuelo",
          "Transfer desde hotel (costo adicional)"
        ]
      }
    ],
    faqs: [
      {
        question: "Es seguro volar en helicoptero?",
        answer: "Absolutamente. Operamos con pilotos altamente certificados, helicopteros con mantenimiento riguroso y cumplimos todas las normas de aviacion civil de Brasil."
      },
      {
        question: "Hay limite de peso?",
        answer: "El peso combinado de pasajeros no debe exceder 450kg por seguridad. Helicopteros tienen capacidad de 4-6 pasajeros segun modelo."
      },
      {
        question: "Cual es el mejor horario para volar?",
        answer: "Las mananas tempranas ofrecen mejor visibilidad. Los atardeceres son espectaculares para fotos. Evitar horas de medio dia por turbulencia termica."
      },
      {
        question: "Se puede volar con lluvia?",
        answer: "Por seguridad, los vuelos se cancelan o reprograman en caso de lluvia, niebla densa o vientos fuertes. Ofrecemos reprogramacion sin costo."
      },
      {
        question: "Puedo llevar mi camara profesional?",
        answer: "Si, puedes usar cualquier equipo fotografico. Solo asegurate de sujetarlo bien. Las ventanas son amplias y limpias para excelentes tomas."
      }
    ]
  },
];

export function getPackageById(id: string): PackageData | undefined {
  return packages.find(pkg => pkg.id === id);
}

export function getPackageByTitle(title: string): PackageData | undefined {
  return packages.find(pkg => pkg.title === title);
}

export interface TestimonialData {
  id: string;
  name: string;
  avatar?: string;
  date: string;
  rating: number;
  text: string;
  tour: string;
}

export const testimonials: TestimonialData[] = [
  {
    id: "1",
    name: "Maria Garcia",
    date: "Noviembre 2024",
    rating: 5,
    text: "Una experiencia increible! El guia fue muy profesional y conocedor. El tour al Cristo Redentor y Pan de Azucar supero todas mis expectativas. Recomiendo 100%.",
    tour: "Day Tour Rio de Janeiro",
  },
  {
    id: "2",
    name: "Carlos Rodriguez",
    date: "Octubre 2024",
    rating: 5,
    text: "El trekking a Pedra da Gavea fue desafiante pero las vistas son impresionantes. El guia nos cuido todo el tiempo y nos enseno sobre la flora local. Volvere por mas aventuras!",
    tour: "Trilhas & Trekking",
  },
  {
    id: "3",
    name: "Ana Martinez",
    date: "Septiembre 2024",
    rating: 5,
    text: "El paseo en yate fue espectacular! Vimos el atardecer desde el mar con Copacabana de fondo. Perfecto para celebrar nuestro aniversario. La tripulacion fue muy atenta.",
    tour: "Paseo en Yate VIP",
  },
  {
    id: "4",
    name: "Diego Flores",
    date: "Noviembre 2024",
    rating: 5,
    text: "El tour en helicoptero fue lo mas increible que he hecho! Ver el Cristo Redentor desde arriba y las playas de Rio es una experiencia que no tiene precio. Fotos espectaculares.",
    tour: "Paseo en Helicoptero",
  },
  {
    id: "5",
    name: "Carolina Sanchez",
    date: "Octubre 2024",
    rating: 5,
    text: "Las playas de Arraial do Cabo son un paraiso escondido. El agua cristalina, el snorkel increible y la tripulacion del barco super amable. Un dia perfecto en el mar.",
    tour: "Paseos en Barco",
  },
  {
    id: "6",
    name: "Roberto Diaz",
    date: "Septiembre 2024",
    rating: 5,
    text: "El tour por las favelas me cambio la perspectiva completamente. La cultura, el arte urbano, la musica... y las vistas desde Vidigal son de otro mundo. Muy recomendado.",
    tour: "Tour por las Favelas",
  },
  {
    id: "7",
    name: "Patricia Morales",
    date: "Agosto 2024",
    rating: 5,
    text: "Hicimos el trekking al Morro Dois Irmaos y las vistas de Ipanema y Leblon desde la cima son inolvidables. El guia muy profesional y el ritmo perfecto para disfrutar.",
    tour: "Trilhas & Trekking",
  },
  {
    id: "8",
    name: "Fernando Castro",
    date: "Agosto 2024",
    rating: 5,
    text: "El City Tour completo es la mejor forma de conocer Rio en un dia. Visitamos todos los puntos iconicos y el guia nos conto historias fascinantes de cada lugar.",
    tour: "Day Tour Rio de Janeiro",
  },
  {
    id: "9",
    name: "Lucia Hernandez",
    date: "Julio 2024",
    rating: 5,
    text: "Prainha y Grumari son playas paradisiacas! Lejos del turismo masivo, aguas limpias y paisajes de postal. El tour de playas fue nuestra mejor decision.",
    tour: "Tour por las Playas",
  },
  {
    id: "10",
    name: "Miguel Torres",
    date: "Julio 2024",
    rating: 5,
    text: "Celebramos el cumpleanos de mi esposa en el yate VIP y fue magico. Champagne, atardecer, musica y las luces de Rio de fondo. Servicio de primera clase.",
    tour: "Paseo en Yate VIP",
  },
  {
    id: "11",
    name: "Valentina Ruiz",
    date: "Junio 2024",
    rating: 5,
    text: "Ilha Grande es un paraiso! El paseo en barco nos llevo a playas secretas con aguas turquesas. El almuerzo de mariscos frescos fue delicioso. Dia inolvidable.",
    tour: "Paseos en Barco",
  },
  {
    id: "12",
    name: "Andres Vargas",
    date: "Junio 2024",
    rating: 5,
    text: "La Pedra do Telegrafo tiene las mejores fotos de Instagram! El trekking es accesible y las vistas de la costa son espectaculares. Guia excelente y muy paciente.",
    tour: "Trilhas & Trekking",
  },
  {
    id: "13",
    name: "Camila Reyes",
    date: "Mayo 2024",
    rating: 5,
    text: "Ver Rio desde el helicoptero al atardecer fue surrealista. Los colores del cielo, el Cristo iluminado y toda la bahia brillando. Una experiencia que vale cada centavo.",
    tour: "Paseo en Helicoptero",
  },
];
