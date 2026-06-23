import { NextRequest, NextResponse } from "next/server";
import { apiAuthError, requireAgencyApiAccess } from "@/lib/auth";
import type { ContractorLead } from "@/lib/crm/types";
import { analyzeLeadFollowUp, isOpenAIConfigured } from "@/lib/ai/openai";
import { getCrmLeadCampaign } from "@/lib/crm/db";
import { isRemoteLead } from "@/lib/crm/api";

export async function POST(request: NextRequest) {
  try {
    await requireAgencyApiAccess(request);

    const body = await request.json();
    const lead = body.lead as ContractorLead;

    if (!lead?.name) {
      return NextResponse.json({ error: "Lead data is required" }, { status: 400 });
    }

    if (isRemoteLead(lead.id)) {
      const campaign = await getCrmLeadCampaign(lead.id);
      if (!campaign) {
        return NextResponse.json({ error: "Lead not found" }, { status: 404 });
      }
    }

    const analysis = await analyzeLeadFollowUp(lead);

    return NextResponse.json({
      analysis,
      openaiConfigured: isOpenAIConfigured(),
    });
  } catch (error) {
    return apiAuthError(error);
  }
}
