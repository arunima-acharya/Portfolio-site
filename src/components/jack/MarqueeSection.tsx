"use client";
import { useRef, useEffect, useState } from "react";

const IMAGES = [
  "/assets/hotelogix/FRONTDESK.png",
  "/assets/hotelogix/Reservation card.png",
  "/assets/hotelogix/Quick Reservation.png",
  "/assets/hotelogix/SINGLE RESERVATION.png",
  "/assets/hotelogix/Split Reservation.png",
  "/assets/hotelogix/GROUP RESERVATION-LAYOUT.png",
  "/assets/hotelogix/GROUP RESERVATION-TABLE.png",
  "/assets/hotelogix/Add Addon.png",
  "/assets/hotelogix/Add Rate.png",
  "/assets/hotelogix/Breakdown.png",
  "/assets/hotelogix/Draft 19.png",
  "/assets/hotelogix/Draft 20.png",
  "/assets/hotelogix/Draft 23.png",
  "/assets/hotelogix/Draft 45.png",
  "/assets/hotelogix/Edit.png",
  "/assets/hotelogix/Filter Selected.png",
  "/assets/hotelogix/INVOICE 1.png",
  "/assets/hotelogix/Payterms.png",
  "/assets/hotelogix/Right Click.png",
  "/assets/hotelogix/SPLIT RESERVATION-1.png",
  "/assets/hotelogix/GROUP RESERVATION-LAYOUT-1.png",
];

const row1 = IMAGES.slice(0, 11);
const row2 = IMAGES.slice(11);
const tripled = (arr: string[]) => [...arr, ...arr, ...arr];
const ROW1 = tripled(row1);
const ROW2 = tripled(row2);

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(200);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop =
        sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const scrollOffset =
        (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(scrollOffset);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      {/* Row 1 — moves right on scroll */}
      <div
        className="flex gap-3 mb-3"
        style={{
          transform: `translateX(${offset - 200}px)`,
          willChange: "transform",
        }}
      >
        {ROW1.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            className="rounded-2xl object-cover flex-shrink-0"
            style={{ width: 362, height: 233 }}
          />
        ))}
      </div>

      {/* Row 2 — moves left on scroll */}
      <div
        className="flex gap-3"
        style={{
          transform: `translateX(${-(offset - 200)}px)`,
          willChange: "transform",
        }}
      >
        {ROW2.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            className="rounded-2xl object-cover flex-shrink-0"
            style={{ width: 362, height: 233 }}
          />
        ))}
      </div>
    </section>
  );
}
