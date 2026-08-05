"use client";

import { createContext, useContext, useLayoutEffect, useState, type ReactNode } from "react";

interface HeroScrollCtx {
  pdInHero: boolean;
}

const HeroScrollContext = createContext<HeroScrollCtx>({ pdInHero: true });

export function HeroScrollProvider({ children }: { children: ReactNode }) {
  const [pdInHero, setPdInHero] = useState(true);

  useLayoutEffect(() => {
    const check = () => {
      const hero = document.getElementById("hero");
      if (hero) {
        setPdInHero(window.scrollY < hero.offsetTop + hero.offsetHeight * 0.92);
      }
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <HeroScrollContext.Provider value={{ pdInHero }}>
      {children}
    </HeroScrollContext.Provider>
  );
}

export const useHeroScroll = () => useContext(HeroScrollContext);
