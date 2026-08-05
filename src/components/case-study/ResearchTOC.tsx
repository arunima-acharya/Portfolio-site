"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { useResearchAccent, useResearchAccentText, useResearchPalette } from "./ResearchAccent";

export interface TOCItem {
  id: string;
  label: string;
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top, behavior: "smooth" });
}

/* Vertical rail floating in the left gutter — only shown where there's
   room beside the centered 820px reading column (2xl+ / big monitors). */
export function ResearchTOCRail({ items }: { items: TOCItem[] }) {
  const accent = useResearchAccent();
  const accentText = useResearchAccentText();
  const p = useResearchPalette();
  const active = useActiveSection(items.map((i) => i.id));

  return (
    <nav
      aria-label="Article sections"
      className="hidden 2xl:block fixed"
      style={{ top: 220, left: "calc(50vw - 630px)", width: 190 }}
    >
      <ul className="space-y-4">
        {items.map((item, i) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className="group flex items-center gap-3 text-left w-full"
              >
                <span
                  className="text-[11px] font-mono tabular-nums transition-colors duration-200"
                  style={{ color: isActive ? accentText : p.textFaint }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-[13px] leading-snug transition-all duration-200"
                  style={{
                    color: isActive ? p.text : p.textMuted,
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {item.label}
                </span>
              </button>
              {isActive && (
                <span
                  className="block mt-1.5 h-px rounded-full transition-all duration-300"
                  style={{ background: accent, width: 28, marginLeft: 26 }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* Floating pill dock — the mobile/tablet/laptop fallback. Pinned to the
   bottom of the viewport (not the document), so it stays put through the
   whole scroll rather than docking under the navbar. */
export function ResearchTOCBar({ items }: { items: TOCItem[] }) {
  const accent = useResearchAccent();
  const accentText = useResearchAccentText();
  const p = useResearchPalette();
  const active = useActiveSection(items.map((i) => i.id));

  return (
    <div
      className="2xl:hidden fixed z-40 flex flex-wrap justify-center gap-1.5"
      style={{
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: "max-content",
        maxWidth: "calc(100vw - 24px)",
        background: p.dockBg,
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: `1px solid ${p.cardBorderStrong}`,
        borderRadius: 28,
        padding: 8,
        boxShadow: p.dockShadow,
      }}
    >
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="whitespace-nowrap text-[13px] px-3.5 py-1.5 rounded-full transition-all duration-200 flex-shrink-0"
            style={
              isActive
                ? { background: `${accent}1f`, color: accentText, border: `1px solid ${accent}55` }
                : { background: "transparent", color: p.textMuted, border: "1px solid transparent" }
            }
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
