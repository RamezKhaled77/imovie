export default function TvSubrouteLoading({
  label,
}: {
  label: "season" | "episode";
}) {
  return (
    <main
      aria-busy="true"
      className="flex-1 bg-surface-ink px-4 py-8 text-content-bone sm:px-8 sm:py-10"
    >
      <p role="status" className="sr-only">
        Loading {label} details
      </p>
      <div className="mx-auto max-w-[1200px] motion-safe:animate-pulse">
        <div className="mb-5 h-3 w-56 rounded-sm bg-surface-raised" />
        {label === "season" ? (
          <>
            <div className="grid gap-6 border border-border-hairline bg-surface-reel p-5 sm:grid-cols-[160px_1fr] sm:p-8">
              <div className="poster-frame" />
              <div className="space-y-4 self-center">
                <div className="h-3 w-20 rounded-sm bg-surface-raised" />
                <div className="h-8 w-2/3 rounded-sm bg-surface-raised" />
                <div className="h-20 rounded-sm bg-surface-raised" />
              </div>
            </div>
            <section aria-hidden="true" className="mt-10 space-y-3">
              <div className="mb-5 h-8 w-40 border-b border-border-hairline" />
              {Array.from({ length: 5 }, (_, index) => (
                <div
                  key={index}
                  className="grid gap-4 border border-border-hairline bg-surface-reel p-4 sm:grid-cols-[180px_1fr]"
                >
                  <div className="aspect-video bg-surface-raised" />
                  <div className="space-y-3 self-center">
                    <div className="h-3 w-36 bg-surface-raised" />
                    <div className="h-5 w-2/3 bg-surface-raised" />
                    <div className="h-10 bg-surface-raised" />
                  </div>
                </div>
              ))}
            </section>
          </>
        ) : (
          <>
            <div className="aspect-video border border-border-hairline bg-surface-raised" />
            <div className="mt-5 space-y-4 border border-border-hairline bg-surface-reel p-5 sm:p-8">
              <div className="h-3 w-48 bg-surface-raised" />
              <div className="h-8 w-2/3 bg-surface-raised" />
              <div className="h-24 max-w-4xl bg-surface-raised" />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
