import { tmdbFetch } from "./client";
import type { MultiSearchResponse } from "./types";

export function searchMulti(query: string, page: number) {
  return tmdbFetch<MultiSearchResponse>("/search/multi", {
    query,
    page: String(page),
    language: "en-US",
    include_adult: "false",
  });
}
