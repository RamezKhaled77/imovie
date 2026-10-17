import { notFound } from "next/navigation";
import TvDetailContent from "@/components/tv/TvDetailContent";
import {
  getSimilarTvShows,
  getTvCredits,
  getTvDetails,
  getTvVideos,
} from "@/lib/tmdb/tv";
import { getTvAccountStates } from "@/lib/tmdb/account";
import { TmdbError } from "@/lib/tmdb/error";
import { parseTmdbId } from "@/lib/tmdb/route-id";
import { getSessionId } from "@/lib/auth/session";
import type { TmdbAccountStates } from "@/lib/account-types";

type TvDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TvDetailsPage({ params }: TvDetailsPageProps) {
  const { id: rawId } = await params;
  const id = parseTmdbId(rawId);
  if (id === null) notFound();

  const sessionId = await getSessionId();
  let show: Awaited<ReturnType<typeof getTvDetails>>;
  let credits: Awaited<ReturnType<typeof getTvCredits>>;
  let videos: Awaited<ReturnType<typeof getTvVideos>>;
  let similar: Awaited<ReturnType<typeof getSimilarTvShows>>;
  let accountStates: TmdbAccountStates | null = null;
  let sessionExpired = false;

  try {
    const accountStatesRequest = sessionId
      ? getTvAccountStates(id, sessionId).catch((error: unknown) => {
          if (error instanceof TmdbError) {
            if (error.status === 401) {
              sessionExpired = true;
            } else {
              console.error("TMDB TV account state could not be loaded", {
                status: error.status,
                name: error.name,
              });
            }
            return null;
          }
          throw error;
        })
      : Promise.resolve(null);

    [show, credits, videos, similar, accountStates] = await Promise.all([
      getTvDetails(id),
      getTvCredits(id),
      getTvVideos(id),
      getSimilarTvShows(id),
      accountStatesRequest,
    ]);
  } catch (error) {
    if (error instanceof TmdbError && error.status === 404) notFound();
    throw error;
  }

  return (
    <TvDetailContent
      show={show}
      credits={credits}
      videos={videos}
      similar={similar}
      isAuthenticated={sessionId !== null && !sessionExpired}
      accountStates={accountStates}
      sessionExpired={sessionExpired}
    />
  );
}
