# ADD-10 会場案内 V4 — Redundant English destination subtraction QA

Status: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS_MAINTAINED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED`
Date: 2026-08-20
Start authority SHA for this change: `fa32ea541ff6b7612ecfe049bde028918ce81edb`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Authority

- Figma file: `mMfoBkoZ7eVbuerSRHePLV`
- selected V4: left `32:3`, right `32:15`, forward `32:27`
- long-copy stress: `33:3 / 33:15 / 33:27`
- retained legacy: `2:2 / 2:13 / 2:24 / 2:35 / 2:46 / 2:57`
- Drive folder: `ADD-10_会場案内サイン / 1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3`

## Visible problem

Fresh actual-size review of selected left `32:3` found `RECEPTION` sitting directly under the already-dominant Japanese destination `受付`. The English label repeated the same ordinary meaning rather than providing a brand, code, artifact type, or wayfinding fact. It therefore added template-like bilingual mass between the primary destination and `[階数・部屋名]`.

The same role existed in right/forward and as `RECEPTION HALL` in all three long-copy stress roots.

## Bounded comparison

A selected-left duplicate was created as `46:2 / QA / ADD10 / LEFT / NO_REDUNDANT_ENGLISH_RECEPTION / 2026-08-20` and only its `RECEPTION` text visibility was changed.

The no-English candidate was stronger at actual size: `会場案内 → 受付 → [階数・部屋名] → direction axis` reads directly, while the editable direction vector still carries the physical navigation job.

No legacy frame was used as an authoring base or visual source.

## Rollback-safe adoption

Before selected/stress mutation, six hidden rollback roots were created:

- selected left/right/forward: `46:15 / 46:28 / 46:41`;
- stress left/right/forward: `46:53 / 46:66 / 46:79`.

Adopted visibility change:

- selected `RECEPTION`: `32:8 / 32:20 / 32:32` → hidden;
- stress `RECEPTION HALL`: `33:8 / 33:20 / 33:32` → hidden.

Comparison `46:2` was hidden after adoption.

Japanese destination text, venue/date support, floor/room semantic placeholder, direction-axis vectors, colors and spacing contracts remain editable and otherwise unchanged.

## Three-scale / long-copy QA

- selected left whole-item / 500 px: PASS;
- selected forward actual-size-equivalent / 1400 px render: PASS;
- realistic left long-copy `33:3` / `1400×1980`: PASS after temporary reveal; returned to hidden QA state;
- residual visible `RECEPTION` / `RECEPTION HALL` in selected + stress family: `0`;
- IMAGE fills added: `0`.

The long-copy screenshot still fits the large `披露宴会場` destination, long floor/room placeholder and direction vector without trim overflow.

## Drive / asset decision

Exact Drive authority was live-read immediately before the Figma write and matched folder ID `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3`.

Drive writes: `0`.
Image generation: `0`.

## Result

- Japanese-first destination hierarchy: `PASS`;
- wayfinding function: preserved;
- long-copy stress: `PASS`;
- native editability: preserved;
- legacy / rollback: preserved;
- sellable visual status: maintained;
- final route facts / installation / physical proof: still deferred or blocked on authoritative venue input.

This applies an already-evidenced Japanese-first QA principle locally; it is not a new cross-item rule.