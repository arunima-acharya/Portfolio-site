"use client";

// Shared visual system for hand-built case-study preview pages (the
// "HotelogixFrontdeskPreview template"). Extracted so every bespoke case
// study (CRO, POS, Positivity, etc.) shares the exact same components —
// tuned once here — instead of re-implementing pixel-identical pieces per
// page. HotelogixFrontdeskPreview.tsx itself still owns its original,
// independently-verified copies and does not import from here.

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue, useSpring, type MotionValue } from "motion/react";
import { ImagePlus, Quote, Lightbulb, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";

export const ff = "var(--font-geist), sans-serif";
export const ffHeading = "var(--font-gelica)";

export function StatCard({ icon, value, label, delta, highlighted }: {
  icon?: React.ReactNode; value: string; label: React.ReactNode; delta?: string; highlighted?: boolean;
}) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      background: highlighted ? "var(--sp-dew)" : "var(--sp-cream)", borderRadius: "var(--radius-xl)", padding: "18px 22px",
      border: highlighted ? "1.5px solid var(--sp-orange)" : "1.5px solid var(--sp-charcoal)",
      boxShadow: "var(--shadow-lg)",
      transition: "background-color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease",
    }}>
      {icon && (
        <div style={{
          width: 48, height: 48, borderRadius: "50%", background: highlighted ? "rgba(255,111,30,0.18)" : "rgba(255,111,30,0.12)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          transition: "background-color 0.5s ease",
        }}>
          <span style={{ color: "var(--sp-orange)", display: "flex" }}>{icon}</span>
        </div>
      )}
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontSize: 26, fontWeight: 400, color: "var(--sp-charcoal)", fontFamily: ff, letterSpacing: "-0.02em" }}>{value}</span>
          {delta && <span style={{ fontSize: 14, fontWeight: 400, color: "#22c55e", fontFamily: ff }}>{delta}</span>}
        </div>
        <div style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, lineHeight: 1.35 }}>{label}</div>
      </div>
    </div>
  );
}

export function SnapshotCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ background: "var(--sp-cream)", border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-xl)", padding: "20px 20px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10, background: "rgba(255,111,30,0.12)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <span style={{ color: "var(--sp-orange)", display: "flex" }}>{icon}</span>
        </div>
        <span style={{ fontSize: 16, color: "#8a8580", fontFamily: ff }}>{label}</span>
      </div>
      <div style={{ fontSize: 16, fontWeight: 400, color: "var(--sp-charcoal)", fontFamily: ff, lineHeight: 1.4 }}>{value}</div>
    </div>
  );
}

