"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";

export const HeroParallax = ({
  products,
  headerTitle,
  headerSubtitle,
  headerFontFamily,
  containerHeight = "300vh",
  contentScale = 1,
  compactHeader = false,
  headerGapBelow,
  headerOverlay = false,
  headerOffsetXPercent = 0,
  headerOffsetYPercent = 0,
  headerTitleColor,
  headerSubtitleColor,
  verticalOffsetPercent = 0,
  headerAlign = "center",
  headerEyebrowNumber,
  headerEyebrowLabel,
  headerEyebrowColor,
  headerEyebrowLabelColor,
  headerMaxWidth = 1280,
  rowCount = 3,
  footerContent,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
  headerTitle?: React.ReactNode;
  headerSubtitle?: React.ReactNode;
  headerFontFamily?: string;
  containerHeight?: string;
  contentScale?: number;
  compactHeader?: boolean;
  headerGapBelow?: number;
  // When true, the header is taken out of normal flow (position: absolute)
  // and layered on top of the rows instead of sitting above them — the
  // rows then render starting from the top of the container (where the
  // header would otherwise have reserved space), so the first row ends up
  // underneath the header text. Purely a positioning/z-index change — the
  // rotateX/rotateZ/translateY/opacity/scale scroll animation is untouched.
  headerOverlay?: boolean;
  // Horizontal nudge as a percentage of the header's own width, e.g. -20
  // shifts it left 20%. Negative = left, positive = right.
  headerOffsetXPercent?: number;
  // Vertical nudge as a percentage of the header's own height. Negative
  // moves it up. Header-only, unlike verticalOffsetPercent which moves the
  // whole header+rows composition together.
  headerOffsetYPercent?: number;
  headerTitleColor?: string;
  headerSubtitleColor?: string;
  // Shifts the whole header+rows composition vertically, as a percentage
  // of its own height (translateY) — negative moves it up. Applied on top
  // of / independent from the scroll-linked translateY spring.
  verticalOffsetPercent?: number;
  headerAlign?: "left" | "center" | "right";
  headerEyebrowNumber?: string;
  headerEyebrowLabel?: string;
  headerEyebrowColor?: string;
  headerEyebrowLabelColor?: string;
  headerMaxWidth?: number;
  rowCount?: number;
  // Rendered right after the last row, inside the same centered content
  // block — not just appended after the whole (very tall) section, which
  // would land it far from the rows with a lot of empty space in between.
  footerContent?: React.ReactNode;
}) => {
  // Dynamic row count (not hardcoded to 3 rows of 5) — rowCount controls
  // how many rows products.length gets split across.
  const perRow = Math.ceil(products.length / rowCount);
  const rows = Array.from({ length: rowCount }, (_, i) => products.slice(i * perRow, (i + 1) * perRow));
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  // Widened from [0, 0.2] to [0, 0.45] — without the sticky pin, progress
  // reaching 0.2 only takes ~40vh of a 200vh section, i.e. this whole
  // reveal finished almost instantly while the block was still scrolling
  // past at a normal rate, reading as if it didn't animate at all. 0.45
  // spreads it over ~90vh so it's actually visible as it plays out.
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.45], [15, 0]),
    springConfig
  );
  // Dims the rows at scroll-in (0.3) so the overlaid header text stays
  // legible against the busy card imagery, fading to fully opaque (1) by
  // 0.45 as the header scrolls out of view above.
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.45], [0.3, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.45], [20, 0]),
    springConfig
  );
  // Starting offset increased from -120 to -420 (close to the 460px
  // header-to-rows gap) so the rows visibly start up near/behind the
  // header text and glide down to their current resting position, instead
  // of a barely-perceptible 120px nudge.
  // Rises from 0 to 360px over the first 20% of scroll, then holds there —
  // no longer eases back down. Rows settle (and stay) at that height
  // instead of animating back to fully overlap under the header.
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0, 550]),
    springConfig
  );
  return (
    // No sticky/pin here on purpose — a pin makes the section's rendered
    // height always exactly one viewport (100vh) regardless of
    // containerHeight, with everything else happening as an "internal"
    // scroll that never actually advances the page. This div's height is
    // real: it occupies containerHeight of genuine page space, and the
    // header + rows scroll past normally within it, just like any other
    // section — containerHeight is an absolute size, not a scroll budget.
    <div
      ref={ref}
      style={{ height: containerHeight }}
      className="relative antialiased overflow-hidden [perspective:1000px] [transform-style:preserve-3d] flex flex-col items-center justify-center"
    >
      {/* Inner wrapper is sized to its own content vertically (not
          containerHeight) — the outer flex centers this whole block, and
          headerOverlay positions the header absolutely *within it*, so
          "top: 0" lines up with wherever the rows actually render instead
          of the top of the (very tall) outer section. w-full forces its
          *width* to match the viewport rather than its widest child (the
          rows, which run to thousands of px wide) — without it, left/right
          edges here don't correspond to the viewport's left/right at all,
          which breaks any edge-anchored header position (e.g. ml-auto for
          right-alignment lands off past the row content's own right edge,
          not the visible viewport's). The rows still overflow this box
          horizontally same as before; the outer overflow-hidden still
          clips them the same way. */}
      <div
        className="relative w-full"
        style={verticalOffsetPercent ? { transform: `translateY(${verticalOffsetPercent}%)` } : undefined}
      >
        <div
          className={headerOverlay ? "absolute top-0 left-0 right-0 z-20" : undefined}
          style={
            headerOffsetXPercent || headerOffsetYPercent
              ? { transform: `translate(${headerOffsetXPercent}%, ${headerOffsetYPercent}%)` }
              : undefined
          }
        >
          <Header
            title={headerTitle}
            subtitle={headerSubtitle}
            fontFamily={headerFontFamily}
            compact={compactHeader}
            gapBelow={headerOverlay ? undefined : headerGapBelow}
            titleColor={headerTitleColor}
            subtitleColor={headerSubtitleColor}
            align={headerAlign}
            eyebrowNumber={headerEyebrowNumber}
            eyebrowLabel={headerEyebrowLabel}
            eyebrowColor={headerEyebrowColor}
            eyebrowLabelColor={headerEyebrowLabelColor}
            maxWidth={headerMaxWidth}
          />
        </div>
        <motion.div
          style={{
            rotateX,
            rotateZ,
            translateY,
            opacity,
            scale: contentScale,
            // Default transform-origin is the block's center — scaling a
            // ~1300px-tall block down from its center pulls the top edge
            // down by roughly (1-scale)/2 of its height, which reads as a
            // big dead gap between the header and the first row. Scaling
            // from the top instead keeps the top edge fixed in place.
            transformOrigin: "top center",
          }}
        >
          {rows.map((row, i) => (
            <motion.div
              key={i}
              className={`flex space-x-6 ${i < rows.length - 1 ? "mb-6" : ""} ${i % 2 === 0 ? "flex-row-reverse space-x-reverse" : "flex-row"}`}
            >
              {row.map((product) => (
                <ProductCard
                  product={product}
                  translate={i % 2 === 0 ? translateX : translateXReverse}
                  key={product.title}
                />
              ))}
            </motion.div>
          ))}
        </motion.div>
        {/* Outside the rotateX/rotateZ/translateY/scale motion.div on
            purpose — footer content shouldn't inherit the entrance-tilt
            transform, just sit as normal static content below the rows. */}
        {footerContent}
      </div>
    </div>
  );
};

