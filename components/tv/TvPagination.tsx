import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { getPageNumbers } from "@/components/movies/movies-page-utils";
import type { TvCategory } from "@/lib/tmdb/tv";
import { cn } from "@/lib/utils";
import { getTvHref } from "./tv-page-utils";

export default function TvPagination({
  category,
  genreIds,
  page,
  totalPages,
}: {
  category: TvCategory;
  genreIds: number[];
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1 || page > totalPages) return null;

  return (
    <nav
      aria-label="TV results pagination"
      className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border-hairline pt-5"
    >
      {page > 1 ? (
        <Link
          href={getTvHref(category, genreIds, page - 1)}
          aria-label="Go to the previous page"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "rounded-sm border-border-hairline bg-transparent font-mono text-xs uppercase tracking-wide text-content-bone hover:bg-surface-raised",
          )}
        >
          &larr; Prev
        </Link>
      ) : (
        <Button
          variant="outline"
          size="sm"
          disabled
          className="rounded-sm border-border-hairline bg-transparent font-mono text-xs uppercase tracking-wide text-content-fog"
        >
          &larr; Prev
        </Button>
      )}
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {getPageNumbers(page, totalPages).map((pageNumber, index) =>
          pageNumber === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              aria-hidden="true"
              className="px-1 font-mono text-xs text-content-fog"
            >
              ...
            </span>
          ) : (
            <Link
              key={pageNumber}
              href={getTvHref(category, genreIds, pageNumber)}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={pageNumber === page ? "page" : undefined}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                pageNumber === page
                  ? "size-8 rounded-sm border-brand-vermilion bg-brand-vermilion px-0 font-mono text-xs text-surface-ink hover:bg-brand-vermilion-hover hover:text-surface-ink"
                  : "size-8 rounded-sm border-border-hairline bg-transparent px-0 font-mono text-xs text-content-fog hover:bg-surface-raised hover:text-content-bone",
              )}
            >
              {String(pageNumber).padStart(2, "0")}
            </Link>
          ),
        )}
      </div>
      {page < totalPages ? (
        <Link
          href={getTvHref(category, genreIds, page + 1)}
          aria-label="Go to the next page"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "rounded-sm border-border-hairline bg-transparent font-mono text-xs uppercase tracking-wide text-content-bone hover:bg-surface-raised",
          )}
        >
          Next &rarr;
        </Link>
      ) : (
        <Button
          variant="outline"
          size="sm"
          disabled
          className="rounded-sm border-border-hairline bg-transparent font-mono text-xs uppercase tracking-wide text-content-fog"
        >
          Next &rarr;
        </Button>
      )}
    </nav>
  );
}
