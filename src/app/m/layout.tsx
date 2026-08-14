import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Arunima Acharya — Product Designer",
  description: "Senior Product Designer specializing in human-centered interfaces that drive real business outcomes.",
};

// Standalone mobile experience — deliberately not reusing the desktop
// Navbar/Footer (those self-exclude on /m/* via a pathname check) or any
// of the desktop pages' heavy WebGL/3D pieces (Lanyard, SuperrBookFlip).
// Own simple full-width top bar instead of the desktop's floating pill nav,
// since that pattern eats too much of a phone's width to be worth it here.
export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--sp-cream)", minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 20px",
          background: "rgba(253,251,249,0.92)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(23,23,23,0.08)",
        }}
      >
        <Link
          href="/m"
          style={{
            fontFamily: "var(--font-gelica)",
            fontSize: 18,
            fontWeight: 600,
            color: "var(--sp-cocoa)",
            textDecoration: "none",
          }}
        >
          arunima
        </Link>
        <Link
          href="/m/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            fontFamily: "var(--font-gelica)",
            fontSize: 14,
            fontWeight: 500,
            color: "var(--sp-charcoal)",
            background: "var(--sp-cream)",
            border: "1.5px solid var(--sp-charcoal)",
            borderRadius: "var(--radius-2xl-2)",
            padding: "8px 16px",
            textDecoration: "none",
          }}
        >
          Let&apos;s chat
        </Link>
      </header>

      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
