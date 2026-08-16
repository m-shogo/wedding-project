# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-17
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_Y_CURRENT / INSIDE_CG_CH_PREFERRED_STUDIES / PHOTO_BOUND_BACK_CLOSURE_VERIFIED / EDGE_LED_QA_PHOTO_FIELDS_VERIFIED / STORY_SUPPORT_FRAME_SUBTRACTION_VERIFIED / BORDER_BINDING_CONTEXT_TEST_VERIFIED / NATIVE_TEXT_AND_REPLACEABLE_IMAGE_ROLES_PRESERVED / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

Live Figma and later evidence supersede older declarations.

## Live Figma current state

Current preferred set:

- Outer Y `1542:2` — `PREFERRED / V6_OUTER_Y_PHOTO_BOUND_BACK_CLOSURE_2026_08_17`.
- Profile / Q&A CG `1545:2` — `PREFERRED / V6_INSIDE_CG_EDGE_LED_QA_2026_08_17`.
- Story / chronology CH `1548:2` — `PREFERRED / V6_INSIDE_CH_STORY_FRAME_SUBTRACTION_2026_08_17`.

Immediate rollback / rejected comparison:

- Story / chronology CE `1535:78` — hidden as `ROLLBACK_HIDDEN / V6_INSIDE_CE_PRE_CH_STORY_FRAME_SUBTRACTION_2026_08_17`.
- Profile frame-subtraction study CJ `1549:2` — hidden as `REJECTED_HIDDEN / V6_INSIDE_CJ_PROFILE_FRAME_SUBTRACTION_WEAK_BINDING_2026_08_17`.
- Profile / Q&A CF `1538:2` — older hidden rollback before CG.
- Outer W `1491:2` — older hidden rollback before Y.

Start Here is synchronized to:

`V5 FU/FX · V6 Y + CG/CH INSIDE STUDIES · V7 HOLD`

Older comparison/proof frames remain preserved. V7 remains HOLD and was not edited in this pass.

## Outer Y retained

Outer Y remains the preferred outer spread and was not mutated in this pass.

Retained verified state:

- back cover is bound by legitimate existing photography rather than a detached lower information panel;
- native text collision `0`;
- 18px text safe-area risk `0`;
- registered photo roles remain within intrinsic dimensions;
- front cover, masthead and image hashes unchanged.

