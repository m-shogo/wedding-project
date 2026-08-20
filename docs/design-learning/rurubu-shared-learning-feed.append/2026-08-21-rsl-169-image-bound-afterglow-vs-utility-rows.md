# RSL-169 — A legitimate support image can bind hero-to-closing better than utility rows

Date: 2026-08-21
Source scope/item: Rurubu WEDDING / V6 Gourmet / Cafe
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The Gourmet right page had a strong dominant dining hero, but its lower half returned to stacked numbered text and compact utility information. At thumbnail scale the visual momentum stopped after the hero and the page began to read as separate modules.

## Root-cause hypothesis

A follow-up image role already existed in the live structure but was hidden. The defect was therefore not missing visual inventory; it was that a legitimate support photograph was not being used to carry the transition from dominant scene to closing memory. Text-only 04 and separate footer modules recreated a dashboard-like boundary.

## Principle / capability tested

Before generating another image or adding a decorative container, inspect whether an already-authorized, semantically compatible support image can perform a **binding narrative role** between a dominant hero and closing native information.

## Exact bounded change

On rollback-safe IN `2091:2`:

- preserve the accepted Café left page and dining hero;
- preserve 03 as a text-led left editorial beat;
- reveal existing verified `PHOTO / TABLE_NOTE_SUPPORT_REPLACEABLE` for 04;
- bind native 04 numeral/headline/body to that image;
- compress the lower `また行きたい` and `3つの楽しみ` information into a continuous native-text footer field;
- remove only the redundant lower label/kick;
- add zero assets, cards, shadows or gradients.

Initial structure QA found two text intersections. The 04 numeral and body were repositioned, then QA returned zero intersections before adoption.

## Expected improvement

Preserve photographic momentum after a strong hero, reduce section/module reading, and create a more continuous print-editorial close without increasing asset count.

## Regression risk

- A support image can become decorative noise when it lacks semantic connection.
- More photography can crowd the lower page or weaken information hierarchy.
- A large numeral overlapping a support image can collide with adjacent native text.
- This method should not override source fidelity, provenance or identity authority.

## Three-scale evidence

- whole spread / 500px: PASS and stronger than IE.
- reading spread / 1400px: PASS.
- actual-size right / 794×1123: PASS.
- visible native text: `41` across spread.
- visible IMAGE fills: `4` across spread.
- text intersections: `0`.
- 18px right-page safe-area risks: `0`.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`.
- preferred IN: `2091:2`.
- right page: `2091:33`.
- hidden rollback IE: `2061:2`.
- reused support-photo hash: `e3738476f760932bb5b09c9d60f174dd6c84049d`.
- Drive V6 root re-read: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IN-GOURMET-DINING-AFTERGLOW-PHOTO-BIND-QA-2026-08-21.md`.

## Adopted / rejected status

`IN ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

## What must remain Rurubu-specific

Do not transfer the camera/rings still-life image, 03/04 geometry, magenta/yellow/cyan palette, large numeral treatment, footer layout or Japanese travel-magazine grammar.

## Cross-item applicability hypothesis

On another print artifact whose strong hero is followed by disconnected text-only utility modules, independently test whether a legitimate existing support image can bind the narrative transition. The receiving item must prove semantic relevance and three-scale hierarchy; it should reject the method when the extra image is merely decorative.

## Next receiving-item experiment

Use a rollback-safe comparison on a materially different artifact with an existing hidden/underused support image. Compare (A) text-only follow-up and (B) semantically image-bound follow-up while preserving native variable copy. Promote only if whole-item continuity improves without reducing actual-size legibility.
