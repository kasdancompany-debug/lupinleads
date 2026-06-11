import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  DASHBOARD_AUTH_COOKIE,
  getDashboardPassword,
  verifyAuthToken,
} from "@/lib/dashboard-auth";

function isPublicPath(pathname: string): boolean {
  if (pathname === "/login") return true;
  if (pathname === "/api/dashboard-auth") return true;
  if (pathname.startsWith("/api/forms/submit/")) return true;
  return false;
}

function isProtectedPath(pathname: string): boolean {
  if (pathname.startsWith("/dashboard")) return true;
  if (pathname.startsWith("/api/crm")) return true;
  if (pathname.startsWith("/api/notifications")) return true;
  if (pathname.startsWith("/api/reports")) return true;
  if (pathname.startsWith("/api/ai")) return true;
  if (pathname === "/api/forms" || pathname.startsWith("/api/forms/")) {
    return !pathname.startsWith("/api/forms/submit/");
  }
  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname) || isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const password = getDashboardPassword();
  if (!password) {
    return NextResponse.next();
  }

  const token = request.cookies.get(DASHBOARD_AUTH_COOKIE)?.value;
  const authed = await verifyAuthToken(password, token);

  if (authed) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/crm/:path*",
    "/api/forms/:path*",
    "/api/notifications/:path*",
    "/api/reports/:path*",
    "/api/ai/:path*",
  ],
};
