import type { TvCategory } from "@/lib/tmdb/tv";

export function getTvHref(
  category: TvCategory,
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

  return `/tv?${query.toString()}`;
}

export function getValidPage(value: string | string[] | undefined) {
  const requestedPage = Number(Array.isArray(value) ? value[0] : value);
  return Number.isInteger(requestedPage) && requestedPage >= 1 && requestedPage <= 500
    ? requestedPage
    : 1;
}

export function getValidGenreIds(
  value: string | string[] | undefined,
  availableIds: Set<number>,
) {
  const ids = Array.isArray(value) ? value.join(",") : (value ?? "");

  return [
    ...new Set(
      ids
        .split(",")
        .map((id) => Number(id.trim()))
        .filter((id) => Number.isInteger(id) && id > 0 && availableIds.has(id)),
    ),
  ].sort((first, second) => first - second);
}
