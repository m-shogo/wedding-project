# Rurubu shared-learning append — RSL-245 / RSL-246

Date: 2026-08-23
Source scope: Rurubu WEDDING

## RSL-245 — Current comparison roots can overlap while isolated screenshots still pass

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Fingerprint: `F-RSL-245-CURRENT-COMPARISON-ROOTS-OVERLAP-WHILE-ISOLATED-NODE-QA-STILL-PASSES`

### Visible / operational problem

The V8 current comparison set contained AV2 and AW2 as visible roots on the same live page. Each node rendered correctly in isolated screenshots, but page-level geometry showed the two `1587.4×1123` roots almost completely overlapping:

- AV2 `2347:2`: `x=1750 / y=8500`
- AW2 `2329:2`: `x=1800 / y=8500`
- overlap area: approximately `1,726,500 px²`

### Root-cause hypothesis

Node-only screenshot QA validates the interior of the target root but does not prove that the live comparison board itself remains spatially valid after promotions, moves or rollback operations.

### Corrected method

After re-reading live state, only AV2 root placement was corrected to `x=0 / y=8500`. Internal layout/content was untouched. After AW3 promotion, all six current V8 roots were read back and pairwise overlap-tested; overlap pairs = `0`.

### Transferable principle

After promoting or moving comparison/current roots, validate page-level root geometry/visibility/parent and pairwise overlaps in addition to isolated screenshots. This is a QA/process lesson, not a Rurubu layout rule.

### What must not transfer

Do not transfer V8 coordinates, 2×3 arrangement, page ID, spread size or visual system to other items.

## RSL-246 — A restrained Profile can use non-person lived evidence without inventing identity

State: `TESTED_LOCAL`

Fingerprint: `F-RSL-246-RESTRAINED-PROFILE-WITHHOLDS-NONPERSON-LIVED-EVIDENCE-UNTIL-CHARACTER-PAGE-BECOMES-ABSTRACT`

### Visible problem

V8 AW2 Profile/Q&A was intentionally typography-led and structurally strong, but at whole-item scale it had no visible image while surrounding V8 roles increasingly used restrained place/food evidence. The Profile risked reading as abstract rather than intentionally quiet.

### Root-cause hypothesis

A character page does not necessarily require a face. When verified real-person photography is unavailable or inappropriate, a small object/environment image with a truthful semantic owner may provide lived evidence without falsely representing a stranger as the named person.

### Bounded test

AW3 `2357:2` added exactly one non-person object flatlay role:

- `2357:35 / PHOTO_DUMMY / PROFILE_OBJECT_PORTRAIT_REPLACEABLE / NOT FINAL`
- `235×190`
- imageHash `e3738476f760932bb5b09c9d60f174dd6c84049d`
- native/factual copy changed: `0`
- generated recognizable people: `0`

The asset is an existing Rurubu structural dummy with camera/rings/flowers and is not claimed as legitimate final photography.

### Evidence

- whole-item / 500 px: PASS and stronger than AW2 within V8
- reading / 1400 px: PASS
- actual-size / `1587×1123`: PASS for DESIGN QA
- visible native text `23`
- visible IMAGE `1`
- text intersections `0`
- 18px safe risks `0`

### Regression risk

An object image can become generic stock/filler, imply facts that are not true of the real people, or turn a restrained profile into a collage. Final promotion beyond dummy-design evidence requires legitimate role-specific asset truth and renewed comparison.

### Cross-item applicability hypothesis

A materially different wedding item may independently test whether non-person object/environment evidence is safer and more meaningful than an invented face when a real-person identity label exists. Do not copy the exact image, position, crop, typography or V8 composition.
