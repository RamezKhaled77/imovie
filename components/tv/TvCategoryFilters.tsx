import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TV_CATEGORIES, type TvCategory } from "@/lib/tmdb/tv";
import { getTvHref } from "./tv-page-utils";

export default function TvCategoryFilters({
  category,
  genreIds,
}: {
  category: TvCategory;
  genreIds: number[];
}) {
  return (
    <nav
      aria-label="TV categories"
      className="mb-5 flex flex-wrap gap-2 border-b border-border-hairline pb-5"
    >
      {TV_CATEGORIES.map((item) => {
        const isActive = item.value === category;

        return (
          <Link
            key={item.value}
            href={getTvHref(item.value, genreIds)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
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
