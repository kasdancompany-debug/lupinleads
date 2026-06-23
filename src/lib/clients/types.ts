export const CLIENT_STATUSES = ["onboarding", "active", "paused", "churned"] as const;
export type ClientStatus = (typeof CLIENT_STATUSES)[number];

export type ClientUserRecord = {
  id: string;
  email: string;
  role: string;
  authUserId: string | null;
  invitedAt: string;
  acceptedAt: string | null;
  linked: boolean;
};

export type AgencyClient = {
  id: string;
  slug: string;
  name: string;
  trade: string | null;
  market: string | null;
  status: ClientStatus;
  createdAt: string;
  users: ClientUserRecord[];
};

export type CreateClientInput = {
  name: string;
  slug: string;
  trade?: string;
  market?: string;
  status?: ClientStatus;
};
