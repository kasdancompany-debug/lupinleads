"use client";

import { AnimatedFeatureSection } from "@/components/sections/AnimatedFeatureSection";
import { AiFollowUpMockup } from "@/components/marketing/AiFollowUpMockup";

const STEPS = [
  {
    title: "Leads scored on arrival",
    body: "AI reads project details and urgency signals, then rates each submission hot, warm, or cold — so your team prioritizes correctly.",
    tag: "Scoring",
  },
  {
    title: "Clear next action",
    body: "Call now, follow up tomorrow, or send an estimate — practical guidance, not a black box.",
    tag: "Playbook",
  },
  {
    title: "Drafts ready to send",
    body: "Personalized SMS and email copy generated in seconds. Edit, send, or use as a call script.",
    tag: "AI drafts",
  },
  {
    title: "Speed without losing the personal touch",
    body: "Respond in minutes while the homeowner is still thinking about their project. AI supports your crew — it doesn't replace them.",
    tag: "Practical",
  },
];

export function AiFollowUp() {
  return (
    <AnimatedFeatureSection
      id="ai-follow-up"
      variant="mesh"
      eyebrow="AI follow-up"
      title="Know who to call"
      highlight="and what to say"
      description="Part of the growth system, not a bolt-on. AI scoring and follow-up drafts help your team move fast on the leads Meta Ads and your forms already captured."
      steps={STEPS}
      mockup={<AiFollowUpMockup />}
    />
  );
}
