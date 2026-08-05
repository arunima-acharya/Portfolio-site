"use client";
import { useRef, useEffect, ReactNode } from "react";

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  /** How fast it follows the cursor (0–1, lower = smoother/slower) */
  lerpIn?: number;
  /** How fast it returns to origin (0–1, lower = smoother/slower) */
  lerpOut?: number;
  className?: string;
  activeTransition?: string;
  inactiveTransition?: string;
}

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  lerpIn = 0.08,
  lerpOut = 0.05,
  className = "",
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const isActive = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const factor = isActive.current ? lerpIn : lerpOut;
      current.current.x = lerp(current.current.x, target.current.x, factor);
      current.current.y = lerp(current.current.y, target.current.y, factor);

      el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const threshold = Math.max(rect.width, rect.height) / 2 + padding;

      if (dist < threshold) {
        isActive.current = true;
        target.current = { x: dx / strength, y: dy / strength };
      } else {
        isActive.current = false;
        target.current = { x: 0, y: 0 };
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf.current);
      if (el) el.style.transform = "";
    };
  }, [padding, strength, lerpIn, lerpOut]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
