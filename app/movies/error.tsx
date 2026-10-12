"use client";

import RouteError from "@/components/media/RouteError";

export default function MoviesError({
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
      title="We couldn&apos;t load the films"
      description="The movie archive couldn&apos;t be reached right now. Please try again in a moment."
      returnHref="/movies"
      returnLabel="Return to movies"
    />
  );
}
