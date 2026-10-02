import HomeHero from "@/components/home/HomeHero";

// app/loading.tsx
export default function Loading() {
  return (
    <>
      <HomeHero />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 px-4 py-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[2/3] animate-pulse rounded-sm bg-surface-raised"
          />
        ))}
      </div>
    </>
  );
}
