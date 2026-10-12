import type { Metadata } from "next";
import PersonCard from "@/components/actors/PersonCard";
import MediaGrid from "@/components/media/MediaGrid";
import SectionHeading from "@/components/media/SectionHeading";
import { getTrendingPeople } from "@/lib/tmdb/people";

export const metadata: Metadata = {
  title: "Trending Actors | iMovie",
  description: "Discover actors trending on TMDB this week.",
};

export default async function ActorsPage() {
  const people = await getTrendingPeople();
  const trendingActors = people.results.filter(
    (person) => person.known_for_department === "Acting",
  );

  return (
    <main className="flex-1 bg-surface-ink px-4 py-8 text-content-bone sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1600px]">
        <header className="mb-7 border-b border-border-hairline pb-6">
          <p className="metadata mb-3 text-[10px] text-content-fog">
            THE PEOPLE SHAPING THE SCREEN
          </p>
          <h1 className="font-headline text-headline-lg-mobile text-content-bone sm:text-headline-lg">
            Trending Actors
          </h1>
          <p className="mt-3 max-w-prose text-sm leading-6 text-content-fog">
            Performers finding new audiences across film and television this
            week.
          </p>
        </header>
        <SectionHeading
          title="In the Spotlight"
          detail={`${trendingActors.length} TRENDING ACTORS`}
        />
        {trendingActors.length > 0 ? (
          <MediaGrid>
            {trendingActors.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </MediaGrid>
        ) : (
          <p className="border border-border-hairline bg-surface-reel p-8 text-center text-content-fog">
            Trending actors are unavailable right now. Please check back soon.
          </p>
        )}
      </div>
    </main>
  );
}
