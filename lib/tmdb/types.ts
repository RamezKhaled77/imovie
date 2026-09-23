export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  original_language: string;
  vote_average: number;
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreListResponse {
  genres: Genre[];
}
