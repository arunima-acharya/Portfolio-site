"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TRAIL_COUNT = 12;
const TRAIL_IMAGES = Array.from({ length: TRAIL_COUNT }, (_, i) => `/assets/trail/${i + 1}.svg`);

const MAX_CARDS = 7;
const CARD_LIFETIME = 5000; // ms a card stays visible before it's removed
const CARD_WIDTH = 150; // px, height follows each SVG's own aspect ratio
const MIN_SEPARATION = 190; // px, minimum center-to-center distance so cards don't overlap
const EDGE_MARGIN = 60; // px kept clear from the container's edges
const RESPAWN_DELAY: [number, number] = [200, 600]; // ms random delay before a freed slot respawns
const PLACEMENT_ATTEMPTS = 40;

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
  const cardsRef = useRef<RandomCard[]>([]);
  const nextIndexRef = useRef(0);
  const nextIdRef = useRef(0);
  const timersRef = useRef<number[]>([]);

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

    // Tries random spots and rejects ones too close to an already-alive
    // card, so the up-to-7 concurrent cards never visually overlap.
    const pickPosition = () => {
      const rect = el.getBoundingClientRect();
      const w = Math.max(rect.width - EDGE_MARGIN * 2, 100);
      const h = Math.max(rect.height - EDGE_MARGIN * 2, 100);
      let fallback = { x: EDGE_MARGIN + Math.random() * w, y: EDGE_MARGIN + Math.random() * h };
      for (let attempt = 0; attempt < PLACEMENT_ATTEMPTS; attempt++) {
        const x = EDGE_MARGIN + Math.random() * w;
        const y = EDGE_MARGIN + Math.random() * h;
        const clash = cardsRef.current.some((c) => Math.hypot(c.x - x, c.y - y) < MIN_SEPARATION);
        if (!clash) return { x, y };
        fallback = { x, y };
      }
      return fallback;
    };

    const spawn = () => {
      const { x, y } = pickPosition();
      const src = TRAIL_IMAGES[nextIndexRef.current % TRAIL_IMAGES.length];
      nextIndexRef.current += 1;
      const id = nextIdRef.current++;
      const rotate = Math.random() * 24 - 12;
      const card: RandomCard = { id, src, x, y, rotate };

      setCards((prev) => {
        const next = [...prev, card];
        cardsRef.current = next;
        return next;
      });

      const removeTimer = window.setTimeout(() => {
        setCards((prev) => {
          const next = prev.filter((c) => c.id !== id);
          cardsRef.current = next;
          return next;
        });
        const delay = RESPAWN_DELAY[0] + Math.random() * (RESPAWN_DELAY[1] - RESPAWN_DELAY[0]);
        timersRef.current.push(window.setTimeout(spawn, delay));
      }, CARD_LIFETIME);
      timersRef.current.push(removeTimer);
    };

    // Fill all 7 slots up front, staggered slightly for a nicer entrance
    // instead of all popping in on the same frame.
    for (let i = 0; i < MAX_CARDS; i++) {
      timersRef.current.push(window.setTimeout(spawn, i * 220));
    }

    return () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
      timersRef.current = [];
    };
  }, [containerRef, active]);

  // Drop any lingering cards the instant the effect switches off, so
  // nothing carries over past the beat it's scoped to.
  useEffect(() => {
    if (!active) {
      setCards([]);
      cardsRef.current = [];
    }
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
