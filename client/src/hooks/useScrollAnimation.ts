import { useRef, useState, useEffect, useCallback, RefObject } from "react";

export interface ScrollAnimationState {
  progress: number;
  isInView: boolean;
  isExiting: boolean;
  isEntering: boolean;
  prefersReducedMotion: boolean;
  containerStyle: React.CSSProperties;
  innerStyle: React.CSSProperties;
}

interface UseScrollAnimationOptions {
  intensity?: "full" | "soft" | "subtle";
}

function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function useScrollAnimation<T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
): [RefObject<T | null>, ScrollAnimationState] {
  const { intensity = "full" } = options;
  const ref = useRef<T | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastProgressRef = useRef<number>(0.5);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const [state, setState] = useState<ScrollAnimationState>({
    progress: 0.5,
    isInView: true,
    isExiting: false,
    isEntering: false,
    prefersReducedMotion: false,
    containerStyle: {},
    innerStyle: {},
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    setPrefersReducedMotion(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const calculateStyles = useCallback((progress: number, isExiting: boolean) => {
    const configs = {
      full: { maxTranslateY: 60, maxScale: 0.85, maxRotateX: 4 },
      soft: { maxTranslateY: 40, maxScale: 0.9, maxRotateX: 2 },
      subtle: { maxTranslateY: 25, maxScale: 0.95, maxRotateX: 1 },
    };
    const config = configs[intensity];

    if (progress <= 0.5) {
      const enterProgress = progress * 2;
      const easedProgress = easeOutCubic(enterProgress);
      return {
        containerStyle: {
          opacity: lerp(0, 1, easedProgress),
          transform: `translateY(${lerp(30, 0, easedProgress)}px) scale(${lerp(0.95, 1, easedProgress)}) rotateX(${lerp(3, 0, easedProgress)}deg)`,
          transformOrigin: "center center",
        },
        innerStyle: {
          opacity: lerp(0, 1, easedProgress),
          transform: `translateY(${lerp(15, 0, easedProgress)}px)`,
        },
      };
    } else {
      const exitProgress = (progress - 0.5) * 2;
      const acceleratedInnerExit = Math.pow(exitProgress, 0.5);
      return {
        containerStyle: {
          opacity: lerp(1, 0, exitProgress),
          transform: `translateY(${lerp(0, config.maxTranslateY, exitProgress)}px) scale(${lerp(1, config.maxScale, exitProgress)}) rotateX(${lerp(0, config.maxRotateX, exitProgress)}deg)`,
          transformOrigin: "center top",
        },
        innerStyle: {
          opacity: clamp(lerp(1, 0, acceleratedInnerExit * 1.5), 0, 1),
          transform: `translateY(${lerp(0, 30, acceleratedInnerExit)}px) scale(${lerp(1, 0.95, acceleratedInnerExit)})`,
        },
      };
    }
  }, [intensity]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setState({
        progress: 0.5,
        isInView: true,
        isExiting: false,
        isEntering: false,
        prefersReducedMotion: true,
        containerStyle: {},
        innerStyle: {},
      });
      return;
    }

    const calculateProgress = () => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      const elementCenter = rect.top + elementHeight / 2;
      const viewportCenter = windowHeight / 2;

      let progress = 0;
      let isInView = false;
      let isExiting = false;
      let isEntering = false;

      if (rect.bottom < 0 || rect.top > windowHeight) {
        progress = rect.bottom < 0 ? 1 : 0;
        isInView = false;
      } else {
        isInView = true;
        if (elementCenter > viewportCenter) {
          const distanceFromBottom = windowHeight - rect.top;
          const enterRange = windowHeight * 0.8;
          progress = clamp(distanceFromBottom / enterRange, 0, 0.5);
          isEntering = true;
        } else {
          const distanceFromTop = rect.bottom;
          const exitRange = windowHeight * 0.7;
          const exitProgress = 1 - clamp(distanceFromTop / exitRange, 0, 1);
          progress = 0.5 + exitProgress * 0.5;
          isExiting = exitProgress > 0.1;
        }
      }

      const smoothProgress = lerp(lastProgressRef.current, progress, 0.12);
      lastProgressRef.current = smoothProgress;

      const styles = calculateStyles(smoothProgress, isExiting);

      setState({
        progress: smoothProgress,
        isInView,
        isExiting,
        isEntering,
        prefersReducedMotion: false,
        containerStyle: styles.containerStyle,
        innerStyle: styles.innerStyle,
      });
    };

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(calculateProgress);
    };

    calculateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [calculateStyles, prefersReducedMotion]);

  return [ref, state];
}

export function getStaggerStyle(
  progress: number,
  index: number,
  totalItems: number,
  prefersReducedMotion: boolean = false,
  staggerDelay: number = 0.04
): React.CSSProperties {
  if (prefersReducedMotion) return {};

  if (progress <= 0.5) {
    const delay = index * staggerDelay;
    const adjustedProgress = clamp((progress - delay / 2), 0, 0.5);
    const enterProgress = adjustedProgress * 2;
    const easedProgress = easeOutCubic(enterProgress);
    return {
      opacity: lerp(0, 1, easedProgress),
      transform: `translateY(${lerp(20, 0, easedProgress)}px)`,
    };
  } else {
    const exitProgress = (progress - 0.5) * 2;
    const exitDelay = index * staggerDelay * 0.8;
    const adjustedExitProgress = clamp(exitProgress + exitDelay, 0, 1);
    const acceleratedExit = Math.pow(adjustedExitProgress, 0.6);
    
    return {
      opacity: clamp(lerp(1, 0, acceleratedExit * 1.6), 0, 1),
      transform: `translateY(${lerp(0, 25, acceleratedExit)}px)`,
    };
  }
}
