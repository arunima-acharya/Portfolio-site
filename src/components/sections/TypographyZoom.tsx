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
        <div
          style={{
            fontSize:   isMobile ? "1.56rem" : "clamp(1.2rem, 3.6vw, 3rem)",
            fontFamily: "var(--font-gelica)",
            fontWeight: 600,
            color:      "var(--sp-cocoa)",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          what&apos;s on my desk
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
          product designer edition
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
              margin:        "0 0 0.4em",
              fontFamily:    "var(--font-geist), sans-serif",
              fontSize:      "16px",
              fontWeight:    700,
              color:         "var(--sp-orange)",
            }}
          >
            rearrange my desk!
          </p>
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
