import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedProjects, projectHref } from "@/data/projects";

const SERVICES = ["Product Design", "UX/UI Design", "SaaS & Enterprise", "Design Systems", "UX Research", "Design Consulting"];

// Desktop shows these as illustrated sticky notes on a 3D flip-book
// notebook. Mobile skips the notebook + decorative stickers entirely (too
// heavy/novelty for a phone) and just lists the same content as plain
// stacked cards, top to bottom.
const EXPERTISE = [
  {
    title: "Product Design",
    items: ["End-to-End Product Design", "Interaction Design", "Wireframing", "Prototyping", "Visual Design", "Information Architecture"],
  },
  {
    title: "Research & Testing",
    items: ["User Research", "Usability Testing", "Heuristic Evaluation", "User Personas", "Journey Mapping"],
  },
  {
    title: "Systems & Strategy",
    items: ["Design Systems (25 → 50+ components)", "Accessibility (WCAG)", "Product Strategy", "Zero-to-One Design", "Data-Informed Design"],
  },
  {
    title: "Collaboration",
    items: ["Cross-Functional Collaboration", "Developer Handoff", "Agile / Scrum", "Stakeholder Management"],
  },
];

export default function MobileHome() {
  const projects = getFeaturedProjects().slice(0, 4);

  return (
    <main style={{ paddingBottom: 48 }}>
      {/* Hero */}
      <section style={{ padding: "32px 20px 8px" }}>
        <span
          style={{
            display: "inline-block",
            background: "var(--sp-cream)",
            color: "var(--sp-charcoal)",
            border: "1.5px solid var(--sp-charcoal)",
            fontSize: 13,
            fontWeight: 500,
            padding: "5px 14px",
            borderRadius: "var(--radius-2xl-2)",
            fontFamily: "var(--font-geist), sans-serif",
            marginBottom: "var(--spacing-16)",
          }}
        >
          hi, i&apos;m arunima
        </span>
        <h1
          style={{
            fontFamily: "var(--font-gelica)",
            fontSize: 34,
            fontWeight: 600,
            lineHeight: 1.1,
            color: "var(--sp-cocoa)",
            margin: "0 0 14px",
          }}
        >
          designing products people actually use
        </h1>
        <p
          style={{
            fontFamily: "var(--font-geist), sans-serif",
            fontSize: 16,
            lineHeight: 1.6,
            color: "rgba(23,23,23,0.6)",
            margin: "0 0 24px",
          }}
        >
          Engineer turned Senior Product Designer with 3+ years designing enterprise SaaS and AI products across hospitality, HRMS, and analytics.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link
            href="/m/case-studies"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "var(--sp-cream)", color: "var(--sp-charcoal)",
              border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-2xl-2)",
              padding: "12px 20px", fontSize: 15, fontWeight: 500,
              fontFamily: "var(--font-gelica)", textDecoration: "none",
              boxShadow: "var(--shadow-subtle)",
            }}
          >
            View my work
          </Link>
          <Link
            href="/m/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "transparent", color: "var(--sp-charcoal)",
              border: "1px solid rgba(23,23,23,0.2)", borderRadius: "var(--radius-2xl-2)",
              padding: "12px 20px", fontSize: 15, fontWeight: 500,
              fontFamily: "var(--font-gelica)", textDecoration: "none",
            }}
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* Featured work */}
      <section style={{ padding: "36px 20px 8px" }}>
        <h2
          style={{
            fontFamily: "var(--font-gelica)",
            fontSize: 22,
            fontWeight: 600,
            color: "var(--sp-cocoa)",
            margin: "0 0 16px",
          }}
        >
          selected work
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {projects.map((project) => (
            <Link
              key={project.id}
              href={projectHref(project)}
              style={{
                display: "block",
                textDecoration: "none",
                border: "1.5px solid var(--sp-charcoal)",
                borderRadius: "var(--radius-xl)",
                padding: "18px 18px 16px",
                background: "var(--sp-cream)",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)", marginBottom: 8 }}>
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
            </Link>
          ))}
        </div>
        <Link
          href="/m/case-studies"
          style={{
            display: "block", textAlign: "center", marginTop: 18,
            fontSize: 15, fontWeight: 500, color: "var(--sp-charcoal)",
            fontFamily: "var(--font-gelica)", textDecoration: "none",
            border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-2xl-2)",
            padding: "12px 0", background: "var(--sp-cream)",
          }}
        >
          view all case studies
        </Link>
      </section>

      {/* Services */}
      <section style={{ padding: "36px 20px 8px" }}>
        <h2
          style={{
            fontFamily: "var(--font-gelica)",
            fontSize: 22,
            fontWeight: 600,
            color: "var(--sp-cocoa)",
            margin: "0 0 16px",
          }}
        >
          services
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {SERVICES.map((s) => (
            <span
              key={s}
              style={{
                fontSize: 14, fontWeight: 500, color: "var(--sp-charcoal)",
                background: "var(--sp-cream)", border: "1.5px solid var(--sp-charcoal)",
                borderRadius: "var(--radius-2xl-2)", padding: "8px 14px", fontFamily: "var(--font-geist), sans-serif",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* What I bring to the table — same content as the desktop notebook's
          sticky notes, without the notebook/stickers: plain cards stacked
          top to bottom. */}
      <section style={{ padding: "36px 20px 8px" }}>
        <h2
          style={{
            fontFamily: "var(--font-gelica)",
            fontSize: 22,
            fontWeight: 600,
            color: "var(--sp-cocoa)",
            margin: "0 0 16px",
          }}
        >
          what i bring to the table
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {EXPERTISE.map((group) => (
            <div
              key={group.title}
              style={{
                border: "1.5px solid var(--sp-charcoal)",
                borderRadius: "var(--radius-cards)",
                padding: "18px 18px 16px",
                background: "var(--sp-cream)",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-gelica)", fontSize: 17, fontWeight: 600, color: "var(--sp-cocoa)", margin: "0 0 10px" }}>
                {group.title}
              </h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                {group.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: 8,
                      fontSize: 14, color: "rgba(23,23,23,0.75)", lineHeight: 1.5,
                      fontFamily: "var(--font-geist), sans-serif",
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--sp-orange)", flexShrink: 0, marginTop: 7 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{ padding: "40px 20px 0" }}>
        <div
          style={{
            border: "1.5px solid var(--sp-charcoal)",
            borderRadius: "var(--radius-xl)",
            padding: "28px 22px",
            background: "var(--sp-orange)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontFamily: "var(--font-gelica)", fontSize: 22, fontWeight: 600, color: "var(--sp-charcoal)", margin: "0 0 10px" }}>
            let&apos;s work together
          </h2>
          <p style={{ fontSize: 15, color: "rgba(23,23,23,0.75)", margin: "0 0 20px", fontFamily: "var(--font-geist), sans-serif" }}>
            Have a project in mind? I&apos;d love to hear about it.
          </p>
          <Link
            href="/m/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "var(--sp-cream)", color: "var(--sp-charcoal)",
              border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-2xl-2)",
              padding: "12px 24px", fontSize: 15, fontWeight: 500,
              fontFamily: "var(--font-gelica)", textDecoration: "none",
            }}
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
