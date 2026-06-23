import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { evaluateRouteAccess } from "@/lib/auth/route-access";
import { resolveMiddlewareRoles } from "@/lib/auth/middleware-roles";
import { hasLegacyDashboardAuth } from "@/lib/auth/legacy";
import {
  createMiddlewareClient,
  withSessionCookies,
} from "@/lib/supabase/middleware";

function isSupabaseAuthConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

function isPublicAuthPath(pathname: string): boolean {
  return (
    pathname === "/login" ||
    pathname === "/portal/login" ||
    pathname === "/api/dashboard-auth" ||
    pathname.startsWith("/auth/callback")
  );
}

function isDashboardPath(pathname: string): boolean {
  return pathname.startsWith("/dashboard");
}

function isPortalPath(pathname: string): boolean {
  return pathname.startsWith("/portal") && pathname !== "/portal/login";
}

function isDevAgencyApiPath(pathname: string): boolean {
  return pathname.startsWith("/api/dev");
}

function isAgencyApiPath(pathname: string): boolean {
  if (pathname.startsWith("/api/crm")) return true;
  if (pathname.startsWith("/api/clients")) return true;
  if (pathname.startsWith("/api/notifications")) return true;
  if (pathname.startsWith("/api/reports")) return true;
  if (pathname.startsWith("/api/ai")) return true;
  if (pathname === "/api/forms" || pathname.startsWith("/api/forms/")) {
    return !pathname.startsWith("/api/forms/submit/");
  }
  return false;
}

function isPortalApiPath(pathname: string): boolean {
  return pathname.startsWith("/api/portal");
}

function loginRedirect(
  request: NextRequest,
  loginPath: "/login" | "/portal/login",
  from: string,
  sessionResponse: NextResponse
) {
  const url = new URL(loginPath, request.url);
  url.searchParams.set("from", from);
  return withSessionCookies(sessionResponse, NextResponse.redirect(url));
}

function roleRedirect(
  request: NextRequest,
  path: string,
  sessionResponse: NextResponse
) {
  return withSessionCookies(
    sessionResponse,
    NextResponse.redirect(new URL(path, request.url))
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const needsAuth =
    isDashboardPath(pathname) ||
    isPortalPath(pathname) ||
    isDevAgencyApiPath(pathname) ||
    isAgencyApiPath(pathname) ||
    isPortalApiPath(pathname);

  if (!needsAuth && !isPublicAuthPath(pathname)) {
    return NextResponse.next();
  }

  const sessionResponse = NextResponse.next({ request });

  let user = null;
  if (isSupabaseAuthConfigured()) {
    const supabase = createMiddlewareClient(request, sessionResponse);
    const { data } = await supabase.auth.getUser();
    user = data.user;
  }

  const roles = await resolveMiddlewareRoles(user);
  const legacyAgency = await hasLegacyDashboardAuth(request);
  const isAgency = roles.isAgency || legacyAgency;
  const isClient = roles.isClient;

  const decision = evaluateRouteAccess({
    pathname,
    isAgency,
    isClient,
    hasUser: Boolean(user),
  });

  if (decision.action === "allow") {
    return sessionResponse;
  }

  if (decision.action === "redirect") {
    if (decision.to === "/login") {
      return loginRedirect(request, "/login", pathname, sessionResponse);
    }
    if (decision.to === "/portal/login") {
      return loginRedirect(request, "/portal/login", pathname, sessionResponse);
    }
    return roleRedirect(request, decision.to, sessionResponse);
  }

  return NextResponse.json({ error: decision.error }, { status: decision.status });
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/portal/:path*",
    "/login",
    "/auth/callback",
    "/api/crm/:path*",
    "/api/clients/:path*",
    "/api/forms/:path*",
    "/api/notifications/:path*",
    "/api/reports/:path*",
    "/api/portal/:path*",
    "/api/ai/:path*",
    "/api/dev/:path*",
    "/api/dashboard-auth",
  ],
};
