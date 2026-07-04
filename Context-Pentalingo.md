# Pentalingo — Project Reference

## What is this?

Pentalingo is a language-learning web app (inspired by Duolingo) where users can learn **4 languages** (Dutch, Spanish, English, German) through spaced-repetition flashcards, an article checker, and a synonym lookup — all backed by curated dictionaries with a live Wiktionary fallback for words outside them. Built with React + TypeScript + Vite + Tailwind CSS v4.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 + TypeScript | UI and type safety |
| Vite | Dev server and bundler |
| Tailwind CSS v4 (`@tailwindcss/vite`) | Styling via utility classes |
| React Router v6 | Client-side routing |

---

## Folder Structure

```
src/
├── components/
│   ├── ui/                  # Reusable primitives
│   │   ├── Button.tsx       # Primary/secondary/danger/ghost variants with Duolingo-style border-b-4 shadow
│   │   ├── Card.tsx         # White card with thick bottom border accent; accepts optional `accent` color
│   │   ├── ProgressBar.tsx  # Filled bar with configurable color and optional % label
│   │   └── Badge.tsx        # Pill badge in green/orange/blue/red/purple/yellow
│   └── layout/
│       ├── Header.tsx       # Sticky top nav with logo, nav links, streak 🔥 and XP ⚡ display; nav scrolls horizontally with fade cues on mobile
│       └── Layout.tsx       # Wraps all pages; Header + max-w-4xl centered main content
├── pages/
│   ├── HomePage.tsx         # Landing: hero tagline, language picker grid, 3 feature cards
│   ├── DashboardPage.tsx    # Stats (streak, XP, level), daily goal progress, continue-to-flashcards CTA, language overview
│   ├── FlashcardsPage.tsx   # 5 random flippable cards at a time; flipping = reviewed (green + XP); add-a-word via Wiktionary
│   ├── ArticlesPage.tsx     # Article checker: type a noun → see correct article, gender color-coded
│   └── SynonymsPage.tsx     # Type a word → see synonyms, sourced from curated dict or Wiktionary
├── context/
│   └── AppContext.tsx       # Global state: UserProgress, selectedLanguage; exposes addXp
├── data/
│   ├── languages.ts         # LANGUAGES[], FLASHCARDS[], getFlashcardPool(); re-exports NOUN_ARTICLES, SYNONYMS
│   ├── nounArticles.ts      # NOUN_ARTICLES[] — Dutch ~1000 nouns, others ~25 each
│   └── synonyms.ts          # SYNONYMS[] — 25 curated words per language
├── types/
│   └── index.ts             # Language, Flashcard, NounArticle, Synonym, UserProgress types
├── utils/
│   ├── wiktionary.ts            # fetchWiktionaryWikitext() — shared fetch/timeout/parse-page logic
│   ├── dutchGender.ts           # lookupDutchArticle() — de/het lookup for Articles
│   ├── wiktionarySynonyms.ts    # lookupWiktionarySynonyms() — synonym lookup for Synonyms
│   └── wiktionaryTranslation.ts # lookupWiktionaryTranslation() — gloss/translation lookup for Flashcards
├── hooks/                   # (empty — add custom hooks here)
├── App.tsx                  # BrowserRouter + AppProvider + Layout + Routes
├── main.tsx                 # React root mount
└── index.css                # Tailwind v4 @import + @theme design tokens
```

---

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Hero, language picker, feature highlights |
| `/dashboard` | DashboardPage | Streak, XP, level, daily goal, language progress |
| `/flashcards` | FlashcardsPage | 5-card grid pulled randomly from the combined dictionary pool |
| `/articles` | ArticlesPage | Type a noun to look up its correct article; gender color-coded |
| `/synonyms` | SynonymsPage | Type a word to look up synonyms |

Lessons and Quiz pages/routes/data existed in the original scaffold and were removed (unused placeholders) — see git history if that flow needs reviving.

---

