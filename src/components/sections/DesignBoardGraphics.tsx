"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type TargetAndTransition,
} from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

// Item sizes below (108–298px) were tuned for a wide desktop canvas. On a
// ~375px mobile viewport, positioning them at the same percentages at full
// size would collide badly, so mobile renders everything at this fraction
// of the desktop size instead — the top/left percentages stay the same,
// only the footprint of each item shrinks.
const MOBILE_SCALE = 0.572; // 0.44 base, scaled up 30% per request

// Scatter of desk-item illustrations behind the "What's on My Desk" heading
// in TypographyZoom, styled as a numbered catalogue: each item carries an
// `[0N]` index label like a product key, ordered top-to-bottom / left-to-right
// so the numbering reads naturally down the page.
//
// Each item is draggable (label included, so the two travel together), which
// is why the drag lives on the wrapper rather than the image. Hover transforms
// live on an inner layer so they compose with the drag translate instead of
// fighting it, and the label stays upright outside both.
//
// Every item also carries a `personality` driving its own hover/idle
// behaviour — see PERSONALITY NOTES at the bottom of this file for what each
// one does and, importantly, which requested effects the flat cut-out assets
// cannot support.
//
// `size` is the target for the LONGER edge of each asset's native aspect
// ratio (from `ratio`, width/height) — not a forced square box. Squaring
// every box regardless of the source image's real proportions is what
// stretched/squished non-square assets (e.g. the iced coffee cup at
// 397x628) and made them look low-res.

type LabelPos = "bl" | "br" | "l" | "r" | "tl" | "tr";

type Personality =
  | "plant"
  | "cat"
  | "croissant"
  | "headphones"
  | "lamp"
  | "notebook"
  | "notepad"
  | "coffee"
  | "candle"
  | "macbook"
  | "glasses"
  | "pen";

interface RawItem {
  file: string;
  name: string; // shown in the legend under the heading
  ratio: number; // native width / height
  top: string;
  left: string;
  // Mobile gets its own deliberate 3-column x 4-row grid position instead of
  // reusing the desktop top/left — those percentages were art-directed for a
  // wide canvas, and on a narrow tall viewport the same percentages put
  // several items' scaled boxes close enough to collide (most visibly the
  // bottom cluster around 65-68% top). A dedicated evenly-spaced grid
  // guarantees no item-vs-item overlap regardless of viewport width.
  mobileTop: string;
  mobileLeft: string;
  size: number;
  rotate: number;
  labelPos: LabelPos;
  personality: Personality;
}

const RAW_ITEMS: RawItem[] = [
  { file: "desk (2).svg",  name: "Cat",         ratio: 736 / 736,   top: "11.9%", left: "44.4%", mobileTop: "9%",  mobileLeft: "16%", size: 235, rotate: 0,   labelPos: "bl", personality: "cat" },
  { file: "desk (17).png", name: "Headphones",  ratio: 500 / 500,   top: "16.8%", left: "74.9%", mobileTop: "9%",  mobileLeft: "50%", size: 155, rotate: 0,   labelPos: "br", personality: "headphones" },
  { file: "desk (11).svg", name: "Pen",         ratio: 600 / 600,   top: "22.8%", left: "87.3%", mobileTop: "9%",  mobileLeft: "84%", size: 130, rotate: -42, labelPos: "br", personality: "pen" },
  { file: "desk (9).svg",  name: "Plant",       ratio: 736 / 736,   top: "23.6%", left: "23.2%", mobileTop: "34%", mobileLeft: "16%", size: 247, rotate: 0,   labelPos: "bl", personality: "plant" },
  { file: "desk (16).svg", name: "Croissant",   ratio: 736 / 736,   top: "29.4%", left: "46.3%", mobileTop: "34%", mobileLeft: "50%", size: 130, rotate: -12, labelPos: "br", personality: "croissant" },
  { file: "desk (15).svg", name: "Lamp",        ratio: 600 / 600,   top: "41.1%", left: "69.3%", mobileTop: "34%", mobileLeft: "84%", size: 257, rotate: 0,   labelPos: "bl", personality: "lamp" },
  { file: "desk (10).svg", name: "Notebook",    ratio: 735 / 450,   top: "65%",   left: "83%",   mobileTop: "60%", mobileLeft: "16%", size: 235, rotate: 0,   labelPos: "bl", personality: "notebook" },
  { file: "desk (12).svg", name: "Glasses",     ratio: 691 / 386,   top: "47.1%", left: "25%",   mobileTop: "60%", mobileLeft: "50%", size: 108, rotate: -4,  labelPos: "bl", personality: "glasses" },
  { file: "desk (7).svg",  name: "Candle",      ratio: 736 / 736,   top: "65.5%", left: "38.0%", mobileTop: "60%", mobileLeft: "84%", size: 130, rotate: 0,   labelPos: "br", personality: "candle" },
  { file: "desk (18).png", name: "Iced Coffee", ratio: 397 / 628,   top: "65.9%", left: "61.5%", mobileTop: "86%", mobileLeft: "16%", size: 150, rotate: 0,   labelPos: "br", personality: "coffee" },
  { file: "desk (5).svg",  name: "To-Do List",  ratio: 1494 / 1999, top: "68.0%", left: "19.6%", mobileTop: "86%", mobileLeft: "50%", size: 298, rotate: -8,  labelPos: "bl", personality: "notepad" },
  { file: "desk (19).png", name: "MacBook",     ratio: 591 / 422,   top: "78.7%", left: "49.0%", mobileTop: "86%", mobileLeft: "84%", size: 180, rotate: -6,  labelPos: "bl", personality: "macbook" },
];

