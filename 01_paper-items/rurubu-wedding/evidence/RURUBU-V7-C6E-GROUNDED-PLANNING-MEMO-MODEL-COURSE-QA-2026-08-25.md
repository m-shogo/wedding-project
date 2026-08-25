# RURUBU V7 C6E — grounded planning-memo model-course QA

Date: 2026-08-25
Scope: Rurubu WEDDING only
Figma file/page: `bfM0d4c9dCeBv5pCkJ3TNM / 2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
Current candidate after promotion: `2505:2 / C6E`
Rollback: `2413:2 / C6D / hidden`
State: `DESIGN_QA_PASS / VERIFIED_LOCAL_SOURCE-PLAN / SPATIAL-TRUTH-GATED / REAL-PLACE-PHOTO-BLOCKED / NOT_PRINT_READY`

## Why this experiment existed

C6D had already removed unsupported exact clock times and used truth-safe dayparts. That fixed a factual-authority problem, but the right page remained generic: morning beach, lunch sweets, afternoon walk, evening table. It performed the shape of a model course without using the stronger planning source that is now available.

The goal was not to make the page look busier. The bounded question was: **does explicitly source-grounded planning information make the 1DAY role more useful and more credible than generic travel-guide placeholder sequencing?**

## Professional research added this run

Fresh research rotated to travel-guide information design / itinerary utility.

Primary/high-quality sources used:

- JTB Publishing, `るるぶ情報版`: official description emphasizes `見る / 食べる / 遊ぶ`, fresh information, many photographs, maps and travel planning utility. `https://jtbpublishing.co.jp/service/publishing/rurubu_info.html`
- JTB Publishing corporate guide-books page: describes Rurubu editorial value as travel know-how, fresh information and planning/editorial expertise. `https://solution.jtbpublishing.co.jp/solution/service/guide-books/`
- Hawaii Tourism Authority Japanese site, Oahu model plan: demonstrates itinerary/order as a reader-facing travel-planning job. `https://www.allhawaii.jp/plan/9257/`

Observation → Rurubu hypothesis:

`OBSERVED`: a model course is not merely a timeline-shaped visual; it is a planning tool.

`ROOT_CAUSE_HYPOTHESIS`: C6D's generic dayparts were truthful but underused an identified real planning source, leaving the page more template-like than necessary.

`TESTED_LOCAL`: replace only the right-page generic model-course role with source-status-labeled planning data and compare at three scales.

## Source authority and truth boundary

Google Drive source:

- title: `ハワイ🌺`
- document ID: `1tuFgCN63Z9Fnadr7qKy6enDZ0fAfTEmRiG2tKLE4UYg`
- source type: **2025 Hawaii travel planning memo**

Relevant memo content for `2025/11/08` includes:

- `6:00` Diamond Head arrival/start
- `7:40` KCC Farmers Market arrival
- KCC schedule note `7:30 AM–11:00 AM`
- Diamond Head reservation note
- planned Oahu festival / Kalakaua Avenue item `2025/11/08 16:00–22:00`

Critical boundary:

- this memo is authority for **what was planned / noted**;
- it is **not** treated as independent proof that the couple completed the trip exactly in that sequence;
- time-sensitive booking, opening and event information requires re-verification before final publication.

## Figma experiment

Baseline current before experiment:

- C6D `2413:2`
- right page: generic `朝 / 昼 / 午後 / 夜` model course
- right page contained three structural dummy photos.

Rollback-safe C6E:

- root `2505:2`
- created at `x=21300 / y=13000` for comparison
- all top-level writes explicitly targeted authority page `2052:2`

Final right-page copy/hierarchy:

- kicker: `旅行メモ / HAWAII 2日目`
- title: `早朝から夕方まで、オアフを動く。`
- opening beat: `6:00 / ダイヤモンドヘッド`
- note: `旅行メモ記載：事前予約。`
- midpoint beat: `KCCファーマーズマーケット / 7:40`
- note: `土曜 7:30〜11:00。朝のうちに。`
- closing beat: `16:00 / カラカウア通り`
- note: `旅行メモ：2025.11.08 / 16:00〜22:00`
- footer: `2025年のハワイ旅行メモをもとに構成。予約・開催・営業時間は出発前に再確認。`

