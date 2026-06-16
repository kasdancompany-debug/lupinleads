"use client";

import type { ReactNode } from "react";
import { FloatingMockup } from "@/components/motion/FloatingMockup";
import { SlideIn } from "@/components/motion/SlideIn";

interface FloatingProductCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  float?: boolean;
  slideFrom?: "left" | "right";
  delay?: number;
}

export function FloatingProductCard({
  children,
  className = "",
  glow = true,
  float = true,
  slideFrom,
  delay = 0,
}: FloatingProductCardProps) {
  const inner = (
    <div className={`relative ${className}`}>
      {glow && (
        <div className="absolute -inset-6 bg-forest-mid/12 rounded-full blur-[50px] pointer-events-none" />
      )}
      {float ? (
        <FloatingMockup>{children}</FloatingMockup>
      ) : (
        children
      )}
    </div>
  );

  if (slideFrom) {
    return (
      <SlideIn direction={slideFrom} delay={delay}>
        {inner}
      </SlideIn>
    );
  }

  return inner;
}
