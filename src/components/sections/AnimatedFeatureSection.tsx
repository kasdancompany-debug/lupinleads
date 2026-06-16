"use client";

import { SectionShell, type SectionVariant } from "@/components/motion/SectionShell";
import { StickySectionHeader } from "@/components/motion/StickySectionHeader";
import { StepFlow, type FlowStep } from "@/components/motion/StepFlow";
import { SlideIn } from "@/components/motion/SlideIn";
import { RiseOnScroll } from "@/components/motion/RiseOnScroll";
import { FloatingMockup } from "@/components/motion/FloatingMockup";

interface AnimatedFeatureSectionProps {
  id: string;
  variant?: SectionVariant;
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  steps: FlowStep[];
  mockup: React.ReactNode;
  reversed?: boolean;
}

export function AnimatedFeatureSection({
  id,
  variant = "elevated",
  eyebrow,
  title,
  highlight,
  description,
  steps,
  mockup,
  reversed = false,
}: AnimatedFeatureSectionProps) {
  const stepSlide = reversed ? "right" : "left";
  const mockupSlide = reversed ? "left" : "right";

  return (
    <SectionShell id={id} variant={variant}>
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start ${
          reversed ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <StickySectionHeader
          eyebrow={eyebrow}
          title={title}
          highlight={highlight}
          description={description}
        />

        <div className="space-y-10">
          <StepFlow steps={steps} slideFrom={stepSlide} />

          <SlideIn direction={mockupSlide} delay={0.2}>
            <RiseOnScroll offset={24}>
              <FloatingMockup>{mockup}</FloatingMockup>
            </RiseOnScroll>
          </SlideIn>
        </div>
      </div>
    </SectionShell>
  );
}
