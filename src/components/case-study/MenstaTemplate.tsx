"use client";
import React, { useState, useEffect, useRef, useContext, createContext } from "react";
import BorderGlow from "@/components/ui/BorderGlow.jsx";
import { projects, projectHref } from "@/data/projects";

const AccentContext = createContext<string>("#2856A2");

const DEFAULT_SCREENS = [
  "/assets/Mockup/SINGLE RESERVATION  1.3.jpg",
  "/assets/Mockup/GROUP RESERVATION.jpg",
  "/assets/Mockup/Paid  By owner.jpg",
  "/assets/Mockup/1000045947.jpg",
  "/assets/Mockup/1000045931.png",
  "/assets/Mockup/1000045949.jpg",
  "/assets/Mockup/Single Res.jpg",
  "/assets/Mockup/1000045946.jpg",
  "/assets/Mockup/CHECK IN 3.jpg",
  "/assets/Mockup/GROUP RESERVATION-1.jpg",
  "/assets/Mockup/1000045950.png",
  "/assets/Mockup/1000045962.jpg",
  "/assets/Mockup/Single Res-1.jpg",
  "/assets/Mockup/Single Res-4.jpg",
  "/assets/Mockup/Single Res-7.jpg",
  "/assets/Mockup/Single Res-9.jpg",
  "/assets/Mockup/Single Res-11.jpg",
  "/assets/Mockup/Single Res-12.jpg",
];
const ScreensContext = createContext<string[]>(DEFAULT_SCREENS);

// ─── Types ────────────────────────────────────────────────────
export interface MenstaData {
  appName: string;
  accentColor?: string;
  screenshots?: string[];
  hero: { badge: string; heading: string; subtext: string; cta1: string; cta2: string };
  trusted: { text: string; logos: string[] };
  whyBest: { eyebrow: string; heading: string; subtext: string; cards: { title: string; desc: string }[] };
  howItWorks: { eyebrow: string; heading: string; subtext: string; tabs: { label: string; heading: string; body: string; items: string[] }[] };
  opportunity?: { eyebrow: string; heading: string; subtext: string; cards: { icon: string; title: string; desc: string }[] };
  approach?: { eyebrow?: string; heading: string; description: string | string[]; principles: { number: string; title: string; desc: string }[] };
  designSystem?: { eyebrow: string; heading: string; subtext: string };
  challenges?: { eyebrow: string; heading: string; headingAccent: string; subtext: string };
  outcome?: { eyebrow: string; heading: string; headingAccent: string; subtext: string };
  uxAudit?: {
    eyebrow: string;
    heading: string[];
    paragraphs: string[];
    annotations: { badges?: number[]; title: string; desc: string }[];
  };
  informationArchitecture?: { eyebrow: string; heading: string; subtext: string; before: string[]; after: string[] };
  workflowTransformation?: { eyebrow: string; heading: string; description: string[]; before: { label: string; items: string[] }; after: { label: string; items: string[] } };
  snapshot?: { role: string; timeline: string; team: string; contribution: string };
  coreExperience?: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    subtitle: string;
    left: { title: string; desc: string; items: { title: string; desc: string; num: string }[] };
    rights: { title: string; desc: string; color: "green" | "orange"; items: { title: string; desc: string; num: string }[] }[];
    features: { title: string; desc: string }[];
  };
  features: { eyebrow: string; heading: string; subtext: string };
  integrations: { heading: string; subtext: string; logos: string[] };
  people: { eyebrow: string; heading: string; subtext: string };
  testimonials: { eyebrow: string; heading: string; subtext: string; items: { name: string; role: string; quote: string }[] };
  pricing: { eyebrow: string; heading: string; subtext: string; plans: { name: string; price: number; yearlyPrice: number; features: string[]; popular?: boolean }[] };
  faq: { eyebrow: string; heading: string; items: { q: string; a: string }[] };
  blog: { eyebrow: string; heading: string; subtext: string; posts: { category: string; date: string; readTime: string; title: string; excerpt: string }[] };
  cta: { eyebrow: string; heading: string };
  footer: { desc: string; pages: string[]; utility: string[]; copyright: string };
}

// ─── Shared Primitives ────────────────────────────────────────
const ff = "var(--font-geist), sans-serif";
const ffHeading = "var(--font-gelica)";


const revealStyle = (visible: boolean, delay = 0): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(28px)",
  transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
});
const MAX_W = "1200px";

const SCREEN_COLORS = [
  { bg: "linear-gradient(135deg,#1a3f7a 0%,#2856A2 100%)", ui: "#2856A2" },
  { bg: "linear-gradient(135deg,#0891B2 0%,#22D3EE 100%)", ui: "#0ea5e9" },
  { bg: "linear-gradient(135deg,#059669 0%,#34D399 100%)", ui: "#10b981" },
  { bg: "linear-gradient(135deg,#D97706 0%,#FBBF24 100%)", ui: "#f59e0b" },
];

function StaticPhoneMockup({ colorIndex = 0, label = "Dashboard" }: { colorIndex?: number; label?: string }) {
  const color = SCREEN_COLORS[colorIndex % SCREEN_COLORS.length];
  /* 252×504 — 40% larger than original 180×360 */
  return (
    <div style={{
      width: 252, height: 504,
      background: "#1a1a1a",
      borderRadius: 48,
      padding: "13px 10px",
      boxShadow: "0 32px 64px rgba(0,0,0,0.26), 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.04)",
      position: "relative",
      flexShrink: 0,
    }}>
      {/* Notch */}
      <div style={{ position: "absolute", top: 13, left: "50%", transform: "translateX(-50%)", width: 82, height: 28, background: "#1a1a1a", borderRadius: "0 0 20px 20px", zIndex: 10 }} />
      {/* Side buttons */}
      <div style={{ position: "absolute", right: -3, top: 112, width: 3, height: 36, background: "#333", borderRadius: "0 3px 3px 0" }} />
      <div style={{ position: "absolute", left: -3, top: 87, width: 3, height: 28, background: "#333", borderRadius: "3px 0 0 3px" }} />
      <div style={{ position: "absolute", left: -3, top: 126, width: 3, height: 28, background: "#333", borderRadius: "3px 0 0 3px" }} />
      {/* Screen */}
      <div style={{
        width: "100%", height: "100%", borderRadius: 36, overflow: "hidden",
        background: color.bg, position: "relative",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: 22, gap: 14,
      }}>
        {/* Status bar */}
        <div style={{ position: "absolute", top: 17, left: 22, right: 22, display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: ff }}>9:41</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: ff }}>●●●</span>
        </div>
        {/* Mock UI card */}
        <div style={{ width: "100%", background: "rgba(255,255,255,0.15)", borderRadius: 17, padding: "15px 18px", backdropFilter: "blur(8px)" }}>
          <div style={{ width: 78, height: 8, background: "rgba(255,255,255,0.6)", borderRadius: 4, marginBottom: 11 }} />
          <div style={{ width: "100%", height: 7, background: "rgba(255,255,255,0.3)", borderRadius: 4, marginBottom: 6 }} />
          <div style={{ width: "70%", height: 7, background: "rgba(255,255,255,0.3)", borderRadius: 4 }} />
        </div>
        {/* Stat blocks */}
        <div style={{ display: "flex", gap: 11, width: "100%" }}>
          {[1, 2].map(j => (
            <div key={j} style={{ flex: 1, background: "rgba(255,255,255,0.12)", borderRadius: 14, padding: "14px 11px" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.25)", marginBottom: 10 }} />
              <div style={{ width: "80%", height: 6, background: "rgba(255,255,255,0.4)", borderRadius: 3, marginBottom: 5 }} />
              <div style={{ width: "55%", height: 6, background: "rgba(255,255,255,0.25)", borderRadius: 3 }} />
            </div>
          ))}
        </div>
        {/* Label pill */}
        <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 10, padding: "7px 17px" }}>
          <span style={{ fontFamily: ff, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.9)", letterSpacing: "0.05em" }}>{label}</span>
        </div>
        {/* Home indicator */}
        <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 73, height: 4, background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
      </div>
    </div>
  );
}

