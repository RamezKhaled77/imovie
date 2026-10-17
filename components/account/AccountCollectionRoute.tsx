import { redirect } from "next/navigation";

import AccountCollectionPage from "@/components/account/AccountCollectionPage";
import AccountExpiredSession from "@/components/account/AccountExpiredSession";
import { getSessionId } from "@/lib/auth/session";
import type { AccountMediaType } from "@/lib/account-types";
import {
  getAccountCollection,
  type AccountCollection,
} from "@/lib/tmdb/account";
import { TmdbError } from "@/lib/tmdb/error";
import { getValidPageNumber } from "@/lib/pagination";

type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AccountCollectionRoute({
  collection,
  searchParams,
}: {
  collection: AccountCollection;
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const typeParam = firstParam(params.type);
  const mediaType: AccountMediaType = typeParam === "tv" ? "tv" : "movie";
  const page = getValidPageNumber(params.page);
  const returnTo = `/account/${collection}?${new URLSearchParams({
    type: mediaType,
    page: String(page),
  }).toString()}`;
  const sessionId = await getSessionId();

  if (!sessionId) {
    const loginQuery = new URLSearchParams({ next: returnTo });
    redirect(`/api/auth/login?${loginQuery.toString()}`);
  }

  let data;
  try {
    data = await getAccountCollection(
      sessionId,
      mediaType,
      collection,
      page,
    );
  } catch (error) {
    if (error instanceof TmdbError && error.status === 401) {
      return <AccountExpiredSession returnTo={returnTo} />;
    }
    throw error;
  }

  return (
    <AccountCollectionPage
      collection={collection}
      mediaType={mediaType}
      page={page}
      data={data}
    />
  );
}
