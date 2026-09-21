# Documentation Index

## Purpose

Provide the working specification, architecture notes, learning worksheets, and delivery plan for MATINÉE.

## Status

Accepted structure; individual decisions are tracked in [decisions.md](decisions.md).

## Related docs

[Design system](DESIGN-SYSTEM.md), [design guide](DESIGN-SYSTEM-GUIDE.md), [requirements](requirements.md), [architecture](architecture.md).

## Suggested reading order

1. [Requirements](requirements.md): scope and testable behavior.
2. [Decisions](decisions.md): accepted constraints and unresolved choices.
3. [Architecture](architecture.md): runtime boundaries and security.
4. [Routes and URL state](routes-and-url-state.md): navigation contract.
5. [TMDB API map](tmdb-api-map.md): verified external API surface.
6. [Data fetching and mutations](data-fetching-and-mutations.md): Next.js learning worksheet.
7. [Components inventory](components-inventory.md): UI responsibilities.
8. [Roadmap](roadmap.md): implementation sequence.
9. [Edge cases](edge-cases.md): resilience and test ideas.

## Status legend

| Status     | Meaning                                                                        |
| ---------- | ------------------------------------------------------------------------------ |
| Accepted   | Owner has chosen this constraint; do not re-litigate it without an ADR update. |
| Open       | Owner must choose; this documentation lists options and trade-offs only.       |
| UNVERIFIED | Official source has not yet confirmed the claim; check before implementation.  |

## Updating documentation

When a decision changes, update [decisions.md](decisions.md) first, including its status and date. Then update the affected requirements, route/API contracts, worksheet rows, roadmap links, and edge cases. Do not implement a changed decision while the ADR is stale. Keep stable IDs unchanged; add a new decision or superseding ADR when the meaning changes.
