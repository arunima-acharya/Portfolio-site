"use client";

import dynamic from "next/dynamic";
import { useTheme } from "@/components/ThemeProvider";
import { Component, ReactNode } from "react";

const Lanyard = dynamic(() => import("@/components/ui/Lanyard"), {
  ssr: false,
  loading: () => <div style={{ width: '100%', height: '100%', background: '#000' }} />,
});

class ErrBound extends Component<{ children: ReactNode }, { err: string | null }> {
  state = { err: null };
  static getDerivedStateFromError(e: Error) { return { err: e.message }; }
  render() {
    if (this.state.err) return <div style={{ color: '#e8510a', padding: 16, fontSize: 12 }}>Error: {this.state.err}</div>;
    return this.props.children;
  }
}

export default function HeroIntro() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const cardBg = isLight ? "#f0f0f0" : "#141414";
  const cardBorder = "#e8510a";
  const textPrimary = isLight ? "#111" : "#fff";
  const textMuted = isLight ? "#888" : "rgba(255,255,255,0.4)";

  return (
    <section className="relative flex" style={{ height: "100vh", width: "100vw", marginLeft: "calc(-1 * var(--gutter))", marginRight: "calc(-1 * var(--gutter))", paddingTop: "10%" }}>

      {/* Left: stats card */}
      <div className="flex flex-col justify-between z-10" style={{ width: "50%", paddingLeft: "10%", paddingRight: "4%", paddingBottom: "calc(8% + 16px)" }}>

        {/* Heading */}
        <div style={{ marginBottom: "28px" }}>
          <p style={{ fontSize: "clamp(28px, 3.08vw, 44.8px)", fontFamily: "var(--font-inter), sans-serif", fontWeight: 300, color: textMuted, lineHeight: 1.2, letterSpacing: "-0.02em" }}>
            My focus is simple
          </p>
          <p style={{ fontSize: "clamp(33.6px, 3.92vw, 56px)", fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, color: textPrimary, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
            Design to connect
          </p>
        </div>

        {/* Two columns, each with two stacked cards */}
        <div style={{ display: "flex", gap: "16px", height: "48.6vh" }}>

          {/* Column 1 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Card A: Clients */}
            <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "16px", padding: "16px 20px", display: "flex", alignItems: "center", height: "20%", flexShrink: 0 }}>
              {[
                { bg: "#2d1b0e", img: null, size: 28 },
                { bg: "#3d1a1a", img: null, size: 34 },
                { bg: "#e8510a", img: null, size: 40 },
                { bg: "#c0392b", img: null, size: 34 },
              ].map((a, i) => (
                <div key={i} style={{ width: a.size, height: a.size, borderRadius: "50%", background: a.bg, border: "2px solid " + cardBg, marginLeft: i === 0 ? 0 : -10, zIndex: 4 - i, flexShrink: 0 }} />
              ))}
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", color: textMuted, marginLeft: "16px", whiteSpace: "nowrap" }}>40+ PARTNERS</span>
            </div>

            {/* Card C */}
            <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
              <p style={{ fontSize: "13px", color: textMuted, fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.6 }}>
                Deliver impactful designs<br />within the first 30 days
              </p>
              <div>
                <p style={{ fontSize: "clamp(44px, 4.5vw, 64px)", fontWeight: 700, fontFamily: "var(--font-inter), sans-serif", color: textPrimary, lineHeight: 1, letterSpacing: "-0.04em" }}>
                  90<span style={{ fontSize: "0.45em", fontWeight: 400, color: textMuted }}>%</span>
                </p>
                <p style={{ fontSize: "12px", color: textMuted, marginTop: "6px", fontFamily: "var(--font-inter), sans-serif" }}>
                  User satisfaction rate
                </p>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Card B */}
            <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
              <p style={{ fontSize: "13px", color: textMuted, fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.6 }}>
                Through human-centered<br />research & strategy
              </p>
              <div>
                <p style={{ fontSize: "clamp(44px, 4.5vw, 64px)", fontWeight: 700, fontFamily: "var(--font-inter), sans-serif", color: textPrimary, lineHeight: 1, letterSpacing: "-0.04em" }}>
                  6<span style={{ fontSize: "0.45em", fontWeight: 400, color: textMuted }}>+</span>
                </p>
                <p style={{ fontSize: "12px", color: textMuted, marginTop: "6px", fontFamily: "var(--font-inter), sans-serif" }}>
                  Years of experience
                </p>
              </div>
            </div>

            {/* Card D: Availability */}
            <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "16px", padding: "16px 20px", display: "flex", alignItems: "center", height: "20%", flexShrink: 0 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.06)", borderRadius: "100px", padding: "6px 14px" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
                <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", color: textMuted }}>AVAILABLE FOR JUNE</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Right: lanyard canvas */}
      <div className="relative z-0" style={{ width: "50%", height: "100%" }}>
        <ErrBound>
          <Lanyard position={[0, 0, 20]} gravity={[0, -20, 0]} />
        </ErrBound>
      </div>

    </section>
  );
}
