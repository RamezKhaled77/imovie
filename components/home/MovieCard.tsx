import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";

export type MovieCardData = {
  id: number;
  title: string;
  year: number;
  runtime: string;
  detail: string;
  rating: string;
  image: string;
};

export default function MovieCard({ movie }: { movie: MovieCardData }) {
  return (
    <article className="group overflow-hidden rounded-sm border border-border-hairline bg-surface-reel transition-colors hover:border-border-strong">
      <Link
        href={`/movies/${movie.id}`}
        aria-label={`View details for ${movie.title}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-vermilion"
      >
        <div className="relative aspect-[2/3] overflow-hidden bg-surface-raised">
          <Image
            src={movie.image}
            alt={`${movie.title} film artwork`}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 16vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-sm border border-brand-brass-border bg-surface-ink/90 px-2 py-1 font-mono text-xs font-semibold text-brand-brass">
            <Star aria-hidden="true" className="size-3 fill-current" />
            {movie.rating}
          </span>
        </div>
        <div className="px-3 py-2.5">
          <h3 className="truncate font-headline text-title-editorial text-content-bone">
            {movie.title}
          </h3>
          <p className="metadata mt-1.5 truncate text-[10px] text-content-warm">
            {movie.year} · {movie.runtime} · {movie.detail}
          </p>
          <span className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase text-brand-vermilion transition-colors group-hover:text-content-bone">
            View details
            <ArrowUpRight aria-hidden="true" className="size-3" />
          </span>
        </div>
      </Link>
    </article>
  );
}
