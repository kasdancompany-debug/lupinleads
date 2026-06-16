"use client";

import { motion } from "framer-motion";
import { easePremium } from "@/lib/motion-config";

export interface PipelineStep {
  id: string;
  title: string;
  description: string;
  detail: string;
  icon: React.ReactNode;
}

interface PipelineFlowDiagramProps {
  steps: PipelineStep[];
  activeStep: number;
  reduceMotion: boolean;
  onStepInView?: (index: number) => void;
}

export function PipelineFlowDiagram({
  steps,
  activeStep,
  reduceMotion,
  onStepInView,
}: PipelineFlowDiagramProps) {
  const progress = steps.length <= 1 ? 1 : activeStep / (steps.length - 1);

  return (
    <div className="w-full">
      {/* Desktop horizontal pipeline */}
      <div className="hidden lg:block relative px-2">
        <div className="absolute inset-x-4 top-[27px] h-[2px]" aria-hidden>
          <div className="h-full w-full rounded-full bg-silver/10" />
          <motion.div
            className="absolute inset-y-0 left-0 right-0 origin-left rounded-full pipeline-connector-glow"
            initial={false}
            animate={{ scaleX: reduceMotion ? 1 : Math.max(0.02, progress) }}
            transition={{ duration: 0.55, ease: easePremium }}
          />
        </div>

        <div className="relative grid grid-cols-7 gap-2">
          {steps.map((step, index) => (
            <PipelineNode
              key={step.id}
              step={step}
              isActive={index === activeStep}
              isComplete={index < activeStep}
              reduceMotion={reduceMotion}
              layout="horizontal"
            />
          ))}
        </div>
      </div>

      {/* Mobile / tablet vertical pipeline */}
      <div className="lg:hidden relative pl-1">
        <div className="absolute left-[23px] top-8 bottom-8 w-px" aria-hidden>
          <div className="h-full w-full bg-silver/10" />
          <motion.div
            className="absolute inset-x-0 top-0 h-full origin-top pipeline-connector-glow pipeline-vertical-glow"
            initial={false}
            animate={{ scaleY: reduceMotion ? 1 : Math.max(0.08, progress) }}
            transition={{ duration: 0.55, ease: easePremium }}
          />
        </div>

        <div className="space-y-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative flex gap-4 items-stretch"
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              onViewportEnter={() => onStepInView?.(index)}
              viewport={{ once: true, amount: 0.45, margin: "-10% 0px" }}
              transition={{ duration: 0.55, ease: easePremium, delay: index * 0.04 }}
            >
              <PipelineNode
                step={step}
                isActive={index === activeStep}
                isComplete={index < activeStep}
                reduceMotion={reduceMotion}
                layout="vertical"
              />
              <motion.div
                className="flex-1 min-w-0"
                initial={false}
                animate={{
                  opacity: index <= activeStep ? 1 : 0.35,
                  x: index <= activeStep ? 0 : 8,
                }}
                transition={{ duration: 0.45, ease: easePremium }}
              >
                <div
                  className={`value-card rounded-xl p-4 h-full transition-colors duration-500 ${
                    index === activeStep
                      ? "border-forest-mid/45 glow-green"
                      : index < activeStep
                        ? "border-forest-mid/25"
                        : ""
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-wider text-forest-glow mb-1">
                    Step {index + 1}
                  </p>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-silver-muted leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PipelineNode({
  step,
  isActive,
  isComplete,
  reduceMotion,
  layout,
}: {
  step: PipelineStep;
  isActive: boolean;
  isComplete: boolean;
  reduceMotion: boolean;
  layout: "horizontal" | "vertical";
}) {
  const lit = isActive || isComplete;

  const node = (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={false}
      animate={{
        opacity: lit ? 1 : 0.4,
        scale: isActive && !reduceMotion ? 1.05 : 1,
      }}
      transition={{ duration: 0.4, ease: easePremium }}
    >
      <div
        className={`relative z-10 w-[54px] h-[54px] rounded-2xl flex items-center justify-center border transition-all duration-500 ${
          isActive
            ? "bg-forest-mid/30 border-forest-glow/60 shadow-[0_0_24px_color-mix(in_srgb,var(--forest-glow)_35%,transparent)]"
            : isComplete
              ? "bg-forest-mid/20 border-forest-mid/50"
              : "bg-black-surface/80 border-silver/15"
        }`}
      >
        <span
          className={`transition-colors duration-500 ${
            lit ? "text-forest-glow" : "text-silver-dim"
          }`}
        >
          {step.icon}
        </span>
        {isActive && !reduceMotion && (
          <motion.span
            className="absolute inset-0 rounded-2xl border border-forest-glow/40"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
      {layout === "horizontal" && (
        <>
          <p
            className={`mt-3 text-[11px] font-semibold leading-tight transition-colors duration-500 ${
              lit ? "text-foreground" : "text-silver-dim"
            }`}
          >
            {step.title}
          </p>
          <p className="mt-1 text-[10px] text-silver-dim leading-snug px-1 hidden xl:block">
            {step.description}
          </p>
        </>
      )}
    </motion.div>
  );

  if (layout === "vertical") {
    return <div className="shrink-0 pt-1">{node}</div>;
  }

  return node;
}

export function PipelineDetailCard({
  step,
  stepIndex,
  totalSteps,
  reduceMotion,
}: {
  step: PipelineStep;
  stepIndex: number;
  totalSteps: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      key={step.id}
      className="value-card rounded-2xl p-8 lg:p-10 border-forest-mid/35 glow-green relative overflow-hidden"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: easePremium }}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-forest-mid/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="relative grid lg:grid-cols-[auto_1fr] gap-6 lg:gap-10 items-start">
        <div className="w-16 h-16 rounded-2xl bg-forest-mid/25 border border-forest-glow/40 flex items-center justify-center text-forest-glow">
          {step.icon}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-forest-glow font-medium">
              Step {stepIndex + 1} of {totalSteps}
            </span>
            <span className="h-px flex-1 min-w-[40px] bg-gradient-to-r from-forest-mid/50 to-transparent hidden sm:block" />
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3 tracking-tight">
            {step.title}
          </h3>
          <p className="text-silver-muted text-lg leading-relaxed mb-4">{step.description}</p>
          <p className="text-sm text-silver-dim leading-relaxed border-t border-silver/10 pt-4">
            {step.detail}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
