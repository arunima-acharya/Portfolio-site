"use client";

import { useRef } from "react";
import { useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";

/**
 * Ties an element's vertical offset to how far its own ref has scrolled
 * through the viewport — from `distance` px above rest position when the
 * element is just entering at the bottom, through 0 at center, to
 * `-distance` px when it's about to leave at the top. Springed so the
 * motion trails the scroll slightly instead of tracking it 1:1.
 */
export function useParallax(distance = 60) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(rawY, { stiffness: 200, damping: 40, mass: 0.6 });
  return { ref, y } as { ref: React.RefObject<HTMLDivElement | null>; y: MotionValue<number> };
}
