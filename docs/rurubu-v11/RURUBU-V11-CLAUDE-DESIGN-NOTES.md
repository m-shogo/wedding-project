# Rurubu WEDDING V11 — Claude Independent Design Notes

Status: IN_PROGRESS (P01/P02/P06 partially built, P03/P04/P05/P07/P08 skeleton-only)
Scope: Rurubu WEDDING V11 only. Does not touch V9/V10 production or Movie work.
Branch: `claude/rurubu-v11` (isolated git worktree, does not share a working directory with any other session)
Figma: file `bfM0d4c9dCeBv5pCkJ3TNM`, new page `11_RURUBU_V11_CLAUDE_A5_8P_PRODUCTION` (id `2949:2`)

## Correction — V10 was located; V11 geometry was wrong and has been fixed

Earlier in this run, V10 was believed unreachable (reference nodes `2621:111` /
`2771:2-4` resolved but rendered blank). The user obtained the exact live location
from the V10-side session:

- Page: `09_RURUBU_V10_A5_8P_PRODUCTION` (node `2787:2`)
- P01–P08: `2787:3` .. `2787:49`
- Visual reference boards (actual quality floor — real published Rurubu magazine
  cover mockups): `2787:55`, `2787:56`, `2787:57` (the `2621`/`2771` ids from the
  original handoff prompt were stale)

Reading V10 live surfaced a real production-correctness bug in this run's own
work: **V11's 8 page frames were built at the wrong scale**, copying an old,
non-standard px/mm convention (793.7×1123px, no bleed) used by abandoned V5–V9
experiments elsewhere in the same file, instead of V10's actual print-correct
geometry (verified live from `2787:3`):

```
outer bleed frame:  582.0472 × 816.3779 px  (154 × 216mm = 148×210mm +3mm bleed/side)
TRIM (clipped):      559.3701 × 793.7008 px (148 × 210mm), inset 11.3386px (3mm)
GUIDE / SAFE 6mm:     514.0157 × 748.3464 px, inset 22.6772px (6mm), non-print
```

This has been corrected: all 8 V11 frames were resized to the bleed dimensions,
each now contains a `TRIM / A5 148x210mm / CLIP CONTENT` child frame
(`clipsContent = true`) plus a dashed `GUIDE / SAFE 6mm / NON-PRINT` rectangle,
matching V10's real convention exactly (same trim px values). The 3 pages that
already had content (P01, P02, P06) were rebuilt inside the new TRIM frames at
scale factor `k = 559.3701 / 793.7 ≈ 0.70476`, preserving the same composition
ratios, then re-verified with fresh screenshots. No content was rescaled by eye —
every position/size was multiplied by `k` in code.

## Lesson pulled from reading live V10 (not copied geometry)

- V10 P01 (cover) is currently a rough PASS2 skeleton (gray placeholder blocks,
  no real photo yet) — less finished than this run's P01.
- V10 P02 (profile) already places a real couple photo, but uses **two visually
  identical bordered rectangles** for SHOGO/SHIORI fact boxes — which is exactly
  the anti-pattern the page recipe itself warns against ("two identical profile
  cards that feel like employee profiles"). This confirms the asymmetric
  bride/groom portrait treatment already used in this run's P02 (different sizes,
  overlapping real-photo accent, no matching boxes) is the better-aligned choice —
  independently arrived at, not copied from V10.
- V10's reference boards are real, published Rurubu travel-guide covers (dense
  info, numbered spot badges, colorful sectioned coverlines) — legitimate
  editorial-DNA reference, not fabricated content.

## What this run actually did (verified, not claimed)

