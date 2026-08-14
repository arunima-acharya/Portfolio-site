"use client";

import { createContext, useContext, useEffect } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({
  theme: "light",
  setTheme: () => {},
});

// Site is light-mode only — dark mode was removed. `setTheme` is kept as a
// no-op (rather than deleted) so any lingering call sites don't break, and
// any stale "dark" value from an old visitor's localStorage is overwritten
// on load instead of being honored.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    localStorage.setItem("theme", "light");
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "light", setTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
