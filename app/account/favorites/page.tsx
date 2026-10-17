import type { Metadata } from "next";

import AccountCollectionRoute from "@/components/account/AccountCollectionRoute";

export const metadata: Metadata = {
  title: "Your Favorites | iMovie",
  description: "Browse movies and TV shows saved as TMDB favorites.",
};

export default function FavoritesPage({
  searchParams,
}: PageProps<"/account/favorites">) {
  return (
    <AccountCollectionRoute
      collection="favorites"
      searchParams={searchParams}
    />
  );
}
