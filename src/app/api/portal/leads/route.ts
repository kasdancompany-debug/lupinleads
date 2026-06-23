import { NextResponse } from "next/server";
import { apiAuthError, requireClientApiAccess } from "@/lib/auth";
import { getCrmLeads } from "@/lib/data/crm-leads";
import { filterPortalLeads } from "@/lib/portal/filters";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const client = await requireClientApiAccess();

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ leads: [], source: "local" });
    }

    const leads = filterPortalLeads(await getCrmLeads({ clientSlug: client.clientSlug }));
    return NextResponse.json({ leads, source: "supabase" });
  } catch (error) {
    return apiAuthError(error);
  }
}
