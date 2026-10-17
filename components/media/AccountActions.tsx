"use client";

import {
  useEffect,
  useState,
  useTransition,
  type FormEvent,
} from "react";
import Link from "next/link";

import {
  submitRating,
  updateFavorite,
  updateWatchlist,
  clearExpiredSession,
} from "@/actions/account";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type {
  AccountActionResult,
  AccountMediaType,
  AccountStateUpdate,
  TmdbAccountStates,
} from "@/lib/account-types";

function applyUpdate(
  states: TmdbAccountStates,
  update: AccountStateUpdate,
): TmdbAccountStates {
  if (update.field === "rated") {
    return { ...states, rated: { value: update.value } };
  }
  if (update.field === "favorite") {
    return { ...states, favorite: update.value };
  }
  return { ...states, watchlist: update.value };
}

export default function AccountActions({
  mediaType,
  mediaId,
  path,
  isAuthenticated,
  accountStates,
  sessionExpired,
}: {
  mediaType: AccountMediaType;
  mediaId: number;
  path: string;
  isAuthenticated: boolean;
  accountStates: TmdbAccountStates | null;
  sessionExpired: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<AccountActionResult | null>(null);
  const [localState, setLocalState] = useState<{
    source: string;
    states: TmdbAccountStates;
  } | null>(null);
  const sourceKey = JSON.stringify(accountStates);
  const states =
    localState?.source === sourceKey ? localState.states : accountStates;

  useEffect(() => {
    if (!sessionExpired) return;

    startTransition(async () => {
      await clearExpiredSession();
    });
  }, [sessionExpired]);

  function handleResult(result: AccountActionResult) {
    setFeedback(result);
    if (result.status !== "success" || !states) return;

    setLocalState({
      source: sourceKey,
      states: applyUpdate(states, result.update),
    });
  }

  function changeWatchlist() {
    if (!states) return;
    const value = !states.watchlist;

    startTransition(async () => {
      handleResult(await updateWatchlist(mediaType, mediaId, value));
    });
  }

  function changeFavorite() {
    if (!states) return;
    const value = !states.favorite;

    startTransition(async () => {
      handleResult(await updateFavorite(mediaType, mediaId, value));
    });
  }

  function rateTitle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const rawRating = new FormData(event.currentTarget).get("rating");
    if (typeof rawRating !== "string") {
      setFeedback({
        status: "error",
        message: "Enter a rating from 0.5 to 10 in 0.5-point steps.",
      });
      return;
    }
    const rating = Number(rawRating);

    startTransition(async () => {
      handleResult(await submitRating(mediaType, mediaId, rating));
    });
  }

  const loginHref = `/api/auth/login?${new URLSearchParams({ next: path }).toString()}`;

  return (
    <section
      aria-labelledby="account-actions-heading"
      className="mt-6 border border-border-hairline bg-surface-ink/80 p-4"
    >
      <h2
        id="account-actions-heading"
        className="font-headline text-title-editorial text-content-bone"
      >
        Your TMDB account
      </h2>

      {sessionExpired ? (
        <p role="status" className="mt-3 text-sm text-status-warning">
          Your TMDB session expired. It is being cleared; sign in again to
          manage this title.
        </p>
      ) : !isAuthenticated ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href={loginHref}
            className={buttonVariants({
              variant: "outline",
              className: "h-auto min-h-9 whitespace-normal py-2",
            })}
          >
            Sign in to manage watchlist
          </Link>
          <Link
            href={loginHref}
            className={buttonVariants({
              variant: "outline",
              className: "h-auto min-h-9 whitespace-normal py-2",
            })}
          >
            Sign in to save as favorite
          </Link>
          <Link
            href={loginHref}
            className={buttonVariants({
              variant: "outline",
              className: "h-auto min-h-9 whitespace-normal py-2",
            })}
          >
            Sign in to rate
          </Link>
        </div>
      ) : !states ? (
        <div className="mt-3">
          <p role="status" className="text-sm text-content-fog">
            TMDB account state could not be loaded.
          </p>
          <Link
            href={path}
            className="mt-2 inline-flex text-sm text-brand-vermilion underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-vermilion"
          >
            Retry account state
          </Link>
        </div>
      ) : (
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col justify-between gap-3 border border-border-hairline bg-surface-reel p-3">
            <p className="metadata text-[10px] text-content-fog">
              WATCHLIST: {states.watchlist ? "SAVED" : "NOT SAVED"}
            </p>
            <Button
              type="button"
              variant="outline"
              className="w-full whitespace-normal"
              disabled={isPending}
              aria-pressed={states.watchlist}
              onClick={changeWatchlist}
            >
              {isPending
                ? "Updating account..."
                : states.watchlist
                  ? "Remove from watchlist"
                  : "Add to watchlist"}
            </Button>
          </div>

          <div className="flex flex-col justify-between gap-3 border border-border-hairline bg-surface-reel p-3">
            <p className="metadata text-[10px] text-content-fog">
              FAVORITE: {states.favorite ? "SAVED" : "NOT SAVED"}
            </p>
            <Button
              type="button"
              variant="outline"
              className="w-full whitespace-normal"
              disabled={isPending}
              aria-pressed={states.favorite}
              onClick={changeFavorite}
            >
              {isPending
                ? "Updating account..."
                : states.favorite
                  ? "Remove favorite"
                  : "Add to favorites"}
            </Button>
          </div>

          <form
            className="flex flex-col justify-between gap-3 border border-border-hairline bg-surface-reel p-3"
            onSubmit={rateTitle}
          >
            <label
              htmlFor={`${mediaType}-${mediaId}-rating`}
              className="metadata text-[10px] text-content-fog"
            >
              YOUR RATING:{" "}
              {states.rated === false
                ? "NOT RATED"
                : `${states.rated.value.toFixed(1)} / 10`}
            </label>
            <div className="flex gap-2">
              <Input
                id={`${mediaType}-${mediaId}-rating`}
                name="rating"
                type="number"
                min="0.5"
                max="10"
                step="0.5"
                required
                aria-label={`Your rating for this ${mediaType}`}
                disabled={isPending}
                className="min-w-0"
                defaultValue={
                  states.rated === false ? undefined : states.rated.value
                }
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Rate"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {feedback && (
        <p
          role="status"
          aria-live="polite"
          className={`mt-3 text-sm ${
            feedback.status === "success"
              ? "text-status-success"
              : feedback.status === "expired"
                ? "text-status-warning"
                : "text-status-error"
          }`}
        >
          {feedback.message}
        </p>
      )}
    </section>
  );
}
