import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, projectHref } from "@/data/projects";

// Design Investigations live on /m/research, not in this grid — same split
// as the desktop /case-studies page.
const caseStudyProjects = projects.filter((p) => p.category !== "Research");

export default function MobileCaseStudies() {
  return (
    <main style={{ padding: "28px 20px 48px" }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: "var(--sp-orange)", fontFamily: "var(--font-geist), sans-serif" }}>
        portfolio
      </span>
      <h1 style={{ fontFamily: "var(--font-gelica)", fontSize: 28, fontWeight: 600, color: "var(--sp-cocoa)", margin: "6px 0 8px" }}>
        case studies
      </h1>
      <p style={{ fontSize: 15, color: "rgba(23,23,23,0.6)", lineHeight: 1.6, margin: "0 0 8px", fontFamily: "var(--font-geist), sans-serif" }}>
        A selection of projects spanning product design, design systems, and UX research.
      </p>
      <p style={{ fontSize: 14, color: "#8a8580", margin: "0 0 24px", fontFamily: "var(--font-geist), sans-serif" }}>
        {caseStudyProjects.length} projects
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {caseStudyProjects.map((project) => (
          <Link
            key={project.id}
            href={projectHref(project)}
            style={{
              display: "block",
              textDecoration: "none",
              border: "1.5px solid var(--sp-charcoal)",
              borderRadius: "var(--radius-cards)",
              padding: "18px 18px 16px",
              background: "var(--sp-cream)",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--sp-orange)", flexShrink: 0 }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--sp-orange)", fontFamily: "var(--font-geist), sans-serif" }}>
                {project.category}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: "var(--font-gelica)", lineHeight: 1.25, margin: 0 }}>
                {project.title.toLowerCase()}
              </h3>
              <ArrowUpRight size={16} style={{ color: "var(--sp-orange)", flexShrink: 0, marginTop: 3 }} />
            </div>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.5, margin: "8px 0 0", fontFamily: "var(--font-geist), sans-serif" }}>
              {project.shortDescription}
            </p>
            {project.tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 12, padding: "4px 10px", borderRadius: 20,
                      color: "#555", border: "1px solid rgba(0,0,0,0.1)", background: "rgba(0,0,0,0.02)",
                      fontFamily: "var(--font-geist), sans-serif",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
