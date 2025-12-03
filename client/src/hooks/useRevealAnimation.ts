import { useReducedMotion } from "framer-motion";

export function useRevealAnimation() {
  const prefersReducedMotion = useReducedMotion();
  return { prefersReducedMotion };
}

export const revealVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const revealFromLeftVariants = {
  hidden: {
    opacity: 0,
    x: -30,
    y: 25,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const revealFromRightVariants = {
  hidden: {
    opacity: 0,
    x: 30,
    y: 25,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const fadeInVariants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const sectionRevealVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const whileInViewSettings = {
  once: false,
  amount: 0.2,
  margin: "-50px 0px",
};

export const reducedMotionVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};
