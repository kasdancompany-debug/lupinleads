import {
  STRATEGY_CALL_BUDGETS,
  STRATEGY_CALL_TRADES,
  type StrategyCallBudget,
  type StrategyCallTrade,
} from "./constants";
import type {
  StrategyCallFormInput,
  StrategyCallPayload,
  StrategyCallValidationError,
} from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s().+\-]{7,20}$/;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeWebsite(value: string): string | null {
  if (!value) return null;
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const parsed = new URL(withProtocol);
    if (!parsed.hostname.includes(".")) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

export function emptyStrategyCallForm(): StrategyCallFormInput {
  return {
    name: "",
    businessName: "",
    email: "",
    phone: "",
    trade: "",
    city: "",
    website: "",
    monthlyAdBudget: "",
    message: "",
  };
}

export function parseStrategyCallBody(
  body: Record<string, unknown>
): StrategyCallFormInput {
  const businessName =
    clean(body.businessName) ||
    clean(body.business_name) ||
    clean(body.company);

  return {
    name: clean(body.name),
    businessName,
    email: clean(body.email),
    phone: clean(body.phone),
    trade: clean(body.trade) || clean(body.category),
    city: clean(body.city),
    website: clean(body.website),
    monthlyAdBudget:
      clean(body.monthlyAdBudget) ||
      clean(body.monthly_ad_budget) ||
      clean(body.adBudget),
    message: clean(body.message),
  };
}

export function validateStrategyCallForm(
  input: StrategyCallFormInput
): StrategyCallPayload | StrategyCallValidationError {
  const fieldErrors: Partial<Record<keyof StrategyCallFormInput, string>> = {};

  if (!input.name) fieldErrors.name = "Name is required";
  if (!input.businessName) fieldErrors.businessName = "Business name is required";
  if (!input.email) fieldErrors.email = "Email is required";
  else if (!EMAIL_RE.test(input.email)) fieldErrors.email = "Enter a valid email address";

  if (!input.phone) fieldErrors.phone = "Phone is required";
  else if (!PHONE_RE.test(input.phone)) {
    fieldErrors.phone = "Enter a valid phone number";
  }

  if (!input.trade) fieldErrors.trade = "Select your trade";
  if (!input.city) fieldErrors.city = "City is required";

  if (
    input.monthlyAdBudget &&
    !STRATEGY_CALL_BUDGETS.includes(input.monthlyAdBudget as StrategyCallBudget)
  ) {
    fieldErrors.monthlyAdBudget = "Select a budget range";
  }

  if (input.website) {
    const normalized = normalizeWebsite(input.website);
    if (!normalized) fieldErrors.website = "Enter a valid website URL";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      error: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  const trade = STRATEGY_CALL_TRADES.includes(input.trade as StrategyCallTrade)
    ? (input.trade as StrategyCallTrade)
    : input.trade;

  const monthlyAdBudget = input.monthlyAdBudget
    ? STRATEGY_CALL_BUDGETS.includes(input.monthlyAdBudget as StrategyCallBudget)
      ? (input.monthlyAdBudget as StrategyCallBudget)
      : input.monthlyAdBudget
    : null;

  return {
    name: input.name,
    businessName: input.businessName,
    email: input.email.toLowerCase(),
    phone: input.phone,
    trade,
    city: input.city,
    website: input.website ? normalizeWebsite(input.website) : null,
    monthlyAdBudget,
    message: input.message || null,
  };
}

export function formatStrategyCallNotification(payload: StrategyCallPayload): string {
  return [
    `${payload.name} submitted a strategy call request.`,
    `Business: ${payload.businessName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Trade: ${payload.trade}`,
    `City: ${payload.city}`,
    payload.website ? `Website: ${payload.website}` : null,
    payload.monthlyAdBudget ? `Ad budget: ${payload.monthlyAdBudget}` : null,
    payload.message ? `Message: ${payload.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}
