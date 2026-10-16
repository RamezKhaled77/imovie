import { TmdbError } from "@/lib/tmdb/error";
import { searchMulti } from "@/lib/tmdb/search";
import type { SearchSuggestion } from "@/lib/tmdb/types";
import { getSearchQuery } from "@/lib/search-utils";

const SUGGESTION_LIMIT = 6;

function toSuggestion(
  result: Awaited<ReturnType<typeof searchMulti>>["results"][number],
): SearchSuggestion | null {
  if (result.media_type === "movie") {
    return {
      id: result.id,
      media_type: result.media_type,
      title: result.title,
      poster_path: result.poster_path,
      release_date: result.release_date,
    };
  }

  if (result.media_type === "tv") {
    return {
      id: result.id,
      media_type: result.media_type,
      name: result.name,
      poster_path: result.poster_path,
      first_air_date: result.first_air_date,
    };
  }

  return {
    id: result.id,
    media_type: result.media_type,
    name: result.name,
    profile_path: result.profile_path,
    known_for_department: result.known_for_department,
  };
}

export async function GET(request: Request) {
  const query = getSearchQuery(
    new URL(request.url).searchParams.get("q") ?? undefined,
  );

  if (!query) {
    return Response.json({ results: [] satisfies SearchSuggestion[] });
  }

  try {
    const response = await searchMulti(query, 1);
    const results = response.results
      .slice(0, SUGGESTION_LIMIT)
      .map(toSuggestion)
      .filter((result): result is SearchSuggestion => result !== null);

    return Response.json({ results });
  } catch (error) {
    if (!(error instanceof TmdbError)) throw error;

    console.error("Search suggestions failed", { status: error.status });
    return Response.json(
      { error: "Suggestions are temporarily unavailable." },
      { status: error.status === 429 ? 503 : 502 },
    );
  }
}