## Design System

### Font
**Nunito** (Google Fonts) — rounded, friendly, high legibility. Weights used: 400, 600, 700, 800, 900.

### Color Palette (Duolingo-inspired)

| Name | Hex | Used for |
|------|-----|---------|
| Green | `#58CC02` | Primary CTA, correct answers, XP |
| Green dark | `#46A302` | Button border shadow, completed state |
| Green light | `#D7F5B1` | Correct answer backgrounds, badges |
| Orange | `#FF9600` | Streak, secondary accents |
| Blue | `#1CB0F6` | Secondary buttons, Dutch language |
| Red | `#FF4B4B` | Wrong answers, danger buttons |
| Purple | `#CE82FF` | Flashcards, Synonyms, Mandarin language |
| Yellow | `#FFD900` | XP display, level badge |
| Surface | `#F7F7F7` | Hover states, card backgrounds |
| Border | `#E5E5E5` | Card borders, dividers |
| Text | `#3C3C3C` | Primary text |
| Muted | `#777777` | Secondary text, labels |

Design tokens are defined in `src/index.css` under `@theme { }` and usable as Tailwind utilities (e.g. `bg-green`, `text-muted`). Direct hex values are also used inline where semantics are one-off.

### Visual Style
- **Cards**: white background, `border-2 border-[#E5E5E5] border-b-4`, `rounded-2xl` — the thick bottom border gives a 3D "lifted" feel
- **Buttons**: same thick-bottom-border pattern; pressing removes it (`active:border-b-0 active:translate-y-[2px]`) for a satisfying click
- **Rounded corners**: `rounded-2xl` (16px) everywhere for a friendly, approachable look
- **Bold text**: headings use `font-black` (900) for punchy hierarchy
- **Language accent colors**: each language has its own color used on card bottom borders and tab highlights

### Mobile Responsiveness
- **Header** (`src/components/layout/Header.tsx`): logo and streak/XP are `shrink-0` (pinned); the nav link row is the only flexible piece, wrapped in a `relative min-w-0` container so it can shrink and scroll independently instead of forcing the whole page wider than the viewport
- Nav scrolling uses `overflow-x-auto` with the scrollbar hidden (`[scrollbar-width:none] [&::-webkit-scrollbar]:hidden`); scroll-affordance fade gradients are rendered on whichever edge(s) still have off-screen content, tracked via `scrollLeft`/`scrollWidth` on scroll and resize
- `html, body { overflow-x: hidden }` in `src/index.css` is a safety net against any future element forcing page-wide horizontal scroll — the header bug that prompted this was exactly that: content wider than viewport with no fallback, so the whole page scrolled sideways instead of just the nav
- Text sizes/padding/gaps in the header step up at the `sm:` breakpoint (e.g. `text-xs sm:text-sm`, `px-2 sm:px-4`) to stay usable on narrow phones

---

## Languages

Defined in `src/data/languages.ts`.

| ID | Name | Flag | Color |
|----|------|------|-------|
| `nl` | Dutch   | 🇳🇱 | Blue `#1CB0F6` |
| `es` | Spanish | 🇪🇸 | Orange `#FF9600` |
| `en` | English | 🇬🇧 | Green `#58CC02` |
| `de` | German  | 🇩🇪 | Red `#FF4B4B` |

---

## Global State (AppContext)

`AppContext` holds:
- `progress: UserProgress` — streak, xp, level, dailyGoal, todayXp
- `selectedLanguage: Language` — the active language tab across all pages
- `setSelectedLanguage(lang)` — switch active language
- `addXp(amount)` — increment xp + todayXp

State is in-memory only (resets on refresh). Persistence (localStorage or backend) is not yet implemented.

---

## Wiktionary Integration

All three dictionary-backed features share `src/utils/wiktionary.ts`, whose `fetchWiktionaryWikitext(word)` hits the English Wiktionary API (`en.wiktionary.org/w/api.php?action=query&...`) and returns the raw wikitext for a page, or `null` on a missing page/network error/timeout (6s `AbortController`). Each feature has its own parser on top of that shared fetch:

