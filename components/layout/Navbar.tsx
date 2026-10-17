import { Bookmark, UserRound } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import GenresDropdown from "@/components/filters/GenresDropdown";
import Link from "next/link";
import { getGenres } from "@/lib/tmdb/genres";
import NavMenuMobile from "./NavMenuMobile";
import { primaryMenu } from "@/lib/constants";
import NavDropdown from "./NavDropdown";
import SearchBox from "@/components/search/SearchBox";
import { Suspense } from "react";
import { logout } from "@/actions/auth";
import { getSessionId } from "@/lib/auth/session";

export default async function Navbar() {
  const [movieGenresRes, tvGenresRes, sessionId] = await Promise.all([
    getGenres("movie"),
    getGenres("tv"),
    getSessionId(),
  ]);
  const movieGenres = movieGenresRes.genres;
  const tvGenres = tvGenresRes.genres;

  return (
    <header className="relative z-50 border-b border-border-hairline bg-surface-ink/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] backdrop-blur-md">
      <nav className="mx-auto flex w-full flex-col gap-3 px-4 py-4 md:px-5 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 md:gap-4">
            <Link
              href="/"
              className="inline-flex items-center translate-y-[2px] font-headline font-medium text-[2rem] leading-none tracking-[-0.07em] text-content-bone md:text-[2.3rem]"
            >
              <span className="text-brand-vermilion">i</span>
              Movie
            </Link>
          </div>

          <div className="hidden flex-1 items-center justify-end gap-2 lg:flex">
            <div className="ml-1 flex items-center gap-2">
              <GenresDropdown movieGenres={movieGenres} tvGenres={tvGenres} />
            </div>
            <div className="flex items-center gap-1">
              <NavDropdown
                basePath="/movies?category="
                label="Movies"
                items={primaryMenu.Movies}
              />
              <NavDropdown
                basePath="/tv?category="
                label="Tv Shows"
                items={primaryMenu["TV Shows"]}
              />

              <Link
                href="/actors"
                className="inline-flex items-center rounded-md px-2.5 py-2 !text-base !font-medium !font-mono text-content-bone transition-colors hover:text-brand-vermilion"
              >
                Actors
              </Link>
            </div>
          </div>

          <div className="hidden flex-1 items-center justify-end gap-3 xl:flex">
            <Suspense
              fallback={
                <div
                  aria-hidden="true"
                  className="h-9 w-full max-w-[380px] rounded-sm border border-border-hairline bg-surface-raised"
                />
              }
            >
              <SearchBox className="max-w-[380px]" />
            </Suspense>

            <Link
              href="/account/watchlist"
              aria-label="Saved items"
              className={buttonVariants({
                variant: "outline",
                className:
                  "flex h-9 w-11 items-center justify-center rounded-lg border-border-hairline bg-surface-raised text-content-bone transition-colors hover:border-brand-vermilion/50 hover:text-brand-vermilion",
              })}
            >
              <Bookmark className="h-4 w-4" />
            </Link>

            {sessionId ? (
              <form action={logout}>
                <Button
                  type="submit"
                  className="inline-flex h-9 items-center gap-2 rounded-lg border border-border-hairline bg-surface-raised px-4 py-1 text-sm font-medium text-content-bone transition-colors hover:border-brand-vermilion/50 hover:text-brand-vermilion"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-vermilion/10 text-brand-vermilion">
                    <UserRound className="h-4 w-4" />
                  </span>
                  Log out
                </Button>
              </form>
            ) : (
              <Button
                render={<Link href="/login" />}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-border-hairline bg-surface-raised px-4 py-1 text-sm font-medium text-content-bone transition-colors hover:border-brand-vermilion/50 hover:text-brand-vermilion"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-vermilion/10 text-brand-vermilion">
                  <UserRound className="h-4 w-4" />
                </span>
                Log in with TMDB
              </Button>
            )}
          </div>
          <NavMenuMobile
            movieGenres={movieGenres}
            tvGenres={tvGenres}
            isAuthenticated={Boolean(sessionId)}
          />
        </div>
      </nav>
    </header>
  );
}
