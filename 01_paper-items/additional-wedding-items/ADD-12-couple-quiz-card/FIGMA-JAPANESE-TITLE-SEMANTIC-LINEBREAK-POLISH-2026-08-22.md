# ADD-12 新郎新婦クイズカード — Japanese title semantic line-break polish

Date: 2026-08-22
State: `CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / SEMANTIC_TITLE_LINEBREAK_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Start/latest GitHub authority immediately before evidence write: `d0da65cbbb332eb0629f45992b98ecf2336ee9d4`

## Authority

- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`.
- Figma file: `oZ24SbwGkeAfFJcXlbxCoD`.
- Current front: `59:54`.
- Current back: `59:84`.
- Hidden front long-copy stress: `59:99`.
- Exact Drive authority live-confirmed: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ / ADD-12_新郎新婦クイズカード`.
- Drive write: `0`.

## Visible problem

A fresh Current screenshot showed that the fixed Japanese title text

`ふたりのこと、 / どこまで知ってる？`

was structurally valid but optically broken by the 335 px title measure. The second phrase machine-wrapped as:

`どこまで知って / る？`

This was a different artifact from ADD-07 but the same normalized editorial failure: a short Japanese semantic phrase technically fits the text box while a grammatical ending is stranded on its own line.

Bounds-only QA did not catch it:

- native text remained auto-height;
- outside-root text was `0`;
- no image/raster involvement existed.

## Bounded comparisons

Current production was not edited while selecting the treatment.

Rollback-safe front clones:

1. `61:2 / QA / ADD-12 / TITLE ORPHAN A / SIZE40`
   - same wording and 335 px measure;
   - `42 → 40 px`;
   - still produced an awkward third-line ending;
   - `REJECTED`.
2. `61:32 / QA / ADD-12 / TITLE ORPHAN B / SIZE38`
   - same wording and measure;
   - `42 → 38 px`;
   - still produced an awkward short final line;
   - `REJECTED`.
3. `61:62 / QA / ADD-12 / TITLE SEMANTIC BREAK / 2026-08-22`
   - wording unchanged;
   - type size retained at `42 px`;
   - explicit semantic line structure:
     - `ふたりのこと、`
     - `どこまで`
     - `知ってる？`
   - screenshot PASS.

The selected method improves Japanese phrase rhythm without globally shrinking the display typography or disturbing the oversized `01` composition.

## Promotion / rollback

Pre-change front preserved hidden:

- `61:92 / ROLLBACK / ADD-12 / FRONT / PRE-SEMANTIC-TITLE-BREAK / 2026-08-22`.

Current front `59:54` now uses the same wording with the explicit semantic three-line break. Hidden long-copy stress `59:99` was updated to the same fixed-title line structure so the current typography contract and stress evidence do not drift.

Current back `59:84` is unchanged; its `答えの旅は、 / まだつづく。` break is already natural.

## Screenshot / reading QA

Post-promotion front screenshot: PASS.

The headline now reads in three intentional semantic units rather than a machine wrap. `01` remains the dominant game/punch-card gesture and the question/answer stack hierarchy is unchanged.

## Structure readback

Current front `59:54`:

- canvas `620×875`;
- visible/native text `10`;
- fixed-height text `0`;
- outside-root text `0`;
- IMAGE fills `0`;
- title `335×168`, `42 px`, `textAutoResize=HEIGHT`.

Current back `59:84`:

- canvas `620×875`;
- native text `9`;
- fixed-height text `0`;
- outside-root text `0`;
- IMAGE fills `0`.

Hidden front stress `59:99` retains native auto-height semantics and outside-root count `0` after the line-break update.

## Hybrid / asset decision

- all quiz/question/answer text remains native editable text;
- punch/card/rule geometry remains native editable geometry;
- generated raster: `0`;
- SVG added: `0`;
- image generation: not required;
- Drive write: `0`.

The defect was editorial Japanese line breaking, not missing illustration or atmosphere art.

## Decision

`SEMANTIC_TITLE_LINEBREAK_PASS`.

The existing `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` remains valid and is stronger at reading scale. No new clean-room redesign was warranted because the physical-game grammar and family-diversity result remain strong.

## Cross-item significance

This independently reproduces the ADD-07 observation in a materially different A6 quiz artifact. The transferable principle is now strong enough for `VERIFIED_CROSS_ITEM`:

**native text bounds and collision safety do not prove professional Japanese line breaking; short semantic phrases must also be reviewed for grammatical/orphan splits at reading scale.**

Do not transfer ADD-12 font size, measure, wording, punch-card layout or palette. Transfer only the Japanese editorial QA method.