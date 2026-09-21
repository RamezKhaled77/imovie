# TMDB API Map

## Purpose

Record the external TMDB contract needed by MATINÉE and separate verified facts from items still requiring official-doc review.

## Status

Partially verified against official TMDB Developer documentation fetched 2026-09-21; see each verification cell.

## Related docs

[Requirements](requirements.md), [architecture](architecture.md), [data-fetching worksheet](data-fetching-and-mutations.md), [edge cases](edge-cases.md).

## Assumptions

- API v3 is used with a Read Access Token in `Authorization: Bearer <token>`.
- Requests are made through `https://api.themoviedb.org`; endpoint paths below include the `/3` prefix where applicable.
- Exact list endpoint choices for “latest” and every TV category must be checked against the reference before implementation.

## Base, auth, images, pagination, limits, errors

| Concern               | Contract                                                                                                                                                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API base              | `https://api.themoviedb.org` (verified in official OpenAPI pages).                                                                                                                                                         |
| Header                | `Authorization: Bearer <TMDB_READ_ACCESS_TOKEN>` (verified).                                                                                                                                                               |
| Images                | Call `/3/configuration` for `images.secure_base_url` and valid sizes, then join base + size + file path. Official example: `https://image.tmdb.org/t/p/w500/<file_path>`.                                                  |
| Useful image families | `poster_sizes`, `backdrop_sizes`, `profile_sizes`, `logo_sizes`, `still_sizes`; use a size appropriate to rendered dimensions.                                                                                             |
| Pagination            | TMDB errors document pages starting at 1 and maximum 500. Do not send page 0.                                                                                                                                              |
| Rate limits           | Legacy 40 requests/10 seconds is disabled; current guidance says an upper limit is around 40 requests/second and may change. Respect `429`; exact operational limit is ⚠️ UNVERIFIED — check current docs.                 |
| Errors                | Official error table includes codes/statuses for 401 auth, 404 invalid ID/resource, 422 invalid params, 429 over-limit, 504 timeout, and token/session failures. Preserve safe status classification, not raw credentials. |

## Feature endpoint table

| Feature                 | Endpoint                                 | Key params                                                                                | Fields used                                                                                                        | Verified?                                                              |
| ----------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| Movie details           | `GET /3/movie/{movie_id}`                | `movie_id`, `language`, optional `append_to_response`                                     | title, overview, poster_path, runtime, original_language, genres, production_companies, release_date, vote_average | Yes                                                                    |
| Movie credits           | `GET /3/movie/{movie_id}/credits`        | `movie_id`, `language`                                                                    | cast, crew, person IDs, profile paths, character, department/job                                                   | Yes                                                                    |
| Movie videos            | `GET /3/movie/{movie_id}/videos`         | `movie_id`, `language`                                                                    | results: key, site, type, official, published_at                                                                   | Yes                                                                    |
| Similar movies          | `GET /3/movie/{movie_id}/similar`        | `movie_id`, `language`, `page`                                                            | result summary fields                                                                                              | ⚠️ UNVERIFIED — fetch returned 429; check official reference.          |
| Multi-search            | `GET /3/search/multi`                    | required `query`, `page`, `language`, `include_adult`                                     | media_type, id, title/name, poster/profile, overview, dates, popularity                                            | Yes                                                                    |
| Trending actors         | `GET /3/trending/person/{time_window}`   | `time_window`                                                                             | person result summary                                                                                              | ⚠️ UNVERIFIED — requested page returned 404; check official reference. |
| Movie genres            | `GET /3/genre/movie/list`                | `language`                                                                                | genres: id, name                                                                                                   | Yes                                                                    |
| TV genres               | `GET /3/genre/tv/list`                   | `language`                                                                                | genres: id, name                                                                                                   | ⚠️ UNVERIFIED — check official reference.                              |
| Movie popular           | `GET /3/movie/popular`                   | `language`, `page`, `region`                                                              | paged movie summaries                                                                                              | ⚠️ UNVERIFIED — verify exact list parameters.                          |
| Movie top rated         | `GET /3/movie/top_rated`                 | `language`, `page`, `region`                                                              | paged movie summaries                                                                                              | ⚠️ UNVERIFIED — verify exact list parameters.                          |
| Movie now playing       | `GET /3/movie/now_playing`               | `language`, `page`, `region`                                                              | paged movie summaries                                                                                              | ⚠️ UNVERIFIED — verify exact list parameters.                          |
| Movie upcoming          | `GET /3/movie/upcoming`                  | `language`, `page`, `region`                                                              | paged movie summaries                                                                                              | ⚠️ UNVERIFIED — verify exact list parameters.                          |
| TV airing today         | `GET /3/tv/airing_today`                 | `language`, `page`                                                                        | paged TV summaries                                                                                                 | ⚠️ UNVERIFIED — verify exact list parameters.                          |
| TV on the air           | `GET /3/tv/on_the_air`                   | `language`, `page`                                                                        | paged TV summaries                                                                                                 | ⚠️ UNVERIFIED — verify exact list parameters.                          |
| TV popular              | `GET /3/tv/popular`                      | `language`, `page`                                                                        | paged TV summaries                                                                                                 | ⚠️ UNVERIFIED — verify exact list parameters.                          |
| TV top rated            | `GET /3/tv/top_rated`                    | `language`, `page`                                                                        | paged TV summaries                                                                                                 | ⚠️ UNVERIFIED — verify exact list parameters.                          |
| Movie discover          | `GET /3/discover/movie`                  | `with_genres`, category-derived date/release/region preset, `page`, `language`, `sort_by` | paged movie summaries                                                                                              | ⚠️ UNVERIFIED — verify every preset parameter.                         |
| TV discover             | `GET /3/discover/tv`                     | `with_genres`, category-derived date/status/region preset, `page`, `language`, `sort_by`  | paged TV summaries                                                                                                 | ⚠️ UNVERIFIED — verify exact parameters.                               |
| Configuration           | `GET /3/configuration`                   | none                                                                                      | image base URLs and sizes                                                                                          | Yes                                                                    |
| Request token           | `GET /3/authentication/token/new`        | none                                                                                      | success, expires_at, request_token                                                                                 | Yes                                                                    |
| Create session          | `POST /3/authentication/session/new`     | JSON request_token                                                                        | success, session_id                                                                                                | Yes                                                                    |
| Account details         | `GET /3/account/{account_id}`            | account_id, optional session_id                                                           | id, username, locale, avatar                                                                                       | Yes                                                                    |
| Watchlist mutation      | `POST /3/account/{account_id}/watchlist` | session_id; body media_type, media_id, watchlist                                          | status_code, status_message                                                                                        | Yes                                                                    |
| Favorite mutation       | `/3/account/{account_id}/favorite`       | session_id; body media_type, media_id, favorite                                           | status                                                                                                             | ⚠️ UNVERIFIED — exact official reference fetch failed.                 |
| Rate movie/TV           | Media-specific rate endpoint             | session and rating body                                                                   | status                                                                                                             | ⚠️ UNVERIFIED — exact official reference fetch failed.                 |
| Person details          | `GET /3/person/{person_id}`              | person_id, language                                                                       | name, biography, gender, birthday, deathday, place_of_birth, popularity, profile_path                              | ⚠️ UNVERIFIED — check exact reference response.                        |
| Person external IDs     | `GET /3/person/{person_id}/external_ids` | person_id                                                                                 | imdb_id and other IDs                                                                                              | Yes                                                                    |
| Person combined credits | Person combined credits endpoint         | person_id, language, page                                                                 | movie/tv credit summaries and dates                                                                                | ⚠️ UNVERIFIED — check exact reference.                                 |

