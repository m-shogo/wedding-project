# 青春ふたりきっぷ — Editorial Cleanup QA 2026-08-08

Status: `DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`
Current authority: GitHub latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`
Production Figma: https://www.figma.com/design/v7rIRHv8YKQXG0LYD0I5OA
Production frame: `11:2 / FRAME_LABEL / 720 × 250`
Rollback proof: `39:2 / QA_SEISHUN_FUTARI_PRE_EDITORIAL_CLEANUP_2026_08_08`

## Start authority

- Start `main`: `ea7c1792c7adb6734449c4095d7a703ec8ef33b1`.
- Non-Rurubu Current was live and `FIGMA_EDIT_ALLOWED`.
- Exact Figma production file/frame and exact Drive search results for 青春ふたりきっぷ were rechecked live.
- No RURUBU/るるぶ target was read or modified by this item-specific work.

## Highest-value visible issue

The live label still mixed a strong native Japanese ticket composition with generic/fake journey copy: `WEDDING JOURNEY TICKET`, `FOR TWO PERSONS`, `新郎駅 → 新婦駅 → 未来行き`, a gate-stamp block, and fixed-looking FROM/DEST/serial values. This weakened the sellable editorial quality and made uncertain information look factual.

## Figma change

Before editing, the complete production frame was duplicated to `99_QA` as rollback proof `39:2`.

Native production text was then cleaned up without flattening:

- subtitle → `ふたりの旅の記念きっぷ`;
- class → `2名さま`;
- route → `これまで → きょう → これから`;
- FROM value → `[出発地 · DUMMY]`;
- DESTINATION value → `[行き先 · DUMMY]`;
- serial → `[管理番号 · DUMMY]`;
- decorative gate stamp/text `11:85` / `11:86` → hidden non-destructively.

The first placeholder pass wrapped the FROM value to two lines, so it was immediately shortened to the explicit semantic dummy above and screenshot QA was repeated.

## Screenshot QA

Post-edit whole-item screenshot was captured at the frame's natural `720 × 250` size after the wrap fix. The production surface remains a restrained rail-ticket composition: Japanese title and route hierarchy dominate; the removed gate stamp no longer competes at lower right; variable facts remain visibly replaceable rather than masquerading as final information.

## Structure readback

- production frame remains `11:2 / FRAME_LABEL / 720 × 250`;
- `clipsContent=true`;
- title/subtitle/route/facts/serial remain native editable text;
- route group and ticket geometry remain native;
- gate stamp/text remain present but `visible=false` for non-destructive rollback;
- full pre-edit frame exists in `99_QA` as `39:2`;
- no flattening, raster replacement, or destructive crop was introduced.

## Drive

Drive search live-resolved the 青春ふたりきっぷ reference/current materials, including `04_青春ふたりきっぷ風｜参考画像ギャラリー・分析` (`1Uxxj8BWXcVFbrE3cc-DPxm15O6lIDVo37xbRhn1Kgjs`). No screenshot-supported asset defect required a Drive write, so Drive change is none.

## Completion decision

The earlier structure, microtype, variable-text stress, print-geometry, and contrast QA already passed. This run closed the remaining obvious AI/template/fake-data issue while preserving native editability and rollback evidence. Remaining work is formal/physical rather than a reason to keep cosmetically editing the design.

Current state:

`DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / PHYSICAL_MEASUREMENT_PENDING / NOT_PRINT_READY`

## DEFERRED_FINALIZATION

- physical MINTIA application-area width/height/corner/non-adhesive-zone measurement;
- final mm size, bleed, safe area, and printer profile/minimum reproducible type/line rules;
- final wording and serial-number policy;
- 100% scale test print, adhesion test, normal-distance physical review, and final print PDF QA.

These do not block progression to ADD-01 under the non-Rurubu Current progression rule.