No card/dashboard grammar was added. The information hierarchy is intentionally unequal: large coral opening/closing times, cyan midpoint time, different text alignments and substantial open paper space.

## Photo/source-truth handling

Specific place names must not authenticate unrelated dummy imagery.

Therefore C6E hides the three right-page structural image roles:

- `2505:20`
- `2505:27`
- `2505:31`

Visible images after the change: `3`, all on the left page. The right page is deliberately text-led until legitimate role-specific place photography exists.

This applies RSL-262 rather than pretending the old placeholders are Diamond Head / KCC / Kalakaua documentation.

## Failure found during QA

The first type-led refinement visually looked acceptable but geometry readback found two real text collisions:

1. `2505:22 / 6:00` with `2505:23 / ダイヤモンドヘッド`: overlap `12 × 44px`.
2. `2505:25 / 7:40` with `2505:26 / KCCファーマーズマーケット`: overlap `20 × 44px`.

The candidate was not promoted in that state.

Corrected method:

- shift Diamond Head title/note to a clean independent x position;
- shift `7:40` farther right;
- rerun structure QA rather than relying on screenshot appearance.

Verified after correction:

- text-text intersections `0`
- 18px edge risks `0`

No new failure fingerprint was created: this was ordinary collision detection/correction, not a repeated or materially distinct production failure.

## Three-scale visual QA

### 500px whole-item

PASS.

Compared with C6D, C6E has less generic travel-template grammar and a clearer reader job. It also creates a deliberately information-dense/text-led tempo beat inside V7 rather than making all six spreads photo modules of similar cadence.

### 1400px reading/page

PASS.

The three planned stops scan clearly, source-status notes remain readable, and the absence of right-page dummy photography reads as intentional information design rather than an empty luxury field.

### 1587×1123 actual-size/detail

DESIGN QA PASS.

Large times/place titles and source notes remain legible. No text intersection or edge-risk regression was found.

## Professional critique

- **Art director:** PASS. The page now has an editorial idea: a sourced Hawaii planning memo becomes the high-energy 1DAY feature, rather than a generic itinerary template.
- **Editorial designer:** PASS. The reader can extract actionable sequence and distinguish source notes from display hierarchy.
- **Book designer:** PASS locally. A text-led planning spread adds tempo variation against photo-heavy V7 roles. Whole-book winner selection remains open.
- **Typographer:** PASS after collision correction. Unequal scale/alignment is intentional and Japanese copy remains readable.
- **Photo editor:** PASS for truth handling, BLOCKED for final imagery. Unverified place photos were withheld rather than falsely captioned.
- **Print designer:** DESIGN QA only. Final paper/template, exact safe area, preflight and physical proof remain unverified.

## Promotion / final live readback

Promoted:

- C6E `2505:2`
- current position `x=3500 / y=13000`
- parent `2052:2`
- visible `true`

Rollback:

- C6D `2413:2`
- `x=300000`
- visible `false`

Final C6E structure:

- native visible text `21`
- visible IMAGE fills `3`
- visible right-page place images `0`
- text intersections `0`
- 18px edge risks `0`

Final current-root audit:

- all V7/V8 current roots parent `2052:2`
- all current roots visible
- pairwise current-root overlap `0`

V6 control remains unchanged.

## Learning decision

### RSL-268

Fingerprint:
`F-RSL-268-GENERIC-MODEL-COURSE-PERSISTS-WHEN-A-GROUNDED-PLANNING-SOURCE-EXISTS`

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Principle:

A **planning source** is a legitimate editorial state distinct from both generic dummy content and verified completed-event history. When such a source materially improves a planning/guide reader job:

1. identify the source and its status;
2. allow precise data only to the extent that the source supports it;
3. label planned versus actual truth explicitly;
4. preserve re-verification warnings for update-sensitive schedule/booking facts;
5. do not let unverified photos imply documentary proof of named places/events.

Do not transfer C6E's exact times, places, palette, typography, coordinates or V7 layout.

## Asset / completion truth

This pass:

- image generation `0`
- Drive write `0`
- new Drive master `0`
- new Figma image hash `0`
- final place-specific photography `0`
- V6 changes `0`
- V8 production changes `0`

C6E is a verified **source-plan design**, not final itinerary history and not print-ready.
