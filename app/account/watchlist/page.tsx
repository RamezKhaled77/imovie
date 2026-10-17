import type { Metadata } from "next";

import AccountCollectionRoute from "@/components/account/AccountCollectionRoute";

export const metadata: Metadata = {
  title: "Your Watchlist | iMovie",
  description: "Browse movies and TV shows saved to your TMDB watchlist.",
};

export default function WatchlistPage({
  searchParams,
}: PageProps<"/account/watchlist">) {
  return (
    <AccountCollectionRoute
      collection="watchlist"
      searchParams={searchParams}
    />
  );
}
