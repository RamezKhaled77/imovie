import { notFound } from "next/navigation";
import TvEpisodeContent from "@/components/tv/TvEpisodeContent";
import { TmdbError } from "@/lib/tmdb/error";
import {
  parseEpisodeNumber,
  parseSeasonNumber,
  parseTmdbId,
} from "@/lib/tmdb/route-id";
import { getTvEpisode } from "@/lib/tmdb/tv";

type TvEpisodePageProps = {
  params: Promise<{
    id: string;
    seasonNumber: string;
    episodeNumber: string;
  }>;
};

export default async function TvEpisodePage({ params }: TvEpisodePageProps) {
  const {
    id: rawId,
    seasonNumber: rawSeasonNumber,
    episodeNumber: rawEpisodeNumber,
  } = await params;
  const id = parseTmdbId(rawId);
  const seasonNumber = parseSeasonNumber(rawSeasonNumber);
  const episodeNumber = parseEpisodeNumber(rawEpisodeNumber);
  if (id === null || seasonNumber === null || episodeNumber === null) notFound();

  let episode: Awaited<ReturnType<typeof getTvEpisode>>;
  try {
    episode = await getTvEpisode(id, seasonNumber, episodeNumber);
  } catch (error) {
    if (error instanceof TmdbError && error.status === 404) notFound();
    throw error;
  }

  return <TvEpisodeContent showId={id} episode={episode} />;
}
