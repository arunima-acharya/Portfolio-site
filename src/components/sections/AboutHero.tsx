"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section
      className="pt-36 pb-20 border-b border-black/8"
      aria-label="About hero"
      style={{
        marginLeft: "calc(-1 * var(--gutter))",
        marginRight: "calc(-1 * var(--gutter))",
        paddingLeft: "var(--gutter)",
        paddingRight: "var(--gutter)",
      }}
    >
      <div className="max-w-screen-xl mx-auto">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 8vw, 120px)",
            alignItems: "start",
          }}
        >
          {/* Left — heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 700,
              color: "#111",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              fontFamily: "var(--font-manrope), sans-serif",
              margin: 0,
            }}
          >
            A Bit<br />About Me
          </motion.h1>

          {/* Right — text + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <p
              style={{
                fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
                color: "#444",
                lineHeight: 1.75,
                fontFamily: "var(--font-manrope), sans-serif",
                margin: "0 0 28px",
              }}
            >
              I&apos;m Arunima Acharya, a Product Designer with experience creating enterprise and consumer-facing digital products. I specialize in translating complex business challenges into intuitive user experiences through research, systems thinking, and thoughtful design. From building design systems and leading cross-functional teams to crafting end-to-end product experiences, I focus on creating solutions that are both impactful for businesses and effortless for users.
            </p>

            <Link
              href="mailto:arunimaacharya17@gmail.com"
              className="group"
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--spacing-8)",
                background: "#111",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "var(--font-manrope), sans-serif",
                padding: "11px 22px",
                borderRadius: "9999px",
                textDecoration: "none",
                letterSpacing: "0.01em",
                border: "1.5px solid #111",
                transition: "background 0.18s, color 0.18s",
              }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color = "#111";
              }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#111";
                (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
              }}
            >
              Get in Touch <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
