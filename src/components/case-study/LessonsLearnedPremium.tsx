"use client";

// Lessons Learned section (Section 10). Uses the same Superr design system as
// the rest of the Hotelogix case study — Geist body (`ff`), Fraunces
// headings (`ffHeading`), the marker-orange accent, and local (non-shared)
// SectionEyebrow/SectionHeading copies — so the bento layout below reads as
// part of the page rather than a separate one. These primitives are defined
// locally rather than imported from caseStudyKit because caseStudyKit is
// still shared by several other, out-of-scope case-study pages.

import {
  Building2, ClipboardList, Wallet, Camera, User,
  Users, Quote, TrendingUp, TrendingDown,
} from "lucide-react";

const ff = "var(--font-geist), sans-serif";
const ffHeading = "var(--font-gelica)";

function SectionEyebrow({ number, label, align = "center" }: { number: string; label: string; align?: "left" | "center" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: align === "left" ? "flex-start" : "center", gap: "var(--spacing-8)", marginBottom: 20 }}>
      <span style={{ fontSize: 16, fontWeight: 400, color: "var(--sp-orange)", fontFamily: ff }}>{number}</span>
      <span style={{ fontSize: 16, fontWeight: 400, color: "#8a8580", fontFamily: ff }}>{label}</span>
    </div>
  );
}

