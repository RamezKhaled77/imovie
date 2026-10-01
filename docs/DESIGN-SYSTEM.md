---
name: Cinematic Editorial
colors:
  surface: "#0c1114"
  surface-dim: "#0c1114"
  surface-bright: "#1c282d"
  surface-container-lowest: "#0c1114"
  surface-container-low: "#141c20"
  surface-container: "#1c282d"
  surface-container-high: "#1c282d"
  surface-container-highest: "#1c282d"
  on-surface: "#ede8dc"
  on-surface-variant: "#9ba9a8"
  inverse-surface: "#ede8dc"
  inverse-on-surface: "#0c1114"
  outline: "#aa8982"
  outline-variant: "#5b403b"
  surface-tint: "#ff5b3a"
  primary: "#ff5b3a"
  on-primary: "#0c1114"
  primary-container: "#ff5b3a"
  on-primary-container: "#0c1114"
  inverse-primary: "#e94a2c"
  secondary: "#d9a441"
  on-secondary: "#271900"
  secondary-container: "#d9a441"
  on-secondary-container: "#271900"
  tertiary: "#5fd3b3"
  on-tertiary: "#002018"
  tertiary-container: "#5fd3b3"
  on-tertiary-container: "#002018"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#ffdad3"
  primary-fixed-dim: "#ffb4a4"
  on-primary-fixed: "#3e0500"
  on-primary-fixed-variant: "#8d1600"
  secondary-fixed: "#ffdeaa"
  secondary-fixed-dim: "#f5bd58"
  on-secondary-fixed: "#271900"
  on-secondary-fixed-variant: "#5f4100"
  tertiary-fixed: "#84f7d5"
  tertiary-fixed-dim: "#67daba"
  on-tertiary-fixed: "#002018"
  on-tertiary-fixed-variant: "#005140"
  background: "#0c1114"
  on-background: "#ede8dc"
  surface-variant: "#1c282d"
typography:
  display-hero:
    fontFamily: Newsreader
    fontSize: 56px
    fontWeight: "400"
    lineHeight: 60px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Newsreader
    fontSize: 36px
    fontWeight: "400"
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 40px
    fontWeight: "400"
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: "400"
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: "500"
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Newsreader
    fontSize: 22px
    fontWeight: "500"
    lineHeight: 28px
    letterSpacing: -0.01em
  title-editorial:
    fontFamily: Newsreader
    fontSize: 18px
    fontWeight: "600"
    lineHeight: 24px
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Work Sans
    fontSize: 15px
    fontWeight: "400"
    lineHeight: 24px
  body-sm:
    fontFamily: Work Sans
    fontSize: 13px
    fontWeight: "400"
    lineHeight: 20px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
    letterSpacing: 0.04em
  label-mono-xs:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: "500"
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Implementation Contract

The source implementation lives in `app/globals.css` and uses Tailwind CSS v4's `@theme inline` block. Use the HSL-backed semantic tokens (`background`, `card`, `primary`, `muted`, and related shadcn names) for reusable components. Use the hex-backed cinematic tokens (`surface-*`, `content-*`, `brand-*`, `status-*`, and border tokens) for editorial surfaces and state styling.

Fonts are loaded by `next/font/google` in `app/layout.tsx`: Newsreader for headings, Work Sans for interface text, and JetBrains Mono for metadata. `tw-animate-css` is imported globally for shadcn animation utilities. The application is dark-first; the `.dark` variant is available for Tailwind component states, while the root palette remains the default visual theme.

## Brand & Style

The design system channels the atmospheric gravity of a midnight screening and the tactile sophistication of a prestige film-festival program. Designed for cinephiles, festival attendees, and deep-catalog explorers, the visual tone departs strictly from the frictionless, utilitarian layout of standard mass-market streaming platforms.

The aesthetic is anchored in **Editorial Minimalism with Skeuomorphic Print Undertones**:

- Deep ink-black backgrounds simulate the immersive dark of a private screening room.
- Warm bone typography mimics sun-bleached, heavy-stock letterpress paper.
- Crisp hairline rules (1px) establish a rhythm reminiscent of archival cinema journals, festival itineraries, and editorial broadsheets.
- Tactile touches—including optional CSS film-grain overlays and micro-notched ticket-stub borders—provide analog authenticity without descending into kitsch.
- Vermilion punctuates critical points of interaction with theatrical immediacy, while muted brass and sea-glass anchor curation metrics with understated confidence.

