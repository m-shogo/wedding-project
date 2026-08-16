# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-16
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_O_CURRENT / INSIDE_AT_AS_PREFERRED_STUDIES / AT_PROFILE_OVERLAP_EDITORIAL_QA_VERIFIED / AS_SCATTERED_CHRONOLOGY_QA_VERIFIED / NATIVE_TEXT_AND_REPLACEABLE_IMAGE_ROLES_PRESERVED / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

Live Figma and later evidence supersede older declarations.

## Live Figma current state

Start Here `845:27`:

`V5 FU/FX · V6 O + AT/AS INSIDE STUDIES · V7 HOLD`

Preferred:

- Outer O `1370:2 / PREFERRED / V6_OUTER_O_VERIFIED_PNG_MASTHEAD_2026_08_16`
- Profile / Q&A AT `1392:95 / PREFERRED / V6_INSIDE_AT_PROFILE_OVERLAP_EDITORIAL_2026_08_16`
- Story / chronology AS `1392:2 / PREFERRED / V6_INSIDE_AS_SCATTERED_CHRONOLOGY_2026_08_16`

Rollback/comparison preserved:

- AR `1389:2` — hidden rollback after AT promotion
- AQ `1387:2` — hidden rollback after AS promotion
- AM `1380:18` — hidden earlier profile/Q&A rollback
- AP `1384:2`, AO `1383:2`, AI `1363:125` — hidden earlier Story/chronology rollbacks
- AN `1382:132` — hidden rejected overbusy chronology study
- AM long-answer proof `1381:18` — hidden QA evidence; Q&A geometry remains unchanged in AT.

V7 remains HOLD while V6 still has meaningful work.

## Outer O

Unchanged in this pass.

- node `1370:2`
- PNG masthead node `1370:55`
- Drive master `1opK9BSoL8rCeoYxuPWUyKZZsu0-Q165b`
- Figma image hash `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
- prior three-scale QA remains applicable because geometry did not change.

## Profile / Q&A AT

AT supersedes AR for the profile page while intentionally retaining AR/AM Q&A geometry.

### Profile change

Visible defect in AR: the page had a strong full-width hero but the lower three replaceable photos still read as a tidy thumbnail row, and the pullquote was disconnected from the dominant image field.

AT bounded change:

- main replaceable hero remains `793.7×328`;
- move the native pullquote onto the hero as white text with one existing accent rule;
- convert the same three verified replaceable snapshots into one denser overlapping cluster with unequal sizes and small opposing rotations;
- add three small native `SCENE` metadata captions;
- add no new raster asset, generated decoration, card, badge, gradient, shadow, or rasterized factual copy.

Verification:

- whole spread / ~794 px: PASS and visually stronger than AR;
- actual profile `793.7×1122.5`: PASS;
- native text `21`;
- IMAGE roles `4`;
- same-parent text collisions `0`;
- 18 px text safe-area risks `0`.

Intrinsic correction before promotion:

- snapshot 3 source `240×220` was initially displayed `250×190`;
- corrected to `238×185` before promotion.

### Q&A retained

- native text `24`;
- replaceable IMAGE roles `2`;
- same-parent text collisions `0`;
- 18 px text safe-area risks `0`;
- existing AM long-answer stress remains relevant because Q&A geometry did not change.

Evidence:

- `RURUBU-V6-O-AT-AS-QA-2026-08-16.md`

## Story / chronology AS

AS supersedes AQ for the chronology page while retaining AQ's Story page structure.

Story:

- photo-led hierarchy with native caption metadata;
- native text `12`, IMAGE roles `3`;
- collision `0`, 18 px safe risk `0`;
- whole/read/actual-size QA remains applicable because Story geometry did not materially change.

Chronology change:

- preserve all native event facts and six replaceable IMAGE roles;
- replace AQ's single vertical 01–05 event rail with three asymmetric event columns;
- keep a few stronger scene-photo anchors between the event groups;
- preserve the dominant full-width WEDDING endpoint;
- add no new raster, card, shadow, gradient, sticker, or generated decoration.

Verification:

- whole spread / ~794 px: PASS and less list/diagram-like than AQ;
- actual chronology `793.7×1122.5`: PASS;
- native text `32`;
- IMAGE roles `6`;
- same-parent text collisions `0`;
- 18 px text safe-area risks `0`.

Intrinsic correction before promotion:

- event-3 source `240×220` was initially displayed `245×150`;
- corrected to `238×148` before promotion.

Evidence:

- `RURUBU-V6-O-AT-AS-QA-2026-08-16.md`

## Drive / generated section masters

Fresh Drive readback confirmed:

- V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`;
- Profile v2 `1IL1L8MWzaqkwVQv9CkLen4EkTccq-5cm`;
- Timeline v2 `1uRP3ri4MKw1g8_vtNDxBoazuAm4Hq3B8`.

Other generated section masters remain verified from prior evidence and not adopted:

- Q&A v2 `1_JmXHiTmJnRjR9Oam4gERv456yN4qjQn`
- Memories v2 `1Xi8C0KV8JfZrbx1fKttGae0Go6tsFzqG`

Known external transport state remains:

`DRIVE_RAW_MASTER_REACHABLE / FIGMA_SUBMIT_DNS_BLOCKED / NO_GENERATED_DECORATION_ADOPTION`.

Neutral non-Rurubu lesson `in-file raster export` was read as a capability hypothesis. It was not exercised because the current screenshot-visible defects were solved more cleanly with existing legitimate photo roles + native text; no filler raster was created merely to reproduce the capability.

## Asset lifecycle truth of latest pass

- newly generated images: `0`
- new Drive saves: `0`
- new external binary placement in Figma: `0`
- existing verified replaceable photo roles recomposed: `YES`
- generated section decoration adopted: `NO`
- native editable copy preserved: `YES`
- whole/read/actual-size visual verification: `YES`
- structure/safe-area verification: `YES`
- intrinsic/display-size verification: `YES`
- rollback comparison preserved: `YES`
- V7 touched: `NO`

## Shared learning

Latest meaningful lesson:

- `RSL-035 — Distribute repeated chronology facts spatially before adding timeline decoration`
- state `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
- canonical append: `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-16-rsl-035-spatial-chronology-distribution.md`

## Completion gate

Do not call V6 complete or print-ready until:

- Outer O + AT/AS cohere with final real content as one magazine system;
- real photography and final copy replace dummy content and crop/contrast/text-stress QA is rerun;
- any adopted generated/fixed decoration has quality-preserving Figma placement and provenance evidence;
- exact printer/product template is applied;
- bleed, trim, fold, safe area and page order are verified;
- PDF preflight and physical proof pass.

Current state:

`V6 O + AT/AS = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Review O + AT/AS together again at thumbnail scale and fix only remaining system-level incoherence; do not reopen V7 yet.
2. Keep all enlarged AT/AS image roles inside verified intrinsic-quality limits.
3. Re-run profile-value stress only if AT profile-field geometry or real copy changes materially; re-run Q&A long-copy stress only if Q&A geometry changes.
4. Do not retry the same external generated-section submit path without a material environment change.
5. Consider the neutral in-file raster fallback only when a concrete screenshot-visible fixed-decoration defect cannot be solved with legitimate photos/native text; do not create abstract raster filler.
6. Keep V7 HOLD until V6 coherence and final-content gates are genuinely closed.
