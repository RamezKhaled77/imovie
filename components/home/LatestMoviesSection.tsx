import Link from "next/link";
import MovieCard from "@/components/home/MovieCard";
import { Button, buttonVariants } from "@/components/ui/button";
import type { MovieListResponse } from "@/lib/tmdb/types";
import { cn } from "@/lib/utils";

function getHomeHref(page: number) {
  return page > 1 ? `/?page=${page}` : "/";
}

export default function LatestMoviesSection({
  data,
  page,
}: {
  data: MovieListResponse;
  page: number;
}) {
  const totalPages = Math.min(Math.max(data.total_pages, 1), 500);
  const isOutOfRange = page > totalPages;

  return (
    <section
      aria-labelledby="latest-movies-heading"
      className="border-b border-border-hairline bg-surface-ink py-8 sm:py-10"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-8">
        <header className="mb-6 border-b border-border-hairline pb-5">
          <p className="metadata mb-2 text-[10px] text-brand-vermilion">
            THE LATEST FROM THEATERS
          </p>
          <h2
            id="latest-movies-heading"
            className="font-headline text-headline-md text-content-bone"
          >
            Now Playing
          </h2>
          <p className="metadata mt-2 text-content-warm">
            Current releases, refreshed from the TMDB movie archive
          </p>
        </header>

        {isOutOfRange ? (
          <div className="border border-border-hairline bg-surface-reel px-5 py-10 text-center">
            <h3 className="font-headline text-headline-sm text-content-bone">
              That page is beyond the current archive
            </h3>
            <p className="mt-2 text-sm text-content-fog">
              There are {totalPages} pages of currently playing films.
            </p>
            <div className="mt-5 flex justify-center gap-2">
              <Link
                href={getHomeHref(1)}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "rounded-sm border-border-hairline bg-transparent font-mono text-[10px] uppercase text-content-bone hover:bg-surface-raised",
                )}
              >
                First page
              </Link>
              {totalPages > 1 && (
                <Link
                  href={getHomeHref(totalPages)}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "rounded-sm border-border-hairline bg-transparent font-mono text-[10px] uppercase text-content-bone hover:bg-surface-raised",
                  )}
                >
                  Last page
                </Link>
              )}
            </div>
          </div>
        ) : data.results.length > 0 ? (
          <>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
              <p className="metadata text-[10px] text-content-fog">
                {data.total_results.toLocaleString()} CURRENTLY PLAYING FILMS
              </p>
              <p className="metadata text-[10px] text-content-fog">
                PAGE {page} OF {totalPages}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
              {data.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            {totalPages > 1 && (
              <nav
                aria-label="Latest movies pagination"
                className="mt-8 flex items-center justify-between gap-3 border-t border-border-hairline pt-5"
              >
                {page > 1 ? (
                  <Link
                    href={getHomeHref(page - 1)}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "rounded-sm border-border-hairline bg-transparent font-mono text-xs uppercase text-content-bone hover:bg-surface-raised",
                    )}
                  >
                    &larr; Previous
                  </Link>
                ) : (
                  <Button variant="outline" size="sm" disabled>
                    &larr; Previous
                  </Button>
                )}
                <span className="metadata text-[10px] text-content-fog">
                  PAGE {page} / {totalPages}
                </span>
                {page < totalPages ? (
                  <Link
                    href={getHomeHref(page + 1)}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "rounded-sm border-border-hairline bg-transparent font-mono text-xs uppercase text-content-bone hover:bg-surface-raised",
                    )}
                  >
                    Next &rarr;
                  </Link>
                ) : (
                  <Button variant="outline" size="sm" disabled>
                    Next &rarr;
                  </Button>
                )}
              </nav>
            )}
          </>
        ) : (
          <div className="border border-border-hairline bg-surface-reel px-5 py-10 text-center">
            <h3 className="font-headline text-headline-sm text-content-bone">
              No currently playing films are available
            </h3>
            <p className="mt-2 text-sm text-content-fog">
              Try the full movie archive while this feed is empty.
            </p>
            <Link
              href="/movies?category=now_playing"
              className="mt-4 inline-flex font-mono text-xs uppercase text-brand-vermilion hover:underline"
            >
              Browse now playing
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
