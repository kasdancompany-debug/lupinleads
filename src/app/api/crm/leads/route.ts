import { NextRequest, NextResponse } from "next/server";
import { apiAuthError, requireAgencyApiAccess } from "@/lib/auth";
import { getCrmLeads } from "@/lib/data/crm-leads";
import { createCrmLead } from "@/lib/crm/db";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  try {
    await requireAgencyApiAccess(request);

    const { searchParams } = new URL(request.url);
    const clientSlug = searchParams.get("clientSlug")?.trim() || undefined;

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ leads: [], source: "local" });
    }

    const leads = await getCrmLeads({ clientSlug });
    return NextResponse.json({ leads, source: "supabase" });
  } catch (error) {
    return apiAuthError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAgencyApiAccess(request);

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
    }

    const body = await request.json();
    const lead = await createCrmLead({
      name: body.name,
      phone: body.phone ?? "",
      email: body.email ?? "",
      serviceRequested: body.serviceRequested ?? "",
      estimatedValue: body.estimatedValue ?? 0,
      notes: body.notes ?? "",
      source: body.source ?? "Manual",
      status: "new_lead",
      stage: "new_lead",
      campaign: body.campaign ?? null,
    });

    if (!lead) {
      return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
    }

    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    return apiAuthError(error);
  }
}
