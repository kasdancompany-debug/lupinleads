"use client";

import { useState } from "react";
import { BookCallButton } from "@/components/marketing/BookCallButton";
import { StrategyCallForm } from "@/components/forms/StrategyCallForm";
import { CalendlyBooking } from "@/components/sections/CalendlyBooking";
import { SlideIn } from "@/components/motion/SlideIn";
import { StepFlow } from "@/components/motion/StepFlow";
import { RiseOnScroll } from "@/components/motion/RiseOnScroll";
import { getCalendlyUrl, isCalendlyConfigured } from "@/lib/calendly";
import { openCalendlyInNewTab } from "@/lib/calendly-widget";
import { GrowthPattern } from "@/components/ui/GrowthPattern";
import { FINAL_CTA_SECTION } from "@/lib/constants";
import { SectionIntro } from "@/components/ui/SectionIntro";

const STEPS = [
  {
    title: "Review your market",
    body: "We look at your trade, service area, competition, and how booked you want to be — what's working and what isn't.",
    tag: "15 min",
  },
  {
    title: "Map your quote flow",
    body: "We walk through Facebook and Instagram ads, quote forms, follow-up, and reporting — plus a realistic ad budget on your Meta account.",
    tag: "No pitch deck",
  },
  {
    title: "Claim a spot if it's a fit",
    body: "If we're aligned, we wire ads, forms, and your pipeline — typically live within 48 hours. Only 5 founding partner spots.",
    tag: "Go live",
  },
];

export function BookACall() {
  const calendlyUrl = getCalendlyUrl();
  const hasCalendly = isCalendlyConfigured();
  const [bookingPrefill, setBookingPrefill] = useState<{ name: string; email: string } | null>(
    null
  );
  const [showForm, setShowForm] = useState(!hasCalendly);

  function handleFormSuccess(prefill: { name: string; email: string }) {
    setBookingPrefill(prefill);
    setShowForm(true);
    if (hasCalendly) {
      openCalendlyInNewTab(prefill);
    }
  }

  return (
    <section id="book-call" className="section-emerald home-section-pad relative overflow-hidden">
      <GrowthPattern tone="dark" intensity="whisper" placement="right" />
      <div className="absolute inset-0 section-glow-corner pointer-events-none opacity-40" />
      <div className="absolute inset-0 mesh-gradient pointer-events-none opacity-22" />
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-[0.12]" />

      <div className="relative page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-start">
          <SlideIn direction="left">
            <SectionIntro
              eyebrow={FINAL_CTA_SECTION.eyebrow}
              title={FINAL_CTA_SECTION.title}
              highlight={FINAL_CTA_SECTION.highlight}
              description={FINAL_CTA_SECTION.description}
              className="!mb-8"
            />

            <StepFlow steps={STEPS} slideFrom="left" />

            {hasCalendly && (
              <div className="mt-8 lg:hidden">
                <BookCallButton size="lg" emphasis className="w-full min-h-[52px]" />
              </div>
            )}
          </SlideIn>

          <SlideIn direction="right" delay={0.15}>
            <RiseOnScroll offset={20}>
              <div className="relative value-card stone-card rounded-2xl p-5 sm:p-8 border-forest-green-bright/15 overflow-hidden">
                <GrowthPattern tone="light" intensity="whisper" placement="corners" />
                <div className="relative z-10">
                {hasCalendly && (
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                      <p className="text-[11px] uppercase tracking-[0.15em] text-forest-glow font-medium">
                        Pick your time
                      </p>
                      <BookCallButton
                        size="md"
                        emphasis
                        className="hidden lg:inline-flex shrink-0"
                      />
                    </div>
                    <CalendlyBooking
                      calendlyUrl={calendlyUrl}
                      prefill={bookingPrefill ?? undefined}
                      compact
                    />
                  </div>
                )}

                {hasCalendly && !showForm && (
                  <div className="text-center pt-4 border-t border-silver/10">
                    <button
                      type="button"
                      onClick={() => setShowForm(true)}
                      className="text-sm text-silver-muted hover:text-foreground transition-colors"
                    >
                      Prefer we reach out? Fill out the form instead →
                    </button>
                  </div>
                )}

                {(showForm || !hasCalendly) && (
                  <div className={hasCalendly ? "pt-6 border-t border-silver/10" : ""}>
                    {hasCalendly && (
                      <p className="text-[11px] uppercase tracking-[0.15em] text-silver-dim mb-4 text-center sm:text-left">
                        Or tell us about your business
                      </p>
                    )}

                    {!hasCalendly && (
                      <p className="text-[11px] uppercase tracking-[0.15em] text-forest-glow font-medium mb-4 text-center sm:text-left">
                        Free lead strategy call
                      </p>
                    )}

                    <StrategyCallForm
                      showCalendlyShortcut={hasCalendly}
                      onSuccess={handleFormSuccess}
                    />
                  </div>
                )}
                </div>
              </div>
            </RiseOnScroll>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
