import type { Metadata } from "next";
import JackPortfolio from "@/components/jack";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import ToolkitTestimonialsOverlap from "@/components/sections/ToolkitTestimonialsOverlap";
import BentoExpertise from "@/components/sections/BentoExpertise";
import HiIntro from "@/components/sections/HiIntro";
import HeroSectionsWrapper from "@/components/sections/HeroSectionsWrapper";
import DesignProcess3D from "@/components/sections/DesignProcess3D";
import ExperiencesBento from "@/components/sections/ExperiencesBento";
import HomeClient from "./HomeClient";
import DarkHeroStatement from "@/components/sections/DarkHeroStatement";
import MacbookScrollDemo from "@/components/MacbookScrollDemo";
import TypographyZoom from "@/components/sections/TypographyZoom";
import MainframeHero from "@/components/sections/MainframeHero";
import HeroBgSticky from "@/components/sections/HeroBgSticky";

const PAD = { paddingLeft: "15%", paddingRight: "15%" } as const;
const PAD_WHITE = { ...PAD, backgroundColor: "#fff" } as const;
const PAD_SERVICES = { ...PAD, backgroundColor: "#FFF7EE" } as const;

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

      {/* Section 5 — Services (padded, bg spans full width incl. gutters) */}
      <div style={PAD_SERVICES}>
        <section id="services"><Services /></section>
      </div>

      {/* Section 6 — BentoExpertise (padded, white bg spans full width incl. gutters) */}
      <div style={PAD_WHITE}>
        <BentoExpertise />
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
