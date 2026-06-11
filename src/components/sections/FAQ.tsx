"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ_ITEMS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 bg-black relative">
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-30" />
      <div className="relative max-w-3xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions contractors ask us"
          description="Everything you need to know before your strategy call."
        />

        <div className="space-y-3 mb-12">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="dashboard-card overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-[15px] font-medium text-foreground pr-4">
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-silver-dim shrink-0 transition-transform ${
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
                  <div className="px-6 pb-5">
                    <p className="text-silver-muted text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center dashboard-card p-8 glow-green">
          <p className="text-lg font-medium text-foreground mb-2">
            Still have questions?
          </p>
          <p className="text-silver-muted text-sm mb-6">
            Book a free strategy call and we&apos;ll map out a plan for your market.
          </p>
          <Button
            size="lg"
            onClick={() =>
              document.getElementById("book-call")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Book A Strategy Call
          </Button>
        </div>
      </div>
    </section>
  );
}
