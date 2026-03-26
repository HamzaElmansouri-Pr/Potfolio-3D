"use client";

// src/hooks/useScrollReveal.ts
import { useEffect, useRef } from "react";
import { useInView, useAnimation } from "framer-motion";
import type { Variants } from "framer-motion";

/**
 * Returns a ref + Framer Motion controls.
 * Triggers the "visible" variant once the element enters the viewport.
 *
 * Usage:
 *   const { ref, controls } = useScrollReveal();
 *   <motion.div ref={ref} animate={controls} variants={fadeUpVariant} />
 */
export function useScrollReveal(threshold: number = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      void controls.start("visible");
    }
  }, [isInView, controls]);

  return { ref, controls };
}

/* ─── Preset Variants ─────────────────────────────────────────────────────── */
// NOTE: All ease values must be typed as const to satisfy Framer Motion v12's
//       strict Easing union type. Using "as const" on the object achieves this.

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export const staggerContainerVariant: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const slideInLeftVariant: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export const scaleInVariant: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};
