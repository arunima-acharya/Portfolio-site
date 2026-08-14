"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";

// The card design used by "Selected Works" on the homepage, extracted so the
// case-studies and research listings render the exact same thing instead of
// re-implementing it. One wide row per card: parallaxed number on a gridded
// panel to the left, content to the right. Flat by design — no border,
// radius or shadow.
//
// `accent` drives the dot, eyebrow, number and arrow. The homepage passes
// nothing and gets the orange default; the listings pass a per-project accent.
export interface WorkCardProps {
  href: string;
  index: number;
  eyebrow: string;
  title: string;
  description: string;
  tags?: string[];
  ariaLabel?: string;
  accent?: string;
  /** Optional meta + call-to-action row beneath the tags. */
  footer?: {
    metaIcon?: React.ReactNode;
    metaText?: string;
    ctaLabel: string;
  };
}

export default function WorkCard({
  href,
  index,
  eyebrow,
  title,
  description,
  tags = [],
  ariaLabel,
  accent = "#ff6f1e",
  footer,
}: WorkCardProps) {
  const { ref: parallaxRef, y: numberY } = useParallax(28);

  return (
    <motion.div
      ref={parallaxRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={href}
        className="group grid md:grid-cols-2 overflow-hidden"
        aria-label={ariaLabel ?? title}
        style={{ background: "var(--sp-cream)" }}
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
          {/* 0x24 ≈ 0.14 alpha — matches the homepage's original rgba() wash. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse 65% 65% at 30% 30%, ${accent}24 0%, transparent 70%)` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              aria-hidden="true"
              className="font-bold select-none"
              style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", color: accent, opacity: 0.16, letterSpacing: "-0.04em", y: numberY }}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>
          </div>
        </div>

        {/* Content panel */}
        <div className="flex flex-col justify-center" style={{ padding: "40px 48px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)", marginBottom: 16 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent, flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: accent }}>
                {eyebrow}
              </span>
            </div>

            <h3 style={{ fontSize: "clamp(22px, 2.6vw, 32px)", fontWeight: 400, color: "#111", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 14, fontFamily: "var(--font-instrument-serif), 'Instrument Serif', serif" }}>
              {title}
            </h3>

            <p style={{ fontSize: 14.5, color: "#666", lineHeight: 1.6, marginBottom: 20 }}>
              {description}
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

            {footer && (
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginTop: "var(--spacing-24)", paddingTop: "var(--spacing-20)", borderTop: "1px solid rgba(0,0,0,0.08)",
              }}>
                {footer.metaText && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "#888" }}>
                    {footer.metaIcon}
                    {footer.metaText}
                  </span>
                )}
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "#555", marginLeft: "auto" }}>
                  <span className="transition-colors duration-200 group-hover:text-[#111]">{footer.ctaLabel}</span>
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: accent }}
                  />
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
