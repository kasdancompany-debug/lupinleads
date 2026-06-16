"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FAQ_ITEMS, CTAS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { scrollToBook } from "@/lib/marketing";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-surface py-16 md:py-24 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 section-glow-top pointer-events-none opacity-40" />
      <div className="absolute top-0 left-0 right-0 section-divider pointer-events-none" />
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-25" />
      <div className="relative max-w-3xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Straight answers for contractors"
            description="How the growth system works, what you own, and what you pay — before your strategy call."
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
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-[15px] font-semibold text-foreground pr-4">
                      {item.question}
                    </span>
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
                      <p className="text-silver-muted text-sm leading-relaxed pt-4">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={200}>
          <div className="text-center value-card rounded-2xl p-10 glow-green border-forest-mid/25">
            <p className="text-xl font-bold text-foreground mb-2">Still have questions?</p>
            <p className="text-silver-muted text-sm mb-6 max-w-sm mx-auto">
              Book a free strategy call. We&apos;ll walk through the full system for your trade and
              market.
            </p>
            <Button size="lg" emphasis onClick={scrollToBook}>
              {CTAS.primary}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
