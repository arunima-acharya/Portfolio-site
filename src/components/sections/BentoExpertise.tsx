"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const CATEGORIES = [
  {
    title: "Product Design",
    tags: ["End-to-End Product Design", "Interaction Design", "Wireframing", "Prototyping", "Visual Design", "Information Architecture"],
    large: true,
  },
  {
    title: "Research & Testing",
    tags: ["User Research", "Usability Testing", "Heuristic Evaluation", "User Personas", "Journey Mapping"],
    large: false,
  },
  {
    title: "Systems & Strategy",
    tags: ["Design Systems (50+ components)", "Accessibility (WCAG)", "Product Strategy", "Zero-to-One Design", "Data-Informed Design"],
    large: false,
  },
  {
    title: "Collaboration",
    tags: ["Cross-Functional Collaboration", "Developer Handoff", "Agile / Scrum", "Stakeholder Management"],
    large: true,
  },
];

// Pinned-card-fan geometry — one entry per category, in order. The two
// middle cards sit frontmost (highest z), the outer two sit behind, like a
// loosely fanned stack pinned at the base. Rotation and vertical offset are
// both randomized per mount (see the `fan` state below); z is the only
// fixed part of the geometry, since it controls stacking order.
const FAN_Z = [1, 3, 4, 2];

// Per-card random-tilt range: total spread in degrees, and how far the
// range's center is biased off zero. Card index 1 ("Research & Testing")
// ranges [-8°, 8°], card index 2 ("Systems & Strategy") is biased 4°
// further right with a tighter spread overall, since the full range could
// tilt it enough to clip its own text off either edge.
const ROTATE_SPREAD = [36, 16, 12, 36];
const ROTATE_BIAS = [0, 0, 4, 0];

// Extra vertical push per card, in px, layered on top of the random y —
// card index 0 ("Product Design") sits ~10% of its own card height (300px)
// lower, card index 1 ("Research & Testing") ~10% of its height (260px)
// higher, card index 2 ("Systems & Strategy") ~30% of its height (260px)
// lower, than the others.
const Y_BIAS = [30, -26, 78, 0];

function ArrowIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 13L13 3M13 3H6.5M13 3V9.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

type Cat = { title: string; tags: string[]; large: boolean };
type Colors = { textPrimary: string; cardBg: string; cardBorder: string; cardShadow: string; arrowBorder: string; arrowColor: string; pillBg: string; pillBorder: string; pillText: string };

