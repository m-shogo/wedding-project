# BOARDING PASS — Back Floating Lavender Tab Subtraction QA / 2026-08-23

State: `VERIFIED_LOCAL / CURRENT_UPDATED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / NOT_PRINT_READY`

## Live authority

- start/latest `main` immediately before Git write: `24ace954023267972763eac9d3f5ab6aa9e69d7e`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- hybrid authoring authority: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma file: `P2PtpMyhyZqHYe1ZBBCD13`
- Current front: `63:41 / CURRENT_SELECTED / BOARDING FRONT / BAGGAGE RIBBON` — unchanged in this test
- Current back: `63:72 / CURRENT_SELECTED / BOARDING BACK / RETURN LABEL`
- back long-copy stress: `64:33`
- Drive authority: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql / 03_航空チケット風_エスコートカード`
- Drive metadata read back live; Drive write `0`.

## Visible problem

Fresh whole-item / reading review of the Current back showed `63:76 / BACK / LAV TAB` as a detached 150×120 lavender block immediately left of the lime edge. Despite the layer name `TAB`, it did not carry copy, connect to a fold/perforation/stub, bind two information regions, or visibly behave like a detachable/inserted physical paper role.

At whole-item scale it read more like a floating UI/status tile than part of the ticket artifact. The back already has stronger physical continuity through the plum field, full-width apricot fold/footer and lime edge.

## Bounded comparison

Rollback-safe comparisons changed only lavender-tab visibility:

- normal: `74:2 / QA / BOARDING BACK / NO FLOATING LAV TAB / 2026-08-23`
- realistic long-copy: `74:13 / QA / BOARDING BACK STRESS / NO FLOATING LAV TAB / 2026-08-23`

No copy, font, position, lime edge, apricot fold, plum field, front-side design, or semantic role changed.

## Three-scale / stress result

- whole / 900px comparison: PASS — the back reads more continuously and less like a UI panel;
- reading scale: PASS — headline → message → date/place → couple-name footer hierarchy is clearer;
- native 1200×550: PASS;
- realistic long-copy stress: PASS — long message and long couple-name remain safe without the tab.

The subtraction clearly improves the specific defect and does not weaken the boarding-ticket / return-label reading.

## Production mutation and rollback

Before mutation, full hidden rollback copies were preserved:

- `75:2 / ROLLBACK / BOARDING BACK / PRE-NO-FLOATING-LAV-TAB / 2026-08-23`
- `75:13 / ROLLBACK / BOARDING BACK STRESS / PRE-NO-FLOATING-LAV-TAB / 2026-08-23`

Adopted change:

- Current back `63:72`: `BACK / LAV TAB` hidden.
- stress back `64:33`: `BACK / LAV TAB` hidden.
- completed QA comparisons `74:2 / 74:13` hidden after verification.

The Current front `63:41` and front stress `64:2` were not changed.

## Structure readback

Current back `63:72`:
- visible native text `6`;
- fixed-height text `0`;
- outside visible text `0`;
- text-text collisions `0`;
- IMAGE fills `0`;
- `BACK / LAV TAB visible=false`.

Back stress `64:33`:
- visible native text `6`;
- fixed-height text `0`;
- outside visible text `0`;
- text-text collisions `0`;
- IMAGE fills `0`;
- `BACK / LAV TAB visible=false`.

## Hybrid / image decision

- variable/factual/emotional copy: native Figma text;
- authentic ticket/perforation/stub roles remain simple native geometry;
- ambiguous detached lavender fixed geometry: removed rather than replaced;
- generated/composed raster: `0`;
- replaceable image role: `0`;
- image generation: `0`.

The diagnosed defect was detached fixed geometry, not missing hero imagery, texture, illustration, or photography.

## Learning state

`VERIFIED_LOCAL`.

This is another local application of the already evidence-backed binding-function method: a visual layer name such as `tab`, `edge`, `rail`, or `paper` does not prove that the rendered element performs that physical or reader-facing job. Whole-item reading decides whether it should remain.

Do not transfer this into a blanket rule to remove tabs or color fields. The lime edge, plum field, apricot fold, perforation and other ticket-specific structures remain because their artifact jobs are legible in context.

## Result

`CURRENT_UPDATED / FLOATING_UI_TILE_READING_REDUCED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`.
