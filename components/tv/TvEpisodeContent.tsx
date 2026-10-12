import Image from "next/image";
import Link from "next/link";
import CastRail from "@/components/media/CastRail";
import PersonCreditLink from "@/components/media/PersonCreditLink";
import SectionHeading from "@/components/media/SectionHeading";
import { getImageUrl } from "@/lib/tmdb/image";
import type { TvEpisodeDetails } from "@/lib/tmdb/types";

export default function TvEpisodeContent({
  showId,
  episode,
}: {
  showId: number;
  episode: TvEpisodeDetails;
}) {
  const stillUrl = getImageUrl(episode.still_path, "w780");

  return (
    <main className="flex-1 bg-surface-ink px-4 py-8 text-content-bone sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1200px]">
        <nav
          aria-label="Breadcrumb"
          className="metadata flex flex-wrap gap-2 text-[10px] text-content-fog"
        >
          <Link href="/tv" className="hover:text-brand-vermilion">
            TV
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={`/tv/${showId}`} className="hover:text-brand-vermilion">
            SERIES DETAILS
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href={`/tv/${showId}/season/${episode.season_number}`}
            className="hover:text-brand-vermilion"
          >
            SEASON {episode.season_number}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-brand-vermilion">
            EPISODE {episode.episode_number}
          </span>
        </nav>

        <article className="mt-5 overflow-hidden border border-border-hairline bg-surface-reel">
          <div className="relative aspect-video bg-surface-raised">
            {stillUrl ? (
              <Image
                src={stillUrl}
                alt={`${episode.name} episode still`}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center font-mono text-xs uppercase text-content-fog">
                Episode still unavailable
              </div>
            )}
          </div>
          <div className="p-5 sm:p-8">
            <p className="metadata text-[10px] text-brand-vermilion">
              SEASON {episode.season_number} · EPISODE {episode.episode_number}
              {episode.air_date ? ` · ${episode.air_date}` : ""}
              {episode.runtime ? ` · ${episode.runtime} MIN` : ""}
            </p>
            <h1 className="mt-2 font-headline text-headline-lg-mobile sm:text-headline-lg">
              {episode.name}
            </h1>
            <p className="mt-5 max-w-4xl whitespace-pre-line text-sm leading-7 text-content-fog">
              {episode.overview || "No episode overview is available."}
            </p>
          </div>
        </article>

        <div className="mt-10">
          <CastRail cast={episode.guest_stars} />
        </div>

        <section aria-labelledby="episode-crew-heading" className="mt-10">
          <SectionHeading
            id="episode-crew-heading"
            title="Episode Crew"
            detail={`${episode.crew.length} CREDITS`}
          />
          {episode.crew.length > 0 ? (
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {episode.crew.map((member, index) => (
                <li
                  key={`${member.id}-${member.job}-${index}`}
                  className="border border-border-hairline bg-surface-reel p-4"
                >
                  <span className="block text-sm text-content-bone">
                    <PersonCreditLink person={member} />
                  </span>
                  <span className="metadata mt-1 block text-[10px] text-content-fog">
                    {member.job}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-content-fog">
              Crew credits are unavailable for this episode.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
