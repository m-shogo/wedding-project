# BOARDING PASS — Back Lime Edge Subtraction QA / 2026-08-23

State: `VERIFIED_LOCAL / CURRENT_UPDATED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / NOT_PRINT_READY`

## Live authority

- start/latest `main` immediately before Git write: `c39466f70c43fc0be2da2cb505e1fe55a08df27d`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- hybrid authoring authority: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma file: `P2PtpMyhyZqHYe1ZBBCD13`
- Current front: `63:41 / CURRENT_SELECTED / BOARDING FRONT / BAGGAGE RIBBON` — unchanged
- Current back: `63:72 / CURRENT_SELECTED / BOARDING BACK / RETURN LABEL`
- back long-copy stress: `64:33`
- Drive authority: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql / 03_航空チケット風_エスコートカード`
- Drive authority metadata was read back live; Drive write `0`.

## Visible problem

Fresh native-size review showed `63:75 / BACK / LIME EDGE` as a 100×408 lime rectangle on the extreme right of the back. It contained no copy and did not connect to the perforation/stub, fold, trim, binding, or another paper layer. After the previously verified removal of the floating lavender tab, this remaining edge read more like a detached status/accent rail than an essential return-label structure.

The back already retains stronger artifact structure through the plum field, the full-width apricot fold/footer, the artifact label, and the clear asymmetric information field.

## Bounded comparison

Rollback-safe comparisons changed only `BACK / LIME EDGE` visibility:

- normal: `76:2 / QA / BOARDING BACK / NO LIME EDGE / 2026-08-23`
- realistic long-copy: `76:13 / QA / BOARDING BACK STRESS / NO LIME EDGE / 2026-08-23`

No copy, font, spacing, plum field, apricot fold, front-side composition, semantic role, or factual information changed.

## Three-scale / stress result

- whole/native 1200×550: PASS — the back reads more continuously and less like a segmented UI panel;
- reading scale: PASS — headline → message → date/place → couple-name footer remains clear;
- realistic long-copy stress: PASS — long message and long couple-name remain safe after subtraction;
- visual identity regression: none observed; the return-label reading remains supported by the plum field and apricot footer/fold.

## Production mutation and rollback

Before mutation, full hidden rollback copies were preserved:

- `77:2 / ROLLBACK / BOARDING BACK / PRE-NO-LIME-EDGE / 2026-08-23`
- `77:13 / ROLLBACK / BOARDING BACK STRESS / PRE-NO-LIME-EDGE / 2026-08-23`

Adopted change:

- Current back `63:72`: `BACK / LIME EDGE` hidden.
- stress back `64:33`: `BACK / LIME EDGE` hidden.
- completed QA comparisons `76:2 / 76:13` hidden after verification.
- Current front `63:41` / front stress were unchanged.

## Structure readback

Current back `63:72`:
- visible native text `6`;
- fixed-height text `0`;
- IMAGE fills `0`;
- `BACK / LIME EDGE visible=false`.

Back stress `64:33`:
- visible native text `6`;
- fixed-height text `0`;
- IMAGE fills `0`;
- `BACK / LIME EDGE visible=false`.

## Hybrid / image decision

- variable/factual/emotional copy: native Figma text;
- authentic ticket/perforation/stub roles: retained native geometry where they remain meaningful;
- ambiguous detached lime fixed geometry: removed rather than replaced;
- generated/composed raster: `0`;
- replaceable image role: `0`;
- image generation: `0`.

The diagnosed defect was unnecessary fixed geometry, not missing hero imagery, texture, illustration, or photography.

## Learning state

`VERIFIED_LOCAL`.

This is another bounded application of the existing binding-function QA method: a layer named `edge`, `tab`, `rail`, `paper`, or similar does not prove that the rendered element performs a physical or reader-facing function. The whole artifact must justify its presence.

Do not generalize this into a blanket rule to remove color edges or tabs. The front lime date field, perforation, plum field, and apricot baggage/fold structures remain where their role is legible in context.

## Result

`CURRENT_UPDATED / DETACHED_ACCENT_RAIL_REDUCED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`.
