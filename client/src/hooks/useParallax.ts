import { useState, useEffect, useCallback } from "react";

interface ParallaxOptions {
  speed?: number;
  maxOffset?: number;
}

export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.3, maxOffset = 150 } = options;
  const [offset, setOffset] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleScroll = useCallback(() => {
    if (prefersReducedMotion) return;
    const scrollY = window.scrollY;
    const newOffset = Math.min(scrollY * speed, maxOffset);
    setOffset(newOffset);
  }, [speed, maxOffset, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setOffset(0);
      return;
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, prefersReducedMotion]);

  return offset;
}
