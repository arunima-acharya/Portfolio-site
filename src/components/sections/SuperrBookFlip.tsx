"use client";

// Ported 1:1 from the updated "SuperrBook — vector flip" demo
// (public/superrbook-flip.html). The SVG blocks are large, static,
// purely decorative markup (book base + front/back cover faces) —
// rendered via dangerouslySetInnerHTML rather than hand-converted to
// JSX so the paths can't drift from the original during attribute-name
// conversion. The leather-grain texture used to live inline as a
// base64 JPEG in the source HTML; it's extracted to
// public/assets/textures/leather-grain.jpeg here to keep it out of the
// JS bundle.
//
// Animation defaults to autoplaying (matching public/superrbook-flip.html's
// own script 1:1: a 100-frame angle table driven by a 30ms setInterval, no
// scroll involved) — but a caller can pass `progress` (a framer-motion
// MotionValue, e.g. from useScroll/useTransform) to drive the flap angle
// externally instead, for a scroll-scrubbed open instead of an autoplay
// loop. Style updates go straight through refs rather than React state
// either way, so neither a 30ms tick nor a scroll-rate stream of updates
// re-renders the whole tree.

import { useEffect, useRef, type CSSProperties } from "react";
import { useMotionValue, useMotionValueEvent, type MotionValue } from "framer-motion";

// viewBox is cropped to "70 60 860 580" — the source file's coordinate
// space is 1000x700, but the only content anywhere in it is the case at
// x:[500,930]. The flap (cover) sits on top of that same region when
// closed, hinged at x=500 with transform-origin "left center" — rotating
// it -180° swings its far edge from x=930 to the mirrored x=70, so a
// *fully open* book visually spans x:[70,930] (the swung-open cover on
// the left half + the revealed case on the right half). x:[0,70] and
// x:[930,1000] are the only genuinely always-blank margins, so those are
// what's cropped away — unlike an earlier version of this file, which
// wrongly cropped to just the closed cover's x:[500,930] and broke the
// open state (the swung flap had nowhere in the box left to swing into).
// Paths/gradients below are untouched and still use the original
// 1000x700 coordinates — only the viewBox window into that space moved.
const BASE_SVG = `<svg viewBox="70 60 860 580" width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="caseR" x1="500" y1="0" x2="930" y2="0" gradientUnits="userSpaceOnUse">
      <stop stop-color="#A5673A"/><stop offset="1" stop-color="#B57A45"/>
    </linearGradient>
    <linearGradient id="pbody" x1="948" y1="0" x2="970" y2="0" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F7C21C"/><stop offset="1" stop-color="#DDA200"/>
    </linearGradient>
    <clipPath id="page_clip"><rect x="512" y="85" width="392" height="526"/></clipPath>
    <filter id="note_shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="8" stdDeviation="4" flood-color="#000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <path d="M906 60H500V640H906C919.255 640 930 629.255 930 616V84C930 70.7452 919.255 60 906 60Z" fill="url(#caseR)"/>
  <path d="M902 82H514C510.686 82 508 84.686 508 88V612C508 615.314 510.686 618 514 618H902C905.314 618 908 615.314 908 612V88C908 84.686 905.314 82 902 82Z" fill="#E8DFCE"/>
  <path d="M900 85H516C513.791 85 512 86.791 512 89V611C512 613.209 513.791 615 516 615H900C902.209 615 904 613.209 904 611V89C904 86.791 902.209 85 900 85Z" fill="#FAF6EE"/>
  <image href="/assets/note/page_bg.svg" x="472.8" y="32.4" width="470.4" height="631.2" preserveAspectRatio="none" clip-path="url(#page_clip)"/>

  <style>
    .note-card { transition: filter 0.3s ease; cursor: pointer; }
    .note-card:hover { filter: url(#note_shadow) brightness(1.08) saturate(1.15); }
  </style>

  <g clip-path="url(#page_clip)">
    <image class="note-card" href="/assets/note/note%203.svg" x="606.34" y="94.27" width="339.95" height="240.01" transform="rotate(-15 776.31 214.28)" filter="url(#note_shadow)"/>
    <image class="note-card" href="/assets/note/note4.svg" x="532" y="355" width="239.51" height="232.49" transform="rotate(15 651.76 471.25)" filter="url(#note_shadow)"/>
    <image href="/assets/note/5.svg" x="749.63" y="328.63" width="140.14" height="140.14"/>
    <image href="/assets/note/6.svg" x="789.44" y="473.93" width="130.66" height="149.44"/>
    <image href="/assets/note/2.svg" x="484.27" y="83.66" width="231.87" height="117.29"/>
    <image href="/assets/note/3.svg" x="519.9" y="199.39" width="101.4" height="102.7"/>
  </g>

  <path d="M500 120V135M500 260V275M500 400V415M500 540V555" stroke="#A5673A" stroke-width="2.5" stroke-linecap="round"/>
</svg>`;

