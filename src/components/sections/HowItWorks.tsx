"use client";

import { SectionShell } from "@/components/motion/SectionShell";
import { GrowthJourneyFlow } from "@/components/motion/GrowthJourneyFlow";
import { StickySectionHeader } from "@/components/motion/StickySectionHeader";
import { SlideIn } from "@/components/motion/SlideIn";
import { RiseOnScroll } from "@/components/motion/RiseOnScroll";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { FloatingProductCard } from "@/components/marketing/mockups/FloatingProductCard";
import { CrmPipelineMockup } from "@/components/marketing/mockups/CrmPipelineMockup";

export function HowItWorks() {
  return (
    <SectionShell id="how-it-works" variant="emerald">
      <div className="section-body">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <StickySectionHeader
            eyebrow="The growth system"
            title="More than ads."
            highlight="A complete engine."
            description="Meta Ads and custom creative bring homeowners in. Branded forms capture them. CRM and AI follow-up move them forward. Monthly reporting shows what closed — one system, not five disconnected tools."
          />
          <SlideIn direction="right" delay={0.1}>
            <RiseOnScroll offset={20}>
              <FloatingProductCard>
                <CrmPipelineMockup />
              </FloatingProductCard>
            </RiseOnScroll>
          </SlideIn>
        </div>

        <div className="rounded-2xl border border-forest-mid/25 bg-charcoal/30 p-6 sm:p-8 lg:p-10">
          <SectionIntro
            align="center"
            eyebrow="The journey"
            title="Click to closed job"
            description="Six connected steps — from the ad click to the signed contract."
            className="!mb-8 lg:!mb-10 max-w-2xl mx-auto"
          />
          <GrowthJourneyFlow />
        </div>
      </div>
    </SectionShell>
  );
}
