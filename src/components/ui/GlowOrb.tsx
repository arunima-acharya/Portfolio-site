import { cn } from "@/lib/utils";

interface GlowOrbProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  opacity?: number;
}

export default function GlowOrb({
  className,
  size = "lg",
  opacity = 0.12,
}: GlowOrbProps) {
  const sizes = {
    sm: "w-48 h-48",
    md: "w-72 h-72",
    lg: "w-[500px] h-[500px]",
    xl: "w-[800px] h-[800px]",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute rounded-full pointer-events-none",
        "bg-white blur-[120px]",
        sizes[size],
        className
      )}
      style={{ opacity }}
    />
  );
}
