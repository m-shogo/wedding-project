# Rurubu V5 — EH vertical issue strap clean-room promotion — 2026-08-12

Scope: `RURUBU WEDDING ONLY`.

## Visible problem

Fresh comparison against live EF showed that the front had already become photo-led, but the compact square `保存版` badge still read as an added module and the support image did not bite deeply enough into the hero/lower-photo boundary. On the back, the main headline/subtitle/friends title still depended on drop shadows, which looked like screen compositing rather than ink-on-photo editorial typography.

## Principle / capability tested

Start from subtraction and preserve the accepted photography, but change the editorial grammar rather than adding another module:

- turn `保存版` from a square badge into a narrow vertical issue strap at the page edge;
- let the tilted Feature 02 photograph overlap the hero/lower-photo transition more aggressively;
- preserve one dominant hero + one tilted support + one full-bleed lower street photograph;
- remove drop shadows from the back-cover display typography and choose solid ink from the local image tone;
- retain native editable text, semantic nodes, non-destructive IMAGE fills, fold guide and rollback state.

Expected improvement: a stronger Japanese travel-magazine issue cue at thumbnail scale, more energetic page rhythm at reading scale, and flatter print-native typography at actual size without increasing card count.

Regression risk: a narrow edge strap can become decorative noise, solid text can lose contrast on photography, and the denser overlap can create invisible text-box collisions.

## Experiment / repair

Clean-room comparator: `1061:2 / V5_OUTER_EH_VERTICAL_ISSUE_STRAP_CLEANROOM_2026_08_12`.

The first back-cover pass changed the main title to solid navy. Actual-size screenshot QA rejected it because the title weakened over the dark flowers. After a fresh node readback, the existing native title was changed to solid magenta with no shadow.

Structural QA then found one same-parent text-box collision between Feature 03 number `1061:181` and title `1061:182`. After another fresh readback, only the title x-position was moved to `126`; the final collision count is zero.

## Evidence

- working comparator: `1061:2`;
- front: `1061:131`;
- back: `1061:3`;
- Review Best Outer: `1064:2`;
- previous EF Review `1054:2`: hidden rollback and preserved;
- thumbnail whole spread: 500px long edge PASS;
- reading whole spread: 1000px long edge PASS;
- actual-size front: 794×1123 PASS;
- actual-size back: 794×1123 PASS;
- visible native text: 37;
- visible IMAGE-fill nodes: 6;
- same-parent text collisions: 0;
- bounded side safe-area text risks: 0;
- fold guide: `1061:184`, x `792.7`, width `2`, height `1122.5`, visible;
- preserved image hashes: hero `539c259be8036b481d06b4f76db9a39b407d90e8`, lower street `439a719d73f28e8dd2889f2026cccb15f345ec63`, back main `e3738476f760932bb5b09c9d60f174dd6c84049d`, friend cafe `c1ada11205bc3978bf426b304d683f1c1566cac2`, dining/support `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`;
- Current outer `77:18` and Current inside `77:290` were not modified.

## Selection

`ADOPTED / PROMOTED` over EF.

EH was selected because its vertical issue strap reads as magazine furniture rather than a UI badge, the support photo produces a stronger asymmetric overlap, and the back-cover display typography is flatter and more print-native. No new cards, gradients, generated assets, or external binaries were added.

Review/navigation were reconciled after promotion: visible bests are EH outer `1064:2` and EG inside `1058:2`; labels now read `OUTER / EH` and `INSIDE / EG`; Start Here now reads `EH outer / EG inside`.

## Asset / provenance classification

- generated this run: `0`;
- new generated asset adopted: `0`;
- new external binary placed: `0`;
- existing verified Figma photography reused: `YES`;
- Q60 exact Drive binary placement: `OPEN`.

The cover hero remains Figma hash `539c259...`, which the asset evidence ledger identifies as the V5-05 history derivative. It must not be treated as proof that Drive Q60 `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr` was exactly placed.

## Next application

Use a narrow edge strap when an issue badge starts to read like a card. Choose shadow-free ink only after checking the real crop at actual size. Keep screenshot QA and structural collision QA as separate gates: either one can catch a defect the other misses.