## Colors

The palette evokes natural darkroom lighting, celluloid, and archival newsprint. It rejects pure `#000000` and digital white `#FFFFFF` in favor of pigment-rich, cinematic alternatives.

### Color Tokens & Assignments

- **Background (`Ink` / `#0C1114`):** Canvas floor. Deep oceanic charcoal with a muted cool undertone to prevent eye fatigue during extended reading sessions.
- **Card & Section Surface (`Reel` / `#141C20`):** Base container tier. Provides immediate visual grouping for movie grids, review sections, and horizontal rails.
- **Elevated Surfaces & Hover (`Raised` / `#1C282D`):** Modals, popovers, contextual menus, tooltips, and interactive card hover states.
- **Structural Dividers (`Hairline` / `#2A3A40`):** Strict 1px boundary line. Used for structural grid gutters, tabular dividers, and container rims.
- **Primary Typography (`Bone` / `#EDE8DC`):** Headings, active states, and primary body copy. Warm off-white, reminiscent of antique unbleached stock.
- **Secondary Typography & Inactive Meta (`Fog` / `#9BA9A8`):** Subtitles, runtime, release years, cast credits, and placeholder states.
- **Action & Accent (`Vermilion` / `#FF5B3A`):** Interactive primary triggers, active navigation indicators, key play/trailer buttons, and high-visibility focus rings.
- **Critic & Distinction Tier (`Brass` / `#D9A441`):** TMDB scores, golden laurel badges, awards tally, and festival premiere laurels.
- **Utility & Preservation (`Sea-glass` / `#5FD3B3`):** Watchlist status, user checkmarks, confirmation states, and streaming availability tags.

## Typography

Typography carries the editorial soul of this system. It balances traditional literary weight with contemporary technical clarity.

- **Headings & Display:** Uses a literary, high-grade serif with optical sizing characteristics. When paired with tight tracking, large display titles evoke printed festival broadsheets and vintage cinema programs. Display headings should frequently be set in title case or italic variants for awards titles and director quotes.
- **Body Text:** Uses a robust, neutral grotesque typeface calibrated for clarity across extended synopsis readings and technical crew listings on deep dark backgrounds.
- **Data & Metadata (`JetBrains Mono`):** Dedicated to technical celluloid information: runtimes (`134 MIN`), aspect ratios (`2.39:1`), TMDB vote counts, release dates (`1974-10-14`), and film classification tags (`PG-13`). Always render metadata in clean, uppercase tracking.

## Layout & Spacing

The layout adheres to an archival, column-disciplined grid that respects generous editorial margins and negative space.

### Grid & Breakpoints

- **Desktop (1200px+):** 12-column grid, `margin: 3rem`, `gutter: 1.5rem`. Film posters conform strictly to vertical 2:3 ratio frames (spanning 2 columns per card in browse view, 3 or 4 columns in curated spotlight views).
- **Tablet (768px – 1199px):** 8-column grid, `margin: 2rem`, `gutter: 1rem`. Dynamic horizontal scrolling enabled for festival rails.
- **Mobile (< 768px):** 4-column grid, `margin: 1rem`, `gutter: 0.75rem`. Cards switch to either 2-column balanced poster grids or full-width stacked horizontal list-rows.

### Structural Discipline

Avoid cluttered, edge-to-edge content stacking. Lead paragraphs, cast profiles, and festival sidebars should align strictly to 1px Hairline divider rules. Spacing must remain consistent: use `space-xl` between modular sections, `space-md` within card interiors, and `space-xs` between metadata chips.

## Elevation & Depth

Depth in this system is created through physical surface-tiering and razor-thin boundary lines rather than heavy drop shadows or colored neon glows.

1. **Surface Hierarchy:**
   - **Canvas (Bottom Tier):** Ink (`#0C1114`).
   - **Containers & Posters (Mid Tier):** Reel (`#141C20`), encased in a solid `1px solid #2A3A40` boundary.
   - **Floating Elements (Top Tier):** Raised (`#1C282D`), used for search dropdowns, quick-look synopsis modals, and tooltips.

