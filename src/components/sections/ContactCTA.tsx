"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function ContactCTA() {
  const { ref, isInView } = useScrollAnimation(0.15);

  return (
    <section
      className="py-24 md:py-32 border-t border-black/5"
      aria-labelledby="contact-cta-heading"
      style={{
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="mailto:ishaankausik@gmail.com"
            id="contact-cta-heading"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "#111",
              fontFamily: "var(--font-inter), sans-serif",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              textDecoration: "none",
              marginBottom: "24px",
              transition: "color 0.18s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#e8510a")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#111")}
          >
            Have a project in mind?
            <ArrowRight
              style={{ width: "clamp(1.5rem, 3.5vw, 2.5rem)", height: "clamp(1.5rem, 3.5vw, 2.5rem)", flexShrink: 0 }}
              strokeWidth={2}
            />
          </Link>

          <p
            style={{
              fontSize: "clamp(0.9rem, 1.4vw, 1rem)",
              color: "#666",
              lineHeight: 1.7,
              fontFamily: "var(--font-inter), sans-serif",
              maxWidth: 400,
            }}
          >
            I&apos;m available for select freelance projects and full-time
            opportunities. Get in touch to discuss your project.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
