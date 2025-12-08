import { useState, useEffect, useRef, memo, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLqipUrl } from "@/lib/lqip";

interface ProgressiveCarouselMainImageProps {
  src: string;
  alt: string;
  testId: string;
}

const ProgressiveCarouselMainImage = memo(function ProgressiveCarouselMainImage({
  src,
  alt,
  testId,
}: ProgressiveCarouselMainImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const lqipSrc = useMemo(() => getLqipUrl(src), [src]);
  
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    setIsLoaded(false);
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const shouldShowPlaceholder = lqipSrc && !isLoaded && !prefersReducedMotion;

  return (
    <div className="relative w-full h-full overflow-hidden">
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
        onLoad={handleLoad}
        className="w-full h-full object-cover"
        style={{ 
          opacity: isLoaded || prefersReducedMotion ? 1 : 0,
          transition: prefersReducedMotion ? 'none' : 'opacity 0.3s ease-out',
        }}
        data-testid={testId}
      />
    </div>
  );
});

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <ProgressiveCarouselMainImage
          src={images[currentIndex]}
          alt={`${alt} - ${currentIndex + 1}`}
          testId={`carousel-image-${currentIndex}`}
        />
        
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full"
              onClick={goToPrevious}
              data-testid="carousel-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full"
              onClick={goToNext}
              data-testid="carousel-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
            
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex 
                      ? "bg-white w-6" 
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  data-testid={`carousel-dot-${index}`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2 max-w-full scrollbar-thin">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-14 h-10 sm:w-16 sm:h-12 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                index === currentIndex 
                  ? "border-primary ring-2 ring-primary/30" 
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
              data-testid={`carousel-thumbnail-${index}`}
            >
              <img
                src={image}
                alt={`Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
