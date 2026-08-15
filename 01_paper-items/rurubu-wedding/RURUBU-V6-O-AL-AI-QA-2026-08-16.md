# RURUBU WEDDING V6 — O / AL / AI Editorial QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
GitHub main immediately before this evidence write: `04ba4c4797cfe778620b69b71c07f293d8687030`
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Final live preferred studies

- Outer O: `1370:2 / PREFERRED / V6_OUTER_O_VERIFIED_PNG_MASTHEAD_2026_08_16`
- Profile / Q&A AL: `1373:2 / PREFERRED / V6_INSIDE_AL_INTRINSIC_SAFE_PROFILE_EDITORIAL_2026_08_16`
- Story / chronology AI: `1363:125 / PREFERRED / V6_INSIDE_AI_MAGAZINE_CHRONOLOGY_2026_08_16`

Start Here `845:27`:

`V5 FU/FX · V6 O + AL/AI INSIDE STUDIES · V7 HOLD`

Previous comparisons remain preserved hidden:

- Outer M `1241:2`
- Profile/Q&A AJ `1364:2`
- Profile/Q&A AK `1367:2`

V7 was not edited.

## Why AL superseded AK

AK solved the six-equal-question problem on the Q&A page, but fresh asset-ledger reconciliation exposed a different quality failure on its profile page.

AK profile main role:

- node `1367:11`
- image hash `539c259be8036b481d06b4f76db9a39b407d90e8`
- source authority: `1356×560`
- AK display: `520×735`

The displayed height exceeded source height and the actual-size screenshot visibly showed softness/pixelation. This matches the existing Rurubu failure fingerprint for enlarging a weak wide raster into a tall impact role. AK therefore remained useful Q&A evidence but was not retained as the final Profile/Q&A preferred study.

## AL bounded profile redesign

AL was cloned rollback-safely from AK. The Q&A page was left unchanged, preserving AK's verified feature/support hierarchy.

Only the profile page was rebuilt around the source image's real aspect ratio.

### Main photo

`PHOTO / PROFILE_MAIN_REPLACEABLE_EDITORIAL`

- node `1373:11`
- hash `539c259be8036b481d06b4f76db9a39b407d90e8`
- source: `1356×560`
- display: `650×268`
- scale mode: `FILL`

The display ratio now closely matches the source ratio and stays below intrinsic dimensions in both axes.

### Supporting replaceable photos

- snapshot 1 `1373:12`: hash `c1ada11205bc3978bf426b304d683f1c1566cac2`, `220×172`
- snapshot 2 `1373:28`: hash `439a719d73f28e8dd2889f2026cccb15f345ec63`, `178×140`
- snapshot 3 `1373:29`: hash `644f449c3bf2001a94d4b822d2b55e2614c11042`, `170×130`

All remain non-destructive IMAGE fills and within their known intrinsic dimensions.

### Editorial structure

The profile reading order becomes:

`native title → intrinsic-safe wide dominant photo → compact two-column facts → unequal three-photo memory cluster + large native pull quote`.

No new card, rounded rectangle, shadow, gradient, generated decoration or image was added.

The first AL comparison had snapshot 3 overlapping the pull quote. That intermediate state was rejected. The cluster was tightened left, the pull quote separated right, then collision QA was rerun.

## Three-scale AL visual QA

- 500 px whole spread: PASS — the horizontal hero remains dominant enough to identify the profile page, while the Q&A feature numbers survive reduction.
- 1400 px whole spread: PASS — profile photography is materially sharper than AK and the page reads as one edited travel feature rather than an oversized low-resolution photo.
- actual-size profile `1373:3`, `794×1123`: PASS — hero sharpness, facts, photo cluster and quote remain readable and separated.

## AL profile structure QA

Final profile page:

- text/text intersections: `0`
- 18 px text safe-area risks: `0`
- replaceable IMAGE roles: `4`
- main + support photos: intrinsic-safe in both axes based on registered source dimensions
- native text retained for every factual profile field and pull quote

## Variable profile-value stress

Hidden proof:

- `1374:2 / QA_HIDDEN / V6_AL_PROFILE_VALUE_STRESS_2026_08_16`
- profile page `1374:3`

Realistic longer editable values were tested:

- `神奈川県川崎市`
- `1991年8月16日`
- `写真・旅行・映画`
- `お寿司とラーメン`
- `散歩してカフェ巡り`
- `よく笑うところ`

Initial 65 px value fields produced visually poor multi-line wrapping despite structural collision count being zero. That state was rejected based on rendered screenshot truth.

Final editable value widths:

- left values: `105 px` at x `165`
- right values: `130 px` at x `420`

Fresh rendered actual-size stress review:

- all six realistic values render on one line
- text/text intersections: `0`
- 18 px safe-area risks: `0`

The stress proof was returned to hidden state after visual QA.

## Q&A continuity from AK

AL inherits the verified AK Q&A page unchanged:

- actual Q&A node in AL: same semantic roles/layout as AK
- `01 / 04` feature anchors
- `02 / 03 / 05` support beats
- `06` closing beat
- no repeated card containers

AK's hidden long-copy proof `1368:2 / 1368:30` remains valid for the unchanged Q&A geometry: six realistic two-line answers, collision `0`, safe-area risk `0`.

## Outer O continuity

Outer O remains preferred and unchanged after its three-scale QA.

Current fixed masthead:

- node `1370:55`
- authoritative PNG Drive ID `1opK9BSoL8rCeoYxuPWUyKZZsu0-Q165b`
- Figma image hash `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
- display `330×106.7`, FIT
- fresh Drive readback: PNG / 629,061 bytes

No historical SVG was used; Rurubu's PNG-only production authority remains respected.

## Story / chronology AI continuity

AI `1363:125` was not edited during the AL redesign. It remains the preferred Story/chronology study from the prior verified QA.

## Asset lifecycle truth this run

- newly generated images: `0`
- new Drive saves: `0`
- new external binary uploads: `0`
- existing verified PNG masthead placed/reused: `YES` in Outer O
- existing verified photo roles recomposed: `YES` in AL
- generated decoration adopted: `NO`
- visual verification: `YES`, three-scale for O and AL
- structure verification: `YES`
- rollback comparisons preserved: `YES`

## Decision

`V6 O + AL/AI = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

V6 is not complete. Final factual copy, real approved photography, exact printer template, bleed/fold preflight, PDF review and physical proof remain independent gates.
