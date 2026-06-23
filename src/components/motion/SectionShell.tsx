"use client";

import { motion, useReducedMotion } from "framer-motion";

export type SectionVariant =
  | "forest"
  | "charcoal"
  | "emerald"
  | "gradient"
  | "surface"
  | "elevated"
  | "deep"
  | "contrast"
  | "mesh"
  | "stone";

const variantClass: Record<SectionVariant, string> = {
  forest: "section-forest",
  charcoal: "section-charcoal",
  emerald: "section-emerald",
  gradient: "section-gradient",
  surface: "section-surface",
  elevated: "section-elevated",
  deep: "section-deep",
  contrast: "section-contrast",
  mesh: "section-emerald",
  stone: "section-stone",
};

const variantAmbient: Partial<Record<SectionVariant, string>> = {
  forest: "section-glow-top",
  emerald: "section-glow-corner",
  gradient: "section-glow-top",
  mesh: "section-glow-corner",
  deep: "section-glow-top",
};

interface SectionShellProps {
  id: string;
  children: React.ReactNode;
  variant?: SectionVariant;
  className?: string;
}

export function SectionShell({
  id,
  children,
  variant = "forest",
  className = "",
}: SectionShellProps) {
  const reduce = useReducedMotion();
  const showMesh = variant === "mesh" || variant === "emerald";

  return (
    <motion.section
      id={id}
      className={`home-section-pad relative overflow-hidden ${variantClass[variant]} ${className}`}
      initial={reduce ? false : { opacity: 0 }}
      whileInView={reduce ? undefined : { opacity: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {variantAmbient[variant] && (
        <div
          className={`absolute inset-0 pointer-events-none opacity-50 ${variantAmbient[variant]}`}
        />
      )}
      {showMesh && (
        <div className="absolute inset-0 mesh-gradient pointer-events-none opacity-25" />
      )}
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-[0.14]" />
      {variant !== "stone" ? (
        <div className="absolute inset-0 brand-stem-watermark pointer-events-none opacity-[0.22]" />
      ) : null}
      <div className="relative page-container">{children}</div>
    </motion.section>
  );
}