const LABEL_GAP = 3;

// Eyelids for the cat's idle blink, as boxes in percent of the item box.
// Measured off the 736x736 source: the head sits upper-right, eyes just
// above the white blaze. Fur directly above each eye is near-black, so a
// dark lid sweeping down from the top edge reads as a blink.
const CAT_EYELIDS = [
  { left: "61.2%", top: "42.9%", width: "4.8%", height: "3.4%" }, // viewer-left
  { left: "71.0%", top: "41.8%", width: "4.8%", height: "3.4%" }, // viewer-right
];
const CAT_LID_COLOR = "#241d1a";

// Lines that fade onto the blank open notebook on hover.
const NOTEBOOK_LINES = ["user flows", "audit spacing", "ship v1"];

const BASE_SHADOW =
  "drop-shadow(0 2px 4px rgba(0,0,0,0.10)) drop-shadow(0 10px 24px rgba(0,0,0,0.14))";
const LIFT_SHADOW =
  "drop-shadow(0 4px 9px rgba(0,0,0,0.13)) drop-shadow(0 20px 40px rgba(0,0,0,0.20))";

// Anchors the label just outside the image box on the requested side.
function labelStyle(pos: LabelPos): React.CSSProperties {
  switch (pos) {
    case "bl": return { top: "100%", left: 0, marginTop: LABEL_GAP };
    case "br": return { top: "100%", right: 0, marginTop: LABEL_GAP };
    case "tl": return { bottom: "100%", left: 0, marginBottom: LABEL_GAP };
    case "tr": return { bottom: "100%", right: 0, marginBottom: LABEL_GAP };
    case "l":  return { top: "50%", right: "100%", marginRight: LABEL_GAP, transform: "translateY(-50%)" };
    case "r":  return { top: "50%", left: "100%", marginLeft: LABEL_GAP, transform: "translateY(-50%)" };
  }
}

// Confines an overlay (glare, glow, brighten) to the artwork's silhouette
// instead of its rectangular box, so sheens read as being *on the object*.
function silhouetteMask(src: string): React.CSSProperties {
  return {
    WebkitMaskImage: `url("${src}")`,
    maskImage: `url("${src}")`,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  };
}

const ITEMS = RAW_ITEMS.map((item, i) => {
  // Fit `size` to the longer edge, deriving the other edge from the
  // native ratio so nothing gets stretched.
  const width = item.ratio >= 1 ? item.size : item.size * item.ratio;
  const height = item.ratio >= 1 ? item.size / item.ratio : item.size;
  return {
    ...item,
    src: encodeURI(`/assets/textzoom/${item.file}`),
    width,
    height,
    label: `[${String(i + 1).padStart(2, "0")}]`,
  };
});

type Item = (typeof ITEMS)[number];

// Legend rendered under the heading. Derived from ITEMS rather than written
// out by hand so it can never drift from what's actually on the desk.
export const DESK_LEGEND = ITEMS.map((i) => `${i.label} ${i.name}`);

