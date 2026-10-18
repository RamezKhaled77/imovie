import type { Metadata } from "next";

import MovieCategoryFilters from "@/components/movies/MovieCategoryFilters";
import MovieGenreFilters from "@/components/movies/MovieGenreFilters";
import MoviesHeader from "@/components/movies/MoviesHeader";
import MoviesPagination from "@/components/movies/MoviesPagination";
import MoviesResults from "@/components/movies/MoviesResults";
import { isMovieCategory } from "@/components/movies/movies-page-utils";
import { getGenres } from "@/lib/tmdb/genres";
import { getMovies } from "@/lib/tmdb/movies";

export const metadata: Metadata = {
  title: "Movies | iMovie",
  description:
    "Browse TMDB movie categories, filter by genre, and explore the latest cinema archive.",
};

type MoviesPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const params = await searchParams;
  const categoryParam = Array.isArray(params.category)
    ? params.category[0]
    : params.category;
  const category =
    categoryParam && isMovieCategory(categoryParam)
      ? categoryParam
      : "popular";
  const pageParam = Array.isArray(params.page) ? params.page[0] : params.page;
  const requestedPage = Number(pageParam);
  const page =
    Number.isInteger(requestedPage) && requestedPage >= 1 && requestedPage <= 500
      ? requestedPage
      : 1;

  const genresData = await getGenres("movie");
  const availableGenreIds = new Set(genresData.genres.map((genre) => genre.id));
  const genreParam = Array.isArray(params.genre)
    ? params.genre.join(",")
    : params.genre ?? "";
  const genreIds = [
    ...new Set(
      genreParam
        .split(",")
        .map((value) => Number(value.trim()))
        .filter(
          (genreId) =>
            Number.isInteger(genreId) &&
            genreId > 0 &&
            availableGenreIds.has(genreId),
        ),
    ),
  ].sort((first, second) => first - second);
  const moviesData = await getMovies({ category, genreIds, page });
  const totalPages = Math.min(Math.max(moviesData.total_pages, 1), 500);

  return (
    <main className="flex-1 bg-surface-ink px-4 py-8 text-content-bone sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1600px]">
        <MoviesHeader
          category={category}
          selectedGenreCount={genreIds.length}
        />
        <MovieCategoryFilters category={category} genreIds={genreIds} />
        <MovieGenreFilters
          category={category}
          genres={genresData.genres}
          genreIds={genreIds}
        />
        <MoviesResults
          category={category}
          genreIds={genreIds}
          movies={moviesData.results}
          totalResults={moviesData.total_results}
          page={page}
          totalPages={totalPages}
        />
        <MoviesPagination
          category={category}
          genreIds={genreIds}
          page={page}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
}
