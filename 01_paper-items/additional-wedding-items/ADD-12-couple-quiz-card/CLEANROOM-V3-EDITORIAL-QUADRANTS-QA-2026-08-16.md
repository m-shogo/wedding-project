# ADD-12 Clean-room V3 — Editorial Quadrants QA — 2026-08-16

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_SELECTED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

Start authority SHA: `04453f28bfe76c0bd2144317335105ae324d3896`

## Authority and clean-room boundary

This run used the latest `main`, `docs/automation/non-rurubu-figma-quality-current.md`, `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`, the neutral shared-learning system/feeds, and ADD-12 `SPEC.md` as authority.

The retained production and rejected V2 were **not opened or used as visual authoring sources** while V3 was being built and stress-tested. Only verified non-visual requirements were carried forward:

- A6 portrait, `620×875` front/back working frames;
- Japanese-first hierarchy;
- semantic question / choice / answer-method / name / message roles;
- warm ivory, deep navy, mint and low-saturation silver palette;
- editable placeholders for unresolved question / choices / response method;
- no AI-generated person imagery;
- no aviation-ticket, passport or Rurubu-specific visual grammar;
- retained production must remain unchanged.

Drive authority was live-read as `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ` (`ADD-12_新郎新婦クイズカード`). No Drive asset was required or written.

## Figma build

Figma file: `oZ24SbwGkeAfFJcXlbxCoD`

Fresh page:

- `26:2 / SELECTED / CLEANROOM / ADD-12 / V3 EDITORIAL QUADRANTS / 2026-08-16`

Production-size roots:

- front `26:3 / ADD12/QuizCard/Front/CleanroomV3`
- back `26:4 / ADD12/QuizCard/Back/CleanroomV3`

Hidden stress roots:

- front `27:51 / STRESS / ADD12 / FRONT / V3 LONG COPY`
- back `27:83 / STRESS / ADD12 / BACK / V3 LONG COPY`

No raster/image role was required. Variable/factual content stays native text. Simple functional geometry only is native Figma geometry.

## Materially different V3 grammar

The rejected V2 and retained production both converged around a left-spine + vertical ballot/radio-list silhouette. V3 deliberately avoids that grammar.

### Front — editorial answer quadrants

- no left spine;
- no vertical radio-button list;
- wide top masthead field;
- question number and serif question body as a single reading lead;
- four answer roles arranged as a 2×2 editorial field with equal answer opportunity;
- A–D are small mint labels, not radio controls;
- each option has its own handwriting-selection line, making the physical response action explicit without a circular form widget;
- answer method remains native semantic placeholder below the choice field.

The equal choice areas are intentional functional fairness, not generic UI cards: no rounded corners, shadows, pills, icons, gradients, hover-like treatment, or dashboard framing were used.

### Back — correspondence-note field

- no production-style stack of repeated horizontal message rules;
- full-width mint opening field;
- answer method, name role and message role are separated by hierarchy rather than card containment;
- one large open handwriting field replaces repeated ruled lines;
- no generated/raster decoration;
- unresolved response and identity facts remain explicit native placeholders.

## Screenshot QA before retained-production comparison

The V3 pair was visually inspected before any retained-production screenshot was opened.

### Whole-item / thumbnail

Front at 500px-long-edge:

- `新郎新婦クイズ → Q.01 → QUESTION_01 → four choices → answer method` remains legible as the first-glance hierarchy;
- the 2×2 choice field reads as one functional quiz surface rather than a vertical form;
- no obvious AI-template, ticket or admin-dashboard signal.

Back at 500px-long-edge:

- mint title field, answer information, name role and large message field remain distinguishable;
- the handwriting area is visibly dominant without turning the whole back into repeated form lines.

### Reading / native scale

Front and back were reviewed at native `620×875`. Japanese text, silver rules and mint labels remain readable; no visible clipping was found.

### Actual-size / print-layout scale

The Figma roots are the native A6 working pixel frames (`620×875`), so native screenshots are also the actual working-detail QA surface. Text and handwriting areas remain within the frame and preserve useful physical writing space.

## Long-copy stress

A hidden front/back pair was cloned only after the production clean-room pair was complete.

Front stress changed:

- question body to a multi-line Japanese sentence;
- all four choices to materially longer Japanese strings;
- answer-method placeholder to a long response / collection / deadline line.

Back stress changed:

- answer method to a long response / collection / anonymity / deadline line;
- name field to a long Japanese placeholder;
- message role to a multi-line long placeholder.

Readback result:

- front visible text outside root: `0`;
- back visible text outside root: `0`;
- both roots remain `620×875`;
- long question and all four choices remain visually separated;
- back long message label remains above the open writing area.

Result: `LONG_COPY_STRESS_PASS`.

## Retained-production comparison — opened only after V3 completion

Only after V3 screenshot QA and stress QA were complete, retained production was opened:

- front `1:2 / ADD12/QuizCard/Front`
- back `1:26 / ADD12/QuizCard/Back`

The comparison confirms V3 is materially independent from the retained silhouette:

- retained front: dark left edge + vertically stacked circular choices;
- V3 front: no edge spine, no circular choices, 2×2 editorial response field;
- retained back: repeated horizontal writing rules dominate the lower field;
- V3 back: single large open correspondence area with a different top-field hierarchy.

V3 is selected because it improves the physical response model and choice scanning while avoiding the previously detected `POST_COMPARISON_VISUAL_CONVERGENCE` fingerprint. The retained production remains untouched for rollback/history.

## Final gate

- `SELLABLE_VISUAL_QA_PASS`: PASS for the clean-room V3 candidate;
- `DESIGN_QA_PASS_WITH_PLACEHOLDERS`: PASS;
- native semantic text preserved: PASS;
- long-copy stress: PASS;
- old production overwritten/deleted: NO;
- generated image use: NOT REQUIRED;
- Drive writes: `0`;
- final question / correct answer / actual response method / prize / anonymity / QR: still unresolved and must remain deferred;
- physical 100% print, duplex orientation, trim and pen/pencil write tests: `NOT_PRINT_READY / DEFERRED_FINALIZATION`.

## Learning

Local finding: when a quiz answer set needs equal treatment, equality does **not** require radio-list UI. A bounded editorial quadrant can preserve fairness while producing a materially different paper grammar, provided the fields are justified by the response action and checked at thumbnail scale for dashboard/card reading.

State: `VERIFIED_LOCAL` for ADD-12 only. Do not promote the 2×2 geometry as a project-wide visual template.
