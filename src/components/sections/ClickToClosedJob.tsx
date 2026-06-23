"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { GrowthPattern } from "@/components/ui/GrowthPattern";
import {
  JourneyStemDiagram,
  JourneyDetailCard,
  JourneyProgressBloom,
  type JourneyStep,
} from "@/components/ui/JourneyStemDiagram";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { CTAS } from "@/lib/constants";
import { scrollToBook } from "@/lib/marketing";
import { easePremium } from "@/lib/motion-config";

const STEPS: JourneyStep[] = [
  {
    id: "meta-ads",
    title: "Meta Ads",
    description: "A homeowner clicks your ad on Facebook or Instagram.",
    detail:
      "We manage campaigns and creative on your Meta ad account — targeted to homeowners in your service area. You own the account and pay Meta directly for spend.",
  },
  {
    id: "lead-captured",
    title: "Lead Captured",
    description: "Your branded form captures the inquiry and lands in your pipeline.",
    detail:
      "Name, phone, project type, timeline, and address — collected on a form under your brand. Every submission creates a CRM card immediately. Exclusive to you.",
  },
  {
    id: "ai-follow-up",
    title: "AI Follow-Up",
    description: "Scored and queued with a clear next step.",
    detail:
      "AI rates each lead hot, warm, or cold, then drafts SMS or email follow-up. Your crew knows who to call first and what to say.",
  },
  {
    id: "appointment-booked",
    title: "Appointment Booked",
    description: "An estimate lands on your calendar.",
    detail:
      "Track contact attempts and booked appointments in CRM. The goal is a firm time on your calendar — not a lead lost in voicemail.",
  },
  {
    id: "estimate-sent",
    title: "Estimate Sent",
    description: "The quote goes out while interest is still warm.",
    detail:
      "Pipeline stages show who received an estimate, who needs a follow-up, and who is ready to decide. Nothing falls through the cracks.",
  },
  {
    id: "job-won",
    title: "Job Won",
    description: "Signed work — tracked back to the original click.",
    detail:
      "Move the lead to Won and log job value. Monthly reporting connects ad spend to closed revenue so you see the full picture, not just lead volume.",
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
      <GrowthPattern tone="dark" intensity="subtle" placement="balanced" />
      <div className="absolute inset-0 section-glow-top pointer-events-none opacity-45" />
      <div className="relative home-section-pad overflow-hidden">
        <div className="absolute inset-0 mesh-gradient pointer-events-none opacity-20" />
        <div className="absolute inset-0 grain-overlay pointer-events-none opacity-[0.12]" />
        <div className="relative page-container">
          <FadeIn>
            <SectionIntro
              align="center"
              eyebrow="The full journey"
              title="Ad click to"
              highlight="booked job."
              description="Six stages on one growth path — from Meta ad click to signed work. Every handoff tracked on the same stem."
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
          <GrowthPattern tone="dark" intensity="whisper" placement="left" />
          <div className="absolute inset-0 section-glow-top pointer-events-none opacity-35" />
          <div className="absolute inset-0 grain-overlay pointer-events-none opacity-[0.1]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,800px)] h-[320px] bg-forest-mid/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative page-container w-full py-8 lg:py-12">
            {useScrollPin && (
              <div className="flex items-center justify-between mb-8 lg:mb-10">
                <p className="text-[11px] uppercase tracking-[0.2em] text-silver-dim">
                  Scroll to follow the stem
                </p>
                <div className="flex items-center gap-2">
                  {STEPS.map((step, i) => (
                    <motion.div
                      key={step.id}
                      animate={{
                        scale: i === activeStep ? 1.15 : 1,
                      }}
                      transition={{ duration: 0.35, ease: easePremium }}
                    >
                      <JourneyProgressBloom
                        isActive={i === activeStep}
                        isComplete={i < activeStep}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <JourneyStemDiagram
              steps={STEPS}
              activeStep={displayStep}
              reduceMotion={!!reduce}
              onStepInView={!useScrollPin ? setActiveStep : undefined}
            />

            <div className="hidden lg:block mt-10 xl:mt-12">
              <AnimatePresence mode="wait">
                <JourneyDetailCard
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

      <div className="relative section-forest border-t border-forest-green-bright/10 py-10 lg:py-12">
        <div className="page-container flex flex-col sm:flex-row items-center justify-between gap-6">
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
