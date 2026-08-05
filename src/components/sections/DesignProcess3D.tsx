"use client";

import { useRef } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const LAYER_SIZE = 264;
const LAYER_GAP  = 114;
const STACK_CX   = 228;
const STACK_H    = LAYER_GAP * 3 + LAYER_SIZE + 100;
const STACK_SCALE = 1.08;

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
    color: "#e8510a",
    glow: "rgba(216,216,216,0.30)",
    description: "Understanding users, business goals, and market opportunities before making design decisions.",
  },
  {
    id: "ideation",
    title: "Ideation",
    gradient: "radial-gradient(ellipse at 40% 35%, #ffd4b8 0%, #FFBE9A 50%, #ffa878 100%)",
    sideColor: "#c06030",
    color: "#e8510a",
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

interface LayerCardProps {
  layer: (typeof LAYERS)[0];
  index: number;
  isActive: boolean;
  isAnyActive: boolean;
}

function LayerCard({ layer, index, isActive, isAnyActive }: LayerCardProps) {
  const [hovered, setHovered] = useState(false);
  const floatDelay = index * 0.6;
  const baseY = isActive ? -58 : hovered && !isAnyActive ? -12 : 0;

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        top: index * LAYER_GAP,
        left: STACK_CX - LAYER_SIZE / 2,
        width: LAYER_SIZE,
        height: LAYER_SIZE,
        zIndex: isActive ? 10 : LAYERS.length - index,
      }}
      animate={{
        y: [baseY - 8, baseY + 8, baseY - 8],
      }}
      transition={{
        y: {
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        },
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          transformPerspective: 900,
          rotateX: 68,
          rotateZ: 45,
          transformStyle: "preserve-3d",
          position: "relative",
        }}
        animate={{
          opacity: isAnyActive ? (isActive ? 1 : 0.16) : 1,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
      >
        {/* Back face at z=-18 */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "22px",
            backgroundColor: layer.sideColor,
            transform: "translateZ(-18px)",
          }}
          animate={{
            boxShadow: isActive
              ? `0 0 40px 12px ${layer.glow}, 0 28px 60px ${layer.glow}, 0 10px 28px rgba(0,0,0,0.35)`
              : hovered && !isAnyActive
              ? `0 0 28px 8px ${layer.glow}, 0 18px 36px ${layer.glow}, 0 6px 16px rgba(0,0,0,0.25)`
              : `0 0 18px 4px ${layer.glow}, 0 10px 24px rgba(0,0,0,0.30)`,
          }}
          transition={{ type: "spring", stiffness: 280, damping: 30 }}
        />

        {/* Side faces */}
        <div style={{ position: "absolute", left: 22, top: LAYER_SIZE, width: LAYER_SIZE - 44, height: 18, backgroundColor: layer.sideColor, transformOrigin: "top center", transform: "rotateX(-90deg)" }} />
        <div style={{ position: "absolute", left: 22, top: -18, width: LAYER_SIZE - 44, height: 18, backgroundColor: layer.sideColor, transformOrigin: "bottom center", transform: "rotateX(90deg)" }} />
        <div style={{ position: "absolute", left: 0, top: 22, width: 18, height: LAYER_SIZE - 44, backgroundColor: layer.sideColor, transformOrigin: "left center", transform: "rotateY(90deg)" }} />
        <div style={{ position: "absolute", left: LAYER_SIZE, top: 22, width: 18, height: LAYER_SIZE - 44, backgroundColor: layer.sideColor, transformOrigin: "left center", transform: "rotateY(90deg)" }} />

        {/* Top face */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "22px",
            background: layer.gradient,
            overflow: "hidden",
            boxShadow: `inset 0 0 0 1.5px rgba(255,255,255,0.25), 0 0 24px 6px ${layer.glow}`,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "22px",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
              opacity: 0.12,
              mixBlendMode: "overlay",
              pointerEvents: "none",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function DesignProcess3D() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Cursor-follow spotlight on the grid — mutates the mask position directly
  // via ref instead of React state, so it tracks at pointer speed without
  // triggering a re-render on every mousemove (same approach as the
  // site-wide CustomCursor).
  const handleGridMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const grid = gridRef.current;
    if (!grid) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const mask = `radial-gradient(circle at ${x}px ${y}px, black 0%, transparent 55%)`;
    grid.style.maskImage = mask;
    grid.style.webkitMaskImage = mask;
  };
  const handleGridMouseLeave = () => {
    const grid = gridRef.current;
    if (!grid) return;
    const mask = "radial-gradient(circle at center, black 0%, transparent 65%)";
    grid.style.maskImage = mask;
    grid.style.webkitMaskImage = mask;
  };

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // Drive active layer from scroll: divide progress into 5 bands (intro + 4 layers)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.1) setActiveIdx(null);
    else if (v < 0.33) setActiveIdx(0);
    else if (v < 0.55) setActiveIdx(1);
    else if (v < 0.77) setActiveIdx(2);
    else setActiveIdx(3);
  });

  const opacity = 1;

  const activeLayer = activeIdx !== null ? LAYERS[activeIdx] : null;

  const textPrimary = "#111111";
  const textMuted   = "rgba(0,0,0,0.45)";

  // Mobile: static list
  if (isMobile) {
    return (
      <section style={{ paddingTop: "18px", paddingBottom: "25px", paddingLeft: "20px", paddingRight: "20px", backgroundColor: "#fff" }}>
        <h2 style={{ fontSize: "34px", lineHeight: 1, fontWeight: 400, letterSpacing: 0, color: textPrimary, fontFamily: "var(--font-playfair-display), 'Playfair Display', serif", marginBottom: "20px" }}>
          Own the process.
          <span style={{ display: "block" }}>Deliver impact.</span>
        </h2>
        <p style={{ fontSize: "14px", color: textMuted, fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.75, marginBottom: "32px" }}>
          Every great product starts with deep research and clear thinking.
          My design methodology is built on precision, empathy, and collaboration
          — creating experiences that users love and businesses value.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {LAYERS.map((layer, i) => (
            <div key={layer.id} style={{ background: "#e8e8e8", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "16px", padding: "20px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <div style={{ width: 40, height: 40, borderRadius: "10px", background: layer.gradient, flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: layer.color, fontFamily: "var(--font-inter), sans-serif", marginBottom: "6px" }}>
                  {String(i + 1).padStart(2, "0")} — {layer.title}
                </p>
                <p style={{ fontSize: "13px", color: textMuted, fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.65 }}>
                  {layer.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    /* Outer scroll container — 500vh gives ~1 full scroll per layer */
    <div ref={outerRef} style={{ height: "500vh", position: "relative" }}>
      <div
        onMouseMove={handleGridMouseMove}
        onMouseLeave={handleGridMouseLeave}
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", backgroundColor: "#fff", display: "flex", alignItems: "center" }}
      >
        <div
          ref={gridRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(232,81,10,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(232,81,10,0.35) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 65%)",
            maskImage: "radial-gradient(circle at center, black 0%, transparent 65%)",
          }}
        />
        {/* Erases the grid only in the 3D stack's own footprint — painted
            over the grid (same z-index, later in DOM order) but under the
            content, so grid squares stay visible everywhere else on the
            section, including to the right of the stack. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background: "#fff",
            WebkitMaskImage: "radial-gradient(ellipse 15vw 42vh at 76% 50%, black 0%, black 65%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 15vw 42vh at 76% 50%, black 0%, black 65%, transparent 100%)",
          }}
        />
        <motion.div
          style={{
            position: "relative",
            zIndex: 1,
            opacity,
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
          <div style={{ flex: "0 0 38%", paddingRight: "48px", marginTop: `calc(-${STACK_H * 0.10}px + 20vh)` }}>
            <h2 style={{ fontSize: "48px", lineHeight: 1, fontWeight: 400, letterSpacing: 0, color: textPrimary, fontFamily: "var(--font-playfair-display), 'Playfair Display', serif", marginBottom: "20px" }}>
              Own the process.
              <span style={{ display: "block" }}>Deliver impact.</span>
            </h2>
            <p style={{ fontSize: "14px", color: textMuted, fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.75, maxWidth: "38ch", marginBottom: "24px" }}>
              Every great product starts with deep research and clear thinking.
              My design methodology is built on precision, empathy, and collaboration
              — creating experiences that users love and businesses value.
            </p>
            <div style={{ fontSize: "14px", fontWeight: 600, color: textPrimary, fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.9, letterSpacing: "-0.01em" }}>
              <div>I don&apos;t just design faster.</div>
              <div>I think deeper.</div>
              <div>I ship better.</div>
            </div>
          </div>

          {/* Col 2: Dynamic layer content */}
          <div style={{ flex: "0 0 17%", position: "relative", height: `${STACK_H}px`, marginTop: "20vh" }}>
            <AnimatePresence mode="wait">
              {activeLayer ? (
                <motion.div
                  key={activeLayer.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: "absolute", top: activeIdx !== null ? visualCenterY(activeIdx) - 40 : 0, width: "100%", background: "rgba(255,255,255,0.20)", borderRadius: "16px", padding: "16px", backdropFilter: "blur(8px)" }}
                >
                  <p style={{ fontSize: "14px", fontWeight: 600, color: activeLayer.color, fontFamily: "var(--font-inter), sans-serif", marginBottom: "10px", letterSpacing: "-0.01em" }}>
                    {activeLayer.title}
                  </p>
                  <p style={{ fontSize: "14px", color: textMuted, fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.7, maxWidth: "26ch" }}>
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
                        top: scaledCenter((i * LAYER_GAP + LAYER_SIZE / 2) * 0.864 + STACK_H * (1 - 0.864) / 2) - 11,
                        fontFamily: "var(--font-inter), sans-serif",
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
          </div>

          {/* Col 3: 3D stack */}
          <div style={{ flex: "0 0 42%", paddingLeft: "10%", paddingRight: "10%", position: "relative", overflow: "visible", height: `${STACK_H}px`, transform: `scale(${STACK_SCALE})`, transformOrigin: "center left", marginTop: "20vh" }}>
            {LAYERS.map((layer, i) => (
              <LayerCard
                key={layer.id}
                layer={layer}
                index={i}
                isActive={activeIdx === i}
                isAnyActive={activeIdx !== null}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
