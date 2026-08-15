import Link from "next/link";
import HomeClient from "@/app/HomeClient";
import HeroBgSticky from "@/components/sections/HeroBgSticky";
import MainframeHero from "@/components/sections/MainframeHero";
import TypographyZoom from "@/components/sections/TypographyZoom";
import DarkHeroStatement from "@/components/sections/DarkHeroStatement";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Services from "@/components/sections/Services";
import DesignProcess3D from "@/components/sections/DesignProcess3D";
import ToolkitTestimonialsOverlap from "@/components/sections/ToolkitTestimonialsOverlap";

// Same section composition as the desktop homepage (src/app/page.tsx),
// reusing the actual desktop components rather than a hand-built mobile
// substitute — every one of them is already isMobile-aware internally
// (confirmed: MainframeHero, TypographyZoom, DarkHeroStatement, Services,
// DesignProcess3D, ToolsGrid, TestimonialsGrid all branch on useIsMobile()),
// so this stays in sync with desktop automatically instead of drifting.
// The Contact CTA band at the bottom is mobile-only — it fills the gap
// left by Footer.tsx, which deliberately doesn't render on /m routes.
export default function MobileHome() {
  return (
    <HomeClient>
      <HeroBgSticky>
        <MainframeHero hideVideo />
        <TypographyZoom />
      </HeroBgSticky>

      <DarkHeroStatement />

      <FeaturedWork useSvgs />

      <section id="services"><Services /></section>

      <DesignProcess3D />

      <ToolkitTestimonialsOverlap />

      {/* Contact CTA */}
      <section style={{ padding: "40px 20px" }}>
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
            Let&apos;s work together
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
    </HomeClient>
  );
}
