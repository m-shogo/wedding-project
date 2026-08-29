# ADD-12 — V4 `OFFSET ANSWER RIBBONS` clean-room QA — 2026-08-30

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / V4_CLEANROOM_SELECTED / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

Start / pre-write authority SHA: `8522d63680b03c27b11032b797b0eb91ac0db5d1`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md` (`VISUAL_REOPENED`)
Scope: non-Rurubu `ADD-12 新郎新婦クイズカード` only.

## V4 exclusive clean-room provenance

This V4 was authored on a fresh blank Figma page. Retained production, V2 and V3 were not duplicated, restyled, or used as component/layout sources.

Only previously verified non-visual requirements were re-authored:

- A6 portrait working size: `105 × 148 mm`;
- Figma working frame: `620 × 875 px`, approximately `5.91 px/mm`;
- front/back duplex quiz-card role;
- Japanese-first question / choice / response / name / message roles;
- unresolved facts remain native placeholders;
- no invented correct answer, prize, anonymity, response method, QR, guest identity, or venue operation.

Retained production `1:2 / 1:26` was opened only after V4 creation and QA for comparison/rollback. It remains unchanged.

## Live authority

Figma file: `oZ24SbwGkeAfFJcXlbxCoD`

- page: `73:2 / V4 / ADD-12 / QUIZ CARD / CLEANROOM / 2026-08-30`
- front: `73:3 / V4 / ADD12 / QUIZ / FRONT / OFFSET ANSWER RIBBONS / CLEANROOM`
- back: `73:30 / V4 / ADD12 / QUIZ / BACK / CORRESPONDENCE FIELD / CLEANROOM`
- front semantic content flow: `75:2 / FLOW / V4 QUIZ CONTENT / AUTO`
- front question flow: `74:2 / FLOW / QUESTION + METHOD + RULE / AUTO`
- back answer/name flow: `74:3 / FLOW / ANSWER + NAME / AUTO`
- back message/handwriting flow: `76:63 / FLOW / MESSAGE + HANDWRITING AREA / AUTO`
- hidden final front stress: `76:67`
- hidden final back stress: `76:104`

Drive authority: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ / ADD-12_新郎新婦クイズカード`.
Live Drive readback found no required production asset in the folder. Drive write: `0`.

## Reference-led visual direction

The retained production comparison is a restrained vertical radio-list form with small type and a long inactive lower field. V4 intentionally takes a different print/editorial direction:

### Front — offset answer ribbons

- coral top crop + full-height deep-navy edge establish a physical printed boundary rather than a UI card;
- large `Q.01` and Japanese serif question create a stronger first-read hierarchy;
- four answer rows use alternating offset starts and compact colored key markers, not radio controls or rounded cards;
- response method and date are anchored to the physical lower edge instead of filling space with decorative filler;
- no airplane/passport/ticket/Rurubu grammar and no meaningless badge/sticker microcopy.

### Back — correspondence field

- deep-navy top field and coral rule establish a paired but non-mirrored reverse side;
- answer and name are semantic rows rather than form cards;
- one large handwriting correspondence field follows below;
- muted teal lower-right field closes the page composition without becoming a fake control.

The V4 pair reads as a coordinated print product but is not a blind front/back template.

## Hybrid authoring split

- variable / factual / placeholder copy: native Figma text;
- dynamic copy relationships: native Auto Layout;
- fixed decoration: simple native vector/shape fields;
- reusable SVG: `0` required;
- generated raster: `0` required;
- replaceable photography: `0` required;
- IMAGE fills: `0`.

Image generation was intentionally not used because the visible bottleneck was typography, response-flow semantics, and print composition—not missing imagery.

## Defects found and repaired during V4 authoring

The live V4 QA caught multiple real structural defects before selection:

1. **fixed 10 px native-text boxes** after initial creation — all visible text was repaired to `textAutoResize=HEIGHT`;
2. **question/method fixed-Y collision risk** — converted to semantic Auto Layout;
3. **Auto Layout parent stuck at 10 px** due sizing-order behavior — repaired by restoring content-hug sizing after resize;
4. **back answer/name row clipping** — horizontal row cross-axis changed to auto content sizing;
5. **front long-copy collision between question/method and answer A** — front question + all four answer blocks were rebuilt into one semantic vertical content flow;
6. **back long message intersecting the first handwriting rule** — label, message hint and handwriting area were rebuilt into one Auto Layout flow.

These repairs are part of the V4 evidence and are not inherited claims from the older V3 pass.

## Three-scale QA

### Thumbnail / 3-second scan

PASS at approximately `227 × 320 px` render for both sides.

Front first read remains `Q.01 → question → A–D choices`; the colored answer keys do not turn into dashboard controls. Back first read remains `回答メモ → answer/name → MESSAGE`.

### Reading scale

PASS at `620 × 875 px` screenshots.

