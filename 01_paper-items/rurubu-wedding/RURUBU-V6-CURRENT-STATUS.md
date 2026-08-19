# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_GB_PREFERRED / PROFILE_QA_GN_PREFERRED / STORY_CHRONOLOGY_GO_PREFERRED / MEMORY_SPOTS_GE_PREFERRED / GOURMET_CAFE_GJ_PREFERRED / ONE_DAY_PLAN_GD_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

Fresh live readback confirmed the six preferred V6 spreads on `845:2 / 00_RURUBU_START_HERE`:

- Outer GB `1929:2`; x `272000`, y `0`.
- Profile / Q&A GN `1957:2`; x `273800`, y `0`.
- Story / chronology GO `1958:2`; x `275600`, y `0`.
- Memory Spots GE `1941:2`; x `272000`, y `1300`.
- Gourmet / Cafe GJ `1954:2`; Cafe left `1954:3`; x `273800`, y `1300`.
- Yokohama 1DAY Plan GD `1938:2`; x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 GB + GN/GO + GE MEMORY SPOTS + GJ CAFE & TABLE + GD 1DAY PLAN · V7 HOLD`

GA `1922:2` and GI `1950:2` are preserved hidden as rollback. Other prior comparisons/rollbacks remain preserved hidden.

## Latest verified progress — GN / GO reader-facing microcopy pass

### Visible problem

The preferred Profile/Q&A and Story/chronology spreads were structurally mature but still carried small generic English role labels and duplicated helper copy that read like production-template residue at actual size.

### GN — Profile / Q&A

Rollback-safe GN changed only native microcopy:

- `TRAVEL PROFILE` → `ふたりの旅プロフィール`;
- `TRAVELER DATA / 6 NOTES` → `6つの旅メモ`;
- hid the duplicate bottom kicker while retaining the stronger native closing `ふたりの旅は、つづく。`;
- preserved all photos, Q&A answers, geometry, image hashes and composed raster roles.

Verification:

- 1200px whole spread PASS;
- left actual-size 794×1123 PASS;
- right actual-size 794×1123 PASS;
- Profile visible native text `26`;
- Q&A visible native text `29`;
- absolute text collisions `0`;
- 18px text safe-area risks `0`.

### GO — Story / chronology

Rollback-safe GO converted six small role-like labels to reader-facing Japanese editorial microcopy without changing photography, chronology geometry or image hashes.

Verification:

- 500px thumbnail PASS;
- 1200px reading spread PASS;
- Story actual-size 794×1123 PASS;
- chronology actual-size 794×1123 PASS;
- Story visible native text `12`;
- chronology visible native text `32`;
- absolute text collisions `0`;
- 18px text safe-area risks `0`.

## Evidence / learning

Evidence:

`01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GN-GO-READER-FACING-MICROCOPY-QA-2026-08-20.md`

Feedback:

`docs/wedding-design-learning-feedback-log.append/2026-08-20-rurubu-v6-gn-go-reader-facing-microcopy.md`

Learning:

`docs/design-learning/rurubu-shared-learning-feed.append/2026-08-20-rsl-139-reader-facing-microcopy-over-role-labels.md`

RSL-139 state: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## Existing preferred verification retained

- GB retains readable major/minor back-cover milestones and actual-size verification.
- GN retains GA's Profile/Q&A layout, replaceable photos and native variable copy while removing role-label/template residue.
- GO retains GI's Story/chronology geometry and photo-led chronology while converting generic microcopy to reader-facing editorial language.
- GE retains direct-photo Spot 03 and dominant dining Spot 04.
- GD retains semantic 1DAY stop hierarchy and native photo-bound closing caption.
- GJ retains reader-facing Cafe recommendations while binding the source-limited view into one stronger editorial beat.

## Shared-learning / scope behavior

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read the Rurubu shared feed as source-scope learning;
- read the neutral non-Rurubu feed only as permitted principle/QA input;
- did not inspect or edit non-Rurubu item-specific Figma, Drive, ledgers, assets or GitHub production paths;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- RSL-139 is a local cross-item candidate, not a promoted visual rule.

## Drive / asset truth

Drive root reverified:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Existing generated Profile / Q&A / Timeline / Memories masters remain stored and unadopted until a quality-preserving placement path and actual-size QA are verified.

Latest run:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- GN adopted + visually verified: YES;
- GO adopted + visually verified: YES;
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

`V6 GB + GN/GO + GE + GJ + GD = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_LIVE_VERIFIED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read exact live preferred IDs and parent page before every write.
3. Judge all six spreads at the same scale before choosing the next defect.
4. Continue auditing reader-visible microcopy for internal-role/template residue, but do not mass-remove intentional English magazine language.
5. Cafe photography remains source-limited: do not enlarge the current Yokohama view beyond verified tolerance or substitute semantically unrelated imagery merely to add density.
6. Prefer stronger editorial binding and hierarchy before creating another image role.
7. Treat photo frames, labels, rails and containers as subtraction candidates only after verifying binding/contrast/physical function.
8. Re-run actual-size collision, safe-area, parent-containment and source-fidelity QA after material typography or geometry changes.
9. Keep generated section masters unadopted until quality-preserving transport materially improves.
10. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
