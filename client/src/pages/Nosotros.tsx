import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { usePageSEO } from "@/hooks/usePageSEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Award, 
  Globe, 
  Heart, 
  Target, 
  Eye,
  CheckCircle,
  MapPin,
  Star,
  Clock
} from "lucide-react";

const stats = [
  { value: "1000+", label: "Viajeros Satisfechos", icon: Users },
  { value: "13+", label: "Tours Disponibles", icon: MapPin },
  { value: "4.9", label: "Calificación Promedio", icon: Star },
  { value: "24/7", label: "Soporte al Cliente", icon: Clock },
];

const values = [
  {
    icon: Heart,
    title: "Pasión por Viajar",
    description: "Cada viaje es una oportunidad única para crear recuerdos inolvidables."
  },
  {
    icon: CheckCircle,
    title: "Experiencias Auténticas",
    description: "Tours diseñados para conocer la verdadera esencia de cada destino."
  },
  {
    icon: Users,
    title: "Atención Personalizada",
    description: "Cada cliente es único, y su viaje también debe serlo."
  },
  {
    icon: Award,
    title: "Calidad Garantizada",
    description: "Trabajamos solo con los mejores proveedores y guías locales."
  },
];

const team = [
  {
    role: "Fundador y Director",
    description: "Más de 10 años de experiencia en turismo internacional."
  },
  {
    role: "Guías Locales Certificados",
    description: "Expertos en cada destino, con conocimiento profundo de la cultura local."
  },
  {
    role: "Equipo de Atención",
    description: "Disponibles 24/7 para asistirte antes, durante y después de tu viaje."
  },
];

export default function Nosotros() {
  useScrollAnimation();
  
  usePageSEO({
    title: "Sobre Rio Trip Vibes | Agencia de Viajes Profesional",
    description: "Conoce la historia de Rio Trip Vibes. Agencia confiable con +1000 viajeros satisfechos. Tours en Río, Egipto y más destinos mundiales.",
    keywords: "travel agency, tour operator, professional travel services, agencia de viajes, operador turistico"
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
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-on-scroll">
              <Badge className="mb-4">Sobre Nosotros</Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                Rio Trip Vibes
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Agencia de viajes profesional especializada en experiencias auténticas 
                y tours personalizados en múltiples destinos mundiales.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center animate-on-scroll">
                  <CardContent className="p-6">
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="animate-on-scroll">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Nuestra Misión</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Ofrecer experiencias de viaje auténticas y memorables en múltiples destinos 
                    del mundo. Nos comprometemos a diseñar tours personalizados que conecten a 
                    nuestros viajeros con la cultura, la gente y las maravillas de cada lugar 
                    que visitan, garantizando siempre seguridad, calidad y un servicio excepcional.
                  </p>
                </CardContent>
              </Card>

              <Card className="animate-on-scroll">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Eye className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Nuestra Visión</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Ser la agencia de viajes preferida en Latinoamérica y Europa, reconocida 
                    por nuestra excelencia en servicio al cliente, tours innovadores y compromiso 
                    con el turismo responsable. Aspiramos a expandir nuestra presencia a nuevos 
                    destinos, manteniendo siempre la calidad que nos caracteriza.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mb-16 animate-on-scroll">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Nuestra Historia
                </h2>
                <p className="text-muted-foreground">
                  Una pasión convertida en profesión
                </p>
              </div>
              
              <Card>
                <CardContent className="p-6 md:p-8">
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Rio Trip Vibes nació de la pasión por los viajes y el deseo de compartir 
                      las maravillas de destinos únicos con viajeros de todo el mundo. Lo que 
                      comenzó como pequeños tours por Río de Janeiro, se ha convertido en una 
                      agencia de viajes profesional que opera en múltiples destinos.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Actualmente ofrecemos experiencias en <strong>Río de Janeiro, Brasil</strong> y 
                      <strong> Egipto</strong>, con planes de expansión a Europa, Asia y el Caribe. 
                      Cada tour está cuidadosamente diseñado para ofrecer una experiencia auténtica, 
                      combinando los sitios turísticos más emblemáticos con joyas ocultas que solo 
                      los locales conocen.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Con más de <strong>1000 viajeros satisfechos</strong> y una calificación 
                      promedio de <strong>4.9 estrellas</strong>, nos enorgullece ser la elección 
                      preferida de quienes buscan algo más que un simple tour turístico.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-16 animate-on-scroll">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Nuestros Valores
                </h2>
                <p className="text-muted-foreground">
                  Lo que nos define como agencia
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {values.map((value, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <value.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-16 animate-on-scroll">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Nuestro Equipo
                </h2>
                <p className="text-muted-foreground">
                  Profesionales apasionados por los viajes
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {team.map((member, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground text-center mb-2">
                        {member.role}
                      </h3>
                      <p className="text-sm text-muted-foreground text-center">
                        {member.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-16 animate-on-scroll">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Destinos Actuales
                </h2>
                <p className="text-muted-foreground">
                  Donde operamos actualmente
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <span className="font-medium">Río de Janeiro, Brasil</span>
                    <Badge className="bg-green-500/90 text-white">8 tours</Badge>
                  </CardContent>
                </Card>
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <span className="font-medium">Egipto</span>
                    <Badge className="bg-green-500/90 text-white">5 tours</Badge>
                  </CardContent>
                </Card>
                <Card className="border-dashed">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Europa</span>
                    <Badge variant="outline">Próximamente</Badge>
                  </CardContent>
                </Card>
                <Card className="border-dashed">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Asia</span>
                    <Badge variant="outline">Próximamente</Badge>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="text-center animate-on-scroll">
              <Card className="inline-block bg-primary/5 border-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    ¿Listo para tu próxima aventura?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Contáctanos y comienza a planificar el viaje de tus sueños.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      onClick={() => window.location.href = "/#packages"}
                      data-testid="button-explore-packages"
                    >
                      Explorar Paquetes
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => window.open("https://wa.me/584142823218", "_blank")}
                      data-testid="button-contact-whatsapp"
                    >
                      Contactar por WhatsApp
                    </Button>
                  </div>
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
