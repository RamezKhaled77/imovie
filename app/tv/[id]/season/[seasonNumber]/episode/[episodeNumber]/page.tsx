import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TvEpisodeContent from "@/components/tv/TvEpisodeContent";
import { TmdbError } from "@/lib/tmdb/error";
import {
  parseEpisodeNumber,
  parseSeasonNumber,
  parseTmdbId,
} from "@/lib/tmdb/route-id";
import { getTvDetails, getTvEpisode } from "@/lib/tmdb/tv";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    id: string;
    seasonNumber: string;
    episodeNumber: string;
  }>;
}): Promise<Metadata> {
  const {
    id: rawId,
    seasonNumber: rawSeasonNumber,
    episodeNumber: rawEpisodeNumber,
  } = await params;
  const id = parseTmdbId(rawId);
  const seasonNumber = parseSeasonNumber(rawSeasonNumber);
  const episodeNumber = parseEpisodeNumber(rawEpisodeNumber);

  if (id === null || seasonNumber === null || episodeNumber === null) {
    return { title: "Episode not found" };
  }

  try {
    const [show, episode] = await Promise.all([
      getTvDetails(id),
      getTvEpisode(id, seasonNumber, episodeNumber),
    ]);

    return {
      title: `${show.name} — S${seasonNumber}E${episodeNumber}`,
      description:
        episode.overview ||
        `Read the details for ${show.name} episode ${episodeNumber}.`,
    };
  } catch {
    return { title: "TV episode details" };
  }
}

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
