const CARD_SKELETONS = Array.from({ length: 10 }, (_, index) => index);
const GENRE_SKELETONS = Array.from({ length: 12 }, (_, index) => index);

export default function MediaListLoading({
  label,
  hasFilters = false,
}: {
  label: string;
  hasFilters?: boolean;
}) {
  return (
    <main
      aria-busy="true"
      className="flex-1 bg-surface-ink px-4 py-8 text-content-bone sm:px-8 sm:py-10"
    >
      <p role="status" className="sr-only">
        Loading {label}
      </p>
      <div className="mx-auto max-w-[1600px] motion-safe:animate-pulse">
        <header
          aria-hidden="true"
          className="mb-7 border-b border-border-hairline pb-6"
        >
          <div className="mb-3 h-3 w-40 rounded-sm bg-surface-raised" />
          <div className="h-10 w-64 max-w-full rounded-sm bg-surface-raised" />
          <div className="mt-3 h-4 w-80 max-w-full rounded-sm bg-surface-raised" />
        </header>

        {hasFilters && (
          <>
            <div
              aria-hidden="true"
              className="mb-5 flex flex-wrap gap-2 border-b border-border-hairline pb-5"
            >
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  key={index}
                  className="h-8 w-24 rounded-sm bg-surface-raised"
                />
              ))}
            </div>
            <section
              aria-hidden="true"
              className="mb-6 border border-border-hairline bg-surface-reel p-4 sm:p-5"
            >
              <div className="mb-3 h-3 w-28 rounded-sm bg-surface-raised" />
              <div className="flex flex-wrap gap-2">
                {GENRE_SKELETONS.map((index) => (
                  <div
                    key={index}
                    className="h-7 w-16 rounded-sm bg-surface-raised"
                  />
                ))}
              </div>
            </section>
          </>
        )}

        <div
          aria-hidden="true"
          className="mb-5 flex justify-between border-b border-border-hairline pb-3"
        >
          <div className="h-3 w-48 max-w-[55%] rounded-sm bg-surface-raised" />
          <div className="h-3 w-24 rounded-sm bg-surface-raised" />
        </div>

        <div
          aria-hidden="true"
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5"
        >
          {CARD_SKELETONS.map((index) => (
            <div
              key={index}
              className="overflow-hidden rounded-sm border border-border-hairline bg-surface-reel"
            >
              <div className="poster-frame" />
              <div className="space-y-2 px-3 py-3">
                <div className="h-4 w-3/4 rounded-sm bg-surface-raised" />
                <div className="h-3 w-1/2 rounded-sm bg-surface-raised" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
