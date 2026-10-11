import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { MovieCategory } from "@/lib/tmdb/movies";
import { getMoviesHref } from "./movies-page-utils";

export default function MoviesEmptyState({
  category,
  genreIds,
  page,
  totalPages,
}: {
  category: MovieCategory;
  genreIds: number[];
  page: number;
  totalPages: number;
}) {
  const isOutOfRange = page > totalPages;
  const hasGenreFilters = genreIds.length > 0;

  return (
    <section
      aria-labelledby="movies-empty-heading"
      className="border border-border-hairline bg-surface-reel px-5 py-12 text-center"
    >
      <p className="metadata text-[10px] uppercase tracking-wider text-content-fog">
        {isOutOfRange ? "Page unavailable" : "No matching titles"}
      </p>
      <h2
        id="movies-empty-heading"
        className="mt-2 font-headline text-headline-sm text-content-bone"
      >
        {isOutOfRange ? "This page is beyond the archive" : "No films found"}
      </h2>
      <p className="mx-auto mt-2 max-w-prose text-sm text-content-fog">
        {isOutOfRange
          ? `This category has ${totalPages} ${totalPages === 1 ? "page" : "pages"} of results. Choose an available page or adjust your filters.`
          : hasGenreFilters
            ? "No films match every selected genre. Try removing a genre filter."
            : "There are no films to show in this category right now. Try another category."}
      </p>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {isOutOfRange ? (
          <>
            <Button
              variant="outline"
              size="sm"
              className="rounded-sm border-border-hairline bg-transparent font-mono text-[10px] uppercase tracking-wide text-content-bone hover:bg-surface-raised"
              render={<Link href={getMoviesHref(category, genreIds, 1)} />}
            >
              First page
            </Button>
            {totalPages > 1 && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-sm border-border-hairline bg-transparent font-mono text-[10px] uppercase tracking-wide text-content-bone hover:bg-surface-raised"
                render={
                  <Link
                    href={getMoviesHref(category, genreIds, totalPages)}
                  />
                }
              >
                Last available page
              </Button>
            )}
          </>
        ) : (
          <>
            {hasGenreFilters && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-sm border-border-hairline bg-transparent font-mono text-[10px] uppercase tracking-wide text-content-bone hover:bg-surface-raised"
                render={<Link href={getMoviesHref(category, [])} />}
              >
                Clear genre filters
              </Button>
            )}
            {category !== "popular" && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-sm border-border-hairline bg-transparent font-mono text-[10px] uppercase tracking-wide text-content-bone hover:bg-surface-raised"
                render={<Link href={getMoviesHref("popular", genreIds)} />}
              >
                Browse popular films
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
