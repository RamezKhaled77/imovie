"use client";

import RouteError from "@/components/media/RouteError";

export default function SearchError({
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
      title="We couldn’t complete that search"
      description="The archive couldn’t be reached right now. Please try again in a moment."
      returnHref="/"
      returnLabel="Return home"
    />
  );
}
