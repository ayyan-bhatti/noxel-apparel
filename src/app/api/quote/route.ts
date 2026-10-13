import { NextResponse } from "next/server";
import { validateAttachment, validateQuote, type QuoteFields } from "@/lib/quote";

export const runtime = "nodejs";

/**
 * Quote request endpoint. Delivers via Resend's REST API.
 *
 * Responses:
 *  200 { ok: true }                          — email accepted by Resend
 *  400 { ok: false, code: "invalid", errors } — validation failed
 *  429 { ok: false, code: "rate_limited" }
 *  503 { ok: false, code: "not_configured" } — RESEND_API_KEY / QUOTE_TO_EMAIL / QUOTE_FROM_EMAIL missing
 *  502 { ok: false, code: "delivery_failed" } — Resend rejected the request
 */

// Best-effort per-instance rate limit (5 requests / 10 min / IP).
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, code: "invalid", errors: {} }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Rejected explicitly — never a fake success.
  if (String(form.get("website") ?? "").trim()) {
    return NextResponse.json({ ok: false, code: "invalid", errors: {} }, { status: 400 });
  }

  const get = (k: string) => String(form.get(k) ?? "").trim();
  const fields: QuoteFields = {
    name: get("name"),
    company: get("company"),
    email: get("email"),
    country: get("country"),
    category: get("category"),
    product: get("product"),
    quantity: get("quantity"),
    timeline: get("timeline"),
    message: get("message"),
  };

  const file = form.get("attachment");
  const upload = file instanceof File && file.size > 0 ? file : null;
  const errors = validateQuote(fields);
  const fileError = validateAttachment(upload);
  if (fileError) errors.attachment = fileError;
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, code: "invalid", errors }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429 });
  }

  const { RESEND_API_KEY, QUOTE_TO_EMAIL, QUOTE_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !QUOTE_TO_EMAIL || !QUOTE_FROM_EMAIL) {
    return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["Name", fields.name],
    ["Company", fields.company],
    ["Business email", fields.email],
    ["Country", fields.country],
    ["Product category", fields.category],
    ["Product requirements", fields.product],
    ["Quantity", fields.quantity],
    ["Timeline", fields.timeline],
    ["Message", fields.message || "—"],
    ["Attachment", upload ? `${upload.name} (${Math.round(upload.size / 1024)} KB)` : "—"],
  ];

  const html = `<h2 style="font-family:Arial,sans-serif">New quote request</h2>
<table cellpadding="8" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="border-bottom:1px solid #eee;color:#555;vertical-align:top"><b>${k}</b></td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${esc(v)}</td></tr>`,
  )
  .join("")}
</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const payload: Record<string, unknown> = {
    from: QUOTE_FROM_EMAIL,
    to: QUOTE_TO_EMAIL.split(",").map((s) => s.trim()),
    reply_to: fields.email,
    subject: `Quote request — ${fields.company} — ${fields.category} (${fields.country})`,
    html,
    text,
  };
  if (upload) {
    const buf = Buffer.from(await upload.arrayBuffer());
    payload.attachments = [{ filename: upload.name, content: buf.toString("base64") }];
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Resend request failed", err);
    return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
