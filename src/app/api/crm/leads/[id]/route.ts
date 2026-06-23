import { NextRequest, NextResponse } from "next/server";
import { apiAuthError, requireAgencyApiAccess } from "@/lib/auth";
import { deleteCrmLead, updateCrmLead } from "@/lib/crm/db";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import type { ContractorLead, PipelineStage } from "@/lib/crm/types";

export async function PUT(
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
    const lead: ContractorLead = {
      id,
      name: body.name,
      phone: body.phone,
      email: body.email,
      serviceRequested: body.serviceRequested,
      estimatedValue: body.estimatedValue,
      notes: body.notes,
      source: body.source,
      status: body.status as PipelineStage,
      stage: body.stage as PipelineStage,
      createdAt: body.createdAt,
      updatedAt: new Date().toISOString(),
    };

    const updated = await updateCrmLead(lead);
    if (!updated) {
      return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
    }

    return NextResponse.json({ lead: updated });
  } catch (error) {
    return apiAuthError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await requireAgencyApiAccess(request);

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
    }

    const ok = await deleteCrmLead(id);
    if (!ok) {
      return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return apiAuthError(error);
  }
}
