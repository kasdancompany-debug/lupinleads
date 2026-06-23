import { NextRequest, NextResponse } from "next/server";
import { apiAuthError, requireAgencyApiAccess } from "@/lib/auth";
import { createAgencyClient, addClientUserByEmail, listAgencyClients } from "@/lib/clients/db";
import { isValidClientSlug, normalizeClientSlug } from "@/lib/clients/slug";
import { CLIENT_STATUSES, type ClientStatus } from "@/lib/clients/types";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  try {
    await requireAgencyApiAccess(request);

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ clients: [], configured: false });
    }

    const clients = await listAgencyClients();
    return NextResponse.json({ clients, configured: true });
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
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const slug = normalizeClientSlug(
      typeof body.slug === "string" && body.slug.trim()
        ? body.slug
        : name
    );
    const trade = typeof body.trade === "string" ? body.trade : "";
    const market =
      typeof body.city === "string"
        ? body.city
        : typeof body.market === "string"
          ? body.market
          : "";
    const status = (typeof body.status === "string" ? body.status : "onboarding") as ClientStatus;
    const ownerEmail =
      typeof body.ownerEmail === "string" ? body.ownerEmail.trim().toLowerCase() : "";

    if (!name) {
      return NextResponse.json({ error: "Client name is required" }, { status: 400 });
    }

    if (ownerEmail && !ownerEmail.includes("@")) {
      return NextResponse.json({ error: "Owner email is invalid" }, { status: 400 });
    }

    if (!isValidClientSlug(slug)) {
      return NextResponse.json(
        { error: "Slug must be lowercase letters, numbers, and hyphens (min 2 chars)" },
        { status: 400 }
      );
    }

    if (!CLIENT_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const result = await createAgencyClient({ name, slug, trade, market, status });
    if (!result.client) {
      return NextResponse.json({ error: result.error ?? "Failed to create client" }, { status: 400 });
    }

    if (ownerEmail) {
      const invite = await addClientUserByEmail(result.client.id, ownerEmail);
      if (!invite.user) {
        return NextResponse.json(
          {
            client: result.client,
            warning: invite.error ?? "Client created but owner invite failed",
          },
          { status: 201 }
        );
      }
    }

    const clients = await listAgencyClients();
    const client = clients.find((c) => c.id === result.client!.id) ?? result.client;

    return NextResponse.json({ client }, { status: 201 });
  } catch (error) {
    return apiAuthError(error);
  }
}
