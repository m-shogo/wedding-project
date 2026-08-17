# WEDDING PASSPORT — menu deeper-ledger rhythm QA

Date: 2026-08-18
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / MENU_DEEPER_LEDGER_RHYTHM_ADOPTED / REALISTIC_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `db0b7ce3ab80136603ba259128211a31b0b2474d`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- selected menu: `138:43`
- selected family remains V3 front `144:3`, V3 back `144:26`, V2 menu `138:43`, V2 seating `138:89`
- Drive authority: `01_パスポート風_メニュー・ドリンク・座席表` / `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- retained legacy production: unchanged

## Visible problem

Fresh 500 px and native-size review of selected menu `138:43` showed that the current placeholder copy was concentrated in the upper half of the physical A5-like page. The lower field was visually underused enough to risk the project-wide `blank-looking layouts that mistake emptiness for premium minimalism` failure, even though the structure and typography were otherwise healthy.

The issue was spacing rhythm, not missing imagery or missing factual copy.

## Bounded comparison

No legacy production was used as an authoring source. A rollback-safe duplicate was created from the already-selected clean-room menu solely to test a bounded spacing change:

- comparison candidate: `152:68 / QA / PASSPORT MENU / DEEPER LEDGER RHYTHM / 2026-08-18`
- realistic-copy stress from that candidate: `153:2 / STRESS / PASSPORT MENU / DEEPER RHYTHM REALISTIC COPY / 2026-08-18`

Only the two content-ledger positions/rhythm changed:

- food ledger `143:2`: `y 500 → 540`, `itemSpacing 20 → 95`, resulting bottom `1585 / 2100`;
- drink ledger `143:15`: `y 500 → 540`, `itemSpacing 22 → 60`, resulting bottom `1510 / 2100`.

No text wording, type size, column width, title, rule, palette, image, semantic role, menu count, drink count, or seating content changed.

## Visual QA

The bounded candidate used substantially more of the physical sheet while preserving the existing two-column food/drink hierarchy.

- whole-item / 500 px: PASS; less false-premium emptiness and better top-to-bottom paper rhythm;
- reading scale: PASS; six food rows and six drink roles remain clearly scannable;
- actual-size / 1480×2100: PASS; row separation remains deliberate rather than stretched or dashboard-like.

The spacing increase does not introduce cards, containers, decorative filler, imagery, or fabricated copy.

## Realistic-copy stress

The candidate was stress-tested with materially longer semantic placeholder text before promotion:

- food names expanded to a long dish-name shape;
- food descriptions expanded to a two-to-three-line explanatory shape;
- drink values expanded to multi-option strings;
- allergy guidance expanded to multiple lines.

Readback on stress `153:2`:

- outside visible text: `0`;
- text-to-text collisions: `0`;
- no raster/image role added;
- native editable text retained.

The stress screenshot still keeps all content comfortably above the trim while avoiding the previous large dead lower field.

## Promotion / rollback

Before mutation, a hidden exact rollback was created:

- `154:2 / ROLLBACK / PASSPORT MENU / PRE-DEEPER-RHYTHM / 2026-08-18`

The verified spacing values were then promoted to selected menu `138:43`. QA candidate `152:68` and stress nodes `152:2 / 153:2` were hidden after verification.

Post-write 500 px screenshot of selected `138:43` matches the accepted deeper-rhythm candidate.

## Drive / generated asset decision

Drive authority was live-read immediately before promotion and remains `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`.

- new Drive assets: `0`
- image generation: `NOT_REQUIRED`

The screenshot-supported defect was physical-page spacing rhythm, not a missing hero/background/texture.

## Decision

`MENU_DEEPER_LEDGER_RHYTHM_ADOPTED / REALISTIC_COPY_STRESS_PASS`.

WEDDING PASSPORT remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. Keep `NOT_PRINT_READY` until authoritative final food/drink copy, names, seating assignments, printer/export conditions, and physical proof are available.
