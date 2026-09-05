"use client";

import { cn } from "@/lib/cn";
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

const variants = {
  primary:
    "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] hover:bg-[var(--btn-primary-hover)] shadow-[0_10px_30px_rgba(15,118,110,0.28)]",
  secondary:
    "bg-transparent text-text border border-border hover:border-accent/40 hover:bg-accent-muted",
  ghost: "bg-transparent text-text hover:bg-accent-muted",
  whatsapp:
    "bg-[#128C7E] text-white hover:bg-[#0f766e] shadow-[0_10px_30px_rgba(18,140,126,0.25)]",
} as const;

const sizes = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm sm:text-base",
  lg: "h-12 px-6 text-base",
} as const;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  children: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
