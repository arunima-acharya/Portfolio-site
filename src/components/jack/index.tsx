import HeroSection from "./HeroSection";
import MarqueeSection from "./MarqueeSection";

export default function JackPortfolio() {
  return (
    <div style={{ background: "#0C0C0C", overflowX: "clip" }}>
      <HeroSection />
      <MarqueeSection />
    </div>
  );
}
