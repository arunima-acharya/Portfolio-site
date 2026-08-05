"use client";

import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

function CursorInner() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<"idle" | "project" | "hover" | "stack" | "drag">("idle");
  const cursorStateRef = useRef<"idle" | "project" | "hover" | "stack" | "drag">("idle");
  const isWhiteRef = useRef(false);

  useEffect(() => {
    let mouseX = -200, mouseY = -200;
    let dotX = -200, dotY = -200;
    let ringX = -200, ringY = -200;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const isHidden = !!(e.target as HTMLElement)?.closest("[data-cursor-hidden]");
      const none = isHidden ? "none" : "";
      if (dotRef.current) dotRef.current.style.display = none;
      if (ringRef.current) ringRef.current.style.display = none;
      if (labelRef.current) labelRef.current.style.display = none;
    };

    const animate = () => {
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;

      const state = cursorStateRef.current;
      const color = isWhiteRef.current ? "#fff" : "#e8510a";

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 8}px, ${dotY - 8}px)`;
        dotRef.current.style.opacity = state !== "idle" ? "0" : "1";
        dotRef.current.style.backgroundColor = color;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 21.5}px, ${ringY - 21.5}px)`;
        ringRef.current.style.opacity = state !== "idle" ? "0" : "0.5";
        ringRef.current.style.borderColor = color;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${ringX - 31}px, ${ringY - 31}px) scale(${state !== "idle" ? 1 : 0.7})`;
        labelRef.current.style.opacity = state !== "idle" ? "1" : "0";
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    const handleEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-white]")) isWhiteRef.current = true;
      if (target.closest("[data-project-card]")) {
        cursorStateRef.current = "project";
        setCursorState("project");
      } else if (target.closest("[data-cursor-stack]")) {
        cursorStateRef.current = "stack";
        setCursorState("stack");
      } else if (target.closest("[data-hover-section]")) {
        cursorStateRef.current = "hover";
        setCursorState("hover");
      } else if (target.closest("[data-cursor-drag]")) {
        cursorStateRef.current = "drag";
        setCursorState("drag");
      }
    };
    const handleLeave = (e: MouseEvent) => {
      const target = e.relatedTarget as HTMLElement | null;
      if (!target?.closest("[data-cursor-white]")) isWhiteRef.current = false;
      const from = e.target as HTMLElement;
      if (from.closest("[data-project-card]") || from.closest("[data-hover-section]") || from.closest("[data-cursor-stack]") || from.closest("[data-cursor-drag]")) {
        cursorStateRef.current = "idle";
        setCursorState("idle");
      }
    };

    const onFooterEnter = () => { isWhiteRef.current = true; };
    const onFooterLeave = () => { isWhiteRef.current = false; };
    const footerEl = document.querySelector("[data-cursor-white]");
    if (footerEl) {
      footerEl.addEventListener("mouseenter", onFooterEnter);
      footerEl.addEventListener("mouseleave", onFooterLeave);
    }

    window.addEventListener("mouseover", handleEnter);
    window.addEventListener("mouseout", handleLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", handleEnter);
      window.removeEventListener("mouseout", handleLeave);
      cancelAnimationFrame(raf);
      if (footerEl) {
        footerEl.removeEventListener("mouseenter", onFooterEnter);
        footerEl.removeEventListener("mouseleave", onFooterLeave);
      }
    };
  }, []);

  return (
    <>
      {/* Small dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          backgroundColor: "#e8510a",
          transition: "opacity 0.2s ease",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: 43,
          height: 43,
          borderRadius: "50%",
          border: "3px solid #e8510a",
          transition: "opacity 0.2s ease",
        }}
      />
      {/* Pill cursor */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center"
        style={{
          width: 62,
          height: 62,
          borderRadius: "50%",
          backgroundColor: "#e8510a",
          color: "#fff",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.02em",
          textAlign: "center",
          lineHeight: 1.3,
          opacity: 0,
          transition: "opacity 0.2s ease",
        }}
      >
        {cursorState === "stack" ? <>Click<br />me</> : cursorState === "hover" ? <>Hover<br />me</> : cursorState === "drag" ? <>Hold &<br />drag</> : <>View<br />project</>}
      </div>
    </>
  );
}

export default function CustomCursor() {
  const isMobile = useIsMobile();
  if (isMobile) return null;
  return <CursorInner />;
}
