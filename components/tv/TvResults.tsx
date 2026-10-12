import Link from "next/link";
import MediaCard from "@/components/media/MediaCard";
import MediaGrid from "@/components/media/MediaGrid";
import { Button } from "@/components/ui/button";
import type { TvCategory } from "@/lib/tmdb/tv";
import type { TvShowSummary } from "@/lib/tmdb/types";
import { getTvHref } from "./tv-page-utils";

export default function TvResults({
  category,
  genreIds,
  shows,
  totalResults,
  page,
  totalPages,
}: {
  category: TvCategory;
  genreIds: number[];
  shows: TvShowSummary[];
  totalResults: number;
  page: number;
  totalPages: number;
}) {
  const isOutOfRange = page > totalPages;
  const hasGenreFilters = genreIds.length > 0;

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-border-hairline pb-3">
        <p className="metadata text-[10px] text-content-fog">
          SHOWING <span className="text-content-bone">{shows.length}</span> OF{" "}
          <span className="text-content-bone">
            {totalResults.toLocaleString()}
          </span>{" "}
          SERIES <span className="mx-1 text-border-strong">|</span> PAGE{" "}
          <span className="text-content-bone">{page}</span> OF {totalPages}
        </p>
      </div>
      {shows.length > 0 ? (
        <MediaGrid>
          {shows.map((show) => (
            <MediaCard
              key={show.id}
              href={`/tv/${show.id}`}
              title={show.name}
              imagePath={show.poster_path}
              year={show.first_air_date?.slice(0, 4)}
              voteAverage={show.vote_average}
              mediaType="TV"
            />
          ))}
        </MediaGrid>
      ) : (
        <section
          aria-labelledby="tv-empty-heading"
          className="border border-border-hairline bg-surface-reel px-5 py-12 text-center"
        >
          <h2
            id="tv-empty-heading"
            className="font-headline text-headline-sm text-content-bone"
          >
            {page > totalPages
              ? "This page is beyond the archive"
              : "No series found"}
          </h2>
          <p className="mx-auto mt-2 max-w-prose text-sm text-content-fog">
            {isOutOfRange
              ? `This category has ${totalPages} ${totalPages === 1 ? "page" : "pages"} of results. Choose an available page or adjust your filters.`
              : hasGenreFilters
                ? "No series match every selected genre. Try removing a genre filter."
                : "There are no series to show in this category right now. Try another category."}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {isOutOfRange ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-sm border-border-hairline bg-transparent font-mono text-[10px] uppercase tracking-wide text-content-bone hover:bg-surface-raised"
                  render={<Link href={getTvHref(category, genreIds, 1)} />}
                >
                  First page
                </Button>
                {totalPages > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-sm border-border-hairline bg-transparent font-mono text-[10px] uppercase tracking-wide text-content-bone hover:bg-surface-raised"
                    render={
                      <Link
                        href={getTvHref(category, genreIds, totalPages)}
                      />
                    }
                  >
                    Last available page
                  </Button>
                )}
              </>
            ) : (
              <>
                {hasGenreFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-sm border-border-hairline bg-transparent font-mono text-[10px] uppercase tracking-wide text-content-bone hover:bg-surface-raised"
                    render={<Link href={getTvHref(category, [], 1)} />}
                  >
                    Clear genre filters
                  </Button>
                )}
                {category !== "popular" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-sm border-border-hairline bg-transparent font-mono text-[10px] uppercase tracking-wide text-content-bone hover:bg-surface-raised"
                    render={<Link href={getTvHref("popular", genreIds, 1)} />}
                  >
                    Browse popular series
                  </Button>
                )}
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}
