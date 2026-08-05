"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { useIsMobile } from "@/hooks/useIsMobile";

const InfiniteMenu = dynamic(() => import("@/components/ui/InfiniteMenu.jsx"), { ssr: false });

const testimonials = [
  {
    name: "Sarah M.",
    role: "Head of Product at Fintech Co.",
    quote: "Arunima transformed our complex fintech flows into an experience users actually love. Conversion jumped 40% in the first quarter.",
  },
  {
    name: "James R.",
    role: "Co-Founder at HealthApp",
    quote: "She brought structure and clarity to a chaotic product backlog. The design system she built saved us months of engineering time.",
  },
  {
    name: "Priya K.",
    role: "CPO at SaaS Startup",
    quote: "Working with Arunima felt like having a strategic design partner. She asks the right questions and delivers pixel-perfect results.",
  },
  {
    name: "Tom L.",
    role: "Design Lead at Agency",
    quote: "Her UX research uncovered pain points we had missed for years. The redesign led to a 30% drop in support tickets overnight.",
  },
];

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? current + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawQuoteMark(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, flipped = false) {
  // Draw two typographic curved comma shapes side by side
  const gap = size * 0.55;
  const offsets = [-gap / 2, gap / 2];

  offsets.forEach(ox => {
    const cx = x + ox;
    const r = size * 0.22;
    const tailH = size * 0.28;

    ctx.save();
    if (flipped) {
      ctx.translate(cx, y + size * 0.1);
      ctx.scale(1, -1);
    } else {
      ctx.translate(cx, y);
    }

    // Circle dot
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();

    // Curved tail below the dot
    ctx.beginPath();
    ctx.moveTo(-r * 0.7, r * 0.6);
    ctx.bezierCurveTo(-r * 1.1, r + tailH * 0.3, r * 0.4, r + tailH * 0.7, r * 0.3, r + tailH);
    ctx.bezierCurveTo(r * 1.0, r + tailH * 0.5, r * 0.6, r * 0.8, r * 0.7, r * 0.6);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  });
}

function makeTextImage(name: string, role: string, quote: string): string {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, size, size);

  // White circle background
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  const fontSize = 22;
  const lineH = fontSize * 1.45;
  const pad = 110;
  const innerW = size - pad * 2;
  const quoteSize = 22;
  const gap = 56;

  // Measure lines first
  ctx.font = `400 ${fontSize}px Inter, sans-serif`;
  const lines = wrapText(ctx, quote, innerW);
  const textBlockH = lines.length * lineH;
  const totalH = quoteSize + gap + textBlockH + gap + quoteSize;

  // Vertically center the whole block in the circle
  const blockStartY = (size - totalH) / 2;

  // Neon glow ring on top of the white circle
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 2;
  // Outer soft glow
  ctx.save();
  ctx.shadowColor = "#e8510a";
  ctx.shadowBlur = 28;
  ctx.strokeStyle = "rgba(232,81,10,0.55)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  // Inner tighter glow
  ctx.shadowBlur = 10;
  ctx.strokeStyle = "rgba(232,81,10,0.35)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r - 4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Opening quote marks
  ctx.fillStyle = "#e8510a";
  drawQuoteMark(ctx, size / 2, blockStartY, quoteSize, false);

  // Quote text
  ctx.font = `400 ${fontSize}px Inter, sans-serif`;
  ctx.fillStyle = "#e8510a";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  const textStartY = blockStartY + quoteSize + gap;
  lines.forEach((line, i) => {
    ctx.fillText(line, size / 2, textStartY + i * lineH);
  });

  // Closing quote marks (flipped)
  ctx.fillStyle = "#e8510a";
  drawQuoteMark(ctx, size / 2, textStartY + textBlockH + gap, quoteSize, true);

  return canvas.toDataURL("image/png");
}

export default function Testimonials() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const isMobile = useIsMobile();
  const [items, setItems] = useState<{ image: string; link: string; title: string; description: string }[]>([]);

  useEffect(() => {
    const generated = testimonials.map(t => ({
      image: makeTextImage(t.name, t.role, t.quote),
      link: "",
      title: t.name,
      description: t.role.replace(" at ", "\nat "),
    }));
    setItems(generated);
  }, []);

  return (
    <section
      style={{
        background: "#fff",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        {items.length > 0 && <InfiniteMenu items={items} scale={isMobile ? 1.2 : 1.7} />}
      </div>
    </section>
  );
}
