"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import CaseStudyCard from "@/components/case-study/CaseStudyCard";
import { projects } from "@/data/projects";
import { ProjectCategory } from "@/types";
import { useTheme } from "@/components/ThemeProvider";

const categories: Array<"All" | ProjectCategory> = [
  "All",
  "Product Design",
  "UX Research",
  "Design System",
  "Mobile App",
  "SaaS",
];

// Design Investigations live on their own /research page, not in the case-studies grid.
const caseStudyProjects = projects.filter((p) => p.category !== "Research");

export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | ProjectCategory>("All");
  const [search, setSearch] = useState("");
  const { theme } = useTheme();
  const isLight = theme === "light";

  const filtered = useMemo(() => {
    let result = caseStudyProjects;
    if (activeFilter !== "All") {
      result = result.filter((p) => p.category === activeFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.industry.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [activeFilter, search]);

  // Theme-aware tokens — isLight side uses the Superr palette (cream/
  // charcoal/cocoa), dark side is unchanged since Superr is a light-only
  // reference.
  const bg         = isLight ? "var(--sp-dew)"      : "rgba(255,255,255,0.06)";
  const bgHover    = isLight ? "rgba(23,23,23,0.08)": "rgba(255,255,255,0.10)";
  const border     = isLight ? "var(--sp-charcoal)" : "rgba(255,255,255,0.10)";
  const borderHov  = isLight ? "var(--sp-orange)"   : "rgba(255,255,255,0.20)";
  const textMuted  = isLight ? "#8a8580"            : "#888";
  const textDark   = isLight ? "var(--sp-charcoal)" : "#fff";
  const activeBg   = isLight ? "var(--sp-charcoal)" : "#fff";
  const activeText = isLight ? "var(--sp-cream)"    : "#111";

  return (
    <div className="pt-32 pb-24" style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter)" }}>
      <div className="space-y-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <span
            className="text-[16px] font-medium"
            style={{ color: textMuted, fontFamily: "var(--font-geist), sans-serif" }}
          >
            Portfolio
          </span>
          <h1
            className="fluid-text-3xl font-semibold leading-tight"
            style={{ color: isLight ? "var(--sp-cocoa)" : textDark, fontFamily: "var(--font-gelica)", fontWeight: 600 }}
          >
            Case studies
          </h1>
          <p className="text-base max-w-lg leading-relaxed" style={{ color: textMuted }}>
            A selection of projects spanning product design, design systems, UX
            research, and everything in between.
          </p>
        </motion.div>

        {/* Filters + Search */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-4 items-center"
        >
          {/* Search */}
          <div className="relative w-full sm:w-64 flex-shrink-0">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: textMuted }}
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search projects"
              style={{
                width: "100%",
                background: isLight ? "var(--sp-cream)" : bg,
                border: `1.5px solid ${border}`,
                borderRadius: "var(--radius-lg)",
                paddingLeft: "36px",
                paddingRight: search ? "36px" : "16px",
                paddingTop: "9px",
                paddingBottom: "9px",
                fontSize: "16px",
                color: textDark,
                fontFamily: "var(--font-geist), sans-serif",
                outline: "none",
                transition: "border-color 0.15s, background 0.15s",
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = borderHov;
                (e.currentTarget as HTMLInputElement).style.background = bgHover;
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = border;
                (e.currentTarget as HTMLInputElement).style.background = bg;
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: textMuted }}
                aria-label="Clear search"
                onMouseEnter={(e) => (e.currentTarget.style.color = textDark)}
                onMouseLeave={(e) => (e.currentTarget.style.color = textMuted)}
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  aria-pressed={isActive}
                  style={{
                    padding: "7px 16px",
                    borderRadius: "var(--radius-2xl-2)",
                    fontSize: "16px",
                    fontWeight: isActive ? 600 : 500,
                    fontFamily: "var(--font-geist), sans-serif",
                    border: `1.5px solid ${isActive ? (isLight ? "var(--sp-charcoal)" : "transparent") : border}`,
                    background: isActive ? activeBg : "transparent",
                    color: isActive ? activeText : textMuted,
                    cursor: "pointer",
                    transition: "background 0.15s, color 0.15s, border-color 0.15s",
                    outline: "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.background = bgHover;
                      (e.currentTarget as HTMLButtonElement).style.borderColor = borderHov;
                      (e.currentTarget as HTMLButtonElement).style.color = textDark;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = border;
                      (e.currentTarget as HTMLButtonElement).style.color = textMuted;
                    }
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Results count */}
        <div className="text-[16px]" style={{ color: textMuted }}>
          {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          {activeFilter !== "All" || search ? " found" : ""}
        </div>

        {/* Grid — always two columns */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filtered.map((project, i) => (
              <CaseStudyCard key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 gap-4 text-center"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ border: `1px solid ${border}` }}
            >
              <Search size={20} style={{ color: textMuted }} />
            </div>
            <p className="text-[16px]" style={{ color: textMuted }}>
              No projects match your search.
            </p>
            <button
              onClick={() => { setSearch(""); setActiveFilter("All"); }}
              className="text-[16px] underline underline-offset-4 transition-colors"
              style={{ color: textMuted }}
              onMouseEnter={(e) => (e.currentTarget.style.color = textDark)}
              onMouseLeave={(e) => (e.currentTarget.style.color = textMuted)}
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
