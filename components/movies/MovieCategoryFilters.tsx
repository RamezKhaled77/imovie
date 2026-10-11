import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import type { MovieCategory } from "@/lib/tmdb/movies";
import { getMoviesHref, MOVIE_CATEGORIES } from "./movies-page-utils";
import { cn } from "@/lib/utils";

export default function MovieCategoryFilters({
  category,
  genreIds,
}: {
  category: MovieCategory;
  genreIds: number[];
}) {
  return (
    <nav
      aria-label="Movie categories"
      className="mb-5 flex flex-wrap gap-2 border-b border-border-hairline pb-5"
    >
      {MOVIE_CATEGORIES.map((item) => {
        const isActive = item.value === category;

        return (
          <Link
            key={item.value}
            href={getMoviesHref(item.value, genreIds)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              isActive
                ? "rounded-sm border-brand-vermilion bg-brand-vermilion font-mono text-[12px] uppercase tracking-wider text-surface-ink hover:bg-brand-vermilion-hover hover:text-surface-ink"
                : "rounded-sm border-border-hairline bg-transparent font-mono text-[12px] uppercase tracking-wider text-content-fog hover:border-brand-vermilion/40 hover:bg-surface-raised hover:text-content-bone",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
