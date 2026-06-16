"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { defaultTransition, defaultViewport, easePremium } from "@/lib/motion-config";

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  timing: string;
  icon: string;
}

const ICONS: Record<string, ReactNode> = {
  connect: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round" />
    </svg>
  ),
  build: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  launch: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" strokeLinecap="round" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" strokeLinecap="round" />
    </svg>
  ),
  track: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  ),
  optimize: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 17l4-6 4 3 5-8 5 11" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 20h18" strokeLinecap="round" />
    </svg>
  ),
};

interface OnboardingTimelineProps {
  steps: readonly OnboardingStep[];
}

export function OnboardingTimeline({ steps }: OnboardingTimelineProps) {
  const reduce = useReducedMotion();

  return (
    <>
      {/* Desktop — unified step cards (no duplicate timeline row) */}
      <div className="hidden lg:grid lg:grid-cols-5 gap-4 relative">
        <div className="absolute top-[27px] left-[10%] right-[10%] h-px bg-silver/10" aria-hidden />
        {!reduce && (
          <motion.div
            className="absolute top-[26px] left-[10%] right-[10%] h-[2px] origin-left launch-timeline-glow rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.4, ease: easePremium }}
          />
        )}
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ ...defaultTransition, delay: index * 0.08 }}
          >
            <UnifiedStepCard step={step} index={index} />
          </motion.div>
        ))}
      </div>

      {/* Mobile vertical timeline */}
      <div className="lg:hidden relative pl-1">
        <div className="absolute left-[23px] top-6 bottom-6 w-px" aria-hidden>
          <div className="h-full w-full bg-silver/10" />
          {!reduce && (
            <motion.div
              className="absolute inset-x-0 top-0 h-full origin-top pipeline-connector-glow pipeline-vertical-glow"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.2, ease: easePremium }}
            />
          )}
        </div>
        <div className="space-y-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative flex gap-4"
              initial={reduce ? false : { opacity: 0, x: -20 }}
              whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ ...defaultTransition, delay: index * 0.1 }}
            >
              <TimelineNode
                step={step}
                index={index}
                reduce={!!reduce}
                layout="vertical"
              />
              <div className="flex-1 min-w-0 pt-0.5">
                <StepCard step={step} index={index} compact />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

function TimelineNode({
  step,
  index,
  reduce,
  layout,
}: {
  step: OnboardingStep;
  index: number;
  reduce: boolean;
  layout: "horizontal" | "vertical";
}) {
  const node = (
    <motion.div
      className={`relative z-10 flex flex-col items-center ${
        layout === "horizontal" ? "text-center" : "shrink-0"
      }`}
      initial={reduce ? false : { scale: 0.8, opacity: 0 }}
      whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ ...defaultTransition, delay: 0.15 + index * 0.12 }}
    >
      <div className="w-[54px] h-[54px] rounded-2xl bg-forest-mid/20 border border-forest-glow/40 flex items-center justify-center text-forest-glow shadow-[0_0_24px_color-mix(in_srgb,var(--forest-glow)_20%,transparent)]">
        {ICONS[step.icon]}
      </div>
      {layout === "horizontal" && (
        <>
          <p className="mt-3 text-sm font-semibold text-foreground">{step.title}</p>
          <span className="mt-1 text-[10px] uppercase tracking-wider text-forest-glow">
            {step.timing}
          </span>
        </>
      )}
    </motion.div>
  );

  if (layout === "vertical") {
    return node;
  }
  return node;
}

function UnifiedStepCard({ step, index }: { step: OnboardingStep; index: number }) {
  return (
    <article className="value-card rounded-xl p-5 min-h-[168px] flex flex-col pt-14 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[54px] h-[54px] rounded-2xl bg-forest-mid/20 border border-forest-glow/40 flex items-center justify-center text-forest-glow shadow-[0_0_24px_color-mix(in_srgb,var(--forest-glow)_20%,transparent)]">
        {ICONS[step.icon]}
      </div>
      <div className="flex items-center justify-between gap-2 mb-2">
        <h3 className="font-semibold text-foreground text-sm">{step.title}</h3>
        <span className="text-[10px] uppercase tracking-wider text-forest-glow shrink-0">
          {step.timing}
        </span>
      </div>
      <span className="text-[10px] uppercase tracking-[0.15em] text-silver-dim mb-2">
        Step {String(index + 1).padStart(2, "0")}
      </span>
      <p className="text-sm text-silver-muted leading-relaxed flex-1">{step.description}</p>
    </article>
  );
}

function StepCard({
  step,
  index,
  compact = false,
}: {
  step: OnboardingStep;
  index: number;
  compact?: boolean;
}) {
  return (
    <article
      className={`value-card rounded-xl group hover:border-forest-mid/40 transition-all duration-500 ${
        compact ? "p-4" : "p-5 min-h-[148px] flex flex-col"
      }`}
    >
      {compact && (
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="font-semibold text-foreground">{step.title}</h3>
          <span className="text-[10px] uppercase tracking-wider text-forest-glow shrink-0">
            {step.timing}
          </span>
        </div>
      )}
      {!compact && (
        <span className="text-[10px] uppercase tracking-[0.15em] text-silver-dim mb-3">
          Step {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <p className={`text-silver-muted leading-relaxed ${compact ? "text-sm" : "text-sm flex-1"}`}>
        {step.description}
      </p>
    </article>
  );
}
