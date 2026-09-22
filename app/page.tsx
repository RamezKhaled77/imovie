import { getImageUrl } from "@/lib/tmdb/image";
import { getTrendingMovies } from "@/lib/tmdb/movies";
import Image from "next/image";

export default async function Home() {
  const movies = await getTrendingMovies();
  const poster = getImageUrl(movies.results[0].poster_path, "w200");

  return (
    <div className="editorial-display flex flex-col gap-3">
      <h1>{movies.results[0].title}</h1>
    </div>
  );
}
