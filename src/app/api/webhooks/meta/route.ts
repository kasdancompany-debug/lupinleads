import { NextRequest, NextResponse } from "next/server";
import { getMetaVerifyToken } from "@/lib/meta/config";
import { processMetaLeadIntake } from "@/lib/meta/intake";
import type { MetaWebhookPayload } from "@/lib/meta/types";
import { verifyMetaWebhookSignature } from "@/lib/meta/verify";

export const runtime = "nodejs";

/** Meta webhook verification (subscribe). */
export async function GET(request: NextRequest) {
  const verifyToken = getMetaVerifyToken();
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (!verifyToken) {
    return NextResponse.json({ error: "META_VERIFY_TOKEN not configured" }, { status: 503 });
  }

  if (mode === "subscribe" && token === verifyToken && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

/** Meta leadgen webhook notifications. */
export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-hub-signature-256");

  if (!verifyMetaWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: MetaWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as MetaWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (payload.object !== "page" || !Array.isArray(payload.entry)) {
    return NextResponse.json({ received: true, processed: 0 });
  }

  const results = [];

  for (const entry of payload.entry) {
    for (const change of entry.changes ?? []) {
      if (change.field !== "leadgen") continue;

      const value = change.value;
      if (!value?.leadgen_id || !value?.form_id) continue;

      const result = await processMetaLeadIntake({
        leadgenId: String(value.leadgen_id),
        formId: String(value.form_id),
        pageId: value.page_id ? String(value.page_id) : undefined,
        adId: value.ad_id ? String(value.ad_id) : undefined,
        adgroupId: value.adgroup_id ? String(value.adgroup_id) : undefined,
        rawPayload: { entry, change },
      });

      results.push({
        leadgenId: value.leadgen_id,
        status: result.status,
        crmLeadId: result.crmLeadId,
        error: result.error,
      });
    }
  }

  return NextResponse.json({ received: true, results });
}
