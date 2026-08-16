# NRSL — High-resolution visual depth does not substitute for distance hierarchy

Date: 2026-08-16
Source scope/item: non-Rurubu / ADD-02 11卓の国別テーブルサイン
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

Earlier ADD-02 studies had two confounded weaknesses: some composed image roles were low-resolution, and several clean-room candidates also lost to retained production on destination/table-index hierarchy. It was unclear whether fixing source resolution alone would make the image-led clean-room direction clearly sellable.

## Root-cause hypothesis

A high-resolution fixed visual can solve actual-size texture/detail without solving the more important whole-item reading order. If the item must be identified from a distance, hero art, semantic title and identifier have to be art-directed as one hierarchy rather than treating imagery as the quality layer and typography as a separate lower information block.

## Bounded test

A fresh ADD-02 V10 page was authored before retained production was opened. Two materially different Hawaii candidates used original composed fixed artwork rendered at 2× and flattened into one IMAGE role:

- `63:26 / A / VOLCANIC COAST SCREENPRINT` — 665,498-byte exported PNG, image hash `5565b077fa10b098d4899dc800789b620750a3f4`;
- `63:35 / B / ARCHIVAL OCEAN ATLAS` — 886,203-byte exported PNG, image hash `fdb97f6b920c9ab8fbc81fe70337fbac9ac55210`.

In both candidates, table index, destination name, Japanese support, editorial-note placeholder and date remained native editable text. No previous ADD-02 visual item was copied.

## Three-scale / structure evidence

After repairing an auto-layout frame-height clipping defect, both candidates rendered correctly at native `1000×1480` screenshot size. Hidden long-copy clones then used a materially longer Japanese note:

- native text count: `5`;
- IMAGE fill count: `1`;
- outside visible text: `0`;
- info-stack bottom: `1197 / 1480` for both candidates.

This verifies that the image-role resolution/structure issue is no longer the immediate blocker.

## Completion-only comparison result

After the new candidates were complete, retained Hawaii production was opened for the first time in the run. The high-resolution raster heroes materially improved art depth and removed the V9 pixelation problem, especially in the darker archival-ocean candidate.

Nevertheless retained production still won the distance-identification test because its destination title and table identifier were picked up faster at whole-item scale. Therefore neither V10 candidate was promoted.

## Learning

`HIGH_RES_DEPTH_WITHOUT_HIERARCHY_GAIN`

When image/source quality has been repaired, do not assume another richer image will close the visual gap. For signage, cards, tickets and other items with a distance-identification role, evaluate the semantic title/identifier and fixed visual field as one composition at thumbnail scale.

A useful sequence is:

`role-specific visual → native semantic title/identifier → whole-item distance read → reading scale → actual-size detail`.

If actual-size art is strong but the whole-item read remains weaker, method-switch the composition/hierarchy rather than regenerating more decoration.

## Expected improvement

This prevents repeated image-generation/composed-raster cycles from consuming time after source-resolution defects are already solved. It directs the next experiment toward the remaining visible bottleneck rather than the most technically interesting layer.

## Regression risks

- do not overreact by making every title huge; hierarchy remains item-specific;
- do not flatten the title/identifier into the hero raster to gain immediate contrast;
- do not copy ADD-02 title positions or Hawaii art direction to another item;
- image quality still matters at actual size even when hierarchy is the remaining defect.

## Cross-item applicability hypothesis

On another print/sign item where a high-quality image/composed asset passes actual-size inspection but the candidate still loses at thumbnail/whole-item scale, test whether semantic title/identifier integration—not another asset variant—is the true next step.

## Evidence

- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`;
- V10 page: `63:2`;
- V10 section: `63:44`;
- candidate roots: `63:26 / 63:35`;
- stress clones: `64:2 / 64:11`;
- retained comparison: `31:275`;
- Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`;
- item evidence: `01_paper-items/additional-wedding-items/ADD-02-table-signs/FIGMA-CLEANROOM-V10-EDITORIAL-HERO-2026-08-16.md`;
- item evidence commit: `86e213d5caf95cadea7e3b63ce685fddd9f724e4`.
