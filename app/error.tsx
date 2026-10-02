// app/error.tsx
"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-40 text-center">
      <h2 className="font-headline text-headline-md text-content-bone">
        Something went wrong
      </h2>
      <p className="mt-2 text-content-warm">We couldn&apos;t load this page.</p>
      <Button variant="outline" onClick={() => reset()} className="mt-4 ...">
        Try again
      </Button>
    </div>
  );
}
