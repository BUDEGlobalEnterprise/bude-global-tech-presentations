# Legacy — original vanilla JS app

This folder is the **archived original** Bude Global Tech Presentations app: plain
HTML / CSS / JavaScript with Reveal.js, no build step. It was the project up to the
Next.js migration in May 2026.

It's kept here for reference and history. **Active development happens in
[`../bude-presentations-next/`](../bude-presentations-next/)** — the React / Next.js
rewrite.

## What's in here

| Path | What it was |
|---|---|
| `index.html` | Single-page entry point |
| `presenter.js` | The 2,200-line slide engine |
| `loader.js` | Dynamic JSON loader + search/filter |
| `presentations.js` | Catalog config (now → `lib/catalog.ts`) |
| `presentations/` | Source decks (now → `content/presentations/`) |
| `p/` | Pre-generated per-deck HTML pages |
| `src/` | Modular CSS + the 8 canvas animation modes |
| `style.css`, `theme-switcher.js`, `github-live.js` | Styling, theming, GitHub stats |
| `tools/` | `export-deck.js`, `generate-pages.js` build scripts |
| `templates/` | Sample presentation templates |
| `assets/` | Logo, fonts, README screenshots |
| `audit_*`, `migrate_*`, `tf_*`, `write_*` | One-off content audit + migration scripts |

## Running it

No build needed — open `index.html` in a browser, or serve the folder statically:

```bash
python -m http.server 8000   # then visit http://localhost:8000
```

## Why we migrated

The vanilla app worked, but `presenter.js` had grown past 2,200 lines, there were no
tests, and adding slide types meant editing one giant file. The Next.js rewrite gives
us typed schemas, per-slide React components, static export, and a real component model.
The deck JSON format is unchanged — every deck here renders in the new app.
