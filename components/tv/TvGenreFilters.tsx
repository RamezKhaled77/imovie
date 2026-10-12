import Link from "next/link";
import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import type { Genre } from "@/lib/tmdb/types";
import type { TvCategory } from "@/lib/tmdb/tv";
import { cn } from "@/lib/utils";
import { getTvHref } from "./tv-page-utils";

export default function TvGenreFilters({
  category,
  genres,
  genreIds,
}: {
  category: TvCategory;
  genres: Genre[];
  genreIds: number[];
}) {
  const selectedGenres = new Set(genreIds);

  return (
    <section
      aria-labelledby="tv-genre-filter-heading"
      className="mb-6 border border-border-hairline bg-surface-reel p-4 sm:p-5"
    >
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2
            id="tv-genre-filter-heading"
            className="metadata text-[13px] uppercase tracking-wider text-content-bone"
          >
            Genres
          </h2>
          <p className="metadata text-[10px] text-content-fog">
            SELECT ANY · RESULTS MATCH ALL
          </p>
        </div>
        {genreIds.length > 0 && (
          <Link
            href={getTvHref(category, [])}
            className={cn(
              buttonVariants({ variant: "outline", size: "xs" }),
              "rounded-sm border-border-hairline bg-transparent font-mono text-[12px] uppercase tracking-wide text-content-fog hover:border-brand-vermilion/40 hover:bg-surface-raised hover:text-content-bone",
            )}
          >
            Clear filters
          </Link>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => {
          const isSelected = selectedGenres.has(genre.id);
          const nextGenreIds = isSelected
            ? genreIds.filter((id) => id !== genre.id)
            : [...genreIds, genre.id].sort((first, second) => first - second);

          return (
            <Link
              key={genre.id}
              href={getTvHref(category, nextGenreIds)}
              aria-current={isSelected ? "true" : undefined}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                isSelected
                  ? "h-7 rounded-sm border-brand-vermilion/60 bg-brand-vermilion-muted px-2.5 font-mono text-[12px] text-brand-vermilion hover:border-brand-vermilion hover:bg-brand-vermilion/15"
                  : "h-7 rounded-sm border-border-hairline bg-transparent px-2.5 font-mono text-[12px] text-content-fog hover:border-brand-vermilion/40 hover:bg-surface-raised hover:text-content-bone",
              )}
            >
              {isSelected && <Check aria-hidden="true" className="size-3" />}
              {genre.name}
            </Link>
          );
        })}
        {genres.length === 0 && (
          <p className="text-sm text-content-fog">
            No TV genres are available right now.
          </p>
        )}
      </div>
    </section>
  );
}
