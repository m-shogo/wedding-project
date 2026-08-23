# ADD-10 会場案内サイン — divider subtraction QA / 2026-08-23

State: `VERIFIED_LOCAL / CURRENT_POLISH_ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- latest `main` immediately before Git write: `2d067ebd99fdfbe589698ecbb3fe95cfc866fe68`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `mMfoBkoZ7eVbuerSRHePLV`
- Current LEFT / RIGHT / FORWARD: `49:3 / 49:19 / 49:33`
- long-copy stress: `49:47`
- Drive authority live-readback: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3 / ADD-10_会場案内サイン`
- generated assets: `0`
- Drive writes: `0`

## Visible problem

After the earlier cleanup of unrelated lagoon/foot accents, fresh whole-item review still showed one short yellow `DECOR / DIVIDER` between `[階数・部屋名]` and the oversized directional arrow.

The Current already has a functional full-width yellow top signal and a single dominant coral direction gesture. The short divider did not encode direction, destination, room/floor, trim, mounting, fold, scan, or any physical wayfinding operation. At whole-item scale it read as a leftover decorative punctuation mark rather than required signal furniture.

This was a bounded fixed-decoration defect in an otherwise strong Current, not a reason for another clean-room rebuild.

## Bounded comparison

A rollback-safe LEFT comparison was created:

- `56:2 / QA / ADD-10 LEFT / NO DIVIDER / 2026-08-23`

Only `DECOR / DIVIDER` was hidden. Destination/floor-room copy, top signal, arrow SVG, guidance band, note and date were unchanged.

Fresh screenshot comparison showed the no-divider candidate was stronger:

- `[目的地] → [階数・部屋名] → arrow` becomes one direct wayfinding sequence;
- the large arrow gains clearer visual authority;
- the top yellow signal remains the sufficient secondary yellow cue;
- no information, grouping, binding, or physical function is lost.

The comparison was hidden after verification.

## Rollback / production change

Before Current mutation, complete hidden rollbacks were created:

- `56:16` — LEFT pre-change rollback;
- `56:30` — RIGHT pre-change rollback;
- `56:44` — FORWARD pre-change rollback;
- `56:58` — long-copy stress pre-change rollback.

Adopted change:

- LEFT `49:3`: `49:9 / DECOR / DIVIDER` hidden;
- RIGHT `49:19`: `49:25 / DECOR / DIVIDER` hidden;
- FORWARD `49:33`: `49:39 / DECOR / DIVIDER` hidden;
- stress `49:47`: `49:53 / DECOR / DIVIDER` hidden.

No other Current geometry, text, SVG, color, direction truth, or facts changed.

## Three-scale screenshot QA

- LEFT whole / reading / native A4-equivalent render: PASS;
- RIGHT whole / reading: PASS; right-arrow recognition remains immediate;
- long-copy stress was temporarily revealed after promotion and freshly rendered: PASS;
- stress was returned hidden after review.

The realistic long destination `[メインダイニング・レセプション会場]` and long floor/room label remain separated from the arrow and from each other after the subtraction.

## Structure QA

Post-change Plugin API readback:

| Root | visible native text | fixed-height text | outside text | IMAGE fills | visible divider |
| --- | ---: | ---: | ---: | ---: | ---: |
| LEFT `49:3` | 5 | 0 | 0 | 0 | 0 |
| RIGHT `49:19` | 5 | 0 | 0 | 0 | 0 |
| FORWARD `49:33` | 5 | 0 | 0 | 0 | 0 |
| stress `49:47` | 5 | 0 | 0 | 0 | 0 |

The directional arrow remains editable SVG/vector. Variable/factual copy remains native editable text. No semantic role was rasterized or flattened.

## Hybrid / asset decision

- destination, floor/room, guidance and date: native text;
- direction gesture: existing editable SVG/vector;
- top signal and guidance field: simple native fixed geometry with clear wayfinding/hierarchy jobs;
- removed divider: unsupported fixed decoration;
- generated/composed raster: `0`;
- Drive write: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the diagnosed defect was unsupported fixed punctuation, not missing photography, illustration, texture, or place atmosphere.

## Learning state

`VERIFIED_LOCAL` application of the existing cross-item QA method: a line/field is not retained merely because it helps decorate a gap; it must prove a reader-facing, physical, binding, or navigational job at whole-item scale.

This result does **not** create a blanket `remove dividers` rule. The full-width top signal is retained because it gives the sign family a real color-signal hierarchy, and the large arrow is retained because it performs the core wayfinding function. Exact colors, coordinates and subtraction remain ADD-10-specific.

## Deferred finalization

Unchanged:

- official destination and venue terminology;
- final left/right/forward truth at each installation point;
- final floor/room labels;
- sign count and installation locations;
- frame/stand/wall-mount interference check;
- venue-light/glare and real viewing-distance proof;
- route walk-through by a first-time visitor;
- printer template/profile, bleed/trim and 100% physical proof.

## Result

ADD-10 remains:

`CURRENT / VNEXT_V3_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / DIVIDER_SUBTRACTION_PASS / ROLLBACK_SAFE / LEGACY_PRESERVED / NOT_PRINT_READY`.
