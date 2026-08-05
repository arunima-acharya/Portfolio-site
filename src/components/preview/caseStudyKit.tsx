"use client";

// Shared visual system for hand-built case-study preview pages (the
// "HotelogixFrontdeskPreview template"). Extracted so every bespoke case
// study (CRO, POS, Positivity, etc.) shares the exact same components —
// tuned once here — instead of re-implementing pixel-identical pieces per
// page. HotelogixFrontdeskPreview.tsx itself still owns its original,
// independently-verified copies and does not import from here.

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue, useSpring, type MotionValue } from "motion/react";
import { ImagePlus } from "lucide-react";

export const ff = "var(--font-manrope), sans-serif";

export function StatCard({ icon, value, label, delta, highlighted }: {
  icon?: React.ReactNode; value: string; label: React.ReactNode; delta?: string; highlighted?: boolean;
}) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      background: "#fff", borderRadius: 16, padding: "18px 22px",
      border: highlighted ? "1px solid #1C46F2" : "1px solid rgba(0,0,0,0.07)",
      boxShadow: highlighted ? "0 8px 28px rgba(28,70,242,0.22)" : "0 4px 24px rgba(0,0,0,0.04)",
      transition: "border-color 0.5s ease, box-shadow 0.5s ease",
    }}>
      {icon && (
        <div style={{
          width: 48, height: 48, borderRadius: "50%", background: "#dde3fd",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <span style={{ color: "#1C46F2", display: "flex" }}>{icon}</span>
        </div>
      )}
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontSize: 26, fontWeight: 400, color: "#111", fontFamily: ff, letterSpacing: "-0.02em" }}>{value}</span>
          {delta && <span style={{ fontSize: 14, fontWeight: 400, color: "#22c55e", fontFamily: ff }}>{delta}</span>}
        </div>
        <div style={{ fontSize: 13, color: "#666", fontFamily: ff, lineHeight: 1.35 }}>{label}</div>
      </div>
    </div>
  );
}

export function SnapshotCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ background: "#fafafa", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 16, padding: "20px 20px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10, background: "#dde3fd",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <span style={{ color: "#1C46F2", display: "flex" }}>{icon}</span>
        </div>
        <span style={{ fontSize: 13, color: "#888", fontFamily: ff }}>{label}</span>
      </div>
      <div style={{ fontSize: 16, fontWeight: 400, color: "#111", fontFamily: ff, lineHeight: 1.4 }}>{value}</div>
    </div>
  );
}

export function SectionEyebrow({ number, label, align = "center" }: { number: string; label: string; align?: "left" | "center" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: align === "left" ? "flex-start" : "center", gap: 8, marginBottom: 20 }}>
      <span style={{ fontSize: 15, fontWeight: 400, color: "#1C46F2", fontFamily: ff }}>{number}</span>
      <span style={{ fontSize: 12, fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase", color: "#888", fontFamily: ff }}>{label}</span>
    </div>
  );
}

