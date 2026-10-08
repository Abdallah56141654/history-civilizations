# History & Civilizations

A multilingual digital encyclopedia of human history (EN, AR, DE, FR, ES, IT, ZH), built as a static Next.js site.
**Status: Phase 4 of 6** (timeline and map). See "Roadmap".

## Tech stack
Next.js 15 (App Router, static export) · TypeScript · Tailwind CSS 3 · no database or backend required yet.

## Installation
```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL (and NEXT_PUBLIC_BASE_PATH for GitHub project pages)
```

## Development
```bash
npm run dev        # http://localhost:3000  (redirects to your browser language)
npm run typecheck
```

## Build and deployment
```bash
npm run build      # outputs the static site to ./out
```
Deploy `./out` to GitHub Pages, Cloudflare Pages, Netlify or any static host.
For `https://user.github.io/repo` set `NEXT_PUBLIC_BASE_PATH=/repo` before building.

## Environment variables
| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Absolute site URL for canonical, hreflang, sitemap |
| `NEXT_PUBLIC_BASE_PATH` | Sub-path for GitHub project pages |

## Multilingual system
- URLs: `/en/…`, `/ar/…`, `/de/…`, `/fr/…`, `/es/…`, `/it/…`, `/zh/…`. Arabic renders with `dir="rtl"`.
- Root `/` picks a language client-side: saved choice (localStorage/cookie) → browser languages → English. IP is never used.
- Every page emits canonical + `hreflang` (including `x-default`).
- UI strings: `src/i18n/dictionaries/<lang>.json`. Content text lives per language inside each record, with English fallback and a visible "not translated" notice.
- **Add a language:** add it to `src/i18n/config.ts`, create its dictionary, register it in `get-dictionary.ts`, add names to the seed data.

## Content management
Content is data, not components: `src/data/civilizations.ts` (one object per civilization; `names` in all languages, `summary` per language, `keywords` for search synonyms).
Every record has `status: "draft" | "reviewed"`. Drafts are `noindex` and excluded from the sitemap until a human has verified them against sources.
Editorial workflow: research → draft → source verification → human review → publish. AI must not publish facts unverified.
Images: records carry source, creator, license, licenseUrl and attribution (`ImageRecord`). No image is shipped without a verified license.

## Data model (Phase 2)
`src/data/*.ts` holds civilizations, people, events, places, articles, sources, authors. Entities reference each other by id (`civIds`, `personIds`, `eventIds`, `placeIds`, `sourceIds`, `authorId`);
`src/lib/content.ts` resolves the relations, so a page links to everything related automatically. Add a record and its pages, cards, search entry and cross-links appear on the next build.
Seed: 6 civilizations, 10 people, 8 events, 8 places, 5 articles, 10 sources, 1 collective author ("Editorial team", no invented credentials).
All records are `draft`: noindex, excluded from the sitemap, with a visible notice. Source lists are recommended reading, not yet claim-by-claim verification.
Missing translations fall back to English with a visible notice (summaries exist in EN/AR for most records; articles in EN only).

## Search (Phase 3)
- **Index:** generated at build time, one file per language: `/<lang>/search-index.json` (route handler `src/app/[lang]/search-index.json/route.ts`, built by `src/lib/search-index.ts`). Every content type is one block in that builder; add a type there and it becomes searchable.
- **Loading:** fetched lazily the first time any search box is focused, then cached in memory. Pages that never use search never download it.
- **Matching:** Arabic/Latin normalization (diacritics, alef/ya/ta-marbuta variants), names in all 7 languages (so "كليوباترا" finds Cleopatra), keyword synonyms, one-typo tolerance.
- **Autocomplete:** accessible combobox (arrow keys, Enter, Escape, `aria-activedescendant`), top 6 suggestions with content type; empty focus shows recent searches (localStorage, clearable) and popular searches (`POPULAR` in `search-index.ts`).
- **Results page:** `/<lang>/search/?q=…&type=…&civ=…&period=…&region=…`. Filters: content type (with counts), civilization, period, region. Filter state lives in the URL, so results can be shared. Works without a query to browse by filters.
- **Not included:** a "language" filter (each page is already shown in the interface language; unavailable translations fall back to English with a notice).
- **Scaling note:** scoring runs in the browser, which is fine up to roughly 10,000 records. Beyond that, replace the index with Pagefind or a hosted search (Algolia/Meilisearch/Typesense) behind the same `SearchDoc` shape.

