"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TRAIL_COUNT = 12;
const TRAIL_IMAGES = Array.from({ length: TRAIL_COUNT }, (_, i) => `/assets/trail/${i + 1}.svg`);

const SPAWN_INTERVAL = 1200; // ms between new cards appearing
const CARD_LIFETIME = 5000; // ms a card stays visible before it's removed
const CARD_WIDTH = 150; // px, height follows each SVG's own aspect ratio
const EDGE_MARGIN = 80; // px kept clear from the container's edges, so cards don't spawn clipped

type RandomCard = {
  id: number;
  src: string;
  x: number;
  y: number;
  rotate: number;
};

export default function RandomImageAppear({
  containerRef,
  active,
}: {
  containerRef: RefObject<HTMLElement | null>;
  active: boolean;
}) {
  const [cards, setCards] = useState<RandomCard[]>([]);
  const nextIndexRef = useRef(0);
  const nextIdRef = useRef(0);

  // Warm the cache for all 12 (fairly heavy) SVGs up front so the first
  // spawn isn't waiting on a fresh network request.
  useEffect(() => {
    TRAIL_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (!active) return;
    const el = containerRef.current;
    if (!el) return;

    const spawn = () => {
      const rect = el.getBoundingClientRect();
      const w = Math.max(rect.width - EDGE_MARGIN * 2, 100);
      const h = Math.max(rect.height - EDGE_MARGIN * 2, 100);
      const x = EDGE_MARGIN + Math.random() * w;
      const y = EDGE_MARGIN + Math.random() * h;

      const src = TRAIL_IMAGES[nextIndexRef.current % TRAIL_IMAGES.length];
      nextIndexRef.current += 1;
      const id = nextIdRef.current++;
      const rotate = Math.random() * 24 - 12;

      setCards((prev) => [...prev, { id, src, x, y, rotate }]);

      window.setTimeout(() => {
        setCards((prev) => prev.filter((c) => c.id !== id));
      }, CARD_LIFETIME);
    };

    spawn();
    const interval = window.setInterval(spawn, SPAWN_INTERVAL);
    return () => window.clearInterval(interval);
  }, [containerRef, active]);

  // Drop any lingering cards the instant the effect switches off, so
  // nothing carries over past the beat it's scoped to.
  useEffect(() => {
    if (!active) setCards([]);
  }, [active]);

  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <AnimatePresence>
        {cards.map((card) => (
          <motion.img
            key={card.id}
            src={card.src}
            alt=""
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              left: card.x - CARD_WIDTH / 2,
              top: card.y,
              width: CARD_WIDTH,
              height: "auto",
              rotate: card.rotate,
              borderRadius: "8px",
              filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.25))",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
