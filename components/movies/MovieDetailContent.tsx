import Image from "next/image";
import Link from "next/link";
import MediaCard from "@/components/media/MediaCard";
import MediaGrid from "@/components/media/MediaGrid";
import SectionHeading from "@/components/media/SectionHeading";
import CastRail from "@/components/media/CastRail";
import PersonCreditLink from "@/components/media/PersonCreditLink";
import { getImageUrl } from "@/lib/tmdb/image";
import type {
  CreditsResponse,
  MovieDetails,
  MovieListResponse,
  VideoListResponse,
} from "@/lib/tmdb/types";

export default function MovieDetailContent({
  movie,
  credits,
  videos,
  similar,
}: {
  movie: MovieDetails;
  credits: CreditsResponse;
  videos: VideoListResponse;
  similar: MovieListResponse;
}) {
  const backdropUrl = getImageUrl(movie.backdrop_path ?? null, "w1280");
  const posterUrl = getImageUrl(movie.poster_path, "w500");
  const director = credits.crew.find((member) => member.job === "Director");
  const trailer = videos.results
    .filter((video) => video.site === "YouTube" && video.type === "Trailer")
    .sort((first, second) => Number(second.official) - Number(first.official))[0];

  return (
    <main className="flex-1 bg-surface-ink px-4 py-8 text-content-bone sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1400px]">
        <Link
          href="/movies"
          className="metadata text-[10px] text-content-fog hover:text-brand-vermilion"
        >
          &larr; BACK TO MOVIES
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
            <div className="poster-frame relative mx-auto w-full max-w-[260px]">
              {posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={`${movie.title} poster`}
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
                FEATURE PRESENTATION
              </p>
              <h1 className="mt-3 font-headline text-headline-lg-mobile text-content-bone sm:text-headline-lg">
                {movie.title}
              </h1>
              {movie.original_title !== movie.title && (
                <p className="mt-1 text-sm text-content-fog">
                  {movie.original_title}
                </p>
              )}
              <div className="metadata mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-content-fog">
                {movie.release_date && (
                  <span>{movie.release_date.slice(0, 4)}</span>
                )}
                <span>{movie.runtime ? `${movie.runtime} MIN` : "RUNTIME N/A"}</span>
                <span className="text-brand-brass">
                  {movie.vote_average.toFixed(1)} / 10
                </span>
                <span className="uppercase">{movie.original_language}</span>
              </div>
              <p className="mt-6 max-w-3xl whitespace-pre-line text-sm leading-7 text-content-bone/90">
                {movie.overview || "An overview is not available."}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
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
            </div>
          </div>
        </section>

        <CastRail cast={credits.cast} />

        <section aria-labelledby="director-heading" className="mt-10">
          <SectionHeading id="director-heading" title="Direction" />
          {director ? (
            <p className="text-sm text-content-fog">
              Directed by <PersonCreditLink person={director} />
            </p>
          ) : (
            <p className="text-sm text-content-fog">
              Director credit is unavailable.
            </p>
          )}
        </section>

        <section aria-labelledby="companies-heading" className="mt-10">
          <SectionHeading id="companies-heading" title="Production" />
          {movie.production_companies.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {movie.production_companies.map((company) => {
                const logoUrl = getImageUrl(company.logo_path, "w200");

                return (
                  <div
                    key={company.id}
                    className="flex min-h-20 min-w-36 items-center justify-center border border-border-hairline bg-surface-reel p-4"
                  >
                    {logoUrl ? (
                      <Image
                        src={logoUrl}
                        alt={company.name}
                        width={160}
                        height={80}
                        sizes="160px"
                        className="max-h-12 w-auto object-contain"
                      />
                    ) : (
                      <span className="text-center text-sm text-content-fog">
                        {company.name}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-content-fog">
              Production company details are unavailable.
            </p>
          )}
        </section>

        <section aria-labelledby="similar-movies-heading" className="mt-12">
          <SectionHeading
            id="similar-movies-heading"
            title="More Like This"
            detail="SIMILAR FILMS"
          />
          {similar.results.length > 0 ? (
            <MediaGrid>
              {similar.results.slice(0, 10).map((item) => (
                <MediaCard
                  key={item.id}
                  href={`/movies/${item.id}`}
                  title={item.title}
                  imagePath={item.poster_path}
                  year={item.release_date?.slice(0, 4)}
                  voteAverage={item.vote_average}
                  mediaType="Movie"
                />
              ))}
            </MediaGrid>
          ) : (
            <p className="text-sm text-content-fog">
              No similar films are available.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
