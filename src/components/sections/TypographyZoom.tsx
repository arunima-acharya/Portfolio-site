"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import DesignBoardGraphics, { DESK_LEGEND } from "./DesignBoardGraphics";

// Hand-drawn circle scribbled around "desk" in the heading — a slightly
// wobbly ellipse rather than a perfect one, inline SVG.
function WordCircle() {
  return (
    <svg
      width="100%" height="100%" viewBox="0 0 160 80" fill="none" preserveAspectRatio="none"
      style={{ position: "absolute", inset: "-18% -10%", pointerEvents: "none" }}
    >
      <path
        d="M22 40C20 18 48 6 82 5C118 4 148 16 152 38C156 62 122 76 80 76C40 76 24 62 22 40Z"
        stroke="var(--sp-orange)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Main section ─────────────────────────────────────────── */
export default function TypographyZoom() {
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        backgroundColor: "transparent",
        position:        "relative",
        minHeight:       "100vh",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        overflow:        "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, zIndex: 40 }}>
        <DesignBoardGraphics />
      </div>
      <div
        style={{
          userSelect:     "none",
          position:       "relative",
          zIndex:         50,
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          gap:            "1.1rem",
          textAlign:      "center",
        }}
      >
        {!isMobile && (
          <span
            style={{
              position:      "absolute",
              top:           "-2.6rem",
              left:          "50%",
              transform:     "translateX(-190%) rotate(-4deg)",
              fontFamily:    "var(--font-caveat), cursive",
              fontSize:      "1.15rem",
              fontWeight:    600,
              color:         "var(--sp-orange)",
              whiteSpace:    "nowrap",
              pointerEvents: "none",
            }}
          >
            A peek into my favorite things →
          </span>
        )}
        <div
          style={{
            fontSize:   isMobile ? "1.56rem" : "clamp(1.2rem, 3.6vw, 3rem)",
            fontFamily: "var(--font-alekan)",
            fontWeight: 600,
            color:      "var(--sp-cocoa)",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          What&apos;s on my{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            <WordCircle />
            <span style={{ position: "relative" }}>desk</span>
          </span>
        </div>
        <span
          style={{
            display:       "inline-block",
            border:        "1px solid var(--sp-charcoal)",
            borderRadius:  "20px",
            padding:       "0.5em 1.4em",
            fontFamily:    "var(--font-geist), sans-serif",
            fontSize:      "16px",
            fontWeight:    500,
            color:         "var(--sp-charcoal)",
            whiteSpace:    "nowrap",
          }}
        >
          Product designer edition
        </span>
      </div>

      {/* Legend — only meaningful alongside the desk items, which are
          desktop-only, so it follows the same condition. Pinned to the
          bottom of the section rather than stacked under the heading. */}
      {!isMobile && (
        <div
          style={{
            position:   "absolute",
            bottom:     "3%",
            left:       0,
            right:      0,
            zIndex:     50,
            userSelect: "none",
            width:      "100%",
            paddingLeft: "5%",
            paddingRight: "5%",
            boxSizing: "border-box",
            textAlign:  "center",
          }}
        >
          <p
            style={{
              margin:        0,
              fontFamily:    "var(--font-geist), sans-serif",
              fontSize:      "16px",
              fontWeight:    500,
              lineHeight:    1.9,
              color:         "#5C5955",
            }}
          >
            {DESK_LEGEND.join(" / ")}
          </p>
        </div>
      )}
    </div>
  );
}
