import { tmdbFetch } from "./client";
import { MovieListResponse } from "./types";

async function getTrendingMovies() {
  const data = await tmdbFetch<MovieListResponse>("/trending/movie/week");

  return data;
}

async function getPopularMovies() {
  const data = await tmdbFetch<MovieListResponse>("/movie/popular");

  return data;
}

export { getTrendingMovies, getPopularMovies };