/* ── A single desk object ─────────────────────────────────── */
function DeskItem({ item, index, containerRef, scale }: { item: Item; index: number; containerRef: React.RefObject<HTMLDivElement | null>; scale: number }) {
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();
  const p = item.personality;
  const renderWidth = item.width * scale;
  const renderHeight = item.height * scale;
  // scale is 1 on desktop and MOBILE_SCALE elsewhere — reuse it rather than
  // threading another prop through just to pick the position table.
  const isMobile = scale !== 1;
  const restTop = isMobile ? item.mobileTop : item.top;
  const restLeft = isMobile ? item.mobileLeft : item.left;

  // Normalised pointer position within the item (-0.5 … 0.5 on each axis),
  // springed so cursor-following reads as weight rather than a snap.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 140, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 140, damping: 18, mass: 0.4 });

  const tiltX = useTransform(sy, [-0.5, 0.5], [12, -12]);   // headphones 3D
  const tiltY = useTransform(sx, [-0.5, 0.5], [-16, 16]);
  const leanY = useTransform(sx, [-0.5, 0.5], [-7, 7]);     // lamp head lean

  const followsPointer = p === "headphones" || p === "lamp";

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!followsPointer) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  function reset() {
    setHovered(false);
    px.set(0);
    py.set(0);
  }

  // Hover motion for the art layer. Base rotate is folded in so each
  // personality's delta composes with the item's resting angle.
  const r0 = item.rotate;
  const hoverAnim: TargetAndTransition = (() => {
    if (!hovered || reduce) return { rotate: r0, y: 0, scaleX: 1, scaleY: 1 };
    switch (p) {
      // Tips over and sways, like something top-heavy that got nudged.
      case "plant":     return { rotate: [r0, r0 + 2.6, r0 + 1.4, r0 + 2.2], y: -2 };
      // A stretch: lengthens a touch and settles lower.
      case "cat":       return { rotate: r0, scaleX: 1.035, scaleY: 0.985, y: 1 };
      case "croissant": return { rotate: r0 + 3, y: -6 };
      case "pen":       return { rotate: [r0, r0 + 9, r0 + 6.5, r0 + 7.5], y: 0 };
      case "notebook":
      case "notepad":   return { rotate: r0 - 1, y: -4 };
      case "coffee":    return { rotate: r0, y: -3 };
      case "macbook":   return { rotate: r0, y: -4 };
      case "glasses":   return { rotate: r0, y: -3 };
      case "candle":    return { rotate: r0, y: -3 };
      default:          return { rotate: r0, y: 0 };
    }
  })();

  const hoverTransition =
    p === "plant" || p === "pen"
      ? { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const }
      : { type: "spring" as const, stiffness: 260, damping: 20 };

  const idleLoops = !reduce;

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragMomentum={false}
      dragElastic={0.15}
      whileDrag={{ scale: 1.08, cursor: "grabbing", zIndex: 30 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={reset}
      onPointerMove={handleMove}
      // Entrance: items start stacked behind the "What's on My Desk" heading
      // (screen center, and visually behind it — this whole graphics layer
      // already sits under the heading's z-index) and spring out to their
      // resting spot once the section scrolls into view, each with a slight
      // overshoot ("bounce") and a small index-based stagger. Only top/left
      // animate here — x/y stays the constant -width/2,-height/2 centering
      // offset that `drag` uses as its own resting baseline, so the two
      // never fight over the same transform.
      initial={reduce ? false : { top: "50%", left: "50%", opacity: 0, scale: 0.3 }}
      whileInView={{ top: restTop, left: restLeft, opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={
        reduce
          ? { duration: 0 }
          : { type: "spring", stiffness: 200, damping: 15, mass: 0.7, delay: 0.1 + index * 0.045 }
      }
      style={{
        position: "absolute",
        width: renderWidth,
        height: renderHeight,
        x: -renderWidth / 2,
        y: -renderHeight / 2,
        cursor: "grab",
        touchAction: "none",
        zIndex: hovered ? 20 : 10,
        perspective: 700,
      }}
    >
      {/* Art layer — all hover/idle transforms live here so the label above
          stays upright and the drag translate on the wrapper is untouched. */}
      <motion.div
        animate={hoverAnim}
        transition={hoverTransition}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          ...(p === "headphones" ? { rotateX: tiltX, rotateY: tiltY } : null),
          ...(p === "lamp" ? { rotate: leanY } : null),
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src={item.src}
          alt=""
          width={renderWidth}
          height={renderHeight}
          draggable={false}
          animate={{ filter: hovered && !reduce ? LIFT_SHADOW : BASE_SHADOW }}
          transition={{ duration: 0.35 }}
          style={{ width: "100%", height: "100%", display: "block" }}
        />

        {/* Cat — idle blink. Lids sweep down from their top edge roughly
            every 8.7s, independent of hover. */}
        {p === "cat" && idleLoops &&
          CAT_EYELIDS.map((lid, e) => (
            <motion.div
              key={e}
              aria-hidden
              animate={{ scaleY: [0, 1, 1, 0] }}
              transition={{
                duration: 0.26,
                times: [0, 0.38, 0.62, 1],
                repeat: Infinity,
                repeatDelay: 8.5,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                ...lid,
                background: CAT_LID_COLOR,
                borderRadius: "50%",
                transformOrigin: "top",
                pointerEvents: "none",
                filter: "blur(0.6px)",
              }}
            />
          ))}

        {/* Notebook — handwritten notes fade onto the left page on hover,
            staggered so they read as being written in order. */}
        {p === "notebook" && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: "14%",
              top: "26%",
              width: "30%",
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              gap: renderWidth * 0.035,
            }}
          >
            {NOTEBOOK_LINES.map((line, l) => (
              <motion.span
                key={line}
                initial={false}
                animate={{ opacity: hovered && !reduce ? 0.72 : 0 }}
                transition={{ duration: 0.32, delay: hovered && !reduce ? l * 0.13 : 0 }}
                style={{
                  fontFamily: "var(--font-caveat), cursive",
                  fontSize: Math.max(9, renderWidth * 0.055),
                  lineHeight: 1,
                  color: "#3b3a38",
                  whiteSpace: "nowrap",
                }}
              >
                {line}
              </motion.span>
            ))}
          </div>
        )}

        {/* Lamp — warm bulb glow, blooms on hover and fades on leave. */}
        {p === "lamp" && (
          <motion.div
            aria-hidden
            animate={{ opacity: hovered && !reduce ? 1 : 0 }}
            transition={{ duration: 0.45 }}
            style={{
              position: "absolute",
              left: "6%",
              top: "4%",
              width: "52%",
              height: "42%",
              borderRadius: "50%",
              pointerEvents: "none",
              background:
                "radial-gradient(circle, rgba(255,214,140,0.85) 0%, rgba(255,198,110,0.34) 38%, rgba(255,190,100,0) 72%)",
              filter: "blur(6px)",
            }}
          />
        )}

        {/* Candle — flame flickers continuously (idle, not hover-gated). */}
        {p === "candle" && idleLoops && (
          <motion.div
            aria-hidden
            animate={{ opacity: [0.55, 0.95, 0.6, 0.85, 0.5], scale: [1, 1.12, 0.96, 1.08, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              left: "31%",
              top: "34%",
              width: "26%",
              height: "26%",
              borderRadius: "50%",
              pointerEvents: "none",
              background:
                "radial-gradient(circle, rgba(255,226,160,0.9) 0%, rgba(255,190,90,0.42) 45%, rgba(255,170,60,0) 75%)",
              filter: "blur(4px)",
            }}
          />
        )}

        {/* Coffee — steam drifts up forever. Three offset wisps so the
            rise reads as irregular rather than a single repeating puff. */}
        {p === "coffee" && idleLoops &&
          [0, 0.9, 1.8].map((delay, w) => (
            <motion.div
              key={w}
              aria-hidden
              animate={{ opacity: [0, 0.5, 0], y: [0, -34], x: [0, w === 1 ? 5 : -5], scale: [0.7, 1.25] }}
              transition={{ duration: 3.4, repeat: Infinity, delay, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: `${34 + w * 12}%`,
                top: "2%",
                width: 12,
                height: 26,
                borderRadius: "50%",
                pointerEvents: "none",
                background:
                  "radial-gradient(ellipse, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 70%)",
                filter: "blur(4px)",
              }}
            />
          ))}

        {/* Glasses / MacBook — a glare bar sweeps across on hover, masked to
            the artwork so it grazes the lenses and screen, not the box. */}
        {(p === "glasses" || p === "macbook") && (
          <motion.div
            aria-hidden
            initial={false}
            animate={hovered && !reduce ? { x: ["-120%", "120%"], opacity: [0, 1, 0] } : { opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "linear-gradient(105deg, rgba(255,255,255,0) 38%, rgba(255,255,255,0.62) 50%, rgba(255,255,255,0) 62%)",
              ...silhouetteMask(item.src),
            }}
          />
        )}

        {/* MacBook — screen brightens alongside the sheen. */}
        {p === "macbook" && (
          <motion.div
            aria-hidden
            animate={{ opacity: hovered && !reduce ? 0.16 : 0 }}
            transition={{ duration: 0.35 }}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: "linear-gradient(160deg, rgba(190,225,255,1) 0%, rgba(255,255,255,0.4) 60%)",
              ...silhouetteMask(item.src),
            }}
          />
        )}

        {/* Coffee — condensation glint on hover. */}
        {p === "coffee" && (
          <motion.div
            aria-hidden
            animate={hovered && !reduce ? { x: ["-110%", "110%"], opacity: [0, 0.9, 0] } : { opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "linear-gradient(100deg, rgba(255,255,255,0) 42%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 58%)",
              ...silhouetteMask(item.src),
            }}
          />
        )}

        {/* Headphones — soft specular lift while tilting. */}
        {p === "headphones" && (
          <motion.div
            aria-hidden
            animate={{ opacity: hovered && !reduce ? 0.22 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: "linear-gradient(140deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 55%)",
              ...silhouetteMask(item.src),
            }}
          />
        )}
      </motion.div>

      <span
        style={{
          position:      "absolute",
          fontFamily:    "var(--font-inter), sans-serif",
          fontSize:      11,
          fontWeight:    500,
          letterSpacing: "0.1em",
          color:         "#8A8783",
          whiteSpace:    "nowrap",
          pointerEvents: "none",
          ...labelStyle(item.labelPos),
        }}
      >
        {item.label}
      </span>
    </motion.div>
  );
}

