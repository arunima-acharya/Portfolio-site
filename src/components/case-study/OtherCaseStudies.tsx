"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projects, projectHref } from "@/data/projects";
import type { Project } from "@/types";

const FONT = "var(--font-manrope), sans-serif";
const MAX_W = "1200px";
const CARD_ACCENTS = ["#a78bfa", "#2856A2", "#34d399", "#60a5fa"];

const revealStyle = (visible: boolean, delay = 0): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(28px)",
  transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
});

function CaseStudyCard({ project, index, delay, revealed }: { project: Project; index: number; delay: number; revealed: boolean }) {
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={projectHref(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        transform: hovered ? "scale(1.02)" : "scale(1)",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
        ...revealStyle(revealed, delay),
      }}
    >
      {/* Image area — 4:3 */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", background: "#f5f5f3", overflow: "hidden" }}>
        {/* Blurred blob */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 220, height: 220, borderRadius: "50%", background: accent, opacity: 0.3, filter: "blur(56px)" }} />
        </div>
        {/* Industry label */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{
            fontFamily: FONT, fontSize: 10, fontWeight: 500, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "rgba(0,0,0,0.18)",
          }}>{project.industry}</span>
        </div>
        {/* Floating info bar */}
        <div style={{
          position: "absolute", bottom: 10, left: 10, right: 10,
          background: "rgba(255,255,255,0.92)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
          borderRadius: 12, padding: "12px 14px",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10,
        }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: "#111", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {project.title}
            </p>
            <p style={{ fontFamily: FONT, fontSize: 11, color: "#888", marginTop: 2 }}>
              {project.category} / 2023
            </p>
          </div>
          <div style={{
            flexShrink: 0, width: 32, height: 32, borderRadius: 8,
            background: hovered ? "#e8510a" : "#1a1a1a",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s", overflow: "hidden",
          }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
    <section ref={ref} style={{ background: "#fff", padding: "80px 32px 15%" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 48, ...revealStyle(revealed) }}>
          <p style={{ fontFamily: FONT, fontSize: 13, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>More work</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
            <h2 style={{ fontFamily: "var(--font-instrument-serif), 'Instrument Serif', serif", fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 400, color: "#111", lineHeight: 1.2 }}>Other case studies</h2>
            <Link
              href="/case-studies"
              style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: "#6b7280", textDecoration: "none", whiteSpace: "nowrap", paddingBottom: 4 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#111")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
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
