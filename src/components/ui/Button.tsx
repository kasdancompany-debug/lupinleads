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
    "bg-forest-green-bright text-stone-white hover:bg-forest-green border border-forest-green-bright/70 shadow-md shadow-forest-green-deep/25 hover:shadow-lg hover:shadow-forest-green-deep/30 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-lupin-purple-light/80 focus-visible:ring-offset-2 focus-visible:ring-offset-deep-soil",
  secondary:
    "bg-black-surface/90 text-foreground border border-silver/18 hover:border-lupin-purple/25 hover:bg-charcoal-elevated active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-silver/25",
  ghost:
    "text-silver-muted hover:text-foreground hover:bg-white/[0.04] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-silver/20",
  outline:
    "border border-silver/16 text-silver-muted hover:text-foreground hover:bg-white/[0.02] hover:border-forest-green-bright/30 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-silver/20",
};

const emphasisStyles =
  "ring-1 ring-lupin-purple/25 hover:ring-lupin-purple/35 brand-glow-accent";

const sizeStyles = {
  sm: "px-4 py-2 min-h-[40px]",
  md: "px-6 py-3 min-h-[44px]",
  lg: "px-8 py-3.5 min-h-[48px]",
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
          type-cta inline-flex items-center justify-center gap-2 rounded-lg
          transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-out
          disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
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
