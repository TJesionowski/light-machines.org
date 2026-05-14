# light-machines · Website UI Kit

A high-fidelity, click-through prototype of the **light-machines** publication website. The site is essay-first, gwern-influenced, paper-and-ink. This kit demonstrates the visual language and the patterns that recur across the publication.

## Screens

1. **Index** — the landing page. Wordmark, a short manifesto excerpt, and a chronological list of essays grouped by status (Finished / In progress / Draft).
2. **Essay** — a long-form reading view with sidenotes, footnote markers, blockquotes, code, equations, and an inline interactive figure.
3. **About / colophon** — what the site is, who runs it, what the type and stack are.

## Components

- `Header.jsx` — wordmark + thin nav; sticky with backdrop blur on scroll
- `Footer.jsx` — colophon strip
- `EssayList.jsx` + `EssayRow.jsx` — chronological list, hairline-divided rows
- `EssayHeader.jsx` — metadata strip + title + dek
- `Prose.jsx` — body container that styles all standard markdown elements
- `Sidenote.jsx` — marginalia in the right column on desktop, inline below
- `LinkPopup.jsx` — hover preview for inter-essay links
- `InteractiveFigure.jsx` — a small, real interactive plot (the "instrument" register made tangible)
- `ThemeToggle.jsx` — light / dark / auto

Open `index.html` to use the prototype. Click any essay title to read it; the link previews work on hover; the theme toggle is in the header.
