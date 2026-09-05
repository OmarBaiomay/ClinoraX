"use client";

import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type ShapeProps = {
  className?: string;
};

function FloatWrap({
  children,
  className,
  delay = "0s",
}: {
  children: ReactNode;
  className?: string;
  delay?: string;
}) {
  return (
    <div
      className={cn("hero-float absolute text-accent", className)}
      style={{ animationDelay: delay }}
      aria-hidden
    >
      {children}
    </div>
  );
}

function CrossIcon({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 48 48" className={cn("size-full", className)} fill="none">
      <path
        d="M20 6 H28 V20 H42 V28 H28 V42 H20 V28 H6 V20 H20 Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PulseIcon({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 48 48" className={cn("size-full", className)} fill="none">
      <path
        d="M4 26 H14 L19 12 L27 38 L32 20 L36 26 H44"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 48 48" className={cn("size-full", className)} fill="none">
      <rect x="7" y="10" width="34" height="30" rx="3" stroke="currentColor" strokeWidth="1.75" />
      <path d="M7 19 H41" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 6 V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M33 6 V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="27" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="24" cy="27" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="32" cy="27" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

function ClipboardIcon({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 48 48" className={cn("size-full", className)} fill="none">
      <rect x="10" y="8" width="28" height="34" rx="3" stroke="currentColor" strokeWidth="1.75" />
      <rect x="17" y="5" width="14" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 22 H32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
      <path d="M16 29 H32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M16 36 H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

function PillIcon({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 48 48" className={cn("size-full", className)} fill="none">
      <rect
        x="8"
        y="18"
        width="32"
        height="12"
        rx="6"
        stroke="currentColor"
        strokeWidth="1.75"
        transform="rotate(-30 24 24)"
      />
      <path
        d="M24 24 L14 34"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

function ShieldIcon({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 48 48" className={cn("size-full", className)} fill="none">
      <path
        d="M24 5 L40 12 V23 C40 33 33 40 24 43 C15 40 8 33 8 23 V12 Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M17 24 L22 29 L32 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
    </svg>
  );
}

function StatChip({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-xl border border-accent/35 bg-accent/10 px-2.5 py-1 font-semibold tracking-wide text-accent backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function HeroClinicShapes() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {/* Around the copy column (start side) */}
      <FloatWrap className="start-[6%] top-[18%] size-14 opacity-50 md:start-[8%] md:size-16 md:opacity-70" delay="0s">
        <CrossIcon />
      </FloatWrap>
      <FloatWrap className="start-[2%] top-[48%] size-12 opacity-40 md:start-[4%] md:size-14 md:opacity-60" delay="0.8s">
        <CalendarIcon />
      </FloatWrap>
      <FloatWrap className="start-[18%] top-[72%] size-11 opacity-45 md:start-[22%] md:size-14 md:opacity-65" delay="1.4s">
        <ClipboardIcon />
      </FloatWrap>
      <FloatWrap className="start-[28%] top-[22%] size-10 opacity-35 md:start-[32%] md:opacity-55" delay="0.4s">
        <ShieldIcon />
      </FloatWrap>
      <FloatWrap className="start-[12%] bottom-[14%] size-12 opacity-40 md:size-14 md:opacity-60" delay="1.1s">
        <PillIcon />
      </FloatWrap>
      <FloatWrap className="start-[36%] bottom-[22%] size-11 opacity-35 md:opacity-55" delay="1.8s">
        <PulseIcon />
      </FloatWrap>

      <FloatWrap className="start-[8%] top-[34%] opacity-70" delay="0.6s">
        <StatChip className="text-sm md:text-base">24/7</StatChip>
      </FloatWrap>
      <FloatWrap className="start-[24%] top-[58%] opacity-60" delay="1.2s">
        <StatChip className="text-sm md:text-base">Rx</StatChip>
      </FloatWrap>
      <FloatWrap className="start-[4%] bottom-[28%] opacity-55" delay="2s">
        <StatChip className="text-base md:text-lg">✓</StatChip>
      </FloatWrap>
      <FloatWrap className="start-[30%] top-[40%] opacity-50" delay="0.2s">
        <StatChip className="text-sm">+</StatChip>
      </FloatWrap>

      {/* Soft accent orbs */}
      <div className="absolute start-[-4%] top-[30%] size-40 rounded-full bg-accent/10 blur-3xl md:size-56" />
      <div className="absolute start-[20%] bottom-[8%] size-32 rounded-full bg-accent/8 blur-3xl" />
    </div>
  );
}
