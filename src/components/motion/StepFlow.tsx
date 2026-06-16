"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SlideIn } from "./SlideIn";
import { defaultTransition, defaultViewport } from "@/lib/motion-config";

export interface FlowStep {
  title: string;
  body: string;
  tag?: string;
}

interface StepFlowProps {
  steps: FlowStep[];
  slideFrom?: "left" | "right";
}

export function StepFlow({ steps, slideFrom = "left" }: StepFlowProps) {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      {!reduce && (
        <div
          className="absolute left-[19px] top-6 bottom-6 w-px hidden sm:block"
          aria-hidden
        >
          <motion.div
            className="h-full w-full origin-top bg-gradient-to-b from-forest-glow/70 via-forest-mid/40 to-transparent"
            style={{
              boxShadow: "0 0 12px color-mix(in srgb, var(--forest-glow) 45%, transparent)",
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}

      <div className="space-y-4">
        {steps.map((step, index) => (
          <SlideIn key={step.title} direction={slideFrom} delay={index * 0.1}>
            <RiseStepCard step={step} index={index} />
          </SlideIn>
        ))}
      </div>
    </div>
  );
}

function RiseStepCard({ step, index }: { step: FlowStep; index: number }) {
  const reduce = useReducedMotion();

  const card = (
    <div className="value-card rounded-xl p-5 flex gap-4 group hover:border-forest-mid/35 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-forest-mid/20 border border-forest-mid/35 flex items-center justify-center text-forest-glow text-xs font-bold shrink-0 relative z-10">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <h3 className="font-semibold text-foreground">{step.title}</h3>
          {step.tag && (
            <span className="text-[10px] uppercase tracking-wider text-forest-glow bg-forest-mid/15 px-2 py-0.5 rounded border border-forest-mid/25">
              {step.tag}
            </span>
          )}
        </div>
        <p className="text-sm text-silver-muted leading-relaxed">{step.body}</p>
      </div>
    </div>
  );

  if (reduce) return card;

  return (
    <motion.div
      whileInView={{ y: 0, opacity: 1 }}
      initial={{ y: 20, opacity: 0.85 }}
      viewport={defaultViewport}
      transition={{ ...defaultTransition, delay: index * 0.06 }}
    >
      {card}
    </motion.div>
  );
}
