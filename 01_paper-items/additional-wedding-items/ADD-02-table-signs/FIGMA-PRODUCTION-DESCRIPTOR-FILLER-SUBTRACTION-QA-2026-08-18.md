# ADD-02 — production descriptor filler subtraction QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_POLISHED / DESCRIPTOR_FILLER_SUBTRACTION_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-18
Start authority SHA: `1c0d8caf17f0cb6776f6d62614aa55c5a85f3d5d`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production roots: `2:2`, `2:11`, `2:20`, `2:29`, `2:38`, `2:47`, `2:56`, `2:65`, `2:74`, `2:83`, `2:92`
- Drive folder: `ADD-02_11卓の国別テーブルサイン` / `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`
- existing print-grain master remains unchanged.

## Visible problem

Fresh family and actual-size review found that ten of the eleven current production signs still printed small English descriptor lines that functioned as art-direction/template notes rather than useful guest-facing information. Examples included `DESTINATION TABLE / PACIFIC`, `HARBOR / CITY PRINT STUDY`, `TROPICAL MODERNISM / EQUATORIAL CITY`, `VOLCANIC EARTH / CARVED SHADOW / ISLAND RITUAL`, `HANJI / FOLD / CONTEMPORARY PRINT`, and `HORIZON / WATER FIELD / QUIET CURRENT`.

Country identity, Japanese country label, large table number and native semantic country-theme placeholder already carried the actual reader-facing role. The extra descriptors therefore made the family feel more like design-study sheets or a generated travel template.

## Bounded comparison

Representative rollback-safe comparisons were created before production mutation:

- Hawaii `87:2`
- Hong Kong `87:23`
- Bali `87:51`

Only the small descriptor line was hidden. Country art, main country name, Japanese label, large table number, semantic theme-note placeholder, print grain and geometry were unchanged.

All three comparisons were stronger at whole-item scale. The intended destination composition remained clear while the design-brief/template voice disappeared.

## Production change

Hidden from current production:

- Hawaii `21:216` — `DESTINATION TABLE / PACIFIC`
- France `21:275` — `DESTINATION TABLE / FRANCE`
- Spain `21:296` — `DESTINATION TABLE / IBERIA`
- Taiwan `21:322` — `DESTINATION TABLE / TAIWAN`
- Japan `21:338` — `DESTINATION TABLE / JAPAN`
- Hong Kong `21:365` — `HARBOR / CITY PRINT STUDY`
- Singapore `21:383` — `TROPICAL MODERNISM / EQUATORIAL CITY`
- Bali `21:406` — `VOLCANIC EARTH / CARVED SHADOW / ISLAND RITUAL`
- Korea `21:425` — `HANJI / FOLD / CONTEMPORARY PRINT`
- Maldives `21:446` — `HORIZON / WATER FIELD / QUIET CURRENT`

Italy had no equivalent descriptor and was intentionally left unchanged.

Eleven hidden rollback copies were created before the family edit:

`88:2`, `88:23`, `88:68`, `88:87`, `88:111`, `88:138`, `88:156`, `88:184`, `88:205`, `88:229`, `88:251`.

## Fresh family evidence

Because the older family QA board contained stale proof copy from an earlier state, a new proof was created from the live post-change production roots:

- `88:273 / QA / ADD-02 / FAMILY AFTER DESCRIPTOR SUBTRACTION / 2026-08-18`

The family screenshot passed and the QA root was hidden after inspection.

## Structural QA

All eleven current production roots remain:

- `1000×1480`
- visible native text: `4` per sign
- visible descriptor-filler matches: `0`
- visible proof-language matches: `0`
- visible text outside root: `0`
- same-parent text collision: `0`
- IMAGE fills: `1` per sign
- native editable text preserved
- legacy/rollback roots preserved

The only current IMAGE role is the existing archival print grain. A neutral intrinsic audit also confirmed that its `256×256` source is used with `TILE`, `scalingFactor=1`, so it is repeated rather than enlarged across the `1000×1480` role. No source-bounded geometry repair was required.

## Drive / image decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The screenshot-supported defect was leaked descriptor/template copy, not missing imagery. Drive authority was re-read before the edit and remained `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`. Drive writes: `0`.

## Decision

`DESCRIPTOR_FILLER_SUBTRACTION_PASS`.

The current eleven-sign production family remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`, with cleaner guest-facing hierarchy and no loss of country identity, semantic placeholders, table-number scanning or editability. Final country copy, holder/stand proof and vendor/physical print checks remain deferred.
