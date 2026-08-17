"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Search, Rocket, Package, MousePointer2, Asterisk, MapPin, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useParallax } from "@/hooks/useParallax";
import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("@/components/Lanyard"), { ssr: false });

const SENSITIVITY = 0.8;
const LERP = 0.06;
const MAX_OFFSET = 22;
const FLOAT_LERP = 0.08;
const INTRO_HEADING = "Designing instinctive user experiences for ambitious product teams.";

const GREETING_PILLS = [
  { icon: Search, label: "UX Research" },
  { icon: Rocket, label: "0 → 1" },
  { icon: Package, label: "Design Systems" },
  { icon: MousePointer2, label: "Interaction" },
];

// Small hand-drawn-style accents next to the greeting heading — inline SVG,
// no external assets.
function TickAccent({ size = 26, color = "var(--sp-orange)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <path d="M6 20L18 6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M4 12L10 8" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SquiggleUnderline({ width = 220, color = "var(--sp-orange)" }: { width?: number; color?: string }) {
  return (
    <svg width={width} height="10" viewBox="0 0 220 10" fill="none" style={{ display: "block" }}>
      <path d="M2 6C24 2 46 9 68 5C90 1 112 8 134 4C156 0 178 7 200 3C208 1.5 214 3 218 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* ── Word-by-word scroll reveal (identical logic to HomeIntro) ─── */
function WordSpan({ word, progress, start, end }: { word: string; progress: MotionValue<number>; start: number; end: number }) {
  const color = useTransform(progress, [start, end], ["#aaaaaa", "#111111"]);
  return (
    <motion.span style={{ color, display: "inline-block", whiteSpace: "nowrap", marginRight: "0.28em" }}>
      {word}
    </motion.span>
  );
}

function IntroAnimatedHeading({ progress, isMobile }: { progress: MotionValue<number>; isMobile: boolean }) {
  const words = INTRO_HEADING.split(" ");
  const total = words.length;
  const windowSize = 2 / total;
  return (
    <h2 style={{ fontSize: isMobile ? "28px" : "44px", fontWeight: 400, lineHeight: 1, letterSpacing: 0, fontFamily: "var(--font-gelica)", margin: "0 0 24px" }}>
      {words.map((word, i) => {
        const start = (i / total) * 0.75;
        const end = Math.min(start + windowSize, 0.85);
        return <WordSpan key={i} word={word} progress={progress} start={start} end={end} />;
      })}
    </h2>
  );
}

export default function MainframeHero({
  hideText,
  showHey,
  hideVideo,
  showIntroText,
}: {
  hideText?: boolean;
  showHey?: boolean;
  hideVideo?: boolean;
  showIntroText?: boolean;
} = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Independent from the video/mouse-driven `wrapRef` transform below — this
  // is a plain scroll-position parallax on the greeting text block only.
  const { ref: greetingParallaxRef, y: greetingY } = useParallax(24);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const prevX = useRef<number | null>(null);
  const targetTime = useRef(0);
  const seeking = useRef(false);
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const floatTarget = useRef({ x: 0.5, y: 0.5 });
  const floatCurrent = useRef({ x: 0.5, y: 0.5 });

  // When showIntroText, target the tall scroll container so progress spans 200vh
  const { scrollYProgress } = useScroll({
    target: showIntroText ? scrollContainerRef : sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onSeeked = () => {
      seeking.current = false;
      if (Math.abs(video.currentTime - targetTime.current) > 0.01) {
        seeking.current = true;
        video.currentTime = targetTime.current;
      }
    };

    const onMove = (e: MouseEvent) => {
      const section = sectionRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        floatTarget.current.x = (e.clientX - rect.left) / rect.width;
        floatTarget.current.y = (e.clientY - rect.top) / rect.height;
      }
      if (video.duration) {
        const currentX = e.clientX;
        if (prevX.current !== null) {
          const delta = currentX - prevX.current;
          const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
          targetTime.current = Math.min(video.duration, Math.max(0, targetTime.current + offset));
          if (!seeking.current) {
            seeking.current = true;
            video.currentTime = targetTime.current;
          }
        }
        prevX.current = currentX;
      }
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const tick = () => {
      const c = current.current;
      const m = mouse.current;
      c.x += (m.x * MAX_OFFSET - c.x) * LERP;
      c.y += (m.y * MAX_OFFSET - c.y) * LERP;

      const fc = floatCurrent.current;
      const ft = floatTarget.current;
      fc.x += (ft.x - fc.x) * FLOAT_LERP;
      fc.y += (ft.y - fc.y) * FLOAT_LERP;

      if (wrapRef.current) {
        if (hideText) {
          const section = sectionRef.current;
          if (section) {
            const vw = 340;
            const vh = 340;
            const maxX = section.offsetWidth - vw;
            const maxY = section.offsetHeight - vh;
            wrapRef.current.style.transform = `translate(${fc.x * maxX}px, ${fc.y * maxY}px)`;
          }
        } else {
          wrapRef.current.style.transform = `translate(${c.x}px, ${c.y}px)`;
        }
      }
      rafId.current = requestAnimationFrame(tick);
    };

    video.addEventListener("seeked", onSeeked);
    window.addEventListener("mousemove", onMove);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("mousemove", onMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [hideText]);

  const sectionJSX = (
    <section
      ref={sectionRef}
      style={{
        position: showIntroText ? "sticky" : "relative",
        top: showIntroText ? 0 : undefined,
        height: isMobile && !showIntroText ? "auto" : "100vh",
        minHeight: isMobile && !showIntroText ? "100vh" : undefined,
        width: "100%",
        overflow: "hidden",
        zIndex: 1,
        background: "transparent",
        display: "flex",
        flexDirection: isMobile && !showIntroText ? "column" : "row",
        alignItems: isMobile && !showIntroText ? "stretch" : "center",
        paddingTop: isMobile && !showIntroText ? "72px" : "5vh",
        paddingBottom: isMobile && !showIntroText ? "32px" : undefined,
        paddingLeft: isMobile ? "6%" : "5%",
        paddingRight: isMobile ? "6%" : "5%",
      }}
    >

      {/* Full-bleed parallax video (first section) */}
      {!hideVideo && !hideText && (
        <div
          ref={wrapRef}
          style={{
            position: "absolute",
            inset: 0,
            margin: `-${MAX_OFFSET * 2}px`,
            willChange: "transform",
          }}
        >
          <video
            ref={videoRef}
            src="/assets/header/Hero.mp4"
            muted
            playsInline
            preload="auto"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "70% center",
              filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.28)) drop-shadow(0 8px 16px rgba(0,0,0,0.18))",
            }}
          />
        </div>
      )}

      {/* Floating cursor-follow video (second section) */}
      {!hideVideo && hideText && (
        <div
          ref={wrapRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 340,
            height: 340,
            willChange: "transform",
            pointerEvents: "none",
          }}
        >
          <video
            ref={videoRef}
            src="/assets/header/Hero.mp4"
            muted
            playsInline
            preload="auto"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "var(--radius-2xl)",
              filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.28)) drop-shadow(0 8px 16px rgba(0,0,0,0.18))",
            }}
          />
        </div>
      )}

      {/* HEY! ASCII */}
      {showHey && (
        <div style={{ position: "relative", zIndex: 2, paddingLeft: "5%", flexShrink: 0, alignSelf: "center" }}>
          <div style={{
            fontFamily: "monospace",
            fontSize: "clamp(9px, 1.1vw, 14px)",
            lineHeight: 1.2,
            color: "#111",
            whiteSpace: "pre",
            opacity: 0.75,
            userSelect: "none",
          }}>{`██╗  ██╗███████╗██╗   ██╗██╗
██║  ██║██╔════╝╚██╗ ██╔╝██║
███████║█████╗   ╚████╔╝ ██║
██╔══██║██╔══╝    ╚██╔╝  ╚═╝
██║  ██║███████╗   ██║   ██╗
╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝`}</div>
        </div>
      )}

      {/* Hi from Arunima — tag, greeting, description, CTAs */}
      {!hideText && (
        <div style={isMobile ? {
          position: "relative",
          zIndex: 2,
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          order: 2,
        } : {
          position: "absolute",
          top: "50%",
          right: "8%",
          transform: "translateY(-50%)",
          zIndex: 2,
          maxWidth: "37%",
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Owns the continuous scroll parallax — nested *inside* the
              absolutely-positioned parent (not wrapped from outside it),
              since a transform on an ancestor of that parent would create a
              new containing block and break its bottom/left positioning. */}
          <motion.div ref={greetingParallaxRef} style={{ y: greetingY }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.02, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              fontFamily: "var(--font-geist), sans-serif",
              fontSize: isMobile ? "12px" : "13px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            <span style={{ color: "var(--sp-cocoa)" }}>Hey, a quick Intro?</span>
          </motion.div>

          {/* Heading */}
          <div style={{ position: "relative" }}>
            {!isMobile && (
              <div style={{ position: "absolute", top: -4, right: -8 }}>
                <TickAccent />
              </div>
            )}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-alekan)",
                fontWeight: 700,
                fontSize: isMobile ? "36px" : "56px",
                color: "var(--sp-cocoa)",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Hey, I&apos;m Arunima.
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-alekan)",
                fontWeight: 700,
                fontSize: isMobile ? "36px" : "56px",
                color: "var(--sp-orange)",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              I turn messy workflows into simple experiences.
            </motion.h1>
          </div>
          <div style={{ margin: "10px 0 0" }}>
            <SquiggleUnderline width={isMobile ? 160 : 220} />
          </div>

          {/* Role · years */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              fontFamily: "var(--font-geist), sans-serif",
              fontSize: isMobile ? "14px" : "15px",
              fontWeight: 500,
              color: "var(--sp-cocoa)",
              margin: "22px 0 0",
            }}
          >
            <Asterisk size={16} style={{ color: "var(--sp-orange)", flexShrink: 0 }} />
            <span>Product Designer</span>
            <span style={{ color: "rgba(23,23,23,0.3)" }}>•</span>
            <span>3+ years</span>
          </motion.div>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: isMobile ? "16px" : "16.5px",
              color: "var(--sp-cocoa)",
              lineHeight: 1.7,
              fontFamily: "var(--font-geist), sans-serif",
              margin: "14px 0 0",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            I design enterprise SaaS and AI products, turning complex workflows into clear, intuitive experiences.
          </motion.p>

          {/* Skill pills */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: "var(--spacing-20)" }}
          >
            {GREETING_PILLS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  background: "var(--sp-cream)", color: "var(--sp-charcoal)",
                  border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-2xl-2)",
                  padding: "8px 14px", fontSize: isMobile ? "13px" : "13.5px", fontWeight: 500,
                  fontFamily: "var(--font-geist), sans-serif",
                }}
              >
                <Icon size={14} style={{ color: "var(--sp-orange)", flexShrink: 0 }} />
                {label}
              </span>
            ))}
          </motion.div>

          {/* Divider */}
          <div style={{ borderTop: "1.5px dashed rgba(23,23,23,0.2)", margin: "var(--spacing-24) 0" }} />

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              fontFamily: "var(--font-geist), sans-serif",
              fontSize: isMobile ? "14px" : "15px",
              color: "rgba(23,23,23,0.6)",
            }}
          >
            <MapPin size={15} style={{ flexShrink: 0 }} />
            Currently designing @ Hotelogix
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", gap: "var(--spacing-12)", marginTop: "var(--spacing-20)", flexWrap: "wrap" }}
          >
            <a
              href="/case-studies"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "var(--sp-charcoal)", color: "var(--sp-cream)",
                border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-2xl-2)",
                padding: "0.7em 1.5em", fontSize: "clamp(12px, 1.05vw, 14px)", fontWeight: 500,
                fontFamily: "var(--font-gelica)", textDecoration: "none",
                boxShadow: "var(--shadow-subtle)",
              }}
            >
              View case studies
              <ArrowRight size={15} />
            </a>
            <a
              href="https://www.linkedin.com/in/arunima-acharya-bb012a21b/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "var(--sp-cream)", color: "var(--sp-charcoal)",
                border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-2xl-2)",
                padding: "0.7em 1.5em", fontSize: "clamp(12px, 1.05vw, 14px)", fontWeight: 500,
                fontFamily: "var(--font-gelica)", textDecoration: "none",
                boxShadow: "var(--shadow-subtle)",
              }}
            >
              Connect on LinkedIn
              <ArrowRight size={15} />
            </a>
          </motion.div>
          </motion.div>
        </div>
      )}

      {/* Lanyard — left side, text column now sits to the right */}
      {!hideText && !showIntroText && !isMobile && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: "45%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}>
          <div data-cursor-drag style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "auto" }}>
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
          </div>
        </div>
      )}

      {/* Mobile — simplified card, no decorative stickers, stacked above the
          text (order: 1) and full-bleed (100vw x 100dvh, breaking out of the
          section's side padding via the negative-margin centering trick). */}
      {!hideText && !showIntroText && isMobile && (
        <div style={{
          position: "relative",
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          height: "100dvh",
          flexShrink: 0,
          order: 1,
        }}>
          {/* Camera shifted up (y: 0 -> 2) so the rope's anchor point
              (Lanyard.tsx's fixed joint at world y=4) and the card's own
              top edge land closer to the top of this full-height canvas
              instead of starting further down. */}
          <Lanyard position={[0, 2, 20]} gravity={[0, -40, 0]} />
        </div>
      )}

      {/* Intro text (second section) — identical to HomeIntro right column */}
      {showIntroText && (
        <div style={{
          position: "relative",
          zIndex: 2,
          flex: "1",
          paddingLeft: isMobile ? "20px" : "calc(var(--gutter) * 0.9)",
          paddingRight: isMobile ? "20px" : "calc(var(--gutter) * 0.9)",
        }}>
          <IntroAnimatedHeading progress={scrollYProgress} isMobile={isMobile} />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <p style={{ fontSize: isMobile ? "0.875rem" : "clamp(0.9rem, 1.4vw, 1rem)", color: "#555", lineHeight: 1.7, fontFamily: "var(--font-geist), sans-serif", marginBottom: "var(--spacing-16)" }}>
              <strong style={{ color: "#111", fontWeight: 600 }}>Engineer</strong> turned <strong style={{ color: "#111", fontWeight: 600 }}>Product Designer</strong> with <strong style={{ color: "#111", fontWeight: 600 }}>3+ years of experience</strong> designing and scaling <strong style={{ color: "#111", fontWeight: 600 }}>0→1 B2B SaaS and AI products</strong> across hospitality, enterprise software, and emerging technologies.
            </p>

            <p style={{ fontSize: isMobile ? "0.875rem" : "clamp(0.9rem, 1.4vw, 1rem)", color: "#555", lineHeight: 1.7, fontFamily: "var(--font-geist), sans-serif", marginBottom: "var(--spacing-16)" }}>
              I&apos;ve led the end-to-end design of <strong style={{ color: "#111", fontWeight: 600 }}>6+ products</strong>, partnering closely with founders, product managers, and engineers to build scalable design systems, simplify complex workflows, and create enterprise experiences used by hotel teams across thousands of properties worldwide.
            </p>

            <p style={{ fontSize: isMobile ? "0.875rem" : "clamp(0.9rem, 1.4vw, 1rem)", color: "#555", lineHeight: 1.7, fontFamily: "var(--font-geist), sans-serif", marginBottom: "var(--spacing-32)" }}>
              With a background in <strong style={{ color: "#111", fontWeight: 600 }}>Computer Science Engineering</strong>, I work at the intersection of <strong style={{ color: "#111", fontWeight: 600 }}>design, product, and technology</strong>. I care deeply about <strong style={{ color: "#111", fontWeight: 600 }}>product thinking, systems thinking, interaction design, accessibility, and craftsmanship</strong>, building experiences that are intuitive, scalable, and create measurable business impact.
            </p>

            <div style={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-12)", background: "#e8e8e8", borderRadius: "9999px", padding: "8px 20px 8px 8px", marginBottom: "var(--spacing-28)" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#c0c0c0", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 700, color: "#fff" }}>A</div>
              <div>
                <p style={{ fontSize: "16px", color: "#888", fontFamily: "var(--font-geist), sans-serif", margin: 0 }}>Schedule a call with the Designer</p>
                <p style={{ fontSize: "16px", fontWeight: 600, color: "#111", fontFamily: "var(--font-geist), sans-serif", margin: 0 }}>Arunima Acharya</p>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </section>
  );

  // Wrap in tall container when showIntroText so scroll progress spans 200vh
  if (showIntroText) {
    return (
      <div ref={scrollContainerRef} style={{ height: "200vh" }}>
        {sectionJSX}
      </div>
    );
  }

  return sectionJSX;
}
