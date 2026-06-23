import { NextRequest, NextResponse } from "next/server";
import { createCrmLeadFromStrategyCall } from "@/lib/crm/strategy-call";
import { sendInstantNotification } from "@/lib/notifications/service";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";
import {
  formatStrategyCallNotification,
  parseStrategyCallBody,
  validateStrategyCallForm,
} from "@/lib/strategy-call/validate";

import type { StrategyCallPayload, StrategyCallValidationError } from "@/lib/strategy-call/types";

function isValidationError(
  result: StrategyCallPayload | StrategyCallValidationError
): result is StrategyCallValidationError {
  return "success" in result && result.success === false;
}

export async function POST(request: NextRequest) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const formInput = parseStrategyCallBody(body);
    const validated = validateStrategyCallForm(formInput);

    if (isValidationError(validated)) {
      return NextResponse.json(
        { error: validated.error, fieldErrors: validated.fieldErrors },
        { status: 400 }
      );
    }

    const payload = validated;

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          error:
            "We're unable to save your request right now. Email hello@lupinleads.com and we'll help you book a call.",
        },
        { status: 503 }
      );
    }

    const admin = createAdminClient();
    if (!admin) {
      return NextResponse.json(
        {
          error:
            "We're unable to save your request right now. Email hello@lupinleads.com and we'll help you book a call.",
        },
        { status: 503 }
      );
    }

    const { data: consultation, error } = await admin
      .from("consultation_requests")
      .insert({
        name: payload.name,
        email: payload.email,
        company: payload.businessName,
        phone: payload.phone,
        trade: payload.trade,
        city: payload.city,
        website: payload.website,
        monthly_ad_budget: payload.monthlyAdBudget,
        message: payload.message,
      })
      .select("id")
      .single();

    if (error || !consultation) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "We couldn't save your request. Please try again in a moment." },
        { status: 500 }
      );
    }

    const crmLead = await createCrmLeadFromStrategyCall({
      ...payload,
      consultationRequestId: consultation.id,
    });

    if (!crmLead) {
      console.error("Failed to create CRM lead for strategy call:", consultation.id);
      return NextResponse.json(
        { error: "We couldn't save your request. Please try again in a moment." },
        { status: 500 }
      );
    }

    try {
      await sendInstantNotification({
        title: `Strategy call: ${payload.businessName} (${payload.trade})`,
        message: formatStrategyCallNotification(payload),
        metadata: {
          consultationRequestId: consultation.id,
          crmLeadId: crmLead.id,
          source: "Strategy Call",
          leadName: payload.name,
          businessName: payload.businessName,
          trade: payload.trade,
          city: payload.city,
          email: payload.email,
          phone: payload.phone,
        },
      });
    } catch (notifyError) {
      // Lead is saved — notification failure should not block the user
      console.error("Strategy call notification failed:", notifyError);
    }

    return NextResponse.json({
      success: true,
      message: "Request received. We'll be in touch within one business day.",
      consultationRequestId: consultation.id,
      crmLeadId: crmLead.id,
    });
  } catch (error) {
    console.error("Book call error:", error);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please try again." },
      { status: 500 }
    );
  }
}
