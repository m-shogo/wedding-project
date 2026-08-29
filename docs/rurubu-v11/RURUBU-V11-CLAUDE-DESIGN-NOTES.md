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

## Title-lockup pass — replaced native titles with branded graphic lockups

User asked to lean further into magazine/Rurubu density using frames, titles, and
icons, not just more photos. Downloaded and verified 7 pre-made `TITLE_*` lockup
graphics from Drive (all "FINAL GRAPHIC TARGET / PENDING TRANSPORT" in V10's own
notes — i.e. V10 had planned to use these too but never actually placed them).

Visually inspected each before placing:
- **Skipped** `TITLE_PROFILE_QA_POP_A.png` — it has a corgi mascot baked in. Per
  this project's standing rule against AI-generated/altered dog imagery, kept
  P03's native Zen Maru Gothic title instead of using this asset.
- Placed the other 6 (`TITLE_PROFILE_PROFILE_TROPICAL_B`, `TITLE_STORY_FUTARI_NO_KOTO_TROPICAL_B`,
  `TITLE_STORY_TIMELINE_PINK_A`, `TITLE_MEMORY_MEMORY_SPOT_TROPICAL_B`,
  `TITLE_1DAY_1DAY_PLAN_TROPICAL_B`, `TITLE_BACK_WEDDING_GUIDE_POP_B`) on
  P02/P04/P05/P06/P07/P08, replacing the native title+kicker text on each.
  None had a baked date/name, so none conflict with the native-editable-date rule
  that got a different logo variant rejected in V10's own history.

Noted a real style tension and said so plainly rather than silently proceeding:
these are glossy "bubble-letter" 3D lockups, a different register from the
Zen Maru Gothic titles built earlier this session. However P01's cover logo
(`LOGO_COVER_RURUBU_WEDDING_EDITORIAL_B`) already uses this same bubble-lockup
style, so extending it page-to-page actually **increases** cross-page consistency
rather than introducing a competing style — the native-Zen-Maru-Gothic titles were
the odd one out, not these.

Found and fixed one real collision: P07's new title image's bottom edge (y≈371)
overlapped the venue note text (originally at y=340). Fixed by measuring the
title's actual rendered bottom and re-flowing the venue note + entire schedule
block below it by the same offset, so relative spacing was preserved exactly.

Final full-file re-audit: 0 Inter nodes, 3 overflow entries (all the same
intentional corner-decoration bleeds as the previous audit, no new bugs).

## Q&A corgi title — user explicitly authorized

The user gave explicit master authorization to use the corgi-mascot title asset on
P03, overriding the earlier caution about the project's no-AI-dog-imagery rule
(that rule protects against generating/altering imagery of the couple's actual
dogs; the user clarified a generic decorative mascot illustration is fine).
Placed `TITLE_PROFILE_QA_POP_A.png`, replacing P03's native title. Re-verified by
screenshot: no collision with the existing photo/question layout.

User's next direction: push further toward matching real Rurubu magazine
conventions specifically ("るるぶと瓜二つ" — near-identical to actual Rurubu).

## Final density pass — real Rurubu conventions (numbered spot pins, map pin)

Per "るるぶと瓜二つくらいがいい" — pushed toward specific real-Rurubu visual
conventions rather than generic decoration:
- P05/P06: added circled, colored, numbered spot badges (①②③ style) directly on
  the destination/memory photos — the classic Rurubu "numbered map pin on photo"
  device, distinct from the text-only "MEMORY SPOT 01/02" kickers already present.
- P07: added a map-pin icon (`MAP_GLOBAL_LOCATION_PIN_HEART_CORAL_01`) beside the
  venue line.

Caught one upload silently failing: the map-pin's first `upload_assets` call
returned `success:true` but with no `placedOnNodeId` in the response and the
node's fill stayed `SOLID` on inspection — retried the exact same call and it
succeeded the second time with `placedOnNodeId` present. Root-caused as a
transient issue, not a logic bug, but caught by checking `fills[0].type`
directly rather than trusting the first response.

Ran a final combined audit across all 8 pages: 0 Inter-font nodes, 0 image-role
rectangles still showing an unfilled placeholder color (except the two
intentionally-labeled "実写真未投入" Okinawa/Seoul slots on P05), 3 overflow
entries (the same three intentional corner-decoration bleeds noted throughout
this document, not bugs).

## Foundational redesign — "るるぶにして思想根底から変えて"

User judged the previous pass (glossy bubble-letter title lockups, pastel-pink-led
palette) as still not genuinely Rurubu — closer to generic kawaii-mobile-game
merch than an actual travel guidebook. Asked to change the design philosophy at
the root, not add more decoration on top.

Confirmed direction via one clarifying question before executing (to avoid a
second wasted redesign cycle): shift to real Rurubu magazine/guidebook structure
— orange/red brand color as the structural spine, boxed practical information,
numbered-pin-to-photo cross-referencing, color-coded running-head tabs, and a
restrained, editorial masthead instead of a glossy sticker logo.

Executed across all 8 pages:

