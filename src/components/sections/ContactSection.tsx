"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function ContactSection() {
  const isMobile = useIsMobile();

  return (
    <section
      style={{
        backgroundColor: "#0a0a0a",
        paddingTop: isMobile ? "60px" : "100px",
        paddingBottom: isMobile ? "60px" : "100px",
        paddingLeft: isMobile ? "20px" : "15%",
        paddingRight: isMobile ? "20px" : "15%",
      }}
    >
      <motion.p {...fadeUp(0)} style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-manrope), sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "20px" }}>
        Contact
      </motion.p>

      <motion.h2 {...fadeUp(0.06)} style={{ fontSize: isMobile ? "32px" : "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.12, letterSpacing: "-0.03em", color: "#f0f0f0", fontFamily: "var(--font-manrope), sans-serif", marginBottom: "20px" }}>
        Let&apos;s build your<br />plan together!
      </motion.h2>

      <motion.p {...fadeUp(0.1)} style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-manrope), sans-serif", lineHeight: 1.75, maxWidth: "58ch", marginBottom: "36px" }}>
        Have a question about my work or a project you&apos;d like to collaborate on?
        Reach out — I&apos;ll help you find your next step forward.
      </motion.p>
    </section>
  );
}
