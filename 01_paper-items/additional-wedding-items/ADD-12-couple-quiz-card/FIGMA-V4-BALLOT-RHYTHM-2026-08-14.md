# ADD-12 新郎新婦クイズカード — V4/V4.1 ballot rhythm refinement

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / V4_1_ADAPTIVE_BALLOT / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-14

## Live authority

- starting GitHub `main` for this run: `797fff5be5df8b6afd614e2d61479ea10fb073f6`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `ADD-12 新郎新婦クイズカード`
- Figma file key: `oZ24SbwGkeAfFJcXlbxCoD`
- production front: `1:2 / ADD12/QuizCard/Front`
- production back: `1:26 / ADD12/QuizCard/Back`
- Drive folder: `ADD-12_新郎新婦クイズカード`
- Drive folder ID: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`
- Drive parent: `0ADXt8irGMFGnUk9PVA`

Drive metadata was re-read live before the Figma write and matched the registered non-Rurubu authority.

## V4 defect and revalidation finding

V4 had changed `11:52 / ADD12/Choices/Flow.itemSpacing` from `28` to `42` to reduce the large inactive lower field on short placeholder copy. Fresh long-copy readback proved that a fixed `42px` cadence was not robust: with four two-line options the choices flow grew to `366px`, placing the answer method at `y=572` with `48px` height inside a `580px` clipping content flow. The answer method therefore extended to `620px`, a 40px overflow.

This was treated as a real V4 regression. Prior V3 long-copy evidence was retained only as historical evidence and was not used to claim a V4 pass.

## V4.1 adaptive ballot correction

Rather than reverting to the tighter V3 rhythm, V4.1 changes the choices flow from content-hugging fixed-gap spacing to a bounded adaptive field:

- production flow: `11:52 / ADD12/Choices/Flow`
- `primaryAxisSizingMode`: `AUTO → FIXED`
- fixed flow height: `270px`
- `primaryAxisAlignItems`: `MIN → SPACE_BETWEEN`
- stored `itemSpacing=42` remains non-authoritative while `SPACE_BETWEEN` distributes the available field

This preserves generous spacing for short 30px rows while automatically reducing inter-row gaps when options wrap to 60px. It improves the short-copy ballot rhythm without sacrificing long-copy robustness.

A fresh hidden rollback of the pre-adaptive V4 production front was created before mutation:

- `20:2 / ROLLBACK_ADD12_FRONT_PRE_ADAPTIVE_BALLOT_V41_2026_08_14`

Earlier rollback remains available:

- `18:2 / ROLLBACK_ADD12_FRONT_PRE_BALLOT_RHYTHM_V4_2026_08_14`

No wording, facts, answer, choice count, font size, hand-mark geometry, semantic role, color, image, or back-side content changed.

## Fresh visual QA

Production `1:2` was rendered at native `620 × 875` after the adaptive change.

Observed result:

- short placeholder rows still occupy the card with deliberate ballot rhythm;
- the four options remain equal-weight and easy to hand-mark;
- the lower field no longer looks like unused template space;
- proof metadata remains visually subordinate through the previously verified placeholder hierarchy treatment;
- Japanese title/question hierarchy, footer date and physical stationery feel remain intact;
- no new decoration, UI card treatment or imagery was introduced.

## Long-copy stress PASS

Stress authority:

- `18:27 / QA_ADD12_V4_BALLOT_RHYTHM_LONG_COPY_2026_08_14`
- `18:38 / ADD12/Choices/Flow`

The hidden stress proof was temporarily exposed only for QA, rendered at native `620 × 875`, then restored to `visible=false`.

The stress case contains:

- a long two-line/three-line Japanese question;
- four materially longer Japanese options, each at `60px` row height;
- a longer answer-method placeholder.

Post-fix structural readback:

- stress content flow: `580px`, `clipsContent=true`
- stress choices flow: `270px`, `FIXED`, `SPACE_BETWEEN`
- row positions/heights: `0/60`, `70/60`, `140/60`, `210/60`
- effective long-copy inter-row gaps: `10px`
- final choice bottom: `270px`
- answer method: `y=476`, `height=48`, bottom=`524`
- answer method fits inside `580px` content flow: `PASS`

The screenshot showed all four long options and the answer-method copy fully visible with no collision or clipping.

## Production structure readback

Front `1:2`:

- size: `620 × 875`
- `clipsContent=true`
- native text: `10`
- IMAGE fills: `0`
- text outside root: `0`
- `ADD12/Question/ContentFlow`: `580px`, native vertical auto-layout
- `ADD12/Choices/Flow`: `270px`, fixed-height native vertical auto-layout using `SPACE_BETWEEN`

Back `1:26` remains unchanged from the verified V3 authority, including its native open ruled message field.

No flattening or raster replacement was introduced.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The defect was layout adaptability, not missing imagery. Generated media would compete with the quiz/ballot function. Drive asset writes: `0`.

## Deferred finalization

Authoritative question/correct answer, final choice count, collection method/deadline, prize rules, anonymity policy, result announcement timing, optional QR response method, final back wording and printer/physical proof remain `BLOCKED_REQUIRED_INPUT` or `DEFERRED_FINALIZATION` as previously recorded.

## Result

- V4 fixed-gap regression: `FOUND`
- V4.1 adaptive production correction: `PASS`
- production actual-size visual QA: `PASS`
- V4.1 long-copy screenshot QA: `PASS`
- V4.1 long-copy structure QA: `PASS`
- native semantic editability: `PASS`
- rollback: `PASS`
- Drive authority readback: `PASS`
- image generation: `NOT_REQUIRED`
- completion: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`
- print-ready: `NO`
