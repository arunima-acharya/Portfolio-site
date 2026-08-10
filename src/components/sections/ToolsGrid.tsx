"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useParallax } from "@/hooks/useParallax";

const tools = [
  { name: "Figma",     category: "UI Design",          slug: "figma",     bg: "#1E1E1E", color: "#fff" },
  { name: "Framer",    category: "Prototyping",         slug: "framer",    bg: "#0A0A0A", color: "#fff" },
  { name: "Notion",    category: "Project Management",  slug: "notion",    bg: "#fff",    color: "#111", border: true },
  { name: "Miro",      category: "Whiteboarding",       slug: "miro",      bg: "#FFD02F", color: "#111" },
  { name: "Jira",      category: "Project Tracking",    slug: "jira",      bg: "#0052CC", color: "#fff" },
  { name: "HubSpot",   category: "CRM & Analytics",     slug: "hubspot",   bg: "#FF7A59", color: "#fff" },
  { name: "Sketch",    category: "UI Design",           slug: "sketch",    bg: "#F7B500", color: "#fff" },
  { name: "Maze",      category: "User Testing",        slug: "maze",      bg: "#6C47FF", color: "#fff" },
  { name: "Zeplin",    category: "Design Handoff",      slug: "zeplin",    bg: "#FDBD39", color: "#111" },
];

function CardInner({ tool, isMobile, nameColor, catColor }: { tool: typeof tools[0]; isMobile: boolean; nameColor: string; catColor: string }) {
  return (
    <>
      <div
        style={{
          width: isMobile ? 52 : 40,
          height: isMobile ? 52 : 40,
          borderRadius: isMobile ? "12px" : "8px",
          background: tool.bg,
          border: tool.border ? "1px solid rgba(0,0,0,0.1)" : undefined,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://cdn.simpleicons.org/${tool.slug}/${tool.color.replace("#", "")}`}
          alt={tool.name}
          width={isMobile ? 26 : 20}
          height={isMobile ? 26 : 20}
          style={{ display: "block" }}
          onError={(e) => {
            const img = e.currentTarget;
            img.style.display = "none";
            const parent = img.parentElement;
            if (parent) {
              const span = document.createElement("span");
              span.textContent = tool.name.slice(0, 2).toUpperCase();
              span.style.cssText = `font-size:13px;font-weight:700;color:${tool.color};letter-spacing:-0.5px`;
              parent.appendChild(span);
            }
          }}
        />
      </div>
      <div style={{ textAlign: isMobile ? "center" : "left" }}>
        <p style={{ margin: 0, fontSize: isMobile ? "16px" : "15px", fontWeight: 600, color: nameColor, fontFamily: "var(--font-geist), sans-serif", lineHeight: 1.3 }}>
          {tool.name}
        </p>
        <p style={{ margin: "3px 0 0", fontSize: isMobile ? "16px" : "16px", color: catColor, fontFamily: "var(--font-geist), sans-serif", lineHeight: 1.3 }}>
          {tool.category}
        </p>
      </div>
    </>
  );
}

export default function ToolsGrid() {
  const { ref, isInView } = useScrollAnimation(0.1);
  const isMobile = useIsMobile();
  const isLight = true; // this section is always rendered in light mode, regardless of the site-wide theme toggle
  const { ref: parallaxRef, y: headingY } = useParallax(30);

  const cardBg     = "var(--sp-cream)";
  const cardBorder = isLight ? "var(--sp-charcoal)" : "rgba(255,255,255,0.07)";
  const nameColor  = isLight ? "var(--sp-charcoal)" : "#f0f0f0";
  const catColor   = isLight ? "#8a8580"            : "rgba(255,255,255,0.4)";

  // 9 tools is a clean 3x3 on desktop, but an odd number leaves a lone
  // orphaned card on the last row of a 2-up mobile grid — drop the last
  // one (Zeplin) on mobile so it stays a clean 4x2.
  const visibleTools = isMobile ? tools.filter((t) => t.slug !== "zeplin") : tools;

  return (
    <section
      className="py-24 md:py-32 border-t border-black/5"
      aria-labelledby="tools-heading"
      style={{
        paddingLeft: isMobile ? "20px" : "15%",
        paddingRight: isMobile ? "20px" : "15%",
        backgroundColor: "var(--sp-cream)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%" }}>
        {/* Heading — outer div owns the continuous scroll parallax, inner
            motion.div keeps its own separate entrance-fade untouched. */}
        <motion.div ref={parallaxRef} style={{ y: headingY }}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3 mb-14"
          >
            <span className="text-[16px] font-medium text-zinc-500 uppercase tracking-widest">
              Toolkit
            </span>
            <h2
              id="tools-heading"
              className="fluid-text-2xl"
              style={{ color: isLight ? "var(--sp-cocoa)" : "#fff", lineHeight: 1, fontFamily: "var(--font-fraunces), serif", fontWeight: 600, textTransform: "capitalize" }}
            >
              The tools that power
              <br className="hidden sm:block" /> every project
            </h2>
          </motion.div>
        </motion.div>

        {/* Cards — 2-up on mobile, 3-up desktop. Uses real Tailwind grid-cols
            classes rather than an inline gridTemplateColumns so the global
            mobile grid-collapse safety net (globals.css) can't touch it —
            that net only matches inline `style` grid declarations. */}
        <div
          className="grid grid-cols-2 md:grid-cols-3"
          style={{ gap: isMobile ? "10px" : "12px" }}
        >
          {visibleTools.map((tool, i) => {
            return (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.45,
                delay: 0.08 + i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                style={{
                  background: cardBg,
                  borderRadius: "12px",
                  padding: isMobile ? "20px 12px" : "20px 22px",
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: "center",
                  gap: isMobile ? "12px" : "16px",
                  cursor: "default",
                  border: `1.5px solid ${cardBorder}`,
                  boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 20px 0px",
                }}
              >
                <CardInner tool={tool} isMobile={isMobile} nameColor={nameColor} catColor={catColor} />
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
