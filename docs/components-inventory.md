# Components Inventory

## Purpose

Inventory the UI pieces implied by the feature spec and design system before implementation.

## Status

Worksheet; the final Server or Client choice is intentionally owner-owned where interaction boundaries are educational.

## Related docs

[Design system](DESIGN-SYSTEM.md), [requirements](requirements.md), [architecture](architecture.md), [routes](routes-and-url-state.md).

## Assumptions

- Components should preserve stable poster ratios, editorial typography, hairlines, focus states, and reduced-motion behavior.
- Feature components may compose shared media and UI primitives.

### Layout

| Component   | Used on    | Purpose                             | Interactive behaviors               | Data needs                       | States                   | Server or Client                                          |
| ----------- | ---------- | ----------------------------------- | ----------------------------------- | -------------------------------- | ------------------------ | --------------------------------------------------------- |
| App shell   | All routes | Ink canvas, content width, metadata | Skip link and focus order           | None                             | Loading shell            | OWNER TO DECIDE — does it own browser-only navigation?    |
| Navbar      | All routes | Primary navigation                  | Menus, search focus, Escape         | Categories, genres, session hint | Loading/error genre menu | OWNER TO DECIDE — which controls need live browser state? |
| Movies menu | All routes | Movie category links                | Keyboard open/close and active item | Category labels                  | Closed/open              | OWNER TO DECIDE — who owns roving focus?                  |
| TV menu     | All routes | TV category links                   | Keyboard open/close and active item | Category labels                  | Closed/open              | OWNER TO DECIDE — how is focus restored?                  |
| Genre menu  | All routes | Genre filtering links               | Keyboard selection                  | Genre list                       | Loading/empty/error      | OWNER TO DECIDE — how should shared data be loaded?       |
| Search bar  | All routes | Search entry                        | Debounce, submit, suggestions       | Query and suggestion results     | Idle/loading/empty/error | OWNER TO DECIDE — where should debounce state live?       |

### Media

| Component      | Used on                   | Purpose                       | Interactive behaviors          | Data needs              | States                   | Server or Client                                        |
| -------------- | ------------------------- | ----------------------------- | ------------------------------ | ----------------------- | ------------------------ | ------------------------------------------------------- |
| Media grid     | Home/list/search          | Responsive poster layout      | Card focus and navigation      | Summary items           | Loading/empty/error      | OWNER TO DECIDE — does pagination force client state?   |
| Media card     | Home/list/details similar | Poster, title, metadata       | Hover lift, focus, click       | Poster/title/date/score | Missing image/long title | OWNER TO DECIDE — is it purely presentational?          |
| Poster frame   | Cards/details             | Stable 2:3 image box          | Link focus                     | Path and alt text       | Missing image            | OWNER TO DECIDE — does it need interaction beyond link? |
| Detail hero    | Movie/TV/person           | Primary identity and metadata | Trailer and account actions    | Detail fields and image | Partial/error            | OWNER TO DECIDE — who owns action pending state?        |
| Cast rail      | Details                   | Top cast links                | Horizontal keyboard navigation | Cast credits            | Empty/short              | OWNER TO DECIDE — rail scrolling needs what state?      |
| Crew/director  | Details                   | Credit attribution            | Person links                   | Crew credits            | Missing                  | OWNER TO DECIDE — no behavior hint beyond links.        |
| Similar rail   | Movie/TV details          | Related titles                | Links and responsive scroll    | Similar summaries       | Empty/short/error        | OWNER TO DECIDE — how should partial failure render?    |
| Company list   | Movie details             | Production attribution        | Optional links if added later  | Names/logos             | Missing logo             | OWNER TO DECIDE — image-only state needs what fallback? |
| Season list    | TV details                | Seasons and episodes          | Expand/collapse                | Season fields           | Loading/empty/error      | OWNER TO DECIDE — expansion is the key boundary.        |
| Episode list   | TV details                | Episode details               | Expand/collapse/linking        | Episode fields          | Missing still/empty      | OWNER TO DECIDE — should expansion be URL state?        |
| Person profile | Actor details             | Biography and facts           | IMDb external link             | Person and external IDs | Missing facts            | OWNER TO DECIDE — data is read-only or interactive?     |

### Filters

| Component     | Used on      | Purpose          | Interactive behaviors       | Data needs         | States             | Server or Client                                                    |
| ------------- | ------------ | ---------------- | --------------------------- | ------------------ | ------------------ | ------------------------------------------------------------------- |
| Category tabs | Movies/TV    | Change category  | Click, keyboard, URL update | Allowed categories | Active/invalid     | OWNER TO DECIDE — URL-writing controls usually need browser events. |
| Genre filters | Movies/TV    | Select genre IDs | Checkbox toggle, URL update | Genre list         | Loading/invalid    | OWNER TO DECIDE — consider form vs router event.                    |
| Pagination    | Lists/search | Change page      | Previous/next/page links    | Current/total page | First/last/invalid | OWNER TO DECIDE — links can avoid local state.                      |

### UI and feedback

| Component              | Used on          | Purpose                       | Interactive behaviors               | Data needs         | States                       | Server or Client                                                                   |
| ---------------------- | ---------------- | ----------------------------- | ----------------------------------- | ------------------ | ---------------------------- | ---------------------------------------------------------------------------------- |
| Button                 | Actions/forms    | Local shadcn Button primitive | Focus, disabled, pending            | Label/icon         | Default/hover/focus/disabled | Use `components/ui/button.tsx`; do not write native buttons in feature components. |
| Dropdown/popover       | Navbar/search    | Floating choices              | Focus trap or managed focus, Escape | Items              | Open/closed/loading          | OWNER TO DECIDE — primitive choice is DEC-015.                                     |
| Toast/inline alert     | Errors/mutations | Feedback                      | Dismiss and live region             | Safe message       | Success/error/pending        | OWNER TO DECIDE — how long should feedback persist?                                |
| Empty state            | Lists/sections   | Explain no data               | Retry or clear filters              | Contextual message | Empty                        | OWNER TO DECIDE — should clear action be a link?                                   |
| Skeleton/loading state | Routes/sections  | Preserve layout while waiting | None                                | Shape only         | Loading                      | OWNER TO DECIDE — server loading boundary vs component state.                      |
| Not-found state        | Entity routes    | Explain invalid/missing ID    | Back/search links                   | Safe title         | Not found                    | OWNER TO DECIDE — route boundary is the likely owner.                              |
