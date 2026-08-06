"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { getToolTrailImages } from "@/lib/toolIconTrail";

// Explicit prop type needed: a sibling ImageTrail.tsx (a different,
// unrelated component) shares this basename, and TypeScript's module
// resolution infers props from that file instead of the actual .jsx
// module being loaded here without this annotation.
const ImageTrail = dynamic<{ items: string[]; variant?: number }>(
  () => import("@/components/ui/ImageTrail.jsx"),
  { ssr: false }
);

const TOOL_TRAIL_ITEMS = getToolTrailImages();

const HEADING = "Designing instinctive user experiences for ambitious product teams. Hey, a quick intro?";

function WordSpan({
  word,
  progress,
  start,
  end,
  italic,
  fontSize,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  italic?: boolean;
  fontSize?: string;
}) {
  const color = useTransform(progress, [start, end], ["#aaaaaa", "#E06C41"]);
  return (
    <motion.span style={{
      color, fontWeight: 400, fontStyle: italic ? "italic" : "normal", fontSize,
      display: "inline-block", whiteSpace: "nowrap", marginRight: "0.28em",
    }}>
      {word}
    </motion.span>
  );
}

function AnimatedHeading({ progress, isMobile }: { progress: MotionValue<number>; isMobile: boolean }) {
  const words = HEADING.split(" ");
  const total = words.length;
  const windowSize = 2 / total;
  const introStart = words.findIndex((w) => w.startsWith("Hey"));

  // "HEY, A QUICK INTRO?" renders first (top line), so the scroll-linked
  // reveal must progress in that same visual order — not the original
  // sentence order the words were authored in — or the bottom line would
  // light up before the top one.
  const visualOrder = [...words.slice(introStart).map((_, k) => introStart + k), ...words.slice(0, introStart).map((_, k) => k)];

  const renderWord = (pos: number) => {
    const i = visualOrder[pos];
    const start = (pos / total) * 0.75;
    const end = Math.min(start + windowSize, 0.85);
    return (
      <WordSpan key={i} word={words[i]} progress={progress} start={start} end={end} />
    );
  };

  return (
    <h2
      style={{
        fontSize: isMobile ? "19.6px" : "40px",
        lineHeight: 1,
        letterSpacing: "0.5px",
        fontFamily: "var(--font-instrument-serif), 'Instrument Serif', serif",
        margin: "0 0 24px",
      }}
    >
      {visualOrder.slice(0, total - introStart).map((_, pos) => renderWord(pos))}
      <br />
      {visualOrder.slice(total - introStart).map((_, pos) => renderWord(pos + (total - introStart)))}
    </h2>
  );
}

export default function HomeIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // Reuses the pin's own scroll progress for a secondary parallax drift on
  // the decorative background layer — independent of the word-by-word
  // heading reveal, which stays untouched.
  const trailY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <div
      ref={containerRef}
      data-cursor-hidden
      style={{
        height: isMobile ? "160vh" : "240vh",
        marginLeft: "calc(-1 * var(--gutter))",
        marginRight: "calc(-1 * var(--gutter))",
        marginTop: "-6vh",
      }}
    >
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingTop: "10vh",
          backgroundColor: "#F1EFEA",
        }}
      >
        {!isMobile && (
          <motion.div style={{ position: "absolute", inset: 0, zIndex: 5, overflow: "hidden", y: trailY }}>
            <ImageTrail items={TOOL_TRAIL_ITEMS} variant={2} />
          </motion.div>
        )}

        {/* Content — right column */}
        <div style={{
          flex: "1",
          paddingLeft: isMobile ? "20px" : "calc(var(--gutter) * 0.9)",
          paddingRight: isMobile ? "20px" : "calc(var(--gutter) * 0.9)",
        }}>
          <AnimatedHeading progress={scrollYProgress} isMobile={isMobile} />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <p style={{ fontSize: isMobile ? "0.875rem" : "clamp(0.9rem, 1.4vw, 1rem)", color: "#555", lineHeight: 1.7, fontFamily: "var(--font-inter), sans-serif", marginBottom: "16px" }}>
              <strong style={{ color: "#111", fontWeight: 600 }}>Engineer</strong> turned <strong style={{ color: "#111", fontWeight: 600 }}>Product Designer</strong> with <strong style={{ color: "#111", fontWeight: 600 }}>3+ years of experience</strong> designing and scaling <strong style={{ color: "#111", fontWeight: 600 }}>0→1 B2B SaaS and AI products</strong> across hospitality, enterprise software, and emerging technologies.
            </p>

            <p style={{ fontSize: isMobile ? "0.875rem" : "clamp(0.9rem, 1.4vw, 1rem)", color: "#555", lineHeight: 1.7, fontFamily: "var(--font-inter), sans-serif", marginBottom: "16px" }}>
              I&apos;ve led the end-to-end design of <strong style={{ color: "#111", fontWeight: 600 }}>6+ products</strong>, partnering closely with founders, product managers, and engineers to build scalable design systems, simplify complex workflows, and create enterprise experiences used by hotel teams across thousands of properties worldwide.
            </p>

            <p style={{ fontSize: isMobile ? "0.875rem" : "clamp(0.9rem, 1.4vw, 1rem)", color: "#555", lineHeight: 1.7, fontFamily: "var(--font-inter), sans-serif", marginBottom: "32px" }}>
              With a background in <strong style={{ color: "#111", fontWeight: 600 }}>Computer Science Engineering</strong>, I work at the intersection of <strong style={{ color: "#111", fontWeight: 600 }}>design, product, and technology</strong>. I care deeply about <strong style={{ color: "#111", fontWeight: 600 }}>product thinking, systems thinking, interaction design, accessibility, and craftsmanship</strong>, building experiences that are intuitive, scalable, and create measurable business impact.
            </p>

            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: "#e8e8e8", borderRadius: "9999px", padding: "8px 20px 8px 8px", marginBottom: "28px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#c0c0c0", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 700, color: "#fff" }}>A</div>
              <div>
                <p style={{ fontSize: "11px", color: "#888", fontFamily: "var(--font-inter), sans-serif", margin: 0 }}>Schedule a call with the Designer</p>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#111", fontFamily: "var(--font-inter), sans-serif", margin: 0 }}>Arunima Acharya</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
