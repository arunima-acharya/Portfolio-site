"use client";
import { useRef, useEffect, ReactNode } from "react";

interface FaceTrackerProps {
  children: ReactNode;
  maxRotation?: number;
  lerp?: number;
  className?: string;
}

export default function FaceTracker({
  children,
  maxRotation = 18,
  lerp = 0.07,
  className = "",
}: FaceTrackerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const lerpFn = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      current.current.x = lerpFn(current.current.x, target.current.x, lerp);
      current.current.y = lerpFn(current.current.y, target.current.y, lerp);

      el.style.transform = `rotateY(${current.current.x}deg) rotateX(${-current.current.y}deg)`;
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Normalize -1 to 1 based on viewport
      const nx = (e.clientX - cx) / (window.innerWidth / 2);
      const ny = (e.clientY - cy) / (window.innerHeight / 2);

      target.current = {
        x: nx * maxRotation,
        y: ny * maxRotation,
      };
    };

    const onMouseLeave = () => {
      target.current = { x: 0, y: 0 };
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [maxRotation, lerp]);

  return (
    <div style={{ perspective: "800px" }} className={className}>
      <div ref={ref} style={{ willChange: "transform", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </div>
  );
}
