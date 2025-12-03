import { Link } from "wouter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { usePageSEO } from "@/hooks/usePageSEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ArrowRight, Plane, Clock } from "lucide-react";

import rio1Image from "@assets/rio1_1764724064822.webp";
import egipto1Image from "@assets/egipto1_1764724064822.webp";

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  tours: number;
  rating: number;
  status: "available" | "coming_soon" | "in_progress";
  description: string;
  highlights: string[];
}

const destinations: Destination[] = [
  {
    id: "rio-de-janeiro",
    name: "Rio de Janeiro",
    country: "Brasil",
    image: rio1Image,
    tours: 8,
    rating: 4.9,
    status: "available",
    description: "La ciudad maravillosa te espera con playas paradisiacas, el icónico Cristo Redentor y una cultura vibrante.",
    highlights: ["Cristo Redentor", "Pan de Azúcar", "Copacabana", "Favelas"]
  },
  {
    id: "egipto",
    name: "Egipto",
    country: "Egipto",
    image: egipto1Image,
    tours: 5,
    rating: 4.8,
    status: "available",
    description: "Descubre los misterios de los faraones, las majestuosas pirámides y el legendario río Nilo.",
    highlights: ["Pirámides de Giza", "Templo de Luxor", "Valle de los Reyes", "Crucero por el Nilo"]
  },
  {
    id: "europa",
    name: "Europa",
    country: "Múltiples países",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
    tours: 0,
    rating: 0,
    status: "in_progress",
    description: "Próximamente tours por las ciudades más emblemáticas del viejo continente.",
    highlights: ["París", "Roma", "Barcelona", "Ámsterdam"]
  },
  {
    id: "asia",
    name: "Asia",
    country: "Múltiples países",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800",
    tours: 0,
    rating: 0,
    status: "in_progress",
    description: "Experiencias únicas en templos ancestrales, ciudades modernas y paisajes exóticos.",
    highlights: ["Tailandia", "Japón", "Vietnam", "Indonesia"]
  },
  {
    id: "caribe",
    name: "Caribe",
    country: "Múltiples islas",
    image: "https://images.unsplash.com/photo-1580541631950-7282082b53ce?w=800",
    tours: 0,
    rating: 0,
    status: "coming_soon",
    description: "Playas de ensueño, aguas cristalinas y el paraíso tropical que siempre soñaste.",
    highlights: ["Cancún", "Punta Cana", "Aruba", "Jamaica"]
  }
];

const getStatusBadge = (status: Destination["status"]) => {
  switch (status) {
    case "available":
      return <Badge className="bg-green-500/90 text-white">Disponible</Badge>;
    case "in_progress":
      return <Badge variant="secondary">En construcción</Badge>;
    case "coming_soon":
      return <Badge variant="outline">Próximamente</Badge>;
  }
};

export default function Destinos() {
  useScrollAnimation();
  
  usePageSEO({
    title: "Destinos de Viaje | Tours Mundiales | Rio Trip Vibes",
    description: "Explora tours en Río, Egipto y más. Agencia de viajes profesional con +1000 clientes satisfechos. Paquetes personalizados a destinos mundiales.",
    keywords: "travel destinations, worldwide tours, international travel agency, vacation packages, tours rio de janeiro, tours egipto, agencia de viajes"
  });

  const handleNavigate = (section: string) => {
    if (section.startsWith("#")) {
      window.location.href = "/" + section;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} />
      
      <main>
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-on-scroll">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Plane className="w-6 h-6 text-primary" />
                <span className="text-primary font-medium">Explora el Mundo</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                Nuestros Destinos
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Descubre tours auténticos en los destinos más increíbles del mundo. 
                Agencia de viajes profesional con más de 1000 clientes satisfechos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((destination) => (
                <Card 
                  key={destination.id} 
                  className="overflow-hidden group animate-on-scroll"
                  data-testid={`card-destination-${destination.id}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 right-3">
                      {getStatusBadge(destination.status)}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                      <div className="flex items-center gap-1 text-white/80 text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>{destination.country}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <p className="text-muted-foreground text-sm mb-4">
                      {destination.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {destination.highlights.map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between gap-2 pt-3 border-t border-border">
                      <div className="flex items-center gap-4 text-sm">
                        {destination.status === "available" && (
                          <>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">{destination.tours} tours</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-medium">{destination.rating}</span>
                            </div>
                          </>
                        )}
                        {destination.status !== "available" && (
                          <span className="text-muted-foreground italic">Pronto disponible</span>
                        )}
                      </div>
                      
                      {destination.status === "available" ? (
                        <Link href="/#packages">
                          <Button size="sm" className="gap-1" data-testid={`button-view-tours-${destination.id}`}>
                            Ver Tours
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      ) : (
                        <Button size="sm" variant="outline" disabled>
                          Próximamente
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12 animate-on-scroll">
              <Card className="inline-block bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <p className="text-foreground mb-2">
                    ¿No encuentras tu destino ideal?
                  </p>
                  <p className="text-muted-foreground text-sm mb-4">
                    Contáctanos y diseñaremos un viaje personalizado para ti.
                  </p>
                  <Button 
                    onClick={() => window.open("https://wa.me/584142823218", "_blank")}
                    className="bg-green-500 hover:bg-green-600 text-white"
                    data-testid="button-contact-whatsapp"
                  >
                    Consultar por WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
