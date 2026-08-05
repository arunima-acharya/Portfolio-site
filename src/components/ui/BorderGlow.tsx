"use client";

import { type CSSProperties, type ReactNode } from "react";

interface BorderGlowProps {
  children: ReactNode;
  backgroundColor?: string;
  borderRadius?: number;
  glowColor?: string;
  colors?: string[];
  glowIntensity?: number;
  glowRadius?: number;
  edgeSensitivity?: number;
  coneSpread?: number;
  animationKey?: number;
  style?: CSSProperties;
  className?: string;
}

export default function BorderGlow({
  children,
  backgroundColor = "#1a1a1a",
  borderRadius = 16,
  colors = ["#e8510a", "#f97316"],
  style,
  className,
}: BorderGlowProps) {
  const gradient = `linear-gradient(135deg, ${colors.join(", ")})`;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        borderRadius,
        padding: "1px",
        background: gradient,
        ...style,
      }}
    >
      <div
        style={{
          borderRadius: borderRadius - 1,
          background: backgroundColor,
          height: "100%",
          width: "100%",
          padding: "inherit",
        }}
      >
        {children}
      </div>
    </div>
  );
}
