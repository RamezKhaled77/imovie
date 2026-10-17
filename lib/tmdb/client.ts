import "server-only";
import { TmdbError } from "./error";

async function tmdbFetch<T>(
  path: string,
  params?: Record<string, string>,
  init: RequestInit = {},
): Promise<T> {
  const query = params ? `?${new URLSearchParams(params).toString()}` : "";
  return tmdbRequest<T>(`${path}${query}`, init);
}

async function tmdbRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const accessToken = process.env.TMDB_READ_ACCESS_TOKEN;
  if (!accessToken) {
    throw new TmdbError("TMDB Read Access Token is not configured", null);
  }

  const apiBaseUrl =
    process.env.TMDB_API_BASE_URL ?? "https://api.themoviedb.org/3";
  const fullUrl = `${apiBaseUrl}${path}`;
  let response: Response;
  try {
    response = await fetch(fullUrl, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    if (!(error instanceof TypeError)) throw error;
    throw new TmdbError("TMDB request could not be completed", null);
  }

  if (!response.ok)
    throw new TmdbError(
      `Something went wrong: ${path.split("?", 1)[0]} - ${response.status}`,
      response.status,
    );

  try {
    return await response.json();
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
    throw new TmdbError("TMDB returned an invalid response", response.status);
  }
}

async function tmdbPost<T>(
  path: string,
  body: object,
  params?: Record<string, string>,
): Promise<T> {
  const query = params ? `?${new URLSearchParams(params).toString()}` : "";
  return tmdbRequest<T>(`${path}${query}`, {
    method: "POST",
    body: JSON.stringify(body),
    cache: "no-store",
  });
}

export { tmdbFetch, tmdbPost };
