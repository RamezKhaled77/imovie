import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import type { MovieCategory } from "@/lib/tmdb/movies";
import { getMoviesHref, getPageNumbers } from "./movies-page-utils";
import { cn } from "@/lib/utils";

export default function MoviesPagination({
  category,
  genreIds,
  page,
  totalPages,
}: {
  category: MovieCategory;
  genreIds: number[];
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <nav
      aria-label="Movie results pagination"
      className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border-hairline pt-5"
    >
      {page > 1 ? (
        <Link
          href={getMoviesHref(category, genreIds, page - 1)}
          aria-label="Go to the previous page"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "rounded-sm border-border-hairline bg-transparent !font-mono text-[14px] uppercase tracking-wide text-content-bone hover:bg-surface-raised",
          )}
        >
          &larr; Prev
        </Link>
      ) : (
        <Button
          variant="outline"
          size="sm"
          disabled
          className="rounded-sm border-border-hairline bg-transparent !font-mono text-[14px] uppercase tracking-wide text-content-fog"
        >
          &larr; Prev
        </Button>
      )}

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {pageNumbers.map((pageNumber, index) =>
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
              key={`page-${pageNumber}`}
              href={getMoviesHref(category, genreIds, pageNumber)}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={pageNumber === page ? "page" : undefined}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                pageNumber === page
                  ? "size-8 rounded-sm border-brand-vermilion bg-brand-vermilion px-0 font-mono text-[12px] text-surface-ink hover:bg-brand-vermilion-hover hover:text-surface-ink"
                  : "size-8 rounded-sm border-border-hairline bg-transparent px-0 font-mono text-[12px] text-content-fog hover:bg-surface-raised hover:text-content-bone",
              )}
            >
              {String(pageNumber).padStart(2, "0")}
            </Link>
          ),
        )}
      </div>

      {page < totalPages ? (
        <Link
          href={getMoviesHref(category, genreIds, page + 1)}
          aria-label="Go to the next page"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "rounded-sm border-border-hairline bg-transparent !font-mono !text-[14px] uppercase tracking-wide text-content-bone hover:bg-surface-raised",
          )}
        >
          Next &rarr;
        </Link>
      ) : (
        <Button
          variant="outline"
          size="sm"
          disabled
          className="rounded-sm border-border-hairline bg-transparent !font-mono !text-[14px] uppercase tracking-wide text-content-fog"
        >
          Next &rarr;
        </Button>
      )}
    </nav>
  );
}
