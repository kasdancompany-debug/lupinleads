import OpenAI from "openai";
import type { ContractorLead } from "@/lib/crm/types";
import type { FollowUpAnalysis } from "./types";
import { generateFallbackAnalysis } from "./fallback";

let client: OpenAI | null = null;

export function isOpenAIConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

function getClient(): OpenAI {
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
}

function buildPrompt(lead: ContractorLead): string {
  const stage = lead.stage.replace(/_/g, " ");
  const daysInPipeline = Math.round(
    (Date.now() - new Date(lead.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return `You are an expert sales assistant for a premium contractor/home services agency. Analyze this lead and provide follow-up guidance.

LEAD DATA:
- Name: ${lead.name}
- Phone: ${lead.phone}
- Email: ${lead.email}
- Service Requested: ${lead.serviceRequested}
- Estimated Value: $${lead.estimatedValue.toLocaleString()}
- Source: ${lead.source}
- Pipeline Stage: ${stage}
- Days in Pipeline: ${daysInPipeline}
- Notes: ${lead.notes || "None"}

Respond with JSON only (no markdown):
{
  "score": "hot" | "warm" | "cold",
  "scoreReason": "1-2 sentence explanation",
  "recommendation": "call_immediately" | "follow_up_tomorrow" | "send_estimate",
  "recommendationReason": "1-2 sentence explanation",
  "nextAction": "Specific actionable step for the sales rep",
  "sms": "SMS message under 320 chars, professional but warm, use first name",
  "email": {
    "subject": "Email subject line",
    "body": "Full email body with greeting and sign-off placeholder"
  },
  "talkingPoints": ["3-4 bullet points for the call/conversation"]
}

Scoring guide:
- HOT: High value, urgent need, new lead, appointment booked, strong buying signals
- WARM: Interested but needs nurturing, moderate value, early stage
- COLD: Stale lead, low engagement, lost momentum, low priority

Recommendation guide:
- call_immediately: Hot leads, new inquiries, high-value opportunities
- follow_up_tomorrow: Warm leads needing nurture, attempted contact no response
- send_estimate: Appointment completed, estimate requested, ready for pricing`;
}

function parseAnalysis(raw: string): FollowUpAnalysis {
  const parsed = JSON.parse(raw) as FollowUpAnalysis;

  if (!["hot", "warm", "cold"].includes(parsed.score)) {
    throw new Error("Invalid score");
  }
  if (
    !["call_immediately", "follow_up_tomorrow", "send_estimate"].includes(
      parsed.recommendation
    )
  ) {
    throw new Error("Invalid recommendation");
  }

  return parsed;
}

export async function analyzeLeadFollowUp(
  lead: ContractorLead
): Promise<FollowUpAnalysis & { source: "openai" | "fallback" }> {
  if (!isOpenAIConfigured()) {
    return { ...generateFallbackAnalysis(lead), source: "fallback" };
  }

  try {
    const openai = getClient();
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a contractor CRM AI assistant. Always respond with valid JSON matching the requested schema.",
        },
        { role: "user", content: buildPrompt(lead) },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("Empty response");

    return { ...parseAnalysis(content), source: "openai" };
  } catch (error) {
    console.error("OpenAI analysis failed:", error);
    return { ...generateFallbackAnalysis(lead), source: "fallback" };
  }
}
