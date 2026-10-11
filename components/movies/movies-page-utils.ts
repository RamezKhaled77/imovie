import type { MovieCategory } from "@/lib/tmdb/movies";

export const MOVIE_CATEGORIES: { value: MovieCategory; label: string }[] = [
  { value: "now_playing", label: "Now Playing" },
  { value: "popular", label: "Popular" },
  { value: "top_rated", label: "Top Rated" },
  { value: "upcoming", label: "Upcoming" },
];

export function isMovieCategory(value: string): value is MovieCategory {
  return MOVIE_CATEGORIES.some((category) => category.value === value);
}

export function getMoviesHref(
  category: MovieCategory,
  genreIds: number[],
  page = 1,
) {
  const query = new URLSearchParams({ category });

  if (genreIds.length > 0) {
    query.set("genre", genreIds.join(","));
  }

  if (page > 1) {
    query.set("page", String(page));
  }

  return `/movies?${query.toString()}`;
}

export function getPageNumbers(page: number, totalPages: number) {
  const pages = [...new Set([1, page - 1, page, page + 1, totalPages])]
    .filter((pageNumber) => pageNumber >= 1 && pageNumber <= totalPages)
    .sort((first, second) => first - second);

  return pages.reduce<(number | "ellipsis")[]>((items, pageNumber, index) => {
    if (index > 0 && pageNumber - pages[index - 1] > 1) {
      items.push("ellipsis");
    }

    items.push(pageNumber);
    return items;
  }, []);
}
