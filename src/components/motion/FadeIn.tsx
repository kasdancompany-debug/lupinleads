"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { defaultTransition, defaultViewport, fadeIn } from "@/lib/motion-config";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3";
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  as = "div",
  className,
}: FadeInProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={fadeIn}
      transition={{ ...defaultTransition, delay }}
    >
      {children}
    </Component>
  );
}
