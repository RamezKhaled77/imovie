import Link from "next/link";
import type { MovieCategory } from "@/lib/tmdb/movies";
import { MOVIE_CATEGORIES } from "./movies-page-utils";

export default function MoviesHeader({
  category,
  selectedGenreCount,
}: {
  category: MovieCategory;
  selectedGenreCount: number;
}) {
  const categoryLabel =
    MOVIE_CATEGORIES.find((item) => item.value === category)?.label ?? "Popular";

  return (
    <header className="mb-7 border-b border-border-hairline pb-6">
      <nav
        aria-label="Breadcrumb"
        className="metadata mb-3 flex flex-wrap items-center gap-2 text-[10px] text-content-fog"
      >
        <Link
          href="/"
          className="transition-colors hover:text-content-bone focus-visible:text-brand-vermilion"
        >
          ARCHIVE
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          href="/movies"
          className="transition-colors hover:text-content-bone focus-visible:text-brand-vermilion"
        >
          MOVIES
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="text-brand-vermilion">
          {categoryLabel.toUpperCase()}
        </span>
      </nav>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="font-headline text-headline-lg-mobile text-content-bone sm:text-headline-lg">
          {categoryLabel} Films
        </h1>
        {selectedGenreCount > 0 && (
          <p className="metadata text-[10px] text-content-fog">
            MATCHING ALL {selectedGenreCount} SELECTED GENRES
          </p>
        )}
      </div>
    </header>
  );
}
