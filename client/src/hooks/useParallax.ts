import { useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ParallaxOptions {
  speed?: number;
  maxOffset?: number;
  direction?: "up" | "down";
}

interface ParallaxReturn {
  ref: React.RefObject<HTMLElement>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
}

export function useParallax(options: ParallaxOptions = {}): ParallaxReturn {
  const { speed = 0.25, maxOffset = 120, direction = "up" } = options;
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollY } = useScroll();

  const yRange = direction === "up" ? [0, maxOffset] : [0, -maxOffset];
  
  const y = useTransform(
    scrollY,
    [0, maxOffset / speed],
    prefersReducedMotion ? [0, 0] : yRange
  );

  const scale = useTransform(
    scrollY,
    [0, maxOffset / speed],
    prefersReducedMotion ? [1, 1] : [1.1, 1.15]
  );

  return { ref, y, scale };
}
