"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useResearchAccent } from "./ResearchAccent";

/* Slim scroll-progress bar pinned to the top of research articles. */
export default function ReadingProgress() {
  const accent = useResearchAccent();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: "0% 50%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 200,
        background: `linear-gradient(90deg, ${accent}, ${accent}cc)`,
        boxShadow: `0 0 12px ${accent}66`,
      }}
    />
  );
}
