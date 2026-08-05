"use client";

import { HeroScrollProvider } from "@/context/HeroScrollContext";
import type { ReactNode } from "react";

export default function HomeClient({ children }: { children: ReactNode }) {
  return (
    <HeroScrollProvider>
      <div style={{ backgroundColor: "#F1EFEA" }}>{children}</div>
    </HeroScrollProvider>
  );
}
