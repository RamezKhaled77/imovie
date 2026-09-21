# Requirements

## Purpose

Define the testable product behavior and quality bar for MATINÉE.

## Status

Accepted scope; unresolved implementation choices are in [decisions.md](decisions.md).

## Related docs

[Architecture](architecture.md), [routes](routes-and-url-state.md), [TMDB API map](tmdb-api-map.md), [design system](DESIGN-SYSTEM.md).

## Assumptions

- English is the initial UI language and `en-US` is the working TMDB language.
- Numbered pagination is used for lists; infinite scroll is out of scope for the initial release.
- “Latest” means the selected home feed supplied by the chosen TMDB listing endpoint; exact endpoint remains an API-map implementation detail.
- Missing TMDB fields render an intentional fallback, not a broken layout.

## Scope

| In scope                                                                                                                      | Out of scope                                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Movie, TV, actor discovery; details; search; TMDB login; TMDB-backed watchlist, favorites, ratings; responsive accessible UI. | Sign-up, application-owned accounts, database, password handling, application-owned media persistence, infinite scroll at launch, TanStack Query at launch. |

## Roles

| Role    | Meaning                                                |
| ------- | ------------------------------------------------------ |
| Visitor | Logged out; can browse, search, and read details.      |
| Member  | Authenticated through TMDB; can use account mutations. |

## Functional requirements

### Navigation and discovery

| ID     | Priority | Role           | Acceptance criteria                                                                                                                                                                                            |
| ------ | -------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-001 | MUST     | Visitor/Member | Navbar is visible on every page; Movies menu exposes Now Playing, Popular, Top Rated, Upcoming; TV menu exposes Airing Today, On TV, Popular, Top Rated; Actors, Search, and Genres are reachable by keyboard. |
| FR-002 | MUST     | Visitor/Member | Genre menu is populated from TMDB’s genre list; selecting a genre produces a URL-backed filter using its TMDB ID. Empty, loading, and TMDB-error states are understandable.                                    |
| FR-003 | MUST     | Visitor/Member | Home displays latest movie items; each item links to its movie details page; pagination is available. Empty and failed feeds have recovery messaging.                                                          |
| FR-004 | MUST     | Visitor/Member | Movies page changes content by category and selected genres; cards link to details; pagination, invalid filters, empty results, loading, and errors are handled.                                               |
| FR-005 | MUST     | Visitor/Member | TV page supports Airing Today, On TV, Popular, and Top Rated with the same link, pagination, loading, empty, and error behavior as movies.                                                                     |
| FR-006 | MUST     | Visitor/Member | Actors page displays currently trending actors; each links to actor details; missing profile images and empty/error states are accessible.                                                                     |

### Details

| ID     | Priority | Role           | Acceptance criteria                                                                                                                                                                                                                                                  |
| ------ | -------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-007 | MUST     | Visitor/Member | Movie details show poster, title, overview, runtime, original language, up to 10 cast, director, genres, at least 5 similar items when available, trailer when available, and production companies with name plus logo when available. Related items link correctly. |
| FR-008 | MUST     | Visitor/Member | Actor details show headshot, full name, gender, place of birth, IMDb link when TMDB supplies an IMDb ID, birth date, death date when applicable, popularity score, biography, and 5–10 top movie/TV credits.                                                         |
| FR-009 | MUST     | Visitor/Member | TV details mirror movie details and additionally show similar shows, cast/crew, seasons, and episode details when available.                                                                                                                                         |

### Search and account

| ID     | Priority | Role           | Acceptance criteria                                                                                                                                                                                           |
| ------ | -------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-010 | MUST     | Visitor/Member | Search accepts movies, TV shows, and actors by name; `q` is reflected in the URL; results paginate and distinguish media types; blank, long, special-character, empty, loading, and error states are handled. |
| FR-011 | SHOULD   | Visitor/Member | Navbar suggestions update with debounce through the app’s server Route Handler, support keyboard navigation, and do not expose the TMDB token.                                                                |
| FR-012 | MUST     | Visitor        | Login sends the user to TMDB authorization; no password is entered into MATINÉE and no sign-up screen exists. Denial and expired-token states are explained.                                                  |
| FR-013 | MUST     | Member         | Approved TMDB login returns through the callback, creates a TMDB session, and stores only the session ID in an httpOnly, secure, sameSite cookie.                                                             |
| FR-014 | MUST     | Member         | Member can add/remove a movie or TV item to the TMDB watchlist; success, pending, failure, and stale-state behavior are visible.                                                                              |
| FR-015 | MUST     | Member         | Member can add/remove a movie or TV item to TMDB favorites with the same mutation-state behavior.                                                                                                             |
| FR-016 | MUST     | Member         | Member can submit a valid rating for a movie or TV item; invalid values fail safely and success revalidates affected UI.                                                                                      |

### Quality requirements

| ID      | Priority | Acceptance criteria                                                                                                                                                                               |
| ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NFR-001 | MUST     | TMDB token never reaches browser bundles, HTML, client logs, or URLs; session cookie is httpOnly, secure outside local development, and sameSite.                                                 |
| NFR-002 | MUST     | Data fetching avoids avoidable waterfalls; images reserve stable dimensions and use appropriate TMDB sizes.                                                                                       |
| NFR-003 | MUST     | Dropdowns, popovers, pagination, filters, and mutations are keyboard usable with visible focus; poster alt text, contrast, heading hierarchy, and reduced-motion behavior follow the design docs. |
| NFR-004 | MUST     | Layout is usable at 390px, 768px, and 1440px without overlap or horizontal scrolling caused by app content.                                                                                       |
| NFR-005 | MUST     | Each index, search, and details route provides meaningful page metadata; not-found and error states have usable titles.                                                                           |
| NFR-006 | MUST     | TMDB outage, timeout, 401, 404, 429, partial data, and offline behavior produce a useful UI and do not leak internal details.                                                                     |
| NFR-007 | SHOULD   | TMDB calls and response mapping remain isolated in `lib/tmdb/`; public UI components do not know endpoint construction.                                                                           |
| NFR-008 | MUST     | Attribution and TMDB terms are included according to the current official requirements. Exact wording/placement is ⚠️ UNVERIFIED — check official docs.                                           |

## Traceability

| Requirements                   | Pages/surfaces                           | Roadmap         |
| ------------------------------ | ---------------------------------------- | --------------- |
| FR-001–FR-006, NFR-003–NFR-005 | `/`, `/movies`, `/tv`, `/actors`, navbar | PH-1–PH-5, PH-8 |
| FR-007, FR-009                 | `/movies/[id]`, `/tv/[id]`               | PH-3, PH-4      |
| FR-008                         | `/actors/[id]`                           | PH-4            |
| FR-010–FR-011                  | `/search`, navbar suggestions            | PH-5            |
| FR-012–FR-013                  | `/login`, `/api/auth/callback`           | PH-6            |
| FR-014–FR-016                  | Details/account surfaces                 | PH-7            |
| NFR-001–NFR-008                | Entire app                               | PH-0, PH-8      |

## Future ideas

Personalized recommendations, application-owned profiles, database persistence, social lists, reviews, richer account pages, infinite scroll, and TanStack Query after the initial learning goals are complete.
