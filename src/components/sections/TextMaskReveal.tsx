"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PREVIEW_CARDS = [
  {
    label: "HOSPITALITY TECHNOLOGY",
    title: "Revenue Performance Dashboard",
    gradient: "radial-gradient(ellipse at 30% 40%, #c8e6c9 0%, #81c784 40%, #388e3c 100%)",
  },
  {
    label: "HOSPITALITY TECH",
    title: "Channel Manager Redesign",
    gradient: "radial-gradient(ellipse at 70% 60%, #b3e5fc 0%, #4fc3f7 40%, #0277bd 100%)",
  },
];

export default function TextMaskReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskTextRef  = useRef<SVGTextElement>(null);
  const labelRef     = useRef<HTMLSpanElement>(null);
  const previewRef   = useRef<HTMLDivElement>(null);
  const svgRef       = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const maskText = maskTextRef.current;
      const label    = labelRef.current;
      const preview  = previewRef.current;
      const svg      = svgRef.current;
      if (!maskText || !label || !preview || !svg) return;

      // Frame-0 states — text is already visible, preview hidden below
      gsap.set(label,    { opacity: 1 });
      gsap.set(preview,  { opacity: 0, y: "58vh" });
      gsap.set(svg,      { opacity: 1 });
      // svgOrigin pins the scale pivot to the viewport centre (SVG coords 720,450)
      gsap.set(maskText, { scale: 1, svgOrigin: "720 450" });

      const tl = gsap.timeline({ defaults: { ease: "none" } });

      // 0 → 8 %   — HTML label fades out (text "transitions" into the mask)
      tl.to(label, { opacity: 0, duration: 0.08 }, 0);

      // 0 → 30%   — text scales 1 → 3  (letter holes open up)
      tl.to(maskText, { scale: 3, duration: 0.30 }, 0);

      // 30 → 100% — text scales 3 → 22 (viewport consumed by letterforms)
      tl.to(maskText, { scale: 22, duration: 0.70, ease: "power1.in" }, 0.30);

      // 26 → 55%  — preview fades in through the growing holes
      tl.to(preview, { opacity: 1, duration: 0.29 }, 0.26);

      // 28 → 82%  — preview eases upward from 58 vh → 0
      tl.to(preview, { y: "0vh", duration: 0.54, ease: "power2.out" }, 0.28);

      // 82 → 97%  — SVG mask dissolves, full viewport released to preview
      tl.to(svg, { opacity: 0, duration: 0.15 }, 0.82);

      ScrollTrigger.create({
        animation: tl,
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      data-cursor-hidden
      style={{
        height: "500vh",
        position: "relative",
        width: "100vw",
        marginLeft: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* ── Layer 0 — preview rises through letterform holes ── */}
        <div
          ref={previewRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background: "#f3f3f3",
            display: "flex",
            flexDirection: "column",
            padding: "80px 15%",
            gap: "24px",
            willChange: "transform, opacity",
          }}
        >
          <p style={{
            fontFamily: "var(--font-manrope), Manrope, sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            color: "#999",
            textTransform: "uppercase",
            margin: 0,
          }}>
            Selected Works
          </p>
          <div style={{ display: "flex", gap: "20px", flex: 1 }}>
            {PREVIEW_CARDS.map((card) => (
              <div
                key={card.title}
                style={{
                  flex: 1,
                  borderRadius: "20px",
                  background: card.gradient,
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  minHeight: "360px",
                }}
              >
                <p style={{
                  fontFamily: "var(--font-manrope), Manrope, sans-serif",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.7)",
                  textTransform: "uppercase",
                  margin: "0 0 6px",
                }}>
                  {card.label}
                </p>
                <p style={{
                  fontFamily: "var(--font-manrope), Manrope, sans-serif",
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "#fff",
                  margin: 0,
                  lineHeight: 1.3,
                }}>
                  {card.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Layer 1 — SVG mask: background rect with text-shaped holes ── */}
        {/* White areas in mask = show the #f3f3f3 rect                     */}
        {/* Black (text) areas  = transparent holes → expose Layer 0 below  */}
        <svg
          ref={svgRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            overflow: "visible",
            willChange: "opacity",
          }}
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <mask id="dtii-mask" maskUnits="userSpaceOnUse">
              <rect x="-1200" y="-1200" width="3840" height="3300" fill="white" />
              <text
                ref={maskTextRef}
                x="720"
                y="450"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="var(--font-manrope), Manrope, sans-serif"
                fontSize="62"
                fontWeight="400"
                fill="black"
                letterSpacing="-0.01em"
              >
                DESIGN THAT IS INVISIBLE
              </text>
            </mask>
          </defs>
          <rect
            x="-1200" y="-1200" width="3840" height="3300"
            fill="#f3f3f3"
            mask="url(#dtii-mask)"
          />
        </svg>

        {/* ── Layer 2 — HTML label: visible at frame 0, fades by 8% scroll ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <span
            ref={labelRef}
            style={{
              fontFamily: "var(--font-manrope), Manrope, sans-serif",
              fontSize: "62px",
              fontWeight: 400,
              color: "#0a0a0a",
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
              willChange: "opacity",
            }}
          >
            DESIGN THAT IS INVISIBLE
          </span>
        </div>
      </div>
    </div>
  );
}
