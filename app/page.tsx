import HomeHero from "@/components/home/HomeHero";
import LatestMoviesSection from "@/components/home/LatestMoviesSection";
import PopularMoviesSection from "@/components/home/PopularMoviesSection";
import TrendingSection from "@/components/home/TrendingSection";
import { getValidPageNumber } from "@/lib/pagination";
import {
  getLatestMovies,
  getPopularMovies,
  getTrendingMovies,
} from "@/lib/tmdb/movies";

type HomePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const page = getValidPageNumber((await searchParams).page);
  const [latestMovies, trendingMovies, popularMovies] = await Promise.all([
    getLatestMovies(page),
    getTrendingMovies(),
    getPopularMovies(),
  ]);

  return (
    <main className="flex flex-1 flex-col">
      <HomeHero />
      <LatestMoviesSection data={latestMovies} page={page} />
      <TrendingSection data={trendingMovies} />
      <PopularMoviesSection data={popularMovies} />
    </main>
  );
}
