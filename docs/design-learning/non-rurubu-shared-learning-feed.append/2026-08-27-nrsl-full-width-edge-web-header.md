# NRSL — Full-width decorative edge can read as a web/app header

Source scope/items: non-Rurubu / ADD-06 フォトブースサイン + ADD-17 子ども向けミニカード

State: `VERIFIED_CROSS_ITEM`

Normalized fingerprint: `FULL_WIDTH_DECORATIVE_EDGE_READS_AS_WEB_HEADER`

## Visible problem

Two materially different print artifacts independently showed the same whole-item failure:

1. ADD-06 `STRIP IN THE LIGHT` used a 28px coral bar across the full top edge. At thumbnail/reading scale it read before the continuous photo-strip artifact and resembled a web/app header or status bar.
2. ADD-17 `DISCOVERY POSTLOG` used a 160px cobalt band across the full top edge. It dominated the open writing sheet and read like an app/page header even though the native identity label `きょうの発見 / 02` itself was legitimate.

The shared problem was not the color. It was **full-width canvas-edge containment without a proven physical, trim, binding, hierarchy or reader-facing job**.

## Root cause

A horizontal field spanning the complete page width can trigger interface grammar when it behaves like a persistent header rather than part of a physical print artifact. A valid text label or emotional accent does not automatically validate the carrier around it.

The important distinction is:
- label semantics may be correct;
- containment geometry may still be wrong.

## Bounded experiments

### ADD-06

- Current root: `56:106`
- top crop: `56:107 / DECOR / CORAL TOP CROP`
- comparisons: `57:2 / 57:53`
- rollbacks: `57:104 / 57:155`
- bounded change: hide only the full-width coral top crop
- replacement decoration: `0`
- result: ADOPTED

### ADD-17

- Current back: `67:4`
- top band: `67:24 / DECOR / COBALT TOP BAND`
- identity label: `67:26 / TEXT / KICKER`
- comparisons: `83:2 / 83:21`
- rollbacks: `83:40 / 83:59`
- bounded change: hide only the full-width cobalt band; retain the native label and recolor it to the existing navy display color on the cream sheet
- replacement decoration: `0`
- result: ADOPTED

## Expected improvement

Restore print/editorial artifact reading before interface containment, while preserving any legitimate label or functional hierarchy independently.

## Regression risk

A full-width top field is not inherently wrong. It can be correct when it performs genuine:
- trim/fold/binding work;
- wayfinding/navigation work;
- image/physical-artifact attachment;
- deliberate emotional/event rhythm;
- another reader-facing function proven at whole-item scale.

ADD-14 already provided a counterexample where a top color field carried real event energy and subtraction made the artifact more bureaucratic. Therefore this is **not** a blanket `remove headers` or `remove top bars` rule.

## Three-scale evidence

ADD-06 after subtraction:
- whole / 500px: PASS
- reading / 1000px: PASS
- actual / native `990×1400`: PASS
- realistic long-copy: PASS

ADD-17 after OPEN_LABEL promotion:
- whole / ~500px: PASS
- reading / ~1000px: PASS
- actual / native `1110×1540`: PASS
- realistic long-copy: PASS

## Figma / Drive / GitHub evidence

### ADD-06
- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb`
- item evidence: `01_paper-items/additional-wedding-items/ADD-06-photo-booth-sign/FIGMA-TOP-CORAL-CROP-SUBTRACTION-QA-2026-08-27.md`

### ADD-17
- Figma file: `PAvkRggJiRuXVypi3RgZCN`
- Drive authority: `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`
- item evidence: `01_paper-items/additional-wedding-items/ADD-17-children-mini-card/BACK-COBALT-HEADER-OPEN-LABEL-PROMOTION-QA-2026-08-27.md`

Image generation: `0` for both receiving items.
Drive writes: `0` for both receiving items.

## What must remain item-specific

Do not transfer:
- ADD-06 coral color, strip geometry or photo-booth composition;
- ADD-17 cobalt/navy palette, child-card typography, route, star or writing-sheet layout;
- exact band heights or coordinates;
- a visual mandate to remove every top edge.

## Cross-item applicability

When a future unrelated print artifact has a full-width decorative edge/field, audit two roles separately:

1. **content role** — does any contained label/copy have a legitimate reader-facing job?
2. **carrier role** — does the full-width field itself provide physical, binding, trim, hierarchy or emotional work at whole-item scale?

If the label is valid but the carrier is not, run a rollback-safe `CURRENT vs OPEN_LABEL / NO_EDGE` comparison before inventing a replacement decoration.

## Next receiving-item experiment

Do not proactively search the suite for top bars just to apply this lesson. Use it only when a fresh whole-item screenshot reveals a materially similar interface-header reading on a third unrelated artifact. If that third item independently verifies the method, consider promotion toward `PROMOTED_PROJECT_RULE`; otherwise retain this at `VERIFIED_CROSS_ITEM`.