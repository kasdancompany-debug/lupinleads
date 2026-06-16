import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  emphasis?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-forest-glow text-black font-semibold hover:bg-[#6dd4a0] border border-forest-glow/80 shadow-lg shadow-forest-glow/25 focus-visible:ring-2 focus-visible:ring-forest-glow focus-visible:ring-offset-2 focus-visible:ring-offset-black",
  secondary:
    "bg-black-surface text-foreground border border-silver/25 hover:border-silver/45 hover:bg-black-elevated focus-visible:ring-2 focus-visible:ring-silver/30",
  ghost:
    "text-silver-muted hover:text-foreground hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-silver/20",
  outline:
    "border border-silver/20 text-silver-muted font-medium hover:text-foreground hover:bg-white/[0.03] hover:border-silver/30 focus-visible:ring-2 focus-visible:ring-silver/25",
};

const emphasisStyles =
  "shadow-xl shadow-forest-glow/35 ring-1 ring-forest-glow/25 hover:shadow-forest-glow/45 hover:ring-forest-glow/40";

const sizeStyles = {
  sm: "px-4 py-2 text-sm min-h-[40px]",
  md: "px-6 py-3 text-sm min-h-[44px]",
  lg: "px-8 py-3.5 text-base min-h-[48px]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      emphasis = false,
      className = "",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center gap-2 rounded-md font-medium
          tracking-wide transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantStyles[variant]}
          ${emphasis && variant === "primary" ? emphasisStyles : ""}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
