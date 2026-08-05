"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import CardSwap, { Card } from "@/components/ui/CardSwap";

const caseStudies = [
  {
    slug: "finflow-banking-app",
    number: "01",
    title: "FinFlow Banking App",
    category: "Mobile · FinTech",
    description:
      "Reimagined personal finance for 2M+ millennials — reducing financial anxiety through behavioral design and intelligent nudges.",
    outcome: "↑ 40% DAU · NPS 74",
    tags: ["iOS", "Android", "Design System"],
    accent: "#e8510a",
    bg: "#0f0f0f",
  },
  {
    slug: "nexus-design-system",
    number: "02",
    title: "Nexus Design System",
    category: "Design System · Enterprise",
    description:
      "Built a unified component library that scaled across 40 products and cut design-dev handoff time in half.",
    outcome: "40 products unified · 50% faster handoff",
    tags: ["Tokens", "Figma", "React"],
    accent: "#6366f1",
    bg: "#0a0a14",
  },
  {
    slug: "oasis-health",
    number: "03",
    title: "Oasis Health",
    category: "Mobile · HealthTech",
    description:
      "Designed a mental wellness app that earned Apple's App of the Day — zero onboarding drop-off through progressive disclosure.",
    outcome: "Apple App of the Day · 4.9★",
    tags: ["Wellness", "iOS", "Motion"],
    accent: "#10b981",
    bg: "#030f0a",
  },
  {
    slug: "loop-ecommerce",
    number: "04",
    title: "Loop E-Commerce",
    category: "Web · Retail",
    description:
      "Reduced cart abandonment by 31% through a checkout redesign grounded in cognitive load research and A/B testing.",
    outcome: "↓ 31% abandonment · ↑ 22% revenue",
    tags: ["Checkout", "A/B Testing", "Web"],
    accent: "#f59e0b",
    bg: "#0f0b00",
  },
  {
    slug: "atlas-dashboard",
    number: "05",
    title: "Atlas Analytics Dashboard",
    category: "SaaS · B2B",
    description:
      "Turned a 200-widget data labyrinth into a focused command centre — time-to-insight dropped from 8 min to 90 sec.",
    outcome: "↓ 81% time-to-insight · 92% retention",
    tags: ["Dashboard", "Data Viz", "SaaS"],
    accent: "#3b82f6",
    bg: "#00040f",
  },
];

function CaseStudyCardContent({ study }: { study: (typeof caseStudies)[0] }) {
  return (
    <div
      className="w-full h-full flex flex-col justify-between p-7 rounded-xl overflow-hidden relative"
      style={{ background: study.bg }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <span
          className="text-[11px] font-mono tracking-widest uppercase"
          style={{ color: study.accent }}
        >
          {study.category}
        </span>
        <span className="text-[28px] font-black text-white/10 leading-none select-none">
          {study.number}
        </span>
      </div>

      {/* Middle */}
      <div className="space-y-3">
        <h3 className="text-[22px] font-bold text-white leading-tight">
          {study.title}
        </h3>
        <p className="text-[13px] text-zinc-400 leading-relaxed">
          {study.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {study.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
            style={{ borderColor: `${study.accent}40`, color: study.accent }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between pt-2 border-t border-white/8">
        <span className="text-[12px] font-semibold text-white/60">
          {study.outcome}
        </span>
        <Link
          href={`/case-studies/${study.slug}`}
          className="flex items-center gap-1 text-[12px] font-semibold transition-colors hover:opacity-80"
          style={{ color: study.accent }}
          onClick={(e) => e.stopPropagation()}
        >
          View study
          <ArrowUpRight size={12} />
        </Link>
      </div>

      {/* Accent glow */}
      <div
        className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
        style={{ background: `${study.accent}18` }}
      />
    </div>
  );
}

export default function CaseStudyCards() {
  const { ref, isInView } = useScrollAnimation(0.15);

  return (
    <section
      className="pt-10 md:pt-14 pb-24 md:pb-32 border-t border-white/5 overflow-visible"
      style={{
        marginRight: "calc(-1 * var(--gutter))",
      }}
      aria-labelledby="casestudies-heading"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col lg:flex-row lg:items-start"
        style={{ paddingLeft: 0 }}
      >
        {/* Left — heading + description (padded) */}
        <div
          className="lg:w-[40%] space-y-6 lg:pt-4 pr-8"
          style={{ paddingLeft: 0 }}
        >
          <div className="space-y-3">
            <span className="text-xs font-medium text-[#e8510a] uppercase tracking-widest">
              Case Studies
            </span>
            <h2
              id="casestudies-heading"
              className="fluid-text-2xl font-semibold text-white leading-tight"
            >
              Work that moved<br className="hidden md:block" /> the needle
            </h2>
          </div>
          <p className="text-zinc-500 text-[15px] leading-relaxed max-w-md">
            Five end-to-end projects spanning mobile, SaaS, e-commerce and health — each grounded in research and measured against real outcomes.
          </p>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#e8510a] hover:brightness-125 transition"
          >
            All case studies <ArrowUpRight size={14} />
          </Link>

          {/* Mini index */}
          <div className="space-y-1 pt-4 border-t border-white/8">
            {caseStudies.map((s) => (
              <Link
                key={s.slug}
                href={`/case-studies/${s.slug}`}
                className="flex items-center gap-3 py-2 group hover:pl-1 transition-all duration-200"
              >
                <span className="text-[10px] font-mono text-zinc-700 group-hover:text-zinc-500">
                  {s.number}
                </span>
                <span className="text-[13px] text-zinc-500 group-hover:text-white transition-colors">
                  {s.title}
                </span>
                <span
                  className="ml-auto w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: s.accent }}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Right — CardSwap, full bleed to right edge */}
        <div className="lg:flex-1 relative" style={{ height: "580px", marginTop: "-40px" }}>
          <CardSwap
            width={546}
            height={442}
            cardDistance={72}
            verticalDistance={78}
            delay={4500}
            pauseOnHover
            skewAmount={5}
            easing="elastic"
          >
            {caseStudies.map((study) => (
              <Card key={study.slug} style={{ border: `1px solid ${study.accent}30` }}>
                <CaseStudyCardContent study={study} />
              </Card>
            ))}
          </CardSwap>
        </div>
      </motion.div>
    </section>
  );
}
