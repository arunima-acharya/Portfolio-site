"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedProjects, projectHref } from "@/data/projects";
import { useIsMobile } from "@/hooks/useIsMobile";

function ProjectCard({
  project,
  index,
}: {
  project: ReturnType<typeof getFeaturedProjects>[0];
  index: number;
}) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={projectHref(project)}
        className="group grid md:grid-cols-2 overflow-hidden"
        aria-label={`View case study: ${project.title}`}
        style={{ background: "#fff" }}
      >
        {/* Visual panel */}
        <div className="relative overflow-hidden" style={{ minHeight: 320, background: "#fafafa" }}>
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 65% 65% at 30% 30%, rgba(232,81,10,0.14) 0%, transparent 70%)" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              aria-hidden="true"
              className="font-bold select-none"
              style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", color: "#e8510a", opacity: 0.16, letterSpacing: "-0.04em" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Content panel */}
        <div className="flex flex-col justify-between" style={{ padding: "40px 48px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e8510a", flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#e8510a" }}>
                {project.category}
              </span>
            </div>

            <h3 style={{ fontSize: "clamp(22px, 2.6vw, 32px)", fontWeight: 400, color: "#111", lineHeight: 1, letterSpacing: "-0.02em", fontFamily: "var(--font-playfair-display), 'Playfair Display', serif" }}>
              {project.title}
            </h3>
          </div>

          <div>
            <div style={{ height: 1, background: "rgba(0,0,0,0.08)", margin: "24px 0 18px" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 600, color: "#111" }}>
                View case study
                <span
                  className="flex-shrink-0 flex items-center justify-center transition-colors duration-200 group-hover:bg-[#e8510a]"
                  style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(232,81,10,0.12)" }}
                >
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                    style={{ color: "#e8510a" }}
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

export default function FeaturedWork() {
  const isMobile = useIsMobile();
  const FEATURED_SLUGS = ["hotelogix-frontdesk", "hotelogix-pos", "hotelogix-cro", "pocket-pms"];
  const filtered = getFeaturedProjects().filter((p) => FEATURED_SLUGS.includes(p.slug));

  const mutedColor = "rgba(0,0,0,0.4)";
  const textColor = "#111";

  return (
    <section
      className="py-24 md:py-32"
      aria-labelledby="work-heading"
      style={{
        backgroundColor: "#fff",
        paddingLeft: isMobile ? "20px" : "20%",
        paddingRight: isMobile ? "20px" : "20%",
      }}
    >
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-14">
        <motion.h2
          id="work-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: isMobile ? "36px" : "48px",
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: 0,
            color: textColor,
            fontFamily: "var(--font-playfair-display), 'Playfair Display', serif",
          }}
        >
          Selected Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-[220px] text-[13px] leading-relaxed md:text-right md:pt-1"
          style={{ color: mutedColor }}
        >
          Every project is a reflection of a commitment to quality — designed to create meaningful product experiences.
        </motion.p>
      </div>

      {/* Cards — one wide card per row */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {filtered.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* View all */}
      <div className="flex justify-center" style={{ marginTop: 48 }}>
        <Link
          href="/case-studies"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "transparent", color: "#111",
            border: "1px solid rgba(0,0,0,0.2)", borderRadius: 9999,
            padding: "0.7em 1.5em", fontSize: "14px", fontWeight: 600,
            fontFamily: "var(--font-inter), sans-serif", textDecoration: "none",
            transition: "background 0.2s, color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#111"; }}
        >
          View all ↗
        </Link>
      </div>
    </section>
  );
}
