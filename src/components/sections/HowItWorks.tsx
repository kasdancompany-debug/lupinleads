"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { SectionShell } from "@/components/motion/SectionShell";
import { OnboardingTimeline } from "@/components/motion/OnboardingTimeline";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { BookCallButton } from "@/components/marketing/BookCallButton";
import { CTAS, HOW_IT_WORKS_SECTION, HOW_IT_WORKS_STEPS } from "@/lib/constants";

export function HowItWorks() {
  return (
    <SectionShell id="how-it-works" variant="emerald">
      <div className="section-body max-w-6xl mx-auto">
        <FadeIn>
          <SectionIntro
            align="center"
            variant="display"
            eyebrow={HOW_IT_WORKS_SECTION.eyebrow}
            title={HOW_IT_WORKS_SECTION.title}
            highlight={HOW_IT_WORKS_SECTION.highlight}
            description={HOW_IT_WORKS_SECTION.description}
            className="max-w-3xl mx-auto"
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="how-it-works-timeline mt-10 lg:mt-14">
            <OnboardingTimeline steps={HOW_IT_WORKS_STEPS} />
          </div>
        </FadeIn>

        <FadeIn delay={0.18}>
          <div className="flex justify-center mt-10 lg:mt-12 pt-8 border-t border-silver/10">
            <BookCallButton size="lg" emphasis>
              {CTAS.primary}
            </BookCallButton>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  );
}
