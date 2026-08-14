"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const steps = [
  { number: "1", label: "Nice to meet u", title: "Discovery",          rotate: -6,  x: "-5%",  y: "0%"   },
  { number: "2", label: "Welcome",         title: "Onboarding",        rotate:  5,  x: "40%",  y: "-4%"  },
  { number: "3", label: "It all starts with an idea", title: "Strategy & Concept", rotate: -3, x: "18%", y: "28%" },
  { number: "4", label: "Let's get creative",         title: "Design Phase",       rotate: -7, x: "-2%", y: "56%" },
  { number: "5", label: "Goodbye",         title: "Offboarding",       rotate:  6,  x: "42%",  y: "50%"  },
  { number: "6", label: "This is (not) the end",      title: "*Support",           rotate: -4, x: "20%", y: "80%" },
];

export default function Philosophy() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const bg      = isLight ? "#f0ede8" : "#1a1a1a";
  const cardBg  = isLight ? "#fafaf8" : "#242424";
  const border  = isLight ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.10)";
  const text    = isLight ? "#111" : "#fff";
  const muted   = isLight ? "#999" : "#666";

  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: bg }}
      aria-labelledby="process-heading"
    >
      {/* Top meta row */}
      <div
        className="flex items-center justify-between px-8 mb-6 text-[11px] uppercase tracking-[0.18em]"
        style={{ color: muted }}
      >
        <span>How we work together</span>
        <span>©2026</span>
      </div>

      {/* Big heading */}
      <motion.h2
        id="process-heading"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="px-8 leading-none font-black"
        style={{
          fontSize: "clamp(72px, 18vw, 180px)",
          color: text,
          letterSpacing: "-0.04em",
          lineHeight: 0.9,
        }}
      >
        Process
      </motion.h2>

      {/* Scattered cards */}
      <div className="relative mx-8 mt-10" style={{ height: "clamp(420px, 60vw, 680px)" }}>
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 24, rotate: step.rotate * 0.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: step.rotate }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              left: step.x,
              top: step.y,
              background: cardBg,
              border: `1.5px solid ${border}`,
              borderRadius: "var(--radius-xl)",
              padding: "12px 18px 14px",
              minWidth: "clamp(150px, 22vw, 220px)",
              boxShadow: isLight
                ? "0 2px 16px rgba(0,0,0,0.07)"
                : "0 2px 16px rgba(0,0,0,0.35)",
            }}
          >
            {/* Step number dot */}
            <div
              className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{ background: "#e8c0d0", color: "#a0506a" }}
            >
              {step.number}
            </div>
            <p
              className="text-[10px] mb-1.5"
              style={{ color: muted, fontStyle: "italic" }}
            >
              {step.label}
            </p>
            <p
              className="font-bold leading-tight"
              style={{
                fontSize: "clamp(18px, 2.8vw, 28px)",
                color: text,
                fontStyle: step.title.startsWith("*") ? "italic" : "normal",
              }}
            >
              {step.title}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex items-center justify-between px-8 mt-12"
      >
        <span
          className="text-[11px] uppercase tracking-[0.18em]"
          style={{ color: muted }}
        >
          Step by step
        </span>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ border: `1.5px solid ${border}`, color: text }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