// Renders a real screenshot when `src` is given; otherwise falls back to the
// striped placeholder. See fit modes: "height" (natural width, centered),
// "width" (full width, top-aligned crop), "cover" (fills frame exactly).
export function ScreenshotPlaceholder({ label, height, src, fit = "height" }: { label: string; height: number; src?: string; fit?: "height" | "width" | "cover" }) {
  if (src) {
    if (fit === "cover") {
      return (
        <div style={{ height, width: "100%", overflow: "hidden", background: "#f7f7f7" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- local static asset, no next/image remote pattern needed */}
          <img src={src} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      );
    }
    if (fit === "width") {
      return (
        <div style={{ height, width: "100%", overflow: "hidden", background: "#f7f7f7" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- local static asset, no next/image remote pattern needed */}
          <img src={src} alt={label} style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      );
    }
    return (
      <div style={{ height, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#f7f7f7" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- local static asset, no next/image remote pattern needed */}
        <img src={src} alt={label} style={{ height: "100%", width: "auto", display: "block" }} />
      </div>
    );
  }
  return (
    <div style={{
      height, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
      background: "repeating-linear-gradient(45deg, #fafafa, #fafafa 10px, #f2f2f2 10px, #f2f2f2 20px)",
    }}>
      <ImagePlus size={26} color="#ccc" />
      <span style={{ fontSize: 12, color: "#bbb", fontFamily: ff }}>{label}</span>
    </div>
  );
}

// Generates a placeholder "screenshot" as a data-URI SVG (diagonal stripes +
// centered label, matching ScreenshotPlaceholder's fallback look) for
// contexts that need a real image URL — e.g. HeroParallax's ProductCard —
// rather than a component fallback. Use when no real screenshot exists yet.
export function moduleThumbnail(label: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs>
      <pattern id="stripe" width="28" height="28" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
        <rect width="28" height="28" fill="#fafafa"/>
        <rect width="14" height="28" fill="#f2f2f2"/>
      </pattern>
    </defs>
    <rect width="600" height="600" fill="url(#stripe)"/>
    <circle cx="300" cy="255" r="22" fill="none" stroke="#ccc" stroke-width="2.5"/>
    <path d="M292 247h16v16h-16z" fill="none" stroke="#ccc" stroke-width="2.5"/>
    <text x="300" y="330" text-anchor="middle" font-family="Manrope, Arial, sans-serif" font-size="20" fill="#bbb">${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Wraps a mockup so it tilts/lifts in 3D (rotateX/rotateY/translateZ) to
// follow the real cursor position, like a magnetic hover card.
export function TiltMockup({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const z = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 18, mass: 0.6 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 18, mass: 0.6 });
  const springZ = useSpring(z, { stiffness: 150, damping: 18, mass: 0.6 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 14);
    rotateX.set(-py * 14);
    z.set(24);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    z.set(0);
  }

  return (
    <div style={{ perspective: 1600 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          translateZ: springZ,
          transformStyle: "preserve-3d",
          ...style,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function FloatingCard({ style, children }: { style: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div style={{
      position: "absolute", background: "#fff", borderRadius: 14,
      border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 12px 32px rgba(0,0,0,0.10)",
      padding: "14px 16px", ...style,
    }}>
      {children}
    </div>
  );
}

const SPARK_BARS = [6, 9, 7, 12, 10, 14];

export function FloatingStat({ icon, label, value, delta, positive = true, style }: {
  icon: React.ReactNode; label: string; value: string; delta: string; positive?: boolean; style: React.CSSProperties;
}) {
  return (
    <FloatingCard style={style}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{
          width: 24, height: 24, borderRadius: 7, background: "#dde3fd", color: "#1C46F2",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          {icon}
        </div>
        <div style={{ fontSize: 10, color: "#999", fontFamily: ff, whiteSpace: "nowrap" }}>{label}</div>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <div style={{ fontSize: 22, fontWeight: 400, color: "#111", fontFamily: ff }}>{value}</div>
        <div style={{ fontSize: 9.5, color: positive ? "#22c55e" : "#ef4444", fontFamily: ff, fontWeight: 400 }}>{delta}</div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 2, marginTop: 8, height: 14 }}>
        {SPARK_BARS.map((h, i) => (
          <div key={i} style={{ width: 4, height: h, borderRadius: 1, background: i === SPARK_BARS.length - 1 ? "#1C46F2" : "#eee" }} />
        ))}
      </div>
    </FloatingCard>
  );
}

export function SectionHeading({ title, subtitle, maxWidth = 640, bold = false, align = "center" }: { title: string; subtitle: string; maxWidth?: number; bold?: boolean; align?: "left" | "center" }) {
  return (
    <>
      <h2 style={{
        fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: bold ? 800 : 400, color: "#111",
        fontFamily: ff, textAlign: align, letterSpacing: "-0.02em", marginBottom: 14,
      }}>
        {title}
      </h2>
      <p style={{
        fontSize: 15.5, color: "#777", fontFamily: ff, textAlign: align, lineHeight: 1.75, maxWidth,
        margin: align === "left" ? "0 0 56px" : "0 auto 56px",
      }}>
        {subtitle}
      </p>
    </>
  );
}

export function ChallengeCard({ title, desc }: { title: string; desc: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#1C46F2" : "#fff",
        border: hovered ? "1px solid #1C46F2" : "1px solid rgba(0,0,0,0.07)",
        borderRadius: 16, padding: "26px 26px 24px", boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}
    >
      <div style={{ marginBottom: 14 }}>
        <span style={{ fontSize: 15.5, fontWeight: 700, color: hovered ? "#fff" : "#111", fontFamily: ff, transition: "color 0.25s ease" }}>{title}</span>
      </div>
      <p style={{
        fontSize: 13.5, color: hovered ? "rgba(255,255,255,0.85)" : "#777",
        fontFamily: ff, lineHeight: 1.6, margin: 0, transition: "color 0.25s ease",
      }}>{desc}</p>
    </div>
  );
}

export function Annotation({ label, style, pos = "bottom" }: { label?: string; style: React.CSSProperties; pos?: "top" | "bottom" | "right" }) {
  if (pos === "right") {
    return (
      <div style={{ position: "absolute", display: "flex", alignItems: "flex-start", gap: 6, ...style }}>
        <svg width={40} height={40} viewBox="0 0 40 40" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
          <path d="M36 34C24 34 10 26 6 6" stroke="#1C46F2" strokeWidth={1.3} strokeDasharray="3 3" fill="none" strokeLinecap="round" />
          <path d="M6 6L4 13M6 6L13 4" stroke="#1C46F2" strokeWidth={1.3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {label && <span style={{ fontSize: 14.7, color: "#1C46F2", fontFamily: ff, lineHeight: 1.3, maxWidth: 110 }}>{label}</span>}
      </div>
    );
  }
  const flip = pos === "top";
  const arrow = (
    <svg width={40} height={30} viewBox="0 0 40 30" fill="none" style={flip ? { transform: "scaleY(-1)" } : undefined}>
      <path d="M36 3C24 3 10 8 5 26" stroke="#1C46F2" strokeWidth={1.3} strokeDasharray="3 3" fill="none" strokeLinecap="round" />
      <path d="M5 26L2 19M5 26L12 24" stroke="#1C46F2" strokeWidth={1.3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const text = label && (
    <span style={{
      display: "block", fontSize: 14.7, color: "#1C46F2", fontFamily: ff, lineHeight: 1.3, maxWidth: 140,
      marginTop: flip ? 0 : 2, marginBottom: flip ? 2 : 0,
    }}>{label}</span>
  );
  return (
    <div style={{ position: "absolute", ...style }}>
      {flip ? <>{text}{arrow}</> : <>{arrow}{text}</>}
    </div>
  );
}

export function InsightCard({ badge, title, desc, children }: { badge?: string; title: string; desc: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 18,
      padding: "26px 28px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
    }}>
      {badge && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5, marginBottom: 16, background: "#EEF0FF",
          borderRadius: 999, padding: "5px 12px",
        }}>
          <span style={{ fontSize: 10.5, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6366f1", fontFamily: ff }}>{badge}</span>
        </div>
      )}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#111", fontFamily: ff, marginBottom: 6 }}>{title}</div>
        <p style={{ fontSize: 13.5, color: "#777", fontFamily: ff, lineHeight: 1.6, margin: 0, maxWidth: 320 }}>{desc}</p>
      </div>
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
}

export function SmallInsightCard({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16,
      padding: 22, boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
    }}>
      <div style={{ marginBottom: 12 }}>
        <span style={{ fontSize: 14.5, fontWeight: 700, color: "#111", fontFamily: ff }}>{title}</span>
      </div>
      <p style={{ fontSize: 12.5, color: "#777", fontFamily: ff, lineHeight: 1.55, margin: "0 0 18px" }}>{desc}</p>
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
}

export function ResearchMethodsBar({ methods }: { methods: Array<{ label: string; value: string; displayLabel?: React.ReactNode }> }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 40, background: "#fff",
      border: "1px solid rgba(0,0,0,0.07)", borderRadius: 18, padding: "32px 40px",
      maxWidth: 1160, margin: "40px auto 0", boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
    }}>
      <div style={{ flex: "0 0 200px" }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.08em", color: "#1C46F2", fontFamily: ff, marginBottom: 8 }}>
          RESEARCH METHODS
        </div>
        <p style={{ fontSize: 13, color: "#777", fontFamily: ff, lineHeight: 1.55, margin: 0 }}>
          A mix of qualitative and quantitative approaches.
        </p>
      </div>
      <div style={{ display: "flex", flex: 1 }}>
        {methods.map((m, i) => (
          <div key={m.label} style={{
            flex: 1, padding: "0 28px",
            borderLeft: i > 0 ? "1px solid rgba(0,0,0,0.08)" : "none",
          }}>
            <div style={{ fontSize: 16, fontWeight: 400, color: "#111", fontFamily: ff, lineHeight: 1.3 }}>{m.displayLabel ?? m.label}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1C46F2", fontFamily: ff, marginTop: 4 }}>{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const MOCK_TABLE_STATUSES = [
  { label: "Confirmed", bg: "#dcfce7", fg: "#16a34a" },
  { label: "Pending", bg: "#fef3c7", fg: "#ca8a04" },
  { label: "Checked-in", bg: "#dbeafe", fg: "#2563eb" },
  { label: "Cancelled", bg: "#fee2e2", fg: "#dc2626" },
];

export function MockTable({ rows = 4 }: { rows?: number }) {
  return (
    <div style={{ background: "#fbfbfb", border: "1px solid rgba(0,0,0,0.05)", borderRadius: 8, padding: "9px 11px", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", gap: 8 }}>
        {[26, 20, 20, 22].map((w, i) => <div key={i} style={{ height: 5, width: `${w}%`, borderRadius: 2, background: "#ddd" }} />)}
      </div>
      {Array.from({ length: rows }).map((_, r) => {
        const status = MOCK_TABLE_STATUSES[r % MOCK_TABLE_STATUSES.length];
        return (
          <div key={r} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#e2e2e2", flexShrink: 0 }} />
            <div style={{ height: 5, width: "20%", borderRadius: 2, background: "#eee" }} />
            <div style={{ height: 5, width: "16%", borderRadius: 2, background: "#eee" }} />
            <span style={{
              fontSize: 6.5, fontWeight: 700, padding: "2px 6px", borderRadius: 999,
              background: status.bg, color: status.fg, whiteSpace: "nowrap",
            }}>
              {status.label}
            </span>
            <div style={{ height: 5, width: "14%", borderRadius: 2, background: "#eee", marginLeft: "auto" }} />
          </div>
        );
      })}
    </div>
  );
}

export function MockSelection() {
  return (
    <div style={{ background: "#fbfbfb", border: "1px solid rgba(0,0,0,0.05)", borderRadius: 8, padding: "20px 12px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
      {[0, 1].map((r) => (
        <div key={r} style={{ display: "flex", gap: 8 }}>
          {[24, 30, 20, 18].map((w, i) => <div key={i} style={{ height: 6, width: `${w}%`, borderRadius: 2, background: "#eee" }} />)}
        </div>
      ))}
      <div style={{ position: "absolute", top: 8, left: "12%", width: "58%", height: 30, border: "1.5px dashed #1C46F2", borderRadius: 4 }}>
        {[["-4px", "-4px"], ["-4px", "calc(100% - 4px)"], ["calc(100% - 4px)", "-4px"], ["calc(100% - 4px)", "calc(100% - 4px)"]].map(([top, left], i) => (
          <span key={i} style={{ position: "absolute", top, left, width: 6, height: 6, borderRadius: "50%", background: "#1C46F2" }} />
        ))}
      </div>
    </div>
  );
}

export function MockAvatars() {
  return (
    <div style={{ background: "#fbfbfb", border: "1px solid rgba(0,0,0,0.05)", borderRadius: 8, padding: "9px 11px", display: "flex", flexDirection: "column", gap: 9 }}>
      {[true, false, false].map((active, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: active ? "#6366f1" : "#ddd", flexShrink: 0 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 3, flex: 1 }}>
            <div style={{ height: 5, width: "55%", borderRadius: 2, background: "#e2e2e2" }} />
            <div style={{ height: 4, width: "35%", borderRadius: 2, background: "#eee" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function MockForm() {
  return (
    <div style={{ background: "#fbfbfb", border: "1px solid rgba(0,0,0,0.05)", borderRadius: 8, padding: "9px 11px", display: "flex", flexDirection: "column", gap: 7 }}>
      {[0, 1].map((i) => (
        <div key={i} style={{ height: 13, borderRadius: 4, background: "#fff", border: "1px solid rgba(0,0,0,0.08)" }} />
      ))}
      <div style={{ display: "flex", gap: 4 }}>
        {[0, 1, 2].map((i) => <span key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#ef4444" }} />)}
      </div>
      <div style={{ height: 13, borderRadius: 4, background: "#14141c", width: "50%" }} />
    </div>
  );
}

const MOCK_TIMELINE_BARS = [
  { color: "#a78bfa", left: 6, width: 34 },
  { color: "#f472b6", left: 30, width: 30 },
  { color: "#86efac", left: 8, width: 28 },
  { color: "#93c5fd", left: 45, width: 32 },
];

export function MockTimeline() {
  return (
    <div style={{ background: "#fbfbfb", border: "1px solid rgba(0,0,0,0.05)", borderRadius: 8, padding: "10px 11px", display: "flex", flexDirection: "column", gap: 8 }}>
      {MOCK_TIMELINE_BARS.map((b, i) => (
        <div key={i} style={{ position: "relative", height: 8 }}>
          <div style={{ position: "absolute", left: `${b.left}%`, width: `${b.width}%`, height: 8, borderRadius: 3, background: b.color }} />
        </div>
      ))}
    </div>
  );
}

// Decorative diamond-grid ground plane with diagonal-hatch corner wedges,
// behind the sandbox boxes.
export function SandboxBackgroundGrid() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 700 700" preserveAspectRatio="xMidYMid meet" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <defs>
        <pattern id="sandboxHatch" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1={0} y1={0} x2={0} y2={7} stroke="rgba(0,0,0,0.05)" strokeWidth={5} />
        </pattern>
      </defs>
      <polygon points="350,50 650,350 350,650 50,350" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={1.5} />
      <polygon points="350,160 540,350 350,540 160,350" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth={1} />
      <polygon points="350,50 650,350 540,350 350,160" fill="url(#sandboxHatch)" />
      <polygon points="650,350 350,650 350,540 540,350" fill="url(#sandboxHatch)" />
      <polygon points="350,650 50,350 160,350 350,540" fill="url(#sandboxHatch)" />
      <polygon points="50,350 350,50 350,160 160,350" fill="url(#sandboxHatch)" />
    </svg>
  );
}

// Simplified isometric "sandbox" box — top/left/right faces as flat polygons.
export function IsoSandboxBox({ label, highlighted }: { label: string; highlighted: boolean }) {
  const stroke = highlighted ? "#1C46F2" : "#d8d8d8";
  const uid = label.replace(/[^a-z0-9]/gi, "");
  return (
    <div style={{
      transition: "transform 0.6s ease, filter 0.5s ease", transform: highlighted ? "translateY(-6px)" : "translateY(0)",
      filter: highlighted ? "drop-shadow(0 18px 26px rgba(28,70,242,0.35))" : "drop-shadow(0 8px 14px rgba(0,0,0,0.10))",
    }}>
      <svg width={190} height={130} viewBox="0 0 190 130">
        <defs>
          <linearGradient id={`top-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={highlighted ? "#eff2ff" : "#ffffff"} />
            <stop offset="100%" stopColor={highlighted ? "#b8c6ff" : "#f0f0f0"} />
          </linearGradient>
          <linearGradient id={`left-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={highlighted ? "#cfd8ff" : "#f7f7f7"} />
            <stop offset="100%" stopColor={highlighted ? "#99adff" : "#e6e6e6"} />
          </linearGradient>
          <linearGradient id={`right-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={highlighted ? "#a3b5ff" : "#f0f0f0"} />
            <stop offset="100%" stopColor={highlighted ? "#5e7bf2" : "#d8d8d8"} />
          </linearGradient>
        </defs>
        <polygon
          points="95,4 186,46 95,88 4,46"
          fill={`url(#top-${uid})`} stroke={stroke} strokeWidth={1.2}
          style={{ transition: "stroke 0.5s ease" }}
        />
        <polygon
          points="4,46 95,88 95,126 4,84"
          fill={`url(#left-${uid})`} stroke={stroke} strokeWidth={1.2}
          style={{ transition: "stroke 0.5s ease" }}
        />
        <polygon
          points="95,88 186,46 186,84 95,126"
          fill={`url(#right-${uid})`} stroke={stroke} strokeWidth={1.2}
          style={{ transition: "stroke 0.5s ease" }}
        />
        {[[95, 4], [186, 46], [95, 88], [4, 46]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2} fill="#bbb" />
        ))}
        {highlighted && (
          <>
            <ellipse cx={95} cy={46} rx={30} ry={16} fill="none" stroke="#1C46F2" strokeOpacity={0.35} strokeDasharray="3 3" />
            <circle cx={95} cy={46} r={6} fill="#1C46F2" />
          </>
        )}
        <circle cx={78} cy={58} r={3.5} fill={highlighted ? "#1C46F2" : "#22c55e"} style={{ transition: "fill 0.5s ease" }} />
        <line x1={132} y1={56} x2={150} y2={47} stroke="#ccc" strokeWidth={1.5} />
        {[0, 1, 2].map((i) => (
          <circle
            key={i} cx={140 + i * 10} cy={100 - i} r={2.5}
            fill={highlighted ? "#1C46F2" : "#a0ade0"} opacity={highlighted ? 1 : 0.5}
            style={{ transition: "fill 0.5s ease, opacity 0.5s ease" }}
          />
        ))}
      </svg>
    </div>
  );
}

// Diamond arrangement: #1 top, #2 left, #3 bottom, #4 right.
const SANDBOX_LAYOUT = [
  { label: "Sandbox #1", style: { top: 70, left: "50%", transform: "translateX(-50%)" } },
  { label: "Sandbox #2", style: { top: 150, left: 20 } },
  { label: "Sandbox #3", style: { top: 230, left: "50%", transform: "translateX(-50%)" } },
  { label: "Sandbox #4", style: { top: 150, right: 20 } },
] as const;

export type SandboxStatCard = { value: string; delta?: string; statLabel: React.ReactNode };

// Cycles the highlight through each box one at a time (few-second delay
// each), looping — the matching stat card (leftCards[0/1], rightCards[0/1])
// highlights in sync. leftCards flank the top+left boxes, rightCards flank
// the bottom+right boxes.
export function SandboxCluster({ leftCards, rightCards }: { leftCards: [SandboxStatCard, SandboxStatCard]; rightCards: [SandboxStatCard, SandboxStatCard] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setActiveIndex((i) => (i + 1) % SANDBOX_LAYOUT.length), 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 64, maxWidth: 1160, margin: "0 auto" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 260, justifySelf: "end" }}>
        {leftCards.map((c, i) => (
          <StatCard key={i} value={c.value} delta={c.delta} label={c.statLabel} highlighted={activeIndex === i} />
        ))}
      </div>

      <div style={{ position: "relative", width: 460, height: 420, transform: "scale(1.3)", transformOrigin: "center center" }}>
        <SandboxBackgroundGrid />
        {SANDBOX_LAYOUT.map((b, i) => (
          <div key={b.label} style={{ position: "absolute", ...b.style }}>
            <IsoSandboxBox label={b.label} highlighted={activeIndex === i} />
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 260, justifySelf: "start" }}>
        {rightCards.map((c, i) => (
          <StatCard key={i} value={c.value} delta={c.delta} label={c.statLabel} highlighted={activeIndex === i + 2} />
        ))}
      </div>
    </div>
  );
}

export function PrincipleCallout({ index, title, desc }: { index: string; title: string; desc: string }) {
  return (
    <div style={{
      width: "100%", background: "#fff", border: "1px solid rgba(0,0,0,0.07)",
      borderRadius: 16, padding: 20, boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#1C46F2", fontFamily: ff, marginBottom: 10 }}>{index}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#111", fontFamily: ff, marginBottom: 8, lineHeight: 1.3 }}>{title}</div>
      <p style={{ fontSize: 13, color: "#777", fontFamily: ff, lineHeight: 1.55, margin: 0 }}>{desc}</p>
    </div>
  );
}

export function SolutionStep({ number, title, desc, reverse, children }: { number: string; title: string; desc: string; reverse?: boolean; children: React.ReactNode }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid rgba(0,0,0,0.07)", borderRadius: 24,
      padding: 28, display: "flex", flexDirection: reverse ? "row-reverse" : "row",
      alignItems: "center", gap: 32, boxShadow: "0 4px 24px rgba(0,0,0,0.03)", overflow: "hidden",
    }}>
      <div style={{ flex: "0 0 40%", minWidth: 0 }}>
        <span style={{ fontSize: 36.4, fontWeight: 400, color: "#1C46F2", fontFamily: ff, display: "block", marginBottom: 10 }}>{number}</span>
        <div style={{ width: 32, height: 3, background: "#1C46F2", marginBottom: 16 }} />
        <div style={{ fontSize: 30.8, fontWeight: 400, color: "#111", fontFamily: ff, marginBottom: 10, lineHeight: 1.25 }}>{title}</div>
        <p style={{ fontSize: 19.6, color: "#777", fontFamily: ff, lineHeight: 1.6, margin: 0 }}>{desc}</p>
      </div>
      <div style={{ flex: 1, minWidth: 0, borderRadius: 14, border: "1px solid rgba(0,0,0,0.06)", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

export function SolutionPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 10, background: "#fff",
      border: "1px solid rgba(0,0,0,0.07)", borderRadius: 999, padding: "8px 18px 8px 8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
    }}>
      <span style={{
        width: 28, height: 28, borderRadius: "50%", background: "#dde3fd", color: "#1C46F2",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>{icon}</span>
      <span style={{ fontSize: 13.5, fontWeight: 500, color: "#2a2a2a", fontFamily: ff }}>{label}</span>
    </div>
  );
}

// ── Design System section pieces — same studio-wide design tokens shown
// consistently across every case study (this is "my design system", not a
// per-client one), so these constants are fixed exports rather than props.
export function DesignSystemCard({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 18,
      padding: "24px 24px 26px", boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
        <span style={{ fontSize: 12, fontWeight: 400, color: "#1C46F2", fontFamily: ff }}>{number}</span>
        <span style={{ fontSize: 15, fontWeight: 400, color: "#111", fontFamily: ff }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

export const dsLabel: React.CSSProperties = { fontSize: 9.5, fontWeight: 400, color: "#999", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: ff, marginBottom: 6 };

export const COLOR_PRIMARY = [
  { hex: "#1C46F2", label: "Primary" },
  { hex: "#8a9ff4", label: "" },
  { hex: "#859dff", label: "" },
  { hex: "#dde3fd", label: "" },
  { hex: "#111111", label: "Ink" },
];

export const COLOR_SEMANTIC = [
  { hex: "#22c55e", label: "Success" },
  { hex: "#eab308", label: "Warning" },
  { hex: "#ef4444", label: "Error" },
  { hex: "#6366f1", label: "Info" },
  { hex: "#6b7280", label: "Neutral" },
];

export const NEUTRAL_SCALE = ["#111", "#333", "#555", "#777", "#999", "#bbb", "#ddd", "#f5f5f5"];

export const TYPE_SCALE = [
  { label: "Heading 1", size: "34–56px / 1.15", weight: "Regular" },
  { label: "Heading 2", size: "28–42px / 1.3", weight: "Regular" },
  { label: "Heading 3", size: "18–22px / 1.3", weight: "Regular" },
  { label: "Body", size: "13.5–16px / 1.6", weight: "Regular" },
];

export const SPACING_SCALE = [4, 8, 12, 16, 24, 32, 48, 64];

// Renders the full 3-card Design System grid (Section 08's card row) —
// tokens are fixed (see above), so callers never need to pass them.
export function DesignSystemGrid() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 1040, margin: "0 auto" }}>
      <DesignSystemCard number="01" title="Color System">
        <div style={{ marginBottom: 14 }}>
          <div style={dsLabel}>Primary</div>
          <div style={{ display: "flex", gap: 6 }}>
            {COLOR_PRIMARY.map((c) => (
              <div key={c.hex} style={{ flex: 1 }}>
                <div style={{ height: 40, borderRadius: 8, background: c.hex, border: c.hex === "#dde3fd" ? "1px solid rgba(0,0,0,0.06)" : "none" }} />
                <div style={{ fontSize: 8, color: "#bbb", textAlign: "center", marginTop: 4, fontFamily: ff }}>{c.hex}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={dsLabel}>Semantic</div>
          <div style={{ display: "flex", gap: 6 }}>
            {COLOR_SEMANTIC.map((c) => (
              <div key={c.hex} style={{ flex: 1 }}>
                <div style={{ height: 22, borderRadius: 6, background: c.hex }} />
                <div style={{ fontSize: 8, color: "#bbb", textAlign: "center", marginTop: 3, fontFamily: ff }}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={dsLabel}>Neutral Scale</div>
          <div style={{ display: "flex", gap: 3 }}>
            {NEUTRAL_SCALE.map((c, i) => (
              <div key={i} style={{ flex: 1, height: 20, borderRadius: 4, background: c, border: i === 7 ? "1px solid rgba(0,0,0,0.08)" : "none" }} />
            ))}
          </div>
        </div>
      </DesignSystemCard>

      <DesignSystemCard number="02" title="Typography — Manrope">
        <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 12, marginBottom: 8, borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <span style={{ fontFamily: ff, fontSize: 38, fontWeight: 400, color: "#111", lineHeight: 1 }}>Aa</span>
          <span style={{ fontFamily: ff, fontSize: 13, fontWeight: 400, color: "#111" }}>Manrope</span>
        </div>
        {TYPE_SCALE.map((t, i) => (
          <div key={t.label} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0",
            borderBottom: i < TYPE_SCALE.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
          }}>
            <span style={{ fontFamily: ff, fontSize: 13, color: "#111" }}>{t.label}</span>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10.5, color: "#999", fontFamily: ff }}>{t.size}</div>
              <div style={{ fontSize: 9.5, color: "#ccc", fontFamily: ff }}>{t.weight}</div>
            </div>
          </div>
        ))}
      </DesignSystemCard>

      <DesignSystemCard number="03" title="Spacing & Layout">
        <div style={dsLabel}>Spacing Scale</div>
        {SPACING_SCALE.map((v) => (
          <div key={v} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
            <span style={{ width: 20, fontSize: 11, color: "#999", fontFamily: ff }}>{v}</span>
            <div style={{ height: 7, borderRadius: 4, background: "#1C46F2", width: v * 2.2 }} />
            <span style={{ fontSize: 11, color: "#999", fontFamily: ff }}>{v}px</span>
          </div>
        ))}
      </DesignSystemCard>
    </div>
  );
}

export function ImpactCard({ number, value, desc }: { number: string; value: string; desc: string }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "22px 20px", position: "relative",
      minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "flex-end",
    }}>
      <span style={{ position: "absolute", top: 18, right: 20, fontSize: 11, color: "#bbb", fontFamily: ff }}>{number}</span>
      <div style={{ fontSize: 32, fontWeight: 700, color: "#111", fontFamily: ff, marginBottom: 8, letterSpacing: "-0.02em" }}>{value}</div>
      <p style={{ fontSize: 12.5, color: "#777", fontFamily: ff, lineHeight: 1.5, margin: 0 }}>{desc}</p>
    </div>
  );
}

// Icon SVG expected to render as solid black (no fill/stroke attrs) — mask-
// image + solid backgroundColor recolors it exactly, since a CSS filter
// chain (hue-rotate etc.) is a linear transform that can't shift (0,0,0).
export function LessonCard({ number, title, desc, iconSrc }: { number: string; title: string; desc: string; iconSrc: string }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16,
      padding: "22px 22px 26px", position: "relative", overflow: "hidden", minHeight: 260,
      boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
    }}>
      <div aria-hidden style={{
        position: "absolute", bottom: -6, right: -18, width: 120, height: 120,
        pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          width: 112, height: 112, opacity: 0.5, backgroundColor: "#1C46F2",
          WebkitMaskImage: `url(${iconSrc})`, maskImage: `url(${iconSrc})`,
          WebkitMaskSize: "contain", maskSize: "contain",
          WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
          WebkitMaskPosition: "center", maskPosition: "center",
        }} />
      </div>
      <div style={{ position: "relative" }}>
        <span style={{ fontSize: 13, color: "#1C46F2", fontFamily: ff, marginBottom: 10, display: "block" }}>{number}</span>
        <div style={{ fontSize: 18, fontWeight: 400, color: "#111", fontFamily: ff, lineHeight: 1.3, marginBottom: 10, maxWidth: 220 }}>{title}</div>
        <p style={{ fontSize: 13, color: "#777", fontFamily: ff, lineHeight: 1.55, margin: 0, maxWidth: 220 }}>{desc}</p>
      </div>
    </div>
  );
}

export function EmptyLessonCard() {
  return <div style={{ background: "#f3f3f3", borderRadius: 16, minHeight: 260 }} />;
}

function RevealCard({ index, total, scrollYProgress, children }: {
  index: number; total: number; scrollYProgress: MotionValue<number>; children: React.ReactNode;
}) {
  const end = (index + 1) / total;
  const start = Math.max(0, end - 0.06);
  const rawOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  // Ratcheted so opacity only ever climbs toward 1 and holds there — once
  // this card has reached full opacity it can't be pulled back down by
  // scroll continuing on to reveal the next card.
  const peakRef = useRef(0);
  const opacity = useTransform(rawOpacity, (v) => {
    peakRef.current = Math.max(peakRef.current, v);
    return peakRef.current;
  });
  const y = useTransform(scrollYProgress, [start, end], [16, 0]);
  return <motion.div style={{ opacity, y }}>{children}</motion.div>;
}

export type DesignPrinciple = { index: string; title: string; desc: string };

// Scroll-pinned reveal: a browser-chrome mockup on the left cross-fades
// through `images` (one per principle) as the matching PrincipleCallout
// card reveals on the right. images[i] pairs with principles[i].
export function DesignPrinciplesScroll({ principles, images }: { principles: DesignPrinciple[]; images: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [activeStep, setActiveStep] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveStep(Math.min(principles.length - 1, Math.floor(v * principles.length)));
  });

  // Bumped every time this section leaves the viewport, and folded into
  // each RevealCard's key below — remounting them resets their internal
  // opacity ratchet, so the reveal replays from scratch on the next entry
  // instead of staying permanently revealed after the first pass.
  const [resetKey, setResetKey] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setResetKey((k) => k + 1);
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cardColumnWidth = 288;
  const columnGap = 32;
  const reserved = cardColumnWidth + columnGap;
  const centeredLeft = reserved / 2;
  const placeholderLeft = useTransform(scrollYProgress, [0, 1 / principles.length], [centeredLeft, 0]);
  const bezelSidePadding = 10;
  const chromeBarHeight = 30;
  const screenAspectRatio = 1840 / 1230;
  const innerWidth = 1160 - reserved - bezelSidePadding * 2;
  const innerHeight = Math.round(innerWidth / screenAspectRatio);
  const placeholderHeight = innerHeight + chromeBarHeight + bezelSidePadding;

  return (
    <div ref={ref} style={{ height: "400vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "relative", maxWidth: 1160, margin: "0 auto", width: "100%", height: placeholderHeight }}>
          <motion.div style={{
            position: "absolute", top: 0, left: placeholderLeft,
            width: `calc(100% - ${reserved}px)`, height: placeholderHeight,
            borderRadius: 16, background: "#e5e5e5",
            boxShadow: "0 24px 64px rgba(0,0,0,0.10)", overflow: "hidden",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
            </div>
            <div style={{ padding: `0 ${bezelSidePadding}px ${bezelSidePadding}px` }}>
              <div style={{ position: "relative", height: innerHeight, boxSizing: "border-box", background: "#fff", borderRadius: 10, overflow: "hidden", padding: 8 }}>
                {images.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element -- local static asset, no next/image remote pattern needed
                  <img
                    key={src}
                    src={src}
                    alt={principles[i].title}
                    style={{
                      position: "absolute", top: 8, left: 8, right: 8, bottom: 8, width: "calc(100% - 16px)", height: "calc(100% - 16px)", objectFit: "contain",
                      opacity: i === activeStep ? 1 : 0, transition: "opacity 0.4s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <div style={{ position: "absolute", top: 0, right: 0, width: cardColumnWidth, display: "flex", flexDirection: "column", gap: 20 }}>
            {principles.map((p, i) => (
              <RevealCard key={`${p.index}-${resetKey}`} index={i} total={principles.length} scrollYProgress={scrollYProgress}>
                <PrincipleCallout index={p.index} title={p.title} desc={p.desc} />
              </RevealCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
