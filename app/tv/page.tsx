import TvCategoryFilters from "@/components/tv/TvCategoryFilters";
import TvGenreFilters from "@/components/tv/TvGenreFilters";
import TvHeader from "@/components/tv/TvHeader";
import TvPagination from "@/components/tv/TvPagination";
import TvResults from "@/components/tv/TvResults";
import { getGenres } from "@/lib/tmdb/genres";
import { getTvShows, isTvCategory } from "@/lib/tmdb/tv";
import {
  getValidGenreIds,
  getValidPage,
} from "@/components/tv/tv-page-utils";

type TvPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function TvPage({ searchParams }: TvPageProps) {
  const params = await searchParams;
  const categoryParam = Array.isArray(params.category)
    ? params.category[0]
    : params.category;
  const category =
    categoryParam && isTvCategory(categoryParam) ? categoryParam : "popular";
  const page = getValidPage(params.page);
  const genresData = await getGenres("tv");
  const genreIds = getValidGenreIds(
    params.genre,
    new Set(genresData.genres.map((genre) => genre.id)),
  );
  const showsData = await getTvShows({ category, genreIds, page });
  const totalPages = Math.min(Math.max(showsData.total_pages, 1), 500);

  return (
    <main className="flex-1 bg-surface-ink px-4 py-8 text-content-bone sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1600px]">
        <TvHeader category={category} selectedGenreCount={genreIds.length} />
        <TvCategoryFilters category={category} genreIds={genreIds} />
        <TvGenreFilters
          category={category}
          genres={genresData.genres}
          genreIds={genreIds}
        />
        <TvResults
          category={category}
          shows={showsData.results}
          totalResults={showsData.total_results}
          page={page}
          totalPages={totalPages}
        />
        <TvPagination
          category={category}
          genreIds={genreIds}
          page={page}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
}
