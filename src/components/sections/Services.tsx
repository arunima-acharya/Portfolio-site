"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
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

  const cardBg     = isLight ? "var(--sp-cream)" : "#1e1e1e";
  const cardBorder = isLight ? "var(--sp-charcoal)" : "rgba(255,255,255,0.06)";
  const textPrimary = isLight ? "var(--sp-charcoal)" : "#fff";

  return (
    <section
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: isMobile ? "40px 0" : "60px 0",
      }}
    >
      {/* Pill label */}
      <div className="flex justify-center" style={{ marginBottom: isMobile ? "20px" : "28px" }}>
        <span style={{
          background: isLight ? "var(--sp-cream)" : "#fff",
          color: isLight ? "var(--sp-charcoal)" : "#111",
          border: isLight ? "1.5px solid var(--sp-charcoal)" : "none",
          fontSize: "13px",
          fontWeight: 500,
          letterSpacing: "0.04em",
          padding: "6px 18px",
          borderRadius: "20px",
          fontFamily: "var(--font-geist), sans-serif",
        }}>
          Services
        </span>
      </div>

      <div style={{ marginBottom: isMobile ? "20px" : "28px" }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center"
          style={{
            fontSize: isMobile ? "34px" : "48px",
            fontWeight: 600,
            fontFamily: "var(--font-fraunces), serif",
            color: "var(--sp-cocoa)",
            textTransform: "lowercase",
            lineHeight: 1,
            letterSpacing: 0,
          }}
        >
          Tailored Solutions,<br />Impactful Results
        </motion.h2>
      </div>

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
          fontFamily: "var(--font-geist), sans-serif",
          maxWidth: "48ch",
          margin: isMobile ? "0 auto 48px" : "0 auto 80px",
          lineHeight: 1.6,
          paddingLeft: isMobile ? "20px" : 0,
          paddingRight: isMobile ? "20px" : 0,
        }}
      >
        Delivering innovative, results-driven solutions that elevate your brand and product.
      </motion.p>

      {/* folder grid — always 2 columns, incl. mobile. Uses a real Tailwind
          grid-cols-2 class rather than inline gridTemplateColumns so the
          global mobile grid-collapse safety net (globals.css) can't force
          it back to 1 column — that net only matches inline styles. */}
      <div className="grid grid-cols-2" style={{
        gap: isMobile ? "10px" : "12px",
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
              border: isLight ? `1.5px solid ${cardBorder}` : `1px solid ${cardBorder}`,
              borderRadius: "12px",
              padding: isMobile ? "16px 14px 14px" : "24px 21px 18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: isMobile ? "14px" : "24px",
              boxShadow: isLight
                ? "rgba(0, 0, 0, 0.06) 0px 2px 20px 0px"
                : "0 2px 24px rgba(0,0,0,0.3)",
              aspectRatio: "1",
            }}
          >
            {/* Folder */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, paddingTop: isMobile ? "12%" : "20%" }}>
              <Folder color={service.color} size={isMobile ? 1.1 : 1.5} />
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: isMobile ? "13px" : "15px",
              fontWeight: 500,
              color: textPrimary,
              fontFamily: "var(--font-geist), sans-serif",
              letterSpacing: "-0.01em",
              textAlign: "center",
            }}>
              {service.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
