"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projects, projectHref } from "@/data/projects";
import { stickerTint } from "@/data/stickerPalette";
import type { Project } from "@/types";

const FONT = "var(--font-geist), sans-serif";
const FONT_HEADING = "var(--font-gelica)";
const MAX_W = "1200px";

const revealStyle = (visible: boolean, delay = 0): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(28px)",
  transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
});

function CaseStudyCard({ project, index, delay, revealed }: { project: Project; index: number; delay: number; revealed: boolean }) {
  const { accent } = stickerTint(index);
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={projectHref(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        position: "relative",
        border: "1.5px solid var(--sp-charcoal)",
        boxShadow: "var(--shadow-lg)",
        transform: hovered ? "scale(1.02)" : "scale(1)",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
        ...revealStyle(revealed, delay),
      }}
    >
      {/* Image area — 4:3 */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", background: "var(--sp-dew)", overflow: "hidden" }}>
        {/* Blurred blob */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 220, height: 220, borderRadius: "50%", background: accent, opacity: 0.25, filter: "blur(56px)" }} />
        </div>
        {/* Industry label */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{
            fontFamily: FONT, fontSize: 16, fontWeight: 500,
            textTransform: "lowercase", color: "rgba(23,23,23,0.16)",
          }}>{project.industry}</span>
        </div>
        {/* Floating info bar */}
        <div style={{
          position: "absolute", bottom: 10, left: 10, right: 10,
          background: "rgba(253,251,249,0.92)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(23,23,23,0.1)",
          borderRadius: "var(--radius-xl)", padding: "12px 14px",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10,
        }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontFamily: FONT, fontSize: 16, fontWeight: 600, color: "var(--sp-charcoal)", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {project.title}
            </p>
            <p style={{ fontFamily: FONT, fontSize: 16, color: "#8a8580", marginTop: 2 }}>
              {project.category} / 2023
            </p>
          </div>
          <div style={{
            flexShrink: 0, width: 32, height: 32, borderRadius: "var(--radius-lg)",
            background: hovered ? "var(--sp-orange)" : "var(--sp-charcoal)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s", overflow: "hidden",
          }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" stroke="var(--sp-cream)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function OtherCaseStudies({ currentSlug }: { currentSlug: string }) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRevealed(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const others = projects.filter((p) => p.slug !== currentSlug).slice(0, 3);
  if (!others.length) return null;

  return (
    <section ref={ref} style={{ background: "var(--sp-cream)", padding: "80px 32px 15%" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "var(--spacing-48)", ...revealStyle(revealed) }}>
          <p style={{ fontFamily: FONT, fontSize: 16, color: "#8a8580", marginBottom: 10 }}>more work</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
            <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 600, fontSize: "clamp(28px,3.5vw,40px)", color: "var(--sp-cocoa)", lineHeight: 1.2 }}>other case studies</h2>
            <Link
              href="/case-studies"
              style={{ fontFamily: FONT, fontSize: 16, fontWeight: 600, color: "#8a8580", textDecoration: "none", whiteSpace: "nowrap", paddingBottom: 4 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sp-charcoal)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8a8580")}
            >View all →</Link>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {others.map((p, i) => (
            <CaseStudyCard key={p.slug} project={p} index={i} delay={80 + i * 80} revealed={revealed} />
          ))}
        </div>
      </div>
    </section>
  );
}
