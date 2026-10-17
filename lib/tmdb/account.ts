import "server-only";

import type {
  AccountMediaType,
  TmdbAccountStates,
} from "@/lib/account-types";
import { tmdbFetch, tmdbPost } from "./client";
import { TmdbError } from "./error";
import type { MovieListResponse, TvListResponse } from "./types";

export type AccountCollection = "watchlist" | "favorites";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function getTmdbAccountId(sessionId: string): Promise<number> {
  const account = await tmdbFetch<unknown>(
    "/account",
    { session_id: sessionId },
    { cache: "no-store" },
  );

  if (
    !isRecord(account) ||
    typeof account.id !== "number" ||
    !Number.isSafeInteger(account.id) ||
    account.id <= 0
  ) {
    throw new TmdbError("TMDB returned invalid account details", null);
  }

  return account.id;
}

export async function getAccountCollection(
  sessionId: string,
  mediaType: AccountMediaType,
  collection: AccountCollection,
  page: number,
): Promise<MovieListResponse | TvListResponse> {
  const accountId = await getTmdbAccountId(sessionId);
  const collectionPath =
    collection === "favorites" ? "favorite" : "watchlist";
  const mediaPath = mediaType === "movie" ? "movies" : "tv";

  return tmdbFetch<MovieListResponse | TvListResponse>(
    `/account/${accountId}/${collectionPath}/${mediaPath}`,
    {
      language: "en-US",
      page: String(page),
      session_id: sessionId,
      sort_by: "created_at.desc",
    },
    { cache: "no-store" },
  );
}

export async function getMovieAccountStates(
  id: number,
  sessionId: string,
): Promise<TmdbAccountStates> {
  return getAccountStates(`/movie/${id}/account_states`, id, sessionId);
}

export async function getTvAccountStates(
  id: number,
  sessionId: string,
): Promise<TmdbAccountStates> {
  return getAccountStates(`/tv/${id}/account_states`, id, sessionId);
}

async function getAccountStates(
  path: string,
  mediaId: number,
  sessionId: string,
): Promise<TmdbAccountStates> {
  const response = await tmdbFetch<unknown>(
    path,
    { session_id: sessionId },
    { cache: "no-store" },
  );

  if (
    !isRecord(response) ||
    response.id !== mediaId ||
    typeof response.favorite !== "boolean" ||
    typeof response.watchlist !== "boolean"
  ) {
    throw new TmdbError("TMDB returned invalid account state", null);
  }

  let rated: TmdbAccountStates["rated"];
  if (response.rated === false) {
    rated = false;
  } else if (
    isRecord(response.rated) &&
    typeof response.rated.value === "number" &&
    Number.isFinite(response.rated.value)
  ) {
    rated = { value: response.rated.value };
  } else {
    throw new TmdbError("TMDB returned invalid account rating", null);
  }

  return {
    favorite: response.favorite,
    watchlist: response.watchlist,
    rated,
  };
}

function assertSuccessfulMutation(response: unknown): void {
  if (
    !isRecord(response) ||
    typeof response.status_code !== "number" ||
    ![1, 12, 13].includes(response.status_code)
  ) {
    throw new TmdbError("TMDB rejected the account mutation", null);
  }
}

export async function setTmdbWatchlist(
  accountId: number,
  sessionId: string,
  mediaType: AccountMediaType,
  mediaId: number,
  watchlist: boolean,
): Promise<void> {
  const response = await tmdbPost<unknown>(
    `/account/${accountId}/watchlist`,
    { media_type: mediaType, media_id: mediaId, watchlist },
    { session_id: sessionId },
  );

  assertSuccessfulMutation(response);
}

export async function setTmdbFavorite(
  accountId: number,
  sessionId: string,
  mediaType: AccountMediaType,
  mediaId: number,
  favorite: boolean,
): Promise<void> {
  const response = await tmdbPost<unknown>(
    `/account/${accountId}/favorite`,
    { media_type: mediaType, media_id: mediaId, favorite },
    { session_id: sessionId },
  );

  assertSuccessfulMutation(response);
}

export async function setTmdbRating(
  sessionId: string,
  mediaType: AccountMediaType,
  mediaId: number,
  rating: number,
): Promise<void> {
  const path =
    mediaType === "movie"
      ? `/movie/${mediaId}/rating`
      : `/tv/${mediaId}/rating`;
  const response = await tmdbPost<unknown>(
    path,
    { value: rating },
    { session_id: sessionId },
  );

  assertSuccessfulMutation(response);
}
