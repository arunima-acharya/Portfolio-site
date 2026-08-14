"use client";

import { usePathname } from "next/navigation";

export default function GrainientBackground() {
  const pathname = usePathname();
  // /m/* routes are the standalone mobile experience and paint their own background.
  if (pathname?.startsWith("/m")) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
      backgroundColor: "var(--bg-secondary)",
    }} />
  );
}
