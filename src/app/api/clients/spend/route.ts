import { NextRequest, NextResponse } from "next/server";
import { apiAuthError, requireAgencyApiAccess } from "@/lib/auth";
import {
  listAllClientMonthlySpend,
  upsertClientMonthlySpend,
} from "@/lib/data/client-spend";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  try {
    await requireAgencyApiAccess(request);

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ entries: [], configured: false });
    }

    const { searchParams } = new URL(request.url);
    const clientSlug = searchParams.get("clientSlug") ?? undefined;

    let entries = await listAllClientMonthlySpend();
    if (clientSlug) {
      entries = entries.filter((e) => e.clientSlug === clientSlug);
    }

    return NextResponse.json({ entries, configured: true });
  } catch (error) {
    return apiAuthError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAgencyApiAccess(request);

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
    }

    const body = await request.json();
    const clientSlug = typeof body.clientSlug === "string" ? body.clientSlug.trim() : "";
    const month = typeof body.month === "string" ? body.month.trim() : "";
    const adSpendCad = Number(body.adSpendCad);
    const notes =
      body.notes === null || body.notes === undefined
        ? null
        : typeof body.notes === "string"
          ? body.notes
          : null;

    if (!clientSlug) {
      return NextResponse.json({ error: "Client is required" }, { status: 400 });
    }

    const result = await upsertClientMonthlySpend({
      clientSlug,
      month,
      adSpendCad,
      notes,
    });

    if (!result.entry) {
      return NextResponse.json(
        { error: result.error ?? "Failed to save ad spend" },
        { status: 400 }
      );
    }

    return NextResponse.json({ entry: result.entry });
  } catch (error) {
    return apiAuthError(error);
  }
}
