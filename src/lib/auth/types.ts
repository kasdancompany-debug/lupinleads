export type AgencyUser = {
  userId: string;
  email: string;
  role: "agency";
};

export type ClientContext = {
  userId: string;
  email: string;
  clientId: string;
  clientSlug: string;
  clientName: string;
  role: string;
};

export type ClientUser = ClientContext;
