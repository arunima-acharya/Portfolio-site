"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import LiveProjectButton from "./LiveProjectButton";

const FONT = "var(--font-kanit), sans-serif";
const BR = "clamp(40px, 5vw, 60px)";

const PROJECTS = [
  {
    num: "01",
    category: "Client",
    name: "Nextlevel Studio",
    col1: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
    ],
    col2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
  },
  {
    num: "02",
    category: "Personal",
    name: "Aura Brand Identity",
    col1: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    ],
    col2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
  },
  {
    num: "03",
    category: "Client",
    name: "Solaris Digital",
    col1: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    ],
    col2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
  },
];

const TOTAL = PROJECTS.length;

function ProjectCard({
  project,
  index,
  progress,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  progress: MotionValue<number>;
}) {
  const targetScale = 1 - (TOTAL - 1 - index) * 0.03;
  const scale = useTransform(
    progress,
    [index / TOTAL, (index + 1) / TOTAL],
    [1, targetScale]
  );

  return (
    <div
      className="h-[85vh] flex items-start"
      style={{
        position: "sticky",
        top: `${96 + index * 28}px`,
      }}
    >
      <motion.div
        style={{
          scale,
          width: "100%",
          background: "#0C0C0C",
          border: "2px solid #D7E2EA",
          borderRadius: BR,
          padding: "clamp(1rem, 2vw, 2rem)",
          transformOrigin: "top center",
        }}
      >
        {/* Top row */}
        <div className="flex items-center justify-between mb-4 md:mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-4 md:gap-8">
            <span
              className="font-black leading-none"
              style={{
                color: "#D7E2EA",
                fontSize: "clamp(2.5rem, 8vw, 120px)",
              }}
            >
              {project.num}
            </span>
            <div className="flex flex-col gap-0.5">
              <span
                className="uppercase tracking-wider font-medium"
                style={{
                  color: "rgba(215,226,234,0.5)",
                  fontSize: "clamp(0.7rem, 1.2vw, 1rem)",
                }}
              >
                {project.category}
              </span>
              <span
                className="font-medium uppercase"
                style={{
                  color: "#D7E2EA",
                  fontSize: "clamp(1rem, 2.5vw, 2.2rem)",
                }}
              >
                {project.name}
              </span>
            </div>
          </div>
          <LiveProjectButton />
        </div>

        {/* Image grid */}
        <div className="flex gap-3 md:gap-4">
          {/* Left col — 40% */}
          <div className="flex flex-col gap-3 md:gap-4" style={{ flex: "0 0 40%" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.col1[0]}
              alt=""
              className="w-full object-cover"
              style={{ height: "clamp(130px, 16vw, 230px)", borderRadius: BR }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.col1[1]}
              alt=""
              className="w-full object-cover"
              style={{ height: "clamp(160px, 22vw, 340px)", borderRadius: BR }}
            />
          </div>
          {/* Right col — 60% */}
          <div style={{ flex: "0 0 60%" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.col2}
              alt=""
              className="w-full h-full object-cover"
              style={{ borderRadius: BR }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="jack-projects"
      className="-mt-10 sm:-mt-12 md:-mt-14 relative z-10 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 pb-32"
      style={{ background: "#0C0C0C", fontFamily: FONT }}
    >
      <h2
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Project
      </h2>

      <div ref={containerRef}>
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.num}
            project={project}
            index={i}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
