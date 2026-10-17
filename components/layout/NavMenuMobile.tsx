"use client";

import {
  Bookmark,
  ChevronDown,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button, buttonVariants } from "../ui/button";
import GenresDropdown from "../filters/GenresDropdown";
import Link from "next/link";
import { Genre } from "@/lib/tmdb/types";
import SearchBox from "@/components/search/SearchBox";
import { primaryMenu } from "@/lib/constants";
import { logout } from "@/actions/auth";

export default function NavMenuMobile({
  movieGenres,
  tvGenres,
  isAuthenticated,
}: {
  movieGenres: Genre[];
  tvGenres: Genre[];
  isAuthenticated: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        type="button"
        aria-label={
          mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
        }
        onClick={() => setMobileMenuOpen((open) => !open)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border-hairline bg-surface-raised text-content-bone transition-colors hover:border-brand-vermilion/50 hover:text-brand-vermilion lg:hidden"
      >
        {mobileMenuOpen ? (
          <X className="h-4 w-4" />
        ) : (
          <Menu className="h-4 w-4" />
        )}
      </Button>

      {mobileMenuOpen && (
        <div className="flex flex-col gap-2 lg:hidden">
          <div className="flex items-center justify-center gap-1">
            {Object.entries(primaryMenu).map(([label, items]) => (
              <DropdownMenu key={label}>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 gap-1 rounded-md border border-transparent bg-transparent px-2.5 !text-base !font-medium !font-mono text-content-bone hover:border-border-hairline hover:bg-surface-raised hover:text-brand-vermilion data-[popup-open=true]:border-brand-vermilion/30 data-[popup-open=true]:bg-brand-vermilion/5"
                    />
                  }
                >
                  <span className="flex w-full items-center justify-between gap-1.5">
                    <span>{label}</span>
                    <ChevronDown className="h-3.5 w-3.5 text-content-fog" />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[180px] rounded-xl border border-border-hairline bg-surface-reel p-2 text-content-bone shadow-2xl">
                  {items.map((item) => (
                    <DropdownMenuItem
                      key={item.endPoint}
                      render={
                        <Link
                          href={`${
                            label === "Movies"
                              ? "/movies?category="
                              : "/tv?category="
                          }${item.endPoint}`}
                          onClick={() => setMobileMenuOpen(false)}
                        />
                      }
                      className="cursor-pointer rounded-md px-2 py-1.5 text-sm text-content-bone focus:bg-surface-raised focus:text-brand-vermilion"
                    >
                      {item.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
            <div className="flex flex-col gap-2">
              <GenresDropdown movieGenres={movieGenres} tvGenres={tvGenres} />
            </div>
          </div>
          <Link
            href="/actors"
            className="text-center px-2 py-1.5 rounded-md border !text-base !font-medium !font-mono text-content-bone border-hairline bg-surface-raised hover:text-brand-vermilion data-[popup-open=true]:border-brand-vermilion/30 data-[popup-open=true]:bg-brand-vermilion/5"
          >
            Actors
          </Link>

          <SearchBox onNavigate={() => setMobileMenuOpen(false)} />

          <div className="flex items-center justify-between gap-2">
            <Link
              href="/account/watchlist"
              onClick={() => setMobileMenuOpen(false)}
              className={buttonVariants({
                variant: "outline",
                className:
                  "inline-flex items-center gap-2 rounded-md border-border-hairline bg-surface-raised px-3 py-2 text-sm text-content-bone",
              })}
            >
              <Bookmark className="h-4 w-4" />
              Watchlist
            </Link>

            {isAuthenticated ? (
              <form action={logout}>
                <Button
                  type="submit"
                  variant="outline"
                  className="inline-flex items-center gap-2 rounded-md border border-border-hairline bg-surface-raised px-3 py-2 text-sm font-medium text-content-bone"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-vermilion/10 text-brand-vermilion">
                    <UserRound className="h-3.5 w-3.5" />
                  </span>
                  Log out
                </Button>
              </form>
            ) : (
              <Button
                render={
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                }
                variant="outline"
                className="inline-flex items-center gap-2 rounded-md border border-border-hairline bg-surface-raised px-3 py-2 text-sm font-medium text-content-bone"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-vermilion/10 text-brand-vermilion">
                  <UserRound className="h-3.5 w-3.5" />
                </span>
                Log in
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
