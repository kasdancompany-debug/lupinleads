"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { BookCallButton } from "@/components/marketing/BookCallButton";
import { CTAS } from "@/lib/constants";
import {
  STRATEGY_CALL_BUDGETS,
  STRATEGY_CALL_TRADES,
} from "@/lib/strategy-call/constants";
import type { StrategyCallFormInput } from "@/lib/strategy-call/types";
import {
  emptyStrategyCallForm,
  validateStrategyCallForm,
} from "@/lib/strategy-call/validate";

export const STRATEGY_CALL_INPUT_CLASS =
  "w-full bg-black-surface border border-silver/15 rounded-lg px-4 py-3 text-foreground placeholder:text-silver-dim text-sm focus:outline-none focus:border-forest-mid/50 focus:ring-1 focus:ring-forest-mid/30 transition-colors";

export const STRATEGY_CALL_SELECT_CLASS = `${STRATEGY_CALL_INPUT_CLASS} appearance-none`;

type StrategyCallFormProps = {
  id?: string;
  showCalendlyShortcut?: boolean;
  submitLabel?: string;
  onSuccess?: (prefill: { name: string; email: string }) => void;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export function StrategyCallForm({
  id = "book-call-form",
  showCalendlyShortcut = false,
  submitLabel,
  onSuccess,
}: StrategyCallFormProps) {
  const [form, setForm] = useState<StrategyCallFormInput>(emptyStrategyCallForm);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof StrategyCallFormInput, string>>
  >({});
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => {
      if (!prev[name as keyof StrategyCallFormInput]) return prev;
      const next = { ...prev };
      delete next[name as keyof StrategyCallFormInput];
      return next;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    setFieldErrors({});

    const validated = validateStrategyCallForm(form);
    if ("success" in validated && validated.success === false) {
      setFieldErrors(validated.fieldErrors ?? {});
      setErrorMessage(validated.error);
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          businessName: form.businessName,
          email: form.email,
          phone: form.phone,
          trade: form.trade,
          city: form.city,
          website: form.website,
          monthlyAdBudget: form.monthlyAdBudget,
          message: form.message,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setFieldErrors(data.fieldErrors ?? {});
        throw new Error(data.error || "Failed to submit your request");
      }

      const prefill = {
        name: form.name.trim(),
        email: form.email.trim(),
      };

      setSuccessMessage(
        data.message || "Request received. We'll be in touch within one business day."
      );
      setStatus("success");
      setForm(emptyStrategyCallForm());
      onSuccess?.(prefill);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  }

  function resetForm() {
    setStatus("idle");
    setErrorMessage("");
    setFieldErrors({});
    setSuccessMessage("");
    setForm(emptyStrategyCallForm());
  }

  if (status === "success") {
    return (
      <StrategyCallSuccess
        message={successMessage}
        showCalendlyHint={showCalendlyShortcut}
        onReset={resetForm}
      />
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full name *" htmlFor="name" error={fieldErrors.name}>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            className={STRATEGY_CALL_INPUT_CLASS}
            placeholder="Alex Morgan"
            aria-invalid={Boolean(fieldErrors.name)}
          />
        </Field>

        <Field label="Business name *" htmlFor="businessName" error={fieldErrors.businessName}>
          <input
            id="businessName"
            name="businessName"
            type="text"
            required
            autoComplete="organization"
            value={form.businessName}
            onChange={handleChange}
            className={STRATEGY_CALL_INPUT_CLASS}
            placeholder="Summit Roofing Co."
            aria-invalid={Boolean(fieldErrors.businessName)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Email *" htmlFor="email" error={fieldErrors.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            value={form.email}
            onChange={handleChange}
            className={STRATEGY_CALL_INPUT_CLASS}
            placeholder="alex@summitroofing.ca"
            aria-invalid={Boolean(fieldErrors.email)}
          />
        </Field>

        <Field label="Phone *" htmlFor="phone" error={fieldErrors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            value={form.phone}
            onChange={handleChange}
            className={STRATEGY_CALL_INPUT_CLASS}
            placeholder="(416) 555-0100"
            aria-invalid={Boolean(fieldErrors.phone)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Trade / category *" htmlFor="trade" error={fieldErrors.trade}>
          <div className="relative">
            <select
              id="trade"
              name="trade"
              required
              value={form.trade}
              onChange={handleChange}
              className={STRATEGY_CALL_SELECT_CLASS}
              aria-invalid={Boolean(fieldErrors.trade)}
            >
              <option value="">Select your trade</option>
              {STRATEGY_CALL_TRADES.map((trade) => (
                <option key={trade} value={trade}>
                  {trade}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
        </Field>

        <Field label="City / service area *" htmlFor="city" error={fieldErrors.city}>
          <input
            id="city"
            name="city"
            type="text"
            required
            autoComplete="address-level2"
            value={form.city}
            onChange={handleChange}
            className={STRATEGY_CALL_INPUT_CLASS}
            placeholder="Mississauga, ON"
            aria-invalid={Boolean(fieldErrors.city)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Website" htmlFor="website" error={fieldErrors.website}>
          <input
            id="website"
            name="website"
            type="url"
            autoComplete="url"
            inputMode="url"
            value={form.website}
            onChange={handleChange}
            className={STRATEGY_CALL_INPUT_CLASS}
            placeholder="summitroofing.ca"
            aria-invalid={Boolean(fieldErrors.website)}
          />
        </Field>

        <Field
          label="Monthly ad budget"
          htmlFor="monthlyAdBudget"
          error={fieldErrors.monthlyAdBudget}
        >
          <div className="relative">
            <select
              id="monthlyAdBudget"
              name="monthlyAdBudget"
              value={form.monthlyAdBudget}
              onChange={handleChange}
              className={STRATEGY_CALL_SELECT_CLASS}
              aria-invalid={Boolean(fieldErrors.monthlyAdBudget)}
            >
              <option value="">Select a range (optional)</option>
              {STRATEGY_CALL_BUDGETS.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
        </Field>
      </div>

      <Field label="Anything else we should know?" htmlFor="message" error={fieldErrors.message}>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className={`${STRATEGY_CALL_INPUT_CLASS} resize-none`}
          placeholder="How many quote requests do you want per month? What's working now?"
        />
      </Field>

      {status === "error" && errorMessage && (
        <div
          className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        emphasis
        className="w-full min-h-[48px]"
        loading={status === "submitting"}
      >
        {submitLabel ?? (showCalendlyShortcut ? "Send message" : CTAS.primary)}
      </Button>

      {showCalendlyShortcut && (
        <p className="text-center text-[12px] text-silver-dim">
          Faster?{" "}
          <BookCallButton
            variant="ghost"
            size="sm"
            className="inline-flex min-h-0 h-auto px-1 py-0 text-forest-glow hover:text-forest-light"
          >
            Book on the calendar
          </BookCallButton>
        </p>
      )}

      <p className="text-silver-dim text-xs text-center leading-relaxed">
        No spam. Your info stays with Lupin Leads — never sold or shared.
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-xs tracking-wider uppercase text-silver-dim mb-2">
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-red-400 text-[12px] mt-1.5" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectChevron() {
  return (
    <svg
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-dim"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M5 8L10 13L15 8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StrategyCallSuccess({
  message,
  showCalendlyHint,
  onReset,
}: {
  message: string;
  showCalendlyHint?: boolean;
  onReset: () => void;
}) {
  return (
    <div className="py-6 sm:py-8 text-center" role="status" aria-live="polite">
      <div className="w-16 h-16 rounded-full border border-forest-glow/35 bg-forest-mid/10 flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-8 h-8 text-forest-glow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M5 12L10 17L20 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="font-display text-2xl text-foreground mb-3">Request received</h3>
      <p className="text-silver-muted text-sm max-w-md mx-auto leading-relaxed">{message}</p>
      {showCalendlyHint && (
        <p className="text-silver-dim text-xs max-w-sm mx-auto mt-4 leading-relaxed">
          You can also pick a time on the calendar above if you haven&apos;t already.
        </p>
      )}
      <Button variant="ghost" className="mt-6" type="button" onClick={onReset}>
        Submit another request
      </Button>
    </div>
  );
}
