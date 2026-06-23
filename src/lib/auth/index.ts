export {
  apiAuthError,
  assertLeadBelongsToClient,
  requireAgencyApiAccess,
  requireClientApiAccess,
  resolveApiDataScope,
  type AgencyRouteAccess,
} from "@/lib/auth/api-access";
export { getAgencyAdminEmails, isAgencyAdminEmail } from "@/lib/auth/config";
export { AuthRequiredError } from "@/lib/auth/errors";
export {
  isLegacyDashboardPasswordAuthEnabled,
  hasLegacyDashboardAuth,
} from "@/lib/auth/legacy";
export { fetchClientMembership } from "@/lib/auth/membership";
export { resolveMiddlewareRoles } from "@/lib/auth/middleware-roles";
export type { MiddlewareRoles } from "@/lib/auth/middleware-roles";
export { resolveAuthRoles } from "@/lib/auth/resolve";
export {
  getCurrentUser,
  getAgencyUser,
  getClientUser,
  getClientContext,
  requireAgencyUser,
  requireClientUser,
} from "@/lib/auth/session";
export type { AgencyUser, ClientContext, ClientUser } from "@/lib/auth/types";
export type { ResolvedAuth } from "@/lib/auth/resolve";
