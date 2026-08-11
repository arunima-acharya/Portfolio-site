"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProjectBySlug, projectHref } from "@/data/projects";

const ff = "var(--font-geist), sans-serif";

interface ProjectNavigationProps {
  prevSlug?: string;
  nextSlug?: string;
  backHref?: string;
  backLabel?: string;
}

// Fixed Superr tokens rather than useResearchPalette — this renders on both
// case-study pages (no theme provider, would otherwise fall back to the
// dark palette) and research pages, so it needs one consistent light
// identity regardless of context.
export default function ProjectNavigation({ prevSlug, nextSlug, backHref = "/case-studies", backLabel = "All projects" }: ProjectNavigationProps) {
  const prevProject = prevSlug ? getProjectBySlug(prevSlug) : null;
  const nextProject = nextSlug ? getProjectBySlug(nextSlug) : null;

  if (!prevProject && !nextProject) return null;

  function handleEnter(e: React.MouseEvent<HTMLAnchorElement>) {
    const circle = e.currentTarget.querySelector<HTMLElement>("[data-nav-circle]");
    const icon = e.currentTarget.querySelector<HTMLElement>("[data-nav-icon]");
    const title = e.currentTarget.querySelector<HTMLElement>("[data-nav-title]");
    if (circle) circle.style.borderColor = "var(--sp-orange)";
    if (icon) icon.style.color = "var(--sp-orange)";
    if (title) title.style.color = "var(--sp-orange)";
  }
  function handleLeave(e: React.MouseEvent<HTMLAnchorElement>) {
    const circle = e.currentTarget.querySelector<HTMLElement>("[data-nav-circle]");
    const icon = e.currentTarget.querySelector<HTMLElement>("[data-nav-icon]");
    const title = e.currentTarget.querySelector<HTMLElement>("[data-nav-title]");
    if (circle) circle.style.borderColor = "var(--sp-charcoal)";
    if (icon) icon.style.color = "#8a8580";
    if (title) title.style.color = "var(--sp-charcoal)";
  }

  return (
    <nav
      className="py-16 px-6"
      style={{ borderTop: "1.5px solid var(--sp-charcoal)", background: "var(--sp-cream)" }}
      aria-label="Case study navigation"
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-8">
        {prevProject ? (
          <Link
            href={projectHref(prevProject)}
            className="group flex items-center gap-4 max-w-xs"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div
              data-nav-circle
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
              style={{ border: "1.5px solid var(--sp-charcoal)" }}
            >
              <ArrowLeft
                data-nav-icon
                size={16}
                className="transition-colors"
                style={{ color: "#8a8580" }}
              />
            </div>
            <div>
              <p className="mb-0.5" style={{ fontSize: 16, color: "#8a8580", fontFamily: ff }}>Previous</p>
              <p
                data-nav-title
                className="font-medium transition-colors line-clamp-1"
                style={{ fontSize: 16, color: "var(--sp-charcoal)", fontFamily: ff }}
              >
                {prevProject.title}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        <Link
          href={backHref}
          className="transition-colors hidden sm:block"
          style={{ fontSize: 16, color: "#8a8580", fontFamily: ff }}
        >
          {backLabel}
        </Link>

        {nextProject ? (
          <Link
            href={projectHref(nextProject)}
            className="group flex items-center gap-4 max-w-xs text-right"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div>
              <p className="mb-0.5" style={{ fontSize: 16, color: "#8a8580", fontFamily: ff }}>Next</p>
              <p
                data-nav-title
                className="font-medium transition-colors line-clamp-1"
                style={{ fontSize: 16, color: "var(--sp-charcoal)", fontFamily: ff }}
              >
                {nextProject.title}
              </p>
            </div>
            <div
              data-nav-circle
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
              style={{ border: "1.5px solid var(--sp-charcoal)" }}
            >
              <ArrowRight
                data-nav-icon
                size={16}
                className="transition-colors"
                style={{ color: "#8a8580" }}
              />
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
