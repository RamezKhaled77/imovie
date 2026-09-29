import { Bookmark, ChevronDown, Search, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GenresDropdown from "@/components/filters/GenresDropdown";
import Link from "next/link";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { getGenres } from "@/lib/tmdb/genres";
import NavMenuMobile from "./NavMenuMobile";

const primaryMenu = {
  Movies: [
    { name: "Popular", endPoint: "popular" },
    { name: "Now Playing", endPoint: "now_playing" },
    { name: "Top Rated", endPoint: "top_rated" },
    { name: "Upcoming", endPoint: "upcoming" },
  ],
  "TV Shows": [
    { name: "Popular", endPoint: "popular" },
    { name: "On The Air", endPoint: "on_the_air" },
    { name: "Top Rated", endPoint: "top_rated" },
    { name: "Airing Today", endPoint: "airing_today" },
  ],
};

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: { name: string; endPoint: string }[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className="h-9 gap-1.5 rounded-md border border-transparent bg-transparent px-2.5 !text-base !font-medium !font-mono text-content-bone hover:border-border-hairline hover:bg-surface-raised hover:text-brand-vermilion data-[popup-open=true]:border-brand-vermilion/40 data-[popup-open=true]:bg-brand-vermilion/5"
          />
        }
      >
        <span className="flex items-center gap-1.5">
          {label}
          <ChevronDown className="h-3.5 w-3.5 text-content-fog" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-[200px] rounded-lg border border-border-hairline bg-surface-reel p-2 text-content-bone shadow-2xl"
      >
        <DropdownMenuGroup>
          {items.map((item) => (
            <DropdownMenuItem
              key={item.name}
              className="cursor-pointer rounded-md px-2 py-1.5 text-sm text-content-bone font-medium focus:bg-surface-raised focus:text-brand-vermilion"
            >
              {item.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default async function Navbar() {
  const [movieGenresRes, tvGenresRes] = await Promise.all([
    getGenres("movie"),
    getGenres("tv"),
  ]);
  const movieGenres = movieGenresRes.genres;
  const tvGenres = tvGenresRes.genres;

  return (
    <header className="border-b border-border-hairline bg-surface-ink/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] backdrop-blur-md">
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
              <NavDropdown label="Movies" items={primaryMenu.Movies} />
              <NavDropdown label="Tv Shows" items={primaryMenu["TV Shows"]} />

              <Link
                href="/actors"
                className="inline-flex items-center rounded-md px-2.5 py-2 !text-base !font-medium !font-mono text-content-bone transition-colors hover:text-brand-vermilion"
              >
                Actors
              </Link>
            </div>
          </div>

          <div className="hidden flex-1 items-center justify-end gap-3 xl:flex">
            <Label className="relative block w-full max-w-[380px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-content-fog" />
              <Input
                type="search"
                placeholder="Search films, series, actors..."
                className="h-9 w-full rounded-lg bg-surface-raised/80 pl-10 pr-4 text-sm text-content-bone placeholder:text-content-fog transition-colors"
              />
            </Label>

            <button
              type="button"
              aria-label="Saved items"
              className="flex h-9 w-11 items-center justify-center rounded-lg border border-border-hairline bg-surface-raised text-content-bone transition-colors hover:border-brand-vermilion/50 hover:text-brand-vermilion"
            >
              <Bookmark className="h-4 w-4" />
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-border-hairline bg-surface-raised px-4 py-1 h-9 text-sm font-medium text-content-bone transition-colors hover:border-brand-vermilion/50 hover:text-brand-vermilion"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-vermilion/10 text-brand-vermilion">
                <UserRound className="h-4 w-4" />
              </span>
              Log in with TMDB
            </button>
          </div>
          <NavMenuMobile movieGenres={movieGenres} tvGenres={tvGenres} />
        </div>
      </nav>
    </header>
  );
}
