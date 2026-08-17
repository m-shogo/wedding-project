# Rurubu V6 — AA + CW/CQ visual feedback

Date: 2026-08-17
Scope: Rurubu WEDDING only
State: `VERIFIED_LOCAL / PREFERRED / V7_HOLD / NOT_PRINT_READY`

## Outer Z → AA

Observed: the front cover hero was strong, but the lower two support photographs still read partly as separate modules with a calm gap between them and the hero.

Hypothesis: the defect was photo hierarchy, not missing decoration. Pulling the existing verified support photographs upward, increasing their scale contrast, and giving them a controlled overlap should make the front more recognizably travel-magazine-like.

Bounded test:

- cloned Z rollback-safely;
- hero moved upward without changing its image hash or size;
- dining and cafe supports enlarged within source dimensions and overlapped with small opposing rotations;
- skyline kept as a small support beat;
- no new image generation, card, shadow, gradient, external upload, or raster byte.

Regression caught: the first composition created a real `横浜` / strap-deck collision. That state was rejected. After moving the headline upward, structural QA returned collision `0` and 18px safe-area risk `0`.

Evidence:

- whole `500×354`: PASS;
- reading `1200×849`: PASS;
- front actual-size `794×1123`: PASS;
- all front raster roles remain intrinsic-safe.

Result: AA `1592:2` adopted as preferred. Z retained hidden as rollback.

## Profile/Q&A CV → CW

Observed: individual pages were strong, but several dominant photo roles reused the same waterfront/flatlay imagery and the Profile main still carried a `GROOM / BRIDE` label despite showing a destination image.

Hypothesis: before generating a new image, redistribute existing verified replaceable hashes by semantic fit.

Bounded test:

- Profile main → existing travel flatlay;
- Profile snapshot 1 → existing waterfront;
- Q&A memory hero → existing cafe still-life;
- Q&A support remains dining;
- old-town / skyline snapshots remain;
- Profile overlay copy changed as native text from `GROOM / BRIDE` to `TRAVEL PROFILE`;
- geometry and Q04–06 text flow unchanged.

Evidence:

- whole `500×354`: PASS;
- reading `1200×849`: PASS;
- Profile actual-size `794×1123`: PASS;
- Q&A actual-size `794×1123`: PASS;
- Profile collision `0`, safe-area risk `0`;
- Q&A collision `0`, safe-area risk `0`;
- every reassigned image remains below intrinsic source dimensions.

Result: CW `1593:2` adopted as preferred. CV retained hidden as rollback.

## Book-level reconciliation

Preferred live set after fresh readback:

- Outer AA `1592:2`;
- Profile/Q&A CW `1593:2`;
- Story/Chronology CQ `1569:2` unchanged.

Start Here:

`V5 FU/FX · V6 AA + CW/CQ INSIDE STUDIES · V7 HOLD`

Active raster reconciliation: `25/25` visible roles intrinsic-safe, violations `0`.

Asset truth for this run:

- image generation: `0`;
- generated asset adoption: `0`;
- Drive new save: `0`;
- external binary placement: `0`;
- new raster bytes: `0`;
- existing verified photo-role reassignment: `YES`;
- existing cover photo recomposition: `YES`;
- native variable/factual copy preserved: `YES`;
- photo replaceability preserved: `YES`.

Learning status:

- RSL-074 semantic photo-role redistribution: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`;
- RSL-075 cover photo clustering before decoration: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Do not generalize exact images, dimensions, rotations, palette, wording, or Rurubu-specific editorial grammar to other Wedding items.

V6 remains `NOT_PRINT_READY`: final legitimate photographs, final personal copy, exact printer template, PDF preflight, and physical proof are still required.