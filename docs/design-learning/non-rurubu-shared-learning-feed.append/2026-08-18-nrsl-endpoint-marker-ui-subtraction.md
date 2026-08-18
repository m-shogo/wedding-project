# NRSL — Redundant endpoint markers can turn print lines into UI controls

Source scope/items: non-Rurubu / ADD-05 サンキュータグ + ADD-10 会場案内サイン

State: `VERIFIED_CROSS_ITEM`
Date: 2026-08-18

## Visible problem

Two materially different print artifacts independently showed the same failure mode:

- ADD-05: a thin editorial journey line ended in a filled circle, making the tag read like a slider/progress control even though the physical punch hole already carried the artifact's anchor semantics.
- ADD-10: a functional mint direction axis ended in a small rust circle at the non-arrow end, making an otherwise clear wayfinding arrow read slightly like a UI control.

## Root-cause hypothesis

A secondary endpoint dot is harmful when the line already has a complete print/physical meaning without it. A filled circle can introduce interface semantics such as handle, progress state, selected node, or timeline checkpoint even when no such interaction exists.

The correct question is not “are endpoint dots bad?” It is whether the marker performs an independent physical, semantic, binding, or navigation function that the line/arrow does not already provide.

## Bounded tests

### ADD-05

Evidence:

- `01_paper-items/additional-wedding-items/ADD-05-thank-you-gift-tags/FIGMA-ENDPOINT-DOT-SUBTRACTION-QA-2026-08-18.md`

Only the filled endpoint circle was hidden on rollback-safe front candidates. Punch hole, copy, date, line, safe guides and tag geometry remained unchanged. The subtraction was adopted on both selected front sizes after actual-size comparison.

### ADD-10

Evidence:

- `01_paper-items/additional-wedding-items/ADD-10-venue-guide-signs/FIGMA-CLEANROOM-V4-AXIS-ENDPOINT-SUBTRACTION-2026-08-18.md`

Only the 30×30 rust endpoint vector was hidden while preserving the mint direction line and arrowhead. The subtraction was adopted across left/right/forward selected V4 and synchronized to long-copy stress after whole-item comparison.

## Expected improvement

Keep print/editorial lines reading as lines, rules, routes, or direction axes instead of fake UI controls.

## Regression risk

Do not remove a dot that actually carries a required role such as:

- punched/attached point;
- real destination/station semantics;
- map legend meaning;
- sequence state that the reader must interpret;
- physical registration/trim/binding mark;
- required image-caption or timeline binding.

Use the existing binding-function check before subtraction.

## Three-scale evidence

ADD-05:

- selected front sizes passed actual-size review after subtraction;
- punch → gratitude → line → date hierarchy remained intact.

ADD-10:

- left/right/forward whole-item screenshots passed after subtraction;
- forward/left/right direction remained immediate;
- long-copy stress outside text `0 / 0 / 0`, text collision `0 / 0 / 0`;
- line + arrowhead remained editable vector roles.

## Evidence / provenance

- ADD-05 Figma: `kAdkOMuAMcFQtTSP8NtWil`
- ADD-05 evidence: `FIGMA-ENDPOINT-DOT-SUBTRACTION-QA-2026-08-18.md`
- ADD-10 Figma: `mMfoBkoZ7eVbuerSRHePLV`
- ADD-10 evidence: `FIGMA-CLEANROOM-V4-AXIS-ENDPOINT-SUBTRACTION-2026-08-18.md`
- ADD-10 evidence commit: `eb4b8a8705db81aa4d3bdf1a5d87bc2398dad155`
- Drive writes in both tests: `0`
- generated assets: `0`

## What must remain item-specific

Do not transfer ADD-05's tag line geometry, punch relationship, green color, or dimensions. Do not transfer ADD-10's arrow shape, mint/rust palette, destination hierarchy, or exact axis length.

## Cross-item applicability

When a print line/rule/route/axis ends in a decorative filled marker, independently test a rollback-safe marker-off version if the artifact starts to resemble a slider, progress bar, selected timeline point, or dashboard control.

Retain the marker when it has a real semantic/physical job. Remove it only when whole-item comparison proves the line remains fully legible and functionally complete without it.

## Next receiving-item experiment

Apply only when another materially different artifact shows the same visible UI-control reading. Do not proactively delete every dot, node, or station marker across the wedding suite.
