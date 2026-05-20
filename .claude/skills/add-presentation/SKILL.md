---
name: add-presentation
description: Create a new presentation (or add a topic to an existing one) in this Bude Global Tech Presentations project. Use whenever the user says "add a new presentation", "create a new deck", "add a new topic", "make a presentation about X", or pastes an outline they want turned into slides. Handles the JSON file under bude-presentations-next/content/presentations/, the catalog entry in lib/catalog.ts, and the validation step.
---

# Add a presentation (or topic) to this project

This skill walks you through adding new content to the Next.js presentation platform that lives under `bude-presentations-next/`. The user's term **"topic"** usually means a whole new presentation; check what they mean before assuming. Two flows:

- **New presentation** (most common): create a new JSON file + catalog entry.
- **Add topic(s) to existing presentation**: edit one JSON file under `content/presentations/`.

Reference example for the JSON shape: [bude-presentations-next/content/presentations/advanced-slides.json](../../../bude-presentations-next/content/presentations/advanced-slides.json) — it uses every supported slide type.

---

## Flow A — New presentation (default)

### 1. Gather requirements with AskUserQuestion

Ask for whatever the user hasn't already given. Don't ask if it's obvious from context.

| Field | Required | Notes |
|---|---|---|
| Topic / title | yes | e.g. "Introduction to Kubernetes" |
| Slug | no — derive from title | kebab-case, e.g. `intro-kubernetes` |
| Description | yes | one sentence |
| Difficulty | yes | `beginner` \| `intermediate` \| `advanced` |
| Primary category | yes | see list below |
| Extra categories | no | array, e.g. `["frontend", "tools"]` |
| Keywords | yes | 5–10 search terms |
| Outline | yes | section titles + brief intent |

