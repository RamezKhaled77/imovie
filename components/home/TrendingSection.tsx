"use client";

import Image from "next/image";
import { Star } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const trendingFilms = [
  {
    title: "Past Lives",
    year: 2023,
    runtime: "106 min",
    languages: "USA / KR",
    rating: "8.4",
  },
  {
    title: "Poor Things",
    year: 2023,
    runtime: "141 min",
    languages: "IRL / UK",
    rating: "8.1",
  },
  {
    title: "The Zone of Interest",
    year: 2023,
    runtime: "105 min",
    languages: "UK / PL",
    rating: "7.8",
  },
  {
    title: "Killers of the Flower Moon",
    year: 2023,
    runtime: "206 min",
    languages: "USA",
    rating: "7.9",
  },
  {
    title: "The Holdovers",
    year: 2023,
    runtime: "133 min",
    languages: "USA",
    rating: "8.0",
  },
  {
    title: "Perfect Days",
    year: 2023,
    runtime: "124 min",
    languages: "JP / DE",
    rating: "7.9",
  },
  {
    title: "Anatomy of a Fall",
    year: 2023,
    runtime: "151 min",
    languages: "FR / EN",
    rating: "7.7",
  },
  {
    title: "Oppenheimer",
    year: 2023,
    runtime: "180 min",
    languages: "USA / UK",
    rating: "8.1",
  },
];

export default function TrendingSection() {
  return (
    <section
      aria-labelledby="trending-heading"
      className="border-b border-border-hairline bg-surface-ink py-8 sm:py-10"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
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
            {trendingFilms.map((film) => (
              <CarouselItem
                key={film.title}
                className="basis-[76%] pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              >
                <article className="overflow-hidden rounded-sm border border-border-hairline bg-surface-reel">
                  <div className="relative aspect-[2/3] overflow-hidden bg-surface-raised">
                    <Image
                      src="/trending-card-img.jpg"
                      alt=""
                      fill
                      sizes="(max-width: 640px) 76vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 17vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-sm border border-brand-brass-border bg-surface-ink/90 px-2 py-1 font-mono text-xs font-semibold text-brand-brass">
                      <Star
                        aria-hidden="true"
                        className="size-3 fill-current"
                      />
                      {film.rating}
                    </span>
                  </div>
                  <div className="min-h-[76px] px-3 py-2.5">
                    <h3 className="truncate font-headline text-title-editorial text-content-bone">
                      {film.title}
                    </h3>
                    <p className="metadata mt-1.5 truncate text-[10px] text-content-warm">
                      {film.year} · {film.runtime} · {film.languages}
                    </p>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
