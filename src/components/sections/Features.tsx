"use client";

import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { FEATURES, CTAS } from "@/lib/constants";
import { scrollToBook } from "@/lib/marketing";

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
    <section id="features" className="section-deep py-32 lg:py-40 relative overflow-hidden">
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-40" />
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-[11px] uppercase tracking-[0.25em] text-forest-glow mb-4 font-medium">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
            Everything you need to{" "}
            <span className="text-gradient-forest">fill your calendar</span>
          </h2>
          <p className="text-silver-muted text-lg leading-relaxed">
            Meta brings the traffic. We capture, qualify, and deliver estimate-ready leads — then
            track every job through your pipeline.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {FEATURES.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 80}>
              <article className="value-card rounded-xl p-8 h-full group">
                <div className="w-12 h-12 rounded-xl bg-forest-mid/20 border border-forest-mid/35 flex items-center justify-center text-forest-glow mb-6 group-hover:scale-105 transition-transform duration-300">
                  {icons[feature.icon]}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-silver-muted leading-relaxed text-sm">{feature.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400} className="mt-16 text-center">
          <p className="text-silver-muted text-sm mb-5">
            Not sure which pieces you need? We&apos;ll map it on a free strategy call.
          </p>
          <Button size="lg" emphasis onClick={scrollToBook}>
            {CTAS.primary}
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
