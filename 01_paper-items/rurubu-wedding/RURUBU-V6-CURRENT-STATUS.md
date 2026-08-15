# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-16
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_O_CURRENT / INSIDE_AM_AQ_PREFERRED_STUDIES / THREE_SCALE_DUMMY_QA_VERIFIED_LOCALLY / PROFILE_VALUE_STRESS_VERIFIED / AM_LONG_ANSWER_STRESS_VERIFIED / AQ_STORY_AND_CHRONOLOGY_STRUCTURE_VERIFIED / REGISTERED_PHOTO_ROLES_INTRINSIC_SAFE / PNG_MASTHEAD_VERIFIED / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

Live Figma and later evidence supersede older declarations.

## Live Figma current state

Start Here `845:27`:

`V5 FU/FX · V6 O + AM/AQ INSIDE STUDIES · V7 HOLD`

Preferred:

- Outer O `1370:2 / PREFERRED / V6_OUTER_O_VERIFIED_PNG_MASTHEAD_2026_08_16`
- Profile / Q&A AM `1380:18 / PREFERRED / V6_INSIDE_AM_VERTICAL_QA_EDITORIAL_2026_08_16`
- Story / chronology AQ `1387:2 / PREFERRED / V6_INSIDE_AQ_TYPOGRAPHIC_EDITORIAL_DENSITY_2026_08_16`

Rollback/comparison preserved:

- AP `1384:2` — hidden rollback after AQ promotion
- AO `1383:2` — hidden earlier rollback
- AI `1363:125` — hidden earlier rollback
- AN `1382:132` — hidden rejected overbusy chronology study
- AL `1373:2` — hidden rollback after AM promotion
- AM long-answer proof `1381:18` — hidden QA evidence

V7 remains HOLD while V6 still has meaningful work.

## Outer O

Unchanged in this run.

- node `1370:2`
- fixed masthead node `1370:55`
- PNG `rurubu_wedding_logo_A_v1.png`
- Drive `1opK9BSoL8rCeoYxuPWUyKZZsu0-Q165b`
- Figma image hash `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
- prior three-scale QA remains valid because geometry did not change.

## Profile / Q&A AM

Unchanged in this run.

- root `1380:18`
- Q&A page `1380:46`
- six native Q&A groups form one continuous interview column
- visible Q&A native text `24`
- replaceable IMAGE roles `2`
- text collisions `0`
- 18 px text safe-area risks `0`
- hidden long-answer stress `1381:18` remains authoritative because AM geometry did not change.

## Story / chronology AQ

AQ supersedes AP.

### Story decision

AQ keeps the AP photo-led model but pushes the page further toward travel-magazine editorial density without adding Figma decoration geometry.

Changes from AP:

- hero remains `650×455`;
- support 1 becomes `220×202`, still inside registered `240×220` bounds;
- support 2 becomes `338×278`, still inside registered `810×552` bounds;
- stronger native Story anchor typography;
- native photo captions on hero/support imagery;
- small native `TRAVEL NOTE / 03 SCENES` metadata in the lower field;
- no new image source, generated decoration, card, badge, shadow, gradient, or decorative Figma shape.

Story verification:

- whole spread / 1200 px PASS;
- reading spread / 1200 px PASS;
- actual Story / native `794×1123` PASS;
- native text `12`;
- IMAGE roles `3`;
- same-parent text collisions `0`;
- 18 px text safe-area risks `0`;
- outside visible text/image nodes `0`.

### Chronology decision

AQ preserves the AP continuous chronology model:

- events 01–05 remain one native text rail;
- three event-specific photo anchors remain visible;
- top feature photo cluster remains;
- WEDDING remains the full-width endpoint band.

AQ adds only native editorial typography:

- `01 — 06 / JOURNEY` route marker;
- `TRAVEL NOTE / 旅のはじまり` on the feature photo;
- `SCENE 01 / 03 / 05` micro-captions;
- slightly stronger number/date/title hierarchy;
- previous top rule hidden after typography alone proved enough binding.

Chronology verification:

- whole spread / 1200 px PASS;
- reading spread PASS;
- actual chronology / native `794×1123` PASS;
- native text `32`;
- IMAGE roles `6`;
- same-parent text collisions `0`;
- 18 px text safe-area risks `0`;
- outside visible text/image nodes `0`.

An early vertical Story side mark and an early chronology route position collided with native headline/anchor text. Structure QA caught both before promotion. The route was moved; the weak side mark was hidden.

Evidence:

- `RURUBU-V6-O-AM-AQ-QA-2026-08-16.md`
- `RURUBU-V6-O-AM-AQ-ACTIVE-ASSET-RECONCILIATION-2026-08-16.json`

## Drive / generated section masters

V6 root:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Generated section masters remain Drive-readback verified but not visually adopted:

- Profile v2 `1IL1L8MWzaqkwVQv9CkLen4EkTccq-5cm`
- Q&A v2 `1_JmXHiTmJnRjR9Oam4gERv456yN4qjQn`
- Timeline v2 `1uRP3ri4MKw1g8_vtNDxBoazuAm4Hq3B8`
- Memories v2 `1Xi8C0KV8JfZrbx1fKttGae0Go6tsFzqG`

Fresh Drive search in this run re-confirmed the V6 root and Timeline v2 presence.

Known normalized transport state remains:

`DRIVE_RAW_MASTER_REACHABLE / FIGMA_SUBMIT_DNS_BLOCKED / NO_GENERATED_DECORATION_ADOPTION`.

Per the repeated-fingerprint rule, the same failed submit path was not retried because no material environment capability change was observed.

## Asset lifecycle truth of latest pass

- newly generated images: `0`
- new Drive saves: `0`
- new external binary placement in Figma: `0`
- existing verified image roles recomposed: `YES`
- generated section decoration adopted: `NO`
- native editable copy preserved: `YES`
- native editorial captions added: `YES`
- three-scale visual verification: `YES`
- structure/safe-area verification: `YES`
- rollback comparisons preserved: `YES`
- V7 touched: `NO`

## Shared learning

Latest meaningful lesson:

- `RSL-033 — Native photo captions can add editorial density without recreating decoration geometry`
- state `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
- canonical append: `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-16-rsl-033-photo-caption-density-without-containment.md`

Feedback evidence:

- `docs/wedding-design-learning-feedback-log.append/2026-08-16-rurubu-v6-aq.md`

## Completion gate

Do not call V6 complete or print-ready until:

- final chosen outer and inside system visually cohere with final content;
- real copy and final photography replace dummy content and crop/contrast QA is rerun;
- any adopted generated/fixed decoration has quality-preserving Figma placement and provenance evidence;
- exact printer/product template is applied;
- bleed, trim, fold, safe area and page order are verified;
- PDF preflight passes;
- actual physical proof passes.

Current state:

`V6 O + AM/AQ = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PROFILE_VALUE_STRESS_VERIFIED / AM_LONG_ANSWER_STRESS_VERIFIED / AQ_THREE_SCALE_QA_VERIFIED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Review O + AM/AQ together as one magazine system at thumbnail scale; fix only remaining visible incoherence.
2. Keep AQ photo roles within registered intrinsic bounds when changing crop or size.
3. Re-run text stress only if AM or AQ geometry/copy changes materially.
4. Do not retry the same Figma upload submit path without a material environment capability change.
5. Keep V7 HOLD until V6 coherence and final-content gates are genuinely closed.