2. **Shadow Architecture:**
   - Shadows are dry, ambient, and restrained.
   - Modals and contextual overlays use: `box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.75), 0 0 0 1px #2A3A40`.
   - Never apply diffused neon blurs, colored outer glows, or drop shadows under text.

3. **Grain & Projection Atmosphere:**
   - The root background can support a fixed, subtle monochrome SVG film-grain pattern set at `3%` opacity with `mix-blend-mode: overlay` to emulate analog film stock without degrading readability or rendering speed.

## Shapes

Geometry is structured, architectural, and tactile. High-radius organic pills and overly playful bubbles are strictly prohibited.

- **Base Radius:** 4px default (`roundedness: 1`), expanding to a maximum of 6px for expansive modal dialogs. This preserves the sharp, clean edges of cut archival film sheets and festival passes.
- **Poster Ratio:** Hard commitment to `aspect-ratio: 2 / 3` for all key art and promotional stills. Cast portraits maintain a matching `2 / 3` vertical cut or a crisp, square `1 / 1` format with 4px corner radii.
- **Notch Motif (Ticket Perforation):** For featured editorial badges, event invitations, or premiere passes, employ a 6px concave semicircular cut-out at the horizontal midpoint (`radial-gradient` mask) to reflect physical ticket stubs.

## Components

### 1. Buttons

- **Primary Action (Play, Get Tickets):** Background `Vermilion` (`#FF5B3A`), label `Ink` (`#0C1114`) in `label-mono` or bolded body sans, 4px border radius. On hover: darken by 8% with a 1px offset outline.
- **Secondary / Curatorial (Add to Watchlist):** Background `transparent`, border `1px solid #2A3A40`, text `Bone` (`#EDE8DC`). On hover: background becomes `Raised` (`#1C282D`) and border transitions to `Fog` (`#9BA9A8`).
- **Ghost / Minimal:** Padding `space-xs space-sm`, text `Fog`, hover text `Bone`.

### 2. Film Poster Cards

- **Structure:** 2:3 vertical frame, `Reel` (`#141C20`) background with a 1px `Hairline` (`#2A3A40`) perimeter border. 4px corner radius.
- **Metadata Treatment:** The poster image fills the card; on hover, reveal a film metadata drawer at the base displaying title in `headline-sm`, release year and runtime in `label-mono`, and score badge in `Brass` (`#D9A441`).
- **Interactive State:** Hover elevates card using `transform: translateY(-4px)` with border color shifting to `#9BA9A8` at 40% opacity.

### 3. Ratings & Recognition Chips

- **Critic Score Chip:** Background `rgba(217, 164, 65, 0.1)`, text `Brass` (`#D9A441`), border `1px solid rgba(217, 164, 65, 0.3)`. Font: `label-mono`.
- **Status / In Watchlist Chip:** Background `rgba(95, 211, 179, 0.1)`, text `Sea-glass` (`#5FD3B3`), border `1px solid rgba(95, 211, 179, 0.3)`. Font: `label-mono`.
- **Genre Tag:** Background `Reel` (`#141C20`), text `Fog` (`#9BA9A8`), border `1px solid #2A3A40`. 4px radius.

### 4. Input Fields & Search Bars

- **Style:** Background `Reel` (`#141C20`), border `1px solid #2A3A40`, text `Bone` (`#EDE8DC`), placeholder `Fog` (`#9BA9A8`).
- **Focus State:** Border changes strictly to `Vermilion` (`#FF5B3A`), with a non-blurred `box-shadow: 0 0 0 1px #FF5B3A`.
- **Quick-Find Modal:** Autocomplete results feature monospaced metadata lines underneath primary serif titles.

### 5. Checkboxes & Filter Toggles

- **Checkboxes:** 16x16px square, 2px radius. Inactive: border `1px solid #2A3A40`, background `transparent`. Checked: background `Vermilion` (`#FF5B3A`), checkmark icon `Ink` (`#0C1114`).
- **Filter Segment Tabs:** Monospaced label, separated by 1px vertical hairline dividers. Active tab features a 2px `Vermilion` underline flush with the divider line.

### 6. Festival Program Row (Specialty Component)

- Horizontal continuous carousel bounded by a top and bottom 1px `Hairline` divider. Contains movie index (`01`, `02`, `03` in `label-mono-xs`), release year, title in italic serif, and duration.

and if you need any new component make the shadcn high usage priority