// ─── Shared iPhone 16 Plus frame ───────────────────────────────
// Proportions modeled on a 322×660 reference frame; `width` scales everything uniformly.
function IPhone16PlusFrame({
  width = 270,
  src,
  alt = "",
  images,
  activeIndex = 0,
  transitionMs = 700,
}: {
  width?: number;
  src?: string;
  alt?: string;
  images?: string[];
  activeIndex?: number;
  transitionMs?: number;
}) {
  const k = width / 322;
  const H = Math.round(660 * k);
  const radius = 52 * k;
  const px = (n: number) => `${n * k}px`;

  return (
    <div style={{
      width, height: H,
      background: "#111111",
      borderRadius: radius,
      padding: `${14 * k}px ${10 * k}px`,
      boxShadow: "0 48px 96px rgba(0,0,0,0.45), 0 16px 40px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(0,0,0,0.8)",
      position: "relative",
      flexShrink: 0,
    }}>
      {/* Dynamic Island */}
      <div style={{ position: "absolute", top: px(16), left: "50%", transform: "translateX(-50%)", width: px(120), height: px(34), background: "#000", borderRadius: px(20), zIndex: 10 }} />
      {/* Screen edge highlight */}
      <div style={{ position: "absolute", inset: 0, borderRadius: radius, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)", pointerEvents: "none", zIndex: 20 }} />
      {/* Action Button */}
      <div style={{ position: "absolute", left: px(-4), top: px(108), width: px(4), height: px(22), background: "#222", borderRadius: `${px(4)} 0 0 ${px(4)}` }} />
      {/* Volume Up / Down */}
      <div style={{ position: "absolute", left: px(-4), top: px(150), width: px(4), height: px(42), background: "#222", borderRadius: `${px(4)} 0 0 ${px(4)}` }} />
      <div style={{ position: "absolute", left: px(-4), top: px(200), width: px(4), height: px(42), background: "#222", borderRadius: `${px(4)} 0 0 ${px(4)}` }} />
      {/* Power button */}
      <div style={{ position: "absolute", right: px(-4), top: px(160), width: px(4), height: px(60), background: "#222", borderRadius: `0 ${px(4)} ${px(4)} 0` }} />
      {/* Camera Control */}
      <div style={{ position: "absolute", right: px(-4), top: px(240), width: px(4), height: px(30), background: "#333", borderRadius: `0 ${px(4)} ${px(4)} 0` }} />
      {/* Screen */}
      <div style={{ width: "100%", height: "100%", borderRadius: px(40), overflow: "hidden", position: "relative" }}>
        {images ? (
          images.map((s, i) => (
            <img key={i} src={s} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", opacity: activeIndex === i ? 1 : 0, transition: `opacity ${transitionMs}ms ease` }} />
          ))
        ) : (
          <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
        )}
        {/* Home indicator */}
        <div style={{ position: "absolute", bottom: px(8), left: "50%", transform: "translateX(-50%)", width: px(120), height: px(5), background: "rgba(0,0,0,0.25)", borderRadius: px(3) }} />
      </div>
    </div>
  );
}

function CarouselPhoneMockup({ colorIndex = 0, label = "Dashboard" }: { colorIndex?: number; label?: string }) {
  const SCREENS = useContext(ScreensContext);
  return <IPhone16PlusFrame width={322} src={SCREENS[colorIndex % SCREENS.length]} alt={label} />;
}

// ─── True Desandro cylinder carousel ─────────────────────────
function PhoneCarousel() {
  const LABELS = [
    "Dashboard",  "Table Map",  "Orders",
    "Billing",    "Analytics",  "Bookings",
    "Reports",    "Kitchen",    "Overview",
    "Inventory",  "Payments",   "Check-in",
    "Rooms",      "Revenue",    "Menu",
    "Staff",      "Feedback",   "Housekeeping",
  ];
  const N      = LABELS.length;
  const CELL_W = 322;
  const CELL_H = 660;
  const theta  = 360 / N;
  const radius = 1000;
  const AUTO_SPEED = -360 / 60; // deg/sec — one full rotation every 60 s

  const sceneRef      = useRef<HTMLDivElement>(null);
  const carouselRef   = useRef<HTMLDivElement>(null);
  const cellInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rotRef        = useRef(0);
  const velRef        = useRef(AUTO_SPEED);
  const dragging      = useRef(false);
  const lastX         = useRef(0);
  const lastT         = useRef(0);
  const dragVel       = useRef(0);
  const rafRef        = useRef(0);

  const MIN_SCALE = 0.68;

  // Auto-spin + momentum RAF loop
  useEffect(() => {
    let prevTs = 0;
    const tick = (ts: number) => {
      const dt = Math.min((ts - prevTs) / 1000, 0.05);
      prevTs = ts;
      if (!dragging.current) {
        // Ease velocity back toward auto-spin speed
        velRef.current += (AUTO_SPEED - velRef.current) * 0.025;
        rotRef.current += velRef.current * dt;
      }
      if (carouselRef.current) {
        carouselRef.current.style.transform =
          `translateZ(-${radius}px) rotateY(${rotRef.current}deg)`;
      }
      // Scale each cell by how front-facing it is
      const rot = rotRef.current;
      for (let i = 0; i < LABELS.length; i++) {
        const el = cellInnerRefs.current[i];
        if (!el) continue;
        let a = (i * theta + rot) % 360;
        if (a > 180) a -= 360;
        if (a < -180) a += 360;
        const s = MIN_SCALE + (1 - MIN_SCALE) * Math.max(0, Math.cos(a * Math.PI / 180));
        el.style.transform = `scale(${s.toFixed(4)})`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Drag-to-rotate pointer events
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const SENS = 0.3; // deg per px

    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      lastX.current    = e.clientX;
      lastT.current    = performance.now();
      dragVel.current  = 0;
      scene.setPointerCapture(e.pointerId);
      scene.style.cursor = 'grabbing';
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const now = performance.now();
      const dx  = e.clientX - lastX.current;
      const dt  = (now - lastT.current) / 1000;
      rotRef.current += dx * SENS;
      if (dt > 0.001) dragVel.current = (dx * SENS) / dt;
      lastX.current = e.clientX;
      lastT.current = now;
    };

    const onUp = (e: PointerEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      scene.releasePointerCapture(e.pointerId);
      scene.style.cursor = 'grab';
      velRef.current = dragVel.current; // carry throw momentum
    };

    scene.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      scene.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);

  return (
    <>
      <style>{`
        .mensta-scene {
          width: ${CELL_W}px;
          height: ${CELL_H}px;
          position: relative;
          perspective: 1000px;
          overflow: visible;
          cursor: grab;
          user-select: none;
        }
        .mensta-scene:active { cursor: grabbing; }
        .mensta-carousel {
          width: 100%;
          height: 100%;
          position: absolute;
          transform-style: preserve-3d;
          transform: translateZ(-${radius}px) rotateY(0deg);
        }
        .mensta-cell {
          position: absolute;
          width: ${CELL_W}px;
          height: ${CELL_H}px;
          top: 0;
          left: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>

      <div style={{ display: "flex", justifyContent: "center", padding: "10vh 0 96px", overflow: "visible", position: "relative" }}>
        <div className="mensta-scene" ref={sceneRef}>
          <div className="mensta-carousel" ref={carouselRef}>
            {LABELS.map((label, i) => (
              <div
                key={i}
                className="mensta-cell"
                style={{ transform: `rotateY(${i * theta}deg) translateZ(${radius}px)` }}
              >
                <div
                  ref={el => { cellInnerRefs.current[i] = el; }}
                  style={{ width: "100%", height: "100%", transformOrigin: "center center" }}
                >
                  <CarouselPhoneMockup colorIndex={i} label={label} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="var(--sp-charcoal)" />
      <path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="var(--sp-cream)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarRow() {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#F59E0B">
          <path d="M7 1l1.5 4.5H13L9.5 8l1.5 4.5L7 10 3 12.5 4.5 8 1 5.5h4.5z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Sections ────────────────────────────────────────────────

function ProjectSnapshotSection({ data }: { data: NonNullable<MenstaData["snapshot"]> }) {
  const ACCENT = useContext(AccentContext);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const items = [
    { icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="10" r="5" stroke={ACCENT} strokeWidth="1.8"/><path d="M5 24c0-4.418 4.03-8 9-8s9 3.582 9 8" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round"/></svg>
      ), label: "Role", value: data.role, color: ACCENT, iconBg: "rgba(255,111,30,0.12)" },
    { icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="4" y="6" width="20" height="18" rx="3" stroke={ACCENT} strokeWidth="1.8"/><path d="M4 11h20" stroke={ACCENT} strokeWidth="1.8"/><path d="M9 4v4M19 4v4" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round"/></svg>
      ), label: "Timeline", value: data.timeline, color: ACCENT, iconBg: "rgba(255,111,30,0.12)" },
    { icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="10" cy="10" r="4" stroke="#10b981" strokeWidth="1.8"/><circle cx="18" cy="10" r="4" stroke="#10b981" strokeWidth="1.8"/><path d="M2 22c0-3.314 3.582-6 8-6 1.15 0 2.24.196 3.21.545M14 22c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round"/></svg>
      ), label: "Team", value: data.team, color: "#10b981", iconBg: "#ecfdf5" },
    { icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 3l2.5 7.5H24l-6.4 4.6 2.5 7.5L14 18l-6.1 4.6 2.5-7.5L4 10.5h7.5z" stroke={ACCENT} strokeWidth="1.8" strokeLinejoin="round"/></svg>
      ), label: "Contribution", value: data.contribution, color: ACCENT, iconBg: "rgba(255,111,30,0.12)" },
  ];

  return (
    <div ref={ref} style={{ background: "var(--sp-cream)", borderBottom: "1px solid rgba(23,23,23,0.08)" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ ...revealStyle(visible, 0), textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontFamily: ff, fontSize: 13, color: "#8a8580", marginBottom: 10 }}>
            Project Snapshot
          </p>
          <h2 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, color: "var(--sp-cocoa)", lineHeight: 1.2, marginBottom: 14 }}>
            Built from scratch at Hotelogix.
          </h2>
          <p style={{ fontFamily: ff, fontSize: 15, color: "#8a8580", maxWidth: 480, margin: "0 auto" }}>
            A look at the scope, team, and contributions that shaped Pocket PMS from the ground up.
          </p>
        </div>
        <div style={{ ...revealStyle(visible, 100), display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {items.map((item, i) => (
            <div key={i} style={{ background: "var(--sp-dew)", borderRadius: "var(--radius-2xl)", padding: "24px 24px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 44, height: 44, borderRadius: "var(--radius-xl)", background: item.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div style={{ fontSize: 17, fontWeight: 600, color: item.color, fontFamily: ff, letterSpacing: "0.02em" }}>{item.label}</div>
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "var(--sp-charcoal)", fontFamily: ff, lineHeight: 1.4, whiteSpace: "pre-line" }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroSection({ data }: { data: MenstaData["hero"] }) {
  return (
    <section style={{
      background: "var(--sp-cream)",
      padding: "73px 32px 0",
      overflow: "visible",
      position: "relative",
      minHeight: "100vh",
    }}>

      {/* Heading / subtext / CTAs */}
      <div style={{ maxWidth: MAX_W, margin: "0 auto", paddingTop: "5%", position: "relative", zIndex: 1, textAlign: "center" }}>
        <h1 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: "clamp(34px, 3.5vw, 56px)", fontWeight: 600, color: "var(--sp-cocoa)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 22 }}>
          {data.heading}
        </h1>
        <p style={{ fontFamily: ff, fontSize: 16, color: "#8a8580", lineHeight: 1.7, maxWidth: 420, margin: "0 auto 36px" }}>
          {data.subtext}
        </p>
        <div style={{ display: "flex", gap: "var(--spacing-12)", justifyContent: "center" }}>
          <button style={{ fontFamily: ff, fontSize: 14, fontWeight: 600, background: "var(--sp-cream)", color: "var(--sp-charcoal)", border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-2xl-2)", padding: "13px 28px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
            🍎 App Store
          </button>
          <button style={{ fontFamily: ff, fontSize: 14, fontWeight: 600, background: "var(--sp-cream)", color: "var(--sp-charcoal)", border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-2xl-2)", padding: "13px 28px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
            ▶ Play Store
          </button>
        </div>
      </div>

      {/* 3-D carousel */}
      <PhoneCarousel />


    </section>
  );
}

function TrustedSection({ data }: { data: MenstaData["trusted"] }) {
  return (
    <section style={{ background: "var(--sp-dew)", padding: "40px 32px 15%" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <p style={{ fontFamily: ff, fontSize: 13, color: "#8a8580", textAlign: "center", marginBottom: "var(--spacing-24)"  }}>
          {data.text}
        </p>
        <div style={{ display: "flex", gap: "var(--spacing-32)", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
          {data.logos.map(logo => (
            <div key={logo} style={{ fontFamily: ff, fontSize: 14, fontWeight: 600, color: "#8a8580", padding: "6px 16px", border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-lg)", background: "var(--sp-cream)" }}>
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Opportunity bento illustrations ──────────────────────────
function IllustDonut() {
  const ACCENT = useContext(AccentContext);
  return (
    <svg width="100%" height="144" viewBox="0 0 148 110" fill="none" preserveAspectRatio="xMidYMax meet">
      <defs>
        <filter id="opp-card-shadow" x="-15%" y="-20%" width="130%" height="155%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#000000" floodOpacity="0.09" />
        </filter>
        <filter id="opp-card-shadow2" x="-15%" y="-20%" width="130%" height="155%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.05" />
        </filter>
      </defs>
      {/* Card 3 — back */}
      <rect x="18" y="26" width="112" height="40" rx="9" fill="#e9eaeb" filter="url(#opp-card-shadow2)" />
      {/* Card 2 — middle */}
      <rect x="10" y="38" width="128" height="42" rx="9" fill="#f3f4f6" filter="url(#opp-card-shadow2)" />
      {/* Card 1 — front */}
      <rect x="2" y="52" width="144" height="46" rx="10" fill="white" filter="url(#opp-card-shadow)" />
      {/* Orange icon circle */}
      <circle cx="29" cy="75" r="15" fill="#dbeafe" />
      {/* Music note */}
      <text x="29" y="81" textAnchor="middle" fontSize="15" fill={ACCENT} fontFamily="sans-serif">♪</text>
      {/* Amount label */}
      <text x="54" y="69" fontSize="11" fontWeight="700" fill="#111" fontFamily="sans-serif">$1,235</text>
      <text x="54" y="83" fontSize="8.5" fill="#9ca3af" fontFamily="sans-serif">Entertainment</text>
    </svg>
  );
}
function IllustLineChart() {
  const ACCENT = useContext(AccentContext);
  // S-curve line chart with gradient area fill and vertical marker line
  return (
    <svg width="100%" height="100%" viewBox="0 0 180 88" fill="none" preserveAspectRatio="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id="opp-line-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.22" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Gradient area under curve */}
      <path d="M10 80 C28 76 46 70 64 60 C82 50 98 36 116 24 C130 14 150 8 172 6 L172 86 L10 86 Z"
        fill="url(#opp-line-grad)" />
      {/* Main S-curve line */}
      <path d="M10 80 C28 76 46 70 64 60 C82 50 98 36 116 24 C130 14 150 8 172 6"
        stroke={ACCENT} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Vertical marker line */}
      <line x1="116" y1="4" x2="116" y2="86" stroke="#d1d5db" strokeWidth="1.5" />
      {/* Dot at curve–marker intersection */}
      <circle cx="116" cy="24" r="5" fill="white" stroke={ACCENT} strokeWidth="2.5" />
      {/* Baseline */}
      <line x1="8" y1="86" x2="174" y2="86" stroke="#e5e7eb" strokeWidth="1" />
    </svg>
  );
}
function IllustTwoDonuts() {
  const ACCENT = useContext(AccentContext);
  return (
    <svg width="100%" height="160" viewBox="0 0 260 130" fill="none" preserveAspectRatio="xMidYMax meet">
      {/* ── Left card: Front Desk ── */}
      <rect x="4" y="16" width="94" height="106" rx="14" fill="white" />
      {/* Avatar circle */}
      <circle cx="51" cy="48" r="16" fill="#dbeafe" />
      <circle cx="51" cy="44" r="6" fill={ACCENT} />
      <ellipse cx="51" cy="57" rx="9" ry="6" fill={ACCENT} />
      {/* Label */}
      <text x="51" y="80" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#111" fontFamily="sans-serif">Front Desk</text>
      {/* Status pill — green */}
      <rect x="16" y="88" width="70" height="16" rx="8" fill="#f0fdf4" />
      <circle cx="27" cy="96" r="3.5" fill="#22c55e" />
      <text x="36" y="100" fontSize="7" fontWeight="600" fill="#16a34a" fontFamily="sans-serif">Online</text>
      {/* Placeholder rows */}
      <rect x="16" y="110" width="70" height="6" rx="3" fill="#f3f4f6" />

      {/* ── Break indicator ── */}
      <line x1="100" y1="69" x2="125" y2="69" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" />
      <circle cx="133" cy="69" r="9" fill="#dbeafe" />
      <text x="133" y="73" textAnchor="middle" fontSize="10" fill={ACCENT} fontFamily="sans-serif">!</text>
      <line x1="141" y1="69" x2="166" y2="69" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" />
      <text x="133" y="90" textAnchor="middle" fontSize="6" fill="#9ca3af" fontFamily="sans-serif">No sync</text>

      {/* ── Right card: Housekeeping ── */}
      <rect x="166" y="16" width="90" height="106" rx="14" fill="white" />
      {/* Avatar circle */}
      <circle cx="211" cy="48" r="16" fill="#f3f4f6" />
      <circle cx="211" cy="44" r="6" fill="#d1d5db" />
      <ellipse cx="211" cy="57" rx="9" ry="6" fill="#d1d5db" />
      {/* Label */}
      <text x="211" y="80" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#111" fontFamily="sans-serif">Housekeeping</text>
      {/* Status pill — gray */}
      <rect x="176" y="88" width="70" height="16" rx="8" fill="#f9fafb" />
      <circle cx="187" cy="96" r="3.5" fill="#d1d5db" />
      <text x="196" y="100" fontSize="7" fontWeight="600" fill="#9ca3af" fontFamily="sans-serif">Offline</text>
      {/* Placeholder rows */}
      <rect x="176" y="110" width="70" height="6" rx="3" fill="#f3f4f6" />
    </svg>
  );
}
function IllustArcDots() {
  const ACCENT = useContext(AccentContext);
  // Semicircular arc of radial tick marks — like a protractor/speedometer scale
  const N = 24;
  const cx = 110, cy = 68, r = 48, half = 7;
  const ticks = Array.from({ length: N }, (_, i) => {
    const theta = Math.PI - (i / (N - 1)) * Math.PI; // π (left) → 0 (right)
    const c = Math.cos(theta), s = Math.sin(theta);
    return {
      x1: (cx + (r - half) * c).toFixed(2),
      y1: (cy - (r - half) * s).toFixed(2),
      x2: (cx + (r + half) * c).toFixed(2),
      y2: (cy - (r + half) * s).toFixed(2),
    };
  });
  return (
    <svg width="100%" height="100%" viewBox="0 0 220 76" fill="none" style={{ display: "block" }}>
      {ticks.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke={ACCENT} strokeWidth="3.5" strokeLinecap="round" />
      ))}
    </svg>
  );
}
function IllustGauge() {
  const ACCENT = useContext(AccentContext);
  // Semicircular gauge: gray track + orange fill to ~58%, large "58" score
  // Arc: center (65,76) r=53, from (12,76) to (118,76) going over top
  // 58% of 180° = 104° from left → endpoint at angle 76° from x-axis ≈ (78,25)
  return (
    <svg width="195" height="132" viewBox="0 0 130 88" fill="none">
      {/* Full gray track */}
      <path d="M12 76 A53 53 0 0 1 118 76" stroke="#e5e7eb" strokeWidth="14" fill="none" strokeLinecap="round" />
      {/* Orange fill — 58% of arc */}
      <path d="M12 76 A53 53 0 0 1 78 25" stroke={ACCENT} strokeWidth="14" fill="none" strokeLinecap="round" />
      {/* Score */}
      <text x="65" y="76" textAnchor="middle" fontSize="28" fontWeight="700" fill="#111" fontFamily="sans-serif">58</text>
    </svg>
  );
}

function OpportunitySection({ data }: { data: NonNullable<MenstaData["opportunity"]> }) {
  const illust = [<IllustDonut />, <IllustLineChart />, <IllustTwoDonuts />, <IllustArcDots />, <IllustGauge />];
  const card = (i: number, horizontal = false, illustAlign: "center" | "right" | "left" = "center", illustScale = 1.18, illustLeft?: string, illustVCenter = false) => (
    <div key={i} style={{
      background: "var(--sp-dew)",
      borderRadius: "var(--radius-2xl-2)",
      padding: "28px 28px 0",
      display: "flex",
      flexDirection: horizontal ? "row" as const : "column" as const,
      alignItems: horizontal ? "center" : "flex-start",
      justifyContent: horizontal ? "space-between" : "flex-start",
      gap: "var(--spacing-16)",
      minHeight: horizontal ? 200 : 300,
      overflow: "hidden",
      position: "relative" as const,
    }}>
      <div style={{ width: horizontal ? "48%" : undefined, paddingBottom: horizontal ? 28 : 0 }}>
        <h3 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: 16, fontWeight: 700, color: "var(--sp-cocoa)", marginBottom: "var(--spacing-8)", lineHeight: 1.35 }}>{data.cards[i].title}</h3>
        <p style={{ fontFamily: ff, fontSize: 13, color: "#8a8580", lineHeight: 1.6 }}>{data.cards[i].desc}</p>
      </div>
      {horizontal ? (
        <div style={{ width: "52%", height: "100%", display: "flex", alignItems: "flex-end", justifyContent: illustAlign === "right" ? "flex-end" : illustAlign === "left" ? "flex-start" : "center", overflow: "visible", transform: `scale(${illustScale})`, transformOrigin: `${illustAlign === "center" ? "center" : illustAlign} bottom`, paddingTop: 16 }}>
          {illust[i]}
        </div>
      ) : (
        <div style={{ marginLeft: -28, marginRight: -28, flex: 1, display: "flex", alignItems: illustVCenter ? "center" : "flex-end", justifyContent: illustAlign === "right" ? "flex-end" : illustAlign === "left" ? "flex-start" : "center", overflow: "visible", transform: `${illustScale !== 1 ? `scale(${illustScale})` : ""}${illustLeft ? ` translateX(${illustLeft})` : ""}`.trim() || undefined, transformOrigin: `${illustAlign === "center" ? "center" : illustAlign} ${illustVCenter ? "center" : "bottom"}` }}>
          {illust[i]}
        </div>
      )}
    </div>
  );

  return (
    <section style={{ background: "var(--sp-cream)", padding: "80px 32px" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <p style={{ fontFamily: ff, fontSize: 13, color: "#8a8580", marginBottom: 10 }}>{data.eyebrow}</p>
          <h2 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, color: "var(--sp-cocoa)", lineHeight: 1.2, marginBottom: 14 }}>{data.heading}</h2>
          <p style={{ fontFamily: ff, fontSize: 15, color: "#8a8580", maxWidth: 480, margin: "0 auto" }}>{data.subtext}</p>
        </div>
        {/* Bento grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {card(0, false, "center", 1.17, undefined, true)} {card(1, false, "center", 1, "10%")} {card(2, false, "center", 1.18, "10%")}
          <div style={{ gridColumn: "span 3", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {card(3, true)} {card(4, true)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Approach principle icons ──────────────────────────────────
const getApproachIcons = (accent: string) => [
  // 01 Mobile-first — phone outline
  <svg key="0" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="5" y="2" width="10" height="16" rx="2.5" stroke={accent} strokeWidth="1.5"/>
    <circle cx="10" cy="15.2" r="0.9" fill={accent}/>
    <line x1="8" y1="5" x2="12" y2="5" stroke={accent} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // 02 Fewer taps — cursor with reduce marks
  <svg key="1" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M7 4 L7 14 L10 11 L12 16 L14 15 L12 10 L16 10 Z" stroke={accent} strokeWidth="1.4" strokeLinejoin="round" fill="none"/>
    <line x1="3" y1="8" x2="5.5" y2="8" stroke={accent} strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="3" y1="11" x2="5.5" y2="11" stroke={accent} strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="3" y1="14" x2="5.5" y2="14" stroke={accent} strokeWidth="1.4" strokeLinecap="round"/>
  </svg>,
  // 03 Information at a glance — eye
  <svg key="2" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M2 10 C5 6 8 4.5 10 4.5 C12 4.5 15 6 18 10 C15 14 12 15.5 10 15.5 C8 15.5 5 14 2 10Z" stroke={accent} strokeWidth="1.5" fill="none"/>
    <circle cx="10" cy="10" r="2.5" stroke={accent} strokeWidth="1.5" fill="none"/>
  </svg>,
  // 04 One-handed — thumb up
  <svg key="3" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M8 9 L8 4.5 C8 3.7 8.7 3 9.5 3 C10.3 3 11 3.7 11 4.5 L11 8" stroke={accent} strokeWidth="1.4" strokeLinecap="round" fill="none"/>
    <path d="M11 7 C11 6.2 11.7 5.5 12.5 5.5 C13.3 5.5 14 6.2 14 7 L14 9" stroke={accent} strokeWidth="1.4" strokeLinecap="round" fill="none"/>
    <path d="M14 9 C14 8.2 14.7 7.5 15.5 7.5 C16.3 7.5 17 8.2 17 9 L17 12 C17 14.8 14.8 17 12 17 L10 17 C8 17 6.5 15.5 6 14 L5 11.5 C4.7 10.7 5.1 9.8 5.9 9.5 C6.7 9.2 7.5 9.6 7.8 10.4 L8.2 11" stroke={accent} strokeWidth="1.4" strokeLinecap="round" fill="none"/>
  </svg>,
  // 05 Built for real — wifi/signal reliability
  <svg key="4" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M2 8.5 C4.8 5.8 7.3 4.5 10 4.5 C12.7 4.5 15.2 5.8 18 8.5" stroke={accent} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M5 11.5 C6.5 9.8 8.2 9 10 9 C11.8 9 13.5 9.8 15 11.5" stroke={accent} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M8 14.5 C8.8 13.5 9.4 13 10 13 C10.6 13 11.2 13.5 12 14.5" stroke={accent} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <circle cx="10" cy="17" r="1.1" fill={accent}/>
  </svg>,
];

// ── Approach animated mockup ──────────────────────────────────
function ApproachCard({ gradient, accent }: { gradient: string; accent: string }) {
  return (
    <div style={{
      width: "100%", height: "100%", background: "white",
      borderRadius: "var(--radius-2xl)", overflow: "hidden",
      boxShadow: "0 24px 48px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.04)",
    }}>
      <div style={{ height: "44%", background: gradient, padding: "14px 14px 12px", display: "flex", flexDirection: "column" as const, justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 6 }}>
          <div style={{ width: 48, height: 4, background: "rgba(255,255,255,0.65)", borderRadius: 2 }} />
          <div style={{ width: 68, height: 4, background: "rgba(255,255,255,0.38)", borderRadius: 2 }} />
        </div>
        <div style={{ background: "rgba(0,0,0,0.18)", borderRadius: 6, padding: "4px 10px", alignSelf: "flex-start" as const }}>
          <div style={{ width: 34, height: 3, background: "rgba(255,255,255,0.82)", borderRadius: 2 }} />
        </div>
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 7 }}>
          <div style={{ width: "90%", height: 5, background: "#e5e7eb", borderRadius: 3 }} />
          <div style={{ width: "70%", height: 5, background: "#e5e7eb", borderRadius: 3 }} />
          <div style={{ width: "80%", height: 5, background: "#f3f4f6", borderRadius: 3 }} />
          <div style={{ width: "55%", height: 5, background: "#f3f4f6", borderRadius: 3 }} />
        </div>
        <div style={{ marginTop: 14, paddingTop: 10, borderTop: "1px solid #f3f4f6", display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: accent, opacity: 0.22 }} />
          <div style={{ width: "52%", height: 4, background: "#e5e7eb", borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
}

const APPROACH_CARDS = [
  { gradient: "linear-gradient(135deg,#1a3f7a 0%,#2856A2 100%)", accent: "#2856A2" },
  { gradient: "linear-gradient(135deg,#0891b2 0%,#22d3ee 100%)", accent: "#0891b2" },
  { gradient: "linear-gradient(135deg,#7c3aed 0%,#a78bfa 100%)", accent: "#7c3aed" },
];

function ApproachMockup() {
  const [expanded, setExpanded] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setExpanded(true), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const iv = setInterval(() => setCardIndex(i => (i + 1) % 3), 2800);
    return () => clearInterval(iv);
  }, [expanded]);

  const getPos = (i: number) => {
    const rel = (i - cardIndex + 3) % 3;
    return rel === 0 ? "left" : rel === 1 ? "right" : "hidden";
  };

  const cardStyle = (i: number): React.CSSProperties => {
    const pos = getPos(i);
    const base: React.CSSProperties = {
      position: "absolute", left: "50%", top: "50%",
      marginLeft: -80, marginTop: -105,
      width: 160, height: 210,
    };
    if (!expanded) return { ...base, transform: "translate(0,0) scale(0.15)", opacity: 0, zIndex: 0, transition: "all 0.45s ease" };
    if (pos === "left") return { ...base, transform: "translate(-152px,46px) rotate(-10deg) scale(1)", opacity: 1, zIndex: 3, transition: "all 0.75s cubic-bezier(0.34,1.4,0.64,1)" };
    if (pos === "right") return { ...base, transform: "translate(152px,-26px) rotate(8deg) scale(0.88)", opacity: 0.88, zIndex: 1, transition: "all 0.75s cubic-bezier(0.34,1.4,0.64,1)" };
    return { ...base, transform: "translate(0,0) scale(0.15)", opacity: 0, zIndex: 0, transition: "all 0.4s ease" };
  };

  return (
    <div style={{ position: "relative", width: "100%", height: 520, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {APPROACH_CARDS.map((c, i) => (
        <div key={i} style={cardStyle(i)}>
          <ApproachCard gradient={c.gradient} accent={c.accent} />
        </div>
      ))}
      <div style={{ position: "relative", zIndex: 2, flexShrink: 0 }}>
        <div style={{
          width: 190, height: 388, background: "#111", borderRadius: 38, padding: "12px 8px",
          boxShadow: "0 40px 80px rgba(0,0,0,0.32), 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.04)",
          position: "relative",
        }}>
          <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 58, height: 20, background: "#111", borderRadius: "0 0 13px 13px", zIndex: 10 }} />
          <div style={{ position: "absolute", right: -3, top: 88, width: 3, height: 32, background: "#333", borderRadius: "0 3px 3px 0" }} />
          <div style={{ position: "absolute", left: -3, top: 70, width: 3, height: 26, background: "#333", borderRadius: "3px 0 0 3px" }} />
          <div style={{ position: "absolute", left: -3, top: 104, width: 3, height: 26, background: "#333", borderRadius: "3px 0 0 3px" }} />
          <div style={{
            width: "100%", height: "100%", borderRadius: 28, overflow: "hidden",
            background: "linear-gradient(150deg,#1a3f7a 0%,#2856A2 50%,#4a7fd4 100%)",
            display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: 10, position: "relative",
          }}>
            <div style={{ position: "absolute", top: 20, left: 14, right: 14, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", fontFamily: ff }}>9:41</span>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", fontFamily: ff }}>●●●</span>
            </div>
            <div style={{ width: "70%", height: 6, background: "rgba(255,255,255,0.52)", borderRadius: 3 }} />
            <div style={{ width: "52%", height: 6, background: "rgba(255,255,255,0.32)", borderRadius: 3 }} />
            <div style={{ width: "38%", height: 5, background: "rgba(255,255,255,0.18)", borderRadius: 3 }} />
            <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 54, height: 3, background: "rgba(255,255,255,0.28)", borderRadius: 2 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ChallengesPhone() {
  const SCREENS = useContext(ScreensContext);
  return <IPhone16PlusFrame width={270} src={SCREENS[0]} alt="Single reservation screen" />;
}

function ApproachPhone() {
  const SCREENS = useContext(ScreensContext);
  return <IPhone16PlusFrame width={270} src={SCREENS[8]} alt="Check-in screen" />;
}

function FloatingPhone({ onSection }: { onSection: (s: "approach" | "core" | "design" | "challenges") => void }) {
  const phoneRef = useRef<HTMLDivElement>(null);
  const [section, setSection] = useState<"approach" | "core" | "design" | "challenges" | null>(null);
  const [coreIdx, setCoreIdx] = useState(0);

  useEffect(() => {
    const W = 292, H = 605;
    let rafId: number;

    const getAnchor = (name: string) => {
      const el = document.querySelector(`[data-phone-anchor="${name}"]`);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { pageX: r.left + r.width / 2, pageY: r.top + window.scrollY + r.height / 2 };
    };

    const getHeadingScrollY = (name: string) => {
      const el = document.querySelector(`[data-section-heading="${name}"]`);
      if (!el) return null;
      // scrollY at which this heading sits just below the navbar
      const navH = (document.querySelector("[data-navbar]") as HTMLElement)?.offsetHeight ?? 72;
      return el.getBoundingClientRect().top + window.scrollY - navH;
    };

    const ss = (t: number) => t * t * (3 - 2 * t);
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

    const tick = () => {
      const phone = phoneRef.current;
      if (phone) {
        const sy = window.scrollY, vh = window.innerHeight;

        const ap = getAnchor("approach"), co = getAnchor("core"), de = getAnchor("design");
        const kAp = getHeadingScrollY("approach"), kCo = getHeadingScrollY("core"), kDe = getHeadingScrollY("design");

        const ch = getAnchor("challenges");
        const kCh = getHeadingScrollY("challenges");

        if (ap && co && de && kAp !== null && kCo !== null && kDe !== null) {
          let tX: number, tY: number, seg: "approach" | "core" | "design" | "challenges";
          const HOLD = 500; // scroll px to hold at each section (~3s at comfortable speed)

          if (sy <= kAp + HOLD) {
            // hold at approach
            tX = ap.pageX; tY = ap.pageY; seg = "approach";
          } else if (sy <= kCo) {
            // move approach → core
            const raw = clamp((sy - (kAp + HOLD)) / (kCo - (kAp + HOLD)), 0, 1);
            const t = ss(raw);
            tX = ap.pageX + (co.pageX - ap.pageX) * t;
            tY = ap.pageY + (co.pageY - ap.pageY) * t;
            seg = raw < 0.5 ? "approach" : "core";
          } else if (sy <= kCo + HOLD) {
            // hold at core
            tX = co.pageX; tY = co.pageY; seg = "core";
          } else if (sy <= kDe) {
            // move core → design
            const raw = clamp((sy - (kCo + HOLD)) / (kDe - (kCo + HOLD)), 0, 1);
            const t = ss(raw);
            tX = co.pageX + (de.pageX - co.pageX) * t;
            tY = co.pageY + (de.pageY - co.pageY) * t;
            seg = raw < 0.5 ? "core" : "design";
          } else if (sy <= kDe + HOLD || !ch || kCh === null) {
            // hold at design
            tX = de.pageX; tY = de.pageY; seg = "design";
          } else if (sy <= kCh) {
            // move design → challenges
            const raw = clamp((sy - (kDe + HOLD)) / (kCh - (kDe + HOLD)), 0, 1);
            const t = ss(raw);
            tX = de.pageX + (ch.pageX - de.pageX) * t;
            tY = de.pageY + (ch.pageY - de.pageY) * t;
            seg = raw < 0.5 ? "design" : "challenges";
          } else {
            // hold at challenges
            tX = ch.pageX; tY = ch.pageY; seg = "challenges";
          }

          const targetL = tX - W / 2;
          const targetT = tY - sy - H / 2;

          phone.style.left = targetL + "px";
          phone.style.top = targetT + "px";

          const endY = kCh !== null ? kCh + vh : kDe + vh;
          const inRange = sy >= kAp - vh && sy <= endY;
          phone.style.opacity = inRange ? "1" : "0";

          setSection(prev => { if (prev !== seg) { onSection(seg); return seg; } return prev; });
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCoreIdx((i) => (i + 1) % 8), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div ref={phoneRef} style={{ position: "fixed", left: 0, top: 0, width: 292, height: 605, zIndex: 99, pointerEvents: "none", opacity: 0, transition: "opacity 0.4s ease", filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.18)) drop-shadow(0 8px 16px rgba(0,0,0,0.10))" }}>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {(["approach", "core", "design", "challenges"] as const).map((s) => (
          <div key={s} style={{ position: "absolute", inset: 0, opacity: section === s ? 1 : 0, transition: "opacity 0.6s ease", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ transform: "scale(1.08)", transformOrigin: "center center" }}>
              {s === "approach" && <ApproachPhone />}
              {s === "core" && <CoreExperiencePhone activeIndex={coreIdx} />}
              {s === "design" && <DesignSystemPhone />}
              {s === "challenges" && <ChallengesPhone />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApproachSection({ data, active }: { data: NonNullable<MenstaData["approach"]>, active: boolean }) {
  const ACCENT = useContext(AccentContext);
  const APPROACH_ICONS = getApproachIcons(ACCENT);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { if (active) setRevealed(true); }, [active]);
  return (
    <section data-section-phone="approach" style={{ background: "var(--sp-cream)", padding: "80px 32px 15%" }}>
      <span data-section-heading="approach" style={{ display: "block", height: 0 }} />
      <div style={{
        maxWidth: MAX_W, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 80, alignItems: "center",
      }}>
        {/* Left: animated phone + cards */}
        <div data-phone-anchor="approach" style={{ display: "flex", alignItems: "center", justifyContent: "center", visibility: "hidden" }}>
          <div style={{ transform: "scale(1.3)", transformOrigin: "center center" }}>
            <ApproachMockup />
          </div>
        </div>

        {/* Right: text content */}
        <div style={revealStyle(revealed)}>
          {data.eyebrow && (
            <p style={{ fontFamily: ff, fontSize: 13, color: "#8a8580", marginBottom: 10 }}>
              {data.eyebrow}
            </p>
          )}
          <h2 style={{
            fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700,
            color: "var(--sp-cocoa)", lineHeight: 1.2, marginBottom: 14,
          }}>
            {data.heading}
          </h2>
          {(Array.isArray(data.description) ? data.description : [data.description]).map((p, i, arr) => (
            <p key={i} style={{ fontFamily: ff, fontSize: 15, color: "#8a8580", lineHeight: 1.75, marginBottom: i < arr.length - 1 ? 16 : 44 }}>{p}</p>
          ))}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 28 }}>
            {data.principles.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: "var(--spacing-16)", alignItems: "flex-start" }}>
                <div style={{
                  flexShrink: 0, width: 44, height: 44,
                  background: "rgba(255,111,30,0.12)", borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {APPROACH_ICONS[i]}
                </div>
                <div>
                  <h4 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: 16, fontWeight: 700, color: "var(--sp-cocoa)", marginBottom: 5, lineHeight: 1.3 }}>
                    {p.title}
                  </h4>
                  <p style={{ fontFamily: ff, fontSize: 13.5, color: "#8a8580", lineHeight: 1.65, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Core Experience ───────────────────────────────────────────
const SCREEN_LABELS = [
  "Single Reservations",
  "Group Reservations",
  "Consolidated Accounts",
  "Accounts",
  "Housekeeping",
  "POS 2.0",
  "Management Dashboard",
  "Night Audit",
];

function CoreExperiencePhone({ activeIndex }: { activeIndex: number }) {
  const SCREENS = useContext(ScreensContext);
  return <IPhone16PlusFrame width={270} images={SCREENS.slice(0, 8)} activeIndex={activeIndex} transitionMs={700} />;
}

function CoreExperienceSection({ data, active }: { data: NonNullable<MenstaData["coreExperience"]>, active: boolean }) {
  const PRP = useContext(AccentContext), GRN = "#10b981", ORG = PRP;
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { if (active) setRevealed(true); }, [active]);
  useEffect(() => {
    const t = setInterval(() => setActiveIndex(i => (i + 1) % 8), 4000);
    return () => clearInterval(t);
  }, []);

  // Left card circle icons (white on purple)
  const leftCircleIcons = [
    <svg key="0" width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="4" width="18" height="16" rx="2" stroke="white" strokeWidth="1.8"/><line x1="2" y1="9" x2="20" y2="9" stroke="white" strokeWidth="1.8"/><line x1="7" y1="2" x2="7" y2="6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/><line x1="15" y1="2" x2="15" y2="6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    <svg key="1" width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="8" cy="7" r="3.5" stroke="white" strokeWidth="1.8"/><path d="M1 19 C1 15 4 13 8 13 C12 13 15 15 15 19" stroke="white" strokeWidth="1.8" strokeLinecap="round"/><circle cx="16" cy="7.5" r="2.8" stroke="white" strokeWidth="1.8"/><path d="M16 12.5 C18.5 13 20.5 15 20.5 19" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    <svg key="2" width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="2" width="16" height="18" rx="2" stroke="white" strokeWidth="1.8"/><line x1="7" y1="8" x2="15" y2="8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/><line x1="7" y1="12" x2="13" y2="12" stroke="white" strokeWidth="1.8" strokeLinecap="round"/><line x1="7" y1="16" x2="11" y2="16" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    <svg key="3" width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="6" width="18" height="12" rx="2" stroke="white" strokeWidth="1.8"/><line x1="2" y1="10" x2="20" y2="10" stroke="white" strokeWidth="1.8"/><rect x="5" y="13" width="5" height="2" rx="1" fill="white"/></svg>,
  ];

  // Right card circle icons (white on green/orange)
  const rightCircleIcons = [
    <svg key="5" width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="5" y="10" width="12" height="10" rx="2" stroke="white" strokeWidth="1.8"/><path d="M8 10 L8 7 C8 4.8 14 4.8 14 7 L14 10" stroke="white" strokeWidth="1.8"/><circle cx="11" cy="15" r="1.5" fill="white"/></svg>,
    <svg key="6" width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="2" width="18" height="13" rx="2" stroke="white" strokeWidth="1.8"/><line x1="2" y1="7" x2="20" y2="7" stroke="white" strokeWidth="1.8"/><path d="M8 21 L14 21" stroke="white" strokeWidth="1.8" strokeLinecap="round"/><line x1="11" y1="15" x2="11" y2="21" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    <svg key="7" width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="14" width="4" height="6" rx="1" fill="white"/><rect x="9" y="9" width="4" height="11" rx="1" fill="white" opacity="0.85"/><rect x="15" y="4" width="4" height="16" rx="1" fill="white" opacity="0.7"/></svg>,
    <svg key="8" width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3 C7 3.5 4 7 4 11 C4 15.5 7.5 19 11 19 C14.5 19 18 16 18 11" stroke="white" strokeWidth="1.8" strokeLinecap="round"/><path d="M14 3 C15.5 4.5 16.5 6 16.5 8 C16.5 10 15 11.5 13.5 12" stroke="white" strokeWidth="1.8" strokeLinecap="round"/><path d="M11 7 L11 11 L14 11" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    <svg key="9" width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="2" width="8" height="8" rx="1.5" fill="white"/><rect x="12" y="2" width="8" height="8" rx="1.5" fill="white" opacity="0.75"/><rect x="2" y="12" width="8" height="8" rx="1.5" fill="white" opacity="0.75"/><rect x="12" y="12" width="8" height="8" rx="1.5" fill="white" opacity="0.5"/></svg>,
  ];


  // Flatten right items with their color
  const rightItems = data.rights.flatMap(sec =>
    sec.items.map(item => ({ ...item, col: sec.color === "green" ? GRN : ORG }))
  );

  // viewBox 1120×660. phone col=280px, gap=80px, card col=(1200-280-160)/2=380px
  // VB scale=1120/1200=0.9333
  // left-card right edge: 380*0.9333=355, phone-left: (380+80)*0.9333=429
  // phone-right: (380+80+280)*0.9333=691, right-card left: (380+80+280+80)*0.9333=766
  // Left 4 cards spread: centers at 660*(1/8,3/8,5/8,7/8) = 82,248,413,578
  // Right 5 cards spread: centers at 660*(1/10,3/10,5/10,7/10,9/10) = 66,198,330,462,594
  const leftY  = [82, 248, 413, 578];
  const greenY = [66, 198];
  const orangeY = [396, 528];

  return (
    <section data-section-phone="core" style={{ background: "var(--sp-dew)", padding: "94px 32px 15%", overflow: "hidden" }}>
      <span data-section-heading="core" style={{ display: "block", height: 0 }} />
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "var(--spacing-64)", marginTop: "5%" }}>
          <p style={{ fontFamily: ff, fontSize: 13, color: "#8a8580", marginBottom: 10 }}>{data.eyebrow}</p>
          <h2 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, lineHeight: 1.2, color: "var(--sp-cocoa)", marginBottom: 14 }}>
            {data.heading} {data.headingAccent}
          </h2>
          <p style={{ fontFamily: ff, fontSize: 15, color: "#8a8580", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>{data.subtitle}</p>
        </div>

        {/* 3-col layout: left 4 cards | phone | right cards */}
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 280px 1fr", gap: "0 72px", alignItems: "stretch", marginTop: "10%" }}>

          {/* Connecting lines SVG overlay */}
          <svg
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2, overflow: "visible" }}
            viewBox="0 0 1200 530"
            preserveAspectRatio="none"
          >
            {/* Line 1: Phone left → TOP border of Single Reservations card */}
            <path d="M 452 200 C 410 200 369 190 369 180" stroke="rgba(255,111,30,0.35)" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
            <circle cx="369" cy="180" r="4" fill="rgba(255,111,30,0.55)" vectorEffect="non-scaling-stroke" />

            {/* Line 2: Phone right → BOTTOM border of POS 2.0 card */}
            <path d="M 748 130 C 793 130 831 148 831 162" stroke="rgba(255,111,30,0.35)" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
            <circle cx="831" cy="162" r="4" fill="rgba(255,111,30,0.55)" vectorEffect="non-scaling-stroke" />

            {/* Line 3: Phone right → TOP border of Management Dashboard card */}
            <path d="M 748 400 C 793 400 831 385 831 368" stroke="rgba(255,111,30,0.35)" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
            <circle cx="831" cy="368" r="4" fill="rgba(255,111,30,0.55)" vectorEffect="non-scaling-stroke" />
          </svg>

          {/* Concentric circles — outermost (i=0) 2% fill → innermost (i=4) 10% fill */}
          {[360, 300, 245, 192, 144].map((r, i) => (
            <div key={i} style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: r * 2, height: r * 2, borderRadius: "50%", border: `${i > 2 ? 1.5 : 1}px solid rgba(255,111,30,${[0.06, 0.10, 0.16, 0.23, 0.30][i]})`, background: `rgba(255,111,30,${[0.02, 0.04, 0.06, 0.08, 0.10][i]})`, pointerEvents: "none", zIndex: 0 }} />
          ))}

          {/* LEFT — 4 cards pushed down 15% */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 10, zIndex: 1, paddingTop: "15%", ...revealStyle(revealed) }}>
            {data.left.items.map((item, i) => {
              const active = activeIndex === i;
              return (
                <div key={i} style={{ width: "85%", marginLeft: "10%", borderRadius: "var(--radius-2xl)", background: "var(--sp-cream)", border: active ? "1.5px solid var(--sp-orange)" : "1.5px solid var(--sp-charcoal)", padding: "16px 18px", boxShadow: "var(--shadow-lg)", transform: active ? "translateY(-2px) scale(1.01)" : "none", transition: "box-shadow 0.4s ease, transform 0.4s ease, border-color 0.4s ease" }}>
                  <div style={{ fontFamily: ff, fontSize: 16, fontWeight: 700, color: "var(--sp-charcoal)", marginBottom: 5, lineHeight: 1.3 }}>{item.title}</div>
                  <div style={{ fontFamily: ff, fontSize: 14, color: "#8a8580", lineHeight: 1.55 }}>{item.desc}</div>
                </div>
              );
            })}
          </div>

          {/* CENTER — Phone scaled 10% */}
          <div data-phone-anchor="core" style={{ display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1, visibility: "hidden" }}>
            <div style={{ transform: "scale(1.1)", transformOrigin: "center center" }}>
              <CoreExperiencePhone activeIndex={activeIndex} />
            </div>
          </div>

          {/* RIGHT — green group top, orange group bottom */}
          <div style={{ display: "flex", flexDirection: "column" as const, justifyContent: "space-between", zIndex: 1, ...revealStyle(revealed, 150) }}>
            {/* Top: Housekeeping + POS 2.0 */}
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 10, transform: "translateY(-5%)" }}>
              {data.rights[0]?.items.map((item, i) => {
                const active = activeIndex === 4 + i;
                return (
                  <div key={i} style={{ width: "85%", marginLeft: "auto", marginRight: "10%", borderRadius: "var(--radius-2xl)", background: "var(--sp-cream)", border: active ? "1.5px solid var(--sp-orange)" : "1.5px solid var(--sp-charcoal)", padding: "16px 18px", boxShadow: "var(--shadow-lg)", transform: active ? "translateY(-2px) scale(1.01)" : "none", transition: "box-shadow 0.4s ease, transform 0.4s ease, border-color 0.4s ease" }}>
                    <div style={{ fontFamily: ff, fontSize: 16, fontWeight: 700, color: "var(--sp-charcoal)", marginBottom: 5, lineHeight: 1.3 }}>{item.title}</div>
                    <div style={{ fontFamily: ff, fontSize: 14, color: "#8a8580", lineHeight: 1.55 }}>{item.desc}</div>
                  </div>
                );
              })}
            </div>
            {/* Bottom: Management Dashboard + Night Audit */}
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 10, transform: "translateY(5%)" }}>
              {data.rights[1]?.items.map((item, i) => {
                const active = activeIndex === 6 + i;
                return (
                  <div key={i} style={{ width: "85%", marginLeft: "auto", marginRight: "10%", borderRadius: "var(--radius-2xl)", background: "var(--sp-cream)", border: active ? "1.5px solid var(--sp-orange)" : "1.5px solid var(--sp-charcoal)", padding: "16px 18px", boxShadow: "var(--shadow-lg)", transform: active ? "translateY(-2px) scale(1.01)" : "none", transition: "box-shadow 0.4s ease, transform 0.4s ease, border-color 0.4s ease" }}>
                    <div style={{ fontFamily: ff, fontSize: 16, fontWeight: 700, color: "var(--sp-charcoal)", marginBottom: 5, lineHeight: 1.3 }}>{item.title}</div>
                    <div style={{ fontFamily: ff, fontSize: 14, color: "#8a8580", lineHeight: 1.55 }}>{item.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function WhyBestSection({ data }: { data: MenstaData["whyBest"] }) {
  const icons = ["⚡", "🔄", "📊"];
  return (
    <section style={{ background: "var(--sp-cream)", padding: "80px 32px 15%" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontFamily: ff, fontSize: 13, color: "#8a8580", marginBottom: 10 }}>{data.eyebrow}</p>
          <h2 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, color: "var(--sp-cocoa)", lineHeight: 1.2, marginBottom: 14 }}>{data.heading}</h2>
          <p style={{ fontFamily: ff, fontSize: 15, color: "#8a8580", maxWidth: 480, margin: "0 auto" }}>{data.subtext}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {data.cards.map((card, i) => (
            <div key={i} style={{ background: "var(--sp-cream)", border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-2xl)", padding: 32 }}>
              <div style={{ width: 48, height: 48, background: "#f3f4f6", borderRadius: "var(--radius-xl)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 20 }}>
                {icons[i]}
              </div>
              <h3 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: 18, fontWeight: 600, color: "var(--sp-cocoa)", marginBottom: 10 }}>{card.title}</h3>
              <p style={{ fontFamily: ff, fontSize: 14, color: "#8a8580", lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedPhoneMockup({ activeIndex }: { activeIndex: number; tabs: MenstaData["howItWorks"]["tabs"] }) {
  const SCREENS = useContext(ScreensContext);
  return <IPhone16PlusFrame width={317} images={[SCREENS[8], SCREENS[1], SCREENS[4], SCREENS[6]]} activeIndex={activeIndex} transitionMs={550} />;
}

function HowItWorksSection({ data }: { data: MenstaData["howItWorks"] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, i) => {
      if (!ref) return null;
      const ob = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveIndex(i); },
        { threshold: 0.4 }
      );
      ob.observe(ref);
      return ob;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [data.tabs.length]);

  const PHONE_H = 634;
  const PHONE_W = 317;

  const cardBody = (tab: MenstaData["howItWorks"]["tabs"][0], i: number) => {
    const active = activeIndex === i;
    return (
      <div style={{
        background: "var(--sp-cream)",
        borderRadius: "var(--radius-2xl-2)",
        padding: "36px 40px",
        boxShadow: "0 8px 36px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
        border: "1px solid rgba(0,0,0,0.05)",
        opacity: active ? 1 : 0.3,
        transition: "opacity 0.4s ease, box-shadow 0.4s ease",
        width: "100%",
      }}>
        <h3 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: "clamp(18px,1.8vw,24px)", fontWeight: 700, color: "var(--sp-cocoa)", lineHeight: 1.3, marginBottom: 14 }}>{tab.heading}</h3>
        <p style={{ fontFamily: ff, fontSize: 14, color: "#8a8580", lineHeight: 1.8, marginBottom: 28 }}>{tab.body}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {tab.items.map((item, j) => (
            <div key={j} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ flexShrink: 0, display: "flex" }}><CheckIcon /></span>
              <span style={{ fontFamily: ff, fontSize: 13, color: "#8a8580" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section style={{ background: "var(--sp-dew)", padding: "80px 0 5%", position: "relative", overflow: "clip" }}>
      {/* Header */}
      <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: "0 32px", textAlign: "center", marginBottom: 80 }}>
        <p style={{ fontFamily: ff, fontSize: 13, color: "#8a8580", marginBottom: 10 }}>{data.eyebrow}</p>
        <h2 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, color: "var(--sp-cocoa)", lineHeight: 1.2, marginBottom: 14 }}>{data.heading}</h2>
        <p style={{ fontFamily: ff, fontSize: 15, color: "#8a8580", maxWidth: 480, margin: "0 auto" }}>{data.subtext}</p>
      </div>

      {/* 3-column grid: left cards | sticky phone | right cards */}
      <div style={{
        maxWidth: MAX_W, margin: "0 auto", padding: "0 32px",
        display: "grid",
        gridTemplateColumns: `1fr ${PHONE_W}px 1fr`,
        gap: "var(--spacing-48)",
        alignItems: "flex-start",
      }}>

        {/* LEFT COLUMN — even-indexed cards (0, 2) */}
        <div>
          {data.tabs.map((tab, i) => {
            const isLast = i === data.tabs.length - 1;
            return (
              <div
                key={i}
                ref={i % 2 === 0 ? (el => { sectionRefs.current[i] = el; }) : undefined}
                style={{ minHeight: isLast ? "70vh" : "100vh", display: "flex", alignItems: "center", padding: "40px 0" }}
              >
                {i % 2 === 0 && cardBody(tab, i)}
              </div>
            );
          })}
        </div>

        {/* CENTER COLUMN — sticky phone */}
        <div style={{
          position: "sticky",
          top: `calc(50vh - ${PHONE_H / 2}px)`,
          alignSelf: "flex-start",
          paddingBottom: 80,
          display: "flex",
          justifyContent: "center",
        }}>
          <AnimatedPhoneMockup activeIndex={activeIndex} tabs={data.tabs} />
        </div>

        {/* RIGHT COLUMN — odd-indexed cards (1, 3) */}
        <div>
          {data.tabs.map((tab, i) => {
            const isLast = i === data.tabs.length - 1;
            return (
              <div
                key={i}
                ref={i % 2 === 1 ? (el => { sectionRefs.current[i] = el; }) : undefined}
                style={{ minHeight: isLast ? "70vh" : "100vh", display: "flex", alignItems: "center", padding: "40px 0" }}
              >
                {i % 2 === 1 && cardBody(tab, i)}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

function IntegrationsSection({ data, features }: { data: MenstaData["integrations"]; features: MenstaData["features"] }) {
  return (
    <section style={{ background: "var(--sp-cream)", padding: "80px 32px 15%" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontFamily: ff, fontSize: 13, color: "#8a8580", marginBottom: 10 }}>{features.eyebrow}</p>
          <h2 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, color: "var(--sp-cocoa)", lineHeight: 1.2, marginBottom: 14 }}>{features.heading}</h2>
          <p style={{ fontFamily: ff, fontSize: 15, color: "#8a8580", maxWidth: 480, margin: "0 auto 40px" }}>{features.subtext}</p>
          <h3 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: 24, fontWeight: 600, color: "var(--sp-cocoa)", marginBottom: 10 }}>{data.heading}</h3>
          <p style={{ fontFamily: ff, fontSize: 14, color: "#8a8580", marginBottom: 32 }}>{data.subtext}</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-16)", justifyContent: "center" }}>
          {data.logos.map(logo => (
            <div key={logo} style={{ fontFamily: ff, fontSize: 13, fontWeight: 600, color: "#8a8580", padding: "8px 20px", border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-lg)", background: "var(--sp-dew)" }}>
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ data }: { data: MenstaData["testimonials"] }) {
  return (
    <section style={{ background: "var(--sp-dew)", padding: "80px 32px 15%" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontFamily: ff, fontSize: 13, color: "#8a8580", marginBottom: 10 }}>{data.eyebrow}</p>
          <h2 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, color: "var(--sp-cocoa)", lineHeight: 1.2, marginBottom: 14 }}>{data.heading}</h2>
          <p style={{ fontFamily: ff, fontSize: 15, color: "#8a8580", maxWidth: 480, margin: "0 auto" }}>{data.subtext}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {data.items.map((t, i) => (
            <div key={i} style={{ background: "var(--sp-cream)", border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-2xl)", padding: 24 }}>
              <StarRow />
              <p style={{ fontFamily: ff, fontSize: 14, color: "#8a8580", lineHeight: 1.7, margin: "14px 0 20px" }}>&ldquo;{t.quote}&rdquo;</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--sp-dew)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#8a8580", fontFamily: ff }}>
                  {t.name[0]}
                </div>
                <div>
                  <p style={{ fontFamily: ff, fontSize: 13, fontWeight: 600, color: "var(--sp-charcoal)", margin: 0 }}>{t.name}</p>
                  <p style={{ fontFamily: ff, fontSize: 12, color: "#8a8580", margin: 0 }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function FAQSection({ data }: { data: MenstaData["faq"] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section style={{ background: "var(--sp-dew)", padding: "80px 32px 15%" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontFamily: ff, fontSize: 13, color: "#8a8580", marginBottom: 10 }}>{data.eyebrow}</p>
          <h2 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, color: "var(--sp-cocoa)", lineHeight: 1.2 }}>{data.heading}</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: "var(--sp-cream)", border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontFamily: ff, fontSize: 15, fontWeight: 500, color: "var(--sp-charcoal)" }}>{item.q}</span>
                <span style={{ fontFamily: ff, fontSize: 18, color: "#8a8580", flexShrink: 0, marginLeft: 12 }}>{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div style={{ padding: "0 24px 20px" }}>
                  <p style={{ fontFamily: ff, fontSize: 14, color: "#8a8580", lineHeight: 1.7, margin: 0 }}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const CARD_ACCENTS = ["#a78bfa", "#2856A2", "#34d399", "#60a5fa"];

function CaseStudyCard({ project, index, delay, revealed }: {
  project: (typeof projects)[0];
  index: number;
  delay: number;
  revealed: boolean;
}) {
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={projectHref(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        borderRadius: "var(--radius-2xl)",
        overflow: "hidden",
        position: "relative",
        transform: hovered ? "scale(1.02)" : "scale(1)",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
        ...revealStyle(revealed, delay),
      }}
    >
      {/* Image area — 4:3 */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", background: "var(--sp-dew)", overflow: "hidden" }}>
        {/* Blurred blob */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            width: 220, height: 220, borderRadius: "50%",
            background: accent, opacity: 0.3,
            filter: "blur(56px)",
          }} />
        </div>
        {/* Industry label */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{
            fontFamily: ff,
            fontSize: 10, fontWeight: 500, color: "rgba(0,0,0,0.18)",
          }}>{project.industry}</span>
        </div>
        {/* Floating info bar */}
        <div style={{
          position: "absolute", bottom: 10, left: 10, right: 10,
          background: "rgba(253,251,249,0.92)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderRadius: "var(--radius-xl)",
          padding: "12px 14px",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10,
        }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontFamily: ff, fontSize: 14, fontWeight: 600, color: "var(--sp-charcoal)", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>
              {project.title}
            </p>
            <p style={{ fontFamily: ff, fontSize: 11, color: "#8a8580", marginTop: 2 }}>
              {project.category} / 2023
            </p>
          </div>
          <div style={{
            flexShrink: 0, width: 32, height: 32, borderRadius: "var(--radius-lg)",
            background: hovered ? "var(--sp-orange)" : "var(--sp-charcoal)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s",
            overflow: "hidden",
          }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" stroke="var(--sp-cream)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}

function OtherCaseStudiesSection({ currentSlug }: { currentSlug: string }) {
  const PRP = useContext(AccentContext);
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRevealed(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const others = projects.filter((p) => p.slug !== currentSlug).slice(0, 3);

  return (
    <section ref={ref} style={{ background: "var(--sp-cream)", padding: "80px 32px 15%" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "var(--spacing-48)", ...revealStyle(revealed) }}>
          <p style={{ fontFamily: ff, fontSize: 13, color: "#8a8580", marginBottom: 10 }}>More work</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
            <h2 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, color: "var(--sp-cocoa)", lineHeight: 1.2 }}>Other case studies</h2>
            <a href="/case-studies" style={{ fontFamily: ff, fontSize: 14, fontWeight: 600, color: "#8a8580", textDecoration: "none", whiteSpace: "nowrap" as const, paddingBottom: 4 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sp-charcoal)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8a8580")}
            >View all →</a>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {others.map((p, i) => (
            <CaseStudyCard key={p.slug} project={p} index={i} delay={80 + i * 80} revealed={revealed} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ data, appName }: { data: MenstaData["cta"]; appName: string }) {
  return (
    <section style={{ background: "var(--sp-dew)", padding: "80px 32px 15%" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: ff, fontSize: 13, color: "#8a8580", marginBottom: 14 }}>{data.eyebrow}</p>
        <h2 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, color: "var(--sp-cocoa)", lineHeight: 1.2, marginBottom: 36 }}>{data.heading}</h2>
        <div style={{ display: "flex", gap: "var(--spacing-12)", justifyContent: "center", marginBottom: 56 }}>
          <button style={{ fontFamily: ff, fontSize: 14, fontWeight: 600, background: "var(--sp-cream)", color: "var(--sp-charcoal)", border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-2xl-2)", padding: "13px 28px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
            🍎 App Store
          </button>
          <button style={{ fontFamily: ff, fontSize: 14, fontWeight: 600, background: "var(--sp-cream)", color: "var(--sp-charcoal)", border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-2xl-2)", padding: "13px 28px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
            ▶ Play Store
          </button>
        </div>
        <div style={{ display: "flex", gap: "var(--spacing-16)", justifyContent: "center", alignItems: "flex-end" }}>
          <div style={{ transform: "scale(0.88) translateY(16px)", transformOrigin: "bottom center" }}><StaticPhoneMockup colorIndex={1} label="Analytics" /></div>
          <StaticPhoneMockup colorIndex={0} label="Dashboard" />
          <div style={{ transform: "scale(0.88) translateY(16px)", transformOrigin: "bottom center" }}><StaticPhoneMockup colorIndex={2} label="Reports" /></div>
        </div>
      </div>
    </section>
  );
}

// ─── Design System Section ────────────────────────────────────
function DesignSystemPhone() {
  const SCREENS = useContext(ScreensContext);
  return <IPhone16PlusFrame width={270} src={SCREENS[10]} alt="Select Room screen" />;
}

function DesignSystemSection({ data, active }: { data: NonNullable<MenstaData["designSystem"]>, active: boolean }) {
  const BLUE = "#1E3A8A", LBLUE = "#3B5FBA", GREEN = "#22C55E", WARN = "#F59E0B", ERR = "#EF4444", NEUTRAL = "#6B7280";
  const ORG = useContext(AccentContext);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { if (active) setRevealed(true); }, [active]);

  const SL = { fontSize: 10, fontWeight: 700, color: "#9ca3af", marginBottom: 7 };

  const leftCards = [
    {
      num: "01",
      title: "Color System",
      content: (
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "var(--spacing-12)", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column" as const, flex: 5 }}>
            <div style={SL}>Primary</div>
            <div style={{ display: "flex", gap: 6, flex: 1 }}>
              {[[BLUE,"#1E3A8A"],[LBLUE,"#3B5FBA"],["#6B8FE0","#6B8FE0"],["#A5BFFF","#A5BFFF"],["#D4E0FF","#D4E0FF"]].map(([bg,hex],i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column" as const, gap: 4 }}>
                  <div style={{ flex: 1, minHeight: 47, borderRadius: "var(--radius-lg)", background: bg as string }} />
                  <div style={{ fontSize: 8, color: "#9ca3af", textAlign: "center" as const }}>{hex}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, flex: 2 }}>
            <div style={SL}>Semantic</div>
            <div style={{ display: "flex", gap: 6, flex: 1 }}>
              {[[GREEN,"Success"],[WARN,"Warning"],[ERR,"Error"],["#3B82F6","Info"],[NEUTRAL,"Neutral"]].map(([c,l],i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column" as const, gap: 4 }}>
                  <div style={{ flex: 1, minHeight: 20, borderRadius: "var(--radius-lg)", background: c as string }} />
                  <div style={{ fontSize: 8, color: "#9ca3af", textAlign: "center" as const }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, flex: 3 }}>
            <div style={SL}>Neutral Scale</div>
            <div style={{ display: "flex", gap: 3, flex: 1 }}>
              {["#111","#333","#555","#777","#999","#bbb","#ddd","#f5f5f5"].map((c, i) => (
                <div key={i} style={{ flex: 1, minHeight: 21, borderRadius: 5, background: c, border: i === 7 ? "1px solid #e5e7eb" : "none" }} />
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  const rightCards = [
    {
      num: "02",
      title: "Typography — Manrope",
      content: (
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 3 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, paddingBottom: 6, borderBottom: "1px solid #f3f4f6" }}>
            <div style={{ fontFamily: ff, fontSize: 44, fontWeight: 800, color: "#111", lineHeight: 1 }}>Aa</div>
            <div>
              <div style={{ fontFamily: ff, fontSize: 12, fontWeight: 700, color: "#111" }}>Manrope</div>
            </div>
          </div>
          {[{l:"Heading 1",s:"20px / 28px",w:"Semibold",fs:18,fw:700},{l:"Heading 2",s:"16px / 24px",w:"Semibold",fs:14,fw:700},{l:"Heading 3",s:"13px / 20px",w:"Medium",fs:12,fw:500},{l:"Body",s:"11px / 18px",w:"Regular",fs:11,fw:400}].map((t, i, arr) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 3, borderBottom: i < arr.length - 1 ? "1px solid #f3f4f6" : "none" }}>
              <span style={{ fontFamily: ff, fontSize: t.fs, fontWeight: t.fw, color: "#111" }}>{t.l}</span>
              <div style={{ textAlign: "right" as const }}>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>{t.s}</div>
                <div style={{ fontSize: 10, color: "#d1d5db" }}>{t.w}</div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      num: "03",
      title: "Spacing & Layout",
      content: (
        <div style={{ display: "flex", gap: 18 }}>
          <div style={{ flex: 1 }}>
            <div style={SL}>Spacing Scale</div>
            {[["4","4px"],["8","8px"],["12","12px"],["16","16px"],["24","24px"],["32","32px"],["48","48px"],["64","64px"]].map(([n,v],i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ width: 22, fontSize: 12, color: "#9ca3af", fontWeight: 600 }}>{n}</div>
                <div style={{ height: 8, background: BLUE, borderRadius: 4, width: [4,8,12,16,24,32,48,64][i] / 3.1 }} />
                <div style={{ fontSize: 12, color: "#9ca3af" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section data-section-phone="design" style={{ background: "var(--sp-dew)", padding: "80px 10%" }}>
      <span data-section-heading="design" style={{ display: "block", height: 0 }} />
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        {/* Centered header */}
        <div style={{ textAlign: "center", marginBottom: "var(--spacing-64)", marginTop: "5%", ...revealStyle(revealed) }}>
          <p style={{ fontFamily: ff, fontSize: 13, color: "#8a8580", marginBottom: 10 }}>{data.eyebrow}</p>
          <h2 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, lineHeight: 1.2, color: "var(--sp-cocoa)", marginBottom: 14 }}>
            {data.heading}
          </h2>
          <p style={{ fontFamily: ff, fontSize: 15, color: "#8a8580", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>{data.subtext}</p>
        </div>

        {/* Three-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px 1fr", gap: "0 60px", alignItems: "stretch" }}>
          {/* LEFT cards */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 14, ...revealStyle(revealed, 100) }}>
            {leftCards.map((card, i) => (
              <div key={i} style={{ background: "var(--sp-cream)", borderRadius: "var(--radius-2xl)", padding: "18px 20px", border: "1.5px solid var(--sp-charcoal)", width: "85%", marginLeft: "10%", flex: 1, display: "flex", flexDirection: "column" as const }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)", marginBottom: 12 }}>
                  <span style={{ fontFamily: ff, fontSize: 12, fontWeight: 700, color: ORG }}>{card.num}</span>
                  <span style={{ fontFamily: ff, fontSize: 15, fontWeight: 700, color: "var(--sp-charcoal)" }}>{card.title}</span>
                </div>
                {card.content}
              </div>
            ))}
          </div>

          {/* CENTER phone */}
          <div data-phone-anchor="design" style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", position: "sticky" as const, top: 40, visibility: "hidden" }}>
            <DesignSystemPhone />
          </div>

          {/* RIGHT cards */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 14, ...revealStyle(revealed, 200) }}>
            {rightCards.map((card, i) => (
              <div key={i} style={{ background: "var(--sp-cream)", borderRadius: "var(--radius-2xl)", padding: "18px 20px", border: "1.5px solid var(--sp-charcoal)", width: "85%", marginRight: "10%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)", marginBottom: 12 }}>
                  <span style={{ fontFamily: ff, fontSize: 12, fontWeight: 700, color: ORG }}>{card.num}</span>
                  <span style={{ fontFamily: ff, fontSize: 15, fontWeight: 700, color: "var(--sp-charcoal)" }}>{card.title}</span>
                </div>
                {card.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DesktopMockup() {
  const PRP = useContext(AccentContext);
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 20 }}>
      <div style={{ width: "88%", position: "relative" }}>
        {/* Monitor */}
        <div style={{ background: "#1a1b1e", borderRadius: "var(--radius-xl)", padding: "8px 8px 0", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
          {/* Menu bar */}
          <div style={{ background: "#2a2b30", borderRadius: "6px 6px 0 0", padding: "5px 10px", display: "flex", alignItems: "center", gap: 5, marginBottom: 1 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff5f56" }} />
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ffbd2e" }} />
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#27c93f" }} />
            <div style={{ flex: 1, display: "flex", gap: "var(--spacing-12)", marginLeft: 12 }}>
              {["Front Office","Reservations","Housekeeping","Accounts","Reports","More ↓"].map((item, i) => (
                <span key={i} style={{ fontSize: 7, color: i === 1 ? "white" : "rgba(255,255,255,0.5)", fontFamily: ff, fontWeight: i === 1 ? 600 : 400 }}>{item}</span>
              ))}
            </div>
          </div>
          {/* App chrome */}
          <div style={{ background: "white", borderRadius: "0 0 4px 4px", padding: 10, minHeight: 180 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#111", marginBottom: "var(--spacing-8)", fontFamily: ff }}>New Reservation</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div>
                <div style={{ fontSize: 7, color: "#6b7280", marginBottom: 6, fontFamily: ff, fontWeight: 600 }}>Guest Information</div>
                {[["Guest Name",""],["Mobile No.",""],["Email",""],["Address",""],["City",""],["Country",""]].map(([l], i) => (
                  <div key={i} style={{ marginBottom: 4 }}>
                    <div style={{ fontSize: 6.5, color: "#9ca3af", fontFamily: ff }}>{l}</div>
                    <div style={{ height: 13, background: "#f3f4f6", borderRadius: 3, border: "1px solid #e5e7eb", marginTop: 1 }} />
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 7, color: "#6b7280", marginBottom: 6, fontFamily: ff, fontWeight: 600 }}>Guest Allocation</div>
                {[["Room Type",""],["No. of Rooms",""],["Check-in",""],["Check-out",""],["Rate Plan",""]].map(([l], i) => (
                  <div key={i} style={{ marginBottom: 4 }}>
                    <div style={{ fontSize: 6.5, color: "#9ca3af", fontFamily: ff }}>{l}</div>
                    <div style={{ height: 13, background: "#f3f4f6", borderRadius: 3, border: "1px solid #e5e7eb", marginTop: 1 }} />
                  </div>
                ))}
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 7, color: "#6b7280", marginBottom: "var(--spacing-4)", fontFamily: ff, fontWeight: 600 }}>Room Details</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
                    {["Room No.","Room Type","Price"].map((h, i) => (
                      <div key={i} style={{ fontSize: 6, color: "white", background: "#374151", padding: "2px 4px", fontFamily: ff }}>{h}</div>
                    ))}
                    {["-","-","-"].map((v, i) => (
                      <div key={i} style={{ height: 10, background: "#f9fafb", border: "1px solid #e5e7eb" }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 5, marginTop: "var(--spacing-8)", paddingTop: 6, borderTop: "1px solid #e5e7eb" }}>
              {["Save","Cancel"].map((b, i) => (
                <div key={i} style={{ fontSize: 7, fontFamily: ff, padding: "3px 8px", borderRadius: 3, background: i === 0 ? "#f3f4f6" : "#f3f4f6", border: "1px solid #d1d5db", color: "#374151" }}>{b}</div>
              ))}
              <div style={{ fontSize: 7, fontFamily: ff, padding: "3px 8px", borderRadius: 3, background: PRP, color: "white" }}>Confirm</div>
            </div>
          </div>
        </div>
        {/* Stand */}
        <div style={{ width: "30%", height: 14, background: "#2a2b30", margin: "0 auto", borderRadius: "0 0 4px 4px" }} />
        <div style={{ width: "45%", height: 6, background: "#1a1b1e", margin: "0 auto", borderRadius: 4 }} />
      </div>
    </div>
  );
}

function ChallengesSection({ data, active }: { data: NonNullable<MenstaData["challenges"]>, active: boolean }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { if (active) setRevealed(true); }, [active]);
  const PRP = useContext(AccentContext), GRN = "#10b981";

  const beforeItems = [
    { icon: "📋", bold: "4–6 screens", text: "to switch between" },
    { icon: "🖱️", bold: "8–12 clicks", text: "on average" },
    { icon: "🧠", bold: "High cognitive load", text: "and data density" },
  ];
  const afterItems = [
    { icon: "⚡", bold: "3–4 taps", text: "to complete a task", accent: PRP },
    { icon: "📱", bold: "1 focused screen", text: "at a time", accent: null },
    { icon: "🎯", bold: "Faster & easier", text: "to learn and use", accent: null },
  ];
  const stats = [
    { val: "30%", label: "fewer steps", icon: "↓" },
    { val: "40%", label: "faster task completion", icon: "⏱" },
    { val: "Higher", label: "adoption & satisfaction", icon: "☺" },
    { val: "Built for", label: "real-world movement", icon: "🚶" },
  ];

  return (
    <section data-section-phone="challenges" style={{ background: "var(--sp-dew)", padding: "100px 32px 80px" }}>
      <span data-section-heading="challenges" style={{ display: "block", height: 0 }} />
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56, ...revealStyle(revealed) }}>
          <p style={{ fontFamily: ff, fontSize: 13, color: "#8a8580", marginBottom: 10 }}>{data.eyebrow}</p>
          <h2 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, lineHeight: 1.2, color: "var(--sp-cocoa)", marginBottom: 14 }}>
            {data.heading}{" "}
            <span style={{ color: PRP }}>{data.headingAccent}</span>
          </h2>
          <p style={{ fontFamily: ff, fontSize: 16, color: "#8a8580", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>{data.subtext}</p>
        </div>

        {/* Comparison card */}
        <div style={{ background: "var(--sp-cream)", borderRadius: "var(--radius-2xl-2)", border: "1.5px solid var(--sp-charcoal)", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", ...revealStyle(revealed, 100) }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr" }}>
            {/* BEFORE */}
            <div style={{ padding: "32px 36px 28px", borderRight: "1px solid rgba(23,23,23,0.12)" }}>
              <div style={{ display: "inline-block", background: "rgba(255,111,30,0.12)", borderRadius: 6, padding: "3px 10px", marginBottom: 16 }}>
                <span style={{ fontFamily: ff, fontSize: 11, fontWeight: 700, color: PRP, letterSpacing: "0.08em" }}>BEFORE</span>
              </div>
              <h3 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: 22, fontWeight: 800, color: "var(--sp-cocoa)", marginBottom: 8 }}>Desktop experience</h3>
              <p style={{ fontFamily: ff, fontSize: 13, color: "#8a8580", marginBottom: "var(--spacing-20)", lineHeight: 1.6 }}>Multiple screens. More clicks.<br />Steep learning curve.</p>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 10, marginBottom: 24 }}>
                {beforeItems.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "var(--spacing-12)", background: "var(--sp-dew)", borderRadius: 10, padding: "10px 14px" }}>
                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                    <div>
                      <span style={{ fontFamily: ff, fontSize: 13, fontWeight: 700, color: "var(--sp-charcoal)" }}>{item.bold}</span>
                      <span style={{ fontFamily: ff, fontSize: 13, color: "#8a8580" }}> {item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: "var(--spacing-20)", paddingTop: "var(--spacing-16)", borderTop: "1px solid rgba(23,23,23,0.08)" }}>
                <span style={{ fontSize: 20 }}>📊</span>
                <div>
                  <span style={{ fontFamily: ff, fontSize: 13, fontWeight: 700, color: PRP }}>Powerful, but overwhelming. </span>
                  <span style={{ fontFamily: ff, fontSize: 13, color: "#8a8580" }}>Designed for the front desk, not for the floor.</span>
                </div>
              </div>
            </div>

            {/* AFTER */}
            <div style={{ padding: "32px 36px 28px", background: "var(--sp-dew)", display: "flex", gap: "var(--spacing-24)", alignItems: "stretch" }}>
              {/* Left: text content */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column" as const, justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "inline-block", background: "#d1fae5", borderRadius: 6, padding: "3px 10px", marginBottom: 16 }}>
                    <span style={{ fontFamily: ff, fontSize: 11, fontWeight: 700, color: GRN, letterSpacing: "0.08em" }}>AFTER</span>
                  </div>
                  <h3 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: 22, fontWeight: 800, color: "var(--sp-cocoa)", marginBottom: 8 }}>Mobile experience</h3>
                  <p style={{ fontFamily: ff, fontSize: 13, color: "#8a8580", marginBottom: "var(--spacing-20)", lineHeight: 1.6 }}>Fewer taps. Clear flow.<br />Built for how staff actually work.</p>
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: 10, marginBottom: 24 }}>
                    {afterItems.map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "var(--spacing-12)", background: "var(--sp-cream)", borderRadius: 10, padding: "10px 14px", border: "1.5px solid var(--sp-charcoal)" }}>
                        <span style={{ fontSize: 18 }}>{item.icon}</span>
                        <div>
                          <span style={{ fontFamily: ff, fontSize: 13, fontWeight: 700, color: item.accent ?? "var(--sp-charcoal)" }}>{item.bold}</span>
                          <span style={{ fontFamily: ff, fontSize: 13, color: "#8a8580" }}> {item.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: "var(--spacing-16)", borderTop: "1px solid rgba(23,23,23,0.12)" }}>
                  <span style={{ fontSize: 20 }}>✅</span>
                  <div>
                    <span style={{ fontFamily: ff, fontSize: 13, fontWeight: 700, color: GRN }}>Intuitive, focused and mobile-first. </span>
                    <span style={{ fontFamily: ff, fontSize: 13, color: "#8a8580" }}>Designed for speed, clarity and movement.</span>
                  </div>
                </div>
              </div>
              {/* Right: phone anchor */}
              <div data-phone-anchor="challenges" style={{ width: 292, flexShrink: 0, visibility: "hidden" as const }} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function GoalSection() {
  const PRP = useContext(AccentContext);
  const stats = [
    { val: "30%", label: "fewer steps", icon: "↓" },
    { val: "40%", label: "faster task completion", icon: "⏱" },
    { val: "Higher", label: "adoption & satisfaction", icon: "☺" },
  ];
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRevealed(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ background: "var(--sp-dew)", padding: "10% 32px 80px" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div ref={ref} style={{ borderRadius: "var(--radius-2xl-2)", overflow: "hidden", background: `linear-gradient(135deg, ${PRP} 0%, #4f46e5 100%)`, boxShadow: "0 8px 32px rgba(99,102,241,0.22)", ...revealStyle(revealed) }}>
          <div style={{ padding: "32px 40px 28px", borderBottom: "1px solid rgba(255,255,255,0.12)", textAlign: "center" as const }}>
            <p style={{ fontFamily: ff, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)", marginBottom: 10 }}>The goal</p>
            <p style={{ fontFamily: ff, fontSize: 20, fontWeight: 700, color: "white", lineHeight: 1.5, maxWidth: 540, margin: "0 auto" }}>Make complex operations effortless on mobile—so staff can focus on guests, not the system.</p>
          </div>
          <div style={{ display: "flex", padding: "24px 40px" }}>
            {stats.map((s, i) => (
              <div key={i} style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, paddingRight: i < stats.length - 1 ? 32 : 0, paddingLeft: i > 0 ? 32 : 0, borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.15)" : "none" }}>
                <span style={{ fontSize: 20, opacity: 0.8 }}>{s.icon}</span>
                <div>
                  <div style={{ fontFamily: ff, fontSize: 28, fontWeight: 800, color: "white", lineHeight: 1, marginBottom: 4 }}>{s.val}</div>
                  <div style={{ fontFamily: ff, fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.4 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── UX Audit Section ──────────────────────────────────────────
const AUDIT_RED = "#EF4444";

// ── Annotated AxisRooms audit phone illustration ──────────────
// Reference canvas is 654×691 — all positions below are % of this frame so the
// whole diagram scales cleanly at any container width (e.g. 50vw).
const AUDIT_W = 800, AUDIT_H = 700;
const pct = (px: number, total: number) => `${(px / total) * 100}%`;

function AuditBox({ x, y, w, h, children, tone = "white" }: { x: number; y: number; w: number; h: number; children: React.ReactNode; tone?: "white" | "pink" | "pinkStrong" }) {
  const bg = tone === "pinkStrong" ? "#fee2e2" : tone === "pink" ? "#fef2f2" : "#fff";
  const border = tone === "white" ? "1px solid #e5e7eb" : `1px solid ${AUDIT_RED}55`;
  return (
    <div style={{
      position: "absolute", left: pct(x, AUDIT_W), top: pct(y, AUDIT_H), width: pct(w, AUDIT_W), height: pct(h, AUDIT_H),
      background: bg, border, borderRadius: "var(--radius-lg)", boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
      display: "flex", alignItems: "center", gap: 6, padding: "0 10px", fontFamily: ff,
    }}>
      {children}
    </div>
  );
}

function AuditDiagram({ annotations }: { annotations: NonNullable<MenstaData["uxAudit"]>["annotations"] }) {
  const iconSm: React.CSSProperties = { width: 20, height: 20, borderRadius: 5, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 10 };
  const boxLabel: React.CSSProperties = { fontSize: 11, fontWeight: 700, color: "#111" };

  const line = (x1: number, y1: number, x2: number, y2: number, key: number) => {
    const midY = (y1 + y2) / 2;
    return (
      <g key={key}>
        <polyline points={`${x1},${y1} ${x1},${midY} ${x2},${midY} ${x2},${y2}`} fill="none" stroke={AUDIT_RED} strokeWidth={1.3} strokeDasharray="3 3" />
        <circle cx={x1} cy={y1} r={2.5} fill={AUDIT_RED} />
        <circle cx={x2} cy={y2} r={2.5} fill={AUDIT_RED} />
      </g>
    );
  };

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: `${AUDIT_W} / ${AUDIT_H}`, fontFamily: ff }}>
      {/* Connector lines */}
      <svg viewBox={`0 0 ${AUDIT_W} ${AUDIT_H}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {line(380, 54, 265, 84, 1)}
        {line(380, 54, 535, 84, 2)}
        {line(380, 142, 265, 160, 3)}
        {line(380, 142, 535, 160, 4)}
        {line(178, 100, 265, 90, 5)}
        {line(590, 262, 480, 292, 6)}
        {line(178, 350, 270, 322, 7)}
        {line(178, 610, 360, 618, 8)}
      </svg>

      {/* Top tree */}
      <AuditBox x={325} y={20} w={110} h={34} tone="white"><span style={iconSm}>▦</span><span style={boxLabel}>Dashboard</span></AuditBox>
      <AuditBox x={210} y={78} w={110} h={34} tone="white"><span style={iconSm}>📖</span><span style={boxLabel}>Bookings</span></AuditBox>
      <AuditBox x={480} y={78} w={140} h={34} tone="white"><span style={iconSm}>⛓</span><span style={boxLabel}>Channel Manager</span></AuditBox>
      <AuditBox x={325} y={136} w={110} h={34} tone="pinkStrong"><span style={iconSm}>▢</span><span style={{ ...boxLabel, color: AUDIT_RED }}>Inventory</span></AuditBox>
      <AuditBox x={210} y={194} w={110} h={34} tone="pink"><span style={iconSm}>▢</span><span style={boxLabel}>Inventory</span></AuditBox>
      <AuditBox x={480} y={194} w={110} h={34} tone="pink"><span style={iconSm}>▢</span><span style={boxLabel}>Inventory</span></AuditBox>

      {/* Right nested-nav staircase */}
      <AuditBox x={490} y={292} w={120} h={34}><span style={iconSm}>⚙</span><span style={boxLabel}>Settings</span></AuditBox>
      <AuditBox x={510} y={344} w={120} h={34}><span style={iconSm}>📁</span><span style={boxLabel}>Operations</span></AuditBox>
      <AuditBox x={530} y={396} w={120} h={34}><span style={iconSm}>📁</span><span style={boxLabel}>Inventory</span></AuditBox>
      <AuditBox x={520} y={448} w={155} h={34}><span style={iconSm}>📄</span><span style={{ ...boxLabel, fontSize: 10.5 }}>Manage Inventory</span></AuditBox>

      {/* Left inconsistent-grouping list */}
      <AuditBox x={170} y={292} w={100} h={34} tone="white"><span style={iconSm}>🗓</span><span style={boxLabel}>Reservations</span></AuditBox>
      <AuditBox x={170} y={340} w={100} h={34} tone="white"><span style={iconSm}>🏷</span><span style={boxLabel}>Rates</span></AuditBox>
      <AuditBox x={170} y={388} w={100} h={34} tone="white"><span style={iconSm}>📊</span><span style={boxLabel}>Reports</span></AuditBox>
      <AuditBox x={170} y={436} w={100} h={34} tone="pinkStrong"><span style={iconSm}>▢</span><span style={{ ...boxLabel, color: AUDIT_RED }}>Inventory</span></AuditBox>

      {/* Phone */}
      <div style={{ position: "absolute", left: pct(280, AUDIT_W), top: pct(250, AUDIT_H), width: pct(200, AUDIT_W) }}>
        <AuditAnnotatedPhone />
      </div>

      {/* Bottom button variants */}
      <div style={{ position: "absolute", left: pct(185, AUDIT_W), top: pct(614, AUDIT_H), width: pct(460, AUDIT_W), display: "flex", gap: 8 }}>
        <div style={{ background: "#1e3a8a", color: "#fff", borderRadius: 7, padding: "8px 16px", fontFamily: ff, fontSize: 12, fontWeight: 700 }}>Update Rate</div>
        <div style={{ background: "#fff", border: "1.5px solid #1e3a8a", color: "#1e3a8a", borderRadius: 7, padding: "8px 16px", fontFamily: ff, fontSize: 12, fontWeight: 700 }}>Update Inventory</div>
        <div style={{ color: "#1e3a8a", borderRadius: 7, padding: "8px 16px", fontFamily: ff, fontSize: 12, fontWeight: 700 }}>Edit Rate →</div>
      </div>

      {/* Annotations */}
      <AuditAnnotationLabel x={4} y={78} w={165} num={1} title={annotations[0]?.title} desc={annotations[0]?.desc} />
      <AuditAnnotationLabel x={660} y={250} w={135} num={2} title={annotations[1]?.title} desc={annotations[1]?.desc} />
      <AuditAnnotationLabel x={4} y={330} w={165} num={3} title={annotations[2]?.title} desc={annotations[2]?.desc} />
      <AuditAnnotationLabel x={4} y={598} w={165} num={4} title={annotations[3]?.title} desc={annotations[3]?.desc} />
    </div>
  );
}

function AuditAnnotationLabel({ x, y, w, num, title, desc }: { x: number; y: number; w: number; num: number; title?: string; desc?: string }) {
  return (
    <div style={{ position: "absolute", left: pct(x, AUDIT_W), top: pct(y, AUDIT_H), width: pct(w, AUDIT_W), display: "flex", gap: 8 }}>
      <div style={{ width: 20, height: 20, borderRadius: "50%", background: AUDIT_RED, color: "white", fontFamily: ff, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{num}</div>
      <div>
        <div style={{ fontFamily: ff, fontSize: 12.5, fontWeight: 800, color: AUDIT_RED, lineHeight: 1.25, marginBottom: 3 }}>{title}</div>
        <div style={{ fontFamily: ff, fontSize: 11, color: "#6b7280", lineHeight: 1.45 }}>{desc}</div>
      </div>
    </div>
  );
}

function AuditAnnotatedPhone() {
  const rowStyle: React.CSSProperties = { display: "flex", alignItems: "center", gap: 10, padding: "9px 12px" };
  const iconBoxStyle: React.CSSProperties = { width: 22, height: 22, borderRadius: 6, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11 };
  const label: React.CSSProperties = { fontFamily: ff, fontSize: 11.5, fontWeight: 600, color: "#111" };

  return (
    <div style={{ width: "100%", aspectRatio: "9 / 18.5", background: "#0a0a0a", borderRadius: 34, padding: "10px 8px", boxShadow: "0 24px 48px rgba(0,0,0,0.28)", position: "relative", fontFamily: ff, boxSizing: "border-box" as const }}>
      {/* Dynamic island */}
      <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: "26%", height: "3%", background: "#0a0a0a", borderRadius: "var(--radius-2xl-2)", zIndex: 10 }} />
      <div style={{ background: "#fff", borderRadius: 24, overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" as const }}>
        {/* Status bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px 2px", flexShrink: 0 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#111" }}>9:41</span>
          <span style={{ fontSize: 9 }}>📶 🔋</span>
        </div>
        {/* App header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 16px 10px", flexShrink: 0 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: "#111" }}>AxisRooms</span>
          <span style={{ fontSize: 14 }}>🔔</span>
        </div>
        {/* Search */}
        <div style={{ margin: "0 16px 10px", background: "#f3f4f6", borderRadius: "var(--radius-lg)", padding: "7px 10px", flexShrink: 0 }}>
          <span style={{ fontSize: 10.5, color: "#9ca3af" }}>🔍 Search anything...</span>
        </div>

        <div style={{ padding: "0 16px", display: "flex", flexDirection: "column" as const, flex: 1 }}>
          {[
            { icon: "▦", title: "Dashboard" },
            { icon: "📖", title: "Bookings" },
            { icon: "▢", title: "Inventory" },
            { icon: "🏷", title: "Rates" },
            { icon: "⛓", title: "Channel Manager" },
            { icon: "📊", title: "Reports" },
            { icon: "⚙", title: "Settings" },
            { icon: "⋯", title: "More" },
          ].map((r, i) => (
            <div key={i} style={{ ...rowStyle, justifyContent: "space-between", borderBottom: i < 7 ? "1px solid #f3f4f6" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={iconBoxStyle}>{r.icon}</div>
                <span style={label}>{r.title}</span>
              </div>
              <span style={{ color: "#c4c9d4", fontSize: 12 }}>{i < 7 ? "›" : ""}</span>
            </div>
          ))}
        </div>

        {/* Home indicator */}
        <div style={{ display: "flex", justifyContent: "center", padding: "8px 0", flexShrink: 0 }}>
          <div style={{ width: 100, height: 4, background: "rgba(0,0,0,0.2)", borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
}

function UXAuditSection({ data }: { data: NonNullable<MenstaData["uxAudit"]> }) {
  const ACCENT = useContext(AccentContext);
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRevealed(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: "var(--sp-cream)", padding: "90px 32px", overflow: "hidden" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto", display: "flex", flexDirection: "column" as const, alignItems: "center" }}>
        {/* TOP — copy, centered */}
        <div style={{ maxWidth: 640, textAlign: "center" as const, marginBottom: 56, ...revealStyle(revealed) }}>
          <p style={{ fontFamily: ff, fontSize: 12.5, fontWeight: 800, color: ACCENT, marginBottom: 18 }}>{data.eyebrow}</p>
          <h2 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: "clamp(32px,3.6vw,48px)", fontWeight: 800, color: "var(--sp-cocoa)", lineHeight: 1.08, marginBottom: 22 }}>
            {data.heading.join(" ")}
          </h2>
          <div style={{ width: 48, height: 4, background: ACCENT, borderRadius: "var(--radius-sm)", margin: "0 auto 26px" }} />
          {data.paragraphs.map((p, i) => (
            <p key={i} style={{ fontFamily: ff, fontSize: 15, color: "#8a8580", lineHeight: 1.75, marginBottom: i < data.paragraphs.length - 1 ? 16 : 0 }}>{p}</p>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Information Architecture Section ──────────────────────────
function InformationArchitectureSection({ data }: { data: NonNullable<MenstaData["informationArchitecture"]> }) {
  const PRP = useContext(AccentContext);
  const GRN = "#10b981";
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRevealed(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: "var(--sp-dew)", padding: "90px 32px" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div style={{ textAlign: "center" as const, marginBottom: 56, ...revealStyle(revealed) }}>
          <p style={{ fontFamily: ff, fontSize: 13, color: "#8a8580", marginBottom: 10 }}>{data.eyebrow}</p>
          <h2 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, color: "var(--sp-cocoa)", lineHeight: 1.2, marginBottom: 14 }}>{data.heading}</h2>
          <p style={{ fontFamily: ff, fontSize: 15, color: "#8a8580", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>{data.subtext}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "var(--spacing-32)", alignItems: "center", ...revealStyle(revealed, 100) }}>
          {/* BEFORE — nested chain */}
          <div style={{ background: "var(--sp-cream)", border: "1.5px solid var(--sp-charcoal)", borderRadius: 18, padding: "28px 28px 24px" }}>
            <div style={{ display: "inline-block", background: "#fee2e2", borderRadius: 6, padding: "3px 10px", marginBottom: 18 }}>
              <span style={{ fontFamily: ff, fontSize: 11, fontWeight: 700, color: "#dc2626", letterSpacing: "0.08em" }}>BEFORE</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const }}>
              {data.before.map((step, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column" as const, alignItems: "center" }}>
                  <div style={{ width: "100%", background: "var(--sp-dew)", border: "1px solid rgba(23,23,23,0.12)", borderRadius: 10, padding: "9px 14px", textAlign: "center" as const }}>
                    <span style={{ fontFamily: ff, fontSize: 13, fontWeight: 600, color: "#8a8580" }}>{step}</span>
                  </div>
                  {i < data.before.length - 1 && (
                    <div style={{ fontSize: 13, color: "#c4c9d4", padding: "4px 0" }}>↓</div>
                  )}
                </div>
              ))}
            </div>
            <p style={{ fontFamily: ff, fontSize: 12, color: "#8a8580", textAlign: "center" as const, marginTop: 14 }}>Multiple duplicated branches</p>
          </div>

          {/* Arrow */}
          <div style={{ fontSize: 28, color: PRP, fontWeight: 700 }}>→</div>

          {/* AFTER — clean grid */}
          <div style={{ background: "var(--sp-cream)", border: "1.5px solid var(--sp-charcoal)", borderRadius: 18, padding: "28px 28px 24px" }}>
            <div style={{ display: "inline-block", background: "#d1fae5", borderRadius: 6, padding: "3px 10px", marginBottom: 18 }}>
              <span style={{ fontFamily: ff, fontSize: 11, fontWeight: 700, color: GRN, letterSpacing: "0.08em" }}>AFTER</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {data.after.map((item, i) => (
                <div key={i} style={{ background: "var(--sp-dew)", border: "1px solid rgba(23,23,23,0.12)", borderRadius: 10, padding: "16px 14px", textAlign: "center" as const }}>
                  <span style={{ fontFamily: ff, fontSize: 13.5, fontWeight: 700, color: "var(--sp-charcoal)" }}>{item}</span>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: ff, fontSize: 12, color: "#8a8580", textAlign: "center" as const, marginTop: 14 }}>One clear hierarchy</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Workflow Transformation Section ────────────────────────────
function WorkflowTransformationSection({ data }: { data: NonNullable<MenstaData["workflowTransformation"]> }) {
  const PRP = useContext(AccentContext);
  const GRN = "#10b981";
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRevealed(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: "var(--sp-cream)", padding: "90px 32px" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div style={{ textAlign: "center" as const, marginBottom: "var(--spacing-20)", ...revealStyle(revealed) }}>
          <p style={{ fontFamily: ff, fontSize: 13, color: "#8a8580", marginBottom: 10 }}>{data.eyebrow}</p>
          <h2 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, color: "var(--sp-cocoa)", lineHeight: 1.2, marginBottom: 14 }}>{data.heading}</h2>
        </div>
        <div style={{ maxWidth: 640, margin: "0 auto 48px", ...revealStyle(revealed, 60) }}>
          {data.description.map((p, i) => (
            <p key={i} style={{ fontFamily: ff, fontSize: 15, color: "#8a8580", lineHeight: 1.75, textAlign: "center" as const, marginBottom: i < data.description.length - 1 ? 14 : 0 }}>{p}</p>
          ))}
        </div>

        {/* Full-width flow diagram */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--spacing-12)", marginBottom: "var(--spacing-48)", flexWrap: "wrap" as const, ...revealStyle(revealed, 120) }}>
          {["Inventory", "Rates", "Reservations", "Reports", "Notifications", "Settings"].map((step, i, arr) => (
            <React.Fragment key={i}>
              <div style={{ background: "#fee2e2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 16px" }}>
                <span style={{ fontFamily: ff, fontSize: 12.5, fontWeight: 600, color: "#b91c1c" }}>{step}</span>
              </div>
              {i < arr.length - 1 && <span style={{ color: "#c4c9d4", fontSize: 14 }}>→</span>}
            </React.Fragment>
          ))}
        </div>
        <div style={{ textAlign: "center" as const, marginBottom: 48 }}>
          <span style={{ fontSize: 20 }}>↓</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--spacing-12)", marginBottom: 56, ...revealStyle(revealed, 160) }}>
          {["Operations", "Revenue", "Reservations", "Account"].map((step, i, arr) => (
            <React.Fragment key={i}>
              <div style={{ background: "#d1fae5", border: "1px solid #a7f3d0", borderRadius: 10, padding: "12px 22px" }}>
                <span style={{ fontFamily: ff, fontSize: 13.5, fontWeight: 700, color: "#047857" }}>{step}</span>
              </div>
              {i < arr.length - 1 && <span style={{ color: "#c4c9d4", fontSize: 14 }}>→</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Before / After comparison */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--spacing-20)", ...revealStyle(revealed, 200) }}>
          <div style={{ background: "var(--sp-dew)", border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-2xl)", padding: "24px 26px" }}>
            <div style={{ display: "inline-block", background: "#fee2e2", borderRadius: 6, padding: "3px 10px", marginBottom: 16 }}>
              <span style={{ fontFamily: ff, fontSize: 11, fontWeight: 700, color: "#dc2626", letterSpacing: "0.08em" }}>{data.before.label}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
              {data.before.items.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: "#dc2626", fontSize: 14 }}>✕</span>
                  <span style={{ fontFamily: ff, fontSize: 13.5, color: "#8a8580" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "var(--sp-dew)", border: "1px solid rgba(23,23,23,0.12)", borderRadius: "var(--radius-2xl)", padding: "24px 26px" }}>
            <div style={{ display: "inline-block", background: "#d1fae5", borderRadius: 6, padding: "3px 10px", marginBottom: 16 }}>
              <span style={{ fontFamily: ff, fontSize: 11, fontWeight: 700, color: GRN, letterSpacing: "0.08em" }}>{data.after.label}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
              {data.after.items.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: GRN, fontSize: 14 }}>✓</span>
                  <span style={{ fontFamily: ff, fontSize: 13.5, fontWeight: 600, color: "var(--sp-charcoal)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Outcome Phone Screens ────────────────────────────────────
function FanPhone({ src, alt }: { src: string; alt: string }) {
  /* 30% larger than the base 270×560 frame, then scaled down 10% */
  return <IPhone16PlusFrame width={316} src={src} alt={alt} />;
}

function OutcomeSection({ data }: { data: NonNullable<MenstaData["outcome"]> }) {
  const PRP = useContext(AccentContext);
  const SCREENS = useContext(ScreensContext);
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRevealed(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const phoneSlots = [
    { rotate: -9, ty: 40, component: <FanPhone src={SCREENS[9]} alt="Reservations screen" /> },
    { rotate: -3, ty: 12, component: <FanPhone src={SCREENS[10]} alt="Dashboard screen" /> },
    { rotate: 3, ty: 12, component: <FanPhone src={SCREENS[11]} alt="Housekeeping screen" /> },
    { rotate: 9, ty: 40, component: <FanPhone src={SCREENS[3]} alt="POS screen" /> },
  ];

  const features = [
    { num: "9+", title: "Modules", desc: "Covering every critical hotel operation" },
    { title: "Mobile-first", desc: "Designed for the way staff work on the move" },
    { title: "Built from scratch", desc: "Thoughtfully designed from the ground up" },
    { title: "Scalable System", desc: "A strong foundation for future growth" },
    { title: "Operational Ecosystem", desc: "Connecting front office, housekeeping & management" },
  ];

  const marqueeItems = ["Reservations", "Group Bookings", "Housekeeping", "Accounts", "POS", "Management Dashboard", "Night Audit", "Consolidated Accounts"];

  return (
    <section ref={ref} style={{ background: "var(--sp-dew)", overflow: "hidden" }}>
      <style>{`@keyframes outcome-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>

      {/* Header */}
      <div style={{ textAlign: "center" as const, maxWidth: MAX_W, margin: "0 auto", padding: "80px 32px 56px", ...revealStyle(revealed) }}>
        <p style={{ fontFamily: ff, fontSize: 13, color: "#8a8580", marginBottom: 10 }}>{data.eyebrow}</p>
        <h2 style={{ fontFamily: ffHeading, textTransform: "capitalize" as const, fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, lineHeight: 1.2, color: "var(--sp-cocoa)", marginBottom: 14 }}>
          {data.heading}<br />
          Built for <span style={{ color: PRP }}>{data.headingAccent}</span>
        </h2>
        <p style={{ fontFamily: ff, fontSize: 15, color: "#8a8580", maxWidth: 480, margin: "0 auto" }}>{data.subtext}</p>
      </div>

      {/* Phone fan */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, paddingBottom: 68, minHeight: 600, marginTop: -96 }}>
        {/* Arc SVG */}
        <svg style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 1000, height: 520, pointerEvents: "none" as const }} viewBox="0 0 1000 520" fill="none">
          <ellipse cx="500" cy="640" rx="420" ry="360" stroke={PRP} strokeWidth="1.5" strokeDasharray="6 9" opacity="0.18" />
          <ellipse cx="500" cy="640" rx="560" ry="480" stroke={PRP} strokeWidth="1" strokeDasharray="4 12" opacity="0.1" />
        </svg>

        {phoneSlots.map(({ rotate, ty, component }, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              transform: `rotate(${rotate}deg) translateY(${ty}px)`,
              transformOrigin: "bottom center",
              ...revealStyle(revealed, 80 + i * 90),
            }}
          >
            {/* Phone scaled down slightly to fit 4 across */}
            <div style={{ transform: "scale(0.83)", transformOrigin: "bottom center", display: "block" }}>
              {component}
            </div>
          </div>
        ))}
      </div>

      {/* Feature strip */}
      <div style={{ background: "var(--sp-cream)", borderTop: "1px solid rgba(23,23,23,0.12)", marginTop: 0 }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto", display: "flex" }}>
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: "28px 20px",
                borderRight: i < features.length - 1 ? "1px solid rgba(23,23,23,0.12)" : "none",
                ...revealStyle(revealed, 300 + i * 60),
              }}
            >
              {"num" in f && (
                <div style={{ fontFamily: ff, fontSize: 20, fontWeight: 800, color: PRP, lineHeight: 1, marginBottom: 4 }}>{f.num}</div>
              )}
              <div style={{ fontFamily: ff, fontSize: 13, fontWeight: 700, color: "var(--sp-charcoal)", marginBottom: 3 }}>{f.title}</div>
              <div style={{ fontFamily: ff, fontSize: 12, color: "#8a8580", lineHeight: 1.45 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee strip */}
      <div style={{ background: PRP, padding: "14px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", animation: "outcome-marquee 24s linear infinite", width: "max-content" }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} style={{ fontFamily: ff, fontSize: 13, fontWeight: 600, color: "white", padding: "0 20px", whiteSpace: "nowrap" as const, opacity: 0.9 }}>
              {item}&nbsp;&nbsp;•
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main Template ────────────────────────────────────────────
export default function MenstaTemplate({ data, slug = "pocket-pms" }: { data: MenstaData; slug?: string }) {
  const [phoneSection, setPhoneSection] = useState<"approach" | "core" | "design" | "challenges" | null>(null);
  return (
    <AccentContext.Provider value={data.accentColor ?? "#2856A2"}>
    <ScreensContext.Provider value={data.screenshots ?? DEFAULT_SCREENS}>
      <div style={{ background: "var(--sp-dew)", fontFamily: ff }}>
        <FloatingPhone onSection={setPhoneSection} />
        <HeroSection data={data.hero} />
        {data.snapshot && <ProjectSnapshotSection data={data.snapshot} />}
        <HowItWorksSection data={data.howItWorks} />
        {data.uxAudit && <UXAuditSection data={data.uxAudit} />}
        {data.opportunity && <OpportunitySection data={data.opportunity} />}
        {data.informationArchitecture && <InformationArchitectureSection data={data.informationArchitecture} />}
        {data.approach && <ApproachSection data={data.approach} active={phoneSection === "approach"} />}
        {data.workflowTransformation && <WorkflowTransformationSection data={data.workflowTransformation} />}
        {data.coreExperience && <CoreExperienceSection data={data.coreExperience} active={phoneSection === "core"} />}
        {data.designSystem && <DesignSystemSection data={data.designSystem} active={phoneSection === "design"} />}
        {data.challenges && <ChallengesSection data={data.challenges} active={phoneSection === "challenges"} />}
        {data.challenges && <GoalSection />}
        {data.outcome && <OutcomeSection data={data.outcome} />}
        <OtherCaseStudiesSection currentSlug={slug} />
        <CTASection data={data.cta} appName={data.appName} />
      </div>
    </ScreensContext.Provider>
    </AccentContext.Provider>
  );
}
