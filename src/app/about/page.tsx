import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Pending } from "@/components/Pending";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow, SectionHeading } from "@/components/Section";
import { companyFacts, principles } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Noxel Apparel is a B2B apparel sourcing and manufacturing partner for brands and bulk buyers. Learn how we work and what we stand for.",
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Precision", body: "Specifications are written down, checked and followed. Details are where garments succeed or fail." },
  { title: "Transparency", body: "Costs are itemised and terms are stated in writing. You should never have to guess what you are paying for." },
  { title: "Accountability", body: "One contact owns your order. When something needs attention, you hear about it from us first." },
  { title: "Partnership", body: "We measure success by whether you reorder, which means getting the first order right." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Noxel Apparel"
        title="Built around the buyer."
        intro="Noxel Apparel exists to make apparel sourcing and production dependable for brands and bulk buyers through clear specifications, honest communication and one accountable partner."
        image={{ src: "/images/machine-detail.jpg", alt: "Detail of an industrial sewing machine presser foot and needle plate" }}
      />

      <section aria-labelledby="positioning-title">
        <Container className="py-24 lg:py-36">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-3">
              <Eyebrow index="01">Positioning</Eyebrow>
            </Reveal>
            <div className="space-y-14 lg:col-span-9">
              <Reveal>
                <h2 id="positioning-title" className="font-display text-[clamp(1.75rem,1.1rem+2.6vw,3.4rem)] font-normal leading-[1.08] tracking-[-0.01em]">
                  We are a B2B partner. We don&rsquo;t sell to consumers, and we don&rsquo;t compete with the brands we
                  produce for.
                </h2>
              </Reveal>
              <div className="grid gap-10 sm:grid-cols-2">
                <Reveal>
                  <h3 className="text-title">What we do</h3>
                  <p className="mt-3 text-slate">
                    We help brands and bulk buyers source and produce apparel to their specification, from clarifying
                    requirements and quoting, through sampling where applicable, to production coordination, quality
                    checks and delivery coordination. We also act as personal consultants for new founders, helping you work through the decisions involved in starting your brand.
                  </p>
                </Reveal>
                <Reveal delay={100}>
                  <h3 className="text-title">Who we work with</h3>
                  <p className="mt-3 text-slate">
                    First time founders with an idea, apparel brands developing or scaling their ranges, and organisations buying apparel in volume who
                    need consistency, clear terms and a partner who answers the phone.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="approach-title" className="bg-mist">
        <Container className="py-24 lg:py-36">
          <SectionHeading
            index="02"
            eyebrow="Working approach"
            id="approach-title"
            title="How we behave on every order."
            intro="These principles shape how we quote, communicate and coordinate, regardless of order size."
          />
          <ul className="mt-16 grid gap-px bg-line sm:grid-cols-2 lg:mt-20">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 2) * 100} className="bg-mist py-10 sm:py-12 sm:odd:pr-10 sm:even:pl-10 lg:odd:pr-12 lg:even:pl-12">
                <span className="text-label text-amber-deep">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-title mt-6">{p.title}</h3>
                <p className="mt-3 max-w-md text-slate">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="values-title">
        <Container className="py-24 lg:py-36">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow index="03">Values</Eyebrow>
                <h2 id="values-title" className="text-headline mt-6">
                  Precision in what we make and how we work.
                </h2>
              </Reveal>
              <Reveal delay={120} className="mt-12">
                <figure className="drift relative aspect-[4/5] overflow-hidden bg-mist">
                  <Image
                    src="/images/hand-finishing.jpg"
                    alt="Hands finishing a garment seam with needle and thread"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover grayscale"
                  />
                </figure>
              </Reveal>
            </div>
            <dl className="border-t border-ink lg:col-span-6 lg:col-start-7">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 80} className="grid gap-3 border-b border-line py-10 sm:grid-cols-[10rem_1fr] sm:gap-8">
                  <dt className="font-display text-2xl font-normal tracking-[-0.01em]">{v.title}</dt>
                  <dd className="text-slate">{v.body}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section aria-labelledby="facts-title" className="border-t border-line">
        <Container className="py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <Eyebrow index="04">Company facts</Eyebrow>
              <h2 id="facts-title" className="text-headline mt-6">
                The essentials.
              </h2>
              <p className="mt-6 max-w-md text-slate">
                Facts are published here only once verified. Until then, they are clearly marked.
              </p>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
              <dl className="grid gap-px bg-line sm:grid-cols-2">
                {companyFacts.map((f) => (
                  <div key={f.label} className="bg-paper py-6 sm:p-6">
                    <dt className="text-label text-slate">{f.label}</dt>
                    <dd className="mt-4 font-display text-xl font-normal tracking-[-0.01em]">{f.value ?? <Pending />}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand title="Let's build your next order properly." />
    </>
  );
}