**Valid categories** (use existing ones; they're already wired into icons + colors):
`programming` · `frontend` · `backend` · `database` · `devops` · `cloud` · `ai-data` · `tools` · `security` · `mobile` · `app-development` · `cross-platform` · `web-development` · `business` · `enterprise` · `games` · `movie`

If a brand-new category is genuinely needed, add an entry to [bude-presentations-next/lib/category-meta.ts](../../../bude-presentations-next/lib/category-meta.ts) with an icon + hue.

### 2. Build the slide list

A polished deck follows this rough sequence — riff on it, don't follow it slavishly:

1. `title` — big title + subtitle
2. `presenter` — author card (default: Aravind Govindhasamy, see other files for fields)
3. `content` agenda — list of what we'll cover
4. For each major section:
   - `topic-title` — section divider
   - 3–8 `content` / `comparison` / `code` / `quiz` slides
5. `qa` — questions slide
6. `thank-you` — closing

Aim for 40–80 slides total for a "complete" deck, 15–30 for a focused talk.

### 3. Write the JSON

Path: `bude-presentations-next/content/presentations/<slug>.json`

Skeleton:

```json
{
  "presentation": {
    "topics": [
      {
        "id": "title",
        "title": "Title",
        "slides": [
          { "type": "title", "title": "...", "subtitle": "..." }
        ]
      },
      { "id": "...", "title": "...", "slides": [ /* ... */ ] }
    ]
  }
}
```

**Slide-type quick reference** — full examples below if needed.

| Type | Required fields | Notes |
|---|---|---|
| `title` | `title` | + optional `subtitle`, `backgroundImage` |
| `presenter` | `name` | + `title`, `experience`, `github`, `website`, `linkedin`, `twitter` |
| `topic-title` | `title` | + `subtitle`, `emoji` |
| `content` | `title` | + `emoji`, `box: { title, content (HTML), list, code }` |
| `comparison` | `title`, `leftTitle`, `leftPoints`, `rightTitle`, `rightPoints` | + optional `note.text` |
| `imageText` | `title`, `image`, `content` | `layout`: `"left-image"` \| `"right-image"`, + `imageAlt`, `caption` |
| `quiz` | `question`, `options[]`, `correctAnswer` (index) | + `explanation` |
| `chart` | `title`, `chartType`, `data[]` | `chartType`: `bar` \| `line` \| `pie` |
| `video` | `title`, `videoUrl` | + `caption`, `note.text` |
| `diagram` | `title`, `content` | ASCII art is fine (multi-line strings allowed) |
| `qa` | — | optional `title` (default "Questions?") |
| `thank-you` | — | optional `title`, `message` |

**Lists inside `box.list`** can be either strings or `{ emoji, text }` objects. The `text` field supports inline HTML: `<strong>`, `<em>`, `<code>`, `<a>`, `<br>`. Block tags get stripped by DOMPurify.

**Code blocks** can use double-quoted JSON strings with escaped newlines OR JS template literals (the parser at [bude-presentations-next/lib/parse-presentation.ts](../../../bude-presentations-next/lib/parse-presentation.ts) handles both). When in doubt, use double quotes.

### 4. Register in the catalog

Open [bude-presentations-next/lib/catalog.ts](../../../bude-presentations-next/lib/catalog.ts) and add a new entry to the `ENTRIES` array in the **right thematic block** (look at the `// ============= XYZ =============` comments). The shape is:

```ts
{
  file: "<slug>.json",
  title: "Same as the slide title — this is what shows on the home card",
  description: "One-line description shown on the card",
  keywords: ["...", "..."],
  category: ["primary-category", "optional-secondary"],
  difficulty: "beginner" | "intermediate" | "advanced",
},
```

The `slug` field is auto-derived from `file` — don't set it manually.

### 5. Validate

Run from the project's `bude-presentations-next` directory:

```bash
npm run validate-content
```

Look for `✓ <slug>` in the output. If you see `✗`, read the Zod issue path and fix the field.

### 6. Verify visually

The dev server picks up new JSON files instantly. If it's not running, start it:

```bash
npm run dev
```

Then open `http://localhost:3000/p/<slug>/` (overview) and click "Start presentation" to step through the deck.

---

## Flow B — Add topic(s) to an existing presentation

1. Confirm with the user **which file**: `bude-presentations-next/content/presentations/<slug>.json`
2. Read the file to see the current `topics[]` shape and house style.
3. Insert the new topic object(s) into the `topics` array at the position the user wants. Default: append before the trailing `qa` / `thank-you` topics.
4. Run `npm run validate-content` and report.
5. No catalog change is needed — the file is already registered.

---

## Slide examples (copy-paste-ready)

### Title slide
```json
{
  "type": "title",
  "title": "Mastering Kubernetes",
  "subtitle": "From pods to production"
}
```

### Presenter slide
```json
{
  "type": "presenter",
  "name": "Aravind Govindhasamy",
  "title": "Software Developer",
  "experience": "3 years in .NET, Python, IoT & RFID",
  "github": "https://github.com/aravind-govindhasamy",
  "website": "https://aravind-govindhasamy.github.io"
}
```

### Topic-title slide
```json
{
  "type": "topic-title",
  "title": "Pods & Deployments",
  "subtitle": "The building blocks of Kubernetes",
  "emoji": "🚀"
}
```

### Content slide with list
```json
{
  "type": "content",
  "emoji": "⚛️",
  "title": "What is React?",
  "box": {
    "title": "Why developers reach for it",
    "list": [
      { "emoji": "🧩", "text": "<strong>Component model</strong> — reusable UI pieces" },
      { "emoji": "⚡", "text": "Virtual DOM diffing is fast" },
      { "emoji": "🌐", "text": "Massive ecosystem & job market" }
    ]
  }
}
```

### Content slide with code
```json
{
  "type": "content",
  "title": "A minimal component",
  "box": {
    "code": "function Hello({ name }) {\n  return <h1>Hi, {name}!</h1>;\n}",
    "language": "tsx"
  }
}
```

### Comparison slide
```json
{
  "type": "comparison",
  "title": "REST vs GraphQL",
  "leftTitle": "REST",
  "leftPoints": [
    "📦 Resource-oriented endpoints",
    "💾 HTTP caching out of the box",
    "🌳 Mature tooling & ubiquitous"
  ],
  "rightTitle": "GraphQL",
  "rightPoints": [
    "🎯 Client picks exactly what it needs",
    "🔁 One endpoint, many shapes",
    "🧪 Strong type system & introspection"
  ],
  "note": { "text": "Most teams ship both eventually." }
}
```

### Quiz slide
```json
{
  "type": "quiz",
  "question": "What does CIDR stand for?",
  "options": [
    "Classless Inter-Domain Routing",
    "Class Internet Domain Range",
    "Common IP Datagram Router",
    "Cluster IP Domain Resolver"
  ],
  "correctAnswer": 0,
  "explanation": "Classless Inter-Domain Routing — the modern replacement for the rigid Class A/B/C system."
}
```

### Diagram slide
```json
{
  "type": "diagram",
  "title": "Three-tier architecture",
  "content": "Browser → API gateway → Service mesh → Database",
  "note": { "text": "Each layer scales independently." }
}
```

### Q&A and Thank-you
```json
{ "type": "qa", "title": "Questions?" }
```
```json
{ "type": "thank-you", "title": "Thanks!", "message": "Slides & code on GitHub" }
```

---

## Renderer status — what looks polished today

The site is mid-build. Here's what renders with a dedicated React component today vs falls back to a generic card:

**Dedicated polished renderers** (Phase 5 done): `title`, `presenter`, `topic-title`, `content`, `qa`, `thank-you`

**Generic fallback** (Phase 6 will give them dedicated components): `quiz`, `chart`, `comparison`, `imageText`, `video`, `diagram`, `code`, `matrix`, `timeline`, plus ~20 other long-tail types

The generic fallback works — it pulls out title, subtitle, lists, content, code blocks, and any array fields. It's not as pretty as a bespoke component but the content is fully readable. If the user is adding heavy `comparison` / `quiz` / `chart` content right now, mention this so they're not surprised.

---

## Common gotchas

- **Don't put block HTML in `content` strings** (no `<div>`, `<table>`, `<section>`). Only inline tags survive sanitization.
- **Backticks in inline string content** (markdown-style ``code``) are fine — the parser anchors only on `"key":` value positions.
- **Multi-line strings**: JSON requires `\n`, but our parser also accepts JS template literals (backticks) in value position. Either works.
- **The `slides` array must have at least one entry per topic** (Zod enforces `.min(1)`).
- **Slide type is free-form** — anything beyond the documented list falls through to the generic renderer. Prefer documented types unless you really need something new.
- **Catalog order** doesn't affect display order (cards group by category), but keep the thematic blocks tidy for diffs.
