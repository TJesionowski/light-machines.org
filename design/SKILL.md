---
name: light-machines-design
description: Use this skill to generate well-branded interfaces and assets for light-machines, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files. Start with `README.md` for content + visual fundamentals; then `colors_and_type.css` for the actual tokens; then `ui_kits/website/` for live components.

The brand is **light-machines** — a long-form, evergreen publication in the spirit of gwern.net. Paper-and-ink, typographic, restrained. One accent color (deep LED blue from the founder's logo). No emoji. Words preferred to icons.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out of `assets/` and create static HTML files for the user to view. Always import `colors_and_type.css` so the type and color tokens are available. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Hard rules to respect:
- Body in EB Garamond 18/28; UI in Inria Sans; code in JetBrains Mono (ligatures off).
- The LED (`--led #0A1F8F`) is the only accent. Use sparingly.
- Hairlines, not borders. Square prose. Cards barely exist.
- Motion is reserved for legibility. No decorative animation.
- No emoji, anywhere. No marketing voice. No "Discover", "Unlock", "Supercharge".
- Buttons are verbs of what happens next ("Read the essay", not "Read more →").
