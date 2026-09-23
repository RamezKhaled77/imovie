# Cinematic Editorial Design System

A practical reference for building iMovie screens with the cinematic editorial system.

## Current Audit

| Area                         | Status          | Where                                                       |
| ---------------------------- | --------------- | ----------------------------------------------------------- |
| Newsreader headings          | Applied         | `app/layout.tsx`, `editorial-display`, `editorial-headline` |
| Work Sans body text          | Applied         | `app/layout.tsx`, `body`, `font-sans`                       |
| JetBrains Mono metadata      | Applied         | `app/layout.tsx`, `metadata`, `font-mono`                   |
| shadcn semantic colors       | Applied         | `app/globals.css`                                           |
| Editorial color tokens       | Applied         | `app/globals.css`                                           |
| Poster and film utilities    | Available       | `app/globals.css`                                           |
| Home page visual composition | Not yet applied | `app/page.tsx` currently only renders `Home`                |

The fonts are loaded with `next/font/google`, so use the Tailwind classes and utilities below instead of importing fonts inside components.

## Visual Direction

- Canvas: deep ink charcoal, never pure black.
- Primary copy: warm bone, never pure white.
- Headings: literary Newsreader.
- Body copy: readable Work Sans.
- Technical metadata: uppercase JetBrains Mono.
- Actions: vermilion.
- Scores and awards: brass.
- Watchlist and confirmation states: sea-glass.
- Borders: 1px hairlines, restrained shadows, and 4px corners.
- Posters: always use a `2 / 3` ratio.

## Colors

### Direct Editorial Tokens

Use the canonical names below for intentional, cinematic surfaces and accents. The shorter names are compatibility aliases already exposed by `app/globals.css`.

| Token     | Canonical class          | Alias             | Hex       | Use                           |
| --------- | ------------------------ | ----------------- | --------- | ----------------------------- |
| Ink       | `bg-surface-ink`         | `bg-ink`          | `#0C1114` | App canvas                    |
| Reel      | `bg-surface-reel`        | `bg-reel`         | `#141C20` | Cards, inputs, poster backing |
| Raised    | `bg-surface-raised`      | `bg-raised`       | `#1C282D` | Hover, menus, overlays        |
| Hairline  | `border-border-hairline` | `border-hairline` | `#2A3A40` | Dividers and card borders     |
| Bone      | `text-content-bone`      | `text-bone`       | `#EDE8DC` | Main copy and headings        |
| Fog       | `text-content-fog`       | `text-fog`        | `#9BA9A8` | Secondary copy and metadata   |
| Vermilion | `bg-brand-vermilion`     | `bg-vermilion`    | `#FF5B3A` | Primary actions and focus     |
| Brass     | `text-brand-brass`       | `text-brass`      | `#D9A441` | Scores, awards, recognition   |
| Sea-glass | `text-brand-seaglass`    | `text-sea-glass`  | `#5FD3B3` | Watchlist and success states  |

Examples:

```tsx
<section className="border border-hairline bg-reel p-6 text-bone">
  <p className="metadata text-fog">134 MIN / 1974</p>
  <h2 className="editorial-headline text-2xl">The Conversation</h2>
</section>
```

### shadcn Semantic Tokens

Use semantic classes when building reusable shadcn components:

```tsx
<Button className="bg-primary text-primary-foreground">Watch trailer</Button>

<div className="border-border bg-card text-card-foreground">
  <p className="text-muted-foreground">Available on Criterion</p>
</div>
```

Available semantic classes include:

- `bg-background`, `text-foreground`
- `bg-card`, `text-card-foreground`
- `bg-popover`, `text-popover-foreground`
- `bg-primary`, `text-primary-foreground`
- `bg-secondary`, `text-secondary-foreground`
- `bg-muted`, `text-muted-foreground`
- `bg-accent`, `text-accent-foreground`
- `bg-destructive`, `text-destructive-foreground`
- `border-border`, `border-input`, `ring-ring`

Prefer semantic tokens inside shared components. Prefer direct editorial tokens when the visual role is specifically cinematic, such as a brass score or vermilion ticket button.

Additional direct tokens cover `brand-*-hover`, `brand-*-muted`, `brand-*-border`, `status-error`, `status-success`, `status-warning`, `content-warm`, `border-outline`, and `border-strong`.

## Typography

### Utility Classes

| Utility                | Font           | Use                                       |
| ---------------------- | -------------- | ----------------------------------------- |
| `font-serif`           | Newsreader     | Editorial display and headings            |
| `font-sans`            | Work Sans      | Body copy and interface text              |
| `font-mono`            | JetBrains Mono | Technical data and metadata               |
| `editorial-display`    | Newsreader     | Large hero or feature title               |
| `editorial-headline`   | Newsreader     | Film titles and section headings          |
| `metadata`             | JetBrains Mono | Uppercase runtime, year, rating, and tags |
| `text-display-hero`    | Newsreader     | 56px display title with 60px line height  |
| `text-headline-lg`     | Newsreader     | 40px heading with 48px line height        |
| `text-headline-md`     | Newsreader     | 28px heading with 36px line height        |
| `text-headline-sm`     | Newsreader     | 22px heading with 28px line height        |
| `text-title-editorial` | Newsreader     | 18px title with 24px line height          |
| `text-body-lg`         | Work Sans      | 18px body text with 28px line height      |
| `text-body-md`         | Work Sans      | 15px body text with 24px line height      |
| `text-body-sm`         | Work Sans      | 13px body text with 20px line height      |
| `text-label-mono`      | JetBrains Mono | 12px label with 0.04em tracking           |

