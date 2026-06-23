"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { easePremium } from "@/lib/motion-config";

export interface JourneyStep {
  id: string;
  title: string;
  description: string;
  detail: string;
}

/** Node positions along the growth branch (viewBox 0 0 1000 320). */
const DESKTOP_NODES = [
  { x: 88, y: 268 },
  { x: 228, y: 212 },
  { x: 368, y: 162 },
  { x: 508, y: 122 },
  { x: 648, y: 142 },
  { x: 808, y: 182 },
] as const;

const DESKTOP_STEM =
  "M 58 300 V 195 M 58 228 C 140 218 200 200 228 212 S 320 175 368 162 S 460 138 508 122 S 590 128 648 142 S 740 168 808 182";

const MOBILE_STEM =
  "M 28 36 V 548 M 28 88 C 52 88 68 100 88 112 M 28 176 C 52 176 68 188 88 200 M 28 264 C 52 264 68 276 88 288 M 28 352 C 52 352 68 364 88 376 M 28 440 C 52 440 68 452 88 464 M 28 528 C 52 528 68 540 88 552";

type JourneyStemDiagramProps = {
  steps: JourneyStep[];
  activeStep: number;
  reduceMotion: boolean;
  onStepInView?: (index: number) => void;
};

export function JourneyStemDiagram({
  steps,
  activeStep,
  reduceMotion,
  onStepInView,
}: JourneyStemDiagramProps) {
  const uid = useId().replace(/:/g, "");
  const progress =
    steps.length <= 1 ? 1 : Math.max(0.04, activeStep / (steps.length - 1));

  return (
    <div className="w-full">
      {/* Desktop — ascending branch */}
      <div className="journey-stem journey-stem--desktop hidden lg:block">
        <div className="journey-stem__stage relative">
          <svg
            className="journey-stem__svg"
            viewBox="0 0 1000 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <defs>
              <linearGradient id={`${uid}-petal`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--lupin-purple-light)" />
                <stop offset="100%" stopColor="var(--lupin-purple-deep)" />
              </linearGradient>
              <linearGradient id={`${uid}-stem`} x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--forest-green-deep)" stopOpacity="0.5" />
                <stop offset="50%" stopColor="var(--forest-green-bright)" />
                <stop offset="100%" stopColor="var(--sage-green)" />
              </linearGradient>
              <filter id={`${uid}-bloom-glow`} x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <ellipse
              cx="120"
              cy="302"
              rx="100"
              ry="14"
              fill="var(--forest-green-deep)"
              fillOpacity="0.22"
            />

            <path
              d={DESKTOP_STEM}
              stroke="var(--forest-green)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.28"
            />

            <motion.path
              d={DESKTOP_STEM}
              stroke={`url(#${uid}-stem)`}
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              initial={false}
              animate={{
                strokeDashoffset: reduceMotion ? 0 : 1 - progress,
              }}
              style={{ strokeDasharray: 1 }}
              transition={{ duration: 0.6, ease: easePremium }}
            />

            {steps.map((step, index) => {
              const pos = DESKTOP_NODES[index];
              if (!pos) return null;
              return (
                <BloomNode
                  key={step.id}
                  uid={uid}
                  x={pos.x}
                  y={pos.y}
                  index={index}
                  isActive={index === activeStep}
                  isComplete={index < activeStep}
                  reduceMotion={reduceMotion}
                  size="md"
                />
              );
            })}
          </svg>

          <div className="journey-stem__labels">
            {steps.map((step, index) => {
              const pos = DESKTOP_NODES[index];
              if (!pos) return null;
              const lit = index <= activeStep;
              return (
                <div
                  key={step.id}
                  className="journey-stem__label"
                  style={{
                    left: `${(pos.x / 1000) * 100}%`,
                    top: `${(pos.y / 320) * 100}%`,
                  }}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: lit ? 1 : 0.38,
                      y: index === activeStep && !reduceMotion ? -2 : 0,
                    }}
                    transition={{ duration: 0.45, ease: easePremium }}
                  >
                    <p className="journey-stem__step-num">0{index + 1}</p>
                    <p
                      className={`journey-stem__title ${
                        index === activeStep ? "journey-stem__title--active" : ""
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="journey-stem__desc hidden xl:block">{step.description}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile / tablet — vertical stem */}
      <div className="journey-stem journey-stem--mobile lg:hidden">
        <div className="relative pl-2">
          <svg
            className="journey-stem__svg-mobile"
            viewBox="0 0 120 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <defs>
              <linearGradient id={`${uid}-petal-m`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--lupin-purple-light)" />
                <stop offset="100%" stopColor="var(--lupin-purple-deep)" />
              </linearGradient>
              <linearGradient id={`${uid}-stem-m`} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="var(--forest-green-deep)" />
                <stop offset="100%" stopColor="var(--forest-green-bright)" />
              </linearGradient>
            </defs>

            <path
              d={MOBILE_STEM}
              stroke="var(--forest-green)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.3"
            />

            <motion.path
              d={MOBILE_STEM}
              stroke={`url(#${uid}-stem-m)`}
              strokeWidth="2.25"
              strokeLinecap="round"
              pathLength={1}
              initial={false}
              animate={{
                strokeDashoffset: reduceMotion ? 0 : 1 - progress,
              }}
              style={{ strokeDasharray: 1 }}
              transition={{ duration: 0.6, ease: easePremium }}
            />
          </svg>

          <div className="space-y-4 sm:space-y-5">
            {steps.map((step, index) => {
              const lit = index <= activeStep;
              return (
                <motion.div
                  key={step.id}
                  className="journey-stem__mobile-row"
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  onViewportEnter={() => onStepInView?.(index)}
                  viewport={{ once: true, amount: 0.5, margin: "-8% 0px" }}
                  transition={{ duration: 0.55, ease: easePremium, delay: index * 0.04 }}
                >
                  <div className="journey-stem__mobile-bloom shrink-0">
                    <BloomNodeSvg
                      gradientId={`${uid}-petal-m`}
                      isActive={index === activeStep}
                      isComplete={index < activeStep}
                      reduceMotion={reduceMotion}
                      size="sm"
                    />
                  </div>

                  <motion.div
                    className="flex-1 min-w-0"
                    initial={false}
                    animate={{ opacity: lit ? 1 : 0.42 }}
                    transition={{ duration: 0.45, ease: easePremium }}
                  >
                    <div
                      className={`journey-stem__mobile-card rounded-xl p-4 sm:p-5 h-full ${
                        index === activeStep
                          ? "journey-stem__mobile-card--active"
                          : index < activeStep
                            ? "journey-stem__mobile-card--complete"
                            : ""
                      }`}
                    >
                      <p className="journey-stem__step-num mb-1">0{index + 1}</p>
                      <h3 className="font-semibold text-foreground text-sm sm:text-[15px] mb-1.5 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-silver-muted leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function BloomNode({
  uid,
  x,
  y,
  index,
  isActive,
  isComplete,
  reduceMotion,
  size,
}: {
  uid: string;
  x: number;
  y: number;
  index: number;
  isActive: boolean;
  isComplete: boolean;
  reduceMotion: boolean;
  size: "sm" | "md";
}) {
  const lit = isActive || isComplete;
  const scale = size === "sm" ? 1 : isActive ? 1.12 : lit ? 1.02 : 0.92;

  return (
    <motion.g
      transform={`translate(${x} ${y})`}
      initial={false}
      animate={{ opacity: lit ? 1 : 0.35, scale }}
      transition={{ duration: 0.45, ease: easePremium }}
      filter={isActive ? `url(#${uid}-bloom-glow)` : undefined}
    >
      {isActive && !reduceMotion && (
        <motion.circle
          r={size === "sm" ? 18 : 22}
          fill="var(--lupin-purple)"
          fillOpacity="0.08"
          animate={{ opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <BloomNodeSvg
        gradientId={`${uid}-petal`}
        isActive={isActive}
        isComplete={isComplete}
        reduceMotion={reduceMotion}
        size={size}
      />
      {lit && (
        <path
          d="M-4 10 H4"
          stroke="var(--forest-green-bright)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeOpacity="0.45"
        />
      )}
      <title>{`Step ${index + 1}`}</title>
    </motion.g>
  );
}

function BloomNodeSvg({
  gradientId,
  isActive,
  isComplete,
  reduceMotion,
  size,
}: {
  gradientId: string;
  isActive: boolean;
  isComplete: boolean;
  reduceMotion: boolean;
  size: "sm" | "md";
}) {
  const lit = isActive || isComplete;
  const petal = size === "sm" ? 5.5 : 7;
  const outer = size === "sm" ? 9 : 11;

  return (
    <g>
      <path
        d={`M0 ${-outer} L${petal} ${-petal} L0 0 L${-petal} ${-petal} Z`}
        fill={`url(#${gradientId})`}
        fillOpacity={lit ? (isActive ? 0.95 : 0.72) : 0.35}
      />
      <path
        d={`M0 ${-outer} L${petal} ${-petal} L0 0 L${-petal} ${-petal} Z`}
        stroke="var(--lupin-purple-light)"
        strokeWidth="0.75"
        strokeOpacity={lit ? 0.55 : 0.2}
        fill="none"
      />
      <circle
        r={size === "sm" ? 1.75 : 2.25}
        fill="var(--lupin-purple-light)"
        fillOpacity={lit ? 0.95 : 0.4}
      />
      {isActive && !reduceMotion && (
        <motion.circle
          r={outer + 2}
          stroke="var(--lupin-purple-light)"
          strokeWidth="0.75"
          fill="none"
          animate={{ opacity: [0.25, 0.65, 0.25] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </g>
  );
}

export function JourneyDetailCard({
  step,
  stepIndex,
  totalSteps,
  reduceMotion,
}: {
  step: JourneyStep;
  stepIndex: number;
  totalSteps: number;
  reduceMotion: boolean;
}) {
  const uid = useId().replace(/:/g, "");

  return (
    <motion.div
      key={step.id}
      className="journey-detail-card value-card rounded-2xl p-8 lg:p-10 border-forest-mid/35 relative overflow-hidden"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: easePremium }}
    >
      <div className="journey-detail-card__glow" aria-hidden />
      <div className="relative grid lg:grid-cols-[auto_1fr] gap-6 lg:gap-10 items-start">
        <div className="journey-detail-card__bloom" aria-hidden>
          <svg viewBox="-16 -16 32 32" width="64" height="64" fill="none">
            <defs>
              <linearGradient id={`${uid}-detail-petal`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--lupin-purple-light)" />
                <stop offset="100%" stopColor="var(--lupin-purple-deep)" />
              </linearGradient>
            </defs>
            <path
              d="M0 -11 L7 -7 L0 0 L-7 -7 Z"
              fill={`url(#${uid}-detail-petal)`}
              fillOpacity="0.9"
            />
            <circle r="2.5" fill="var(--lupin-purple-light)" />
            <path
              d="M0 2 V10"
              stroke="var(--forest-green-bright)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeOpacity="0.6"
            />
          </svg>
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="journey-stem__step-num !text-[11px] !tracking-[0.2em]">
              Stage {stepIndex + 1} of {totalSteps}
            </span>
            <span className="hero-purple-accent !w-8 !h-px opacity-80" aria-hidden />
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

/** Compact bloom for scroll progress indicators */
export function JourneyProgressBloom({
  isActive,
  isComplete,
}: {
  isActive: boolean;
  isComplete: boolean;
}) {
  const lit = isActive || isComplete;
  return (
    <span
      className={`journey-progress-bloom ${lit ? "journey-progress-bloom--lit" : ""} ${
        isActive ? "journey-progress-bloom--active" : ""
      }`}
      aria-hidden
    />
  );
}
