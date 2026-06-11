import { NextRequest, NextResponse } from "next/server";
import { createCrmLead, listCrmLeads } from "@/lib/crm/db";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ leads: [], source: "local" });
  }

  const leads = await listCrmLeads();
  return NextResponse.json({ leads, source: "supabase" });
}

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  try {
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
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
