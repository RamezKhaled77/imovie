# Data Fetching and Mutations Worksheet

## Purpose

Help the owner decide which Next.js boundary owns each read or mutation and understand why.

## Status

Accepted rows are prefilled; marked worksheet rows are intentionally owner-owned.

## Related docs

[Architecture](architecture.md), [routes](routes-and-url-state.md), [TMDB API map](tmdb-api-map.md), [decisions](decisions.md).

## Assumptions

- Server Components are the default for page reads.
- The browser talks to the app, not directly to TMDB.

## Section A: decision rule

First ask who initiates the work. A route request normally starts a Server Component read. A user submission that changes TMDB data uses a Server Action. A redirect or browser-readable server endpoint uses a Route Handler. A client-side fetch is reserved for interaction that genuinely needs browser timing or incremental behavior.

| Tool                   | Runs where               | Initiated by              | Use when                                                | Never use when                                     | Why                                                                        |
| ---------------------- | ------------------------ | ------------------------- | ------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------- |
| Server Component fetch | Next.js server           | Route render              | HTML-needed reads, SEO, details and lists               | Browser-only event state or secrets in client code | Keeps token server-side and renders data close to the route.               |
| Server Action          | Next.js server           | Form/button/client action | Authenticated mutations and revalidation                | General page reads or public suggestions           | Encodes a mutation boundary and can update server UI.                      |
| Route Handler          | Next.js server           | HTTP request/redirect     | TMDB callback and server-mediated suggestions           | Replacing normal page reads without a reason       | Explicit HTTP contract; can set cookies.                                   |
| Client-side fetch      | Browser, to app endpoint | Browser event/timer       | Debounced suggestions or truly client-owned interaction | Direct TMDB calls or SEO-critical initial data     | Useful for live interaction, but adds loading/error and exposure concerns. |

## Section B: feature matrix

| Feature                          | Read or Mutation  | Initiated by                        | Runs where       | Tool                          | Why                                                                                                | Status   | Hint                                                              |
| -------------------------------- | ----------------- | ----------------------------------- | ---------------- | ----------------------------- | -------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------- |
| Home                             | Read              | Route request + `page`              | Server           | Server Component              | The `page` URL param drives numbered pagination (DEC-010); server rendering and SEO remain useful. | Accepted | —                                                                 |
| Movies/TV list with filters      | Read              | Route request + URL                 | Server           | Server Component              | Category, genre, and page are URL state.                                                           | Accepted | —                                                                 |
| Details pages                    | Read              | Route request                       | Server           | Server Component              | Multiple server-side API reads and SEO metadata.                                                   | Accepted | —                                                                 |
| Actors pages                     | Read              | Route request + `page`              | Server           | Server Component              | The `page` URL param drives numbered pagination (DEC-010); trending data is read on the server.    | Accepted | —                                                                 |
| Search results page              | Read              | Route request + `q`                 | Server           | Server Component              | `q` is URL state and results need SEO/shareable URLs.                                              | Accepted | —                                                                 |
| Search suggestions               | Read              | Debounced browser input             | Server + browser | Client fetch to Route Handler | Browser needs incremental suggestions while token stays server-side.                               | Accepted | —                                                                 |
| Add to watchlist/favorite/rating | Mutation          | Button/form                         | Server           | Server Action                 | Session verification and revalidation belong on server.                                            | Accepted | —                                                                 |
| Login start                      | Mutation/redirect | User action                         | Server           | Server Action                 | Starts a state-changing auth flow and redirects.                                                   | Accepted | —                                                                 |
| Login callback                   | Mutation/redirect | TMDB redirect                       | Server           | Route Handler                 | Receives external GET and must set a cookie.                                                       | Accepted | —                                                                 |
| Genres dropdown in navbar        | Read              | Route request or browser navigation | OWNER TO FILL    | OWNER TO FILL                 | How should shared navbar data avoid repeated requests while staying current?                       | Open     | Compare layout read, cached server read, and client endpoint.     |
| Watchlist/Favorites page         | Read              | Route request                       | OWNER TO FILL    | OWNER TO FILL                 | Which boundary should read account-owned lists without turning every read into an action?          | Open     | Consider session-gated Server Component plus account data module. |
| Logged-in state on details page  | Read              | Route request                       | OWNER TO FILL    | OWNER TO FILL                 | How should the page show the member’s current state without exposing session data?                 | Open     | Consider server account reads and the cost of extra calls.        |
| Logout                           | Mutation/redirect | Button/form                         | OWNER TO FILL    | OWNER TO FILL                 | Should logout only clear the local cookie or revoke TMDB too?                                      | Open     | See DEC-021 and compare local-only vs TMDB session deletion.      |

## Section C: mutations catalog

Endpoint paths and body shapes below are verified against the official references where marked. The account ID source is documented in [tmdb-api-map.md](tmdb-api-map.md).

| Mutation       | Inputs                                                      | Preconditions                                         | TMDB endpoint                                                                                                | Success/failure                            | Revalidate                  | Pending/error UI                               |
| -------------- | ----------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------ | --------------------------- | ---------------------------------------------- |
| Login start    | Optional safe return path                                   | No existing session required; validate redirect       | `GET /3/authentication/token/new` then TMDB auth URL                                                         | Redirect or safe error                     | Login surface               | Disable trigger; explain failure.              |
| Login callback | `request_token`, approval status                            | Token present, approved, not replayed; hardening open | `POST /3/authentication/session/new` body with `request_token`                                               | Set cookie or safe failure redirect        | Auth/layout paths           | Callback page/message.                         |
| Watchlist      | `media_type`, numeric `media_id`, desired boolean           | Valid session and media type                          | `POST /3/account/{account_id}/watchlist` with `session_id` query                                             | TMDB status code/message                   | Details and account list    | Pending button; retain prior state on failure. |
| Favorite       | `media_type`, numeric `media_id`, desired boolean           | Valid session and media type                          | ⚠️ UNVERIFIED — official fetch failed for exact favorite reference; check `/3/account/{account_id}/favorite` | Success/error mapping pending verification | Details and account list    | Same as watchlist.                             |
| Rating         | media type, numeric ID, rating allowed by official endpoint | Valid session and rating bounds                       | ⚠️ UNVERIFIED — official fetch failed for exact rating reference; check movie/TV rate endpoint               | Success/error mapping pending verification | Details/account rated state | Validate before submit; show failure.          |

Never trust the browser’s account ID, membership, or mutation result. Derive account identity from the verified TMDB session/account flow.

## Section D: common mistakes

- Using a Server Action for ordinary page reads: it hides the read path and is the wrong abstraction for route data.
- Prefixing the TMDB credential with `NEXT_PUBLIC_`: this makes it eligible for browser exposure.
- Fetching TMDB directly from a Client Component: the token or an unsafe proxy contract leaks into the browser.
- Forgetting revalidation after a successful mutation: the next render can show stale state.
- Trusting client input inside an action: IDs, rating values, redirect destinations, and intended account must be validated again on the server.
- Treating a Server Action as private: it is a public endpoint reachable by crafted requests.
- Creating a request waterfall for details when independent calls can be parallel or appended; compare the open decision in [decisions.md](decisions.md).
- Assuming popularity is a rank: TMDB exposes a popularity score; rank behavior is open.
