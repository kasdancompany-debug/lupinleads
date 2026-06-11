import { NextRequest, NextResponse } from "next/server";
import { getStripe, getPriceIdForPlan } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const { planId } = await request.json();

    if (!planId || typeof planId !== "string") {
      return NextResponse.json({ error: "Plan ID is required" }, { status: 400 });
    }

    const priceId = getPriceIdForPlan(planId);

    if (!priceId) {
      return NextResponse.json(
        {
          error:
            "Stripe is not configured for this plan. Please book a strategy call instead.",
        },
        { status: 503 }
      );
    }

    const stripe = getStripe();
    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#pricing`,
      allow_promotion_codes: true,
      billing_address_collection: "required",
      metadata: { planId },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
