"use client";

import RouteError from "@/components/media/RouteError";

export default function TvError({
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
      title="We couldn&apos;t load television"
      description="TV listings, series, and episode details are temporarily unavailable. Please try again."
      returnHref="/tv"
      returnLabel="Return to TV"
    />
  );
}
