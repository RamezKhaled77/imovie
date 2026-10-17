import Link from "next/link";

import MediaCard from "@/components/media/MediaCard";
import MediaGrid from "@/components/media/MediaGrid";
import { buttonVariants } from "@/components/ui/button";
import type { AccountMediaType } from "@/lib/account-types";
import type { AccountCollection } from "@/lib/tmdb/account";
import type { MovieListResponse, TvListResponse } from "@/lib/tmdb/types";
import { cn } from "@/lib/utils";

function getCollectionHref(
  collection: AccountCollection,
  mediaType: AccountMediaType,
  page = 1,
) {
  const params = new URLSearchParams({ type: mediaType });
  if (page > 1) params.set("page", String(page));
  return `/account/${collection}?${params.toString()}`;
}

export default function AccountCollectionPage({
  collection,
  mediaType,
  page,
  data,
}: {
  collection: AccountCollection;
  mediaType: AccountMediaType;
  page: number;
  data: MovieListResponse | TvListResponse;
}) {
  const title = collection === "watchlist" ? "Your Watchlist" : "Your Favorites";
  const totalPages = Math.min(Math.max(data.total_pages, 1), 500);
  const results = data.results;
  const outOfRange = page > totalPages;

  return (
    <main className="flex-1 bg-surface-ink px-4 py-8 text-content-bone sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1600px]">
        <header className="mb-6 border-b border-border-hairline pb-5">
          <p className="metadata text-[10px] tracking-wider text-brand-vermilion">
            YOUR TMDB ACCOUNT
          </p>
          <h1 className="mt-2 font-headline text-headline-lg-mobile text-content-bone sm:text-headline-lg">
            {title}
          </h1>
          <p className="mt-2 max-w-prose text-sm text-content-fog">
            {collection === "watchlist"
              ? "Titles you’ve saved to watch later."
              : "Movies and television shows you’ve marked as favorites."}
          </p>
        </header>

        <nav
          aria-label="Saved account lists"
          className="mb-6 flex flex-wrap gap-2 border-b border-border-hairline pb-4"
        >
          {(
            [
              ["watchlist", "Watchlist"],
              ["favorites", "Favorites"],
            ] as const
          ).map(([value, label]) => (
            <Link
              key={value}
              href={getCollectionHref(value, mediaType)}
              aria-current={collection === value ? "page" : undefined}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-sm border-border-hairline bg-transparent font-mono text-[10px] uppercase tracking-wide text-content-bone hover:bg-surface-raised",
                collection === value &&
                  "border-brand-vermilion bg-brand-vermilion text-surface-ink hover:bg-brand-vermilion-hover hover:text-surface-ink",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <nav
          aria-label={`${title} media type`}
          className="mb-6 flex flex-wrap gap-2"
        >
          {(
            [
              ["movie", "Movies"],
              ["tv", "TV"],
            ] as const
          ).map(([value, label]) => (
            <Link
              key={value}
              href={getCollectionHref(collection, value)}
              aria-current={mediaType === value ? "page" : undefined}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-sm border-border-hairline bg-transparent font-mono text-[10px] uppercase tracking-wide text-content-bone hover:bg-surface-raised",
                mediaType === value &&
                  "border-brand-vermilion bg-brand-vermilion text-surface-ink hover:bg-brand-vermilion-hover hover:text-surface-ink",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="mb-5 flex flex-wrap items-end justify-between gap-2 border-b border-border-hairline pb-3">
          <h2 className="font-headline text-headline-sm text-content-bone">
            {mediaType === "movie" ? "Films" : "Television"}
          </h2>
          <p className="metadata text-[10px] text-content-fog">
            {outOfRange ? 0 : results.length} TITLES · PAGE {page}
          </p>
        </div>

        {outOfRange ? (
          <section
            aria-labelledby="account-list-empty-heading"
            className="border border-border-hairline bg-surface-reel px-5 py-12 text-center"
          >
            <p className="metadata text-[10px] uppercase tracking-wider text-content-fog">
              Page unavailable
            </p>
            <h2
              id="account-list-empty-heading"
              className="mt-2 font-headline text-headline-sm text-content-bone"
            >
              This page is beyond your list
            </h2>
            <Link
              href={getCollectionHref(collection, mediaType)}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "mt-5 rounded-sm border-border-hairline bg-transparent font-mono text-[10px] uppercase tracking-wide text-content-bone hover:bg-surface-raised",
              )}
            >
              Return to the first page
            </Link>
          </section>
        ) : results.length > 0 ? (
          <MediaGrid>
            {mediaType === "movie"
              ? (data as MovieListResponse).results.map((movie) => (
                  <MediaCard
                    key={movie.id}
                    href={`/movies/${movie.id}`}
                    title={movie.title}
                    imagePath={movie.poster_path}
                    year={movie.release_date?.slice(0, 4)}
                    voteAverage={movie.vote_average}
                    mediaType="Movie"
                  />
                ))
              : (data as TvListResponse).results.map((show) => (
                  <MediaCard
                    key={show.id}
                    href={`/tv/${show.id}`}
                    title={show.name}
                    imagePath={show.poster_path}
                    year={show.first_air_date?.slice(0, 4)}
                    voteAverage={show.vote_average}
                    mediaType="TV"
                  />
                ))}
          </MediaGrid>
        ) : (
          <section
            aria-labelledby="account-list-empty-heading"
            className="border border-border-hairline bg-surface-reel px-5 py-12 text-center"
          >
            <p className="metadata text-[10px] uppercase tracking-wider text-content-fog">
              Nothing saved yet
            </p>
            <h2
              id="account-list-empty-heading"
              className="mt-2 font-headline text-headline-sm text-content-bone"
            >
              This list is empty
            </h2>
            <p className="mx-auto mt-2 max-w-prose text-sm text-content-fog">
              Browse titles and use the account controls on a detail page to
              add them here.
            </p>
            <Link
              href={mediaType === "movie" ? "/movies" : "/tv"}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "mt-5 rounded-sm border-border-hairline bg-transparent font-mono text-[10px] uppercase tracking-wide text-content-bone hover:bg-surface-raised",
              )}
            >
              Browse {mediaType === "movie" ? "movies" : "TV"}
            </Link>
          </section>
        )}

        {!outOfRange && totalPages > 1 && (
          <nav
            aria-label={`${title} pagination`}
            className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border-hairline pt-5"
          >
            {page > 1 ? (
              <Link
                href={getCollectionHref(collection, mediaType, page - 1)}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "rounded-sm border-border-hairline bg-transparent font-mono text-[10px] uppercase tracking-wide text-content-bone hover:bg-surface-raised",
                )}
              >
                &larr; Previous
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
            <span className="metadata text-[10px] text-content-fog">
              PAGE {page} OF {totalPages}
            </span>
            {page < totalPages ? (
              <Link
                href={getCollectionHref(collection, mediaType, page + 1)}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "rounded-sm border-border-hairline bg-transparent font-mono text-[10px] uppercase tracking-wide text-content-bone hover:bg-surface-raised",
                )}
              >
                Next &rarr;
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
          </nav>
        )}
      </div>
    </main>
  );
}
