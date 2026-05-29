# Design Audit — Michael Low Site

> Scope: full site, linen theme (`accentTheme = 'linen'`).
> Goal: evolve the editorial / terminal-adjacent voice with more visible color, without redesigning. No file changes recommended in this document — recommendations only.

---

## 1. What's working

- **Linen system is internally consistent.** The token swap in `src/styles/global.css` (`html[data-accent='linen']` block, lines 74–88 and 116–254) cleanly redirects every old dark-theme alias (`text-off-white`, `text-amber-accent`, `bg-charcoal`, `border-border`) into the new palette. Pages written against the dark theme still render correctly in linen.
- **Help section is the site's strongest editorial moment.** `#help` (`src/pages/index.astro` 25–54) combines a full-viewport frame, the `WhoPainList` `-` markers, the navy `[01]–[05]` manifest list with hover left-bar (`.help-manifest-list__item::before`), and a single mono CTA. It reads like an op-ed page, not a SaaS section.
- **Hero terminal is the right "premium" gesture.** `HeroTerminalBlock` + linen overrides (`global.css` 160–196) — soft outer ring, paper-white surface, navy subject, gray method, emerald arrow, navy blinking cursor — is genuinely distinctive and matches the "messy input → clean operating system" tagline.
- **Hero typographic scale is excellent.** `2.5rem → 4.75rem` Outfit-bold display H1 against an 18–22px body intro (`Hero.astro` 24–34) anchors the page without feeling shouty.
- **Navy-as-amber-accent is a clever rename.** Letting the existing `text-amber-accent` utility resolve to `#1f344a` in linen mode means every accent surface on the site is unified through one variable, no rewrites needed.

---

## 2. Inconsistencies / friction (per page)

### Global / cross-page

