# 青春ふたりきっぷ V5 — generic subtitle / seal crosshair subtraction QA

Date: 2026-08-19
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V5_SELECTED_CANDIDATE / GENERIC_ENGLISH_SUBTITLE_SUBTRACTION_PASS / DATE_SEAL_CROSSHAIR_SUBTRACTION_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `5f41b0af2b611dca11b8c991d4691c01151ef301`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `v7rIRHv8YKQXG0LYD0I5OA`
- selected clean-room V5: `52:25 / V5 / ARCHIVAL JOURNEY COUPON / 720x250`
- Drive authority: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J / 04_青春18きっぷ風_ミンティア用シール`
- retained legacy / prior studies remain untouched.

## Visible problem

Fresh native `720×250` review found two remaining template/UI signals:

1. `TEXT / SUBTITLE / WEDDING JOURNEY TICKET` repeated the artifact meaning already carried much more strongly by the Japanese title `青春ふたりきっぷ`, route and ticket construction. At actual size it read as generic English wedding-template microcopy rather than necessary reader information.
2. The editable date seal contained an outer solid circle, inner dashed circle and a full horizontal/vertical crosshair. The two circles already communicate a stamp/seal role; the crosshair added a target/scanner UI reading without a printing, date, route or physical-registration function.

`No.1024` was retained because it is current fixed-copy authority and remains subordinate to the title/date hierarchy.

## Bounded comparison

Production was not edited during comparison.

- `59:2 / QA / V5 / NO GENERIC EN SUBTITLE / 2026-08-19`
  - hid only `TEXT / SUBTITLE`.
- `59:24 / QA / V5 / NO EN SUBTITLE + QUIETER DATE SEAL / 2026-08-19`
  - also hid only the date-seal crosshair vector.

The second comparison was stronger at native size: the Japanese title became the unequivocal first label while the circular seal remained recognizable without target-like scaffolding.

## Promotion / rollback

Before selected mutation, a full hidden rollback was created:

- `60:2 / ROLLBACK / V5 PRE EN SUBTITLE + SEAL CROSSHAIR SUBTRACTION / 2026-08-19`

Promoted changes on selected `52:25`:

- `52:32 / TEXT / SUBTITLE` → hidden;
- `52:31 / date-seal crosshair vector` → hidden.

Preserved unchanged:

- `青春ふたりきっぷ` title;
- `新郎駅 → 新婦駅 → 未来行き` route;
- `旅のはじまりは、あなたと。` phrase;
- `2026.10.24` date;
- `No.1024` fixed issue number;
- outer solid + inner dashed editable date-seal circles;
- top/right ink bands and crop cues;
- all native editable text/vector structure.

Comparison nodes `59:2 / 59:24` were hidden after promotion.

## Three-scale / structure QA

- whole / thumbnail at 500px: PASS; Japanese title + route + date remain immediate.
- reading / native-role review: PASS.
- actual size `720×250`: PASS; circular seal still reads as a print stamp without the target crosshair.

Post-write structural readback:

- visible native text: `9`;
- IMAGE fills: `0`;
- visible text outside root: `0`;
- text-to-text collisions: `0`;
- selected subtitle visible: `false`;
- selected crosshair visible: `false`;
- rollback `60:2`: hidden;
- comparison `59:2 / 59:24`: hidden.

No variable/factual copy was rasterized or baked into SVG/raster assets.

## Drive / generated asset decision

- image generation: `0`;
- Drive writes: `0`;
- Drive authority metadata was live-read immediately before the Figma edit.

The defect was redundant language and target-like vector scaffolding, not missing imagery.

## Decision

`VERIFIED_LOCAL / GENERIC_ENGLISH_SUBTITLE_SUBTRACTION_PASS / DATE_SEAL_CROSSHAIR_SUBTRACTION_PASS`.

V5 remains the selected clean-room candidate with `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. The previous 2026-08-18 microcopy evidence remains valid historical evidence for the state at that time, but this later review supersedes its decision to retain `WEDDING JOURNEY TICKET` visually.
