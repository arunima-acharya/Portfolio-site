"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { Project } from "@/types";
import { useResearchAccent, useResearchAccentText, useResearchPalette } from "./ResearchAccent";

const EASE = [0.16, 1, 0.3, 1] as const;

interface ResearchHeroProps {
  project: Project;
  /** Optional short eyebrow, e.g. "Design Investigation #01". */
  eyebrow?: string;
  /** Display index, e.g. "01" — rendered as a large faint watermark numeral. */
  index?: string;
  /** Estimated reading time, e.g. "8 min read". */
  readTime?: string;
  /** Extra meta fields appended after the base Timeline/Role/Field row. */
  extraMeta?: { label: string; value: string }[];
}

export default function ResearchHero({
  project,
  eyebrow = "Design Investigation",
  index,
  readTime,
  extraMeta = [],
}: ResearchHeroProps) {
  const accent = useResearchAccent();
  const accentText = useResearchAccentText();
  const p = useResearchPalette();

  const meta = [
    { label: "Timeline", value: project.timeline },
    { label: "Role", value: project.role },
    { label: "Field", value: project.industry },
    ...extraMeta,
  ];

  return (
    <section className="relative overflow-hidden pt-32 pb-6" aria-label="Research hero">
      {/* Accent glow */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[560px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 80% at 50% -10%, ${accent}26 0%, transparent 62%)`,
        }}
      />

      {/* Watermark index numeral */}
      {index && (
        <div
          aria-hidden="true"
          className="absolute pointer-events-none select-none font-bold"
          style={{
            top: 60,
            right: "6%",
            fontSize: "clamp(6rem, 14vw, 11rem)",
            lineHeight: 1,
            color: accent,
            opacity: 0.1,
            letterSpacing: "-0.05em",
          }}
        >
          {index}
        </div>
      )}

      <div className="relative z-10 mx-auto px-6" style={{ maxWidth: 820 }}>
        {/* Back link */}
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: EASE }}>
          <Link
            href="/research"
            className="group inline-flex items-center gap-2 text-sm mb-12 transition-colors duration-200"
            style={{ color: p.textMuted }}
            onMouseEnter={(e) => (e.currentTarget.style.color = p.hoverText)}
            onMouseLeave={(e) => (e.currentTarget.style.color = p.textMuted)}
          >
            <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
            All research
          </Link>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          className="flex items-center gap-2.5 mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
          <span className="text-xs font-semibold" style={{ color: accentText }}>
            {eyebrow.toLowerCase()}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          style={{ fontSize: "clamp(2.2rem, 5.2vw, 3.6rem)", lineHeight: 1.05, color: p.text, fontFamily: "var(--font-gelica)", fontWeight: 600, textTransform: "lowercase" }}
        >
          {project.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="mt-6 leading-relaxed"
          style={{ fontSize: "19px", maxWidth: "62ch", color: p.textBody }}
        >
          {project.valueProposition ?? project.shortDescription}
        </motion.p>

        {readTime && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.26 }}
            className="mt-5 inline-flex items-center gap-1.5 text-[13px]"
            style={{ color: p.textMuted }}
          >
            <Clock size={13} />
            {readTime}
          </motion.div>
        )}

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mt-10 flex flex-wrap gap-x-14 gap-y-6 pt-8 pb-2"
        >
          {meta.map(({ label, value }) => (
            <div key={label} className="space-y-1.5">
              <p className="text-[11px] font-semibold" style={{ color: p.textFaint }}>{label.toLowerCase()}</p>
              <p className="text-[15px] max-w-[26ch]" style={{ color: p.text }}>{value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
