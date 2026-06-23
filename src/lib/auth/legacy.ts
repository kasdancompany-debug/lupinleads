import type { NextRequest } from "next/server";
import {
  DASHBOARD_AUTH_COOKIE,
  getDashboardPassword,
  verifyAuthToken,
} from "@/lib/dashboard-auth";

/** Dev-only fallback when DASHBOARD_PASSWORD is set — not used in production. */
export function isLegacyDashboardPasswordAuthEnabled(): boolean {
  return (
    process.env.NODE_ENV === "development" && Boolean(getDashboardPassword())
  );
}

export async function hasLegacyDashboardAuth(
  request: NextRequest
): Promise<boolean> {
  if (!isLegacyDashboardPasswordAuthEnabled()) {
    return false;
  }

  const password = getDashboardPassword();
  if (!password) {
    return false;
  }

  const token = request.cookies.get(DASHBOARD_AUTH_COOKIE)?.value;
  return verifyAuthToken(password, token);
}
