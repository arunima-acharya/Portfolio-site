"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
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

// Portrait-oriented variants (1957x2532 vs. the landscape 2785x1956 desktop
// set), used only on mobile.
const MOBILE_WORK_BG_SVGS = [
  "/assets/work%20bg/bg/mobile%20bg/bg%205.svg",
  "/assets/work%20bg/bg/mobile%20bg/bg%206.svg",
  "/assets/work%20bg/bg/mobile%20bg/bg%207.svg",
  "/assets/work%20bg/bg/mobile%20bg/bg%208.svg",
];

const SVG_TILT_DEGREES = [-3, 5, -6, 7];

// Small mixed-direction tilt per inset photo — fixed rather than
// Math.random() so server/client markup match (see SVG_TILT_DEGREES note
// history for why a live-random value would cause a hydration mismatch).
const PHOTO_TILT_DEGREES = [-2.5, 2, -1.5, 3];

// Per-photo width — pocket-pms's mockup screenshot is scaled down 60% (56%
// -> 22.4%) relative to the other three, which stay at the shared size.
const PHOTO_WIDTHS = ["56%", "56%", "56%", "22.4%"];
// Mobile-only, +20% over PHOTO_WIDTHS.
const PHOTO_WIDTHS_MOBILE = ["80.64%", "80.64%", "80.64%", "32.256%"];

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

// Stagger between each card's sticky position, preserving the cascading
// "peek from behind" effect now that cards are vertically centered instead
// of anchored near the top of the viewport.
const STACK_STAGGER = 28;

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
  // Mobile: base flat size, scaled up 20% per the latest request
  // (11px -> 13.2px, 15.4px -> 18.5px). bg svg itself is untouched.
  const bodySize = isMobile ? "15.84px" : "clamp(14px, 1.3vw, 22px)";
  const titleSize = isMobile ? "22.2px" : "clamp(22px, 3.2vw, 40px)";
  // Mobile-only, +20%: paper (67.8% -> 81.4%) and photo (PHOTO_WIDTHS * 1.2).
  // bg svg (the <img src={src}> below) is deliberately left at width: 100%.
  const paperWidth = isMobile ? "81.4%" : "67.8%";
  const photoWidth = (isMobile ? PHOTO_WIDTHS_MOBILE : PHOTO_WIDTHS)[index] ?? "56%";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "sticky",
        top: "10%",
        transform: `translateY(calc(-50% + ${index * STACK_STAGGER}px))`,
        zIndex: index + 1,
      }}
    >
      <Link
        href={projectHref(project)}
        aria-label={`View case study: ${project.title}`}
        className="group"
        style={{
          display: "block",
          position: "relative",
          textDecoration: "none",
          transform: `rotate(${SVG_TILT_DEGREES[index] ?? 0}deg) scale(0.9031)`,
          filter: isTop ? "drop-shadow(0 10px 22px rgba(0,0,0,0.22))" : "none",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" style={{ width: "100%", height: "auto", display: "block" }} />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PAPER_SVG}
          alt=""
          style={{ position: "absolute", top: "1%", left: "-1%", width: paperWidth, height: "auto", display: "block" }}
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
            top: isMobile ? "6%" : "11%",
            left: "3%",
            width: photoWidth,
            height: "auto",
            display: "block",
            border: "7px solid #fff",
            transform: `rotate(${PHOTO_TILT_DEGREES[index] ?? 0}deg)`,
            boxShadow: "0 6px 14px rgba(0,0,0,0.28)",
          }}
        />

        {/* Same data as ProjectCard's content panel. Desktop: kept on the
            right side of the bg svg so it doesn't overlap the paper on the
            left. Mobile: paper+photo are taller relative to card width on
            the portrait bg, so text sits below the frame instead, full width. */}
        <div
          style={{
            position: "absolute",
            top: isMobile ? "47%" : "8%",
            left: isMobile ? "5%" : "61%",
            width: isMobile ? "90%" : "42.6%",
            height: isMobile ? "38%" : "84%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            padding: "4%",
            paddingRight: "5%",
            color: "#fff",
            textAlign,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: rowJustify, gap: "var(--spacing-8)", marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", flexShrink: 0 }} />
            <span style={{ fontSize: bodySize, fontWeight: 700 }}>{project.category}</span>
          </div>

          <h3
            style={{
              fontSize: titleSize,
              fontWeight: 600,
              lineHeight: 1.1,
              marginBottom: 14,
              fontFamily: "var(--font-alekan)",
            }}
          >
            {project.title}
          </h3>

          <p style={{ fontSize: bodySize, lineHeight: 1.5, marginBottom: 20, maxWidth: "60ch" }}>
            {project.shortDescription}
          </p>

          {!isMobile && tags.length > 0 && (
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
            top: isMobile ? "87%" : "85%",
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "3% 6% 0",
            borderTop: "1px solid rgba(255,255,255,0.35)",
            color: "#fff",
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
                background: "var(--sp-charcoal)",
              }}
            >
              <ArrowUpRight size={14} color="#fff" />
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
        if (!el) return;
        // Matches the "top: 10%, translateY(-50% + i*stagger)" CSS: once
        // stuck, an element's rect.top settles at 10% of viewport height
        // minus half its own height, plus its stagger offset.
        const expectedStuckTop = window.innerHeight * 0.1 - el.offsetHeight / 2 + i * STACK_STAGGER;
        if (el.getBoundingClientRect().top <= expectedStuckTop + 1) top = i;
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

            <h3 style={{ fontSize: isMobile ? "20px" : "clamp(22px, 2.6vw, 32px)", fontWeight: 600, color: "var(--sp-cocoa)", lineHeight: 1.1, letterSpacing: "normal", marginBottom: isMobile ? 8 : 14, fontFamily: "var(--font-alekan)" }}>
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
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: 0,
            color: textColor,
            fontFamily: "var(--font-alekan)",
          }}
        >
          Selected works
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

      {/* Cards — one wide card per row (or, when useSvgs, the work-bg SVGs in the same scroll stack).
          Negative margin cancels the section's own side padding on mobile so
          the cards run edge-to-edge instead of sitting inset like the header text. */}
      <div style={{ position: "relative", marginLeft: isMobile ? "-18px" : 0, marginRight: isMobile ? "-18px" : 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-24)" }}>
          {useSvgs ? (
            <SvgStack items={filtered.map((project, i) => ({ id: project.id, src: (isMobile ? MOBILE_WORK_BG_SVGS : WORK_BG_SVGS)[i], photo: PROJECT_PHOTOS[i], project }))} isMobile={isMobile} />
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
          View all ↗
        </Link>
      </div>
    </section>
  );
}
