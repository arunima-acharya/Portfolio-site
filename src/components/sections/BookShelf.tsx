"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const books = [
  {
    slug: "finflow-banking-app",
    number: "01",
    spineLabel: "FINFLOW",
    spineSubLabel: "Banking App",
    coverTitle: "FinFlow\nBanking App",
    category: "Mobile · FinTech",
    year: "2024",
    description:
      "Reimagined personal finance for 2M+ millennials through behavioral design and intelligent nudges.",
    outcome: "↑ 40% DAU · NPS 74",
    tags: ["iOS", "Android", "Design System"],
    spineBg: "#FFD600",
    spineTextColor: "#0a0a0a",
    coverBg: "#1a1200",
    accent: "#FFD600",
    width: 70,
    height: 330,
    spineTextSize: 28,
    textDirection: "up" as const,
    hasStripe: false,
  },
  {
    slug: "nexus-design-system",
    number: "02",
    spineLabel: "NEXUS",
    spineSubLabel: "Design System",
    coverTitle: "Nexus\nDesign System",
    category: "Design System · Enterprise",
    year: "2023",
    description:
      "Built a unified component library scaling across 40 products and halving design-dev handoff time.",
    outcome: "40 products · 50% faster",
    tags: ["Tokens", "Figma", "React"],
    spineBg: "#0a0a0a",
    spineTextColor: "#00E5A0",
    coverBg: "#000f09",
    accent: "#00E5A0",
    width: 52,
    height: 350,
    spineTextSize: 22,
    textDirection: "up" as const,
    hasStripe: true,
    stripeColor: "#00E5A0",
  },
  {
    slug: "oasis-health",
    number: "03",
    spineLabel: "OASIS",
    spineSubLabel: "Health",
    coverTitle: "Oasis\nHealth",
    category: "Mobile · HealthTech",
    year: "2023",
    description:
      "Mental wellness app that earned Apple's App of the Day — zero onboarding drop-off via progressive disclosure.",
    outcome: "Apple App of the Day · 4.9★",
    tags: ["Wellness", "iOS", "Motion"],
    spineBg: "#FF4520",
    spineTextColor: "#ffffff",
    coverBg: "#1f0800",
    accent: "#FF4520",
    width: 84,
    height: 310,
    spineTextSize: 34,
    textDirection: "up" as const,
    hasStripe: false,
  },
  {
    slug: "loop-ecommerce",
    number: "04",
    spineLabel: "LOOP",
    spineSubLabel: "E-Commerce",
    coverTitle: "Loop\nE-Commerce",
    category: "Web · Retail",
    year: "2022",
    description:
      "Reduced cart abandonment 31% through a checkout redesign grounded in cognitive load research.",
    outcome: "↓ 31% abandonment · ↑ 22% revenue",
    tags: ["Checkout", "A/B Testing", "Web"],
    spineBg: "#1400FF",
    spineTextColor: "#ffffff",
    coverBg: "#00000f",
    accent: "#5b8fff",
    width: 62,
    height: 340,
    spineTextSize: 26,
    textDirection: "up" as const,
    hasStripe: true,
    stripeColor: "#ffffff",
  },
  {
    slug: "atlas-dashboard",
    number: "05",
    spineLabel: "ATLAS",
    spineSubLabel: "Analytics",
    coverTitle: "Atlas\nDashboard",
    category: "SaaS · B2B",
    year: "2024",
    description:
      "Turned a 200-widget data labyrinth into a command centre — time-to-insight dropped from 8 min to 90 sec.",
    outcome: "↓ 81% time-to-insight · 92% retention",
    tags: ["Dashboard", "Data Viz", "SaaS"],
    spineBg: "#C400C4",
    spineTextColor: "#ffffff",
    coverBg: "#0f000f",
    accent: "#e87ef0",
    width: 74,
    height: 320,
    spineTextSize: 30,
    textDirection: "up" as const,
    hasStripe: false,
  },
];

const COVER_WIDTH = 200;

