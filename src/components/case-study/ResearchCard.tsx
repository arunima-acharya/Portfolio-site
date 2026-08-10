"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { Project } from "@/types";
import { RESEARCH_META } from "@/data/researchMeta";
import { projectHref } from "@/data/projects";

interface ResearchCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export default function ResearchCard({ project, index, featured = false }: ResearchCardProps) {
  const rawMeta = RESEARCH_META[project.slug] ?? { accent: "#ff6f1e", eyebrow: "Design Investigation", readTime: "" };
  // Marker orange is the only chromatic accent per the Superr reference —
  // override whatever per-project accent RESEARCH_META provides.
  const meta = { ...rawMeta, accent: "#ff6f1e" };
  const topics = project.tags.filter((t) => t !== "Research");

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
        aria-label={`Read investigation: ${project.title}`}
        style={{ border: "1.5px solid var(--sp-charcoal)", background: "var(--sp-cream)", boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 20px 0px" }}
      >
        <div className={featured ? "md:grid md:grid-cols-[1.1fr_0.9fr]" : ""}>
          {/* Visual panel */}
          <div
            className="relative flex items-center justify-center overflow-hidden"
            style={{ aspectRatio: featured ? undefined : "16/10", minHeight: featured ? 220 : undefined }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ background: `radial-gradient(ellipse 75% 75% at 30% 20%, ${meta.accent}33 0%, transparent 65%)` }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(${meta.accent}14 1px, transparent 1px), linear-gradient(90deg, ${meta.accent}14 1px, transparent 1px)`,
                backgroundSize: "28px 28px",
                maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 90%)",
              }}
            />
          </div>

          {/* Content panel */}
          <div className={`relative flex flex-col justify-center p-7 ${featured ? "md:p-9" : ""}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[16px] font-semibold uppercase tracking-[0.16em]" style={{ color: meta.accent, fontFamily: "var(--font-geist), sans-serif" }}>
                {meta.eyebrow}
              </span>
            </div>

            <h3
              className="font-semibold tracking-tight leading-tight"
              style={{ fontSize: featured ? "clamp(1.4rem, 2.6vw, 1.9rem)" : "1.2rem", color: "var(--sp-cocoa)", fontFamily: "var(--font-fraunces), serif", fontWeight: 600, textTransform: "capitalize" }}
            >
              {project.title}
            </h3>

            <p
              className={`mt-3 text-zinc-600 leading-relaxed ${featured ? "line-clamp-3" : "line-clamp-2"}`}
              style={{ fontSize: "16px", fontFamily: "var(--font-geist), sans-serif" }}
            >
              {project.valueProposition ?? project.shortDescription}
            </p>

            {topics.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-5">
                {topics.map((tag) => (
                  <span
                    key={tag}
                    className="text-[16px] px-2.5 py-1 rounded-[20px] text-zinc-600 border border-black/8 bg-black/[0.03]"
                    style={{ fontFamily: "var(--font-geist), sans-serif" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mt-7 pt-5">
              {meta.readTime && (
                <span className="inline-flex items-center gap-1.5 text-[16px] text-zinc-500" style={{ fontFamily: "var(--font-geist), sans-serif" }}>
                  <Clock size={12} />
                  {meta.readTime}
                </span>
              )}
              <span
                className="inline-flex items-center gap-1.5 text-[16px] font-medium ml-auto transition-colors duration-200"
                style={{ color: "#71717a", fontFamily: "var(--font-geist), sans-serif" }}
              >
                <span className="group-hover:text-[#111] transition-colors duration-200">Read investigation</span>
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                  style={{ background: "rgba(0,0,0,0.05)" }}
                >
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: meta.accent }}
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
