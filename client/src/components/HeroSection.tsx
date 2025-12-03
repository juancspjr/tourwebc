import { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import rio1Image from "@assets/rio1_1764724064822.webp";
import rio3Image from "@assets/rio3_1764724064822.webp";
import rio4Image from "@assets/rio4_1764724064822.webp";
import egipto1Image from "@assets/egipto1_1764724064822.webp";
import egipt2Image from "@assets/egipt2_1764724064822.webp";

const heroImages = [
  { src: rio1Image, alt: "Cristo Redentor - Río de Janeiro" },
  { src: rio3Image, alt: "Pan de Azúcar - Río de Janeiro" },
  { src: rio4Image, alt: "Atardecer en Ipanema" },
  { src: egipt2Image, alt: "Esfinge y Pirámides de Giza" },
  { src: egipto1Image, alt: "Templo de Edfu" },
];

interface HeroSectionProps {
  onExploreClick?: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollY } = useScroll();
  
  const backgroundY = useTransform(
    scrollY,
    [0, 500],
    prefersReducedMotion ? [0, 0] : [0, 120]
  );
  
  const backgroundScale = useTransform(
    scrollY,
    [0, 500],
    prefersReducedMotion ? [1.1, 1.1] : [1.1, 1.18]
  );

  const handleExploreClick = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const element = document.querySelector("#packages");
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0"
        style={{
          y: backgroundY,
          scale: backgroundScale,
          willChange: "transform",
        }}
      >
        {heroImages.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: index === currentSlide ? 1 : 0,
              zIndex: index === currentSlide ? 1 : 0,
            }}
          />
        ))}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70 z-[2]" />

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white transition-all duration-200 hover:bg-white/30 hover:scale-110"
        aria-label="Slide anterior"
        data-testid="button-carousel-prev"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white transition-all duration-200 hover:bg-white/30 hover:scale-110"
        aria-label="Siguiente slide"
        data-testid="button-carousel-next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Ir a slide ${index + 1}`}
            data-testid={`button-carousel-indicator-${index}`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6 uppercase"
        >
          Descubre tu próxima
          <span className="block text-accent">aventura</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-2"
        >
          Explora los destinos más increíbles del mundo
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8"
        >
          y crea recuerdos inolvidables con nosotros.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Button
              size="lg"
              className="text-base px-8 bg-cta hover:bg-cta/90 text-cta-foreground transition-all duration-300 hover:scale-103 hover:shadow-lg"
              onClick={handleExploreClick}
              data-testid="button-explore-packages"
            >
              Explorar Paquetes
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 bg-white/10 border-white/30 text-white hover:bg-white/20 transition-all duration-300 hover:scale-103 hover:shadow-lg"
              onClick={() => window.open("https://wa.me/584142823218", "_blank")}
              data-testid="button-whatsapp-hero"
            >
              Reservar Ahora
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        onClick={handleExploreClick}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce z-10"
        aria-label="Scroll down"
        data-testid="button-scroll-down"
      >
        <ChevronDown className="w-10 h-10" />
      </motion.button>
    </section>
  );
}
