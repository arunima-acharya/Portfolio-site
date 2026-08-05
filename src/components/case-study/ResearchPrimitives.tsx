"use client";

import { motion } from "framer-motion";
import { AlertTriangle, AlertCircle, CircleDot, Lightbulb, ImageOff, Quote as QuoteIcon, ArrowRight, type LucideIcon } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useResearchAccent, useResearchAccentText, useResearchPalette, useSeverityColors, type SeverityColors } from "./ResearchAccent";

/* ─── Shared block-style primitives for "Design Investigations" / research
   case studies. Mirrors CaseStudyContent's dark, editorial visual language,
   accented per-piece via ResearchAccentContext so each investigation reads
   as its own thing rather than a reskinned template. Colors are drawn from
   useResearchPalette() so a piece can opt into a fixed light treatment
   (e.g. UX4G) while others stay on the default dark one. ──── */

export function Section({
  children,
  label,
  title,
  id,
}: {
  children: React.ReactNode;
  label: string;
  title: string;
  id?: string;
}) {
  const { ref, isInView } = useScrollAnimation(0.06);
  const accent = useResearchAccent();
  const accentText = useResearchAccentText();
  const p = useResearchPalette();
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-20"
      style={{ scrollMarginTop: 96, borderTop: `1px solid ${p.border}` }}
    >
      <div className="space-y-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold font-mono tabular-nums" style={{ color: accentText }}>
              {label}
            </span>
            <span className="h-px flex-1 max-w-[64px]" style={{ background: `linear-gradient(90deg, ${accent}66, transparent)` }} />
          </div>
          <h2 className="text-2xl md:text-[28px] font-semibold tracking-tight" style={{ color: p.text }}>{title}</h2>
        </div>
        {children}
      </div>
    </motion.section>
  );
}

export function SubHeading({ children }: { children: React.ReactNode }) {
  const accent = useResearchAccent();
  const p = useResearchPalette();
  return (
    <h3 className="text-lg font-medium mb-4 flex items-center gap-2.5" style={{ color: p.text }}>
      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: accent }} />
      {children}
    </h3>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  const p = useResearchPalette();
  return <p className="text-[16px] leading-relaxed" style={{ color: p.textBody }}>{children}</p>;
}

export function Bullets({ items }: { items: string[] }) {
  const accent = useResearchAccent();
  const p = useResearchPalette();
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ color: p.textBody }}>
          <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: `${accent}99` }} />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Quote({ children }: { children: React.ReactNode }) {
  const accent = useResearchAccent();
  const p = useResearchPalette();
  return (
    <blockquote className="relative pl-8 py-1">
      <QuoteIcon
        size={22}
        aria-hidden="true"
        className="absolute left-0 top-0"
        style={{ color: accent, opacity: 0.55 }}
      />
      <p className="text-[17px] italic leading-relaxed" style={{ color: p.text }}>{children}</p>
    </blockquote>
  );
}

/* A pulled-out insight — distinct from Quote (citation-style) in that this
   is the author's own point, dressed up so it doesn't get skimmed past. */
export function Callout({ label = "Key insight", children }: { label?: string; children: React.ReactNode }) {
  const accent = useResearchAccent();
  const accentText = useResearchAccentText();
  const p = useResearchPalette();
  return (
    <div
      className="rounded-2xl p-6 flex gap-4"
      style={{ background: `${accent}0d`, border: `1px solid ${accent}33` }}
    >
      <Lightbulb size={20} className="flex-shrink-0 mt-0.5" style={{ color: accentText }} />
      <div className="space-y-1.5">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: accentText }}>{label}</p>
        <p className="text-[15.5px] leading-relaxed" style={{ color: p.text }}>{children}</p>
      </div>
    </div>
  );
}

export interface StatItem {
  value: string;
  label: string;
}

/* A row of oversized numerals — injects typographic contrast so an article
   doesn't read as one continuous wall of body text. */
