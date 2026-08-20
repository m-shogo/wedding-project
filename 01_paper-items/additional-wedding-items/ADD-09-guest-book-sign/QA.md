# ADD-09 ゲストブックサイン — QA

Status: `CURRENT / CLEANROOM_V4_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / TOP_RULE_SUBTRACTION_PASS / PROOF_LANGUAGE_CLEANUP_PASS / INDEX_MARK_SUBTRACTION_PASS / SECONDARY_ROUTE_SUBTRACTION_PASS / INSTRUCTION_FOOT_RULE_SUBTRACTION_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-20
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current authority

- Figma file: `PjFWBpDwaQM5LfvgdqSFvU`
- selected clean-room V4: `16:3 / CLEANROOM_ADD09_V4_JOURNEY_LINE`
- long-copy stress: `17:4 / QA_CLEANROOM_ADD09_V4_LONG_COPY_STRESS` — hidden after QA
- retained legacy production: `1:3 / FRAME_ADD09_GUEST_BOOK_SIGN`
- exact Drive authority: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`

Drive metadata was live-read before this reconciliation. Drive write: `0`.

Retained production is history/rollback only. V4 remains the selected clean-room family.

## Current visual direction

V4 was authored from a blank frame under the zero-reuse mandate. Its current first read is:

- Japanese headline `旅の記録に、一言を。`;
- native date `2026.10.24`;
- one large editable `VECTOR / CONTINUOUS JOURNEY LINE` as the dominant fixed-art gesture;
- lower operational roles as native guest-facing semantic placeholders;
- narrow rust instruction index as a functional grouping anchor;
- raster IMAGE roles `0`.

The selected design intentionally keeps **one** dominant journey-line system rather than multiple competing route/index/separator devices.

## Current refinements retained

### Guest-facing semantic placeholder cleanup

Internal authoring strings were replaced with native guest-facing semantic roles:

- `[ご記帳のご案内]`
- `[記入方法・ペンのご案内]`
- `[設置場所・補足情報]`

Evidence: `FIGMA-CLEANROOM-V4-PROOF-LANGUAGE-CLEANUP-2026-08-18.md`.

### Index-mark subtraction

The isolated top-right index mark behaved like a tab/UI artifact after the headline, date and journey line already established hierarchy.

- selected `16:5 / VECTOR / INDEX MARK`: hidden;
- stress `17:6 / VECTOR / INDEX MARK`: hidden.

Evidence: `FIGMA-CLEANROOM-V4-INDEX-MARK-SUBTRACTION-2026-08-18.md`.

### Secondary-route subtraction

The lower dotted route/endpoints competed with the primary continuous line and pushed the page toward infographic/map UI semantics. The secondary route was removed while the main continuous line and meaningful open nodes remained.

Evidence: `FIGMA-CLEANROOM-V4-SECONDARY-ROUTE-SUBTRACTION-2026-08-18.md`.

### Instruction foot-rule subtraction — 2026-08-19

The lower operational block was already grouped by the rust instruction index, three native Japanese text roles and shared alignment. Its full-width foot rule therefore read like a form/input separator and was removed after bounded comparison.

- selected `16:20 / VECTOR / FOOT RULE`: hidden;
- stress `17:21 / VECTOR / FOOT RULE`: hidden;
- rollback selected/stress `27:2 / 27:22`: hidden;
- comparison `26:2`: hidden after adoption.

Long-copy QA also replaced stale hidden `LAYOUT DUMMY` wording with equally demanding semantic Japanese stress copy. Visible proof-language is `0`.

Evidence: `FIGMA-V4-INSTRUCTION-FOOT-RULE-SUBTRACTION-QA-2026-08-19.md`.

### Top-rule subtraction — adopted 2026-08-20

Fresh selected review found the `760×6` rust `VECTOR / TOP RULE` floating above the headline/date pair. After the earlier index, secondary-route and lower foot-rule removals, the headline/date pair and main continuous journey line already formed a complete top-to-middle hierarchy. The remaining top rule no longer bound disconnected information and had become a template separator.

Rollback-safe comparison:

- `32:2 / QA / ADD-09 V4 / NO TOP RULE / 2026-08-20`
- only top-rule visibility changed.

Adopted:

- selected `16:4 / VECTOR / TOP RULE`: hidden;
- stress `17:5 / VECTOR / TOP RULE`: hidden;
- selected/stress pre-change rollback `33:2 / 33:22`: hidden;
- comparison hidden after promotion.

The continuous journey line remains the single intentional fixed-art gesture.

Evidence: `FIGMA-V4-TOP-RULE-SUBTRACTION-QA-2026-08-20.md`.

## Fresh live visual QA — 2026-08-20

Fresh selected screenshot in this run at ~500px: PASS.

Current visual read:

- Japanese headline is immediate;
- date remains secondary but readable;
- the single continuous line has enough visual authorship without becoming route UI;
- lower semantic instructions remain grouped by the rust vertical index and typography;
- no top separator, foot separator, secondary route, index tab, card/dashboard containment, shadow, gradient, raster filler or proof-language is visible.

Existing 2026-08-20 adopted QA also passes:

- whole / ~500px-equivalent: PASS;
- reading / 705×1000: PASS;
- actual `1000×1419`: PASS;
- selected/stress native text `5 / 5`;
- selected/stress IMAGE fills `0 / 0`;
- text outside root `0 / 0`;
- visible proof-language `0 / 0`;
- stress remains hidden after QA.

A generic bounding-box detector can report headline/date boxes as intersecting because the headline box extends under the date box, but actual-size screenshots show no visible glyph collision. No change is justified from box geometry alone.

## Hybrid / asset state

- variable/unresolved operations: native editable text;
- fixed journey-line art: editable vector;
- fixed instruction index: native vector/geometry;
- generated/composed raster: `0`;
- replaceable image role: not required;
- image generation: `0`;
- Drive write: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the observed defect was redundant separator geometry, not missing imagery or texture.

## Deferred finalization

Keep `NOT_PRINT_READY` until authoritative final inputs/proofs exist:

- final writing method and pen placement;
- final installation wording/location;
- printer bleed/template/profile;
- 100% physical proof and venue-distance readability.

Do not cosmetically reopen the healthy V4 unless a fresh screenshot or authoritative input exposes a concrete defect.

Next progression target: `ADD-10 クローク / お手洗い / 会場案内サイン`.
