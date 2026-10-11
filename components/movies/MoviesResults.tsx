import Link from "next/link";
import { Button } from "@/components/ui/button";
import MovieCard from "@/components/home/MovieCard";
import type { MovieCategory } from "@/lib/tmdb/movies";
import type { Movie } from "@/lib/tmdb/types";
import { getMoviesHref } from "./movies-page-utils";

export default function MoviesResults({
  category,
  genreIds,
  movies,
  totalResults,
  page,
  totalPages,
}: {
  category: MovieCategory;
  genreIds: number[];
  movies: Movie[];
  totalResults: number;
  page: number;
  totalPages: number;
}) {
  const sortLabel =
    category === "top_rated"
      ? "TOP RATED"
      : category === "now_playing"
        ? "RELEASE DATE"
        : category === "upcoming"
          ? "UPCOMING"
          : "POPULARITY";

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-border-hairline pb-3">
        <p className="metadata text-[10px] text-content-fog">
          SHOWING{" "}
          <span className="text-content-bone">
            {movies.length.toLocaleString()}
          </span>{" "}
          OF{" "}
          <span className="text-content-bone">
            {totalResults.toLocaleString()}
          </span>{" "}
          TITLES <span className="mx-1 text-border-strong">|</span> PAGE{" "}
          <span className="text-content-bone">{page}</span> OF {totalPages}
        </p>
        <p className="metadata text-[10px] text-brand-brass">
          SORT: {sortLabel}
        </p>
      </div>

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="border border-border-hairline bg-surface-reel px-5 py-12 text-center">
          <h2 className="font-headline text-headline-sm text-content-bone">
            No films found
          </h2>
          <p className="mx-auto mt-2 max-w-prose text-sm text-content-fog">
            {page > totalPages
              ? "This page is beyond the available results. Choose a page below or adjust your filters."
              : genreIds.length > 0
                ? "No films match every selected genre. Try removing a genre filter."
                : "There are no films to show in this category right now."}
          </p>
          {genreIds.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="mt-5 rounded-sm border-border-hairline bg-transparent font-mono text-[10px] uppercase tracking-wide text-content-bone hover:bg-surface-raised"
              render={<Link href={getMoviesHref(category, [])} />}
            >
              Clear genre filters
            </Button>
          )}
        </div>
      )}
    </>
  );
}
