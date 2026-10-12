import Link from "next/link";
import type { CrewMember } from "@/lib/tmdb/types";

export default function PersonCreditLink({ person }: { person: CrewMember }) {
  return (
    <Link
      href={`/actors/${person.id}`}
      className="text-brand-vermilion hover:underline"
    >
      {person.name}
    </Link>
  );
}
