import Link from "next/link";

export default function TvNotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-surface-ink px-4 py-20 text-content-bone">
      <section className="w-full max-w-xl border border-border-hairline bg-surface-reel p-8 text-center">
        <p className="metadata text-[10px] text-brand-vermilion">
          SERIES NOT FOUND
        </p>
        <h1 className="mt-3 font-headline text-headline-md">
          This series isn&apos;t in the archive
        </h1>
        <Link
          href="/tv"
          className="mt-5 inline-flex text-sm text-brand-vermilion hover:underline"
        >
          Return to TV
        </Link>
      </section>
    </main>
  );
}
