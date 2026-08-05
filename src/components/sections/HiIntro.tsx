"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import VariableProximity from "@/components/ui/VariableProximity";
import { useIsMobile } from "@/hooks/useIsMobile";
import CursorFollower from "@/components/ui/CursorFollower";

const HEADING = "I'm Arunima Acharya, a Product Designer specializing in creating intuitive digital experiences based in New Delhi, India.";

export default function HiIntro() {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  return (
    <section
      ref={containerRef}
      style={{
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "calc(55vh - 105px)",
        paddingBottom: "16vh",
        marginLeft: "calc(-1 * var(--gutter))",
        marginRight: "calc(-1 * var(--gutter))",
        paddingLeft: "10%",
        paddingRight: "10%",
        position: "relative",
      }}
    >

      {/* Left: text content */}
      <div style={{ display: "flex", flexDirection: "column", maxWidth: "40%", flex: "0 0 auto" }}>

      {/* Heading with variable font proximity animation */}
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: "38px",
          fontWeight: 400,
          fontFamily: "var(--font-inter), sans-serif",
          color: "#111",
          lineHeight: 1.5,
          letterSpacing: "-0.02em",
          margin: 0,
          marginBottom: "32px",
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      >
        <VariableProximity
          label={HEADING}
          containerRef={containerRef}
          fromFontVariationSettings="'wght' 400, 'opsz' 14"
          toFontVariationSettings="'wght' 800, 'opsz' 40"
          radius={160}
          falloff="gaussian"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        />
      </motion.h1>

      {/* Sub-paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: isMobile ? "0.875rem" : "clamp(0.875rem, 1.2vw, 1rem)",
          color: "#666",
          lineHeight: 1.7,
          fontFamily: "var(--font-inter), sans-serif",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          margin: 0,
        }}
      >
        Leveraging insights in user psychology and design principles, my approach enhances functionality with visual elegance, crafting intuitive digital products that people love to use.
      </motion.p>

      </div>

      {/* Right: cursor-following robot character */}
      {!isMobile && (
        <CursorFollower
          src="/IMAGE.png"
          alt="Mainframe mascot"
          width={340}
          lerp={0.07}
          maxOffset={30}
        />
      )}
    </section>
  );
}
