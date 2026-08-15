"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowUpLeft, Calendar, Heart } from "lucide-react";
import { getFeaturedProjects, projectHref } from "@/data/projects";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useParallax } from "@/hooks/useParallax";

const CARD_HEIGHT = 400;

// Same order as FEATURED_SLUGS below.
const WORK_BG_SVGS = [
  "/assets/work%20bg/bg/bg%201.svg",
  "/assets/work%20bg/bg/bg%202.svg",
  "/assets/work%20bg/bg/bg%203.svg",
  "/assets/work%20bg/bg/bg%204.svg",
];

const SVG_TILT_DEGREES = [-3, 5, -6, 7];

// One real product screenshot per featured project (same order as
// FEATURED_SLUGS below), inset into the torn-paper face so it reads as a
// photograph pinned to the page rather than a blank note. Pocket PMS has no
// screenshots of its own in the codebase, so it reuses a Mockup shot.
const PROJECT_PHOTOS = [
  "/assets/hotelogix/FRONTDESK.png",
  "/assets/POS/Draft%20116.png",
  "/assets/hotelogix/GROUP%20RESERVATION-LAYOUT.png",
  "/assets/Mockup/CHECK%20IN%203.jpg",
];

// Torn-paper card face laid on top of each colored bg svg — same file for
// all four, positioned/sized to match the reference (top-left, ~56% width).
const PAPER_SVG = "/assets/work%20bg/paper%20image.svg";

function stickyTop(index: number) {
  return 160 + index * 28;
}

// Hand-drawn-style decorations scattered around the SVG card stack, inline
// SVG so no external assets are needed. Purely cosmetic (aria-hidden).
function SquiggleUnderline({ color, width = 84 }: { color: string; width?: number }) {
  return (
    <svg width={width} height="10" viewBox="0 0 84 10" fill="none" style={{ display: "block" }}>
      <path d="M2 6C11 2 20 9 29 5C38 1 47 8 56 4C65 0 74 7 82 3" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function Sparkle({ size = 18, color = "var(--sp-charcoal)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" fill={color} />
    </svg>
  );
}

function SwirlArrow({ size = 36, color = "var(--sp-charcoal)", flip = false }: { size?: number; color?: string; flip?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ transform: flip ? "scaleX(-1)" : undefined }}>
      <path d="M8 14C8 8 14 4 20 6C28 9 30 18 24 24C19 29 10 28 7 22" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M4 20L7 22.5L10 19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function TickMarks({ size = 22, color = "var(--sp-charcoal)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 2L2 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="1.5" cy="14" r="1.4" fill={color} />
      <path d="M11 0L9 9" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="8.5" cy="13" r="1.4" fill={color} />
    </svg>
  );
}

function DashedCurve({ width = 320, color = "rgba(23,23,23,0.35)" }: { width?: number; color?: string }) {
  return (
    <svg width={width} height="56" viewBox="0 0 320 56" fill="none" style={{ display: "block" }}>
      <path d="M2 8C56 52 264 52 318 8" stroke={color} strokeWidth="1.5" strokeDasharray="5 6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function IconCircle({ bg, size = 52, children }: { bg: string; size?: number; children: React.ReactNode }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "var(--shadow-subtle)",
      }}
    >
      {children}
    </div>
  );
}

