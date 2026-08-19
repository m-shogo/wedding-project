# ADD-02 France — arch simplification QA

Status: `VERIFIED_LOCAL / ADOPTED / ROLLBACK_SAFE`
Date: 2026-08-19
Start authority SHA: `1f7d08c8651af1d686cc855c13d0c97dafbd9fd8`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Authority

- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production: `2:20 / FRAME_TABLE_SIGN_FRANCE`
- Drive: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- existing tiled print-grain IMAGE role unchanged

## Visible problem

Fresh thumbnail review showed four offset rounded arch outlines in the upper-right navy field. The first two created a useful architectural/window rhythm, while the third and fourth extended the motif into repeated UI/scaffold-like echoes and weakened the country title at whole-item scale.

The problem was excessive fixed-art repetition, not missing imagery or typography.

## Bounded test

Comparison:

- `107:26 / QA / ADD-02 FRANCE / TWO ARCHES / 2026-08-19`
- changed only the visibility of `FR_ARCH_RULE_3 / FR_ARCH_RULE_4`;
- retained `FR_ARCH_RULE_1 / FR_ARCH_RULE_2`, navy/ivory fields, red register, horizon rule, all native country/note/number text and print grain.

At ~500px the two-arch candidate kept the intended architectural cue but reduced decorative echo. At ~1000px the primary white arch and secondary fine arch remained clearly legible without creating a repeated control/widget impression.

## Production change

Before adoption, current production was preserved as hidden rollback:

- `108:2 / ROLLBACK / ADD-02 FRANCE / PRE_ARCH_SIMPLIFICATION / 2026-08-19`

Production `2:20` now hides only:

- `21:270 / FR_ARCH_RULE_3`
- `21:271 / FR_ARCH_RULE_4`

`FR_ARCH_RULE_1 / FR_ARCH_RULE_2` remain visible. The comparison frame was hidden after QA.

## Three-scale / structure QA

- whole-item ~500px: PASS;
- reading ~1000px: PASS;
- actual canvas: `1000×1480`;
- visible native text: `4`;
- visible IMAGE-fill nodes: `1`;
- visible text outside root: `0`;
- visible text collisions: `0`;
- generated assets: `0`;
- Drive write: `0`.

## Decision

`ADOPTED` — two arches retain destination-specific architectural depth while avoiding the repeated-outline scaffold feel of four arches.

## What must remain item-specific

Do not transfer France's arch silhouette, navy/ivory/red palette, exact offset, title scale, or register geometry. The reusable QA method is only to test whether repeated fixed-art echoes still add a real editorial role once the first one or two already communicate the motif.
