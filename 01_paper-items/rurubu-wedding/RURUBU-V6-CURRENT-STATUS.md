# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_GU_PREFERRED / PROFILE_QA_HA_PREFERRED / STORY_CHRONOLOGY_GW_PREFERRED / MEMORY_SPOTS_GV_PREFERRED / GOURMET_CAFE_GL_PREFERRED / ONE_DAY_PLAN_GQ_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

Fresh final live readback on `845:2 / 00_RURUBU_START_HERE`:

- Outer GU `1975:2`; x `272000`, y `0`.
- Profile / Q&A HA `1996:99`; Q&A right `1996:146`; x `273800`, y `0`.
- Story / chronology GW `1987:2`; chronology right `1987:28`; x `275600`, y `0`.
- Memory Spots GV `1976:2`; x `272000`, y `1300`.
- Gourmet / Cafe GL `2000:2`; Cafe left `2000:3`; Table right `2000:33`; x `273800`, y `1300`.
- Yokohama 1DAY Plan GQ `1968:71`; x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 GU + HA/GW + GV MEMORY SPOTS + GL CAFE & TABLE + GQ 1DAY PLAN · V7 HOLD`

Latest rollback / proof state:

- GK `1991:2` hidden rollback for GL.
- GT `1981:111` hidden rollback for HA.
- HA long-copy proof `1998:2` / right `1998:49` hidden evidence.
- GJ `1954:2` hidden earlier rollback.
- GS `1981:2` hidden rollback for GW.
- GB `1929:2` hidden rollback for GU.
- GR `1971:2` hidden rollback for prior Profile iterations.
- GE `1941:2` hidden rollback for GV.
- prior comparisons/rollbacks remain preserved hidden.

## Latest verified progress — GL Cafe 02 controlled ordinal/photo overlap

### Visible / structural problem

After HA promotion, a cross-spread structure audit found the only remaining visible text-text collision in current preferred V6: GK Cafe left page `1991:3` had the large native `02` ordinal overlapping `景色まで、ごちそう。` by `12×62px`.

At thumbnail scale the relationship looked nearly intentional, so this was a real example of a structural defect hidden by a visually plausible layout.

### Bounded rollback-safe test

GL duplicated GK and changed only `TEXT / VIEW_NUM`:

- x `224 → 202`;
- y, dimensions `120×92`, font size `88`, color and characters unchanged;
- verified replaceable view photo remains `238×218`, same source/hash and crop role;
- title/body/meta/Cafe Check/closing and the entire Table page are unchanged.

Instead of pushing the Japanese title column farther right, the ordinal was moved deeper onto its already legitimate photograph. The intentional number/photo horizontal overlap became `62px`, while the title gained actual structural clearance.

### Verification

- whole spread / ~900px: PASS and more intentional than GK;
- reading scale: PASS;
- actual-size Cafe `2000:3 / 794×1123`: PASS;
- Cafe visible native text: `20`;
- Cafe visible text collisions: `0`;
- Cafe 18px text safe-area risks: `0`;
- image geometry/hash changes from GK: `0`.

Final all-six-preferred readback after GL promotion:

- preferred spreads: `6` / physical pages: `12`;
- text collisions across all 12 preferred pages: `0`;
- 18px text safe-area risks across all 12 preferred pages: `0`;
- visible implementation/proof/placeholder leakage: `0`;
- visible IMAGE roles: `29`;
- unique image hashes: `8`.

Decision: `ADOPTED / VERIFIED_LOCAL`.

Evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GL-CAFE-02-CONTROLLED-NUMBER-PHOTO-OVERLAP-QA-2026-08-20.md`

Asset reconciliation:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GU-HA-GW-GV-GL-GQ-ACTIVE-ASSET-RECONCILIATION-2026-08-20.json`

Feedback:
`docs/wedding-design-learning-feedback-log.append/2026-08-20-rurubu-v6-gl-cafe-02-controlled-overlap.md`

Learning:
`docs/design-learning/rurubu-shared-learning-feed.append/2026-08-20-rsl-148-controlled-ordinal-photo-overlap.md`

## Same-run prior verified progress — HA Q02/Q03 cream editorial beat

HA `1996:99` superseded GT by replacing the UI-like shared navy Q02/Q03 band with native cream-paper interview beats and one minimal rule. Q02/Q03 are native vertical Auto Layout stacks; realistic long-copy proof grows both to `100px` with collisions `0`, safe risks `0`, and `13px` minimum stack-to-photo clearance. The existing dining support photo remains replaceable with the same hash.

Evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V6-HA-Q02-Q03-CREAM-EDITORIAL-BEAT-QA-2026-08-20.md`

Learning:
`docs/design-learning/rurubu-shared-learning-feed.append/2026-08-20-rsl-147-cream-interview-beat-after-band-subtraction.md`

## Other same-day verified progress

- GK replaced generic closing microcopy with reader-facing Japanese editorial copy before being superseded by GL.
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
- RSL-147 and RSL-148 are `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`, not cross-item verified and not project-wide visual rules.

## Drive / asset truth

Drive root reverified after GL promotion:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Latest run:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- HA adopted + visually verified: YES;
- GL adopted + visually verified: YES;
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

`V6 GU + HA/GW + GV + GL + GQ = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_LIVE_VERIFIED / ALL_12_CURRENT_PAGES_COLLISION_AND_SAFE_AREA_CLEAN / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read exact live preferred IDs and parent page before every write.
3. Compare all six preferred spreads at the same scale before choosing the next defect.
4. Keep all-page structure QA after visual changes; thumbnail plausibility is not sufficient.
5. Continue removing UI-like filled containers only where contrast/grouping can be replaced by native hierarchy and a legitimate visual anchor.
6. For variable interview/profile copy, require native Auto Layout plus realistic Japanese long-copy stress after material movement.
7. Keep unresolved facts at authoritative precision; never invent dates/details for visual completeness.
8. Do not chase photo-diversity counts with semantically false assets; current photo-pool breadth remains an open visual ceiling.
9. Keep generated section masters unadopted until quality-preserving transport materially improves.
10. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
