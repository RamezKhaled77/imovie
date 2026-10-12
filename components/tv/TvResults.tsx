import Link from "next/link";
import MediaCard from "@/components/media/MediaCard";
import MediaGrid from "@/components/media/MediaGrid";
import type { TvCategory } from "@/lib/tmdb/tv";
import type { TvShowSummary } from "@/lib/tmdb/types";
import { getTvHref } from "./tv-page-utils";

export default function TvResults({
  category,
  shows,
  totalResults,
  page,
  totalPages,
}: {
  category: TvCategory;
  shows: TvShowSummary[];
  totalResults: number;
  page: number;
  totalPages: number;
}) {
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
              ? "That page is outside this collection"
              : "No series found"}
          </h2>
          <p className="mx-auto mt-2 max-w-prose text-sm text-content-fog">
            Try another category or clear the selected genres.
          </p>
          <Link
            href={getTvHref(category, [], 1)}
            className="mt-5 inline-flex text-sm font-medium text-brand-vermilion hover:underline"
          >
            Browse this category from the beginning
          </Link>
        </section>
      )}
    </>
  );
}
