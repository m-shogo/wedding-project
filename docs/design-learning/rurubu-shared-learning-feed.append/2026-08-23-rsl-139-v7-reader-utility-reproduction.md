# RSL-139 — V7 multi-system reproduction: preserve useful guide data, re-author the labels

Date: 2026-08-23
Source scope/item: Rurubu WEDDING / V7 clean-room Hawaii system
Existing fingerprint: `RSL-139 — Reader-facing microcopy can remove residual template-role language`
State after this reproduction: `VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE`

## Why this is not a new fingerprint

V6 previously verified that internal/generic role language can preserve a template/work-in-progress feeling after the larger composition is already strong. V7 C6 reproduced the same root cause in a materially different high-energy travel-guide system.

Creating a new RSL number would duplicate the failure class. This entry strengthens RSL-139 and records a new correction nuance.

## Visible problem

V7 C6 `2316:2` contained a compact utility block:

- `BEST TIME　午後〜夕方`
- `MOOD　ゆっくり`
- `PHOTO　光とテーブル`

Unlike disposable filler, the values could actually help a reader decide when to go, how to spend the stop, and what visual detail to notice. But the English keys resembled generic metadata/UI schema rather than authored Japanese travel-guide information.

## New professional observation

Fresh research was rotated to travel-guide utility and information hierarchy:

- JTB Publishing describes `るるぶ情報版` around practical travel uses such as `見る・食べる・遊ぶ`, fresh local information, maps and trip planning.
- JAGAT guidance treats labels/headings as tools for immediate information-level comprehension and readability as accurate, quick, understandable reading.

## Root-cause hypothesis

The defect was not the existence of compact metadata. It was a mismatch between a **reader-useful information job** and an **internal-looking label vocabulary/hierarchy**.

## Bounded experiment

Rollback-safe C6B `2383:2` changed only the native utility text role `2383:15`:

- `BEST TIME` → `おすすめ時間`
- `MOOD` → `過ごし方`
- `PHOTO` → `写真メモ`

Values were preserved.

Labels became `Noto Sans JP Bold`; values remained `Noto Sans JP Regular`.

No container, card, shadow, badge, extra English, image, crop, palette, time sequence or route/map treatment was added or changed.

## Evidence

Three-scale DESIGN QA:

- whole-item 500 px: PASS
- reading 1400 px: PASS
- actual-size `1587×1123`: PASS

Structure:

- native text `20`
- IMAGE `6`
- text intersections `0`
- bounded 18 px edge risk `0`
- Japanese font mismatch `0`
- current V7 root overlap `0`

Promotion:

- current C6B `2383:2`
- hidden rollback C6 `2316:2 / x=300000`

Detailed evidence:

`01_paper-items/rurubu-wedding/evidence/RURUBU-V7-C6B-READER-UTILITY-JAPANESE-QA-2026-08-23.md`

## Verified nuance added to RSL-139

> Reader-facing correction does not imply deletion. If a helper field performs a genuine reader decision/navigation/observation job, preserve the information and re-author its labels and hierarchy so the job is obvious to the reader.

This guards against two opposite mistakes:

1. leaving generic schema language because it looks editorial;
2. deleting useful information merely because its current treatment resembles UI metadata.

## Regression boundary

Do not infer:

- all English should be translated;
- all helper data should be retained;
- all labels should be bold;
- Japanese travel-guide wording should transfer to other Wedding items.

Brand/category English may remain when it has a real job. Helper data should be removed when it adds no decision, navigation, semantic, production or physical value.

## Cross-item status

This is a different visual system but still the same Rurubu WEDDING item. Therefore it strengthens local evidence but does **not** satisfy `VERIFIED_CROSS_ITEM`.

A future materially different Wedding item may test the method independently through the neutral shared-learning system without copying Rurubu wording, palette, layout or travel-magazine grammar.
