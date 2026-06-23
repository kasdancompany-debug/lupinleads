import { NextRequest, NextResponse } from "next/server";
import { apiAuthError, requireAgencyApiAccess } from "@/lib/auth";
import { createForm, listForms } from "@/lib/forms/db";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import type { FormField } from "@/lib/forms/types";

export async function GET(request: NextRequest) {
  try {
    await requireAgencyApiAccess(request);

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Supabase not configured", forms: [] },
        { status: 503 }
      );
    }

    const forms = await listForms();
    return NextResponse.json({ forms });
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
    const { name, description, fields, defaultCampaign, notifyEmail, successMessage } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "Form name is required" }, { status: 400 });
    }

    const form = await createForm({
      name: name.trim(),
      description: description?.trim() || null,
      fields: (fields as FormField[]) ?? [],
      defaultCampaign: defaultCampaign?.trim() || null,
      notifyEmail: notifyEmail?.trim() || null,
      successMessage: successMessage?.trim() || "Thank you! We'll be in touch shortly.",
    });

    if (!form) {
      return NextResponse.json({ error: "Failed to create form" }, { status: 500 });
    }

    return NextResponse.json({ form }, { status: 201 });
  } catch (error) {
    return apiAuthError(error);
  }
}
