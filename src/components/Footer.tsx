import Link from "next/link";
import { categories, contact, nav, site, social } from "@/config/site";
import { Container } from "./Section";
import { LogoArtwork } from "./Logo";
import { Pending } from "./Pending";

export function Footer() {
  const socials = social.filter((s) => s.href);
  const hasContact = contact.email || contact.phone || contact.address;

  return (
    <footer className="bg-ink text-paper">
      <Container className="pt-20 pb-10 lg:pt-28">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" aria-label="Noxel Apparel, home" className="inline-block">
              <LogoArtwork />
            </Link>
            <p className="mt-8 max-w-sm text-paper/60">{site.description}</p>
          </div>

          <nav aria-label="Products" className="lg:col-span-3">
            <p className="text-label text-paper/40">Products</p>
            <ul className="mt-6 space-y-3">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/capabilities#${c.slug}`} className="link-line text-paper/80 hover:text-paper">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer" className="lg:col-span-2">
            <p className="text-label text-paper/40">Navigate</p>
            <ul className="mt-6 space-y-3">
              {[{ href: "/", label: "Home" }, ...nav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-line text-paper/80 hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact#quote" className="link-line text-amber">
                  Request a Quote
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="text-label text-paper/40">Contact</p>
            {hasContact ? (
              <ul className="mt-6 space-y-3 text-paper/80">
                {contact.email && (
                  <li>
                    <a className="link-line hover:text-paper" href={`mailto:${contact.email}`}>
                      {contact.email}
                    </a>
                  </li>
                )}
                {contact.phone && (
                  <li>
                    <a className="link-line hover:text-paper" href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}>
                      {contact.phone}
                    </a>
                  </li>
                )}
                {contact.address && <li className="whitespace-pre-line">{contact.address}</li>}
              </ul>
            ) : (
              <div className="mt-6 space-y-3">
                <Pending inverse label="Contact details to be confirmed" />
                <p className="max-w-xs text-sm text-paper/50">
                  Use the quote form to share your idea or ask about an order.
                </p>
              </div>
            )}
            {socials.length > 0 && (
              <ul className="mt-8 flex gap-6">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href!} className="link-line text-sm text-paper/70 hover:text-paper" rel="noopener noreferrer" target="_blank">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="logo-mask mt-20 aspect-[4.2/1] w-full text-paper/[0.06] lg:mt-28"
          style={{ maskImage: "url(/brand/noxel-wordmark.png)", WebkitMaskImage: "url(/brand/noxel-wordmark.png)", maskPosition: "center", WebkitMaskPosition: "center" }}
        />

        <div className="mt-10 flex flex-col gap-4 border-t border-line-inverse pt-8 text-sm text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-label !tracking-[0.32em]">{site.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
