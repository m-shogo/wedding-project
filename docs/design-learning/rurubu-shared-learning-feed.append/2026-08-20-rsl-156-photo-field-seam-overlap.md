# RSL-156 — A source-safe support photo can bind a photo-led hero across a paper seam without adding assets

Source scope/item: Rurubu WEDDING / V6 HJ
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

After GW's cream title band was replaced by a photo-led hero in HI, the existing small support photograph still sat below the hero as a separate visual module. The image hierarchy was better, but the hero-to-paper transition still read as a seam rather than one continuous editorial composition.

## Evidence before change

- HI `2023:111` whole spread and actual-size Story had already passed.
- Existing support photo role was source-safe, semantically valid, independently replaceable and already used in the spread.
- No new photography was required to express the Story role.

## Root-cause hypothesis

The issue was physical/editorial relationship, not asset count. Letting the existing support image cross the hero/paper boundary could bind the two fields and create a more intentional Japanese travel-magazine collage rhythm while preserving native copy and source fidelity.

## Principle / capability tested

Increase editorial responsibility of an already legitimate support photo through controlled overlap before generating or adding another asset.

## Exact bounded change

Rollback-safe HJ duplicated from HI:

- support photo hash stayed `644f449c3bf2001a94d4b822d2b55e2614c11042`;
- size stayed `238×216`;
- rotation stayed ~`+2.8°`;
- y moved only `424 → 360` to cross the hero/paper seam;
- native caption moved with the photo;
- no new image, card, decoration, crop or hash.

## Expected improvement

More continuous photo-led page rhythm, less stacked-module reading, stronger asymmetry and more authentic magazine collage energy without increasing asset repetition.

## Regression risk

- overlap can invade title/body text;
- weak source imagery can become visibly soft if enlarged (not enlarged here);
- a caption can lose contrast when its background context changes;
- arbitrary overlap can become scrapbook decoration rather than editorial binding.

## Three-scale evidence

- whole spread 1200×849: PASS and stronger than HI;
- reading/page-scale: PASS;
- actual-size Story 794×1123: PASS;
- native visible text: 12;
- same-parent text collisions: 0;
- 18px safe-area risks: 0;
- Story image hashes unchanged.

## Figma / Drive / GitHub evidence

- Figma preferred HJ: `2024:2`; Story page `2024:3`.
- HI `2023:111`: hidden rollback.
- GW `1987:2`: hidden rollback.
- Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` reverified; no Drive write.
- QA evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-HI-HJ-STORY-PHOTO-LED-COLLAGE-QA-2026-08-20.md`.

## Failure evidence from the same experiment chain

- `RECTANGLE_WIDTH_DIRECT_ASSIGN_READONLY`: direct geometry assignment failed atomically; switched to supported `resize()`.
- `PHOTO_LED_TITLE_CAPTION_CONTEXT_DRIFT`: the hero move changed the background underneath an existing white caption; actual-size review caught the regression and the caption was moved back onto the image before adoption.

## Adopted / rejected status

`HJ ADOPTED / VERIFIED_LOCAL`.

## What must remain Rurubu-specific

Exact Yokohama photography, crop, y-coordinate, rotation, Japanese headline, palette, caption wording and Rurubu-like editorial grammar.

## Cross-item applicability hypothesis

A materially different print item may independently test controlled overlap when an already-legitimate support image can physically bind two fields and the seam is the actual visible defect. Do not transfer this as a universal overlap style.

## Next receiving-item experiment

On a different print item, use one rollback-safe candidate to compare support image fully separated vs. slightly crossing the adjacent visual field. Preserve the source size and native variable copy; reject the treatment if whole-item grouping, contrast, physical artifact semantics or actual-size text safety regress.
