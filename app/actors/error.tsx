"use client";

import RouteError from "@/components/media/RouteError";

export default function ActorsError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <RouteError
      error={error}
      retry={retry}
      title="We couldn&apos;t load the people"
      description="Trending people and performer profiles are temporarily unavailable. Please try again."
      returnHref="/actors"
      returnLabel="Return to actors"
    />
  );
}
