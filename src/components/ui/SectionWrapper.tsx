"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  animate?: boolean;
}

export default function SectionWrapper({
  children,
  className,
  id,
  animate = true,
}: SectionWrapperProps) {
  const { ref, isInView } = useScrollAnimation(0.05);

  if (!animate) {
    return (
      <section id={id} className={cn("relative", className)}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative", className)}
    >
      {children}
    </motion.section>
  );
}
