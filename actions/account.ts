"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type {
  AccountActionResult,
  AccountMediaType,
  AccountStateUpdate,
} from "@/lib/account-types";
import { clearSessionId, getSessionId } from "@/lib/auth/session";
import {
  getTmdbAccountId,
  setTmdbFavorite,
  setTmdbRating,
  setTmdbWatchlist,
} from "@/lib/tmdb/account";
import { TmdbError } from "@/lib/tmdb/error";
import { parseTmdbId } from "@/lib/tmdb/route-id";

type AccountTarget = {
  mediaType: AccountMediaType;
  mediaId: number;
  path: string;
};

function getAccountTarget(
  mediaType: string,
  mediaId: number,
): AccountTarget | null {
  if (mediaType !== "movie" && mediaType !== "tv") return null;
  if (
    typeof mediaId !== "number" ||
    !Number.isSafeInteger(mediaId) ||
    parseTmdbId(String(mediaId)) !== mediaId
  ) {
    return null;
  }

  return {
    mediaType,
    mediaId,
    path: `/${mediaType}/${mediaId}`,
  };
}

async function performAccountMutation(
  mediaType: string,
  mediaId: number,
  operation: string,
  mutate: (
    accountId: number,
    sessionId: string,
    target: AccountTarget,
  ) => Promise<AccountStateUpdate>,
): Promise<AccountActionResult> {
  const target = getAccountTarget(mediaType, mediaId);
  if (!target) {
    return {
      status: "error",
      message: "This account action is invalid. Refresh the page and try again.",
    };
  }

  const sessionId = await getSessionId();
  if (!sessionId) {
    const loginQuery = new URLSearchParams({ next: target.path });
    redirect(`/api/auth/login?${loginQuery.toString()}`);
  }

  try {
    const accountId = await getTmdbAccountId(sessionId);
    const update = await mutate(accountId, sessionId, target);
    revalidatePath(target.path);
    return {
      status: "success",
      message: "Your TMDB account was updated.",
      update,
    };
  } catch (error) {
    if (!(error instanceof TmdbError)) throw error;

    if (error.status === 401) {
      await clearSessionId();
      revalidatePath(target.path);
      revalidatePath("/", "layout");
      return {
        status: "expired",
        message: "Your TMDB session expired. Sign in again to manage this title.",
      };
    }

    console.error("TMDB account mutation failed", {
      operation,
      status: error.status,
      name: error.name,
    });
    return {
      status: "error",
      message: "TMDB could not update your account. Your saved state was not changed.",
    };
  }
}

export async function updateWatchlist(
  mediaType: string,
  mediaId: number,
  watchlist: boolean,
): Promise<AccountActionResult> {
  if (typeof watchlist !== "boolean") {
    return {
      status: "error",
      message: "Choose whether to add or remove this title, then try again.",
    };
  }

  return performAccountMutation(
    mediaType,
    mediaId,
    "watchlist",
    async (accountId, sessionId, target) => {
      await setTmdbWatchlist(
        accountId,
        sessionId,
        target.mediaType,
        target.mediaId,
        watchlist,
      );
      return { field: "watchlist", value: watchlist };
    },
  );
}

export async function updateFavorite(
  mediaType: string,
  mediaId: number,
  favorite: boolean,
): Promise<AccountActionResult> {
  if (typeof favorite !== "boolean") {
    return {
      status: "error",
      message: "Choose whether to add or remove this title, then try again.",
    };
  }

  return performAccountMutation(
    mediaType,
    mediaId,
    "favorite",
    async (accountId, sessionId, target) => {
      await setTmdbFavorite(
        accountId,
        sessionId,
        target.mediaType,
        target.mediaId,
        favorite,
      );
      return { field: "favorite", value: favorite };
    },
  );
}

export async function submitRating(
  mediaType: string,
  mediaId: number,
  rating: number,
): Promise<AccountActionResult> {
  if (
    typeof rating !== "number" ||
    !Number.isFinite(rating) ||
    rating < 0.5 ||
    rating > 10 ||
    !Number.isInteger(rating * 2)
  ) {
    return {
      status: "error",
      message: "Enter a rating from 0.5 to 10 in 0.5-point steps.",
    };
  }

  return performAccountMutation(
    mediaType,
    mediaId,
    "rating",
    async (_accountId, sessionId, target) => {
      await setTmdbRating(
        sessionId,
        target.mediaType,
        target.mediaId,
        rating,
      );
      return { field: "rated", value: rating };
    },
  );
}

export async function clearExpiredSession(): Promise<void> {
  if (!(await getSessionId())) return;

  await clearSessionId();
  revalidatePath("/", "layout");
}
