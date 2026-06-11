import type { ContractorLead } from "@/lib/crm/types";
import type { FollowUpAnalysis, LeadTemperature, RecommendedAction } from "./types";

function daysSince(iso: string): number {
  return (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24);
}

export function generateFallbackAnalysis(lead: ContractorLead): FollowUpAnalysis {
  let score: LeadTemperature = "warm";
  let recommendation: RecommendedAction = "follow_up_tomorrow";

  const age = daysSince(lead.createdAt);
  const isHighValue = lead.estimatedValue >= 25000;
  const isNew = lead.stage === "new_lead";
  const needsEstimate = lead.stage === "appointment_booked";
  const estimateSent = lead.stage === "estimate_sent";

  if (isNew && age < 1 && isHighValue) {
    score = "hot";
    recommendation = "call_immediately";
  } else if (needsEstimate || estimateSent) {
    score = isHighValue ? "hot" : "warm";
    recommendation = "send_estimate";
  } else if (age > 5 || lead.stage === "attempted_contact") {
    score = "cold";
    recommendation = "follow_up_tomorrow";
  } else if (isHighValue) {
    score = "hot";
    recommendation = "call_immediately";
  }

  const firstName = lead.name.split(" ")[0];

  return {
    score,
    scoreReason: `Based on ${lead.stage.replace(/_/g, " ")} stage, $${lead.estimatedValue.toLocaleString()} value, and ${Math.round(age)} days in pipeline.`,
    recommendation,
    recommendationReason: `Standard playbook for ${lead.stage.replace(/_/g, " ")} leads at this value tier.`,
    nextAction: RECOMMENDATION_TO_ACTION[recommendation],
    sms: `Hi ${firstName}, this is [Your Name] from [Company]. I wanted to follow up on your ${lead.serviceRequested || "project"} request. Do you have a few minutes to chat today?`,
    email: {
      subject: `Following up on your ${lead.serviceRequested || "project"} — ${firstName}`,
      body: `Hi ${firstName},\n\nThank you for reaching out about ${lead.serviceRequested || "your project"}. I'd love to learn more about your timeline and answer any questions.\n\nWould you be available for a quick call this week?\n\nBest regards,\n[Your Name]\n[Company]`,
    },
    talkingPoints: [
      `Service interest: ${lead.serviceRequested || "Not specified"}`,
      `Estimated project value: $${lead.estimatedValue.toLocaleString()}`,
      `Lead source: ${lead.source}`,
      lead.notes ? `Notes: ${lead.notes.slice(0, 120)}` : "No additional notes on file",
    ],
  };
}

const RECOMMENDATION_TO_ACTION: Record<RecommendedAction, string> = {
  call_immediately: "Pick up the phone and call within the next 2 hours.",
  follow_up_tomorrow: "Schedule a follow-up call or email for tomorrow morning.",
  send_estimate: "Prepare and send a detailed estimate with timeline and scope.",
};