// Loosely recreates the reference's scattered composition around the card
// stack — approximated inline-SVG line art, not a pixel match. Desktop only;
// there's no room for this in the gutter on narrow viewports.
function StackDoodles() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: "-9%", top: "0%", transform: "rotate(-4deg)" }}>
        <TickMarks />
      </div>
      <div style={{ position: "absolute", left: "-12%", top: "8%", width: 150, transform: "rotate(-3deg)" }}>
        <p style={{ fontFamily: "var(--font-gelica)", fontStyle: "italic", fontSize: 17, lineHeight: 1.35, color: "var(--sp-charcoal)", margin: 0 }}>
          real problems.<br />thoughtful design.
        </p>
        <div style={{ marginTop: 6, marginLeft: 4 }}>
          <SquiggleUnderline color="#6F5AFE" />
        </div>
      </div>
      <div style={{ position: "absolute", left: "-7%", top: "27%" }}>
        <SwirlArrow />
      </div>

      <div style={{ position: "absolute", left: "-6%", top: "60%" }}>
        <IconCircle bg="#D2E82E">
          <ArrowUpLeft size={20} color="#171717" />
        </IconCircle>
      </div>
      <div style={{ position: "absolute", left: "0%", top: "77%" }}>
        <Sparkle />
      </div>

      <div style={{ position: "absolute", right: "-6%", top: "20%" }}>
        <IconCircle bg="#B7A7FE">
          <Heart size={20} color="#171717" fill="#171717" />
        </IconCircle>
      </div>
      <div style={{ position: "absolute", right: "-2%", top: "40%", transform: "rotate(12deg)" }}>
        <SwirlArrow size={32} flip />
      </div>
      <div style={{ position: "absolute", right: "-14%", top: "58%", width: 150, textAlign: "right", transform: "rotate(3deg)" }}>
        <p style={{ fontFamily: "var(--font-gelica)", fontStyle: "italic", fontSize: 16, lineHeight: 1.35, color: "var(--sp-charcoal)", margin: 0 }}>
          case studies<br />coming soon!
        </p>
        <div style={{ marginTop: 6, marginLeft: "auto", width: 80 }}>
          <SquiggleUnderline color="#D2E82E" width={80} />
        </div>
      </div>
      <div style={{ position: "absolute", right: "-8%", top: "77%", transform: "rotate(6deg)" }}>
        <TickMarks />
      </div>

      <div style={{ position: "absolute", left: "50%", bottom: "-3%", transform: "translateX(-50%)" }}>
        <DashedCurve />
      </div>
    </div>
  );
}

// Same sticky-stack scroll choreography as ProjectCard (position: sticky,
// staggered top offset + zIndex so each item slides in and overlaps the one
// before it) but rendering the raw SVG artwork instead of a case-study card.
// `isTop` controls the drop-shadow: only whichever item is currently the
// frontmost in the stack (tracked by the parent SvgStack) casts one.
const SvgStackItem = forwardRef<
  HTMLDivElement,
  { src: string; photo: string; project: ReturnType<typeof getFeaturedProjects>[0]; index: number; isTop: boolean; isMobile: boolean }
>(function SvgStackItem({ src, photo, project, index, isTop, isMobile }, ref) {
  const tags = project.tags.slice(0, 3);
  const textAlign = "left" as const;
  const rowJustify = "flex-start" as const;
  // Scales with viewport width (via vw + clamp) instead of a fixed px size,
  // so text stays proportional to the card instead of looking tiny on wide
  // desktop monitors where the card itself (width: 100%) renders huge.
  // Mobile keeps a flat 30%-smaller size since /m's viewport range is narrow.
  const bodySize = isMobile ? "11px" : "clamp(14px, 1.3vw, 22px)";
  const titleSize = isMobile ? "15.4px" : "clamp(22px, 3.2vw, 40px)";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "sticky", top: `${stickyTop(index)}px`, zIndex: index + 1 }}
    >
      <Link
        href={projectHref(project)}
        aria-label={`View case study: ${project.title}`}
        className="group"
        style={{
          display: "block",
          position: "relative",
          textDecoration: "none",
          transform: `rotate(${SVG_TILT_DEGREES[index] ?? 0}deg) scale(0.821)`,
          filter: isTop ? "drop-shadow(0 10px 22px rgba(0,0,0,0.22))" : "none",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" style={{ width: "100%", height: "auto", display: "block" }} />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PAPER_SVG}
          alt=""
          style={{ position: "absolute", top: "1%", left: "-1%", width: "67.8%", height: "auto", display: "block" }}
        />

        {/* Product screenshot inset into the paper's face, so the paper
            reads as a torn-photo border rather than a blank note. Height is
            "auto" so each photo keeps its own native aspect ratio instead of
            being cropped to a fixed box — footprint varies photo to photo. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt=""
          style={{
            position: "absolute",
            top: "6%",
            left: "3%",
            width: "60%",
            height: "auto",
            display: "block",
            border: "7px solid #fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        />

        {/* Same data as ProjectCard's content panel — kept on the right side of
            the bg svg so it doesn't overlap the paper on the left */}
        <div
          style={{
            position: "absolute",
            top: "8%",
            left: "61%",
            width: "42.6%",
            height: "84%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            padding: "4%",
            paddingRight: "5%",
            color: "var(--sp-charcoal)",
            textAlign,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: rowJustify, gap: "var(--spacing-8)", marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--sp-charcoal)", flexShrink: 0 }} />
            <span style={{ fontSize: bodySize, fontWeight: 700 }}>{project.category}</span>
          </div>

          <h3
            style={{
              fontSize: titleSize,
              fontWeight: 600,
              textTransform: "lowercase",
              lineHeight: 1.1,
              marginBottom: 14,
              fontFamily: "var(--font-gelica)",
            }}
          >
            {project.title}
          </h3>

          <p style={{ fontSize: bodySize, lineHeight: 1.5, marginBottom: 20, maxWidth: "60ch" }}>
            {project.shortDescription}
          </p>

          {tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: rowJustify, gap: "var(--spacing-8)", marginBottom: 24 }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: bodySize,
                    padding: "4px 10px",
                    borderRadius: 20,
                    color: "var(--sp-charcoal)",
                    border: "1px solid rgba(0,0,0,0.25)",
                    background: "rgba(255,255,255,0.35)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Timeline + CTA — absolutely positioned like the paper/text layers
            (NOT normal flow: adding flow height here would grow the Link's
            own box and throw off the rotate/scale pivot, swinging the whole
            card sideways into the next stacked item). Sits just below the
            paper and text column, spanning the full card width. */}
        <div
          style={{
            position: "absolute",
            top: "85%",
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "3% 6% 0",
            borderTop: "1px solid rgba(0,0,0,0.2)",
            color: "var(--sp-charcoal)",
          }}
        >
          {project.timeline && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: bodySize }}>
              <Calendar size={12} />
              {project.timeline}
            </span>
          )}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: bodySize, fontWeight: 500, marginLeft: "auto" }}>
            View case study
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.35)",
              }}
            >
              <ArrowUpRight size={14} />
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
});

