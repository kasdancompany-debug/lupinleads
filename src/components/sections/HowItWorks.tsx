"use client";

import { SectionShell } from "@/components/motion/SectionShell";
import { GrowthJourneyFlow } from "@/components/motion/GrowthJourneyFlow";
import { StickySectionHeader } from "@/components/motion/StickySectionHeader";
import { SlideIn } from "@/components/motion/SlideIn";
import { RiseOnScroll } from "@/components/motion/RiseOnScroll";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { FloatingProductCard } from "@/components/marketing/mockups/FloatingProductCard";
import { CrmPipelineMockup } from "@/components/marketing/mockups/CrmPipelineMockup";
import { HOW_IT_WORKS_SECTION } from "@/lib/constants";

export function HowItWorks() {
  return (
    <SectionShell id="how-it-works" variant="emerald">
      <div className="section-body">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <StickySectionHeader
            eyebrow={HOW_IT_WORKS_SECTION.eyebrow}
            title={HOW_IT_WORKS_SECTION.title}
            highlight={HOW_IT_WORKS_SECTION.highlight}
            description={HOW_IT_WORKS_SECTION.description}
          />
          <SlideIn direction="right" delay={0.1}>
            <RiseOnScroll offset={20}>
              <FloatingProductCard>
                <CrmPipelineMockup />
              </FloatingProductCard>
            </RiseOnScroll>
          </SlideIn>
        </div>

        <div className="brand-panel p-6 sm:p-8 lg:p-10 relative overflow-hidden">
          <SectionIntro
            align="center"
            eyebrow={HOW_IT_WORKS_SECTION.journeyEyebrow}
            title={HOW_IT_WORKS_SECTION.journeyTitle}
            description={HOW_IT_WORKS_SECTION.journeyDescription}
            className="!mb-8 lg:!mb-10 max-w-2xl mx-auto"
          />
          <GrowthJourneyFlow />
        </div>
      </div>
    </SectionShell>
  );
}
