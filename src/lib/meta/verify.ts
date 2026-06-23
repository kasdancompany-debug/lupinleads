import { createHmac, timingSafeEqual } from "crypto";
import { getMetaAppSecret } from "./config";

/** Verify Meta webhook X-Hub-Signature-256 header. Skips if META_APP_SECRET is unset. */
export function verifyMetaWebhookSignature(
  rawBody: string,
  signatureHeader: string | null
): boolean {
  const secret = getMetaAppSecret();
  if (!secret) return true;
  if (!signatureHeader?.startsWith("sha256=")) return false;

  const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const received = signatureHeader.slice("sha256=".length);

  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(received));
  } catch {
    return false;
  }
}