const FRONT_SVG = `<svg viewBox="0 0 460 580" width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cov_body" x1="0" y1="0" x2="0" y2="580" gradientUnits="userSpaceOnUse">
      <stop stop-color="#C08957"/><stop offset="0.5" stop-color="#B0713F"/><stop offset="1" stop-color="#9A5E32"/>
    </linearGradient>
    <radialGradient id="cov_hi" cx="0.5" cy="0.28" r="0.8">
      <stop stop-color="#D8A874" stop-opacity="0.5"/><stop offset="0.6" stop-color="#D8A874" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="cov_vig" cx="0.5" cy="0.5" r="0.72">
      <stop offset="0.68" stop-color="#5A3418" stop-opacity="0"/><stop offset="1" stop-color="#5A3418" stop-opacity="0.34"/>
    </radialGradient>
    <clipPath id="cov_clip"><rect x="0" y="0" width="460" height="580" rx="17"/></clipPath>
  </defs>
  <rect x="0" y="0" width="460" height="580" rx="17" fill="url(#cov_body)"/>
  <rect x="0" y="0" width="460" height="580" rx="17" fill="url(#cov_hi)"/>
  <image href="/assets/textures/leather-grain.jpeg" x="0" y="0" width="460" height="580" preserveAspectRatio="none" clip-path="url(#cov_clip)" style="mix-blend-mode:multiply" opacity="0.4"/>
  <rect x="0" y="0" width="460" height="580" rx="17" fill="url(#cov_vig)"/>

  <rect x="2.5" y="2.5" width="455" height="575" rx="16" fill="none" stroke="#7A4A22" stroke-opacity="0.35" stroke-width="2"/>
  <rect x="8" y="8" width="444" height="564" rx="14" fill="none" stroke="#FFF" stroke-opacity="0.06" stroke-width="2"/>
  <rect x="18" y="18" width="424" height="544" rx="12" fill="none" stroke="#E8D9BB" stroke-opacity="0.55" stroke-width="2.5" stroke-dasharray="7 6" stroke-linecap="round"/>

  <g>
    <rect x="86" y="164" width="288" height="150" rx="6" fill="#3A2410" opacity="0.18"/>
    <rect x="80" y="158" width="288" height="150" rx="6" fill="#EDE1C4"/>
    <rect x="98" y="176" width="252" height="114" rx="3" fill="none" stroke="#2A2A2A" stroke-width="2" stroke-dasharray="6 5" opacity="0.75"/>
    <g opacity="0.55">
      <rect x="-25" y="-11" width="56" height="26" rx="2" fill="#F3EEDF" transform="translate(96 158) rotate(-14)"/>
      <rect x="-25" y="-11" width="56" height="26" rx="2" fill="#F3EEDF" transform="translate(352 158) rotate(14)"/>
      <rect x="-25" y="-11" width="56" height="26" rx="2" fill="#F3EEDF" transform="translate(96 308) rotate(14)"/>
      <rect x="-25" y="-11" width="56" height="26" rx="2" fill="#F3EEDF" transform="translate(352 308) rotate(-14)"/>
    </g>
    <text x="224" y="245" font-family="var(--font-caveat), cursive" font-size="52" font-weight="700" fill="#1E1E1E" text-anchor="middle">Arunima</text>
  </g>

  <g transform="translate(372 486)" stroke="#5A3418" stroke-opacity="0.5" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 30 V16 a4 4 0 0 1 8 0 V14 a4 4 0 0 1 8 0 V16 a4 4 0 0 1 8 0 V18 a4 4 0 0 1 8 0 V34 a16 16 0 0 1 -16 16 h-4 a14 14 0 0 1 -12 -8 l-6 -12 a4 4 0 0 1 6 -4 z"/>
  </g>
</svg>`;

