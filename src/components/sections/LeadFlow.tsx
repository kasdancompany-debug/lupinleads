"use client";

import { AnimatedFeatureSection } from "@/components/sections/AnimatedFeatureSection";
import { LeadFlowMockup } from "@/components/marketing/LeadFlowMockup";

const STEPS = [
  {
    title: "Meta Ads drive the click",
    body: "Managed campaigns and custom creative on your ad account — homeowners in your area see your offer, not a shared lead list.",
    tag: "Your account",
  },
  {
    title: "Branded form captures the lead",
    body: "Project type, timeline, phone, and address collected under your brand. Exclusive leads, ready for your sales team.",
    tag: "Lead capture",
  },
  {
    title: "CRM logs it instantly",
    body: "Every submission creates a tracked record. Alerts hit your team so follow-up starts while the homeowner is still engaged.",
    tag: "CRM",
  },
  {
    title: "Your crew closes the loop",
    body: "AI follow-up and pipeline tracking carry the lead to booked estimate and won job. We optimize the system; you run the sale.",
    tag: "Full path",
  },
];

export function LeadFlow() {
  return (
    <AnimatedFeatureSection
      id="lead-flow"
      variant="elevated"
      eyebrow="Lead capture"
      title="Demand you own,"
      highlight="leads you keep"
      description="Meta Ads and creative bring homeowners in. Branded forms capture them exclusively. CRM picks up from there — tracked from the first click, not dumped in a shared inbox."
      steps={STEPS}
      mockup={<LeadFlowMockup />}
    />
  );
}
