import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createCrmLeadFromStrategyCall } from "@/lib/crm/strategy-call";
import { sendInstantNotification } from "@/lib/notifications/service";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, phone, message } = body;

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (!isSupabaseConfigured()) {
      console.log("Book call submission (Supabase not configured):", {
        name,
        email,
        company,
        phone,
        message,
      });
      return NextResponse.json({
        success: true,
        message: "Request received. We'll be in touch soon.",
      });
    }

    const supabase = await createClient();

    const { data: consultation, error } = await supabase
      .from("consultation_requests")
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        company: company?.trim() || null,
        phone: phone?.trim() || null,
        message: message?.trim() || null,
      })
      .select("id")
      .single();

    if (error || !consultation) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save your request. Please try again." },
        { status: 500 }
      );
    }

    const crmLead = await createCrmLeadFromStrategyCall({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company,
      phone,
      message,
      consultationRequestId: consultation.id,
    });

    if (!crmLead) {
      console.error("Failed to create CRM lead for strategy call:", consultation.id);
    }

    await sendInstantNotification({
      title: "New strategy call request",
      message: [
        `${name.trim()} submitted the Book A Strategy Call form.`,
        email ? `Email: ${email.trim()}` : null,
        phone?.trim() ? `Phone: ${phone.trim()}` : null,
        company?.trim() ? `Company: ${company.trim()}` : null,
        message?.trim() ? `Message: ${message.trim()}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
      metadata: {
        consultationRequestId: consultation.id,
        crmLeadId: crmLead?.id,
        source: "Strategy Call",
        leadName: name.trim(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Request received. We'll be in touch within 24 hours.",
      crmLeadId: crmLead?.id,
    });
  } catch (error) {
    console.error("Book call error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
