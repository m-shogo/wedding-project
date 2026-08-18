# NRSL — Redundant endpoint markers can turn print lines into UI controls

Source scope/items: non-Rurubu / ADD-05 サンキュータグ + ADD-10 会場案内サイン + ADD-14 二次会案内

State: `PROMOTED_PROJECT_RULE`
Date: 2026-08-19

## Visible problem

Three materially different print artifacts independently showed the same failure mode:

- ADD-05: a thin editorial journey line ended in a filled circle, making the tag read like a slider/progress control even though the physical punch hole already carried the artifact's anchor semantics.
- ADD-10: a functional mint direction axis ended in a small rust circle at the non-arrow end, making an otherwise clear wayfinding arrow read slightly like a UI control.
- ADD-14: a mint reception/start/end time axis used three evenly spaced filled circles even though the same three stages were already explicit native Japanese labels aligned under the rule; the circles made the night itinerary read like a progress/stepper component.

## Root-cause hypothesis

A secondary endpoint/checkpoint dot is harmful when the line already has a complete print/physical meaning without it. A filled circle can introduce interface semantics such as handle, progress state, selected node, or timeline checkpoint even when no such interaction exists.

The correct question is not “are dots bad?” It is whether the marker performs an independent physical, semantic, binding, sequence, or navigation function that the line/arrow/native labels do not already provide.

## Bounded tests

### ADD-05

Evidence:

- `01_paper-items/additional-wedding-items/ADD-05-thank-you-gift-tags/FIGMA-ENDPOINT-DOT-SUBTRACTION-QA-2026-08-18.md`

Only the filled endpoint circle was hidden on rollback-safe front candidates. Punch hole, copy, date, line, safe guides and tag geometry remained unchanged. The subtraction was adopted on both selected front sizes after actual-size comparison.

### ADD-10

Evidence:

- `01_paper-items/additional-wedding-items/ADD-10-venue-guide-signs/FIGMA-CLEANROOM-V4-AXIS-ENDPOINT-SUBTRACTION-2026-08-18.md`

Only the 30×30 rust endpoint vector was hidden while preserving the mint direction line and arrowhead. The subtraction was adopted across left/right/forward selected V4 and synchronized to long-copy stress after whole-item comparison.

### ADD-14

Evidence:

- `01_paper-items/additional-wedding-items/ADD-14-after-party-guide/ROUTE-NODE-SUBTRACTION-QA-2026-08-19.md`

Only the three filled `DECOR_DESTINATION_NODE` circles were hidden in A6/A5 selected V3 and their current long-copy proofs. The mint route line, reception/start/end native labels and times, venue hierarchy and lower practical information were unchanged.

The no-dot version was stronger at A6/A5 whole-item scale because the rule reads as an editorial time axis rather than an interactive stepper. A6 realistic long-copy actual-size proof remained inside the root; A5 selected/stress remained collision-free.

## Expected improvement

Keep print/editorial lines reading as lines, rules, routes, or direction axes instead of fake UI controls when semantic interpretation is already complete without a decorative marker.

## Regression risk

Do not remove a dot that actually carries a required role such as:

- punched/attached point;
- real destination/station semantics;
- map legend meaning;
- sequence state that the reader must interpret;
- physical registration/trim/binding mark;
- required image-caption or timeline binding.

Use the existing binding-function check before subtraction. A dot may be correct when it adds information; this rule applies only to **redundant** markers whose removal survives whole-item comparison and structure QA.

## Three-scale evidence

ADD-05:

- selected front sizes passed actual-size review after subtraction;
- punch → gratitude → line → date hierarchy remained intact.

ADD-10:

- left/right/forward whole-item screenshots passed after subtraction;
- forward/left/right direction remained immediate;
- long-copy stress outside text `0 / 0 / 0`, text collision `0 / 0 / 0`;
- line + arrowhead remained editable vector roles.

ADD-14:

- A6 500px whole-item: PASS;
- A5 native `840×592`: PASS;
- A6 realistic long-copy native `592×420`: PASS;
- selected/stress visible route dots: `0`;
- visible text outside root: `0`;
- IMAGE fills: `0`.

## Evidence / provenance

- ADD-05 Figma: `kAdkOMuAMcFQtTSP8NtWil`
- ADD-05 evidence: `FIGMA-ENDPOINT-DOT-SUBTRACTION-QA-2026-08-18.md`
- ADD-10 Figma: `mMfoBkoZ7eVbuerSRHePLV`
- ADD-10 evidence: `FIGMA-CLEANROOM-V4-AXIS-ENDPOINT-SUBTRACTION-2026-08-18.md`
- ADD-10 evidence commit: `eb4b8a8705db81aa4d3bdf1a5d87bc2398dad155`
- ADD-14 Figma: `IygEr140Yqk12LsGL3TFrT`
- ADD-14 evidence: `ROUTE-NODE-SUBTRACTION-QA-2026-08-19.md`
- ADD-14 current QA sync commit: `5fc59c9a4dbfbc5a92a92bf022e3a2f69eff80a7`
- Drive writes in all tests: `0`
- generated assets in all tests: `0`

## What must remain item-specific

Do not transfer ADD-05's tag line geometry, punch relationship, green color, or dimensions. Do not transfer ADD-10's arrow shape, mint/rust palette, destination hierarchy, or exact axis length. Do not transfer ADD-14's time-axis length, palette, labels, typography or night-field composition.

## Promoted project rule

When a print line/rule/route/axis carries decorative filled endpoint/checkpoint markers, do **not** preserve those markers automatically. First determine whether each marker adds independent semantic, physical, binding or navigation information.

If the line/arrow/native labels remain fully legible and functionally complete without the marker, run a rollback-safe marker-off comparison at whole-item scale. Adopt subtraction only when the print artifact becomes less UI-like and structure/long-copy/safe-area checks remain healthy.

This is a QA/default-decision rule, not a visual-style rule and not permission to delete all dots across the project.

## Next receiving-item experiment

Future items should apply this rule only when a real visible progress/slider/stepper reading appears. If a marker is semantically meaningful, retain it and record the binding/sequence role instead of forcing subtraction.
