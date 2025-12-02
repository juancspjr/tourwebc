import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@assets/generated_images/rio_panoramic_hero_view.png";

interface HeroSectionProps {
  onExploreClick?: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  const handleExploreClick = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const element = document.querySelector("#packages");
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6 animate-fade-in-up uppercase">
          Descubre tu próxima
          <span className="block text-accent">aventura</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Explora los destinos más increíbles del mundo y crea recuerdos inolvidables con nosotros.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Button
            size="lg"
            className="text-base px-8 bg-cta hover:bg-cta/90 text-cta-foreground"
            onClick={handleExploreClick}
            data-testid="button-explore-packages"
          >
            Explorar Paquetes
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-base px-8 bg-white/10 border-white/30 text-white hover:bg-white/20"
            onClick={() => window.open("https://wa.me/5521999999999", "_blank")}
            data-testid="button-whatsapp-hero"
          >
            Consulta por WhatsApp
          </Button>
        </div>
      </div>

      <button
        onClick={handleExploreClick}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce"
        aria-label="Scroll down"
        data-testid="button-scroll-down"
      >
        <ChevronDown className="w-10 h-10" />
      </button>
    </section>
  );
}
