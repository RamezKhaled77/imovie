import MovieCard from "@/components/home/MovieCard";
import MoviesEmptyState from "@/components/movies/MoviesEmptyState";
import type { MovieCategory } from "@/lib/tmdb/movies";
import type { Movie } from "@/lib/tmdb/types";

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
        <MoviesEmptyState
          category={category}
          genreIds={genreIds}
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  );
}
