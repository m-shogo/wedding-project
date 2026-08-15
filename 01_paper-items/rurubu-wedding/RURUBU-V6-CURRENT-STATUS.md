# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-16
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_O_CURRENT / INSIDE_AR_AQ_PREFERRED_STUDIES / AR_PROFILE_PHOTO_FIELD_QA_VERIFIED / AQ_STORY_AND_CHRONOLOGY_QA_VERIFIED / NATIVE_TEXT_AND_REPLACEABLE_IMAGE_ROLES_PRESERVED / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

Live Figma and later evidence supersede older declarations.

## Live Figma current state

Start Here `845:27`:

`V5 FU/FX · V6 O + AR/AQ INSIDE STUDIES · V7 HOLD`

Preferred:

- Outer O `1370:2 / PREFERRED / V6_OUTER_O_VERIFIED_PNG_MASTHEAD_2026_08_16`
- Profile / Q&A AR `1389:2 / PREFERRED / V6_INSIDE_AR_PROFILE_FULLBLEED_EDITORIAL_2026_08_16`
- Story / chronology AQ `1387:2 / PREFERRED / V6_INSIDE_AQ_TYPOGRAPHIC_EDITORIAL_DENSITY_2026_08_16`

Rollback/comparison preserved:

- AM `1380:18` — hidden rollback after AR promotion
- AP `1384:2` — hidden rollback after AQ promotion
- AO `1383:2`, AI `1363:125` — hidden earlier rollbacks
- AN `1382:132` — hidden rejected overbusy chronology study
- AM long-answer proof `1381:18` — hidden QA evidence; Q&A geometry remains unchanged in AR.

V7 remains HOLD while V6 still has meaningful work.

## Outer O

Unchanged in this pass.

- node `1370:2`
- PNG masthead node `1370:55`
- Drive master `1opK9BSoL8rCeoYxuPWUyKZZsu0-Q165b`
- Figma image hash `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
- prior three-scale QA remains applicable because geometry did not change.

## Profile / Q&A AR

AR supersedes AM for the profile page while intentionally retaining AM's Q&A geometry.

### Profile change

Visible defect in AM: the profile page still read as `headline → modest photo → information block`, weaker than Outer O and AQ.

AR bounded change:

- main replaceable photo widened to `793.7×328` at page width;
- six native profile fields compacted below it in two columns;
- existing three replaceable snapshots enlarged/repositioned with unequal scale and small opposing rotations;
- native pullquote brought above the snapshot cluster;
- no new photo source, generated decoration, card, badge, gradient, shadow, or rasterized copy.

Verification:

- whole spread 1200 px: PASS and visually stronger than AM;
- reading scale: PASS;
- actual profile `794×1123`: PASS;
- native text `18`;
- IMAGE roles `4`;
- same-parent text collisions `0`;
- 18 px text safe-area risks `0`.

### Q&A retained

- native text `24`;
- replaceable IMAGE roles `2`;
- same-parent text collisions `0`;
- 18 px text safe-area risks `0`;
- AM long-answer stress remains relevant because Q&A geometry did not change.

Evidence:

- `RURUBU-V6-O-AR-AQ-QA-2026-08-16.md`

## Story / chronology AQ

AQ remains preferred and unchanged in this pass.

Story:

- photo-led hierarchy with native caption metadata;
- native text `12`, IMAGE roles `3`;
- collision `0`, 18 px safe risk `0`;
- whole/read/actual-size QA previously PASS.

Chronology:

- events 01–05 remain one native timeline reading rail;
- three event-specific photo anchors plus top feature cluster;
- WEDDING full-width endpoint remains dominant;
- native text `32`, IMAGE roles `6`;
- collision `0`, 18 px safe risk `0`;
- whole/read/actual-size QA previously PASS.

## Drive / generated section masters

Fresh Drive readback confirmed:

- V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Generated section masters remain Drive-readback verified but not adopted:

- Profile v2 `1IL1L8MWzaqkwVQv9CkLen4EkTccq-5cm`
- Q&A v2 `1_JmXHiTmJnRjR9Oam4gERv456yN4qjQn`
- Timeline v2 `1uRP3ri4MKw1g8_vtNDxBoazuAm4Hq3B8`
- Memories v2 `1Xi8C0KV8JfZrbx1fKttGae0Go6tsFzqG`

Known transport state remains:

`DRIVE_RAW_MASTER_REACHABLE / FIGMA_SUBMIT_DNS_BLOCKED / NO_GENERATED_DECORATION_ADOPTION`.

The same failed upload path was not retried without a material capability/environment change.

## Asset lifecycle truth of latest pass

- newly generated images: `0`
- new Drive saves: `0`
- new external binary placement in Figma: `0`
- existing verified replaceable photo roles recomposed: `YES`
- generated section decoration adopted: `NO`
- native editable copy preserved: `YES`
- whole/read/actual-size visual verification: `YES`
- structure/safe-area verification: `YES`
- rollback comparison preserved: `YES`
- V7 touched: `NO`

## Shared learning

Latest meaningful lesson:

- `RSL-034 — Increase legitimate photo-field authority before adding decoration`
- state `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
- canonical append: `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-16-rsl-034-full-width-photo-field-before-decoration.md`

## Completion gate

Do not call V6 complete or print-ready until:

- Outer O + AR/AQ cohere with final real content as one magazine system;
- real photography and final copy replace dummy content and crop/contrast/text-stress QA is rerun;
- any adopted generated/fixed decoration has quality-preserving Figma placement and provenance evidence;
- exact printer/product template is applied;
- bleed, trim, fold, safe area and page order are verified;
- PDF preflight and physical proof pass.

Current state:

`V6 O + AR/AQ = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Review O + AR/AQ together at thumbnail scale and fix only remaining system-level incoherence.
2. Keep all enlarged AR/AQ image roles inside verified intrinsic-quality limits.
3. Re-run profile-value stress only if AR's profile field geometry or real copy changes materially; re-run Q&A long-copy stress only if Q&A geometry changes.
4. Do not retry the same generated-section binary submit path without a material environment change.
5. Keep V7 HOLD until V6 coherence and final-content gates are genuinely closed.
