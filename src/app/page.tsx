import type { Metadata } from "next";
import JackPortfolio from "@/components/jack";
import HomeIntro from "@/components/sections/HomeIntro";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Services from "@/components/sections/Services";
import ToolsGrid from "@/components/sections/ToolsGrid";
import Testimonials from "@/components/sections/Testimonials";
import TestimonialsGrid from "@/components/sections/TestimonialsGrid";
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

const PAD = { paddingLeft: "15%", paddingRight: "15%" } as const;
const PAD_WHITE = { ...PAD, backgroundColor: "#fff" } as const;

export const metadata: Metadata = {
  title: "Arunima Acharya — Senior Product Designer",
  description:
    "Senior Product Designer specializing in human-centered interfaces that drive real business outcomes. 6+ years, 40+ products shipped.",
};

export default function HomePage() {
  return (
    <HomeClient>
      {/* Mainframe hero */}
      <MainframeHero hideVideo />

      {/* HomeIntro (padded) */}
      <div style={PAD}>
        <HomeIntro />
      </div>

      {/* Typography zoom transition */}
      <TypographyZoom />

      {/* Dark statement — black background, full width */}
      <DarkHeroStatement />

      {/* Selected Works */}
      <FeaturedWork />

      {/* Section 5 — Services (padded, white bg spans full width incl. gutters) */}
      <div style={PAD_WHITE}>
        <section id="services"><Services /></section>
      </div>

      {/* Section 6 — BentoExpertise (padded, white bg spans full width incl. gutters) */}
      <div style={PAD_WHITE}>
        <BentoExpertise />
      </div>

      {/* Section 7 — DesignProcess3D (full width) */}
      <DesignProcess3D />

      {/* Section 8 — ToolsGrid (full width) */}
      <ToolsGrid />


      {/* Section 9 — Testimonials (full width, black bg) — hidden for now */}
      {/* <section id="testimonials"><Testimonials /></section> */}

      {/* Section 10 — Client testimonials grid, directly above the footer */}
      <TestimonialsGrid />
    </HomeClient>
  );
}