export function StatRow({ items }: { items: StatItem[] }) {
  const accent = useResearchAccent();
  const p = useResearchPalette();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
      {items.map((s) => (
        <div key={s.label} className="space-y-1.5">
          <p className="font-semibold tracking-tight" style={{ fontSize: "clamp(1.9rem, 4vw, 2.4rem)", color: accent, lineHeight: 1 }}>
            {s.value}
          </p>
          <p className="text-[12.5px] uppercase tracking-wide leading-snug" style={{ color: p.textMuted }}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export function ImagePlaceholder({ label }: { label: string }) {
  const accent = useResearchAccent();
  const p = useResearchPalette();
  return (
    <div
      className="relative overflow-hidden rounded-xl h-[220px] flex flex-col items-center justify-center gap-3"
      style={{ border: `1px dashed ${accent}40`, background: p.cardBg }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{ background: `radial-gradient(ellipse 60% 60% at 50% 40%, ${accent}14 0%, transparent 70%)` }}
      />
      <ImageOff size={20} className="relative z-10" style={{ color: `${accent}99` }} />
      <span className="relative z-10 text-xs font-mono uppercase tracking-widest text-center px-6" style={{ color: p.textFaint }}>{label}</span>
    </div>
  );
}

/* A heavier closing panel for the article's final section, so the piece
   ends on a deliberate note rather than just trailing off. */
export function ClosingStatement({ children }: { children: React.ReactNode }) {
  const accent = useResearchAccent();
  const p = useResearchPalette();
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-8 md:p-10"
      style={{ background: `linear-gradient(155deg, ${accent}14, transparent 70%)`, border: `1px solid ${accent}2a` }}
    >
      <QuoteIcon size={28} aria-hidden="true" style={{ color: accent, opacity: 0.5 }} className="mb-4" />
      <p className="text-[19px] md:text-[21px] leading-relaxed font-medium" style={{ color: p.text }}>{children}</p>
    </div>
  );
}

/* A small icon-topped card — for grouping a short list under a labeled
   theme (e.g. "what this audit set out to understand"). */
export interface IconCardItem {
  icon: LucideIcon;
  title: string;
  description?: string;
  items?: string[];
}

export function IconCardGrid({ items }: { items: IconCardItem[] }) {
  const accent = useResearchAccent();
  const p = useResearchPalette();
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {items.map((it) => (
        <div
          key={it.title}
          className="rounded-xl p-6 space-y-4 transition-transform duration-300 hover:-translate-y-0.5"
          style={{ background: p.cardBg, border: `1px solid ${p.cardBorder}` }}
        >
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${accent}17` }}>
            <it.icon size={17} style={{ color: accent }} />
          </div>
          <p className="text-[15px] font-semibold" style={{ color: p.text }}>{it.title}</p>
          {it.description && <P>{it.description}</P>}
          {it.items && <Bullets items={it.items} />}
        </div>
      ))}
    </div>
  );
}

/* A vertical numbered list — livelier than plain bullets for a short,
   ordered set of statements (objectives, steps, criteria). */
export function NumberedList({ items }: { items: string[] }) {
  const accent = useResearchAccent();
  const accentText = useResearchAccentText();
  const p = useResearchPalette();
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-xl px-5 py-4 transition-transform duration-300 hover:-translate-y-0.5"
          style={{ background: p.cardBg, border: `1px solid ${p.cardBorder}` }}
        >
          <span
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-mono font-semibold"
            style={{ background: `${accent}1a`, color: accentText }}
          >
            {i + 1}
          </span>
          <p className="text-[15px] leading-snug" style={{ color: p.text }}>{item}</p>
        </div>
      ))}
    </div>
  );
}

/* Side-by-side persona cards — for comparing two user types / entry points
   without needing an actual diagram image. */
export interface CompareCard {
  icon: LucideIcon;
  role: string;
  entry: string;
  description: string;
}

export function CompareCards({ cards, connector }: { cards: CompareCard[]; connector?: string }) {
  const accent = useResearchAccent();
  const p = useResearchPalette();
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-5">
        {cards.map((c) => (
          <div
            key={c.role}
            className="rounded-xl p-6 space-y-3"
            style={{ background: p.cardBg, border: `1px solid ${p.cardBorder}` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${accent}17` }}>
                <c.icon size={17} style={{ color: accent }} />
              </div>
              <div>
                <p className="text-[15px] font-semibold" style={{ color: p.text }}>{c.role}</p>
                <p className="text-[12px]" style={{ color: p.textMuted }}>{c.entry}</p>
              </div>
            </div>
            <P>{c.description}</P>
          </div>
        ))}
      </div>
      {connector && (
        <div className="flex items-center gap-3 justify-center">
          <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${p.border})` }} />
          <span className="text-[12px] uppercase tracking-widest whitespace-nowrap" style={{ color: p.textMuted }}>{connector}</span>
          <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${p.border}, transparent)` }} />
        </div>
      )}
    </div>
  );
}

