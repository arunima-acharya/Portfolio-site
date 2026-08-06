"use client";

import { motion } from "framer-motion";
import ResearchCard from "@/components/case-study/ResearchCard";
import { projects } from "@/data/projects";
import { useTheme } from "@/components/ThemeProvider";

export default function ResearchPage() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const textMuted = isLight ? "#666" : "#888";
  const textDark = isLight ? "#111" : "#fff";

  const researchProjects = projects.filter((p) => p.category === "Research");
  const [featured, ...rest] = researchProjects;

  return (
    <div className="pt-32 pb-24" style={{ paddingLeft: "15%", paddingRight: "15%" }}>
      <div className="space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-5"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#e8510a" }} />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: textMuted }}>
              Design Investigations
            </span>
          </div>
          <h1 className="fluid-text-3xl font-semibold leading-tight tracking-tight" style={{ color: textDark, fontFamily: "var(--font-instrument-serif), 'Instrument Serif', serif" }}>
            Research
          </h1>
          <p className="text-base max-w-lg leading-relaxed" style={{ color: textMuted }}>
            Independent investigations into design systems, interaction patterns, and emerging product
            categories — written up as standalone studies rather than client work.
          </p>
          <div className="text-xs pt-1" style={{ color: textMuted }}>
            {researchProjects.length} {researchProjects.length === 1 ? "investigation" : "investigations"} published
          </div>
        </motion.div>

        {/* Grid */}
        {researchProjects.length > 0 ? (
          <div className="space-y-8">
            {featured && <ResearchCard project={featured} index={0} featured />}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {rest.map((project, i) => (
                  <ResearchCard key={project.id} project={project} index={i + 1} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm" style={{ color: textMuted }}>
            No investigations published yet — check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
