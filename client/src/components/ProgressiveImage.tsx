import { useState, useEffect, useRef, useCallback, memo } from "react";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  onClick?: () => void;
  onLoad?: () => void;
  style?: React.CSSProperties;
  "data-testid"?: string;
  "aria-hidden"?: boolean;
}

const ProgressiveImage = memo(function ProgressiveImage({
  src,
  alt,
  className = "",
  width,
  height,
  loading = "lazy",
  decoding = "async",
  onClick,
  onLoad,
  style,
  "data-testid": testId,
  "aria-hidden": ariaHidden,
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.01,
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isInView && imgRef.current) {
      if (imgRef.current.complete && imgRef.current.naturalWidth > 0) {
        handleLoad();
      }
    }
  }, [isInView, handleLoad]);

  const shouldLoad = loading === "eager" || isInView;

  return (
    <div
      ref={containerRef}
      className={`progressive-image-container ${isLoaded ? "loaded" : ""} ${hasError ? "error" : ""}`}
      style={{
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {shouldLoad && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding={decoding}
          onClick={onClick}
          onLoad={handleLoad}
          onError={handleError}
          data-testid={testId}
          aria-hidden={ariaHidden}
          className={`progressive-image ${isLoaded ? "progressive-loaded" : "progressive-loading"} ${className}`}
        />
      )}

      {!isLoaded && !hasError && (
        <div className="progressive-placeholder" aria-hidden="true">
          <div className="progressive-shimmer" />
        </div>
      )}

      <style>{`
        .progressive-image-container {
          background-color: hsl(var(--muted) / 0.3);
        }

        .progressive-image {
          transition: filter 0.4s ease-out, opacity 0.4s ease-out;
          will-change: filter, opacity;
        }

        .progressive-loading {
          filter: blur(8px);
          opacity: 0.7;
        }

        .progressive-loaded {
          filter: blur(0);
          opacity: 1;
        }

        .progressive-placeholder {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            hsl(var(--muted) / 0.3) 0%,
            hsl(var(--muted) / 0.5) 50%,
            hsl(var(--muted) / 0.3) 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .progressive-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            hsl(var(--background) / 0.4) 50%,
            transparent 100%
          );
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .progressive-image-container.loaded .progressive-placeholder {
          opacity: 0;
          pointer-events: none;
        }

        .progressive-image-container.error .progressive-placeholder {
          background: hsl(var(--muted) / 0.5);
        }
      `}</style>
    </div>
  );
});

export default ProgressiveImage;
