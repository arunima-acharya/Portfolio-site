"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue, useSpring, type MotionValue } from "motion/react";
import {
  User, Users, Star, Clock, UserRound, Headphones, Quote, Lightbulb,
  ExternalLink, ImagePlus, AlertTriangle, CheckCircle2, TrendingUp,
  IdCard, CalendarPlus, Search, KeyRound, CreditCard, LogIn, LogOut,
} from "lucide-react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import LessonsLearnedPremium from "@/components/preview/LessonsLearnedPremium";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";

// Single source of truth for this page's fonts — body copy, labels, and UI
// text read from `ff` (Geist); headline-level text (h1/h2/h3, card titles)
// reads from `ffHeading` (Fraunces) — matching the Superr conversion used
// throughout the rest of this codebase.
const ff = "var(--font-geist), sans-serif";
const ffHeading = "var(--font-fraunces), serif";

function StatCard({ icon, value, label, delta, highlighted }: {
  icon?: React.ReactNode; value: string; label: React.ReactNode; delta?: string; highlighted?: boolean;
}) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      background: highlighted ? "var(--sp-dew)" : "var(--sp-cream)", borderRadius: 12, padding: "18px 22px",
      border: highlighted ? "1.5px solid var(--sp-orange)" : "1.5px solid var(--sp-charcoal)",
      boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 20px 0px",
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
          {delta && <span style={{ fontSize: 16, fontWeight: 400, color: "#22c55e", fontFamily: ff }}>{delta}</span>}
        </div>
        <div style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, lineHeight: 1.35 }}>{label}</div>
      </div>
    </div>
  );
}

function SnapshotCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ background: "var(--sp-cream)", border: "1.5px solid var(--sp-charcoal)", borderRadius: 12, padding: "20px 20px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 8, background: "rgba(255,111,30,0.12)",
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

function SectionEyebrow({ number, label, align = "center" }: { number: string; label: string; align?: "left" | "center" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: align === "left" ? "flex-start" : "center", gap: 8, marginBottom: 20 }}>
      <span style={{ fontSize: 16, fontWeight: 400, color: "var(--sp-orange)", fontFamily: ff }}>{number}</span>
      <span style={{ fontSize: 16, fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8a8580", fontFamily: ff }}>{label}</span>
    </div>
  );
}

// Renders a real screenshot when `src` is given; otherwise falls back to the
// striped placeholder. Keeps the same frame HEIGHT either way so surrounding
// layout (floating cards, connector lines) doesn't shift.
// fit="height" (default): the image's own width is left natural (height
// fixed, width auto) and centered within the frame, so the displayed
// proportions always match the source image's real resolution rather than
// an approximated average aspect ratio.
// fit="width": the image is scaled to the frame's full width (width:100%,
// height auto) and top-aligned, cropping any overflow at the bottom —
// for mockups where matching the frame's width matters more than showing
// the whole image uncropped.
// fit="cover": the image fills the frame's full width AND height exactly
// (object-fit: cover), cropping whatever overflows either dimension —
// for frames where the box must be completely filled with no gaps.
function ScreenshotPlaceholder({ label, height, src, fit = "height" }: { label: string; height: number; src?: string; fit?: "height" | "width" | "cover" }) {
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
      height, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
      background: "repeating-linear-gradient(45deg, var(--sp-cream), var(--sp-cream) 10px, var(--sp-dew) 10px, var(--sp-dew) 20px)",
    }}>
      <ImagePlus size={26} color="rgba(23,23,23,0.25)" />
      {/* Decorative "no image" placeholder chrome — exempt from the 16px body
          minimum, same treatment as other mockup micro-labels on this page. */}
      <span style={{ fontSize: 12, color: "rgba(23,23,23,0.35)", fontFamily: ff }}>{label}</span>
    </div>
  );
}

// Wraps a mockup so it tilts/lifts in 3D (rotateX/rotateY/translateZ) to
// follow the real cursor position, like a magnetic hover card.
function TiltMockup({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
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

function SectionHeading({ title, subtitle, maxWidth = 640, bold = false, align = "center" }: { title: string; subtitle: string; maxWidth?: number; bold?: boolean; align?: "left" | "center" }) {
  return (
    <>
      <h2 style={{
        fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: bold ? 700 : 600, color: "var(--sp-cocoa)",
        fontFamily: ffHeading, textAlign: align, textTransform: "capitalize", marginBottom: 14,
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

// ── Section 04 helpers — research-insight cards, plain text-only.
const RESEARCH_INSIGHTS: Array<{ title: string; desc: string }> = [
  { title: "Information overload", desc: "Critical reservation details were buried inside dense interfaces, forcing staff to constantly switch context." },
  { title: "High cognitive load", desc: "Staff constantly switched between screens to complete simple tasks." },
  { title: "Role-specific workflows", desc: "Receptionists, managers, and reservation teams needed different information priorities." },
  { title: "Error-prone processes", desc: "Manual room allocation increased operational mistakes." },
  { title: "Scalability challenges", desc: "Existing workflows struggled with large corporate reservations." },
];

function ResearchInsightCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{
      background: "var(--sp-cream)", border: "1.5px solid var(--sp-charcoal)", borderRadius: 12,
      padding: 24, boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 20px 0px",
    }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: "var(--sp-charcoal)", fontFamily: ff, marginBottom: 10, lineHeight: 1.3 }}>{title}</div>
      <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, lineHeight: 1.6, margin: 0 }}>{desc}</p>
    </div>
  );
}

