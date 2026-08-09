# 青春ふたりきっぷ — Clean-room V3 Promotion QA

Date: 2026-08-10
State: `VISUAL_REOPENED / CLEANROOM_V3_CREATED / LONG_COPY_STRESS_PASS / PRODUCTION_PROMOTED / SELLABLE_VISUAL_QA_PASS / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before this evidence write: `dd4f9ea2c6c3a1e8dce9da525ee505ea31ebb564`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Current state: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `v7rIRHv8YKQXG0LYD0I5OA`
- production frame: `11:2 / FRAME_LABEL / 720 × 250`
- clean-room V3: `43:2 / QA_SEISHUN_FUTARI_CLEANROOM_V3_READABLE_EDITORIAL_2026_08_10`
- long-copy stress: `43:138 / QA_SEISHUN_FUTARI_CLEANROOM_V3_LONG_COPY_STRESS_2026_08_10`
- rollback proof: `44:2 / ROLLBACK_SEISHUN_FUTARI_PRE_V3_PROMOTION_2026_08_10`
- Drive authority folder: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J / 04_青春18きっぷ風_ミンティア用シール`

The prior `DESIGN_QA_PASS_WITH_PLACEHOLDERS` remains structural/history evidence. This file records the reopened sellable visual decision only.

## V2 blocker resolved

V2 had materially improved the visual direction but its long-copy stress proof required 8.5px departure/destination microtype. That was considered too small for a convincing actual-ticket result and blocked promotion.

V3 keeps the strong clean-room art direction while rebuilding the lower information architecture for actual-size readability:

- facts container expanded vertically from the earlier 50px region to 64px;
- departure value widened to 205px;
- destination value widened to 250px;
- departure/destination values use 10.5px native text with 13px line height and up to 40px vertical room;
- labels use 9.5px native text;
- date remains 15px;
- semantic management number remains separately editable at 8.5px and has 26px vertical room;
- no image was added to solve a typography problem.

## Long-copy stress proof

`43:138` uses explicit semantic dummies only:

- `[長い出発地名レイアウト確認 · LAYOUT DUMMY]`
- `[長い行き先名レイアウト確認 · LAYOUT DUMMY]`
- `[長い管理番号確認 · LAYOUT DUMMY]`

Actual 720 × 250 screenshot review shows:

- departure wraps cleanly without colliding with destination;
- destination remains inside its region;
- management-number stress stays inside the ticket;
- title, route line, metadata and the lower facts retain clear hierarchy;
- no text escapes the root frame.

Structural readback for both production `11:2` and stress `43:138`:

- text nodes: 19 total; 17 visible;
- IMAGE fills: 0;
- text outside root: 0;
- minimum visible production font: 8.5px for secondary management metadata;
- departure/destination long-copy stress font: 10.5px;
- hidden legacy `DECOR_SHUKU_TEXT` / `DECOR_GATE_TEXT` remain non-rendering only and are not part of the visual design.

## Visual comparison

Compared at the real 720 × 250 ticket frame:

- old production `11:2` before promotion: heavy literal train illustration, large `祝` badge, fake `No.1024`, stronger template/clip-art impression;
- V3: Japanese serif-led title, restrained route narrative, reduced motif density, no literal train illustration, no visible large stamp, no fake serial, stronger editorial hierarchy and more credible rail-ephemera interpretation.

V3 is materially different and clearly stronger than the pre-promotion production while preserving ticket identity and semantic editability.

## Promotion

The previous production was preserved before replacement as:

`44:2 / ROLLBACK_SEISHUN_FUTARI_PRE_V3_PROMOTION_2026_08_10`

The existing production frame ID was preserved:

`11:2 / FRAME_LABEL`

The production frame now renders the V3 readable editorial composition.

## Image-generation workstream

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No generated image was claimed, stored, or placed. The screenshot-supported bottleneck was typography/information architecture, and adding a train or destination raster would have reintroduced the literal themed-template problem being removed.

## Drive

- authority folder ID: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J`
- live metadata readback confirmed the exact folder before promotion;
- Drive changes: `0` because no generated/raster asset was adopted.

## Decision

`SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS_EVIDENCE_RETAINED / PRODUCTION_PROMOTED / ROLLBACK_SAFE / NOT_PRINT_READY`

Remaining deferred finalization is physical/vendor/final-copy work only. The reopened visual pass may now progress to `ADD-01 ウェルカムボード`.