export default function BookShelf() {
  const { ref, isInView } = useScrollAnimation(0.1);
  const [hovered, setHovered] = useState<number | null>(null);

  const maxHeight = Math.max(...books.map((b) => b.height));

  return (
    <section
      className="py-20 md:py-28 border-t border-white/5"
      style={{ overflow: "visible" }}
      aria-labelledby="bookshelf-heading"
    >
      {/* Editorial heading */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16 px-6"
      >
        <p
          className="text-zinc-600 tracking-[0.35em] uppercase mb-4"
          style={{ fontSize: "11px", fontFamily: "monospace" }}
        >
          Chapter II
        </p>
        <h2
          id="bookshelf-heading"
          className="leading-none tracking-tight text-white"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 900,
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
            letterSpacing: "-0.02em",
          }}
        >
          CASE STUDIES
        </h2>
      </motion.div>

      {/* Shelf */}
      <div className="px-6 md:px-16 lg:px-24">
        {/* Books row — aligned to bottom */}
        <div
          className="flex items-end justify-center gap-[2px] overflow-x-auto"
          style={{ height: `${maxHeight}px` }}
        >
          {books.map((book, i) => (
            <motion.div
              key={book.slug}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ perspective: "1000px", flexShrink: 0, alignSelf: "flex-end" }}
            >
              {/* Width wrapper */}
              <div
                style={{
                  width: hovered === i ? COVER_WIDTH : book.width,
                  height: book.height,
                  transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "pointer",
                  position: "relative",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Flip card */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    transformStyle: "preserve-3d" as const,
                    transform: hovered === i ? "rotateY(180deg)" : "rotateY(0deg)",
                    transition: "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {/* ── SPINE ── */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden" as const,
                      WebkitBackfaceVisibility: "hidden" as const,
                      background: book.spineBg,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 4px",
                      overflow: "hidden",
                      boxShadow:
                        "inset -4px 0 10px rgba(0,0,0,0.35), 3px 0 8px rgba(0,0,0,0.4)",
                    }}
                  >
                    {/* Stripe accent at top */}
                    {book.hasStripe && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "6px",
                          background: (book as typeof book & { stripeColor?: string }).stripeColor,
                        }}
                      />
                    )}

                    {/* Number top */}
                    <span
                      style={{
                        fontSize: "7px",
                        fontFamily: "monospace",
                        color: book.spineTextColor,
                        opacity: 0.5,
                        letterSpacing: "0.1em",
                        flexShrink: 0,
                      }}
                    >
                      {book.number}
                    </span>

                    {/* Big vertical title */}
                    <span
                      style={{
                        writingMode: "vertical-rl" as const,
                        transform: "rotate(180deg)",
                        color: book.spineTextColor,
                        fontSize: `${book.spineTextSize}px`,
                        fontWeight: 900,
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                        textTransform: "uppercase",
                        fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        maxHeight: `${book.height - 80}px`,
                      }}
                    >
                      {book.spineLabel}
                    </span>

                    {/* Sub-label vertical */}
                    <span
                      style={{
                        writingMode: "vertical-rl" as const,
                        transform: "rotate(180deg)",
                        color: book.spineTextColor,
                        fontSize: "8px",
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        opacity: 0.65,
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                        fontFamily: "monospace",
                        flexShrink: 0,
                      }}
                    >
                      {book.spineSubLabel}
                    </span>
                  </div>

                  {/* ── COVER ── */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden" as const,
                      WebkitBackfaceVisibility: "hidden" as const,
                      transform: "rotateY(180deg)",
                      background: book.coverBg,
                      border: `1px solid ${book.accent}25`,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "16px 14px",
                      overflow: "hidden",
                      boxShadow: `5px 0 24px rgba(0,0,0,0.7), inset 4px 0 10px rgba(0,0,0,0.4)`,
                    }}
                  >
                    {/* Colored top bar matching spine */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "5px",
                        background: book.spineBg,
                      }}
                    />

                    <div style={{ marginTop: "8px" }}>
                      <p
                        style={{
                          fontSize: "8px",
                          color: book.accent,
                          fontFamily: "monospace",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          marginBottom: "10px",
                          opacity: 0.9,
                        }}
                      >
                        {book.number} · {book.year}
                      </p>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: 900,
                          color: "#ffffff",
                          lineHeight: 1.15,
                          marginBottom: "10px",
                          whiteSpace: "pre-line",
                          fontFamily: "'Arial Black', sans-serif",
                          textTransform: "uppercase",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {book.coverTitle}
                      </h3>
                      <p
                        style={{
                          fontSize: "10px",
                          color: "rgba(255,255,255,0.45)",
                          lineHeight: 1.6,
                        }}
                      >
                        {book.description}
                      </p>
                    </div>

                    <div>
                      <p
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          color: book.accent,
                          marginBottom: "8px",
                        }}
                      >
                        {book.outcome}
                      </p>
                      <div
                        style={{ display: "flex", flexWrap: "wrap", gap: "3px", marginBottom: "12px" }}
                      >
                        {book.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: "8px",
                              padding: "2px 6px",
                              borderRadius: "20px",
                              border: `1px solid ${book.accent}45`,
                              color: book.accent,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/case-studies/${book.slug}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "3px",
                          fontSize: "10px",
                          fontWeight: 700,
                          color: book.accent,
                          textDecoration: "none",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        View study <ArrowUpRight size={10} />
                      </Link>
                    </div>

                    {/* Glow */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: -30,
                        right: -30,
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        background: `${book.spineBg}25`,
                        filter: "blur(28px)",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Shelf plank */}
        <div
          style={{
            height: "18px",
            background: "linear-gradient(180deg, #444 0%, #222 50%, #111 100%)",
            boxShadow: "0 8px 28px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.07)",
          }}
        />
        <div style={{ height: "4px", background: "#0a0a0a", boxShadow: "0 6px 16px rgba(0,0,0,0.9)" }} />
      </div>

      {/* Hint */}
      <p
        className="text-center text-zinc-700 mt-8 px-6"
        style={{ fontSize: "11px", fontFamily: "monospace", letterSpacing: "0.2em" }}
      >
        HOVER TO OPEN · {books.length} CASE STUDIES
      </p>
    </section>
  );
}
