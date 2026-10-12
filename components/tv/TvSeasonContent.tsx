import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/media/SectionHeading";
import { getImageUrl } from "@/lib/tmdb/image";
import type { TvSeasonDetails } from "@/lib/tmdb/types";

export default function TvSeasonContent({
  showId,
  season,
}: {
  showId: number;
  season: TvSeasonDetails;
}) {
  const posterUrl = getImageUrl(season.poster_path, "w500");
  const episodes = [...season.episodes].sort(
    (first, second) => first.episode_number - second.episode_number,
  );

  return (
    <main className="flex-1 bg-surface-ink px-4 py-8 text-content-bone sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1200px]">
        <nav
          aria-label="Breadcrumb"
          className="metadata flex flex-wrap gap-2 text-[10px] text-content-fog"
        >
          <Link href="/tv" className="hover:text-brand-vermilion">
            TV
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href={`/tv/${showId}`}
            className="hover:text-brand-vermilion"
          >
            SERIES DETAILS
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-brand-vermilion">
            {season.name.toUpperCase()}
          </span>
        </nav>

        <header className="mt-5 grid gap-6 border border-border-hairline bg-surface-reel p-5 sm:grid-cols-[160px_1fr] sm:p-8">
          <div className="poster-frame relative mx-auto w-full max-w-[160px]">
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt={`${season.name} poster`}
                fill
                priority
                sizes="160px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-3 text-center font-mono text-xs uppercase text-content-fog">
                Artwork unavailable
              </div>
            )}
          </div>
          <div className="self-center">
            <p className="metadata text-[10px] text-brand-vermilion">
              SEASON {season.season_number}
            </p>
            <h1 className="mt-2 font-headline text-headline-lg-mobile sm:text-headline-lg">
              {season.name}
            </h1>
            <p className="metadata mt-3 text-[10px] text-content-fog">
              {season.episode_count} EPISODES
              {season.air_date ? ` · ${season.air_date.slice(0, 4)}` : ""}
            </p>
            <p className="mt-4 max-w-prose whitespace-pre-line text-sm leading-7 text-content-fog">
              {season.overview || "No season overview is available."}
            </p>
          </div>
        </header>

        <section aria-labelledby="episodes-heading" className="mt-10">
          <SectionHeading
            id="episodes-heading"
            title="Episodes"
            detail={`${episodes.length} AVAILABLE`}
          />
          {episodes.length > 0 ? (
            <ol className="divide-y divide-border-hairline border border-border-hairline bg-surface-reel">
              {episodes.map((episode) => {
                const stillUrl = getImageUrl(episode.still_path, "w300");

                return (
                  <li key={episode.id}>
                    <Link
                      href={`/tv/${showId}/season/${season.season_number}/episode/${episode.episode_number}`}
                      className="grid gap-4 p-4 transition-colors hover:bg-surface-raised sm:grid-cols-[180px_1fr] sm:items-center"
                    >
                      <div className="relative aspect-video overflow-hidden bg-surface-raised">
                        {stillUrl ? (
                          <Image
                            src={stillUrl}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 100vw, 180px"
                            className="object-cover"
                          />
                        ) : (
                          <span className="flex h-full items-center justify-center font-mono text-[10px] uppercase text-content-fog">
                            Still unavailable
                          </span>
                        )}
                      </div>
                      <span className="min-w-0">
                        <span className="metadata text-[10px] text-brand-vermilion">
                          EPISODE {String(episode.episode_number).padStart(2, "0")}
                          {episode.air_date ? ` · ${episode.air_date}` : ""}
                        </span>
                        <span className="mt-1 block font-headline text-title-editorial text-content-bone">
                          {episode.name}
                        </span>
                        <span className="mt-2 line-clamp-2 block text-sm leading-6 text-content-fog">
                          {episode.overview || "Episode details are not available."}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          ) : (
            <p className="border border-border-hairline bg-surface-reel p-8 text-center text-content-fog">
              Episode information is not available for this season.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
