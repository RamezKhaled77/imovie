import { tmdbFetch } from "./client";
import { GenreListResponse } from "./types";

async function getGenres(mediaType: "movie" | "tv") {
  const path = mediaType === "movie" ? "/genre/movie/list" : "/genre/tv/list";
  const data = await tmdbFetch<GenreListResponse>(path, { language: "en-US" });

  return data.genres;
}

export { getGenres };