export function SectionEyebrow({ number, label, align = "center" }: { number: string; label: string; align?: "left" | "center" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: align === "left" ? "flex-start" : "center", gap: "var(--spacing-8)", marginBottom: 20 }}>
      <span style={{ fontSize: 16, fontWeight: 400, color: "var(--sp-orange)", fontFamily: ff }}>{number}</span>
      <span style={{ fontSize: 12, fontWeight: 400, color: "#8a8580", fontFamily: ff }}>{label}</span>
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
        <div style={{ height, width: "100%", overflow: "hidden", background: "var(--sp-dew)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- local static asset, no next/image remote pattern needed */}
          <img src={src} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      );
    }
    if (fit === "width") {
      return (
        <div style={{ height, width: "100%", overflow: "hidden", background: "var(--sp-dew)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- local static asset, no next/image remote pattern needed */}
          <img src={src} alt={label} style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      );
    }
    return (
      <div style={{ height, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "var(--sp-dew)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- local static asset, no next/image remote pattern needed */}
        <img src={src} alt={label} style={{ height: "100%", width: "auto", display: "block" }} />
      </div>
    );
  }
  return (
    <div style={{
      height, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "var(--spacing-8)",
      background: "repeating-linear-gradient(45deg, var(--sp-cream), var(--sp-cream) 10px, var(--sp-dew) 10px, var(--sp-dew) 20px)",
    }}>
      <ImagePlus size={26} color="#8a8580" />
      <span style={{ fontSize: 12, color: "#8a8580", fontFamily: ff }}>{label}</span>
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
        <rect width="28" height="28" fill="#fdfbf9"/>
        <rect width="14" height="28" fill="#f7efe9"/>
      </pattern>
    </defs>
    <rect width="600" height="600" fill="url(#stripe)"/>
    <circle cx="300" cy="255" r="22" fill="none" stroke="#8a8580" stroke-width="2.5"/>
    <path d="M292 247h16v16h-16z" fill="none" stroke="#8a8580" stroke-width="2.5"/>
    <text x="300" y="330" text-anchor="middle" font-family="Geist, Arial, sans-serif" font-size="20" fill="#8a8580">${label}</text>
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
      position: "absolute", background: "var(--sp-cream)", borderRadius: "var(--radius-xl)",
      border: "1.5px solid var(--sp-charcoal)", boxShadow: "var(--shadow-lg)",
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
      <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)", marginBottom: 8 }}>
        <div style={{
          width: 24, height: 24, borderRadius: 7, background: "rgba(255,111,30,0.12)", color: "var(--sp-orange)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          {icon}
        </div>
        <div style={{ fontSize: 10, color: "#8a8580", fontFamily: ff, whiteSpace: "nowrap" }}>{label}</div>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <div style={{ fontSize: 22, fontWeight: 400, color: "var(--sp-charcoal)", fontFamily: ff }}>{value}</div>
        <div style={{ fontSize: 9.5, color: positive ? "#22c55e" : "#ef4444", fontFamily: ff, fontWeight: 400 }}>{delta}</div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 2, marginTop: "var(--spacing-8)", height: 14 }}>
        {SPARK_BARS.map((h, i) => (
          <div key={i} style={{ width: 4, height: h, borderRadius: 1, background: i === SPARK_BARS.length - 1 ? "var(--sp-orange)" : "var(--sp-dew)" }} />
        ))}
      </div>
    </FloatingCard>
  );
}

export function SectionHeading({ title, subtitle, maxWidth = 640, bold = false, align = "center" }: { title: string; subtitle: string; maxWidth?: number; bold?: boolean; align?: "left" | "center" }) {
  return (
    <>
      <h2 style={{
        fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: bold ? 700 : 600, color: "var(--sp-cocoa)",
        fontFamily: ffHeading, textAlign: align, marginBottom: 14,
      }}>
        {title}
      </h2>
      <p style={{
        fontSize: 16, color: "#8a8580", fontFamily: ff, textAlign: align, lineHeight: 1.75, maxWidth,
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
        background: hovered ? "var(--sp-dew)" : "var(--sp-cream)",
        border: hovered ? "1.5px solid var(--sp-orange)" : "1.5px solid var(--sp-charcoal)",
        borderRadius: "var(--radius-xl)", padding: "26px 26px 24px", boxShadow: "var(--shadow-lg)",
        transition: "background-color 0.25s ease, border-color 0.25s ease",
      }}
    >
      <div style={{ marginBottom: 14 }}>
        <span style={{ fontSize: 18, fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: ffHeading, transition: "color 0.25s ease" }}>{title}</span>
      </div>
      <p style={{
        fontSize: 16, color: "#8a8580",
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
          <path d="M36 34C24 34 10 26 6 6" stroke="var(--sp-orange)" strokeWidth={1.3} strokeDasharray="3 3" fill="none" strokeLinecap="round" />
          <path d="M6 6L4 13M6 6L13 4" stroke="var(--sp-orange)" strokeWidth={1.3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {label && <span style={{ fontSize: 16, color: "var(--sp-orange)", fontFamily: ff, lineHeight: 1.3, maxWidth: 110 }}>{label}</span>}
      </div>
    );
  }
  const flip = pos === "top";
  const arrow = (
    <svg width={40} height={30} viewBox="0 0 40 30" fill="none" style={flip ? { transform: "scaleY(-1)" } : undefined}>
      <path d="M36 3C24 3 10 8 5 26" stroke="var(--sp-orange)" strokeWidth={1.3} strokeDasharray="3 3" fill="none" strokeLinecap="round" />
      <path d="M5 26L2 19M5 26L12 24" stroke="var(--sp-orange)" strokeWidth={1.3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const text = label && (
    <span style={{
      display: "block", fontSize: 16, color: "var(--sp-orange)", fontFamily: ff, lineHeight: 1.3, maxWidth: 140,
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
      background: "var(--sp-cream)", border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-xl)",
      padding: "26px 28px 32px", boxShadow: "var(--shadow-lg)",
    }}>
      {badge && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5, marginBottom: "var(--spacing-16)", background: "rgba(255,111,30,0.12)",
          borderRadius: 999, padding: "5px 12px",
        }}>
          <span style={{ fontSize: 12, fontWeight: 400, color: "var(--sp-orange)", fontFamily: ff }}>{badge}</span>
        </div>
      )}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: ffHeading, marginBottom: 6 }}>{title}</div>
        <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, lineHeight: 1.6, margin: 0, maxWidth: 320 }}>{desc}</p>
      </div>
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
}

export function SmallInsightCard({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "var(--sp-cream)", border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-xl)",
      padding: 22, boxShadow: "var(--shadow-lg)",
    }}>
      <div style={{ marginBottom: 12 }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: ffHeading }}>{title}</span>
      </div>
      <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, lineHeight: 1.55, margin: "0 0 18px" }}>{desc}</p>
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
}

