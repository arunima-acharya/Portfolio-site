"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import CursorImageTrail from "@/components/ui/CursorImageTrail";

const LAYER_SIZE = 264;
const LAYER_GAP  = 114;
const STACK_H    = LAYER_GAP * 3 + LAYER_SIZE + 100;
const STACK_SCALE = 1.08;

// Individual book SVGs (public/assets/books/1.svg..4.svg), in the same
// top-to-bottom stacking order as the folder: 1=green (Research, frontmost)
// down to 4=pink (Execution, backmost) — matching LAYERS' index order.
// Each keeps its own exported aspect ratio; width is sized relative to the
// widest book (pink) so they share one common scale.
//
// Each book's drawn art is a tilted parallelogram inside its own (untilted,
// rectangular) SVG viewBox, so even at marginBottom: 0 the untouched
// corners of two stacked bounding boxes show through as visible empty
// space — margin can't be 0 to make the books look like they're actually
// touching. overlapPct is a *negative* margin-bottom, individually measured
// per book pair (by rendering each SVG and finding where its visible art
// sits at the bbox's horizontal midline) so the art itself touches, not
// just the bounding boxes.
const BOOK_MAX_WIDTH = 1525;
const BOOK_CONTAINER_WIDTH = 1500;
const BOOK_FILES = [
  { src: "1.svg", width: 1375, height: 472, layerIndex: 0, overlapPct: -13 },
  { src: "2.svg", width: 1264, height: 407, layerIndex: 1, overlapPct: -10 },
  { src: "3.svg", width: 1416, height: 432, layerIndex: 2, overlapPct: -13 },
  { src: "4.svg", width: 1525, height: 563, layerIndex: 3, overlapPct: -10 },
];

// The 3D stack (Col 3) is visually scaled up around its own vertical center via
// CSS transform, which doesn't move the label column (Col 2). This re-projects
// a label's unscaled center onto the same "scale around center" math so labels
// track their card after the scale-up.
function scaledCenter(base: number) {
  return STACK_H / 2 + (base - STACK_H / 2) * STACK_SCALE;
}

const LAYERS = [
  {
    id: "research",
    title: "Research",
    gradient: "radial-gradient(ellipse at 40% 35%, #ebebeb 0%, #D8D8D8 50%, #c2c2c2 100%)",
    sideColor: "#8a8a8a",
    color: "var(--sp-orange)",
    glow: "rgba(216,216,216,0.30)",
    description: "Understanding users, business goals, and market opportunities before making design decisions.",
  },
  {
    id: "ideation",
    title: "Ideation",
    gradient: "radial-gradient(ellipse at 40% 35%, #ffd4b8 0%, #FFBE9A 50%, #ffa878 100%)",
    sideColor: "#c06030",
    color: "var(--sp-orange)",
    glow: "rgba(255,190,154,0.30)",
    description: "Transforming insights into opportunities through exploration, collaboration, and creative problem solving.",
  },
  {
    id: "design",
    title: "Design",
    gradient: "radial-gradient(ellipse at 40% 35%, #ffb080 0%, #FF8440 50%, #ff6010 100%)",
    sideColor: "#a03800",
    color: "#FF5C02",
    glow: "rgba(255,132,64,0.35)",
    description: "Crafting intuitive experiences through wireframes, visual design, prototyping, and interaction design.",
  },
  {
    id: "execution",
    title: "Execution",
    gradient: "radial-gradient(ellipse at 40% 35%, #ff7030 0%, #FF5C02 50%, #d44400 100%)",
    sideColor: "#882800",
    color: "#FF5C02",
    glow: "rgba(255,92,2,0.40)",
    description: "Bringing ideas to life through collaboration, testing, iteration, and successful product delivery.",
  },
];

function visualCenterY(i: number) {
  return scaledCenter(i * LAYER_GAP + 48);
}

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

