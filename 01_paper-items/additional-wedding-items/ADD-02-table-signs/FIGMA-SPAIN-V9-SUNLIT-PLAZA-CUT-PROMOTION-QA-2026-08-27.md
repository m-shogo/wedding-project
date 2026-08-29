# ADD-02 Spain — V9 Sunlit Plaza Cut promotion QA — 2026-08-27

Status: `CURRENT_PROMOTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / SPAIN_V9_SUNLIT_PLAZA_CUT / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- latest `main` immediately before Git write: `4572f29c5dda8bcd5903e008fa26647b36eeee46`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- stable Spain production root: `2:29 / FRAME_TABLE_SIGN_SPAIN`
- exact Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`

## Why Spain was reopened

The previous Spain production was structurally valid but no longer met the reopened sellable visual standard. At whole-item scale it read as a layout system rather than a warm destination table sign:

- red header;
- sparse cream field;
- cobalt/saffron vertical rail;
- repeated bottom rectangles that read as UI modules rather than courtyard/tile craft.

V5/V6 and V7/V8 were already rejected under separate evidence. V7/V8 proved that removing fixed art and enlarging semantic type alone can collapse into premium-by-emptiness / generic identity-poster grammar.

## V9 clean-room premise

V9 changed premise instead of cosmetically retrying V5–V8.

Working art-direction name: `SUNLIT PLAZA CUT`.

Principle-level research input only:

- Spain Tourism `tardeo`: late-afternoon city rhythm, daylight, terraces, sharing food/conversation, relaxed social energy;
- Spain Tourism / Seville: lively streets, open spaces, colour, outdoor social life and festive atmosphere.

No tourism logo, official campaign layout, monument silhouette, tile system, arch composition or prior Spain production asset was copied.

The visual premise is one large sunlit paper/plaza cut crossing a deep warm field, with a narrow saffron light edge and a small cobalt shadow counterweight. It is intentionally one physical/editorial gesture rather than tiles, rails, cards, badges or destination icons.

## Clean-room build

A new `1000×1480` frame was created from blank on the Spain production page:

- source candidate: `193:2 / VNEXT_V9 / SPAIN / SUNLIT PLAZA CUT / CLEANROOM CANDIDATE / 2026-08-27`
- long-copy stress: `194:2 / QA / ADD-02 SPAIN / V9 SUNLIT PLAZA CUT / LONG COPY / 2026-08-27`

Allowed facts / semantic roles only:

- `SPAIN`
- `スペイン`
- `TABLE 04`
- `[国テーマ見出し]`
- `[国テーマ説明]`
- `2026.10.24`

No prior production/V5/V6/V7/V8 frame, layout group, rail, tile, arch, crop or asset was duplicated as the V9 construction source.

## Hybrid authoring split

Native Figma text:

- destination;
- Japanese label;
- table number;
- theme headline;
- theme description;
- confirmed date.

Editable fixed art:

- one SVG-derived editable vector tree: `VECTOR / FIXED ART / SUNLIT PLAZA CUT`.

Generated raster / IMAGE roles:

- generated raster: `0`;
- IMAGE fill: `0`;
- replaceable photo role: `0`.

The defect was composition/art direction, not missing photography or illustration, so image generation was not justified.

## Three-scale visual QA

### Whole-item / 500 px

PASS.

V9 removes the former UI/module reading and establishes one clear destination sign silhouette. `SPAIN`, `TABLE 04` and the large cream field remain immediate. The saffron edge supports movement/light without becoming a separate card or status rail.

### Reading / 1000 px

PASS.

Japanese headline/body have a stable editorial lane on the cream field. The top destination/table information remains clearly separate from the body. Compared with retained Current, V9 has stronger wedding warmth and less admin/layout-system grammar.

### Actual-size / native 1000×1480

PASS.

- confirmed date remains legible at `26 px`;
- headline `54 px` and body `30 px` remain subordinate to destination identity;
- no semantic text crosses the angled fixed-art boundary;
- no reader-facing information is baked into the SVG.

## Realistic long-copy stress

Stress root: `194:2`.

Tested with a two-line Japanese headline and a materially longer five-line body describing late-afternoon plaza/terrace atmosphere.

The initial automatic body wrap produced an unnatural Japanese split, so the QA proof was corrected with semantic line breaks rather than shrinking type. Final stress geometry:

- headline: `590 px` width / `140 px` height;
- description: `620 px` width / `329 px` height;
- description bottom remains clear of date and fixed-art boundaries;
- fixed-height text: `0`;
- outside text: `0`;
- IMAGE fills: `0`.

This stress proof is QA evidence only; final guest-facing theme copy remains unresolved native text.

## Family-scale comparison

Fresh comparison against HAWAII `2:2`, ITALY `2:11` and FRANCE `2:20` confirmed V9 does not merely reuse those current layout skeletons:

- HAWAII remains coastal-light / horizontal-field led;
- ITALY remains poster/rhythm led;
- FRANCE remains broadside/number-sheet led;
- SPAIN V9 uses one large diagonal sunlit-plaza/paper field.

The family resemblance is typography quality, warm print materiality and travel-wedding energy, not a repeated module system.

## Promotion

Before production mutation a complete hidden rollback was created:

- `195:2 / ROLLBACK / ADD-02 SPAIN / PRE-V9 SUNLIT PLAZA CUT / 2026-08-27`

The stable production root `2:29` was then replaced with the clean-room V9 children while preserving the root ID.

Post-promotion production structure:

- root: `2:29`, `1000×1480`;
- visible native text roles: `6`;
- all text roles `textAutoResize=HEIGHT`;
- fixed-height text: `0`;
- outside text: `0`;
- IMAGE fills: `0`;
- editable fixed-art root: `195:18`;
- editable vector-like descendants: `4`.

Candidate `193:2` and stress `194:2` were preserved hidden after promotion.

## Decision

Spain regains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`.

V9 clearly beats the retained pre-V9 Spain at whole-item / reading / actual-size scales and avoids the failure grammars of V5–V8.

## Deferred finalization

Remain `NOT_PRINT_READY` until:

- final `[国テーマ見出し]` and `[国テーマ説明]` are authoritative;
- final table stand/holder dimensions are known;
- printer bleed/trim/safe-area template is applied;
- paper stock/profile and physical proof are checked;
- venue lighting confirms pale-field / dark-red reproduction.

## Learning state

Spain-local:

`OBSERVED → ROOT_CAUSE_HYPOTHESIS → V5/V6_REJECTED → V7_REJECTED_PRE_FIGMA → V8_REJECTED_IN_FIGMA → METHOD_SWITCH → V9_TESTED_IN_FIGMA → VERIFIED_LOCAL → CURRENT_PROMOTED`.

Do not promote a cross-item visual rule from this single item. What may transfer as a hypothesis is only the decision method: when both modular fixed art and type-only subtraction fail, test whether one large item-specific material/atmosphere field can carry warmth and specificity without turning into UI or premium-by-emptiness. The actual Spain palette, angle, light field and geometry remain item-specific.