export function ResearchMethodsBar({ methods }: { methods: Array<{ label: string; value: string; displayLabel?: React.ReactNode }> }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "var(--spacing-40)", background: "var(--sp-cream)",
      border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-xl)", padding: "32px 40px",
      maxWidth: 1160, margin: "40px auto 0", boxShadow: "var(--shadow-lg)",
    }}>
      <div style={{ flex: "0 0 200px" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--sp-orange)", fontFamily: ff, marginBottom: 8 }}>
          RESEARCH METHODS
        </div>
        <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, lineHeight: 1.55, margin: 0 }}>
          A mix of qualitative and quantitative approaches.
        </p>
      </div>
      <div style={{ display: "flex", flex: 1 }}>
        {methods.map((m, i) => (
          <div key={m.label} style={{
            flex: 1, padding: "0 28px",
            borderLeft: i > 0 ? "1px solid rgba(23,23,23,0.08)" : "none",
          }}>
            <div style={{ fontSize: 16, fontWeight: 400, color: "var(--sp-charcoal)", fontFamily: ff, lineHeight: 1.3 }}>{m.displayLabel ?? m.label}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--sp-orange)", fontFamily: ff, marginTop: 4 }}>{m.value}</div>
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
    <div style={{ background: "var(--sp-dew)", border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-lg)", padding: "9px 11px", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", gap: 8 }}>
        {[26, 20, 20, 22].map((w, i) => <div key={i} style={{ height: 5, width: `${w}%`, borderRadius: "var(--radius-sm)", background: "#ddd" }} />)}
      </div>
      {Array.from({ length: rows }).map((_, r) => {
        const status = MOCK_TABLE_STATUSES[r % MOCK_TABLE_STATUSES.length];
        return (
          <div key={r} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#e2e2e2", flexShrink: 0 }} />
            <div style={{ height: 5, width: "20%", borderRadius: "var(--radius-sm)", background: "#eee" }} />
            <div style={{ height: 5, width: "16%", borderRadius: "var(--radius-sm)", background: "#eee" }} />
            <span style={{
              fontSize: 6.5, fontWeight: 700, padding: "2px 6px", borderRadius: 999,
              background: status.bg, color: status.fg, whiteSpace: "nowrap",
            }}>
              {status.label}
            </span>
            <div style={{ height: 5, width: "14%", borderRadius: "var(--radius-sm)", background: "#eee", marginLeft: "auto" }} />
          </div>
        );
      })}
    </div>
  );
}

