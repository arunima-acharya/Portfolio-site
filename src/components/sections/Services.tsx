"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import SuperrBookFlip from "@/components/sections/SuperrBookFlip";

const services = [
  { title: "Product Design" },
  { title: "UX/UI Design" },
  { title: "SaaS & Enterprise" },
  { title: "Design Systems" },
  { title: "UX Research" },
  { title: "Design Consulting" },
];

// Mobile viewports skip the 3D flip-book notebook + decorative stickers
// entirely (too heavy for a phone) — the note artwork already has its own
// title/list baked in, so this just stacks the raw SVGs top to bottom with
// no card chrome or text overlay (that was double-rendering the content).
const noteSvgs = [
  "/assets/note/note%201.svg",
  "/assets/note/note%202.svg",
  "/assets/note/note%203.svg",
  "/assets/note/note4.svg",
];

function NotesStack() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>
      {noteSvgs.map((svg) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={svg} src={svg} alt="" style={{ width: "80%", height: "auto", display: "block", filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.18))" }} />
      ))}
    </div>
  );
}

const ease = [0.25, 0.46, 0.45, 0.94] as const;

function TextBlock({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <span style={{
        display: "inline-block",
        background: "var(--sp-cream)",
        color: "var(--sp-charcoal)",
        border: "1.5px solid var(--sp-charcoal)",
        fontSize: "16px",
        fontWeight: 500,
        padding: "6px 18px",
        borderRadius: "var(--radius-2xl-2)",
        fontFamily: "var(--font-geist), sans-serif",
        marginBottom: isMobile ? "20px" : "28px",
      }}>
        Services
      </span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        style={{
          fontSize: isMobile ? "34px" : "clamp(32px, 3.6vw, 48px)",
          fontWeight: 600,
          fontFamily: "var(--font-alekan)",
          color: "var(--sp-cocoa)",
          lineHeight: 1.1,
          letterSpacing: 0,
          marginBottom: isMobile ? "16px" : "20px",
        }}
      >
        Designing better digital products
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        style={{
          fontSize: isMobile ? "14px" : "clamp(14px, 1.4vw, 18px)",
          color: "rgba(23,23,23,0.55)",
          fontFamily: "var(--font-geist), sans-serif",
          maxWidth: "48ch",
          lineHeight: 1.6,
          marginBottom: isMobile ? "32px" : "44px",
        }}
      >
        Creating intuitive, scalable experiences that turn complex problems into simple, impactful products.
      </motion.p>

      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", columnGap: isMobile ? "10px" : "12px", rowGap: isMobile ? "10px" : "12px" }}>
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            data-hover-section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06, ease }}
          >
            <h3 style={{
              display: "inline-block",
              fontSize: isMobile ? "14px" : "15px",
              fontWeight: 500,
              color: "var(--sp-charcoal)",
              fontFamily: "var(--font-geist), sans-serif",
              background: "var(--sp-cream)",
              border: "1.5px solid var(--sp-charcoal)",
              padding: isMobile ? "8px 16px" : "10px 20px",
              borderRadius: "var(--radius-tags)",
              margin: 0,
            }}>
              {service.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </>
  );
}

function MobileLayout() {
  return (
    <section style={{ minHeight: "100dvh", display: "flex", alignItems: "center", padding: "40px 0" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--spacing-40)", width: "100%", paddingLeft: "var(--spacing-20)", paddingRight: "var(--spacing-20)" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <TextBlock isMobile />
        </div>
        <NotesStack />
      </div>
    </section>
  );
}

// Desktop: a scroll-choreographed exit, spread across a 300vh runway in
// three phases instead of a straight 50/50 split. Phase 1 (0 -> 0.25) is
// the section sitting still (pinned via position:sticky, same "extra
// scroll runway" trick as ToolkitTestimonialsOverlap.tsx) — text and
// closed book sit side by side. Phase 2 (0.25 -> 0.55) plays the actual
// transition: the cover opens (SuperrBookFlip's `progress` prop, 0->1),
// the book slides from its resting spot toward the section's horizontal
// center, and the text slides right + fades — "going under" the book
// both spatially (x-offset) and in stacking order (lower zIndex). This
// window is ~90vh, matching the original 200vh version's pace (it had
// been compressed to 60vh, which made the flip feel rushed). Phase 3
// (0.55 -> 1) is a deliberate hold: everything stays put at its "fully
// open" end state for the remaining 135vh of scroll, so the viewer
// dwells on the open book for a while before the pin finally releases
// into whatever section comes next.
function DesktopLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const flipProgress = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);
  const bookLeft = useTransform(scrollYProgress, [0.25, 0.55], ["70%", "50%"]);
  // SuperrBookFlip's box now spans the full open-spread width, with the
  // closed cover occupying only its right half (see SuperrBookFlip.tsx).
  // So the point that should sit at `bookLeft` isn't the box's own center
  // (50% into the box) at rest — it's the closed cover's center (75% into
  // the box), or the book would render half-sized and half off-screen.
  // At full open, the box's own center IS the thing to center (matching
  // "center the complete open width"). Animate x from -75% -> -50% in
  // step with `bookLeft` so the anchored point shifts from the cover's
  // center to the box's center as it opens.
  const bookX = useTransform(scrollYProgress, [0.25, 0.55], ["-75%", "-50%"]);
  const textX = useTransform(scrollYProgress, [0.25, 0.55], [0, 420]);
  const textOpacity = useTransform(scrollYProgress, [0.25, 0.43], [1, 0]);

  return (
    // The ancestor (page.tsx's PAD_SERVICES) gives this section
    // paddingLeft: var(--gutter) but paddingRight: 0 — a leftover from
    // the old grid layout where the book ran flush to the viewport's
    // right edge. That makes this box lopsided, not centered on the
    // real viewport, which is exactly why `left: 50%` below was landing
    // right of true center. Breaking out to the true full 100vw width
    // here so all the percentages below resolve against the actual
    // screen instead of that lopsided box, then re-applying the gutter
    // only where it's still wanted (the text's left edge).
    <div ref={containerRef} style={{ position: "relative", height: "300vh", marginLeft: "calc(var(--gutter) * -1)", width: "calc(100% + var(--gutter))" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", padding: "60px 0" }}>
        {/* Text layer: static centering on this wrapper, animated
            slide/fade on the motion.div child — kept separate because
            framer-motion owns the whole `transform` property on a
            motion.div, so mixing a plain CSS translateY(-50%) into the
            same node as an animated `y` would clobber one or the other. */}
        <div style={{ position: "absolute", left: "var(--gutter)", top: "50%", transform: "translateY(-50%)", zIndex: 1, maxWidth: "min(420px, 40vw)" }}>
          <motion.div style={{ x: textX, opacity: textOpacity, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <TextBlock isMobile={false} />
          </motion.div>
        </div>

        {/* Book layer: `left`/`x` are derived above; `width` is double
            the closed cover's intended on-screen width (the cover is
            only the right half of this box — see SuperrBookFlip.tsx),
            so the cover itself still renders at the same size as before
            that box was widened to fit the full open spread. */}
        <motion.div
          style={{
            position: "absolute", left: bookLeft, top: "50%", x: bookX, y: "-50%", zIndex: 2,
            width: "71.82vw",
          }}
        >
          <SuperrBookFlip fill progress={flipProgress} />
        </motion.div>
      </div>
    </div>
  );
}

export default function Services() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}
