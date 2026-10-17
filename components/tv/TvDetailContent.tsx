import Image from "next/image";
import Link from "next/link";
import CastRail from "@/components/media/CastRail";
import MediaCard from "@/components/media/MediaCard";
import MediaGrid from "@/components/media/MediaGrid";
import SectionHeading from "@/components/media/SectionHeading";
import AccountActions from "@/components/media/AccountActions";
import type { TmdbAccountStates } from "@/lib/account-types";
import { getImageUrl } from "@/lib/tmdb/image";
import type {
  CreditsResponse,
  TvListResponse,
  TvShowDetails,
  VideoListResponse,
} from "@/lib/tmdb/types";

export default function TvDetailContent({
  show,
  credits,
  videos,
  similar,
  isAuthenticated,
  accountStates,
  sessionExpired,
}: {
  show: TvShowDetails;
  credits: CreditsResponse;
  videos: VideoListResponse;
  similar: TvListResponse;
  isAuthenticated: boolean;
  accountStates: TmdbAccountStates | null;
  sessionExpired: boolean;
}) {
  const backdropUrl = getImageUrl(show.backdrop_path ?? null, "w1280");
  const posterUrl = getImageUrl(show.poster_path, "w500");
  const trailer = videos.results
    .filter((video) => video.site === "YouTube" && video.type === "Trailer")
    .sort((first, second) => Number(second.official) - Number(first.official))[0];

  return (
    <main className="flex-1 bg-surface-ink px-4 py-8 text-content-bone sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1400px]">
        <Link
          href="/tv"
          className="metadata text-[10px] text-content-fog hover:text-brand-vermilion"
        >
          &larr; BACK TO TV
        </Link>
        <section className="relative mt-5 overflow-hidden border border-border-hairline bg-surface-reel">
          {backdropUrl && (
            <div className="absolute inset-0">
              <Image
                src={backdropUrl}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-surface-ink via-surface-ink/90 to-surface-ink/50" />
            </div>
          )}
          <div className="relative grid gap-8 p-5 sm:p-8 lg:grid-cols-[260px_1fr] lg:gap-10 lg:p-10">
            <div className="relative mx-auto aspect-[2/3] w-full max-w-[260px] overflow-hidden border border-border-hairline bg-surface-raised">
              {posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={`${show.name} poster`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 70vw, 260px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center px-4 text-center font-mono text-xs uppercase text-content-fog">
                  Poster unavailable
                </div>
              )}
            </div>
            <div className="self-center">
              <p className="metadata text-[10px] tracking-wider text-brand-vermilion">
                TELEVISION
              </p>
              <h1 className="mt-3 font-headline text-headline-lg-mobile text-content-bone sm:text-headline-lg">
                {show.name}
              </h1>
              {show.original_name !== show.name && (
                <p className="mt-1 text-sm text-content-fog">
                  {show.original_name}
                </p>
              )}
              <div className="metadata mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-content-fog">
                {show.first_air_date && (
                  <span>FIRST AIRED {show.first_air_date.slice(0, 4)}</span>
                )}
                <span>{show.number_of_seasons} SEASONS</span>
                <span>{show.number_of_episodes} EPISODES</span>
                <span className="text-brand-brass">
                  {show.vote_average.toFixed(1)} / 10
                </span>
              </div>
              <p className="mt-6 max-w-3xl whitespace-pre-line text-sm leading-7 text-content-bone/90">
                {show.overview || "An overview is not available."}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {show.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-sm border border-border-hairline bg-surface-ink/70 px-2.5 py-1 font-mono text-[10px] uppercase text-content-fog"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${encodeURIComponent(trailer.key)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex rounded-sm bg-brand-vermilion px-4 py-2.5 font-mono text-xs uppercase tracking-wide text-surface-ink transition-colors hover:bg-brand-vermilion-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-vermilion"
                >
                  Watch trailer
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              {!trailer && (
                <p className="metadata mt-6 text-[10px] text-content-fog">
                  NO TRAILER IS AVAILABLE
                </p>
              )}
              <AccountActions
                mediaType="tv"
                mediaId={show.id}
                path={`/tv/${show.id}`}
                isAuthenticated={isAuthenticated}
                accountStates={accountStates}
                sessionExpired={sessionExpired}
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="seasons-heading" className="mt-10">
          <SectionHeading
            id="seasons-heading"
            title="Seasons"
            detail={`${show.seasons.length} SEASONS`}
          />
          {show.seasons.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {show.seasons.map((season) => {
                const seasonPosterUrl = getImageUrl(season.poster_path, "w200");

                return (
                  <Link
                    key={`${show.id}-${season.season_number}`}
                    href={`/tv/${show.id}/season/${season.season_number}`}
                    className="flex gap-4 border border-border-hairline bg-surface-reel p-3 transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-brand-vermilion"
                  >
                    <div className="poster-frame relative w-16 shrink-0">
                      {seasonPosterUrl ? (
                        <Image
                          src={seasonPosterUrl}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="flex h-full items-center justify-center font-mono text-[9px] text-content-fog">
                          N/A
                        </span>
                      )}
                    </div>
                    <span className="min-w-0 self-center">
                      <span className="block font-headline text-title-editorial text-content-bone">
                        {season.name}
                      </span>
                      <span className="metadata mt-1 block text-[10px] text-content-fog">
                        {season.episode_count} EPISODES
                        {season.air_date
                          ? ` · ${season.air_date.slice(0, 4)}`
                          : ""}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-content-fog">
              Season information is unavailable.
            </p>
          )}
        </section>

        <div className="mt-10">
          <CastRail cast={credits.cast} />
        </div>

        <section aria-labelledby="tv-crew-heading" className="mt-10">
          <SectionHeading
            id="tv-crew-heading"
            title="Crew"
            detail={`${credits.crew.length} CREDITS`}
          />
          {credits.crew.length > 0 ? (
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {credits.crew.slice(0, 12).map((member, index) => (
                <li
                  key={`${member.id}-${member.job}-${index}`}
                  className="border border-border-hairline bg-surface-reel p-4"
                >
                  <span className="block text-sm text-content-bone">
                    <Link
                      href={`/actors/${member.id}`}
                      className="text-brand-vermilion hover:underline"
                    >
                      {member.name}
                    </Link>
                  </span>
                  <span className="metadata mt-1 block text-[10px] text-content-fog">
                    {member.job || member.department}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-content-fog">
              Crew information is unavailable.
            </p>
          )}
        </section>

        <section aria-labelledby="similar-tv-heading" className="mt-12">
          <SectionHeading
            id="similar-tv-heading"
            title="More Like This"
            detail="SIMILAR SERIES"
          />
          {similar.results.length > 0 ? (
            <MediaGrid>
              {similar.results.slice(0, 10).map((item) => (
                <MediaCard
                  key={item.id}
                  href={`/tv/${item.id}`}
                  title={item.name}
                  imagePath={item.poster_path}
                  year={item.first_air_date?.slice(0, 4)}
                  voteAverage={item.vote_average}
                  mediaType="TV"
                />
              ))}
            </MediaGrid>
          ) : (
            <p className="text-sm text-content-fog">
              No similar series are available.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