Detailed evidence remains:
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CF-CE-PHOTO-BOUND-BACK-CLOSURE-QA-2026-08-17.md`.

## CG Profile / Q&A retained

CG remains the preferred Profile / Q&A spread and was not mutated in this pass.

Retained state:

- Profile: native text `18`, IMAGE roles `4`, text collision `0`, 18px text safe-area risk `0`;
- Q&A: native text `26`, visible IMAGE fills `3` (`2` replaceable photo roles + `1` bounded composed texture), text collision `0`, 18px text safe-area risk `0`.

The two Q&A photographs remain edge-led without non-functional white frames. Variable questions/answers remain native text and the composed route texture remains a bounded fixed decoration.

## CH — Story support-frame subtraction

### Visible defect

CE Story was already photo-led and structurally safe, but its two support photos still carried 6px white postcard/polaroid borders. At whole-spread scale those borders added scrapbook/template containment that was weaker than the edge-led photo language already verified in Outer Y and Q&A CG.

### Root-cause hypothesis

The two Story support-photo borders had no trim, crop, caption, or overlap-separation job. Removing only those redundant frames could let the photography read more continuously without changing native text, image sources, provenance, or replaceable-image semantics.

A second bounded test asked whether the same subtraction should apply to the Profile snapshot cluster. It was rejected because those borders did perform a real separation/binding role between overlapping images.

### Bounded treatment

CH duplicates CE and changes only the Story support-photo framing:

- Story support 1 keeps `238×216`, loses the 6px white stroke, and moves slightly to `x=548 / y=424`;
- Story support 2 keeps `515×350`, loses the 6px white stroke, and moves slightly to `x=-18 / y=680`;
- Story hero, native copy, captions, folio, composed travel texture, chronology page, image fills/hashes and replaceable-image roles remain unchanged.

CJ duplicated CG and removed the three Profile snapshot borders as a comparison. That variant was rejected because the photos visually merged and the intended overlap order weakened.

### Verification

CH:

- whole spread / 500px: PASS and cleaner/more photo-led than CE;
- reading / `1400×990`: PASS;
- actual-size Story `1548:3` = `794×1123`: PASS;
- Story native text: `12`;
- Story IMAGE fills: `4` (`3` replaceable photos + `1` bounded composed texture);
- absolute text collision: `0`;
- 18px text safe-area risk: `0`.

Chronology is unchanged from CE and retains its prior verified state:

- native text `31`;
- visible IMAGE fills `5`;
- text collision `0`;
- 18px text safe-area risk `0`.

The recurring native folios remain:
- `02 PROFILE / FAVORITES`;
- `03 Q&A / MEMORIES`;
- `04 OUR STORY / JOURNEY`;
- `05 TRAVEL TIMELINE`.

## Photo-diversity / provenance state

The preferred dummy studies still reuse some verified photo hashes. Do not lower identity, provenance or resolution quality simply to increase variety.

Recognizable generic/generated people must not be represented as the real couple. Final legitimate photography remains the largest open visual-quality lever. Every final photo replacement must preserve the replaceable-image contract and receive fresh crop, contrast and actual-size QA.

## Drive / generated section masters

V6 Drive root re-read on 2026-08-17:
- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Registered generated section masters remain authoritative-but-unadopted:

- Profile `1MfLObNcvsWhQ8nQqgZHeFiDBdjPzj1w8`;
- Q&A `1M4X4ELmau3_GrCDb6n72xv13R_CszDKR`;
- Timeline `1KzAiPYc3HrvUL75Kkv9cPcAN2blQt8MV`;
- Memories `1WhO8iIIx1G9oAxU5-lWSnBEHx_AQpZe0`.

No material capability change to the known quality-preserving external binary-placement constraint was observed, so failed transport methods were not repeated.

## Latest evidence

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CG-CH-STORY-FRAME-SUBTRACTION-QA-2026-08-17.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-17-rsl-061-border-binding-context-test.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-17-rurubu-v6-y-cg-ch.md`.

Still relevant:
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CG-CE-EDGE-LED-QA-2026-08-17.md`;
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CF-CE-PHOTO-BOUND-BACK-CLOSURE-QA-2026-08-17.md`.

## Asset lifecycle truth of latest pass

- newly image-generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new distinct raster bytes: `0`;
- image hashes changed: `0`;
- existing verified Story photography recomposed: `YES`;
- native variable text preserved: `YES`;
- replaceable image semantics preserved: `YES`;
- whole-spread visual verification: `PASS`;
- actual-size Story verification: `PASS`;
- structure / safe-area verification: `PASS`;
- rollback preserved: `YES`;
- Profile border-subtraction comparison rejected: `YES`;
- V7 touched: `NO`.

## Learning

### RSL-061 — border binding-context test

A border/frame treatment must be evaluated per overlap context rather than globally kept or removed. In Story, the two support-image borders were redundant and weakened photo-led continuity, so subtraction improved the page. In the overlapping Profile snapshot cluster, the same borders separated the photographs and preserved reading order, so subtraction was rejected.

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Do not transfer the exact white-stroke width, photo positions, rotations, destination imagery, palette, headline geometry, or Rurubu editorial grammar.

## Completion gate

Do not call V6 complete or print-ready until:
- Y + CG/CH cohere with final real content as one magazine system;
- final personal copy replaces dummy content and fresh copy-stress passes;
- final legitimate photography replaces stand-in/repeated roles where applicable and crop/contrast/actual-size checks are rerun;
- exact printer/product template is applied;
- bleed, trim, fold, safe area and page order are verified;
- PDF preflight and physical proof pass.

Current state:

`V6 Y + CG/CH = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Treat final legitimate photography as the largest remaining visual-quality lever.
3. When real Q&A/Profile copy arrives, rerun dedicated realistic-copy stress; do not reuse dummy-copy safety as final evidence.
4. Keep generated section masters in Drive as unadopted until a quality-preserving placement path and actual-size visual pass exist.
5. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