## Required lookups

- **Actor IMDb link:** call `GET /3/person/{person_id}/external_ids`; use `imdb_id` to form the IMDb profile URL. The ID field is verified; final URL policy/format is ⚠️ UNVERIFIED — check official guidance and IMDb linking requirements.
- **Movie trailer:** call the movie videos endpoint; select an available result with `type` `Trailer` and a supported `site` such as YouTube. Selection policy when multiple trailers exist is an open product choice.
- **Director:** call movie credits and select a crew record whose `job` is `Director` (the field is shown in the verified credits response). TV may use different crew semantics; verify before implementation.
- **Similar titles:** use the media-specific similar endpoint if the owner chooses DEC-007; exact recommendation trade-off remains open.
- **`account_id`:** obtain it from the authenticated account details endpoint using the verified TMDB session; never accept it as trusted browser input.

## Entity fields needed by the app

### Movie summary

- id
- title and original_title
- overview
- poster_path and backdrop_path
- release_date
- genre_ids
- popularity, vote_average, vote_count
- media type when returned by a multi-search result

### Movie detail

- id, title, original_title
- overview, runtime, original_language
- poster_path, backdrop_path
- release_date, genres
- production_companies: id, name, logo_path
- popularity, vote_average, vote_count

### TV summary/detail

- id, name, original_name
- overview, poster_path, backdrop_path
- first_air_date, genre_ids/genres
- popularity, vote_average, vote_count
- number_of_seasons, number_of_episodes, seasons

### Season and episode

- season number, name, overview, poster path, air date, episode count
- episode id, name, overview, air date, episode number, season number, runtime, still path, vote average, guest stars when supplied

### Person

- id, name, profile_path
- gender, birthday, deathday, place_of_birth
- biography, popularity

### Genre

- id, name

### Company

- id, name, logo_path, origin_country

### Video

- id, key, name, site, type, official, published_at, size

### Cast/crew credit

- person id, name, profile_path
- character, order, cast_id
- department, job, popularity

## Sources

Official references: `developer.themoviedb.org/reference`, `/docs/image-basics`, `/docs/rate-limiting`, `/docs/errors`, `/docs/getting-started`. Re-check endpoint pages immediately before implementation.
