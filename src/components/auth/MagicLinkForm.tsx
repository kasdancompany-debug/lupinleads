"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

type MagicLinkFormProps = {
  /** Post-auth redirect path, e.g. /dashboard or /portal */
  callbackNext: string;
  accessDeniedMessage?: string;
  sentDescription?: string;
  inputId?: string;
};

export function MagicLinkForm({
  callbackNext,
  accessDeniedMessage = "This email does not have access yet.",
  sentDescription,
  inputId = "magic-link-email",
}: MagicLinkFormProps) {
  const searchParams = useSearchParams();
  const accessError = searchParams.get("error") === "access";

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(callbackNext)}`;

      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: redirectTo,
        },
      });

      if (otpError) {
        setError(otpError.message);
        return;
      }

      setSent(true);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-black-surface border border-silver/15 rounded-lg px-4 py-3.5 text-foreground text-base sm:text-sm focus:outline-none focus:border-forest-mid/50 focus:ring-1 focus:ring-forest-mid/30 transition-colors min-h-[48px]";

  if (sent) {
    return (
      <div className="glass-card glow-green rounded-xl p-8 sm:p-10 text-center">
        <div className="w-12 h-12 rounded-full border border-forest-glow/35 bg-forest-mid/15 flex items-center justify-center mx-auto mb-5">
          <svg
            className="w-6 h-6 text-forest-glow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <path d="M4 6h16v12H4V6z" strokeLinejoin="round" />
            <path d="M4 8l8 5 8-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-foreground font-medium text-lg leading-snug mb-2">
          Check your email
        </p>
        <p className="text-sm text-silver-muted leading-relaxed">
          {sentDescription ?? (
            <>
              We sent a login link to{" "}
              <span className="text-foreground break-all">{email.trim()}</span>. Open it on this
              device to continue.
            </>
          )}
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setEmail("");
          }}
          className="mt-6 text-sm text-silver-dim hover:text-forest-glow transition-colors"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card glow-green rounded-xl p-6 sm:p-8 space-y-5"
    >
      {accessError ? (
        <p className="text-sm text-red-400/90 text-center leading-relaxed">
          {accessDeniedMessage}
        </p>
      ) : null}

      <div>
        <label htmlFor={inputId} className="sr-only">
          Email
        </label>
        <input
          id={inputId}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="you@company.com"
          autoComplete="email"
          inputMode="email"
          autoFocus
          required
        />
      </div>

      {error ? <p className="text-red-400 text-sm leading-relaxed">{error}</p> : null}

      <Button
        type="submit"
        size="lg"
        emphasis
        className="w-full min-h-[48px] text-base font-semibold"
        loading={loading}
      >
        Send login link
      </Button>
    </form>
  );
}
