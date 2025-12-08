import { useState, useEffect, useRef, memo, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
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

interface FullscreenViewerProps {
  images: string[];
  currentIndex: number;
  alt: string;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onGoToSlide: (index: number) => void;
}

function FullscreenViewer({ 
  images, 
  currentIndex, 
  alt, 
  onClose, 
  onPrevious, 
  onNext,
}: FullscreenViewerProps) {
  const [startX, setStartX] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrevious();
      if (e.key === 'ArrowRight') onNext();
    };
    
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrevious, onNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        onNext();
      } else {
        onPrevious();
      }
    }
    setStartX(null);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black"
      onClick={onClose}
    >
      <style>{`
        @media (max-width: 640px) and (orientation: portrait) {
          .fullscreen-rotated {
            transform: rotate(90deg);
            transform-origin: center center;
            width: 100vh;
            height: 100vw;
            position: fixed;
            top: calc(50% - 50vw);
            left: calc(50% - 50vh);
          }
        }
      `}</style>
      
      <div 
        className="fullscreen-rotated w-full h-full flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 z-20 text-white bg-black/60 hover:bg-black/80 rounded-full"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          data-testid="fullscreen-close"
        >
          <X className="w-6 h-6" />
        </Button>
        
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <img
            src={images[currentIndex]}
            alt={`${alt} - ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain select-none"
            onClick={(e) => e.stopPropagation()}
            draggable={false}
            data-testid="fullscreen-image"
          />
        </div>
        
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-3 text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors"
          onClick={(e) => { e.stopPropagation(); onPrevious(); }}
          data-testid="fullscreen-prev"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-3 text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          data-testid="fullscreen-next"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-white text-sm bg-black/50 px-3 py-1.5 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const openFullscreen = useCallback(() => {
    setIsFullscreen(true);
  }, []);

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      <div className="relative w-full">
        <div 
          className="relative aspect-video w-full overflow-hidden rounded-lg cursor-pointer group"
          onClick={openFullscreen}
        >
          <ProgressiveCarouselMainImage
            src={images[currentIndex]}
            alt={`${alt} - ${currentIndex + 1}`}
            testId={`carousel-image-${currentIndex}`}
          />
          
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-80 transition-opacity" />
          </div>
          
          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-black/70 text-foreground hover:bg-white dark:hover:bg-black/90 rounded-full shadow-lg backdrop-blur-sm border border-white/20 w-10 h-10"
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                data-testid="carousel-prev"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-black/70 text-foreground hover:bg-white dark:hover:bg-black/90 rounded-full shadow-lg backdrop-blur-sm border border-white/20 w-10 h-10"
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                data-testid="carousel-next"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
              
              <div 
                className="absolute bottom-3 right-3 hidden sm:flex items-center gap-1.5 bg-black/60 text-white text-xs font-medium px-2.5 py-1.5 rounded-full backdrop-blur-sm"
                data-testid="carousel-counter"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>{currentIndex + 1} / {images.length}</span>
              </div>
            </>
          )}
        </div>
        
        {images.length > 1 && (
          <div className="hidden sm:flex gap-2 mt-3 overflow-x-auto pb-2 max-w-full scrollbar-thin">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all duration-200 ${
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
      
      {isFullscreen && (
        <FullscreenViewer
          images={images}
          currentIndex={currentIndex}
          alt={alt}
          onClose={closeFullscreen}
          onPrevious={goToPrevious}
          onNext={goToNext}
          onGoToSlide={goToSlide}
        />
      )}
    </>
  );
}
