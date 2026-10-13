import Image from "next/image";
import type { ReactNode } from "react";
import { Container, Eyebrow } from "./Section";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  image?: { src: string; alt: string };
  children?: ReactNode;
};

/** Inner-page hero: oversized headline with an editorial image band beneath. */
export function PageHero({ eyebrow, title, intro, image, children }: Props) {
  return (
    <section className="border-b border-line">
      <Container className="pt-14 pb-16 lg:pt-24 lg:pb-24">
        <div className="intro-fade">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <h1 className="text-display lg:col-span-8">
            <span className="intro-line">
              <span style={{ ["--d" as string]: "80ms" }}>{title}</span>
            </span>
          </h1>
          <div className="intro-fade self-end lg:col-span-4" style={{ ["--d" as string]: "260ms" }}>
            <p className="text-lede text-slate">{intro}</p>
            {children && <div className="mt-8">{children}</div>}
          </div>
        </div>
      </Container>
      {image && (
        <div className="intro-wipe drift relative h-[42vh] min-h-[280px] overflow-hidden bg-mist lg:h-[56vh]" style={{ ["--d" as string]: "200ms" }}>
          <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover grayscale" />
        </div>
      )}
    </section>
  );
}
