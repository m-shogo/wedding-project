# るるぶWEDDING — Current Checkpoint 2026-07-31

Status: `DECORATION_COMPLETE / DRIVE_DEDUPED / PRINT_WORKING_TARGET_DEFINED / GROUNDED_CONTENT_PREFILLED / REAL_CONTENT_COLLECTION_PENDING / FIGMA_VISUAL_PENDING`
Current authority: GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM

## 1. Decoration state

- Current fixed decoration queue #1–#14: COMPLETE
- #8–#14 are raster-native transparent PNG candidates
- SVG is prohibited for production/current placement
- historical SVG and SVG-derived rejected PNGs remain non-current
- do not generate more fixed decorations unless a real layout defect requires one

Authority:
- `IMAGE-GENERATION-QUEUE.md`

## 2. Drive state

Current PNG-only #8–#14 files are verified in the canonical Rurubu asset folder.

A duplicate-upload incident was caught on 2026-07-31:
- the same PNG-only files already existed
- a second copy was temporarily uploaded
- #8 old/new raw files were verified byte-identical by SHA-256
- the newly-created duplicate copies were deleted
- Drive was re-searched and each Current PNG-only filename now has one canonical copy

New mandatory rule:
- **search first, upload only if needed**

Authority:
- `DRIVE-ASSET-WRITE-GATE.md`

## 3. Working print target

Working target, not final purchase authority:
- vendor/service basis: ラクスル 折りパンフレット
- fold: 二つ折り
- finished size: A4 `210 × 297 mm`
- spread/trim: `420 × 297 mm`
- bleed: `3 mm` outside each trim edge
- working bleed canvas: `426 × 303 mm`
- critical outer-edge text/design: at least `3 mm` inside trim
- fold: trim x=`210 mm`; bleed-canvas x=`213 mm`
- paper working candidate: `マット紙 135kg`

Still not vendor-confirmed:
- explicit fold-safe distance
- final export/PDF/color settings for the eventual order

Authority:
- `PRINT-VENDOR-WORKING-TARGET-20260731.md`

## 4. Print-aware visual QA

### Cover A

Current first visual candidate:
- `Cover A — Classic Rurubu`
- hero candidate: `007.jpg`

Print-aware QA evidence:
- `QA_rurubu_cover_A_printaware_007_raksul_working_20260731.png`
- Drive ID: `18ZpZZwZDOhrJRdFZ49Hzy6J80q_PIoT9`
- readback: VERIFIED

Result:
- 3mm outer safe holds for major elements in the local print-aware preview
- `007.jpg` retains travel scenery and couple readability
- decoration density is acceptable when limited to a few strong groups

### Inside A

Current first structural candidate:
- `Inside A — Travel Editorial Grid`

Real-photo candidates used:
- bride profile: `024.jpg`
- history: `023.jpg`
- memory: `031.jpg`, `035.jpg`, `023.jpg`
- groom profile: MISSING

Print-aware QA evidence:
- `QA_rurubu_inside_A_printaware_realphotos_raksul_working_20260731.png`
- Drive ID: `1-pValSg9oWvj0ZxbEVZ9SmXFZFUJ4l62`
- readback: VERIFIED

Result:
- bride profile/photo structure works
- existing Hawaii set is enough for History / Memory visual QA
- groom portrait is now the single obvious profile-photo blocker

A second local Inside A QA now uses grounded route/content candidates:
- names: `SHOGO & SHIORI`
- Memory Spots: `沖縄 / 韓国 / ハワイ / 横浜`
- Hawaii: `雨の日のプロポーズ`
- fixed timeline entries: `2026.02.11 入籍` / `2026.10.24 WEDDING`
- groom portrait, person-specific profile fields, Q&A and early relationship dates remain explicitly missing

Local artifact:
- `rurubu_inside_A_grounded_content_printaware_20260731.png`
- local QA only; not yet a Drive production asset or Figma authority

Authority:
- `PRINT-AWARE-QA-20260731.md`
- `CONTENT-PREFILL-20260731.md`

## 5. Current provisional layout direction

