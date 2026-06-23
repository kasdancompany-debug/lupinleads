import { AuthRequiredError } from "@/lib/auth/errors";
import { getAgencyUser, getClientUser } from "@/lib/auth/session";

export type ResolvedDataScope = {
  /** Undefined means all clients (agency only). */
  clientSlug?: string;
  clientName?: string;
  isAgency: boolean;
};

/**
 * Resolve which client slug may be used for data queries.
 * - Portal clients: always locked to their membership slug; browser params are ignored.
 * - Agency admins: may omit slug (all data) or pass a slug to scope to one client.
 */
export async function resolveDataScope(
  requestedSlug?: string | null
): Promise<ResolvedDataScope> {
  const client = await getClientUser();
  if (client) {
    if (requestedSlug && requestedSlug !== client.clientSlug) {
      throw new AuthRequiredError("Forbidden", 403);
    }
    return {
      clientSlug: client.clientSlug,
      clientName: client.clientName,
      isAgency: false,
    };
  }

  const agency = await getAgencyUser();
  if (!agency) {
    throw new AuthRequiredError("Unauthorized", 401);
  }

  const slug = requestedSlug?.trim() || undefined;
  return {
    clientSlug: slug,
    clientName: undefined,
    isAgency: true,
  };
}
