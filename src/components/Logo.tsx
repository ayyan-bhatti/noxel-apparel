import Link from "next/link";

type Props = {
  className?: string;
  /** Show wordmark next to the mark. */
  withWordmark?: boolean;
};

/**
 * Official Noxel artwork (mark + wordmark) extracted from the client's logo
 * file and rendered as CSS masks so it inherits `currentColor`.
 */
export function LogoArtwork({ withWordmark = true, className = "" }: Omit<Props, "href">) {
  return (
    <span className={`flex items-center gap-3.5 ${className}`} aria-hidden="true">
      <span
        className="logo-mask h-7 w-[38px] sm:h-8 sm:w-[44px]"
        style={{ maskImage: "url(/brand/noxel-mark.png)", WebkitMaskImage: "url(/brand/noxel-mark.png)" }}
      />
      {withWordmark && (
        <span
          className="logo-mask h-6 w-[101px] sm:h-[30px] sm:w-[126px]"
          style={{ maskImage: "url(/brand/noxel-wordmark.png)", WebkitMaskImage: "url(/brand/noxel-wordmark.png)" }}
        />
      )}
    </span>
  );
}

export function Logo({ className = "", withWordmark = true }: Props) {
  return (
    <Link href="/" className={`inline-flex shrink-0 ${className}`} aria-label="Noxel Apparel — home">
      <LogoArtwork withWordmark={withWordmark} />
    </Link>
  );
}