function BentoCard({ cat, globalIdx, isInView, colors, fan, fanned }: { cat: Cat; globalIdx: number; isInView: boolean; colors: Colors; fan?: { rotate: number; y: number; z: number }; fanned?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const active = hovered;

  const bg       = active ? "#e8510a" : colors.cardBg;
  const border   = active ? "#e8510a" : colors.cardBorder;
  const shadow   = active
    ? "0 12px 40px rgba(232,81,10,0.35)"
    : fanned ? "0 16px 36px rgba(0,0,0,0.14)" : colors.cardShadow;
  const title    = active ? "#fff"    : colors.textPrimary;
  const arrow    = active ? "rgba(255,255,255,0.4)" : colors.arrowBorder;
  const arrowIco = active ? "#fff"    : colors.arrowColor;
  const pill     = active ? "rgba(255,255,255,0.15)" : colors.pillBg;
  const pillBdr  = active ? "rgba(255,255,255,0.2)"  : colors.pillBorder;
  const pillTxt  = active ? "#fff"    : colors.pillText;

  const t = "background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.55, delay: globalIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Inner element owns the fan tilt/lift transform — kept separate
          from the outer entrance-fade so hover can drive it with a fast,
          undelayed transition, instead of inheriting the staggered mount
          delay. */}
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={fanned
          ? (active
            ? { y: (fan?.y ?? 0) - 22, rotate: 0, scale: 1.035, zIndex: 50 }
            : { y: fan?.y ?? 0, rotate: fan?.rotate ?? 0, scale: 1, zIndex: fan?.z })
          : (active ? { y: -3 } : { y: 0 })}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          background: bg,
          border: `1px solid ${border}`,
          borderRadius: "20px",
          padding: "28px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: cat.large ? "300px" : "260px",
          gap: "24px",
          cursor: "default",
          boxShadow: shadow,
          transition: t,
          transformOrigin: "bottom center",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
          <h3 style={{
            fontSize: cat.large ? "clamp(20px, 2.2vw, 28px)" : "clamp(16px, 1.8vw, 22px)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
            color: title,
            fontFamily: "var(--font-inter), sans-serif",
            transition: "color 0.25s ease",
          }}>
            {cat.title}
          </h3>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            border: `1px solid ${arrow}`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            transition: "border-color 0.25s ease",
          }}>
            <ArrowIcon color={arrowIco} />
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
          {cat.tags.map((tag) => (
            <span key={tag} style={{
              display: "inline-block",
              padding: "7px 15px",
              borderRadius: "9999px",
              background: pill,
              border: `1px solid ${pillBdr}`,
              color: pillTxt,
              fontSize: "12px",
              fontWeight: 400,
              fontFamily: "var(--font-inter), sans-serif",
              whiteSpace: "nowrap",
              letterSpacing: "-0.01em",
              transition: "background 0.25s ease, border-color 0.25s ease, color 0.25s ease",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function BentoExpertise() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const isMobile = useIsMobile();
  const isLight = true; // this section is always rendered in light mode, regardless of the site-wide theme toggle

  // Random tilt + vertical offset per card. Starts flat (deterministic,
  // SSR-safe) and randomizes once after mount — deferred via setTimeout so
  // the state update isn't synchronous within the effect body (avoids a
  // cascading render), and Math.random() runs outside the render phase.
  const [fan, setFan] = useState(() => FAN_Z.map((z) => ({ rotate: 0, y: 0, z })));
  useEffect(() => {
    const id = window.setTimeout(() => {
      setFan(FAN_Z.map((z, i) => ({
        rotate: Math.round((Math.random() * ROTATE_SPREAD[i] - ROTATE_SPREAD[i] / 2 + ROTATE_BIAS[i]) * 10) / 10,
        y: Math.round(Math.random() * 40 - 20 + Y_BIAS[i]),
        z,
      })));
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const textPrimary  = isLight ? "#111"                        : "#f0f0f0";
  const textMuted    = isLight ? "#999"                        : "rgba(255,255,255,0.4)";
  const cardBg       = isLight ? "#fff"                        : "#1a1a1a";
  const cardBorder   = isLight ? "rgba(0,0,0,0.08)"           : "rgba(255,255,255,0.07)";
  const cardShadow   = isLight ? "0 2px 12px rgba(0,0,0,0.04)": "0 2px 12px rgba(0,0,0,0.2)";
  const pillBg       = isLight ? "#f5f5f5"                     : "rgba(255,255,255,0.07)";
  const pillBorder   = isLight ? "rgba(0,0,0,0.07)"           : "rgba(255,255,255,0.07)";
  const pillText     = isLight ? "#444"                        : "rgba(255,255,255,0.6)";
  const arrowBorder  = isLight ? "rgba(0,0,0,0.10)"           : "rgba(255,255,255,0.12)";
  const arrowColor   = isLight ? "#999"                        : "rgba(255,255,255,0.4)";

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: isMobile ? "48px" : "80px",
        paddingBottom: isMobile ? "48px" : "80px",
        paddingLeft: isMobile ? "20px" : undefined,
        paddingRight: isMobile ? "20px" : undefined,
        maxWidth: isMobile ? "100%" : "85%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      aria-labelledby="bento-expertise-heading"
    >
      {/* Header */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: isMobile ? "40px" : "80px" }}
      >
        <span
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
          id="bento-expertise-heading"
          style={{
            fontSize: isMobile ? "34px" : "48px",
            fontWeight: 400,
            letterSpacing: 0,
            lineHeight: 1,
            color: textPrimary,
            fontFamily: "var(--font-playfair-display), 'Playfair Display', serif",
          }}
        >
          What I bring to the table.
        </h2>
      </motion.div>

      {/* Mobile: flat stacked list, no tilt (readability over flourish).
          Desktop: pinned fan — four cards tilted at increasing angles,
          overlapping slightly, straightening to front on hover. */}
      {isMobile ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {CATEGORIES.map((cat, i) => (
            <BentoCard
              key={cat.title}
              cat={cat}
              globalIdx={i}
              isInView={isInView}
              colors={{ textPrimary, cardBg, cardBorder, cardShadow, arrowBorder, arrowColor, pillBg, pillBorder, pillText }}
            />
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "20px", paddingBottom: "36px", transform: "translateY(15%)" }}>
          {CATEGORIES.map((cat, i) => (
            <div key={cat.title} style={{ flex: "0 0 280px", marginLeft: i === 0 ? 0 : i === 1 ? "-46px" : "-26px" }}>
              <BentoCard
                cat={cat}
                globalIdx={i}
                isInView={isInView}
                colors={{ textPrimary, cardBg, cardBorder, cardShadow, arrowBorder, arrowColor, pillBg, pillBorder, pillText }}
                fan={fan[i]}
                fanned
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
