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

const SHADOWED = new Set([0, 2, 4, 6, 8]);

function CardInner({ tool, isMobile, nameColor, catColor }: { tool: typeof tools[0]; isMobile: boolean; nameColor: string; catColor: string }) {
  return (
    <>
      <div
        style={{
          width: isMobile ? 32 : 40,
          height: isMobile ? 32 : 40,
          borderRadius: "8px",
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
          width={isMobile ? 16 : 20}
          height={isMobile ? 16 : 20}
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
      <div>
        <p style={{ margin: 0, fontSize: isMobile ? "13px" : "15px", fontWeight: 600, color: nameColor, fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.3 }}>
          {tool.name}
        </p>
        <p style={{ margin: "3px 0 0", fontSize: isMobile ? "11px" : "13px", color: catColor, fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.3 }}>
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

  const cardBg     = "#ffffff";
  const cardBorder = isLight ? "rgba(0,0,0,0.08)"           : "rgba(255,255,255,0.07)";
  const cardShadow = isLight ? "0 2px 12px rgba(0,0,0,0.04)": "0 2px 12px rgba(0,0,0,0.2)";
  const hoverBorder= isLight ? "rgba(0,0,0,0.18)"           : "rgba(255,255,255,0.16)";
  const hoverShadow= isLight ? "0 8px 32px rgba(0,0,0,0.08)": "0 8px 32px rgba(0,0,0,0.4)";
  const nameColor  = isLight ? "#111"                        : "#f0f0f0";
  const catColor   = isLight ? "#999"                        : "rgba(255,255,255,0.4)";

  const columns = isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)";

  return (
    <section
      className="py-24 md:py-32 border-t border-black/5"
      aria-labelledby="tools-heading"
      style={{
        paddingLeft: isMobile ? "20px" : "15%",
        paddingRight: isMobile ? "20px" : "15%",
        backgroundColor: "#fff",
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
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
              Toolkit
            </span>
            <h2
              id="tools-heading"
              className="fluid-text-2xl font-normal"
              style={{ color: isLight ? "#111" : "#fff", lineHeight: 1, fontFamily: "var(--font-instrument-serif), 'Instrument Serif', serif" }}
            >
              The tools that power
              <br className="hidden sm:block" /> every project
            </h2>
          </motion.div>
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: columns,
            gap: isMobile ? "10px" : "12px",
          }}
        >
          {tools.map((tool, i) => {
            const shadowed = SHADOWED.has(i);
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
                  borderRadius: "16px",
                  padding: isMobile ? "14px" : "20px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: isMobile ? "10px" : "16px",
                  cursor: "default",
                  // Alternating cards keep the static elevation the glow used
                  // to sit on top of, so the grid retains its rhythm.
                  border: shadowed ? `1px solid ${cardBorder}` : undefined,
                  boxShadow: shadowed ? hoverShadow : undefined,
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
