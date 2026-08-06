"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ToolsGrid from "./ToolsGrid";
import TestimonialsGrid from "./TestimonialsGrid";

// ToolsGrid stays pinned full-viewport while the extra scroll runway from
// this container's height (200vh) plays out; TestimonialsGrid rides that
// same scroll to slide in from the right and cover it, then both release
// together once the container scrolls past.
export default function ToolkitTestimonialsOverlap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // Reaches full coverage at 70% of the scroll through this section, then
  // holds there for the remaining 30% before releasing.
  const x = useTransform(scrollYProgress, [0, 0.7], ["100%", "0%"]);

  return (
    <div ref={containerRef} style={{ position: "relative", height: "200vh" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <ToolsGrid />
        </div>
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            x,
            boxShadow: "-24px 0 48px rgba(0,0,0,0.15)",
          }}
        >
          <TestimonialsGrid />
        </motion.div>
      </div>
    </div>
  );
}
