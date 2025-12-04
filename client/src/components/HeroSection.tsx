import { useState, useEffect, useCallback, useLayoutEffect, useRef, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { getLqipUrl } from "@/lib/lqip";

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

const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
};

interface ProgressiveHeroImageProps {
  src: string;
  alt: string;
  isActive: boolean;
  isFirst: boolean;
  isPreloaded?: boolean;
  priority?: "high" | "low" | "auto";
}

const ProgressiveHeroImage = memo(function ProgressiveHeroImage({
  src,
  alt,
  isActive,
  isFirst,
  isPreloaded = false,
  priority = "auto",
}: ProgressiveHeroImageProps) {
  const [isLoaded, setIsLoaded] = useState(isPreloaded);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const lqipSrc = useMemo(() => getLqipUrl(src), [src]);
  
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const shouldShowPlaceholder = lqipSrc && !isLoaded && !prefersReducedMotion;

  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        opacity: isActive ? 1 : 0,
        zIndex: isActive ? 1 : 0,
        transition: prefersReducedMotion ? 'none' : 'opacity 0.8s ease-in-out',
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      {shouldShowPlaceholder && (
        <img
          src={lqipSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'blur(20px)', transform: 'scale(1.1)' }}
          aria-hidden="true"
        />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={1920}
        height={1080}
        loading={isFirst ? "eager" : "lazy"}
        decoding={isFirst ? "sync" : "async"}
        {...(priority !== "auto" && { fetchpriority: priority })}
        onLoad={handleLoad}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          opacity: isLoaded || prefersReducedMotion ? 1 : 0,
          transition: prefersReducedMotion ? 'none' : 'opacity 0.3s ease-out',
        }}
      />
    </div>
  );
});

interface HeroSectionProps {
  onExploreClick?: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set([0]));
  const { t } = useTranslation();

  // Asegurar que la página inicie en el Hero Section al cargar
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Precargar las siguientes imágenes cuando cambia el slide
  useEffect(() => {
    const nextIndex = (currentSlide + 1) % heroImages.length;
    const nextNextIndex = (currentSlide + 2) % heroImages.length;
    
    if (!preloadedImages.has(nextIndex)) {
      preloadImage(heroImages[nextIndex].src).then(() => {
        setPreloadedImages(prev => {
          const newSet = new Set(Array.from(prev));
          newSet.add(nextIndex);
          return newSet;
        });
      });
    }
    if (!preloadedImages.has(nextNextIndex)) {
      preloadImage(heroImages[nextNextIndex].src).then(() => {
        setPreloadedImages(prev => {
          const newSet = new Set(Array.from(prev));
          newSet.add(nextNextIndex);
          return newSet;
        });
      });
    }
  }, [currentSlide, preloadedImages]);

  // Escuchar evento para resetear el carrusel cuando se navega a "Inicio"
  useEffect(() => {
    const handleResetCarousel = () => {
      setCurrentSlide(0);
    };
    
    window.addEventListener('resetHeroCarousel', handleResetCarousel);
    return () => {
      window.removeEventListener('resetHeroCarousel', handleResetCarousel);
    };
  }, []);

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
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden scroll-mt-24"
    >
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <ProgressiveHeroImage
            key={index}
            src={image.src}
            alt={image.alt}
            isActive={index === currentSlide}
            isFirst={index === 0}
            priority={index === 0 ? "high" : "low"}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70 z-[2]" />

      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/10 md:bg-white/20 backdrop-blur-sm text-white transition-all duration-200 hover:bg-white/30 hover:scale-110 hidden sm:flex"
        aria-label={t('hero.prevSlide')}
        data-testid="button-carousel-prev"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/10 md:bg-white/20 backdrop-blur-sm text-white transition-all duration-200 hover:bg-white/30 hover:scale-110 hidden sm:flex"
        aria-label={t('hero.nextSlide')}
        data-testid="button-carousel-next"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-4 bg-white/60" : "w-1 bg-white/25 hover:bg-white/40"
            }`}
            aria-label={`${t('hero.goToSlide')} ${index + 1}`}
            data-testid={`button-carousel-indicator-${index}`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6 uppercase">
          {t('hero.title1')}
          <span className="block text-accent">{t('hero.title2')}</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-2">
          {t('hero.subtitle1')}
        </p>
        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8">
          {t('hero.subtitle2')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="text-base px-8 bg-cta hover:bg-cta/90 text-cta-foreground transition-all duration-300 hover:scale-103 hover:shadow-lg"
            onClick={handleExploreClick}
            data-testid="button-explore-packages"
          >
            {t('hero.explorePackages')}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-base px-8 bg-white/10 border-white/30 text-white hover:bg-white/20 transition-all duration-300 hover:scale-103 hover:shadow-lg"
            onClick={() => window.open("https://wa.me/5521983526144", "_blank")}
            data-testid="button-whatsapp-hero"
          >
            {t('hero.bookNow')}
          </Button>
        </div>
      </div>

      <button
        onClick={handleExploreClick}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce z-10"
        aria-label="Scroll down"
        data-testid="button-scroll-down"
      >
        <ChevronDown className="w-10 h-10" />
      </button>
    </section>
  );
}
