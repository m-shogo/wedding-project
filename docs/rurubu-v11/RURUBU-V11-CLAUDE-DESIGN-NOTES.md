# Rurubu WEDDING V11 — Claude Independent Design Notes

Status: IN_PROGRESS (P01/P02/P03 built and de-AI-ified, P06 hero only, P04/P05/P07/P08 skeleton-only)
Scope: Rurubu WEDDING V11 only. Does not touch V9/V10 production or Movie work.
Branch: `claude/rurubu-v11` (isolated git worktree, does not share a working directory with any other session)
Figma: file `bfM0d4c9dCeBv5pCkJ3TNM`, new page `11_RURUBU_V11_CLAUDE_A5_8P_PRODUCTION` (id `2949:2`)

## Correction — the pages looked "AI-generated" (ダサい); root cause was typography, not decoration

The user flagged a lingering "AIっぽさ / ダサい" feel after the first pass and asked for
web/SNS research into the actual cause, explicitly warning against just adding more
generated sticker PNGs to compensate. Researched via WebSearch/WebFetch (see sources
below). Findings applied:

1. **`Inter` for every text node was itself the tell.** Multiple independent Japanese
   design-critique articles name Inter specifically as the most common "AI/SaaS
   default" font, chosen by AI tools because it's the most-downloaded Google Font, not
   because it fits the brief. It also has no native Japanese glyphs, so every JP
   character was silently falling back to *some* substitute glyph source — uncontrolled
   typography is itself a symptom.
   → Replaced **all** text across P01/P02/P03/P06 with an explicit, deliberate pairing:
   `Zen Maru Gothic Black/Bold` for display voice (titles, pill labels, numbers —
   rounded, warm, has real personality, distinctly not corporate-gothic),
   `Shippori Mincho SemiBold` for small kickers (a serif in a small dose reads as
   "edited", a classic magazine contrast trick), `Noto Sans JP Regular/Medium` for
   body copy. Confirmed live via `figma.listAvailableFontsAsync()`: 143 Japanese-capable
   font families are available in this environment — Inter was a lazy default, not a
   constraint.
2. **Everything was sized to the same "safe medium" weight** — the classic AI-design
   failure mode ("どこかを強調＝どこかを捨てる、をAIはしたがらない"). Fixed on P01's
   cover-line pills: two are now visibly larger/bolder (プロフィール, メモリースポット)
   and the rest quieter, with uneven vertical gaps (9/14/9/14/9px) instead of one
   constant gap — real hierarchy sacrifice instead of six equal rows.
3. **Pill widths were originally estimated by a character-count formula**, which broke
   under the new (wider) Japanese font and caused visible text-wrap/clipping bugs in two
   places (a pill's Japanese label wrapping outside its own background; P02's title and
   kicker overflowing the trim's right edge after being resized). Fixed by measuring
   real rendered width via a temporary `textAutoResize = 'WIDTH_AND_HEIGHT'` node before
   sizing the container, then re-clamping both kicker and title against `trim.width`
   explicitly. Both re-verified by screenshot after the fix, not assumed correct.
4. Deliberately did **not** add more decoration/sticker assets to chase this problem —
   per the user's explicit instruction that "AI can't really fix Figma decoration by
   adding more of it," this was purely a typography/hierarchy pass, no new Drive assets.

Sources consulted: [なぜAIのデザインは「それっぽいのにダサい」のか](https://note.com/ai_arai_ally/n/n93c360efff9c), [AIでデザインを作る人がやりがちな失敗7選](https://note.com/m_aicreator04/n/n987ed1514d4e), [AIっぽいデザインを脱却する方法完全ガイド2026](https://nextage-tech.com/blog/2026/06/08/post-7030/).

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

## All 8 pages now have real structure (asset-first 60-80% pass)

Built P04 (STORY), P05 (TIMELINE + MEMORY), P07 (1DAY + CAFE), P08 (BACK COVER) from
scratch with the corrected font system applied from the start (no Inter used at all
this pass). P06's satellite spots remain an open TODO (Okinawa/Seoul candidate assets
were rejected on QA, documented above).

Honesty notes for this pass:
- P04's flow milestones (出会い/交際スタート/プロポーズ/入籍) show `20XX.XX` — these
  specific dates appeared in the user-provided "ideal" reference image, but that image
  is an AI-generated concept mockup with garbled text elsewhere (`Wedding Journing`,
  `Shago & Bhiori`), so its dates were **not** treated as confirmed fact. Only
  `2026.10.24`(結婚式) is used, since that date is corroborated by
  `docs/opening-authority.md` project-wide. The other four are native, clearly
  lower-contrast placeholder text awaiting real input.
- P05: Okinawa and Seoul destination photo slots are explicitly rendered as light-gray
  boxes labeled "実写真未投入" (real photo not yet supplied) rather than filled with
  a substitute — only the Hawaii slot has a real photo, since that's the only
  destination with a verified real couple photo in the Drive library so far.
- P07's schedule times are explicitly labeled "一般的な進行の目安です" (a general/
  typical flow, not a confirmed final timing for this specific wedding) — the venue
  name `ART GRACE PORTSIDE VILLA, YOKOHAMA` is reused because it already appears
  consistently across V10's own asset filenames/pages, not invented fresh here.
