import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
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

    const { error } = await supabase.from("consultation_requests").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || null,
      phone: phone?.trim() || null,
      message: message?.trim() || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save your request. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Request received. We'll be in touch within 24 hours.",
    });
  } catch (error) {
    console.error("Book call error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
