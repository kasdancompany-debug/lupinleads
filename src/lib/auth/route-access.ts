/**
 * Pure route access rules shared by middleware and isolation tests.
 * Keeps agency vs portal boundaries in one place.
 */

export type RouteAccessDecision =
  | { action: "allow" }
  | { action: "redirect"; to: string }
  | { action: "deny"; status: 401 | 403; error: string };

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

function isDevSessionApiPath(pathname: string): boolean {
  return pathname === "/api/dev/isolation-test/session";
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

export function evaluateRouteAccess(params: {
  pathname: string;
  isAgency: boolean;
  isClient: boolean;
  hasUser: boolean;
}): RouteAccessDecision {
  const { pathname, isAgency, isClient, hasUser } = params;

  if (isPublicAuthPath(pathname)) {
    if (pathname === "/login" && hasUser) {
      if (isAgency) return { action: "redirect", to: "/dashboard" };
      if (isClient) return { action: "redirect", to: "/portal" };
    }
    if (pathname === "/portal/login" && hasUser) {
      if (isAgency) return { action: "redirect", to: "/dashboard" };
      if (isClient) return { action: "redirect", to: "/portal" };
    }
    return { action: "allow" };
  }

  if (isDashboardPath(pathname)) {
    if (isClient && !isAgency) {
      return { action: "redirect", to: "/portal" };
    }
    if (!isAgency) {
      return { action: "redirect", to: "/login" };
    }
    return { action: "allow" };
  }

  if (isPortalPath(pathname)) {
    if (isAgency) {
      return { action: "redirect", to: "/dashboard" };
    }
    if (!isClient) {
      return { action: "redirect", to: "/portal/login" };
    }
    return { action: "allow" };
  }

  if (isDevSessionApiPath(pathname)) {
    if (!hasUser) {
      return { action: "deny", status: 401, error: "Unauthorized" };
    }
    if (!isAgency && !isClient) {
      return { action: "deny", status: 403, error: "Forbidden" };
    }
    return { action: "allow" };
  }

  if (isDevAgencyApiPath(pathname)) {
    if (isClient && !isAgency) {
      return { action: "deny", status: 403, error: "Forbidden" };
    }
    if (!isAgency) {
      return { action: "deny", status: 401, error: "Unauthorized" };
    }
    return { action: "allow" };
  }

  if (isAgencyApiPath(pathname)) {
    if (pathname.startsWith("/api/forms/submit/")) {
      return { action: "allow" };
    }
    if (isClient && !isAgency) {
      return { action: "deny", status: 403, error: "Forbidden" };
    }
    if (!isAgency) {
      return { action: "deny", status: 401, error: "Unauthorized" };
    }
    return { action: "allow" };
  }

  if (isPortalApiPath(pathname)) {
    if (isAgency) {
      return { action: "deny", status: 403, error: "Forbidden" };
    }
    if (!isClient) {
      return { action: "deny", status: 401, error: "Unauthorized" };
    }
    return { action: "allow" };
  }

  return { action: "allow" };
}