const BACK_SVG = `<svg viewBox="0 0 460 580" width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="inner_g" x1="0" y1="0" x2="0" y2="580" gradientUnits="userSpaceOnUse">
      <stop stop-color="#B0713F"/><stop offset="1" stop-color="#96592F"/>
    </linearGradient>
    <clipPath id="back_clip"><rect x="8" y="8" width="444" height="564"/></clipPath>
    <filter id="note_shadow_back" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="8" stdDeviation="4" flood-color="#000" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect x="0" y="0" width="460" height="580" rx="17" fill="url(#inner_g)"/>
  <rect x="12" y="12" width="436" height="556" rx="12" fill="none" stroke="#D9A066" stroke-opacity="0.6" stroke-width="2" stroke-dasharray="8 6"/>
  <rect x="384" y="0" width="76" height="580" fill="#6B3516" opacity="0.5"/>
  <line x1="384" y1="0" x2="384" y2="580" stroke="#4A220B" stroke-width="2" opacity="0.5"/>

  <style>
    .note-card { transition: filter 0.3s ease; cursor: pointer; }
    .note-card:hover { filter: url(#note_shadow_back) brightness(1.08) saturate(1.15); }
  </style>

  <g clip-path="url(#back_clip)">
    <image class="note-card" href="/assets/note/note%201.svg" x="146.87" y="52.2" width="279.07" height="243.6" transform="rotate(15 286.4 174)" filter="url(#note_shadow_back)"/>
    <image class="note-card" href="/assets/note/note%202.svg" x="0.97" y="308.85" width="308.66" height="223.3" transform="rotate(-10 155.3 420.5)" filter="url(#note_shadow_back)"/>
    <image href="/assets/note/1.svg" x="12" y="-12.4" width="165.6" height="252.3"/>
    <image href="/assets/note/8.svg" x="292.34" y="363.58" width="147.71" height="196.04" opacity="0.9"/>
  </g>

  <g transform="translate(40 486)" stroke="#5A3418" stroke-opacity="0.45" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 30 V16 a4 4 0 0 1 8 0 V14 a4 4 0 0 1 8 0 V16 a4 4 0 0 1 8 0 V18 a4 4 0 0 1 8 0 V34 a16 16 0 0 1 -16 16 h-4 a14 14 0 0 1 -12 -8 l-6 -12 a4 4 0 0 1 6 -4 z"/>
  </g>
</svg>`;

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// 100-frame angle table: closed hold -> open -> hold -> close -> loop.
const ANGLES: number[] = (() => {
  const a: number[] = [];
  for (let i = 0; i < 13; i++) a.push(0);
  for (let k = 1; k <= 30; k++) a.push(-180 * easeInOut(k / 30));
  for (let i = 0; i < 27; i++) a.push(-180);
  for (let k = 1; k <= 30; k++) a.push(-180 * (1 - easeInOut(k / 30)));
  return a;
})();

// `scale` multiplies the full-spread reference width (900px, scaled down
// from the demo's own 1050px max-width in proportion to the 860:1000
// crop above) — the scene itself is just aspect-ratio'd, so callers can
// size it via a wrapping container too; this prop exists for the common
// "make the book N% bigger" ask without having to redo the maxWidth math
// inline. `fill` drops the maxWidth cap entirely so the scene grows to
// fill whatever container it's placed in — the 860:580 aspect ratio (the
// full open-spread footprint: swung-open cover + revealed case side by
// side) is always preserved, only the width is caller-controlled. Note
// this means the closed state doesn't fill the box edge-to-edge — the
// cover only occupies the box's right half at rest, with its left half
// reserved for where the cover swings open into, same as a real
// notebook. `progress` (0 = closed, 1 = open) hands control of the flap
// angle to the caller and disables the autoplay loop.
export default function SuperrBookFlip({ scale = 1, fill = false, progress }: { scale?: number; fill?: boolean; progress?: MotionValue<number> }) {
  const bookRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const fallbackProgress = useMotionValue(0);
  const p = progress ?? fallbackProgress;

  function apply(angle: number) {
    if (flapRef.current) flapRef.current.style.transform = `rotateY(${angle}deg)`;
    const t = Math.min(1, -angle / 180);
    const s = Math.sin(t * Math.PI);
    if (bookRef.current) bookRef.current.style.transform = `rotateY(${(-4 * s).toFixed(2)}deg)`;
  }

  useMotionValueEvent(p, "change", (latest) => apply(-180 * latest));

  useEffect(() => {
    if (progress) {
      apply(-180 * progress.get());
      return;
    }
    apply(ANGLES[frameRef.current]);
    const id = setInterval(() => {
      apply(ANGLES[frameRef.current]);
      frameRef.current = (frameRef.current + 1) % ANGLES.length;
    }, 30);
    return () => clearInterval(id);
  }, [progress]);

  return (
    <div style={{ width: "100%", maxWidth: fill ? "none" : 900 * scale, aspectRatio: "860 / 580", perspective: 2200, perspectiveOrigin: "52% 50%", WebkitPerspective: 2200 } as CSSProperties}>
      <div ref={bookRef} style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d" } as CSSProperties}>
        <div style={{ position: "absolute", inset: 0 }} dangerouslySetInnerHTML={{ __html: BASE_SVG }} />

        <div
          ref={flapRef}
          style={{
            position: "absolute", left: "50%", top: 0, width: "50%", height: "100%",
            transformOrigin: "left center", transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d",
            willChange: "transform", zIndex: 5, backgroundColor: "transparent",
          } as CSSProperties}
        >
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" } as CSSProperties}>
            <div style={{ position: "absolute", inset: 0 }} dangerouslySetInnerHTML={{ __html: FRONT_SVG }} />
          </div>
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" } as CSSProperties}>
            <div style={{ position: "absolute", inset: 0 }} dangerouslySetInnerHTML={{ __html: BACK_SVG }} />
          </div>
        </div>
      </div>
    </div>
  );
}
