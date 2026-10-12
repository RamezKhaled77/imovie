// app/error.tsx
"use client";

import RouteError from "@/components/media/RouteError";

export default function Error({
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
      title="We couldn&apos;t load this page"
      description="The archive couldn&apos;t be reached right now. Please try again in a moment."
      returnHref="/"
      returnLabel="Return home"
    />
  );
}
