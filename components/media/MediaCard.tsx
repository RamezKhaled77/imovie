import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { getImageUrl } from "@/lib/tmdb/image";

export default function MediaCard({
  href,
  title,
  imagePath,
  year,
  voteAverage,
  mediaType,
  credit,
}: {
  href: string;
  title: string;
  imagePath: string | null;
  year?: string;
  voteAverage?: number;
  mediaType: "Movie" | "TV";
  credit?: string;
}) {
  const imageUrl = getImageUrl(imagePath, "w500");

  return (
    <article className="group overflow-hidden rounded-sm border border-border-hairline bg-surface-reel transition-colors hover:border-border-strong z-40">
      <Link
        href={href}
        aria-label={`View ${mediaType.toLowerCase()} details for ${title}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-vermilion"
      >
        <div className="poster-frame poster-lift relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${title} ${mediaType.toLowerCase()} artwork`}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 16vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-3 text-center font-mono text-xs uppercase text-content-fog">
              Artwork unavailable
            </div>
          )}
          {typeof voteAverage === "number" && (
            <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-sm border border-brand-brass-border bg-surface-ink/90 px-2 py-1 font-mono text-xs font-semibold text-brand-brass">
              <Star aria-hidden="true" className="size-3 fill-current" />
              {voteAverage.toFixed(1)}
            </span>
          )}
        </div>
        <div className="space-y-1 px-3 py-2.5">
          <h3 className="truncate font-headline text-title-editorial text-content-bone">
            {title}
          </h3>
          <p className="metadata truncate text-[10px] text-content-fog">
            {mediaType}
            {year ? ` · ${year}` : ""}
          </p>
          {credit && (
            <p className="truncate text-xs text-content-warm">{credit}</p>
          )}
        </div>
      </Link>
    </article>
  );
}
