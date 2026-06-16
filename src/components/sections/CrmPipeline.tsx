"use client";

import { AnimatedFeatureSection } from "@/components/sections/AnimatedFeatureSection";
import { CrmPipelineMockup } from "@/components/marketing/CrmPipelineMockup";

const STEPS = [
  {
    title: "Every lead gets a home",
    body: "Form submissions land as CRM cards with project details, source, and stage — no spreadsheets, no lost texts.",
    tag: "Auto-logged",
  },
  {
    title: "Stages your team understands",
    body: "New lead, contacted, appointment booked, estimate sent, won. Drag to update — everyone sees the same board.",
    tag: "Pipeline",
  },
  {
    title: "Job value on every card",
    body: "Log estimated and closed job size so reporting reflects real revenue, not just lead count.",
    tag: "Revenue",
  },
  {
    title: "Click to closed, one record",
    body: "The same lead that clicked your ad is the same card that becomes a won job. Full history, no handoff gaps.",
    tag: "Tracked",
  },
];

export function CrmPipeline() {
  return (
    <AnimatedFeatureSection
      id="crm-pipeline"
      variant="contrast"
      eyebrow="CRM tracking"
      title="One pipeline."
      highlight="Every lead accounted for."
      description="Contractors don't need enterprise software. They need to know who to call, what's booked, and what's worth. Lupin CRM tracks every lead from first touch to signed job."
      steps={STEPS}
      mockup={<CrmPipelineMockup />}
      reversed
    />
  );
}
