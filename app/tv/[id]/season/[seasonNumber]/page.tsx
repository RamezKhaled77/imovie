import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TvSeasonContent from "@/components/tv/TvSeasonContent";
import { TmdbError } from "@/lib/tmdb/error";
import { parseSeasonNumber, parseTmdbId } from "@/lib/tmdb/route-id";
import { getTvDetails, getTvSeason } from "@/lib/tmdb/tv";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; seasonNumber: string }>;
}): Promise<Metadata> {
  const { id: rawId, seasonNumber: rawSeasonNumber } = await params;
  const id = parseTmdbId(rawId);
  const seasonNumber = parseSeasonNumber(rawSeasonNumber);

  if (id === null || seasonNumber === null) {
    return { title: "Season not found" };
  }

  try {
    const [show, season] = await Promise.all([
      getTvDetails(id),
      getTvSeason(id, seasonNumber),
    ]);

    return {
      title: `${show.name} — Season ${season.season_number}`,
      description:
        season.overview ||
        `Browse the ${season.season_number} season details for ${show.name}.`,
    };
  } catch {
    return { title: "TV season details" };
  }
}

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
