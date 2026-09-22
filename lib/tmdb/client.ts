import "server-only";
import { TmdbError } from "./error";

async function tmdbFetch<T>(
  path: string,
  params?: Record<string, string>,
): Promise<T> {
  const query = params ? `?${new URLSearchParams(params).toString()}` : "";

  const fullUrl = `${process.env.TMDB_API_BASE_URL}${path}${query}`;

  const response = await fetch(fullUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
  });

  if (!response.ok)
    throw new TmdbError(
      `Something went wrong: ${path} - ${response.status}`,
      response.status,
    );

  return response.json();
}

export { tmdbFetch };
