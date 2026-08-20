# Rurubu WEDDING V6 — IG 1DAY photo-overlay editorial memo QA

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`

## Source comparison

Previous preferred:

- HS `2019:2 / PREFERRED / V6_INSIDE_HS_1DAY_PHOTO_LED_TITLE_FIELD_2026_08_20`.

Candidate:

- IG `2073:2 / CANDIDATE / V6_INSIDE_IG_1DAY_PHOTO_OVERLAY_EDITORIAL_MEMO_2026_08_21`.

Whole-set comparison after ID/HU/IF/GY/IE/HS made HS the next useful bounded target. The specific weakness was not missing imagery: the left page already had a legitimate dominant Yokohama photograph, but the start block sat below it and the lower half read like a small web/data module with a two-column memo grid.

## Design hypothesis

A travel-magazine page can gain hierarchy by letting a legitimate photograph carry both atmosphere and the first route beat, then compressing secondary facts into one editorial memo field instead of multiple label/value rows. The goal is not simply to remove information; it is to change the hierarchy from `photo → separate start card/data grid` to `photo + native start overlay → compact editorial note`.

## Bounded clean-room change

IG was duplicated from HS so the right route page and all factual copy remained intact.

Left-page changes only:

1. Extended the existing verified hero photo role from 560px to 650px height; no new image was generated or uploaded.
2. Moved `START / 海辺`, `10:00`, `海辺から、旅を始める。` and its existing copy onto the photograph as native editable text.
3. Kept the original Japanese headline/deck at the top of the same photo, producing one continuous photo-led reading field rather than a photo followed by a separate start module.
4. Rebuilt the lower cream field around one large `01 / 寄り道、歓迎。` editorial note.
5. Hid only the four tiny memo labels (`移動 / ペース / おすすめ / 気分`) and retained their existing values as one compact horizontal fact line: `徒歩中心 / ゆっくり / 午後〜夜 / 寄り道歓迎`.
6. Enlarged the existing closing quote `予定どおりじゃない時間も、旅の一部。` as the lower-right editorial anchor.
7. Preserved the right page unchanged.
8. The first structure pass found one unintended intersection between `午後〜夜` and `寄り道歓迎`; the third value width was reduced and the fourth shifted before promotion.

No unresolved facts/dates were invented. Native text and replaceable image roles remain intact.

## Three-scale visual evidence

### Whole-item / thumbnail

- 500px spread: PASS.
- IG gives the left page one obvious photographic first read and removes the previous mini-dashboard/data-grid reading.
- The lower field remains quieter than the photo but still has three hierarchy anchors: cyan rule, large `01`, and the enlarged closing quote.

### Reading scale

- 1400px spread: PASS.
- Photo-overlay start title/copy remain readable against the darker lower waterfront portion.
- The four preserved memo values read as a compact travel note rather than four form fields.
- Right-page 4-stop route remains unchanged and readable.

### Actual size

- Left `2073:3 / 794×1123`: PASS.
- Right `2073:33 / 794×1123`: PASS.
- Native headline, deck, start overlay, editorial note, memo values, closing quote and folio remain legible at page size.

## Structure QA

Final IG:

### Left `2073:3`

- visible native text: `19`;
- visible IMAGE fills: `1`;
- unintended direct-page text intersections: `0`;
- 18px text safe-area risks: `0`.

### Right `2073:33`

- visible native text: `25`;
- visible IMAGE fills: `3`;
- unintended direct-page text intersections: `0`;
- 18px text safe-area risks: `0`.

Whole-page flattening: NO.
Replaceable image roles preserved: YES.
Native variable/factual text preserved: YES.

## Asset / provenance state

- newly generated assets: `0`;
- newly adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`.

The existing left hero continues using image hash `539c259be8036b481d06b4f76db9a39b407d90e8`.
The right page continues using its already verified café/street/dining image roles.
Drive V6 root was reverified before the Figma write: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Promotion / rollback

Promoted:

- IG `2073:2` → `PREFERRED / V6_INSIDE_IG_1DAY_PHOTO_OVERLAY_EDITORIAL_MEMO_2026_08_21`;
- x=`275600`, y=`1300`, visible.

Rollback retained:

- HS `2019:2` → `ROLLBACK / V6_INSIDE_HS_1DAY_PHOTO_LED_TITLE_FIELD_2026_08_20`, hidden.

Decision: `IG ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

## Regression boundaries

This result does not establish that all route information should be overlaid on photos, nor that memo labels should always be removed. The treatment worked here because the photograph had a dark/readable lower zone, the four values remain self-explanatory in this exact context, and the right page already carries detailed route structure.

Do not transfer the exact crop, overlay coordinates, value-line geometry, cyan/yellow/pink palette, photo choice or Rurubu-like visual grammar to other wedding items.

## Completion gate

IG improves the dummy-design hierarchy only. V6 is still NOT print-ready pending final legitimate photography/copy, exact page count/imposition, printer template, bleed/trim/fold/safe-area requirements, exported PDF preflight and physical proof.