import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "amber" | "ink" | "outline" | "outline-inverse";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-3 px-6 text-[0.9375rem] font-medium tracking-[-0.005em] transition-[background-color,color,border-color] duration-300 select-none";

const variants: Record<Variant, string> = {
  amber: "bg-amber text-ink hover:bg-ink hover:text-paper",
  ink: "bg-ink text-paper hover:bg-amber hover:text-ink",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  "outline-inverse": "border border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink",
};

export function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M1 8h13M9 3l5 5-5 5" />
    </svg>
  );
}

type LinkProps = ComponentProps<typeof Link> & { variant?: Variant; children: ReactNode; arrow?: boolean };

export function ButtonLink({ variant = "amber", className = "", children, arrow = true, ...rest }: LinkProps) {
  return (
    <Link {...rest} className={`${base} ${variants[variant]} ${className}`}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </Link>
  );
}

type BtnProps = ComponentProps<"button"> & { variant?: Variant; arrow?: boolean };

export function Button({ variant = "amber", className = "", children, arrow = true, ...rest }: BtnProps) {
  return (
    <button {...rest} className={`${base} ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-60 ${className}`}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </button>
  );
}
