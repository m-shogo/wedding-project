# RSL-182 — Sequential information needs visual attachment, not merely spatial proximity

Source scope/item: Rurubu WEDDING / V6 Story–Chronology JB
Date: 2026-08-21
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

IR's chronology already abandoned a full timeline rail and used unequal editorial beats, but Event 04 remained a small text island beside the dominant Event 03 photograph. Chronological adjacency was present in content order, yet the page still read partly like a list because 04 had no strong visual ownership.

## Evidence before change

- IR `2104:2`, chronology right `2104:28`.
- 500 px whole-spread review: Event 04 visibly floated in cream space left of the Event 03 image.
- IR was structurally valid; the defect was hierarchy/attachment rather than collision or missing content.

## Root-cause hypothesis

Sequential semantics do not automatically create editorial grouping. When a small follow-up event is spatially near a dominant image but not visibly attached to it, the eye may still parse it as a separate utility/list module.

## Principle / capability tested

Use a bounded, square-corner editorial strip only when it performs an explicit **binding function** between a dominant photographic beat and its immediately related follow-up event. The strip should attach to the image edge and carry native text; it must not become a repeated card system.

This locally tests the neutral binding-function method already established by `RSL-008 / NRSL-002`; no non-Rurubu literal layout or item-specific treatment was inspected or copied.

## Exact bounded change

- rollback-safe duplicate IR → JB `2144:2`;
- left Story page unchanged;
- Event 03 photo enlarged/repositioned to `x=175 y=510 w=585 h=310`;
- one yellow square-corner strip `2144:111`, `x=18 y=726 w=305 h=96`, overlaps the lower-left photo edge;
- native Event 04 number/title/copy moved onto that strip;
- existing closing rule moved to preserve the 03/04 → 05/06 handoff;
- redundant old white photo caption hidden after reading-scale QA exposed it as stranded/duplicative;
- no new image, generated asset, rounded card, shadow, gradient, or rasterized text.

## Expected improvement

Create one intentional combined 03→04 editorial beat, reduce list/dashboard reading, and preserve unequal magazine rhythm without increasing asset count.

## Regression risk

A strip can regress into a generic badge/card if repeated mechanically, become decoration without actual binding value, obscure too much image, or reduce text contrast. It must be evaluated at whole-item scale and removed when it does not visibly bind two semantically related roles.

## Three-scale evidence

- whole spread / 500 px: PASS; 04 no longer floats independently.
- reading / 1400 px: PASS; 03 remains dominant and 04 is clearly subordinate but attached.
- actual right page / native `794×1123`: PASS.
- final visible native text: `26`.
- visible IMAGE fills: `2`.
- text intersections: `0`.
- 18 px text safe-area risks: `0`.

## Figma / Drive / GitHub evidence

- Figma preferred: JB `2144:2`; right `2144:28`; binder `2144:111`.
- hidden rollback: IR `2104:2`.
- unchanged visible image hashes: `e3738476f760932bb5b09c9d60f174dd6c84049d`, `439a719d73f28e8dd2889f2026cccb15f345ec63`.
- Drive V6 authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-JB-CHRONOLOGY-LINKED-EVENT04-QA-2026-08-21.md`.

## Adopted / rejected / blocked status

`VERIFIED_LOCAL`: JB adopted. The intermediate state retaining the old white lower photo caption was rejected during reading-scale QA and corrected before promotion.

## Failure fingerprint

Fingerprint: `F-RSL-182-ATTACHED-BEAT-OLD-CAPTION-STRANDING`

- operation/capability: bind subordinate native event text to dominant photo with an editorial strip;
- environment: live Figma Plugin API candidate duplicate;
- symptom: pre-existing caption lands partly on/near the new strip and becomes redundant or semantically misleading;
- likely cause class: role changed but inherited annotation was not re-evaluated;
- evidence date: 2026-08-21;
- replacement method: re-audit all inherited captions after changing image/text ownership; hide or reposition only if they no longer perform a distinct function.

This fingerprint has occurred once and does not trigger the two-failure method-switch rule.

## What must remain Rurubu-specific

Do not transfer the yellow color, exact strip dimensions, overlap amount, chronology numbering, street photograph, Japanese travel-magazine composition, type scale, or `03/04` treatment.

## Cross-item applicability hypothesis

On another print artifact, when a small related follow-up fact/event sits near a dominant visual but still reads as an independent utility module, independently test a single bounded binder (rule, strip, caption field, physical seam, or adjacency treatment) that visibly attaches the roles. The transferable principle is **prove semantic attachment at whole-item scale**, not “add yellow strips.”

## Next receiving-item experiment

A materially different artifact may test whether an ambiguous small follow-up role becomes clearer when attached to its parent visual/text block by one functional binder. If grouping is already clear without it, reject the binder rather than adding decoration.