# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_GU_PREFERRED / PROFILE_QA_HA_PREFERRED / STORY_CHRONOLOGY_GW_PREFERRED / MEMORY_SPOTS_GV_PREFERRED / GOURMET_CAFE_GK_PREFERRED / ONE_DAY_PLAN_GQ_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

Fresh live readback on `845:2 / 00_RURUBU_START_HERE`:

- Outer GU `1975:2`; x `272000`, y `0`.
- Profile / Q&A HA `1996:99`; Q&A right `1996:146`; x `273800`, y `0`.
- Story / chronology GW `1987:2`; chronology right `1987:28`; x `275600`, y `0`.
- Memory Spots GV `1976:2`; x `272000`, y `1300`.
- Gourmet / Cafe GK `1991:2`; Table right `1991:33`; x `273800`, y `1300`.
- Yokohama 1DAY Plan GQ `1968:71`; x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 GU + HA/GW + GV MEMORY SPOTS + GK CAFE & TABLE + GQ 1DAY PLAN · V7 HOLD`

Latest rollback / proof state:

- GT `1981:111` hidden rollback for HA.
- HA long-copy proof `1998:2` / right `1998:49` hidden evidence.
- GJ `1954:2` hidden rollback for GK.
- GS `1981:2` hidden rollback for GW.
- GB `1929:2` hidden rollback for GU.
- GR `1971:2` hidden rollback for prior Profile iterations.
- GE `1941:2` hidden rollback for GV.
- prior comparisons/rollbacks remain preserved hidden.

## Latest verified progress — HA Q02/Q03 cream editorial beat

### Visible problem

GT's Q02/Q03 were still grouped inside one large navy filled rectangle. The page around it had already become photo-led and asymmetric, so this shared filled container read more like a reusable UI/status component than two compact Japanese magazine interview beats.

A prior Rurubu attempt to place the white copy directly on the dining photo had already failed contrast QA. This run did not repeat that method.

### Bounded rollback-safe test

HA duplicated GT and changed only the Q02/Q03/support-photo beat:

- large navy field → one 3px functional rule;
- Q02/Q03 remain native text on the cream paper field, with existing cyan/yellow ordinals;
- question/answer copy uses the existing navy reader-text color rather than inverse white;
- Q02 and Q03 question/answer pairs are native vertical Auto Layout stacks:
  - `1997:2 / STACK / QA_Q02_CREAM_NATIVE_AUTOHEIGHT`
  - `1997:3 / STACK / QA_Q03_CREAM_NATIVE_AUTOHEIGHT`
- existing dining support image/hash remains replaceable and was reduced to `545×255`, y `610`, reserving variable-copy growth space;
- hero, Q01, Q04, Q05/Q06, Profile page, facts and all other image hashes are unchanged.

Rejected intermediate states:

1. removing the dark field while keeping white inverse text made Q02/Q03 too faint on cream;
2. first long-copy Auto Layout proof grew to y-bottom `597` while the photo began at y `595`, producing a 2px growth overlap.

Both were corrected before promotion.

### Verification

- 500px whole spread: PASS and cleaner than GT;
- 1200px whole spread: PASS;
- actual-size Q&A `1996:146 / 794×1123`: PASS;
- preferred Q&A visible native text: `29`;
- absolute visible text collisions: `0`;
- 18px text safe-area risks: `0`;
- hidden realistic long-copy proof: both Q02/Q03 stacks grew to `100px`, collisions `0`, safe risks `0`, minimum stack→photo clearance `13px`;
- preferred-six-spread implementation/proof/placeholder leakage audit: `0` visible hits;
- current preferred image roles: `29` / unique image hashes `8`.

Decision: `ADOPTED / VERIFIED_LOCAL`.

Evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V6-HA-Q02-Q03-CREAM-EDITORIAL-BEAT-QA-2026-08-20.md`

Asset reconciliation:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GU-HA-GW-GV-GK-GQ-ACTIVE-ASSET-RECONCILIATION-2026-08-20.json`

Feedback:
`docs/wedding-design-learning-feedback-log.append/2026-08-20-rurubu-v6-ha-q02-q03-cream-editorial-beat.md`

Learning:
`docs/design-learning/rurubu-shared-learning-feed.append/2026-08-20-rsl-147-cream-interview-beat-after-band-subtraction.md`

## Prior same-day verified progress

- GK replaced generic closing microcopy with reader-facing Japanese editorial copy.
- GW bound Event 03 chronology copy to its legitimate photograph instead of adding more timeline UI.
- GT reduced unresolved birth-date precision to authoritative `1991年` before being superseded by HA.
- GS hid unresolved exact pseudo-dates for events 01–04.
- GU removed unresolved pseudo-years from Outer chronology.
- GV split dense guide metadata into readable native beats.

Canonical prior evidence remains under `01_paper-items/rurubu-wedding/evidence/` and Rurubu shared-learning append entries.

## Shared-learning / scope behavior

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read the Rurubu base feed and neutral non-Rurubu feed under the scope firewall;
- did not inspect or mutate non-Rurubu item-specific Figma, Drive, ledgers, assets or GitHub paths;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- RSL-147 is `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`, not a project-wide visual rule.

## Drive / asset truth

Drive root reverified after HA promotion:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Latest run:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- HA adopted + visually verified: YES;
- native variable text preserved and Q02/Q03 strengthened with Auto Layout: YES;
- replaceable photos preserved: YES;
- rollback states preserved: YES;
- V7 touched: NO.

Current photo-pool repetition remains a quality ceiling rather than a numerical target: waterfront, cafe and dining hashes each appear five times across preferred V6. Do not reduce those counts by inserting semantically false photography. Prefer a verified legitimate Rurubu asset if one becomes reachable; otherwise only demote a photo role if photography is not required to prove that editorial beat.

## Completion gate

Do not call V6 complete or print-ready until all are verified:

- final legitimate photography and final copy;
- final page count and imposition;
- exact printer/product template;
- bleed / trim / fold / safe-area requirements;
- exported PDF preflight;
- physical proof.

Current state:

`V6 GU + HA/GW + GV + GK + GQ = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_LIVE_VERIFIED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read exact live preferred IDs and parent page before every write.
3. Compare all six preferred spreads at the same scale before choosing the next defect.
4. Continue removing UI-like filled containers only where contrast/grouping can be replaced by native hierarchy and a legitimate visual anchor.
5. For variable interview/profile copy, require native Auto Layout plus realistic Japanese long-copy stress after material movement.
6. Prefer reader-facing native editorial language over generic/template micro-labels where those labels have no physical, navigational or brand function.
7. Keep unresolved facts at authoritative precision; never invent dates/details for visual completeness.
8. Do not chase photo-diversity counts with semantically false assets; current photo-pool breadth remains an open visual ceiling.
9. Keep generated section masters unadopted until quality-preserving transport materially improves.
10. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
