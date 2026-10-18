"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { attachment, categories, contact, timelineOptions } from "@/config/site";
import { categoryOptions, fieldLimits, validateAttachment, validateQuote, type QuoteErrors, type QuoteFields } from "@/lib/quote";
import { Button } from "./Button";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; code: "not_configured" | "delivery_failed" | "rate_limited" | "network" | "invalid" };

const empty: QuoteFields = {
  name: "",
  company: "",
  email: "",
  country: "",
  category: "",
  product: "",
  quantity: "",
  timeline: "",
  message: "",
};

const errorCopy: Record<Exclude<Status, { state: "idle" | "submitting" | "success" }>["code"], ReactNode> = {
  not_configured: (
    <>
      <strong className="font-semibold">Quote requests aren&rsquo;t connected yet.</strong> The email delivery service for
      this form has not been configured, so your request was <em>not</em> sent.
      {contact.email ? (
        <>
          {" "}Please email us directly at{" "}
          <a className="underline" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          .
        </>
      ) : null}
    </>
  ),
  delivery_failed: (
    <>
      <strong className="font-semibold">Your request could not be delivered.</strong> Nothing was sent. Please try
      again in a few minutes.
    </>
  ),
  rate_limited: (
    <>
      <strong className="font-semibold">Too many attempts.</strong> Please wait a few minutes before trying again.
    </>
  ),
  network: (
    <>
      <strong className="font-semibold">Connection problem.</strong> We couldn&rsquo;t reach the server and your
      request was not sent. Check your connection and try again.
    </>
  ),
  invalid: (
    <>
      <strong className="font-semibold">Please check the highlighted fields.</strong>
    </>
  ),
};

export function QuoteForm() {
  const [values, setValues] = useState<QuoteFields>(empty);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof QuoteErrors, boolean>>>({});
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Preselect the category when arriving from a category's "Request a quote" link (?category=slug).
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("category");
    const match = categories.find((c) => c.slug === slug);
    if (match) setValues((v) => ({ ...v, category: match.title }));
  }, []);

  const set = (k: keyof QuoteFields, v: string) => {
    const next = { ...values, [k]: v };
    setValues(next);
    if (touched[k]) setErrors((prev) => ({ ...prev, [k]: validateQuote(next)[k] }));
  };
  const blur = (k: keyof QuoteFields) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((prev) => ({ ...prev, [k]: validateQuote(values)[k] }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validateQuote(values);
    const fileErr = validateAttachment(file);
    if (fileErr) errs.attachment = fileErr;
    setErrors(errs);
    setTouched(Object.fromEntries(Object.keys(empty).map((k) => [k, true])));
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus({ state: "submitting" });
    const body = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/quote", { method: "POST", body });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; errors?: QuoteErrors };
      if (res.ok && data.ok) {
        setStatus({ state: "success" });
        setValues(empty);
        setFile(null);
        formRef.current?.reset();
      } else {
        if (data.errors) setErrors(data.errors);
        const code = (data.code as Extract<Status, { state: "error" }>["code"]) ?? "delivery_failed";
        setStatus({ state: "error", code: code in errorCopy ? code : "delivery_failed" });
      }
    } catch {
      setStatus({ state: "error", code: "network" });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (status.state === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-ink bg-paper p-8 outline-none sm:p-12">
        <p className="text-label text-amber-deep">Request received</p>
        <h3 className="text-headline mt-6 !text-[clamp(1.8rem,1.4rem+1.4vw,2.6rem)]">Thank you. Your request was sent.</h3>
        <p className="mt-4 max-w-md text-slate">
          A member of the team will review your requirements and reply to the email address you provided.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="link-line mt-8 font-medium"
        >
          Send another request
        </button>
      </div>
    );
  }

  const submitting = status.state === "submitting";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="form-note" className="bg-paper p-6 sm:p-10 lg:p-12">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ink pb-6">
        <h2 id="quote-title" className="text-title !text-2xl">
          Request a quote
        </h2>
        <p id="form-note" className="text-sm text-slate">
          Only your name and email address are required.
        </p>
      </div>

      <p className="mt-6 max-w-xl text-slate">Just have an idea? Tell us what you have in mind. Photos, sketches, tech packs and production details are optional. We can work through the rest together.</p>

      <div className="mt-8 grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <Field id="name" label="Full name" required error={errors.name}>
          <input {...inputProps("name", values, set, blur, errors)} autoComplete="name" />
        </Field>
        <Field id="company" label="Company" error={errors.company}>
          <input {...inputProps("company", values, set, blur, errors)} autoComplete="organization" />
        </Field>
        <Field id="email" label="Email address" required error={errors.email}>
          <input {...inputProps("email", values, set, blur, errors)} type="email" autoComplete="email" inputMode="email" />
        </Field>
        <Field id="country" label="Country" error={errors.country}>
          <input {...inputProps("country", values, set, blur, errors)} autoComplete="country-name" />
        </Field>
        <Field id="category" label="Product category" error={errors.category} className="sm:col-span-2">
          <Select
            id="category"
            value={values.category}
            placeholder="Select a category"
            options={categoryOptions}
            invalid={!!errors.category}
            onChange={(v) => set("category", v)}
            onBlur={() => blur("category")}
          />
        </Field>
        <Field id="product" label="Product requirements" error={errors.product} className="sm:col-span-2" hint="Garment type, fabric, styles or colourways, whatever you know so far.">
          <input {...inputProps("product", values, set, blur, errors)} placeholder="e.g. Heavyweight hoodies, 3 colourways, private label" />
        </Field>
        <Field id="quantity" label="Quantity" error={errors.quantity} hint="Approximate total, or per style.">
          <input {...inputProps("quantity", values, set, blur, errors)} placeholder="e.g. 1,500 pcs" />
        </Field>
        <Field id="timeline" label="Timeline" error={errors.timeline}>
          <Select
            id="timeline"
            value={values.timeline}
            placeholder="Select a timeline"
            options={timelineOptions}
            invalid={!!errors.timeline}
            onChange={(v) => set("timeline", v)}
            onBlur={() => blur("timeline")}
          />
        </Field>
        <Field id="message" label="Message" error={errors.message} className="sm:col-span-2" hint="Tell us about your idea or ask for help getting your brand started.">
          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={fieldLimits.message}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            onBlur={() => blur("message")}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : "message-hint"}
            className={`${inputClass(!!errors.message)} min-h-32 resize-y py-3`}
          />
        </Field>

        <Field id="attachment" label="Attachment" error={errors.attachment} className="sm:col-span-2" hint={`Optional, tech pack, reference images or spreadsheet. ${attachment.accept.join(" ")} · max ${attachment.maxBytes / 1024 / 1024} MB.`}>
          <label
            htmlFor="attachment"
            className={`flex min-h-14 cursor-pointer items-center justify-between gap-4 border border-dashed px-4 py-3 transition-colors hover:border-ink focus-within:border-ink ${
              errors.attachment ? "border-red-700" : "border-ink/30"
            }`}
          >
            <span className={`truncate text-[0.9375rem] ${file ? "text-ink" : "text-ink/50"}`}>
              {file ? file.name : "Choose a file"}
            </span>
            <span className="text-label shrink-0 text-ink">Browse</span>
            <input
              id="attachment"
              name="attachment"
              type="file"
              accept={attachment.accept.join(",")}
              className="sr-only"
              aria-invalid={!!errors.attachment}
              aria-describedby={errors.attachment ? "attachment-error" : "attachment-hint"}
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setFile(f);
                setErrors((prev) => ({ ...prev, attachment: validateAttachment(f) }));
              }}
            />
          </label>
        </Field>

        {/* Honeypot, hidden from people and assistive tech */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {status.state === "error" && (
          <div role="alert" className="mt-8 border-l-2 border-red-700 bg-red-50 px-5 py-4 text-[0.9375rem] text-red-900">
            {errorCopy[status.code]}
          </div>
        )}
      </div>

      <div className="mt-10 flex flex-col-reverse gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm text-slate">
          Your details are used only to respond to this inquiry.
        </p>
        <Button type="submit" disabled={submitting} aria-busy={submitting} className="sm:min-w-56">
          {submitting ? "Sending…" : "Send request"}
        </Button>
      </div>
    </form>
  );
}

