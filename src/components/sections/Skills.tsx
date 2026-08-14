"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const SKILLS = [
  { num: "01", name: "UX Research",                description: "Understanding user behavior, needs, and motivations before making design decisions." },
  { num: "02", name: "Design Systems",             description: "Building scalable design systems that ensure consistency and efficiency across products." },
  { num: "03", name: "Interaction Design",         description: "Crafting intuitive interactions that make complex tasks feel effortless." },
  { num: "04", name: "Visual Design",              description: "Typography, color, and composition that communicate with clarity and elegance." },
  { num: "05", name: "Prototyping",                description: "High-fidelity prototypes that simulate the real product experience for testing and buy-in." },
  { num: "06", name: "User Testing",               description: "Moderated and unmoderated testing that validates decisions before shipping." },
  { num: "07", name: "Design Strategy",            description: "Aligning design with business goals, user needs, and technical constraints." },
  { num: "08", name: "Information Architecture",   description: "Structuring content and navigation so users always know where they are." },
  { num: "09", name: "Stakeholder Communication",  description: "Aligning goals, sharing insights, and driving projects forward together." },
  { num: "10", name: "Design Leadership",          description: "Mentoring teams, establishing process, and building a culture of craft." },
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const { theme } = useTheme();
  const isLight = theme === "light";

  const textPrimary = isLight ? "#111" : "#f0f0f0";
  const textMuted   = isLight ? "#999" : "rgba(255,255,255,0.4)";
  const cardBg      = isLight ? "#fff" : "#1a1a1a";
  const cardBorder  = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.07)";
  const numColor    = isLight ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.08)";
  const divider     = isLight ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.07)";

  return (
    <section
      style={{
        marginLeft: "calc(-1 * var(--gutter))",
        marginRight: "calc(-1 * var(--gutter))",
        paddingLeft: "var(--gutter)",
        paddingRight: "var(--gutter)",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
      aria-labelledby="skills-heading"
    >
      {/* Section header */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: "var(--spacing-48)" }}
      >
        <span
          id="skills-heading"
          style={{
            fontSize: "9.5px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: textMuted,
            fontFamily: "var(--font-inter), sans-serif",
            display: "block",
            marginBottom: "14px",
          }}
        >
          Expertise
        </span>
        <h2
          style={{
            fontSize: "clamp(28px, 3vw, 42px)",
            fontWeight: 400,
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
            color: textPrimary,
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          The way I build products.
        </h2>
      </motion.div>

      {/* 3-column grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill.num}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            whileHover="hovered"
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: cardBg,
              border: `1px solid ${cardBorder}`,
              borderRadius: "var(--radius-2xl)",
              padding: "var(--spacing-24)",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              boxShadow: isLight
                ? "0 2px 12px rgba(0,0,0,0.04)"
                : "0 2px 12px rgba(0,0,0,0.2)",
              position: "relative",
              overflow: "hidden",
              cursor: "default",
            }}
            variants={{
              hovered: {
                borderColor: isLight ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.16)",
                boxShadow: isLight
                  ? "0 8px 32px rgba(0,0,0,0.10)"
                  : "0 8px 32px rgba(0,0,0,0.4)",
                y: -3,
                transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {/* Orange accent dot — appears on hover */}
            <motion.div
              variants={{
                hovered: { scale: 1, opacity: 1, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
              }}
              initial={{ scale: 0.4, opacity: 0 }}
              style={{
                position: "absolute",
                top: 22,
                right: 22,
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#F26A21",
                border: "3px solid",
                borderColor: isLight ? "#fff" : cardBg,
                pointerEvents: "none",
              }}
            />

            {/* Number + divider */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  color: numColor,
                  fontFamily: "var(--font-inter), sans-serif",
                  lineHeight: 1,
                }}
              >
                {skill.num}
              </span>
              <div style={{ flex: 1, height: 1, background: divider }} />
              <span
                style={{
                  fontSize: "11px",
                  color: textMuted,
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                / 10
              </span>
            </div>

            {/* Name */}
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "-0.025em",
                color: textPrimary,
                fontFamily: "var(--font-inter), sans-serif",
                lineHeight: 1.25,
              }}
            >
              {skill.name}
            </h3>

          </motion.div>
        ))}
      </div>
    </section>
  );
}