// Tracks which sticky item is currently frontmost (i.e. actually "stuck" —
// its top edge has reached its sticky offset) as the user scrolls, so only
// that one gets a shadow instead of every item in the stack having one.
function SvgStack({
  items,
  isMobile,
}: {
  items: { id: string; src: string; photo: string; project: ReturnType<typeof getFeaturedProjects>[0] }[];
  isMobile: boolean;
}) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    function update() {
      let top = 0;
      items.forEach((_, i) => {
        const el = refs.current[i];
        if (el && el.getBoundingClientRect().top <= stickyTop(i) + 1) top = i;
      });
      setActiveIndex(top);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <>
      {items.map((item, i) => (
        <SvgStackItem
          key={item.id}
          ref={(el) => { refs.current[i] = el; }}
          src={item.src}
          photo={item.photo}
          project={item.project}
          index={i}
          isTop={i === activeIndex}
          isMobile={isMobile}
        />
      ))}
    </>
  );
}

function ProjectCard({
  project,
  index,
  isMobile,
}: {
  project: ReturnType<typeof getFeaturedProjects>[0];
  index: number;
  isMobile: boolean;
}) {
  const tags = project.tags.slice(0, isMobile ? 2 : 3);
  const { ref: parallaxRef, y: numberY } = useParallax(28);

  return (
    <motion.div
      ref={parallaxRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      // Card-stack effect: each card sticks a little lower than the one
      // before it, so as you scroll it slides in and overlaps/peeks out
      // from under the previous card instead of just stacking in flow.
      // Base offset raised (was 96) so the first card stays in normal
      // flow longer and the overlap only kicks in once it's scrolled
      // further up, instead of sticking almost immediately.
      style={{ position: "sticky", top: `${160 + index * 28}px`, zIndex: index + 1 }}
    >
      <Link
        href={projectHref(project)}
        className="group grid md:grid-cols-2 overflow-hidden rounded-xl"
        aria-label={`View case study: ${project.title}`}
        style={{
          background: "var(--sp-cream)",
          border: "1.5px solid var(--sp-charcoal)",
          boxShadow: "var(--shadow-lg)",
          minHeight: isMobile ? undefined : CARD_HEIGHT,
          // Hard cap on mobile — image below is shrunk and copy is clamped
          // so real content should fit well under this, but this guarantees
          // the card never runs taller than one screen even if it doesn't.
          maxHeight: isMobile ? "calc(100dvh - 20px)" : undefined,
        }}
      >
        {/* Visual panel — much shorter on mobile (a banner strip, not a
            near-square hero) so the card's total height stays screen-sized */}
        <div className="relative overflow-hidden" style={{ minHeight: isMobile ? 120 : CARD_HEIGHT, height: isMobile ? "22dvh" : undefined, background: "#fafafa" }}>
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 65% 65% at 30% 30%, rgba(232,81,10,0.14) 0%, transparent 70%)" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              aria-hidden="true"
              className="font-bold select-none"
              style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", color: "var(--sp-orange)", opacity: 0.16, letterSpacing: "-0.04em", y: numberY }}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>
          </div>
        </div>

        {/* Content panel */}
        <div className="flex flex-col" style={{ padding: isMobile ? "18px 20px" : "40px 48px", overflow: isMobile ? "hidden" : undefined }}>
          <div style={{ minHeight: 0, overflow: isMobile ? "hidden" : undefined }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)", marginBottom: isMobile ? 8 : 16 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--sp-orange)", flexShrink: 0 }} />
              <span style={{ fontSize: 16, fontWeight: 700, color: "var(--sp-orange)" }}>
                {project.category}
              </span>
            </div>

            <h3 style={{ fontSize: isMobile ? "20px" : "clamp(22px, 2.6vw, 32px)", fontWeight: 600, textTransform: "lowercase", color: "var(--sp-cocoa)", lineHeight: 1.1, letterSpacing: "normal", marginBottom: isMobile ? 8 : 14, fontFamily: "var(--font-gelica)" }}>
              {project.title}
            </h3>

            <p
              className={isMobile ? "line-clamp-2" : undefined}
              style={{ fontSize: isMobile ? "16px" : 16, color: "#666", lineHeight: 1.5, marginBottom: isMobile ? 10 : 20 }}
            >
              {project.shortDescription}
            </p>

            {tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-8)", marginBottom: isMobile ? 0 : 24 }}>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[16px] px-2.5 py-1 rounded-[20px]"
                    style={{ color: "#555", border: "1px solid rgba(0,0,0,0.08)", background: "rgba(0,0,0,0.02)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div
            className="flex items-center justify-between"
            style={{ marginTop: "auto", paddingTop: isMobile ? 10 : 20, flexShrink: 0, borderTop: "1px solid rgba(0,0,0,0.06)" }}
          >
            {project.timeline && (
              <span className="inline-flex items-center gap-1.5 text-[16px]" style={{ color: "#888" }}>
                <Calendar size={12} />
                {project.timeline}
              </span>
            )}
            <span
              className="inline-flex items-center gap-1.5 text-[16px] font-medium ml-auto transition-colors duration-200"
              style={{ color: "#555" }}
            >
              <span className="group-hover:text-[#111] transition-colors duration-200">View case study</span>
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                style={{ background: "rgba(0,0,0,0.05)" }}
              >
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: "var(--sp-orange)" }}
                />
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedWork({ useSvgs = false }: { useSvgs?: boolean }) {
  const isMobile = useIsMobile();
  const FEATURED_SLUGS = ["hotelogix-frontdesk", "hotelogix-pos", "hotelogix-cro", "pocket-pms"];
  const filtered = getFeaturedProjects().filter((p) => FEATURED_SLUGS.includes(p.slug));

  const mutedColor = "rgba(0,0,0,0.4)";
  const textColor = "var(--sp-cocoa)";

  return (
    <section
      className="py-[86px] md:py-[115px]"
      aria-labelledby="work-heading"
      style={{
        backgroundColor: "var(--sp-cream)",
        paddingLeft: isMobile ? "18px" : "18%",
        paddingRight: isMobile ? "18px" : "18%",
      }}
    >
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-14">
        <motion.h2
          id="work-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: isMobile ? "36px" : "48px",
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: 0,
            color: textColor,
            fontFamily: "var(--font-gelica)",
          }}
        >
          selected works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-full md:max-w-[220px] text-[16px] leading-relaxed md:text-right md:pt-1"
          style={{ color: mutedColor }}
        >
          Every project is a reflection of a commitment to quality — designed to create meaningful product experiences.
        </motion.p>
      </div>

      {/* Cards — one wide card per row (or, when useSvgs, the work-bg SVGs in the same scroll stack) */}
      <div style={{ position: "relative" }}>
        {useSvgs && !isMobile && <StackDoodles />}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-24)" }}>
          {useSvgs ? (
            <SvgStack items={filtered.map((project, i) => ({ id: project.id, src: WORK_BG_SVGS[i], photo: PROJECT_PHOTOS[i], project }))} isMobile={isMobile} />
          ) : (
            filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} isMobile={isMobile} />
            ))
          )}
        </div>
      </div>

      {/* View all */}
      <div className="flex justify-center" style={{ marginTop: 48 }}>
        <Link
          href={isMobile ? "/m/case-studies" : "/case-studies"}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "var(--sp-cream)", color: "var(--sp-charcoal)",
            border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-2xl-2)",
            padding: "0.7em 1.5em", fontSize: "16px", fontWeight: 500,
            fontFamily: "var(--font-gelica)", textDecoration: "none",
            boxShadow: "var(--shadow-subtle)",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "0.7"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
        >
          view all ↗
        </Link>
      </div>
    </section>
  );
}
