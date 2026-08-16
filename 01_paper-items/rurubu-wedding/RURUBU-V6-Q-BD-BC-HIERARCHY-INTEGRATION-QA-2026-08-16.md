# Rurubu WEDDING V6 — Q / BD / BC hierarchy integration QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
State: `Q_BD_BC_PREFERRED / VERIFIED_LOCAL / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`

## Live authority before work

- GitHub `main` observed before the first durable write: `8a536955e3ca8fe9f7cc94425c7bf472bd0565e7`
- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- prior preferred: Outer P `1397:64`, Profile/Q&A BB `1415:2`, Story/chronology AZ `1409:2`
- Drive V6 root readback: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`
- V7 remained HOLD for the whole pass.

At run start the project-wide shared system, Rurubu shared feed, neutral non-Rurubu feed and current Rurubu V6 authority were re-read. The neutral feed supplied only a hypothesis: once image/source quality is already acceptable, weak whole-item hierarchy should be repaired by integrating semantic typography with the visual field rather than by generating another richer asset.

No non-Rurubu item-specific Figma, Drive, asset, ledger or production state was inspected.

## Visible problems

Three remaining V6 defects were concrete rather than generic styling dissatisfaction:

1. **AZ chronology** — the dominant travel flatlay was strong, but `ふたりの旅年表` lived in a separate header zone. At thumbnail scale the image and the semantic page title read as independent layers, so the chronology page did not open like one travel-magazine feature.
2. **P back chronology** — the upper photo composition was strong, but the lower chronology reverted to five tiny dates attached to 5 px color rails. It read closer to a compact UI/list than magazine typography.
3. **BB profile facts** — the hero and photo cluster were strong, but one vertical rail + one horizontal rule + a two-column field matrix retained an input-form/profile-sheet feeling.

## Root-cause hypothesis

When the photo source is already acceptable, remaining editorial weakness can come from **semantic hierarchy being spatially separated from the hero** or from **native facts being organized with form-like construction geometry**.

Bounded method:

- integrate the semantic title with the dominant photo where contrast permits;
- remove rails that exist only to simulate editorial energy;
- let native date/name/value typography carry hierarchy itself;
- preserve all replaceable IMAGE roles and all editable facts;
- add no new generated/composed decoration merely to make the page look busier.

## Test A — BC Story / chronology

Source: AZ `1409:2`.

Created rollback-safe study:

- `1420:2 / V6_INSIDE_BC_CHRONOLOGY_HERO_INTEGRATION_2026_08_16`

Story page was retained. Chronology changed materially:

- top flatlay becomes a full-width `793.7 × 430` replaceable hero;
- native `ふたりの旅年表` moves onto the hero at `x=30 / y=286`, `46 px`, warm-ivory text;
- deck and editorial metadata remain native;
- 01–05 become much larger native number anchors;
- five small accent rails are hidden rather than replaced with new decoration;
- chronology photo roles remain replaceable;
- final WEDDING endpoint stays a strong dark closing field.

During QA:

- initial title/deck overlap was detected and repaired;
- initial title/support-photo edge conflict was repaired;
- the skyline event role was restored from a 250 px test width to `238 × 148` so it remains inside its known `240 × 220` source class.

### BC visual / structure result

Reviewed at:

- whole-spread / thumbnail: `500 px` screenshot;
- reading scale: full spread;
- actual chronology page: `794 × 1123`.

Final chronology structure:

- native text: `32`;
- replaceable IMAGE roles: `6`;
- text/text collisions: `0`;
- unintended text/image collisions: `0`;
- 18 px text safe-area risks: `0`;
- outside visible nodes: `0`.

Decision: **BC > AZ**. The page now opens as `photo → page title → milestones → WEDDING endpoint` rather than `header → image → chronology field`.

Promotion:

- BC `1420:2` → preferred;
- AZ `1409:2` → hidden rollback.

## Test B — Q Outer / back chronology

Source: P `1397:64`.

Created rollback-safe study:

- `1426:2 / V6_OUTER_Q_BACK_CHRONOLOGY_TYPE_HIERARCHY_2026_08_16`

Front cover was not changed.

Back chronology changes only:

- five decorative 5 px chronology rails hidden;
- their accent colors transferred to the corresponding **native date typography**;
- milestone dates enlarged and staggered into a typographic field;
- event labels remain native and editable beneath the dates;
- `2026.10.24 / WEDDING` remains a dominant dark endpoint;
- all three back-cover IMAGE roles and hashes remain unchanged.

Structure QA initially detected one small overlap between the `ふたり旅` label and the registration date. The registration block was moved down before promotion.

### Q visual / structure result

Reviewed at:

- whole outer spread;
- actual back cover `794 × 1123`;
- structural readback after the spacing repair.

Final back page:

- native text: `18`;
- replaceable IMAGE roles: `3`;
- text/text collisions: `0`;
- 18 px text safe-area risks: `0`;
- outside visible nodes: `0`.

Decision: **Q > P**. Dates now act as magazine anchors instead of tiny values attached to interface-like rails.

Promotion:

- Q `1426:2` → preferred;
- P `1397:64` → hidden rollback.

## Test C — BD Profile / Q&A

Source: BB `1415:2`.

Created rollback-safe study:

- `1430:2 / V6_INSIDE_BD_PROFILE_EDITORIAL_STATS_2026_08_16`

Q&A page geometry and its verified long-answer behavior were left unchanged.

Profile changes only:

- `PROFILE_DATA_RAIL` hidden;
- `PROFILE_NAME_RULE` hidden;
- editable `GROOM / BRIDE` moved onto the replaceable hero photo;
- six editable profile facts changed from a two-column form matrix to **3 columns × 2 rows** of typographic editorial stats;
- hero quote and all four replaceable photo roles retained;
- no new card, shadow, gradient or generated decoration added.

### BD variable-copy stress

A dedicated hidden proof was created because profile geometry changed:

- `1431:2 / QA_EVIDENCE / V6_BD_PROFILE_LONG_VALUE_STRESS_2026_08_16`

Test values included:

- `神奈川県川崎市多摩区`
- `1991年8月16日`
- `写真・旅行・カフェ巡り`
- `ラーメン・お寿司・甘いもの`
- `散歩してカフェ、たまに映画`
- `よく笑うところ、旅行好き`

Actual-size `794 × 1123` screenshot remained readable.

Stress structure:

- native text: `17`;
- replaceable IMAGE roles: `4`;
- text/text collisions: `0`;
- unintended text/image collisions: `0`;
- 18 px safe-area risks: `0`;
- page overflow: `0`.

Proof was hidden after PASS.

Decision: **BD > BB** for the current dummy-profile study. The middle page now reads as photo-led editorial profile information rather than an input form.

Promotion:

- BD `1430:2` → preferred;
- BB `1415:2` → hidden rollback;
- Q&A remains the same verified BB/BA geometry and keeps the existing Q&A long-answer proof lineage.

## Current Figma pointer

Start Here `845:27` now reads:

`V5 FU/FX · V6 Q + BD/BC INSIDE STUDIES · V7 HOLD`

Preferred roots:

- Outer Q `1426:2`
- Profile / Q&A BD `1430:2`
- Story / chronology BC `1420:2`

Preserved rollbacks:

- Outer P `1397:64`
- Profile / Q&A BB `1415:2`
- Story / chronology AZ `1409:2`

## Asset lifecycle truth

- new generated images: `0`
- new Drive saves: `0`
- new external binary placement: `0`
- existing verified IMAGE hashes reused: `YES`
- replaceable photo roles preserved: `YES`
- native editable factual copy preserved: `YES`
- generated/fixed section decoration adopted: `NO`
- three-scale visual review: `YES`
- structure / safe-area review: `YES`
- profile variable-value stress: `PASS`
- V7 touched: `NO`

Drive generated masters remain preserved but were not newly adopted. The unchanged `DRIVE_RAW_MASTER_REACHABLE / FIGMA_SUBMIT_DNS_BLOCKED` path was not retried without a capability change.

## Decision

`Q + BD/BC = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

This pass materially improves hierarchy and removes UI/form-like geometry without inventing more Figma decoration. V6 remains incomplete until final real photos/copy, exact print template, bleed/trim/fold, PDF preflight and physical proof pass.