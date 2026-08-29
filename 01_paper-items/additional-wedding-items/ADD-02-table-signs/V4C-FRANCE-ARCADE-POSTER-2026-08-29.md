# ADD-02 France — V4C Arcade Poster clean-room comparison

Date: 2026-08-29
Start/main authority immediately before Git write: `0f5d9dc94e888444db6b556998c34ecc13342edb`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
State: `V4C_CLEANROOM_CANDIDATE_CREATED / SCREENSHOT_REFINED / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / NOT_PROMOTED / NOT_PRINT_READY`

## Live authority

- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- page: `201:2 / V4B_CLEANROOM_ADD02_EDITORIAL_PRINT_2026_08_28`
- retained V4B France comparison: `203:2 / V4B / ADD-02 / TABLE 03 / FRANCE / EDITORIAL PRINT`
- new V4C France root: `228:2 / V4C / ADD-02 / TABLE 03 / FRANCE / ARCADE POSTER / CLEANROOM`
- hidden V4C long-copy proof: `228:20 / QA / V4C / ADD-02 / FRANCE / LONG COPY STRESS`
- exact Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- Drive write: `0`
- Rurubu item-specific scope: not read or modified

## Visual diagnosis and clean-room intent

Fresh screenshot review of retained V4B France `203:2` showed a calm and functional layout but the broad navy/blue fields, pink wave and thin looping line still read more like a generic abstract editorial study than an item-specific French destination poster.

V4C was built from a blank `1000×1480` frame. No old production/V2/V3/VNext/V4B layout group, ornament, card, crop or fixed-art object was cloned into the candidate. Only verified semantic roles were re-authored as native text: `TABLE 03`, `FRANCE`, `フランス`, `[国テーマ]`, `[国テーマ説明]`, `2026.10.24`.

The new direction uses an architectural-arcade poster grammar: deep-navy physical spine, cobalt upper field, asymmetric rose register block, large clipped arcade outlines in warm paper/gold, and a left-aligned lower editorial reading field. It deliberately avoids flags, Eiffel-tower cliché, fake French copy, badges, pills, equal cards and web-UI framing.

## Screenshot refinement

The first screenshot exposed a construction defect: the editorial auto-layout text boxes were fixed at `10px` height and therefore invisible. That was corrected by restoring content-height text and AUTO primary-axis sizing.

The second screenshot exposed the lower rule/date entering the navy spine. The lower anchor was moved to the same `x=154px` editorial axis as the main copy.

Long-copy stress then exposed two real failures: the description extended outside the root and the theme overlapped the date. The candidate and proof were revised together:

- destination EN `106px -> 88px`;
- editorial stack `y=760px -> 650px`;
- lower navy rule `y=1318px`;
- rose tick `y=1340px`;
- date `y=1360px`.

Final screenshot review shows the large serif destination remains the first read while the arcade field acts as fixed atmosphere rather than another card/container.

## Hybrid authoring split

- native editable text: table number, destination EN/JP, theme, description, date;
- fixed visual: editable native/vector geometry only;
- generated/raster imagery: `0`;
- IMAGE fills: `0`;
- variable copy baked into fixed art: `0`.

No Drive asset was required because the defect was composition/fixed-vector language rather than a missing image role.

## Long-copy / structure QA

Hidden proof `228:20` used:

- `FRANCE / PARIS & PROVENCE`;
- `フランス／パリ・南フランス文化エリア`;
- `[非常に長い国テーマ名プレースホルダー]`;
- a realistic multi-line Japanese explanatory stress paragraph.

Final live readback:

- visible candidate native text: `6`;
- hidden proof native text: `6`;
- candidate visible text outside root: `0`;
- proof visible text outside root: `0`;
- candidate text overlap pairs: `0`;
- proof text overlap pairs: `0`;
- IMAGE fills: `0` in both candidate and proof;
- proof destination EN height: `381px` at `88px` type;
- proof description height: `156px` at `25px` type.

The proof is hidden after verification.

## Print-first QA

Current ADD-02 physical authority remains `100 × 148 mm` on `1000×1480`, therefore the working scale is `10 Figma units/mm`.

Actual-size type equivalents:

- destination EN `88px ≈ 24.9pt`;
- destination JP `36px ≈ 10.2pt`;
- theme `28px ≈ 7.9pt`;
- description `25px ≈ 7.1pt`;
- table number `25px ≈ 7.1pt`;
- date `27px ≈ 7.7pt`.

Physical spacing/detail:

- main editorial left axis: `154px ≈ 15.4mm` from trim edge;
- date bottom clearance: about `87px ≈ 8.7mm`;
- navy spine width: `96px ≈ 9.6mm`;
- arcade strokes: `7–10px ≈ 0.7–1.0mm`;
- diagonal registration line: `6px ≈ 0.6mm`;
- lower rules: `6px ≈ 0.6mm`.

Raster/effective PPI: `N/A`; there are no raster roles, therefore no `RESOLUTION_WARNING` in this candidate.

CMYK risk remains open for deep navy, saturated cobalt, muted rose and warm gold. The hierarchy is also carried by scale, field contrast and placement rather than hue alone, but grayscale/profile proof is still required.

No bleed/safe geometry was guessed. Full-edge color fields are design intent only until the final printer template defines bleed extension and trim-safe production geometry.

## Comparison / promotion state

The retained V4B France `203:2` remains untouched and is still the promoted ADD-02 production source under the prior family evidence. This V4C root is a materially different comparison candidate, not a silent production replacement.

The V4C candidate improves destination specificity and removes the broad abstract-wave language, while maintaining stronger long-copy resilience after the live stress correction. It is suitable for the next family-wide comparison round, but ADD-02 production is not re-promoted in this evidence file.

## Deferred / print readiness

`DESIGN_COMPLETE != PRINT_READY` remains enforced.

Still deferred:

- confirmed printer template and final bleed/trim/safe geometry;
- final stock/finish and table-stand/display behavior;
- final `[国テーマ]` / `[国テーマ説明]` copy;
- CMYK/output-profile and grayscale proof;
- PDF export, font/embed, transparency/overprint/knockout preflight;
- 100% physical proof.

## Next

Continue the ordered visual audit without treating this comparison as a reason to stop. ADD-02 retains its existing production/pass evidence while V4C comparisons are evaluated; the next safe production target after ADD-02 is `ADD-03 当日タイムテーブルボード` unless a higher-priority live regression is found.