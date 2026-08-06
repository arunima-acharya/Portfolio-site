"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useParallax } from "@/hooks/useParallax";

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Head of Product",
    company: "Fintech Co.",
    quote:
      "Arunima transformed our complex fintech flows into an experience users actually love. Conversion jumped 40% in the first quarter and the whole team felt the difference.",
  },
  {
    name: "James R.",
    role: "Co-Founder",
    company: "HealthApp",
    quote:
      "She brought structure and clarity to a chaotic product backlog. The design system she built saved us months of engineering time. Highly recommend!",
  },
  {
    name: "Priya K.",
    role: "CPO",
    company: "SaaS Startup",
    quote:
      "Working with Arunima felt like having a strategic design partner. She asks the right questions and delivers pixel-perfect results that exceeded our expectations.",
  },
  {
    name: "Tom L.",
    role: "Design Lead",
    company: "Agency",
    quote:
      "Her UX research uncovered pain points we had missed for years. The redesign led to a 30% drop in support tickets overnight.",
  },
];

const CARD_COUNT = 3;

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous testimonials" : "Next testimonials"}
      style={{
        width: 46,
        height: 46,
        borderRadius: "50%",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isPrev ? "#111" : "transparent",
        border: isPrev ? "none" : "1.5px solid rgba(0,0,0,0.15)",
        color: isPrev ? "#fff" : "#111",
        cursor: "pointer",
        transition: "background 0.2s, border-color 0.2s",
      }}
      onMouseEnter={e => {
        if (isPrev) (e.currentTarget as HTMLButtonElement).style.background = "#e8510a";
        else (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,0,0,0.35)";
      }}
      onMouseLeave={e => {
        if (isPrev) (e.currentTarget as HTMLButtonElement).style.background = "#111";
        else (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,0,0,0.15)";
      }}
    >
      {isPrev ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}
    </button>
  );
}

export default function TestimonialsGrid() {
  const isMobile = useIsMobile();
  const { ref: headingParallaxRef, y: headingY } = useParallax(30);
  const [startIndex, setStartIndex] = useState(0);
  const total = TESTIMONIALS.length;

  const next = () => setStartIndex(i => (i + 1) % total);
  const prev = () => setStartIndex(i => (i - 1 + total) % total);

  const visibleCount = isMobile ? 1 : CARD_COUNT;
  const visible = Array.from({ length: visibleCount }, (_, i) => TESTIMONIALS[(startIndex + i) % total]);

  return (
    <section
      style={{
        background: "#fff url('/herobg.svg') center / cover no-repeat",
        paddingTop: isMobile ? "64px" : "112px",
        paddingBottom: isMobile ? "64px" : "112px",
        paddingLeft: isMobile ? "20px" : "15%",
        paddingRight: isMobile ? "20px" : "15%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Header row — heading left, description + carousel controls right */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "flex-start",
          justifyContent: "space-between",
          gap: isMobile ? "28px" : "24px",
          marginBottom: isMobile ? "40px" : "56px",
        }}
      >
        <motion.h2
          ref={headingParallaxRef}
          style={{
            fontFamily: "var(--font-instrument-serif), 'Instrument Serif', serif",
            fontSize: isMobile ? "32px" : "clamp(32px, 3.4vw, 44px)",
            fontWeight: 400,
            lineHeight: 1.15,
            color: "#111",
            margin: 0,
            y: headingY,
          }}
        >
          What People Say
          <br />
          <span style={{ fontStyle: "italic" }}>Working With Me</span>
        </motion.h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: 300 }}>
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: 13.5,
              lineHeight: 1.6,
              color: "rgba(0,0,0,0.4)",
              margin: 0,
            }}
          >
            Explore reviews and stories from those who trusted us. Their satisfaction drives our innovation for better solutions.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ArrowButton direction="prev" onClick={prev} />
            <ArrowButton direction="next" onClick={next} />
          </div>
        </div>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : `repeat(${CARD_COUNT}, 1fr)`,
          gap: isMobile ? "16px" : "22px",
        }}
      >
        {visible.map((t, i) => (
          <div
            key={`${t.name}-${startIndex}-${i}`}
            style={{
              background: "#F6F5F3",
              borderRadius: 22,
              padding: "28px 26px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: isMobile ? undefined : 340,
            }}
          >
            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  background: "#fff",
                  borderRadius: 9999,
                  padding: "6px 14px",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "#111",
                  marginBottom: "22px",
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#111", flexShrink: 0 }} />
                {t.name}
              </span>

              <p
                style={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontSize: 15.5,
                  lineHeight: 1.6,
                  color: "#1a1a1a",
                  margin: 0,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "24px",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: 12.5,
                color: "rgba(0,0,0,0.4)",
              }}
            >
              <span>{t.role}</span>
              <span>{t.company}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
