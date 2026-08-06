"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useParallax } from "@/hooks/useParallax";
import dynamic from "next/dynamic";

const Folder = dynamic(() => import("@/components/ui/Folder.jsx"), { ssr: false });

const services = [
  { title: "Product Design",             color: "#c8c8c8" },
  { title: "UX/UI Design",               color: "#c8c8c8" },
  { title: "SaaS & Enterprise Design",   color: "#c8c8c8" },
  { title: "Design Systems",             color: "#c8c8c8" },
  { title: "UX Research",                color: "#c8c8c8" },
  { title: "Design Consulting",          color: "#c8c8c8" },
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function Services() {
  const isMobile = useIsMobile();
  const isLight = true; // this section is always rendered in light mode, regardless of the site-wide theme toggle
  const { ref: parallaxRef, y: headingY } = useParallax(36);

  const cardBg     = isLight ? "#fff" : "#1e1e1e";
  const cardBorder = isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)";
  const textPrimary = isLight ? "#111" : "#fff";

  return (
    <section
      style={{
        padding: isMobile ? "60px 0 80px" : "100px 0 120px",
      }}
    >
      {/* Pill label */}
      <div className="flex justify-center mb-6">
        <span style={{
          background: isLight ? "#111" : "#fff",
          color: isLight ? "#fff" : "#111",
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.04em",
          padding: "6px 18px",
          borderRadius: "9999px",
          fontFamily: "var(--font-inter), sans-serif",
        }}>
          Services
        </span>
      </div>

      {/* Heading — outer div owns the continuous scroll parallax, inner
          motion.h2 keeps its own separate entrance-fade untouched (mixing
          both on one element would fight over the same `y` prop). */}
      <motion.div ref={parallaxRef} style={{ y: headingY }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-4"
          style={{
            fontSize: isMobile ? "34px" : "48px",
            fontWeight: 400,
            fontFamily: "var(--font-instrument-serif), 'Instrument Serif', serif",
            color: textPrimary,
            lineHeight: 1,
            letterSpacing: 0,
          }}
        >
          Tailored Solutions,<br />Impactful Results
        </motion.h2>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="text-center"
        style={{
          fontSize: isMobile ? "14px" : "clamp(14px, 1.4vw, 18px)",
          color: isLight ? "#888" : "rgba(255,255,255,0.45)",
          fontFamily: "var(--font-inter), sans-serif",
          maxWidth: "48ch",
          margin: isMobile ? "0 auto 48px" : "0 auto 80px",
          lineHeight: 1.6,
          paddingLeft: isMobile ? "20px" : 0,
          paddingRight: isMobile ? "20px" : 0,
        }}
      >
        Delivering innovative, results-driven solutions that elevate your brand and product.
      </motion.p>

      {/* folder grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: "12px",
        maxWidth: isMobile ? "100%" : "664px",
        margin: "0 auto",
        paddingLeft: isMobile ? "20px" : 0,
        paddingRight: isMobile ? "20px" : 0,
      }}>
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            data-hover-section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease }}
            style={{
              background: cardBg,
              border: `1px solid ${cardBorder}`,
              borderRadius: "21px",
              padding: isMobile ? "20px 18px 16px" : "24px 21px 18px",
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              alignItems: "center",
              gap: isMobile ? "16px" : "24px",
              boxShadow: isLight
                ? "0 2px 24px rgba(0,0,0,0.06)"
                : "0 2px 24px rgba(0,0,0,0.3)",
              aspectRatio: isMobile ? "auto" : "1",
            }}
          >
            {/* Folder */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: isMobile ? "0 0 auto" : 1, paddingTop: isMobile ? 0 : "20%" }}>
              <Folder color={service.color} size={isMobile ? 1.2 : 1.90} />
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: "15px",
              fontWeight: 500,
              color: textPrimary,
              fontFamily: "var(--font-inter), sans-serif",
              letterSpacing: "-0.01em",
              textAlign: isMobile ? "left" : "center",
            }}>
              {service.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