1. Read live git state: no existing `rurubu-v11` branch, no PR collision (`main`
   has 1 open unrelated PR, #385, Movie work).
2. Read V10 canonical authority docs from `origin/design/rurubu-v10-ai-assist-system`
   (they do not exist on `main`): `rurubu-v10-ai-assist-manifest.json`,
   `rurubu-v10-design-tokens.json`, `RURUBU-V10-PAGE-RECIPES.md`.
3. Located and read live V10 production (`09_RURUBU_V10_A5_8P_PRODUCTION`,
   `2787:2`) after the reference nodes in the original handoff turned out stale.
4. Created page `11_RURUBU_V11_CLAUDE_A5_8P_PRODUCTION` with 8 frames, later
   corrected to real A5+bleed+trim+safe-area geometry (see above).
5. Searched the organized Drive asset library (`01_LOGO_TITLE`, `02_PHOTO` folders).
6. Built **P01 COVER**: real hero photo + real logo lockup, readability scrims,
   `SHOGO & SHIORI` / `2026.10.24 YOKOHAMA` badge, 3 Japanese coverline hooks
   (real known facts, not invented). Verified via screenshot before and after
   the geometry fix.
7. Built **P02 PROFILE**: asymmetric bride/groom DUMMY-proxy portraits (different
   scale, explicitly named `_DUMMY_PROXY_REPLACEABLE`) + a real couple photo as a
   rotated "pinned photo" accent breaking the symmetry, BRIDE/GROOM labels,
   minimal honest facts (no invented biography). Verified via screenshot.
8. Built **P06 MEMORY SPOTS + GALLERY** (hero only): a `GENERATED_` Diamond Head
   beach photo as full-width hero with title/kicker. Rejected two other
   candidate assets after visual QA (see below) and left satellite spots as an
   explicit TODO note rather than filling with disqualified assets.

## What this run did NOT do

- P03/P04/P05/P07/P08 are still bare placeholder frames. The "get all 8 pages to
  60–80% first" rule was not met — depth was prioritized over breadth to prove
  the real-asset pipeline (Drive search → download → visual QA → Figma upload →
  screenshot verification) end-to-end, and then to catch/fix the geometry bug,
  before repeating across all pages.
- No `RURUBU-V11-MISSING-ASSET-LIST.md` yet — too early.
- No anti-AI linter was run against V11 (the V10 linter script lives on
  `origin/design/rurubu-v10-live-ai-look-linter`, not read or adapted this run).
- No PR opened yet.

## Asset decisions log

| Page | Asset | Drive ID | Role | Verified |
|---|---|---|---|---|
| P01 | `REAL_PHOTO_COVER_HAWAII_BEACH_COUPLE_FULLBODY_01.jpg` | `1QWhFJPWHhwF6tfShyYzWULMGc8YDm55P` | hero, full-bleed | Yes, viewed pixels |
| P01 | `LOGO_COVER_RURUBU_WEDDING_EDITORIAL_B.png` | `1CP9bcZj90LNZf0PH_dMfXXJ1vgElmque` | logo lockup | Yes, viewed pixels |
| P02 | `DUMMY_PHOTO_PROFILE_BRIDE_HAWAII_WAIKIKI_VERTICAL_V2.png` | `1QTCvRN0s_acCgV309tbVQ2gdMc_R2oLh` | bride portrait, proxy (not the real couple — clearly marked, replaceable) | Yes, viewed pixels |
| P02 | `DUMMY_PHOTO_PROFILE_GROOM_HAWAII_WAIKIKI_VERTICAL_V2.png` | `16YRDpGgR36y9GnOPn9gwXQlsXTIxwoz4` | groom portrait, proxy | Yes, viewed pixels |
| P02 | `REAL_PHOTO_PROFILE_HAWAII_COUPLE_KISS_01.jpg` | `1sIghnrqtfs0WxwBiVdmsZopsQ29tIpiw` | real-photo accent | Yes, viewed pixels |
| P06 | `GENERATED_PHOTO_MEMORY_HAWAII_BEACH_DIAMOND_HEAD_WIDE.png` | `1zZHSwSlIKLe_DxcNdj2fmx3PfTJM2-Sm` | hero destination photo | Yes, viewed pixels |

### Rejected after visual QA (recorded, not silently skipped)

| Asset | Drive ID | Reason |
|---|---|---|
| `GENERATED_PHOTO_MEMORY_TROPICAL_RESORT_STREET_SUNSET_WIDE.png` | `1MgSdCgEJQ7oG-Cyia0zeA-kafvWlIKI2` | Generic/unreal fantasy-resort look, reads as AI-generated stock art — anti-AI gate concern, not a specific real destination |
| `PHOTO_CUTOUT_GLOBAL_WAIKIKI_STREET_TROPICAL_01.png` | `1lHKSDrzVRGHZ3-YP0HO5rd5vrp4JlXdm` | Multiple generated people (tourists) visible in the image — avoided per project-wide caution against AI-generated people |

## Next task (exact)

1. Continue P03 (Q&A), P04 (STORY), P05 (TIMELINE+MEMORY), P07 (1DAY+CAFE),
   P08 (BACK COVER) in page-map order, using the same corrected TRIM geometry
   (`k = trim.width / 793.7` scaling is no longer needed once building fresh —
   just use `trim.width`/`trim.height` directly for new pages).
2. For Q&A/Story content requiring real answers/episodes: do not invent copy.
   Mark unanswered slots as native editable placeholder text, not fabricated
   biography — `docs/materials-todo.md` is still mostly unfilled for this couple.
3. Only after all 8 reach ~60–80%: run/adapt the anti-AI linter, write the
   missing asset list, then consider a PR.