// "What We Learned" — interview callouts. Kept as a distinct quote-style
// treatment (Fraunces italic body copy) but folded onto the single Marker
// Orange accent + Dew Drop tint instead of the old blue/brown/green mix.
const LEARNED_INTERVIEWS: Array<{ number: string; role: string; icon: React.ReactNode; quote: string; insight: string }> = [
  { number: "01", role: "Front Desk Staff", icon: <User size={22} />, quote: "I know the guest is somewhere—I just can't find it quickly.", insight: "Critical information was scattered across multiple screens." },
  { number: "02", role: "Reservation Managers", icon: <UserRound size={22} />, quote: "Comparing room availability takes too many steps.", insight: "Room allocation required unnecessary navigation." },
  { number: "03", role: "Customer Success", icon: <Headphones size={22} />, quote: "Most onboarding questions are about finding features.", insight: "Navigation—not functionality—was the biggest usability challenge." },
];

function LearnedRow({ number, role, icon, quote, insight }: {
  number: string; role: string; icon: React.ReactNode; quote: string; insight: string;
}) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 0, background: "var(--sp-cream)",
      border: "1.5px solid var(--sp-charcoal)", borderRadius: 12, padding: "26px 30px",
      boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 20px 0px",
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
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
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

// Reservation lifecycle overview — a compact isometric "workflow" diagram,
// enterprise-SaaS-diagram style (Linear/Stripe/Notion) rather than a
// traditional wide flowchart. Icon set intentionally mirrors "Front Desk,
// Calendar, Search, Guest, Key, Card, Door, Exit".
const LIFECYCLE_STEPS: Array<{ icon: React.ReactNode; title: string }> = [
  { icon: <IdCard size={20} strokeWidth={1.6} />, title: "Front Desk" },
  { icon: <CalendarPlus size={20} strokeWidth={1.6} />, title: "Create Booking" },
  { icon: <Search size={20} strokeWidth={1.6} />, title: "Reservation Search" },
  { icon: <UserRound size={20} strokeWidth={1.6} />, title: "Guest Details" },
  { icon: <KeyRound size={20} strokeWidth={1.6} />, title: "Room Assignment" },
  { icon: <CreditCard size={20} strokeWidth={1.6} />, title: "Payments" },
  { icon: <LogIn size={20} strokeWidth={1.6} />, title: "Check-in" },
  { icon: <LogOut size={20} strokeWidth={1.6} />, title: "Check-out" },
];

// Per-step position, matched to the reference layout: x as a fraction of
// the full row width, and a vertical "level" in px (0 = highest). Traces
// the same meander as the reference — 01 high, 02 low-right of it, 03/04
// paired high, 05/06 paired low, 07 back up high, 08 settling low-right
// at the end — rather than a strict alternating or gridded pattern.
const LIFECYCLE_POSITIONS: Array<{ xFrac: number; level: number }> = [
  { xFrac: 0.08, level: 0 },   // 01
  { xFrac: 0.18, level: 180 }, // 02
  { xFrac: 0.33, level: 15 },  // 03
  { xFrac: 0.49, level: 60 },  // 04
  { xFrac: 0.49, level: 225 }, // 05
  { xFrac: 0.66, level: 225 }, // 06
  { xFrac: 0.76, level: 70 },  // 07
  { xFrac: 0.90, level: 245 }, // 08
];

const ISO_CUBE_WIDTH = 96;
const ISO_CUBE_HEIGHT = 72;

