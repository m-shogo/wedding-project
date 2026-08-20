# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_GU_PREFERRED / PROFILE_QA_GT_PREFERRED / STORY_CHRONOLOGY_GS_PREFERRED / MEMORY_SPOTS_GV_PREFERRED / GOURMET_CAFE_GJ_PREFERRED / ONE_DAY_PLAN_GQ_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

Fresh live readback confirmed the preferred V6 review set on `845:2 / 00_RURUBU_START_HERE`:

- Outer GU `1975:2`; x `272000`, y `0`.
- Profile / Q&A GT `1981:111`; Profile page `1981:112`; x `273800`, y `0`.
- Story / chronology GS `1981:2`; chronology right `1981:28`; x `275600`, y `0`.
- Memory Spots GV `1976:2`; guide page `1976:24`; x `272000`, y `1300`.
- Gourmet / Cafe GJ `1954:2`; x `273800`, y `1300`.
- Yokohama 1DAY Plan GQ `1968:71`; x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 GU + GT/GS + GV MEMORY SPOTS + GJ CAFE & TABLE + GQ 1DAY PLAN · V7 HOLD`

Latest rollback state:

- GB `1929:2` hidden rollback for GU.
- GR `1971:2` hidden rollback for GT.
- GP `1961:2` hidden rollback for GS.
- GE `1941:2` hidden rollback for GV.
- prior comparisons/rollbacks remain preserved hidden.

## Latest verified progress — GS Story/chronology factual-placeholder subtraction

### Visible problem

The chronology still displayed `20XX.XX` for events 01–04. With the visual hierarchy already mature, these pseudo-dates read as unfinished facts rather than useful chronology information. Exact dates are not authoritative in current scope.

### Bounded rollback-safe test

GS duplicated GP and changed only those four unresolved native date roles:

- hid the four exact `20XX.XX` nodes;
- retained event numbers, event labels, Story page, all photos/image hashes/crops and verified dates `2026.02.11` / `2026.10.24`;
- added no image, card, rail, raster or generated decoration.

### Verification

- spread screenshot 1200px: PASS;
- chronology actual-size `1981:28 / 794×1123`: PASS;
- Story visible native text: `12`;
- chronology visible native text: `28`;
- absolute same-parent text collision: `0`;
- 18px text safe-area risk: `0`;
- stray visible text: `0`.

Decision: `ADOPTED / VERIFIED_LOCAL`.

## Latest verified progress — GT Profile partial-fact precision cleanup

### Visible problem

The profile still displayed `1991.XX.XX` under `誕生日`. The current content carries year `1991`, while month/day remain unresolved. `XX.XX` looked like unfinished production data and implied false precision.

### Bounded rollback-safe test

GT duplicated GR and changed only `TEXT / PROFILE_VALUE_2`:

- `1991.XX.XX` → native `1991年`;
- current font loaded before edit;
- label, all other profile/Q&A copy, photos, masks, crops, image hashes and geometry preserved;
- no generated asset or decorative geometry added.

### Verification

- spread screenshot 1200px: PASS;
- Profile actual-size `1981:112 / 794×1123`: PASS;
- Profile visible native text: `26`;
- Q&A visible native text: `29`;
- absolute same-parent text collision: `0` on both pages;
- 18px text safe-area risk: `0` on both pages;
- stray visible text: `0`.

Decision: `ADOPTED / VERIFIED_LOCAL`.

Evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GT-GS-FACTUAL-PRECISION-QA-2026-08-20.md`

Feedback:
`docs/wedding-design-learning-feedback-log.append/2026-08-20-rurubu-v6-gt-gs-factual-precision.md`

Learning:
`docs/design-learning/rurubu-shared-learning-feed.append/2026-08-20-rsl-144-partial-known-fact-precision.md`

## Prior same-day verified progress

GU removed unresolved pseudo-years from the Outer chronology without inventing dates. GV split dense guide metadata into six readable native beats. Their evidence remains canonical at:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GU-GV-FACTUAL-PLACEHOLDER-AND-GUIDE-METADATA-QA-2026-08-20.md`
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-20-rsl-142-143-factual-placeholders-and-readable-metadata.md`

## Shared-learning / scope behavior

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read Rurubu base feed and canonical append mechanism;
- read neutral non-Rurubu feed only as permitted principle/QA input;
- did not inspect or mutate non-Rurubu item-specific Figma, Drive, ledgers, assets or GitHub paths;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- RSL-144 is locally verified only; RSL-142 received an additional local verification; neither is promoted by this run.

## Drive / asset truth

Drive root reverified:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Latest run:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- GT adopted + visually verified: YES;
- GS adopted + visually verified: YES;
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

`V6 GU + GT/GS + GV + GJ + GQ = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_LIVE_VERIFIED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read exact live preferred IDs and parent page before every write.
3. Judge all six spreads at the same scale before choosing the next defect.
4. Audit remaining reader-visible dummy/template conventions without inventing facts.
5. Prefer reducing displayed precision to authoritative precision rather than preserving `XX` pseudo-subfields.
6. Keep minor reader-facing information readable at actual size without turning it into cards/UI.
7. Re-run actual-size collision, safe-area, parent-containment and realistic long-copy QA after material dynamic-copy movement.
8. Keep generated section masters unadopted until quality-preserving transport materially improves.
9. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
