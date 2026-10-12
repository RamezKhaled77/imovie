import { tmdbFetch } from "./client";
import type {
  TvEpisodeDetails,
  TvAggregateCreditsResponse,
  TvListResponse,
  TvSeasonDetails,
  TvShowDetails,
  TvShowSummary,
  VideoListResponse,
} from "./types";

export const TV_CATEGORIES = [
  { value: "airing_today", label: "Airing Today" },
  { value: "on_the_air", label: "On TV" },
  { value: "popular", label: "Popular" },
  { value: "top_rated", label: "Top Rated" },
] as const;

export type TvCategory = (typeof TV_CATEGORIES)[number]["value"];

const TV_CATEGORY_ENDPOINTS: Record<TvCategory, string> = {
  airing_today: "/tv/airing_today",
  on_the_air: "/tv/on_the_air",
  popular: "/tv/popular",
  top_rated: "/tv/top_rated",
};

export function isTvCategory(value: string): value is TvCategory {
  return TV_CATEGORIES.some((category) => category.value === value);
}

function getUtcDate(daysFromToday = 0) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + daysFromToday);
  return date.toISOString().slice(0, 10);
}

export async function getTvShows({
  category,
  genreIds,
  page,
}: {
  category: TvCategory;
  genreIds: number[];
  page: number;
}): Promise<TvListResponse> {
  const commonParams = {
    language: "en-US",
    page: String(page),
  };

  if (genreIds.length === 0) {
    return tmdbFetch<TvListResponse>(TV_CATEGORY_ENDPOINTS[category], commonParams);
  }

  const params: Record<string, string> = {
    ...commonParams,
    with_genres: genreIds.join(","),
  };

  if (category === "airing_today") {
    params["air_date.gte"] = getUtcDate();
    params["air_date.lte"] = getUtcDate();
    params.sort_by = "popularity.desc";
  } else if (category === "on_the_air") {
    params["air_date.gte"] = getUtcDate();
    params["air_date.lte"] = getUtcDate(7);
    params.sort_by = "popularity.desc";
  } else if (category === "top_rated") {
    params.sort_by = "vote_average.desc";
    params["vote_count.gte"] = "200";
  } else {
    params.sort_by = "popularity.desc";
  }

  return tmdbFetch<TvListResponse>("/discover/tv", params);
}

export function getTvDetails(id: number) {
  return tmdbFetch<TvShowDetails>(`/tv/${id}`, { language: "en-US" });
}

export async function getTvCredits(id: number) {
  const credits = await tmdbFetch<TvAggregateCreditsResponse>(
    `/tv/${id}/aggregate_credits`,
    { language: "en-US" },
  );

  return {
    ...credits,
    cast: credits.cast.map((member) => ({
      ...member,
      character: member.roles?.map((role) => role.character).filter(Boolean).join(", "),
    })),
    crew: credits.crew.map((member) => ({
      ...member,
      job: member.jobs.map((job) => job.job).filter(Boolean).join(", "),
    })),
  };
}

export function getTvVideos(id: number) {
  return tmdbFetch<VideoListResponse>(`/tv/${id}/videos`, { language: "en-US" });
}

export function getSimilarTvShows(id: number) {
  return tmdbFetch<TvListResponse>(`/tv/${id}/similar`, {
    language: "en-US",
    page: "1",
  });
}

export function getTvSeason(id: number, seasonNumber: number) {
  return tmdbFetch<TvSeasonDetails>(
    `/tv/${id}/season/${seasonNumber}`,
    { language: "en-US" },
  );
}

export function getTvEpisode(
  id: number,
  seasonNumber: number,
  episodeNumber: number,
) {
  return tmdbFetch<TvEpisodeDetails>(
    `/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}`,
    { language: "en-US" },
  );
}

export type { TvShowSummary };
