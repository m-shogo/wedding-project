# 青春ふたりきっぷ — Anniversary Date Slip clean-room comparison QA / 2026-08-22

State: `CURRENT_RETAINED / CLEANROOM_COMPARISON_REJECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY`

## Live authority

- start / pre-write latest `main`: `83478666a4f8fe23a377580ff406ca6a8f2e7c40`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `VISUAL_REOPENED`
- Figma file: `v7rIRHv8YKQXG0LYD0I5OA`
- retained Current candidate: `68:2 / DATE PUNCH JOURNEY`
- Drive authority retained from prior verified QA: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J / 04_青春18きっぷ風_ミンティア用シール`
- provisional canvas: `720×250`, approximately `72×25mm`; physical MINTIA application-area proof remains required.

## Why this audit was reopened

The current candidate had already passed the reopened sellable gate at 91/100, but this run re-audited whether the oversized date-punch treatment had become too close to a generic large-number graphic rather than an item-specific collectible ticket gesture.

## Clean-room comparison

New frame created from blank canvas:

- `71:2 / VNEXT_CLEANROOM / SEISHUN FUTARI / ANNIVERSARY DATE SLIP / 2026-08-22`
- stress duplicate: `71:15 / QA / ANNIVERSARY DATE SLIP / LONG ROUTE STRESS / 2026-08-22`

The comparison did not duplicate Current or old production. It re-entered only verified facts/semantics:

- `720×250` provisional canvas;
- `青春ふたりきっぷ`;
- `今日だけの切符を、ふたりで。`;
- `2026.10.24`;
- `2名さま`;
- native editable `[出発地] → [行先]`.

Visual direction:

- coral date field on the left;
- compact `24 / OCT` anniversary read;
- large Japanese title on open warm paper;
- one dark route rule;
- small blue corner tab;
- two edge notches as restrained physical-ticket cues.

No old guilloche, train motif, stamp, route nodes, generated asset, raster image, fake barcode, operator mark, or transport credential was reused.

## Hybrid authoring split

- variable/factual copy: native Figma text;
- fixed decoration: simple native geometry because the treatment is intentionally flat and small;
- SVG: 0;
- generated/composed raster: 0;
- IMAGE fill: 0;
- variable copy baked into decoration: 0.

Image generation was not opened because the diagnosed question was typographic/collectible specificity, not missing hero imagery or texture.

## Structure and long-route QA

Selected comparison uses 7 native text roles, all `textAutoResize=HEIGHT`.

Stress route:

`[かなり長い出発地名]  →  [かなり長い行先名]`

Stress readback:

- route `320×60`, bottom `213`;
- date bottom `178`;
- party bottom `223`;
- all 7 text roles remain inside the `720×250` root;
- fixed-height text: 0;
- IMAGE fills: 0.

The clean-room comparison is structurally credible and long-route safe.

## Visual verdict

`REJECTED` for promotion.

The new date-slip direction is cleaner and has a more explicit month/day read, but the retained `DATE PUNCH JOURNEY` still has the stronger item-specific emotional gesture: the oversized cropped `24` behaves as a commemorative punch, while the lagoon route field gives the narrow label a clearer journey rhythm and more immediate pop energy.

The comparison's left coral slab + horizontal rule is more conventional and slightly more corporate/event-ticket-like. It improves literal date legibility but reduces the collectible surprise and wedding-trip excitement that justified the current 91/100 selection.

This is not a structural rejection. It is an art-direction rejection after a valid blank-frame comparison.

## Decision

- retain Current `68:2 / DATE PUNCH JOURNEY` unchanged;
- keep `71:2` and `71:15` as comparison/rejection evidence;
- do not promote a new version merely to make it different;
- do not add imagery or texture without a screenshot-supported role deficit;
- retain `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` for the current candidate;
- retain `NOT_PRINT_READY` until physical MINTIA measurement, final route copy, material/adhesive choice, and 100% application proof are complete.

## Learning

`VERIFIED_LOCAL`: a cleaner/more literal date hierarchy is not automatically a better collectible artifact. For very small commemorative paper goods, evaluate whether subtraction preserves or removes the one surprising physical/graphic gesture that makes the item memorable. Transfer only the evaluation method, not the large-number treatment.
