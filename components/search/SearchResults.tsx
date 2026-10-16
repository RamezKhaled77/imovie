import Link from "next/link";
import MediaCard from "@/components/media/MediaCard";
import MediaGrid from "@/components/media/MediaGrid";
import PersonCard from "@/components/actors/PersonCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSearchHref } from "@/lib/search-utils";
import type { MultiSearchResult } from "@/lib/tmdb/types";

function getPageNumbers(page: number, totalPages: number) {
  return [
    ...new Set(
      [1, page - 1, page, page + 1, totalPages].filter(
        (value) => value >= 1 && value <= totalPages,
      ),
    ),
  ].sort((first, second) => first - second);
}

function ResultCard({ result }: { result: MultiSearchResult }) {
  if (result.media_type === "person") {
    return (
      <PersonCard
        person={{
          id: result.id,
          name: result.name,
          profile_path: result.profile_path,
          known_for_department: result.known_for_department,
          popularity: result.popularity,
          known_for: result.known_for,
        }}
      />
    );
  }

  const isMovie = result.media_type === "movie";
  const title = isMovie ? result.title : result.name;
  const date = isMovie ? result.release_date : result.first_air_date;

  return (
    <MediaCard
      href={`/${isMovie ? "movies" : "tv"}/${result.id}`}
      title={title}
      imagePath={result.poster_path}
      year={date?.slice(0, 4)}
      voteAverage={result.vote_average}
      mediaType={isMovie ? "Movie" : "TV"}
    />
  );
}

export default function SearchResults({
  query,
  results,
  page,
  totalPages,
  totalResults,
}: {
  query: string;
  results: MultiSearchResult[];
  page: number;
  totalPages: number;
  totalResults: number;
}) {
  if (!query) {
    return (
      <section className="border border-border-hairline bg-surface-reel px-5 py-12 text-center">
        <p className="metadata text-[10px] uppercase tracking-wider text-content-fog">
          Start with a title or a name
        </p>
        <h2 className="mt-2 font-headline text-headline-sm text-content-bone">
          Find your next watch
        </h2>
        <p className="mx-auto mt-2 max-w-prose text-sm text-content-fog">
          Search for a movie, television series, or performer using the search
          field in the navigation bar.
        </p>
      </section>
    );
  }

  if (page > totalPages) {
    return (
      <section className="border border-border-hairline bg-surface-reel px-5 py-12 text-center">
        <p className="metadata text-[10px] uppercase tracking-wider text-content-fog">
          Page unavailable
        </p>
        <h2 className="mt-2 font-headline text-headline-sm text-content-bone">
          No results on this page
        </h2>
        <p className="mt-2 text-sm text-content-fog">
          This search has {totalPages} {totalPages === 1 ? "page" : "pages"}.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-5 rounded-sm border-border-hairline bg-transparent font-mono text-[10px] uppercase tracking-wide text-content-bone hover:bg-surface-raised"
          render={<Link href={getSearchHref(query, 1)} />}
        >
          Return to the first page
        </Button>
      </section>
    );
  }

  if (results.length === 0) {
    return (
      <section className="border border-border-hairline bg-surface-reel px-5 py-12 text-center">
        <p className="metadata text-[10px] uppercase tracking-wider text-content-fog">
          No matching archive entries
        </p>
        <h2 className="mt-2 font-headline text-headline-sm text-content-bone">
          Try another title or name
        </h2>
        <p className="mt-2 text-sm text-content-fog">
          We couldn’t find results for “{query}”. Check the spelling or try a
          broader search.
        </p>
      </section>
    );
  }

  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-border-hairline pb-3">
        <p className="metadata text-[10px] text-content-fog">
          SHOWING{" "}
          <span className="text-content-bone">
            {results.length.toLocaleString()}
          </span>{" "}
          OF{" "}
          <span className="text-content-bone">
            {totalResults.toLocaleString()}
          </span>{" "}
          ENTRIES <span className="mx-1 text-border-strong">|</span> PAGE{" "}
          <span className="text-content-bone">{page}</span> OF {totalPages}
        </p>
      </div>

      <MediaGrid>
        {results.map((result) => (
          <ResultCard key={`${result.media_type}-${result.id}`} result={result} />
        ))}
      </MediaGrid>

      {totalPages > 1 && (
        <nav
          aria-label="Search results pagination"
          className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border-hairline pt-5"
        >
          {page > 1 ? (
            <Link
              href={getSearchHref(query, page - 1)}
              aria-label="Go to the previous page"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-sm border-border-hairline bg-transparent font-mono text-xs uppercase tracking-wide text-content-bone hover:bg-surface-raised",
              )}
            >
              &larr; Prev
            </Link>
          ) : (
            <Button variant="outline" size="sm" disabled>
              &larr; Prev
            </Button>
          )}

          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {pageNumbers.map((pageNumber, index) => (
              <span key={pageNumber} className="contents">
                {index > 0 && pageNumber - pageNumbers[index - 1] > 1 && (
                  <span aria-hidden="true" className="px-1 text-content-fog">
                    …
                  </span>
                )}
                <Link
                  href={getSearchHref(query, pageNumber)}
                  aria-label={`Go to page ${pageNumber}`}
                  aria-current={pageNumber === page ? "page" : undefined}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "size-8 rounded-sm px-0 font-mono text-xs",
                    pageNumber === page
                      ? "border-brand-vermilion bg-brand-vermilion text-surface-ink hover:bg-brand-vermilion-hover"
                      : "border-border-hairline bg-transparent text-content-fog hover:bg-surface-raised hover:text-content-bone",
                  )}
                >
                  {String(pageNumber).padStart(2, "0")}
                </Link>
              </span>
            ))}
          </div>

          {page < totalPages ? (
            <Link
              href={getSearchHref(query, page + 1)}
              aria-label="Go to the next page"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-sm border-border-hairline bg-transparent font-mono text-xs uppercase tracking-wide text-content-bone hover:bg-surface-raised",
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
  );
}
