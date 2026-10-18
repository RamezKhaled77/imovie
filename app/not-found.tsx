import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you requested could not be found in the iMovie archive.",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-surface-ink px-4 py-20 text-content-bone">
      <section className="w-full max-w-xl border border-border-hairline bg-surface-reel p-8 text-center">
        <p className="metadata text-[10px] text-brand-vermilion">PAGE NOT FOUND</p>
        <h1 className="mt-3 font-headline text-headline-md">
          This page isn&apos;t in the archive
        </h1>
        <p className="mt-3 text-sm text-content-fog">
          The route you requested may have moved or no longer exists.
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex text-sm text-brand-vermilion hover:underline"
        >
          Return home
        </Link>
      </section>
    </main>
  );
}
