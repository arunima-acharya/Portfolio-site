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
    default: "bg-white/5 text-zinc-400 border border-white/6",
    outline: "border border-white/15 text-zinc-300",
    solid: "bg-white/10 text-white border border-white/10",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-medium rounded-full px-3 py-1 tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
