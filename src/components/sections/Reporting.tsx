"use client";

import { AnimatedFeatureSection } from "@/components/sections/AnimatedFeatureSection";
import { ReportingMockup } from "@/components/marketing/ReportingMockup";

const STEPS = [
  {
    title: "Pulled from your CRM",
    body: "Leads, appointments, pipeline value, and won jobs — reported from the same system that tracked them, not a disconnected spreadsheet.",
    tag: "Real data",
  },
  {
    title: "Monthly executive reports",
    body: "Branded PDF summaries you can review with your team, partner, or accountant. Clear numbers, no vanity metrics.",
    tag: "PDF",
  },
  {
    title: "Spend tied to outcomes",
    body: "See what you paid Meta and what came back in leads and closed revenue. Your ad account, your spend — reported clearly.",
    tag: "ROAS",
  },
  {
    title: "Optimize with clarity",
    body: "Know which months and campaigns produced estimates and jobs. Double down on what works, cut what doesn't.",
    tag: "Decisions",
  },
];

export function Reporting() {
  return (
    <AnimatedFeatureSection
      id="reporting"
      variant="deep"
      eyebrow="Monthly reporting"
      title="Proof, not"
      highlight="promises"
      description="The last piece of the system: monthly reporting that connects ad spend to leads, pipeline, and closed jobs. Less guesswork on whether marketing is working."
      steps={STEPS}
      mockup={<ReportingMockup />}
      reversed
    />
  );
}
