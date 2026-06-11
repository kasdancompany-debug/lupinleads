import { NextRequest, NextResponse } from "next/server";
import type { ContractorLead } from "@/lib/crm/types";
import { analyzeLeadFollowUp, isOpenAIConfigured } from "@/lib/ai/openai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const lead = body.lead as ContractorLead;

    if (!lead?.name) {
      return NextResponse.json({ error: "Lead data is required" }, { status: 400 });
    }

    const analysis = await analyzeLeadFollowUp(lead);

    return NextResponse.json({
      analysis,
      openaiConfigured: isOpenAIConfigured(),
    });
  } catch {
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
