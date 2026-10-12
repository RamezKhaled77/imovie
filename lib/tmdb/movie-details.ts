import { tmdbFetch } from "./client";
import type {
  CreditsResponse,
  MovieDetails,
  MovieListResponse,
  VideoListResponse,
} from "./types";

const language = { language: "en-US" };

export function getMovieDetails(id: number) {
  return tmdbFetch<MovieDetails>(`/movie/${id}`, language);
}

export function getMovieCredits(id: number) {
  return tmdbFetch<CreditsResponse>(`/movie/${id}/credits`, language);
}

export function getMovieVideos(id: number) {
  return tmdbFetch<VideoListResponse>(`/movie/${id}/videos`, language);
}

export function getSimilarMovies(id: number) {
  return tmdbFetch<MovieListResponse>(`/movie/${id}/similar`, {
    ...language,
    page: "1",
  });
}
