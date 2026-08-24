# WEDDING PASSPORT — Fixed-art V2 Professional Refinement QA / 2026-08-25

State: `A2+B2_FRONT_BACK_PAIRS_CREATED / THUMBNAIL_REFINEMENT_PASS / READY_FOR_SAFE_FIGMA_ASSEMBLY / NOT_PRODUCTION`

## Authority

- run start main: `91c7bd46296492e4da340762a7208764f2942176`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
- Hybrid authority: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- previous executable assembly spec: `FIGMA-CLEANROOM-AB-ASSEMBLY-SPEC-2026-08-24.md`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- retained Current front/back: `181:52 / FIELD JOURNAL`, `181:80 / RETURN NOTE`
- exact Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`

No retained production composition, decorative node, old crop, old generated asset or previous Current frame was used as a construction source. This refinement only reworked the already clean-room A/B fixed-art studies and remains pre-Figma/pre-production.

## Professional research consumed

Primary / high-quality references used as design judgment, not copied artwork:

- Pentagram / Travel + Leisure: travel editorial works best when layouts open up, strong visual atmosphere is foregrounded, and composition remains simple enough for information hierarchy to breathe.
  - https://www.pentagram.com/work/travel-leisure
- JAGDA / Graphic Design in Japan 2026: current Japanese professional graphic-design evaluation spans Book & Editorial, General Graphics, Package, CI/VI and other physical disciplines; the annual is selected from roughly 2,070 submissions with about 580 accepted, reinforcing that the object must hold up as an actual graphic artifact rather than as a Figma effect.
  - https://www.jagda.or.jp/news/10422/
  - https://www.jagda.or.jp/news/10095/

Transferable hypothesis used here: **travel energy should come from one dominant atmosphere/gesture and strong typographic room, while the physical booklet reading must be carried by connected paper/binding cues rather than floating bars, badges or admin-like fields.**

## Why the first A/B studies needed another pass

### A / Departure Window first study

Observed weakness in rendered fixed-art preview:

- the large blue right half + isolated sun + multiple colored lower shapes read strongly as an event poster;
- the stitch rhythm was physically suggestive, but the rest of the composition did not sufficiently connect to booklet/page behavior;
- raw energy was strong, artifact specificity was weaker.

### B / Island Field Guide first study

Observed weakness in rendered fixed-art preview:

- top dark rectangle + lower factual rectangles risked becoming UI/container grammar before native copy was even placed;
- three wind/tide lines were useful, but the surrounding box vocabulary weakened the open editorial character;
- destination atmosphere was stronger than A, but the fixed art contained unnecessary framing devices.

## New A2 — Departure Window v2

Files:

- `studies/vnext-2026-08-25/departure-window-v2-fixed-art.svg`
- `studies/vnext-2026-08-25/departure-window-v2-return-fixed-art.svg`

Refinement:

- reduced the old full-right poster block into a nested aperture/page-opening system;
- kept one sun, but cropped it into the aperture so it reads as atmosphere rather than a floating badge;
- changed the left rhythm into a narrow connected binding spine with a dashed stitch inside the spine itself;
- reduced the lower motion to one dominant coral flight/wind gesture plus one subordinate lagoon line;
- added a connected lower page-turn silhouette rather than a floating decorative strip;
- back reverses mass and binding side without mechanically mirroring front.

Expected gain:

- stronger booklet specificity;
- still high travel anticipation;
- more protected native-copy field;
- fewer independent decorative shapes.

Main risk for Figma assembly:

- if headline/date scale is too aggressive, the pair can still become a poster. First 500px pair review remains mandatory.

## New B2 — Island Field Guide v2

Files:

- `studies/vnext-2026-08-25/island-field-guide-v2-fixed-art.svg`
- `studies/vnext-2026-08-25/island-field-guide-v2-return-fixed-art.svg`

Refinement:

- removed the old dark top header rectangle entirely;
- removed the old bottom factual rectangles entirely;
- kept destination atmosphere as off-frame coastal light masses and three trade-wind/tide lines with differentiated weights;
- left the broad cream field structurally open for native Japanese typography rather than pre-building a text container;
- return study changes the cream/ocean mass relationship and line position instead of mirroring the front.

Expected gain:

- strongest editorial / destination character of the pair;
- much lower risk of web-card/UI grammar;
- more freedom for Japanese type to become the celebration gesture.

Main risk for Figma assembly:

- can become too quiet if native Japanese typography is timid. The solution should be stronger type rhythm, not more decorative boxes.

## Hybrid authoring boundary

- native Figma text: all reader-facing copy, names, date, place and placeholders;
- editable SVG/fixed art: these four vector studies only;
- replaceable photography: none required for this experiment;
- generated raster: none used;
- no final wording is baked into the SVGs.

## QA completed this run

- rendered the prior A study locally at full 1480×2100 and visually diagnosed poster-weight problems;
- rendered the new A2 and B2 front studies at full 1480×2100;
- A2: clearer aperture/binding/page behavior than A1, while preserving a large calm native-copy field;
- B2: removed the most UI-like header/footer rectangles from B1 and retained one coherent destination-atmosphere system;
- no fake passport/airline credentials, no baked copy, no raster flattening.

This is fixed-art preview evidence only. It is **not** three-scale Figma evidence and is not a sellable visual PASS.

## Figma write status

`BLOCKED_TOOL_PATH / TRANSIENT_OR_CAPABILITY_DEPENDENCY`

The connected Figma write action explicitly requires readable `figma-use` guidance before invocation. That guidance resource is still not exposed in the current connector environment. Per the repeated-failure/method-switch rule, the run did not bypass the contract or repeatedly probe the same blocked write path.

Read-only screenshots remain available; production was not mutated.

## Next executable step when Figma write guidance is available

1. assemble A2 front/back on blank 1480×2100 frames;
2. assemble B2 front/back on separate blank frames;
3. add only native semantic copy from the existing assembly spec;
4. compare A2 vs B2 at ~500px as pairs before any retained-Current comparison;
5. mature only winner(s) to reading / actual-size / realistic long-copy;
6. only then compare with retained FIELD JOURNAL / RETURN NOTE;
7. promote only if the clean-room pair clearly improves travel anticipation and keeps booklet specificity.

## Result

- new fixed-art files: `4`
- new image assets: `0`
- Figma write: `0`
- Drive write: `0`
- production promotion: `0`
- current retained production: unchanged
- learning status: `VERIFIED_LOCAL` for the refinement hypothesis; not promoted project-wide.
