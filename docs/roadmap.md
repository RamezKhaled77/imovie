# Roadmap

## Purpose

Sequence MATINÉE so each phase teaches one coherent Next.js concept and leaves a testable increment.

## Status

Planning baseline; open decisions gate the phases named below.

## Related docs

[Requirements](requirements.md), [decisions](decisions.md), [edge cases](edge-cases.md), [data worksheet](data-fetching-and-mutations.md).

## Assumptions

- Each phase can use fixtures or a thin vertical slice before all polish exists.
- “Done” means the phase behavior works at 390px, 768px, and 1440px where relevant and does not expose secrets.

## PH-0: Setup and data layer

**Goal:** establish server-only TMDB access and typed error boundaries.

**Tasks:**

- [ ] Confirm environment variables and server-only import.
- [ ] Verify endpoint paths and response fields in [tmdb-api-map.md](tmdb-api-map.md).
- [ ] Create shared error classification and image URL policy.
- [ ] Apply accepted runtime validation decision DEC-019 after the first hand-typed PH-0 call works.

**Deliverables:** server data client, feature modules, types, safe errors, env example.

**Concept learned:** server-only modules, external API boundaries, typed data mapping.

**Definition of Done:** a server-side smoke read works without token in client output; error fixtures classify 401/404/429.

**Links:** NFR-001, NFR-006, DEC-004, DEC-005, DEC-019, EDGE-001–EDGE-005.

**Learning checkpoint:** Why must the browser never import the TMDB data client?

## PH-1: Home

**Goal:** render a server-read home feed with editorial media cards.

**Tasks:**

- [ ] Resolve the home feed endpoint and “latest” meaning.
- [ ] Build grid/pagination and loading/empty/error states.
- [ ] Apply design-system poster ratios, typography, focus, and alt text.
- [ ] Use accepted dropdown primitive decision DEC-015 and resolve open genre loading decision DEC-023/DEC-027.

**Deliverables:** home route and shared navbar shell.

**Concept learned:** Server Component reads and shared layout data.

**Definition of Done:** cards link to details, no layout shift on missing images, keyboard navigation works.

**Links:** FR-001–FR-003, NFR-002–NFR-005, DEC-015, DEC-023, EDGE-006, EDGE-031.

**Learning checkpoint:** What work is initiated by a route request, and where does it run?

## PH-2: Movies and filters

**Goal:** build URL-backed movie categories and genre filtering.

**Tasks:**

- [ ] Implement accepted category URL shape DEC-012.
- [ ] Implement accepted AND genre semantics DEC-017.
- [ ] Implement category validation, genre IDs, and page reset.
- [ ] Add pagination and invalid/empty/error states.

**Deliverables:** movie list route and filter Client Components.

**Concept learned:** async `searchParams`, URL as source of truth, narrow client interaction.

**Definition of Done:** refresh/back/forward preserve state and any filter change resets page 1.

**Links:** FR-004, NFR-004, DEC-012, DEC-017, EDGE-014–EDGE-018, EDGE-033.

**Learning checkpoint:** Why should filters live in the URL instead of only in React state?

## PH-3: Movie details

**Goal:** deliver complete movie detail composition.

**Tasks:**

- [ ] Choose append vs parallel vs sequential fetches (DEC-013).
- [ ] Choose similar vs recommendations (DEC-018).
- [ ] Render credits, director, genres, video, companies, and similar items.
- [ ] Add not-found and section-level partial failure behavior.

**Deliverables:** movie details route.

**Concept learned:** composing multiple server reads and failure isolation.

**Definition of Done:** all available required sections render, absent optional data has intentional fallback, related links work.

**Links:** FR-007, NFR-002, DEC-013, DEC-018, EDGE-007–EDGE-013, EDGE-034.

**Learning checkpoint:** What makes a request waterfall, and how would your chosen strategy avoid it?

## PH-4: Actors and TV

**Goal:** complete people and TV discovery/details.

**Tasks:**

