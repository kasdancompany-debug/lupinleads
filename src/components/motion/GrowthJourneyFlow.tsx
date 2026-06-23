"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HOW_IT_WORKS_JOURNEY } from "@/lib/constants";
import { defaultTransition, defaultViewport, easePremium } from "@/lib/motion-config";

const STEP_ICONS: Record<(typeof HOW_IT_WORKS_JOURNEY)[number]["id"], ReactNode> = {
  "meta-ads": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" strokeLinecap="round" />
    </svg>
  ),
  "quote-request": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M4 6h16v12H4z" strokeLinejoin="round" />
      <path d="M8 10h8M8 14h5" strokeLinecap="round" />
    </svg>
  ),
  "book-estimate": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" strokeLinecap="round" />
      <path d="M9 14h2v2H9z" fill="currentColor" stroke="none" />
    </svg>
  ),
  "track-results": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M4 18V6M8 18v-5M12 18v-8M16 18v-3M20 18V9" strokeLinecap="round" />
      <path d="M3 20h18" strokeLinecap="round" />
    </svg>
  ),
};

function ConnectorArrow({ direction }: { direction: "down" | "right" }) {
  return (
    <div
      className={`flex items-center justify-center text-forest-glow/45 shrink-0 ${
        direction === "down" ? "py-0.5" : "pt-[18px] px-0.5"
      }`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={`w-4 h-4 ${direction === "right" ? "-rotate-90" : ""}`}
      >
        <path d="M12 5v14M7 14l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function GrowthJourneyFlow() {
  const reduce = useReducedMotion();
  const steps = HOW_IT_WORKS_JOURNEY;

  return (
    <div className="relative">
      {/* Desktop — horizontal scan path */}
      <div className="hidden lg:block">
        <div className="relative px-2">
          <div
            className="absolute left-[6%] right-[6%] top-[26px] h-px bg-silver/10"
            aria-hidden="true"
          />
          <motion.div
            className="absolute left-[6%] right-[6%] top-[26px] h-px origin-left pipeline-connector-glow"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={reduce ? undefined : { scaleX: 1 }}
            viewport={defaultViewport}
            transition={{ duration: 1.1, ease: easePremium }}
            aria-hidden="true"
          />

          <motion.div
            className="flex items-start justify-between gap-0"
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "visible"}
            viewport={defaultViewport}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
            }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex items-start flex-1 min-w-0"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: defaultTransition },
                }}
              >
                <JourneyNode step={step} index={index} />
                {index < steps.length - 1 && <ConnectorArrow direction="right" />}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile / tablet — vertical journey */}
      <div className="lg:hidden relative max-w-lg mx-auto">
        <div className="absolute left-[23px] top-6 bottom-6 w-px bg-silver/10" aria-hidden="true" />
        <motion.div
          className="absolute left-[23px] top-6 bottom-6 w-px origin-top pipeline-connector-glow pipeline-vertical-glow"
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={reduce ? undefined : { scaleY: 1 }}
          viewport={defaultViewport}
          transition={{ duration: 1, ease: easePremium }}
          aria-hidden="true"
        />

        <motion.ol
          className="space-y-0 list-none m-0 p-0"
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={defaultViewport}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
        >
          {steps.map((step, index) => (
            <motion.li
              key={step.id}
              variants={{
                hidden: { opacity: 0, x: -8 },
                visible: { opacity: 1, x: 0, transition: defaultTransition },
              }}
            >
              <div className="flex gap-4 items-start">
                <JourneyNode step={step} index={index} compact />
                <div className="flex-1 min-w-0 pt-1 pb-5">
                  <h3 className="text-base font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-silver-muted leading-relaxed">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="pl-[18px] pb-1" aria-hidden="true">
                  <ConnectorArrow direction="down" />
                </div>
              )}
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </div>
  );
}

function JourneyNode({
  step,
  index,
  compact = false,
}: {
  step: (typeof HOW_IT_WORKS_JOURNEY)[number];
  index: number;
  compact?: boolean;
}) {
  const icon = STEP_ICONS[step.id];

  if (compact) {
    return (
      <div className="relative z-10 shrink-0 w-12 h-12 rounded-xl bg-forest-mid/20 border border-forest-mid/40 flex items-center justify-center text-forest-glow">
        {icon}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center flex-1 min-w-0 px-0.5">
      <div className="relative z-10 w-[52px] h-[52px] rounded-xl bg-forest-mid/20 border border-forest-mid/40 flex items-center justify-center text-forest-glow mb-3 shrink-0">
        {icon}
        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-charcoal-elevated border border-forest-mid/35 text-[9px] font-bold text-forest-glow flex items-center justify-center tabular-nums">
          {index + 1}
        </span>
      </div>
      <h3 className="text-[13px] font-semibold text-foreground leading-tight mb-1">{step.title}</h3>
      <p className="text-[10px] sm:text-[11px] text-silver-muted leading-snug">{step.description}</p>
    </div>
  );
}
