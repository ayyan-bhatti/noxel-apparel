import Image from "next/image";
import { ButtonLink } from "./Button";
import { Container, Eyebrow } from "./Section";
import { Reveal } from "./Reveal";

type Props = {
  title?: string;
  body?: string;
};

export function CtaBand({
  title = "Have an idea for your brand?",
  body = "Whether you have a full tech pack or are just thinking about starting a brand, get in touch. We will be your manufacturers and personal consultants, working through development and production with you.",
}: Props) {
  return (
    <section aria-labelledby="cta-title" className="grain relative overflow-hidden bg-ink text-paper">
      <div className="drift absolute inset-y-0 right-0 hidden w-[38%] overflow-hidden opacity-40 lg:block">
        <Image
          src="/images/presser-foot.jpg"
          alt=""
          fill
          sizes="40vw"
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" />
      </div>
      <Container className="relative py-24 lg:py-36">
        <Reveal className="max-w-3xl">
          <Eyebrow inverse>Start an inquiry</Eyebrow>
          <h2 id="cta-title" className="text-display mt-8">
            {title}
          </h2>
          <p className="text-lede mt-8 max-w-xl text-paper/70">{body}</p>
          <div className="mt-12 flex flex-col gap-3 xs:flex-row">
            <ButtonLink href="/contact#quote">Request a Quote</ButtonLink>
            <ButtonLink href="/how-we-work" variant="outline-inverse">
              How we work
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
