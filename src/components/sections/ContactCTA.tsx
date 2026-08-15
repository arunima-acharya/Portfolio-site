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
        paddingLeft: "var(--gutter)",
        paddingRight: "var(--gutter)",
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
            href="mailto:arunimaacharya17@gmail.com"
            id="contact-cta-heading"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--spacing-16)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 600,
              color: "var(--sp-cocoa)",
              fontFamily: "var(--font-gelica)",
              letterSpacing: "normal",
              lineHeight: 1.15,
              textDecoration: "none",
              marginBottom: "var(--spacing-24)",
              transition: "color 0.18s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sp-orange)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sp-cocoa)")}
          >
            Have a project in mind?
            <ArrowRight
              style={{ width: "clamp(1.5rem, 3.5vw, 2.5rem)", height: "clamp(1.5rem, 3.5vw, 2.5rem)", flexShrink: 0 }}
              strokeWidth={2}
            />
          </Link>

          <p
            style={{
              fontSize: "16px",
              color: "#666",
              lineHeight: 1.7,
              fontFamily: "var(--font-geist), sans-serif",
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