/* A compact horizontal step flow — a lightweight stand-in for a journey
   diagram, built from the same short labels rather than an image. */
export function FlowSteps({ steps }: { steps: string[] }) {
  const accent = useResearchAccent();
  const p = useResearchPalette();
  return (
    <div className="flex flex-wrap items-center gap-y-2">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <span
            className="text-[13px] px-3.5 py-2 rounded-lg whitespace-nowrap"
            style={{ background: p.cardBg, border: `1px solid ${accent}2a`, color: p.text }}
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <ArrowRight size={14} style={{ color: `${accent}80` }} className="flex-shrink-0 mx-2" />
          )}
        </div>
      ))}
    </div>
  );
}

/* A stacked priority breakdown bar computed from a MatrixTable's rows —
   gives a one-glance read on the priority mix before the detailed table. */
export function PriorityBreakdown({ rows }: { rows: MatrixRow[] }) {
  const p = useResearchPalette();
  const severity = useSeverityColors();
  const order = ["High", "Medium", "Quick Win", "Low", "Very Low"];
  const colors: Record<string, string> = {
    High: severity.high,
    Medium: severity.medium,
    "Quick Win": severity.quickWin,
    Low: p.textFaint,
    "Very Low": p.textMuted,
  };
  const counts: Record<string, number> = {};
  rows.forEach((r) => { counts[r.priority] = (counts[r.priority] ?? 0) + 1; });
  const total = rows.length;
  const present = order.filter((k) => counts[k]);

  return (
    <div className="space-y-3">
      <div className="flex h-2 rounded-full overflow-hidden">
        {present.map((k) => (
          <div key={k} style={{ width: `${(counts[k] / total) * 100}%`, background: colors[k] }} />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {present.map((k) => (
          <span key={k} className="inline-flex items-center gap-1.5 text-[12.5px]" style={{ color: p.textBody }}>
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: colors[k] }} />
            {counts[k]} {k}
          </span>
        ))}
      </div>
    </div>
  );
}

export const FRICTION_STYLES = {
  high: { label: "High Friction", dot: "#ef4444", text: "#f87171", bg: "rgba(239,68,68,0.06)", border: "rgba(239,68,68,0.18)", Icon: AlertTriangle },
  medium: { label: "Medium Friction", dot: "#f59e0b", text: "#fbbf24", bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.18)", Icon: AlertCircle },
  low: { label: "Low Friction", dot: "#71717a", text: "#a1a1aa", bg: "rgba(255,255,255,0.02)", border: "rgba(255,255,255,0.08)", Icon: CircleDot },
} as const;

export interface FrictionItem {
  title: string;
  body: string;
  impact: string[];
  example?: string[];
  note?: string;
}

export function FrictionGroup({ level, items }: { level: keyof typeof FRICTION_STYLES; items: FrictionItem[] }) {
  const p = useResearchPalette();
  const severity = useSeverityColors();
  const base = FRICTION_STYLES[level];
  // High/medium use saturated severity colors that are tuned per theme;
  // low has no saturated color of its own, so it just reads off the
  // neutral palette instead.
  const s =
    level === "low"
      ? { ...base, text: p.textMuted, bg: p.cardBg, border: p.cardBorder }
      : level === "high"
      ? { ...base, dot: severity.high, text: severity.high }
      : { ...base, dot: severity.medium, text: severity.medium };
  const Icon = s.Icon;
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Icon size={15} style={{ color: s.text }} />
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: s.text }}>{s.label}</span>
      </div>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl p-6 space-y-3 transition-transform duration-300 hover:-translate-y-0.5"
            style={{ background: s.bg, border: `1px solid ${s.border}`, borderLeft: `2.5px solid ${s.dot}` }}
          >
            <p className="text-[16px] font-medium" style={{ color: p.text }}>{item.title}</p>
            <P>{item.body}</P>
            {item.example && (
              <div className="pl-4 space-y-1 py-1" style={{ borderLeft: `1px solid ${p.border}` }}>
                {item.example.map((line, j) => (
                  <p key={j} className="text-[13.5px] font-mono" style={{ color: p.textMuted }}>{line}</p>
                ))}
              </div>
            )}
            <div className="pt-1">
              <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: p.textFaint }}>Impact</p>
              <div className="flex flex-wrap gap-2">
                {item.impact.map((tag, k) => (
                  <span
                    key={k}
                    className="text-[12.5px] px-2.5 py-1 rounded-full"
                    style={{ color: p.textBody, border: `1px solid ${p.cardBorder}`, background: p.cardBg }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Generic priority/impact matrix — a real table on md+ screens, stacked
   cards on mobile where a five-column table would otherwise force
   horizontal scrolling on the body text itself. */
export interface MatrixRow {
  num: number;
  title: string;
  description: string;
  impact: string;
  effort: string;
  priority: string;
  note?: string;
}

function priorityStyle(priority: string, severity: SeverityColors) {
  return priority === "High"
    ? { color: severity.high, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }
    : priority === "Medium"
    ? { color: severity.medium, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }
    : { color: severity.quickWin, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" };
}

export function MatrixTable({ rows, headings = { first: "Enhancement" } }: { rows: MatrixRow[]; headings?: { first?: string } }) {
  const accentText = useResearchAccentText();
  const p = useResearchPalette();
  const severity = useSeverityColors();
  return (
    <>
      {/* Cards — mobile */}
      <div className="md:hidden space-y-4">
        {rows.map((e) => (
          <div key={e.num} className="rounded-xl p-5 space-y-3" style={{ background: p.cardBg, border: `1px solid ${p.cardBorder}` }}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <span className="text-[12px] font-mono mt-0.5" style={{ color: accentText }}>{String(e.num).padStart(2, "0")}</span>
                <p className="text-[15px] font-medium leading-snug" style={{ color: p.text }}>{e.title}</p>
              </div>
              <span className="flex-shrink-0 px-2.5 py-1 rounded-full text-[11.5px] font-medium whitespace-nowrap" style={priorityStyle(e.priority, severity)}>
                {e.priority}
              </span>
            </div>
            <p className="text-[13.5px] leading-relaxed" style={{ color: p.textMuted }}>{e.description}</p>
            {e.note && <p className="text-[12.5px] italic" style={{ color: p.textFaint }}>{e.note}</p>}
            <div className="flex gap-4 pt-1 text-[12.5px]" style={{ color: p.textMuted }}>
              <span>Impact <span style={{ color: p.text }}>{e.impact}</span></span>
              <span>Effort <span style={{ color: p.text }}>{e.effort}</span></span>
            </div>
          </div>
        ))}
      </div>

      {/* Table — md+ */}
      <div className="hidden md:block overflow-x-auto -mx-2 px-2">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr style={{ borderBottom: `1px solid ${p.cardBorderStrong}` }}>
              <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-widest w-10" style={{ color: p.textFaint }}>#</th>
              <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-widest" style={{ color: p.textFaint }}>{headings.first ?? "Enhancement"}</th>
              <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-widest" style={{ color: p.textFaint }}>Impact</th>
              <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-widest" style={{ color: p.textFaint }}>Effort</th>
              <th className="py-3 text-xs font-semibold uppercase tracking-widest" style={{ color: p.textFaint }}>Priority</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.num} className="align-top" style={{ borderBottom: `1px solid ${p.border}` }}>
                <td className="py-4 pr-4 text-[13px] font-mono" style={{ color: p.textFaint }}>{String(e.num).padStart(2, "0")}</td>
                <td className="py-4 pr-4 max-w-[380px]">
                  <p className="text-[15px] font-medium mb-1" style={{ color: p.text }}>{e.title}</p>
                  <p className="text-[13.5px] leading-relaxed" style={{ color: p.textMuted }}>{e.description}</p>
                  {e.note && <p className="text-[12.5px] italic mt-1.5" style={{ color: p.textFaint }}>{e.note}</p>}
                </td>
                <td className="py-4 pr-4 text-[13.5px] whitespace-nowrap" style={{ color: p.textBody }}>{e.impact}</td>
                <td className="py-4 pr-4 text-[13.5px] whitespace-nowrap" style={{ color: p.textBody }}>{e.effort}</td>
                <td className="py-4 text-[13.5px] whitespace-nowrap">
                  <span className="px-2.5 py-1 rounded-full text-[12.5px] font-medium" style={priorityStyle(e.priority, severity)}>
                    {e.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
