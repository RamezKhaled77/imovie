# Routes and URL State

## Purpose

Define MATINÉE’s route map and the URL contract for shareable, back-button-friendly state.

## Status

Accepted URL-state principle, query-parameter category shape (DEC-012), and AND genre semantics (DEC-017).

## Related docs

[Requirements](requirements.md), [architecture](architecture.md), [decisions](decisions.md), [TMDB API map](tmdb-api-map.md).

## Assumptions

- IDs are numeric TMDB IDs.
- Invalid URL state falls back to a safe default or a 404 for an invalid entity ID.
- `params` and `searchParams` are async in Next.js 16.
- Search query `q` is limited to 200 characters initially; the owner may adjust this limit.

## Route map

| URL                       | Purpose                    | Params                      | Data sources                                        | Loading/error/not-found                           |
| ------------------------- | -------------------------- | --------------------------- | --------------------------------------------------- | ------------------------------------------------- |
| `/`                       | Latest movie discovery     | `page`                      | TMDB movie feed                                     | `loading.tsx`, empty feed, `error.tsx`            |
| `/movies`                 | Movie category/filter list | `category`, `genre`, `page` | TMDB movie list/discover                            | Loading, empty, invalid-filter fallback, error    |
| `/movies/[id]`            | Movie details              | numeric `id`                | Details, credits, videos, similar, account state    | Loading, `not-found.tsx`, partial sections, error |
| `/tv`                     | TV category/filter list    | `category`, `genre`, `page` | TMDB TV list/discover                               | Same as movies                                    |
| `/tv/[id]`                | TV details                 | numeric `id`                | Details, credits, videos, similar, seasons/episodes | Same as movie details                             |
| `/actors`                 | Trending actors            | `page`                      | TMDB trending people                                | Loading, empty, error                             |
| `/actors/[id]`            | Actor details              | numeric `id`                | Person, external IDs, combined credits              | Loading, not found, partial fields, error         |
| `/search`                 | Multi-type search          | `q`, `page`                 | TMDB multi-search                                   | Empty query state, loading, empty, error          |
| `/login`                  | Login entry                | safe return path only       | Auth action                                         | Redirect/error message                            |
| `/api/auth/callback`      | TMDB callback              | provider callback params    | TMDB session endpoint                               | Safe redirect/error response                      |
| `/api/search/suggestions` | Navbar suggestions         | `q`                         | Server calls TMDB multi-search                      | JSON error/empty response                         |

## URL state contract

| Param      | Allowed values                                                                                                                                          | Default   | Invalid behavior                                                                                                                                                                                                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `category` | Movie: `popular`, `top_rated`, `now_playing`, `upcoming`; TV: `airing_today`, `on_the_air`, `popular`, `top_rated`                                      | `popular` | Fall back to `popular` for missing or unknown values instead of 404; normalize `string \| string[] \| undefined`.                                                                                                                                                                           |
| `genre`    | One or more numeric TMDB genre IDs, comma-separated                                                                                                     | Empty     | Split commas, discard malformed IDs, and reject IDs that do not belong to the current media type. Multiple selected genres use AND semantics (DEC-017). Movie and TV genre ID namespaces/lists are separate; do not reuse a movie ID as a TV genre without checking the current media type. |
| `page`     | Integer 1 through 500 (⚠️ UNVERIFIED — the maximum is stated in the [official TMDB errors documentation](https://developer.themoviedb.org/docs/errors)) | `1`       | For a page beyond available results, OWNER TO DECIDE: clamp to the last valid page, redirect to a valid page, or show an empty/out-of-range state.                                                                                                                                          |
| `q`        | Trimmed, non-empty search text, maximum 200 characters initially                                                                                        | None      | Empty/whitespace returns the search empty state; excessive input is bounded safely. The owner may adjust the 200-character assumption.                                                                                                                                                      |
| `id`       | Positive numeric TMDB ID                                                                                                                                | None      | Non-numeric or missing ID reaches not-found handling.                                                                                                                                                                                                                                       |

Changing category or genres resets `page` to `1`. Search query changes also reset `page` to `1`. Filters are represented in links/forms so refresh, share, back, and forward preserve state.

Genre validation requires the current media type’s genre list on list pages, not only in the navbar; see DEC-023 and DEC-027. Skipping local validation is an alternative, but TMDB’s behavior for an unknown genre ID is ⚠️ UNVERIFIED — check the official discover documentation.

Examples: `/movies?category=popular&page=2`, `/movies?category=popular&genre=28,878&page=1`, `/search?q=arrival&page=1`.

## Category URL decision

DEC-012 accepts `/movies?category=popular&genre=28,35&page=3` and `/tv?category=airing_today&genre=18&page=1`, with one list route per media type. The segment alternative `/movies/[category]` was rejected because it complicates details-route shape. Invalid or missing categories fall back to `popular`.

## Navigation map

| Component        | Links to                                                      |
| ---------------- | ------------------------------------------------------------- |
| Logo/home        | `/`                                                           |
| Movies menu      | `/movies` plus category query links                           |
| TV menu          | `/tv` plus category query links                               |
| Actors link      | `/actors`                                                     |
| Genre item       | Use the media-type-aware route contract in DEC-027.           |
| Search result    | `/movies/<id>`, `/tv/<id>`, or `/actors/<id>` by `media_type` |
| Movie/TV card    | Corresponding details route                                   |
| Cast/person card | `/actors/<id>`                                                |
| Similar item     | Same-media details route                                      |
| Pagination       | Same path with updated `page`, preserving other state         |

Next.js 16 route components should await `params` and `searchParams`; do not treat either as synchronous objects.
