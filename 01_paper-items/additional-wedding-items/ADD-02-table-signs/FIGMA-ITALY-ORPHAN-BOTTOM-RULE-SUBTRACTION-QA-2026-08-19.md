# ADD-02 Italy — orphan bottom-rule subtraction QA

Date: 2026-08-19
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ITALY_ORPHAN_RULE_SUBTRACTION_PASS / LEGACY_AND_ROLLBACK_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `1dfd84e8a46dd4e227b2aeebe864f0b11be19522`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- Italy production: `2:11 / FRAME_TABLE_SIGN_ITALY`
- Drive folder: `ADD-02_11卓の国別テーブルサイン` / `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`
- current shared print-grain master remains `1x4N7LUsJiPI93hU__BA8WYnasDw9QNT7 / ADD-02_ARCHIVAL_PRINT_GRAIN_MASTER_v1.png`.

## Visible problem

Fresh Italy actual-size review found a short brown `V2_BOTTOM_RULE` floating in the lower-left field below the country note. The composition already had a strong vertical lower register, an olive-branch line illustration, large table number `02`, architectural hero and masonry lines. The extra short horizontal rule did not bind text, identify a physical trim/safe role, underline the table number, or represent a route. It read as orphan stationery/template decoration.

The olive branch and architectural construction were retained because they are destination-specific visual roles rather than generic UI furniture.

## Bounded comparison

Rollback-safe comparison:

- `91:2 / QA / ADD-02 ITALY / ORPHAN BOTTOM RULE SUBTRACTION / 2026-08-19`

Only `V2_BOTTOM_RULE` was hidden. Country hero, architecture/openings, masonry print lines, olive branch, Japanese country name, semantic country-note placeholder, vertical lower register, `02`, print grain and frame geometry were unchanged.

Whole/reading comparison result: stronger. The lower cream field becomes quieter and lets the vertical register, olive branch and table number form the intended asymmetric triangle without an unrelated extra line.

## Promotion / rollback

Promoted to Italy production:

- production `21:239 / V2_BOTTOM_RULE` hidden.

Hidden rollback:

- `92:2 / ROLLBACK / ADD-02 ITALY / PRE ORPHAN BOTTOM RULE SUBTRACTION / 2026-08-19`.

Comparison `91:2` hidden after promotion. Other 10 country signs were not changed.

## Three-scale / structure QA

- family/thumbnail judgment: the change reduces one template-like micro-rule without changing the family grammar;
- reading scale: PASS;
- native/actual-size Italy `1000×1480`: PASS.

Post-write readback for Italy:

- root size: `1000×1480`;
- visible native text: `4`;
- visible IMAGE fills: `1` (`IMG_PRINT_GRAIN_REPLACEABLE`);
- outside visible text: `0`;
- text collisions: `0`;
- `V2_BOTTOM_RULE` visible: `false`;
- country-specific architecture/openings/masonry, olive branch and vertical register remain visible.

## Drive / image decision

Drive authority metadata was live-read before the edit. New Drive assets: `0`. Image generation: `0`.

The defect was an orphan fixed vector/rule, not missing image depth.

## Decision

`ITALY_ORPHAN_RULE_SUBTRACTION_PASS`.

ADD-02 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. This was an item-specific cleanup, not a rule that all country signs should lose underlines/rules. France's line beneath `03`, for example, visually binds its number and was intentionally left unchanged. Legacy, other-country production, comparison and rollback/history remain preserved.