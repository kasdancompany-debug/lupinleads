"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FloatingMockupProps {
  children: React.ReactNode;
  className?: string;
}

export function FloatingMockup({ children, className = "" }: FloatingMockupProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -12, 0] }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
