export interface TravelGuideArticle {
  id: string;
  category: "carnival" | "world" | "caribbean" | "rio" | "agency";
  readTime: number;
  author: string;
  imageUrl?: string;
  slug: string;
}

export const travelGuidesData: TravelGuideArticle[] = [
  {
    id: "carnival-rio",
    category: "carnival",
    readTime: 8,
    author: "Javier",
    slug: "carnaval-rio-logistica"
  },
  {
    id: "world-travel",
    category: "world",
    readTime: 10,
    author: "Ana",
    slug: "viajes-mundo-agencia"
  },
  {
    id: "caribbean-budget",
    category: "caribbean",
    readTime: 9,
    author: "Ricardo",
    slug: "caribe-vacaciones-inteligentes"
  },
  {
    id: "rio-soul",
    category: "rio",
    readTime: 10,
    author: "Sofia",
    slug: "alma-rio-de-janeiro"
  },
  {
    id: "agency-value",
    category: "agency",
    readTime: 8,
    author: "Brian",
    slug: "diferencia-rio-trip-vibes"
  }
];