Japanese hierarchy, answer differentiation, response rows, message field and physical-page edge fields remain coherent. No generic equal rounded-card grid, center-stack template, stock travel motif, or excessive filler copy remains.

### Actual-size / print-detail

Working A6 is `105 × 148 mm`; Figma scale is approximately `5.91 px/mm`.

Front type equivalents:

- `Q.01` 72 px ≈ **34.5 pt**;
- question 30 px ≈ **14.4 pt**;
- Japanese kicker 22 px ≈ **10.6 pt**;
- answer options 18 px ≈ **8.6 pt**;
- response method 16 px ≈ **7.7 pt**;
- date 18 px ≈ **8.6 pt**.

Back type equivalents:

- title 42 px ≈ **20.1 pt**;
- support copy 18 px ≈ **8.6 pt**;
- answer/name values 20 px ≈ **9.6 pt**;
- smallest message/footer roles 16 px ≈ **7.7 pt**.

No type was reduced below these values to make the stress copy fit.

## Final long-copy stress

Final hidden proofs:

- front `76:67`;
- back `76:104`.

Materially longer Japanese question, method, all four choices, answer method, long name, long message and long collection/footer placeholders were inserted.

Final programmatic readback:

- front text outside root: `0`;
- front text/text overlap: `0`;
- front native text: `14`, auto-height `14/14`;
- front IMAGE fills: `0`;
- back text outside root: `0`;
- back text/text overlap: `0`;
- back native text: `10`, auto-height `10/10`;
- back IMAGE fills: `0`.

The final back stress screenshot was also visually checked after the message-field flow repair: long copy clears the handwriting rules.

Stress proofs were hidden after verification and remain preserved for evidence.

## Final candidate structural readback

Front `73:3`:

- visible native text: `14`;
- auto-height: `14/14`;
- fixed-height visible text: `0`;
- visible text outside frame: `0`;
- IMAGE fills: `0`;
- primary content flow `75:2`: `440 × 361 px`, vertical content-hug, unclipped.

Back `73:30`:

- visible native text: `10`;
- auto-height: `10/10`;
- fixed-height visible text: `0`;
- visible text outside frame: `0`;
- IMAGE fills: `0`;
- answer/name flow `74:3`: `440 × 114 px`, content-hug, unclipped;
- message/handwriting flow `76:63`: `390 × 276 px`, content-hug, unclipped.

## Retained-production comparison

Comparison-only screenshots were taken after V4 completion:

- old front `1:2`: restrained vertical radio-list form with much smaller hierarchy and long unused lower field;
- old back `1:26`: sparse correspondence sheet dominated by repeated horizontal rules.

V4 is a clear visual win at the reopened sellable gate because it has stronger first-read pickup, more item-specific editorial character, clearer response mechanics, less generic form/UI reading, and fresh long-copy-safe flow structure while retaining native editability.

Decision: `CLEAR_V4_WIN / SELLABLE_VISUAL_QA_PASS`.

The retained production remains untouched for comparison/rollback. This evidence does not claim printer readiness.

## Print-first result

Final physical working size: **A6 105 × 148 mm**.

Raster/effective resolution:

- production IMAGE fills: `0`;
- effective PPI: `N/A`;
- `RESOLUTION_WARNING`: none.

Physical-role checks:

- no QR is present or invented;
- no punch/perforation/fold role applies to the current A6 card geometry;
- duplex front/back orientation remains a required physical proof;
- the back handwriting field must be tested at 100% with the actual paper stock and black pen/pencil;
- final response/collection method is unresolved and remains a native placeholder.

Bleed / trim / safe:

- A6 physical trim is the current working authority;
- printer template, production bleed and printer-specific safe-area values are not yet authoritative;
- no guessed 3 mm bleed was added;
- state: `DEFERRED_FINALIZATION`.

CMYK / black / stock risk:

- deep navy and muted teal may gain density;
- coral can shift or dull;
- warm cream paper/background relationship depends on actual stock/profile;
- grayscale must preserve `Q.01 / question / choices` hierarchy;
- final black construction for small text is not asserted until printer specification exists; do not substitute rich black for small body copy by assumption.

## Deferred finalization

`DESIGN_COMPLETE != PRINT_READY` remains in force.

Still required before `PRINT_READY`:

- final question, choices and correct answer;
- actual response/collection method, deadline, anonymity and prize rules if used;
- duplex orientation and imposition proof;
- final stock and 100% pen/pencil writing proof;
- printer trim/bleed/safe template;
- CMYK/profile and black-construction proof;
- PDF export, font embedding, transparency, overprint/knockout checks;
- effective production preflight and physical proof.

## Decision / next target

`ADD-12 V4 OFFSET ANSWER RIBBONS = SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / V4_CLEANROOM_SELECTED / NOT_PRINT_READY`.

Next queue target: `ADD-13 メッセージカード`, using a new blank-frame V4 direction rather than transferring this quiz-card geometry or palette as a suite template.
