/** Shared quote-request validation — used by the form (client) and /api/quote (server). */

import { attachment, categories, timelineOptions } from "@/config/site";

export const multipleCategories = "Multiple categories / not sure yet";
export const categoryOptions = [...categories.map((c) => c.title), multipleCategories];

export type QuoteFields = {
  name: string;
  company: string;
  email: string;
  country: string;
  category: string;
  product: string;
  quantity: string;
  timeline: string;
  message: string;
};

export type QuoteErrors = Partial<Record<keyof QuoteFields | "attachment", string>>;

export const fieldLimits: Record<keyof QuoteFields, number> = {
  name: 120,
  company: 160,
  email: 200,
  country: 80,
  category: 80,
  product: 300,
  quantity: 80,
  timeline: 60,
  message: 4000,
};

// Common free-mail domains — buyers are asked for a business address.
const freeMail = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com",
  "aol.com", "icloud.com", "me.com", "proton.me", "protonmail.com", "gmx.com", "mail.com", "yandex.com",
]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateQuote(f: QuoteFields): QuoteErrors {
  const e: QuoteErrors = {};
  const req = (k: keyof QuoteFields, msg: string) => {
    if (!f[k].trim()) e[k] = msg;
  };

  req("name", "Please enter your full name.");
  req("company", "Please enter your company name.");
  req("country", "Please enter your country.");
  req("category", "Please choose a product category.");
  req("product", "Tell us what product(s) you need.");
  req("quantity", "Please give an approximate quantity.");
  req("timeline", "Please choose a timeline.");

  const email = f.email.trim().toLowerCase();
  if (!email) e.email = "Please enter your business email.";
  else if (!emailPattern.test(email)) e.email = "Please enter a valid email address.";
  else if (freeMail.has(email.split("@")[1])) e.email = "Please use your business email address.";

  if (f.category && !categoryOptions.includes(f.category)) e.category = "Please choose a product category.";
  if (f.timeline && !(timelineOptions as readonly string[]).includes(f.timeline)) e.timeline = "Please choose a timeline.";

  for (const k of Object.keys(fieldLimits) as (keyof QuoteFields)[]) {
    if (f[k].length > fieldLimits[k]) e[k] = `Please keep this under ${fieldLimits[k]} characters.`;
  }
  return e;
}

export function validateAttachment(file: { name: string; size: number } | null): string | undefined {
  if (!file || file.size === 0) return undefined;
  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  if (!attachment.accept.includes(ext)) return `Unsupported file type. Allowed: ${attachment.accept.join(", ")}`;
  if (file.size > attachment.maxBytes) return `File is too large. Maximum ${attachment.maxBytes / 1024 / 1024} MB.`;
  return undefined;
}
