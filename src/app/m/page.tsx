import Link from "next/link";
import FeaturedWork from "@/components/sections/FeaturedWork";

const SERVICES = ["Product Design", "UX/UI Design", "SaaS & Enterprise", "Design Systems", "UX Research", "Design Consulting"];

// Desktop shows these as sticky notes scattered across a 3D flip-book
// notebook. Mobile drops the notebook/flip interaction and decorative
// stickers entirely — the note artwork already has its own title/list
// baked in, so this is just the raw SVGs stacked top to bottom, no card
// chrome or text overlay (that was double-rendering the content).
const NOTE_SVGS = [
  "/assets/note/note%201.svg",
  "/assets/note/note%202.svg",
  "/assets/note/note%203.svg",
  "/assets/note/note4.svg",
];

export default function MobileHome() {
  return (
    <main style={{ paddingBottom: 48 }}>
      {/* Hero */}
      <section style={{ padding: "32px 20px 8px" }}>
        <span
          style={{
            display: "inline-block",
            background: "var(--sp-cream)",
            color: "var(--sp-charcoal)",
            border: "1.5px solid var(--sp-charcoal)",
            fontSize: 13,
            fontWeight: 500,
            padding: "5px 14px",
            borderRadius: "var(--radius-2xl-2)",
            fontFamily: "var(--font-geist), sans-serif",
            marginBottom: "var(--spacing-16)",
          }}
        >
          hi, i&apos;m arunima
        </span>
        <h1
          style={{
            fontFamily: "var(--font-gelica)",
            fontSize: 34,
            fontWeight: 600,
            lineHeight: 1.1,
            color: "var(--sp-cocoa)",
            margin: "0 0 14px",
          }}
        >
          designing products people actually use
        </h1>
        <p
          style={{
            fontFamily: "var(--font-geist), sans-serif",
            fontSize: 16,
            lineHeight: 1.6,
            color: "rgba(23,23,23,0.6)",
            margin: "0 0 24px",
          }}
        >
          Engineer turned Senior Product Designer with 3+ years designing enterprise SaaS and AI products across hospitality, HRMS, and analytics.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link
            href="/m/case-studies"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "var(--sp-cream)", color: "var(--sp-charcoal)",
              border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-2xl-2)",
              padding: "12px 20px", fontSize: 15, fontWeight: 500,
              fontFamily: "var(--font-gelica)", textDecoration: "none",
              boxShadow: "var(--shadow-subtle)",
            }}
          >
            View my work
          </Link>
          <Link
            href="/m/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "transparent", color: "var(--sp-charcoal)",
              border: "1px solid rgba(23,23,23,0.2)", borderRadius: "var(--radius-2xl-2)",
              padding: "12px 20px", fontSize: 15, fontWeight: 500,
              fontFamily: "var(--font-gelica)", textDecoration: "none",
            }}
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* Featured work — same FeaturedWork component desktop uses (SVG
          scroll-stack cards), so mobile automatically stays in sync with
          it instead of maintaining a separate, drifting mobile version.
          Its own "view all" CTA links to /m/case-studies here (isMobile). */}
      <FeaturedWork useSvgs />

      {/* Services */}
      <section style={{ padding: "36px 20px 8px" }}>
        <h2
          style={{
            fontFamily: "var(--font-gelica)",
            fontSize: 22,
            fontWeight: 600,
            color: "var(--sp-cocoa)",
            margin: "0 0 16px",
          }}
        >
          services
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {SERVICES.map((s) => (
            <span
              key={s}
              style={{
                fontSize: 14, fontWeight: 500, color: "var(--sp-charcoal)",
                background: "var(--sp-cream)", border: "1.5px solid var(--sp-charcoal)",
                borderRadius: "var(--radius-2xl-2)", padding: "8px 14px", fontFamily: "var(--font-geist), sans-serif",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* What I bring to the table — no flip-book, no stickers, just the
          note artwork itself stacked top to bottom. */}
      <section style={{ padding: "36px 20px 8px" }}>
        <h2
          style={{
            fontFamily: "var(--font-gelica)",
            fontSize: 22,
            fontWeight: 600,
            color: "var(--sp-cocoa)",
            margin: "0 0 16px",
          }}
        >
          what i bring to the table
        </h2>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          {NOTE_SVGS.map((svg) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={svg} src={svg} alt="" style={{ width: "80%", height: "auto", display: "block", filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.18))" }} />
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{ padding: "40px 20px 0" }}>
        <div
          style={{
            border: "1.5px solid var(--sp-charcoal)",
            borderRadius: "var(--radius-xl)",
            padding: "28px 22px",
            background: "var(--sp-orange)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontFamily: "var(--font-gelica)", fontSize: 22, fontWeight: 600, color: "var(--sp-charcoal)", margin: "0 0 10px" }}>
            let&apos;s work together
          </h2>
          <p style={{ fontSize: 15, color: "rgba(23,23,23,0.75)", margin: "0 0 20px", fontFamily: "var(--font-geist), sans-serif" }}>
            Have a project in mind? I&apos;d love to hear about it.
          </p>
          <Link
            href="/m/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "var(--sp-cream)", color: "var(--sp-charcoal)",
              border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-2xl-2)",
              padding: "12px 24px", fontSize: 15, fontWeight: 500,
              fontFamily: "var(--font-gelica)", textDecoration: "none",
            }}
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
