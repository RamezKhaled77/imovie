"use client";

import RouteError from "@/components/media/RouteError";

export default function AccountError({
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
      title="We couldn't load your saved titles"
      description="TMDB could not reach your account lists right now. Please try again shortly."
      returnHref="/movies"
      returnLabel="Browse movies"
    />
  );
}
