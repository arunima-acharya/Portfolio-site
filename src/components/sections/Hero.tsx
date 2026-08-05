"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ease } from "@/lib/animations";
import { useTheme } from "@/components/ThemeProvider";
import { useHeroScroll } from "@/context/HeroScrollContext";

/* ── Reusable inline "Product Designer" styled text ── */
export function ProductDesignerText({ size = "clamp(18px,3.2vw,40px)" }: { size?: string }) {
  return (
    <span className="font-black text-[#111] leading-none inline-flex items-end whitespace-nowrap" style={{ fontSize: size }}>
      Product&nbsp;Desi
      <span
        style={{
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: `calc(${size} * 1.4)`,
          lineHeight: 0.85,
          color: "#111111",
          marginLeft: "1px",
        }}
      >
        g
      </span>
      ner
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";
  const { pdInHero } = useHeroScroll();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* Everything except Product Designer fades out over first 50% of scroll */
  const fadeOut = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handles = [
    "-top-[4px] -left-[4px]",
    "-top-[4px] -right-[4px]",
    "-bottom-[4px] -left-[4px]",
    "-bottom-[4px] -right-[4px]",
    "top-1/2 -translate-y-1/2 -left-[4px]",
    "top-1/2 -translate-y-1/2 -right-[4px]",
    "-top-[4px] left-1/2 -translate-x-1/2",
    "-bottom-[4px] left-1/2 -translate-x-1/2",
  ];

  return (
    /* 200vh container — sticky inner pins the hero for scroll duration */
    <div ref={containerRef} style={{ height: "200vh", marginLeft: "calc(-1 * var(--gutter))", marginRight: "calc(-1 * var(--gutter))", width: "calc(100% + 2 * var(--gutter))" }}>
      <section
        className="relative flex flex-col overflow-hidden noise-overlay"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          backgroundColor: "#efefef",
        }}
        aria-label="Hero"
      >
        <motion.div className="relative flex flex-col flex-1 pt-[49px]" style={{ opacity: fadeOut }}>

          {/* ── Secondary toolbar strip (fades) ── */}
          <motion.div
            style={{ opacity: 1 }}
            className="hidden sm:flex items-center gap-4 px-4 py-2 bg-[#d4d4d4] border-b border-[#bbb] text-[14px] text-[#444] font-normal select-none overflow-x-auto"
          >
            <span className="flex items-center gap-1">
              <span className="w-[21px] h-[21px] bg-[#2a2a2a] inline-flex items-center justify-center text-white text-[10px] font-bold rounded-sm">Ai</span>
              <span className="w-[21px] h-[21px] bg-[#1a6ae8] inline-flex items-center justify-center text-white text-[10px] font-bold rounded-sm">Ps</span>
            </span>
            <span className="w-px h-5 bg-[#bbb]" />
            <span>Selection Tool</span>
            <span className="w-px h-5 bg-[#bbb]" />
            <span>W: <strong>842px</strong></span>
            <span>H: <strong>595px</strong></span>
            <span className="w-px h-5 bg-[#bbb]" />
            <span className="ml-auto flex items-center gap-3">
              <span>100%</span>
              <span className="w-px h-5 bg-[#bbb]" />
              <span>Artboard 1</span>
            </span>
          </motion.div>

          {/* ── Canvas area ── */}
          <div className="flex flex-1">

            {/* ── Left tools panel (fades) ── */}
            <motion.div
              style={{
                background: isLight ? "#f0f0f0" : "#3a3a3a",
                borderRight: `1px solid ${isLight ? "#d0d0d0" : "#1a1a1a"}`,
              }}
              className="hidden md:flex flex-col w-[95px] flex-shrink-0 select-none"
            >
              <div
                className="flex items-center justify-center h-[50px] border-b cursor-pointer transition-colors"
                style={{ background: isLight ? "#e4e4e4" : "#2a2a2a", borderColor: isLight ? "#d0d0d0" : "#1a1a1a" }}
              >
                <span style={{ color: isLight ? "#666" : "#aaa" }} className="text-[18px] font-bold tracking-tight">«</span>
              </div>
              <div className="grid grid-cols-2 gap-px p-px mt-1">
                {["cursor","cursor-filled","pen","anchor","rect","dropper","brush","hand","zoom","pencil","shape","erase"].map((tool) => {
                  const ic = isLight ? "#555" : "#ccc";
                  return (
                    <button key={tool} className="w-[42px] h-[42px] flex items-center justify-center rounded-sm transition-colors" title={tool}>
                      {tool === "cursor"         && <svg viewBox="0 0 14 14" className="w-[25px] h-[25px]" fill={ic}><path d="M2 1l10 6-5 1-2 5z"/></svg>}
                      {tool === "cursor-filled"  && <svg viewBox="0 0 14 14" className="w-[25px] h-[25px]" fill="none"><path d="M2 1l10 6-4.5 1-1.5 4.5z" fill={ic}/><path d="M2 1l10 6-4.5 1-1.5 4.5z" fill="none" stroke={isLight ? "#999" : "#888"} strokeWidth="0.5"/></svg>}
                      {tool === "pen"            && <svg viewBox="0 0 14 14" className="w-[25px] h-[25px]" fill="none"><path d="M3 11 L10 4 M9 3 L11 5 L10 4" stroke={ic} strokeWidth="1.2" strokeLinecap="round"/><circle cx="10.5" cy="3.5" r="1.5" fill={ic}/><circle cx="3" cy="11" r="1.2" fill="none" stroke={ic} strokeWidth="1"/></svg>}
                      {tool === "anchor"         && <svg viewBox="0 0 14 14" className="w-[25px] h-[25px]" fill="none"><path d="M2 12 C2 12 5 8 7 7 C9 6 12 2 12 2" stroke={ic} strokeWidth="1.2" strokeLinecap="round"/><rect x="1.5" y="10.5" width="3" height="3" rx="0.5" fill="none" stroke={ic} strokeWidth="1"/><rect x="9.5" y="0.5" width="3" height="3" rx="0.5" fill="none" stroke={ic} strokeWidth="1"/></svg>}
                      {tool === "rect"           && <svg viewBox="0 0 14 14" className="w-[25px] h-[25px]" fill="none"><rect x="2" y="2" width="10" height="10" rx="0.5" stroke={ic} strokeWidth="1.2"/></svg>}
                      {tool === "dropper"        && <svg viewBox="0 0 14 14" className="w-[25px] h-[25px]" fill="none"><path d="M9 2 L12 5 L6 11 L3 8 Z" stroke={ic} strokeWidth="1"/><path d="M3 8 L2 12 L6 11" stroke={ic} strokeWidth="1" strokeLinecap="round"/><circle cx="11" cy="3" r="1" fill={ic}/></svg>}
                      {tool === "brush"          && <svg viewBox="0 0 14 14" className="w-[25px] h-[25px]" fill="none"><path d="M10 2 L12 4 L5 11 Q3 13 2 12 Q1 11 3 9 Z" stroke={ic} strokeWidth="1" fill="none"/></svg>}
                      {tool === "hand"           && <svg viewBox="0 0 14 14" className="w-[25px] h-[25px]" fill="none"><path d="M4 7V3.5a1 1 0 012 0V7M6 6V3a1 1 0 012 0v3M8 6V3.5a1 1 0 012 0V8c0 2-1.5 4-3 4S3 10 3 8V7" stroke={ic} strokeWidth="1" strokeLinecap="round"/></svg>}
                      {tool === "zoom"           && <svg viewBox="0 0 14 14" className="w-[25px] h-[25px]" fill="none"><circle cx="6" cy="6" r="4" stroke={ic} strokeWidth="1.2"/><path d="M9 9 L12 12" stroke={ic} strokeWidth="1.5" strokeLinecap="round"/></svg>}
                      {tool === "pencil"         && <svg viewBox="0 0 14 14" className="w-[25px] h-[25px]" fill="none"><path d="M3 10 L10 3 L11 4 L4 11 Z" stroke={ic} strokeWidth="1" fill="none"/><path d="M3 10 L2 12 L4 11 Z" fill={ic}/></svg>}
                      {tool === "shape"          && <svg viewBox="0 0 14 14" className="w-[25px] h-[25px]" fill="none"><rect x="2" y="5" width="5" height="7" rx="0.5" fill="#111111" opacity="0.9"/><rect x="7" y="2" width="5" height="7" rx="0.5" stroke={ic} strokeWidth="1" fill="none"/></svg>}
                      {tool === "erase"          && <svg viewBox="0 0 14 14" className="w-[25px] h-[25px]" fill="none"><path d="M2 10 L8 3 L11 6 L5 12 Z" stroke={ic} strokeWidth="1"/><path d="M2 12 H12" stroke={ic} strokeWidth="1" strokeLinecap="round"/></svg>}
                    </button>
                  );
                })}
              </div>
              <div className="h-px mx-2 my-2" style={{ background: isLight ? "#d0d0d0" : "#1a1a1a" }} />
              <div className="flex flex-col items-center gap-1 px-2">
                <div className="relative w-[66px] h-[66px]">
                  <div className="absolute bottom-0 right-0 w-[43px] h-[43px] border" style={{ background: isLight ? "#bbb" : "#555", borderColor: isLight ? "#999" : "#888" }} />
                  <div className="absolute top-0 left-0 w-[43px] h-[43px] bg-[#111111]" />
                  <svg className="absolute -top-1 -right-1 w-[28px] h-[28px]" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4 A5 5 0 1 0 13 9" stroke={isLight ? "#666" : "#ccc"} strokeWidth="1.2" strokeLinecap="round"/>
                    <path d="M13 5.5 L13 9 L9.5 9" stroke={isLight ? "#666" : "#ccc"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="h-px mx-2 my-2" style={{ background: isLight ? "#d0d0d0" : "#1a1a1a" }} />
              <div className="flex flex-col items-center gap-1 px-2">
                <div className="relative w-[66px] h-[59px]">
                  <div className="absolute top-0 left-0 w-[43px] h-[43px] border" style={{ background: isLight ? "#333" : "#111", borderColor: isLight ? "#999" : "#666" }} />
                  <div className="absolute bottom-0 right-0 w-[36px] h-[36px] border" style={{ background: isLight ? "#ddd" : "#aaa", borderColor: isLight ? "#999" : "#666" }} />
                </div>
                <div className="w-[43px] h-[43px] border relative overflow-hidden" style={{ borderColor: isLight ? "#999" : "#666" }}>
                  <div className="absolute inset-0" style={{ background: isLight ? "#e0e0e0" : "#3a3a3a" }} />
                  <div className="absolute top-0 left-0 w-full h-full" style={{ background: "linear-gradient(135deg, transparent 45%, #e84040 45%, #e84040 55%, transparent 55%)" }} />
                </div>
              </div>
              <div className="h-px mx-2 my-2" style={{ background: isLight ? "#d0d0d0" : "#1a1a1a" }} />
              <div className="flex flex-col items-center gap-1 pb-3">
                <div className="flex gap-2">
                  <div className="w-[25px] h-[25px] rounded-full bg-[#111111]" />
                  <div className="w-[25px] h-[25px] rounded-full bg-[#111111]" />
                </div>
                <div className="w-[25px] h-[25px] rounded-full bg-[#111111]" />
              </div>
            </motion.div>

            {/* ── Main artboard ── */}
            <div className="flex-1 relative overflow-hidden">

              {/* Rulers */}
              <div className="absolute inset-0 pointer-events-none z-40">
                <div className="absolute top-0 left-0 right-0 h-[20px] overflow-hidden" style={{ opacity: 0.75 }}>
                  <svg width="100%" height="20" style={{ display: "block" }}>
                    {Array.from({ length: 200 }).map((_, i) => {
                      const x = i * 10;
                      const isMajor = i % 5 === 0;
                      return (
                        <g key={i}>
                          <line x1={x} y1={20} x2={x} y2={isMajor ? 7 : 13} stroke="#111111" strokeWidth="1" />
                          {isMajor && i > 0 && <text x={x + 2} y={9} fontSize="7" fill="#111111" fontFamily="monospace">{i * 10}</text>}
                        </g>
                      );
                    })}
                  </svg>
                </div>
                <div className="absolute top-0 left-0 bottom-0 w-[20px] overflow-hidden" style={{ opacity: 0.75 }}>
                  <svg height="100%" width="20" style={{ display: "block" }}>
                    {Array.from({ length: 200 }).map((_, i) => {
                      const y = i * 10;
                      const isMajor = i % 5 === 0;
                      return (
                        <g key={i}>
                          <line x1={20} y1={y} x2={isMajor ? 7 : 13} y2={y} stroke="#111111" strokeWidth="1" />
                          {isMajor && i > 0 && <text x={1} y={y + 7} fontSize="7" fill="#111111" fontFamily="monospace" writingMode="tb">{i * 10}</text>}
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Full-bleed canvas */}
              <div
                className="absolute inset-0"
                style={{ backgroundImage: "url('/header.png')", backgroundSize: "clamp(280px,77%,77%)", backgroundPosition: "center 70%", backgroundRepeat: "no-repeat" }}
              >
                {/* ── All canvas elements ── */}
                <div className="absolute inset-0">

                  <img
                    src="/IMAGE.png"
                    alt=""
                    className="absolute z-10 pointer-events-none"
                    style={{ top: "15%", left: "45%", transform: "translateX(-50%)", width: "clamp(103px,25.9vw,311px)", objectFit: "contain" }}
                  />

                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2, ease }}
                    className="absolute top-[6%] left-[5%] flex items-center gap-1 z-30"
                  >
                    <span className="bg-[#1e1e1e] text-white font-black rounded-sm flex items-center justify-center overflow-hidden" style={{ width: "clamp(18px,2.8vw,32px)", height: "clamp(18px,2.8vw,32px)" }}>
                      <svg viewBox="0 0 38 57" style={{ width: "clamp(9px,1.4vw,16px)", height: "clamp(14px,2.1vw,24px)" }}>
                        <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.5 9.5 0 0 1 19 28.5z" fill="#1ABCFE"/>
                        <path d="M9.5 57A9.5 9.5 0 0 1 9.5 38H19V57z" fill="#0ACF83"/>
                        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19V57A9.5 9.5 0 0 1 0 47.5z" fill="#0ACF83"/>
                        <path d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19V38H9.5A9.5 9.5 0 0 1 0 28.5z" fill="#A259FF"/>
                        <path d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19V19H9.5A9.5 9.5 0 0 1 0 9.5z" fill="#F24E1E"/>
                        <path d="M19 0H28.5A9.5 9.5 0 0 1 28.5 19H19z" fill="#FF7262"/>
                      </svg>
                    </span>
                    <span className="bg-[#1e1e1e] text-white font-black rounded-sm flex items-center justify-center overflow-hidden" style={{ width: "clamp(18px,2.8vw,32px)", height: "clamp(18px,2.8vw,32px)" }}>
                      <svg viewBox="0 0 100 100" style={{ width: "clamp(11px,1.7vw,20px)", height: "clamp(11px,1.7vw,20px)" }}>
                        <polygon points="50,5 95,35 80,95 20,95 5,35" fill="#FDB300"/>
                        <polygon points="50,5 95,35 80,95 20,95 5,35" fill="none" stroke="#111111" strokeWidth="2"/>
                        <polygon points="50,30 73,38 65,75 35,75 27,38" fill="white" opacity="0.9"/>
                      </svg>
                    </span>
                    <span className="bg-[#2a2a2a] text-white font-black rounded-sm flex items-center justify-center" style={{ fontSize: "clamp(7px,1.1vw,13px)", width: "clamp(18px,2.8vw,32px)", height: "clamp(18px,2.8vw,32px)" }}>Ai</span>
                    <span className="bg-[#1a6ae8] text-white font-black rounded-sm flex items-center justify-center" style={{ fontSize: "clamp(7px,1.1vw,13px)", width: "clamp(18px,2.8vw,32px)", height: "clamp(18px,2.8vw,32px)" }}>Ps</span>
                  </motion.div>


                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.65, ease }}
                    className="absolute bottom-[5%] left-[5%] flex items-end gap-1 z-20"
                  >
                    <div className="flex flex-col gap-px leading-none" style={{ fontSize: "clamp(7.5px,1.08vw,12.6px)" }}>
                      <span className="text-[#555] tracking-widest uppercase">Color</span>
                      <span className="text-[#555] tracking-widest uppercase">Palette</span>
                    </div>
                    <div className="flex gap-px ml-1">
                      {["#222","#666","#bbb","#111111"].map(c => (
                        <div key={c} style={{ backgroundColor: c, width: "clamp(16.5px,2.88vw,32.4px)", height: "clamp(16.5px,2.88vw,32.4px)", border: "1px solid #bbb" }} />
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7, ease }}
                    className="absolute top-[6%] right-[5%] z-20"
                    style={{ lineHeight: "0.9" }}
                  >
                    <div className="font-black text-[#111] flex items-end whitespace-nowrap" style={{ fontSize: "clamp(15px,2.4vw,28.5px)", lineHeight: 1, marginBottom: "clamp(2px,0.4vw,5px)" }}>
                      Arunima
                      <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(21px,3.45vw,40.5px)", lineHeight: 0.85, color: "#111111", marginLeft: "1px" }}>A</span>
                      charya
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8, ease }}
                    className="absolute bottom-[5%] right-[4%] z-20"
                  >
                    <Link href="/case-studies">
                      <motion.div
                        className="flex items-center gap-2 border-2 border-[#111111] text-[#111111] font-bold px-4 py-2 rounded-sm relative group"
                        style={{ fontSize: "clamp(9px,1.1vw,14px)" }}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(232,81,10,0.08)" }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        <span className="tracking-wide">View Work</span>
                        <motion.div animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
                          <ArrowUpRight size={14} />
                        </motion.div>
                      </motion.div>
                    </Link>
                  </motion.div>

                  {/* ── Product Designer widget (static) ── */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease }}
                    className="absolute top-[27%] left-[78%] -translate-x-1/2 z-20 select-none"
                  >
                    <div className="relative px-2 py-1" style={{ border: "1.5px solid #111111" }}>
                      {handles.map((pos, i) => (
                        <span key={i} className={`absolute w-[7px] h-[7px] bg-white border border-[#111111] ${pos}`} />
                      ))}
                      <div className="font-black text-[#111] leading-none" style={{ fontSize: "clamp(18px,3.2vw,40px)" }}>
                        <div>Product</div>
                        <div className="flex items-end">
                          Desi
                          <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(25px,4.5vw,56px)", lineHeight: 0.85, color: "#111111", marginLeft: "1px" }}>g</span>
                          ner
                        </div>
                      </div>
                    </div>
                  </motion.div>

                </div>

                {/* ── Product Designer widget — flies to paragraph on scroll ── */}
                {pdInHero && <motion.div
                  layoutId="product-designer"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease }}
                  className="absolute top-[27%] left-[78%] -translate-x-1/2 z-20 select-none"
                >
                  <div className="relative px-2 py-1" style={{ border: "1.5px solid #111111" }}>
                    {handles.map((pos, i) => (
                      <span key={i} className={`absolute w-[7px] h-[7px] bg-white border border-[#111111] ${pos}`} />
                    ))}
                    <div className="font-black text-[#111] leading-none" style={{ fontSize: "clamp(18px,3.2vw,40px)" }}>
                      <div>Product</div>
                      <div className="flex items-end">
                        Desi
                        <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(25px,4.5vw,56px)", lineHeight: 0.85, color: "#111111", marginLeft: "1px" }}>g</span>
                        ner
                      </div>
                    </div>
                  </div>
                </motion.div>}

              </div>
            </div>

            {/* ── Right properties panel ── */}
            <motion.div
              style={{
                background: isLight ? "#f0f0f0" : "#2a2a2a",
                borderLeft: `1px solid ${isLight ? "#d0d0d0" : "#1a1a1a"}`,
                color: isLight ? "#444" : "#aaa",
              }}
              className="hidden lg:flex flex-col w-[202px] flex-shrink-0 text-[15px]"
            >
              <div
                className="px-4 py-3 border-b font-semibold text-[15px]"
                style={{ background: isLight ? "#e4e4e4" : "#333", borderColor: isLight ? "#d0d0d0" : "#1a1a1a", color: isLight ? "#111" : "#fff" }}
              >
                Properties
              </div>
              <div className="px-4 py-3 border-b" style={{ borderColor: isLight ? "#d0d0d0" : "#1a1a1a" }}>
                <div className="text-[14px] mb-1" style={{ color: isLight ? "#999" : "#666" }}>Layer</div>
                {["Portfolio","‹text›","‹text›","‹Symbol›","‹Group›","‹Path›","Rectangle","Rectangle","Rectangle"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 py-1 px-1.5 rounded cursor-default">
                    <span className="w-[11px] h-[11px] rounded-sm flex-shrink-0" style={{ backgroundColor: i === 0 ? "#111111" : i < 4 ? "#4a90d9" : "#888" }} />
                    <span className="text-[14px] truncate">{item}</span>
                  </div>
                ))}
              </div>
              {["Libraries", "Pathfinder", "Character"].map((label) => (
                <div
                  key={label}
                  className="px-4 py-3 border-b font-semibold text-[14px] cursor-default"
                  style={{ borderColor: isLight ? "#d0d0d0" : "#1a1a1a", color: isLight ? "#333" : "#ccc" }}
                >
                  {label}
                </div>
              ))}
            </motion.div>

          </div>
        </motion.div>
      </section>
    </div>
  );
}
