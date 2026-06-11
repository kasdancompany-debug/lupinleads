const AUTH_PAYLOAD = "lupin-dashboard-authenticated";
export const DASHBOARD_AUTH_COOKIE = "dashboard_auth";

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function createAuthToken(secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(AUTH_PAYLOAD));
  return bufferToHex(sig);
}

export async function verifyAuthToken(
  secret: string,
  token: string | undefined
): Promise<boolean> {
  if (!secret || !token) return false;
  const expected = await createAuthToken(secret);
  return timingSafeEqualHex(expected, token);
}

export function verifyPassword(input: string, expected: string): boolean {
  if (!expected) return false;
  if (input.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < input.length; i++) {
    diff |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

export function getDashboardPassword(): string | undefined {
  return process.env.DASHBOARD_PASSWORD;
}
