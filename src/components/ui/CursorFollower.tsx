"use client";

import { useEffect, useRef } from "react";

interface CursorFollowerProps {
  src: string;
  alt?: string;
  width?: number;
  /** How strongly the element chases the cursor. 0 = no movement, 1 = instant. */
  lerp?: number;
  /** Max pixel offset from rest position in each axis. */
  maxOffset?: number;
}

/**
 * Renders an image that smoothly follows the cursor via a rAF lerp loop.
 * Position is centred on the element's natural layout position; the cursor
 * creates a parallax offset around that centre.
 */
export default function CursorFollower({
  src,
  alt = "",
  width = 340,
  lerp = 0.07,
  maxOffset = 28,
}: CursorFollowerProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Normalise cursor relative to viewport centre: range [-1, 1]
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      target.current.x = nx * maxOffset;
      target.current.y = ny * maxOffset;
    };

    const tick = () => {
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * lerp;
      c.y += (t.y - c.y) * lerp;

      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate(${c.x}px, ${c.y}px)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [lerp, maxOffset]);

  return (
    <div
      ref={wrapRef}
      style={{ width, willChange: "transform", flexShrink: 0 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{ width: "100%", height: "auto", display: "block", userSelect: "none" }}
      />
    </div>
  );
}
