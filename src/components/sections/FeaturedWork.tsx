"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getFeaturedProjects, projectHref } from "@/data/projects";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useParallax } from "@/hooks/useParallax";

const CARD_HEIGHT = 400;

function ProjectCard({
  project,
  index,
  isMobile,
}: {
  project: ReturnType<typeof getFeaturedProjects>[0];
  index: number;
  isMobile: boolean;
}) {
  const tags = project.tags.slice(0, 3);
  const { ref: parallaxRef, y: numberY } = useParallax(28);

  return (
    <motion.div
      ref={parallaxRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      // Card-stack effect: each card sticks a little lower than the one
      // before it, so as you scroll it slides in and overlaps/peeks out
      // from under the previous card instead of just stacking in flow.
      style={{ position: "sticky", top: `${96 + index * 28}px`, zIndex: index + 1 }}
    >
      <Link
        href={projectHref(project)}
        className="group grid md:grid-cols-2 overflow-hidden rounded-2xl"
        aria-label={`View case study: ${project.title}`}
        style={{ background: "#fff", boxShadow: "0 16px 40px rgba(0,0,0,0.12)", height: isMobile ? undefined : CARD_HEIGHT }}
      >
        {/* Visual panel */}
        <div className="relative overflow-hidden" style={{ minHeight: isMobile ? CARD_HEIGHT : "100%", background: "#fafafa" }}>
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
            <motion.span
              aria-hidden="true"
              className="font-bold select-none"
              style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", color: "#e8510a", opacity: 0.16, letterSpacing: "-0.04em", y: numberY }}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>
          </div>
        </div>

        {/* Content panel */}
        <div className="flex flex-col" style={{ padding: "40px 48px", overflow: isMobile ? undefined : "hidden" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e8510a", flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#e8510a" }}>
                {project.category}
              </span>
            </div>

            <h3 style={{ fontSize: "clamp(22px, 2.6vw, 32px)", fontWeight: 400, color: "#111", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 14, fontFamily: "var(--font-instrument-serif), 'Instrument Serif', serif" }}>
              {project.title}
            </h3>

            <p style={{ fontSize: 14.5, color: "#666", lineHeight: 1.6, marginBottom: 20 }}>
              {project.shortDescription}
            </p>

            {tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    style={{ fontSize: 12, padding: "6px 14px", borderRadius: 9999, border: "1px solid rgba(0,0,0,0.12)", color: "#555" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <span
            className="inline-flex items-center gap-2 self-start transition-colors duration-200"
            style={{
              fontSize: 13, fontWeight: 600, color: "#e8510a",
              borderRadius: 9999, padding: "0.65em 1.3em 0.65em 0",
              fontFamily: "var(--font-inter), sans-serif", marginTop: "auto",
            }}
          >
            View Case Study <span aria-hidden="true">↗</span>
          </span>
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
            fontFamily: "var(--font-instrument-serif), 'Instrument Serif', serif",
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
          <ProjectCard key={project.id} project={project} index={i} isMobile={isMobile} />
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
