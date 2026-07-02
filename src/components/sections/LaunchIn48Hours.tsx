"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionShell } from "@/components/motion/SectionShell";
import { FadeIn } from "@/components/motion/FadeIn";
import { OnboardingTimeline } from "@/components/motion/OnboardingTimeline";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { BookCallButton } from "@/components/marketing/BookCallButton";
import { ONBOARDING_STEPS, CTAS } from "@/lib/constants";
import { easePremium } from "@/lib/motion-config";

export function LaunchIn48Hours() {
  const reduce = useReducedMotion();

  return (
    <SectionShell id="launch-48-hours" variant="forest" className="!overflow-visible">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden w-full max-w-6xl z-0">
        {!reduce && (
          <motion.span
            className="block text-center font-display text-[clamp(6rem,18vw,14rem)] font-bold leading-none text-forest-mid/[0.07] tracking-tighter"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: easePremium }}
            aria-hidden
          >
            48
          </motion.span>
        )}
      </div>

      <div className="relative max-w-6xl mx-auto section-body z-10">
        <FadeIn>
          <SectionIntro
            align="center"
            eyebrow="Onboarding"
            title="Launch in"
            highlight="48 hours."
            description="Connect your Meta account, launch ads and landing pages, and wire your pipeline — typically live within 48 hours so quote requests can move to booked estimates."
            className="max-w-3xl mx-auto"
          />
        </FadeIn>

        <OnboardingTimeline steps={ONBOARDING_STEPS} />

        <FadeIn delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 pt-4 border-t border-silver/10">
            <div className="flex items-center gap-6 text-center sm:text-left">
              {[
                { label: "Ads + landing page", sub: "Built for your trade" },
                { label: "CRM wired", sub: "Leads to estimates" },
                { label: "Live in 48 hrs", sub: "Typical timeline" },
              ].map((item) => (
                <div key={item.label} className="hidden md:block">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-[11px] text-silver-dim">{item.sub}</p>
                </div>
              ))}
            </div>
            <BookCallButton size="lg" emphasis>
              {CTAS.primary}
            </BookCallButton>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  );
}
