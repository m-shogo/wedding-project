# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-16
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_O_CURRENT / INSIDE_AM_AP_PREFERRED_STUDIES / THREE_SCALE_DUMMY_QA_VERIFIED_LOCALLY / PROFILE_VALUE_STRESS_VERIFIED / AM_LONG_ANSWER_STRESS_VERIFIED / AP_STORY_AND_CHRONOLOGY_STRUCTURE_VERIFIED / REGISTERED_PHOTO_ROLES_INTRINSIC_SAFE / PNG_MASTHEAD_VERIFIED / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

Live Figma and later evidence supersede older declarations.

## Live Figma current state

Start Here `845:27`:

`V5 FU/FX · V6 O + AM/AP INSIDE STUDIES · V7 HOLD`

Preferred:

- Outer O `1370:2 / PREFERRED / V6_OUTER_O_VERIFIED_PNG_MASTHEAD_2026_08_16`
- Profile / Q&A AM `1380:18 / PREFERRED / V6_INSIDE_AM_VERTICAL_QA_EDITORIAL_2026_08_16`
- Story / chronology AP `1384:2 / PREFERRED / V6_INSIDE_AP_DENSER_STORY_AND_CONTINUOUS_CHRONOLOGY_2026_08_16`

Rollback/comparison preserved:

- AO `1383:2` — hidden rollback after AP promotion
- AI `1363:125` — hidden rollback after AO promotion
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
- previous three-scale QA remains valid because geometry was not changed.

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

## Story / chronology AP

AP supersedes AI and AO.

### Chronology decision

The previous AI chronology gave all six events their own photo/module treatment. A first new comparison, AN `1382:132`, increased stagger but became busier and was rejected.

AO then changed the chronology model itself:

- events 01–05 use one continuous native text rail;
- only three event-specific photo anchors remain visible;
- top feature photo cluster remains;
- WEDDING becomes one full-width endpoint band;
- no new cards, shadows, gradients, badges, or generated decoration;
- final dates/titles/copy remain native editable text;
- visible photos remain replaceable IMAGE roles.

AO chronology verification:

- 500 px whole spread PASS
- 1400 px reading spread PASS
- actual chronology native `794×1123` PASS
- native text `27`
- visible IMAGE roles `6`
- text collisions `0`
- 18 px text safe-area risks `0`
- outside visible nodes `0`

### Story decision

AP retains the verified AO chronology and changes only the Story page to reduce the dead lower field:

- hero `650×455`
- support 1 `205×188`
- support 2 `300×255`
- native anchor/body copy preserved
- no new source, card, badge, shadow, gradient, or generated decoration.

AP Story verification:

- whole spread / 500 px PASS
- reading spread / 1400 px PASS
- actual Story / native `794×1123` PASS
- native text `7`
- IMAGE roles `3`
- text collisions `0`
- 18 px text safe-area risks `0`

Registered source checks:

- hero hash `539c259be8036b481d06b4f76db9a39b407d90e8`: display `650×455`, registered `1356×560`
- support 1 hash `644f449c3bf2001a94d4b822d2b55e2614c11042`: display `205×188`, registered `240×220`
- support 2 hash `c1ada11205bc3978bf426b304d683f1c1566cac2`: display `300×255`, registered `810×552`

All remain within registered intrinsic dimensions in both axes. This is not final effective-DPI print approval.

Evidence:

- `RURUBU-V6-O-AM-AP-QA-2026-08-16.md`

## Drive / generated section masters

V6 root:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`

Generated section masters remain Drive-readback verified but not visually adopted:

- Profile v2 `1IL1L8MWzaqkwVQv9CkLen4EkTccq-5cm`
- Q&A v2 `1_JmXHiTmJnRjR9Oam4gERv456yN4qjQn`
- Timeline v2 `1uRP3ri4MKw1g8_vtNDxBoazuAm4Hq3B8`
- Memories v2 `1Xi8C0KV8JfZrbx1fKttGae0Go6tsFzqG`

This run established a new partial transport fact:

- Google Drive raw download of Timeline v2 succeeded and materialized the full `1,242,829` byte PNG;
- Figma `upload_assets` generated a valid submit URL;
- binary POST still failed at DNS resolution for `mcp.figma.com`;
- no generated master was placed or adopted.

Normalized state:

`DRIVE_RAW_MASTER_REACHABLE / FIGMA_SUBMIT_DNS_BLOCKED / NO_GENERATED_DECORATION_ADOPTION`.

Per the repeated-fingerprint rule, the same submit path is not to be retried again without a material environment change.

## Asset lifecycle truth of latest pass

- newly generated images: `0`
- new Drive saves: `0`
- Drive raw Timeline master materialized: `YES`
- new external binary placement in Figma: `0`
- existing verified image roles recomposed: `YES`
- generated section decoration adopted: `NO`
- native editable copy preserved: `YES`
- three-scale visual verification: `YES`
- structure/safe-area verification: `YES`
- rollback comparisons preserved: `YES`
- V7 touched: `NO`

## Shared learning

Latest meaningful lesson:

- `RSL-032 — A chronology can read more editorially when not every event owns a photo module`
- state `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
- canonical append: `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-16-rsl-032-continuous-chronology-rail-vs-event-photo-modules.md`

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

`V6 O + AM/AP = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PROFILE_VALUE_STRESS_VERIFIED / AM_LONG_ANSWER_STRESS_VERIFIED / AP_THREE_SCALE_QA_VERIFIED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Review O + AM/AP together as one magazine system at thumbnail scale; fix only remaining visible incoherence.
2. Keep AP photo roles within registered intrinsic bounds when changing crop or size.
3. Re-run text stress only if AM or AP geometry/copy changes materially.
4. Do not retry the same Figma upload submit path without a material environment capability change.
5. Keep V7 HOLD until V6 coherence and final-content gates are genuinely closed.
