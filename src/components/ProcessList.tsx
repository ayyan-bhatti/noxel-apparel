import { processSteps } from "@/config/site";
import { Reveal } from "./Reveal";

/** Compact six-step process. 1px grid gaps draw the dividing rules. */
export function ProcessList({ inverse = false }: { inverse?: boolean }) {
  const cell = inverse ? "bg-ink" : "bg-paper";
  return (
    <ol
      className={`grid gap-px border-y sm:grid-cols-2 lg:grid-cols-3 ${
        inverse ? "border-line-inverse bg-line-inverse" : "border-line bg-line"
      }`}
    >
      {processSteps.map((step, i) => (
        <Reveal as="li" key={step.title} delay={(i % 3) * 90} className={`group relative ${cell} px-1 py-10 sm:p-8 lg:p-10`}>
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 h-[2px] w-0 bg-amber transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:w-full"
          />
          <div className="flex items-baseline justify-between gap-4">
            <span
              className={`font-display text-5xl font-normal tracking-[-0.01em] transition-colors duration-500 group-hover:text-amber ${
                inverse ? "text-paper/25" : "text-ink/20"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            {"conditional" in step && step.conditional && (
              <span className={`text-label ${inverse ? "text-paper/50" : "text-slate"}`}>Where applicable</span>
            )}
          </div>
          <h3 className="text-title mt-8">{step.title}</h3>
          <p className={`mt-3 ${inverse ? "text-paper/65" : "text-slate"}`}>{step.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}
