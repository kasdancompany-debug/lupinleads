export function getMetaVerifyToken(): string | null {
  return process.env.META_VERIFY_TOKEN?.trim() || null;
}

export function getMetaAppSecret(): string | null {
  return process.env.META_APP_SECRET?.trim() || null;
}

export function getMetaGraphAccessToken(): string | null {
  return process.env.META_GRAPH_ACCESS_TOKEN?.trim() || null;
}

export function isMetaWebhookConfigured(): boolean {
  return Boolean(getMetaVerifyToken());
}

export function isMetaLeadFetchConfigured(): boolean {
  return Boolean(getMetaGraphAccessToken());
}