1. **Folio system** — added a consistent bottom-corner running-head tab to
   P02–P08 (orange `#E74F1B` background, white section-name label + page number
   in Zen Maru Gothic Black), alternating left/right like a real bound
   book's inner/outer margins. P01 has none, matching real magazine convention
   (covers don't carry a folio).
2. **Removed every glossy bubble-letter title lockup**, including the corgi one
   on P03 that had just been added — full consistency mattered more than keeping
   a asset already placed. Replaced all of them with a repeatable native masthead
   component: a short orange accent bar + small Shippori Mincho English kicker +
   large black/white Zen Maru Gothic Black Japanese title. Same recipe on every
   inside page; P06 got a compact on-photo variant (white tab + orange bar) since
   its hero photo needed to stay the visual lead.
3. **P01 cover**: removed the glossy `LOGO_COVER_RURUBU_WEDDING_EDITORIAL_B` sticker
   entirely and replaced it with a native "るるぶ" wordmark (64px Zen Maru Gothic
   Black) + orange underline bar + "WEDDING" kicker — the same masthead grammar
   as the inside pages, now anchoring the whole book's identity instead of a
   one-off decorative asset.

Caught and fixed one real bug during this pass: P02's new masthead title
overflowed the safe area by 57px (the fixed 30pt size was sized for a different
column width than the one actually available on that page). Fixed by shrinking
to fit the measured available width (22pt) rather than reusing a single global
constant blindly.

Final full-file audit after the redesign: 0 Inter nodes, 0 unintentional unfilled
image placeholders, 3 overflow entries — the same three intentional corner-bleed
decorations noted throughout this document.

## "全然ダメ もっと振り切って" — committing fully, no more half-measures

User rejected the previous pass as still too soft/cute. Direction: commit fully
to the orange/red-led real-magazine identity, stop hedging with pastel/rainbow
elements left over from the earlier sticker-collage phase.

Executed:
- **P01 coverline pills rebuilt** from 6 rainbow rounded pills into bold
  rectangular magazine coverline tags: orange/red solid fills alternating with
  white-with-colored-border, each with a small diamond "flag" notch — sized to
  their own measured text width rather than a fixed guess.
- **Pink swept out of every structural/brand role** across all 8 pages (cover
  badge, P02 bride label, P04 first flow dot, P05/P06 spot badge #1, P08 recap
  rule + names) and replaced with orange or red. Pink/cobalt/teal/coral/cyan
  remain only as legitimate *secondary* rotation accents (e.g. distinguishing
  6 different Q&A numbers), never as the page's dominant brand color anymore.
- **Masthead accent bars thickened** from 6px hairlines to 14px solid blocks on
  P02/P03/P04/P05/P07/P08 — a real color presence, not a thin line.
- **Folio tabs enlarged** (96×22 → 112×28) for more authority.
- **P01 gained a top-right "MEMORIAL ISSUE" corner badge** — a real magazine
  "special edition" device. First attempt used a 45°-rotated ribbon; the text
  positioning math for the diagonal was wrong and it visually collided with the
  existing floral corner spray, both partially unreadable. Replaced with a
  plain non-rotated rectangular corner badge instead of chasing the diagonal
  math further, and removed the floral corner spray entirely since the badge
  now owns that corner — one clear device beats two competing ones.

Final audit after this pass: 0 Inter nodes, overflow count down to 2 (the
remaining two are the same known intentional corner-decoration bleeds on P03/P08;
P01's is gone now that its floral corner was removed).

## "もっと派手にして" — depth, weight, and impact pass

Continued pushing boldness per explicit request. Added, all verified by
screenshot:

- **Drop shadows** on every pinned/rotated photo frame (P02/P03/P04/P06/P07)
  and on the P01 date badge, P01 issue badge, and P06's on-photo title tab —
  real lift/depth instead of flat pasted rectangles.
- **Q&A answer rules thickened** from 2px hairlines at reduced opacity to solid
  5px color blocks — much stronger visual rhythm down the page.
- **P07 schedule rows** gained a solid orange left-edge stripe per row (in
  addition to the existing time-dot), a stronger "guidebook timetable" feel.
- **P06's on-photo title tab** made fully opaque (was 92%) and given its own
  shadow, matching the rest of this pass instead of sitting flat.

Final full-file audit: 0 Inter nodes, 0 unfilled image placeholders, overflow
count 2 (still only the two known intentional corner-decoration bleeds on
P03/P08).

## P05 placeholder redesign — "coming soon" instead of looking broken

The Okinawa/Seoul gray boxes read as unfinished/buggy rather than intentional.
Redesigned as a proper "coming soon" tile: dashed orange border, diagonal
stripe pattern, and a solid-orange rounded "COMING SOON" tag with its own
drop shadow — still 100% honest that no real photo exists yet, just designed
on purpose instead of looking abandoned.

Caught a real bug on the first attempt: the diagonal stripes were created as
loose sibling rectangles sized larger than their placeholder box (to guarantee
full diagonal coverage), which meant they bled across the entire page instead
of staying inside their box — confirmed by screenshot, not assumed. Fixed by
wrapping each placeholder's stripes in a `clipsContent = true` frame sized
exactly to the placeholder, so the same oversized/rotated stripes now render
correctly clipped.

Also double-checked a screenshot artifact that looked like corrupted text
("ハワイ" appeared to render as "ハフイ" at the screenshot's resolution) by
reading the actual node's `.characters` and Unicode code points directly —
confirmed the underlying text was correct (`30cf 30ef 30a4` = ハワイ) and it
was a rendering/rasterization artifact, not a data bug. Recorded here since
"looks wrong in a screenshot" and "is wrong" are different claims and this
project's rules require checking before reporting either way.

Note on this session's own overflow-audit script: after the clip-frame fix,
the script flagged 12 new "overflow" entries, all the diagonal stripe
rectangles. These are false positives — the audit compares each node's
*local* x/y/width/height against the trim frame's absolute size, which is
correct for direct trim children but wrong once a node is nested inside an
intermediate frame (the stripes' coordinates are relative to their clip
frame, not the trim). Confirmed false-positive by re-screenshotting rather
than trusting the script blindly; the audit script itself was not fixed
(known limitation, noted here for future reference) since the actual render
was already verified correct.
