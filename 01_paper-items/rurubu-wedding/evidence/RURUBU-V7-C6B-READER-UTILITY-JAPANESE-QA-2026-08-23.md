# RURUBU V7 C6B — Reader Utility Japanese QA

Date: 2026-08-23
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
V6 control: preserved
V8: preserved

## Professional research observation

This run deliberately rotated from recent cover-numbering, folio, route-map and photo-authenticity research into **travel-guide utility copy + information hierarchy**.

Primary/high-quality references used:

- JTB Publishing official `るるぶ情報版`: the guide is positioned around rich photography plus practical `見る・食べる・遊ぶ` information, fresh local information, useful maps and trip-planning value.
- JTB Publishing corporate guide-book material: editorial planning is framed as work by travel professionals; utility is not decorative metadata.
- JAGAT guidance on label/headline use: labels and headings should clarify information level and make content immediately understandable.
- JAGAT readability guidance: useful composition supports accurate, quick and understandable reading.

These observations are not treated as permanent project rules. They motivated one bounded V7 experiment.

## Live before evidence

Current V7 model-course root before the test:

- C6 `2316:2`
- utility text `2316:15 / TEXT / V7_INSIDE_GUIDE`
- source copy:
  - `BEST TIME　午後〜夕方`
  - `MOOD　ゆっくり`
  - `PHOTO　光とテーブル`
- font: `Noto Sans JP Regular`, 13 px
- root: `x=3500 / y=13000 / 1587.4×1123 / parent=2052:2`

The **values** had a real reader job: they communicate timing, pace and photo attention. The defect was therefore not “too much information.” The English schema labels read more like internal metadata/UI vocabulary than finished Japanese travel-guide utility.

## Root-cause hypothesis

> If compact helper information can change a travel decision, preserve the utility. Remove template residue by authoring reader-facing labels and an immediate label/value hierarchy rather than deleting the block or styling it as a UI card.

Regression risks:

- Japanese labels could become verbose and increase visual mass.
- Bold labels could make the helper block compete with the main feature title.
- Converting every English phrase mechanically would erase useful category/brand voice.

Therefore `HAWAII / 4 PICKS` and `一日の流れ / HAWAII` were intentionally left unchanged; only the utility schema was tested.

## Bounded candidate

Rollback-safe clone:

- C6B `2383:2`
- utility node `2383:15 / TEXT / V7_INSIDE_GUIDE / READER-UTILITY`

Only the following content responsibility changed:

- `BEST TIME` → `おすすめ時間`
- `MOOD` → `過ごし方`
- `PHOTO` → `写真メモ`

Final copy:

- `おすすめ時間　午後〜夕方`
- `過ごし方　ゆっくり`
- `写真メモ　光とテーブル`

Final typography inside the same native text role:

- semantic labels: `Noto Sans JP Bold`
- values: `Noto Sans JP Regular`
- font size, text box, page composition and utility position preserved

No card, rounded rectangle, badge, shadow, gradient or extra decorative label was added.

No photo source, crop, image hash, itinerary time, route/map treatment, palette or factual/date copy changed.

## Three-scale design QA

### Whole-item / 500 px

PASS.

- utility block remains subordinate to `甘い午後。` and the large photographic beats;
- Japanese labels are faster to identify than the previous English schema;
- no new module/card grammar appears.

### Reading / 1400 px

PASS.

- label/value relation is immediate;
- travel-use information reads as editorial annotation instead of internal data fields;
- left-page pace remains high-energy and asymmetrical.

### Actual-size canvas / 1587×1123

PASS for DESIGN QA.

- native labels remain crisp and editable;
- three utility rows retain sufficient separation;
- no line break or text-box expansion regression was introduced.

## Structure QA

Final C6B readback:

- current root: `2383:2`
- visible native text: `20`
- visible IMAGE fills: `6`
- text intersections: `0`
- bounded 18 px edge risk: `0`
- Japanese font mismatch: `0`
- current V7 root pairwise overlap: `0`
- parent: `2052:2`

Promotion state:

- C6B `2383:2`: `CURRENT / VERIFIED_LOCAL`
- old C6 `2316:2`: `ROLLBACK / PRE-READER-UTILITY-JAPANESE / HIDDEN`, `x=300000`

Current V7 set after promotion:

`C8 2381:2 + K 2303:2 + F2 2351:2 + G2 2299:2 + H3 2311:2 + C6B 2383:2`

## Professional critique

### A — Art director

PASS. The spread keeps the high-energy V7 personality. The correction reduces schema residue without calming the page or adding polish-for-polish's-sake.

### B — Editorial designer

PASS. The helper information has a clear reader job and is now easier to scan. Deleting it would have removed useful information.

### C — Book/editorial sequence

PASS. No new visual module was introduced, so the six-role system keeps its existing pace rather than acquiring another house-style component.

### D — Typographer

PASS. Japanese labels and values use explicit native font hierarchy. Japanese font mismatch is zero. No accidental line break was introduced.

### E — Photo editor

NO CHANGE. All existing images remain structural photo dummies where previously classified; no photography quality claim changes.

### F — Print designer

DESIGN QA PASS only. Exact printer template, final safe/bleed/fold authority, effective PPI of final photography, PDF preflight and physical proof remain unverified.

## Anti-AI / authenticity gate

Improved.

Before, the helper block could be read as a generic metadata component (`BEST TIME / MOOD / PHOTO`). After, it reads as compact editorial travel advice with a meaningful hierarchy. The treatment does not replace one AI-looking component with another.

## Learning deduplication

No new RSL/failure fingerprint is created.

This result is a materially different clean-room V7 reproduction of existing:

- `RSL-139 — Reader-facing microcopy can remove residual template-role language`

New nuance:

> The correction is not always deletion. When a helper block carries genuine reader utility, retain its information and re-author its labels/hierarchy for the reader.

RSL-139 state within Rurubu is strengthened to:

`VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE`

It remains the same Rurubu WEDDING item, so this is **not** `VERIFIED_CROSS_ITEM`.

## Before/after learning check

YES.

Without the new JTB/JAGAT research, likely next actions were either leaving the English schema because it looked “travel-magazine-like,” or deleting the whole block as UI residue. New professional knowledge changed the decision to **preserve practical information while changing its editorial authorship**.

## Asset / Drive truth

V7 Drive authority re-read:

`1fHt2rf5jvTWyjkmpGu3KhEgjQEiUNV6x / RURUBU_V7_HAWAII_PRO_CLEANROOM_2026-08-21`

This pass:

- image generation: `0`
- Drive writes: `0`
- new Drive masters: `0`
- new image hashes: `0`
- photo placements/crops changed: `0`
- legitimate final Hawaii photography adopted: `0`
- factual/date copy invented: `0`
- V6 changes: `0`
- V8 changes: `0`

## Decision

**ADOPT C6B `2383:2` as the current V7 Island Picks + 1DAY comparison spread.**

This is `VERIFIED_LOCAL` for DESIGN QA only. V7 remains REAL-CONTENT-BLOCKED where structural photo dummies remain and is not preferred/global-winner/print-ready.
