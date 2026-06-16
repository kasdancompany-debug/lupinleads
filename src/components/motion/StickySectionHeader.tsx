"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { FadeIn } from "./FadeIn";
import { scrollToBook } from "@/lib/marketing";
import { CTAS } from "@/lib/constants";

interface StickySectionHeaderProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  showCta?: boolean;
}

export function StickySectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  showCta = true,
}: StickySectionHeaderProps) {
  const reduce = useReducedMotion();

  const content = (
    <>
      <FadeIn>
        <SectionIntro
          eyebrow={eyebrow}
          title={title}
          highlight={highlight}
          description={description}
          className="!mb-0"
        />
      </FadeIn>
      {showCta && (
        <FadeIn delay={0.2}>
          <div className="section-cta-row mt-8">
            <Button size="lg" emphasis onClick={scrollToBook}>
              {CTAS.primary}
            </Button>
          </div>
        </FadeIn>
      )}
    </>
  );

  if (reduce) {
    return <div className="mb-10 lg:mb-0">{content}</div>;
  }

  return (
    <div className="lg:sticky lg:top-28 lg:self-start lg:max-w-md">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
      >
        {content}
      </motion.div>
    </div>
  );
}
