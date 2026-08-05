"use client";

import { useRef } from "react";

const steps = [
  {
    number: "01",
    category: "Starting",
    title: "Strategy",
    description: "Goals + Roadmap + Frameworks + Opportunities",
  },
  {
    number: "02",
    category: "Research and understanding",
    title: "Empathize",
    description: "Benchmark report + Surveys + Pain points + Insights + User personas + Trip journey",
  },
  {
    number: "03",
    category: "Problem focusing",
    title: "Define",
    description: "Jobs to be Done + Point Of View + Business Model Canvas + Functionalities",
  },
  {
    number: "04",
    category: "Solution finding",
    title: "Ideate",
    description: "Divergence/ Convergence + MVP vs V1 + Architecture + User flow and cases + Lo-Fi Sketches + Voice and tone",
  },
  {
    number: "05",
    category: "Development",
    title: "Prototype",
    description: "Hi-Fi Mockups + Clickeable prototype + Decision making (Fail fast and learn fast) + Patterns",
  },
  {
    number: "06",
    category: "Validation",
    title: "Test",
    description: "User testing + Feedback + Quickly iterations + Usability reports",
  },
];

const months = ["September", "October", "November", "December"];

const ganttBars = [
  { color: "#e8e8e8", border: "1px solid #bbb", monthStart: 0, weekStart: 0, monthEnd: 0, weekEnd: 0 },
  { color: "#c4b5fd", monthStart: 0, weekStart: 1, monthEnd: 1, weekEnd: 2 },
  { color: "#fde047", monthStart: 1, weekStart: 1, monthEnd: 1, weekEnd: 3 },
  { color: "#fb923c", monthStart: 1, weekStart: 3, monthEnd: 2, weekEnd: 3 },
  { color: "#ef4444", monthStart: 2, weekStart: 1, monthEnd: 3, weekEnd: 0 },
  { color: "#1a1a1a", monthStart: 3, weekStart: 0, monthEnd: 3, weekEnd: 3, label: "Prepare case project\nMVP" },
];

const WEEKS_PER_MONTH = 4;
const TOTAL_WEEKS = months.length * WEEKS_PER_MONTH;

function weekIndex(month: number, week: number) {
  return month * WEEKS_PER_MONTH + week;
}

export default function DesignProcess() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="process" className="py-20 md:py-28" aria-labelledby="process-heading">
      <div className="space-y-10">
        {/* Header */}
        <p className="text-[15px] text-[var(--text-primary)]">
          <span className="font-semibold">How do we organize ourselves?</span>{" "}
          <span className="text-[var(--text-secondary)]">We use the Design Thinking and User-Centered Design framework.</span>
        </p>

        {/* Cards row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex-shrink-0 flex flex-col justify-between border border-[var(--text-primary)] rounded-sm bg-transparent"
              style={{ width: 220, minHeight: 320, padding: "16px" }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] text-[var(--text-secondary)] leading-tight">{step.category}</span>
                <span
                  className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[10px] font-bold text-white rounded-sm"
                  style={{ backgroundColor: "#e8510a" }}
                >
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[32px] font-bold text-[var(--text-primary)] leading-none mt-4">{step.title}</h3>

              {/* Description */}
              <p className="text-[13px] text-[var(--text-secondary)] leading-snug mt-auto pt-8">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Gantt timeline */}
        <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <div style={{ minWidth: 900 }}>
            {/* Month headers */}
            <div className="flex border border-[var(--border-default)] rounded-sm overflow-hidden mb-3">
              {months.map((month) => (
                <div
                  key={month}
                  className="flex-1 text-center text-[13px] font-medium text-[var(--text-primary)] py-2 border-r border-[var(--border-default)] last:border-r-0"
                >
                  {month}
                </div>
              ))}
            </div>

            {/* Week labels */}
            <div className="flex mb-2">
              {months.map((month) => (
                <div key={month} className="flex-1 flex">
                  {[1, 2, 3, 4].map((w) => (
                    <div key={w} className="flex-1 text-center text-[10px] text-[var(--text-muted)]">
                      Week {String(w).padStart(2, "0")}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Bars */}
            <div className="relative" style={{ height: 72 }}>
              {ganttBars.map((bar, i) => {
                const start = weekIndex(bar.monthStart, bar.weekStart);
                const end = weekIndex(bar.monthEnd, bar.weekEnd);
                const left = (start / TOTAL_WEEKS) * 100;
                const width = ((end - start + 1) / TOTAL_WEEKS) * 100;
                const top = i < 4 ? 4 : 38;

                return (
                  <div key={i} style={{ position: "absolute", left: `${left}%`, width: `${width}%`, top, height: 26 }}>
                    <div
                      className="h-full rounded-sm flex items-end pb-1 px-2"
                      style={{ backgroundColor: bar.color, border: (bar as any).border }}
                    />
                    {bar.label && (
                      <div className="text-[10px] text-[var(--text-secondary)] mt-1 leading-tight whitespace-pre">
                        {bar.label}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
