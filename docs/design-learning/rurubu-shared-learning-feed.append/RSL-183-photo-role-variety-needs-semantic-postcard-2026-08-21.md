# RSL-183 — Photo-role variety only helps when the added beat has semantic ownership

Source scope/item: Rurubu WEDDING / V6 Outer JC
Date: 2026-08-21
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

IU front cover had a strong full-field Yokohama hero and one large lower dining support image, but the resulting rhythm still felt closer to a clean brochure than a dense Japanese travel-information magazine cover.

## Root-cause hypothesis

A photo-led composition can remain visually flat when all imagery operates at only two scales/roles. A smaller overlapping photo beat can add editorial cadence, but only if its content and caption have a clear relationship to the information role it supports.

## Bounded test

- duplicate IU → JC `2148:2`;
- add one small physical-postcard-style photo over the hero while preserving native cover typography and lower dining support;
- first test used the existing café image: visually plausible but semantically unowned and therefore REJECTED;
- second test switched the postcard to existing skyline hash `644f449c3bf2001a94d4b822d2b55e2614c11042` and attached the existing native Feature 02 chronology caption to that image;
- dining support remained the guest/travel-shiori visual beat;
- no new generated image or text fact was introduced.

## Expected improvement

Create three intentional photo scales—dominant environment, small chronology postcard, larger lower guest/dining support—without falling into an equal-card grid.

## Regression risks

- adding an uncaptioned or semantically unrelated photo merely for density;
- turning every page into a scrapbook template;
- overusing rotation/strokes as decorative signatures;
- shrinking captions below reading scale;
- obscuring the dominant hero.

## Three-scale evidence

- 500 px whole outer: PASS after switching café → skyline; rejected café version lacked semantic ownership.
- 1400 px reading: PASS; skyline postcard caption remains legible and hierarchy is clearer.
- native 1587×1123 spread: PASS.
- visible native text `35`, IMAGE fills `5`, text intersections `0`, 18 px safe risks `0`.

## Figma / Drive / GitHub evidence

- Figma preferred JC `2148:2`, postcard `2148:108`.
- hidden rollback IU `2124:2`.
- reused skyline hash `644f449c3bf2001a94d4b822d2b55e2614c11042`.
- Drive V6 authority `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.
- evidence `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-JC-OUTER-POSTCARD-COLLAGE-QA-2026-08-21.md`.

## Failure fingerprint

`F-RSL-183-DENSITY-PHOTO-WITHOUT-SEMANTIC-OWNER`

- operation: add smaller photo beat to increase editorial density;
- symptom: image improves surface richness but feels arbitrary because nearby number/caption does not logically belong to it;
- likely cause: visual-role design was changed before semantic-role mapping;
- replacement method: bind the support image to an existing truthful caption/role, or reject the image entirely.

Occurred once. No two-failure method-switch trigger.

## What must remain Rurubu-specific

Do not transfer exact rotations, white photo edge, skyline/dining imagery, magenta/yellow/cyan palette, cover numbers, masthead treatment, or Japanese travel-magazine collage grammar.

## Cross-item applicability hypothesis

On another print artifact, if adding a secondary image seems to improve visual rhythm, require that image to have an explicit semantic owner—caption, section, event, destination, person, or physical artifact role—before adoption. If ownership cannot be stated truthfully, reject the image rather than keeping it as decorative density.