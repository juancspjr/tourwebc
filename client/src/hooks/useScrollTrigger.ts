import { useRef, useState, useEffect, useCallback, useMemo } from "react";

export interface IntersectionTriggerOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delay?: number;
}

export function useIntersectionTrigger(options: IntersectionTriggerOptions = {}) {
  const { once = true, delay = 0, threshold = 0.15, rootMargin = "0px 0px 60px 0px" } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [once, delay, prefersReducedMotion, threshold, rootMargin]);

  return [ref, isVisible, prefersReducedMotion] as const;
}

export function useStaggeredAnimation(itemCount: number, baseDelay = 0, staggerDelay = 80) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      const allItems = new Set(Array.from({ length: itemCount }, (_, i) => i));
      setVisibleItems(allItems);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          for (let i = 0; i < itemCount; i++) {
            const timeout = setTimeout(() => {
              setVisibleItems(prev => {
                const newSet = new Set(prev);
                newSet.add(i);
                return newSet;
              });
            }, baseDelay + i * staggerDelay);
            timeoutsRef.current.push(timeout);
          }
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px 80px 0px" }
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [itemCount, baseDelay, staggerDelay, prefersReducedMotion]);

  const isItemVisible = useCallback((index: number) => visibleItems.has(index), [visibleItems]);

  return { containerRef, isItemVisible, prefersReducedMotion };
}

export function useParallax(speed = 0.3, maxOffset = 50) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;

    const updateParallax = () => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const newOffset = Math.min(maxOffset, Math.max(-maxOffset, (progress - 0.5) * 2 * speed * maxOffset));
        setOffset(newOffset);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateParallax();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, maxOffset, prefersReducedMotion]);

  return { ref, offset, prefersReducedMotion };
}

export function useCountUp(
  end: number,
  isVisible: boolean,
  duration = 2000,
  start = 0
) {
  const [count, setCount] = useState(start);
  const animationRef = useRef<number | null>(null);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(start + (end - start) * easeOutQuart));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, end, duration, start, prefersReducedMotion]);

  return count;
}
