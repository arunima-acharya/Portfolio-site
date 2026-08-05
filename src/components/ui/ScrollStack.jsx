"use client";

import { useLayoutEffect, useRef, useCallback } from "react";
import Lenis from "lenis";

// React Bits — ScrollStack (JavaScript + Tailwind variant), adapted to be
// embedded inline as one section among many on a normal page rather than a
// standalone full-page demo:
//   - ScrollStackItem no longer hardcodes height/padding/radius/shadow —
//     those clipped or fought with real (variable-height) card content, so
//     control is left to `itemClassName` / the new `style` prop instead.
//   - ScrollStack's inner wrapper padding is now configurable (was a fixed
//     20vh/80px/50rem/min-h-screen tuned for a dedicated demo page).
//   - Fixed a drift bug present in the original source's useWindowScroll
//     path: getElementOffset() read getBoundingClientRect(), which reflects
//     whatever transform is currently applied, so re-measuring a card's
//     "top" every frame fed back into itself and the pin position walked
//     away instead of holding still. Each card's untransformed top is now
//     measured once (cardTopsRef) and reused instead of re-measured live.

export const ScrollStackItem = ({ children, itemClassName = "", style }) => (
  <div
    className={`scroll-stack-card relative w-full box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
      ...style,
    }}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  // Depth-of-field tilt/dim for cards that have receded behind the active
  // one — separate from `rotationAmount` (a per-card Z spin) and `blurAmount`
  // (already depth-based). Active card always gets tiltBase, 0 blur, full
  // opacity; each card further back adds one more `tiltStep` up to -10deg.
  tiltBase = 5,
  tiltStep = 2.5,
  backgroundOpacity = 0.8,
  useWindowScroll = false,
  onStackComplete = undefined,
  innerPaddingTop = "20vh",
  innerPaddingX = 80,
  innerPaddingBottom = "50rem",
  innerMinHeight = true,
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  // Cache of each card's untransformed top offset. In useWindowScroll mode
  // getElementOffset() reads getBoundingClientRect(), which reflects
  // whatever transform is currently applied — re-measuring live every
  // frame means frame N's cardTop already includes frame N-1's translateY,
  // so the pin position drifts instead of holding still. Measuring once
  // before any transform is applied (and on resize) avoids that feedback loop.
  const cardTopsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement,
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller.scrollTop,
        containerHeight: scroller.clientHeight,
        scrollContainer: scroller,
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element) => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  // Measures each card's untransformed top and caches it in cardTopsRef.
  // Transform is briefly cleared during the read so a card's own in-progress
  // translateY can't contaminate the measurement (see cardTopsRef comment).
  const measureCardTops = useCallback(() => {
    cardTopsRef.current = cardsRef.current.map((card) => {
      if (!card) return 0;
      const prevTransform = card.style.transform;
      card.style.transform = "none";
      const top = getElementOffset(card);
      card.style.transform = prevTransform;
      return top;
    });
  }, [getElementOffset]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = useWindowScroll
      ? document.querySelector(".scroll-stack-end")
      : scrollerRef.current?.querySelector(".scroll-stack-end");

    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    // Which card is currently the active (foreground) one — every card
    // behind it in the stack gets progressively blurred, dimmed, and
    // tilted further back to read as receding depth-of-field.
    let topCardIndex = 0;
    for (let j = 0; j < cardsRef.current.length; j++) {
      if (!cardsRef.current[j]) continue;
      const jCardTop = cardTopsRef.current[j] ?? 0;
      const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
      if (scrollTop >= jTriggerStart) {
        topCardIndex = j;
      }
    }

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardTopsRef.current[i] ?? 0;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      const depthInStack = Math.max(0, topCardIndex - i);
      const blur = blurAmount ? depthInStack * blurAmount : 0;
      const opacity = depthInStack > 0 ? backgroundOpacity : 1;
      const tiltX = -(tiltBase + depthInStack * tiltStep);

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
        opacity: Math.round(opacity * 100) / 100,
        tiltX: Math.round(tiltX * 100) / 100,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1 ||
        Math.abs(lastTransform.opacity - newTransform.opacity) > 0.01 ||
        Math.abs(lastTransform.tiltX - newTransform.tiltX) > 0.1;

      if (hasChanged) {
        const transform =
          `perspective(1000px) translate3d(0, ${newTransform.translateY}px, 0) ` +
          `scale(${newTransform.scale}) rotate(${newTransform.rotation}deg) rotateX(${newTransform.tiltX}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : "";

        card.style.transform = transform;
        card.style.filter = filter;
        card.style.opacity = String(newTransform.opacity);

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    tiltBase,
    tiltStep,
    backgroundOpacity,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
      });

      lenis.on("scroll", handleScroll);

      const raf = (time) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector(".scroll-stack-inner"),
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
      });

      lenis.on("scroll", handleScroll);

      const raf = (time) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    }
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll ? document.querySelectorAll(".scroll-stack-card") : scroller.querySelectorAll(".scroll-stack-card")
    );

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = "transform, filter, opacity";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.transform = "translateZ(0)";
      card.style.webkitTransform = "translateZ(0)";
      card.style.perspective = "1000px";
      card.style.webkitPerspective = "1000px";
    });

    measureCardTops();
    setupLenis();
    updateCardTransforms();

    const handleResize = () => {
      measureCardTops();
      updateCardTransforms();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      cardTopsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [itemDistance, useWindowScroll, measureCardTops, setupLenis, updateCardTransforms]);

  const containerStyles = useWindowScroll
    ? {
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
        WebkitTransform: "translateZ(0)",
        transform: "translateZ(0)",
      }
    : {
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
        scrollBehavior: "smooth",
        WebkitTransform: "translateZ(0)",
        transform: "translateZ(0)",
        willChange: "scroll-position",
      };

  const containerClassName = useWindowScroll
    ? `relative w-full ${className}`.trim()
    : `relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim();

  return (
    <div className={containerClassName} ref={scrollerRef} style={containerStyles}>
      <div
        className={`scroll-stack-inner${innerMinHeight ? " min-h-screen" : ""}`}
        style={{
          paddingTop: innerPaddingTop,
          paddingLeft: innerPaddingX,
          paddingRight: innerPaddingX,
          paddingBottom: innerPaddingBottom,
        }}
      >
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
