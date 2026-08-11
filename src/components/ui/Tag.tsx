import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "solid";
}

export default function Tag({
  children,
  className,
  variant = "default",
}: TagProps) {
  const variants = {
    default: "bg-[var(--sp-dew)] text-[#8a8580] border border-[rgba(23,23,23,0.12)]",
    outline: "bg-[var(--sp-cream)] border border-[var(--sp-charcoal)] text-[var(--sp-charcoal)]",
    solid: "bg-[var(--sp-charcoal)] text-[var(--sp-cream)] border border-[var(--sp-charcoal)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-medium rounded-full px-3 py-1 tracking-wide",
        variants[variant],
        className
      )}
      style={{ fontFamily: "var(--font-geist), sans-serif" }}
    >
      {children}
    </span>
  );
}
