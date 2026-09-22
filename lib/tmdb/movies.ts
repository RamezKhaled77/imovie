import { tmdbFetch } from "./client";
import { MovieListResponse } from "./types";

async function getTrendingMovies() {
  const data = await tmdbFetch<MovieListResponse>("/trending/movie/week");

  return data;
}

export { getTrendingMovies };