## Timeline and map (Phase 4)
- **Timeline** (`/<lang>/timeline/`): zoom in/out, pan earlier/later, jump to eras, civilizations as bars (stable lane packing, so thousands of records stay readable), events as dots. Every event is also in a list below, so nothing depends on pointer precision. Selecting an event opens a native `<dialog>` (focus trap, Esc to close) with date, summary, civilizations, people, places, related articles. Time axis is always left-to-right, also in Arabic.
  Eras are presets in `Timeline.tsx` (`PRESETS`). The seed data covers roughly 3500 BCE to 1700 CE; later eras show an "nothing yet" message. There is no Prehistory preset until content exists for it.
- **Map** (`/<lang>/map/`): Leaflet, filter by civilization, list and map are linked (select in either). The list is the keyboard/screen-reader path, since map markers are pointer-only. Points are `MapPoint` objects built in `map/page.tsx`; add events with coordinates, battles or cities as more entries (`kind`).
- **External service:** map tiles come from a provider at runtime. Default is the public OpenStreetMap tile server, which has a usage policy and is not meant for heavy traffic. Set `NEXT_PUBLIC_MAP_TILE_URL` and `NEXT_PUBLIC_MAP_ATTRIBUTION` to use another provider (e.g. a MapTiler or Stadia key). Historical borders are not drawn; that needs a GeoJSON dataset with a verified license.

## Timeline and map (Phase 4)
- **Timeline** (`/<lang>/timeline/`): zoomable axis (6 zoom levels, keeps the centered year), conventional era bands (Prehistory to Early Modern; boundaries vary between historians and the page says so), events placed by year with automatic lane layout, civilization spans, a civilization filter, and a native `<dialog>` with date, civilizations, people, places, related articles and a link to the full event page. All data comes from `src/data/*`; a new event appears automatically.
- **Map** (`/<lang>/map/`): Leaflet map with a civilization filter, a keyboard-accessible place list, and a detail panel. Places come from `src/data/places.ts` (`lat`/`lng`).
- **Base map tiles come from an external service.** The default is OpenStreetMap's public tile server (development and low traffic only). For production set `NEXT_PUBLIC_TILE_URL` and `NEXT_PUBLIC_TILE_ATTRIBUTION` to a tile provider. Tiles need an internet connection in the visitor's browser.
- **Not included:** historical borders. The map shows modern geography. Adding borders needs a verified GeoJSON dataset per civilization and period; the place model is ready for an overlay layer.
- Battles do not have their own coordinates yet; they are reached through the places they link to.

## Quizzes, comparisons, On This Day (Phase 5a)
- **Quizzes** (`/<lang>/quizzes/…`, data in `src/data/quizzes.ts`): one question at a time, review at the end with score, correct and wrong answers, per-question explanation, and retake. Ancient Egypt has 10 questions (EN/AR); Roman Empire has 5 (EN only, shown with a notice). A quiz is always shown in one language. If a language is incomplete the whole quiz falls back to English. Quizzes are `draft` until a person has verified every answer.
- **Comparison** (`/<lang>/compare/?a=…&b=…`): any two civilizations from `src/data/profiles.ts`, rows for period, region, geography, government, religion, writing, architecture and economy. Descriptive, never ranked. Military, science and culture rows are not included yet. Text is English only for now (notice shown).
- **On This Day** (`/<lang>/on-this-day/`): purely data-driven. An event appears only when it has a documented `monthDay` (5 events today). "Today" is read from the visitor's local date in the browser; a date picker is included; when a date has no entry the next dates in the dataset are shown. Ancient dates are Julian and the page says so. Nothing is generated.

## Mysteries, archaeology, technology, family trees (Phase 5b)
- **Mysteries** (`src/data/mysteries.ts`): every entry has six fixed sections: what we know, evidence, what we don't know, historical theories, arguments, uncertainty. Theories are written as theories. Seed: Atlantis, Voynich Manuscript, Lost Colony of Roanoke, Tomb of Cleopatra. Section text is English with a notice in other languages.
- **Archaeology** (`/archaeology/`): a hub over the existing places (sites) and new **artifacts** (`src/data/artifacts.ts`: Rosetta Stone, Cyrus Cylinder, Antikythera Mechanism, each with its holding institution). Other object types from the original brief (coins, weapons, jewelry, mummies, manuscripts) can be added as artifact records.
- **Ancient technology** (`src/data/technologies.ts`): Roman concrete, qanats, papyrus, Roman aqueducts, grouped by field.
- **Family trees** (`src/data/trees.ts`): a static, data-driven diagram (nodes with generation and column, parent links, spouse and partner links) plus the same relationships as text for screen readers. People who have a page are links. Seed: Cleopatra VII and her family. Only well-attested relationships are drawn; uncertain points (Caesarion's paternity, a formal marriage to Mark Antony, the siblings' mothers) are stated in the notes instead of being hidden. Ptolemaic dynasty, Roman emperors and pharaoh lists would be further tree records.
- All new records are searchable (types: mystery, artifact, technology) and linked from their civilization pages. All are `draft`.

