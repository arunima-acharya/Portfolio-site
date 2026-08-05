"use client";

import { forwardRef, useMemo, useRef, useEffect, useCallback, RefObject } from "react";
import { motion } from "framer-motion";

function useAnimationFrame(callback: () => void) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    let frameId: number;
    const loop = () => {
      callbackRef.current();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);
}

function useMousePositionRef(containerRef: RefObject<HTMLElement | null>) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };
    const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

interface VariableProximityProps {
  label: string;
  fromFontVariationSettings?: string;
  toFontVariationSettings?: string;
  fromColor?: string;
  toColor?: string;
  containerRef: RefObject<HTMLElement | null>;
  radius?: number;
  falloff?: "linear" | "exponential" | "gaussian";
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>(
  (
    {
      label,
      fromFontVariationSettings = "'wght' 400",
      toFontVariationSettings = "'wght' 800",
      fromColor,
      toColor,
      containerRef,
      radius = 200,
      falloff = "gaussian",
      className = "",
      style,
      onClick,
      ...rest
    },
    ref
  ) => {
    const letterRefs = useRef<(HTMLElement | null)[]>([]);
    const interpolatedSettingsRef = useRef<string[]>([]);
    const mousePositionRef = useMousePositionRef(containerRef);
    const lastPositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

    const parseHex = (hex: string) => {
      const h = hex.replace("#", "");
      return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
    };
    const parsedFrom = fromColor ? parseHex(fromColor) : null;
    const parsedTo   = toColor   ? parseHex(toColor)   : null;

    const parsedSettings = useMemo(() => {
      const parse = (str: string) =>
        new Map(
          str.split(",").map((s) => {
            const [name, value] = s.trim().split(" ");
            return [name.replace(/['"]/g, ""), parseFloat(value)] as [string, number];
          })
        );
      const from = parse(fromFontVariationSettings);
      const to = parse(toFontVariationSettings);
      return Array.from(from.entries()).map(([axis, fromValue]) => ({
        axis,
        fromValue,
        toValue: to.get(axis) ?? fromValue,
      }));
    }, [fromFontVariationSettings, toFontVariationSettings]);

    const calcFalloff = useCallback(
      (distance: number) => {
        const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
        switch (falloff) {
          case "exponential": return norm ** 2;
          case "gaussian":    return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
          default:            return norm;
        }
      },
      [radius, falloff]
    );

    useAnimationFrame(() => {
      if (!containerRef?.current) return;
      const { x, y } = mousePositionRef.current;
      if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) return;
      lastPositionRef.current = { x, y };

      const containerRect = containerRef.current.getBoundingClientRect();

      letterRefs.current.forEach((letterRef, index) => {
        if (!letterRef) return;
        const rect = letterRef.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2 - containerRect.left;
        const cy = rect.top  + rect.height / 2 - containerRect.top;
        const distance = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);

        if (distance >= radius) {
          letterRef.style.fontVariationSettings = fromFontVariationSettings;
          if (parsedFrom) letterRef.style.color = fromColor!;
          return;
        }

        const fv = calcFalloff(distance);
        const newSettings = parsedSettings
          .map(({ axis, fromValue, toValue }) =>
            `'${axis}' ${fromValue + (toValue - fromValue) * fv}`
          )
          .join(", ");

        interpolatedSettingsRef.current[index] = newSettings;
        letterRef.style.fontVariationSettings = newSettings;

        if (parsedFrom && parsedTo) {
          const r = Math.round(parsedFrom[0] + (parsedTo[0] - parsedFrom[0]) * fv);
          const g = Math.round(parsedFrom[1] + (parsedTo[1] - parsedFrom[1]) * fv);
          const b = Math.round(parsedFrom[2] + (parsedTo[2] - parsedFrom[2]) * fv);
          letterRef.style.color = `rgb(${r},${g},${b})`;
        }
      });
    });

    const words = label.split(" ");
    let letterIndex = 0;

    return (
      <span
        ref={ref}
        onClick={onClick}
        style={{ display: "inline", ...style }}
        className={className}
        {...rest}
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {word.split("").map((letter) => {
              const idx = letterIndex++;
              return (
                <motion.span
                  key={idx}
                  ref={(el) => { letterRefs.current[idx] = el; }}
                  style={{
                    display: "inline-block",
                    fontVariationSettings: interpolatedSettingsRef.current[idx],
                  }}
                  aria-hidden="true"
                >
                  {letter}
                </motion.span>
              );
            })}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
        <span className="sr-only">{label}</span>
      </span>
    );
  }
);

VariableProximity.displayName = "VariableProximity";
export default VariableProximity;