- [ ] Verify trending people, TV category, person, combined-credit, season, and episode endpoints.
- [ ] Decide popularity score vs computed rank (DEC-016).
- [ ] Build actor and TV routes with responsive rails/grids.
- [ ] Add season/episode loading, empty, and error states.

**Deliverables:** actors, actor details, TV list, TV details.

**Concept learned:** reusable Server Components and route-level not-found handling.

**Definition of Done:** movie/TV/person links resolve, IMDb link uses external IDs when present, missing facts are safe.

**Links:** FR-005–FR-009, DEC-016, EDGE-008–EDGE-013, EDGE-031–EDGE-032.

**Learning checkpoint:** Which parts are shared presentation, and which data contracts must stay media-specific?

## PH-5: Search

**Goal:** implement URL search and server-mediated suggestions.

**Tasks:**

- [ ] Build `/search?q=&page=` with multi-search mapping.
- [ ] Add debounced `router.replace` and suggestion Route Handler.
- [ ] Handle stale responses, keyboard navigation, and empty query.
- [ ] Add metadata for result pages.

**Deliverables:** search results and navbar suggestions.

**Concept learned:** Client interaction driving a server-rendered URL and Route Handler boundaries.

**Definition of Done:** token never reaches browser, current query wins, Enter/Escape/arrow behavior works.

**Links:** FR-010–FR-011, NFR-001, NFR-003, EDGE-018, EDGE-029–EDGE-030.

**Learning checkpoint:** Why does suggestions need a different boundary from the search results page?

## PH-6: Auth

**Goal:** complete TMDB request-token login and session cookie.

**Tasks:**

- [ ] Implement login start and safe return-path validation.
- [ ] Implement callback Route Handler and session exchange.
- [ ] Decide callback hardening (DEC-020) and logout (DEC-021).
- [ ] Handle denial, expiry, missing params, and revoked sessions.

**Deliverables:** login flow, session helper, logout behavior.

**Concept learned:** Route Handlers, redirects, cookies, and public endpoint security.

**Definition of Done:** password never enters app, cookie flags are correct, callback replay/open redirects are addressed.

**Links:** FR-012–FR-013, NFR-001, DEC-003, DEC-008, DEC-020–DEC-021, EDGE-019–EDGE-024.

**Learning checkpoint:** Why is the callback a Route Handler instead of a normal Server Component?

## PH-7: Mutations

**Goal:** add account-backed watchlist, favorite, and rating actions.

**Tasks:**

- [ ] Verify favorite/rating endpoint contracts.
- [ ] Derive account ID server-side.
- [ ] Add session verification and input validation in every action.
- [ ] Revalidate details/account state and implement pending/error UI.
- [ ] Decide logged-out behavior (DEC-022).

**Deliverables:** three Server Actions and usable controls.

**Concept learned:** Server Actions as public mutation endpoints and revalidation.

**Definition of Done:** double-clicks are controlled, failure does not lie about state, no unauthorized mutation succeeds.

**Links:** FR-014–FR-016, DEC-007, DEC-022, EDGE-025–EDGE-028.

**Learning checkpoint:** What must an action verify even if the UI already disabled the button?

## PH-8: Polish

**Goal:** harden quality, accessibility, caching, SEO, testing, and deployment.

**Tasks:**

- [ ] Decide caching/revalidation (DEC-014) and test/deploy strategy (DEC-024); runtime validation follows accepted DEC-019.
- [ ] Test all seeded edge cases and responsive breakpoints.
- [ ] Verify metadata, attribution, terms, focus, contrast, alt text, reduced motion.
- [ ] Audit bundle/logs for credentials and confirm rate-limit behavior.
- [ ] Run `pnpm lint` and `pnpm build`.

**Deliverables:** release checklist, tests, deployment notes, resolved ADRs.

**Concept learned:** production trade-offs and operational resilience.

**Definition of Done:** NFRs are tested or explicitly deferred with residual risk recorded; all open decisions are resolved or carried forward.

**Links:** NFR-001–NFR-008, DEC-014, DEC-019, DEC-024, EDGE-001–EDGE-036.

**Learning checkpoint:** Can you explain the runtime and initiator for every read, mutation, and redirect in the app?
