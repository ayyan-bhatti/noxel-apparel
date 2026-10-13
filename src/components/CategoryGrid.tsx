import Image from "next/image";
import Link from "next/link";
import { categories } from "@/config/site";
import { Arrow } from "./Button";
import { Reveal } from "./Reveal";

/** Editorial category cards linking to the matching section of the Capabilities page. */
export function CategoryGrid() {
  return (
    <ul className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {categories.map((c, i) => (
        <Reveal as="li" key={c.slug} delay={i * 80}>
          <Link href={`/capabilities#${c.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-mist sm:aspect-[4/5]">
              <Image
                src={c.image}
                alt={c.imageAlt}
                fill
                sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
              />
              <span className="text-label absolute left-3 top-3 bg-paper px-2 py-1.5 text-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-5 border-t border-line pt-5">
              <h3 className="text-title flex items-start justify-between gap-3">
                {c.title}
                <span className="mt-1 text-amber-deep opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Arrow />
                </span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{c.products.join(" · ")}</p>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
