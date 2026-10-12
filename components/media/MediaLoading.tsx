export default function MediaLoading({ label }: { label: string }) {
  return (
    <main
      aria-busy="true"
      className="flex-1 bg-surface-ink px-4 py-8 text-content-bone sm:px-8 sm:py-10"
    >
      <p role="status" className="sr-only">
        Loading {label}
      </p>
      <div className="mx-auto max-w-[1400px] motion-safe:animate-pulse">
        <header className="mb-7 border-b border-border-hairline pb-6">
          <div className="mb-3 h-3 w-28 rounded-sm bg-surface-raised" />
          <div className="h-10 w-72 max-w-full rounded-sm bg-surface-raised" />
        </header>
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="mx-auto aspect-[2/3] w-full max-w-[280px] bg-surface-raised" />
          <div className="space-y-4 py-4">
            <div className="h-8 w-2/3 rounded-sm bg-surface-raised" />
            <div className="h-4 w-1/3 rounded-sm bg-surface-raised" />
            <div className="h-24 rounded-sm bg-surface-raised" />
          </div>
        </div>
      </div>
    </main>
  );
}
