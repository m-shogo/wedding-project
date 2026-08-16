# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-17
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_Y_CURRENT / INSIDE_CG_CE_PREFERRED_STUDIES / PHOTO_BOUND_BACK_CLOSURE_VERIFIED / EDGE_LED_QA_PHOTO_FIELDS_VERIFIED / EDITORIAL_FOLIO_COHESION_VERIFIED / JAPANESE_TYPOGRAPHY_COHESION_VERIFIED / NATIVE_TEXT_AND_REPLACEABLE_IMAGE_ROLES_PRESERVED / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

Live Figma and later evidence supersede older declarations.

## Live Figma current state

Current preferred set:

- Outer Y `1542:2` — `PREFERRED / V6_OUTER_Y_PHOTO_BOUND_BACK_CLOSURE_2026_08_17`.
- Profile / Q&A CG `1545:2` — `PREFERRED / V6_INSIDE_CG_EDGE_LED_QA_2026_08_17`.
- Story / chronology CE `1535:78` — `PREFERRED / V6_INSIDE_CE_EDITORIAL_FOLIO_COHESION_2026_08_17`.

Immediate rollback:

- Profile / Q&A CF `1538:2` — hidden as `ROLLBACK_HIDDEN / V6_INSIDE_CF_PRE_CG_EDGE_LED_QA_2026_08_17`.
- Outer W `1491:2` — hidden rollback before Y.
- CD `1535:2` — hidden rollback before the later interior passes.

Older comparison/proof frames remain preserved. V7 remains HOLD and was not edited in this pass.

## Outer Y retained

Outer Y remains the preferred outer spread. This pass did not mutate it.

Verified state retained from its dedicated QA:

- back cover is bound by legitimate existing photography instead of a detached lower information panel;
- native text collision `0`;
- 18px text safe-area risk `0`;
- registered photo roles remain within intrinsic dimensions;
- front cover, masthead and image hashes unchanged.

Detailed evidence remains:
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CF-CE-PHOTO-BOUND-BACK-CLOSURE-QA-2026-08-17.md`.

## CG — edge-led Q&A photo fields

### Visible defect

CF was structurally safe, but the Q&A page still read as a cream template with two separately framed photo cards. The white 6px photo borders and detached image placement weakened the intended travel-magazine continuity at whole-spread scale.

### Root-cause hypothesis

The page did not need another decorative system. Existing verified photo roles were strong enough, but their visual mass was underused. Letting the two photos become edge-led page fields while keeping the six questions as one narrow native-text interview rail should improve editorial continuity without reducing editability.

### Bounded treatment

CG duplicates CF and changes only the Q&A page:

- hero image `e3738476f760932bb5b09c9d60f174dd6c84049d` enlarged to about `493.7×482` and moved to the right edge;
- support image `d76eb07d83d042f15044c8bc6bf68d73a73cd77d` enlarged to about `463.7×392` and moved to the lower-right edge;
- both non-functional white 6px photo strokes removed;
- composed route texture `691a6ceed471a5d8efa144052a10564eed177b4f` retained at reduced opacity inside the interview rail;
- 01 and 04 remain major native-number beats; 02/03/05/06 remain support beats;
- questions and answers remain native editable text;
- no new image source, card system, shadow, gradient or generated asset added.

The initial candidate was not adopted as-is. Actual-size QA exposed one collision between the page deck and cyan photo caption; the caption was moved into the hero image field. Q4 also wrapped too aggressively, so its native question size was corrected from 26px to 21px before promotion.

### Verification

- whole spread 500px: PASS and stronger than CF;
- reading spread 1200px: PASS;
- Q&A actual-size `1545:39` = `794×1123`: PASS after corrections;
- Q&A native text: `26`;
- visible IMAGE fills: `3` (`2` replaceable photo roles + `1` bounded composed texture);
- absolute text collision: `0`;
- 18px text safe-area risk: `0`.

Profile page remained unchanged from CF:
- native text `18`;
- IMAGE roles `4`;
- absolute text collision `0`;
- 18px text safe-area risk `0`.

## CE Story / chronology retained

CE remains the preferred Story / chronology spread and was not mutated in this pass.

Retained state:
- Story: native text `12`, IMAGE roles `4`, text collision `0`, 18px safe-area risk `0`;
- Timeline: native text `31`, IMAGE roles `5`, text collision `0`, 18px safe-area risk `0`.

The recurring folios remain native and editable:
- `02 PROFILE / FAVORITES`;
- `03 Q&A / MEMORIES`;
- `04 OUR STORY / JOURNEY`;
- `05 TRAVEL TIMELINE`.

## Photo-diversity / provenance state

The preferred dummy studies still reuse some verified photo hashes. Do not lower identity, provenance or resolution quality simply to increase variety.

Recognizable generic/generated people must not be represented as the real couple. Final legitimate photography remains the largest open visual-quality lever, and every final photo must preserve the replaceable-image contract and receive fresh crop/contrast/actual-size QA.

## Drive / generated section masters

V6 Drive root re-read on 2026-08-17:
- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Previously registered Profile/Q&A/Timeline/Memories generated masters remain authoritative-but-unadopted. No material capability change to the known quality-preserving external binary-placement constraint was observed, so failed transport methods were not repeated.

This pass generated or uploaded no new binary asset.

## Latest evidence

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CG-CE-EDGE-LED-QA-2026-08-17.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-17-rsl-060-edge-led-photo-fields.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-17-rurubu-v6-y-cg-ce.md`.

Still relevant:
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CF-CE-PHOTO-BOUND-BACK-CLOSURE-QA-2026-08-17.md`;
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-W-CF-CE-JAPANESE-TYPOGRAPHY-QA-2026-08-17.md`;
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-W-CD-CE-EDITORIAL-FOLIO-QA-2026-08-17.md`.

## Asset lifecycle truth of latest pass

- newly image-generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new distinct raster bytes: `0`;
- image hashes changed: `0`;
- existing verified Q&A photography recomposed: `YES`;
- native variable text preserved: `YES`;
- replaceable image semantics preserved: `YES`;
- whole-spread visual verification: `PASS`;
- actual-size Q&A verification: `PASS`;
- structure / safe-area verification: `PASS`;
- rollback preserved: `YES`;
- V7 touched: `NO`.

## Learning

### RSL-060

When a print artifact is structurally correct but still looks like separate image cards on a template, test whether a legitimate existing image role can become an edge-led page field before adding more ornament. Remove a border only after proving it has no real binding or print function. Preserve variable copy separately and rerun actual-size/safe-area QA.

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Do not transfer CG's exact layout, photo dimensions, rotations, colors, question hierarchy, or Rurubu-like editorial grammar.

## Completion gate

Do not call V6 complete or print-ready until:
- Y + CG/CE cohere with final real content as one magazine system;
- final personal copy replaces dummy content and final-copy stress is rerun;
- final legitimate photography replaces stand-in/repeated roles where applicable and crop/contrast/actual-size checks are rerun;
- exact printer/product template is applied;
- bleed, trim, fold, safe area and page order are verified;
- PDF preflight and physical proof pass.

Current state:

`V6 Y + CG/CE = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Treat final legitimate photography as the largest remaining visual-quality lever.
3. When real Q&A copy arrives, rerun a dedicated CG long-copy proof; do not reuse dummy-copy safety as final-copy evidence.
4. Keep generated section masters in Drive as unadopted until a quality-preserving placement path and actual-size visual pass exist.
5. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
