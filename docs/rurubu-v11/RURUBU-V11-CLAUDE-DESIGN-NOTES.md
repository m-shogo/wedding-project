# Rurubu WEDDING V11 — Claude Independent Design Notes

Status: IN_PROGRESS (P01 only, P02–P08 skeleton-only)
Scope: Rurubu WEDDING V11 only. Does not touch V9/V10 production or Movie work.
Branch: `claude/rurubu-v11` (isolated git worktree, does not share a working directory with any other session)
Figma: file `bfM0d4c9dCeBv5pCkJ3TNM`, new page `11_RURUBU_V11_CLAUDE_A5_8P_PRODUCTION` (id `2949:2`)

## What this run actually did (verified, not claimed)

1. Read live git state: no existing `rurubu-v11` branch, no PR collision (`main` has 1 open unrelated PR, #385, Movie work).
2. Read V10 canonical authority docs from `origin/design/rurubu-v10-ai-assist-system`
   (they do not exist on `main`): `rurubu-v10-ai-assist-manifest.json`,
   `rurubu-v10-design-tokens.json`, `RURUBU-V10-PAGE-RECIPES.md`.
3. Live-inspected the Figma file structure. Found the file does **not** match the
   handoff prompt's assumption of an existing V10 production page / reference nodes
   at the top level — instead `00_RURUBU_START_HERE` is a single sprawling canvas
   holding 340+ V5–V8 iteration frames (mostly hidden, comparison/rollback/rejected),
   and node `2621:111` (`V9 / REFERENCE / DRIVE GOAL + PARTS`) exists nested there.
   Did not attempt to fully map this canvas (cost-prohibitive: one `get_metadata`
   call on it alone returned 3M+ characters). Did not modify it.
4. Created a new isolated page `11_RURUBU_V11_CLAUDE_A5_8P_PRODUCTION` with 8
   placeholder A5 frames (793.7×1123px, matching the file's existing A5 px/mm
   convention), named `V11 / P01..P08 / <role>`.
5. Searched the organized Drive asset library (`01_LOGO_TITLE`, `02_PHOTO` folders).
   Found genuine `REAL_PHOTO_*` and verified-editorial `LOGO_COVER_*` assets already
   exist for the Hawaii/travel theme.
6. Built **P01 COVER** for real:
   - Downloaded and **visually inspected** `REAL_PHOTO_COVER_HAWAII_BEACH_COUPLE_FULLBODY_01.jpg`
     (Drive id `1QWhFJPWHhwF6tfShyYzWULMGc8YDm55P`) — confirmed it is a real photo of
     the actual couple in wedding attire on a Hawaii beach, not a placeholder.
   - Downloaded and inspected `LOGO_COVER_RURUBU_WEDDING_EDITORIAL_B.png`
     (Drive id `1CP9bcZj90LNZf0PH_dMfXXJ1vgElmque`) — confirmed transparent-background
     るるぶ WEDDING wordmark lockup with date.
   - Placed both via Figma's `upload_assets` (hero photo as full-bleed FILL fill on
     node `2950:2`; logo as FIT fill on node `2950:4`, preserving transparency/aspect).
   - Added a left-side readability scrim (gradient) plus a dedicated darker scrim
     block behind the coverline text for contrast, since the photo's sky/sea area
     alone did not reliably clear the token contract's readability bar.
   - Added `SHOGO & SHIORI` / `2026.10.24  YOKOHAMA` badge and 3 Japanese coverline
     hooks (known real facts from `docs/opening-authority.md` / project memory —
     not invented copy).
   - **Verified visually via `get_screenshot`, twice** (before/after the contrast fix).
     Screenshots downloaded and read locally; not merely called and assumed correct.

## What this run did NOT do

- P02–P08 are still bare placeholder frames (`placeholder=true`, a text label only).
  They are not at 60–80%. The "get all 8 pages to 60–80% first" rule was not met
  this run — P01 was taken further instead, to prove the real-asset pipeline
  (Drive search → download → visual verification → Figma upload → screenshot
  verification) end-to-end before repeating it 7 more times.
- No `RURUBU-V11-MISSING-ASSET-LIST.md` yet — too early; most pages have no content
  to judge missing assets against.
- No anti-AI linter was run against V11 (the V10 linter script lives on
  `origin/design/rurubu-v10-live-ai-look-linter`, not read or adapted this run).
- No PR opened yet.

## Asset decisions log

| Page | Asset | Drive ID | Role | Verified |
|---|---|---|---|---|
| P01 | `REAL_PHOTO_COVER_HAWAII_BEACH_COUPLE_FULLBODY_01.jpg` | `1QWhFJPWHhwF6tfShyYzWULMGc8YDm55P` | hero, full-bleed | Yes, viewed pixels |
| P01 | `LOGO_COVER_RURUBU_WEDDING_EDITORIAL_B.png` | `1CP9bcZj90LNZf0PH_dMfXXJ1vgElmque` | logo lockup | Yes, viewed pixels |

## Next task (exact)

1. Repeat the same pipeline for P02 (PROFILE): search `02_PHOTO` for
   `REAL_PHOTO_PROFILE_*` (two candidates already found:
   `REAL_PHOTO_PROFILE_HAWAII_COUPLE_KISS_01.jpg`,
   `REAL_PHOTO_PROFILE_HAWAII_COUPLE_SHAKA_02.jpg`), verify pixels, place, add
   profile facts (source: `docs/materials-todo.md` — currently mostly unfilled,
   so real names/date/theme only; do not invent biography copy).
2. Continue P03–P08 in the same order as the page map.
3. Only after all 8 reach ~60–80%: run/adapt the anti-AI linter, write the missing
   asset list, then consider a PR.
