"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Sparkle, X } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const LINKS = [
  { label: "Work",     href: "/case-studies" },
  { label: "Research", href: "/research" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isMobile = useIsMobile(860); // below this, the pill row runs out of room
  const [open, setOpen] = useState(false);

  // Stop background scroll while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (isMobile) {
    return (
      <div data-navbar style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "16px" }}>
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <a
            href="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "8px 14px 8px 10px", borderRadius: 9999,
              background: "rgba(253,251,249,0.7)", backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              fontFamily: "var(--font-geist), sans-serif", fontSize: 16, fontWeight: 700,
              color: "var(--sp-charcoal)", textDecoration: "none", textTransform: "uppercase",
              letterSpacing: "0.02em", whiteSpace: "nowrap",
            }}
          >
            <Sparkle size={16} strokeWidth={2} fill="var(--sp-charcoal)" style={{ flexShrink: 0 }} />
            Arunima
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 44, height: 44, borderRadius: 9999, border: "none",
              background: "var(--sp-charcoal)", color: "#fff", flexShrink: 0,
            }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: 12, background: "var(--sp-cream)", borderRadius: 20,
                border: "1.5px solid var(--sp-charcoal)", overflow: "hidden",
              }}
            >
              {LINKS.map(({ label, href }) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      minHeight: 52, padding: "0 20px",
                      fontFamily: "var(--font-geist), sans-serif", fontSize: 16,
                      fontWeight: active ? 600 : 400, color: active ? "var(--sp-charcoal)" : "#555",
                      textDecoration: "none", borderBottom: "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    {active && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--sp-charcoal)", flexShrink: 0 }} />}
                    {label}
                  </a>
                );
              })}
              <a
                href="/assets/Arunima_Acharya_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", minHeight: 52, padding: "0 20px",
                  fontFamily: "var(--font-geist), sans-serif", fontSize: 16, color: "#555",
                  textDecoration: "none", borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                Resume
              </a>
              <a
                href="/contact"
                onClick={() => setOpen(false)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  minHeight: 52, padding: "0 20px",
                  fontFamily: "var(--font-geist), sans-serif", fontSize: 16, fontWeight: 500,
                  color: "var(--sp-charcoal)", background: "var(--sp-cream)", borderTop: "1.5px solid var(--sp-charcoal)", textDecoration: "none",
                }}
              >
                Let&apos;s chat
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--sp-orange)", flexShrink: 0 }} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

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
            background: "rgba(253,251,249,0.7)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            fontFamily: "var(--font-geist), sans-serif",
            fontSize: 16,
            fontWeight: 700,
            color: "var(--sp-charcoal)",
            textDecoration: "none",
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}
        >
          <Sparkle size={16} strokeWidth={2} fill="var(--sp-charcoal)" style={{ flexShrink: 0 }} />
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
            background: "var(--sp-cream)",
            border: "1.5px solid var(--sp-charcoal)",
            borderRadius: 20,
            padding: "10px clamp(16px, 3vw, 24px)",
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
                  fontFamily: "var(--font-geist), sans-serif",
                  fontSize: 16,
                  fontWeight: active ? 600 : 400,
                  color: active ? "var(--sp-charcoal)" : "#9a9a9a",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#555"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = "#9a9a9a"; }}
              >
                {active && (
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--sp-charcoal)", flexShrink: 0 }} />
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
              fontFamily: "var(--font-geist), sans-serif",
              fontSize: 16,
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
            background: "var(--sp-cream)",
            color: "var(--sp-charcoal)",
            border: "1.5px solid var(--sp-charcoal)",
            borderRadius: 20,
            padding: "10px 10px 10px 20px",
            fontSize: 16,
            fontFamily: "var(--font-geist), sans-serif",
            fontWeight: 500,
            textDecoration: "none",
            whiteSpace: "nowrap",
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 2px 0px",
          }}
        >
          Let&apos;s chat
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--sp-orange)", flexShrink: 0 }} />
        </a>
      </nav>
    </div>
  );
}
