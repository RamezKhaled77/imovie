"use client";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Genre } from "@/lib/tmdb/types";
import Link from "next/link";

function GenreMenu({
  basePath,
  label,
  genres,
}: {
  basePath: string;
  label: string;
  genres: Genre[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className="h-9 gap-1 rounded-md border border-transparent bg-transparent px-2.5 !text-base !font-medium !font-mono text-content-bone hover:border-border-hairline hover:bg-surface-raised hover:text-brand-vermilion data-[popup-open=true]:border-brand-vermilion/30 data-[popup-open=true]:bg-brand-vermilion/5"
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
        className="min-w-[220px] rounded-lg border border-border-hairline bg-surface-reel p-2 text-content-bone shadow-2xl"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2 text-[11px] uppercase tracking-[0.14em] text-content-fog">
            {label}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border-hairline" />
          {genres.map((genre) => (
            <DropdownMenuItem
              key={genre.id}
              className="flex cursor-pointer items-center justify-between font-medium rounded-md px-2 py-1.5 text-sm text-content-bone focus:bg-surface-raised focus:text-brand-vermilion"
              render={
                <Link href={`${basePath}?genre=${genre.id}`}>{genre.name}</Link>
              }
            />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function GenresDropdown({
  movieGenres,
  tvGenres,
}: {
  movieGenres: Genre[];
  tvGenres: Genre[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <GenreMenu basePath="/movies" label="Movie Genres" genres={movieGenres} />
      <GenreMenu basePath="/tv" label="TV Genres" genres={tvGenres} />
    </div>
  );
}
