"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function RouteError({
  error,
  retry,
  title,
  description,
  returnHref,
  returnLabel,
}: {
  error: Error & { digest?: string };
  retry: () => void;
  title: string;
  description: string;
  returnHref: string;
  returnLabel: string;
}) {
  useEffect(() => {
    console.error("Route failed to load", error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-surface-ink px-4 py-20 text-content-bone sm:px-8">
      <section
        aria-labelledby="route-error-heading"
        className="w-full max-w-xl border border-border-hairline bg-surface-reel px-5 py-12 text-center sm:px-10"
      >
        <p className="metadata text-[10px] uppercase tracking-wider text-brand-vermilion">
          Archive unavailable
        </p>
        <h1
          id="route-error-heading"
          className="mt-3 font-headline text-headline-md"
        >
          {title}
        </h1>
        <p className="mx-auto mt-3 max-w-prose text-sm leading-6 text-content-fog">
          {description}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button
            variant="outline"
            onClick={retry}
            className="rounded-sm border-brand-vermilion bg-brand-vermilion font-mono text-xs uppercase tracking-wide text-surface-ink hover:bg-brand-vermilion-hover hover:text-surface-ink"
          >
            Try again
          </Button>
          <Link
            href={returnHref}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-sm border-border-hairline bg-transparent font-mono text-xs uppercase tracking-wide text-content-bone hover:bg-surface-raised",
            )}
          >
            {returnLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
