import HomeHero from "@/components/home/HomeHero";
import PopularMoviesSection from "@/components/home/PopularMoviesSection";
import TrendingSection from "@/components/home/TrendingSection";

export default async function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HomeHero />
      <TrendingSection />
      <PopularMoviesSection />
    </main>
  );
}
