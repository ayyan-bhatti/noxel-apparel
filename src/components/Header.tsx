"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/config/site";
import { Logo } from "./Logo";
import { ButtonLink } from "./Button";
import { Container } from "./Section";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setOpen(false), [pathname]);

  // Lock scroll, handle Escape, keep focus inside the open menu
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = [toggleRef.current, ...Array.from(panel.querySelectorAll<HTMLElement>("a"))].filter(
        Boolean,
      ) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,color] duration-500 ${
        open
          ? "border-b border-transparent bg-ink text-paper"
          : scrolled
            ? "border-b border-line bg-paper/90 text-ink backdrop-blur-md"
            : "border-b border-transparent bg-paper text-ink"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:bg-amber focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Container className="flex h-[72px] items-center justify-between gap-6 lg:h-20">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="link-line py-1 text-[0.9375rem] text-ink/80 transition-colors hover:text-ink aria-[current=page]:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ButtonLink href="/contact#quote" className="!min-h-11" arrow={false}>
              Request a Quote
            </ButtonLink>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="relative -mr-2 inline-flex size-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 block h-[1.5px] w-6 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-6 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                  open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto bg-ink text-paper lg:hidden"
      >
        <Container className="flex min-h-full flex-col justify-between gap-12 pb-10 pt-8">
          <nav aria-label="Mobile">
            <ul className="border-t border-line-inverse">
              {[{ href: "/", label: "Home" }, ...nav].map((item, i) => (
                <li key={item.href} className="border-b border-line-inverse">
                  <Link
                    href={item.href}
                    aria-current={(item.href === "/" ? pathname === "/" : isActive(item.href)) ? "page" : undefined}
                    className="intro-fade flex items-baseline justify-between py-5 font-display text-[2rem] font-normal tracking-[-0.01em] aria-[current=page]:text-amber"
                    style={{ ["--d" as string]: `${60 * i}ms` }}
                  >
                    {item.label}
                    <span className="text-label text-paper/40">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="intro-fade space-y-6" style={{ ["--d" as string]: "300ms" }}>
            <ButtonLink href="/contact#quote" className="w-full">
              Request a Quote
            </ButtonLink>
            <p className="text-label text-paper/50">{site.tagline}</p>
          </div>
        </Container>
      </div>
    </header>
  );
}
