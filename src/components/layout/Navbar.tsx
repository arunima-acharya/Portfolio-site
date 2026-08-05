"use client";

import { usePathname } from "next/navigation";
import { Sparkle } from "lucide-react";

const LINKS = [
  { label: "Work",     href: "/case-studies" },
  { label: "Research", href: "/research" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div
      data-navbar
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "16px",
        pointerEvents: "none",
      }}
    >
      <nav
        style={{
          pointerEvents: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: "12px",
        }}
      >
        {/* Logo — a light frosted backdrop rather than fully transparent,
            since (unlike the reference) not every page here has a plain
            light background behind the top-left corner (some research
            pieces render dark). Nearly invisible on light pages, still
            legible on dark ones. */}
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 14px 8px 10px",
            borderRadius: 9999,
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: "#111",
            textDecoration: "none",
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}
        >
          <Sparkle size={16} strokeWidth={2} fill="#111" style={{ flexShrink: 0 }} />
          Arunima
        </a>

        {/* Center — plain-text links in a solid white pill; the active
            page gets a leading dot + bold near-black text, everything
            else stays a muted grey, matching the reference. */}
        <div
          className="navbar-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(4px, 2vw, 8px)",
            background: "#fff",
            borderRadius: 9999,
            padding: "10px clamp(16px, 3vw, 24px)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          {LINKS.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <a
                key={label}
                href={href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "0 clamp(8px, 1.5vw, 14px)",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  color: active ? "#111" : "#9a9a9a",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#555"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = "#9a9a9a"; }}
              >
                {active && (
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#111", flexShrink: 0 }} />
                )}
                {label}
              </a>
            );
          })}
          <a
            href="/assets/Arunima_Acharya_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0 clamp(8px, 1.5vw, 14px)",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: 14,
              color: "#9a9a9a",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#555")}
            onMouseLeave={e => (e.currentTarget.style.color = "#9a9a9a")}
          >
            Resume
          </a>
        </div>

        {/* Right — solid black CTA pill, matching "Let's chat" in the
            reference (mapped to this site's contact page). */}
        <a
          href="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            background: "#111",
            color: "#fff",
            borderRadius: 9999,
            padding: "10px 10px 10px 20px",
            fontSize: 14,
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 500,
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#e8510a")}
          onMouseLeave={e => (e.currentTarget.style.background = "#111")}
        >
          Let&apos;s chat
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", flexShrink: 0 }} />
        </a>
      </nav>
    </div>
  );
}
