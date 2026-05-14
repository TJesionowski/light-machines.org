# light-machines — Design System

> *A light machine is an artifact whose substance is illumination — meaning made tangible, matter made legible — and which knows itself to be a node in a loop with the person and the institution it serves.*

---

## What this is

**light-machines** is a long-form, evergreen publication in the spirit of [gwern.net](https://gwern.net): essays, code, equations, plots, interactive animations, and the occasional video, kept and revised over time rather than published-and-forgotten. The site is the primary product. There is no app yet.

The visual language is derived from the project's founding essay — *On Light Machines* — which positions the work in the lineage of:

- the **tool for thought** (Engelbart, Kay, the Memex) — augmenting individual capability,
- the **instrument** (scientific / musical) — calibrated, honest, rewarding training,
- the **lampstand** — humble before what it bears,
- **light infantry** — capability proportioned to the person carrying it,
- the **system in the loop** — legible about its place in larger arrangements.

The design follows from the corollaries: **legibility is load-bearing, restraint is generative, form discloses function.** Quiet, typographic, paper-and-ink, with a single deep-blue accent borrowed from the founder's logo (a gear ringing an LED).

## Sources given

| Source | Path | Notes |
|---|---|---|
| Founding essay | `source/light_machines.md` | The conceptual brief. Use as the source of truth for tone, voice, and what the work *means*. |
| Author's logo draft | `assets/logo-gear-led.png` | Hand-drawn by the founder. Gear + blue LED. Kept on file as the conceptual seed; the production marks under `assets/logo-gear-led-*.svg` are clean redraws (programmatic gear, 12 teeth) in four variants. A lightbulb alternative lives at `assets/logo-bulb.svg`. |

No codebase, no Figma, no existing site has been provided. This is a **greenfield** system: the visual language was derived from the essay rather than recreated from existing surfaces.

## Index

```
README.md                         — this file
SKILL.md                          — Agent Skill manifest (use in Claude Code, etc.)
colors_and_type.css               — CSS vars + element styles (the foundation)
source/
  light_machines.md               — the founding essay
assets/
  logo-gear-led.png               — founder's original sketch (kept for provenance)
  logo-gear-led-blue.svg          — production mark, light mode, LED-blue
  logo-gear-led-amber.svg         — production mark, light mode, amber LED (warm alternate)
  logo-gear-led-blue-dark.svg     — production mark, dark mode, LED-blue + halo
  logo-gear-led-amber-dark.svg    — production mark, dark mode, amber LED + halo
  logo-bulb.svg                   — proposed alternate (lightbulb)
  logo-wordmark.svg               — wordmark "light-machines"
preview/                          — design-system tab cards (one HTML per concept)
ui_kits/
  website/
    README.md                     — the site UI kit
    index.html                    — interactive demo (Index → Essay → About)
    site.css                      — kit-scoped styles, imports colors_and_type.css
    components.jsx                — Header, Footer, EssayList, EssayHeader,
                                    Prose, Sidenote, PopLink, LegibilityFigure,
                                    IndexPage, EssayPage, AboutPage
fonts/                            — (none vendored; all from Google Fonts via @import)
```

---

## Content fundamentals

The essay sets the tone. A few specifics, drawn directly from how it reads:

**Voice.** Patient, literary, willing to hold tensions rather than resolve them too quickly. Comfortable referencing theology, cybernetics, and military doctrine in the same paragraph. Long sentences are allowed; em-dashes do real work; parentheticals carry real weight. The reader is treated as an adult who is reading carefully.

**Person.** Mostly third-person and impersonal ("a light machine is…", "the discipline is…"). First-person plural ("we") appears occasionally as editorial. Direct second-person ("you") is rare and reserved for the addressed reader of an essay. Never "I" in marketing or chrome copy — only inside signed essays.

**Casing.** Sentence case for everything except titles of essays, which use title case. **No all-caps shouting** anywhere in chrome. Small caps and uppercase tracking are used for *labels and metadata*, not emphasis.

**Punctuation & figures.** Em-dashes are used freely. Curly quotes (" " ' '), real apostrophes, true ellipses (…). Old-style figures (1234) in body prose, lining figures in tables and code. Footnote markers are superscript, not bracketed.

**No emoji.** Anywhere. The essay never uses one and the brand follows. Unicode marks like § ¶ † ‡ ❧ are welcome where they earn their place. A single ornamental glyph (·  ·  ·) serves as a chapter break.

**No marketing slop.** No exclamation points in chrome. No "Discover", "Unlock", "Supercharge". No "Built for the modern X." No CTAs that pretend a click is an event. If a button needs a label, the label is the verb of what happens next.

**Examples of on-brand chrome copy** (the kind of thing UI buttons / labels would say):

- *Read the essay* — not "Read more →"
- *Continue reading* — not "Keep going!"
- *Notes & sources* — not "References"
- *Last revised: March 2026* — not "Updated 2 months ago"
- *This essay is a draft. It will change.* — calm honesty over performed humility.

**Examples of on-brand essay-voice fragments** (not chrome, but the kind of sentences the publication produces):

- *"The opposite of a light machine is not darkness. The opposite is a heavy machine in the bad sense: an artifact that does not illuminate but obscures."*
- *"Legibility is the load-bearing virtue."*
- *"The taste being trained here is the taste for all five at once."*

---

## Visual foundations

The whole system answers to one question: *does this carry light?* Below is how that question resolves into specific visual decisions.

### Color

Paper-and-ink, with **one** accent.

- **Paper** (`--paper #FAF8F3`) is warm off-white — closer to the page of a hardcover book than to a screen. Two recessed surfaces (`--paper-2`, `--paper-3`) for code blocks and dividers; never used for whole pages.
- **Ink** (`--ink #1A1A1A`) is near-black, not pure black, to keep type from buzzing against paper. Three lighter grades (`--ink-2`, `-3`, `-4`) handle secondary text, captions, metadata, and disabled states.
- **The LED** (`--led #0A1F8F`) is the deep blue from the logo. It is the *only* accent. Reserved for links, focused-thought moments (selected sidenotes, current-section markers), and small ornamental marks. Never used as a fill for large areas.
- **Amber** (`--amber #B8732A`) is the secondary accent — used for highlights (`<mark>`), footnote markers, and "noted" states. Carries the warmth of marginalia. Tuned down for dark mode to `#C99060` so it sits *beneath* the ink against dark paper rather than competing with it.
- **Hairlines** are `rgba(ink, 0.12)` (or `0.28` when meaningful). `1px` solid black is rarely the right answer.

**Dark mode** inverts to a calm near-black (`#14130F`), not pure black. The LED brightens to `#8FA4FF` so it remains the brightest thing on the page (a literal LED at night). The amber desaturates to `#C99060` (deliberately *not* brighter — against dark paper, a bright amber competes with the ink instead of supporting it). Selection becomes a dim amber wash like a marker held against dark paper.

### Type

Three families, one job each.

- **EB Garamond** for body prose, display, and large headings. Old-style figures on by default in prose. Italics carry real semantic weight.
- **Inria Sans** for UI chrome, captions, sidenotes, labels, and metadata. Slightly warm humanist sans that pairs cleanly with Garamond.
- **JetBrains Mono** for code, equations, and any "calibrated instrument" surface (numeric tables, terminal-like UI). `calt` ligatures are *off* — code should look like code, not like rendered prose.

**Modular scale.** ~1.2 ratio for prose, ~1.333 for display. See `colors_and_type.css` for the eleven steps from `--fs-micro` (12px) to `--fs-display-l` (80px). Body prose is **18px**, line-height **1.55** — generous, intended to be read for long stretches.

**Substitutions.** All three families are on Google Fonts and load via `@import` in `colors_and_type.css`. No fonts are vendored. If the founder later wants paid alternatives (e.g. *Equity* for body, *Concourse* for sans, *Triplicate* for mono — Matthew Butterick's set, which would suit this brand exceptionally well), the var families can swap and nothing else changes. **Flag**: this is a substitution from the ideal to the free.

### Layout & rhythm

- **Measure**: body text capped at `--measure 38rem` (~640px, ~65 characters of body Garamond). Wider measures are for prose-with-figures (`--measure-wide 52rem`).
- **Vertical rhythm** is `--rhythm 1.75rem` (28px), exactly the body line-height. All vertical spacing is a multiple. Headings break rhythm intentionally — the essay's structure should be *visible* from across the room.
- **Sidenote column** at `--sidenote-w 14rem` to the right of the body measure on desktop ≥ 1024px; collapses to inline footnotes below.
- Pages are **left-aligned within a centered column**; never justified (justification with browser hyphenation is too lumpy for serious reading). Hyphens are on (`hyphens: auto`).

### Backgrounds & imagery

- The page is **paper**. No background images. No gradients. No noise textures. No protection-gradient overlays. The page does not *try*.
- Figures are presented as figures: a contained image, a caption beneath in sans, a thin rule above when a `<figure>` floats inside a section. Photographs run warm and slightly desaturated by default (a `filter: saturate(0.92)` is applied to `<img>` inside figures); diagrams are pure ink-on-paper SVGs.
- Plots prefer ink-on-paper styling (Tufte-influenced), with the LED used for the highlighted series and grays for context. No legends-as-decoration.

### Borders, cards, shadows

- **Hairlines, not borders.** `1px solid var(--rule)` is the default divider. `1px solid var(--rule-strong)` is used when the divider is structural (between table rows, between a sidebar and content).
- **Cards barely exist.** Most "card" patterns are just a hairline rule above the title. Where a card is genuinely needed (an article preview tile), it is a `--paper-2` rectangle with no border, no shadow, and `--r-3` (8px) radius.
- **Shadows are reserved for popups** — link previews, footnote tooltips. One shadow token: `--shadow-popup`. Anything else uses a hairline.
- **Corner radii.** Prose containers and figures are square (`--r-0`). Inputs and small buttons take `--r-2` (4px). Tile-shaped cards take `--r-3` (8px). Never larger.

### Motion & state

- **Motion is reserved for legibility, with one earned flourish.** Page transitions: none. Scroll-triggered animations: none. Decorative parallax: none.
- **The flourish: buttons italicize on hover** over 220ms (`cubic-bezier(.2,.7,.2,1)`). The width is pre-reserved by an invisible italic ghost stamped via `::after { content: attr(data-label) }`, so the row doesn't reflow. This is the system's one piece of motion-as-personality: it confirms the affordance without performing for the user. To opt a button in, add `data-label="<same visible text>"`.
- **Hover (links).** Color shifts to `--led-bright` and a thin `--led-wash` background appears behind the run of text — like a finger underlining as it reads. Never opacity changes; opacity changes look like web-app slop here.
- **Press.** A 1px translation downward. No shrink scales — the surface should feel firm, not gummy.
- **Focus.** A `2px` LED outline offset by `2px`, square corners. Always visible, never removed.

### Transparency & blur

- **Transparency** is used only for hairlines (rgba ink) and overlay scrims (e.g. behind a footnote popup). Body text is never set in a transparent color.
- **Blur** is used **once**: a `backdrop-filter: blur(8px)` on the sticky table-of-contents on long essays, so the heading text remains readable as prose scrolls beneath. Nowhere else.

### Density

This system is designed to handle gwern-level density (sidenotes, link previews, dense tables, inline plots) without becoming visually loud. The rule: density comes from *content*, not from chrome. If a screen feels busy, the answer is almost never "add a divider" or "add a card" — it is "remove a thing."

---

## Iconography

**The brand prefers words to glyphs.** Where a label fits, use the label. The phrase *Notes & sources* beats a footnote icon every time.

When an icon is unavoidable (e.g. small affordances inside compact UI: search, theme toggle, external-link mark, RSS), the system uses **Lucide** (`https://unpkg.com/lucide@latest`) — a 1.5px-stroke, square-cap, rounded-join open-source set whose tone matches the rest of the system: instrument-like, calibrated, not playful. Stroke is unified at `1.5px`; size is `16px` inline with body and `20px` in chrome.

- Icons inherit `currentColor` so they sit inside text runs without special-casing.
- The external-link mark `↗` (a real Unicode glyph) is preferred over an icon for inline use.
- Footnote markers are superscript numbers, not glyphs.
- The chapter-break ornament is `·  ·  ·` (Unicode middle dots with letter-spacing).
- **No emoji, anywhere.** The brand does not use them.
- **No icon font.** Lucide via SVG only — predictable rendering, fewer surprises.

**Logos.** The mark is a clean ring of 12 gear teeth around a centered LED. It is **programmatically generated** — see the script in the project's commit history — so it can be re-cut at any size or tooth count without redrawing by hand. Four variants ship:

- `logo-gear-led-blue.svg` — light mode, LED blue. **Primary.**
- `logo-gear-led-amber.svg` — light mode, amber LED. Warm alternate (e.g. for warm-paper print contexts).
- `logo-gear-led-blue-dark.svg` — dark mode, with a soft halo so the LED reads as *lit*, not painted.
- `logo-gear-led-amber-dark.svg` — dark mode, amber with halo.

A lightbulb alternate is also available at `logo-bulb.svg`. The founder's original hand-drawn sketch (`logo-gear-led.png`) is kept on file for provenance.

**Wordmark.** `assets/logo-wordmark.svg` is set in EB Garamond Medium, all lowercase, with a hyphen, at −0.025em tracking. The dot of the *i* in "machines" is replaced with the LED — measured via SVG `getBBox` so it sits cleanly on the tittle position regardless of font-metric quirks — and given a soft outer glow plus a small specular highlight so it reads as lit.

---

## Using this design system in another project

The whole project is portable. To bring it into a Claude Code project (or any codebase):

1. **Download** the project as a zip from the project menu (or use the download card surfaced when this README is opened).
2. **Unzip** it into a directory inside your codebase. A common layout: `design/light-machines/` at the repo root.
3. **Wire it in**:
   - For HTML/CSS projects, link `colors_and_type.css` from your pages — the `@import` at the top loads the three Google Fonts, and all CSS variables become available.
   - For React/Vite/Next.js projects, copy `colors_and_type.css` into your global styles entry point (`globals.css`, `app.css`, etc.) and import it once at the root.
   - The `ui_kits/website/components.jsx` file shows the patterns for Header, Footer, Prose, Sidenote, link-preview popup, and the interactive figure — port these into your component library as needed.
4. **Point Claude Code at `SKILL.md`** so it knows the brand's hard rules (type, color, no-emoji, voice). The SKILL.md is short and self-contained; Claude Code will read the project's `README.md` and `colors_and_type.css` for details.

If you want a slimmer drop-in (just the foundations, none of the preview cards or the website kit), you only need: `colors_and_type.css`, `SKILL.md`, `README.md`, and the `assets/` folder.
