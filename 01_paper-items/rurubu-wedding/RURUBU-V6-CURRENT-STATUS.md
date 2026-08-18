# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-19
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_EE_PREFERRED / PROFILE_QA_EK_PREFERRED / STORY_CHRONOLOGY_EL_PREFERRED / MEMORY_SPOTS_EJ_PREFERRED / GOURMET_CAFE_EF_PREFERRED / ONE_DAY_PLAN_EI_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / PREFERRED_NODE_LIVENESS_VERIFIED / INTRINSIC_VIOLATIONS_0 / READER_PRODUCTION_TERMS_0 / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer EE `1730:2` — preferred outer spread.
- Profile / Q&A EK `1762:2` — preferred profile/interview spread; Profile page `1762:3`.
- Story / chronology EL `1763:2` — preferred story/timeline spread; chronology page `1763:28`.
- Memory Spots EJ `1759:2` — preferred destination-information spread; guide page `1759:24`.
- Gourmet / Cafe EF `1734:2` — preferred cafe/table spread.
- Yokohama 1DAY Plan EI `1752:2` — preferred model-course spread; right page `1752:29`.

Start Here `845:27`:

`V5 FU/FX · V6 EE + EK/EL + EJ MEMORY SPOTS + EF CAFE & TABLE + EI 1DAY PLAN · V7 HOLD`

Rollback/rejected comparisons remain preserved. V7 was not edited.

## Latest visual progress — EJ / EK / EL

### Memory Spots EJ

EB had a source-limited Spot 03 skyline (`240×220`) and a weak blank band before Spot 04. EJ did not enlarge that low-resolution role. Instead, the legitimate dining Spot 04 source (`732×498`) was promoted to a larger second feature at `493×344`, with existing native title/copy/label rebalanced beside it.

Final EJ right-page QA:

- actual `794×1123`: PASS;
- native text `14`;
- text collision `0`;
- 18px safe-area risk `0`;
- overflow `0`;
- Spot 03 `238×218 / 240×220`;
- Spot 04 `493×344 / 732×498`.

EB `1721:2` is hidden rollback.

### Profile / Q&A EK

DN used the low-resolution Yokohama skyline as a third small Profile snapshot even though that role was editorial support rather than evidence. A Rurubu-only unused-raster audit found no safer substitute: unrelated coast/resort images were semantic mismatches and two person images lacked sufficiently established production provenance for this role.

EK therefore preserved the Profile hero and two meaningful replaceable snapshots, hid only the repeated third skyline, and converted that support slot to editable native typography over the already-adopted composed travel texture:

- `NEXT DESTINATION`;
- large native `03`;
- `次の目的地へ。`;
- one functional yellow rule.

The first attempt exposed a containment/z-order failure because newly cloned native nodes landed at page root. Parent readback caught it. After re-parenting, remaining text-box overlap and safe-area proximity were repaired before adoption.

Final EK Profile QA:

- whole spread: PASS;
- Profile actual `794×1123`: PASS;
- native text `25`;
- text collision `0`;
- 18px safe-area risk `0`;
- all visible image roles intrinsic-safe;
- skyline use across preferred set `6 → 5`.

DN `1675:2` is hidden rollback.

### Story / Chronology EL

DO showed the identical waterfront image twice in one reading unit: left Story hero and facing Event 01. EL preserved the large Story hero and removed only the non-evidence Event 01 copy, replacing it with a strong native milestone on cream:

- large magenta `01`;
- native date placeholder;
- native `出会い`;
- native supporting copy.

The first structural pass found a 6px `01` / date overlap; the date was moved down before adoption.

Final EL chronology QA:

- whole spread: PASS;
- chronology actual `794×1123`: PASS;
- native text `31`;
- text collision `0`;
- 18px safe-area risk `0`;
- visible image intrinsic violations `0`;
- same-spread duplicate waterfront removed;
- waterfront use across preferred set `6 → 5`.

DO `1679:2` is hidden rollback.

## Final preferred-set raster / terminology audit

After EJ + EK + EL promotion:

- visible image roles: `34`;
- intrinsic-size violations: `0`;
- reader-visible production/proof terminology: `0`;
- dining photo uses: `6`;
- Yokohama skyline uses: `5`;
- waterfront uses: `5`;
- cafe photo uses: `5`;
- flatlay uses: `4`;
- street uses: `3`.

Unused legacy rasters were not adopted merely to improve the diversity count. Semantic truth and provenance remain stronger gates than raw repetition metrics.

## Preferred-set truth

The preferred set remains photo-led, native-text editable and rollback-safe. Existing Drive-generated Profile/Q&A/Timeline/Memories masters remain unadopted until quality-preserving placement plus actual-size QA is possible.

Drive root remains verified:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Latest evidence / learning

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EJ-EK-EL-SEMANTIC-PHOTO-ROLE-QA-2026-08-19.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-19-rurubu-v6-ej-ek-el-photo-role.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-19-rsl-103-same-spread-photo-duplication-priority.md`.

RSL-103: under a constrained legitimate photo pool, prioritize identical same-spread duplicates and repeated non-evidence support roles before cosmetic cross-spread repetition reduction. Preserve evidence-bearing photography and reject semantic/provenance mismatches even if they would improve diversity counts. State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

RSL-100 remains active: resolve live preferred node existence before every write.

## Asset lifecycle truth for latest run

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- existing composed decoration reused: `YES`;
- native text preserved: `YES`;
- remaining photo roles replaceable: `YES`;
- EJ / EK / EL whole + actual visual QA: `PASS`;
- EJ / EK / EL collision / safe-area QA: `PASS`;
- rollback preserved: `YES`;
- V7 touched: `NO`.

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer/product template, bleed/trim/fold/safe area, exported PDF preflight and physical proof are verified.

Current state:

`V6 EE + EK/EL + EJ + EF + EI = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / INTRINSIC_VIOLATIONS_0 / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Reconcile live preferred IDs before each write.
3. Keep attacking only screenshot-visible repetition or semantic-photo defects; same-spread duplicates have priority.
4. Prioritize final legitimate distinct Yokohama/destination photography over cosmetic repetition-count optimization.
5. Do not use unrelated coastal/resort images or unknown-provenance people as fake diversity.
6. Keep generated section masters unadopted until quality-preserving transport materially improves.
7. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