| Util | Used by | Extracts |
|------|---------|----------|
| `dutchGender.ts` → `lookupDutchArticle()` | Articles (Dutch only) | `{{nl-noun\|X}}` template → `de`/`het` |
| `wiktionarySynonyms.ts` → `lookupWiktionarySynonyms()` | Synonyms (all 4 languages) | Inline `{{syn\|xx\|...}}` template (first sense found), falling back to an older-style `===Synonyms===` section |
| `wiktionaryTranslation.ts` → `lookupWiktionaryTranslation()` | Flashcards "add a word" (all 4 languages) | First numbered definition line (`# ...`) under the word's language section, cleaned of wikitext markup |

Common pattern across all three:
- Isolate the correct language section first (`==Dutch==`, `==Spanish==`, etc.) so results aren't cross-contaminated between languages sharing a page
- 400ms debounce before firing the lookup from the UI
- Results cached permanently in `localStorage` (`pentalingo-dutch-gender`, `pentalingo-wiktionary-synonyms`, `pentalingo-wiktionary-translations`), including a cached "not found" sentinel so repeat misses don't re-hit the API
- Known limitation: parsing is page-level, not sense-level, so a word with multiple parts of speech can occasionally surface synonyms/glosses for the wrong sense (e.g. German "schnell" the adverb vs. adjective) when the primary sense lacks inline data

---

## Article Checker (`/articles`)

**File:** `src/pages/ArticlesPage.tsx`
**Data:** `src/data/nounArticles.ts` → exported as `NOUN_ARTICLES: NounArticle[]`

### NounArticle type (`src/types/index.ts`)
```ts
export type NounArticle = {
  id: string;
  languageId: string;
  noun: string;
  article: string;
  gender: 'masculine' | 'feminine' | 'neuter' | 'common' | 'indefinite';
  translation: string;
};
```

### Dictionary sizes
| Language | Count | Format |
|----------|-------|--------|
| Dutch (`nl`) | ~1000 nouns | Compact `makeEntries()` tuples |
| Spanish (`es`) | 25 nouns | Plain object array |
| English (`en`) | 20 nouns | Plain object array |
| German (`de`) | 25 nouns | Plain object array |

### `makeEntries()` helper
Both `nounArticles.ts` and `synonyms.ts` use a compact tuple format to avoid repetitive object boilerplate:
```ts
type Entry = readonly [string, string, NounArticle['gender'], string];
// makeEntries(languageId, idPrefix, entries) → NounArticle[]
const DUTCH_NOUNS = makeEntries('nl', 'nl', [
  ['hond', 'de', 'common', 'dog'],
  ['kind', 'het', 'neuter', 'child'],
  // ...~1000 entries
]);
```

### Gender color-coding
| Gender | Color | Used for |
|--------|-------|---------|
| `common` | Blue `#1CB0F6` | Dutch `de` words |
| `neuter` | Purple `#CE82FF` | Dutch `het` words |
| `masculine` | Blue `#1CB0F6` | Spanish/German masculine |
| `feminine` | Red `#FF4B4B` | Spanish/German feminine |
| `indefinite` | Green `#46A302` | English `a`/`an` |

### UI behavior
- **Curated match** (word in `NOUN_ARTICLES`): shows article + translation + gender badge instantly, no API call
- **Wiktionary match** (Dutch only, word not in curated list): shows article + gender badge + "via Wiktionary" note; lookup fires after 400ms debounce
- **Loading state**: "Looking up…" pulse shown while Wiktionary call is in flight (Dutch only)
- **Not found**: "check the spelling?" for Dutch (Wiktionary exhausted); "not in our dictionary yet" for other languages
- **Prefix suggestions**: up to 5 clickable matches from curated list while typing
- **Browse all**: full grid of all curated nouns for the selected language when input is empty
- **Language tabs**: synced with global `selectedLanguage` from AppContext; clears input on switch; Wiktionary lookup only runs for Dutch

