import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PackageImageCarouselProps {
  images: string[];
  packageTitle: string;
  onImageClick: () => void;
}

export default function PackageImageCarousel({
  images,
  packageTitle,
  onImageClick,
}: PackageImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isPaused = isHovered || isFocused;

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const previousImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused || images.length <= 1) return;

    const interval = setInterval(() => {
      nextImage();
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, nextImage, images.length]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      previousImage();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextImage();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onImageClick();
    }
  };

  const carouselId = packageTitle.toLowerCase().replace(/\s+/g, "-");

  return (
    <div
      ref={containerRef}
      className="package-carousel-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`Carrusel de imágenes de ${packageTitle}`}
      aria-roledescription="carousel"
      data-testid={`carousel-${carouselId}`}
    >
      <div
        className="package-carousel-image-wrapper"
        onClick={onImageClick}
        role="button"
        aria-label={`Ver detalles de ${packageTitle}`}
        data-testid={`button-carousel-view-${carouselId}`}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${packageTitle} - imagen ${index + 1}`}
            className={`package-carousel-image ${
              index === currentIndex ? "active" : ""
            }`}
            aria-hidden={index !== currentIndex}
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            className="package-carousel-arrow package-carousel-arrow-left"
            onClick={(e) => {
              e.stopPropagation();
              previousImage();
            }}
            aria-label="Imagen anterior"
            data-testid={`button-carousel-prev-${carouselId}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            className="package-carousel-arrow package-carousel-arrow-right"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            aria-label="Siguiente imagen"
            data-testid={`button-carousel-next-${carouselId}`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div 
            className="package-carousel-dots" 
            role="tablist"
            aria-label="Indicadores de imagen"
            data-testid={`carousel-dots-${carouselId}`}
          >
            {images.map((_, index) => (
              <button
                key={index}
                className={`package-carousel-dot ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  goToImage(index);
                }}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Ir a imagen ${index + 1}`}
                data-testid={`button-dot-${carouselId}-${index}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
