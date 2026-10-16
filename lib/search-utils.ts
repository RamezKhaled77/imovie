import type { SearchSuggestion } from "@/lib/tmdb/types";

export const MAX_SEARCH_QUERY_LENGTH = 200;

export function getSearchQuery(
  value: string | string[] | undefined,
): string {
  const firstValue = Array.isArray(value) ? value[0] : value;
  return (firstValue ?? "").trim().slice(0, MAX_SEARCH_QUERY_LENGTH);
}

export function getSearchHref(query: string, page = 1): string {
  const params = new URLSearchParams();

  if (query) params.set("q", query);
  if (page > 1) params.set("page", String(page));

  const search = params.toString();
  return search ? `/search?${search}` : "/search";
}

export function getSearchResultHref(result: SearchSuggestion): string {
  if (result.media_type === "movie") return `/movies/${result.id}`;
  if (result.media_type === "tv") return `/tv/${result.id}`;
  return `/actors/${result.id}`;
}
