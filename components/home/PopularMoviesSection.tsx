import { MovieListResponse } from "@/lib/tmdb/types";
import MovieCard from "./MovieCard";

export default function PopularMoviesSection({
  data,
}: {
  data: MovieListResponse;
}) {
  const moviesList = data.results;

  return (
    <section
      aria-labelledby="popular-movies-heading"
      className="border-b border-border-hairline bg-surface-ink py-8 sm:py-10"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-8">
        <header className="mb-6 border-b border-border-hairline pb-5">
          <h2
            id="popular-movies-heading"
            className="font-headline text-headline-md text-content-bone"
          >
            Popular Movies
          </h2>
          <p className="metadata mt-2 text-content-warm">
            Stories finding their audience right now
          </p>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {moviesList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}
