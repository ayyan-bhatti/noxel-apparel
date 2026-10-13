import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, index, inverse = false }: { children: ReactNode; index?: string; inverse?: boolean }) {
  return (
    <p className={`text-label flex items-center gap-3 ${inverse ? "text-amber" : "text-amber-deep"}`}>
      {index && <span className={inverse ? "text-paper/50" : "text-ink/45"}>{index}</span>}
      <span aria-hidden="true" className="h-px w-8 bg-current" />
      <span>{children}</span>
    </p>
  );
}

type HeadingProps = {
  eyebrow: string;
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  inverse?: boolean;
  className?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, index, title, intro, inverse = false, className = "", id }: HeadingProps) {
  return (
    <div className={`grid gap-6 lg:grid-cols-12 lg:gap-12 ${className}`}>
      <Reveal className="lg:col-span-7">
        <Eyebrow index={index} inverse={inverse}>
          {eyebrow}
        </Eyebrow>
        <h2 id={id} className="text-headline mt-6">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={120} className="self-end lg:col-span-5">
          <p className={`text-lede ${inverse ? "text-paper/70" : "text-slate"}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
