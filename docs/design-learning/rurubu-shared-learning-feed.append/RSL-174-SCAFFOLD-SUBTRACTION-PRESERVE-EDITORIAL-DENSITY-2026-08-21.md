# RSL-174 — Subtract scaffolding, not useful editorial density

Source scope/item: Rurubu WEDDING / V6 Gourmet + Cafe
Date: 2026-08-21
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Source problem

The Gourmet/Table right page had a strong photo-led opening but ended with multiple rules, a small support image, a full-width utility area, and three repeated micro items. The bottom third behaved like a dashboard/footer.

## Root-cause hypothesis

The useful copy and visual scaffolding had been conflated. The rules/repeated geometry created UI character, but the underlying information supplied desirable magazine density. Subtracting both at once would create dead paper.

## Bounded test

On rollback-safe IS `2110:2`, right page `2110:33` only:

- hid lower rule scaffolding;
- retained native 03 copy;
- enlarged the existing 04 afterglow photo into a structural second visual beat;
- initially hid too much lower information;
- after the over-subtraction failure, restored the existing `また行きたい` reader memo and three small cues as a compact editorial index without restoring the old rules/footer frame;
- added no new asset, card, shadow, gradient, image hash, or generated module.

## Expected improvement

Remove dashboard/footer grammar while preserving a dense-but-readable print rhythm and making the existing 04 photograph a meaningful visual chapter.

## Regression risk

- subtraction can become empty luxury whitespace;
- rehoused copy can recreate the old footer if it regains equal-row geometry;
- large support imagery can collide with adjacent type;
- a compact memo can fail actual-size Japanese readability.

## Failure fingerprint

`F-RSL-174-OVER-SUBTRACTION-EMPTY-CLOSE`

The first IS pass removed both the visible scaffolding and too much of the useful information it carried. Whole-item and reading-scale review showed a large dead cream field. This was rejected.

If this fingerprint repeats without a materially different information model, do not add decorative filler and do not restore the old UI rules. Rehouse existing native information into a smaller editorial role, or switch to another safe composition.

## Three-scale evidence

- whole spread / 500px: PASS after repair;
- reading / 1400px: PASS;
- actual-size right page / ~794×1123: PASS;
- visible native text: `20`;
- visible IMAGE fills: `2`;
- text intersections: `0`;
- 18px safe-area risks: `0`.

## Figma / Drive / GitHub evidence

- adopted IS: `2110:2`;
- right page: `2110:33`;
- hidden IN rollback: `2091:2`;
- hero hash: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`;
- afterglow hash: `e3738476f760932bb5b09c9d60f174dd6c84049d`;
- Drive V6 root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- detailed QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IS-GOURMET-AFTERGLOW-POSTCARD-CLOSE-QA-2026-08-21.md`.

## Adopted / rejected status

Final IS: `ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

Rejected local intermediate: rule subtraction plus removal of too much supporting information, resulting in dead paper.

## What must remain Rurubu-specific

Food/travel imagery, 03/04 story, camera/map photograph, exact photo angle/crop, Japanese travel-magazine density, palette, wording, and geometry are not transferable.

## Cross-item applicability hypothesis

For materially different print work, independently distinguish **scaffolding** from **information density** before subtraction. Remove nonfunctional rules/cards/frames first, but preserve useful native information in a smaller editorial role if the page otherwise becomes dead. Verify at whole-item, reading, and actual-size scales before promotion.
