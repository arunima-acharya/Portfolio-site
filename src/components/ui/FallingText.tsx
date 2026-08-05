"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface FallingTextProps {
  text?: string;
  words?: string[];
  highlightWords?: string[];
  trigger?: "click" | "hover" | "auto" | "scroll";
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  fontSize?: string;
  delay?: number;
  pill?: boolean;
  pillColor?: string;
  pillBorder?: string;
  pillTextColor?: string;
}

const FallingText = ({
  text = "",
  words: wordsProp,
  highlightWords = [],
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = "1rem",
  delay = 0,
  pill = false,
  pillColor = "#f5f5f5",
  pillBorder = "1px solid #e0e0e0",
  pillTextColor = "#111",
}: FallingTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const originalHTMLRef = useRef<string>("");
  const physicsCleanupRef = useRef<(() => void) | null>(null);
  const triggerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [effectStarted, setEffectStarted] = useState(false);

  // Build and store the original HTML once
  useEffect(() => {
    if (!textRef.current) return;
    const items = wordsProp ?? text.split(" ");
    const newHTML = items
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) => word.startsWith(hw));
        if (pill) {
          const bg     = isHighlighted ? "#e8510a" : pillColor;
          const color  = isHighlighted ? "#fff"    : pillTextColor;
          const border = isHighlighted ? "1px solid #e8510a" : pillBorder;
          return `<span data-falling style="display:inline-block;padding:8px 20px;border-radius:999px;background:${bg};border:${border};color:${color};font-size:${fontSize};font-weight:400;white-space:nowrap;user-select:none;margin:4px;">${word}</span>`;
        }
        return `<span data-falling style="display:inline-block;margin:0 2px;font-size:${fontSize};user-select:none;${isHighlighted ? "color:#e8510a;font-weight:700;" : ""}">${word}</span>`;
      })
      .join("");
    textRef.current.innerHTML = newHTML;
    originalHTMLRef.current = newHTML;
  }, [text, wordsProp, highlightWords, pill, pillColor, pillBorder, pillTextColor, fontSize]);

  // Tear down physics and restore original positions
  const reset = useCallback(() => {
    if (physicsCleanupRef.current) {
      physicsCleanupRef.current();
      physicsCleanupRef.current = null;
    }
    if (textRef.current && originalHTMLRef.current) {
      textRef.current.innerHTML = originalHTMLRef.current;
    }
    setEffectStarted(false);
  }, []);

  // Trigger logic
  useEffect(() => {
    if (trigger === "auto") {
      const t = setTimeout(() => setEffectStarted(true), delay);
      return () => clearTimeout(t);
    }

    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (triggerTimerRef.current) clearTimeout(triggerTimerRef.current);
            triggerTimerRef.current = setTimeout(() => setEffectStarted(true), delay);
          } else {
            // Scrolled away — cancel pending start and reset
            if (triggerTimerRef.current) clearTimeout(triggerTimerRef.current);
            reset();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger, delay, reset]);

  // Physics engine
  useEffect(() => {
    if (!effectStarted) return;

    let animFrame: number;

    animFrame = requestAnimationFrame(() => {
      import("matter-js").then((Matter) => {
        const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint, Body } = Matter;

        if (!containerRef.current || !textRef.current || !canvasContainerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const width  = containerRect.width;
        const height = containerRect.height;
        if (width <= 0 || height <= 0) return;

        const engine = Engine.create();
        engine.world.gravity.y = gravity;

        const render = Render.create({
          element: canvasContainerRef.current,
          engine,
          options: { width, height, background: backgroundColor, wireframes },
        });

        const wallOpts = { isStatic: true, render: { fillStyle: "transparent" } };
        const floor     = Bodies.rectangle(width / 2,   height + 50, width,     100, wallOpts);
        const leftWall  = Bodies.rectangle(-50,          height / 2,  100, height * 3, wallOpts);
        const rightWall = Bodies.rectangle(width + 50,   height / 2,  100, height * 3, wallOpts);
        const ceiling   = Bodies.rectangle(width / 2,   -50,          width,     100, wallOpts);

        const wordSpans = textRef.current.querySelectorAll<HTMLElement>("span[data-falling]");
        const wordBodies = [...wordSpans].map((elem) => {
          const rect = elem.getBoundingClientRect();
          const x = rect.left - containerRect.left + rect.width  / 2;
          const y = rect.top  - containerRect.top  + rect.height / 2;

          const body = Bodies.rectangle(x, y, rect.width, rect.height, {
            render: { fillStyle: "transparent" },
            restitution: 0.8,
            frictionAir: 0.01,
            friction: 0.2,
          });
          Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: 0 });
          Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

          // Use center-based positioning to match translate(-50%,-50%) in the loop
          elem.style.position = "absolute";
          elem.style.margin   = "0";
          elem.style.left     = `${x}px`;
          elem.style.top      = `${y}px`;
          elem.style.transform = "translate(-50%, -50%)";

          return { elem, body };
        });

        const mouse = Mouse.create(containerRef.current);
        const mouseConstraint = MouseConstraint.create(engine, {
          mouse,
          constraint: { stiffness: mouseConstraintStiffness, render: { visible: false } },
        });
        (render as any).mouse = mouse;

        World.add(engine.world, [
          floor, leftWall, rightWall, ceiling,
          mouseConstraint,
          ...wordBodies.map((wb) => wb.body),
        ]);

        const runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);

        const loop = () => {
          wordBodies.forEach(({ body, elem }) => {
            const { x, y } = body.position;
            elem.style.left      = `${x}px`;
            elem.style.top       = `${y}px`;
            elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
          });
          Matter.Engine.update(engine);
          animFrame = requestAnimationFrame(loop);
        };
        loop();

        physicsCleanupRef.current = () => {
          cancelAnimationFrame(animFrame);
          Render.stop(render);
          Runner.stop(runner);
          if (render.canvas && canvasContainerRef.current?.contains(render.canvas)) {
            canvasContainerRef.current.removeChild(render.canvas);
          }
          World.clear(engine.world, false);
          Engine.clear(engine);
        };
      });
    });

    return () => {
      cancelAnimationFrame(animFrame);
      physicsCleanupRef.current?.();
      physicsCleanupRef.current = null;
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === "click" || trigger === "hover")) {
      setTimeout(() => setEffectStarted(true), delay);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", cursor: "default" }}
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
    >
      <div ref={textRef} style={{ display: pill ? "block" : "inline-block", lineHeight: 1.6 }} />
      <div ref={canvasContainerRef} style={{ position: "absolute", top: 0, left: 0, zIndex: 0, pointerEvents: "none" }} />
    </div>
  );
};

export default FallingText;
