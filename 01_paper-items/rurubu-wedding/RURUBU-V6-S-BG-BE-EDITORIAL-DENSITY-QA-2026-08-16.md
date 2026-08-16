# Rurubu WEDDING V6 — S / BG / BE Editorial Density QA

Date: 2026-08-16
Scope: Rurubu WEDDING V6 only
Baseline main before Figma promotion: `cacf7895fd19e8ab088fe0f7b66dc3d854490cc7`
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
State: `VERIFIED_LOCAL_DUMMY_DESIGN_STUDY / V7_HOLD / NOT_PRINT_READY`

## Live preferred after this pass

- Outer S `1439:2 / PREFERRED / V6_OUTER_S_NATIVE_EDITORIAL_DENSITY_2026_08_16`
- Profile / Q&A BG `1439:58 / PREFERRED / V6_INSIDE_BG_QA_EDITORIAL_BEATS_2026_08_16`
- Story / chronology BE `1433:2 / PREFERRED / V6_INSIDE_BE_CHRONOLOGY_EDITORIAL_CLUSTER_2026_08_16`
- Start Here `845:27`: `V5 FU/FX · V6 S + BG/BE INSIDE STUDIES · V7 HOLD`

Preserved rollback/evidence:

- Outer Q `1426:2` renamed and hidden as rollback before S.
- Profile/Q&A BF `1436:56` renamed and hidden as rollback before BG.
- BG long-answer stress `1441:2` hidden after verification.
- BE remained unchanged and preferred.

## Visible problem

Fresh live screenshots showed two remaining system-level defects:

1. Outer Q had the required dominant destination photography and giant native `横浜`, but compared with current Japanese travel-information-magazine grammar it still lacked enough small editorial text density to read immediately as an information-rich travel cover rather than a strong photo poster.
2. BF Q&A remained visually divided into `question list on the left + photo block on the right`. The type was readable after BF, but the six questions did not yet form a strong magazine interview rhythm with the photography.

No defect required another card, shadow, gradient, sticker field, new generated raster, or additional image count.

## Root-cause hypothesis

- Cover authenticity can improve through a small number of native editorial metadata beats and a stronger existing masthead role, without adding UI-like containers.
- Repeated Q&A becomes less template-like when one question is promoted as a feature beat, the dominant photo is treated as an editorial anchor, and later questions form supporting beats rather than remaining visually equal.
- When a layout change affects variable answers, previous long-copy evidence must not be reused; a new stress proof is required.

## Outer S bounded test

Source: Outer Q `1426:2`.

Changes only on rollback-safe duplicate S `1439:2`:

- existing verified masthead image retained; display changed `330×106.7 → 360×115.92`, positioned `x=408 / y=20`;
- existing native deck restored as `港町さんぽ・思い出スポット・旅年表`, `14 px`;
- added native micro-caption `YOKOHAMA WATERFRONT / PHOTO STORY` on the dominant hero;
- added native micro-caption `CAFÉ / DINNER / MEMORY` at the lower photo cluster;
- no image source/hash change;
- no new raster, card, shadow, gradient, decorative container, or Drive write.

Expected improvement: denser cover reading and stronger travel-information-magazine identity while preserving the dominant `横浜` + waterfront hierarchy.

Regression risk: top safe-area loss, masthead competing with destination title, or microcopy becoming decorative noise.

Final structure readback on front:

- visible native text `12`;
- visible IMAGE roles `5` including masthead;
- native text/text intersections `0`;
- 18 px text safe-area risks `0`;
- masthead remains below registered intrinsic `500×161`.

Three-scale evidence:

- whole spread / ~900 px: PASS and visually stronger than Q;
- reading spread / 1200 px: PASS;
- front actual-size `794×1123`: PASS.

## Profile / Q&A BG bounded test

Source: BF `1436:56`.

Profile page is geometrically unchanged. Q&A changes on BG only:

- dominant flatlay photo remains a replaceable IMAGE role and existing verified hash, final `x=332 / y=145 / 452×430 / rotation -1.3°`;
- Q04 promoted to the largest second interview beat (`68 px` number, `21 px` question);
- Q05/Q06 remain supporting beats deeper on the page;
- closing pullquote enlarged to `38 px` and kept native;
- lower support photo changed from the registered small skyline hash to existing verified dining hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`, final `300×230`, still replaceable;
- added native `DINNER NOTE / FAVORITE SCENE` caption;
- no new generated decoration, external binary placement, card, shadow, gradient, or additional image count.

An initial BG placement allowed the rotated hero bounding box to enter Q1–Q4 by roughly 20 px. That version was not adopted. The hero was shifted/reduced until accidental question/image intersections were removed.

Final production-copy structure:

- Q&A native text `25` including support caption;
- replaceable IMAGE roles `2`;
- text/text collision `0`;
- unintended text/image collision `0` (the `MEMORIES FROM OUR JOURNEY` label intentionally binds to the hero image);
- 18 px safe-area risk `0`.

Three-scale evidence:

- whole spread / ~900 px: PASS and clearer editorial beat hierarchy than BF;
- reading spread / 1200 px: PASS;
- Q&A actual-size `794×1123`: PASS.

## BG dedicated long-answer revalidation

Because BG changed Q&A geometry, BF's old long-answer PASS was not reused.

Hidden proof:

- `1441:2 / QA / V6_INSIDE_BG_LONG_ANSWER_STRESS_2026_08_16`
- all six answers use realistic Japanese copy and `textAutoResize=HEIGHT`;
- answer observed heights: `39 / 39 / 39 / 39 / 26 / 39 px`;
- text/text collision `0`;
- unintended text/image collision `0`;
- 18 px safe-area risk `0`;
- 1200 px visible stress screenshot: PASS;
- proof returned to hidden state after review.

## BE retained

Story/chronology BE `1433:2` was re-read and left unchanged. Its previously verified hierarchy still complements S/BG, so changing it only for activity would have increased regression risk.

## Asset lifecycle truth

- newly generated images: `0`
- new Drive saves: `0`
- new external binary placement: `0`
- existing verified Figma image hashes reused: `YES`
- native editable copy preserved: `YES`
- replaceable image roles preserved: `YES`
- generated section decoration adopted: `NO`
- generated master submit retry: `NO` — unchanged known fingerprint `DRIVE_RAW_MASTER_REACHABLE / FIGMA_SUBMIT_DNS_BLOCKED`
- rollback frames preserved: `YES`
- V7 touched: `NO`

Drive root was freshly read before promotion and remains `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.

## Decision

`S + BG/BE` is preferred over `Q + BF/BE` for the current dummy-design stage.

The improvement is editorial hierarchy/density, not additional decoration. Final real photos/copy, exact printer template, bleed/trim/fold confirmation, PDF preflight and physical proof remain required before any print-ready declaration.
