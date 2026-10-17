"use client";

import { useId, useState, useTransition } from "react";
import { BookmarkCheck, BookmarkPlus, Heart } from "lucide-react";

import { toggleFavorite, toggleWatchlist } from "@/actions/account";
import { Button } from "@/components/ui/button";
import type { AccountMediaType, AccountStateUpdate } from "@/lib/account-types";
import type { AccountCollection } from "@/lib/tmdb/account";

export default function MediaAccountActions({
  mediaType,
  mediaId,
  initialFavorite = null,
  initialWatchlist = null,
  collection,
  compact = false,
}: {
  mediaType: AccountMediaType;
  mediaId: number;
  initialFavorite?: boolean | null;
  initialWatchlist?: boolean | null;
  collection?: AccountCollection;
  compact?: boolean;
}) {
  const tooltipId = useId();
  const [isPending, startTransition] = useTransition();
  const [states, setStates] = useState<{
    favorite: boolean | null;
    watchlist: boolean | null;
  }>({
    favorite: initialFavorite,
    watchlist: initialWatchlist,
  });
  const [error, setError] = useState<string | null>(null);

  function applyUpdate(update: AccountStateUpdate) {
    if (update.field === "favorite") {
      setStates((current) => ({ ...current, favorite: update.value }));
    } else if (update.field === "watchlist") {
      setStates((current) => ({ ...current, watchlist: update.value }));
    }
  }

  function runToggle(field: "favorite" | "watchlist") {
    setError(null);
    startTransition(async () => {
      const result =
        field === "favorite"
          ? await toggleFavorite(mediaType, mediaId, collection)
          : await toggleWatchlist(mediaType, mediaId, collection);

      if (result.status === "success") {
        applyUpdate(result.update);
      } else {
        setError(result.message);
      }
    });
  }

  const favoriteLabel =
    states.favorite === null
      ? "Toggle favorite"
      : states.favorite
        ? "Remove it"
        : "Add to favorites";
  const watchlistLabel =
    states.watchlist === null
      ? "Toggle watchlist"
      : states.watchlist
        ? "Remove it"
        : "Add to watchlist";

  const controlClasses = compact
    ? "border border-border-hairline bg-surface-ink/90 text-content-bone shadow-md transition-[background-color,border-color,color,transform] duration-200 hover:scale-105 hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-vermilion motion-reduce:transition-none"
    : "h-auto min-h-8 flex-1 whitespace-normal border-border-hairline bg-transparent px-2 py-1.5 font-mono text-[9px] uppercase tracking-wide text-content-bone hover:bg-surface-raised";

  return (
    <div
      className={
        compact
          ? "absolute right-2 top-12 z-10 flex flex-col gap-2"
          : "flex flex-wrap gap-2"
      }
    >
      <div
        className={compact ? "group/action relative" : "flex min-w-0 flex-1"}
      >
        <Button
          type="button"
          variant={compact ? "ghost" : "outline"}
          size={compact ? "icon-sm" : "sm"}
          aria-label={favoriteLabel}
          aria-describedby={compact ? `${tooltipId}-favorite` : undefined}
          aria-pressed={states.favorite ?? undefined}
          disabled={isPending}
          onClick={() => runToggle("favorite")}
          className={`${controlClasses} ${
            states.favorite
              ? "border-brand-vermilion-border bg-brand-vermilion-muted text-brand-vermilion"
              : ""
          }`}
        >
          <Heart
            aria-hidden="true"
            className={`size-4 ${states.favorite ? "fill-current" : ""}`}
          />
          {!compact &&
            (isPending ? "Saving..." : states.favorite ? "Remove" : "Favorite")}
        </Button>
        {compact && (
          <span
            id={`${tooltipId}-favorite`}
            role="tooltip"
            className="pointer-events-none invisible absolute right-full top-1/2 mr-2 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-sm border border-border-hairline bg-surface-ink px-2.5 py-1.5 font-mono text-xs text-content-bone opacity-0 shadow-lg transition-[opacity,transform,visibility] duration-150 group-hover/action:visible group-hover/action:translate-x-0 group-hover/action:opacity-100 group-focus-within/action:visible group-focus-within/action:translate-x-0 group-focus-within/action:opacity-100 motion-reduce:transition-none"
          >
            {favoriteLabel}
          </span>
        )}
      </div>

      <div
        className={compact ? "group/action relative" : "flex min-w-0 flex-1"}
      >
        <Button
          type="button"
          variant={compact ? "ghost" : "outline"}
          size={compact ? "icon-sm" : "sm"}
          aria-label={watchlistLabel}
          aria-describedby={compact ? `${tooltipId}-watchlist` : undefined}
          aria-pressed={states.watchlist ?? undefined}
          disabled={isPending}
          onClick={() => runToggle("watchlist")}
          className={`${controlClasses} ${
            states.watchlist
              ? "border-brand-seaglass-border bg-brand-seaglass-muted text-brand-seaglass"
              : ""
          }`}
        >
          {states.watchlist ? (
            <BookmarkCheck aria-hidden="true" className="size-4" />
          ) : (
            <BookmarkPlus aria-hidden="true" className="size-4" />
          )}
          {!compact &&
            (isPending
              ? "Saving..."
              : states.watchlist
                ? "Remove"
                : "Watchlist")}
        </Button>
        {compact && (
          <span
            id={`${tooltipId}-watchlist`}
            role="tooltip"
            className="pointer-events-none invisible absolute right-full top-1/2 mr-2 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-sm border border-border-hairline bg-surface-ink px-2.5 py-1.5 font-mono text-xs text-content-bone opacity-0 shadow-lg transition-[opacity,transform,visibility] duration-150 group-hover/action:visible group-hover/action:translate-x-0 group-hover/action:opacity-100 group-focus-within/action:visible group-focus-within/action:translate-x-0 group-focus-within/action:opacity-100 motion-reduce:transition-none"
          >
            {watchlistLabel}
          </span>
        )}
      </div>

      {isPending && !compact && (
        <p className="w-full text-xs text-content-fog" role="status">
          Updating your TMDB account…
        </p>
      )}
      {error && (
        <p
          className="w-full text-xs text-status-error"
          role="status"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}