## First run (important)
This project was written without the ability to run `npm install` or `next build`. Nothing has been built or tested in a browser yet.
```bash
npm install
npm run validate     # content checks (works without Next)
npm run typecheck
npm run dev          # then click through every section in all 7 languages, light and dark
npm run build && npm run check:build
```
Expect to fix a few type or runtime issues on the first run. The two scripts below exist to catch most data and output problems automatically.

## Quality gates
- `npm run validate` (Node 22.6+, runs before every build): unique ids and slugs, every reference resolves, names in all 7 languages, English fallback text present, `reviewed` records must have sources, image records must carry licence data, quiz answers in range, coordinates and dates valid. Prints translation coverage per language. Errors stop the build.
- `npm run check:build` (after build): every page has title, description, canonical, 7 hreflang links + x-default, exactly one `<h1>`, `lang` on `<html>`, `dir="rtl"` for Arabic, no `<img>` without alt, no broken internal links, plus sitemap.xml, robots.txt and the search indexes. Tested against a synthetic export with planted defects.

## Legal, consent, analytics
- Pages: Contact, Authors, Sources (generated from the data, shows which pages cite each work), Privacy, Terms, Disclaimer, Cookies. Texts exist in English and Arabic and describe what the code actually does by default (no accounts, no forms, no analytics, preferences in local storage, one language cookie, map tiles from a third party).
- **They are templates, not legal advice.** Set `NEXT_PUBLIC_OPERATOR_NAME`, `NEXT_PUBLIC_CONTACT_EMAIL` (and optionally `NEXT_PUBLIC_OPERATOR_ADDRESS`) and have a lawyer review them for your jurisdiction. Until the operator is set, the pages show a visible placeholder notice.
- **Analytics:** off by default. Set `NEXT_PUBLIC_GA_ID` and a consent banner appears (equal Accept and Decline buttons); Google's script loads only after Accept; a "Cookie settings" link appears in the footer. Search Console: set `NEXT_PUBLIC_GSC_VERIFICATION`.
- **Ads:** `AdSlot` reserves layout and renders nothing unless `NEXT_PUBLIC_ADS_ENABLED=true`. Do not enable ads before updating the consent banner and the legal pages.

## Structured data
WebSite (with search action) and Organization on the home page; BreadcrumbList on all detail pages; Person, Place and Article on their pages. Not used on purpose: Event (schema.org needs machine-readable start dates and most events here are BCE or approximate), ImageObject (no images yet), FAQPage (no real FAQ content).

## Accessibility
Colour tokens were checked against WCAG: all text pairs pass AA (4.5:1) in light and dark. Borders of interactive controls use a separate `--control` token that meets 3:1. Skip link, semantic landmarks, keyboard-operable menus, combobox and dialogs, `prefers-reduced-motion`, visible focus. Still to do by a person: a screen-reader pass (NVDA/VoiceOver) and an automated audit (axe or Lighthouse) on the built site.

## Deployment (GitHub Pages)
`.github/workflows/deploy.yml` validates, builds, checks and deploys `out/`. In the repository settings choose Pages > Source: GitHub Actions and add repository variables `SITE_URL`, `BASE_PATH` (e.g. `/repo-name`, empty for a user site) and optionally the operator/analytics variables. `public/.nojekyll` is required for the `_next` folder; `public/404.html` is the fallback page (set its `BASE` if you use a sub-path).

## Admin
A browser-based admin is **not included**, because the content lives in TypeScript data files and a static host has no server. Options, in order of effort: (1) edit `src/data/*` and rely on `npm run validate`; (2) migrate the data to JSON/Markdown and add Decap CMS (git-based, free, needs an OAuth proxy for GitHub login); (3) a headless CMS or Supabase with a build-time export. Say which and it can be done as a next phase.

## Known gaps
- Translations: most text exists in English and Arabic only (German partly). The other languages show English with a notice. Real translation by people is needed. `npm run validate` prints the coverage.
- Every record is a draft. Nothing is marked reviewed, and no image is included.
- Military, science and culture comparison rows; historical borders on the map; most categories from the original brief (hundreds of civilizations, thousands of articles) are future content work, not code work.
- Categories index page and per-tag pages are not built (tags exist as search keywords).

