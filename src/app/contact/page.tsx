import type { Metadata } from "next";
import { Pending } from "@/components/Pending";
import { QuoteForm } from "@/components/QuoteForm";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow } from "@/components/Section";
import { contact, social } from "@/config/site";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a quote from Noxel Apparel. Share your product requirements, quantity and timeline and we'll respond with clear next steps.",
  alternates: { canonical: "/contact" },
};

const expectations = [
  "We review your requirements and come back with any questions needed to quote accurately.",
  "You receive an itemised quotation with terms stated in writing.",
  "Where applicable, we agree sampling before any bulk commitment.",
];

export default function ContactPage() {
  const channels = [
    { label: "Email", value: contact.email, href: contact.email ? `mailto:${contact.email}` : null },
    { label: "Phone", value: contact.phone, href: contact.phone ? `tel:${contact.phone.replace(/[^+\d]/g, "")}` : null },
    { label: "WhatsApp", value: contact.whatsapp, href: contact.whatsapp ? `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}` : null },
    { label: "Address", value: contact.address, href: null },
    { label: "Business hours", value: contact.hours, href: null },
  ];
  const socials = social.filter((s) => s.href);

  return (
    <>
      <section className="border-b border-line">
        <Container className="pt-14 pb-14 lg:pt-24 lg:pb-20">
          <div className="intro-fade">
            <Eyebrow>Contact / Request a quote</Eyebrow>
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
            <h1 className="text-display lg:col-span-8">
              <span className="intro-line">
                <span style={{ ["--d" as string]: "80ms" }}>Let&rsquo;s talk specifics.</span>
              </span>
            </h1>
            <p className="text-lede intro-fade self-end text-slate lg:col-span-4" style={{ ["--d" as string]: "240ms" }}>
              Tell us what you need — product, quantity and timeline. The more detail you share, the more precise our
              response.
            </p>
          </div>
        </Container>
      </section>

      <section id="quote" aria-labelledby="quote-title" className="scroll-mt-20 bg-mist">
        <Container className="py-14 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <aside className="order-2 lg:order-1 lg:col-span-4">
              <Reveal>
                <h2 className="text-title">What happens next</h2>
                <ol className="mt-6 border-t border-ink">
                  {expectations.map((x, i) => (
                    <li key={x} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-line py-5 text-[0.9375rem] text-ink/80">
                      <span className="text-label pt-1 text-amber-deep">{String(i + 1).padStart(2, "0")}</span>
                      {x}
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal delay={100} className="mt-14">
                <h2 className="text-title">Reach us directly</h2>
                <dl className="mt-6 border-t border-ink">
                  {channels.map((c) => (
                    <div key={c.label} className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-4">
                      <dt className="text-label text-slate">{c.label}</dt>
                      <dd className="text-[0.9375rem]">
                        {c.value ? (
                          c.href ? (
                            <a className="link-line" href={c.href}>
                              {c.value}
                            </a>
                          ) : (
                            <span className="whitespace-pre-line">{c.value}</span>
                          )
                        ) : (
                          <Pending />
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
                {socials.length > 0 && (
                  <ul className="mt-6 flex gap-6">
                    {socials.map((s) => (
                      <li key={s.label}>
                        <a className="link-line text-sm" href={s.href!} target="_blank" rel="noopener noreferrer">
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </aside>

            <div className="order-1 lg:order-2 lg:col-span-8">
              <QuoteForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
