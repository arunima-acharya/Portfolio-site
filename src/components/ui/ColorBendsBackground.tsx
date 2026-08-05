"use client";

import dynamic from "next/dynamic";

const ColorBends = dynamic(() => import("./ColorBends"), { ssr: false });

export default function ColorBendsBackground() {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
    }}>
      <ColorBends
        colors={["#ff6a00", "#ff9f1c", "#ffca3a"]}
        rotation={-96}
        speed={0.14}
        scale={1}
        frequency={1.4}
        warpStrength={0.97}
        mouseInfluence={1}
        noise={0.22}
        parallax={0.5}
        iterations={3}
        intensity={0.5}
        bandWidth={4}
        transparent
        autoRotate={2}
      />
    </div>
  );
}
