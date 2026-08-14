"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function AboutPhilosophy() {
  const { ref, isInView } = useScrollAnimation(0.15);

  return (
    <section
      className="py-24 md:py-32 border-b border-black/8"
      aria-labelledby="philosophy-heading"
      style={{
        marginLeft: "calc(-1 * var(--gutter))",
        marginRight: "calc(-1 * var(--gutter))",
        paddingLeft: "var(--gutter)",
        paddingRight: 0,
      }}
    >
      <div className="max-w-screen-xl ml-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "clamp(40px, 8vw, 100px)",
            alignItems: "center",
          }}
        >
          {/* Left — workspace image placeholder */}
          <div
            style={{
              aspectRatio: "4/3",
              borderRadius: "var(--radius-xl)",
              background: "linear-gradient(135deg, #d0d0d0 0%, #e8e8e8 40%, #c8cdd4 100%)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom right, rgba(255,255,255,0.3) 0%, transparent 60%, rgba(0,0,0,0.08) 100%)",
              }}
            />
          </div>

          {/* Right — text */}
          <div>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "11px",
                fontWeight: 500,
                color: "#888",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontFamily: "var(--font-manrope), sans-serif",
                marginBottom: "var(--spacing-20)",
              }}
            >
              ★ Design Philosophy
            </span>

            <h2
              id="philosophy-heading"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                fontFamily: "var(--font-manrope), sans-serif",
                margin: "0 0 20px",
              }}
            >
              <span style={{ color: "#bbb" }}>Simplicity.</span>
              <br />
              <span style={{ color: "#111" }}>Functionality.</span>
              <br />
              <span style={{ color: "#111" }}>Balance.</span>
            </h2>

            <p
              style={{
                fontSize: "clamp(0.875rem, 1.2vw, 0.95rem)",
                color: "#666",
                lineHeight: 1.75,
                fontFamily: "var(--font-manrope), sans-serif",
                margin: 0,
                maxWidth: "420px",
              }}
            >
              For me, design is about removing the unnecessary and focusing on what truly matters. A product should feel intuitive to use, communicate clearly, and reflect a brand&apos;s personality without distraction. I aim for simplicity, functionality, and balance — crafting digital experiences that are both engaging and effortless to navigate.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
