"use client";
import Magnet from "./Magnet";
import FadeIn from "./FadeIn";
import ContactButton from "./ContactButton";
import FaceTracker from "./FaceTracker";
import HeroHeading from "./HeroHeading";

const NAV_LINKS = ["About", "Price", "Projects", "Contact"];
const FONT = "var(--font-manrope), sans-serif";

export default function HeroSection() {
  return (
    <section
      className="h-screen flex flex-col overflow-x-clip"
      style={{ background: "#0C0C0C", fontFamily: FONT }}
    >
      {/* Navbar */}
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-between px-6 md:px-10 pt-6 md:pt-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#jack-${link.toLowerCase()}`}
              className="text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider transition-opacity hover:opacity-70 duration-200"
              style={{ color: "#D7E2EA" }}
            >
              {link}
            </a>
          ))}
        </nav>
      </FadeIn>


      <HeroHeading />

      {/* Bottom bar */}
      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 flex-1 px-6 md:px-10 relative">
        {/* Left text */}
        <FadeIn delay={0.35} y={20}>
          <p
            className="font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ color: "#D7E2EA", fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>

        {/* Portrait — centered absolutely */}
        <FadeIn
          delay={0.6}
          y={30}
          className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0"
        >
          <Magnet padding={150} strength={3}>
            <FaceTracker maxRotation={18} lerp={0.07}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/3d/face.png"
                alt="Arunima"
                className="w-[333px] sm:w-[428px] md:w-[524px] lg:w-[619px] object-contain"
                style={{ willChange: "transform", filter: "drop-shadow(0px 40px 60px rgba(0,0,0,0.7)) drop-shadow(0px 10px 24px rgba(0,0,0,0.5))" }}
              />
            </FaceTracker>
          </Magnet>
        </FadeIn>

        {/* Right button */}
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
