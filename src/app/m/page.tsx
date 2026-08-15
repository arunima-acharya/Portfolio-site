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
// Footer.tsx now renders on /m routes too (see that file), so its own
// "Let's work together" CTA covers what used to be a separate mobile-only
// contact band here.
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
    </HomeClient>
  );
}
