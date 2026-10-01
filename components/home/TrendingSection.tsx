"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MovieCard from "@/components/home/MovieCard";

const trendingFilms = [
  {
    title: "Past Lives",
    id: 1,
    year: 2023,
    runtime: "106 min",
    detail: "USA / KR",
    rating: "8.4",
    image: "/trending-card-img.jpg",
  },
  {
    title: "Poor Things",
    id: 2,
    year: 2023,
    runtime: "141 min",
    detail: "IRL / UK",
    rating: "8.1",
    image: "/trending-card-img.jpg",
  },
  {
    title: "The Zone of Interest",
    id: 3,
    year: 2023,
    runtime: "105 min",
    detail: "UK / PL",
    rating: "7.8",
    image: "/trending-card-img.jpg",
  },
  {
    title: "Killers of the Flower Moon",
    id: 4,
    year: 2023,
    runtime: "206 min",
    detail: "USA",
    rating: "7.9",
    image: "/trending-card-img.jpg",
  },
  {
    title: "The Holdovers",
    id: 5,
    year: 2023,
    runtime: "133 min",
    detail: "USA",
    rating: "8.0",
    image: "/trending-card-img.jpg",
  },
  {
    title: "Perfect Days",
    id: 6,
    year: 2023,
    runtime: "124 min",
    detail: "JP / DE",
    rating: "7.9",
    image: "/trending-card-img.jpg",
  },
  {
    title: "Anatomy of a Fall",
    id: 7,
    year: 2023,
    runtime: "151 min",
    detail: "FR / EN",
    rating: "7.7",
    image: "/trending-card-img.jpg",
  },
  {
    title: "Oppenheimer",
    id: 8,
    year: 2023,
    runtime: "180 min",
    detail: "USA / UK",
    rating: "8.1",
    image: "/trending-card-img.jpg",
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
                <MovieCard movie={film} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