Not Final. Figma comparison is still required.

- Cover: `A — Classic Rurubu`
- Inside: `A — Travel Editorial Grid`
- Back: `A — Quiet Editorial Notes`
- B directions remain structural comparison/fallbacks
- C remains personality control and is structurally weaker under long-copy stress

## 6. Grounded content now available

Recovered from adopted wedding creative / repo evidence:
- `SHOGO & SHIORI`
- wedding date: `2026.10.24`
- wedding location label: `YOKOHAMA`
- theme: `TRAVEL`
- marriage registration date: `2026.02.11`
- adopted memory route: `沖縄 → 韓国 → ハワイ → 横浜`
- Okinawa meaning: blue sea / slow time / comfort together
- Korea meaning: ate a lot / walked a lot / laughed a lot
- Hawaii meaning: proposal / special memory / rain-day proposal
- Yokohama: today's/final wedding destination in the adopted flight concept

Working profile-book copy for these items is stored in `CONTENT-PREFILL-20260731.md` and remains `GROUNDED_CANDIDATE` until final editorial review.

Context candidates that must not be silently assigned to one person:
- `ワンピース好き`
- `コーギー2匹`

## 7. Real-content gaps

### Photos

Still required:
- [ ] groom-side clean single portrait ×1
- [ ] Friends / Family meaningful source photos ×3

Already sufficient for first visual pass:
- [x] cover hero candidate `007.jpg`
- [x] bride profile candidate `024.jpg`
- [x] history/memory candidates `023.jpg`, `031.jpg`, `035.jpg` etc.

Drive-wide filename/folder search did not find a valid groom-only or Friends source set. Generic `IMG_...` candidate checked on 2026-07-31 was a Pokemon card image and was rejected as unrelated.

A File Library cross-chat search was attempted for older uploads but the retrieval service returned an error; no File Library photo was adopted from that failed search.

### Text still genuinely missing

Do not invent:
- [ ] person-specific profile basics (favorite food / hobby / individual favorite place / small detail)
- [ ] paired Q&A ×3
- [ ] relationship/history dates for meeting / dating / Hawaii proposal / cohabitation
- [ ] Friends / Family group identities + captions ×3

No longer blank at candidate level:
- [x] couple masthead names: SHOGO & SHIORI
- [x] travel-note working draft
- [x] Memory Spots first-pass candidate set
- [x] Hawaii proposal event description
- [x] registration/wedding timeline entries

Authority:
- `CONTENT-COLLECTION-MINIMUM.md`
- `CONTENT-PREFILL-20260731.md`
- `CONTENT-RESPONSE-TEMPLATE.md`

## 8. Figma blocker

Authenticated Figma account remains Starter / Full seat with the monthly MCP limit exhausted during this work period.

Do not repeatedly spend calls while blocked.

When access becomes available:
1. open the existing production Figma only
2. use the 426×303mm working print canvas equivalent with 420×297 trim
3. reproduce A/B/C under identical guides/content
4. compare A vs B first
5. apply current PNG-only decorations only after structural winner selection
6. use `007.jpg` / `024.jpg` / current history-memory candidates
7. use grounded SHOGO/SHIORI + Okinawa/Korea/Hawaii/Yokohama content candidates
8. leave missing groom/Friends/person-specific Q&A and dates explicitly unresolved rather than inventing content
9. screenshot + stress QA
10. promote exactly one direction

## 9. What NOT to do next

- do not generate more decoration assets
- do not restore SVG
- do not upload duplicate Drive files
- do not invent couple facts from photos
- do not fill Friends slots with unrelated couple photos
- do not call any local preview Final

## 10. Next productive input while Figma is blocked

The design system, decoration set, first-pass print geometry and Memory content are no longer the bottleneck.

Highest-value remaining inputs are now narrowly scoped:
1. groom portrait
2. three Friends / Family photos
3. person-specific profile facts and Q&A
4. four missing relationship dates/periods

`CONTENT-RESPONSE-TEMPLATE.md` contains only those remaining questions. Rough bullet answers are enough; editorial copy can be normalized afterward.