// Minimal white isometric platform — top/left/right faces, a thin orange
// accent restricted to the right face only ("a small accent side"), soft
// neutral drop-shadow. Active state lifts slightly and switches the accent
// to full Marker Orange with a stronger (but still soft) orange-tinted
// shadow. The diagram's own number/title labels stay at their compact
// diagram scale (11-13px) — decorative infographic annotation bound to a
// fixed 110px card width, the same class of exemption as the dashboard
// mockup's micro-labels elsewhere in this codebase.
function IsoStepCard({ icon, title, number, active }: {
  icon: React.ReactNode; title: string; number: string; active: boolean;
}) {
  const stroke = active ? "var(--sp-orange)" : "#e7e7ea";
  return (
    <div style={{ width: 110, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <span style={{
        fontSize: 11, fontWeight: 700, fontFamily: ff, letterSpacing: "0.04em", marginBottom: 8,
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
function LifecycleOverview() {
  const n = LIFECYCLE_STEPS.length;
  const cardOuterWidth = 110;
  const numberRowHeight = 19; // number label height, above each cube
  const maxLevel = Math.max(...LIFECYCLE_POSITIONS.map((p) => p.level));

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

  const cubeCenterX = (i: number) => LIFECYCLE_POSITIONS[i].xFrac * containerWidth;
  const left = (i: number) => cubeCenterX(i) - cardOuterWidth / 2;
  const top = (i: number) => LIFECYCLE_POSITIONS[i].level;
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
          {LIFECYCLE_STEPS.slice(0, -1).map((_, i) => {
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

        {LIFECYCLE_STEPS.map((s, i) => (
          <div key={s.title} style={{ position: "absolute", left: left(i), top: top(i) }}>
            <IsoStepCard icon={s.icon} title={s.title} number={String(i + 1).padStart(2, "0")} active={activeIndex === i} />
          </div>
        ))}
      </div>
    </div>
  );
}

const RESEARCH_METHODS: Array<{ label: string; value: string; displayLabel?: React.ReactNode }> = [
  { label: "Stakeholder Interviews", value: "12+" },
  { label: "Workflow Analysis", value: "30+" },
  { label: "Product Audits", value: "5 Modules", displayLabel: <>Product<br />Audits</> },
  { label: "Usage Data Analysis", value: "3 Months" },
  { label: "Competitive Benchmarking", value: "6+ Products" },
];

function ResearchMethodsBar() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 40, background: "var(--sp-cream)",
      border: "1.5px solid var(--sp-charcoal)", borderRadius: 12, padding: "32px 40px",
      maxWidth: 1160, margin: "48px auto 0", boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 20px 0px",
    }}>
      <div style={{ flex: "0 0 200px" }}>
        <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "0.08em", color: "var(--sp-orange)", fontFamily: ff, marginBottom: 8 }}>
          RESEARCH METHODS
        </div>
        <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, lineHeight: 1.55, margin: 0 }}>
          A mix of qualitative and quantitative approaches.
        </p>
      </div>
      <div style={{ display: "flex", flex: 1 }}>
        {RESEARCH_METHODS.map((m, i) => (
          <div key={m.label} style={{
            flex: 1, padding: "0 28px",
            borderLeft: i > 0 ? "1px solid rgba(23,23,23,0.10)" : "none",
          }}>
            <div style={{ fontSize: 16, fontWeight: 400, color: "var(--sp-charcoal)", fontFamily: ff, lineHeight: 1.3 }}>{m.displayLabel ?? m.label}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--sp-orange)", fontFamily: ff, marginTop: 4 }}>{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Decorative diamond-grid ground plane with diagonal-hatch corner wedges,
// approximating the reference graphic's subtle background texture behind
// the sandbox boxes.
function SandboxBackgroundGrid() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 700 700" preserveAspectRatio="xMidYMid meet" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <defs>
        <pattern id="sandboxHatch" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1={0} y1={0} x2={0} y2={7} stroke="rgba(23,23,23,0.05)" strokeWidth={5} />
        </pattern>
      </defs>
      <polygon points="350,50 650,350 350,650 50,350" fill="none" stroke="rgba(23,23,23,0.06)" strokeWidth={1.5} />
      <polygon points="350,160 540,350 350,540 160,350" fill="none" stroke="rgba(23,23,23,0.05)" strokeWidth={1} />
      <polygon points="350,50 650,350 540,350 350,160" fill="url(#sandboxHatch)" />
      <polygon points="650,350 350,650 350,540 540,350" fill="url(#sandboxHatch)" />
      <polygon points="350,650 50,350 160,350 350,540" fill="url(#sandboxHatch)" />
      <polygon points="50,350 350,50 350,160 160,350" fill="url(#sandboxHatch)" />
    </svg>
  );
}

// Simplified isometric "sandbox" box — top/left/right faces as flat
// polygons, matching the flat-grey/orange-accent style of IsoBuilding above.
function IsoSandboxBox({ label, highlighted }: { label: string; highlighted: boolean }) {
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

// Diamond arrangement matching the reference image exactly: #1 top, #2
// left, #3 bottom, #4 right.
const SANDBOX_LAYOUT = [
  { label: "Sandbox #1", style: { top: 70, left: "50%", transform: "translateX(-50%)" } },
  { label: "Sandbox #2", style: { top: 150, left: 20 } },
  { label: "Sandbox #3", style: { top: 230, left: "50%", transform: "translateX(-50%)" } },
  { label: "Sandbox #4", style: { top: 150, right: 20 } },
];

// Cards flank the diamond left/right — #1 and #2 (top, left box) on the
// left column, #3 and #4 (bottom, right box) on the right column.
const SANDBOX_LEFT_CARDS = [
  { value: "1,000+", statLabel: <>Hotels<br />Worldwide</> },
  { value: "35%", delta: "↓", statLabel: <>Reduction in<br />Room Lookup Time</> },
];
const SANDBOX_RIGHT_CARDS = [
  { value: "50+", statLabel: <>Countries<br />Supported</> },
  { value: "30%", delta: "↓", statLabel: <>Reduction in<br />Workflow Steps</> },
];

// Cycles the highlight through each box one at a time (few-second delay
// each), looping — the matching stat card (index 0/1 -> left column,
// index 2/3 -> right column) highlights in sync.
function SandboxCluster() {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setActiveIndex((i) => (i + 1) % SANDBOX_LAYOUT.length), 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 64, maxWidth: 1160, margin: "0 auto" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 260, justifySelf: "end" }}>
        {SANDBOX_LEFT_CARDS.map((c, i) => (
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
        {SANDBOX_RIGHT_CARDS.map((c, i) => (
          <StatCard key={i} value={c.value} delta={c.delta} label={c.statLabel} highlighted={activeIndex === i + 2} />
        ))}
      </div>
    </div>
  );
}

function PrincipleCallout({ index, title, desc }: { index: string; title: string; desc: string }) {
  return (
    <div style={{
      width: "100%", background: "var(--sp-cream)", border: "1.5px solid var(--sp-charcoal)",
      borderRadius: 12, padding: 20, boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 20px 0px",
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: "var(--sp-orange)", fontFamily: ff }}>{index}</span>
        <span style={{ fontSize: 16, fontWeight: 700, color: "var(--sp-charcoal)", fontFamily: ff, lineHeight: 1.3 }}>{title}</span>
      </div>
      <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, lineHeight: 1.55, margin: 0 }}>{desc}</p>
    </div>
  );
}

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
        <div style={{ fontSize: 16, fontWeight: 700, color: labelColor, fontFamily: ff, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.03em" }}>
          {label}
        </div>
        <div style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, lineHeight: 1.55 }}>{children}</div>
      </div>
    </div>
  );
}

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

