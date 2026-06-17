"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionShell } from "@/components/motion/SectionShell";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TRADES_SECTION } from "@/lib/constants";
import { defaultTransition, defaultViewport, staggerContainer } from "@/lib/motion-config";

export function TradesSection() {
  const reduce = useReducedMotion();
  const { title, highlight, description, trades } = TRADES_SECTION;

  return (
    <SectionShell id="trades" variant="surface">
      <div className="section-body max-w-5xl mx-auto">
        <FadeIn>
          <SectionIntro
            align="center"
            eyebrow="Who it's for"
            title={title}
            highlight={highlight}
            description={description}
            className="max-w-3xl mx-auto"
          />
        </FadeIn>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {trades.map((trade, index) => (
            <motion.div
              key={trade}
              className="trades-pill rounded-xl px-4 py-4 sm:py-5 text-center"
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ ...defaultTransition, delay: index * 0.04 }}
            >
              <span className="text-sm sm:text-[15px] font-medium text-foreground tracking-tight">
                {trade}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
}
