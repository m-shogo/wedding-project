# るるぶWEDDING — Current Checkpoint 2026-07-31

Status: `DECORATION_COMPLETE / DRIVE_DEDUPED / PRINT_WORKING_TARGET_DEFINED / GROUNDED_CONTENT_RECOVERED / REAL_CONTENT_MINIMUM_PENDING / FIGMA_VISUAL_PENDING`
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

Duplicate-upload incident on 2026-07-31:
- the same PNG-only files already existed
- a second copy was temporarily uploaded
- #8 old/new raw files were verified byte-identical by SHA-256
- newly-created duplicates were deleted
- Drive was re-searched and each Current PNG-only filename now has one canonical copy

Mandatory rule:
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

QA evidence:
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

Real-photo candidates:
- bride profile: `024.jpg`
- history: `023.jpg`
- memory: `031.jpg`, `035.jpg`, `023.jpg`
- groom profile: MISSING

QA evidence:
- `QA_rurubu_inside_A_printaware_realphotos_raksul_working_20260731.png`
- Drive ID: `1-pValSg9oWvj0ZxbEVZ9SmXFZFUJ4l62`
- readback: VERIFIED

Result:
- bride profile/photo structure works
- existing Hawaii set is enough for History / Memory visual QA
- groom portrait is the single obvious profile-photo blocker

Grounded-content local QA additionally exists:
- `rurubu_inside_A_grounded_content_printaware_20260731.png`
- local QA only; not Figma/Final authority
- uses SHOGO / SHIORI, Okinawa / Korea / Hawaii / Yokohama, Hawaii proposal, registration and wedding entries

Authority:
- `PRINT-AWARE-QA-20260731.md`
- `CONTENT-PREFILL-20260731.md`

## 5. Current provisional layout direction

Not Final. Figma same-condition comparison is still required.

- Cover: `A — Classic Rurubu`
- Inside: `A — Travel Editorial Grid`
- Back: `A — Quiet Editorial Notes`
- B directions remain structural comparison/fallbacks
- C remains personality control and is structurally weaker under long-copy stress

## 6. Grounded couple/content facts now recovered

### Names

- groom display: `SHOGO`
- groom Japanese-name evidence:
  - `松﨑翔伍` in reservation/personal context
  - `松崎 翔伍` in an existing passport draft
  - final print must confirm `崎 / 﨑` glyph
- bride display: `SHIORI`
- bride Japanese name: `岩堀汐梨`
- bride nickname: `しおり / しーちゃん`

### Event facts

- marriage registration: `2026.02.11`
- wedding: `2026.10.24`
- location label: `YOKOHAMA`
- overall theme: `TRAVEL`

### Couple-life facts

- corgis: `くっきー` / `めろん`
- One Piece liking has appeared in wedding-planning context, but is **not yet assigned to one person or both for profile publication**

### Memory route / spots

Adopted wedding route:
- 沖縄
- 韓国
- ハワイ
- 横浜

Grounded meanings:
- 沖縄: blue sea / slow time / comfort together
- 韓国: ate a lot / walked a lot / laughed a lot
- ハワイ: proposal / special memory
- 横浜: today's/final wedding destination

### Hawaii proposal

Grounded prior-conversation detail:
- タンタラスの丘も雨
- ビーチも雨
- 最後はウルフギャングでプロポーズ
- exact year/date: still TODO

Working profile-book candidate:
> タンタラスの丘もビーチも雨。それでも最後はウルフギャングでプロポーズ。ふたりにとって忘れられない一日。

### Courtship / relationship flow

Grounded prior-conversation activities before/around dating:
- ボウリング
- ボードゲームカフェ
- 焼肉
- チームラボ

Grounded SHOGO-side relationship note:
- 何度か会う中で、楽しそうでノリが良いしおりに惹かれた
- ずっと一緒にいたいと思い告白した流れ

Dates remain TODO.

Working History copy candidate:
> ボウリング、ボードゲームカフェ、焼肉、チームラボ。何度か会ううちに距離が近づき、交際へ。

### Travel Note

Working candidate from adopted route:
> 沖縄、韓国、ハワイ。ふたりの思い出を巡りながら、今日の横浜へ。これからも旅は続きます。

Authority:
- `CONTENT-PREFILL-20260731.md`

## 7. What is now genuinely still missing

### Photos

- [ ] SHOGO clean single portrait ×1
- [ ] Friends / Family meaningful source photos ×3

Already available:
- [x] Cover `007.jpg`
- [x] SHIORI profile `024.jpg`
- [x] History/Memory `023.jpg`, `031.jpg`, `035.jpg` etc.

Drive-wide search did not find a valid groom-only or Friends source set. A generic `IMG_...` candidate was checked and was a Pokémon card, so it was rejected as unrelated.

File Library cross-chat search was attempted but retrieval returned an error; no file was adopted from the failed search.

### Person-specific profile facts

Still TODO for both:
- favorite food
- hobby
- individual favorite trip/place
- small personal detail
- optional birthday/hometown/job

### Paired Q&A

A targeted past-conversation search found no reliable person-specific answers. All remain TODO:
1. first impression — SHOGO → SHIORI / SHIORI → SHOGO
2. favorite thing about the other — both directions
3. future destination — SHOGO / SHIORI

### Missing dates/periods

Still TODO:
- meeting date/year + place/trigger
- dating/confession period
- Hawaii proposal year/date
- cohabitation month/year

### Friends / Family

Still TODO:
- three groups/relationships
- three source photos
- three short captions

Authority:
- `CONTENT-RESPONSE-TEMPLATE.md` contains only these remaining questions.

## 8. Figma blocker

Authenticated Figma account remains Starter / Full seat with the monthly MCP limit exhausted during this work period.

Do not repeatedly spend calls while blocked.

When access becomes available:
1. open the existing production Figma only
2. use the 426×303mm working print canvas equivalent with 420×297 trim
3. reproduce A/B/C under identical guides/content
4. compare A vs B first
5. apply current PNG-only decorations only after structural winner selection
6. use `007.jpg`, `024.jpg`, current History/Memory candidates
7. use grounded names / Memory route / courtship / proposal content
8. leave remaining SHOGO portrait / Friends / person-specific profile-Q&A / dates explicitly unresolved rather than inventing content
9. screenshot + stress QA
10. promote exactly one direction

## 9. What NOT to do next

- do not generate more decoration assets
- do not restore SVG
- do not upload duplicate Drive files
- do not invent couple facts from photos
- do not fill Friends slots with unrelated couple photos
- do not silently choose `崎 / 﨑`
- do not assign One Piece to a specific profile without confirmation
- do not call any local preview Final

## 10. Next productive input

The design system, PNG asset set, first-pass print geometry, Memory Spots and large parts of History are no longer the bottleneck.

Only high-value remaining inputs:
1. one SHOGO portrait
2. three Friends / Family photos
3. profile basics + six Q&A answers
4. four missing dates/periods
5. three Friends group names/captions
6. final `崎 / 﨑` glyph

`CONTENT-RESPONSE-TEMPLATE.md` is the shortest path to completion. Rough bullet answers are enough; editorial copy can be normalized afterward.
