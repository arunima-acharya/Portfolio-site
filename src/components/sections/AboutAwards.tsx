"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const awards = [
  { title: "Best UX Design",        platform: "Awwwards" },
  { title: "Site of the Month",     platform: "Awwwards" },
  { title: "Design Spotlight",      platform: "Dribbble" },
  { title: "Honorable Mention",     platform: "CSS Design Awards" },
  { title: "Interaction Award",     platform: "Behance" },
];

export default function AboutAwards() {
  const { ref, isInView } = useScrollAnimation(0.1);

  return (
    <section
      className="py-24 md:py-32 border-b border-black/8"
      aria-labelledby="awards-heading"
      style={{
        marginLeft: "calc(-1 * var(--gutter))",
        marginRight: "calc(-1 * var(--gutter))",
        paddingLeft: "var(--gutter)",
        paddingRight: "var(--gutter)",
      }}
    >
      <div className="max-w-screen-xl mx-auto">
        <motion.span
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "11px",
            fontWeight: 500,
            color: "#888",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontFamily: "var(--font-inter), sans-serif",
            marginBottom: "36px",
          }}
        >
          ★ Awards &amp; Recognitions
        </motion.span>

        <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.45,
                delay: 0.05 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "22px 0",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)",
                  fontWeight: 700,
                  color: "#111",
                  letterSpacing: "-0.02em",
                  fontFamily: "var(--font-inter), sans-serif",
                  textTransform: "uppercase",
                }}
              >
                {award.title}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "#999",
                  fontFamily: "var(--font-inter), sans-serif",
                  letterSpacing: "0.04em",
                }}
              >
                {award.platform}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
