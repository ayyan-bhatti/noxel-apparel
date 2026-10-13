import Image from "next/image";
import Link from "next/link";
import { ButtonLink, Arrow } from "@/components/Button";
import { CategoryGrid } from "@/components/CategoryGrid";
import { CtaBand } from "@/components/CtaBand";
import { Pending } from "@/components/Pending";
import { ProcessList } from "@/components/ProcessList";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow, SectionHeading } from "@/components/Section";
import { commercialTerms, principles, site } from "@/config/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <StartingPoints />
      <Capabilities />
      <Process />
      <QualityApproach />
      <StatedUpfront />
      <CtaBand />
    </>
  );
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <Container className="grid gap-12 pt-10 pb-16 lg:min-h-[calc(100svh-80px)] lg:grid-cols-12 lg:gap-12 lg:pt-16 lg:pb-14">
        <div className="flex flex-col justify-between gap-12 lg:col-span-7">
          <div>
            <div className="intro-fade">
              <Eyebrow>B2B Apparel Sourcing &amp; Manufacturing</Eyebrow>
            </div>
            <h1 id="hero-title" className="text-display mt-8 lg:mt-12">
              <span className="intro-line">
                <span style={{ ["--d" as string]: "60ms" }}>Made for Brands.</span>
              </span>
              <span className="intro-line">
                <span style={{ ["--d" as string]: "180ms" }}>
                  Built for Scale<span className="text-amber">.</span>
                </span>
              </span>
            </h1>
            <p className="text-lede intro-fade mt-8 max-w-xl text-slate lg:mt-10" style={{ ["--d" as string]: "380ms" }}>
              Noxel Apparel works with brands and bulk buyers to source and produce apparel to their specification —
              with one accountable point of contact and clear communication from first inquiry onward.
            </p>
            <div className="intro-fade mt-10 flex flex-col gap-3 xs:flex-row" style={{ ["--d" as string]: "480ms" }}>
              <ButtonLink href="/contact#quote">Request a Quote</ButtonLink>
              <ButtonLink href="/how-we-work" variant="outline">
                See how we work
              </ButtonLink>
            </div>
          </div>

          <ul
            className="intro-fade grid grid-cols-2 gap-px border-y border-line bg-line sm:grid-cols-4"
            style={{ ["--d" as string]: "620ms" }}
          >
            {["Specification first", "One point of contact", "Itemised quotations", "Terms in writing"].map(
              (item, i) => (
                <li key={item} className="bg-paper py-4 pr-3 pl-4 text-sm text-ink/75 odd:pl-0 sm:py-5 sm:odd:pl-4 sm:first:pl-0">
                  <span className="text-label mb-2 block text-amber-deep">{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="intro-wipe relative lg:col-span-5" style={{ ["--d" as string]: "120ms" }}>
          <div className="drift relative aspect-[4/5] h-full w-full overflow-hidden bg-ink lg:aspect-auto">
            <Image
              src="/images/needle-stitch.jpg"
              alt="Close-up of a sewing machine needle and presser foot"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-paper sm:p-7">
              <p className="text-label !tracking-[0.36em]">{site.tagline}</p>
              <span className="text-label text-paper/60">N° 01</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Introduction() {
  return (
    <section aria-labelledby="intro-title" className="border-t border-line">
      <Container className="py-24 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <Eyebrow index="01">Who we are</Eyebrow>
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal>
              <h2 id="intro-title" className="font-display text-[clamp(1.75rem,1.1rem+2.6vw,3.4rem)] font-normal leading-[1.08] tracking-[-0.01em]">
                A sourcing and manufacturing partner for apparel brands and bulk buyers —{" "}
                <span className="text-slate">not a retail label.</span> Our job is to turn your requirements into
                production you can rely on, order after order.
              </h2>
            </Reveal>
            <div className="mt-16 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:mt-20">
              <Reveal>
                <h3 className="text-title">For brands</h3>
                <p className="mt-3 text-slate">
                  Bring a tech pack, a reference garment or a brief. We work to your specification and your branding,
                  and keep you informed at every stage.
                </p>
              </Reveal>
              <Reveal delay={100}>
                <h3 className="text-title">For bulk buyers</h3>
                <p className="mt-3 text-slate">
                  Clear quotations, agreed specifications and coordinated delivery — so volume orders arrive as
                  approved, with fewer surprises along the way.
                </p>
              </Reveal>
            </div>
            <Reveal className="mt-12">
              <Link href="/about" className="group inline-flex items-center gap-3 font-medium">
                <span className="link-line">More about Noxel</span>
                <Arrow />
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* Editorial image pair — visual transition into capabilities */}
      <Container className="pb-24 lg:pb-36">
        <div className="grid gap-4 sm:grid-cols-12 sm:gap-6">
          <Reveal className="sm:col-span-7">
            <figure className="drift relative aspect-[4/3] overflow-hidden bg-mist">
              <Image
                src="/images/fabric-stacks.jpg"
                alt="Stacks of folded fabric in assorted colours and weights"
                fill
                sizes="(min-width: 640px) 58vw, 100vw"
                className="object-cover grayscale"
              />
            </figure>
          </Reveal>
          <Reveal delay={120} className="sm:col-span-5 sm:mt-24">
            <figure className="drift relative aspect-[4/5] overflow-hidden bg-mist">
              <Image
                src="/images/pattern-cutting.jpg"
                alt="Hands cutting a paper sewing pattern with scissors"
                fill
                sizes="(min-width: 640px) 42vw, 100vw"
                className="object-cover grayscale"
              />
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function StartingPoints() {
  const paths = [
    {
      label: "Path one",
      title: "You have a tech pack",
      body: "Send your tech pack, size chart and branding files. We review them, raise any open questions, and return an itemised quotation against your specification.",
      points: ["Your specification and private label", "Questions raised before costing, not after", "Quotation itemised line by line"],
      dark: false,
    },
    {
      label: "Path two",
      title: "You have a brief",
      body: "Start from a reference garment, a sketch or a written idea. We work through fabric, construction and finishing with you until the specification is clear enough to quote.",
      points: ["Reference garment, sketch or description", "Specification developed together", "Sampling where the product calls for it"],
      dark: true,
    },
  ];

  return (
    <section aria-labelledby="paths-title" className="bg-mist">
      <Container className="pt-24 lg:pt-32">
        <SectionHeading
          index="02"
          eyebrow="Two ways to start"
          id="paths-title"
          title="Wherever your product is today, the next step is clear."
          intro="Some buyers arrive with a full specification. Others arrive with an idea. Both start the same way: a conversation about what you actually need."
        />
      </Container>
      <Container className="pt-14 pb-24 lg:pt-20 lg:pb-32">
        <div className="grid lg:grid-cols-2">
          {paths.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <article
                className={`flex h-full flex-col justify-between gap-12 p-8 sm:p-12 lg:p-14 ${
                  p.dark ? "grain bg-ink text-paper" : "bg-paper text-ink"
                }`}
              >
                <div>
                  <p className={`text-label ${p.dark ? "text-amber" : "text-amber-deep"}`}>{p.label}</p>
                  <h3 className="text-headline mt-6 !text-[clamp(1.9rem,1.4rem+1.6vw,2.9rem)]">{p.title}</h3>
                  <p className={`mt-5 max-w-md ${p.dark ? "text-paper/70" : "text-slate"}`}>{p.body}</p>
                </div>
                <div>
                  <ul className={`border-t ${p.dark ? "border-line-inverse" : "border-line"}`}>
                    {p.points.map((pt) => (
                      <li
                        key={pt}
                        className={`flex items-center gap-4 border-b py-3.5 text-[0.9375rem] ${
                          p.dark ? "border-line-inverse text-paper/85" : "border-line text-ink/85"
                        }`}
                      >
                        <span aria-hidden="true" className="h-px w-4 bg-amber" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10">
                    <ButtonLink href="/contact#quote" variant={p.dark ? "amber" : "ink"}>
                      {p.dark ? "Share your brief" : "Send your tech pack"}
                    </ButtonLink>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Capabilities() {
  return (
    <section aria-labelledby="cap-title">
      <Container className="py-24 lg:py-36">
        <SectionHeading
          index="03"
          eyebrow="Capabilities"
          id="cap-title"
          title="Five categories, built to your specification."
          intro="From hoodies and bomber jackets to leggings, cargo pants and medical uniforms — every category runs through the same specification, sampling and quality process."
        />
        <div className="mt-16 lg:mt-20">
          <CategoryGrid />
        </div>
        <Reveal className="mt-14 flex justify-start">
          <ButtonLink href="/capabilities" variant="outline">
            Explore capabilities
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}

function Process() {
  return (
    <section aria-labelledby="process-title" className="border-t border-line">
      <Container className="py-24 lg:py-36">
        <SectionHeading
          index="04"
          eyebrow="How we work"
          id="process-title"
          title="Six stages. One accountable partner."
          intro="A straightforward workflow from first inquiry to delivery coordination — with every specification, approval and term confirmed in writing."
        />
        <div className="mt-16 lg:mt-20">
          <ProcessList />
        </div>
        <Reveal className="mt-12">
          <Link href="/how-we-work" className="group inline-flex items-center gap-3 font-medium">
            <span className="link-line">The full process, stage by stage</span>
            <Arrow />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

function QualityApproach() {
  const checkpoints = [
    {
      title: "The approved sample is the reference",
      body: "Production is measured against what you signed off — fabric, colour, fit, trims and finish.",
    },
    {
      title: "Checks happen during production",
      body: "Issues are cheapest to fix early, so quality is reviewed while goods are being made, not only at the end.",
    },
    {
      title: "Findings are shared before release",
      body: "Inspection approach and reporting are agreed with you per order, and results are shared before goods ship.",
    },
  ];
  return (
    <section aria-labelledby="quality-title" className="grain bg-ink text-paper">
      <Container className="py-24 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <figure className="drift relative aspect-[4/5] overflow-hidden bg-navy">
              <Image
                src="/images/machine-detail.jpg"
                alt="Industrial sewing machine presser foot and needle plate"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover grayscale"
              />
            </figure>
          </Reveal>
          <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
            <Reveal>
              <Eyebrow index="05" inverse>
                Quality approach
              </Eyebrow>
              <h2 id="quality-title" className="text-headline mt-6">
                Precision isn&rsquo;t a slogan. It&rsquo;s a checklist.
              </h2>
            </Reveal>
            <ol className="mt-12 border-t border-line-inverse">
              {checkpoints.map((c, i) => (
                <Reveal as="li" key={c.title} delay={i * 100} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line-inverse py-7">
                  <span className="text-label pt-1.5 text-amber">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-title">{c.title}</h3>
                    <p className="mt-2 text-paper/65">{c.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StatedUpfront() {
  return (
    <section aria-labelledby="terms-title">
      <Container className="py-24 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow index="06">Stated upfront</Eyebrow>
              <h2 id="terms-title" className="text-headline mt-6">
                What serious buyers check first.
              </h2>
              <p className="text-lede mt-6 text-slate">
                We would rather state terms plainly than make claims we can&rsquo;t support. Every figure here is
                confirmed in writing on your quotation.
              </p>
            </Reveal>
            <div className="mt-10 flex flex-wrap gap-3">
              {principles.slice(2).map((p) => (
                <span key={p.title} className="border border-line px-3 py-2 text-sm text-ink/75">
                  {p.title}
                </span>
              ))}
            </div>
          </div>
          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
            <dl className="border-t border-ink">
              {commercialTerms.map((t) => (
                <div key={t.label} className="grid gap-3 border-b border-line py-6 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-8">
                  <div>
                    <dt className="font-display text-lg font-normal tracking-[-0.01em]">{t.label}</dt>
                    <p className="mt-1 text-sm text-slate">{t.note}</p>
                  </div>
                  <dd className="sm:text-right">{t.value ?? <Pending />}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
