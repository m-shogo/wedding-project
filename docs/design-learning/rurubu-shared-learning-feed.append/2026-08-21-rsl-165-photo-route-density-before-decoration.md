# RSL-165 — Increase continuity by reweighting an existing photo route before adding decoration

Date: 2026-08-21
Source scope/item: Rurubu WEDDING / V6 chronology
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The IF chronology right page was structurally correct but visually sparse below its hero. The route, EVENT_3 photo, registration beat and wedding beat read as separate islands rather than one editorial journey.

## Evidence before change

- IF `2067:2`, chronology right `2067:28`.
- visible native text `27` and IMAGE fills `2`; no collision/safe-area defect was driving the weakness.
- 500px comparison against the rest of the preferred V6 set showed role spacing and scale allocation as the issue.

## Root-cause hypothesis

When a print timeline already has sufficient facts and imagery, empty field can make sequential beats look modular even without cards. Before adding more rules, stickers, textures or images, reweight the strongest existing photo and compress the following milestones into one continuous reading route.

## Principle / capability tested

`existing dominant photo reweighting + milestone compression before decoration`.

## Exact bounded test

On rollback-safe IJ `2080:2` only:

- kept the left story page unchanged;
- enlarged the existing EVENT_3 replaceable photo using the unchanged image hash `439a719d73f28e8dd2889f2026cccb15f345ec63`;
- repositioned existing native 03/05/06 number/date/title/copy groups to create a tighter photo → milestone → terminal descent;
- shortened the existing functional route rail to match the new terminal position;
- changed no wording, date, source image, palette family, card/container count or asset provenance;
- added no generated image and no new decorative field.

## Expected improvement

Reduce poster-like emptiness, preserve factual editability, and make the chronology feel like an editorial travel route rather than isolated modules.

## Regression risk

- source softness can become visible after enlargement;
- milestone compression can create text collisions or safe-area problems;
- the route rail may stop functioning as a binder if shortened too far;
- over-dense sequencing can reduce scan clarity.

## Three-scale evidence

- whole spread / 500px: PASS;
- reading spread / 1400px: PASS;
- actual-size chronology right / ≈794×1123: PASS;
- native text `27`;
- IMAGE fills `2`;
- same-parent text intersections `0`;
- 18px safe risks `0`.

## Figma / Drive / GitHub evidence

- Figma preferred: IJ `2080:2`;
- chronology right: `2080:28`;
- hidden rollback: IF `2067:2`;
- Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- generation / Drive write / upload: `0 / 0 / 0`;
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IJ-CHRONOLOGY-PHOTO-ROUTE-QA-2026-08-21.md`.

## Adopted / rejected / blocked status

`VERIFIED_LOCAL`: adopted in V6 chronology.

## What must remain Rurubu-specific

Do not transfer the 01—06 numbering, exact photo proportions, route geometry, colors, Japanese headline scale, destination imagery, wedding chronology facts, or Rurubu visual grammar.

## Cross-item applicability hypothesis

A materially different print artifact may independently test this when sequential content is already structurally sound but reads as isolated islands. The transferable test is: before adding decoration, can one legitimate existing visual be promoted and adjacent milestones compacted into a clearer path without harming scan/physical semantics?

## Next receiving-item experiment

Only test on an artifact with sequential or progressive information. Reject the method when empty space is performing a real premium, writing, scanning, QR, perforation, fold or accessibility function.
