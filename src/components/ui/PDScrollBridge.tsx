"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const HANDLES = [
  "-top-[4px] -left-[4px]",
  "-top-[4px] -right-[4px]",
  "-bottom-[4px] -left-[4px]",
  "-bottom-[4px] -right-[4px]",
  "top-1/2 -translate-y-1/2 -left-[4px]",
  "top-1/2 -translate-y-1/2 -right-[4px]",
  "-top-[4px] left-1/2 -translate-x-1/2",
  "-bottom-[4px] left-1/2 -translate-x-1/2",
];

export default function PDScrollBridge() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawOpacity = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 22, damping: 20, mass: 2 });
  const y = useSpring(rawY, { stiffness: 22, damping: 20, mass: 2 });

  useEffect(() => {
    const update = () => {
      const heroEl = document.getElementById("hero");
      const heroAnchor = document.getElementById("hero-pd-anchor");
      const introAnchor = document.getElementById("intro-pd-anchor");
      if (!heroEl || !heroAnchor || !introAnchor) return;

      const heroRect = heroAnchor.getBoundingClientRect();
      const introRect = introAnchor.getBoundingClientRect();

      const heroStart = heroEl.offsetTop;
      const heroScrollRange = heroEl.offsetHeight - window.innerHeight;
      const heroProgress = Math.max(0, Math.min(1, (window.scrollY - heroStart) / heroScrollRange));

      // t: 0 at 40% hero scroll → 1 at 100% hero scroll
      const t = Math.max(0, Math.min(1, (heroProgress - 0.4) / 0.6));

      // REVERSED: PD travels FROM intro (below) → UP to hero widget
      rawX.set(introRect.left + (heroRect.left - introRect.left) * t);
      rawY.set(introRect.top + (heroRect.top - introRect.top) * t);

      // Bridge active during hero scroll phase; hide once intro anchor lands in viewport
      const introLanded = introRect.top < window.innerHeight * 0.85 && introRect.top > -80;
      rawOpacity.set(heroProgress > 0.3 && !introLanded ? 1 : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [rawX, rawY, rawOpacity]);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x,
        y,
        opacity: rawOpacity,
        zIndex: 9998,
        pointerEvents: "none",
      }}
    >
      <div className="relative px-2 py-1" style={{ border: "1.5px solid #e8510a" }}>
        {HANDLES.map((pos, i) => (
          <span
            key={i}
            className={`absolute w-[7px] h-[7px] border border-[#e8510a] ${pos}`}
            style={{ background: isLight ? "#fff" : "#2a2a2a" }}
          />
        ))}
        <div
          className="font-black leading-none"
          style={{ fontSize: "clamp(18px,3.2vw,40px)", color: isLight ? "#111" : "#fff" }}
        >
          <div>Product</div>
          <div className="flex items-end">
            Desi
            <span
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(25px,4.5vw,56px)",
                lineHeight: 0.85,
                color: "#e8510a",
                marginLeft: "1px",
              }}
            >
              g
            </span>
            ner
          </div>
        </div>
      </div>
    </motion.div>
  );
}
