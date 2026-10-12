import { notFound } from "next/navigation";
import TvDetailContent from "@/components/tv/TvDetailContent";
import {
  getSimilarTvShows,
  getTvCredits,
  getTvDetails,
  getTvVideos,
} from "@/lib/tmdb/tv";
import { TmdbError } from "@/lib/tmdb/error";
import { parseTmdbId } from "@/lib/tmdb/route-id";

type TvDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TvDetailsPage({ params }: TvDetailsPageProps) {
  const { id: rawId } = await params;
  const id = parseTmdbId(rawId);
  if (id === null) notFound();

  let show: Awaited<ReturnType<typeof getTvDetails>>;
  let credits: Awaited<ReturnType<typeof getTvCredits>>;
  let videos: Awaited<ReturnType<typeof getTvVideos>>;
  let similar: Awaited<ReturnType<typeof getSimilarTvShows>>;

  try {
    [show, credits, videos, similar] = await Promise.all([
      getTvDetails(id),
      getTvCredits(id),
      getTvVideos(id),
      getSimilarTvShows(id),
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
    />
  );
}
