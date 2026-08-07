"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Tag from "@/components/ui/Tag";
import { Project } from "@/types";

interface CaseStudyHeroProps {
  project: Project;
}

export default function CaseStudyHero({ project }: CaseStudyHeroProps) {
  const isResearch = project.category === "Research";
  const backHref = isResearch ? "/research" : "/case-studies";
  const backLabel = isResearch ? "All research" : "All case studies";

  return (
    <section className="relative pt-32 pb-20 overflow-hidden" style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter)" }} aria-label="Case study hero">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.4) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href={backHref}
            className="group inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white mb-12 transition-colors duration-200"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            {backLabel}
          </Link>
        </motion.div>

        {/* Content */}
        <div className="space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            <h1
              className="fluid-text-3xl font-semibold text-white"
              style={project.slug === "hotelogix-frontdesk"
                ? { fontSize: "clamp(2.464rem, 6.899vw, 4.928rem)", lineHeight: 1, fontFamily: "var(--font-instrument-serif), 'Instrument Serif', serif" }
                : { lineHeight: 1, fontFamily: "var(--font-instrument-serif), 'Instrument Serif', serif" }}
            >
              {project.slug === "hotelogix-frontdesk" ? (
                <>Reservation Management System</>
              ) : (
                project.title
              )}
            </h1>

            <p className="font-semibold leading-snug w-full sm:w-4/5" style={{ color: "#52525c", fontSize: "clamp(17px, 2.6vw, 24px)" }}>
              {project.valueProposition ?? project.shortDescription}
            </p>

          </motion.div>

          {/* Meta cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: "Timeline", value: project.timeline },
              { label: "Role", value: project.role },
              { label: "Team", value: project.team.join(", ") },
              { label: "Industry", value: project.industry },
            ].map(({ label, value }) => (
              <div key={label} className="space-y-2">
                <p className="text-sm font-medium text-zinc-600 uppercase tracking-widest">
                  {label}
                </p>
                <p className="text-[19px] text-zinc-300 leading-relaxed whitespace-pre-line">{value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Cover image area */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="mt-16"
      >
        <div className="relative h-[360px] md:h-[480px] rounded-2xl overflow-hidden border border-white/8 bg-zinc-950">
          {/* Placeholder gradient visual */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 70% at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)`,
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-zinc-700 text-sm font-mono tracking-widest uppercase">
              {project.title} — Cover
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
