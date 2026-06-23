"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BookCallButton } from "@/components/marketing/BookCallButton";
import { FAQ_ITEMS, CTAS } from "@/lib/constants";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-surface home-section-pad relative overflow-hidden">
      <div className="absolute inset-0 section-glow-top pointer-events-none opacity-30" />
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-[0.12]" />
      <div className="relative page-container max-w-3xl">
        <ScrollReveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Straight answers before you book"
            description="Founding partner pricing, ad spend, and what you actually get — no surprises on the call."
            bold
          />
        </ScrollReveal>

        <div className="space-y-3 mb-12">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={item.question} delay={index * 50}>
                <div className="value-card rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left hover:bg-forest-green-deep/10 transition-colors duration-200"
                  >
                    <span className="type-card-title pr-4">{item.question}</span>
                    <svg
                      className={`w-5 h-5 text-forest-glow shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M5 8L10 13L15 8" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 border-t border-silver/8">
                      <p className="type-card-body pt-4">{item.answer}</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={200}>
          <div className="text-center value-card rounded-2xl p-8 sm:p-10 border-forest-green-bright/18">
            <p className="type-card-title text-[1.125rem] mb-2">Still have questions?</p>
            <p className="type-card-body mb-6 max-w-sm mx-auto">
              Book a free strategy call. We&apos;ll walk through the full system for your trade and
              market.
            </p>
            <BookCallButton size="lg" emphasis>
              {CTAS.primary}
            </BookCallButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
