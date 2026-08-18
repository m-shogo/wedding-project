# ADD-14 二次会案内 — Route Node Subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED`
Date: 2026-08-19
Start authority SHA: `2d070103a59be5af54aa4f9822129e6b510aa78d`
Current: `docs/automation/non-rurubu-figma-quality-current.md`

## Authority

- Figma: `IygEr140Yqk12LsGL3TFrT`
- clean-room page: `32:2 / CLEANROOM / ADD-14 / V3 NIGHT FIELD / 2026-08-17`
- selected A6: `32:3`
- selected A5: `32:29`
- long-copy A6: `33:2`
- long-copy A5: `33:28`
- Drive: `ADD-14_二次会案内 / 1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs`
- retained legacy: `1:2 / 1:18`, unchanged

## Visible problem

Fresh A6/A5 whole-item review found that the mint route used one horizontal rule plus three evenly spaced mint circles for reception/start/end. The circles repeated a progress-slider / stepper control silhouette. Reception/start/end were already explicit native Japanese labels aligned under the route, so the circles added interface-like signaling rather than necessary wayfinding information.

## Bounded comparison

Rollback-safe candidates:

- A6 `46:2 / QA_ADD14_A6_ROUTE_NO_DOTS_2026_08_19`
- A5 `46:29 / QA_ADD14_A5_ROUTE_NO_DOTS_2026_08_19`

Only the three `DECOR_DESTINATION_NODE` circles were hidden. The mint route line, reception/start/end labels and times, venue hierarchy, lower access/fee/RSVP content, palette and native text structure were unchanged.

The no-dot treatment was stronger at both sizes: the route reads as an editorial divider/time axis rather than an interactive progress control, while the three time stages remain immediately legible from their native labels and alignment.

## Adoption / rollback

Before selected mutation, hidden pre-change copies were preserved:

- A6 selected rollback: `46:56`
- A5 selected rollback: `46:83`
- A6 stress rollback: `46:110`
- A5 stress rollback: `46:137`

Adopted changes:

- selected A6 dots `32:10 / 32:13 / 32:16` hidden;
- selected A5 dots `32:36 / 32:39 / 32:42` hidden;
- stress A6 dots `33:9 / 33:12 / 33:15` hidden;
- stress A5 dots `33:35 / 33:38 / 33:41` hidden.

Comparison roots `46:2 / 46:29` were hidden after adoption. Legacy production was not edited.

## Three-scale / structure QA

- A6 whole/thumbnail at 500 px: PASS; route now reads as a simple divider/time axis.
- A5 reading/native `840×592`: PASS.
- A6 realistic long-copy actual `592×420`: PASS after temporary reveal; restored hidden afterward.
- selected/stress visible route-dot count: `0`.
- IMAGE fills: `0`.
- visible text outside root: `0` on all selected/stress roots.
- A5 selected/stress text collision check: `0`.
- A6 geometric text-box intersection flags remain from the pre-existing tightly packed lower columns, but fresh selected and realistic-stress screenshots show no glyph collision or loss introduced by this route-dot-only change.

## Asset decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_CHANGE`. No Drive write. Existing exact Drive authority was live read back before mutation.

## Result

`ROUTE_NODE_UI_SUBTRACTION_PASS / SELLABLE_VISUAL_QA_PASS_MAINTAINED / DESIGN_QA_PASS_WITH_PLACEHOLDERS_MAINTAINED / LEGACY_PRESERVED / ROLLBACK_SAFE / NOT_PRINT_READY`
