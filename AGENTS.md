<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## iMovie project guidance

iMovie is a learning-focused movie, TV show, and actor discovery app using Next.js 16 App Router, TypeScript, Tailwind CSS, and the TMDB API. The app has TMDB login only; it does not have sign-up, a database, or an auth library.

## Read first

- [Documentation index](docs/README.md)
- [Requirements](docs/requirements.md)
- [Architecture](docs/architecture.md)
- [Decisions](docs/decisions.md)
- [Design system](docs/DESIGN-SYSTEM.md)
- [Design system guide](docs/DESIGN-SYSTEM-GUIDE.md)

## Commands

TODO until scaffolding is complete. Expected commands include `pnpm dev`, `pnpm lint`, `pnpm build`, and `pnpm start`.

## Conventions

- All TMDB access goes through the server-only data layer in `lib/tmdb/`.
- Never use `NEXT_PUBLIC_` for secrets; the TMDB token is server-only.
- Mutations live only in `actions/` and verify the session inside every action.
- The URL is the source of truth for list state and search state.
- Update `docs/decisions.md` before changing an accepted technical decision.
- Treat Server Actions as public endpoints: validate all client-provided input.

## Learning mode (owner may delete)

The owner is learning Next.js. AI assistants should explain the concept and WHY first, ask guiding questions instead of handing over full solutions, present options with trade-offs when several valid approaches exist, not silently fix the owner's mistakes (explain what is wrong and let them retry), point out misconceptions when noticed, and give complete code only when explicitly asked after the owner has tried.
