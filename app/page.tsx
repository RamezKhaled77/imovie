import { getGenres } from "@/lib/tmdb/genres";
import { getImageUrl } from "@/lib/tmdb/image";
import { getTrendingMovies } from "@/lib/tmdb/movies";
import { Genre } from "@/lib/tmdb/types";
import Image from "next/image";

export default async function Home() {
  const movies = await getTrendingMovies();
  const movieGenres = await getGenres("movie");
  const tvGenres = await getGenres("tv");

  return (
    <div className="editorial-display flex flex-col gap-3">
      <h1>{movies.results[0].title}</h1>
      <ul>
        {movieGenres.map(({ id, name }: Genre) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
      <div>================================</div>
      <ul>
        {tvGenres.map(({ id, name }: Genre) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
