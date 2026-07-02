"use client";

import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { BookCallButton } from "@/components/marketing/BookCallButton";
import { FEATURES, CTAS, WHAT_YOU_GET_SECTION } from "@/lib/constants";

const icons: Record<string, ReactNode> = {
  target: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
  map: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 6L9 3L15 6L21 3V18L15 21L9 18L3 21V6Z" />
      <path d="M9 3V18M15 6V21" />
    </svg>
  ),
  bolt: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
    </svg>
  ),
  chart: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 20H21M7 16V10M12 16V6M17 16V13" />
    </svg>
  ),
  shield: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L4 6V12C4 17 8 21 12 22C16 21 20 17 20 12V6L12 2Z" />
    </svg>
  ),
  users: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="8" r="4" />
      <path d="M3 20C3 16.5 5.5 14 9 14C12.5 14 15 16.5 15 20" />
      <circle cx="17" cy="9" r="3" />
      <path d="M21 20C21 17 19 15 17 15" />
    </svg>
  ),
};

export function Features() {
  return (
    <section id="what-you-get" className="section-deep home-section-pad relative overflow-hidden">
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-[0.14]" />
      <div className="relative page-container">
        <ScrollReveal className="mb-12 lg:mb-16">
          <SectionIntro
            align="center"
            variant="display"
            eyebrow={WHAT_YOU_GET_SECTION.eyebrow}
            title={WHAT_YOU_GET_SECTION.title}
            highlight={WHAT_YOU_GET_SECTION.highlight}
            description={WHAT_YOU_GET_SECTION.description}
            className="max-w-3xl mx-auto"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {FEATURES.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 80}>
              <article className="value-card brand-card-lift rounded-xl p-6 sm:p-8 h-full group">
                <div className="brand-icon-chip w-12 h-12 mb-6 group-hover:border-lupin-purple/30 transition-colors duration-300">
                  {icons[feature.icon]}
                </div>
                <h3 className="type-card-title mb-3">{feature.title}</h3>
                <p className="type-card-body">{feature.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400} className="mt-14 lg:mt-16 text-center">
          <BookCallButton size="lg" emphasis>
            {CTAS.primary}
          </BookCallButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
