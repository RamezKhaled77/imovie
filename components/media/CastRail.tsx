import Image from "next/image";
import Link from "next/link";
import type { CastMember } from "@/lib/tmdb/types";
import { getImageUrl } from "@/lib/tmdb/image";
import SectionHeading from "./SectionHeading";

export default function CastRail({ cast }: { cast: CastMember[] }) {
  const topCast = cast.slice(0, 10);

  return (
    <section aria-labelledby="cast-heading" className="mt-10">
      <SectionHeading
        id="cast-heading"
        title="Cast"
        detail={`${topCast.length} PERFORMERS`}
      />
      {topCast.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {topCast.map((person) => {
            const profileUrl = getImageUrl(person.profile_path, "w200");

            return (
              <Link
                key={person.id}
                href={`/actors/${person.id}`}
                className="group flex min-w-0 items-center gap-3 border border-border-hairline bg-surface-reel p-3 transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-brand-vermilion"
              >
                <div className="relative size-12 shrink-0 overflow-hidden rounded-sm bg-surface-raised">
                  {profileUrl ? (
                    <Image
                      src={profileUrl}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center font-mono text-[9px] text-content-fog">
                      N/A
                    </span>
                  )}
                </div>
                <span className="min-w-0">
                  <span className="block truncate font-medium text-content-bone group-hover:text-brand-vermilion">
                    {person.name}
                  </span>
                  <span className="block truncate text-xs text-content-fog">
                    {person.character || "Cast"}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-content-fog">Cast information is unavailable.</p>
      )}
    </section>
  );
}
