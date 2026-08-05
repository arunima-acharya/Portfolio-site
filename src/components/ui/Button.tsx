"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  "aria-pressed"?: boolean;
  id?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  disabled,
  onClick,
  ...rest
}: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none";

  const variants = {
    primary: "bg-white text-black hover:bg-zinc-100 active:bg-zinc-200",
    secondary:
      "bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-sm",
    ghost: "text-zinc-400 hover:text-white hover:bg-white/5",
    outline:
      "border border-white/20 text-white hover:bg-white/5 hover:border-white/30",
  };

  const sizes = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-3 gap-2",
    lg: "text-base px-8 py-4 gap-2.5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
