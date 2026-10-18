import type { Metadata } from "next";
import { notFound } from "next/navigation";

import MovieDetailContent from "@/components/movies/MovieDetailContent";
import { getMovieAccountStates } from "@/lib/tmdb/account";
import { TmdbError } from "@/lib/tmdb/error";
import {
  getMovieCredits,
  getMovieDetails,
  getMovieVideos,
  getSimilarMovies,
} from "@/lib/tmdb/movie-details";
import { parseTmdbId } from "@/lib/tmdb/route-id";
import { getSessionId } from "@/lib/auth/session";
import type { TmdbAccountStates } from "@/lib/account-types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: rawId } = await params;
  const id = parseTmdbId(rawId);

  if (id === null) {
    return { title: "Movie not found | iMovie" };
  }

  try {
    const movie = await getMovieDetails(id);
    return {
      title: `${movie.title} | iMovie`,
      description:
        movie.overview || "Explore this movie title and related details on iMovie.",
    };
  } catch {
    return { title: "Movie details | iMovie" };
  }
}

type MovieDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MovieDetailsPage({
  params,
}: MovieDetailsPageProps) {
  const { id: rawId } = await params;
  const id = parseTmdbId(rawId);
  if (id === null) notFound();

  const sessionId = await getSessionId();
  let movieData: Awaited<ReturnType<typeof getMovieDetails>>;
  let creditsData: Awaited<ReturnType<typeof getMovieCredits>>;
  let videosData: Awaited<ReturnType<typeof getMovieVideos>>;
  let similarData: Awaited<ReturnType<typeof getSimilarMovies>>;
  let accountStates: TmdbAccountStates | null = null;
  let sessionExpired = false;

  try {
    const accountStatesRequest = sessionId
      ? getMovieAccountStates(id, sessionId).catch((error: unknown) => {
          if (error instanceof TmdbError) {
            if (error.status === 401) {
              sessionExpired = true;
            } else {
              console.error("TMDB movie account state could not be loaded", {
                status: error.status,
                name: error.name,
              });
            }
            return null;
          }
          throw error;
        })
      : Promise.resolve(null);

    [movieData, creditsData, videosData, similarData, accountStates] =
      await Promise.all([
        getMovieDetails(id),
        getMovieCredits(id),
        getMovieVideos(id),
        getSimilarMovies(id),
        accountStatesRequest,
      ]);
  } catch (error) {
    if (error instanceof TmdbError && error.status === 404) notFound();
    throw error;
  }

  return (
    <MovieDetailContent
      movie={movieData}
      credits={creditsData}
      videos={videosData}
      similar={similarData}
      isAuthenticated={sessionId !== null && !sessionExpired}
      accountStates={accountStates}
      sessionExpired={sessionExpired}
    />
  );
}
