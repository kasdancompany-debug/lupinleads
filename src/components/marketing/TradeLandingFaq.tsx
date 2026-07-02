"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { TradeFaqItem } from "@/lib/trade-landing-pages";

export function TradeLandingFaq({ items }: { items: TradeFaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `trade-faq-panel-${index}`;
        const buttonId = `trade-faq-button-${index}`;

        return (
          <ScrollReveal key={item.question} delay={index * 40}>
            <div className="value-card rounded-xl overflow-hidden">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
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
                  aria-hidden
                >
                  <path d="M5 8L10 13L15 8" />
                </svg>
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="px-6 pb-5 border-t border-silver/8"
              >
                <p className="type-card-body pt-4">{item.answer}</p>
              </div>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
