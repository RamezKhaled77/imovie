"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MovieCard from "@/components/home/MovieCard";
import { MovieListResponse } from "@/lib/tmdb/types";

export default function TrendingSection({ data }: { data: MovieListResponse }) {
  const moviesList = data.results;

  return (
    <section
      aria-labelledby="trending-heading"
      className="border-b border-border-hairline bg-surface-ink py-8 sm:py-10"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-8">
        <Carousel
          opts={{ align: "start", loop: true }}
          aria-label="Trending films this week"
        >
          <div className="mb-6 flex items-center justify-between gap-4 border-b border-border-hairline pb-5">
            <div>
              <h2
                id="trending-heading"
                className="font-headline text-headline-md text-content-bone"
              >
                Trending This Week
              </h2>
              <p className="metadata mt-2 text-content-warm">
                Curated from TMDB global rankings · Updated hourly
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <CarouselPrevious
                aria-label="Show previous trending films"
                className="!static !my-0 !size-9 !translate-y-0 !transform-none !rounded-sm !border-border-hairline !bg-transparent !text-content-warm hover:!border-border-strong hover:!bg-surface-raised hover:!text-content-bone"
              />
              <CarouselNext
                aria-label="Show more trending films"
                className="!static !my-0 !size-9 !translate-y-0 !transform-none !rounded-sm !border-border-hairline !bg-transparent !text-content-warm hover:!border-border-strong hover:!bg-surface-raised hover:!text-content-bone"
              />
            </div>
          </div>

          <CarouselContent className="-ml-4">
            {moviesList.map((film) => (
              <CarouselItem
                key={film.id}
                className="basis-[76%] pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <MovieCard movie={film} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
