import HomeHero from "@/components/home/HomeHero";
import PopularMoviesSection from "@/components/home/PopularMoviesSection";
import TrendingSection from "@/components/home/TrendingSection";
import { getPopularMovies, getTrendingMovies } from "@/lib/tmdb/movies";

export default async function Home() {
  const [trendingMovies, popularMovies] = await Promise.all([
    getTrendingMovies(),
    getPopularMovies(),
  ]);
  return (
    <main className="flex flex-1 flex-col">
      <HomeHero />
      <TrendingSection data={trendingMovies} />
      <PopularMoviesSection data={popularMovies} />
    </main>
  );
}
