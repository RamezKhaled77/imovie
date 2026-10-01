import Image from "next/image";
import { BookmarkPlus, CirclePlay, Star, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredFilm = {
  title: "Anatomy of a Fall",
  year: 2023,
  runtime: "151 min",
  languages: "FR / EN / DE",
  rating: "8.2",
  awards: "Critics' Selection · Archive 2024",
  distinction: "Palme d'Or winner",
  overview:
    "A woman is suspected of her husband's murder, and their blind son faces a moral dilemma as the sole witness in a secluded courtroom trial in the French Alps.",
  genres: ["Crime", "Drama", "Mystery"],
};

export default function HomeHero() {
  return (
    <section className="relative isolate flex flex-1 items-center overflow-hidden border-b border-border-hairline bg-surface-ink">
      <Image
        src="/hero-img.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(12,17,20,0.98)_0%,rgba(12,17,20,0.88)_34%,rgba(12,17,20,0.48)_70%,rgba(12,17,20,0.3)_100%),linear-gradient(0deg,#0c1114_0%,rgba(12,17,20,0.2)_48%,rgba(12,17,20,0.38)_100%)]"
      />

      <div className="mx-auto w-full max-w-[1440px] px-4 py-20 sm:px-8 md:py-24 lg:px-12">
        <div className="max-w-[760px]">
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-2 rounded-sm border border-brand-vermilion-border bg-brand-vermilion-muted px-3 py-1.5 font-mono text-[11px] font-semibold uppercase text-brand-vermilion">
              <Ticket aria-hidden="true" className="size-3.5" />
              {featuredFilm.awards}
            </span>
            <span className="metadata text-content-warm">
              {featuredFilm.distinction}
            </span>
          </div>

          <h1 className="editorial-display text-display-hero-mobile text-content-bone md:text-display-hero [letter-spacing:0]">
            {featuredFilm.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="metadata text-content-warm">
              {featuredFilm.year}
            </span>
            <span aria-hidden="true" className="text-brand-vermilion">
              ·
            </span>
            <span className="metadata text-content-warm">
              {featuredFilm.runtime}
            </span>
            <span aria-hidden="true" className="text-brand-vermilion">
              ·
            </span>
            <span className="metadata text-content-warm">
              {featuredFilm.languages}
            </span>
            <span className="inline-flex items-center gap-1 rounded-sm border border-brand-brass-border bg-brand-brass-muted px-2 py-1 font-mono text-xs font-semibold text-brand-brass">
              <Star aria-hidden="true" className="size-3.5 fill-current" />
              {featuredFilm.rating}
            </span>
            <div className="flex flex-wrap gap-2">
              {featuredFilm.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-sm border border-border-hairline bg-surface-reel/80 px-2 py-1 font-mono text-[10px] uppercase text-content-fog"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-6 max-w-[690px] text-base leading-[1.8] text-content-warm sm:text-lg">
            {featuredFilm.overview}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-brand-vermilion px-5 font-mono text-xs font-semibold uppercase text-surface-ink transition-colors hover:bg-brand-vermilion-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-vermilion"
            >
              <Ticket aria-hidden="true" className="size-4" />
              View Details
            </Button>
            <Button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-border-hairline bg-surface-reel/70 px-5 font-mono text-xs uppercase text-content-bone transition-colors hover:border-border-strong hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-vermilion"
            >
              <BookmarkPlus aria-hidden="true" className="size-4" />
              Add to Watchlist
            </Button>
            <Button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-border-hairline bg-surface-ink/60 px-5 font-mono text-xs uppercase text-content-warm transition-colors hover:border-border-strong hover:bg-surface-raised hover:text-content-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-vermilion"
            >
              <CirclePlay aria-hidden="true" className="size-4" />
              Watch Trailer
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
