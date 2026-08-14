# ADD-02 — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_POLISHED / TOP_TABLE_LABEL_FILLER_REMOVAL_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Current live authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- latest `main` observed immediately before this write: `29b06536929d520342915b4f279a56ba959728ca`
- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production roots: `2:2`, `2:11`, `2:20`, `2:29`, `2:38`, `2:47`, `2:56`, `2:65`, `2:74`, `2:83`, `2:92`
- Drive folder: `ADD-02_11卓の国別テーブルサイン`
- Drive ID: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`
- current Drive master: `1x4N7LUsJiPI93hU__BA8WYnasDw9QNT7 / ADD-02_ARCHIVAL_PRINT_GRAIN_MASTER_v1.png`

Historical structural/long-copy evidence remains reusable, but the status above is based on reopened live visual review rather than the old pre-Figma checklist.

## Reopened visual QA — 2026-08-14

Fresh review was performed at family/thumbnail scale and actual 1000×1480 scale.

The eleven signs remain materially different rather than flag/color swaps. Hawaii, Italy, France, Spain, Taiwan, Japan, Hong Kong, Singapore, Bali, Korea and Maldives retain distinct country-specific geometry, typography and editorial rhythm.

A remaining family-level template signal was found: every sign still repeated a small top `TABLE 01`–`TABLE 11` label even though each sign already carries a large, highly visible table number in the lower composition. At family scale the repeated English label read as redundant template filler rather than necessary guest-facing information.

### Rollback-safe production change

Before editing, all eleven production frames were duplicated into a hidden rollback section:

- `31:2 / ROLLBACK_ADD02_PRE_TOP_TABLE_LABEL_REMOVAL_2026_08_14`
- child count: 11

Production root IDs were preserved. Only these native text nodes were hidden:

- Hawaii `21:214 / TABLE 01`
- Italy `21:257 / TABLE 02`
- France `21:273 / TABLE 03`
- Spain `21:294 / TABLE 04`
- Taiwan `21:320 / TABLE 05`
- Japan `21:336 / TABLE 06`
- Hong Kong `21:363 / TABLE 07`
- Singapore `21:381 / TABLE 08`
- Bali `21:404 / TABLE 09`
- Korea `21:423 / TABLE 10`
- Maldives `21:444 / TABLE 11`

No large table number, country name, Japanese label, semantic country-description placeholder, safe guide, country-specific artwork, print-grain image role or frame geometry was changed.

## Screenshot QA

Current-production family proof:

- `31:274 / QA_ADD02_FAMILY_AFTER_TOP_TABLE_LABEL_REMOVAL_2026_08_14`
- 11 current-production clones

Result: `PASS`.

The set reads more cleanly and less like eleven instances of one travel template. The large lower table numbers remain immediately scannable, while destination-specific compositions carry more authority. Hawaii was also checked at native `1000×1480` scale after the edit and remained balanced without the redundant top label.

## Structural readback

All eleven production roots remain:

- `1000×1480`
- `clipsContent=true`
- one visible `IMG_PRINT_GRAIN_REPLACEABLE` IMAGE-fill role each
- zero text nodes outside the production root
- native editable text preserved; no flattening or raster replacement
- top `TABLE 01`–`TABLE 11` labels hidden
- rollback `31:2` hidden and intact

Visible text counts after the edit:

- Hawaii: 5 / total 7
- Italy: 4 / total 8
- France: 5 / total 7
- Spain: 5 / total 7
- Taiwan: 5 / total 7
- Japan: 5 / total 7
- Hong Kong: 5 / total 7
- Singapore: 5 / total 7
- Bali: 5 / total 7
- Korea: 5 / total 7
- Maldives: 5 / total 7

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The screenshot-supported defect was repeated English filler, not missing imagery. Existing archival print grain remains the only current Drive master and no new Drive asset was added or changed in this pass.

## Deferred finalization

Still required before print readiness:

- exact holder / stand dimensions and obstruction check
- vendor bleed / safe-area template
- actual-size physical proof
- final country-description copy where placeholders remain
- print behavior for thin rules, dark navy and pale aqua/mint under the chosen stock and venue lighting

## Current result

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_POLISHED / TOP_TABLE_LABEL_FILLER_REMOVAL_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
