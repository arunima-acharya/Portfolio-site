import type { Metadata } from "next";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Services from "@/components/sections/Services";
import ToolkitTestimonialsOverlap from "@/components/sections/ToolkitTestimonialsOverlap";
import DesignProcess3D from "@/components/sections/DesignProcess3D";
import HomeClient from "./HomeClient";
import DarkHeroStatement from "@/components/sections/DarkHeroStatement";
import TypographyZoom from "@/components/sections/TypographyZoom";
import MainframeHero from "@/components/sections/MainframeHero";
import HeroBgSticky from "@/components/sections/HeroBgSticky";

// Fluid gutter (var(--gutter): 4.5vw mobile / 9vw tablet / 13.5vw desktop) instead of a flat
// 15% — Services/BentoExpertise already add their own ~20px mobile padding inside, so a fixed
// 15% here was stacking with it and over-cramping content on phones.
const PAD = { paddingLeft: "var(--gutter)", paddingRight: "var(--gutter)" } as const;
// No right padding — the Services section's notebook visual runs to the
// true viewport edge on its right side, matching the reference design.
const PAD_SERVICES = { ...PAD, paddingRight: 0, backgroundColor: "var(--sp-cream)" } as const;

export const metadata: Metadata = {
  title: "Arunima Acharya — Senior Product Designer",
  description:
    "Senior Product Designer specializing in human-centered interfaces that drive real business outcomes. 6+ years, 40+ products shipped.",
};

export default function HomePage() {
  return (
    <HomeClient>
      {/* Mainframe hero + Typography zoom — share one sticky background */}
      <HeroBgSticky>
        <MainframeHero hideVideo />
        <TypographyZoom />
      </HeroBgSticky>

      {/* Dark statement — black background, full width */}
      <DarkHeroStatement />

      {/* Selected Works */}
      <FeaturedWork />

      {/* Selected Works (duplicate) — same scroll-stack animation, work-bg SVGs instead of cards */}
      <FeaturedWork useSvgs />

      {/* Section 5 — Services (padded, bg spans full width incl. gutters) —
          includes the SuperrBook vector-flip notebook animation on its
          right side */}
      <div style={PAD_SERVICES}>
        <section id="services"><Services /></section>
      </div>

      {/* Section 7 — DesignProcess3D (full width) */}
      <DesignProcess3D />

      {/* Section 8/10 — ToolsGrid pinned, TestimonialsGrid slides in from
          the right and overlaps it on scroll */}
      <ToolkitTestimonialsOverlap />

      {/* Section 9 — Testimonials (full width, black bg) — hidden for now */}
      {/* <section id="testimonials"><Testimonials /></section> */}
    </HomeClient>
  );
}