Examples:

```tsx
<h1 className="editorial-display text-bone">A Night at the Cinema</h1>
<h2 className="editorial-headline text-3xl">Festival Program</h2>
<p className="font-sans text-lg text-bone">A synopsis with comfortable reading width.</p>
<span className="metadata text-fog">2.39:1 / 134 MIN / PG-13</span>
```

Keep display typography in Newsreader and interface controls in Work Sans. Do not use mono for paragraphs.

Mobile display and large-headline values are available as `text-display-hero-mobile` and `text-headline-lg-mobile`.

## Film Components

### Poster

Use `poster-frame` for every key art container. Add `poster-lift` to interactive posters.

```tsx
<a className="poster-frame poster-lift block" href="/films/the-conversation">
  <img
    src="/posters/the-conversation.jpg"
    alt="The Conversation poster"
    className="h-full w-full object-cover"
  />
</a>
```

`poster-frame` provides the required `2 / 3` ratio, reel background, hairline border, and 4px radius. `poster-lift` adds the subtle 4px hover lift and respects reduced-motion preferences.

### Film Card

```tsx
<article className="group space-y-3">
  <div className="poster-frame poster-lift">
    <img
      src="/posters/film.jpg"
      alt="Film title poster"
      className="h-full w-full object-cover"
    />
  </div>
  <div>
    <h3 className="editorial-headline text-xl text-bone">Film Title</h3>
    <p className="metadata mt-1 text-fog">2026 / 118 MIN</p>
  </div>
</article>
```

### Film Rule

Use `film-rule` for festival rails and editorial section boundaries:

```tsx
<div className="film-rule flex items-center justify-between py-4">
  <span className="metadata text-fog">01</span>
  <h3 className="editorial-headline italic">The Long Goodbye</h3>
  <span className="metadata text-fog">112 MIN</span>
</div>
```

## Buttons and States

```tsx
<button className="rounded bg-vermilion px-4 py-3 font-mono text-xs font-medium uppercase tracking-wide text-ink">
  Play trailer
</button>

<button className="rounded border border-hairline px-4 py-3 font-mono text-xs uppercase tracking-wide text-bone hover:bg-raised">
  Add to watchlist
</button>

<span className="rounded border border-brass/30 bg-brass/10 px-2 py-1 metadata text-brass">
  92 / 100
</span>

<span className="rounded border border-sea-glass/30 bg-sea-glass/10 px-2 py-1 metadata text-sea-glass">
  In watchlist
</span>
```

Use icons for icon-only controls and include an accessible `aria-label`. Keep text buttons for clear actions such as Play, Add, Save, and Get tickets.

## Layout and Spacing

- Desktop: use a 12-column grid with generous outer margins.
- Tablet: use an 8-column grid and horizontal rails where helpful.
- Mobile: use a 4-column grid with `p-4` page gutters.
- Common spacing: `gap-2`, `gap-4`, `gap-6`, `gap-10`.
- Use `space-y-6` between editorial modules and `space-y-2` inside compact cards.
- Keep poster cards stable with `aspect-ratio`; do not let metadata change poster dimensions.
- Keep text measure comfortable with `max-w-prose` or a constrained grid column.

A useful page shell:

```tsx
<main className="min-h-screen bg-ink px-4 py-8 text-bone md:px-8 lg:px-12">
  <div className="mx-auto max-w-7xl">...</div>
</main>
```

## Accessibility and Motion

- Use real heading hierarchy: one `h1`, then `h2` and `h3` by section.
- Always provide meaningful poster alt text.
- Use `:focus-visible` states; the global stylesheet provides a vermilion outline.
- Keep body text at readable contrast against ink and reel surfaces.
- Use `poster-lift` instead of adding custom hover transforms.
- Reduced-motion users automatically receive no poster transition.
- `tw-animate-css` is imported globally for shadcn animation utilities; keep custom motion purposeful and respect `prefers-reduced-motion`.

## Recommended Workflow

1. Start each screen with `bg-ink text-bone`.
2. Define the layout grid and poster ratios before styling details.
3. Use semantic shadcn tokens inside shared components.
4. Add `editorial-headline` to film titles and `metadata` to technical facts.
5. Reserve vermilion for primary actions and brass for recognition.
6. Check mobile wrapping, keyboard focus, poster alt text, and reduced motion.
7. Run `pnpm lint` and `pnpm build` before finishing.

Semantic shadcn tokens are HSL-backed, while cinematic tokens are hex-backed. Keep semantic tokens for reusable component states and cinematic tokens for editorial art direction.

## Source Files

- Global tokens and utilities: `app/globals.css`
- Font loading: `app/layout.tsx`
- Current page composition: `app/page.tsx`
