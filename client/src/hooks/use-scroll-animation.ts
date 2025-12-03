import { useEffect, useRef, useState, useCallback } from "react";

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  staggerDelay?: number;
  animationType?: "full" | "soft";
}

interface ScrollAnimationState {
  isVisible: boolean;
  hasAnimated: boolean;
  isExiting: boolean;
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = false,
    staggerDelay = 0.08,
    animationType = "full",
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<ScrollAnimationState>({
    isVisible: false,
    hasAnimated: false,
    isExiting: false,
  });

  const prefersReducedMotion = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (prefersReducedMotion()) {
      setState({ isVisible: true, hasAnimated: true, isExiting: false });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setState((prev) => ({
              isVisible: true,
              hasAnimated: true,
              isExiting: false,
            }));
          } else if (!triggerOnce) {
            const boundingRect = entry.boundingClientRect;
            const isAboveViewport = boundingRect.bottom < 0;
            const isBelowViewport = boundingRect.top > window.innerHeight;
            
            setState((prev) => ({
              ...prev,
              isVisible: false,
              isExiting: isAboveViewport,
            }));
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, prefersReducedMotion]);

  const getAnimationClass = useCallback(
    (index: number = 0) => {
      if (prefersReducedMotion()) {
        return "scroll-anim-reduced";
      }

      const delay = index * staggerDelay;
      const baseClass = animationType === "full" ? "scroll-anim-full" : "scroll-anim-soft";

      if (state.isVisible) {
        return `${baseClass} scroll-anim-enter`;
      } else if (state.isExiting) {
        return `${baseClass} scroll-anim-exit`;
      } else if (state.hasAnimated) {
        return `${baseClass} scroll-anim-hidden`;
      }
      
      return `${baseClass} scroll-anim-initial`;
    },
    [state, staggerDelay, animationType, prefersReducedMotion]
  );

  const getAnimationStyle = useCallback(
    (index: number = 0) => {
      if (prefersReducedMotion()) {
        return {};
      }
      
      return {
        "--stagger-delay": `${index * staggerDelay}s`,
      } as React.CSSProperties;
    },
    [staggerDelay, prefersReducedMotion]
  );

  return {
    ref,
    ...state,
    getAnimationClass,
    getAnimationStyle,
    prefersReducedMotion: prefersReducedMotion(),
  };
}

export function useScrollAnimationGroup(options: ScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -80px 0px",
    staggerDelay = 0.08,
    animationType = "full",
  } = options;

  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const prefersReducedMotion = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    if (prefersReducedMotion()) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setIsExiting(false);
          } else {
            const boundingRect = entry.boundingClientRect;
            const isAboveViewport = boundingRect.bottom < 0;
            
            setIsVisible(false);
            setIsExiting(isAboveViewport);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, prefersReducedMotion]);

  const getItemClass = useCallback(
    (index: number = 0) => {
      if (prefersReducedMotion()) {
        return "scroll-item-reduced";
      }

      const baseClass = animationType === "full" ? "scroll-item-full" : "scroll-item-soft";

      if (isVisible) {
        return `${baseClass} scroll-item-enter`;
      } else if (isExiting) {
        return `${baseClass} scroll-item-exit`;
      }
      
      return `${baseClass} scroll-item-initial`;
    },
    [isVisible, isExiting, animationType, prefersReducedMotion]
  );

  const getItemStyle = useCallback(
    (index: number = 0) => {
      if (prefersReducedMotion()) {
        return {};
      }
      
      return {
        "--stagger-delay": `${index * staggerDelay}s`,
        transitionDelay: `${index * staggerDelay}s`,
      } as React.CSSProperties;
    },
    [staggerDelay, prefersReducedMotion]
  );

  return {
    containerRef,
    isVisible,
    isExiting,
    getItemClass,
    getItemStyle,
    prefersReducedMotion: prefersReducedMotion(),
  };
}