- **Two competing section-header patterns.** `#help` uses a bespoke `.help-ways-section-label` (mono small label + short 120px navy gradient line) plus its own custom sans-bold H2 (`.help-who-block__title`, `.help-offerings-head__title`). The very next sections on the same page (`#portfolio`, contact) use `SectionHeader.astro`, which renders the label + line + a different H2 (`font-sans font-semibold tracking-tight` via SectionHeader's compact variant). On inner pages, `PageHeader.astro` uses **a third** pattern (no gradient line, `font-medium` not semibold, `font-mono` subtitle). Three section-header treatments compete on the same site.
- **Three CTA "link" styles in active use.** `.hero-cta-link` (mono · text-lg · font-medium uppercase), `.link-arrow` (mono · text-xs uppercase), and `.cta-link-primary` (sans · 14px · tracking 0.06em). The homepage uses `.hero-cta-link` in two places and `.link-arrow` in a third — same page, three sizes of arrow-link.
- **Body text scale collapses on inner pages.** Homepage body is 17–18px (`.help-who-block__intro`, `.help-manifest-list__desc`). `work.astro` and `contact.astro` are mostly `text-sm` (14px) with `text-base` only in lead paragraphs. Inner pages feel cramped relative to home.
- **Heading family flips silently between sans and serif.** Homepage section H2s are sans-bold semantic display (`.help-who-block__title`, `font-size: 2–2.35rem`, weight 600). `work.astro` and `about.astro` use `font-serif text-2xl` for the same role. The global base rule (`global.css` 130–134, `h1,h2,h3 { @apply font-serif font-normal }`) is what inner pages fall through to. The result is a serif-or-sans toss-up depending on which file the H2 lives in.
- **Five different bullet markers in active use.** Pain list `-` (navy mono), bestFitIf `✓` (`text-amber-accent` = navy), notOffered `×` (`text-red-400/80` — **the only red on the site**), whoBestFor `·` (`text-amber-accent/60`), whatYouGet `·` (`text-amber-accent`). Most of these are on the same page (`work.astro`).
- **Stale "section-glow-overlay" / "ambient-bg" / `glow-amber` in the DOM.** All three are hidden via linen overrides (`global.css` 138, 152, 198) but still render their wrapper divs and run their inline `style="background: radial-gradient(...)"` — empty paint cost and dead markup. `AmbientBackground.astro` is the worst offender: 5 absolutely-positioned divs that are entirely `display: none` in linen.

### `src/pages/index.astro` (homepage)

- Hero, help, portfolio, contact each use a different vertical rhythm utility (`hero-section min-h-[calc(...)]`, `.section-viewport`, `.section-padding-home`, `.section-padding-home` again on contact). Two of those just exist for parity — could collapse to one.
- `#portfolio` still renders a navy radial-gradient overlay (`section-glow-overlay`, line 56–62) that's hidden via linen rule but the inline `style` and the empty div ship.
- Portfolio → "All projects" uses `.link-arrow` (tiny mono), while help → "Start your workflow audit" right above it uses `.hero-cta-link` (large mono). Visual hierarchy reads as "audit is more important than projects", which is fine, but the contact-section CTA below ("Start with a workflow call") is back to small `.link-arrow` — inconsistent with the editorial weight given to the help CTA.

### `src/pages/work.astro`

- Single most "dark-theme port" feeling page on the site.
- All H2s are `font-serif text-2xl text-off-white` — looks small and quiet next to homepage display-sans titles.
- Alternating `bg-charcoal-light/30` band sections — in linen, `--color-charcoal-light` resolves to `#f2f1ec`, so 30% opacity is essentially invisible. The alternation does nothing visible.
- Bullet markers change every list (see global note above). All four lists are on one page.
- `engagementProcess` step uses `rounded-full border border-amber-accent/40 font-mono text-xs text-amber-accent` numbered chip — works, but feels like a dark-theme port and is the only round-chip pattern on the site.
- The "What I don't do" `×` markers are `text-red-400/80`. Only red on the site; out of palette.
- Body text is 14px throughout. Long page, small text, no warmth.

### `src/pages/contact.astro`

- Three `card-surface` "Email / LinkedIn / GitHub" boxes feel boxy and SaaS-y next to the editorial homepage manifest list. They're the most dated UI on the site.
- `StatusLine variant="bar"` is the only bar-style pill on the site (the only other status appearance is `caption` on `/work`); both blue dots feel arbitrary in a navy-anchored palette.
- `AvailabilityBanner` uses `card-surface glow-amber` + inline center radial overlay that ends up rendering as a tiny navy-12% spot on white — visually noise, not signal.

### `src/pages/about.astro`

- Headshot is wrapped in `border-amber-accent/15 bg-charcoal-card shadow-lg glow-amber` — navy/15 ring + soft shadow + invisible glow. Only ringed image on the site.
- The page header uses `PageHeader` (compact + tightSubtitle). The radial gradient overlay inside `PageHeader` is invisible in linen.
- The "Beyond work" + "How I show up" sub-blocks use `section-label` mono caps but no rule line — a fourth section-header treatment.

### `src/pages/projects/index.astro`

- Two H2s "Products" and "Workflows" use `class="section-label"` — they're 11px mono caps. Compared to the H2s on every other page, these read as captions, not section breaks. Hierarchy is too quiet for the page's purpose.
- Uses `PageHeader` (mono subtitle) so the inner page voice is back to inner-page voice.

### `src/pages/projects/[...slug].astro` (case study)

- Inline prose-style classes (`[&_h2]:font-serif [&_h2]:text-2xl …`) — serif H2 inside body, fine. But `[&_h3]:text-lg [&_h3]:text-off-white` falls through to the global base `h1,h2,h3 { font-serif font-normal }` rule, so H3 is **also** serif and only one weight away from H2. Hierarchy compresses.
- Links: `[&_a]:text-amber-accent [&_a]:hover:underline` — navy text with no underline at rest. On a linen body, navy-on-cream is readable but inline links aren't visually obvious. Underline-on-hover only is the dark-theme default.

### `src/pages/build-log/index.astro` + `[...slug].astro`

- `BuildLogCard` uses `card-surface` + a tag chip row with `border-border px-2 py-0.5 font-mono text-[9px] uppercase text-muted-dim`. 9px gray-on-cream tags are essentially unreadable.
- Build-log entry inline `code` uses `bg-charcoal-card text-amber-accent` — in linen that's navy-on-white with no border. Inline `<code>` blends into prose and disappears.

### `src/pages/now.astro`

- Smallest, simplest page; main issue is just the vestigial `PageHeader` radial-gradient overlay.

### `src/components/Navbar.astro`

- Active route is signaled only by `bg-amber-accent/10 text-amber-bright` (navy-10 pill, navy text). No editorial mark like a 1px bottom border or underline. Reads as "highlighted" but not "this is where you are".
- "ML" logo chip: navy/20 border + navy/5 bg + navy mono text — the **only** navy-tinted pill on the site. Underused as a design signal.
- Mobile menu summary: `border border-border bg-charcoal-card/80` and `bg-charcoal-elevated/95 shadow-2xl` on the dropdown. Works in linen, but `shadow-2xl` (massive shadow) on a thin cream-on-cream menu feels like a port.

### `src/components/Footer.astro`

- `divider-glow` (navy gradient line at top) is the strongest line on the site. Good moment.
- Two nav columns are all `font-mono text-xs uppercase tracking-wider text-muted` — every link is a tiny gray mono cap. Footer reads as a wall of monospace.
- Lab links (`design-lab`, `brand-lab`, `ui-lab`, `traits-lab`) are visible on every page — internal scratch should not live in the global footer.

### `src/components/ProjectCard.astro`

- Image wrapper uses `bg-[#111217]` (for `contain` photos) and `bg-charcoal` (for `cover`). In linen, `bg-charcoal` becomes `#f7f6f1` (fine), but `bg-[#111217]` is hardcoded near-black and renders a dark slab inside a white card — clearly a dark-theme leftover.
- Image overlay gradient: `from-charcoal-card/95 via-charcoal-card/15 to-transparent`. In linen, `charcoal-card` = `#ffffff`, so the gradient is white→white-fade. It does nothing — used to push the title up out of a dark image and is no longer doing that job.
- `StatusBadge` overlay (`top-4 right-4`) sits over potentially-near-white image space; see StatusBadge issue below.
- `category · type` is `font-mono text-xs uppercase tracking-[0.15em] text-muted` — plain gray caps; this is the obvious place for a colored tag chip.

### `src/components/StatusBadge.astro`

- All four states use `bg-{color}-500/10 text-{color}-400/90` patterns (lines 8–13). On a white project card these become pale-tint-on-white with low-contrast text. Especially "Built" (`text-emerald-400/90`) and "Prototype" (`text-blue-400/90`) are barely legible. Most visible dark-theme leftover on the site.

### Hover / focus states

- The site has a few good hover states (manifest list left-bar, card-surface border swap). Focus-visible rings are nowhere — nothing for keyboard nav.
- `a { @apply transition-colors duration-300 }` is global, so every link gets a slow color crossfade. Combined with `link-arrow`'s gap animation it's pleasant; but no link gets a visible underline at rest, only hover (and only via the prose escape hatch).

### Mobile gaps (inferable)

- Hero grid: `xl:grid-cols-[1.02fr_0.98fr]` (`Hero.astro` 19) only kicks in at xl. Between md and lg the two columns share width with no rhythm rule.
- `work.astro` uses `text-sm md:text-base` — text gets bigger past `md`, but the small `<= md` body is already too small for an editorial site.
- Footer two-column `flex gap-16` stays in single row until md; at md the second 4-link column drops underneath unevenly because the first column has only 5 nav links vs 4 social.

---

## 3. Color upgrade strategy

### Primary move

Adopt **Pass 3 — Warm sand bands** as the site-wide color move, supplemented by **one specific borrowed move from Pass 6** (a 3px navy left accent on certain blocks). Sand bands give the "more color" the user wants without introducing a second hue and without competing with the navy. They earn color through warmth and depth, not chroma.

### Palette (extend, don't replace)

Existing linen tokens (keep):

| role | hex |
| --- | --- |
| page | `#f7f6f1` |
| surface raised | `#ffffff` |
| surface inner | `#faf9f6` |
| border base | `#d8d4ca` |
| border hover | `#c5c0b6` |
| ink heading | `#111827` |
| ink body strong | `#374151` |
| ink body | `#4b5563` |
| ink caption | `#6b7280` |
| navy primary | `#1f344a` |
| navy hover | `#162a3d` |
| navy lighter | `#27435d` |

Add (new):

| role | hex | usage |
| --- | --- | --- |
| sand band | `#f0ebe3` | alternating section bg on home + inner pages |
| sand band deep | `#ebe6dc` | CTA strip + footer surface |
| navy soft tint | `rgba(31, 52, 74, 0.06)` | chip / status bg |
| navy soft border | `rgba(31, 52, 74, 0.18)` | chip / status border |

Optional second hue (only if more color still feels needed after sand bands ship):

| role | hex | usage |
| --- | --- | --- |
| muted teal | `#2a7a7e` | tag chip text/border on `TechStack` + `StatusBadge "Prototype"` + `BuildLogCard` tags only |
| muted teal tint | `rgba(42, 122, 126, 0.12)` | tag chip bg |

Recommend trialing sand bands first; only add teal if the site still feels under-colored after.

### 6 placements

1. **Homepage section bands.** `#help` keeps `#f7f6f1`. `#portfolio` → `#f0ebe3`. `#contact` → `#f7f6f1`. The eye gets one warm band per scroll.
2. **Inner page section bands.** `work.astro` — replace the dead `bg-charcoal-light/30` alternation with real sand bands on "Best fit if" and "How it works" sections.
3. **CTA strips + Footer.** Footer surface → `#ebe6dc` (deeper sand) so the closing block reads as a designed endpiece, not a graveyard of mono links. AvailabilityBanner → sand bg + 2px navy left bar (drop `card-surface`).
4. **Status pills & tag chips.** `StatusBadge`, `TechStack` pills, `BuildLogCard` tags — switch from dark-theme `/10` colors to solid linen-friendly tints (Built `#ecf6ef + #166534`, Prototype `#eef3fc + #1e40af`, In Progress `#fff6e0 + #92400e`, Concept `#f3f1ea + #4b5563`). 1px solid border at ~35% mix of the ink.
5. **Project card category tag.** Replace `text-muted` gray-mono `category · type` with a navy filled chip `bg: rgba(31,52,74,0.06)` + `border: rgba(31,52,74,0.18)` + `color: #1f344a`. Project tags now carry real signal.
6. **Navbar active route.** Add a 2px navy bottom border under the active link (drop the `bg-amber-accent/10` pill). Editorial "you are here" mark.

Bonus, if a small second hue is approved later:

7. **Terminal arrow stays emerald.** Don't touch the only existing micro-color signature.
8. **`-` pain markers** could shift to muted teal `#2a7a7e` to read as "data not navigation". Keep navy for `[01]–[05]` manifest indices to preserve the editorial spine.

---

## 4. Typography refinements

- **Pick a deliberate rule and stick to it.** Recommend:
  - **Sans-bold display (Outfit 600, tracking -0.02em)** for *operational / structural* headings: hero H1, homepage section H2s (`Who this is for`, `Not sure what you need?`), `work.astro` H2s, `projects/index.astro` H2s (`Products`, `Workflows`), Navbar/Footer wordmark.
  - **Serif normal (Fraunces 400)** for *editorial / personal* headings: case-study H1 (`ProjectHero`), build-log entry H1, `about.astro` lead paragraph, related-projects section title, the tagline `Messy input in. Clean operating system out.` (already serif italic in footer — good).
  - Current state: it's accidental. The global `@layer base h1,h2,h3 { @apply font-serif font-normal }` is what makes inner pages flip silently to serif when the page author didn't add `font-sans`. Remove the global rule and require each heading to declare its family.
- **Body scale bump on inner pages.** `work.astro` lists / paragraphs should be `text-base` (16px) baseline, with `md:text-[17px]` like homepage. Currently 14px. Adds warmth instantly.
- **Mono usage is slightly overused.** Mono lives on: nav links, footer links, section-labels, section subtitles (on `PageHeader`), traits, terminal, tags, dates, status, project card "category · type", `link-arrow`, `hero-cta-link`. Recommendation: reserve mono for *data* (terminal, status, dates, tags, technical metadata, section eyebrow labels). Move *navigation* and *body* away from mono.
  - `Footer.astro` nav columns → sans 14px medium, not mono uppercase.
  - `PageHeader` subtitle (`font-mono text-sm leading-relaxed`) → sans 16–17px to match homepage subtitles.
- **Underuse of serif italic.** The only serif italic is in the footer tagline. Consider serif italic for one element on every page (case-study pull quotes, about lead drop-sentence, manifest "01 / Audit" prefix on big screens). It's the spice that says "editorial".

---

## 5. Component-level upgrades (prioritized)

| # | Component / file | Change | Effort |
| --- | --- | --- | --- |
| 1 | `src/components/StatusBadge.astro` | Replace all four `bg-{c}-500/10 text-{c}-400/90` rules with solid linen-friendly tint pairs (see palette §3.4). Add solid 1px border at ~35% mix. Removes the most obvious dark-theme leftover. | **S** |
| 2 | `src/pages/work.astro` H2s + bullets | Swap `font-serif text-2xl text-off-white` for `font-sans text-3xl md:text-[2.35rem] font-semibold text-[#111827] tracking-tight` on all five section H2s. Unify all four list bullets to navy `-` mono prefix (mirror `WhoPainList`). Drop the red `×` on notOffered → navy `—` em-dash, keep the semantic strikethrough sense by adding `text-[#6b7280]` to the item label. | **S** |
| 3 | `src/pages/work.astro` band rhythm | Remove `bg-charcoal-light/30` from "Best fit if" and "How it works". Add `bg-[#f0ebe3]` to "Best fit if" and "What you get" sections only (alternating). Bump all body text to `text-base md:text-[17px]`. | **M** |
| 4 | `src/components/ProjectCard.astro` | Drop the (now-pointless) `from-charcoal-card/95 via-charcoal-card/15 to-transparent` gradient overlay. Replace `bg-[#111217]` `contain` background with `bg-[#f7f6f1]`. Swap `card-surface` gradient for flat `bg-white border border-[#d8d4ca]` + hover navy 2px left bar (mirror `.help-manifest-list__item::before`). Replace `category · type` mono gray with a navy filled chip. | **M** |
| 5 | `src/pages/contact.astro` | Replace the three `card-surface` link boxes with a `HelpManifestList`-style list (`[01] Email — hello@…`, `[02] LinkedIn — Connect`, `[03] GitHub — View projects`). Drops boxy SaaS feel, matches homepage editorial pattern. Drop the `glow-amber` + radial overlay from `AvailabilityBanner` while you're in there. | **M** |
| 6 | `src/components/Navbar.astro` | Active route: add `border-b-2 border-[#1f344a]` under the link text instead of `bg-amber-accent/10`. Mobile menu summary: flat white + 1px `#d8d4ca` border, drop `shadow-2xl` on the dropdown (use `0 8px 24px rgba(17,24,39,0.08)`). | **S** |
| 7 | `src/components/Footer.astro` | Move full footer surface to `bg-[#ebe6dc]` (deeper sand band) so it reads as a closing piece. Switch nav columns from mono-uppercase to sans 14px medium, retain mono only on `email` line. Move lab-page links into a small `<details>` "Internal labs" disclosure (or drop them altogether on production pages — keep on a dedicated `/labs` index). | **M** |
| 8 | `src/components/PageHeader.astro` | Remove the invisible radial gradient overlay (lines 21–26). Add `bg-[#f0ebe3]` to give inner-page headers a real sand-band identity. Change subtitle to `font-sans text-base md:text-lg text-[#374151]` (drop mono) so inner-page intros read like the homepage. | **S** |

Secondary (do after the top 8):

- `src/components/AmbientBackground.astro` — remove the import from `Layout.astro` when accent is linen (it's pure dead DOM in linen mode). **(S)**
- `src/components/AvailabilityBanner.astro` — flatten: drop `card-surface glow-amber` + radial; rebuild as `bg-[#f0ebe3]` block with a 2px navy left bar + a left-aligned text + navy primary button right. **(S)**
- `src/components/StatusLine.astro` — consolidate from 6 variants to 2 (`bar` and `caption`); blue dot → navy dot. **(M)**
- `src/components/BuildLogCard.astro` — flat card pattern matching new ProjectCard; bump tags to `text-[11px]` with linen-friendly tint. **(S)**
- `src/components/ServiceCard.astro` — already linen-native; consider removing the `.help-module-card` since the homepage doesn't use it anymore (only labs). Audit usage first. **(S)**
- `src/pages/projects/[...slug].astro` — remove the global `h1,h2,h3 { font-serif font-normal }` base rule (`global.css` 130–134) and explicitly set families in the case-study prose classes. Add `[&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-amber-accent/40` so inline links are visible at rest. **(M)**

---

## 6. Quick wins (next 60 minutes)

1. **Fix `StatusBadge` palette.** ~10 min. Single file. Biggest visual lift per line touched — kills the most obvious dark-theme leftover on every project card.
2. **Standardize `work.astro` H2s + body size.** ~15 min. Replace 5 H2 classnames + bump 4 `text-sm` lists to `text-base`. `work.astro` instantly matches homepage hierarchy.
3. **Drop the dead overlays.** ~5 min. Delete the inline radial-gradient `<div>` from `PageHeader.astro`, `ProjectHero.astro`, `AvailabilityBanner.astro`, and the `<section class="section-glow-overlay">` div from `index.astro` portfolio block. They render nothing in linen — pure dead markup.
4. **Add sand-band rhythm on homepage `#portfolio`.** ~5 min. Wrap the section in `bg-[#f0ebe3]` (or add a linen rule `html[data-accent='linen'] #portfolio { background: #f0ebe3 }`). Visible color appears site-wide with one rule.
5. **Navbar active route → navy bottom-border instead of pill.** ~10 min. One classlist change in `Navbar.astro`.

Total: ~45 min of clean edits, no risk to current tuned pieces, ships a visibly different (more colorful, more editorial) site.

---

## 7. Risk areas / things NOT to change

These have been deliberately tuned. Treat as protected unless the user explicitly asks.

- **Hero CTA "What I can help with" + scroll-arrow animation.** `HeroCtaBar.astro` size and the `.animate-scroll-hint` are recently calibrated. Don't shrink the link or remove the bounce.
- **`WhoPainList` `-` markers.** `.who-pain-list__prefix` uses `font-variant-numeric: tabular-nums`, `width: 0.875rem`, `text-align: center` — intentional alignment so wrapped bullet text aligns with the first character. Don't replace `-` with `·` or remove the tabular-nums.
- **Help section full-viewport framing.** `#help` uses `.section-viewport` (`min-h-[calc(100vh-4.25rem)]`). The single-screen pacing is the editorial pause — don't compress it.
- **`HelpManifestList` `01–05` dividers + hover navy left-bar.** `.help-manifest-list__item { border-bottom: 1px solid #d8d4ca }` plus `::before { background: #1f344a }` on hover is the editorial signature of the homepage. Don't add cards, gradients, icons, or column gutters here.
- **Hero terminal panel — filename / arrow / subject colors.** `global.css` 160–196 is the most carefully-tuned block on the site (navy subject, gray method, emerald arrow, navy blinking cursor). Don't shift the arrow to navy or recolor the cursor. The emerald arrow is the only non-navy color signature in the hero and it matters.
- **Hero typography scale (`2.5rem → 4.75rem`).** Established. Don't bump it up trying to make hero "louder".
- **Help section sans-bold H2s.** `.help-who-block__title` and `.help-offerings-head__title` are the sans-display benchmark the rest of the site should standardize toward — don't switch these to serif.
- **Footer top `divider-glow` line.** It's the strongest navy line on the site. Keep it even if you swap footer surface to sand.
- **Linen accent variable indirection** (`--color-amber-accent: #1f344a`). Don't rename `amber-accent` to `navy` globally — it would force a rewrite of every component and lose the dark-theme fallback path.

---

## Appendix — file map cross-reference

Files read for this audit:
- `src/pages/index.astro`, `work.astro`, `contact.astro`, `about.astro`, `now.astro`
- `src/pages/projects/index.astro`, `projects/[...slug].astro`
- `src/pages/build-log/index.astro`, `build-log/[...slug].astro`
- `src/pages/color-pass-lab.astro` (color reference only)
- `src/components/Layout.astro`, `Navbar.astro`, `Footer.astro`, `AmbientBackground.astro`
- `src/components/Hero.astro`, `HeroCtaBar.astro`, `HeroTerminalBlock.astro`, `TerminalPanel.astro`
- `src/components/SectionHeader.astro`, `PageHeader.astro`
- `src/components/WhoPainList.astro`, `HelpManifestList.astro`
- `src/components/ProjectCard.astro`, `ProjectHero.astro`, `ServiceCard.astro`, `BuildLogCard.astro`
- `src/components/StatusBadge.astro`, `StatusDot.astro`, `StatusLine.astro`, `AvailabilityBanner.astro`
- `src/components/TechStack.astro`, `OutcomeList.astro`, `RelatedProjects.astro`, `FeatureList.astro`
- `src/styles/global.css`, `src/config/site.ts`
