import { NextRequest, NextResponse } from "next/server";
import { processFormSubmission } from "@/lib/forms/submit";
import type { CampaignTracking } from "@/lib/forms/types";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const body = await request.json();
    const { data, tracking } = body as {
      data: Record<string, string | number>;
      tracking?: CampaignTracking;
    };

    if (!data || typeof data !== "object") {
      return NextResponse.json({ error: "Invalid submission data" }, { status: 400 });
    }

    const result = await processFormSubmission(slug, data, tracking ?? {});

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      submissionId: result.submissionId,
      crmLeadId: result.crmLeadId,
      campaign: result.campaign,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
