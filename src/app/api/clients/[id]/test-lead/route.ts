import { NextRequest, NextResponse } from "next/server";
import { apiAuthError, requireAgencyApiAccess } from "@/lib/auth";
import { createCrmLead } from "@/lib/crm/db";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    await requireAgencyApiAccess(request);

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
    }

    const { id } = await context.params;
    const admin = createAdminClient();
    if (!admin) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
    }

    const { data: client, error: clientError } = await admin
      .from("clients")
      .select("id, slug, name, trade")
      .eq("id", id)
      .maybeSingle();

    if (clientError || !client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const body = await request.json().catch(() => ({}));
    const name =
      typeof body.name === "string" && body.name.trim()
        ? body.name.trim()
        : "Test Lead";

    const lead = await createCrmLead({
      name,
      phone: typeof body.phone === "string" ? body.phone.trim() : "(555) 000-0001",
      email:
        typeof body.email === "string" && body.email.trim()
          ? body.email.trim().toLowerCase()
          : "test@example.com",
      serviceRequested:
        typeof body.serviceRequested === "string" && body.serviceRequested.trim()
          ? body.serviceRequested.trim()
          : client.trade
            ? `${client.trade} quote request`
            : "Test quote request",
      estimatedValue: 0,
      notes: "Manual test lead added from agency dashboard.",
      source: "Test",
      status: "new_lead",
      stage: "new_lead",
      campaign: client.slug,
    });

    if (!lead) {
      return NextResponse.json({ error: "Failed to create test lead" }, { status: 500 });
    }

    return NextResponse.json({ lead, clientSlug: client.slug }, { status: 201 });
  } catch (error) {
    return apiAuthError(error);
  }
}