export const Header = ({
  title,
  subtitle,
  fontFamily,
  compact = false,
  titleColor,
  subtitleColor,
  gapBelow,
  align = "center",
  eyebrowNumber,
  eyebrowLabel,
  eyebrowColor = "#1C46F2",
  eyebrowLabelColor = "#a3a3a3",
  maxWidth = 1280,
}: {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  fontFamily?: string;
  compact?: boolean;
  titleColor?: string;
  subtitleColor?: string;
  gapBelow?: number;
  // Both the box's own horizontal position (margin) and its text-align.
  // Relies on the parent actually being viewport-width (see the w-full
  // note on HeroParallax's inner wrapper) — otherwise "left"/"right" would
  // anchor to the wide row content's edges instead of the viewport's.
  align?: "left" | "center" | "right";
  eyebrowNumber?: string;
  eyebrowLabel?: string;
  eyebrowColor?: string;
  eyebrowLabelColor?: string;
  // px. Was a fixed max-w-7xl (1280px) Tailwind class; now a real value so
  // the whole header column can be narrowed/widened directly.
  maxWidth?: number;
} = {}) => {
  const marginClass = align === "left" ? "mr-auto" : align === "right" ? "ml-auto" : "mx-auto";
  const textClass = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";
  const justify = align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center";
  return (
    <div
      className={`relative ${marginClass} px-4 w-full left-0 top-0 ${textClass} ${compact ? "py-2 md:py-4" : "py-20 md:py-40"}`}
      style={{ maxWidth, ...(gapBelow !== undefined ? { paddingBottom: gapBelow } : null) }}
    >
      {eyebrowLabel && (
        <div
          className="flex items-center gap-2"
          style={{ justifyContent: justify, marginBottom: 12 }}
        >
          {eyebrowNumber && (
            <span style={{ fontSize: 15, fontWeight: 400, color: eyebrowColor, fontFamily }}>{eyebrowNumber}</span>
          )}
          <span style={{ fontSize: 12, fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase", color: eyebrowLabelColor, fontFamily }}>
            {eyebrowLabel}
          </span>
        </div>
      )}
      {/* Explicit color (not Tailwind's dark:text-white) — this component
          is used on pages that hardcode their own palette regardless of the
          site-wide theme class on <html>, so dark: would silently win and
          render invisible white-on-light text. */}
      {/* Regular weight + clamp()-based size, matching this page's own
          SectionHeading exactly — not Tailwind's font-bold/text-4xl, which
          reads noticeably heavier/differently-scaled than every other
          section's heading. */}
      <h1
        style={{
          fontSize: compact ? "clamp(29px, 3.64vw, 44px)" : "clamp(28px, 3.5vw, 42px)",
          fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.15,
          fontFamily, color: titleColor ?? "#171717",
        }}
      >
        {title ?? (
          <>
            The Ultimate <br /> development studio
          </>
        )}
      </h1>
      {/* max-w-2xl gives this its own (narrower) box, which — like the
          outer header box — defaults to sitting at the left edge of its
          parent regardless of text-align. Needs the same margin treatment
          or "right"/"left" align only rotates the text within a box still
          pinned to the wrong side, producing a staircase look against the
          wider heading above it. */}
      <p
        className={`max-w-2xl ${marginClass} ${compact ? "mt-3" : "mt-8"}`}
        style={{ fontSize: 15.5, lineHeight: 1.75, fontFamily, color: subtitleColor ?? "#525252" }}
      >
        {subtitle ??
          "We build beautiful products with the latest technologies and frameworks. We are a team of passionate developers and designers that love to build amazing products."}
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
        background: "#ffffff",
        boxShadow: "0 14px 28px rgba(0,0,0,0.18)",
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-[410px] w-[576px] relative shrink-0 overflow-hidden rounded-[15px]"
    >
      {/* Browser-chrome mockup frame — same styling as the hero/Section 05
          desktop mockups (dark bezel, traffic-light dots, inset white
          panel), scaled to fit these cards. */}
      <div className="flex items-center gap-1.5" style={{ padding: "10px 14px" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
      </div>
      <a
        href={product.link}
        className="block group-hover/product:shadow-2xl"
        style={{ padding: "0 10px 10px" }}
      >
        <div style={{ background: "#fff", borderRadius: 8, overflow: "hidden", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- external thumbnail URLs, no next/image remote pattern configured */}
          <img
            src={product.thumbnail}
            height="600"
            width="600"
            className="block w-full h-auto"
            alt={product.title}
          />
          {/* Transparent hover overlay with a slight blur behind it, title
              revealed on top — fades in via group-hover so it doesn't
              require its own hover state. */}
          <div
            className="absolute inset-0 flex items-end opacity-0 group-hover/product:opacity-100 transition-opacity duration-300"
            style={{
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
              padding: 18,
            }}
          >
            <span style={{ color: "#fff", fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em" }}>
              {product.title}
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
};