---

## Synonyms (`/synonyms`)

**File:** `src/pages/SynonymsPage.tsx`
**Data:** `src/data/synonyms.ts` → exported as `SYNONYMS: Synonym[]`

### Synonym type (`src/types/index.ts`)
```ts
export type Synonym = {
  id: string;
  languageId: string;
  word: string;
  synonyms: string[];
  translation: string;
};
```

25 curated words per language (adjectives, verbs, common vocabulary), each with 2-4 synonyms and a translation. Same UX pattern as Articles: curated match shows instantly with clickable synonym chips (clicking one re-searches for it); words outside the curated list fall back to a debounced Wiktionary lookup via `lookupWiktionarySynonyms()`, shown with a "via Wiktionary · no translation in our dictionary" note since Wiktionary doesn't give us a translation, only synonyms. Works for all 4 languages (unlike the Dutch-only gender fallback in Articles).

---

## Flashcards (`/flashcards`)

**File:** `src/pages/FlashcardsPage.tsx`

### Deck construction
`getFlashcardPool(languageId)` in `src/data/languages.ts` merges three sources into one deduped pool (by lowercased front text):
- Curated `FLASHCARDS[]` (a handful of hand-written cards, e.g. greetings)
- Every `NOUN_ARTICLES` entry for that language, front rendered as `${article} ${noun}` so article practice is baked in
- Every `SYNONYMS` entry for that language

This gives Dutch **1000+** flashcards and the other languages **~50** each, versus the original 2-3 hardcoded cards.

### Session behavior
- On mount / language switch, a fresh random sample of **5 cards** (`SESSION_SIZE`) is drawn via Fisher-Yates shuffle and shown together as a grid — not one at a time
- Each card flips independently on click; flipping a card for the first time immediately marks it reviewed (turns green, "Reviewed" badge, +5 XP) — there's no separate Easy/Good/Hard rating step
- Once all cards in the session are reviewed, a "New words" button draws a fresh random 5
- **Add a word**: a search box below the grid lets you type any word in the selected language; if it's not already in the session, a 400ms-debounced Wiktionary lookup (`lookupWiktionaryTranslation()`) fires and shows a preview card with an "Add" button that appends it to the current session (session-only, not persisted to the dictionary files)

---

## Key Decisions & Conventions

- **Tailwind v4** is used via `@tailwindcss/vite` plugin — no `tailwind.config.js`, config lives in `@theme {}` in `index.css`
- **Named exports** for all components and pages (no default exports except `App`)
- **Dictionary data split**: `NOUN_ARTICLES` and `SYNONYMS` each live in their own file under `src/data/` (not `languages.ts`) to keep the main data file manageable; `languages.ts` re-exports both
- **Flashcards reuses other features' data** rather than maintaining its own large word list — `getFlashcardPool()` derives cards from `NOUN_ARTICLES` + `SYNONYMS`
- **Wiktionary fetch logic is shared** (`utils/wiktionary.ts`) across all three lookup features; only the wikitext-parsing logic differs per feature
- **No auth** — user is anonymous; progress is ephemeral for now
- **No backend** — all data is static until a backend is added

---

## Running the Project

```bash
npm run dev     # start dev server at http://localhost:5173
npm run build   # production build
npm run preview # preview production build
```

---

## Deployment

- **Hosting**: Vercel, free Hobby tier — live at **https://pentalingo.vercel.app**
- **Source**: GitHub repo `remerkle/pentalingo`, connected to Vercel's Git integration
- **Auto-deploy**: every push to `main` triggers a production deployment automatically (no manual `vercel deploy` needed going forward)
- **Vercel project**: `remerkle-9465s-projects/pentalingo` (project ID in `.vercel/project.json`, gitignored)
