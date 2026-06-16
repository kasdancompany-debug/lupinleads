"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  defaultTransition,
  defaultViewport,
  slideLeft,
  slideRight,
} from "@/lib/motion-config";

interface SlideInProps {
  children: ReactNode;
  direction?: "left" | "right";
  delay?: number;
  className?: string;
}

export function SlideIn({
  children,
  direction = "left",
  delay = 0,
  className,
}: SlideInProps) {
  const reduce = useReducedMotion();
  const variants = direction === "left" ? slideLeft : slideRight;

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={variants}
      transition={{ ...defaultTransition, delay }}
    >
      {children}
    </motion.div>
  );
}
