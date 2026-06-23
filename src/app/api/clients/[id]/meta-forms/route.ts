import { NextRequest, NextResponse } from "next/server";
import { apiAuthError, requireAgencyApiAccess } from "@/lib/auth";
import {
  listMetaFormMappingsForClient,
  upsertMetaFormMapping,
} from "@/lib/meta/mappings";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";

type RouteContext = { params: Promise<{ id: string }> };

async function getClientSlug(clientId: string): Promise<string | null> {
  const admin = createAdminClient();
  if (!admin) return null;
  const { data } = await admin.from("clients").select("slug").eq("id", clientId).maybeSingle();
  return data ? (data as { slug: string }).slug : null;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await requireAgencyApiAccess(request);
    const { id } = await context.params;

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ mappings: [], configured: false });
    }

    const slug = await getClientSlug(id);
    if (!slug) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const mappings = await listMetaFormMappingsForClient(slug);
    return NextResponse.json({ mappings, configured: true });
  } catch (error) {
    return apiAuthError(error);
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    await requireAgencyApiAccess(request);
    const { id } = await context.params;

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
    }

    const slug = await getClientSlug(id);
    if (!slug) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const body = await request.json();
    const metaFormId = typeof body.metaFormId === "string" ? body.metaFormId.trim() : "";
    const metaPageId = typeof body.metaPageId === "string" ? body.metaPageId.trim() : "";
    const label = typeof body.label === "string" ? body.label.trim() : "";

    if (!metaFormId) {
      return NextResponse.json({ error: "metaFormId is required" }, { status: 400 });
    }

    const result = await upsertMetaFormMapping({
      clientSlug: slug,
      metaFormId,
      metaPageId: metaPageId || null,
      label: label || null,
    });

    if (!result.mapping) {
      return NextResponse.json({ error: result.error ?? "Failed to save" }, { status: 400 });
    }

    return NextResponse.json({ mapping: result.mapping }, { status: 201 });
  } catch (error) {
    return apiAuthError(error);
  }
}
