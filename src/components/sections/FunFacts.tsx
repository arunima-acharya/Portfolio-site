"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function FunFacts() {
  const { ref, isInView } = useScrollAnimation(0.1);

  return (
    <section
      className="py-24 md:py-32 border-b border-black/8"
      aria-labelledby="notes-heading"
      style={{
        marginLeft: "calc(-1 * var(--gutter))",
        marginRight: "calc(-1 * var(--gutter))",
        paddingLeft: "var(--gutter)",
        paddingRight: "var(--gutter)",
      }}
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Label + subtitle */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "36px" }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "11px",
              fontWeight: 500,
              color: "#888",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontFamily: "var(--font-manrope), sans-serif",
              marginBottom: "var(--spacing-12)",
            }}
          >
            ★ Personal Notes
          </span>
          <p
            id="notes-heading"
            style={{
              fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
              color: "#444",
              fontFamily: "var(--font-manrope), sans-serif",
              margin: 0,
            }}
          >
            A few things that define me beyond design.
          </p>
        </motion.div>

        {/* Photo grid: left col (2 stacked) + right col (1 tall) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "auto",
            gap: "var(--spacing-12)",
            alignItems: "stretch",
          }}
        >
          {/* Left column — 2 stacked images */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12)" }}>
            {/* Books */}
            <div
              style={{
                position: "relative",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                aspectRatio: "16/9",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1589998059171-988d887df646?w=800&q=80"
                alt="Laws of UX book"
                fill
                style={{ objectFit: "cover" }}
                sizes="50vw"
              />
              <Caption text="Currently Reading Laws of UX" />
            </div>

            {/* Football */}
            <div
              style={{
                position: "relative",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                aspectRatio: "16/9",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&q=80"
                alt="Football on a pitch"
                fill
                style={{ objectFit: "cover" }}
                sizes="50vw"
              />
              <Caption text="Love playing Football" />
            </div>
          </div>

          {/* Right column — 1 tall image */}
          <div
            style={{
              position: "relative",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              minHeight: "400px",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1587474260584-136574528ed5?w=900&q=80"
              alt="New Delhi cityscape"
              fill
              style={{ objectFit: "cover" }}
              sizes="50vw"
            />
            <Caption text="Currently Based in New Delhi, India" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Caption({ text }: { text: string }) {
  return (
    <>
      {/* gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 45%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
      {/* caption pill */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          left: "16px",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(6px)",
          borderRadius: "var(--radius-lg)",
          padding: "6px 14px",
          fontSize: "13px",
          fontWeight: 500,
          color: "#111",
          fontFamily: "var(--font-manrope), sans-serif",
          lineHeight: 1.4,
          pointerEvents: "none",
        }}
      >
        {text}
      </div>
    </>
  );
}
