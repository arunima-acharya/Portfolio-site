import type { ReactNode } from "react";

// Shares one pinned background image behind MainframeHero + TypographyZoom.
// The sticky layer has height: 0 so it never reserves space of its own —
// it just pins its absolutely-positioned child to the viewport for as long
// as this wrapper's (multi-section-tall) box is being scrolled through,
// then releases naturally once both sections have passed. The sections
// themselves render as normal, transparent-background siblings on top, so
// scrolling slides their content up over the fixed backdrop.
export default function HeroBgSticky({ children }: { children: ReactNode }) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: 0, zIndex: 0 }}>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100vh",
            background: "url('/herobg.svg') center / cover no-repeat",
          }}
        />
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
