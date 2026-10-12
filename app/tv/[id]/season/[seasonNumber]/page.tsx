import { notFound } from "next/navigation";
import TvSeasonContent from "@/components/tv/TvSeasonContent";
import { TmdbError } from "@/lib/tmdb/error";
import { parseSeasonNumber, parseTmdbId } from "@/lib/tmdb/route-id";
import { getTvSeason } from "@/lib/tmdb/tv";

type TvSeasonPageProps = {
  params: Promise<{ id: string; seasonNumber: string }>;
};

export default async function TvSeasonPage({ params }: TvSeasonPageProps) {
  const { id: rawId, seasonNumber: rawSeasonNumber } = await params;
  const id = parseTmdbId(rawId);
  const seasonNumber = parseSeasonNumber(rawSeasonNumber);
  if (id === null || seasonNumber === null) notFound();

  let season: Awaited<ReturnType<typeof getTvSeason>>;
  try {
    season = await getTvSeason(id, seasonNumber);
  } catch (error) {
    if (error instanceof TmdbError && error.status === 404) notFound();
    throw error;
  }

  return <TvSeasonContent showId={id} season={season} />;
}
