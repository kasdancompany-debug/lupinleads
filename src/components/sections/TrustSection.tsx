"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionShell } from "@/components/motion/SectionShell";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TRUST_GUARANTEES } from "@/lib/constants";
import { defaultTransition, defaultViewport, staggerContainer } from "@/lib/motion-config";

const BADGE_ICONS: Record<(typeof TRUST_GUARANTEES)[number]["id"], ReactNode> = {
  "canadian-owned": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M12 3l1.2 3.6L17 7.2l-3 2.6.9 3.6L12 11.8 9.1 13.4 10 9.8 7 7.2l3.8-.6L12 3z" strokeLinejoin="round" />
      <path d="M5 20h14" strokeLinecap="round" />
    </svg>
  ),
  "home-service": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M4 11.5L12 5l8 6.5V19a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-7.5z" strokeLinejoin="round" />
    </svg>
  ),
  strategist: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" strokeLinecap="round" />
    </svg>
  ),
  "your-leads": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M12 3l8 4v6c0 4.5-3.5 8-8 9-4.5-1-8-4.5-8-9V7l8-4z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  launch: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "no-lock-in": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M7 11V8a5 5 0 019.9-1" strokeLinecap="round" />
      <rect x="5" y="11" width="14" height="10" rx="1.5" />
      <path d="M9 16h6" strokeLinecap="round" />
    </svg>
  ),
};

export function TrustSection() {
  const reduce = useReducedMotion();

  return (
    <SectionShell id="trust" variant="charcoal">
      <div className="section-body">
        <FadeIn>
          <SectionIntro
            align="center"
            eyebrow="Before you decide"
            title="Clear terms."
            highlight="No surprises."
            description="What you own, what you pay, and how we launch — spelled out before the strategy call."
            className="max-w-2xl mx-auto"
          />
        </FadeIn>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {TRUST_GUARANTEES.map((badge, index) => (
            <motion.div
              key={badge.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ ...defaultTransition, delay: index * 0.05 }}
            >
              <article className="trust-badge rounded-xl p-5 lg:p-6 h-full">
                <div className="trust-badge-icon w-10 h-10 rounded-lg flex items-center justify-center text-forest-glow mb-4">
                  {BADGE_ICONS[badge.id]}
                </div>
                <h3 className="text-sm font-semibold text-foreground tracking-tight mb-2">
                  {badge.title}
                </h3>
                <p className="text-[13px] text-silver-muted leading-relaxed">{badge.description}</p>
              </article>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
}
