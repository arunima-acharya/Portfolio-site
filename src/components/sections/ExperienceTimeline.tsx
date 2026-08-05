"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const rows = [
  {
    id: "1",
    initials: "HX",
    bg: "#0052CC",
    company: "Hotelogix",
    role: "Product UX Designer",
    period: "Jul 2025 – Present",
  },
  {
    id: "2",
    initials: "HX",
    bg: "#0052CC",
    company: "Hotelogix",
    role: "Junior Product UX Designer",
    period: "Jun 2023 – Jul 2025",
  },
  {
    id: "3",
    initials: "DC",
    bg: "#111",
    company: "Design Consulting",
    role: "Independent Consultant",
    period: "2023 – Present",
  },
];

const font = "var(--font-manrope), sans-serif";

export default function ExperienceTimeline() {
  const { ref, isInView } = useScrollAnimation(0.1);

  return (
    <section
      className="py-24 md:py-32 border-b border-black/8"
      aria-labelledby="experience-heading"
      style={{
        marginLeft: "calc(-1 * var(--gutter))",
        marginRight: "calc(-1 * var(--gutter))",
        paddingLeft: "20%",
        paddingRight: "var(--gutter)",
      }}
    >
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            gap: "clamp(48px, 8vw, 120px)",
          }}
        >
          {/* Left — heading */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "sticky", top: "120px", flexShrink: 0 }}
          >
            {/* Label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                fontSize: "11px",
                fontWeight: 600,
                color: "#888",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: font,
                marginBottom: "22px",
              }}
            >
              <span style={{ display: "inline-block", width: "7px", height: "7px", background: "#888", borderRadius: "1px", flexShrink: 0 }} />
              Experience
            </div>

            {/* Heading */}
            <h2
              id="experience-heading"
              style={{
                fontSize: "clamp(2rem, 3.8vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                fontFamily: font,
                margin: 0,
                color: "#111",
              }}
            >
              Experience That
              <br />
              Builds{" "}
              <span style={{ color: "#bbb" }}>Trust</span>
            </h2>
          </motion.div>

          {/* Right — rows */}
          <div style={{ width: "clamp(288px, 45%, 558px)" }}>
            {rows.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.45,
                  delay: 0.1 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                  padding: "24px 0",
                  borderBottom: "1px solid rgba(0,0,0,0.09)",
                  ...(i === 0 ? { borderTop: "1px solid rgba(0,0,0,0.09)" } : {}),
                }}
              >
                {/* Rounded-square avatar */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "10px",
                    background: item.bg,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#fff",
                    fontFamily: font,
                    letterSpacing: "0.04em",
                  }}
                >
                  {item.initials}
                </div>

                {/* Company + role */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#111",
                      fontFamily: font,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.company}
                  </p>
                  <p
                    style={{
                      margin: "3px 0 0",
                      fontSize: "13px",
                      fontWeight: 400,
                      color: "#888",
                      fontFamily: font,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.role}
                  </p>
                </div>

                {/* Period */}
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#888",
                    fontFamily: font,
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.period}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
