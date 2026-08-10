# ADD-17 子ども向けミニカード / ぬりえ — Design QA

Date: 2026-08-10
Authority: `docs/automation/non-rurubu-figma-quality-current.md`
Reopened visual-pass start main SHA: `f2d66130863f2b15705243d3b261217b8d2d9b9c`

## Status

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`

This status applies to the age-independent neutral editable template only. Final adoption remains blocked until authoritative child-attendance/count/age information exists.

## Live Figma authority

- file key: `PAvkRggJiRuXVypi3RgZCN`
- production page: `01_PRODUCTION`
- front: `2:2` — `ADD17/A6_FRONT/BLEED_111x154mm__PRINT_SCALE_10PX_PER_MM`
- back: `2:5` — `ADD17/A6_BACK/BLEED_111x154mm__PRINT_SCALE_10PX_PER_MM`
- format: A6 trim 105 × 148 mm, 3 mm bleed model
- no child names, ages, count, interests, venue services, QR, or other guest facts were invented

## Reopened visual audit — 2026-08-10

The previous production was structurally valid but still too sparse and worksheet-like to count as sellable visual evidence. At thumbnail scale it relied on a centered title, one large generic box, and otherwise empty paper; the back similarly read as a functional form rather than a designed wedding stationery item.

A materially different native clean-room comparison was therefore created on `99_QA`:

- section `10:2` — `QA_ADD17_CLEANROOM_VISUAL_V4_2026_08_10`
- front `10:3` — `QA_ADD17_CLEANROOM_V4_FRONT`
- back `10:15` — `QA_ADD17_CLEANROOM_V4_BACK`

V4 direction:

- Japanese-first editorial activity-card hierarchy;
- narrow teal binding rule and restrained rust registration accents;
- deliberately asymmetric drawing/writing composition rather than centered worksheet UI;
- front drawing field remains genuinely usable and large;
- back uses five quiet writing baselines plus a small optional sketch corner;
- all variable instructions remain native semantic text;
- no generated people/children/animals, stock travel motifs, badges, gradients, shadows, fake UI, or raster decoration.

Image generation was not required for this item: the screenshot-supported bottleneck was composition/typography, and a generated decorative asset would reduce editability without solving the core problem.

## Long-copy stress

V4 stress proofs:

- section `10:33` — `QA_ADD17_CLEANROOM_V4_LONG_COPY_STRESS_2026_08_10`
- front `10:34` — `QA_ADD17_V4_STRESS_FRONT`
- back `10:46` — `QA_ADD17_V4_STRESS_BACK`

Stress content used explicit `LAYOUT DUMMY` semantics and tested a multi-line activity prompt, longer margin/footer guidance, a multi-line back prompt, and a longer optional-name label. Screenshot QA passed without collisions or clipped text.

## Rollback and production promotion

Immediately before promotion, the previous production was preserved on `99_QA`:

- section `10:64` — `QA_ADD17_ROLLBACK_PRE_V4_PROMOTION_2026_08_10`
- front `10:65` — `ROLLBACK_ADD17_FRONT_PRE_V4`
- back `10:85` — `ROLLBACK_ADD17_BACK_PRE_V4`

The validated V4 visual system was then promoted while preserving the production root IDs `2:2` and `2:5`.

Post-promotion screenshot QA at whole/reading scale: PASS. The front now has a strong Japanese title, clear activity prompt, large usable drawing field and optical asymmetry. The back has a stronger writing hierarchy and no admin-form/card-grid feel.

## Structural readback

Production front/back after V4 promotion:

- native text: 5 / 7
- image fills: 0 / 0
- variable copy: native editable text
- drawing/writing fields: native vector
- hidden safe guide retained
- no flatten/raster replacement introduced

## Google Drive / generated assets

No image asset was required or adopted. Drive write count remains 0; no duplicate folder or raster was created.

## Deferred / blocked finalization

Final adoption remains `BLOCKED_REQUIRED_INPUT` until authoritative information confirms whether children attend and, if so, approximate count/age range and whether this activity is wanted or venue-provided.

Final paper/printer template, production PDF/export profile, physical 100% proof, pen/crayon usability, edge/bleed verification, and real-use handling remain `DEFERRED_FINALIZATION`.

Do not repeatedly redesign this neutral template while those inputs are missing. If later confirmed unnecessary, resolve it as `NOT_REQUIRED`; otherwise replace only confirmed semantic copy/operation fields and perform final physical print proof.
