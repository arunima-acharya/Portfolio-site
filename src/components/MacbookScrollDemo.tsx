"use client";
import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

export default function MacbookScrollDemo() {
  return (
    <div className="w-full overflow-hidden bg-[#0B0B0F]">
      <MacbookScroll
        src="/assets/3d/screen.gif"
        showGradient={false}
      />
    </div>
  );
}