function SectionHeading({ title, subtitle, maxWidth = 640, bold = false, align = "center" }: { title: string; subtitle: string; maxWidth?: number; bold?: boolean; align?: "left" | "center" }) {
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

// Everything case-study-specific is a prop; the layout, geometry and tints
// below are fixed. Defaults reproduce the RMS content exactly, so
// `<LessonsLearnedPremium />` with no props renders as it always has.
export type PremiumLesson = { title: string; desc: string };
export type HeroImage = { src: string; alt: string };
export type KpiSpec = { label: string; value: string; delta: string; positive: boolean };
export type NodeLabel = { title: string; sub: string };
export type BlueprintLabel = { top: string; bottom: string };

export type LessonsLearnedPremiumProps = {
  sectionNumber?: string;
  caseStudyLabel?: string;
  intro?: string;
  /** Exactly six — the bento has six fixed slots. */
  lessons?: PremiumLesson[];
  quote?: { text: React.ReactNode; attribution: string };
  hero?: HeroImage;
  /** Three floating KPI chips over the hero image. */
  kpis?: KpiSpec[];
  /** Five network-diagram node labels, in the fixed geometry's order. */
  networkNodes?: NodeLabel[];
  /** Four blueprint floor labels, top floor first. */
  blueprintLabels?: BlueprintLabel[];
};

const accent = "var(--sp-orange)";
const accentTint = "rgba(255,111,30,0.12)";
const ink = "var(--sp-charcoal)";
const muted = "#8a8580";
const faint = "#8a8580";
const canvas = "var(--sp-cream)";
const cardBorder = "1.5px solid var(--sp-charcoal)";
const cardShadow = "var(--shadow-lg)";
const radius = 12;

function Panel({ style, children }: { style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div style={{
      background: "var(--sp-cream)", border: cardBorder, borderRadius: radius,
      boxShadow: cardShadow, ...style,
    }}>
      {children}
    </div>
  );
}

// Per-lesson number. Matches the numeral half of the page's SectionEyebrow
// (16px / 400 / accent) — these are lesson counters, not page sections, so
// they carry no uppercase label alongside them.
function Eyebrow({ n }: { n: string }) {
  return (
    <div style={{ fontSize: 16, fontWeight: 400, color: accent, fontFamily: ff, marginBottom: 14 }}>
      {n}
    </div>
  );
}

function KpiFloat({ label, value, delta, positive, style }: {
  label: string; value: string; delta: string; positive: boolean; style: React.CSSProperties;
}) {
  return (
    <div style={{
      position: "absolute", background: "var(--sp-cream)", borderRadius: 14, border: cardBorder,
      boxShadow: cardShadow, padding: "10px 16px", minWidth: 128, ...style,
    }}>
      <div style={{ fontSize: 10.5, color: faint, fontFamily: ff, marginBottom: 4 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
        <span style={{ fontSize: 19, fontWeight: 700, color: ink, fontFamily: ff }}>{value}</span>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600,
          color: positive ? "#16a34a" : "#dc2626", fontFamily: ff,
        }}>
          {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {delta}
        </span>
      </div>
    </div>
  );
}

// ── Section 01 — dashboard illustration ──────────────────────
function DashboardIllustration({ hero, kpis }: { hero: HeroImage; kpis: KpiSpec[] }) {
  return (
    <div style={{ position: "relative", height: 260, borderRadius: 18, overflow: "hidden", background: "var(--sp-dew)" }}>
      <div style={{
        position: "absolute", top: 18, left: 18, bottom: 18, width: 40, borderRadius: "var(--radius-xl)",
        background: "var(--sp-charcoal)", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, paddingTop: 18,
      }}>
        {[Building2, ClipboardList, Wallet].map((Icon, i) => (
          <div key={i} style={{
            width: 22, height: 22, borderRadius: 7, background: i === 0 ? accent : "rgba(255,255,255,0.10)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon size={12} color={i === 0 ? "#fff" : "rgba(255,255,255,0.55)"} strokeWidth={2} />
          </div>
        ))}
      </div>
      <div style={{
        position: "absolute", top: 18, left: 74, right: 18, bottom: 18, borderRadius: "var(--radius-xl)", overflow: "hidden",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- local static asset, no next/image remote pattern needed */}
        <img
          src={hero.src}
          alt={hero.alt}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", filter: "blur(1px)", opacity: 0.85 }}
        />
      </div>
      {kpis.map((k, i) => (
        <KpiFloat
          key={k.label}
          label={k.label}
          value={k.value}
          delta={k.delta}
          positive={k.positive}
          style={[{ top: 30, right: 26 }, { top: 118, right: 46 }, { top: 200, right: 20 }][i]}
        />
      ))}
    </div>
  );
}

// ── Section 02 — network diagram ─────────────────────────────
// Fixed layout (not radial/computed) matching the reference exactly: two
// nodes flank the top corners, one sits mid-left, one mid-right (level with
// the hub), one sits lower-right — each with its own tinted icon color.
const HUB = { x: 45, y: 50 };
const NETWORK_NODES = [
  { icon: Users, title: "Front Desk", sub: "Room Status", tint: accentTint, iconColor: accent, pos: { top: "16%", left: "1%" }, anchor: { x: 20, y: 20 } },
  { icon: ClipboardList, title: "Housekeeping", sub: "Room Cleanliness", tint: "#E3F8EC", iconColor: "#22c55e", pos: { top: "16%", right: "2%" }, anchor: { x: 71, y: 20 } },
  { icon: Wallet, title: "Finance Team", sub: "Invoicing", tint: "#EFE8FC", iconColor: "#8b5cf6", pos: { top: "62%", left: "0%" }, anchor: { x: 17, y: 66 } },
  { icon: Camera, title: "Maintenance", sub: "Work Orders", tint: "#FDECDC", iconColor: "#f59e0b", pos: { top: "46%", right: "-1%" }, anchor: { x: 84, y: 52 } },
  { icon: ClipboardList, title: "Management", sub: "Reporting", tint: "#E3F8EC", iconColor: "#22c55e", pos: { top: "82%", right: "6%" }, anchor: { x: 71, y: 80 } },
];

function NetworkDiagram({ labels }: { labels: NodeLabel[] }) {
  // Geometry and tints stay fixed; only the wording swaps per case study.
  const nodes = NETWORK_NODES.map((n, i) => ({ ...n, ...(labels[i] ?? {}) }));
  return (
    <div style={{ position: "relative", height: 420 }}>
      {/* Concentric dashed rings + connector lines, in one 0-100/0-100
          coordinate space (preserveAspectRatio="none") so straight-line
          math stays correct regardless of the container's own aspect
          ratio — the rings themselves are separate circular HTML divs
          below, since a non-uniform SVG scale would otherwise stretch
          them into ellipses. */}
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
        {nodes.map((n, i) => {
          const midX = HUB.x + (n.anchor.x - HUB.x) * 0.42;
          const midY = HUB.y + (n.anchor.y - HUB.y) * 0.42;
          return (
            <g key={i}>
              <line x1={HUB.x} y1={HUB.y} x2={n.anchor.x} y2={n.anchor.y} stroke={accent} strokeOpacity={0.3} strokeWidth={0.3} strokeDasharray="1.2 1.4" />
              <circle cx={midX} cy={midY} r={0.7} fill={accent} fillOpacity={0.55} />
            </g>
          );
        })}
      </svg>

      {[200, 280].map((d) => (
        <div key={d} style={{
          position: "absolute", top: `${HUB.y}%`, left: `${HUB.x}%`, width: d, height: d,
          transform: "translate(-50%,-50%)", borderRadius: "50%",
          border: `1px dashed rgba(255,111,30,${d === 200 ? 0.22 : 0.14})`,
        }} />
      ))}

      <div style={{
        position: "absolute", top: `${HUB.y}%`, left: `${HUB.x}%`, transform: "translate(-50%,-50%)",
        width: 76, height: 76, borderRadius: "50%", background: accent,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 16px 34px rgba(255,111,30,0.38)", zIndex: 1,
      }}>
        <Building2 size={30} color="var(--sp-cream)" strokeWidth={1.6} />
      </div>

      {nodes.map((n, i) => {
        const Icon = n.icon;
        return (
          <div key={i} style={{
            position: "absolute", ...n.pos,
            display: "flex", alignItems: "center", gap: 10, background: "var(--sp-cream)", borderRadius: 14,
            border: cardBorder, boxShadow: cardShadow, padding: "10px 16px 10px 10px", whiteSpace: "nowrap",
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10, background: n.tint,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <Icon size={16} color={n.iconColor} strokeWidth={1.9} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: ink, fontFamily: ff }}>{n.title}</div>
              <div style={{ fontSize: 11, color: faint, fontFamily: ff }}>{n.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Section 03 — blueprint illustration ──────────────────────
// Two-tone (bold + light) two-line labels, connected via a solid leader
// with a dot at each end. Labels arrive as a prop (see RMS_BLUEPRINT for the
// default set); the building geometry below assumes exactly four floors.
const GROUND_Y = 470;
const FRONT = { x: 250, y: 70, w: 280, h: 400 };
const BACK = { x: 70, y: 190, w: 150, h: GROUND_Y - 190 };
const FLOOR_H = FRONT.h / 4;
const SLAB_H = 16;
const ROOM_H = FLOOR_H - SLAB_H;

function CloudPuff({ cx, cy, scale = 1 }: { cx: number; cy: number; scale?: number }) {
  const r = 9 * scale;
  return (
    <g stroke={accent} strokeOpacity={0.45} strokeWidth={0.9} fill="#fff">
      <rect x={cx - 2 * r} y={cy} width={4 * r} height={r} fill="#fff" stroke="none" />
      <circle cx={cx - 1.6 * r} cy={cy + 0.2 * r} r={r * 0.7} />
      <circle cx={cx - 0.5 * r} cy={cy - 0.35 * r} r={r} />
      <circle cx={cx + 0.9 * r} cy={cy - 0.15 * r} r={r * 0.85} />
      <circle cx={cx + 1.8 * r} cy={cy + 0.2 * r} r={r * 0.6} />
      <line x1={cx - 2 * r} y1={cy + r * 0.75} x2={cx + 2 * r} y2={cy + r * 0.75} stroke="none" />
    </g>
  );
}

function ChairIcon({ x, floorTop }: { x: number; floorTop: number }) {
  const backY = floorTop + ROOM_H - 66;
  const seatY = backY + 32;
  const hubX = x + 17, hubY = seatY + 22;
  return (
    <g stroke={accent} strokeOpacity={0.6} strokeWidth={1} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x={x} y={backY} width={34} height={32} rx={8} />
      <rect x={x - 4} y={seatY} width={42} height={11} rx={4} />
      <line x1={hubX} y1={seatY + 11} x2={hubX} y2={hubY} />
      {[-14, -5, 5, 14].map((dx, i) => (
        <g key={i}>
          <line x1={hubX} y1={hubY} x2={hubX + dx} y2={hubY + 7} />
          <circle cx={hubX + dx} cy={hubY + 7} r={1.3} fill={accent} fillOpacity={0.55} stroke="none" />
        </g>
      ))}
    </g>
  );
}

function BlueprintIllustration({ labels }: { labels: BlueprintLabel[] }) {
  return (
    <div style={{ position: "relative", height: 300, overflow: "hidden" }}>
      <svg width="100%" height="100%" viewBox="0 0 700 520" fill="none">
        <defs>
          <filter id="blueprintGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="26" />
          </filter>
        </defs>

        <circle cx="470" cy="180" r="120" fill={accentTint} opacity={0.55} filter="url(#blueprintGlow)" />

        {/* back building */}
        <rect x={BACK.x} y={BACK.y} width={BACK.w} height={BACK.h} stroke={accent} strokeOpacity={0.55} strokeWidth={1} fill="none" />
        <line x1={BACK.x} y1={BACK.y + BACK.h * 0.5} x2={BACK.x + BACK.w} y2={BACK.y + BACK.h * 0.5} stroke={accent} strokeOpacity={0.3} strokeWidth={0.7} />
        {[0.22, 0.75].map((f, i) => {
          const wx = BACK.x + BACK.w * 0.28, wy = BACK.y + BACK.h * f - 32, ws = 60;
          return (
            <g key={i} stroke={accent} strokeOpacity={0.5} strokeWidth={0.9} fill="none">
              <rect x={wx} y={wy} width={ws} height={ws} />
              <line x1={wx + ws / 2} y1={wy} x2={wx + ws / 2} y2={wy + ws} />
              <line x1={wx} y1={wy + ws / 2} x2={wx + ws} y2={wy + ws / 2} />
            </g>
          );
        })}

        {/* ground */}
        <rect x={40} y={GROUND_Y} width={560} height={14} fill={accent} fillOpacity={0.9} />
        <line x1={40} y1={GROUND_Y + 14} x2={600} y2={GROUND_Y + 14} stroke={accent} strokeOpacity={0.4} strokeWidth={0.8} />

        {/* tree */}
        <line x1="130" y1={GROUND_Y} x2="130" y2={GROUND_Y - 70} stroke={accent} strokeOpacity={0.5} strokeWidth={1} />
        <CloudPuff cx={130} cy={GROUND_Y - 110} scale={1.9} />

        {/* decorative clouds */}
        <CloudPuff cx={565} cy={365} scale={1.3} />
        <CloudPuff cx={555} cy={455} scale={1} />

        {/* front building — roof cap + corner posts + floor slabs (no outer wall) */}
        <rect x={FRONT.x - 20} y={FRONT.y - 22} width={FRONT.w + 40} height={20} rx={4} fill={accent} fillOpacity={0.85} />
        <line x1={FRONT.x + 16} y1={FRONT.y - 2} x2={FRONT.x + 16} y2={GROUND_Y} stroke={accent} strokeOpacity={0.55} strokeWidth={1} />
        <line x1={FRONT.x + FRONT.w - 16} y1={FRONT.y - 2} x2={FRONT.x + FRONT.w - 16} y2={GROUND_Y} stroke={accent} strokeOpacity={0.55} strokeWidth={1} />

        {labels.map((_, i) => {
          const floorTop = FRONT.y + i * FLOOR_H;
          const slabTop = floorTop + ROOM_H;
          const doorX = FRONT.x + 50, doorW = 42, doorH = ROOM_H - 14, doorY = floorTop + 14;
          const cabinetX = doorX + 68, cabinetH = ROOM_H * 0.5, cabinetY = floorTop + ROOM_H - cabinetH;
          const chairX = cabinetX + 46;
          return (
            <g key={i}>
              <rect x={FRONT.x} y={slabTop} width={FRONT.w} height={SLAB_H} fill={accent} fillOpacity={0.85} />
              <g stroke={accent} strokeOpacity={0.6} strokeWidth={1} fill="none">
                <rect x={doorX} y={doorY} width={doorW} height={doorH} />
                <circle cx={doorX + doorW - 7} cy={doorY + doorH / 2} r={1.6} fill={accent} fillOpacity={0.6} stroke="none" />
                <rect x={cabinetX} y={cabinetY} width={13} height={cabinetH} />
              </g>
              <ChairIcon x={chairX} floorTop={floorTop} />
              {i === 0 && (
                <g stroke={accent} strokeOpacity={0.55} strokeWidth={0.9} fill="none">
                  <line x1={chairX + 60} y1={floorTop + ROOM_H - 4} x2={chairX + 94} y2={floorTop + ROOM_H - 4} />
                  <line x1={chairX + 64} y1={floorTop + ROOM_H - 4} x2={chairX + 64} y2={floorTop + ROOM_H - 18} />
                  <line x1={chairX + 90} y1={floorTop + ROOM_H - 4} x2={chairX + 90} y2={floorTop + ROOM_H - 18} />
                  <rect x={chairX + 100} y={floorTop + ROOM_H - 44} width={9} height={24} rx={2} />
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {labels.map((b, i) => {
        const cy = FRONT.y + i * FLOOR_H + FLOOR_H / 2;
        const cyPercent = (cy / 520) * 100;
        return (
          <div key={i} style={{
            position: "absolute", left: "80%", right: 4, top: `${cyPercent}%`, transform: "translateY(-50%)",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <svg width="16" height="8" style={{ flexShrink: 0 }}>
              <circle cx={2} cy={4} r={1.8} fill={accent} />
              <line x1={4} y1={4} x2={12} y2={4} stroke={accent} strokeWidth={1.2} />
              <circle cx={14} cy={4} r={1.8} fill={accent} />
            </svg>
            <div style={{ lineHeight: 1.3, minWidth: 0 }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: ink, fontFamily: ff }}>{b.top}</div>
              <div style={{ fontSize: 11.5, fontWeight: 500, color: muted, fontFamily: ff }}>{b.bottom}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Section 04 — collaboration diagram ───────────────────────
const COLLAB_HUB = { x: 50, y: 54 };
const COLLAB_AVATARS = [
  { label: "Product", tint: "#f1e9ff", iconColor: "#8b5cf6", pos: { x: 50, y: 14 } },
  { label: "Design", tint: accentTint, iconColor: accent, pos: { x: 15, y: 88 } },
  { label: "Engineering", tint: "#e0e7ff", iconColor: "#4338ca", pos: { x: 85, y: 88 } },
];

function CollabAvatar({ label, tint, iconColor, style }: { label: string; tint: string; iconColor: string; style: React.CSSProperties }) {
  return (
    <div style={{ position: "absolute", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...style }}>
      <div style={{
        width: 82, height: 82, borderRadius: "50%", background: tint,
        display: "flex", alignItems: "center", justifyContent: "center", border: "4px solid var(--sp-cream)",
        boxShadow: cardShadow,
      }}>
        <User size={30} color={iconColor} strokeWidth={1.6} />
      </div>
      <span style={{ fontSize: 13.5, color: ink, fontFamily: ff, fontWeight: 700, whiteSpace: "nowrap" }}>{label}</span>
    </div>
  );
}

function CollabDiagram() {
  return (
    <div style={{ position: "relative", height: 260 }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
        {COLLAB_AVATARS.map((a, i) => (
          <line
            key={i} x1={COLLAB_HUB.x} y1={COLLAB_HUB.y} x2={a.pos.x} y2={a.pos.y}
            stroke={accent} strokeOpacity={0.32} strokeWidth={0.35} strokeDasharray="1.4 1.6"
          />
        ))}
      </svg>
      {COLLAB_AVATARS.map((a, i) => (
        <CollabAvatar
          key={i} label={a.label} tint={a.tint} iconColor={a.iconColor}
          style={{ left: `${a.pos.x}%`, top: `${a.pos.y}%`, transform: "translate(-50%,-50%)" }}
        />
      ))}
      <div style={{
        position: "absolute", top: `${COLLAB_HUB.y}%`, left: `${COLLAB_HUB.x}%`, transform: "translate(-50%,-50%)",
        width: 60, height: 60, borderRadius: "50%", background: accent,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 14px 30px rgba(255,111,30,0.36)", zIndex: 1,
      }}>
        <Users size={24} color="var(--sp-cream)" strokeWidth={1.6} />
      </div>
    </div>
  );
}

// ── Quote banner chart ────────────────────────────────────────
function QuoteChart() {
  return (
    <div style={{ position: "relative", background: "var(--sp-cream)", borderRadius: "var(--radius-2xl)", border: cardBorder, padding: "16px 18px", height: 130 }}>
      <svg width="100%" height="70" viewBox="0 0 200 70" fill="none" preserveAspectRatio="none">
        <polyline
          points="0,55 25,42 50,48 75,28 100,34 125,16 150,22 175,8 200,14"
          fill="none" stroke={accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
        />
        {[[0, 55], [50, 48], [100, 34], [150, 22], [200, 14]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2.2} fill={i === 4 ? accent : "var(--sp-cream)"} stroke={accent} strokeWidth={1.4} />
        ))}
      </svg>
      <div style={{
        position: "absolute", top: -14, right: 4, background: "var(--sp-cream)", borderRadius: "var(--radius-xl)", border: cardBorder,
        boxShadow: cardShadow, padding: "8px 14px",
      }}>
        <div style={{ fontSize: 9.5, color: faint, fontFamily: ff }}>Operational Efficiency</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: ink, fontFamily: ff }}>↑ 28%</span>
        </div>
        <div style={{ fontSize: 9, color: faint, fontFamily: ff }}>vs last month</div>
      </div>
    </div>
  );
}

// ── Section 05 — analytics chart ─────────────────────────────
function AnalyticsIllustration() {
  return (
    <div style={{ position: "relative", height: 230 }}>
      <div style={{
        background: "var(--sp-cream)", borderRadius: "var(--radius-2xl)", border: cardBorder, boxShadow: cardShadow,
        padding: "16px 18px", height: "100%", display: "flex", flexDirection: "column",
        backgroundImage: "radial-gradient(rgba(0,0,0,0.045) 1px, transparent 1px)", backgroundSize: "11px 11px",
      }}>
        <div style={{ fontSize: 10.5, color: faint, fontFamily: ff, marginBottom: 4 }}>Task Completion Rate</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "var(--spacing-8)", marginBottom: 10 }}>
          <span style={{ fontSize: 24, fontWeight: 700, color: ink, fontFamily: ff }}>76%</span>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600,
            color: "#16a34a", fontFamily: ff,
          }}><TrendingUp size={11} /> 18%</span>
        </div>
        <svg width="100%" height="100%" viewBox="0 0 220 90" fill="none" preserveAspectRatio="none" style={{ flex: 1 }}>
          <polyline
            points="0,72 27,64 55,68 82,44 110,52 137,28 165,38 220,10"
            fill="none" stroke={accent} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
          />
          {[[0, 72], [55, 68], [110, 52], [165, 38], [220, 10]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={2.2} fill="var(--sp-cream)" stroke={accent} strokeWidth={1.3} />
          ))}
        </svg>
      </div>
      <div style={{
        position: "absolute", bottom: -18, left: "50%", transform: "translateX(-50%)",
        background: "var(--sp-cream)", borderRadius: 14, border: cardBorder,
        boxShadow: cardShadow, padding: "10px 18px", minWidth: 150, textAlign: "left",
      }}>
        <div style={{ fontSize: 9.5, color: faint, fontFamily: ff, marginBottom: 3 }}>After Redesign</div>
        <div style={{
          display: "flex", alignItems: "center", gap: "var(--spacing-4)", fontSize: 15, fontWeight: 700,
          color: "#16a34a", fontFamily: ff, marginBottom: 2,
        }}><TrendingUp size={13} /> 18%</div>
        <div style={{ fontSize: 10, color: faint, fontFamily: ff }}>improvement</div>
      </div>
    </div>
  );
}

// ── Section 06 — design system preview ───────────────────────
function DesignSystemPreview() {
  return (
    <div style={{
      background: "var(--sp-cream)", borderRadius: "var(--radius-2xl)", border: cardBorder, boxShadow: cardShadow,
      padding: "20px 22px", display: "flex", flexDirection: "column", gap: "var(--spacing-12)", height: 220, justifyContent: "center",
      backgroundImage: "radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)", backgroundSize: "10px 10px",
      backgroundPosition: "-4px -4px",
    }}>
      {/* This card illustrates the case study's OWN internal design-system
          components (buttons, checkboxes, toggle) as content, not the
          portfolio page's UI — so the filled "Primary Button" swatch stays
          a solid accent fill (same decorative-mockup exemption as the
          diagram icon tints below), rather than following the page's own
          no-filled-CTA rule. */}
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{
          flex: 1, background: accent, color: "var(--sp-cream)", borderRadius: 999, textAlign: "center",
          fontSize: 11.5, fontWeight: 600, padding: "9px 0", fontFamily: ff,
        }}>Primary Button</div>
      </div>
      <div style={{
        border: "1px solid rgba(0,0,0,0.10)", borderRadius: 999, textAlign: "center",
        fontSize: 11.5, fontWeight: 600, color: ink, padding: "9px 0", fontFamily: ff,
      }}>Secondary Button</div>
      <div style={{
        border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, fontSize: 11, color: faint,
        padding: "9px 12px", fontFamily: ff, background: "var(--sp-cream)",
      }}>Input Field</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 2 }}>
        <div style={{ width: 16, height: 16, borderRadius: 5, background: accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.2 5.7L8 1" stroke="var(--sp-cream)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div style={{ width: 16, height: 16, borderRadius: 5, border: "1px solid rgba(0,0,0,0.15)" }} />
        <div style={{ width: 16, height: 16, borderRadius: 5, background: accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.2 5.7L8 1" stroke="var(--sp-cream)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div style={{ marginLeft: "auto", width: 32, height: 18, borderRadius: 999, background: accent, position: "relative" }}>
          <div style={{ position: "absolute", top: 2, right: 2, width: 14, height: 14, borderRadius: "50%", background: "var(--sp-cream)" }} />
        </div>
      </div>
    </div>
  );
}

const RMS_LESSONS: PremiumLesson[] = [
  { title: "Enterprise software isn't about adding features.", desc: "It's about removing friction from critical workflows." },
  { title: "Every screen is connected.", desc: "Small design changes can affect multiple operational teams." },
  { title: "Simplicity requires deep domain knowledge.", desc: "Understanding hotel operations was as important as designing interfaces." },
  { title: "Collaboration drives better products.", desc: "Working closely with product managers and engineers ensured practical, scalable solutions." },
  { title: "Data-driven decisions create real impact.", desc: "We used feedback, analytics and user insights to continuously improve the experience." },
  { title: "Design systems unlock consistency at scale.", desc: "A strong foundation of components and patterns helped maintain a cohesive experience across modules." },
];

const RMS_KPIS: KpiSpec[] = [
  { label: "Reservations", value: "128", delta: "12%", positive: true },
  { label: "Check-ins", value: "82", delta: "8%", positive: true },
  { label: "Housekeeping", value: "24", delta: "4%", positive: false },
];

const RMS_NODES: NodeLabel[] = [
  { title: "Front Desk", sub: "Room Status" },
  { title: "Housekeeping", sub: "Room Cleanliness" },
  { title: "Finance Team", sub: "Invoicing" },
  { title: "Maintenance", sub: "Work Orders" },
  { title: "Management", sub: "Reporting" },
];

const RMS_BLUEPRINT: BlueprintLabel[] = [
  { top: "Rooftop", bottom: "Operations" },
  { top: "Guest", bottom: "Experience" },
  { top: "Operational", bottom: "Efficiency" },
  { top: "Back of House", bottom: "Workflows" },
];

export default function LessonsLearnedPremium({
  sectionNumber = "10",
  caseStudyLabel = "Hotelogix RMS Case Study",
  intro = "Three years of designing enterprise hospitality products taught me what truly drives impact. These six lessons now guide every product decision I make.",
  lessons = RMS_LESSONS,
  quote = {
    text: <>Great enterprise UX is invisible.<br />It empowers teams to do their best work.</>,
    attribution: "— Internal Design Principle",
  },
  hero = { src: "/assets/hotelogix/FRONTDESK.png", alt: "Hotelogix front desk dashboard" },
  kpis = RMS_KPIS,
  networkNodes = RMS_NODES,
  blueprintLabels = RMS_BLUEPRINT,
}: LessonsLearnedPremiumProps = {}) {
  const [l1, l2, l3, l4, l5, l6] = lessons;
  return (
    <section style={{ background: canvas, padding: "90px 8% 110px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>

        {/* Meta row — page-standard eyebrow, with the case-study label on the
            right restyled to the same 16px/0.18em uppercase treatment used by
            SectionEyebrow's own label. */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <SectionEyebrow number={sectionNumber} label="Lessons Learned" align="left" />
          <span style={{ fontSize: 16, fontWeight: 400, color: "#8a8580", fontFamily: ff, marginBottom: 20 }}>
            {caseStudyLabel}
          </span>
        </div>

        {/* Row 1 — title + Section 01 */}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,0.62fr) minmax(0,1fr)", gap: "var(--spacing-40)", marginBottom: "var(--spacing-24)", alignItems: "start" }}>
          <div>
            <SectionHeading align="left" maxWidth={380} title="Lessons Learned" subtitle={intro} />
          </div>

          <Panel style={{ padding: "var(--spacing-40)", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,0.9fr)", gap: "var(--spacing-32)", alignItems: "center" }}>
            <div>
              <Eyebrow n="01" />
              <h3 style={{ fontSize: 25, fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: ffHeading, lineHeight: 1.28, margin: "0 0 12px" }}>
                {l1.title}
              </h3>
              <p style={{ fontSize: 16, color: muted, fontFamily: ff, lineHeight: 1.65, margin: 0 }}>
                {l1.desc}
              </p>
            </div>
            <DashboardIllustration hero={hero} kpis={kpis} />
          </Panel>
        </div>

        {/* Row 2 — Section 02, full width */}
        <div style={{
          background: "var(--sp-dew)", border: cardBorder, borderRadius: radius,
          padding: "44px 48px", display: "grid", gridTemplateColumns: "minmax(0,0.42fr) minmax(0,1fr)", gap: "var(--spacing-32)",
          alignItems: "center", marginBottom: "var(--spacing-24)",
        }}>
          <div>
            <Eyebrow n="02" />
            <h3 style={{ fontSize: 30, fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: ffHeading, lineHeight: 1.22, margin: "0 0 14px" }}>
              {l2.title}
            </h3>
            <p style={{ fontSize: 16, color: muted, fontFamily: ff, lineHeight: 1.65, margin: 0, maxWidth: 260 }}>
              {l2.desc}
            </p>
          </div>
          <NetworkDiagram labels={networkNodes} />
        </div>

        {/* Row 3 — Sections 03 + 04, half width */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--spacing-24)", marginBottom: 24 }}>
          <Panel style={{ padding: 36 }}>
            <Eyebrow n="03" />
            <h3 style={{ fontSize: 21, fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: ffHeading, lineHeight: 1.28, margin: "0 0 10px" }}>
              {l3.title}
            </h3>
            <p style={{ fontSize: 16, color: muted, fontFamily: ff, lineHeight: 1.6, margin: "0 0 20px" }}>
              {l3.desc}
            </p>
            <BlueprintIllustration labels={blueprintLabels} />
          </Panel>

          <Panel style={{ padding: 36 }}>
            <Eyebrow n="04" />
            <h3 style={{ fontSize: 21, fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: ffHeading, lineHeight: 1.28, margin: "0 0 10px" }}>
              {l4.title}
            </h3>
            <p style={{ fontSize: 16, color: muted, fontFamily: ff, lineHeight: 1.6, margin: "0 0 20px" }}>
              {l4.desc}
            </p>
            <CollabDiagram />
          </Panel>
        </div>

        {/* Quote banner — soft accentTint fill (not a hard/saturated accent
            fill), matching the "no filled CTA/highlight" rule. */}
        <div style={{
          background: accentTint, borderRadius: radius, padding: "44px 48px", marginBottom: "var(--spacing-24)",
          display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,0.55fr)", gap: "var(--spacing-40)", alignItems: "center",
        }}>
          <div>
            <Quote size={30} color={accent} fill={accent} strokeWidth={0} style={{ marginBottom: 18, opacity: 0.9 }} />
            <p style={{
              fontSize: "clamp(19px, 2.2vw, 25px)", fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: ffHeading,
              lineHeight: 1.35, margin: "0 0 14px",
            }}>
              {quote.text}
            </p>
            <span style={{ fontSize: 16, color: muted, fontFamily: ff }}>{quote.attribution}</span>
          </div>
          <QuoteChart />
        </div>

        {/* Row 5 — Sections 05 + 06, half width */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--spacing-24)", marginBottom: 24 }}>
          <Panel style={{ padding: 36 }}>
            <Eyebrow n="05" />
            <h3 style={{ fontSize: 21, fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: ffHeading, lineHeight: 1.28, margin: "0 0 10px" }}>
              {l5.title}
            </h3>
            <p style={{ fontSize: 16, color: muted, fontFamily: ff, lineHeight: 1.6, margin: "0 0 32px" }}>
              {l5.desc}
            </p>
            <AnalyticsIllustration />
          </Panel>

          <Panel style={{ padding: 36 }}>
            <Eyebrow n="06" />
            <h3 style={{ fontSize: 21, fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: ffHeading, lineHeight: 1.28, margin: "0 0 10px" }}>
              {l6.title}
            </h3>
            <p style={{ fontSize: 16, color: muted, fontFamily: ff, lineHeight: 1.6, margin: "0 0 20px" }}>
              {l6.desc}
            </p>
            <DesignSystemPreview />
          </Panel>
        </div>

      </div>
    </section>
  );
}
