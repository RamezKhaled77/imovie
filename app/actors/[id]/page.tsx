import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PersonDetailContent from "@/components/actors/PersonDetailContent";
import { TmdbError } from "@/lib/tmdb/error";
import { parseTmdbId } from "@/lib/tmdb/route-id";
import {
  getPersonCombinedCredits,
  getPersonDetails,
  getPersonExternalIds,
} from "@/lib/tmdb/people";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: rawId } = await params;
  const id = parseTmdbId(rawId);

  if (id === null) {
    return { title: "Actor not found | iMovie" };
  }

  try {
    const person = await getPersonDetails(id);
    return {
      title: `${person.name} | iMovie`,
      description:
        person.biography || "Learn more about this performer and their screen credits on iMovie.",
    };
  } catch {
    return { title: "Actor details | iMovie" };
  }
}

type ActorDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ActorDetailsPage({
  params,
}: ActorDetailsPageProps) {
  const { id: rawId } = await params;
  const id = parseTmdbId(rawId);
  if (id === null) notFound();

  let person: Awaited<ReturnType<typeof getPersonDetails>>;
  let externalIds: Awaited<ReturnType<typeof getPersonExternalIds>>;
  let credits: Awaited<ReturnType<typeof getPersonCombinedCredits>>;

  try {
    [person, externalIds, credits] = await Promise.all([
      getPersonDetails(id),
      getPersonExternalIds(id),
      getPersonCombinedCredits(id),
    ]);
  } catch (error) {
    if (error instanceof TmdbError && error.status === 404) notFound();
    throw error;
  }

  return (
    <PersonDetailContent
      person={person}
      externalIds={externalIds}
      credits={credits}
    />
  );
}
