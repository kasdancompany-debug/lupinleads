import { NextRequest, NextResponse } from "next/server";
import { apiAuthError, assertLeadBelongsToClient, requireClientApiAccess } from "@/lib/auth";
import { updatePortalCrmLead } from "@/lib/crm/db";
import { parsePortalLeadUpdate } from "@/lib/crm/portal-update";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const client = await requireClientApiAccess();

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
    }

    await assertLeadBelongsToClient(id, client.clientSlug);

    const body = await request.json();
    const input = parsePortalLeadUpdate(body);

    const updated = await updatePortalCrmLead(id, client.clientSlug, input);
    if (!updated) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ lead: updated });
  } catch (error) {
    return apiAuthError(error);
  }
}

export async function DELETE() {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
