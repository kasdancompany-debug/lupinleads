"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { SectionIntro } from "@/components/ui/SectionIntro";
import {
  PipelineDetailCard,
  PipelineFlowDiagram,
  type PipelineStep,
} from "@/components/motion/PipelineFlowDiagram";
import { CTAS } from "@/lib/constants";
import { scrollToBook } from "@/lib/marketing";
import { easePremium } from "@/lib/motion-config";

const STEPS: PipelineStep[] = [
  {
    id: "meta-ad",
    title: "Meta Ad",
    description: "A homeowner clicks your ad on Facebook or Instagram.",
    detail:
      "We manage campaigns and custom creative on your Meta ad account — targeted to homeowners in your service area. You own the account and pay Meta directly for spend.",
    icon: <MetaAdIcon />,
  },
  {
    id: "lead-form",
    title: "Lead Form",
    description: "Your branded form captures the project details.",
    detail:
      "Name, phone, project type, timeline, and address — collected on a form under your brand. Exclusive to you. Never sold to other contractors.",
    icon: <LeadFormIcon />,
  },
  {
    id: "lupin-crm",
    title: "Lupin CRM",
    description: "The lead enters your pipeline immediately.",
    detail:
      "Every submission creates a CRM card with full context. Your team sees stage, notes, and job value in one board — from first touch forward.",
    icon: <CrmIcon />,
  },
  {
    id: "ai-follow-up",
    title: "AI Follow-Up",
    description: "Scored and queued with a clear next step.",
    detail:
      "AI rates each lead hot, warm, or cold, then drafts SMS or email follow-up. Your crew knows who to call first and what to say.",
    icon: <AiIcon />,
  },
  {
    id: "appointment",
    title: "Appointment Booked",
    description: "An estimate lands on your calendar.",
    detail:
      "Track contact attempts and booked appointments in CRM. The goal is a firm time on your calendar — not a lead lost in voicemail.",
    icon: <CalendarIcon />,
  },
  {
    id: "estimate",
    title: "Estimate Sent",
    description: "The quote goes out while interest is still warm.",
    detail:
      "Pipeline stages show who received an estimate, who needs a follow-up, and who is ready to decide. Nothing falls through the cracks.",
    icon: <EstimateIcon />,
  },
  {
    id: "won-job",
    title: "Won Job",
    description: "Signed work — tracked back to the original click.",
    detail:
      "Move the lead to Won and log job value. Monthly reporting connects ad spend to closed revenue so you see the full picture, not just lead volume.",
    icon: <WonJobIcon />,
  },
];

const SCROLL_HEIGHT_PER_STEP = 55;

export function ClickToClosedJob() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const useScrollPin = isDesktop && !reduce;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!useScrollPin) return;
    const idx = Math.min(
      STEPS.length - 1,
      Math.max(0, Math.floor(latest * STEPS.length))
    );
    setActiveStep(idx);
  });

  const displayStep = reduce ? STEPS.length - 1 : activeStep;

  return (
    <section id="click-to-closed" className="relative section-gradient">
      <div className="absolute inset-0 section-glow-top pointer-events-none opacity-70" />
      <div className="absolute top-0 left-0 right-0 section-divider pointer-events-none z-10" />

      <div className="relative py-16 md:py-24 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient pointer-events-none opacity-30" />
        <div className="absolute inset-0 grain-overlay pointer-events-none opacity-25" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <SectionIntro
              align="center"
              eyebrow="The full journey"
              title="Ad click to"
              highlight="booked job."
              description="Seven connected steps — Meta Ads, capture, CRM, follow-up, estimate, and close. One system tracks every handoff."
              className="max-w-3xl mx-auto"
            />
          </FadeIn>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative"
        style={{
          height: useScrollPin ? `${STEPS.length * SCROLL_HEIGHT_PER_STEP}vh` : "auto",
        }}
      >
        <div
          className={`${
            useScrollPin ? "sticky top-0 h-screen" : "relative py-12 lg:py-16"
          } flex flex-col justify-center overflow-hidden section-forest`}
        >
          <div className="absolute inset-0 section-glow-top pointer-events-none opacity-60" />
          <div className="absolute inset-0 grain-overlay pointer-events-none opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,900px)] h-[400px] bg-forest-mid/8 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full py-8 lg:py-12">
            {useScrollPin && (
              <div className="flex items-center justify-between mb-8 lg:mb-10">
                <p className="text-[11px] uppercase tracking-[0.2em] text-silver-dim">
                  Scroll to explore
                </p>
                <div className="flex items-center gap-2">
                  {STEPS.map((step, i) => (
                    <motion.div
                      key={step.id}
                      className="h-1 rounded-full"
                      animate={{
                        width: i === activeStep ? 24 : 8,
                        backgroundColor:
                          i <= activeStep
                            ? "var(--forest-glow)"
                            : "color-mix(in srgb, var(--silver) 20%, transparent)",
                      }}
                      transition={{ duration: 0.35, ease: easePremium }}
                    />
                  ))}
                </div>
              </div>
            )}

            <PipelineFlowDiagram
              steps={STEPS}
              activeStep={displayStep}
              reduceMotion={!!reduce}
              onStepInView={!useScrollPin ? setActiveStep : undefined}
            />

            <div className="hidden lg:block mt-10 xl:mt-12">
              <AnimatePresence mode="wait">
                <PipelineDetailCard
                  key={STEPS[displayStep].id}
                  step={STEPS[displayStep]}
                  stepIndex={displayStep}
                  totalSteps={STEPS.length}
                  reduceMotion={!!reduce}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="relative section-forest border-t border-silver/10 py-12 lg:py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-silver-muted max-w-xl leading-relaxed text-center sm:text-left">
            See how ad click to booked job maps to your trade and market on a free strategy call.
          </p>
          <Button size="lg" emphasis onClick={scrollToBook} className="shrink-0 w-full sm:w-auto">
            {CTAS.primary}
          </Button>
        </div>
      </div>
    </section>
  );
}

function MetaAdIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 15l3-4 2 2.5 2-3 3 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LeadFormIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12h6M9 16h4" strokeLinecap="round" />
    </svg>
  );
}

function CrmIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="5" height="16" rx="1" />
      <rect x="10" y="4" width="5" height="16" rx="1" />
      <rect x="17" y="4" width="4" height="16" rx="1" />
      <path d="M5 8h1M12 11h1M19 14h1" strokeLinecap="round" />
    </svg>
  );
}

function AiIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" strokeLinejoin="round" />
      <path d="M5 19l1 2M19 19l-1 2M12 21v-1" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" strokeLinecap="round" />
      <path d="M9 15l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EstimateIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 3H8a2 2 0 00-2 2v14l6-3 6 3V5a2 2 0 00-2-2z" strokeLinejoin="round" />
      <path d="M10 8h4M10 11h2" strokeLinecap="round" />
      <path d="M18 8l2 2-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WonJobIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 21h8M12 17v4" strokeLinecap="round" />
      <path d="M7 4h10l1 5H6l1-5z" strokeLinejoin="round" />
      <path d="M6 9c0 3.5 2.7 6 6 6s6-2.5 6-6" strokeLinecap="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
