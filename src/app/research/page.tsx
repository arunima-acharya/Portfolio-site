"use client";

import { motion } from "framer-motion";
import ResearchCard from "@/components/case-study/ResearchCard";
import { projects } from "@/data/projects";
import { useTheme } from "@/components/ThemeProvider";

export default function ResearchPage() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const textMuted = isLight ? "#8a8580" : "#888";
  const textDark = isLight ? "var(--sp-charcoal)" : "#fff";

  const researchProjects = projects.filter((p) => p.category === "Research");

  return (
    <div className="pt-32 pb-24" style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter)" }}>
      <div className="space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-5"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--sp-orange)" }} />
            <span className="text-[16px] font-semibold" style={{ color: textMuted, fontFamily: "var(--font-geist), sans-serif" }}>
              design investigations
            </span>
          </div>
          <h1 className="fluid-text-3xl font-semibold leading-tight" style={{ color: isLight ? "var(--sp-cocoa)" : textDark, fontFamily: "var(--font-gelica)", fontWeight: 600 }}>
            research
          </h1>
          <p className="text-base max-w-lg leading-relaxed" style={{ color: textMuted }}>
            Independent investigations into design systems, interaction patterns, and emerging product
            categories — written up as standalone studies rather than client work.
          </p>
          <div className="text-[16px] pt-1" style={{ color: textMuted }}>
            {researchProjects.length} {researchProjects.length === 1 ? "investigation" : "investigations"} published
          </div>
        </motion.div>

        {/* Grid — always two columns */}
        {researchProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {researchProjects.map((project, i) => (
              <ResearchCard key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-[16px]" style={{ color: textMuted }}>
            No investigations published yet — check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
