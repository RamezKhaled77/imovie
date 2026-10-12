export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  original_language: string;
  vote_average: number;
  vote_count?: number;
  popularity?: number;
  genre_ids?: number[];
  overview?: string;
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

export interface TvShowSummary {
  id: number;
  name: string;
  original_name: string;
  first_air_date: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  original_language: string;
  vote_average: number;
  vote_count?: number;
  popularity?: number;
  genre_ids?: number[];
  overview?: string;
}

export interface TvListResponse {
  page: number;
  results: TvShowSummary[];
  total_pages: number;
  total_results: number;
}

export interface PersonKnownFor {
  id: number;
  media_type: "movie" | "tv";
  title?: string;
  name?: string;
}

export interface PersonSummary {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department?: string;
  popularity: number;
  known_for?: PersonKnownFor[];
}

export interface PersonListResponse {
  page: number;
  results: PersonSummary[];
  total_pages: number;
  total_results: number;
}

export interface GenreItem {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

export interface VideoListResponse {
  id: number;
  results: Video[];
}

export interface CastMember {
  id: number;
  name: string;
  profile_path: string | null;
  character?: string;
  order?: number;
  roles?: { character: string; episode_count: number }[];
}

export interface CrewMember {
  id: number;
  name: string;
  profile_path: string | null;
  department: string;
  job: string;
  jobs?: { job: string; episode_count: number }[];
}

export interface CreditsResponse {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface TvAggregateCreditsResponse {
  id: number;
  cast: CastMember[];
  crew: (Omit<CrewMember, "job"> & {
    jobs: { job: string; episode_count: number }[];
  })[];
}

export interface MovieDetails extends Movie {
  original_title: string;
  overview: string;
  runtime: number | null;
  genres: GenreItem[];
  production_companies: ProductionCompany[];
}

export interface TvSeasonSummary {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  air_date: string | null;
  season_number: number;
  episode_count: number;
}

export interface TvShowDetails extends TvShowSummary {
  overview: string;
  genres: GenreItem[];
  seasons: TvSeasonSummary[];
  number_of_seasons: number;
  number_of_episodes: number;
  episode_run_time: number[];
}

export interface TvEpisodeSummary {
  id: number;
  name: string;
  overview: string;
  air_date: string | null;
  episode_number: number;
  season_number: number;
  runtime: number | null;
  still_path: string | null;
  vote_average: number;
  guest_stars?: CastMember[];
}

export interface TvSeasonDetails extends TvSeasonSummary {
  episodes: TvEpisodeSummary[];
}

export interface TvEpisodeDetails extends TvEpisodeSummary {
  crew: CrewMember[];
  guest_stars: CastMember[];
}

export interface PersonDetails {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
  known_for_department: string;
}

export interface PersonExternalIds {
  id: number;
  imdb_id: string | null;
}

export interface PersonCredit {
  id: number;
  media_type: "movie" | "tv";
  title?: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  popularity: number;
  character?: string;
  episode_count?: number;
}

export interface PersonCombinedCredits {
  cast: PersonCredit[];
}
