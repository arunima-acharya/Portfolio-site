"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import TiltedCard from "@/components/ui/TiltedCard";

export default function DashboardShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawScale = useTransform(scrollYProgress, [0, 0.35, 0.7], [0.82, 1, 1]);
  const rawY = useTransform(scrollYProgress, [0, 0.35], [60, 0]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const scale = useSpring(rawScale, { stiffness: 60, damping: 20, mass: 0.8 });
  const y = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.8 });

  return (
    <section
      ref={sectionRef}
      style={{
        marginLeft: "calc(-1 * var(--gutter))",
        marginRight: "calc(-1 * var(--gutter))",
        paddingTop: "20px",
        paddingBottom: "30px",
        paddingLeft: "var(--gutter)",
        paddingRight: "var(--gutter)",
        position: "relative",
        overflow: "hidden",
        background: "transparent",
      }}
    >

      {/* Dashboard image */}
      <motion.div
        style={{
          scale,
          y: parallaxY,
          opacity: rawOpacity,
          position: "relative",
          zIndex: 1,
          width: "100%",
        }}
      >
        <TiltedCard
          imageSrc="/Page.png"
          altText="Revenue Performance Dashboard — Hotelogix"
          captionText="Finexy Dashboard"
          containerWidth="100%"
          containerHeight="auto"
          imageWidth="100%"
          imageHeight="auto"
          rotateAmplitude={10}
          scaleOnHover={1.03}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={false}
        />

      </motion.div>
    </section>
  );
}
