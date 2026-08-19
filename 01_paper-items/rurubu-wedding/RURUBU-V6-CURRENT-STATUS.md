# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_GB_PREFERRED / PROFILE_QA_GA_PREFERRED / STORY_CHRONOLOGY_GI_PREFERRED / MEMORY_SPOTS_GE_PREFERRED / GOURMET_CAFE_GH_PREFERRED / ONE_DAY_PLAN_GD_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

Fresh live readback immediately before this status write confirmed exactly six current preferred V6 spreads on `845:2 / 00_RURUBU_START_HERE`:

- Outer GB `1929:2`; x `272000`, y `0`.
- Profile / Q&A GA `1922:2`; x `273800`, y `0`.
- Story / chronology GI `1950:2`; Story left `1950:3`; x `275600`, y `0`.
- Memory Spots GE `1941:2`; x `272000`, y `1300`.
- Gourmet / Cafe GH `1947:2`; Cafe left `1947:3`; x `273800`, y `1300`.
- Yokohama 1DAY Plan GD `1938:2`; x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 GB + GA/GI + GE MEMORY SPOTS + GH CAFE & TABLE + GD 1DAY PLAN · V7 HOLD`

GC `1933:2` and FR `1904:18` are preserved hidden rollback states. Other prior rollbacks/comparisons remain preserved hidden.

## Latest verified progress — GH Cafe reader-facing 3 Picks

### Visible problem

GC Cafe's composed travel-note field contained four tiny generic metadata labels (`SWEETS / MOOD / PHOTO / TALK`). They were structurally valid but read as template/authoring microcopy rather than a compact travel-guide recommendation at reading and actual-size scales.

### Bounded visual test

Rollback-safe GH changed only the existing native Cafe info roles:

- kicker → `CAFE CHECK / 3 PICKS`;
- item 01 → `午後の光がやわらかい席`;
- item 02 → `窓ぎわでゆっくり話せる`;
- item 03 → `食後に海まで歩ける`;
- old fourth item hidden;
- readable item size raised to 15px.

No photo, image hash, composed raster, Table page, replaceable-photo behavior, Drive asset or V7 state changed.

### Three-scale / structure evidence

- whole spread / ~500px: PASS;
- reading spread / 1200px: PASS;
- Cafe actual-size `1947:3 / 794×1123`: PASS;
- visible Cafe text collision: `0`;
- 18px text safe-area risk: `0`.

GH was promoted into the existing Cafe/Table review-board slot. GC was renamed/hidden as rollback.

## Latest verified progress — GI Story 3 Scenes reader note

### Visible problem

FR Story's `TRAVEL NOTE / 03 SCENES` block used small English role labels (`YOKOHAMA EVENING WALK / NEXT DESTINATION / CAFE MEMORY`). Beside an otherwise strongly Japanese editorial page, the block still looked like production/template notation.

### Bounded visual test

Rollback-safe GI changed only the existing scene-note native text roles:

- kicker → `旅メモ / 3 SCENES`;
- list → `01 横浜の夕暮れ / 02 次の目的地へ / 03 休日のカフェ`;
- list size raised to 14px.

All Story photos, crop roles, image hashes, chronology right page, composed texture, main hierarchy, Drive assets and V7 remained unchanged.

### Three-scale / structure evidence

- whole spread / ~500px: PASS;
- reading spread / 1200px: PASS;
- Story actual-size `1950:3 / 794×1123`: PASS;
- visible Story text collision: `0`;
- 18px text safe-area risk: `0`.

GI was promoted into the existing Story/chronology review-board slot. FR was renamed/hidden as rollback.

## Evidence / learning

Evidence:

`01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GH-GI-READER-FACING-EDITORIAL-NOTES-QA-2026-08-20.md`

Feedback:

`docs/wedding-design-learning-feedback-log.append/2026-08-20-rurubu-v6-gh-gi-reader-facing-editorial-notes.md`

Learning:

`docs/design-learning/rurubu-shared-learning-feed.append/2026-08-20-rsl-137-reader-facing-editorial-support-notes.md`

RSL-137 state: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## Existing preferred verification retained

- GB retains readable major/minor back-cover milestones and actual-size verification.
- GA retains its verified Profile closing column and Q&A page.
- GE retains Spot 03 as a direct photo + native editorial beat and Spot 04 as the dominant dining feature.
- GD retains semantic 1DAY stop hierarchy, replaceable photos and native photo-bound closing caption.
- GH retains GC photo/texture source truth while making the Cafe support field reader-facing.
- GI retains FR's photo-led Story and boxless chronology while making the scene note reader-facing.

## Shared-learning / scope behavior

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read the Rurubu shared feed as source-scope learning;
- read the neutral non-Rurubu feed only as permitted principle/QA input;
- did not inspect or edit non-Rurubu item-specific Figma, Drive, ledgers, assets or GitHub production paths;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- RSL-137 is a local cross-item candidate, not a promoted visual rule.

## Drive / asset truth

Drive root reverified in this run:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Existing generated Profile / Q&A / Timeline / Memories masters remain stored and unadopted unless a quality-preserving placement path and actual-size QA are verified.

Latest run:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- native variable text preserved: YES;
- replaceable photos preserved: YES;
- rollback states preserved: YES;
- V7 touched: NO.

## Completion gate

Do not call V6 complete or print-ready until all of the following are verified:

- final legitimate photography and final copy;
- final page count and imposition;
- exact printer/product template;
- bleed / trim / fold / safe-area requirements;
- exported PDF preflight;
- physical proof.

Current state:

`V6 GB + GA/GI + GE + GH + GD = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_LIVE_VERIFIED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read exact live preferred IDs and parent page before every write.
3. Judge all six spreads at the same scale before choosing the next defect.
4. Cafe photography remains an asset bottleneck: do not enlarge the current Yokohama view beyond source tolerance or substitute semantically unrelated imagery merely to add density.
5. Treat small support labels as reader-facing content candidates when they have no factual/physical/brand role; do not expose generic authoring/template microcopy.
6. Preserve intentional bilingual art direction where it has real editorial value; RSL-137 is not a blanket Japanese-only rule.
7. Treat photo frames, UI/status-like labels, borders and rails as subtraction candidates only after verifying binding/contrast/physical function.
8. Re-run actual-size collision, safe-area, contrast, parent-containment and source-fidelity QA after material typography or geometry changes.
9. Keep generated section masters unadopted until quality-preserving transport materially improves.
10. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
