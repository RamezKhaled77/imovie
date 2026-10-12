import Image from "next/image";
import Link from "next/link";
import MediaCard from "@/components/media/MediaCard";
import MediaGrid from "@/components/media/MediaGrid";
import SectionHeading from "@/components/media/SectionHeading";
import { getImageUrl } from "@/lib/tmdb/image";
import type {
  PersonCombinedCredits,
  PersonDetails,
  PersonExternalIds,
} from "@/lib/tmdb/types";

function genderLabel(gender: number) {
  switch (gender) {
    case 1:
      return "Female";
    case 2:
      return "Male";
    case 3:
      return "Non-binary";
    default:
      return "Not specified";
  }
}

export default function PersonDetailContent({
  person,
  externalIds,
  credits,
}: {
  person: PersonDetails;
  externalIds: PersonExternalIds;
  credits: PersonCombinedCredits;
}) {
  const profileUrl = getImageUrl(person.profile_path, "w500");
  const topCredits = [...credits.cast]
    .sort((first, second) => second.popularity - first.popularity)
    .slice(0, 10);
  const imdbHref = externalIds.imdb_id
    ? `https://www.imdb.com/name/${encodeURIComponent(externalIds.imdb_id)}/`
    : null;

  const facts = [
    ["Born", person.birthday || "Not available"],
    ["Died", person.deathday || "—"],
    ["Birthplace", person.place_of_birth || "Not available"],
    ["Gender", genderLabel(person.gender)],
  ];

  return (
    <main className="flex-1 bg-surface-ink px-4 py-8 text-content-bone sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1400px]">
        <Link
          href="/actors"
          className="metadata text-[10px] text-content-fog hover:text-brand-vermilion"
        >
          &larr; BACK TO ACTORS
        </Link>
        <section className="mt-5 grid gap-8 border border-border-hairline bg-surface-reel p-5 sm:p-8 lg:grid-cols-[280px_1fr] lg:gap-10">
          <div className="poster-frame relative mx-auto w-full max-w-[280px]">
            {profileUrl ? (
              <Image
                src={profileUrl}
                alt={`Portrait of ${person.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 70vw, 280px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-4 text-center font-mono text-xs uppercase text-content-fog">
                Portrait unavailable
              </div>
            )}
          </div>
          <div className="self-center">
            <p className="metadata text-[10px] tracking-wider text-brand-vermilion">
              {person.known_for_department || "ON SCREEN"}
            </p>
            <h1 className="mt-3 font-headline text-headline-lg-mobile text-content-bone sm:text-headline-lg">
              {person.name}
            </h1>
            <p className="metadata mt-4 inline-flex rounded-sm border border-brand-brass-border bg-brand-brass-muted px-2.5 py-1 text-[11px] text-brand-brass">
              TMDB POPULARITY · {person.popularity.toFixed(1)}
            </p>
            <dl className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {facts.map(([label, value]) => (
                <div key={label} className="border-b border-border-hairline pb-3">
                  <dt className="metadata text-[10px] uppercase text-content-fog">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm text-content-bone">{value}</dd>
                </div>
              ))}
            </dl>
            {imdbHref && (
              <a
                href={imdbHref}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-sm border border-border-hairline px-3 py-2 font-mono text-xs uppercase text-content-bone transition-colors hover:border-brand-vermilion hover:text-brand-vermilion focus-visible:outline-2 focus-visible:outline-brand-vermilion"
              >
                IMDb profile
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        </section>

        <section aria-labelledby="biography-heading" className="mt-10">
          <SectionHeading id="biography-heading" title="Biography" />
          <p className="max-w-4xl whitespace-pre-line text-sm leading-7 text-content-fog">
            {person.biography || "No biography is available for this performer."}
          </p>
        </section>

        <section aria-labelledby="person-credits-heading" className="mt-12">
          <SectionHeading
            id="person-credits-heading"
            title="Selected Credits"
            detail={`${topCredits.length} FILM & TELEVISION CREDITS`}
          />
          {topCredits.length > 0 ? (
            <MediaGrid>
              {topCredits.map((credit) => {
                const title = credit.title ?? credit.name ?? "Untitled";
                const date = credit.release_date ?? credit.first_air_date;
                const mediaType = credit.media_type === "movie" ? "Movie" : "TV";

                return (
                  <MediaCard
                    key={`${credit.media_type}-${credit.id}`}
                    href={`/${credit.media_type === "movie" ? "movies" : "tv"}/${credit.id}`}
                    title={title}
                    imagePath={credit.poster_path}
                    year={date?.slice(0, 4)}
                    voteAverage={credit.vote_average}
                    mediaType={mediaType}
                    credit={credit.character || undefined}
                  />
                );
              })}
            </MediaGrid>
          ) : (
            <p className="text-sm text-content-fog">
              Film and television credits are unavailable.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
