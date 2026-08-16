# Rurubu WEDDING V6 — Y + CK/CI visual QA

Date: 2026-08-17
Status: `VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Start GitHub authority: `e632d8dfa6f201f472cd048fe1452096940ae5e9`

## Scope

Rurubu WEDDING only. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ and ADD items were not inspected or mutated. Outer Y was retained. V7 remained HOLD.

## Authority re-read

Before writes the run re-read project-wide Figma quality rules, the shared-learning system and both neutral feeds, Rurubu V6 Current Status / operating system / postmortem, latest GitHub main, Drive V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`, and live Figma.

## CI — chronology photo-led clean-room comparison

### Visible problem

CH chronology still read too much like a timeline UI. The strongest cause was not photography but three large colored rectangular number blocks for `01 / 03 / 05`, plus repeated placeholder-year styling. At whole-spread scale the numbers behaved like dashboard tiles instead of editorial anchors.

### Root-cause hypothesis

The chronology already had sufficient order through native `01—06`, titles, copy and the terminal WEDDING strip. Removing the colored containers while letting number typography and photography carry the hierarchy should reduce UI-card grammar without losing sequence.

### Bounded test

CI duplicated CH as `1551:2` and changed only the chronology page. Story remained visually unchanged.

- hid `DECOR / EVENT_NUM_1_BLOCK`, `EVENT_NUM_3_BLOCK`, `EVENT_NUM_5_BLOCK`;
- kept `01 / 03 / 05` as native text, placed directly around the photographs;
- normalized unknown dummy date roles `01—04` to editable `20XX.XX` instead of inventing facts;
- Event 1 photo -> approximately `395×220`, dominant upper-right beat;
- Event 3 photo -> approximately `285×210`, central beat;
- Event 5 photo -> approximately `420×165`, wide pre-wedding beat;
- Event 2 / 4 remained smaller text-only bridge beats;
- reduced the existing bounded travel texture opacity to `9%`;
- retained the final WEDDING terminal strip and its real known date `2026.10.24`;
- no image source/hash change and no new decoration asset.

Initial structure audit found one collision between Event 4 copy and `SCENE 03`. Because the micro-caption added no necessary meaning, it was hidden rather than moving other content around it.

### Three-scale evidence

- whole spread `1551:2` at 500px: PASS; less block/card-like than CH;
- reading spread at 1200px: PASS;
- actual-size chronology `1551:27` at `794×1123`: PASS;
- native visible text: `30`;
- visible replaceable photo roles: `4`;
- text/text collision: `0` after subtraction;
- 18px text safe-area risk: `0`;
- V7 touched: `NO`.

Result: `VERIFIED_LOCAL`, promoted from study to preferred.

Rollback: CH `1548:2` -> `ROLLBACK_HIDDEN / V6_INSIDE_CH_PRE_CI_TIMELINE_UI_BLOCKS_2026_08_17`.

## CK — Profile traveler-data rail

### Visible problem

CG Profile had a strong photo hero, but the six profile facts below it still read like a form: two sparse columns of labels and values plus three short colored row bars. That mechanical data zone separated the hero from the photo cluster.

### Root-cause hypothesis

Because the six fields are semantically repeated native data, compressing them into a denser editorial rail can increase magazine rhythm while remaining editable. No decorative card or generated art is required.

### Bounded test

CK duplicated CG as `1553:79`; Q&A remained unchanged.

- hid the three form-like `PROFILE_DATA_ROW_*` bars;
- added one native-text kicker `TRAVELER DATA / 6 NOTES`;
- reorganized six labels/values into three compact editorial rows;
- labels and values remain separate native text roles;
- moved the existing three replaceable snapshots upward only; their dimensions, image sources and hashes were not enlarged/changed;
- retained the white snapshot borders because prior CJ evidence proved they serve real overlap separation.

### Three-scale / structure evidence

- whole spread at 1200px: PASS and denser than CG without added cards;
- actual-size Profile `1553:80` at `794×1123`: PASS;
- native visible text: `19`;
- replaceable photo roles: `4`;
- text/text collision: `0`;
- 18px text safe-area risk: `0`.

Dedicated long-copy proof: hidden `1553:156`.

Stress values included longer examples such as `神奈川県川崎市多摩区 / KANAGAWA`, `旅行・写真・映画・街歩き`, and `散歩してカフェを巡ってゆっくり過ごす`. With auto-height on the proof, value heights were `19 / 18 / 22 / 36 / 38 / 17px`, with collision `0` and safe-area violations `0`.

Result: `VERIFIED_LOCAL`, promoted to preferred.

Rollback: CG `1545:2` -> `ROLLBACK_HIDDEN / V6_INSIDE_CG_PRE_CK_PROFILE_FORM_RHYTHM_2026_08_17`.

## Final live readback

Preferred set after promotion:

- Outer Y `1542:2` — unchanged;
- Profile / Q&A CK `1553:79`;
- Story / chronology CI `1551:2`.

Start Here readback:

`V5 FU/FX · V6 Y + CK/CI INSIDE STUDIES · V7 HOLD`

Final programmatic readback:

- CK Profile `1553:80`: text `19`, photo `4`, collision `0`, safe `0`;
- CK Q&A `1553:116`: text `26`, photo `2`, collision `0`, safe `0`; Q&A layout/content unchanged from CG;
- CI Story `1551:3`: text `12`, photo `3`, collision `0`, safe `0`; Story unchanged from CH;
- CI Chronology `1551:27`: text `30`, photo `4`, collision `0`, safe `0`.

## Asset lifecycle truth

- newly generated image assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new raster bytes: `0`;
- image hashes changed: `0`;
- existing verified photos repositioned: `YES`;
- native variable text preserved: `YES`;
- replaceable photo semantics preserved: `YES`;
- rollback preserved: `YES`;
- generated section masters adopted: `NO`.

Drive generated masters remain authoritative-but-unadopted. The known quality-preserving binary placement blocker had no material environment change, so that failed path was not retried.

## Remaining gates

Do not call V6 complete/print-ready. Final legitimate photography, final personal copy, exact printer template, bleed/trim/fold verification, PDF preflight and physical proof remain open.