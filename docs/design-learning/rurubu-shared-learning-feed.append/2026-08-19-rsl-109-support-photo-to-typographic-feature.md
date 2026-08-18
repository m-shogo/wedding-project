# RSL-109 — Reduce nonessential photo-card responsibility before adding imagery

Source scope/item: Rurubu WEDDING / V6 Cafe & Table
Date: 2026-08-19
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A legitimate but nonessential support photograph sat as its own medium card beside a strong dominant dining image. The page was structurally correct but still read as a collection of image modules.

## Root-cause hypothesis

The support image carried more visual responsibility than its semantic/evidence role justified. Converting the whole role to typography could reduce the module feeling, but full subtraction might remove too much editorial density.

## Bounded test

On rollback-safe Rurubu candidate EP:

1. hide the support photo and replace the role with native `04` typography only;
2. compare whole/read/actual — rejected because the page became too quiet;
3. restore the same source only as a small angled support thumbnail bound to the native `04` typographic feature;
4. actual-size QA found a small title/photo contact, corrected before promotion.

No new image, Drive asset, raster hash, card, shadow or gradient was introduced.

## Expected improvement

Reduce card/module reading while preserving enough travel-magazine density and keeping the copy editable and the support image replaceable.

## Regression risk

- over-subtraction can make a print spread feel unfinished or too quiet;
- a small angled photo can still occlude native text;
- the method is invalid when the photo is real evidence that requires a larger role.

## Three-scale evidence

- whole / 500px: PASS on final EP; typography-only intermediate rejected
- reading / 1200px: PASS
- actual-size / 794×1123: PASS
- native Table text: 22
- absolute text collisions: 0
- 18px safe-area risks: 0
- unintended support-photo/title contact after correction: 0

## Figma / Drive / GitHub evidence

- Figma preferred: `1796:2 / PREFERRED / V6_INSIDE_EP_CAFE_TABLE_TYPO_NOTE_2026_08_19`
- Table page: `1796:29`
- support image: `1796:42`, hash `e3738476f760932bb5b09c9d60f174dd6c84049d`, final 175×125, about -4°
- native 04 nodes: `1796:58 / 1796:59 / 1796:60`
- rollback: EL `1789:2` hidden
- Drive root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
- durable item evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EP-TABLE-TYPO-NOTE-QA-2026-08-19.md`

## Status

`VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## What must remain Rurubu-specific

Do not transfer the exact dining composition, magenta/yellow/cyan palette, `03/04` placement, Japanese copy, image choices, overlap amount, or travel-magazine grammar.

## Cross-item applicability hypothesis

When another print artifact has a support-photo card that feels modular, first classify whether the image is essential evidence or atmosphere. If it is atmosphere, independently compare:

- full removal + native typography;
- a smaller support image attached to the native typographic beat.

Choose by whole/read/actual evidence. The transferable principle is **semantic responsibility calibration**, not “make photos smaller” and not “replace photos with text.”
