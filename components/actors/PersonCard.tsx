import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/tmdb/image";
import type { PersonSummary } from "@/lib/tmdb/types";

export default function PersonCard({ person }: { person: PersonSummary }) {
  const profileUrl = getImageUrl(person.profile_path, "w200");
  const knownFor = person.known_for
    ?.map((item) => item.title ?? item.name)
    .filter((title): title is string => Boolean(title))
    .slice(0, 3)
    .join(", ");

  return (
    <article className="group overflow-hidden rounded-sm border border-border-hairline bg-surface-reel transition-colors hover:border-border-strong">
      <Link
        href={`/actors/${person.id}`}
        aria-label={`View actor details for ${person.name}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-vermilion"
      >
        <div className="poster-frame poster-lift relative">
          {profileUrl ? (
            <Image
              src={profileUrl}
              alt={`Portrait of ${person.name}`}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 16vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-3 text-center font-mono text-xs uppercase text-content-fog">
              Portrait unavailable
            </div>
          )}
          <span
            aria-label={`TMDB popularity: ${person.popularity.toFixed(1)}`}
            className="absolute right-2 top-2 rounded-sm border border-brand-brass-border bg-surface-ink/90 px-2 py-1 font-mono text-xs font-semibold text-brand-brass"
          >
            POP{" "}
            {person.popularity.toFixed(1)}
          </span>
        </div>
        <div className="space-y-1 px-3 py-2.5">
          <h3 className="truncate font-headline text-title-editorial text-content-bone">
            {person.name}
          </h3>
          <p className="metadata truncate text-[10px] text-content-fog">
            {person.known_for_department || "Performer"}
          </p>
          {knownFor && (
            <p className="line-clamp-2 text-xs text-content-warm">{knownFor}</p>
          )}
        </div>
      </Link>
    </article>
  );
}
