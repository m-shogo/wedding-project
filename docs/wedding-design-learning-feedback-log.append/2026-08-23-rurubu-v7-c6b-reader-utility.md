# Rurubu V7 C6B — reader-utility feedback

Date: 2026-08-23

## Change

V7 Island Picks + 1DAY was promoted from C6 `2316:2` to C6B `2383:2` after a bounded travel-guide utility-copy experiment.

The previous helper block:

- `BEST TIME　午後〜夕方`
- `MOOD　ゆっくり`
- `PHOTO　光とテーブル`

was not deleted because the values perform useful travel-decision/observation jobs. It was re-authored as:

- `おすすめ時間　午後〜夕方`
- `過ごし方　ゆっくり`
- `写真メモ　光とテーブル`

with native `Noto Sans JP Bold` labels and `Regular` values.

## Why

Fresh JTB Publishing and JAGAT research shifted the decision from cosmetic English cleanup to **preserving genuine traveler utility while making information hierarchy reader-facing and immediately understandable**.

No new card, pill, badge, shadow, image, route graphic or decorative module was added.

## QA

- 500 px whole-item: PASS
- 1400 px reading: PASS
- `1587×1123` actual-size DESIGN QA: PASS
- native text: `20`
- IMAGE fills: `6`
- text intersections: `0`
- bounded 18 px edge risk: `0`
- Japanese font mismatch: `0`
- current V7 root overlap: `0`

Current: C6B `2383:2`.
Rollback: C6 `2316:2`, hidden at `x=300000`.

## Learning

No duplicate fingerprint created. This is a V7 clean-room reproduction of **RSL-139**.

Strengthened nuance: reader-facing cleanup may mean **re-authoring useful helper information**, not deleting it.

RSL-139 local evidence state: `VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE`; not cross-item verified because both reproductions are within Rurubu WEDDING.

## Asset truth

- image generation: `0`
- Drive writes: `0`
- new masters: `0`
- new image hashes: `0`
- photo/crop changes: `0`
- final Hawaii photography adopted: `0`
- V6 changes: `0`
- V8 changes: `0`

## Next

Highest-value unresolved work remains legitimate role-specific Hawaii photography, especially Cafe/Table brief `2305:2`, with candidate selection → Drive master/readback → exact Figma replacement role → crop/hash/effective-PPI → three-scale QA.
