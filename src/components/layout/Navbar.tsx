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
  // Desktop nav is hidden until the top strip is hovered, then fades/slides in.
  const [navHovered, setNavHovered] = useState(false);

  // Stop background scroll while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // /m/* routes are the standalone mobile experience with its own chrome —
  // this desktop/tablet nav shouldn't render there at all. Checked after
  // every hook above so hook call order stays stable across client-side
  // navigations into/out of /m.
  if (pathname?.startsWith("/m")) return null;

  if (isMobile) {
    return (
      <div data-navbar style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "var(--spacing-16)" }}>
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <a
            href="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: "var(--spacing-8)",
              padding: "8px 14px 8px 10px", borderRadius: 9999,
              background: "rgba(253,251,249,0.7)", backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              fontFamily: "var(--font-geist), sans-serif", fontSize: 16, fontWeight: 700,
              color: "var(--sp-charcoal)", textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            <Sparkle size={16} strokeWidth={2} fill="var(--sp-charcoal)" style={{ flexShrink: 0 }} />
            Arunima Acharya
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
                marginTop: "var(--spacing-12)", background: "var(--sp-cream)", borderRadius: "var(--radius-2xl-2)",
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
                      display: "flex", alignItems: "center", gap: "var(--spacing-8)",
                      minHeight: 52, padding: "0 20px",
                      fontFamily: "var(--font-gelica)", fontSize: 16,
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
                download
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", minHeight: 52, padding: "0 20px",
                  fontFamily: "var(--font-gelica)", fontSize: 16, color: "#555",
                  textDecoration: "none", borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                Resume
              </a>
              <a
                href="https://www.linkedin.com/in/arunima-acharya-bb012a21b/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", minHeight: 52, padding: "0 20px",
                  fontFamily: "var(--font-gelica)", fontSize: 16, color: "#555",
                  textDecoration: "none", borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                LinkedIn
              </a>
              <a
                href="/contact"
                onClick={() => setOpen(false)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--spacing-8)",
                  minHeight: 52, padding: "0 20px",
                  fontFamily: "var(--font-gelica)", fontSize: 16, fontWeight: 500,
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
      onMouseEnter={() => setNavHovered(true)}
      onMouseLeave={() => setNavHovered(false)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "84px",
        zIndex: 100,
        padding: "var(--spacing-16)",
        pointerEvents: "auto",
      }}
    >
      <nav
        style={{
          pointerEvents: navHovered ? "auto" : "none",
          opacity: navHovered ? 1 : 0,
          transform: navHovered ? "translateY(0)" : "translateY(-10px)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: "var(--spacing-12)",
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
            gap: "var(--spacing-8)",
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
            whiteSpace: "nowrap",
          }}
        >
          <Sparkle size={16} strokeWidth={2} fill="var(--sp-charcoal)" style={{ flexShrink: 0 }} />
          Arunima Acharya
        </a>

        {/* Center — plain-text links in a solid white pill; the active
            page gets a leading dot + bold near-black text, everything
            else stays a muted grey, matching the reference. Shadow +
            per-link hover pill added since the flat, flush version read
            as dull against the cream backdrop. */}
        <div
          className="navbar-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(4px, 2vw, 8px)",
            background: "var(--sp-cream)",
            border: "1.5px solid var(--sp-charcoal)",
            borderRadius: "var(--radius-2xl-2)",
            padding: "8px clamp(14px, 3vw, 22px)",
            boxShadow: "var(--shadow-subtle)",
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
                  padding: "8px clamp(8px, 1.5vw, 14px)",
                  borderRadius: "var(--radius-2xl-2)",
                  fontFamily: "var(--font-gelica)",
                  fontSize: 16,
                  fontWeight: active ? 600 : 500,
                  color: active ? "var(--sp-charcoal)" : "#6b6b6b",
                  background: "transparent",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s, background-color 0.2s",
                }}
                onMouseEnter={e => {
                  if (!active) e.currentTarget.style.color = "var(--sp-charcoal)";
                  e.currentTarget.style.backgroundColor = "rgba(23,23,23,0.06)";
                }}
                onMouseLeave={e => {
                  if (!active) e.currentTarget.style.color = "#6b6b6b";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {active && (
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--sp-orange)", flexShrink: 0 }} />
                )}
                {label}
              </a>
            );
          })}
          <a
            href="/assets/Arunima_Acharya_Resume.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "8px clamp(8px, 1.5vw, 14px)",
              borderRadius: "var(--radius-2xl-2)",
              fontFamily: "var(--font-gelica)",
              fontSize: 16,
              fontWeight: 500,
              color: "#6b6b6b",
              background: "transparent",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "color 0.2s, background-color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--sp-charcoal)"; e.currentTarget.style.backgroundColor = "rgba(23,23,23,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#6b6b6b"; e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            Resume
          </a>
          <a
            href="https://www.linkedin.com/in/arunima-acharya-bb012a21b/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "8px clamp(8px, 1.5vw, 14px)",
              borderRadius: "var(--radius-2xl-2)",
              fontFamily: "var(--font-gelica)",
              fontSize: 16,
              fontWeight: 500,
              color: "#6b6b6b",
              background: "transparent",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "color 0.2s, background-color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--sp-charcoal)"; e.currentTarget.style.backgroundColor = "rgba(23,23,23,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#6b6b6b"; e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            LinkedIn
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
            borderRadius: "var(--radius-2xl-2)",
            padding: "10px 10px 10px 20px",
            fontSize: 16,
            fontFamily: "var(--font-gelica)",
            fontWeight: 500,
            textDecoration: "none",
            whiteSpace: "nowrap",
            boxShadow: "var(--shadow-subtle)",
          }}
        >
          Let&apos;s chat
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--sp-orange)", flexShrink: 0 }} />
        </a>
      </nav>
    </div>
  );
}
