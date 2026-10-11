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

// ========================================================================================

const CATEGORY_ENDPOINTS = {
  popular: "/movie/popular",
  top_rated: "/movie/top_rated",
  now_playing: "/movie/now_playing",
  upcoming: "/movie/upcoming",
} as const;

type MovieCategory = keyof typeof CATEGORY_ENDPOINTS;

async function getMovies({
  category,
  genreIds,
  page,
}: {
  category: MovieCategory;
  genreIds: number[];
  page: number;
}): Promise<MovieListResponse> {
  if (genreIds.length === 0) {
    return tmdbFetch<MovieListResponse>(CATEGORY_ENDPOINTS[category], {
      page: String(page),
    });
  }

  const params: Record<string, string> = {
    page: String(page),
    with_genres: genreIds.join(","),
  };

  if (category === "top_rated") {
    params.sort_by = "vote_average.desc";
    params["vote_count.gte"] = "200"; 
  } else if (category === "popular") {
    params.sort_by = "popularity.desc";
  } else if (category === "now_playing") {
    params.sort_by = "release_date.desc";
  } else if (category === "upcoming") {
    params.sort_by = "release_date.asc";
  }

  return tmdbFetch<MovieListResponse>("/discover/movie", params);
}

export type { MovieCategory };

export { getTrendingMovies, getPopularMovies, getMovies };
