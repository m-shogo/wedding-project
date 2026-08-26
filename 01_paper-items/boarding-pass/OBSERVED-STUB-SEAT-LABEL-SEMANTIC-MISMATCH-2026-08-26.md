# BOARDING PASS — Stub table semantic label correction / 2026-08-26

State: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_RETAINED`

## Live authority

- latest `main` immediately before Git write: `4fafce010d0eb939b75519282ee6480aa5c2513c`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma file: `P2PtpMyhyZqHYe1ZBBCD13`
- current front/back: `63:41 / 63:72`
- front long-copy stress: `64:2`
- Drive authority: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql / 03_航空チケット風_エスコートカード`
- Drive metadata readback: PASS
- Drive write: `0`
- image generation: `0`

## Visible problem

The detachable stub used `席` above `[卓番号]`, while the main body correctly used `卓` above the same table-number role.

This was a semantic error rather than a styling preference: the stub named a wedding table-number field as a seat field and introduced unnecessary transport-authenticity semantics.

Live roles before repair:

- main table label `63:62 / TEXT / TABLE LABEL` = `卓`
- main table value `63:63 / TEXT / TABLE` = `[卓番号]`
- stub label `63:68 / TEXT / STUB SEAT LABEL` = `席`
- stub value `63:69 / TEXT / STUB TABLE` = `[卓番号]`

The same mismatch existed in front long-copy stress at `64:29`.

## Bounded comparison

Created rollback-safe comparison:

- `79:2 / QA / BOARDING FRONT / STUB LABEL 卓 CANDIDATE / 2026-08-26`

Changed only the stub label `席 → 卓`. The ticket layout, stub/perforation, table-value geometry, headline, palette and physical-artifact logic remained unchanged.

The comparison passed and was hidden after promotion.

## Adopted Figma change

Current:

- `63:68 / TEXT / STUB SEAT LABEL`: `席 → 卓`
- native `Noto Sans JP Bold`
- `textAutoResize=HEIGHT`

Long-copy stress:

- `64:29 / TEXT / STUB SEAT LABEL`: `席 → 卓`
- `textAutoResize=HEIGHT`

The semantic node name remains historical; its rendered reader-facing value is now correct. A later structural cleanup may rename the node if useful, but that is not required for visual correctness.

## Rollback

Before Current mutation, full hidden rollback copies were created:

- `79:33 / ROLLBACK / BOARDING FRONT / PRE-STUB-TABLE-LABEL / 2026-08-26`
- `79:64 / ROLLBACK / BOARDING FRONT STRESS / PRE-STUB-TABLE-LABEL / 2026-08-26`

## Three-scale screenshot QA

- whole / 500px: PASS; stub still scans as a distinct detachable area;
- reading / 1000px: PASS; main body and stub now use the same table semantics;
- actual-size / native `1200×550`: PASS; `卓` and `[卓番号]` remain clear without collision.

No fake `SEAT`, flight, gate, barcode or airline credential was introduced.

## Structure readback

Current `63:41`:

- visible native text `16`;
- fixed-height text `0`;
- outside visible text `0`;
- IMAGE fills `0`;
- stub label `63:68` = `卓 / HEIGHT`.

Long-copy stress `64:2`:

- visible native text `16`;
- fixed-height text `0`;
- outside visible text `0`;
- IMAGE fills `0`;
- stub label `64:29` = `卓 / HEIGHT`.

## Visual status

The broader `BAGGAGE RIBBON / RETURN LABEL` art direction remains unchanged and continues to satisfy:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`.

The correction removes a semantic contradiction without changing the selected 93/100 professional art direction.

## Learning state

`VERIFIED_LOCAL`.

Candidate principle: ticket-inspired wedding artifacts should inherit only the transport semantics that perform a real wedding function. A physical stub may look ticket-like without relabeling a table as a seat.

Do not promote this as a cross-item rule from one correction, and do not transfer Boarding layout/palette/stub geometry to another item.

## Result

`CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / STUB_TABLE_SEMANTIC_PASS / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / ROLLBACK_SAFE / DRIVE_UNCHANGED / IMAGE_GENERATION_NOT_REQUIRED / NOT_PRINT_READY`.
