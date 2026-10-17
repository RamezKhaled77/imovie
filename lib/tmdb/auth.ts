import "server-only";

import { TmdbError } from "./error";
import { tmdbFetch, tmdbPost } from "./client";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function createRequestToken(): Promise<string> {
  const response = await tmdbFetch<unknown>(
    "/authentication/token/new",
    undefined,
    { cache: "no-store" },
  );

  if (
    !isRecord(response) ||
    response.success !== true ||
    typeof response.request_token !== "string" ||
    response.request_token.length === 0
  ) {
    throw new TmdbError("TMDB returned an invalid request token", null);
  }

  return response.request_token;
}

export async function createSession(
  requestToken: string,
): Promise<string> {
  const response = await tmdbPost<unknown>("/authentication/session/new", {
    request_token: requestToken,
  });

  if (
    !isRecord(response) ||
    response.success !== true ||
    typeof response.session_id !== "string" ||
    response.session_id.length === 0
  ) {
    throw new TmdbError("TMDB returned an invalid session", null);
  }

  return response.session_id;
}
