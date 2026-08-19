# ADD-09 ゲストブックサイン — QA

Status: `CURRENT / CLEANROOM_V4_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PROOF_LANGUAGE_CLEANUP_PASS / INDEX_MARK_SUBTRACTION_PASS / SECONDARY_ROUTE_SUBTRACTION_PASS / INSTRUCTION_FOOT_RULE_SUBTRACTION_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-19
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current authority

- Figma file: `PjFWBpDwaQM5LfvgdqSFvU`
- selected clean-room V4: `16:3 / CLEANROOM_ADD09_V4_JOURNEY_LINE`
- long-copy stress: `17:4 / QA_CLEANROOM_ADD09_V4_LONG_COPY_STRESS` — hidden after QA
- retained legacy production: `1:3 / FRAME_ADD09_GUEST_BOOK_SIGN`
- exact Drive authority: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`

Retained production is history/rollback only. V4 is the current selected clean-room candidate.

## Current visual direction

V4 was authored from a blank frame under the zero-reuse mandate. It uses:

- Japanese headline `旅の記録に、一言を。` as the first read;
- native date `2026.10.24`;
- one large editable `VECTOR / CONTINUOUS JOURNEY LINE` as the dominant fixed-art gesture;
- lower operational roles as native guest-facing semantic placeholders;
- raster IMAGE roles `0`.

The current selected design intentionally has **one** dominant journey-line system rather than multiple competing route/index devices.

## Current refinements retained

### Guest-facing semantic placeholder cleanup

Internal authoring strings such as `[記帳案内 · LAYOUT DUMMY]` were replaced with native guest-facing semantic roles:

- `[ご記帳のご案内]`
- `[記入方法・ペンのご案内]`
- `[設置場所・補足情報]`

Evidence: `FIGMA-CLEANROOM-V4-PROOF-LANGUAGE-CLEANUP-2026-08-18.md`.

### Index-mark subtraction

The isolated top-right `VECTOR / INDEX MARK` behaved like a tab/UI artifact after the main headline, date and journey line already established the hierarchy. Bounded comparison removed it from selected V4 and long-copy proof.

Live readback:

- selected `16:5 / VECTOR / INDEX MARK`: hidden;
- stress `17:6 / VECTOR / INDEX MARK`: hidden.

Evidence: `FIGMA-CLEANROOM-V4-INDEX-MARK-SUBTRACTION-2026-08-18.md`.

### Secondary-route subtraction

The lower secondary dotted route/endpoints competed with the main continuous journey line and made the page read more like an infographic/map system. Bounded comparison removed that secondary route while retaining the primary continuous line and its meaningful open nodes.

Evidence: `FIGMA-CLEANROOM-V4-SECONDARY-ROUTE-SUBTRACTION-2026-08-18.md`.

### Instruction foot-rule subtraction — 2026-08-19

Fresh whole-item / reading / actual-size review found a full-width thin dark rule between the lower operational note and footer placeholder. The lower block was already grouped by the rust vertical instruction index, three native Japanese text roles and shared alignment, so the horizontal line had little binding value and read like a form/input separator.

Rollback-safe comparison:

- `26:2 / QA_ADD09_V4_NO_INSTRUCTION_FOOT_RULE_2026_08_19`

The comparison changed only `VECTOR / FOOT RULE` visibility and was stronger at whole-item scale.

Adopted state:

- selected `16:3`: `16:20 / VECTOR / FOOT RULE` hidden;
- stress `17:4`: `17:21 / VECTOR / FOOT RULE` hidden;
- selected pre-change rollback `27:2` hidden;
- stress pre-change rollback `27:22` hidden;
- comparison `26:2` hidden after adoption.

During long-copy review, stale internal `LAYOUT DUMMY` text was also found in the hidden stress proof. A dedicated rollback `29:2` was preserved and stress nodes `17:19 / 17:20 / 17:22` were replaced with equally demanding native Japanese semantic long-copy while preserving their text-box heights (`76 / 58 / 17 px`). Visible proof-language is now `0`.

Detailed evidence: `FIGMA-V4-INSTRUCTION-FOOT-RULE-SUBTRACTION-QA-2026-08-19.md`.

## Fresh live QA — 2026-08-19

Post-adoption visual QA:

- whole-item ~500px: PASS;
- reading ~1000px: PASS;
- selected actual-size `1000×1419`: PASS;
- long-copy actual-size `1000×1419`: PASS; stress returned hidden afterward.

Current visual read:

- Japanese headline is immediate;
- date remains secondary but readable;
- the single continuous line reads as one editorial gesture rather than multiple UI routes;
- lower semantic instructions remain grouped by the rust vertical index and typography without a form-like horizontal divider;
- no card/dashboard containment, shadow, gradient, raster filler or proof-language is visible.

Live structure readback:

- selected `16:3`: visible native text `5`, text outside root `0`, proof-language `0`, IMAGE fills `0`;
- stress `17:4`: visible native text `5` when inspected, text outside root `0`, proof-language `0`, IMAGE fills `0`, hidden after QA;
- selected/stress `VECTOR / CONTINUOUS JOURNEY LINE`: visible;
- selected/stress `VECTOR / INDEX MARK`: hidden;
- selected/stress `VECTOR / FOOT RULE`: hidden;
- variable/unresolved operations remain native editable text.

A generic absolute-bounding-box detector reports the headline/date text boxes as intersecting because the headline box extends underneath the date box, but fresh actual-size screenshots show no glyph collision. This pre-existing geometry was not changed by the bounded foot-rule test.

## Hybrid / asset state

- variable/unresolved operations: native text;
- fixed journey-line art: editable vector;
- raster/image role: none required;
- image generation: `0`;
- Drive write: `0`.

The current bottleneck was redundant separator geometry and stale hidden QA copy, not missing imagery.

## Deferred finalization

Keep `NOT_PRINT_READY` until authoritative final inputs/proofs exist:

- final writing method and pen placement;
- final installation wording/location;
- printer bleed/template/profile;
- 100% physical proof and venue-distance readability.

Do not cosmetically reopen the healthy V4 unless a fresh screenshot or authoritative input exposes a concrete defect.