export default function DesignProcess3D() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useIsMobile();

  // How far the heading's natural (in-flow, left-column) position sits from
  // dead center of the viewport — measured from the real DOM element rather
  // than estimated, so the intro animation below can translate it from
  // "centered on screen" back to exactly where it already lives, instead of
  // crossfading between two separate copies (which double-exposed visibly).
  //
  // Measured *relative to the sticky pin container*, not raw viewport
  // coordinates: this section sits far down the page, so at mount time (page
  // load, scrolled to the top) the sticky pin hasn't engaged yet and the
  // heading is still wherever normal document flow puts it — thousands of
  // px below the viewport. Raw getBoundingClientRect() against the viewport
  // would capture that pre-pin position and produce a huge, wrong offset
  // that pushed the heading off-screen entirely. The sticky container is
  // styled at a fixed 100vh/full-width regardless of pin state, so its own
  // box is a stable, scroll-position-independent reference frame.
  const [introOffset, setIntroOffset] = useState({ dx: 0, dy: 0 });
  useLayoutEffect(() => {
    function measure() {
      const el = headingRef.current;
      const sticky = stickyRef.current;
      if (!el || !sticky) return;
      const elRect = el.getBoundingClientRect();
      const stickyRect = sticky.getBoundingClientRect();
      const relCenterX = elRect.left - stickyRect.left + elRect.width / 2;
      const relCenterY = elRect.top - stickyRect.top + elRect.height / 2;
      setIntroOffset({
        dx: stickyRect.width / 2 - relCenterX,
        dy: stickyRect.height / 2 - relCenterY,
      });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isMobile]);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // Reuses the pin's own scroll progress for a subtle layered parallax drift
  // between Col 1 (heading) and Col 3 (3D stack) — independent of the
  // activeIdx layer-switching logic driven by the same scrollYProgress below.
  // A standalone scroll-linked hook targeting an element inside this sticky
  // content wouldn't animate through most of the pin (the element's viewport
  // position barely changes while pinned), so this reuses the outer pin
  // progress instead, same approach as HomeIntro's background trail drift.
  const headingParallaxY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const stackParallaxY = useTransform(scrollYProgress, [0, 1], [0, 24]);

  // The section opens on just the heading, centered on screen with nothing
  // else visible; between INTRO_START and INTRO_END of the scroll the
  // heading itself slides from that centered position back to its real,
  // natural left-column spot (introOffset, measured above) while the rest
  // of Col 1/2/3 fades in, before the per-layer highlight animation below
  // takes over.
  const INTRO_START = 0.3;
  const INTRO_END = 0.6;

  // Latches open once the intro has fully played through — without this,
  // useTransform's [INTRO_START, INTRO_END] mapping is bidirectional, so
  // scrolling back up past INTRO_START (leaving the section upward) would
  // replay the intro in reverse and hide the heading/books/text again.
  const revealedRef = useRef(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v >= INTRO_END) revealedRef.current = true;
  });

  const introX = useTransform(scrollYProgress, (v) => {
    if (revealedRef.current) return 0;
    return introOffset.dx * (1 - clamp01((v - INTRO_START) / (INTRO_END - INTRO_START)));
  });
  const introY = useTransform(scrollYProgress, (v) => {
    if (revealedRef.current) return 0;
    return introOffset.dy * (1 - clamp01((v - INTRO_START) / (INTRO_END - INTRO_START)));
  });
  const restOpacity = useTransform(scrollYProgress, (v) => {
    if (revealedRef.current) return 1;
    return clamp01((v - INTRO_START) / (INTRO_END - INTRO_START));
  });

  // Gates the cursor-image-trail (below) to just the "heading alone,
  // centered" opening beat — off as soon as the intro slide begins, so it
  // never overlaps the labels/books/highlight animation that follows.
  const [introActive, setIntroActive] = useState(true);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIntroActive(v < INTRO_START);
  });

  // Drive active layer from scroll: divide progress into 5 bands (intro + 4
  // layers), remapped to start after INTRO_END so the highlight animation
  // only begins once the intro crossfade has finished.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const t = (b: number) => INTRO_END + b * (1 - INTRO_END);
    if (v < t(0.1)) setActiveIdx(null);
    else if (v < t(0.33)) setActiveIdx(0);
    else if (v < t(0.55)) setActiveIdx(1);
    else if (v < t(0.77)) setActiveIdx(2);
    else setActiveIdx(3);
  });


  const activeLayer = activeIdx !== null ? LAYERS[activeIdx] : null;

  const textPrimary = "var(--sp-charcoal)";
  const textMuted   = "#8a8580";

  // Mobile: static list
  if (isMobile) {
    return (
      <section style={{ minHeight: "100dvh", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "96px", paddingBottom: "var(--spacing-48)", paddingLeft: "var(--spacing-20)", paddingRight: "var(--spacing-20)", backgroundColor: "var(--sp-cream)" }}>
        <h2 style={{ fontSize: "34px", lineHeight: 1, fontWeight: 600, letterSpacing: 0, color: "var(--sp-cocoa)", fontFamily: "var(--font-alekan)", marginBottom: "var(--spacing-20)" }}>
          Own the process.
          <span style={{ display: "block" }}>Deliver impact.</span>
        </h2>
        <p style={{ fontSize: "16px", color: textMuted, fontFamily: "var(--font-geist), sans-serif", lineHeight: 1.75, marginBottom: "var(--spacing-32)" }}>
          Every great product starts with deep research and clear thinking.
          My design methodology is built on precision, empathy, and collaboration
          — creating experiences that users love and businesses value.
        </p>
        {/* Vertical journey — a numbered, gradient-swatched badge per step
            (same swatch progression as the desktop 3D stack: light → deep
            orange) connected by a thin line, instead of stacked flat boxes. */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {LAYERS.map((layer, i) => {
            const last = i === LAYERS.length - 1;
            // The first two swatches are pale, so the number needs dark
            // text there; the last two are saturated enough for white.
            const badgeTextColor = i < 2 ? "#5c5955" : "#fff";
            return (
              <div key={layer.id} style={{ display: "flex", gap: "18px", marginBottom: last ? 0 : "28px" }}>
                {/* Badge + connector column — top/bottom line segments are
                    equal flex:1 fillers so the badge sits vertically
                    centered against the copy card's own height, instead of
                    pinned to the top of it. */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{
                    width: 2,
                    flex: 1,
                    background: i === 0 ? "transparent" : `linear-gradient(${LAYERS[i - 1].color}, ${layer.color})`,
                    opacity: 0.35,
                  }} />
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: layer.gradient,
                    border: `2px solid ${layer.color}`,
                    boxShadow: "0 4px 14px rgba(0,0,0,0.16)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: "17px", fontWeight: 700, color: badgeTextColor, fontFamily: "var(--font-geist), sans-serif" }}>
                      {i + 1}
                    </span>
                  </div>
                  <div style={{
                    width: 2,
                    flex: 1,
                    background: last ? "transparent" : `linear-gradient(${layer.color}, ${LAYERS[i + 1].color})`,
                    opacity: 0.35,
                  }} />
                </div>

                {/* Copy — outlined card so each step reads as a distinct
                    unit instead of floating text, with a left accent
                    stripe in the step's own color. */}
                <div
                  style={{
                    flex: 1,
                    padding: "16px 18px",
                    borderRadius: "var(--radius-lg)",
                    border: "1.5px solid rgba(0,0,0,0.1)",
                    borderLeft: `4px solid ${layer.color}`,
                    background: "rgba(0,0,0,0.02)",
                  }}
                >
                  <span style={{
                    display: "inline-flex",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: layer.color,
                    fontFamily: "var(--font-geist), sans-serif",
                    letterSpacing: "0.02em",
                    padding: "3px 10px",
                    borderRadius: "var(--radius-2xl-2)",
                    border: `1.5px solid ${layer.color}`,
                    marginBottom: "10px",
                  }}>
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 style={{
                    fontSize: "20px",
                    fontWeight: 400,
                    color: textPrimary,
                    fontFamily: "var(--font-alekan)",
                    marginBottom: "var(--spacing-8)",
                  }}>
                    {layer.title}
                  </h3>
                  <p style={{ fontSize: "16px", color: textMuted, fontFamily: "var(--font-geist), sans-serif", lineHeight: 1.65 }}>
                    {layer.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    /* Outer scroll container — 500vh gives ~1 full scroll per layer */
    <div ref={outerRef} style={{ height: "500vh", position: "relative" }}>
      <div
        ref={stickyRef}
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", backgroundColor: "var(--sp-cream)", display: "flex", alignItems: "center" }}
      >
        <CursorImageTrail containerRef={stickyRef} active={introActive} />
        <motion.div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: "0",
            width: "100%",
            paddingLeft: "15%",
            paddingRight: "5%",
            minHeight: `${STACK_H}px`,
          }}
        >
          {/* Col 1: Static heading */}
          <motion.div style={{ flex: "0 0 38%", paddingRight: "var(--spacing-48)", marginTop: `calc(-${STACK_H * 0.10}px + 20vh)`, y: headingParallaxY }}>
            <motion.h2
              ref={headingRef}
              style={{ position: "relative", zIndex: 2, fontSize: "48px", lineHeight: 1, fontWeight: 600, letterSpacing: 0, color: "var(--sp-cocoa)", fontFamily: "var(--font-alekan)", marginBottom: "var(--spacing-20)", x: introX, y: introY }}
            >
              Own the process.
              <span style={{ display: "block" }}>Deliver impact.</span>
            </motion.h2>
            <motion.p style={{ opacity: restOpacity, fontSize: "16px", color: textMuted, fontFamily: "var(--font-geist), sans-serif", lineHeight: 1.75, maxWidth: "38ch", marginBottom: "var(--spacing-24)" }}>
              Every great product starts with deep research and clear thinking.
              My design methodology is built on precision, empathy, and collaboration
              — creating experiences that users love and businesses value.
            </motion.p>
            <motion.div style={{ opacity: restOpacity, fontSize: "16px", fontWeight: 600, color: textPrimary, fontFamily: "var(--font-geist), sans-serif", lineHeight: 1.9, letterSpacing: "-0.01em" }}>
              <div>I don&apos;t just design faster.</div>
              <div>I think deeper.</div>
              <div>I ship better.</div>
            </motion.div>
          </motion.div>

          {/* Col 2: Dynamic layer content */}
          <motion.div style={{ opacity: restOpacity, flex: "0 0 17%", position: "relative", height: `${STACK_H}px`, marginTop: "20vh" }}>
            <AnimatePresence mode="wait">
              {activeLayer ? (
                <motion.div
                  key={activeLayer.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: "absolute", top: activeIdx !== null ? visualCenterY(activeIdx) - 40 : 0, width: "100%", background: "rgba(255,255,255,0.20)", borderRadius: "var(--radius-2xl)", padding: "var(--spacing-16)", backdropFilter: "blur(8px)" }}
                >
                  <p style={{ fontSize: "16px", fontWeight: 600, color: activeLayer.color, fontFamily: "var(--font-geist), sans-serif", marginBottom: "10px", letterSpacing: "-0.01em" }}>
                    {activeLayer.title}
                  </p>
                  <p style={{ fontSize: "16px", color: textMuted, fontFamily: "var(--font-geist), sans-serif", lineHeight: 1.7, maxWidth: "26ch" }}>
                    {activeLayer.description}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="labels"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{ position: "relative", height: "100%" }}
                >
                  {LAYERS.map((layer, i) => (
                    <div
                      key={layer.id}
                      style={{
                        position: "absolute",
                        right: "0px",
                        top: scaledCenter((i * LAYER_GAP + LAYER_SIZE / 2) * 0.864 + STACK_H * (1 - 0.864) / 2) - 11 - (i > 0 ? STACK_H * 0.05 : 0),
                        fontFamily: "var(--font-geist), sans-serif",
                        fontSize: "18px",
                        fontWeight: 500,
                        color: layer.color,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {layer.title}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Col 3: books illustration */}
          <motion.div style={{ opacity: restOpacity, flex: "0 0 42%", paddingLeft: "10%", paddingRight: "10%", position: "relative", overflow: "visible", height: `${STACK_H}px`, scale: STACK_SCALE, y: stackParallaxY, transformOrigin: "center left", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: BOOK_CONTAINER_WIDTH, filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.18))", transform: "translateX(-10%) scale(1.7)" }}>
              {BOOK_FILES.map((book) => (
                <motion.img
                  key={book.src}
                  src={`/assets/books/${book.src}`}
                  alt=""
                  animate={{
                    filter: activeIdx !== null && activeIdx !== book.layerIndex ? "blur(8px)" : "blur(0px)",
                    opacity: 1,
                    scale: activeIdx === book.layerIndex ? 1.2 : 1,
                    y: activeIdx === book.layerIndex ? -22 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  style={{
                    width: `${(book.width / BOOK_MAX_WIDTH) * 100}%`,
                    marginBottom: `${book.overlapPct}%`,
                    zIndex: BOOK_FILES.length - book.layerIndex,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
