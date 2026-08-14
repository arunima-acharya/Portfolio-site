"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    label: "Higher ROI",
    value: "76%",
    description: "Trimmed ad spend via segmentation",
    wide: true,
  },
  {
    label: "Faster Conversions",
    value: "91%",
    description: "Removed redundant tools",
    wide: false,
  },
  {
    label: "Better Efficiency",
    value: "69%",
    description: "Optimized bidding costs",
    wide: false,
  },
];

const avatars = [
  "https://i.pravatar.cc/32?img=1",
  "https://i.pravatar.cc/32?img=2",
  "https://i.pravatar.cc/32?img=3",
  "https://i.pravatar.cc/32?img=4",
  "https://i.pravatar.cc/32?img=5",
];

function GreenSquareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect width="18" height="18" rx="4" fill="#22c55e"/>
      <rect x="4" y="4" width="4" height="4" rx="1" fill="#fff"/>
      <rect x="10" y="4" width="4" height="4" rx="1" fill="#fff"/>
      <rect x="4" y="10" width="4" height="4" rx="1" fill="#fff"/>
      <rect x="10" y="10" width="4" height="4" rx="1" fill="#fff"/>
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="7" width="2.5" height="6" rx="1" fill="#22c55e"/>
      <rect x="5.5" y="4" width="2.5" height="9" rx="1" fill="#22c55e"/>
      <rect x="10" y="1" width="2.5" height="12" rx="1" fill="#22c55e"/>
    </svg>
  );
}

export default function StatsSection({ dark = false }: { dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });

  const bg        = dark ? "#000"                      : "#fff";
  const cardBg    = dark ? "#111"                      : "#f4f4f4";
  const textPri   = dark ? "#fff"                      : "#0a0a0a";
  const textMuted = dark ? "rgba(255,255,255,0.45)"    : "#888";
  const textBody  = dark ? "rgba(255,255,255,0.6)"     : "#666";
  const border    = dark ? "rgba(255,255,255,0.06)"    : "rgba(0,0,0,0.06)";
  const pillBg    = dark ? "rgba(255,255,255,0.08)"    : "#f0f0f0";
  const pillBorder= dark ? "rgba(255,255,255,0.12)"    : "rgba(0,0,0,0.1)";
  const pillText  = dark ? "rgba(255,255,255,0.8)"     : "#333";

  return (
    <section
      style={{
        backgroundColor: bg,
        paddingTop: "80px",
        paddingBottom: "80px",
        paddingLeft: "15%",
        paddingRight: "15%",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        ref={ref}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.3fr",
          gap: "var(--spacing-64)",
          alignItems: "start",
        }}
      >
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "420px" }}
        >
          {/* Top group */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-20)" }}>
            {/* Pill label */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "9999px",
              background: pillBg,
              border: `1px solid ${pillBorder}`,
              width: "fit-content",
            }}>
              <ChartIcon />
              <span style={{ fontSize: "13px", fontWeight: 500, color: pillText }}>
                Performance stats
              </span>
            </div>

            {/* Heading */}
            <h2 style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: textPri,
              margin: 0,
            }}>
              Proven by leading<br />sales teams
            </h2>

            {/* Body */}
            <p style={{ fontSize: "15px", lineHeight: 1.6, color: textBody, margin: 0 }}>
              Increase lead quality and close deals faster through smarter workflows.
            </p>

            {/* CTA link */}
            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#22c55e",
                textDecoration: "none",
              }}
            >
              Explore the full demo
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Bottom text + avatars — pushed to bottom */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <p style={{ fontSize: "13px", lineHeight: 1.6, color: textBody, margin: 0 }}>
              <strong style={{ color: textPri, fontWeight: 600 }}>All in real time,</strong>{" "}
              capture leads, track performance, and scale winning strategies.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ display: "flex" }}>
                {avatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    width={28}
                    height={28}
                    style={{
                      borderRadius: "50%",
                      border: `2px solid ${bg}`,
                      marginLeft: i === 0 ? 0 : "-8px",
                      objectFit: "cover",
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: "13px", color: textMuted }}>— rated 4.8/5</span>
            </div>
          </div>
        </motion.div>

        {/* Right column — stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12)" }}
        >
          {/* Wide top card */}
          <div style={{
            background: cardBg,
            border: `1px solid ${border}`,
            borderRadius: "var(--radius-2xl)",
            padding: "28px 32px",
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-40)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)" }}>
              <GreenSquareIcon />
              <span style={{ fontSize: "14px", fontWeight: 500, color: textPri }}>
                {stats[0].label}
              </span>
            </div>
            <div>
              <div style={{ fontSize: "clamp(52px, 6vw, 72px)", fontWeight: 700, letterSpacing: "-0.04em", color: textPri, lineHeight: 1 }}>
                {stats[0].value}
              </div>
              <div style={{ fontSize: "14px", color: textMuted, marginTop: "10px" }}>
                {stats[0].description}
              </div>
            </div>
          </div>

          {/* Two smaller cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--spacing-12)" }}>
            {stats.slice(1).map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: cardBg,
                  border: `1px solid ${border}`,
                  borderRadius: "var(--radius-2xl)",
                  padding: "24px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--spacing-32)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)" }}>
                  <GreenSquareIcon />
                  <span style={{ fontSize: "13px", fontWeight: 500, color: textPri }}>
                    {stat.label}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: "clamp(40px, 5vw, 60px)", fontWeight: 700, letterSpacing: "-0.04em", color: textPri, lineHeight: 1 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "13px", color: textMuted, marginTop: "var(--spacing-8)" }}>
                    {stat.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
