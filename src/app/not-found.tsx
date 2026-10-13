import { ButtonLink } from "@/components/Button";
import { Container, Eyebrow } from "@/components/Section";

export default function NotFound() {
  return (
    <section>
      <Container className="flex min-h-[70svh] flex-col justify-center py-24">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="text-display mt-8 max-w-4xl">This page isn&rsquo;t in production.</h1>
        <p className="text-lede mt-8 max-w-xl text-slate">
          The page you were looking for doesn&rsquo;t exist or has moved.
        </p>
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <ButtonLink href="/" variant="ink">
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact#quote" variant="outline">
            Request a Quote
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
