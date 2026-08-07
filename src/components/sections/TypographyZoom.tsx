"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import DesignBoardGraphics, { DESK_LEGEND } from "./DesignBoardGraphics";

/* ── Main section ─────────────────────────────────────────── */
export default function TypographyZoom() {
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        backgroundColor: "transparent",
        position:        "relative",
        height:          "100vh",
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
        <div
          style={{
            fontSize:   isMobile ? "1.56rem" : "clamp(1.2rem, 3.6vw, 3rem)",
            fontFamily: "var(--font-instrument-serif), 'Instrument Serif', serif",
            fontStyle:  "italic",
            fontWeight: 540,
            color:      "#1A2332",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          What&apos;s on My Desk
        </div>
        <span
          style={{
            display:       "inline-block",
            border:        "1px solid #1A2332",
            borderRadius:  "9999px",
            padding:       "0.5em 1.4em",
            fontFamily:    "var(--font-inter), sans-serif",
            fontSize:      isMobile ? "0.65rem" : "clamp(0.5rem, 0.78vw, 0.7rem)",
            fontWeight:    500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color:         "#1A2332",
            whiteSpace:    "nowrap",
          }}
        >
          Product Designer Edition
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
            left:       "50%",
            transform:  "translateX(-50%)",
            zIndex:     50,
            userSelect: "none",
            maxWidth:   "95ch",
            textAlign:  "center",
          }}
        >
          <p
            style={{
              margin:        "0 0 0.4em",
              fontFamily:    "var(--font-inter), sans-serif",
              fontSize:      "clamp(0.6rem, 0.85vw, 0.82rem)",
              fontWeight:    700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color:         "#e8510a",
            }}
          >
            Rearrange my desk!
          </p>
          <p
            style={{
              margin:        0,
              fontFamily:    "var(--font-inter), sans-serif",
              fontSize:      "clamp(0.44rem, 0.62vw, 0.6rem)",
              fontWeight:    500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
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