- P08's guest-message area is genuinely empty (ruled lines only) — no placeholder
  prose was written in as if it were the couple's actual message.

Next: user-requested final polish pass across all 8 pages (typography/hierarchy
consistency check, P06 satellite resolution once real Okinawa/Seoul photos exist).

## Final QA pass — programmatic overflow/safe-area audit across all 8 pages

Ran three systematic checks via `use_figma` (not eyeballing screenshots alone):

1. **Inter leftover check** — queried every TEXT node's `getRangeAllFontNames()`
   across all 8 pages. Result: 0 nodes still using Inter.
2. **Trim overflow check** — every node's bounding box vs its page's trim edges.
   Found 3: one intentional 8px top-bleed on P01's floral corner (left as-is, it's
   a deliberate corner ornament), and two real bugs on P04 — a pinned photo accent
   whose frame extended ~36px past the trim's bottom edge (would have been hard-
   clipped by `clipsContent`, an unintentional crop). Root cause: the milestone
   flow row and the photo accent were positioned independently without checking
   total vertical budget against the trim height. Fixed by rebuilding P04's lower
   section with computed layout (`availableH = SAFE_BOTTOM - milestoneRowBottom`,
   photo sized to fit exactly) instead of guessed fixed coordinates. Re-verified:
   all 5 flow milestones now visible with no overlap, photo fits inside the safe
   area, re-uploaded and re-screenshotted.
3. **Safe-area (6mm) check** — while building this check, found a bug in this
   run's own safe-area guide: `safeGuide.x/y` had been set to
   `SAFE_INSET - TRIM_INSET` (11.34px) instead of `SAFE_INSET` (22.68px), because
   the live V10 XML's guide-rect coordinate was misread as bleed-frame-relative
   when it is actually trim-frame-relative. The guide is non-printing so no real
   content was affected, but it made the first audit pass produce false positives.
   Fixed the guide position on all 8 pages, then re-ran the check: 1 genuine
   violation found (P02's kicker text 13px past the safe right edge and touching
   the safe top edge) — nudged both the kicker and title left-aligned to a shared
   margin that clears the safe area, re-verified by screenshot.

All 8 pages are now overflow-clean and safe-area-clean (except the one intentional
decorative bleed), on top of the earlier font migration and hierarchy work.

## Density pass — the four quiet pages felt too calm for "るるぶ感"

User asked directly whether the pages actually read as Rurubu yet. Honest answer given:
partially — color/typography closed the gap, but P03/P05/P07/P08 had almost no
decorative touches while P01/P02 had several, an inconsistent density rhythm.
Also flagged as still-open: P05 Okinawa/Seoul photos, P03/P08 empty answer/message
areas, no side-by-side comparison vs the reference or V10, no Missing Asset List,
no PR yet.

Added one small, purposeful decorative accent to each of the four quiet pages —
reused already-QA'd Drive assets, no new generation, no per-page saturation:
- P03: floral corner bottom-right (balances the photo pinned top-right)
- P05: route/plane icon near the title (reinforces the travel-memory theme)
- P07: sparkle accent beside the schedule title
- P08: floral corner top-right, echoing P01's cover treatment as a bookend

Deliberately did not add decoration to every remaining empty area — the goal was a
consistent *rhythm* of one accent per quiet page, not maximum density everywhere.

## Asset density pass — "use a lot more material" per explicit user request

User asked to push magazine/Rurubu density further using more real assets, and to
measure the actual gap against the reference image and V10. Added:

- P06: added a second real photo (`PHOTO_CUTOUT_GLOBAL_HAWAII_RESORT_POOL_DIAMOND_HEAD_01`,
  verified people-free at a glance — only tiny distant background swimmers, same
  convention as ordinary resort photography) as a "MEMORY SPOT 02" satellite, turning
  the page into an actual HERO+SATELLITE structure instead of hero-only. Hero band
  shrunk from 690→480px to make room.
- P07: added a second real photo (`GENERATED_PHOTO_CAFE_HAWAII_CAKE_COFFEE_DIAMOND_HEAD_WIDE`)
  pinned as a small rotated polaroid inside the hero band.

Caught and fixed two of this pass's own bugs before calling it done:
- First placement of P07's second photo landed below the schedule and overflowed
  ~40px past the trim edge — moved inside the hero band instead of recalculating
  the schedule's vertical budget a second time.
- The re-positioned photo rendered as a flat placeholder color even after
  "successful" repositioning — turned out `upload_assets` had never actually been
  called for that node in the first place (it was created with a placeholder solid
  fill, then repositioning scripts ran without an upload step in between). Caught
  by checking `photo.fills` directly (still `SOLID`, not `IMAGE`) rather than
  trusting the screenshot alone, then uploaded and re-verified.

Final full-file audit (Inter-leftover + trim-overflow, all 8 pages): 0 Inter nodes,
3 overflow entries — all three are the intentional small corner-bleed on the floral
decorations (P01, P03, P08), not bugs.
