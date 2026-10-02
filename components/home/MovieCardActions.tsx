"use client";

import { useId, useState } from "react";
import { BookmarkCheck, BookmarkPlus, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MovieCardActions() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const tooltipId = useId();

  return (
    <div className="absolute right-2 top-12 z-10 flex flex-col gap-2">
      <div className="group/action relative">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          aria-describedby={`${tooltipId}-favorite`}
          aria-pressed={isFavorite}
          onClick={() => setIsFavorite((current) => !current)}
          className={`border border-border-hairline bg-surface-ink/90 text-content-bone shadow-md transition-[background-color,border-color,color,transform] duration-200 hover:scale-105 hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-vermilion motion-reduce:transition-none ${
            isFavorite
              ? "border-brand-vermilion-border bg-brand-vermilion-muted text-brand-vermilion"
              : ""
          }`}
        >
          <Heart
            aria-hidden="true"
            className={`size-4 ${isFavorite ? "fill-current" : ""}`}
          />
        </Button>
        <span
          id={`${tooltipId}-favorite`}
          role="tooltip"
          className="pointer-events-none invisible absolute right-full top-1/2 mr-2 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-sm border border-border-hairline bg-surface-ink px-2.5 py-1.5 font-mono text-xs text-content-bone opacity-0 shadow-lg transition-[opacity,transform,visibility] duration-150 group-hover/action:visible group-hover/action:translate-x-0 group-hover/action:opacity-100 group-focus-within/action:visible group-focus-within/action:translate-x-0 group-focus-within/action:opacity-100 motion-reduce:transition-none"
        >
          {isFavorite ? "Remove from favorites" : "Add to favorites"}
        </span>
      </div>

      <div className="group/action relative">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={
            isInWatchlist ? "Remove from watchlist" : "Add to watchlist"
          }
          aria-describedby={`${tooltipId}-watchlist`}
          aria-pressed={isInWatchlist}
          onClick={() => setIsInWatchlist((current) => !current)}
          className={`border border-border-hairline bg-surface-ink/90 text-content-bone shadow-md transition-[background-color,border-color,color,transform] duration-200 hover:scale-105 hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-vermilion motion-reduce:transition-none ${
            isInWatchlist
              ? "border-brand-seaglass-border bg-brand-seaglass-muted text-brand-seaglass"
              : ""
          }`}
        >
          {isInWatchlist ? (
            <BookmarkCheck aria-hidden="true" className="size-4" />
          ) : (
            <BookmarkPlus aria-hidden="true" className="size-4" />
          )}
        </Button>
        <span
          id={`${tooltipId}-watchlist`}
          role="tooltip"
          className="pointer-events-none invisible absolute right-full top-1/2 mr-2 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-sm border border-border-hairline bg-surface-ink px-2.5 py-1.5 font-mono text-xs text-content-bone opacity-0 shadow-lg transition-[opacity,transform,visibility] duration-150 group-hover/action:visible group-hover/action:translate-x-0 group-hover/action:opacity-100 group-focus-within/action:visible group-focus-within/action:translate-x-0 group-focus-within/action:opacity-100 motion-reduce:transition-none"
        >
          {isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
        </span>
      </div>
    </div>
  );
}