export function MockSelection() {
  return (
    <div style={{ background: "var(--sp-dew)", border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-lg)", padding: "20px 12px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
      {[0, 1].map((r) => (
        <div key={r} style={{ display: "flex", gap: 8 }}>
          {[24, 30, 20, 18].map((w, i) => <div key={i} style={{ height: 6, width: `${w}%`, borderRadius: "var(--radius-sm)", background: "#eee" }} />)}
        </div>
      ))}
      <div style={{ position: "absolute", top: 8, left: "12%", width: "58%", height: 30, border: "1.5px dashed var(--sp-orange)", borderRadius: 4 }}>
        {[["-4px", "-4px"], ["-4px", "calc(100% - 4px)"], ["calc(100% - 4px)", "-4px"], ["calc(100% - 4px)", "calc(100% - 4px)"]].map(([top, left], i) => (
          <span key={i} style={{ position: "absolute", top, left, width: 6, height: 6, borderRadius: "50%", background: "var(--sp-orange)" }} />
        ))}
      </div>
    </div>
  );
}

export function MockAvatars() {
  return (
    <div style={{ background: "var(--sp-dew)", border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-lg)", padding: "9px 11px", display: "flex", flexDirection: "column", gap: 9 }}>
      {[true, false, false].map((active, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: active ? "var(--sp-orange)" : "#ddd", flexShrink: 0 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 3, flex: 1 }}>
            <div style={{ height: 5, width: "55%", borderRadius: "var(--radius-sm)", background: "#e2e2e2" }} />
            <div style={{ height: 4, width: "35%", borderRadius: "var(--radius-sm)", background: "#eee" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function MockForm() {
  return (
    <div style={{ background: "var(--sp-dew)", border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-lg)", padding: "9px 11px", display: "flex", flexDirection: "column", gap: 7 }}>
      {[0, 1].map((i) => (
        <div key={i} style={{ height: 13, borderRadius: 4, background: "var(--sp-cream)", border: "1px solid rgba(23,23,23,0.10)" }} />
      ))}
      <div style={{ display: "flex", gap: 4 }}>
        {[0, 1, 2].map((i) => <span key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#ef4444" }} />)}
      </div>
      <div style={{ height: 13, borderRadius: 4, background: "var(--sp-charcoal)", width: "50%" }} />
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
    <div style={{ background: "var(--sp-dew)", border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-lg)", padding: "10px 11px", display: "flex", flexDirection: "column", gap: 8 }}>
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
          <line x1={0} y1={0} x2={0} y2={7} stroke="rgba(23,23,23,0.06)" strokeWidth={5} />
        </pattern>
      </defs>
      <polygon points="350,50 650,350 350,650 50,350" fill="none" stroke="rgba(23,23,23,0.08)" strokeWidth={1.5} />
      <polygon points="350,160 540,350 350,540 160,350" fill="none" stroke="rgba(23,23,23,0.06)" strokeWidth={1} />
      <polygon points="350,50 650,350 540,350 350,160" fill="url(#sandboxHatch)" />
      <polygon points="650,350 350,650 350,540 540,350" fill="url(#sandboxHatch)" />
      <polygon points="350,650 50,350 160,350 350,540" fill="url(#sandboxHatch)" />
      <polygon points="50,350 350,50 350,160 160,350" fill="url(#sandboxHatch)" />
    </svg>
  );
}

// Simplified isometric "sandbox" box — top/left/right faces as flat polygons.
export function IsoSandboxBox({ label, highlighted }: { label: string; highlighted: boolean }) {
  const stroke = highlighted ? "var(--sp-orange)" : "#d8d8d8";
  const uid = label.replace(/[^a-z0-9]/gi, "");
  return (
    <div style={{
      transition: "transform 0.6s ease, filter 0.5s ease", transform: highlighted ? "translateY(-6px)" : "translateY(0)",
      filter: highlighted ? "drop-shadow(0 18px 26px rgba(255,111,30,0.32))" : "drop-shadow(0 8px 14px rgba(0,0,0,0.10))",
    }}>
      <svg width={190} height={130} viewBox="0 0 190 130">
        <defs>
          <linearGradient id={`top-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={highlighted ? "#fff5ec" : "#ffffff"} />
            <stop offset="100%" stopColor={highlighted ? "#ffcda3" : "#f0f0f0"} />
          </linearGradient>
          <linearGradient id={`left-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={highlighted ? "#ffe0c7" : "#f7f7f7"} />
            <stop offset="100%" stopColor={highlighted ? "#ffb27a" : "#e6e6e6"} />
          </linearGradient>
          <linearGradient id={`right-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={highlighted ? "#ffb27a" : "#f0f0f0"} />
            <stop offset="100%" stopColor={highlighted ? "var(--sp-orange)" : "#d8d8d8"} />
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
            <ellipse cx={95} cy={46} rx={30} ry={16} fill="none" stroke="var(--sp-orange)" strokeOpacity={0.35} strokeDasharray="3 3" />
            <circle cx={95} cy={46} r={6} fill="var(--sp-orange)" />
          </>
        )}
        <circle cx={78} cy={58} r={3.5} fill={highlighted ? "var(--sp-orange)" : "#22c55e"} style={{ transition: "fill 0.5s ease" }} />
        <line x1={132} y1={56} x2={150} y2={47} stroke="#ccc" strokeWidth={1.5} />
        {[0, 1, 2].map((i) => (
          <circle
            key={i} cx={140 + i * 10} cy={100 - i} r={2.5}
            fill={highlighted ? "var(--sp-orange)" : "#c4c4c4"} opacity={highlighted ? 1 : 0.5}
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
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: "var(--spacing-64)", maxWidth: 1160, margin: "0 auto" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-20)", maxWidth: 260, justifySelf: "end" }}>
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

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-20)", maxWidth: 260, justifySelf: "start" }}>
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
      width: "100%", background: "var(--sp-cream)", border: "1.5px solid var(--sp-charcoal)",
      borderRadius: "var(--radius-xl)", padding: "var(--spacing-20)", boxShadow: "var(--shadow-lg)",
    }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: "var(--sp-orange)", fontFamily: ff, marginBottom: 10 }}>{index}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "var(--sp-charcoal)", fontFamily: ff, marginBottom: "var(--spacing-8)", lineHeight: 1.3 }}>{title}</div>
      <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, lineHeight: 1.55, margin: 0 }}>{desc}</p>
    </div>
  );
}

export function SolutionStep({ number, title, desc, reverse, children }: { number: string; title: string; desc: string; reverse?: boolean; children: React.ReactNode }) {
  return (
    <div style={{
      background: "var(--sp-cream)",
      border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-xl)",
      padding: "var(--spacing-28)", display: "flex", flexDirection: reverse ? "row-reverse" : "row",
      alignItems: "center", gap: "var(--spacing-32)", boxShadow: "var(--shadow-lg)", overflow: "hidden",
    }}>
      <div style={{ flex: "0 0 40%", minWidth: 0 }}>
        <span style={{ fontSize: 36.4, fontWeight: 400, color: "var(--sp-orange)", fontFamily: ff, display: "block", marginBottom: 10 }}>{number}</span>
        <div style={{ width: 32, height: 3, background: "var(--sp-orange)", marginBottom: 16 }} />
        <div style={{ fontSize: 30.8, fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: ffHeading, marginBottom: 10, lineHeight: 1.25 }}>{title}</div>
        <p style={{ fontSize: 19.6, color: "#8a8580", fontFamily: ff, lineHeight: 1.6, margin: 0 }}>{desc}</p>
      </div>
      <div style={{ flex: 1, minWidth: 0, borderRadius: "var(--radius-xl)", border: "1.5px solid var(--sp-charcoal)", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

// ── Solution card ─────────────────────────────────────────────
// Richer alternative to SolutionStep: a split card with a
// Challenge/Approach/Impact breakdown on the left and a screenshot on the
// right. Use when each solution needs to show its reasoning, not just a
// caption.
function SolutionRow({ icon, iconBg, iconColor, label, labelColor, children, last }: {
  icon: React.ReactNode; iconBg: string; iconColor: string; label: string; labelColor: string;
  children: React.ReactNode; last?: boolean;
}) {
  return (
    <div style={{ display: "flex", gap: 14, marginBottom: last ? 0 : 22 }}>
      <div style={{
        width: 30, height: 30, borderRadius: "50%", background: iconBg, color: iconColor,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1,
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: labelColor, fontFamily: ff, marginBottom: 5, letterSpacing: "0.03em" }}>
          {label}
        </div>
        <div style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, lineHeight: 1.55 }}>{children}</div>
      </div>
    </div>
  );
}

// A trailing "%" marks the value as a metric, which renders bold with its
// caption trailing; anything else renders as a plain qualitative bullet.
function ImpactItem({ value, caption }: { value: string; caption?: string }) {
  const isMetric = /%$/.test(value);
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--sp-orange)", flexShrink: 0, alignSelf: "center" }} />
      {isMetric ? (
        <span style={{ fontSize: 16, color: "#8a8580", fontFamily: ff }}>
          <strong style={{ color: "var(--sp-charcoal)", fontWeight: 700 }}>{value}</strong>
          {caption ? ` ${caption}` : ""}
        </span>
      ) : (
        <span style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, fontWeight: 500 }}>{value}</span>
      )}
    </div>
  );
}

export function SolutionCard({ number, title, challenge, approach, impact, children }: {
  number: string; title: string; challenge: string; approach: string;
  impact: Array<{ value: string; caption?: string }>; children: React.ReactNode;
}) {
  return (
    <div style={{
      background: "var(--sp-cream)",
      border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-xl)",
      padding: "var(--spacing-32)", display: "flex",
      alignItems: "stretch", gap: "var(--spacing-40)", boxShadow: "var(--shadow-lg)", overflow: "hidden",
    }}>
      <div style={{ flex: "0 0 44%", minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 18 }}>
          <span style={{ fontSize: 38, fontWeight: 700, color: "var(--sp-orange)", fontFamily: ff, lineHeight: 1 }}>{number}</span>
          <h3 style={{ fontSize: 24, fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: ffHeading, lineHeight: 1.3, margin: 0 }}>{title}</h3>
        </div>
        <div style={{ width: 40, height: 2, background: "rgba(23,23,23,0.12)", marginBottom: 24 }} />

        <SolutionRow icon={<AlertTriangle size={15} />} iconBg="#fde3e0" iconColor="#e35347" label="Challenge" labelColor="#e35347">
          {challenge}
        </SolutionRow>
        <SolutionRow icon={<CheckCircle2 size={15} />} iconBg="#d9f4e3" iconColor="#22a35a" label="Approach" labelColor="#22a35a">
          {approach}
        </SolutionRow>
        <SolutionRow icon={<TrendingUp size={15} />} iconBg="rgba(255,111,30,0.12)" iconColor="var(--sp-orange)" label="Impact" labelColor="var(--sp-orange)" last>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {impact.map((item, i) => <ImpactItem key={i} {...item} />)}
          </div>
        </SolutionRow>
      </div>
      <div style={{ flex: 1, minWidth: 0, borderRadius: "var(--radius-xl)", border: "1.5px solid var(--sp-charcoal)", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

export function SolutionPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 10, background: "var(--sp-cream)",
      border: "1.5px solid var(--sp-charcoal)", borderRadius: 999, padding: "8px 18px 8px 8px",
      boxShadow: "var(--shadow-lg)",
    }}>
      <span style={{
        width: 28, height: 28, borderRadius: "50%", background: "rgba(255,111,30,0.12)", color: "var(--sp-orange)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>{icon}</span>
      <span style={{ fontSize: 16, fontWeight: 500, color: "var(--sp-charcoal)", fontFamily: ff }}>{label}</span>
    </div>
  );
}

// ── Design System section pieces — same studio-wide design tokens shown
// consistently across every case study (this is "my design system", not a
// per-client one), so these constants are fixed exports rather than props.
export function DesignSystemCard({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "var(--sp-cream)", border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-xl)",
      padding: "24px 24px 26px", boxShadow: "var(--shadow-lg)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)", marginBottom: 18 }}>
        <span style={{ fontSize: 16, fontWeight: 400, color: "var(--sp-orange)", fontFamily: ff }}>{number}</span>
        <span style={{ fontSize: 16, fontWeight: 400, color: "var(--sp-charcoal)", fontFamily: ff }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

// Compact spec-sheet micro-labels below (9.5-11px) are decorative
// diagram/spec annotations, not reading-content body copy — exempted from
// the 16px minimum, matching the same exemption applied elsewhere in this
// codebase's dashboard mockups.
export const dsLabel: React.CSSProperties = { fontSize: 9.5, fontWeight: 400, color: "#8a8580", fontFamily: ff, marginBottom: 6 };

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
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--spacing-20)", maxWidth: 1040, margin: "0 auto" }}>
      <DesignSystemCard number="01" title="Color System">
        <div style={{ marginBottom: 14 }}>
          <div style={dsLabel}>Primary</div>
          <div style={{ display: "flex", gap: 6 }}>
            {COLOR_PRIMARY.map((c) => (
              <div key={c.hex} style={{ flex: 1 }}>
                <div style={{ height: 40, borderRadius: "var(--radius-lg)", background: c.hex, border: c.hex === "#dde3fd" ? "1px solid rgba(23,23,23,0.06)" : "none" }} />
                <div style={{ fontSize: 8, color: "#8a8580", textAlign: "center", marginTop: "var(--spacing-4)", fontFamily: ff }}>{c.hex}</div>
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
                <div style={{ fontSize: 8, color: "#8a8580", textAlign: "center", marginTop: 3, fontFamily: ff }}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={dsLabel}>Neutral Scale</div>
          <div style={{ display: "flex", gap: 3 }}>
            {NEUTRAL_SCALE.map((c, i) => (
              <div key={i} style={{ flex: 1, height: 20, borderRadius: 4, background: c, border: i === 7 ? "1px solid rgba(23,23,23,0.08)" : "none" }} />
            ))}
          </div>
        </div>
      </DesignSystemCard>

      <DesignSystemCard number="02" title="Typography — Geist">
        <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: "var(--spacing-12)", marginBottom: "var(--spacing-8)", borderBottom: "1px solid rgba(23,23,23,0.06)" }}>
          <span style={{ fontFamily: ff, fontSize: 38, fontWeight: 400, color: "var(--sp-charcoal)", lineHeight: 1 }}>Aa</span>
          <span style={{ fontFamily: ff, fontSize: 16, fontWeight: 400, color: "var(--sp-charcoal)" }}>Geist</span>
        </div>
        {TYPE_SCALE.map((t, i) => (
          <div key={t.label} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0",
            borderBottom: i < TYPE_SCALE.length - 1 ? "1px solid rgba(23,23,23,0.05)" : "none",
          }}>
            <span style={{ fontFamily: ff, fontSize: 16, color: "var(--sp-charcoal)" }}>{t.label}</span>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10.5, color: "#8a8580", fontFamily: ff }}>{t.size}</div>
              <div style={{ fontSize: 9.5, color: "#8a8580", fontFamily: ff }}>{t.weight}</div>
            </div>
          </div>
        ))}
      </DesignSystemCard>

      <DesignSystemCard number="03" title="Spacing & Layout">
        <div style={dsLabel}>Spacing Scale</div>
        {SPACING_SCALE.map((v) => (
          <div key={v} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
            <span style={{ width: 20, fontSize: 11, color: "#8a8580", fontFamily: ff }}>{v}</span>
            <div style={{ height: 7, borderRadius: 4, background: "var(--sp-orange)", width: v * 2.2 }} />
            <span style={{ fontSize: 11, color: "#8a8580", fontFamily: ff }}>{v}px</span>
          </div>
        ))}
      </DesignSystemCard>
    </div>
  );
}

export function ImpactCard({ number, value, desc }: { number: string; value: string; desc: string }) {
  return (
    <div style={{
      background: "var(--sp-cream)", border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-xl)", padding: "22px 20px", position: "relative",
      minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "flex-end", boxShadow: "var(--shadow-lg)",
    }}>
      <span style={{ position: "absolute", top: 18, right: 20, fontSize: 16, color: "#8a8580", fontFamily: ff }}>{number}</span>
      <div style={{ fontSize: 32, fontWeight: 700, color: "var(--sp-charcoal)", fontFamily: ff, marginBottom: "var(--spacing-8)", letterSpacing: "-0.02em" }}>{value}</div>
      <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, lineHeight: 1.5, margin: 0 }}>{desc}</p>
    </div>
  );
}

// Icon SVG expected to render as solid black (no fill/stroke attrs) — mask-
// image + solid backgroundColor recolors it exactly, since a CSS filter
// chain (hue-rotate etc.) is a linear transform that can't shift (0,0,0).
export function LessonCard({ number, title, desc, iconSrc }: { number: string; title: string; desc: string; iconSrc: string }) {
  return (
    <div style={{
      background: "var(--sp-cream)", border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-xl)",
      padding: "22px 22px 26px", position: "relative", overflow: "hidden", minHeight: 260,
      boxShadow: "var(--shadow-lg)",
    }}>
      <div aria-hidden style={{
        position: "absolute", bottom: -6, right: -18, width: 120, height: 120,
        pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          width: 112, height: 112, opacity: 0.5, backgroundColor: "var(--sp-orange)",
          WebkitMaskImage: `url(${iconSrc})`, maskImage: `url(${iconSrc})`,
          WebkitMaskSize: "contain", maskSize: "contain",
          WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
          WebkitMaskPosition: "center", maskPosition: "center",
        }} />
      </div>
      <div style={{ position: "relative" }}>
        <span style={{ fontSize: 16, color: "var(--sp-orange)", fontFamily: ff, marginBottom: 10, display: "block" }}>{number}</span>
        <div style={{ fontSize: 18, fontWeight: 400, color: "var(--sp-charcoal)", fontFamily: ff, lineHeight: 1.3, marginBottom: 10, maxWidth: 220 }}>{title}</div>
        <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, lineHeight: 1.55, margin: 0, maxWidth: 220 }}>{desc}</p>
      </div>
    </div>
  );
}

export function EmptyLessonCard() {
  return <div style={{ background: "var(--sp-dew)", borderRadius: "var(--radius-xl)", minHeight: 260 }} />;
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
            borderRadius: "var(--radius-xl)", background: "var(--sp-dew)",
            boxShadow: "var(--shadow-lg)", overflow: "hidden",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
            </div>
            <div style={{ padding: `0 ${bezelSidePadding}px ${bezelSidePadding}px` }}>
              <div style={{ position: "relative", height: innerHeight, boxSizing: "border-box", background: "var(--sp-cream)", borderRadius: "var(--radius-lg)", overflow: "hidden", padding: 8 }}>
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

// ── Scroll-reveal section ─────────────────────────────────────
// Same sticky-mockup + revealing-card-trail pattern as
// DesignPrinciplesScroll, but the mockup is vertically centered against the
// measured card trail rather than pinned to its top, and the cards sit on a
// tighter gap. Used for "The Challenge", where the trail is longer.
export function ScrollRevealSection({ items, images }: {
  items: Array<{ index: string; title: string; desc: string }>; images: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [activeStep, setActiveStep] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveStep(Math.min(items.length - 1, Math.floor(v * items.length)));
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

  // Measures the card trail's actual rendered height (it grows with the
  // number/length of items) so the mockup can be vertically centered
  // against it instead of pinned to its own top.
  const cardTrailRef = useRef<HTMLDivElement>(null);
  const [cardTrailHeight, setCardTrailHeight] = useState(0);
  useEffect(() => {
    const el = cardTrailRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setCardTrailHeight(entry.contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The card column is wider than the reserved space on purpose — cardOverlap
  // is how far the cards' left edge cuts into the mockup's right edge, so
  // reserved is deliberately smaller than cardColumnWidth by that amount.
  const cardColumnWidth = 400;
  const cardOverlap = 40;
  const reserved = cardColumnWidth - cardOverlap;
  const centeredLeft = reserved / 2;
  const placeholderLeft = useTransform(scrollYProgress, [0, 1 / items.length], [centeredLeft, 0]);

  const bezelSidePadding = 10;
  const chromeBarHeight = 30;
  const screenAspectRatio = 1840 / 1230;
  const innerWidth = 1160 - reserved - bezelSidePadding * 2;
  const innerHeight = Math.round(innerWidth / screenAspectRatio);
  const placeholderHeight = innerHeight + chromeBarHeight + bezelSidePadding;
  // Mockup is visually scaled 1.2x from its top-left corner, so its true
  // rendered height is placeholderHeight * 1.2 — that's what needs to be
  // centered against the card trail, not the unscaled placeholderHeight.
  const scaledMockupHeight = placeholderHeight * 1.2;
  const trailHeight = cardTrailHeight || placeholderHeight;
  const containerHeight = Math.max(scaledMockupHeight, trailHeight);
  const mockupTop = Math.max(0, (containerHeight - scaledMockupHeight) / 2);

  return (
    <div ref={ref} style={{ height: `${items.length * 100}vh`, position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "relative", maxWidth: 1160, margin: "0 auto", width: "100%", height: containerHeight }}>
          <motion.div style={{
            position: "absolute", top: mockupTop, left: placeholderLeft,
            width: `calc(100% - ${reserved}px)`, height: placeholderHeight,
            borderRadius: "var(--radius-xl)", background: "var(--sp-dew)",
            boxShadow: "var(--shadow-lg)", overflow: "hidden",
            scale: 1.2, transformOrigin: "left top",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
            </div>
            <div style={{ padding: `0 ${bezelSidePadding}px ${bezelSidePadding}px` }}>
              <div style={{ position: "relative", height: innerHeight, boxSizing: "border-box", background: "var(--sp-cream)", borderRadius: "var(--radius-lg)", overflow: "hidden", padding: 8 }}>
                {images.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element -- local static asset, no next/image remote pattern needed
                  <img
                    key={`${src}-${i}`}
                    src={src}
                    alt={items[i].title}
                    style={{
                      position: "absolute", top: 8, left: 8, right: 8, bottom: 8, width: "calc(100% - 16px)", height: "calc(100% - 16px)", objectFit: "contain",
                      opacity: i === activeStep ? 1 : 0, transition: "opacity 0.4s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <div ref={cardTrailRef} style={{ position: "absolute", top: 0, right: 0, width: cardColumnWidth, display: "flex", flexDirection: "column", gap: 10 }}>
            {items.map((p, i) => (
              <RevealCard key={`${p.index}-${resetKey}`} index={i} total={items.length} scrollYProgress={scrollYProgress}>
                <PrincipleCallout index={p.index} title={p.title} desc={p.desc} />
              </RevealCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Lifecycle overview ────────────────────────────────────────
// Compact isometric "workflow" diagram, enterprise-SaaS-diagram style
// (Linear/Stripe/Notion) rather than a traditional wide flowchart. Steps and
// their meander positions are supplied per case study.
export type LifecycleStep = { icon: React.ReactNode; title: string };
export type LifecyclePosition = { xFrac: number; level: number };

const ISO_CUBE_WIDTH = 96;
const ISO_CUBE_HEIGHT = 72;

// Minimal white isometric platform — top/left/right faces, a thin blue
// accent restricted to the right face only, soft neutral drop-shadow. Active
// state lifts slightly and switches the accent to full blue with a stronger
// (but still soft) blue-tinted shadow.
function IsoStepCard({ icon, title, number, active }: {
  icon: React.ReactNode; title: string; number: string; active: boolean;
}) {
  const stroke = active ? "var(--sp-orange)" : "#e7e7ea";
  return (
    <div style={{ width: 110, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <span style={{
        fontSize: 11, fontWeight: 700, fontFamily: ff, marginBottom: "var(--spacing-8)",
        color: active ? "var(--sp-orange)" : "#9aa1ac", transition: "color 0.4s ease",
      }}>
        {number}
      </span>
      <div style={{
        position: "relative", width: ISO_CUBE_WIDTH, height: ISO_CUBE_HEIGHT,
        transition: "transform 0.4s ease, filter 0.4s ease",
        transform: active ? "translateY(-3px)" : "translateY(0)",
        filter: active ? "drop-shadow(0 12px 20px rgba(255,111,30,0.22))" : "drop-shadow(0 8px 16px rgba(17,17,17,0.06))",
      }}>
        <svg width={ISO_CUBE_WIDTH} height={ISO_CUBE_HEIGHT} viewBox="0 0 96 72" style={{ display: "block", overflow: "visible" }}>
          <polygon points="8,18 48,36 48,68 8,50" fill="#fbfbfc" stroke={stroke} strokeWidth={1.2} strokeLinejoin="round" style={{ transition: "stroke 0.4s ease" }} />
          <polygon points="88,18 48,36 48,68 88,50" fill={active ? "rgba(255,111,30,0.14)" : "#f6f7fb"} stroke={stroke} strokeWidth={1.2} strokeLinejoin="round" style={{ transition: "fill 0.4s ease, stroke 0.4s ease" }} />
          <polygon points="48,2 88,18 48,36 8,18" fill="#ffffff" stroke={stroke} strokeWidth={1.3} strokeLinejoin="round" style={{ transition: "stroke 0.4s ease" }} />
        </svg>
        <div style={{
          position: "absolute", top: 0, left: 0, width: ISO_CUBE_WIDTH, height: 34,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: active ? "var(--sp-orange)" : "var(--sp-charcoal)", transition: "color 0.4s ease",
        }}>
          {icon}
        </div>
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--sp-charcoal)", fontFamily: ff, marginTop: 10, textAlign: "center" }}>
        {title}
      </span>
    </div>
  );
}

// Cycles which cube reads as "active" (setInterval, looping) so the
// workflow visibly animates through step 1..n, communicating progression.
export function LifecycleOverview({ steps, positions }: { steps: LifecycleStep[]; positions: LifecyclePosition[] }) {
  const n = steps.length;
  const cardOuterWidth = 110;
  const numberRowHeight = 19; // number label height, above each cube
  const maxLevel = Math.max(...positions.map((p) => p.level));

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setActiveIndex((i) => (i + 1) % n), 900);
    return () => window.clearInterval(id);
  }, [n]);

  // Measured in real pixels so the diagram stretches to fill whatever width
  // is available (no card/maxWidth cap) while the x-fractions stay in sync.
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1160);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const diagramHeight = maxLevel + numberRowHeight + 8 + ISO_CUBE_HEIGHT + 70;

  const cubeCenterX = (i: number) => positions[i].xFrac * containerWidth;
  const left = (i: number) => cubeCenterX(i) - cardOuterWidth / 2;
  const top = (i: number) => positions[i].level;
  const cubeTop = (i: number) => top(i) + numberRowHeight + 8;
  const cubeBottom = (i: number) => cubeTop(i) + ISO_CUBE_HEIGHT;

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
      <div style={{ position: "relative", width: containerWidth, height: diagramHeight }}>
        <svg width={containerWidth} height={diagramHeight} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
          <defs>
            <marker id="lifecycleArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth={6} markerHeight={6} orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--sp-orange)" />
            </marker>
          </defs>
          {steps.slice(0, -1).map((_, i) => {
            const x1 = cubeCenterX(i);
            const y1 = cubeBottom(i);
            const x2 = cubeCenterX(i + 1);
            const y2 = cubeTop(i + 1);
            // L-shaped elbow (sharp right angle, not curved) — straight
            // vertical from the source, then straight horizontal into the
            // destination.
            return (
              <path
                key={i}
                d={`M ${x1} ${y1} L ${x1} ${y2} L ${x2} ${y2}`}
                fill="none"
                stroke="var(--sp-orange)" strokeOpacity={0.55} strokeWidth={1.5} strokeDasharray="4 4"
                markerEnd="url(#lifecycleArrow)"
              />
            );
          })}
        </svg>

        {steps.map((s, i) => (
          <div key={s.title} style={{ position: "absolute", left: left(i), top: top(i) }}>
            <IsoStepCard icon={s.icon} title={s.title} number={String(i + 1).padStart(2, "0")} active={activeIndex === i} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── "What We Learned" interview row ───────────────────────────
export function LearnedRow({ number, role, icon, quote, insight }: {
  number: string; role: string; icon: React.ReactNode; quote: string; insight: string;
}) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 0, background: "var(--sp-cream)",
      border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-xl)", padding: "26px 30px",
      boxShadow: "var(--shadow-lg)",
    }}>
      <div style={{ flex: "0 0 150px", textAlign: "center" }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%", background: "rgba(255,111,30,0.12)", color: "var(--sp-orange)",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px",
        }}>
          {icon}
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--sp-charcoal)", fontFamily: ff }}>Interview {number}</div>
        <div style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, marginTop: 2 }}>{role}</div>
      </div>
      <div style={{
        flex: 1, display: "flex", alignItems: "flex-start", gap: 10,
        borderLeft: "1px solid rgba(23,23,23,0.10)", borderRight: "1px solid rgba(23,23,23,0.10)", padding: "0 28px",
      }}>
        <Quote size={20} style={{ color: "var(--sp-orange)", flexShrink: 0, marginTop: 2 }} />
        <p style={{
          fontSize: 16, fontStyle: "italic", fontWeight: 600, color: "var(--sp-cocoa)",
          fontFamily: ffHeading, lineHeight: 1.5, margin: 0,
        }}>
          {quote}
        </p>
      </div>
      <div style={{ flex: "0 0 240px", paddingLeft: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)", marginBottom: 6 }}>
          <span style={{
            width: 26, height: 26, borderRadius: "50%", background: "rgba(255,111,30,0.12)", color: "var(--sp-orange)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Lightbulb size={13} />
          </span>
          <span style={{ fontSize: 16, fontWeight: 700, color: "var(--sp-orange)", fontFamily: ff }}>Insight</span>
        </div>
        <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, lineHeight: 1.55, margin: 0 }}>{insight}</p>
      </div>
    </div>
  );
}