function Select({
  id,
  value,
  placeholder,
  options,
  invalid,
  onChange,
  onBlur,
}: {
  id: string;
  value: string;
  placeholder: string;
  options: readonly string[];
  invalid: boolean;
  onChange: (v: string) => void;
  onBlur: () => void;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={invalid}
        aria-describedby={invalid ? `${id}-error` : undefined}
        className={`${inputClass(invalid)} appearance-none pr-10 ${value ? "" : "text-ink/45"}`}
      >
        <option value="">
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="text-ink">
            {o}
          </option>
        ))}
      </select>
      <svg aria-hidden="true" viewBox="0 0 16 16" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 6l5 5 5-5" />
      </svg>
    </div>
  );
}

function inputClass(invalid: boolean) {
  return `block w-full min-h-12 border bg-transparent px-4 text-[0.9375rem] text-ink placeholder:text-ink/40 transition-colors outline-none focus:border-ink focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-amber ${
    invalid ? "border-red-700" : "border-ink/25 hover:border-ink/50"
  }`;
}

function inputProps(
  k: keyof QuoteFields,
  values: QuoteFields,
  set: (k: keyof QuoteFields, v: string) => void,
  blur: (k: keyof QuoteFields) => void,
  errors: QuoteErrors,
) {
  return {
    id: k,
    name: k,
    type: "text",
    value: values[k],
    maxLength: fieldLimits[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => set(k, e.target.value),
    onBlur: () => blur(k),
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${k}-error` : `${k}-hint`,
    required: k === "name" || k === "email",
    className: inputClass(!!errors[k]),
  };
}

function Field({
  id,
  label,
  required,
  error,
  hint,
  className = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2.5 block text-sm font-medium text-ink">
        {label}
        {required && (
          <span className="text-amber-deep" aria-hidden="true">
            {" "}*
          </span>
        )}
        {!required && <span className="font-normal text-slate"> (optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-700">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-sm text-slate">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
