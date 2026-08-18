# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-18
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_EE_PREFERRED / PROFILE_QA_DN_PREFERRED / STORY_CHRONOLOGY_DO_PREFERRED / MEMORY_SPOTS_EB_PREFERRED / GOURMET_CAFE_EF_PREFERRED / ONE_DAY_PLAN_EI_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / PREFERRED_NODE_LIVENESS_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer EE `1730:2` — preferred outer spread.
- Profile / Q&A DN `1675:2` — preferred profile/interview spread.
- Story / chronology DO `1679:2` — preferred story/timeline spread.
- Memory Spots EB `1721:2` — preferred destination-information spread.
- Gourmet / Cafe EF `1734:2` — preferred cafe/table spread.
- Yokohama 1DAY Plan EI `1752:2` — preferred model-course spread; right page `1752:29`.

Start Here `845:27`:

`V5 FU/FX · V6 EE + DN/DO + EB MEMORY SPOTS + EF CAFE & TABLE + EI 1DAY PLAN · V7 HOLD`

Rollback/rejected comparisons remain preserved. V7 was not edited.

## EI — 1DAY editorial stops / no route rail

Fresh live review found a status drift: `INDEX_STATUS` already referenced EI, but no EI canvas node existed; EH `1744:2` remained only as a hidden rollback. EH's asymmetric photo diary was visually useful, but the right page still carried a long vertical route rail plus four circular stop markers even though native `01–04`, times, text order and photo sequence already made chronology clear.

Rollback-safe EI `1752:2` was rebuilt from EH without changing facts, photo sources/hashes, route copy, practical metadata, left-page composition or replaceable-photo semantics.

Bounded changes on right page:

- route rail hidden;
- four STOP marker ellipses hidden;
- native ordinal/time/title/copy/metadata retained;
- ordinal x-positions lightly staggered;
- four replaceable photos and existing rotations retained.

First structural QA found tiny unintended contact between two rotated photos and their metadata lines. That state was not adopted. The two metadata text-box widths were reduced without changing copy, then re-read showed zero unintended text/photo contact.

Final EI QA:

- whole spread `1400×991`: PASS and visually stronger than EH;
- right actual `1752:29`, `794×1123`: PASS;
- right native text: `25`;
- replaceable right-page photo roles: `4`;
- text/text collisions: `0`;
- unintended text/photo collisions: `0` (`END / TABLE & TALK` remains intentionally photo-bound);
- 18px text safe-area risks: `0`;
- image sources/hashes unchanged from EH.

Promotion: EI preferred; EH `1744:2` renamed hidden rollback.

## Preferred-set truth

The preferred set remains photo-led, native-text editable and rollback-safe. No new generated or external binary asset was adopted in the latest experiment. Existing Drive-generated Profile/Q&A/Timeline/Memories masters remain unadopted until quality-preserving placement plus actual-size QA is possible.

Drive root remains verified:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Latest evidence / learning

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EI-1DAY-EDITORIAL-STOPS-NO-RAIL-QA-2026-08-18.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-18-rurubu-v6-ei-1day-no-rail.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-18-rsl-102-mature-sequence-rail-subtraction.md`.

RSL-102: a route/binding system that was once useful can become redundant when native ordinal/time/photo hierarchy already makes sequence immediate; compare retained vs removed at whole/read/actual scale and keep the binder only if it still performs a real function. State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

RSL-100 remains active: resolve live preferred node existence before every write.

## Asset lifecycle truth for latest run

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- existing replaceable photo roles preserved/re-composed: `YES`;
- native text preserved: `YES`;
- EI whole/right actual visual QA: `PASS`;
- EI collision/safe-area QA: `PASS`;
- rollback preserved: `YES`;
- V7 touched: `NO`.

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer/product template, bleed/trim/fold/safe area, exported PDF preflight and physical proof are verified.

Current state:

`V6 EE + DN/DO + EB + EF + EI = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Reconcile live preferred IDs before each write.
3. Compare all six preferred spreads as one magazine and attack only screenshot-visible repetitive-module or semantic-photo defects.
4. Prioritize final legitimate distinct Yokohama/destination photography over cosmetic repetition-count optimization.
5. Keep generated section masters unadopted until quality-preserving transport is materially improved.
6. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
