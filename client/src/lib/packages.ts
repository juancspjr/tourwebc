import cristoImage from "@assets/generated_images/cristo_redentor_statue.png";
import favelaImage from "@assets/generated_images/colorful_rio_favela.png";
import beachImage from "@assets/generated_images/copacabana_beach_rio.png";
import trekkingImage from "@assets/generated_images/dois_irmaos_trekking.png";
import boatImage from "@assets/generated_images/ilha_grande_paradise.png";
import yachtImage from "@assets/generated_images/vip_yacht_rio.png";
import helicopterImage from "@assets/generated_images/helicopter_tour_rio.png";

export interface PackageData {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  priceNote?: string;
  duration: string;
  locations: string[];
  highlights: string[];
  category: string;
  badge?: string;
  rating?: number;
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

export const packages: PackageData[] = [
  {
    id: "day-tour",
    title: "Day Tour Rio de Janeiro",
    description: "Descubre lo mejor de Río en un solo día. Visitamos entre 7 a 9 puntos turísticos, incluyendo Cristo Redentor, Escadaria Selarón, Pão de Açúcar, Mirante do Leblon y mucho más.",
    image: cristoImage,
    price: 100,
    duration: "8-10 horas",
    locations: ["Cristo Redentor", "Escadaria Selarón", "Pão de Açúcar", "Mirante do Leblon"],
    highlights: ["Transporte incluido", "Guía local", "Paradas fotográficas"],
    category: "City Tour",
    badge: "Más Popular",
    rating: 4.9,
  },
  {
    id: "favelas-tour",
    title: "Tour por las Favelas",
    description: "Vive la auténtica cultura carioca con recorridos guiados por las favelas más famosas de Río. Conoce su historia, su gente y sus miradores impresionantes.",
    image: favelaImage,
    price: 35,
    duration: "3-4 horas",
    locations: ["Rocinha", "Vidigal", "Tavares Bastos"],
    highlights: ["Experiencia cultural", "Guía local", "Miradores"],
    category: "Cultura",
    rating: 4.8,
  },
  {
    id: "playas-tour",
    title: "Tour por las Playas",
    description: "Explora las playas más icónicas: Copacabana, Ipanema, Joatinga, Prainha y Grumari. Ideal para disfrutar del sol, surf, paisajes naturales y fotos espectaculares.",
    image: beachImage,
    price: 80,
    duration: "6-8 horas",
    locations: ["Copacabana", "Ipanema", "Joatinga", "Prainha", "Grumari"],
    highlights: ["Playas paradisíacas", "Surf opcional", "Fotos espectaculares"],
    category: "Playa",
    rating: 4.7,
  },
  {
    id: "trekking",
    title: "Trilhas & Trekking",
    description: "Aventura garantizada en los morros más famosos de Río: Morro Dois Irmãos, Pedra Bonita, Pedra do Telégrafo, Pedra da Gávea. Guías especializados y vistas que te dejarán sin aliento.",
    image: trekkingImage,
    price: 50,
    priceNote: "Varía según ruta",
    duration: "4-6 horas",
    locations: ["Morro Dois Irmãos", "Pedra Bonita", "Pedra do Telégrafo", "Pedra da Gávea"],
    highlights: ["Guías especializados", "Seguridad", "Vistas increíbles"],
    category: "Aventura",
    badge: "Aventura",
    rating: 4.9,
  },
  {
    id: "boat-tour",
    title: "Paseos en Barco",
    description: "Disfruta un día en el paraíso navegando por Ilha Grande o Arraial do Cabo. Playas de aguas cristalinas, snorkel y paisajes de postal.",
    image: boatImage,
    price: 70,
    duration: "Día completo",
    locations: ["Ilha Grande", "Arraial do Cabo"],
    highlights: ["Transporte incluido", "Snorkel", "Almuerzo opcional"],
    category: "Acuático",
    rating: 4.8,
  },
  {
    id: "yacht-vip",
    title: "Paseo en Yate VIP",
    description: "Experiencia exclusiva por las costas de Barra da Tijuca y Copacabana. Música, bebidas, tripulación profesional y el mejor atardecer de Río.",
    image: yachtImage,
    price: 200,
    priceNote: "Por hora",
    duration: "Personalizable",
    locations: ["Barra da Tijuca", "Copacabana"],
    highlights: ["Tripulación profesional", "Bebidas incluidas", "Ideal para grupos"],
    category: "VIP",
    badge: "Exclusivo",
    rating: 5.0,
  },
  {
    id: "helicopter",
    title: "Paseo en Helicóptero",
    description: "Vive Río desde el cielo. Un vuelo panorámico sobre Cristo Redentor, Pan de Azúcar, playas y montañas. Experiencia premium con vistas únicas.",
    image: helicopterImage,
    price: 180,
    priceNote: "15 min vuelo",
    duration: "15-30 min",
    locations: ["Cristo Redentor", "Pan de Azúcar", "Playas"],
    highlights: ["Vuelo panorámico", "Video/fotos incluidas", "Experiencia premium"],
    category: "VIP",
    badge: "Premium",
    rating: 5.0,
  },
];

export function getPackageById(id: string): PackageData | undefined {
  return packages.find(pkg => pkg.id === id);
}

export function getPackageByTitle(title: string): PackageData | undefined {
  return packages.find(pkg => pkg.title === title);
}
