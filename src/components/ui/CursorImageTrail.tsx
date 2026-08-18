"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TRAIL_COUNT = 12;
const TRAIL_IMAGES = Array.from({ length: TRAIL_COUNT }, (_, i) => `/assets/trail/${i + 1}.svg`);

const SPAWN_MIN_DISTANCE = 40; // px of mouse movement before the next card spawns
const SPAWN_MIN_INTERVAL = 90; // ms throttle between spawns, even if moving fast
const CARD_LIFETIME = 900; // ms a card stays mounted before it's removed
const CARD_WIDTH = 150; // px, height follows each SVG's own aspect ratio
const MAX_ALIVE = 10;

type TrailCard = {
  id: number;
  src: string;
  x: number;
  y: number;
  rotate: number;
};

export default function CursorImageTrail({
  containerRef,
  active,
}: {
  containerRef: RefObject<HTMLElement | null>;
  active: boolean;
}) {
  const [cards, setCards] = useState<TrailCard[]>([]);
  const nextIndexRef = useRef(0);
  const nextIdRef = useRef(0);
  const lastSpawnRef = useRef({ x: -9999, y: -9999, t: 0 });

  // Warm the cache for all 12 (fairly heavy) trail SVGs up front so the
  // first few cursor movements don't stall waiting on a fresh request.
  useEffect(() => {
    TRAIL_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !active) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const now = performance.now();
      const dx = x - lastSpawnRef.current.x;
      const dy = y - lastSpawnRef.current.y;
      if (Math.hypot(dx, dy) < SPAWN_MIN_DISTANCE || now - lastSpawnRef.current.t < SPAWN_MIN_INTERVAL) return;
      lastSpawnRef.current = { x, y, t: now };

      const src = TRAIL_IMAGES[nextIndexRef.current % TRAIL_IMAGES.length];
      nextIndexRef.current += 1;
      const id = nextIdRef.current++;
      const rotate = Math.random() * 24 - 12;

      setCards((prev) => {
        const next = [...prev, { id, src, x, y, rotate }];
        return next.length > MAX_ALIVE ? next.slice(next.length - MAX_ALIVE) : next;
      });

      window.setTimeout(() => {
        setCards((prev) => prev.filter((c) => c.id !== id));
      }, CARD_LIFETIME);
    };

    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [containerRef, active]);

  // Drop any lingering cards the instant the effect switches off (e.g. the
  // moment scroll carries past the intro beat), so nothing carries over.
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
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
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
