import Link from "next/link";
import type { TvCategory } from "@/lib/tmdb/tv";
import { TV_CATEGORIES } from "@/lib/tmdb/tv";

export default function TvHeader({
  category,
  selectedGenreCount,
}: {
  category: TvCategory;
  selectedGenreCount: number;
}) {
  const categoryLabel =
    TV_CATEGORIES.find((item) => item.value === category)?.label ?? "Popular";

  return (
    <header className="mb-7 border-b border-border-hairline pb-6">
      <nav
        aria-label="Breadcrumb"
        className="metadata mb-3 flex flex-wrap items-center gap-2 text-[10px] text-content-fog"
      >
        <Link href="/" className="transition-colors hover:text-content-bone">
          ARCHIVE
        </Link>
        <span aria-hidden="true">/</span>
        <Link href="/tv" className="transition-colors hover:text-content-bone">
          TV
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="text-brand-vermilion">
          {categoryLabel.toUpperCase()}
        </span>
      </nav>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="font-headline text-headline-lg-mobile text-content-bone sm:text-headline-lg">
          {categoryLabel} Series
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
