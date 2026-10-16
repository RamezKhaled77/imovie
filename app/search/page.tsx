import type { Metadata } from "next";
import { getValidPageNumber } from "@/lib/pagination";
import { getSearchQuery } from "@/lib/search-utils";
import { searchMulti } from "@/lib/tmdb/search";
import SearchResults from "@/components/search/SearchResults";

type SearchPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = getSearchQuery(params.q);

  return {
    title: query ? `Search results for “${query}” | iMovie` : "Search | iMovie",
    description: query
      ? `Search movies, television, and performers for ${query}.`
      : "Search movies, television, and performers.",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = getSearchQuery(params.q);
  const page = getValidPageNumber(params.page);
  const results = query ? await searchMulti(query, page) : null;
  const totalPages = results
    ? Math.min(Math.max(results.total_pages, 1), 500)
    : 1;

  return (
    <main className="flex-1 bg-surface-ink px-4 py-8 text-content-bone sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1600px]">
        <header className="mb-7 border-b border-border-hairline pb-6">
          <p className="metadata mb-3 text-[10px] text-content-fog">
            MOVIES / TELEVISION / PERFORMERS
          </p>
          <h1 className="font-headline text-headline-lg-mobile text-content-bone sm:text-headline-lg">
            {query ? (
              <>
                Search results for{" "}
                <span className="text-brand-vermilion">“{query}”</span>
              </>
            ) : (
              "Search the archive"
            )}
          </h1>
          {results && (
            <p className="mt-3 text-sm text-content-fog">
              {results.total_results.toLocaleString()} matching archive entries
            </p>
          )}
        </header>

        <SearchResults
          query={query}
          results={results?.results ?? []}
          page={page}
          totalPages={totalPages}
          totalResults={results?.total_results ?? 0}
        />
      </div>
    </main>
  );
}
