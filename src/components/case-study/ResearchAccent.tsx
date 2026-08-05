"use client";

import { createContext, useContext } from "react";

/* Per-investigation accent color, threaded through the research hero, TOC,
   and every primitive (quotes, callouts, friction icons, matrix badges) so
   each piece gets its own visual identity without prop-drilling. */
const ResearchAccentContext = createContext<string>("#e8510a");

export function useResearchAccent() {
  return useContext(ResearchAccentContext);
}

export const ResearchAccentProvider = ResearchAccentContext.Provider;

/* Per-investigation light/dark identity — independent of the site-wide
   theme toggle. Defaults to the dark editorial treatment; individual
   pieces (e.g. UX4G) can opt into a fixed light treatment instead. */
const ResearchLightContext = createContext<boolean>(false);

export function useResearchLight() {
  return useContext(ResearchLightContext);
}

export const ResearchLightProvider = ResearchLightContext.Provider;

export interface ResearchPalette {
  bg: string;
  text: string;
  textBody: string;
  textMuted: string;
  textFaint: string;
  cardBg: string;
  cardBorder: string;
  cardBorderStrong: string;
  border: string;
  hoverText: string;
  /** Floating TOC dock background/shadow — needs more opacity to stay legible over scrolling content. */
  dockBg: string;
  dockShadow: string;
}

const DARK_PALETTE: ResearchPalette = {
  bg: "#0a0a0a",
  text: "#ffffff",
  textBody: "#a1a1aa",
  textMuted: "#71717a",
  textFaint: "#52525b",
  cardBg: "rgba(255,255,255,0.02)",
  cardBorder: "rgba(255,255,255,0.07)",
  cardBorderStrong: "rgba(255,255,255,0.1)",
  border: "rgba(255,255,255,0.06)",
  hoverText: "#ffffff",
  dockBg: "rgba(20,20,20,0.85)",
  dockShadow: "0 8px 32px rgba(0,0,0,0.45)",
};

const LIGHT_PALETTE: ResearchPalette = {
  bg: "#ffffff",
  text: "#111111",
  textBody: "#525252",
  textMuted: "#6b6b6b",
  textFaint: "#707070",
  cardBg: "rgba(0,0,0,0.025)",
  cardBorder: "rgba(0,0,0,0.08)",
  cardBorderStrong: "rgba(0,0,0,0.12)",
  border: "rgba(0,0,0,0.08)",
  hoverText: "#111111",
  dockBg: "rgba(255,255,255,0.88)",
  dockShadow: "0 8px 32px rgba(0,0,0,0.14)",
};

export function useResearchPalette(): ResearchPalette {
  const isLight = useResearchLight();
  return isLight ? LIGHT_PALETTE : DARK_PALETTE;
}

function darken(hex: string, factor: number): string {
  const n = parseInt(hex.slice(1), 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const r = clamp(((n >> 16) & 255) * factor);
  const g = clamp(((n >> 8) & 255) * factor);
  const b = clamp((n & 255) * factor);
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

/* The per-investigation accent, darkened for use as small text on a light
   background — the raw accent (tuned to pop against near-black) is too
   pale to clear WCAG contrast once the page background flips to white. */
export function useResearchAccentText(): string {
  const accent = useResearchAccent();
  const isLight = useResearchLight();
  return isLight ? darken(accent, 0.6) : accent;
}

export interface SeverityColors {
  high: string;
  medium: string;
  quickWin: string;
}

const DARK_SEVERITY: SeverityColors = { high: "#f87171", medium: "#fbbf24", quickWin: "#34d399" };
const LIGHT_SEVERITY: SeverityColors = { high: "#dc2626", medium: "#a15c07", quickWin: "#047857" };

/* High/Medium/Quick-Win severity colors — same idea as the accent: the
   pastel shades tuned for a dark background fail contrast on white. */
export function useSeverityColors(): SeverityColors {
  const isLight = useResearchLight();
  return isLight ? LIGHT_SEVERITY : DARK_SEVERITY;
}
