import { NextRequest, NextResponse } from "next/server";
import { apiAuthError, requireAgencyApiAccess } from "@/lib/auth";
import { processMetaLeadIntake } from "@/lib/meta/intake";
import { upsertMetaFormMapping } from "@/lib/meta/mappings";
import type { MetaFieldData } from "@/lib/meta/types";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

function devLeadgenId(): string {
  return `dev_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/** Agency-only: simulate a Meta lead form submission without Meta servers. */
export async function POST(request: NextRequest) {
  try {
    await requireAgencyApiAccess(request);

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
    }

    const body = await request.json();
    const clientSlug =
      typeof body.clientSlug === "string" ? body.clientSlug.trim().toLowerCase() : "";
    const metaFormId =
      typeof body.metaFormId === "string" ? body.metaFormId.trim() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "Test Meta Lead";
    const email = typeof body.email === "string" ? body.email.trim() : "meta.test@example.com";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "(555) 000-0099";
    const serviceRequested =
      typeof body.serviceRequested === "string" ? body.serviceRequested.trim() : "Roof quote";
    const leadgenId =
      typeof body.leadgenId === "string" && body.leadgenId.trim()
        ? body.leadgenId.trim()
        : devLeadgenId();

    if (!clientSlug) {
      return NextResponse.json({ error: "clientSlug is required" }, { status: 400 });
    }

    const formId = metaFormId || `dev-sim-${clientSlug}`;

    const mapping = await upsertMetaFormMapping({
      clientSlug,
      metaFormId: formId,
      label: metaFormId ? "Meta lead form" : "Dev simulator mapping",
    });

    if (!mapping.mapping) {
      return NextResponse.json(
        { error: mapping.error ?? "Client not found or mapping failed" },
        { status: 400 }
      );
    }

    const fieldData: MetaFieldData[] = [
      { name: "full_name", values: [name] },
      { name: "email", values: [email] },
      { name: "phone_number", values: [phone] },
      { name: "service_requested", values: [serviceRequested] },
    ];

    const result = await processMetaLeadIntake({
      leadgenId,
      formId,
      fieldData,
      skipFetch: true,
      rawPayload: { simulated: true, clientSlug, fieldData },
    });

    if (!result.ok && result.status === "error") {
      return NextResponse.json({ error: result.error, result }, { status: 400 });
    }

    return NextResponse.json({
      simulated: true,
      formId,
      ...result,
    });
  } catch (error) {
    return apiAuthError(error);
  }
}
