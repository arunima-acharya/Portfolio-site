"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { Project } from "@/types";
import { projectHref } from "@/data/projects";

interface CaseStudyCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

// Always rendered light — a deliberate, fixed identity for the case-studies
// grid (mirrors how research pieces are always dark) rather than following
// the site-wide theme toggle.
export default function CaseStudyCard({ project, index, featured = false }: CaseStudyCardProps) {
  // Single accent — the Superr reference uses marker orange as the only
  // chromatic accent, not a per-card rainbow. Raw hex (not the CSS var)
  // since this gets alpha-suffixed below for the gradient washes.
  const accent = "#ff6f1e";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={projectHref(project)}
        className="group relative block overflow-hidden rounded-xl"
        aria-label={`View case study: ${project.title}`}
        style={{
          border: "1.5px solid var(--sp-charcoal)",
          background: "var(--sp-cream)",
          boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 20px 0px",
        }}
      >
        <div className={featured ? "md:grid md:grid-cols-[1.1fr_0.9fr]" : ""}>
          {/* Visual panel */}
          <div
            className="relative flex items-center justify-center overflow-hidden"
            style={{ aspectRatio: featured ? undefined : "16/10", minHeight: featured ? 220 : undefined, background: "#fafafa" }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ background: `radial-gradient(ellipse 75% 75% at 30% 20%, ${accent}26 0%, transparent 65%)` }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(${accent}1a 1px, transparent 1px), linear-gradient(90deg, ${accent}1a 1px, transparent 1px)`,
                backgroundSize: "28px 28px",
                maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 90%)",
              }}
            />
            <span
              aria-hidden="true"
              className="relative z-10 font-bold select-none"
              style={{
                fontSize: featured ? "clamp(4rem, 9vw, 7rem)" : "clamp(3rem, 7vw, 4.5rem)",
                color: accent,
                opacity: 0.18,
                letterSpacing: "-0.04em",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Content panel */}
          <div className={`relative flex flex-col justify-center p-7 ${featured ? "md:p-9" : ""}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
              <span className="text-[16px] font-semibold uppercase tracking-[0.16em]" style={{ color: accent, fontFamily: "var(--font-geist), sans-serif" }}>
                {project.category}
              </span>
            </div>

            <h3
              className="font-semibold tracking-tight leading-tight"
              style={{ fontSize: featured ? "clamp(1.4rem, 2.6vw, 1.9rem)" : "1.2rem", color: "var(--sp-cocoa)", fontFamily: "var(--font-fraunces), serif", fontWeight: 600, textTransform: "capitalize" }}
            >
              {project.title}
            </h3>

            <p
              className={`mt-3 leading-relaxed ${featured ? "line-clamp-3" : "line-clamp-2"}`}
              style={{ fontSize: "16px", color: "#666", fontFamily: "var(--font-geist), sans-serif" }}
            >
              {project.valueProposition ?? project.shortDescription}
            </p>

            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[16px] px-2.5 py-1 rounded-[20px]"
                    style={{ color: "#555", border: "1px solid rgba(0,0,0,0.08)", background: "rgba(0,0,0,0.02)", fontFamily: "var(--font-geist), sans-serif" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mt-7 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              {project.timeline && (
                <span className="inline-flex items-center gap-1.5 text-[16px]" style={{ color: "#888", fontFamily: "var(--font-geist), sans-serif" }}>
                  <Calendar size={12} />
                  {project.timeline}
                </span>
              )}
              <span
                className="inline-flex items-center gap-1.5 text-[16px] font-medium ml-auto transition-colors duration-200"
                style={{ color: "#555", fontFamily: "var(--font-geist), sans-serif" }}
              >
                <span className="group-hover:text-[#111] transition-colors duration-200">View case study</span>
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                  style={{ background: "rgba(0,0,0,0.05)" }}
                >
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: accent }}
                  />
                </span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
