import { NextRequest, NextResponse } from "next/server";
import { deleteForm, getFormById, updateForm } from "@/lib/forms/db";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import type { FormField } from "@/lib/forms/types";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const form = await getFormById(id);
  if (!form) {
    return NextResponse.json({ error: "Form not found" }, { status: 404 });
  }

  return NextResponse.json({ form });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const form = await updateForm(id, {
      name: body.name,
      description: body.description,
      fields: body.fields as FormField[],
      defaultCampaign: body.defaultCampaign,
      notifyEmail: body.notifyEmail,
      successMessage: body.successMessage,
      isActive: body.isActive,
    });

    if (!form) {
      return NextResponse.json({ error: "Failed to update form" }, { status: 500 });
    }

    return NextResponse.json({ form });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const ok = await deleteForm(id);
  if (!ok) {
    return NextResponse.json({ error: "Failed to delete form" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
