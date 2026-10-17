const skeletonCards = Array.from({ length: 10 }, (_, index) => index);

export default function AccountLoading() {
  return (
    <main
      aria-busy="true"
      className="flex-1 bg-surface-ink px-4 py-8 text-content-bone sm:px-8 sm:py-10"
    >
      <p role="status" className="sr-only">
        Loading your saved titles
      </p>
      <div className="mx-auto max-w-[1600px] motion-safe:animate-pulse">
        <header className="mb-6 border-b border-border-hairline pb-5">
          <div className="mb-3 h-3 w-36 rounded-sm bg-surface-raised" />
          <div className="h-10 w-64 max-w-full rounded-sm bg-surface-raised" />
          <div className="mt-3 h-4 w-80 max-w-full rounded-sm bg-surface-raised" />
        </header>
        <div aria-hidden="true" className="mb-6 flex gap-2">
          <div className="h-8 w-24 rounded-sm bg-surface-raised" />
          <div className="h-8 w-24 rounded-sm bg-surface-raised" />
        </div>
        <div
          aria-hidden="true"
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5"
        >
          {skeletonCards.map((index) => (
            <div
              key={index}
              className="overflow-hidden border border-border-hairline bg-surface-reel"
            >
              <div className="aspect-[2/3] bg-surface-raised" />
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
