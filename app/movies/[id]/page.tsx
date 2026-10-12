import { notFound } from "next/navigation";
import MovieDetailContent from "@/components/movies/MovieDetailContent";
import { getMovieCredits, getMovieDetails, getMovieVideos, getSimilarMovies } from "@/lib/tmdb/movie-details";
import { parseTmdbId } from "@/lib/tmdb/route-id";
import { TmdbError } from "@/lib/tmdb/error";

type MovieDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MovieDetailsPage({
  params,
}: MovieDetailsPageProps) {
  const { id: rawId } = await params;
  const id = parseTmdbId(rawId);
  if (id === null) notFound();

  let movieData: Awaited<ReturnType<typeof getMovieDetails>>;
  let creditsData: Awaited<ReturnType<typeof getMovieCredits>>;
  let videosData: Awaited<ReturnType<typeof getMovieVideos>>;
  let similarData: Awaited<ReturnType<typeof getSimilarMovies>>;

  try {
    [movieData, creditsData, videosData, similarData] = await Promise.all([
      getMovieDetails(id),
      getMovieCredits(id),
      getMovieVideos(id),
      getSimilarMovies(id),
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
    />
  );
}