function SolutionCard({ number, title, challenge, approach, impact, children }: {
  number: string; title: string; challenge: string; approach: string;
  impact: Array<{ value: string; caption?: string }>; children: React.ReactNode;
}) {
  return (
    <div style={{
      background: "var(--sp-cream)",
      border: "1.5px solid var(--sp-charcoal)", borderRadius: 12,
      padding: 32, display: "flex",
      alignItems: "stretch", gap: 40, boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 20px 0px", overflow: "hidden",
    }}>
      <div style={{ flex: "0 0 44%", minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 18 }}>
          <span style={{ fontSize: 38, fontWeight: 700, color: "var(--sp-orange)", fontFamily: ff, lineHeight: 1 }}>{number}</span>
          <h3 style={{ fontSize: 24, fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: ffHeading, textTransform: "capitalize", lineHeight: 1.3, margin: 0 }}>{title}</h3>
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
      <div style={{ flex: 1, minWidth: 0, borderRadius: 12, border: "1.5px solid var(--sp-charcoal)", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

const SOLUTION_STEPS: Array<{
  number: string; title: string; challenge: string; approach: string;
  impact: Array<{ value: string; caption?: string }>;
  imageLabel: string; imageHeight: number; imageSrc: string;
}> = [
  {
    number: "01",
    title: "Unified Reservation Dashboard",
    challenge: "Multiple screens slowed reservation workflows.",
    approach: "Unified search, booking details, and actions into one workspace.",
    impact: [
      { value: "35%", caption: "faster reservation lookup" },
      { value: "30%", caption: "fewer workflow steps" },
    ],
    imageLabel: "Dashboard screenshot", imageHeight: 400, imageSrc: "/assets/place/1.png",
  },
  {
    number: "02",
    title: "Smart Room Assignment",
    challenge: "Manual room allocation was slow and error-prone.",
    approach: "Combined room availability, occupancy, and booking details in one view.",
    impact: [
      { value: "Faster assignments" },
      { value: "Reduced operational errors" },
    ],
    imageLabel: "Room assignment screenshot", imageHeight: 400, imageSrc: "/assets/place/2.png",
  },
  {
    number: "03",
    title: "Guest Context",
    challenge: "Guest history required switching between screens.",
    approach: "Embedded guest profile, history, and timelines directly in workflow.",
    impact: [
      { value: "Faster decisions" },
      { value: "More personalized guest experience" },
    ],
    imageLabel: "Guest profile screenshot", imageHeight: 400, imageSrc: "/assets/place/3.png",
  },
  {
    number: "04",
    title: "Advanced Filters & Bulk Operations",
    challenge: "Managing hundreds of reservations involved repetitive work.",
    approach: "Added advanced filters and bulk actions for high-volume operations.",
    impact: [
      { value: "Less repetitive work" },
      { value: "Improved operational efficiency" },
    ],
    imageLabel: "Bulk operations screenshot", imageHeight: 400, imageSrc: "",
  },
];

// ── Section 08 — Design System ───────────────────────────────
// Adapted from the Pocket PMS design-system section (same 3-card
// structure: color / typography / spacing) using Hotelogix's own tokens
// — the Marker Orange accent and Geist/Fraunces type pairing used
// throughout this page — instead of Pocket PMS's blue palette.
function DesignSystemCard({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "var(--sp-cream)", border: "1.5px solid var(--sp-charcoal)", borderRadius: 12,
      padding: "24px 24px 26px", boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 20px 0px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
        <span style={{ fontSize: 16, fontWeight: 400, color: "var(--sp-orange)", fontFamily: ff }}>{number}</span>
        <span style={{ fontSize: 16, fontWeight: 400, color: "var(--sp-charcoal)", fontFamily: ff }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

// Compact spec-sheet micro-labels below (9.5-11px) are decorative
// design-token demo chrome — the same exemption class as the dashboard
// mockup's tiny UI text elsewhere in this codebase — kept small so the
// swatch/spacing rows still read as a miniature style guide rather than
// full body copy.
const dsLabel: React.CSSProperties = { fontSize: 9.5, fontWeight: 400, color: "#8a8580", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: ff, marginBottom: 6 };

// These hex values describe the actual color tokens designed for the real
// Hotelogix product (the subject of this case study) — left untouched, like
// the real product screenshots, rather than recolored to this page's own
// Superr accent.
const COLOR_PRIMARY = [
  { hex: "#1C46F2", label: "Primary" },
  { hex: "#8a9ff4", label: "" },
  { hex: "#859dff", label: "" },
  { hex: "#dde3fd", label: "" },
  { hex: "#111111", label: "Ink" },
];

const COLOR_SEMANTIC = [
  { hex: "#22c55e", label: "Success" },
  { hex: "#eab308", label: "Warning" },
  { hex: "#ef4444", label: "Error" },
  { hex: "#6366f1", label: "Info" },
  { hex: "#6b7280", label: "Neutral" },
];

const NEUTRAL_SCALE = ["#111", "#333", "#555", "#777", "#999", "#bbb", "#ddd", "#f5f5f5"];

const TYPE_SCALE = [
  { label: "Heading 1", size: "34–56px / 1.15", weight: "Regular" },
  { label: "Heading 2", size: "28–42px / 1.3", weight: "Regular" },
  { label: "Heading 3", size: "18–22px / 1.3", weight: "Regular" },
  { label: "Body", size: "13.5–16px / 1.6", weight: "Regular" },
];

const SPACING_SCALE = [4, 8, 12, 16, 24, 32, 48, 64];

// ── Section 09 — Impact ──────────────────────────────────────
function ImpactCard({ number, value, desc }: { number: string; value: string; desc: string }) {
  return (
    <div style={{
      background: "var(--sp-cream)", border: "1.5px solid var(--sp-charcoal)", borderRadius: 12, padding: "22px 20px", position: "relative",
      minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "flex-end", boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 20px 0px",
    }}>
      <span style={{ position: "absolute", top: 18, right: 20, fontSize: 16, color: "#8a8580", fontFamily: ff }}>{number}</span>
      <div style={{ fontSize: 32, fontWeight: 700, color: "var(--sp-charcoal)", fontFamily: ff, marginBottom: 8, letterSpacing: "-0.02em" }}>{value}</div>
      <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, lineHeight: 1.5, margin: 0 }}>{desc}</p>
    </div>
  );
}

const IMPACT_STATS = [
  { number: "01", value: "35%", desc: "Reduction in reservation lookup time" },
  { number: "02", value: "30%", desc: "Fewer operational steps" },
  { number: "03", value: "1,000+", desc: "Hotels using the redesigned workflows" },
  { number: "04", value: "50+", desc: "Countries supported" },
];

const CHALLENGES: Array<{ index: string; title: string; desc: string }> = [
  { index: "01", title: "Information Overload", desc: "Too much information was displayed at once, making it difficult to quickly identify what mattered." },
  { index: "02", title: "Outdated Interface", desc: "An aging visual design with inconsistent patterns made the system feel difficult to navigate and learn." },
  { index: "03", title: "Form-Heavy Experience", desc: "Simple reservation tasks required filling long forms with repetitive fields and unnecessary inputs." },
  { index: "04", title: "Long & Complex Workflows", desc: "Everyday actions such as creating, editing, or checking reservations involved multiple screens and excessive clicks." },
  { index: "05", title: "Poor Information Hierarchy", desc: "Critical booking details were buried among secondary information, increasing cognitive load." },
  { index: "06", title: "Inefficient Operations", desc: "Hotel staff spent more time navigating the software than managing guests, reducing operational efficiency." },
];

// One old-system screenshot per challenge/scroll step (image 85 repeats
// once since there are 6 challenges but only 5 distinct old-system shots).
const CHALLENGE_IMAGES = [
  "/assets/old/image 81.png",
  "/assets/old/image 82.png",
  "/assets/old/image 83.png",
  "/assets/old/image 84.png",
  "/assets/old/image 85.png",
  "/assets/old/image 81.png",
];

// Placeholder "thumbnail" for the HeroParallax module showcase — a data URI
// so there's no external image dependency, styled to match this page's
// existing ScreenshotPlaceholder (diagonal stripes + label) convention.
// Debug skin: a vivid, row-coded color so it's obvious which row a card
// belongs to and easy to track its motion (translateX vs translateXReverse,
// plus the whole-block rotateX/rotateZ/translateY) while tuning the
// animation. Swap for real screenshots later.
// One distinct real screenshot per module card — excludes FRONTDESK.png and
// Edit.png since those are already used elsewhere on the page (hero and
// Design System mockup respectively), so nothing repeats across the page.
const MODULE_IMAGES = [
  "Add Addon.png", "Add Rate.png", "Breakdown-1.png", "Breakdown.png", "Draft 19.png", "Draft 20.png",
  "Draft 23.png", "Draft 45.png", "Edit-1.png", "Filter Selected.png", "Frame 1984077671.png", "GROUP RESERVATION-LAYOUT-1.png",
  "GROUP RESERVATION-LAYOUT.png", "GROUP RESERVATION-TABLE-1.png", "GROUP RESERVATION-TABLE.png", "INVOICE 1.png", "Payterms-1.png", "Payterms.png",
  "Quick Reservation.png", "Reservation card.png", "Right Click.png", "SINGLE RESERVATION.png", "SPLIT RESERVATION-1.png", "Split Reservation.png",
];

const HOTELOGIX_MODULES = [
  "Dashboard", "Reservations", "Room Assignment", "Guest Profiles", "Housekeeping", "Audit Trail",
  "Calendar", "Rate Plans", "Reports", "Front Desk", "Payments", "User Roles",
  "Corporate Bookings", "Group Bookings", "Notifications", "Settings", "Analytics", "Integrations",
  "Loyalty Program", "Multi-Property", "Currency & Taxes", "API & Webhooks", "Channel Manager", "Guest Communication",
].map((title, i) => ({
  title,
  link: "#",
  thumbnail: `/assets/hotelogix/${MODULE_IMAGES[i]}`,
}));

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
  const y = useTransform(scrollYProgress, [start, end], [40, 0]);
  return <motion.div style={{ opacity, y }}>{children}</motion.div>;
}

function ScrollRevealSection({ items, images }: {
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

  // The screen's width is a calc() relative to the actual container (100%
  // minus the reserved space) instead of a fixed px sum — a fixed width
  // here overflowed on viewports narrower than the reserved total, same
  // class of bug fixed earlier in Section 07. centeredLeft only depends on
  // the reserved space (not the container's own width), so it's correct at
  // any width: at step 0 the screen's width is "100% - reserved", so
  // centering it within the full container puts its left edge at exactly
  // reserved/2.
  //
  // The card column is wider than the reserved space on purpose — cardOverlap
  // is how far the cards' left edge cuts into the mockup's right edge, so
  // reserved is deliberately smaller than cardColumnWidth by that amount.
  const cardColumnWidth = 440;
  const cardOverlap = 40;
  const reserved = cardColumnWidth - cardOverlap;
  const centeredLeft = reserved / 2;
  const placeholderLeft = useTransform(scrollYProgress, [0, 1 / items.length], [centeredLeft, 0]);
  // Browser-chrome mockup frame around the screenshot — exact same styling
  // as the hero section's desktop-mockup (flat #242424 bezel, traffic-light
  // dots, 10px/16px bar padding, 10px inner padding). innerHeight is fixed
  // to a 1840×1230 aspect ratio at the frame's actual inner width (container
  // width minus the reserved card column/gap, minus the bezel's own side
  // padding), so the screen matches that resolution's proportions.
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
            borderRadius: 12, background: "var(--sp-dew)",
            boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 20px 0px", overflow: "hidden",
            scale: 1.2, transformOrigin: "left top",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
            </div>
            <div style={{ padding: `0 ${bezelSidePadding}px ${bezelSidePadding}px` }}>
              <div style={{ position: "relative", height: innerHeight, boxSizing: "border-box", background: "var(--sp-cream)", borderRadius: 8, overflow: "hidden", padding: 8 }}>
                {images.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element -- local static asset, no next/image remote pattern needed
                  <img
                    key={src}
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

export default function HotelogixFrontdeskPreview() {
  return (
    <>
      {/* Section 01 — Overview */}
      <section style={{
        background: "var(--sp-cream)",
        padding: "120px 8% 90px",
      }}>
        <h1 style={{
          fontSize: "clamp(34px, 3.5vw, 56px)", fontWeight: 600, color: "var(--sp-cocoa)",
          fontFamily: ffHeading, textAlign: "center", lineHeight: 1.15, textTransform: "capitalize", marginBottom: 22,
        }}>
          Reservation Management System
        </h1>

        <p style={{
          fontSize: 16, color: "#8a8580", fontFamily: ff, textAlign: "center", lineHeight: 1.7,
          margin: "0 auto 32px",
        }}>
          Managing reservations isn&apos;t just booking rooms. It&apos;s about coordinating inventory,
          pricing, guest journeys, and hotel operations in real time.
          I redesigned Hotelogix&apos;s Reservation Management System to simplify
          complex workflows for hotel teams across thousands of properties.
        </p>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: ff, fontSize: 16, fontWeight: 500, color: "var(--sp-charcoal)", background: "var(--sp-cream)",
              border: "1.5px solid var(--sp-charcoal)", borderRadius: 20, padding: "13px 28px", cursor: "pointer",
              boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 2px 0px",
              display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none",
            }}
          >
            View Figma File
            <ExternalLink size={15} />
          </a>
        </div>

        {/* Dashboard mockup */}
        <div style={{ position: "relative", maxWidth: 980, margin: "0 auto" }}>
          <div style={{
            background: "var(--sp-dew)", borderRadius: 12,
            boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 20px 0px", overflow: "hidden",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
            </div>
            <div style={{ padding: "0 10px 10px" }}>
              <div style={{ background: "var(--sp-cream)", borderRadius: 8, overflow: "hidden" }}>
                <ScreenshotPlaceholder label="Dashboard screenshot" height={653} src="/assets/hotelogix/FRONTDESK.png" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Snapshot — sits right after the hero, no numbered eyebrow */}
      <section style={{ background: "var(--sp-cream)", padding: "60px 8% 90px" }}>
        <p style={{
          fontSize: 16, fontWeight: 400, letterSpacing: "0.14em", textTransform: "uppercase",
          color: "#8a8580", fontFamily: ff, textAlign: "center", marginBottom: 14,
        }}>
          Project Snapshot
        </p>
        <h2 style={{
          fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 600, color: "var(--sp-cocoa)",
          fontFamily: ffHeading, textAlign: "center", textTransform: "capitalize", marginBottom: 14,
        }}>
          Built from scratch at Hotelogix.
        </h2>
        <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, textAlign: "center", lineHeight: 1.75, maxWidth: 620, margin: "0 auto 48px" }}>
          A look at the scope, team, and contributions that shaped the Reservation Management System from the ground up.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, maxWidth: 1040, margin: "0 auto" }}>
          <SnapshotCard icon={<User size={16} />} label="Role" value="Founding Product Designer" />
          <SnapshotCard icon={<Clock size={16} />} label="Timeline" value="Confidential" />
          <SnapshotCard icon={<Users size={16} />} label="Team" value="Product · Engineering · Customer Success" />
          <SnapshotCard icon={<Star size={16} />} label="Contribution" value="Product Strategy · UX Design · Interaction Design · UI Design · Information Architecture · Design Systems · Cross-functional Collaboration" />
        </div>

        <div style={{
          maxWidth: 1040, margin: "40px auto 0", background: "var(--sp-cream)", borderRadius: 12,
          border: "1.5px solid var(--sp-charcoal)", boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 20px 0px", padding: "36px 40px",
        }}>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: ffHeading, textTransform: "capitalize", marginBottom: 20 }}>
            My Responsibilities
          </h3>
          <ul style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px 32px", margin: 0, padding: 0, listStyle: "none" }}>
            {[
              "Owned the vision and execution of the Reservation Management System redesign.",
              "Led UX strategy, workflow optimization, and information architecture.",
              "Drove cross-functional collaboration across Product, Engineering, and Customer Success.",
              "Built scalable design foundations to support future product growth.",
            ].map((item, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--sp-orange)", flexShrink: 0, marginTop: 8 }} />
                <span style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, lineHeight: 1.6 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 02 — At a Glance */}
      <section style={{ background: "var(--sp-cream)", padding: "90px 8%" }}>
        <SectionEyebrow number="02" label="At a Glance" />

        <h2 style={{
          fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 600, color: "var(--sp-cocoa)",
          fontFamily: ffHeading, textAlign: "center", textTransform: "capitalize", marginBottom: 14,
        }}>
          Built for hotels that never stop operating.
        </h2>

        <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, textAlign: "center", maxWidth: 480, margin: "0 auto 56px" }}>
          Powering reservations around the clock across thousands of properties worldwide.
        </p>

        <SandboxCluster />
      </section>

      {/* Section 03 — The Challenge */}
      <section style={{ background: "var(--sp-cream)", padding: "90px 8%" }}>
        <SectionEyebrow number="03" label="The Challenge" />
        <SectionHeading
          title="Hotel reservations had become unnecessarily complex."
          subtitle="As the product evolved over the years, new features were added without simplifying existing workflows. The result was an interface that overwhelmed users, increased training time, and slowed everyday operations."
          maxWidth={620}
        />

        <ScrollRevealSection items={CHALLENGES} images={CHALLENGE_IMAGES} />
      </section>

      {/* Section 04 — Reservation Lifecycle Overview */}
      <section style={{ background: "var(--sp-dew)", padding: "90px 8%" }}>
        <SectionEyebrow number="04" label="Reservation Lifecycle Overview" />
        <SectionHeading
          title="Understanding the Operational Ecosystem"
          subtitle="Before redesigning the experience, I mapped the complete reservation lifecycle to understand how information flows across teams, systems, and operational touchpoints. This revealed where fragmented workflows and context switching were slowing everyday operations."
          maxWidth={620}
        />

        <LifecycleOverview />
      </section>

      {/* Section 06 — Research Insights */}
      <section style={{ background: "var(--sp-cream)", padding: "90px 8%", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(23,23,23,0.07) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          WebkitMaskImage: "radial-gradient(circle at 8% 92%, black 0%, transparent 40%)",
          maskImage: "radial-gradient(circle at 8% 92%, black 0%, transparent 40%)",
        }} />

        <div style={{ position: "relative" }}>
          <SectionEyebrow number="06" label="Research Insights" />
          <SectionHeading
            title="Understanding how hotel teams actually work."
            subtitle="Research involved product audits, stakeholder discussions, workflow analysis, and studying operational pain points across reservation teams."
            maxWidth={620}
            bold
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 20, maxWidth: 1160, margin: "0 auto" }}>
            {RESEARCH_INSIGHTS.map((r) => (
              <ResearchInsightCard key={r.title} title={r.title} desc={r.desc} />
            ))}
          </div>

          <ResearchMethodsBar />

          <div style={{ maxWidth: 1160, margin: "48px auto 0" }}>
            <h3 style={{ fontSize: 22, fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: ffHeading, textTransform: "capitalize", marginBottom: 20 }}>
              What We Learned
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {LEARNED_INTERVIEWS.map((l) => <LearnedRow key={l.number} {...l} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Section 07 — The Solution */}
      <section style={{ background: "var(--sp-cream)", padding: "90px 8% 110px" }}>
        <SectionEyebrow number="07" label="The Solution" />
        <SectionHeading
          title="Reimagining reservation management from the ground up."
          subtitle="Instead of redesigning individual screens, the focus was on simplifying the entire reservation journey. Every solution was designed to address a specific operational challenge uncovered during research — reducing cognitive load, minimizing context switching, and helping hotel teams complete critical tasks more efficiently."
          maxWidth={620}
        />

        <ScrollStack
          useWindowScroll
          itemDistance={80}
          itemStackDistance={20}
          stackPosition="18%"
          scaleEndPosition="8%"
          baseScale={0.9}
          itemScale={0.025}
          blurAmount={4}
          tiltBase={0}
          tiltStep={0}
          backgroundOpacity={0.8}
          innerPaddingTop="2rem"
          innerPaddingX={0}
          innerPaddingBottom="14rem"
          innerMinHeight={false}
          className="max-w-[1040px] mx-auto"
        >
          {SOLUTION_STEPS.map((s) => (
            <ScrollStackItem
              key={s.number}
              itemClassName="rounded-[12px] shadow-none bg-transparent p-0"
              style={{ height: "auto", padding: 0, borderRadius: 12, boxShadow: "none", background: "transparent" }}
            >
              <SolutionCard number={s.number} title={s.title} challenge={s.challenge} approach={s.approach} impact={s.impact}>
                <ScreenshotPlaceholder label={s.imageLabel} height={s.imageHeight} src={s.imageSrc} fit="cover" />
              </SolutionCard>
            </ScrollStackItem>
          ))}
        </ScrollStack>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 56, maxWidth: 1040, marginLeft: "auto", marginRight: "auto" }}>
          <span style={{ color: "var(--sp-orange)", fontSize: 16 }}>◆</span>
          <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, margin: 0, textAlign: "center" }}>
            Every solution is designed to make hotel operations simpler, faster, and more efficient.
          </p>
          <span style={{ color: "var(--sp-orange)", fontSize: 16 }}>◆</span>
        </div>
      </section>

      {/* Section 08 — Module showcase (HeroParallax) */}
      <section style={{ background: "var(--sp-charcoal)" }}>
        <HeroParallax
          products={HOTELOGIX_MODULES}
          containerHeight="280vh"
          headerTitle="Reservations don't exist in isolation"
          headerSubtitle="Before redesigning the experience, I mapped the complete reservation lifecycle to understand how information flows between teams and systems."
          headerFontFamily={ffHeading}
          compactHeader
          contentScale={1.15}
          headerGapBelow={560}
          headerOverlay
          headerOffsetXPercent={-10}
          headerOffsetYPercent={220}
          headerAlign="right"
          headerEyebrowNumber="08"
          headerEyebrowLabel="Understanding the Ecosystem"
          headerEyebrowLabelColor="rgba(255,255,255,0.55)"
          headerTitleColor="#ffffff"
          headerSubtitleColor="rgba(255,255,255,0.75)"
          headerMaxWidth={768}
          rowCount={4}
          verticalOffsetPercent={-35}
        />
      </section>

      {/* Section 09 — Design System */}
      <section style={{ background: "var(--sp-cream)", padding: "90px 8%" }}>
        <SectionEyebrow number="09" label="Design System" />
        <SectionHeading
          title="Building better interfaces with design systems."
          subtitle="A scalable design language built from scratch — color, typography, spacing, and components designed for consistency across every module."
          maxWidth={620}
        />

        <TiltMockup style={{
          position: "relative", maxWidth: 1040, margin: "0 auto 20px", background: "var(--sp-cream)", borderRadius: 12,
          border: "1.5px solid var(--sp-charcoal)", boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 20px 0px", overflow: "hidden",
        }}>
          <ScreenshotPlaceholder label="Design system applied — component library mockup" height={666} src="/assets/hotelogix/Reservation card.png" fit="width" />
        </TiltMockup>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 1040, margin: "0 auto" }}>
          <DesignSystemCard number="01" title="Color System">
            <div style={{ marginBottom: 14 }}>
              <div style={dsLabel}>Primary</div>
              <div style={{ display: "flex", gap: 6 }}>
                {COLOR_PRIMARY.map((c) => (
                  <div key={c.hex} style={{ flex: 1 }}>
                    <div style={{ height: 40, borderRadius: 8, background: c.hex, border: c.hex === "#dde3fd" ? "1px solid rgba(23,23,23,0.06)" : "none" }} />
                    <div style={{ fontSize: 8, color: "#8a8580", textAlign: "center", marginTop: 4, fontFamily: ff }}>{c.hex}</div>
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
            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 12, marginBottom: 8, borderBottom: "1px solid rgba(23,23,23,0.06)" }}>
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
      </section>

      {/* Section 10 — Impact */}
      <section style={{ background: "var(--sp-cream)", padding: "60px 8%" }}>
        <div style={{ background: "var(--sp-dew)", border: "1.5px solid var(--sp-charcoal)", borderRadius: 12, padding: "56px 48px 48px", maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ fontSize: 16, fontWeight: 400, letterSpacing: "0.08em", color: "var(--sp-orange)", fontFamily: ff, marginBottom: 24 }}>
            10 — IMPACT
          </div>
          <h2 style={{
            fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: ffHeading,
            lineHeight: 1.2, textTransform: "capitalize", marginBottom: 16, maxWidth: 560,
          }}>
            Designed for measurable operational improvement.
          </h2>
          <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, lineHeight: 1.6, maxWidth: 480, margin: "0 0 40px" }}>
            The redesign simplified everyday operations while supporting the complexity of enterprise hospitality management at scale.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {IMPACT_STATS.map((s) => (
              <ImpactCard key={s.number} number={s.number} value={s.value} desc={s.desc} />
            ))}
          </div>
        </div>
      </section>

      <LessonsLearnedPremium />
    </>
  );
}
