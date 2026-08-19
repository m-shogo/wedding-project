# ADD-02 Singapore — chart-bar subtraction QA

Date: 2026-08-19
State: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS_MAINTAINED / CHART_BAR_SUBTRACTION_PASS / ROLLBACK_SAFE`
Start authority SHA: `2b5189802a6b8e57c132c7f7de635c9aef632b5a`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- selected Singapore root: `2:65`
- Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- retained family/legacy/history remain preserved.

## Visible problem

Fresh whole-item and actual-size review showed four equally spaced vertical `SG_ARCH_BLOCK_*` bars in the jade upper field reading like a bar chart/dashboard rather than destination print art. The Singapore identity was already carried by the strong jade/dark/sand field split, native country title, botanical ellipse/stem, Japanese label and table number.

## Bounded test and adoption

Rollback-safe comparison:

- `101:2 / QA / ADD-02 SINGAPORE / NO CHART BARS / 2026-08-19`

The comparison hid only:

- `SG_ARCH_BLOCK_1`
- `SG_ARCH_BLOCK_2`
- `SG_ARCH_BLOCK_3`
- `SG_ARCH_BLOCK_4`

It preserved all native text, semantic country-description placeholder, table number, botanical arc/stem, fixed color fields and print grain.

The no-bars version was stronger at whole and actual-size scales, so the same visibility change was promoted to production `2:65`.

Hidden pre-change rollback:

- `102:2 / ROLLBACK / ADD-02 SINGAPORE / PRE_CHART_BAR_SUBTRACTION / 2026-08-19`

Comparison `101:2` is hidden after adoption.

## QA

- whole/thumbnail 500px: PASS;
- actual-size `1000×1480`: PASS;
- visible native text: `4`;
- IMAGE fills: `1` (existing tiled print grain);
- visible text outside root: `0`;
- text-to-text collisions: `0`;
- four chart bars visible: `0`.

## Asset decision

Image generation: `0`.
Drive writes: `0`.

The defect was excessive native fixed-art scaffolding, not missing imagery.

## Decision

`CHART_BAR_SUBTRACTION_PASS`.

Singapore remains part of the current ADD-02 selected family with `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. Do not mechanically remove structural blocks from other country signs; verify each role at whole-item scale.