import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow } from "@/components/Section";
import { ButtonLink } from "@/components/Button";
import { processSteps } from "@/config/site";

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "The Noxel Apparel B2B workflow: inquiry, requirements, sampling where applicable, production coordination, quality checks and delivery coordination.",
  alternates: { canonical: "/how-we-work" },
};

const stepImages = [
  { src: "/images/blank-tee.jpg", alt: "Plain white t-shirt on a wooden hanger" },
  { src: "/images/pattern-cutting.jpg", alt: "Hands cutting a paper sewing pattern with scissors" },
  { src: "/images/hand-finishing.jpg", alt: "Hands finishing a garment seam with needle and thread" },
  { src: "/images/presser-foot.jpg", alt: "Sewing machine presser foot on fabric" },
  { src: "/images/needle-stitch.jpg", alt: "Close-up of a sewing machine needle and presser foot" },
  { src: "/images/fabric-stacks.jpg", alt: "Stacks of folded fabric ready for packing" },
];

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="A clear path from inquiry to delivery."
        intro="Six stages, one point of contact, and every specification, approval and term confirmed in writing before the next stage begins."
      >
        <ButtonLink href="/contact#quote">Start with an inquiry</ButtonLink>
      </PageHero>

      {/* Stage index */}
      <nav aria-label="Process stages" className="sticky top-[72px] z-30 hidden border-b border-line bg-paper/90 backdrop-blur-md lg:top-20 lg:block">
        <Container>
          <ol className="flex">
            {processSteps.map((s, i) => (
              <li key={s.title} className="flex-1">
                <a
                  href={`#stage-${i + 1}`}
                  className="group flex items-center gap-3 border-r border-line py-4 pl-4 text-sm text-ink/70 transition-colors first:border-l hover:bg-ink hover:text-paper"
                >
                  <span className="text-label text-amber-deep group-hover:text-amber">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </Container>
      </nav>

      <section aria-label="Process stages in detail">
        <Container className="py-16 lg:py-24">
          <ol>
            {processSteps.map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <li
                  key={s.title}
                  id={`stage-${i + 1}`}
                  className="scroll-mt-28 border-b border-line py-16 last:border-b-0 lg:scroll-mt-40 lg:py-24"
                >
                  <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
                    <Reveal className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
                      <figure className="drift relative aspect-[4/3] overflow-hidden bg-mist">
                        <Image
                          src={stepImages[i].src}
                          alt={stepImages[i].alt}
                          fill
                          sizes="(min-width: 1024px) 40vw, 100vw"
                          className="object-cover grayscale"
                        />
                      </figure>
                    </Reveal>
                    <Reveal delay={100} className={`lg:col-span-6 ${flip ? "lg:order-1" : "lg:col-start-7"}`}>
                      <div className="flex items-center gap-4">
                        <span className="font-display text-6xl font-normal tracking-[-0.01em] text-amber lg:text-7xl">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {"conditional" in s && s.conditional && (
                          <span className="text-label border border-line px-2 py-1.5 text-slate">Where applicable</span>
                        )}
                      </div>
                      <h2 className="text-headline mt-6">{s.title}</h2>
                      <p className="text-lede mt-6 text-slate">{s.body}</p>
                      <dl className="mt-10 grid gap-px border-y border-line bg-line sm:grid-cols-2">
                        <div className="bg-paper py-5 sm:pr-6">
                          <dt className="text-label text-slate">You provide</dt>
                          <dd className="mt-3 text-[0.9375rem]">{s.provide}</dd>
                        </div>
                        <div className="bg-paper py-5 sm:pl-6">
                          <dt className="text-label text-amber-deep">You receive</dt>
                          <dd className="mt-3 text-[0.9375rem]">{s.receive}</dd>
                        </div>
                      </dl>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="note-title" className="bg-mist">
        <Container className="py-20 lg:py-28">
          <Reveal className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>A note on timelines</Eyebrow>
            </div>
            <div className="lg:col-span-8">
              <h2 id="note-title" className="text-title !text-[clamp(1.4rem,1.1rem+1vw,2rem)]">
                We don&rsquo;t publish generic lead times — because there aren&rsquo;t any.
              </h2>
              <p className="mt-4 max-w-2xl text-slate">
                Timing depends on product, fabric, quantity, sampling rounds and shipping method. You&rsquo;ll receive a
                realistic schedule for your order once requirements are clear, confirmed in writing.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
