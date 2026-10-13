/**
 * Visible marker for information the client has not yet confirmed.
 * Intentionally obvious so it is never mistaken for real content.
 */
export function Pending({ label = "To be confirmed", inverse = false }: { label?: string; inverse?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 border border-dashed px-2 py-1 text-label !tracking-[0.18em] ${
        inverse ? "border-amber/60 text-amber" : "border-amber-deep/50 text-amber-deep"
      }`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
