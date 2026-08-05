"use client";

import { useEffect, useRef } from "react";

interface MenuItem {
  image: string;
  link: string;
  title: string;
  description: string;
}

interface InfiniteMenuProps {
  items: MenuItem[];
  scale?: number;
}

export default function InfiniteMenu({ items }: InfiniteMenuProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    const speed = 0.4;
    const tick = () => {
      const track = trackRef.current;
      if (!track) return;
      const half = track.scrollWidth / 2;
      offsetRef.current -= speed;
      if (Math.abs(offsetRef.current) >= half) offsetRef.current = 0;
      track.style.transform = `translateX(${offsetRef.current}px)`;
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  const doubled = [...items, ...items];

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <div
        ref={trackRef}
        style={{ display: "flex", gap: "28px", willChange: "transform", paddingLeft: "28px" }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: 260,
              background: "#181818",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 18,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ width: "100%", aspectRatio: "1", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: "16px 18px" }}>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#fff", fontFamily: "var(--font-manrope), sans-serif" }}>
                {item.title}
              </p>
              <p style={{ margin: "4px 0 0", fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-manrope), sans-serif" }}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
