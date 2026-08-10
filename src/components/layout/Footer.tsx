"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Email",    href: "mailto:arunimaacharya17@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com", external: true },
  { label: "Dribbble", href: "https://dribbble.com", external: true },
  { label: "Work",     href: "/case-studies" },
];

const BOTTOM_LINKS = [
  { label: "Product Designer",    href: "/" },
  { label: "Available for work",  href: "/contact" },
  { label: "arunimaacharya17@gmail.com", href: "mailto:arunimaacharya17@gmail.com" },
  { label: "LinkedIn",  href: "https://linkedin.com", external: true },
  { label: "Twitter",   href: "https://twitter.com",  external: true },
  { label: "Dribbble",  href: "https://dribbble.com", external: true },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const bg = isHome ? "var(--sp-orange)" : "var(--sp-charcoal)";
  const fg = isHome ? "var(--sp-charcoal)" : "var(--sp-cream)";
  const borderColor = isHome ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.25)";
  const dividerColor = isHome ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)";
  const mutedColor = isHome ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)";
  const faintColor = isHome ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.45)";

  return (
    <footer
      aria-label="Site footer"
      data-cursor-white
      style={{
        background: bg,
        width: "100%",
        position: "relative",
        overflow: "hidden",
        borderTopLeftRadius: 56,
        borderTopRightRadius: 56,
      }}
    >
      {/* Main body */}
      <div
        style={{
          padding: "80px var(--gutter, 48px) 0",
        }}
      >
        {/* Large heading */}
        <h2
          style={{
            fontSize: "clamp(28px, 4.5vw, 62px)",
            fontWeight: 600,
            lineHeight: 1.12,
            letterSpacing: "normal",
            textTransform: "lowercase",
            color: fg,
            fontFamily: "var(--font-fraunces), serif",
            maxWidth: "16ch",
            marginBottom: "64px",
          }}
        >
          I design products people love. Let&apos;s work together.
        </h2>

        {/* Middle nav row */}
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap sm:flex-nowrap"
          style={{
            borderTop: `1px solid ${borderColor}`,
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              target={"external" in link && link.external ? "_blank" : undefined}
              rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
              className="flex items-center basis-1/2 sm:basis-0"
              style={{
                flexGrow: i === 2 ? 2 : 1,
                minHeight: 44,
                padding: "18px 0",
                paddingLeft: i === 0 ? "0" : "24px",
                borderLeft: i === 0 ? "none" : `1px solid ${borderColor}`,
                fontSize: "14px",
                fontWeight: 400,
                color: fg,
                fontFamily: "var(--font-geist), sans-serif",
                textDecoration: "none",
                letterSpacing: "-0.01em",
                transition: "opacity 0.15s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.55"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Brand + Arrow row */}
        <div
          className="flex flex-wrap gap-6"
          style={{
            alignItems: "flex-end",
            justifyContent: "space-between",
            paddingTop: "48px",
            paddingBottom: "48px",
          }}
        >
          {/* Brand name */}
          <div
            style={{
              fontSize: "clamp(22px, 3vw, 36px)",
              fontWeight: 500,
              letterSpacing: "normal",
              textTransform: "lowercase",
              lineHeight: 1.15,
              color: fg,
              fontFamily: "var(--font-fraunces), serif",
            }}
          >
            Arunima
            <br />
            Acharya
            <br />
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              Design
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginBottom: "2px" }}>
                <path d="M4 16L16 4M16 4H8M16 4V12" stroke={fg} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>

          {/* Large arrow */}
          <svg
            viewBox="0 0 120 120"
            fill="none"
            style={{ width: "clamp(64px, 10vw, 120px)", height: "clamp(64px, 10vw, 120px)", flexShrink: 0, opacity: 0.85 }}
          >
            <path
              d="M90 30L30 90M30 90H72M30 90V48"
              stroke={fg}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: `1px solid ${borderColor}`,
          padding: "16px var(--gutter, 48px)",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0",
        }}
      >
        {BOTTOM_LINKS.map((link, i) => (
          <span key={link.label} style={{ display: "flex", alignItems: "center" }}>
            {i !== 0 && (
              <span style={{ color: dividerColor, margin: "0 14px", fontSize: "12px" }}>|</span>
            )}
            <Link
              href={link.href}
              target={"external" in link && link.external ? "_blank" : undefined}
              rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
              style={{
                fontSize: "12px",
                fontWeight: 400,
                color: mutedColor,
                fontFamily: "var(--font-geist), sans-serif",
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "color 0.15s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = fg; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = mutedColor; }}
            >
              {link.label}
            </Link>
          </span>
        ))}

        <span style={{ marginLeft: "auto", fontSize: "12px", color: faintColor, fontFamily: "var(--font-geist), sans-serif" }}>
          © {year}
        </span>
      </div>
    </footer>
  );
}
