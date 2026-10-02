import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import MovieCardActions from "@/components/home/MovieCardActions";
import { Movie } from "@/lib/tmdb/types";
import { getImageUrl } from "@/lib/tmdb/image";

export default function MovieCard({ movie }: { movie: Movie }) {
  const posterUrl = getImageUrl(movie.poster_path, "w500");
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  return (
    <article className="group relative rounded-sm border border-border-hairline bg-surface-reel transition-colors hover:z-20 hover:border-border-strong focus-within:z-20">
      <Link
        href={`/movies/${movie.id}`}
        aria-label={`View details for ${movie.title}`}
        className="block overflow-hidden rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-vermilion"
      >
        <div className="relative aspect-[2/3] overflow-hidden bg-surface-raised">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={`${movie.title} film artwork`}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 16vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div>No Poster Available</div>
          )}
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-sm border border-brand-brass-border bg-surface-ink/90 px-2 py-1 font-mono text-xs font-semibold text-brand-brass">
            <Star aria-hidden="true" className="size-3 fill-current" />
            {movie.vote_average?.toFixed(1)}
          </span>
        </div>
        <div className="px-3 py-2.5">
          <h3 className="truncate font-headline text-title-editorial text-content-bone">
            {movie.title}
          </h3>
          <p className="metadata mt-1.5 truncate text-[10px] text-content-warm">
            {year ?? "_"} · <span className="capitalize">language</span>:{" "}
            {movie.original_language}
          </p>
        </div>
      </Link>
      <MovieCardActions />
    </article>
  );
}
