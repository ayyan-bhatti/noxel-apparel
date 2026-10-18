import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Pending } from "@/components/Pending";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow, SectionHeading } from "@/components/Section";
import { ButtonLink } from "@/components/Button";
import { categories } from "@/config/site";

export const metadata: Metadata = {
  title: "Products & Capabilities",
  description:
    "Casual & streetwear, outerwear, activewear & intimates, bottoms, and workwear & uniforms, produced to your specification by Noxel Apparel for brands and bulk buyers.",
  alternates: { canonical: "/capabilities" },
};

const inputs = [
  { title: "Reference photos or an idea", body: "Show us an inspiration photo or describe what you imagine. We help you find a starting point, even if you are new to building a brand." },
  { title: "Tech pack", body: "Full specification with measurements, materials, construction and artwork." },
  { title: "Reference garment", body: "An existing piece to match, adapt or improve on." },
  { title: "Sketch or brief", body: "A design direction we can develop into a workable specification with you." },
];

/** Options the client still needs to confirm. Shown as a checklist, not as claims. */
const options = [
  "Private label & neck labels",
  "Woven labels, hang tags & trims",
  "Printing methods",
  "Embroidery",
  "Custom packaging",
  "Size range & grading",
  "Fabric development",
  "Small batch and trial runs",
];

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Products & capabilities"
        title="Made to your specification."
        intro="Five product categories, from streetwear basics to medical uniforms. Every one runs through the same specification, sampling and quality process."
        image={{ src: "/images/stitch-closeup.jpg", alt: "Embroidery needle stitching white thread into dark fabric" }}
      >
        <ButtonLink href="/contact#quote">Request a Quote</ButtonLink>
      </PageHero>

      <section aria-labelledby="categories-title">
        <Container className="pt-24 lg:pt-36">
          <SectionHeading
            index="01"
            eyebrow="Product categories"
            id="categories-title"
            title="The range."
            intro="Have a product that isn't listed? Get in touch and we will let you know whether we can help."
          />
          <nav aria-label="Categories" className="mt-12 flex flex-wrap gap-2 lg:mt-16">
            {categories.map((c, i) => (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className="border border-line px-4 py-2.5 text-sm text-ink/80 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                <span className="text-label mr-2 text-amber-deep">{String(i + 1).padStart(2, "0")}</span>
                {c.title}
              </a>
            ))}
          </nav>
        </Container>
        <Container className="pb-24 lg:pb-36">
          <ol>
            {categories.map((c, i) => {
              const flip = i % 2 === 1;
              return (
                <li key={c.slug} id={c.slug} className="scroll-mt-24 border-b border-line py-16 last:border-b-0 lg:py-24">
                  <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
                    <Reveal className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
                      <figure className="relative aspect-[4/5] overflow-hidden bg-mist">
                        <Image src={c.image} alt={c.imageAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                      </figure>
                    </Reveal>
                    <Reveal delay={100} className={`lg:col-span-6 ${flip ? "lg:order-1" : "lg:col-start-7"}`}>
                      <p className="text-label text-amber-deep">Category {String(i + 1).padStart(2, "0")}</p>
                      <h2 className="text-headline mt-5">{c.title}</h2>
                      <ul className="mt-10 grid border-t border-ink sm:grid-cols-2 sm:gap-x-8">
                        {c.products.map((p) => (
                          <li key={p} className="flex items-center gap-4 border-b border-line py-4 text-[0.9375rem]">
                            <span aria-hidden="true" className="h-px w-4 bg-amber" />
                            {p}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-10">
                        <ButtonLink href={`/contact?category=${c.slug}#quote`} variant="ink">
                          Request a quote
                        </ButtonLink>
                      </div>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="inputs-title" className="bg-mist">
        <Container className="py-24 lg:py-36">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow index="02">Development &amp; prototyping</Eyebrow>
                <h2 id="inputs-title" className="text-headline mt-6">
                  Start with whatever you have.
                </h2>
                <p className="text-lede mt-6 text-slate">
                  We manufacture from reference photos, hand sketches and full technical packs (tech packs). Our development
                  support includes design mapping, custom pattern styling and fit adjustments. As your manufacturers
                  and personal consultants, we work through each decision with you, from your first idea to production.
                </p>
              </Reveal>
              <Reveal delay={120} className="mt-12 hidden lg:block">
                <figure className="drift relative aspect-[3/2] overflow-hidden bg-paper">
                  <Image
                    src="/images/pattern-cutting.jpg"
                    alt="Hands cutting a paper sewing pattern with scissors"
                    fill
                    sizes="40vw"
                    className="object-cover grayscale"
                  />
                </figure>
              </Reveal>
            </div>
            <ol className="border-t border-ink lg:col-span-6 lg:col-start-7">
              {inputs.map((x, i) => (
                <Reveal as="li" key={x.title} delay={i * 90} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-9">
                  <span className="text-label pt-2 text-amber-deep">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-title">{x.title}</h3>
                    <p className="mt-2 text-slate">{x.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section aria-labelledby="options-title">
        <Container className="py-24 lg:py-36">
          <SectionHeading
            index="03"
            eyebrow="Customisation & branding"
            id="options-title"
            title="Options under confirmation."
            intro="These are the customisation areas buyers ask about most. Each will be confirmed as available, or removed, before launch."
          />
          <Reveal className="mt-16 lg:mt-20">
            <ul className="grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {options.map((o) => (
                <li key={o} className="flex min-h-36 flex-col justify-between gap-6 bg-paper py-6 sm:p-6">
                  <span className="font-display text-lg font-normal tracking-[-0.01em]">{o}</span>
                  <Pending />
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <CtaBand title="Have a product in mind?" />
    </>
  );
}
