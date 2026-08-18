# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-19
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_EO_PREFERRED / PROFILE_QA_EK_PREFERRED / STORY_CHRONOLOGY_EN_PREFERRED / MEMORY_SPOTS_EM_PREFERRED / GOURMET_CAFE_EF_PREFERRED / ONE_DAY_PLAN_EJ_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / PREFERRED_NODE_LIVENESS_VERIFIED / INTRINSIC_VIOLATIONS_0 / READER_PRODUCTION_TERMS_0 / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer EO `1780:2` — preferred outer spread; back page `1780:3`.
- Profile / Q&A EK `1762:2` — preferred profile/interview spread; Profile page `1762:3`.
- Story / chronology EN `1773:2` — preferred story/timeline spread; chronology page `1773:28`.
- Memory Spots EM `1767:2` — preferred destination-information spread; guide page `1767:24`.
- Gourmet / Cafe EF `1734:2` — preferred cafe/table spread.
- Yokohama 1DAY Plan EJ `1784:2` — preferred model-course spread; right page `1784:29`.

Start Here `845:27`:

`V5 FU/FX · V6 EO + EK/EN + EM MEMORY SPOTS + EF CAFE & TABLE + EJ 1DAY PLAN · V7 HOLD`

Rollback/rejected comparisons remain preserved. V7 was not edited.

## Latest visual progress — EJ 1DAY Plan

Six-spread thumbnail review identified the EI 1DAY right page as the clearest remaining repeated-media-module rhythm. EI had already removed the route rail/markers, but its four photos were still close enough in scale and column behavior to read as a placed image stack rather than a travel-magazine photo diary.

EJ `1784:2` was created from EI as a rollback-safe duplicate and changed only the existing right-page photo geometry plus nearby native-copy positions:

- STOP 01 remains a small/supporting Yokohama skyline role;
- STOP 02 cafe becomes the largest middle-page visual beat;
- STOP 03 street becomes a narrower bridge image;
- STOP 04 dining becomes the closing wide feature;
- all `01–04`, times, titles, copy and metadata remain native Figma text;
- all four photos remain independent replaceable IMAGE roles;
- no image source/hash, fact, Drive asset or generated decoration changed.

The first EJ geometry enlarged the small skyline beyond its known source width. That state was rejected before promotion. STOP 01 was corrected to `238×210` within the verified ~`240×220` source.

Final EJ QA:

- whole spread comparison: PASS and stronger than EI;
- reading scale: PASS;
- actual-size right page `794×1123`: PASS;
- native visible right-page text `25`;
- replaceable photos `4`;
- absolute text collision `0`;
- 18px text safe-area risk `0`.

Final right-page photo geometry:

- STOP 01 skyline `238×210`, ≈ `+1.2°`;
- STOP 02 cafe `388×270`, ≈ `-2.1°`;
- STOP 03 street `277×220`, ≈ `+1.1°`;
- STOP 04 dining `420×242`, ≈ `-1.0°`.

EI `1752:2` is hidden rollback. EJ `1784:2` is live preferred.

## Previous preferred improvements retained

### Outer EO

EO removes a non-functional full-width memory-title band only where the legitimate dominant photo supplies a dark/quiet field, preserving native heading readability and direct photo → chronology continuity. Whole + actual-size QA PASS, collision `0`, safe-area risk `0`.

### Profile / Q&A EK

EK removed one repeated low-resolution skyline support role and converted that non-evidence slot to editable native typography over the already-adopted composed travel texture. Profile remains whole/actual-size PASS, native text editable, replaceable photos preserved, collision `0`, safe-area risk `0`, and visible image roles intrinsic-safe.

### Story / chronology EN

EN uses source-safe existing photographs as stronger Event 03 / 05 editorial beats, keeps 02 / 04 quiet, and preserves the WEDDING terminal. Whole/read/actual QA PASS, collision `0`, safe-area risk `0`.

### Memory Spots EM

EM promotes the legitimate Spot 04 dining source into an edge-led feature at `732×430` within source `732×498`, with native text over the photo. Whole + actual-size QA PASS, collision `0`, safe-area risk `0`, rollback preserved.

## Preferred-set raster / terminology audit

EJ changes only geometry of existing photo roles and adjacent native-copy positions. It introduces no new image role or hash. Preferred-set inventory remains:

- visible image roles: `34`;
- intrinsic-size violations: `0`;
- reader-visible production/proof terminology: `0`;
- dining photo uses: `6`;
- Yokohama skyline uses: `5`;
- waterfront uses: `5`;
- cafe photo uses: `5`;
- flatlay uses: `4`;
- street uses: `3`.

Unused legacy rasters are not adopted merely to improve diversity counts. Semantic truth and provenance remain stronger gates than raw repetition metrics.

## Preferred-set truth

The preferred set remains photo-led, native-text editable and rollback-safe. Existing Drive-generated Profile/Q&A/Timeline/Memories masters remain unadopted until quality-preserving placement plus actual-size QA is possible.

Drive root remains verified:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Latest evidence / learning

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EJ-1DAY-PHOTO-SCALE-RHYTHM-QA-2026-08-19.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-19-rurubu-v6-ej-1day-photo-scale-rhythm.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-19-rsl-107-photo-scale-rhythm-without-module-containment.md`.

RSL-107: when a print page is structurally correct but media still reads as repeated modules, existing legitimate image roles may be given materially different dominant/support responsibility through scale, placement and light rotation before adding new containment or imagery. Intrinsic-source and copy-collision gates remain mandatory. State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

RSL-106 remains active: photo-bound heading subtraction requires a contrast/binding gate.

RSL-105 remains active: existing legitimate source-safe photos may assume more chronology responsibility before new imagery/cards/decor are added.

RSL-103 remains active: under a constrained legitimate photo pool, prioritize identical same-spread duplicates and repeated non-evidence support roles before cosmetic cross-spread repetition reduction.

RSL-100 remains active: resolve live preferred node existence before every write.

## Asset lifecycle truth for latest run

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- image source changes: `0`;
- photo geometry changes: `YES`, right-page 1DAY roles only;
- native text preserved: `YES`;
- remaining photo roles replaceable: `YES`;
- EJ whole + actual visual QA: `PASS`;
- EJ collision / safe-area QA: `PASS`;
- source-size overreach found and corrected before promotion: `YES`;
- EI rollback preserved: `YES`;
- V7 touched: `NO`.

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer/product template, bleed/trim/fold/safe area, exported PDF preflight and physical proof are verified.

Current state:

`V6 EO + EK/EN + EM + EF + EJ = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / INTRINSIC_VIOLATIONS_0 / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Reconcile live preferred IDs before every write.
3. Keep attacking screenshot-visible repetition, dead paper or semantic-photo defects; same-spread duplicates and obvious weak regions have priority.
4. Treat any card/band/rail subtraction as a function/contrast test, not a blanket style rule.
5. Prioritize final legitimate distinct Yokohama/destination photography over cosmetic repetition-count optimization.
6. Do not use unrelated coastal/resort images or unknown-provenance people as fake diversity.
7. Keep generated section masters unadopted until quality-preserving transport materially improves.
8. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
