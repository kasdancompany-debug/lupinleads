import { NextRequest, NextResponse } from "next/server";
import { apiAuthError, requireAgencyApiAccess } from "@/lib/auth";
import { addClientUserByEmail } from "@/lib/clients/db";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await requireAgencyApiAccess(request);

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
    }

    const body = await request.json();
    const email = typeof body.email === "string" ? body.email : "";

    if (!email.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const result = await addClientUserByEmail(id, email);
    if (!result.user) {
      return NextResponse.json({ error: result.error ?? "Failed to add user" }, { status: 400 });
    }

    return NextResponse.json({ user: result.user }, { status: 201 });
  } catch (error) {
    return apiAuthError(error);
  }
}
