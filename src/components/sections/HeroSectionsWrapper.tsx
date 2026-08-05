"use client";

import { useRef } from "react";
import ImageTrailWrapper from "@/components/ui/ImageTrailWrapper";

export default function HeroSectionsWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <ImageTrailWrapper variant={1} boundary={ref} />
      {children}
    </div>
  );
}