export default function DesignBoardGraphics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const scale = isMobile ? MOBILE_SCALE : 1;

  return (
    <div ref={containerRef} style={{ position: "absolute", inset: 0 }}>
      {ITEMS.map((item, i) => (
        <DeskItem key={i} item={item} index={i} containerRef={containerRef} scale={scale} />
      ))}
    </div>
  );
}

/* ── PERSONALITY NOTES ─────────────────────────────────────────
 * Every asset here is a flat cut-out (SVGs wrapping an embedded raster,
 * plus three PNGs). There is no layer structure, so an effect that needs
 * to move one *part* of an object independently — a tail, an eyelid, a
 * page edge, a laptop lid — has nothing to grab hold of. Those are noted
 * below as needing new artwork rather than faked badly.
 *
 * plant      hover: tips ~2.6° and sways to rest; shadow deepens.
 *                   Per-leaf sway needs the leaves as separate layers.
 * cat        hover: stretches (scaleX up, scaleY down) and settles.
 *            idle:  blinks every ~8.7s via dark lids over the measured eye
 *                   positions (see CAT_EYELIDS). No tail animation — the
 *                   tail isn't separable from the flat photo.
 * croissant  hover: lifts 6px with a slight rotation.
 * headphones hover: true 3D tilt tracking the cursor (rotateX/rotateY on
 *                   a perspective parent) + specular sheen + deeper shadow.
 * lamp       hover: head leans toward the cursor; warm bulb glow blooms,
 *                   fades out on leave.
 * notebook   hover: lifts, counter-rotates, and handwritten notes fade onto
 *                   the blank left page in sequence. No page curl — that
 *                   needs a curl-state asset.
 * notepad    hover: lift + counter-rotate only. This asset already has its
 *                   to-do list printed on it, so nothing to fade in.
 * coffee     idle:  steam rises continuously (three offset wisps).
 *            hover: condensation glint sweeps across; slight lift.
 *                   A surface ripple needs the liquid isolated from the cup.
 * candle     idle:  flame glow flickers continuously.
 * macbook    hover: screen brightens + reflection sweeps; slight lift.
 *                   Opening the lid needs a second asset at an open angle.
 * glasses    hover: glare sweeps across the lenses, masked to the frames.
 * pen        hover: rolls ~9° and settles back — overshoot, then rest.
 * ──────────────────────────────────────────────────────────── */
